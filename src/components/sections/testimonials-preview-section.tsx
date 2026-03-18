import { Quote } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { studentTestimonials } from "@/lib/site-data";

export function TestimonialsPreviewSection() {
  return (
    <section id="depoimentos" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Depoimentos que inspiram"
          title="A jornada dos alunos"
          description="Histórias reais de superação, apoio e transformação por meio da educação."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {studentTestimonials.map((student, index) => (
            <Reveal
              key={student.name}
              delay={index * 0.08}
              className="gold-outline rounded-[2rem] border p-8 sm:p-10"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-brand-beige/75">
                {student.title}
              </p>
              <h3 className="mt-2 font-display text-4xl leading-tight text-brand-champagne">
                {student.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-soft-white/86">
                {student.summary}
              </p>

              <blockquote className="mt-5 rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-4 text-sm leading-relaxed text-brand-beige/90">
                <span className="mb-2 inline-flex items-center gap-2 uppercase tracking-[0.12em] text-brand-champagne">
                  <Quote size={14} />
                  Frase de vida
                </span>
                <p>{student.quote}</p>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8 text-center">
          <ButtonLink href="/historias" className="mx-auto w-fit">
            Ler histórias completas
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
