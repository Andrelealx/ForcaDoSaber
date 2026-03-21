import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, GraduationCap, ListChecks } from "lucide-react";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import {
  operationalBenefits,
  operationalFaqItems,
  operationalMethodology,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Como Funciona",
  description:
    "Entenda como o Projeto Força do Saber orienta estudantes, aplica critérios e acompanha trajetórias educacionais em Guapimirim.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="pb-16 pt-32">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
              Fluxo operacional
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
              Como o Força do Saber apoia cada estudante
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
              Esta página reúne critérios, etapas e metodologia de acompanhamento.
              O objetivo é garantir orientação clara, processo justo e apoio
              contínuo para avanços acadêmicos reais.
            </p>
          </Reveal>
        </div>
      </section>

      <HowItWorksSection />

      <section id="apoio-estudante" className="section-divider py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Apoio ao estudante"
            title="Metodologia de acompanhamento"
            description="A atuação combina acolhimento, organização de metas e acompanhamento contínuo para fortalecer permanência e evolução acadêmica."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {operationalMethodology.map((item, index) => (
              <Reveal
                key={item}
                delay={index * 0.05}
                className="gold-outline rounded-3xl border p-6"
              >
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                  <ListChecks size={16} />
                </div>
                <p className="text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                  {item}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="orientacao-educacional" className="py-16">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <GraduationCap size={18} />
            </div>
            <h2 className="font-display text-4xl text-brand-champagne">
              Benefícios para a jornada acadêmica
            </h2>
            <ul className="mt-5 space-y-3">
              {operationalBenefits.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3 text-sm leading-relaxed text-brand-soft-white/84"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <CheckCircle2 size={18} />
            </div>
            <h2 className="font-display text-4xl text-brand-champagne">Perguntas frequentes</h2>
            <div className="mt-5 space-y-4">
              {operationalFaqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-4"
                >
                  <h3 className="text-sm font-semibold text-brand-champagne">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-soft-white/82">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6">
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
