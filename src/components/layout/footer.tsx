import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getDynamicContactInfo, getSiteIdentity } from "@/lib/content-service";
import { footerInstitutionalLinks, footerNavLinks } from "@/lib/site-data";

const currentYear = new Date().getFullYear();

export async function Footer() {
  const [contactInfo, siteIdentity] = await Promise.all([
    getDynamicContactInfo(),
    getSiteIdentity(),
  ]);

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
            <div>
              <p className="font-display text-2xl leading-none text-brand-champagne">
                {siteIdentity.name}
              </p>
              <p className="text-sm text-brand-beige/80">{siteIdentity.tagline}</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-brand-soft-white/80">
            {siteIdentity.description}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-2xl text-brand-champagne">Navegação</h3>
          <ul className="space-y-2 text-sm text-brand-soft-white/80">
            {footerNavLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition-colors hover:text-brand-champagne" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/70">
              Institucional
            </p>
            <ul className="mt-2 space-y-2 text-sm text-brand-soft-white/80">
              {footerInstitutionalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="transition-colors hover:text-brand-champagne" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
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
        <div className="section-shell flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-beige/70">
            {currentYear} Projeto Força do Saber. Todos os direitos reservados.
          </p>
          <Link
            href="/admin/login"
            className="text-[11px] uppercase tracking-[0.14em] text-brand-beige/50 transition-colors hover:text-brand-champagne"
          >
            Acesso restrito
          </Link>
        </div>
      </div>
    </footer>
  );
}
