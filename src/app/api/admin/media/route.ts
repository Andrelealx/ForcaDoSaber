import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin-auth";
import { listUploadImages, resolvePublicPathFromUploadUrl } from "@/lib/media-utils";

export async function GET() {
  const user = await requireApiAdmin();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const files = await listUploadImages();
  const sorted = files.sort((a, b) => b.localeCompare(a, "pt-BR"));

  return NextResponse.json({ files: sorted });
}

export async function DELETE(request: Request) {
  const user = await requireApiAdmin();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const payload = (await request.json().catch(() => ({}))) as { url?: string };
  const url = typeof payload.url === "string" ? payload.url : "";
  const filePath = resolvePublicPathFromUploadUrl(url);

  if (!filePath) {
    return NextResponse.json({ error: "Arquivo inválido." }, { status: 400 });
  }

  await fs.unlink(filePath).catch(() => null);
  return NextResponse.json({ ok: true });
}
