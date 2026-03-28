import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { buildCardValidationUrl } from "@/lib/student-card-validation";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawCode = searchParams.get("codigo")?.trim() || "";

  if (!rawCode) {
    return NextResponse.json({ error: "Parâmetro 'codigo' é obrigatório." }, { status: 400 });
  }

  if (rawCode.length > 120) {
    return NextResponse.json({ error: "Código inválido para geração de QR." }, { status: 400 });
  }

  const validationUrl = buildCardValidationUrl(rawCode);
  const svg = await QRCode.toString(validationUrl, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    width: 220,
    color: {
      dark: "#111111",
      light: "#ffffff",
    },
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
