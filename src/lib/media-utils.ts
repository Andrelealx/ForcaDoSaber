import fs from "node:fs/promises";
import path from "node:path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export function getUploadRoot() {
  return path.join(process.cwd(), "public", "uploads");
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

    files.push(`/uploads/${relativePath.replaceAll(path.sep, "/")}`);
  }

  return files;
}

export function resolvePublicPathFromUploadUrl(url: string) {
  const normalized = url.trim();
  if (!normalized.startsWith("/uploads/")) {
    return null;
  }

  const uploadsRoot = getUploadRoot();
  const relative = normalized.replace(/^\/+/, "");
  const fullPath = path.resolve(process.cwd(), "public", relative);
  const resolvedUploadsRoot = path.resolve(uploadsRoot);

  if (!fullPath.startsWith(resolvedUploadsRoot)) {
    return null;
  }

  return fullPath;
}
