import { clsx } from "clsx";

type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  const alignClasses =
    align === "center"
      ? "mx-auto max-w-3xl items-center text-center"
      : "max-w-3xl items-start text-left";

  return (
    <div className={clsx("mb-12 flex flex-col gap-4", alignClasses)}>
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-4xl leading-tight text-brand-champagne sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-brand-soft-white/85 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
