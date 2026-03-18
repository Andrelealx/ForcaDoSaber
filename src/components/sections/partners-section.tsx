import { Building2, GraduationCap, Handshake, Landmark } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { partnerGroups } from "@/lib/site-data";

const partnerIcons = [Building2, GraduationCap, Handshake, Landmark];

export function PartnersSection() {
  return (
    <section id="parceiros" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Parcerias"
          title="Alianças institucionais que ampliam oportunidades"
          description="Empresas, faculdades, apoiadores e agentes públicos são parte essencial da estratégia do projeto para multiplicar o impacto educacional em Guapimirim."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {partnerGroups.map((group, index) => {
            const Icon = partnerIcons[index];
            return (
              <Reveal
                key={group}
                delay={index * 0.08}
                className="gold-outline rounded-3xl border p-7"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-3xl text-brand-champagne">{group}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/82">
                  Espaço dedicado para inserir logo, descrição institucional e forma
                  de colaboração de cada parceiro.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Logo institucional", "Marca parceira", "Selo de apoio"].map((item) => (
                    <span
                      key={`${group}-${item}`}
                      className="rounded-full border border-brand-gold/25 bg-brand-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-brand-beige/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.25} className="mt-10 text-center">
          <p className="mx-auto mb-6 max-w-3xl text-sm leading-relaxed text-brand-soft-white/80 sm:text-base">
            Sua instituição pode apoiar bolsas, mentoria, estrutura, conexão com
            cursos e oportunidades para jovens e famílias da cidade.
          </p>
          <ButtonLink href="/contato" className="mx-auto w-fit">
            Quero apoiar o Projeto Força do Saber
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
