import { Award, Quote, UserRound } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { founderBiography, founderPillars } from "@/lib/site-data";

export function FounderSection() {
  return (
    <section id="fundador" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Liderança"
          title="José Augusto"
          description="Idealizador do Projeto Força do Saber e referência de compromisso com educação, impacto local e desenvolvimento humano em Guapimirim."
        />

        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="relative">
            <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-brand-gold/35 bg-brand-gold/10 blur-xl" />
            <div className="gold-outline rounded-[2rem] border p-4">
              <Image
                src="/images/jose-augusto.jpeg"
                alt="José Augusto, idealizador do Projeto Força do Saber"
                width={853}
                height={1280}
                className="h-[420px] w-full rounded-[1.5rem] border border-brand-gold/35 bg-[#0c0c0c] object-contain sm:h-[560px]"
                priority
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/45 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-champagne">
                <UserRound size={14} />
                Nome em destaque
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/45 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-champagne">
                <Award size={14} />
                Idealizador do Projeto Força do Saber
              </span>
            </div>

            <h3 className="font-display text-5xl text-brand-champagne sm:text-6xl">
              José Augusto
            </h3>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-brand-beige/78">
              Idealizador do Projeto Força do Saber
            </p>

            <blockquote className="mt-6 rounded-2xl border border-brand-gold/28 bg-brand-black/45 p-5">
              <p className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.14em] text-brand-beige/78">
                <Quote size={16} className="text-brand-champagne" />
                Compromisso de liderança
              </p>
              <p className="mt-3 font-display text-3xl leading-tight text-brand-champagne">
                Educação com propósito, direção e impacto real na vida das pessoas.
              </p>
            </blockquote>

            <div className="mt-7 space-y-4 text-sm leading-relaxed text-brand-soft-white/85 sm:text-base">
              {founderBiography.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {founderPillars.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-xs leading-relaxed text-brand-soft-white/84 sm:text-sm"
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
