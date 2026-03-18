import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { contactInfo } from "@/lib/site-data";

type ContactSectionProps = {
  standalone?: boolean;
};

export function ContactSection({ standalone = false }: ContactSectionProps) {
  const sectionClass = standalone ? "section-divider pb-24 pt-32" : "section-divider py-24";

  return (
    <section id="contato" className={sectionClass}>
      <div className="section-shell">
        <SectionTitle
          eyebrow="Contato institucional"
          title="Vamos construir impacto juntos"
          description="Fale com o Projeto Força do Saber para parcerias, apoio educacional, colaborações sociais e fortalecimento da rede de oportunidades em Guapimirim."
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr]">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <div className="space-y-5">
              <p className="text-base leading-relaxed text-brand-soft-white/84">
                Atendemos estudantes, famílias, apoiadores e instituições interessadas
                em fortalecer a educação e criar novas trajetórias de futuro.
              </p>

              <div className="space-y-3 text-sm text-brand-soft-white/85">
                <a
                  href={contactInfo.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 transition-colors hover:border-brand-gold/55"
                >
                  <MessageCircle size={16} className="text-brand-champagne" />
                  {contactInfo.whatsappLabel}
                </a>
                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 transition-colors hover:border-brand-gold/55"
                >
                  <Instagram size={16} className="text-brand-champagne" />
                  {contactInfo.instagramLabel}
                </a>
                <div className="flex items-center gap-3 rounded-2xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3">
                  <Mail size={16} className="text-brand-champagne" />
                  {contactInfo.email}
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3">
                  <MapPin size={16} className="text-brand-champagne" />
                  {contactInfo.localReference}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={contactInfo.whatsappUrl} external className="gap-2">
                  <MessageCircle size={16} />
                  Conversar no WhatsApp
                </ButtonLink>
                <ButtonLink
                  href={contactInfo.instagramUrl}
                  external
                  variant="secondary"
                  className="gap-2"
                >
                  <Instagram size={16} />
                  Ver Instagram
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="gold-outline rounded-[2rem] border p-8 sm:p-10">
            <h3 className="font-display text-4xl text-brand-champagne">Envie sua mensagem</h3>
            <p className="mt-2 text-sm text-brand-soft-white/78">
              Formulário institucional com envio rápido para o WhatsApp oficial.
            </p>
            <ContactForm whatsappUrl={contactInfo.whatsappUrl} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
