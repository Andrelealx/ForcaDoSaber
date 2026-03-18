import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { contactInfo, navLinks } from "@/lib/site-data";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-brand-gold/20 bg-brand-dark/65">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3">
            <Image
              src="/images/logo-forca-do-saber.jpg"
              alt="Logo do Projeto Força do Saber"
              width={52}
              height={52}
              className="rounded-full border border-brand-gold/50 object-cover"
            />
            <div className="rounded-xl border border-brand-gold/45 bg-brand-beige px-4 py-2">
              <Image
                src="/images/logo-forca-do-saber-nome.png"
                alt="Assinatura do Projeto Força do Saber"
                width={300}
                height={120}
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>
          <p className="text-sm text-brand-beige/80">Guapimirim - RJ</p>
          <p className="max-w-md text-sm leading-relaxed text-brand-soft-white/80">
            Projeto educacional de impacto social comprometido com acesso, apoio e
            oportunidades para transformar vidas por meio da educação.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-2xl text-brand-champagne">Navegação</h3>
          <ul className="space-y-2 text-sm text-brand-soft-white/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition-colors hover:text-brand-champagne" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-2xl text-brand-champagne">Contato</h3>
          <ul className="space-y-3 text-sm text-brand-soft-white/80">
            <li>
              <a
                href={contactInfo.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-champagne"
              >
                <MessageCircle size={16} />
                {contactInfo.whatsappLabel}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-champagne"
              >
                <Instagram size={16} />
                {contactInfo.instagramLabel}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Mail size={16} />
              {contactInfo.email}
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin size={16} />
              {contactInfo.localReference}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-gold/20 py-5">
        <p className="section-shell text-center text-xs uppercase tracking-[0.16em] text-brand-beige/70">
          {currentYear} Projeto Força do Saber. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
