import { Quote } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { studentTestimonials, type StudentTestimonial } from "@/lib/site-data";

type TestimonialsPreviewSectionProps = {
  featuredStory?: StudentTestimonial | null;
};

export function TestimonialsPreviewSection({
  featuredStory: featuredStoryProp,
}: TestimonialsPreviewSectionProps) {
  const featuredStory = featuredStoryProp ?? studentTestimonials[0];

  if (!featuredStory) {
    return null;
  }

  return (
    <section id="depoimentos" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="História em destaque"
          title="Uma trajetória real de transformação"
          description="Conheça um relato de quem teve a trajetória acadêmica fortalecida pelo Projeto Força do Saber."
        />

        <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
          <div className="grid items-center gap-6 lg:grid-cols-[0.34fr_0.66fr]">
            <div className="relative overflow-hidden rounded-2xl border border-brand-gold/25">
              <div className="relative aspect-[4/5]">
                <Image
                  src={featuredStory.primaryPhoto.src}
                  alt={featuredStory.primaryPhoto.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 34vw"
                />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-brand-beige/75">
                {featuredStory.title}
              </p>
              <h3 className="mt-2 font-display text-4xl leading-tight text-brand-champagne sm:text-5xl">
                {featuredStory.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-soft-white/86 sm:text-base">
                {featuredStory.summary}
              </p>
              <blockquote className="mt-5 rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-4 text-sm leading-relaxed text-brand-beige/90">
                <span className="mb-2 inline-flex items-center gap-2 uppercase tracking-[0.12em] text-brand-champagne">
                  <Quote size={14} />
                  Depoimento
                </span>
                <p>{featuredStory.quote}</p>
              </blockquote>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-8 text-center">
          <ButtonLink href="/historias" className="mx-auto w-fit">
            Ver todas as histórias
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
