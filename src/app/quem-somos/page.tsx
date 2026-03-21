import type { Metadata } from "next";
import { ArrowRight, Compass, Eye, Lightbulb } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { getPageBlock } from "@/lib/content-service";
import {
  founderBiography,
  founderPillars,
  freeLearningCenterStory,
  joseProjectStory,
  values as fallbackValues,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a origem, missão, visão, valores e legado institucional do Projeto Força do Saber em Guapimirim-RJ.",
};

export default async function QuemSomosPage() {
  const [historyBlock, missionBlock, visionBlock, valuesBlock] = await Promise.all([
    getPageBlock("quem-somos.historia"),
    getPageBlock("quem-somos.missao"),
    getPageBlock("quem-somos.visao"),
    getPageBlock("quem-somos.valores"),
  ]);

  const historyParagraphs =
    historyBlock?.body?.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean) ??
    joseProjectStory;
  const valuesList =
    valuesBlock?.body
      ?.split("\n")
      .map((item) => item.trim())
      .filter(Boolean) ?? fallbackValues;

  return (
    <>
      <section className="pb-16 pt-32">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
              Institucional
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
              Origem, propósito e compromisso com Guapimirim
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
              Esta página apresenta a base institucional do Força do Saber: como o
              projeto nasceu, o que orienta sua atuação e qual legado está sendo
              construído por meio da educação.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell grid gap-6 lg:grid-cols-3">
          <Reveal className="gold-outline rounded-3xl border p-7">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Compass size={18} />
            </div>
            <h2 className="font-display text-3xl text-brand-champagne">Origem</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
              O projeto nasceu para responder a desafios reais de acesso e permanência
              educacional de estudantes de Guapimirim.
            </p>
          </Reveal>

          <Reveal delay={0.07} className="gold-outline rounded-3xl border p-7">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Lightbulb size={18} />
            </div>
            <h2 className="font-display text-3xl text-brand-champagne">Missão</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
              {missionBlock?.body ??
                "Transformar vidas com orientação, acolhimento e oportunidades que ampliem autonomia, dignidade e futuro."}
            </p>
          </Reveal>

          <Reveal delay={0.14} className="gold-outline rounded-3xl border p-7">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Eye size={18} />
            </div>
            <h2 className="font-display text-3xl text-brand-champagne">Visão</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
              {visionBlock?.body ??
                "Ser uma referência regional de impacto educacional com resultados sociais consistentes e atuação institucional séria."}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-divider py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Valores"
            title={valuesBlock?.title ?? "Princípios que orientam cada decisão"}
            description={
              valuesBlock?.subtitle ??
              "A atuação do projeto é guiada por compromisso social, responsabilidade institucional e foco em transformação real."
            }
          />

          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <ul className="grid gap-3 sm:grid-cols-2">
              {valuesList.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white/84"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="História institucional"
            title={historyBlock?.title ?? "Trajetória do Projeto Força do Saber"}
            description={
              historyBlock?.subtitle ??
              "Da criação em 2020 à estruturação do Centro de Ensino Gratuito, o projeto evoluiu com foco em oportunidades concretas para a cidade."
            }
          />

          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="space-y-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              {historyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-5">
              <h3 className="font-display text-3xl text-brand-champagne">
                Marco estrutural: Centro de Ensino Gratuito
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                {freeLearningCenterStory[0]} {freeLearningCenterStory[1]}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-divider py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Legado"
            title="José Augusto e a construção do projeto"
            description="Liderança local comprometida com educação como ferramenta de transformação social."
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
                {founderBiography.map((paragraph) => (
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

      <section className="pb-24">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 text-center sm:p-10">
            <p className="mx-auto mb-5 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              Para conhecer histórias de alunos e conquistas individuais, acesse a
              página de Histórias. Para apoiar a continuidade da iniciativa, fale
              com nossa equipe.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/historias" variant="secondary">
                Ver histórias dos alunos
              </ButtonLink>
              <ButtonLink href="/contato" className="gap-2">
                Falar com o projeto
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
