import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import {
  resolveUploadPathFromRelativePath,
} from "@/lib/media-utils";

export const runtime = "nodejs";

type RouteParams = {
  params: Promise<{ path?: string[] }>;
};

function contentTypeFromExtension(filePath: string) {
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

export async function GET(_request: Request, { params }: RouteParams) {
  const { path: pathSegments = [] } = await params;
  const relativePath = pathSegments.join("/");

  const filePath = resolveUploadPathFromRelativePath(relativePath);
  if (!filePath) {
    return NextResponse.json({ error: "Arquivo inválido." }, { status: 400 });
  }

  const fileBuffer = await fs.readFile(filePath).catch(() => null);
  if (!fileBuffer) {
    return NextResponse.json({ error: "Arquivo não encontrado." }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(fileBuffer), {
    headers: {
      "Content-Type": contentTypeFromExtension(filePath),
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
