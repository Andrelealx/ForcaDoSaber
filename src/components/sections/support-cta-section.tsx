import { ArrowRight, Handshake, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";

type SupportCtaSectionProps = {
  content?: {
    title?: string | null;
    subtitle?: string | null;
    ctaPrimaryLabel?: string | null;
    ctaPrimaryHref?: string | null;
    ctaSecondaryLabel?: string | null;
    ctaSecondaryHref?: string | null;
  } | null;
};

export function SupportCtaSection({ content }: SupportCtaSectionProps) {
  const title = content?.title ?? "Sua participação amplia oportunidades reais";
  const subtitle =
    content?.subtitle ??
    "Empresas, instituições e apoiadores individuais podem fortalecer bolsas, orientação e estrutura para estudantes de Guapimirim.";
  const ctaPrimaryLabel = content?.ctaPrimaryLabel ?? "Quero apoiar";
  const ctaPrimaryHref = content?.ctaPrimaryHref ?? "/contato";
  const ctaSecondaryLabel = content?.ctaSecondaryLabel ?? "Quero ser parceiro";
  const ctaSecondaryHref = content?.ctaSecondaryHref ?? "/parceiros";

  return (
    <section className="section-divider py-24" id="apoiar">
      <div className="section-shell">
        <Reveal className="gold-outline rounded-[2rem] border p-8 text-center sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-champagne">
            Apoio e parceria
          </p>
          <h2 className="mt-3 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
            {subtitle}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={ctaPrimaryHref} className="gap-2">
              <MessageCircle size={16} />
              {ctaPrimaryLabel}
            </ButtonLink>
            <ButtonLink href={ctaSecondaryHref} variant="secondary" className="gap-2">
              <Handshake size={16} />
              {ctaSecondaryLabel}
            </ButtonLink>
            <ButtonLink href="/contato" variant="secondary" className="gap-2">
              Entrar em contato
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
