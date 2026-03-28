import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin-auth";
import { getUploadRoot, getUploadUrlBase } from "@/lib/media-utils";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  const user = await requireApiAdmin();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const database = { ok: false, error: "" };
  const storage = { ok: false, error: "" };

  try {
    await prisma.$queryRaw`SELECT 1`;
    database.ok = true;
  } catch (error) {
    database.error = error instanceof Error ? error.message : "Falha desconhecida no banco.";
  }

  const uploadRoot = getUploadRoot();
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

  const ok = database.ok && storage.ok;

  return NextResponse.json(
    {
      ok,
      database,
      storage,
      uploadRoot,
      uploadUrlBase: getUploadUrlBase(),
    },
    { status: ok ? 200 : 500 },
  );
}
