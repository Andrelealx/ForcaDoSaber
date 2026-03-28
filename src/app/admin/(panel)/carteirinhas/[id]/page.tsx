import { StudentCardStatus } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StudentCardPreview } from "@/components/admin/student-card-preview";
import { prisma } from "@/lib/prisma";

type AdminStudentCardViewPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminStudentCardViewPage({ params }: AdminStudentCardViewPageProps) {
  const { id } = await params;
  const card = await prisma.studentCard.findUnique({ where: { id } });

  if (!card) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
            Cartões do aluno
          </p>
          <h1 className="mt-2 font-display text-5xl text-brand-champagne">
            Visualização da carteirinha
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/carteirinhas/${card.id}/editar`}
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Editar
          </Link>
        </div>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <div className="grid gap-2 text-sm text-brand-soft-white/85 md:grid-cols-3">
          <p>
            <span className="text-brand-beige/72">Status:</span>{" "}
            {card.status === StudentCardStatus.ACTIVE ? "Ativo" : "Inativo"}
          </p>
          <p>
            <span className="text-brand-beige/72">Validade:</span>{" "}
            {card.validityDate.toLocaleDateString("pt-BR")}
          </p>
          <p>
            <span className="text-brand-beige/72">Emissão:</span>{" "}
            {card.issueDate.toLocaleDateString("pt-BR")}
          </p>
          <p>
            <span className="text-brand-beige/72">Código:</span> {card.cardCode}
          </p>
          <p>
            <span className="text-brand-beige/72">Token:</span> {card.validationToken}
          </p>
          <p>
            <span className="text-brand-beige/72">Arquivo:</span>{" "}
            {card.isArchived ? "Arquivado" : "Ativo"}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={`/api/admin/carteirinhas/${card.id}/pdf?download=1`}
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Baixar PDF completo
          </a>
          <a
            href={`/api/admin/carteirinhas/${card.id}/frente?format=png&download=1`}
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Baixar frente em PNG
          </a>
          <a
            href={`/api/admin/carteirinhas/${card.id}/verso?format=png&download=1`}
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Baixar verso em PNG
          </a>
          <Link
            href={`/cartao/validar/${card.validationToken || card.cardCode}`}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Validar publicamente
          </Link>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="gold-outline rounded-2xl border p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-brand-champagne">
            Frente
          </p>
          <StudentCardPreview
            side="front"
            data={{
              fullName: card.fullName,
              photo: card.photo,
              enrollment: card.enrollment,
              course: card.course,
              unit: card.unit,
              cardCode: card.cardCode,
              validationCode: card.validationToken,
              validityDate: card.validityDate.toISOString(),
              issueDate: card.issueDate.toISOString(),
              responsibleName: card.responsibleName,
              responsibleRole: card.responsibleRole,
            }}
            className="mx-auto"
          />
        </div>

        <div className="gold-outline rounded-2xl border p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.16em] text-brand-champagne">
            Verso
          </p>
          <StudentCardPreview
            side="back"
            data={{
              fullName: card.fullName,
              photo: card.photo,
              enrollment: card.enrollment,
              course: card.course,
              unit: card.unit,
              cardCode: card.cardCode,
              validationCode: card.validationToken,
              validityDate: card.validityDate.toISOString(),
              issueDate: card.issueDate.toISOString(),
              responsibleName: card.responsibleName,
              responsibleRole: card.responsibleRole,
            }}
            className="mx-auto"
          />
        </div>
      </div>
    </>
  );
}
