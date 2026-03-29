function normalizeUrlBase(rawValue?: string | null) {
  const value = rawValue?.trim();
  if (!value) return null;

  const valueWithProtocol = /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`;

  try {
    const parsed = new URL(valueWithProtocol);
    if (!["http:", "https:"].includes(parsed.protocol)) return null;
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return null;
  }
}

function isInternalHost(baseUrl: string) {
  try {
    const host = new URL(baseUrl).hostname.toLowerCase();
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "::1" ||
      host.endsWith(".internal") ||
      host.endsWith(".local")
    );
  } catch {
    return false;
  }
}

function isAllowedPublicBase(baseUrl: string) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }
  return !isInternalHost(baseUrl);
}

export function resolvePublicBaseUrlFromHeaders(headers: Headers) {
  const forwardedHost = headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const host = forwardedHost || headers.get("host")?.split(",")[0]?.trim();

  if (host) {
    const protocol =
      forwardedProto ||
      (host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
    return `${protocol}://${host}`;
  }

  return null;
}

export function resolveRequestPublicBaseUrl(request: Request) {
  return resolvePublicBaseUrlFromHeaders(request.headers) || new URL(request.url).origin;
}

export function resolvePublicSiteUrl(preferredBaseUrl?: string | null) {
  const candidates = [
    process.env.CARD_VALIDATION_BASE_URL,
    preferredBaseUrl,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.PUBLIC_SITE_URL,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeUrlBase(candidate);
    if (normalized && isAllowedPublicBase(normalized)) {
      return normalized.replace(/\/+$/, "");
    }
  }

  if (process.env.NODE_ENV === "production") {
    return "https://forcadosaber.com.br";
  }

  return "http://localhost:3000";
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
