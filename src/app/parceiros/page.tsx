import type { Metadata } from "next";
import { ArrowRight, Handshake } from "lucide-react";
import { PartnersSection } from "@/components/sections/partners-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { getPublicPartners } from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Parceiros",
  description:
    "Conheça as frentes de parceria, benefícios e oportunidades de colaboração com o Projeto Força do Saber.",
};

export default async function ParceirosPage() {
  const partners = await getPublicPartners();

  return (
    <>
      <section className="pb-16 pt-32">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-12">
            <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
              Parcerias institucionais
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
              Empresas e instituições que fortalecem o projeto
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
              Esta página centraliza os modelos de colaboração, rede de parceiros e
              informações sobre benefícios vinculados ao Cartão do Aluno.
            </p>
          </Reveal>
        </div>
      </section>

      <PartnersSection partners={partners} />

      <section className="pb-24">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 text-center sm:p-10">
            <div className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
              <Handshake size={20} />
            </div>
            <h2 className="font-display text-4xl text-brand-champagne sm:text-5xl">
              Sua organização pode fazer parte desta rede
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              O próximo passo é uma conversa rápida para alinhar formato de apoio,
              contrapartidas e impactos esperados.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contato" className="mx-auto w-fit gap-2">
                Falar sobre parceria
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
