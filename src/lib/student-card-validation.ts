export function resolvePublicSiteUrl(preferredBaseUrl?: string | null) {
  const configured =
    preferredBaseUrl?.trim() ||
    process.env.CARD_VALIDATION_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.PUBLIC_SITE_URL?.trim() ||
    "";
  const base = configured || "http://localhost:3000";
  return base.replace(/\/+$/, "");
}

export function resolveCardValidationCode(
  validationToken?: string | null,
  cardCode?: string | null,
) {
  const token = validationToken?.trim();
  if (token) return token;
  return cardCode?.trim() || "";
}

export function buildCardValidationUrl(code: string, preferredBaseUrl?: string | null) {
  const safeCode = encodeURIComponent(code.trim());
  return `${resolvePublicSiteUrl(preferredBaseUrl)}/cartao/validar/${safeCode}`;
}
