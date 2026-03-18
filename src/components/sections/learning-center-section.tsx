import { Building2 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { bibleVerse, freeLearningCenterStory } from "@/lib/site-data";

export function LearningCenterSection() {
  return (
    <section className="section-divider py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Centro de Ensino Gratuito"
          title="Estrutura real para ampliar oportunidades em Guapimirim"
          description="Inaugurado em 2025, o Centro de Ensino Gratuito fortalece o compromisso do projeto com capacitação, acolhimento e desenvolvimento social."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Building2 size={18} />
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-brand-soft-white/86 sm:text-base">
              {freeLearningCenterStory.slice(0, 3).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <h3 className="font-display text-4xl text-brand-champagne">Propósito que permanece</h3>
            <p className="mt-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              A visão de construir um espaço gratuito de ensino foi amadurecida ao
              longo dos anos e hoje se tornou um legado concreto para a cidade.
            </p>

            <blockquote className="mt-6 rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-5">
              <p className="text-sm leading-relaxed text-brand-beige/90">{bibleVerse.quote}</p>
              <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-brand-champagne">
                {bibleVerse.reference}
              </footer>
            </blockquote>

            <div className="mt-6">
              <ButtonLink href="/historias">Ler história completa</ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
