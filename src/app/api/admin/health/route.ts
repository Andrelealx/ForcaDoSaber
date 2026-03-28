import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin-auth";
import { getMediaStorageBackend, getUploadRoot, getUploadUrlBase } from "@/lib/media-utils";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const user = await requireApiAdmin();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const database = { ok: false, error: "" };
  const storage = { ok: false, error: "" };
  const storageBackend = getMediaStorageBackend();

  try {
    await prisma.$queryRaw`SELECT 1`;
    database.ok = true;
  } catch (error) {
    database.error = error instanceof Error ? error.message : "Falha desconhecida no banco.";
  }

  const uploadRoot = getUploadRoot();
  if (storageBackend === "database") {
    try {
      const tempAsset = await prisma.mediaAsset.create({
        data: {
          fileName: `.healthcheck-${Date.now()}.txt`,
          mimeType: "text/plain",
          size: 2,
          bytes: Buffer.from("ok"),
        },
        select: { id: true },
      });
      await prisma.mediaAsset.delete({ where: { id: tempAsset.id } });
      storage.ok = true;
    } catch (error) {
      storage.error = error instanceof Error ? error.message : "Falha desconhecida no storage.";
    }
  } else {
    try {
      await fs.mkdir(uploadRoot, { recursive: true });
      const healthFileName = `.healthcheck-${Date.now()}.tmp`;
      const healthFilePath = path.join(uploadRoot, healthFileName);
      await fs.writeFile(healthFilePath, "ok", "utf8");
      await fs.unlink(healthFilePath).catch(() => null);
      storage.ok = true;
    } catch (error) {
      storage.error = error instanceof Error ? error.message : "Falha desconhecida no storage.";
    }
  }

  const ok = database.ok && storage.ok;

  return NextResponse.json(
    {
      ok,
      database,
      storage,
      storageBackend,
      uploadRoot,
      uploadUrlBase: getUploadUrlBase(),
    },
    { status: ok ? 200 : 500 },
  );
}
