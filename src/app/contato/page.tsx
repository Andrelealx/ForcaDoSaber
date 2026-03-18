import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { ContactSection } from "@/components/sections/contact-section";
import { Reveal } from "@/components/ui/reveal";
import { faqItems } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o Projeto Força do Saber para parcerias e colaborações institucionais.",
};

export default function ContatoPage() {
  return (
    <>
      <ContactSection standalone />
      <section className="pb-24">
        <div className="section-shell grid gap-6 lg:grid-cols-2">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <h2 className="font-display text-4xl text-brand-champagne">Referência local</h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              Guapimirim-RJ é o centro da nossa atuação. Este espaço pode receber mapa,
              endereço institucional e pontos de atendimento conforme a evolução
              operacional do projeto.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-brand-gold/45 bg-brand-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-champagne">
              <MapPin size={14} />
              Guapimirim - RJ
            </div>
          </Reveal>

          <Reveal delay={0.08} className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <h2 className="font-display text-4xl text-brand-champagne">
              Perguntas frequentes
            </h2>
            <div className="mt-5 space-y-4">
              {faqItems.map((item) => (
                <div
                  key={item.question}
                  className="rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-4"
                >
                  <h3 className="text-sm font-semibold text-brand-champagne">{item.question}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-soft-white/82">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
