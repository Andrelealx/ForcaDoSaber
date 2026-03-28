import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin-auth";
import {
  buildDatabaseUploadUrl,
  buildUploadUrl,
  getMediaStorageBackend,
  getUploadRoot,
} from "@/lib/media-utils";
import { prisma } from "@/lib/prisma";

const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export const runtime = "nodejs";

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
  try {
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

    const bytes = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const storageBackend = getMediaStorageBackend();

    if (storageBackend === "database") {
      const media = await prisma.mediaAsset.create({
        data: {
          fileName,
          mimeType: file.type,
          size: file.size,
          bytes,
        },
        select: { id: true, fileName: true },
      });

      return NextResponse.json({ url: buildDatabaseUploadUrl(media.id, media.fileName) });
    }

    const now = new Date();
    const folder = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const uploadRoot = getUploadRoot();
    const targetDir = path.join(uploadRoot, folder);
    await fs.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, fileName);

    await fs.writeFile(filePath, bytes);

    return NextResponse.json({ url: buildUploadUrl(`${folder}/${fileName}`) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Falha interna no upload.";
    const isAuthError = message.toLowerCase().includes("não autorizado");
    const storageBackend = getMediaStorageBackend();
    const isStorageError =
      /(eacces|erofs|enoent|permission|read-only|operation not permitted)/i.test(message);

    if (isAuthError) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    if (isStorageError) {
      return NextResponse.json(
        {
          error: storageBackend === "database"
            ? "Falha ao gravar arquivo no banco de dados."
            : "Falha ao gravar arquivo no storage do servidor. Verifique UPLOAD_DIR/volume no deploy.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "Falha ao processar upload. Confira logs do servidor para detalhes." },
      { status: 500 },
    );
  }
}
