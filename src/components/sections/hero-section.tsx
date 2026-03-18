import { ArrowRight, CheckCircle2, Handshake } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { credibilityPillars } from "@/lib/site-data";

export function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-px w-full bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
        <div className="absolute right-10 top-28 h-64 w-64 rounded-full border border-brand-gold/20" />
        <div className="absolute left-10 bottom-0 h-64 w-64 rounded-full border border-brand-champagne/10" />
      </div>

      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal className="space-y-8">
          <span className="inline-flex rounded-full border border-brand-gold/35 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-champagne">
            Educação, impacto e comunidade
          </span>
          <div className="space-y-6">
            <h1 className="font-display text-5xl leading-tight text-brand-soft-white sm:text-6xl lg:text-7xl">
              Transformando vidas por meio da{" "}
              <span className="gradient-text-gold">educação</span>
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-brand-soft-white/85 sm:text-xl">
              O Projeto Força do Saber fortalece sonhos, orienta trajetórias e
              aproxima estudantes de Guapimirim-RJ de oportunidades reais de
              crescimento acadêmico e profissional.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {credibilityPillars.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm text-brand-beige/90"
                >
                  <CheckCircle2 size={16} className="text-brand-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/#quem-somos" className="group gap-2">
              Conheça o projeto
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </ButtonLink>
            <ButtonLink href="/contato" variant="secondary" className="gap-2">
              <Handshake size={16} />
              Seja um parceiro
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <div className="gold-outline relative overflow-hidden rounded-[2rem] border p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-beige/70 to-transparent" />
            <div className="mx-auto w-fit rounded-full border border-brand-gold/50 bg-brand-black/65 p-3">
              <Image
                src="/images/logo-forca-do-saber.jpg"
                alt="Logo oficial do Projeto Força do Saber"
                width={180}
                height={180}
                className="h-36 w-36 rounded-full border border-brand-gold/50 object-cover sm:h-40 sm:w-40"
                priority
              />
            </div>

            <div className="mt-8 space-y-4 text-center">
              <p className="font-display text-3xl text-brand-champagne">
                Projeto Força do Saber
              </p>
              <p className="text-sm uppercase tracking-[0.2em] text-brand-beige/80">
                Nova Guapimirim
              </p>
              <div className="mx-auto w-fit rounded-xl border border-brand-gold/45 bg-brand-beige px-4 py-2">
                <Image
                  src="/images/logo-forca-do-saber-nome.png"
                  alt="Logo com nome Força do Saber"
                  width={260}
                  height={100}
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="mx-auto max-w-sm text-sm leading-relaxed text-brand-soft-white/80">
                Identidade local forte, proposta institucional sólida e ação social
                orientada para resultados educacionais duradouros.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
