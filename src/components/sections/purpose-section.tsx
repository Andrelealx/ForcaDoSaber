import { BookOpenText } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";

export function PurposeSection() {
  return (
    <section className="section-divider py-24">
      <div className="section-shell">
        <SectionTitle
          align="center"
          eyebrow="Histórias e propósito"
          title="Educação que fortalece vidas e a cidade"
          description="Cada estudante apoiado representa uma nova possibilidade de futuro para Guapimirim. Quando a educação ganha espaço, a cidade cresce com mais autonomia, dignidade e perspectivas."
        />

        <Reveal className="gold-outline mx-auto max-w-5xl rounded-[2rem] border p-8 text-center sm:p-12">
          <div className="mx-auto mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand-gold/45 bg-brand-gold/10 text-brand-champagne">
            <BookOpenText size={20} />
          </div>
          <blockquote className="font-display text-3xl leading-snug text-brand-champagne sm:text-5xl">
            &quot;Não se trata apenas de ingresso no ensino superior. Trata-se de abrir
            caminhos, reconstruir confiança e movimentar um ciclo de transformação
            social para toda a comunidade.&quot;
          </blockquote>
          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-brand-soft-white/82 sm:text-base">
            O Projeto Força do Saber atua para que conhecimento, apoio e oportunidade
            caminhem juntos. O resultado é uma rede local mais forte, conectada e
            preparada para um futuro mais justo.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
