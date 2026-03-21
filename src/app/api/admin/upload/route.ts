import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin-auth";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function extensionFromMime(mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    default:
      return null;
  }
}

export async function POST(request: Request) {
  const user = await requireApiAdmin();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Arquivo inválido." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Tipo não permitido. Envie JPG, PNG, WEBP ou GIF." },
      { status: 400 },
    );
  }

  if (file.size > MAX_UPLOAD_SIZE) {
    return NextResponse.json(
      { error: "Arquivo maior que 5MB. Reduza o tamanho da imagem." },
      { status: 400 },
    );
  }

  const extension = extensionFromMime(file.type);
  if (!extension) {
    return NextResponse.json({ error: "Extensão inválida." }, { status: 400 });
  }

  const now = new Date();
  const folder = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const targetDir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(targetDir, { recursive: true });

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
  const filePath = path.join(targetDir, fileName);

  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, bytes);

  return NextResponse.json({ url: `/uploads/${folder}/${fileName}` });
}
