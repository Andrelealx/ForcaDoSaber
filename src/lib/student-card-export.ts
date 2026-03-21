import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import type { StudentCard } from "@prisma/client";
import {
  buildStudentCardSvg,
  type StudentCardRenderData,
} from "@/lib/student-card-render";

function safeSlug(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function studentCardFileBaseName(card: Pick<StudentCard, "fullName" | "cardCode">) {
  const slug = safeSlug(card.fullName) || safeSlug(card.cardCode) || "aluno";
  return `carteirinha-${slug}`;
}

export function mapCardToRenderData(
  card: Pick<
    StudentCard,
    | "fullName"
    | "photo"
    | "enrollment"
    | "course"
    | "unit"
    | "cardCode"
    | "validityDate"
    | "issueDate"
    | "responsibleName"
    | "responsibleRole"
  >,
): StudentCardRenderData {
  return {
    fullName: card.fullName,
    photo: card.photo,
    enrollment: card.enrollment,
    course: card.course,
    unit: card.unit,
    cardCode: card.cardCode,
    validityDate: card.validityDate,
    issueDate: card.issueDate,
    responsibleName: card.responsibleName,
    responsibleRole: card.responsibleRole,
  };
}

export async function buildStudentCardPng(
  side: "front" | "back",
  data: StudentCardRenderData,
) {
  const svg = await buildStudentCardSvg(side, data);
  return sharp(Buffer.from(svg), { density: 300 }).png().toBuffer();
}

export async function buildStudentCardPdf(data: StudentCardRenderData) {
  const [frontPng, backPng] = await Promise.all([
    buildStudentCardPng("front", data),
    buildStudentCardPng("back", data),
  ]);

  const pdfDoc = await PDFDocument.create();
  const pages = [frontPng, backPng];
  const a4Width = 595.28;
  const a4Height = 841.89;
  const pageMargin = 28;
  const maxWidth = a4Width - pageMargin * 2;
  const maxHeight = a4Height - pageMargin * 2;

  for (const pageImage of pages) {
    const image = await pdfDoc.embedPng(pageImage);
    const imageWidth = image.width;
    const imageHeight = image.height;
    const scale = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
    const drawWidth = imageWidth * scale;
    const drawHeight = imageHeight * scale;
    const x = (a4Width - drawWidth) / 2;
    const y = (a4Height - drawHeight) / 2;

    const page = pdfDoc.addPage([a4Width, a4Height]);
    page.drawImage(image, { x, y, width: drawWidth, height: drawHeight });
  }

  return Buffer.from(await pdfDoc.save());
}
