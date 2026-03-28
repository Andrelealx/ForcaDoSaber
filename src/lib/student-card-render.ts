import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";
import { resolvePublicPathFromUploadUrl } from "@/lib/media-utils";
import {
  buildCardValidationUrl,
  resolveCardValidationCode,
} from "@/lib/student-card-validation";

export type StudentCardRenderData = {
  fullName: string;
  photo?: string | null;
  enrollment: string;
  course: string;
  unit: string;
  cardCode: string;
  validationCode?: string | null;
  validityDate: Date;
  issueDate: Date;
  responsibleName?: string | null;
  responsibleRole?: string | null;
};

const CARD_WIDTH = 1160;
const CARD_HEIGHT = 1840;
const CARD_RADIUS = 44;
const SAFE_X = 78;
const SAFE_Y = 84;

type FitTextOptions = {
  text: string;
  fallback: string;
  maxWidth: number;
  maxLines: number;
  preferredFontSize: number;
  minFontSize: number;
  charFactor?: number;
  lineHeightRatio?: number;
  uppercase?: boolean;
};

type FittedText = {
  lines: string[];
  fontSize: number;
  lineHeight: number;
};

type SvgTextBlockOptions = {
  x: number;
  y: number;
  lines: string[];
  fontSize: number;
  lineHeight: number;
  fill: string;
  fontFamily: string;
  fontWeight?: number;
  letterSpacing?: number;
  textAnchor?: "start" | "middle" | "end";
  opacity?: number;
};

