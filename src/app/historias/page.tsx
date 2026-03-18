import type { Metadata } from "next";
import { ArrowRight, BookHeart } from "lucide-react";
import { StudentGallerySection } from "@/components/sections/student-gallery-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import {
  bibleVerse,
  freeLearningCenterStory,
  joseProjectStory,
  joseRootsStory,
  studentTestimonials,
} from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Histórias e Depoimentos",
  description:
    "Conheça as histórias de alunos e a trajetória do Projeto Força do Saber em Guapimirim.",
};

export default function HistoriasPage() {
  return (
    <>
      <section className="pb-16 pt-32">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/35 bg-brand-gold/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-brand-champagne">
              <BookHeart size={14} />
              Depoimentos que inspiram
            </span>
            <h1 className="mt-4 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
              Histórias reais de transformação
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
              Este espaço reúne relatos de alunos e marcos da trajetória de José
              Augusto no Projeto Força do Saber. Cada história reforça o impacto da
              educação na construção de um futuro mais justo em Guapimirim.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="A jornada dos alunos"
            title="Depoimentos"
            description="Relatos de superação, fé, apoio familiar e conquista acadêmica."
          />

          <div className="space-y-6">
            {studentTestimonials.map((student, index) => (
              <Reveal
                key={student.name}
                delay={index * 0.06}
                className="gold-outline rounded-[2rem] border p-8 sm:p-10"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-brand-beige/75">
                  {student.title}
                </p>
                <h2 className="mt-2 font-display text-4xl text-brand-champagne">
                  {student.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/85 sm:text-base">
                  {student.summary}
                </p>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                  {student.story.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <blockquote className="mt-5 rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-4 text-sm text-brand-beige/90">
                  {student.quote}
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="José Augusto"
            title="Minhas raízes e primeiros sonhos"
            description="Origens, desafios e o despertar da educação como caminho de transformação."
          />
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="space-y-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              {joseRootsStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Projeto Força do Saber"
            title="De iniciativa local a movimento transformador"
            description="A construção do projeto, as primeiras bolsas e a expansão do impacto social."
          />
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="space-y-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              {joseProjectStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-divider py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Centro de Ensino Gratuito"
            title="Um marco para Guapimirim"
            description="Estrutura, visão e propósito de longo prazo para ampliar oportunidades educacionais."
          />
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="space-y-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              {freeLearningCenterStory.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <blockquote className="mt-6 rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-5">
              <p className="text-sm leading-relaxed text-brand-beige/90">{bibleVerse.quote}</p>
              <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-brand-champagne">
                {bibleVerse.reference}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <StudentGallerySection />

      <section className="pb-24">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 text-center sm:p-10">
            <h2 className="font-display text-4xl text-brand-champagne sm:text-5xl">
              Faça parte dessa transformação
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              O Projeto Força do Saber segue crescendo com apoio da comunidade,
              instituições e parceiros comprometidos com educação de qualidade.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contato" className="mx-auto w-fit gap-2">
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
