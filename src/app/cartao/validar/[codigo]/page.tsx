import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buildStudentCardSvg } from "@/lib/student-card-render";
import {
  resolvePublicBaseUrlFromHeaders,
  resolvePublicSiteUrl,
} from "@/lib/student-card-validation";

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
  const headerStore = await headers();
  const preferredBaseUrl = resolvePublicBaseUrlFromHeaders(headerStore);
  const publicBaseUrl = resolvePublicSiteUrl(preferredBaseUrl);
  const validationCode = card.validationToken || card.cardCode;

  const [frontCardSvg, backCardSvg] = await Promise.all([
    buildStudentCardSvg("front", {
      fullName: card.fullName,
      photo: card.photo,
      enrollment: card.enrollment,
      course: card.course,
      unit: card.unit,
      cardCode: card.cardCode,
      validationCode,
      publicBaseUrl,
      issueDate: card.issueDate,
      validityDate: card.validityDate,
      responsibleName: card.responsibleName,
      responsibleRole: card.responsibleRole,
    }),
    buildStudentCardSvg("back", {
      fullName: card.fullName,
      photo: card.photo,
      enrollment: card.enrollment,
      course: card.course,
      unit: card.unit,
      cardCode: card.cardCode,
      validationCode,
      publicBaseUrl,
      issueDate: card.issueDate,
      validityDate: card.validityDate,
      responsibleName: card.responsibleName,
      responsibleRole: card.responsibleRole,
    }),
  ]);

  const frontCardDataUri = `data:image/svg+xml;base64,${Buffer.from(frontCardSvg).toString("base64")}`;
  const backCardDataUri = `data:image/svg+xml;base64,${Buffer.from(backCardSvg).toString("base64")}`;

  return (
    <section className="section-divider min-h-screen pb-20 pt-32">
      <div className="section-shell max-w-6xl">
        <article className="gold-outline rounded-[2rem] border p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
            Validação de carteirinha
          </p>
          <h1 className="mt-3 font-display text-5xl text-brand-champagne">
            {isValid ? "Cartão válido" : "Cartão inválido ou expirado"}
          </h1>
          <p className="mt-4 text-sm text-brand-soft-white/78">
            Confira os dados e a arte oficial da carteirinha digital do aluno.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="gold-outline rounded-[1.4rem] border border-brand-gold/35 bg-black/35 p-3 sm:p-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-beige/72">
                Frente
              </p>
              <Image
                src={frontCardDataUri}
                alt={`Frente da carteirinha de ${card.fullName}`}
                width={320}
                height={508}
                unoptimized
                className="mx-auto w-full max-w-[320px] rounded-[1.2rem] border border-brand-gold/30 bg-brand-black shadow-[0_18px_48px_rgba(0,0,0,0.55)]"
              />
            </div>
            <div className="gold-outline rounded-[1.4rem] border border-brand-gold/35 bg-black/35 p-3 sm:p-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-beige/72">
                Verso
              </p>
              <Image
                src={backCardDataUri}
                alt={`Verso da carteirinha de ${card.fullName}`}
                width={320}
                height={508}
                unoptimized
                className="mx-auto w-full max-w-[320px] rounded-[1.2rem] border border-brand-gold/30 bg-brand-black shadow-[0_18px_48px_rgba(0,0,0,0.55)]"
              />
            </div>
          </div>

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
              <span className="text-brand-beige/70">Token validação:</span> {validationCode}
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