function normalizeSpaces(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

function xmlEscape(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function splitLongToken(token: string, maxChars: number) {
  if (token.length <= maxChars) return [token];

  const chunks: string[] = [];
  const chunkSize = Math.max(2, maxChars - 1);

  for (let i = 0; i < token.length; i += chunkSize) {
    chunks.push(token.slice(i, i + chunkSize));
  }

  return chunks;
}

function appendEllipsis(line: string, maxChars: number) {
  const cleaned = normalizeSpaces(line);
  if (!cleaned) return "…";

  if (cleaned.length >= maxChars) {
    return `${cleaned.slice(0, Math.max(1, maxChars - 1)).trimEnd()}…`;
  }

  return `${cleaned}…`;
}

function wrapTextByChars(text: string, maxCharsPerLine: number, maxLines: number) {
  const source = normalizeSpaces(text);
  if (!source) {
    return { lines: [], truncated: false };
  }

  const words = source.split(" ");
  const tokens = words.flatMap((word) => splitLongToken(word, maxCharsPerLine));

  const lines: string[] = [];
  let current = "";

  for (const token of tokens) {
    if (!current) {
      current = token;
      continue;
    }

    const candidate = `${current} ${token}`;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      lines.push(current);
      current = token;
    }
  }

  if (current) {
    lines.push(current);
  }

  if (lines.length <= maxLines) {
    return { lines, truncated: false };
  }

  const clipped = lines.slice(0, maxLines);
  clipped[maxLines - 1] = appendEllipsis(clipped[maxLines - 1], maxCharsPerLine);
  return { lines: clipped, truncated: true };
}

function fitTextBlock(options: FitTextOptions): FittedText {
  const {
    fallback,
    maxWidth,
    maxLines,
    preferredFontSize,
    minFontSize,
    charFactor = 0.58,
    lineHeightRatio = 1.15,
    uppercase = false,
  } = options;

  const normalizedSource = normalizeSpaces(options.text || fallback) || fallback;
  const source = uppercase ? normalizedSource.toUpperCase() : normalizedSource;
  let bestAttempt: FittedText = {
    lines: [source],
    fontSize: minFontSize,
    lineHeight: Math.round(minFontSize * lineHeightRatio),
  };

  for (let size = preferredFontSize; size >= minFontSize; size -= 1) {
    const estimatedCharsPerLine = Math.max(4, Math.floor(maxWidth / (size * charFactor)));
    const wrapped = wrapTextByChars(source, estimatedCharsPerLine, maxLines);
    const attempt: FittedText = {
      lines: wrapped.lines.length > 0 ? wrapped.lines : [source],
      fontSize: size,
      lineHeight: Math.round(size * lineHeightRatio),
    };

    bestAttempt = attempt;
    if (!wrapped.truncated) {
      return attempt;
    }
  }

  return bestAttempt;
}

function renderSvgTextBlock({
  x,
  y,
  lines,
  fontSize,
  lineHeight,
  fill,
  fontFamily,
  fontWeight = 400,
  letterSpacing,
  textAnchor = "start",
  opacity,
}: SvgTextBlockOptions) {
  const escapedLines = lines.map((line) => xmlEscape(line));
  const tspans = escapedLines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${line}</tspan>`)
    .join("");

  const attrs = [
    `x="${x}"`,
    `y="${y}"`,
    `fill="${fill}"`,
    `font-size="${fontSize}"`,
    `font-family="${fontFamily}"`,
    `font-weight="${fontWeight}"`,
    `text-anchor="${textAnchor}"`,
  ];

  if (typeof letterSpacing === "number") {
    attrs.push(`letter-spacing="${letterSpacing}"`);
  }

  if (typeof opacity === "number") {
    attrs.push(`opacity="${opacity}"`);
  }

  return `<text ${attrs.join(" ")}>${tspans}</text>`;
}

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR");
}

async function localImageDataUri(url: string | null | undefined) {
  if (!url) return null;

  if (/^https?:\/\//i.test(url)) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(7000), cache: "no-store" });
      if (!response.ok) return null;
      const contentType = response.headers.get("content-type") || "image/jpeg";
      const arrayBuffer = await response.arrayBuffer();
      return `data:${contentType};base64,${Buffer.from(arrayBuffer).toString("base64")}`;
    } catch {
      return null;
    }
  }

  if (!url.startsWith("/")) return null;

  const uploadPath = resolvePublicPathFromUploadUrl(url);
  const filePath = uploadPath ?? path.join(process.cwd(), "public", url.replace(/^\/+/, ""));

  try {
    const buffer = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
          ? "image/webp"
          : ext === ".gif"
            ? "image/gif"
            : "image/jpeg";
    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

async function buildValidationQrDataUri(url: string) {
  try {
    return await QRCode.toDataURL(url, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 256,
      color: {
        dark: "#111111",
        light: "#ffffff",
      },
    });
  } catch {
    return null;
  }
}

export async function buildStudentCardSvg(
  side: "front" | "back",
  data: StudentCardRenderData,
) {
  const projectLogo =
    (await localImageDataUri("/images/logo-forca-do-saber-transparent.png")) ??
    (await localImageDataUri("/images/logo-forca-do-saber.jpg")) ??
    "";
  const studentPhoto =
    (await localImageDataUri(data.photo)) ??
    (await localImageDataUri("/images/jose-augusto.jpeg")) ??
    "";

  const fullName = normalizeSpaces(data.fullName || "NOME DO ALUNO");
  const enrollment = normalizeSpaces(data.enrollment || "0000000");
  const course = normalizeSpaces(data.course || "CURSO");
  const unit = normalizeSpaces(data.unit || "Nova Guapimirim");
  const cardCode = normalizeSpaces(data.cardCode || "FS-000000");
  const validationCode = normalizeSpaces(
    resolveCardValidationCode(data.validationCode, data.cardCode) || cardCode,
  );
  const validationUrl = buildCardValidationUrl(validationCode);
  const qrDataUri = (await buildValidationQrDataUri(validationUrl)) ?? "";
  const responsibleName = normalizeSpaces(
    data.responsibleName || "José Augusto Oliveira Cordeiro",
  );
  const responsibleRole = normalizeSpaces(data.responsibleRole || "Responsável institucional");
  const issueDate = formatDate(data.issueDate);
  const validityDate = formatDate(data.validityDate);

  if (side === "front") {
    const stripWidth = 172;
    const dividerX = stripWidth;
    const contentX = stripWidth + 52;
    const contentWidth = CARD_WIDTH - contentX - SAFE_X;
    const centerX = Math.round(contentX + contentWidth / 2);
    const stripCenterX = Math.round(stripWidth / 2);
    const stripCenterY = Math.round(CARD_HEIGHT / 2);
    const logoSize = 122;
    const logoY = SAFE_Y;
    const logoX = Math.round(centerX - logoSize / 2);
    const headingProjectY = logoY + logoSize + 44;
    const headingTitleY = headingProjectY + 52;

    const unitText = fitTextBlock({
      text: unit,
      fallback: "Nova Guapimirim",
      maxWidth: contentWidth - 32,
      maxLines: 2,
      preferredFontSize: 50,
      minFontSize: 34,
      charFactor: 0.56,
      lineHeightRatio: 1.05,
    });
    const unitY = headingTitleY + 52;
    const unitHeight = unitText.fontSize + (unitText.lines.length - 1) * unitText.lineHeight;

    const photoWidth = 236;
    const photoHeight = 304;
    const photoX = Math.round(centerX - photoWidth / 2);
    const photoY = unitY + unitHeight + 46;

    const studentNameText = fitTextBlock({
      text: fullName,
      fallback: "NOME DO ALUNO",
      maxWidth: contentWidth - 56,
      maxLines: 2,
      preferredFontSize: 62,
      minFontSize: 34,
      charFactor: 0.61,
      lineHeightRatio: 1.13,
      uppercase: true,
    });
    const studentNameY = photoY + photoHeight + 96;
    const studentNameHeight =
      studentNameText.fontSize + (studentNameText.lines.length - 1) * studentNameText.lineHeight;

    const enrollmentLabelY = studentNameY + studentNameHeight + 80;
    const enrollmentValueText = fitTextBlock({
      text: enrollment,
      fallback: "0000000",
      maxWidth: contentWidth - 80,
      maxLines: 1,
      preferredFontSize: 52,
      minFontSize: 36,
      charFactor: 0.58,
      lineHeightRatio: 1.06,
    });
    const enrollmentValueY = enrollmentLabelY + 56;

    const courseLabelY = enrollmentValueY + 94;
    const courseText = fitTextBlock({
      text: course,
      fallback: "CURSO",
      maxWidth: contentWidth - 64,
      maxLines: 2,
      preferredFontSize: 48,
      minFontSize: 30,
      charFactor: 0.59,
      lineHeightRatio: 1.12,
      uppercase: true,
    });
    const courseY = courseLabelY + 56;
    const qrCardSize = 134;
    const qrImageSize = 112;
    const qrCardX = contentX + contentWidth - qrCardSize - 20;
    const qrCardY = CARD_HEIGHT - SAFE_Y - qrCardSize - 34;
    const qrImageX = qrCardX + Math.round((qrCardSize - qrImageSize) / 2);
    const qrImageY = qrCardY + 10;
    const qrLabelY = qrCardY + qrCardSize - 10;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
  <defs>
    <linearGradient id="goldStrip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#D6BF75"/>
      <stop offset="30%" stop-color="#F3E7BF"/>
      <stop offset="62%" stop-color="#B28E3A"/>
      <stop offset="100%" stop-color="#ECDCA8"/>
    </linearGradient>
    <linearGradient id="blackSurface" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#050505"/>
      <stop offset="100%" stop-color="#000000"/>
    </linearGradient>
  </defs>

  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="${CARD_RADIUS}" fill="#000000"/>
  <rect x="0" y="0" width="${stripWidth}" height="${CARD_HEIGHT}" fill="url(#goldStrip)"/>
  <rect x="${dividerX}" y="0" width="3" height="${CARD_HEIGHT}" fill="#E7DBB6" opacity="0.35"/>
  <rect x="${dividerX + 3}" y="0" width="${CARD_WIDTH - (dividerX + 3)}" height="${CARD_HEIGHT}" fill="url(#blackSurface)"/>

  <text x="${stripCenterX}" y="${stripCenterY}" text-anchor="middle" dominant-baseline="middle" transform="rotate(-90 ${stripCenterX} ${stripCenterY})" fill="#111111" opacity="0.56" font-size="84" font-family="Arial, sans-serif" font-weight="700" letter-spacing="1.6">CARTEIRÃO DE BENEFÍCIOS</text>

  <g>
    <rect x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" rx="${Math.round(logoSize / 2)}" fill="#000" stroke="#D2BF8A" stroke-opacity="0.4"/>
    <image href="${projectLogo}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid slice" clip-path="circle(${Math.round(logoSize / 2)}px at ${centerX}px ${Math.round(logoY + logoSize / 2)}px)"/>

    <text x="${centerX}" y="${headingProjectY}" text-anchor="middle" fill="#E7DBB6" opacity="0.88" font-size="22" font-family="Arial, sans-serif" letter-spacing="3.2">PROJETO</text>
    <text x="${centerX}" y="${headingTitleY}" text-anchor="middle" fill="#F5F2EA" font-size="56" font-family="Arial, sans-serif" font-weight="700" letter-spacing="0.8">FORÇA DO SABER</text>
    ${renderSvgTextBlock({
      x: centerX,
      y: unitY,
      lines: unitText.lines,
      fontSize: unitText.fontSize,
      lineHeight: unitText.lineHeight,
      fill: "#E7DBB6",
      fontFamily: "Georgia, serif",
      textAnchor: "middle",
      opacity: 0.92,
    })}

    <rect x="${photoX}" y="${photoY}" width="${photoWidth}" height="${photoHeight}" rx="24" fill="#111111" stroke="#E7DBB6" stroke-opacity="0.38"/>
    <image href="${studentPhoto}" x="${photoX}" y="${photoY}" width="${photoWidth}" height="${photoHeight}" preserveAspectRatio="xMidYMid slice" clip-path="inset(0 round 24px)"/>

    ${renderSvgTextBlock({
      x: centerX,
      y: studentNameY,
      lines: studentNameText.lines,
      fontSize: studentNameText.fontSize,
      lineHeight: studentNameText.lineHeight,
      fill: "#F5F2EA",
      fontFamily: "Arial, sans-serif",
      fontWeight: 800,
      textAnchor: "middle",
      letterSpacing: 0.4,
    })}

    <text x="${centerX}" y="${enrollmentLabelY}" text-anchor="middle" fill="#D2BF8A" font-size="24" font-family="Arial, sans-serif" font-weight="600" letter-spacing="2.8">MATRÍCULA</text>
    ${renderSvgTextBlock({
      x: centerX,
      y: enrollmentValueY,
      lines: enrollmentValueText.lines,
      fontSize: enrollmentValueText.fontSize,
      lineHeight: enrollmentValueText.lineHeight,
      fill: "#F5F2EA",
      fontFamily: "Arial, sans-serif",
      fontWeight: 700,
      textAnchor: "middle",
      letterSpacing: 0.5,
    })}

    <text x="${centerX}" y="${courseLabelY}" text-anchor="middle" fill="#D2BF8A" font-size="24" font-family="Arial, sans-serif" font-weight="600" letter-spacing="2.8">CURSO</text>
    ${renderSvgTextBlock({
      x: centerX,
      y: courseY,
      lines: courseText.lines,
      fontSize: courseText.fontSize,
      lineHeight: courseText.lineHeight,
      fill: "#F5F2EA",
      fontFamily: "Arial, sans-serif",
      fontWeight: 700,
      textAnchor: "middle",
      letterSpacing: 0.3,
    })}

    ${
      qrDataUri
        ? `
    <g>
      <rect x="${qrCardX}" y="${qrCardY}" width="${qrCardSize}" height="${qrCardSize}" rx="18" fill="#ffffff" fill-opacity="0.96" stroke="#D2BF8A" stroke-opacity="0.85"/>
      <image href="${qrDataUri}" x="${qrImageX}" y="${qrImageY}" width="${qrImageSize}" height="${qrImageSize}" preserveAspectRatio="xMidYMid meet"/>
      <text x="${qrCardX + qrCardSize / 2}" y="${qrLabelY}" text-anchor="middle" fill="#181818" font-size="15" font-family="Arial, sans-serif" font-weight="700" letter-spacing="1.4">VALIDAR</text>
    </g>
    `
        : ""
    }
  </g>
</svg>`;
  }

  const contentX = 124;
  const contentWidth = CARD_WIDTH - contentX - SAFE_X;
  const logoSize = 128;
  const logoX = CARD_WIDTH - SAFE_X - logoSize;
  const logoY = SAFE_Y + 8;
  const headerLeftMaxWidth = logoX - contentX - 38;

  const unitText = fitTextBlock({
    text: unit,
    fallback: "Nova Guapimirim",
    maxWidth: headerLeftMaxWidth,
    maxLines: 2,
    preferredFontSize: 56,
    minFontSize: 36,
    charFactor: 0.56,
    lineHeightRatio: 1.08,
  });
  const unitHeaderY = SAFE_Y + 146;
  const unitHeight = unitText.fontSize + (unitText.lines.length - 1) * unitText.lineHeight;

  const institutionalText = fitTextBlock({
    text: "Cartão virtual de identificação estudantil do Projeto Força do Saber. Documento institucional de uso pessoal e intransferível.",
    fallback:
      "Cartão virtual de identificação estudantil do Projeto Força do Saber. Documento institucional de uso pessoal e intransferível.",
    maxWidth: contentWidth - 88,
    maxLines: 3,
    preferredFontSize: 38,
    minFontSize: 30,
    charFactor: 0.54,
    lineHeightRatio: 1.3,
  });

  const descriptionY = Math.max(528, unitHeaderY + unitHeight + 92);
  const descriptionHeight = Math.max(
    238,
    institutionalText.lines.length * institutionalText.lineHeight + 86,
  );
  const infoBaseY = descriptionY + descriptionHeight + 116;

  const cardCodeText = fitTextBlock({
    text: cardCode,
    fallback: "FS-000000",
    maxWidth: contentWidth - 12,
    maxLines: 1,
    preferredFontSize: 50,
    minFontSize: 34,
    charFactor: 0.59,
    lineHeightRatio: 1.06,
  });

  const responsibleNameText = fitTextBlock({
    text: responsibleName,
    fallback: "José Augusto Oliveira Cordeiro",
    maxWidth: contentWidth - 6,
    maxLines: 2,
    preferredFontSize: 62,
    minFontSize: 36,
    charFactor: 0.6,
    lineHeightRatio: 1.12,
  });

  const responsibleRoleText = fitTextBlock({
    text: responsibleRole,
    fallback: "Responsável institucional",
    maxWidth: contentWidth - 6,
    maxLines: 2,
    preferredFontSize: 24,
    minFontSize: 18,
    charFactor: 0.6,
    lineHeightRatio: 1.16,
    uppercase: true,
  });

  const signatureLineY = 1436;
  const responsibleNameY = signatureLineY + 88;
  const responsibleNameHeight =
    responsibleNameText.fontSize +
    (responsibleNameText.lines.length - 1) * responsibleNameText.lineHeight;
  const signatureLabelY = responsibleNameY + responsibleNameHeight + 52;
  const responsibleRoleY = signatureLabelY + 44;
  const qrCardSize = 176;
  const qrImageSize = 144;
  const qrCardX = contentX + contentWidth - qrCardSize;
  const qrCardY = signatureLineY - qrCardSize - 96;
  const qrImageX = qrCardX + Math.round((qrCardSize - qrImageSize) / 2);
  const qrImageY = qrCardY + 12;
  const qrCaptionY = qrCardY + qrCardSize - 16;
  const validationText = fitTextBlock({
    text: validationCode,
    fallback: cardCode,
    maxWidth: contentWidth - qrCardSize - 30,
    maxLines: 2,
    preferredFontSize: 23,
    minFontSize: 17,
    charFactor: 0.58,
    lineHeightRatio: 1.14,
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" viewBox="0 0 ${CARD_WIDTH} ${CARD_HEIGHT}">
  <defs>
    <linearGradient id="backSurface" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1A1A1F"/>
      <stop offset="48%" stop-color="#121216"/>
      <stop offset="100%" stop-color="#0B0B0E"/>
    </linearGradient>
    <linearGradient id="diagGold" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F0E1B2"/>
      <stop offset="48%" stop-color="#C7A44F"/>
      <stop offset="100%" stop-color="#A9812F"/>
    </linearGradient>
  </defs>

  <rect width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="${CARD_RADIUS}" fill="url(#backSurface)"/>
  <polygon points="0,388 222,0 404,0 120,1386 0,1612" fill="url(#diagGold)" fill-opacity="0.96"/>
  <polygon points="0,546 262,0 334,0 88,1234 0,1362" fill="#E7DBB6" fill-opacity="0.34"/>

  <text x="${contentX}" y="${SAFE_Y + 28}" fill="#E7DBB6" opacity="0.88" font-size="24" font-family="Arial, sans-serif" letter-spacing="3.2">PROJETO</text>
  <text x="${contentX}" y="${SAFE_Y + 88}" fill="#F5F2EA" font-size="72" font-family="Arial, sans-serif" font-weight="700">FORÇA DO SABER</text>
  ${renderSvgTextBlock({
    x: contentX,
    y: unitHeaderY,
    lines: unitText.lines,
    fontSize: unitText.fontSize,
    lineHeight: unitText.lineHeight,
    fill: "#E7DBB6",
    fontFamily: "Georgia, serif",
    opacity: 0.93,
  })}

  <rect x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" rx="${Math.round(logoSize / 2)}" fill="#000" stroke="#E7DBB6" stroke-opacity="0.4"/>
  <image href="${projectLogo}" x="${logoX}" y="${logoY}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid slice" clip-path="circle(${Math.round(logoSize / 2)}px at ${Math.round(logoX + logoSize / 2)}px ${Math.round(logoY + logoSize / 2)}px)"/>

  <rect x="${contentX}" y="${descriptionY}" width="${contentWidth}" height="${descriptionHeight}" rx="26" fill="#000000" fill-opacity="0.32" stroke="#E7DBB6" stroke-opacity="0.3"/>
  ${renderSvgTextBlock({
    x: contentX + 44,
    y: descriptionY + 82,
    lines: institutionalText.lines,
    fontSize: institutionalText.fontSize,
    lineHeight: institutionalText.lineHeight,
    fill: "#F5F2EA",
    fontFamily: "Arial, sans-serif",
    opacity: 0.9,
  })}

  <text x="${contentX}" y="${infoBaseY}" fill="#D2BF8A" fill-opacity="0.82" font-size="30" font-family="Arial, sans-serif" letter-spacing="2.6">CÓDIGO</text>
  ${renderSvgTextBlock({
    x: contentX,
    y: infoBaseY + 52,
    lines: cardCodeText.lines,
    fontSize: cardCodeText.fontSize,
    lineHeight: cardCodeText.lineHeight,
    fill: "#F5F2EA",
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    letterSpacing: 0.6,
  })}

  <text x="${contentX}" y="${infoBaseY + 132}" fill="#D2BF8A" fill-opacity="0.82" font-size="30" font-family="Arial, sans-serif" letter-spacing="2.6">EMISSÃO</text>
  <text x="${contentX}" y="${infoBaseY + 180}" fill="#F5F2EA" font-size="44" font-family="Arial, sans-serif">${xmlEscape(issueDate)}</text>

  <text x="${contentX}" y="${infoBaseY + 260}" fill="#D2BF8A" fill-opacity="0.82" font-size="30" font-family="Arial, sans-serif" letter-spacing="2.6">VALIDADE</text>
  <text x="${contentX}" y="${infoBaseY + 308}" fill="#F5F2EA" font-size="44" font-family="Arial, sans-serif">${xmlEscape(validityDate)}</text>
  <text x="${contentX}" y="${infoBaseY + 388}" fill="#D2BF8A" fill-opacity="0.82" font-size="24" font-family="Arial, sans-serif" letter-spacing="1.8">TOKEN DE VALIDAÇÃO</text>
  ${renderSvgTextBlock({
    x: contentX,
    y: infoBaseY + 426,
    lines: validationText.lines,
    fontSize: validationText.fontSize,
    lineHeight: validationText.lineHeight,
    fill: "#E7DBB6",
    fontFamily: "Arial, sans-serif",
    fontWeight: 600,
    opacity: 0.85,
    letterSpacing: 0.4,
  })}

  ${
    qrDataUri
      ? `
  <g>
    <rect x="${qrCardX}" y="${qrCardY}" width="${qrCardSize}" height="${qrCardSize}" rx="18" fill="#ffffff" fill-opacity="0.97" stroke="#D2BF8A" stroke-opacity="0.9"/>
    <image href="${qrDataUri}" x="${qrImageX}" y="${qrImageY}" width="${qrImageSize}" height="${qrImageSize}" preserveAspectRatio="xMidYMid meet"/>
    <text x="${qrCardX + qrCardSize / 2}" y="${qrCaptionY}" text-anchor="middle" fill="#151515" font-size="17" font-family="Arial, sans-serif" font-weight="700" letter-spacing="1.4">VALIDAR</text>
  </g>
  `
      : ""
  }

  <line x1="${contentX}" y1="${signatureLineY}" x2="${contentX + contentWidth}" y2="${signatureLineY}" stroke="#E7DBB6" stroke-opacity="0.56" stroke-width="2"/>
  ${renderSvgTextBlock({
    x: contentX,
    y: responsibleNameY,
    lines: responsibleNameText.lines,
    fontSize: responsibleNameText.fontSize,
    lineHeight: responsibleNameText.lineHeight,
    fill: "#F5F2EA",
    fontFamily: "Georgia, serif",
    opacity: 0.94,
  })}
  <text x="${contentX}" y="${signatureLabelY}" fill="#D2BF8A" fill-opacity="0.82" font-size="27" font-family="Arial, sans-serif" letter-spacing="1.8">ASSINATURA RESPONSÁVEL</text>
  ${renderSvgTextBlock({
    x: contentX,
    y: responsibleRoleY,
    lines: responsibleRoleText.lines,
    fontSize: responsibleRoleText.fontSize,
    lineHeight: responsibleRoleText.lineHeight,
    fill: "#E7DBB6",
    fontFamily: "Arial, sans-serif",
    opacity: 0.64,
    letterSpacing: 1.6,
  })}
</svg>`;
}
