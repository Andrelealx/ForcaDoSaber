import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";
import type { StudentCard } from "@prisma/client";
import {
  buildStudentCardSvg,
  type StudentCardRenderData,
} from "@/lib/student-card-render";

const CARD_RENDER_WIDTH = 1160;
const EMBEDDED_FONT_PATH = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "compiled",
  "@vercel",
  "og",
  "noto-sans-v27-latin-regular.ttf",
);

async function renderCardSvgToPng(svg: string) {
  try {
    const { Resvg } = await import("@resvg/resvg-js");
    const fontFiles = existsSync(EMBEDDED_FONT_PATH) ? [EMBEDDED_FONT_PATH] : [];
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: CARD_RENDER_WIDTH },
      font: {
        loadSystemFonts: false,
        defaultFontFamily: "Noto Sans",
        fontFiles,
      },
    });
    return Buffer.from(resvg.render().asPng());
  } catch {
    return sharp(Buffer.from(svg), { density: 300 }).png().toBuffer();
  }
}

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
    | "validationToken"
    | "validityDate"
    | "issueDate"
    | "responsibleName"
    | "responsibleRole"
  >,
  options?: {
    publicBaseUrl?: string | null;
  },
): StudentCardRenderData {
  return {
    fullName: card.fullName,
    photo: card.photo,
    enrollment: card.enrollment,
    course: card.course,
    unit: card.unit,
    cardCode: card.cardCode,
    validationCode: card.validationToken || card.cardCode,
    publicBaseUrl: options?.publicBaseUrl ?? null,
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
  return renderCardSvgToPng(svg);
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
