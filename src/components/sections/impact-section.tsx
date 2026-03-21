import { ChartNoAxesCombined } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { impactHighlights, impactMetrics } from "@/lib/site-data";

type ImpactSectionProps = {
  compact?: boolean;
  metrics?: Array<{
    value: number;
    suffix: string;
    label: string;
  }>;
};

export function ImpactSection({ compact = false, metrics }: ImpactSectionProps) {
  const data = metrics && metrics.length > 0 ? metrics : impactMetrics;

  return (
    <section id="impacto" className="section-divider py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Impacto social"
          title={
            compact
              ? "Impacto em números"
              : "Indicadores de transformação em movimento"
          }
          description={
            compact
              ? "Resultados principais que mostram a consistência da atuação do Força do Saber."
              : "A iniciativa cresce com base em acompanhamento contínuo, parcerias e compromisso com resultados que fortalecem estudantes e comunidade."
          }
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {data.map((metric, index) => (
            <Reveal
              key={metric.label}
              delay={index * 0.05}
              className="gold-outline rounded-3xl border p-6"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-beige/80">
                Indicador
              </p>
              <p className="font-display text-5xl leading-none text-brand-champagne">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </p>
              <p className="mt-3 text-sm text-brand-soft-white/85">{metric.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/70">
            Indicadores institucionais em atualização contínua.
          </p>
          {compact ? (
            <ButtonLink href="/impacto" variant="secondary">
              Ver impacto completo
            </ButtonLink>
          ) : null}
        </div>

        {!compact ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {impactHighlights.map((item, index) => (
              <Reveal
                key={item.title}
                delay={0.1 + index * 0.08}
                className="gold-outline rounded-3xl border p-7"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                  <ChartNoAxesCombined size={18} />
                </div>
                <h3 className="font-display text-3xl text-brand-champagne">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/82">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
