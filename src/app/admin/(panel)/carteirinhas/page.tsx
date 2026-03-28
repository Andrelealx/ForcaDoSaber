import { StudentCardStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import {
  deleteStudentCardAction,
  toggleStudentCardArchiveAction,
  toggleStudentCardStatusAction,
} from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/prisma";

type StudentCardsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminCarteirinhasPage({ searchParams }: StudentCardsPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const status = typeof params.status === "string" ? params.status : "all";
  const archive = typeof params.archive === "string" ? params.archive : "active";

  const cards = await prisma.studentCard.findMany({
    where: {
      ...(status === "all"
        ? {}
        : {
            status:
              status === "inactive" ? StudentCardStatus.INACTIVE : StudentCardStatus.ACTIVE,
          }),
      ...(archive === "all"
        ? {}
        : {
            isArchived: archive === "archived",
          }),
      ...(q
        ? {
            OR: [
              { fullName: { contains: q, mode: "insensitive" } },
              { enrollment: { contains: q, mode: "insensitive" } },
              { course: { contains: q, mode: "insensitive" } },
              { cardCode: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ updatedAt: "desc" }],
  });

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
            Cartões do aluno
          </p>
          <h1 className="mt-2 font-display text-5xl text-brand-champagne">Carteirinhas virtuais</h1>
        </div>

        <Link
          href="/admin/carteirinhas/nova"
          className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-black hover:bg-brand-champagne"
        >
          Nova carteirinha
        </Link>
      </div>

      <form className="gold-outline grid gap-4 rounded-2xl border p-4 md:grid-cols-[1fr_180px_180px_auto]">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Buscar por nome, matrícula, curso ou código"
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="all">Todos os status</option>
          <option value="active">Ativos</option>
          <option value="inactive">Inativos</option>
        </select>

        <select
          name="archive"
          defaultValue={archive}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="active">Não arquivados</option>
          <option value="archived">Arquivados</option>
          <option value="all">Todos</option>
        </select>

        <button
          type="submit"
          className="rounded-full border border-brand-gold/45 px-5 py-2 text-sm font-semibold text-brand-beige hover:bg-brand-gold/10"
        >
          Filtrar
        </button>
      </form>

      <div className="space-y-4">
        {cards.length > 0 ? (
          cards.map((card) => (
            <article key={card.id} className="gold-outline rounded-2xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-brand-gold/25">
                    <Image
                      src={card.photo || "/images/jose-augusto.jpeg"}
                      alt={`Foto de ${card.fullName}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  <div>
                    <h2 className="font-display text-3xl text-brand-champagne">{card.fullName}</h2>
                    <p className="mt-1 text-sm text-brand-soft-white/82">
                      Matrícula: {card.enrollment} | Curso: {card.course}
                    </p>
                    <p className="mt-1 text-xs text-brand-beige/72">
                      Código: {card.cardCode} | Validade:{" "}
                      {card.validityDate.toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-brand-gold/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-beige/80">
                    {card.status === StudentCardStatus.ACTIVE ? "Ativo" : "Inativo"}
                  </span>
                  {card.isArchived ? (
                    <span className="rounded-full border border-red-300/45 px-3 py-1 text-xs uppercase tracking-[0.12em] text-red-100">
                      Arquivado
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/carteirinhas/${card.id}`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Visualizar
                </Link>

                <Link
                  href={`/admin/carteirinhas/${card.id}/editar`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Editar
                </Link>

                <a
                  href={`/api/admin/carteirinhas/${card.id}/pdf?download=1`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Baixar PDF
                </a>

                <a
                  href={`/api/admin/carteirinhas/${card.id}/frente?format=png&download=1`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Frente PNG
                </a>

                <a
                  href={`/api/admin/carteirinhas/${card.id}/verso?format=png&download=1`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Verso PNG
                </a>

                <form action={toggleStudentCardStatusAction}>
                  <input type="hidden" name="id" value={card.id} />
                  <SubmitButton
                    label={card.status === StudentCardStatus.ACTIVE ? "Inativar" : "Ativar"}
                    pendingLabel="Atualizando..."
                    variant="secondary"
                    className="px-4 py-2 text-xs uppercase tracking-[0.1em]"
                  />
                </form>

                <form action={toggleStudentCardArchiveAction}>
                  <input type="hidden" name="id" value={card.id} />
                  <SubmitButton
                    label={card.isArchived ? "Desarquivar" : "Arquivar"}
                    pendingLabel="Atualizando..."
                    variant="secondary"
                    className="px-4 py-2 text-xs uppercase tracking-[0.1em]"
                  />
                </form>

                <form action={deleteStudentCardAction}>
                  <input type="hidden" name="id" value={card.id} />
                  <SubmitButton
                    label="Excluir"
                    pendingLabel="Excluindo..."
                    variant="danger"
                    className="px-4 py-2 text-xs uppercase tracking-[0.1em]"
                  />
                </form>
              </div>
            </article>
          ))
        ) : (
          <div className="gold-outline rounded-2xl border p-6">
            <p className="text-sm text-brand-soft-white/82">Nenhuma carteirinha encontrada.</p>
          </div>
        )}
      </div>
    </>
  );
}
