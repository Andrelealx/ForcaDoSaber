import { ArrowRight, Compass, HeartHandshake, Sparkles } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { homeHowWeHelpCards } from "@/lib/site-data";

const cardIcons = [HeartHandshake, Compass, Sparkles];

export function HowWeHelpSection() {
  return (
    <section className="py-24" id="como-ajudamos">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Como ajudamos"
          title="Três frentes para apoiar cada trajetória"
          description="O Força do Saber atua com suporte direto ao estudante, orientação educacional e conexão com oportunidades concretas."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {homeHowWeHelpCards.map((item, index) => {
            const Icon = cardIcons[index];
            return (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                className="gold-outline rounded-3xl border p-6"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
                  <Icon size={18} />
                </div>
                <h3 className="font-display text-3xl text-brand-champagne">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-champagne transition-colors hover:text-brand-beige"
                >
                  {item.linkLabel}
                  <ArrowRight size={14} />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
