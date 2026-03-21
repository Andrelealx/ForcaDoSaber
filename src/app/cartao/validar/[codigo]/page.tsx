import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type ValidateCardPageProps = {
  params: Promise<{ codigo: string }>;
};

export async function generateMetadata({ params }: ValidateCardPageProps): Promise<Metadata> {
  const { codigo } = await params;
  return {
    title: `Validar cartão ${codigo}`,
    description: "Validação pública de carteirinha do aluno do Projeto Força do Saber.",
  };
}

export default async function ValidateCardPage({ params }: ValidateCardPageProps) {
  const { codigo } = await params;

  const card = await prisma.studentCard.findFirst({
    where: {
      isArchived: false,
      OR: [{ cardCode: codigo }, { validationToken: codigo }],
    },
  });

  if (!card) {
    notFound();
  }

  const now = new Date();
  const isValid = card.status === "ACTIVE" && card.validityDate >= now;

  return (
    <section className="section-divider min-h-screen pb-20 pt-32">
      <div className="section-shell max-w-3xl">
        <article className="gold-outline rounded-[2rem] border p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
            Validação de carteirinha
          </p>
          <h1 className="mt-3 font-display text-5xl text-brand-champagne">
            {isValid ? "Cartão válido" : "Cartão inválido ou expirado"}
          </h1>

          <div className="mt-6 grid gap-3 text-sm text-brand-soft-white/85 sm:grid-cols-2">
            <p>
              <span className="text-brand-beige/70">Nome:</span> {card.fullName}
            </p>
            <p>
              <span className="text-brand-beige/70">Matrícula:</span> {card.enrollment}
            </p>
            <p>
              <span className="text-brand-beige/70">Curso:</span> {card.course}
            </p>
            <p>
              <span className="text-brand-beige/70">Código:</span> {card.cardCode}
            </p>
            <p>
              <span className="text-brand-beige/70">Status:</span>{" "}
              {card.status === "ACTIVE" ? "Ativo" : "Inativo"}
            </p>
            <p>
              <span className="text-brand-beige/70">Validade:</span>{" "}
              {card.validityDate.toLocaleDateString("pt-BR")}
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/"
              className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
            >
              Voltar ao site
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
