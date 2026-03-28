import fs from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const DEFAULT_UPLOAD_URL_BASE = "/uploads";
const API_UPLOAD_URL_BASE = "/api/uploads";
const DATABASE_UPLOAD_SEGMENT = "db";

export type MediaStorageBackend = "database" | "filesystem";

function trimTrailingSlash(input: string) {
  return input.replace(/\/+$/, "");
}

function normalizeRelativePath(input: string) {
  return input
    .replaceAll("\\", "/")
    .replace(/^\/+/, "")
    .replace(/\/{2,}/g, "/");
}

export function contentTypeFromExtension(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

export function getMediaStorageBackend(): MediaStorageBackend {
  const configured = process.env.MEDIA_STORAGE_BACKEND?.trim().toLowerCase();
  if (configured === "filesystem") {
    return "filesystem";
  }
  if (configured === "database") {
    return "database";
  }

  return "database";
}

export function getUploadRoot() {
  const configuredRoot = process.env.UPLOAD_DIR?.trim();
  if (configuredRoot) {
    return path.resolve(configuredRoot);
  }

  const railwayMountPath = process.env.RAILWAY_VOLUME_MOUNT_PATH?.trim();
  if (railwayMountPath) {
    return path.resolve(railwayMountPath, "uploads");
  }

  return path.resolve(process.cwd(), "public", "uploads");
}

function getPublicUploadsRoot() {
  return path.resolve(process.cwd(), "public", "uploads");
}

function isStorageUnderPublic(root = getUploadRoot()) {
  const resolvedRoot = path.resolve(root);
  const publicRoot = getPublicUploadsRoot();
  return resolvedRoot === publicRoot || resolvedRoot.startsWith(`${publicRoot}${path.sep}`);
}

export function getUploadUrlBase() {
  if (getMediaStorageBackend() === "database") {
    return API_UPLOAD_URL_BASE;
  }

  const configuredBase = process.env.UPLOAD_PUBLIC_BASE_URL?.trim();
  if (configuredBase) {
    const normalizedBase = `/${configuredBase.replace(/^\/+/, "")}`;
    return trimTrailingSlash(normalizedBase) || "/";
  }

  return isStorageUnderPublic() ? DEFAULT_UPLOAD_URL_BASE : API_UPLOAD_URL_BASE;
}

export function buildUploadUrl(relativePath: string) {
  const normalized = normalizeRelativePath(relativePath);
  if (!normalized) {
    return getUploadUrlBase();
  }

  const base = trimTrailingSlash(getUploadUrlBase());
  return `${base}/${normalized}`;
}

export function buildDatabaseUploadUrl(mediaId: string, fileName: string) {
  const safeFileName = encodeURIComponent(fileName.trim().replace(/\s+/g, "-"));
  return `${API_UPLOAD_URL_BASE}/${DATABASE_UPLOAD_SEGMENT}/${mediaId}/${safeFileName}`;
}

export function getDatabaseMediaIdFromRelativePath(relativePath: string) {
  const normalized = normalizeRelativePath(relativePath);
  if (!normalized) {
    return null;
  }

  const parts = normalized.split("/");
  if (parts[0] !== DATABASE_UPLOAD_SEGMENT) {
    return null;
  }

  const mediaId = parts[1]?.trim();
  if (!mediaId) {
    return null;
  }

  return mediaId;
}

export function getRelativePathFromUploadUrl(url: string) {
  const normalizedUrl = url.trim();
  if (!normalizedUrl) return null;

  const validPrefixes = Array.from(
    new Set([
      trimTrailingSlash(getUploadUrlBase()),
      DEFAULT_UPLOAD_URL_BASE,
      API_UPLOAD_URL_BASE,
    ]),
  ).filter(Boolean);

  const matchedPrefix = validPrefixes.find(
    (prefix) =>
      normalizedUrl === prefix ||
      normalizedUrl.startsWith(`${prefix}/`) ||
      normalizedUrl.startsWith(`${prefix}?`),
  );

  if (!matchedPrefix) {
    return null;
  }

  const withoutPrefix = normalizedUrl.slice(matchedPrefix.length).replace(/^\/+/, "");
  const cleanPath = withoutPrefix.split(/[?#]/)[0] ?? "";
  const relativePath = normalizeRelativePath(cleanPath);
  if (!relativePath) {
    return null;
  }

  if (relativePath.includes("..")) {
    return null;
  }

  return relativePath;
}

export function getDatabaseMediaIdFromUploadUrl(url: string) {
  const relativePath = getRelativePathFromUploadUrl(url);
  if (!relativePath) {
    return null;
  }

  return getDatabaseMediaIdFromRelativePath(relativePath);
}

export function resolveUploadPathFromRelativePath(relativePath: string) {
  const normalized = normalizeRelativePath(relativePath);
  if (!normalized || normalized.includes("..")) {
    return null;
  }

  if (normalized.startsWith(`${DATABASE_UPLOAD_SEGMENT}/`)) {
    return null;
  }

  const uploadRoot = getUploadRoot();
  const fullPath = path.resolve(uploadRoot, normalized);
  const resolvedRoot = path.resolve(uploadRoot);

  if (!fullPath.startsWith(`${resolvedRoot}${path.sep}`) && fullPath !== resolvedRoot) {
    return null;
  }

  return fullPath;
}

async function listFilesystemUploadImages(rootDir = getUploadRoot(), currentDir = ""): Promise<string[]> {
  const fullDir = path.join(rootDir, currentDir);
  const entries = await fs
    .readdir(fullDir, { withFileTypes: true, encoding: "utf8" })
    .catch(() => null);

  if (!entries) {
    return [];
  }

  const files: string[] = [];

  for (const entry of entries) {
    const relativePath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      const nested = await listFilesystemUploadImages(rootDir, relativePath);
      files.push(...nested);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (!IMAGE_EXTENSIONS.has(extension)) {
      continue;
    }

    files.push(buildUploadUrl(relativePath.replaceAll(path.sep, "/")));
  }

  return files;
}

async function listDatabaseUploadImages() {
  try {
    const media = await prisma.mediaAsset.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, fileName: true },
    });

    return media.map((item) => buildDatabaseUploadUrl(item.id, item.fileName));
  } catch {
    return [] as string[];
  }
}

export async function listUploadImages(rootDir = getUploadRoot(), currentDir = ""): Promise<string[]> {
  const [databaseFiles, filesystemFiles] = await Promise.all([
    currentDir ? Promise.resolve([] as string[]) : listDatabaseUploadImages(),
    listFilesystemUploadImages(rootDir, currentDir),
  ]);

  return Array.from(new Set([...databaseFiles, ...filesystemFiles]));
}

export function resolvePublicPathFromUploadUrl(url: string) {
  const relativePath = getRelativePathFromUploadUrl(url);
  if (!relativePath) {
    return null;
  }

  return resolveUploadPathFromRelativePath(relativePath);
}

export async function readUploadAssetFromUrl(url: string) {
  const mediaId = getDatabaseMediaIdFromUploadUrl(url);
  if (mediaId) {
    const media = await prisma.mediaAsset.findUnique({
      where: { id: mediaId },
      select: { bytes: true, mimeType: true },
    });

    if (media) {
      return { buffer: Buffer.from(media.bytes), mimeType: media.mimeType };
    }
  }

  const filePath = resolvePublicPathFromUploadUrl(url);
  if (!filePath) {
    return null;
  }

  try {
    const buffer = await fs.readFile(filePath);
    return { buffer, mimeType: contentTypeFromExtension(filePath) };
  } catch {
    return null;
  }
}
