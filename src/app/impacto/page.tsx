import type { Metadata } from "next";
import { ArrowRight, Building2, GraduationCap, Users } from "lucide-react";
import { ImpactSection } from "@/components/sections/impact-section";
import { StudentGallerySection } from "@/components/sections/student-gallery-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { getHomeIndicators } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Impacto",
  description:
    "Aprofundamento dos indicadores e resultados do Projeto Força do Saber em Guapimirim.",
};

const impactContext = [
  {
    title: "Bolsas conquistadas",
    description:
      "Cada bolsa representa acesso real ao ensino superior e novas perspectivas de renda, autonomia e desenvolvimento para famílias inteiras.",
    icon: GraduationCap,
  },
  {
    title: "Rede de parceiros",
    description:
      "Empresas, instituições e lideranças locais ampliam o alcance do projeto com apoio, estrutura e oportunidades para os estudantes.",
    icon: Users,
  },
  {
    title: "Estrutura local",
    description:
      "A operação inclui o Centro de Ensino Gratuito, marco institucional que fortalece o acompanhamento contínuo da comunidade.",
    icon: Building2,
  },
];

export default async function ImpactoPage() {
  const indicators = await getHomeIndicators();

  return (
    <>
      <section className="pb-16 pt-32">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
              Indicadores e resultados
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
              Impacto do Força do Saber em Guapimirim
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
              Nesta página, os principais números da iniciativa ganham contexto para
              mostrar como a atuação institucional se traduz em transformação social.
            </p>
          </Reveal>
        </div>
      </section>

      <ImpactSection metrics={indicators} />

      <section className="py-16">
        <div className="section-shell">
          <div className="grid gap-5 md:grid-cols-3">
            {impactContext.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={index * 0.06}
                  className="gold-outline rounded-3xl border p-7"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                    <Icon size={18} />
                  </div>
                  <h2 className="font-display text-3xl text-brand-champagne">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                    {item.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <StudentGallerySection
        folderName="formaturas"
        eyebrow="Resultados em campo"
        title="Conquistas acadêmicas que evidenciam o impacto"
        description="Registros de formaturas e marcos reais dos estudantes acompanhados pelo projeto."
        autoCaptionPrefix="Conquista"
      />

      <section className="pb-24">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 text-center sm:p-10">
            <h2 className="font-display text-4xl text-brand-champagne sm:text-5xl">
              Quer fortalecer esses resultados?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              A continuidade do impacto depende de novas parcerias, apoiadores e
              conexões com oportunidades educacionais.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink href="/parceiros" variant="secondary">
                Conhecer frentes de parceria
              </ButtonLink>
              <ButtonLink href="/contato" className="gap-2">
                Quero apoiar o projeto
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
