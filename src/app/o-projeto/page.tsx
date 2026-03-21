import type { Metadata } from "next";
import { ArrowRight, Compass, GraduationCap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { getPageBlock } from "@/lib/content-service";
import { founderBiography, founderPillars, howItWorksSteps, values } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "O Projeto",
  description:
    "Visão institucional e método de atuação do Força do Saber em uma estrutura única de navegação.",
};

const projectPillars = [
  {
    title: "Identidade institucional",
    description:
      "Contexto de criação, missão, visão, valores e trajetória do Força do Saber no território.",
    href: "/quem-somos",
    cta: "Ver Quem Somos",
    icon: ShieldCheck,
  },
  {
    title: "Método de atuação",
    description:
      "Critérios, etapas e acompanhamento prático para orientar estudantes com consistência.",
    href: "/como-funciona",
    cta: "Ver Como Funciona",
    icon: GraduationCap,
  },
];

export default async function OProjetoPage() {
  const legacyBlock = await getPageBlock("o-projeto.jose-legacy");
  const legacyTitle = legacyBlock?.title ?? "Legado de José Augusto";
  const legacySubtitle =
    legacyBlock?.subtitle ??
    "A liderança de José Augusto é parte central da origem, identidade e continuidade institucional do Força do Saber.";
  const legacyParagraphs =
    legacyBlock?.body?.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean) ??
    founderBiography;

  return (
    <>
      <section className="pb-16 pt-32">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
              O Projeto
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
              Visão institucional e método em uma navegação unificada
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
              Esta página organiza os dois pilares centrais do Força do Saber: a base
              institucional do projeto e a forma como o apoio ao estudante é colocado em prática.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-divider py-16" id="legado-jose-augusto">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Fundação e legado"
            title={legacyTitle}
            description={legacySubtitle}
          />

          <div className="grid gap-6 lg:grid-cols-[0.36fr_0.64fr]">
            <Reveal className="gold-outline overflow-hidden rounded-[2rem] border p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-brand-gold/25">
                <Image
                  src="/images/jose-augusto.jpeg"
                  alt="José Augusto, idealizador do Projeto Força do Saber"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 36vw"
                />
              </div>
            </Reveal>

            <Reveal delay={0.08} className="gold-outline rounded-[2rem] border p-8 sm:p-10">
              <div className="space-y-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                {legacyParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {founderPillars.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-xs leading-relaxed text-brand-soft-white/84 sm:text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-2">
            {projectPillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.08}
                  className="gold-outline rounded-[2rem] border p-7 sm:p-8"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                    <Icon size={18} />
                  </div>
                  <h2 className="font-display text-4xl text-brand-champagne">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                    {item.description}
                  </p>
                  <div className="mt-6">
                    <ButtonLink href={item.href} variant="secondary" className="gap-2">
                      {item.cta}
                      <ArrowRight size={16} />
                    </ButtonLink>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-divider py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Princípios do projeto"
            title="Valores que sustentam a atuação institucional"
            description="Compromissos permanentes que orientam decisões, relacionamento comunitário e qualidade de execução."
          />

          <div className="grid gap-3 sm:grid-cols-2">
            {values.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 0.04}
                className="rounded-2xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white/84"
              >
                {item}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Etapas operacionais"
            title="Como o acompanhamento é estruturado"
            description="Resumo de etapas do método aplicado com estudantes de Guapimirim."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {howItWorksSteps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 0.05}
                className="gold-outline rounded-2xl border p-6"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                  <Compass size={16} />
                </div>
                <h3 className="font-display text-3xl text-brand-champagne">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-soft-white/84">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
