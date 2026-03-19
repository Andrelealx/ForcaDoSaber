import {
  BadgePercent,
  Building2,
  GraduationCap,
  Handshake,
  Landmark,
  Store,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import {
  partnerGroups,
  studentCardPartners,
  studentCardPartnershipPillars,
} from "@/lib/site-data";

const partnerIcons = [Building2, GraduationCap, Handshake, Landmark];

export function PartnersSection() {
  return (
    <section id="parceiros" className="py-24">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Parcerias"
          title="Alianças institucionais que ampliam oportunidades"
          description="Empresas, faculdades, apoiadores e agentes públicos fortalecem o projeto e ajudam a construir a rede de benefícios do Cartão do Aluno em Guapimirim."
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

        <Reveal delay={0.2} className="gold-outline mt-12 rounded-[2rem] border p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                <BadgePercent size={20} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-beige/78">
                Cartão do Aluno
              </p>
              <h3 className="mt-2 font-display text-4xl leading-tight text-brand-champagne">
                Descontos em estabelecimentos parceiros
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-brand-soft-white/82 sm:text-base">
                Criamos este espaço para apresentar os comércios e serviços conveniados
                ao Cartão do Aluno Força do Saber. O objetivo é ampliar o apoio aos
                estudantes com vantagens reais no dia a dia.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {studentCardPartnershipPillars.map((pillar) => (
                  <span
                    key={pillar}
                    className="rounded-full border border-brand-gold/25 bg-brand-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-brand-beige/75"
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {studentCardPartners.map((partner, index) => (
                <Reveal
                  key={partner.name}
                  delay={index * 0.04}
                  className="rounded-2xl border border-brand-gold/25 bg-brand-black/45 p-4"
                >
                  <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                    <Store size={14} />
                  </div>
                  <h4 className="font-display text-xl text-brand-champagne">{partner.name}</h4>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-brand-beige/75">
                    {partner.segment}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
                    {partner.benefit}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.12em] text-brand-beige/72">
                    {partner.location}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs uppercase tracking-[0.14em] text-brand-beige/72">
            Lista em atualização contínua. Novos convênios podem ser inseridos a qualquer
            momento.
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 text-center">
          <p className="mx-auto mb-6 max-w-3xl text-sm leading-relaxed text-brand-soft-white/80 sm:text-base">
            Sua instituição pode apoiar bolsas, mentoria, estrutura, conexão com
            cursos e oportunidades para jovens e famílias da cidade.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contato" className="w-fit">
              Quero apoiar o Projeto Força do Saber
            </ButtonLink>
            <ButtonLink href="/contato" variant="secondary" className="w-fit gap-2">
              <Handshake size={16} />
              Quero credenciar meu estabelecimento
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
