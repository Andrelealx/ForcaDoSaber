import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import {
  contentTypeFromExtension,
  getDatabaseMediaIdFromRelativePath,
  resolveUploadPathFromRelativePath,
} from "@/lib/media-utils";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type RouteParams = {
  params: Promise<{ path?: string[] }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { path: pathSegments = [] } = await params;
  const relativePath = pathSegments.join("/");
  const mediaId = getDatabaseMediaIdFromRelativePath(relativePath);

  if (mediaId) {
    const media = await prisma.mediaAsset.findUnique({
      where: { id: mediaId },
      select: { bytes: true, mimeType: true },
    });

    if (!media) {
      return NextResponse.json({ error: "Arquivo não encontrado." }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(media.bytes), {
      headers: {
        "Content-Type": media.mimeType || "application/octet-stream",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  }

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
