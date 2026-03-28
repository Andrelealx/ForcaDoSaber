import Link from "next/link";
import {
  deletePartnerAction,
  togglePartnerStatusAction,
} from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/prisma";

type PartnersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminParceirosPage({ searchParams }: PartnersPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const status = typeof params.status === "string" ? params.status : "all";

  const partners = await prisma.partner.findMany({
    where: {
      ...(status === "all"
        ? {}
        : {
            isActive: status === "active",
          }),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { partnershipType: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Parceiros</p>
          <h1 className="mt-2 font-display text-5xl text-brand-champagne">Cadastro de parceiros</h1>
        </div>

        <Link
          href="/admin/parceiros/novo"
          className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-black hover:bg-brand-champagne"
        >
          Novo parceiro
        </Link>
      </div>

      <form className="gold-outline grid gap-4 rounded-2xl border p-4 md:grid-cols-[1fr_180px_auto]">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Pesquisar por nome, tipo ou descrição"
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
        <button
          type="submit"
          className="rounded-full border border-brand-gold/45 px-5 py-2 text-sm font-semibold text-brand-beige hover:bg-brand-gold/10"
        >
          Filtrar
        </button>
      </form>

      <div className="space-y-4">
        {partners.length > 0 ? (
          partners.map((partner) => (
            <article key={partner.id} className="gold-outline rounded-2xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl text-brand-champagne">{partner.name}</h2>
                  <p className="mt-1 text-sm text-brand-soft-white/82">{partner.partnershipType}</p>
                  <p className="mt-2 text-sm text-brand-soft-white/82">{partner.description}</p>
                  <p className="mt-2 text-xs text-brand-beige/70">
                    Ordem: {partner.displayOrder} | {partner.externalLink ?? "Sem link"}
                  </p>
                </div>

                <span className="rounded-full border border-brand-gold/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-beige/80">
                  {partner.isActive ? "Ativo" : "Inativo"}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/parceiros/${partner.id}/editar`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Editar
                </Link>

                <form action={togglePartnerStatusAction}>
                  <input type="hidden" name="id" value={partner.id} />
                  <SubmitButton
                    label={partner.isActive ? "Desativar" : "Ativar"}
                    pendingLabel="Atualizando..."
                    variant="secondary"
                    className="px-4 py-2 text-xs uppercase tracking-[0.1em]"
                  />
                </form>

                <form action={deletePartnerAction}>
                  <input type="hidden" name="id" value={partner.id} />
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
            <p className="text-sm text-brand-soft-white/82">Nenhum parceiro encontrado.</p>
          </div>
        )}
      </div>
    </>
  );
}
