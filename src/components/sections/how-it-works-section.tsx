import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { howItWorksSteps } from "@/lib/site-data";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Como funciona"
          title="Estrutura de apoio que acompanha cada estudante"
          description="O Força do Saber organiza o processo em etapas claras para garantir orientação, acompanhamento e acesso a oportunidades de forma humana e eficiente."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {howItWorksSteps.map((step, index) => (
            <Reveal
              key={step.title}
              delay={index * 0.05}
              className="gold-outline h-full rounded-3xl border p-6"
            >
              <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/50 bg-brand-gold/12 text-brand-champagne">
                <CheckCircle2 size={16} />
              </div>
              <h3 className="font-display text-3xl text-brand-champagne">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/82">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
