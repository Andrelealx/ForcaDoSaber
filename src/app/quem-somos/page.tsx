import type { Metadata } from "next";
import { ArrowRight, Compass, Eye, Lightbulb } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { values } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a origem, missão, visão e valores do Projeto Força do Saber em Guapimirim-RJ.",
};

export default function QuemSomosPage() {
  return (
    <section className="pb-24 pt-32">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Institucional"
          title="Origem, propósito e compromisso com Guapimirim"
          description="O Projeto Força do Saber nasceu para aproximar estudantes de oportunidades concretas e fortalecer o desenvolvimento social por meio da educação."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal className="gold-outline rounded-3xl border p-7">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Compass size={18} />
            </div>
            <h2 className="font-display text-3xl text-brand-champagne">Origem</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
              Iniciado com foco local, o projeto respondeu à necessidade de suporte
              estruturado para estudantes em busca de acesso ao ensino superior e
              crescimento profissional.
            </p>
          </Reveal>

          <Reveal delay={0.07} className="gold-outline rounded-3xl border p-7">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Lightbulb size={18} />
            </div>
            <h2 className="font-display text-3xl text-brand-champagne">Missão</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
              Transformar vidas por meio da educação, com orientação, acolhimento e
              oportunidades que aumentam autonomia e perspectivas de futuro.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="gold-outline rounded-3xl border p-7">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Eye size={18} />
            </div>
            <h2 className="font-display text-3xl text-brand-champagne">Visão</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
              Ser referência de impacto educacional em Guapimirim, conectando
              comunidade, parceiros e estudantes em uma rede de desenvolvimento.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="gold-outline mt-8 rounded-[2rem] border p-8 sm:p-10">
          <h3 className="font-display text-4xl text-brand-champagne">Valores</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {values.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white/84"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 text-center">
          <p className="mx-auto mb-5 max-w-3xl text-sm leading-relaxed text-brand-soft-white/82 sm:text-base">
            Nosso compromisso é manter uma atuação séria, transparente e orientada
            para resultados sociais duradouros, sempre com foco no potencial de cada
            estudante e no fortalecimento da comunidade local.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/historias" variant="secondary">
              Ler histórias do projeto
            </ButtonLink>
            <ButtonLink href="/contato" className="gap-2">
              Falar com o projeto
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
