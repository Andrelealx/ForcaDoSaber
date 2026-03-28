import { NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/admin-auth";
import {
  buildStudentCardPdf,
  mapCardToRenderData,
  studentCardFileBaseName,
} from "@/lib/student-card-export";
import { prisma } from "@/lib/prisma";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export const runtime = "nodejs";

export async function GET(request: Request, { params }: RouteParams) {
  const user = await requireApiAdmin();
  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const { id } = await params;
  const card = await prisma.studentCard.findUnique({ where: { id } });
  if (!card) {
    return NextResponse.json({ error: "Carteirinha não encontrada." }, { status: 404 });
  }

  const requestOrigin = new URL(request.url).origin;
  const pdf = await buildStudentCardPdf(
    mapCardToRenderData(card, { publicBaseUrl: requestOrigin }),
  );
  const fileBase = studentCardFileBaseName(card);
  const url = new URL(request.url);
  const download = url.searchParams.get("download") !== "0";

  return new NextResponse(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${fileBase}.pdf"`,
    },
  });
}
