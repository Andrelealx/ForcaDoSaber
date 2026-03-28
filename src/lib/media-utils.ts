import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const DEFAULT_UPLOAD_URL_BASE = "/uploads";
const API_UPLOAD_URL_BASE = "/api/uploads";

function trimTrailingSlash(input: string) {
  return input.replace(/\/+$/, "");
}

function normalizeRelativePath(input: string) {
  return input
    .replaceAll("\\", "/")
    .replace(/^\/+/, "")
    .replace(/\/{2,}/g, "/");
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

export function resolveUploadPathFromRelativePath(relativePath: string) {
  const normalized = normalizeRelativePath(relativePath);
  if (!normalized || normalized.includes("..")) {
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

export async function listUploadImages(rootDir = getUploadRoot(), currentDir = ""): Promise<string[]> {
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
      const nested = await listUploadImages(rootDir, relativePath);
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

export function resolvePublicPathFromUploadUrl(url: string) {
  const relativePath = getRelativePathFromUploadUrl(url);
  if (!relativePath) {
    return null;
  }

  return resolveUploadPathFromRelativePath(relativePath);
}
