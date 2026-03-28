import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin-auth";
import { buildStudentCardPng } from "@/lib/student-card-export";
import { buildStudentCardSvg, type StudentCardRenderData } from "@/lib/student-card-render";
import { resolveRequestPublicBaseUrl } from "@/lib/student-card-validation";

export const runtime = "nodejs";

function parseDate(rawValue: unknown, fallback: Date) {
  if (typeof rawValue !== "string" || !rawValue.trim()) {
    return fallback;
  }
  const parsed = new Date(rawValue);
  if (Number.isNaN(parsed.getTime())) {
    return fallback;
  }
  return parsed;
}

function asString(rawValue: unknown, fallback: string) {
  if (typeof rawValue !== "string") return fallback;
  const value = rawValue.trim();
  return value || fallback;
}

function mapPayloadToRenderData(payload: Record<string, unknown>, publicBaseUrl: string) {
  const now = new Date();
  const renderData: StudentCardRenderData = {
    fullName: asString(payload.fullName, "NOME DO ALUNO"),
    photo: asString(payload.photo, "") || null,
    enrollment: asString(payload.enrollment, "0000000"),
    course: asString(payload.course, "CURSO"),
    unit: asString(payload.unit, "Nova Guapimirim"),
    cardCode: asString(payload.cardCode, "FS-000000"),
    validationCode: asString(payload.validationCode, ""),
    publicBaseUrl,
    validityDate: parseDate(payload.validityDate, now),
    issueDate: parseDate(payload.issueDate, now),
    responsibleName: asString(payload.responsibleName, "José Augusto Oliveira Cordeiro"),
    responsibleRole: asString(payload.responsibleRole, "Responsável institucional"),
  };

  return renderData;
}

export async function GET(request: Request) {
  const user = await requireApiAdmin();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const url = new URL(request.url);
  const side = url.searchParams.get("side") === "back" ? "back" : "front";
  const format = url.searchParams.get("format") === "svg" ? "svg" : "png";
  const payloadRaw = url.searchParams.get("payload");

  if (!payloadRaw) {
    return NextResponse.json({ error: "Payload de prévia ausente." }, { status: 400 });
  }

  let payload: Record<string, unknown>;
  try {
    const parsed = JSON.parse(payloadRaw);
    if (!parsed || typeof parsed !== "object") {
      return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
    }
    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const renderData = mapPayloadToRenderData(payload, resolveRequestPublicBaseUrl(request));

  if (format === "svg") {
    const svg = await buildStudentCardSvg(side, renderData);
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  const png = await buildStudentCardPng(side, renderData);
  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-store",
    },
  });
}
