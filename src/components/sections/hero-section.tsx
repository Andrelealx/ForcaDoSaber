import { ArrowRight, CheckCircle2, Handshake } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { credibilityPillars } from "@/lib/site-data";

type HeroSectionProps = {
  content?: {
    title?: string | null;
    subtitle?: string | null;
    ctaPrimaryLabel?: string | null;
    ctaPrimaryHref?: string | null;
    ctaSecondaryLabel?: string | null;
    ctaSecondaryHref?: string | null;
  } | null;
};

export function HeroSection({ content }: HeroSectionProps) {
  const title =
    content?.title ?? "Educação que abre caminhos reais para estudantes de Guapimirim";
  const subtitle =
    content?.subtitle ??
    "O Força do Saber conecta estudantes a orientação, bolsas e oportunidades para transformar trajetórias com seriedade e presença local.";
  const ctaPrimaryLabel = content?.ctaPrimaryLabel ?? "Conheça o projeto";
  const ctaPrimaryHref = content?.ctaPrimaryHref ?? "/quem-somos";
  const ctaSecondaryLabel = content?.ctaSecondaryLabel ?? "Quero apoiar";
  const ctaSecondaryHref = content?.ctaSecondaryHref ?? "/contato";

  return (
    <section id="inicio" className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
        <div className="absolute right-10 top-28 h-64 w-64 rounded-full border border-brand-gold/20" />
        <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full border border-brand-champagne/10" />
      </div>

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="space-y-8">
          <span className="inline-flex rounded-full border border-brand-gold/35 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">
            Educação com impacto real
          </span>
          <div className="space-y-6">
            <h1 className="font-display text-5xl leading-tight text-brand-soft-white sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-brand-soft-white/85 sm:text-xl">
              {subtitle}
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {credibilityPillars.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-brand-beige/90"
                >
                  <CheckCircle2 size={16} className="text-brand-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <ButtonLink href={ctaPrimaryHref} className="group gap-2">
              {ctaPrimaryLabel}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href={ctaSecondaryHref} variant="secondary" className="gap-2">
              <Handshake size={16} />
              {ctaSecondaryLabel}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="gold-outline relative overflow-hidden rounded-[2rem] border p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-beige/70 to-transparent" />
            <div className="mx-auto w-fit rounded-full border border-brand-gold/50 bg-brand-black/65 p-3">
              <Image
                src="/images/logo-forca-do-saber.jpg"
                alt="Logo oficial do Projeto Força do Saber"
                width={180}
                height={180}
                className="h-36 w-36 rounded-full border border-brand-gold/50 object-cover sm:h-40 sm:w-40"
                priority
              />
            </div>

            <div className="mt-8 space-y-4 text-center">
              <p className="font-display text-3xl text-brand-champagne">
                Projeto Força do Saber
              </p>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-beige/80">
                Nova Guapimirim
              </p>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-brand-soft-white/80">
                Iniciativa educacional com atuação contínua, compromisso comunitário
                e foco em resultados concretos.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
