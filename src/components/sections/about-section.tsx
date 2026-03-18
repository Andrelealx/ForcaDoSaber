import { MapPin, Target } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { values } from "@/lib/site-data";

export function AboutSection() {
  return (
    <section id="quem-somos" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Resumo institucional"
          title="Quem somos"
          description="Nascido em Guapimirim-RJ, o Projeto Força do Saber amplia o acesso à educação, fortalece trajetórias estudantis e gera transformação social com acolhimento, orientação e parcerias estratégicas."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="gold-outline rounded-3xl border p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-champagne">
              <MapPin size={14} />
              Atuação em Guapimirim
            </div>
            <p className="text-base leading-relaxed text-brand-soft-white/86">
              O projeto foi criado para responder a desafios reais da comunidade
              local, conectando estudantes a recursos, orientação e oportunidades.
              A iniciativa dialoga com famílias, escolas, parceiros e lideranças
              para consolidar uma rede de suporte educacional consistente.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="gold-outline rounded-3xl border p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-champagne">
              <Target size={14} />
              Missão, visão e valores
            </div>
            <ul className="space-y-3">
              {values.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-brand-gold/20 bg-brand-black/40 px-4 py-3 text-sm leading-relaxed text-brand-soft-white/84"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
