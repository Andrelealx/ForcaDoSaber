import { ArrowRight, Landmark } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

type FounderLegacyCalloutSectionProps = {
  content?: {
    title?: string | null;
    subtitle?: string | null;
    ctaPrimaryLabel?: string | null;
    ctaPrimaryHref?: string | null;
  } | null;
};

export function FounderLegacyCalloutSection({ content }: FounderLegacyCalloutSectionProps) {
  const title = content?.title ?? "Inspirado pelo legado de José Augusto";
  const subtitle =
    content?.subtitle ??
    "Uma liderança local que transformou compromisso social em uma iniciativa educacional com impacto real em Guapimirim.";
  const ctaLabel = content?.ctaPrimaryLabel ?? "Conhecer esse legado";
  const ctaHref = content?.ctaPrimaryHref ?? "/o-projeto#legado-jose-augusto";

  return (
    <section className="py-14" id="legado-jose-augusto-home">
      <div className="section-shell">
        <Reveal className="gold-outline rounded-[2rem] border p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-brand-champagne">
                <Landmark size={14} />
                Legado institucional
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-brand-champagne sm:text-5xl">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                {subtitle}
              </p>
            </div>

            <div className="shrink-0">
              <ButtonLink href={ctaHref} variant="secondary" className="gap-2">
                {ctaLabel}
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
