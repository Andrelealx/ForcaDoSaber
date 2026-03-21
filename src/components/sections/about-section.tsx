import { ArrowRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";

type AboutSectionProps = {
  content?: {
    title?: string | null;
    subtitle?: string | null;
    body?: string | null;
    ctaPrimaryLabel?: string | null;
    ctaPrimaryHref?: string | null;
  } | null;
};

export function AboutSection({ content }: AboutSectionProps) {
  const title = content?.title ?? "Uma iniciativa institucional de educação e mobilidade social";
  const subtitle =
    content?.subtitle ??
    "O projeto atua em Guapimirim para aproximar estudantes de orientação educacional, bolsas e oportunidades concretas. Com trabalho contínuo e rede de apoio local, fortalece trajetórias acadêmicas e amplia perspectivas para famílias e comunidade.";
  const body =
    content?.body ??
    "O Força do Saber nasceu para responder a desafios reais do território: apoiar quem quer estudar, reduzir barreiras e conectar pessoas a caminhos de crescimento. A página institucional apresenta a origem, o propósito e o legado completo do projeto.";
  const ctaLabel = content?.ctaPrimaryLabel ?? "Ver Quem Somos";
  const ctaHref = content?.ctaPrimaryHref ?? "/quem-somos";

  return (
    <section id="quem-somos" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="O que é o Força do Saber"
          title={title}
          description={subtitle}
        />

        <Reveal className="gold-outline max-w-4xl rounded-3xl border p-8 sm:p-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-champagne">
            <MapPin size={14} />
            Atuação em Guapimirim - RJ
          </div>
          <p className="text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
            {body}
          </p>
          <div className="mt-6">
            <ButtonLink href={ctaHref} variant="secondary" className="gap-2">
              {ctaLabel}
              <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
