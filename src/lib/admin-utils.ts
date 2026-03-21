export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function formBoolean(value: FormDataEntryValue | null) {
  if (!value) return false;
  return value === "on" || value === "true" || value === "1";
}

export function formString(value: FormDataEntryValue | null) {
  if (!value) return "";
  return String(value).trim();
}

export function formOptionalString(value: FormDataEntryValue | null) {
  const parsed = formString(value);
  return parsed.length > 0 ? parsed : null;
}

export function formInt(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number.parseInt(formString(value), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function formOptionalDate(value: FormDataEntryValue | null) {
  const raw = formString(value);
  if (!raw) return null;
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function linesToArray(value: FormDataEntryValue | null) {
  return formString(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
