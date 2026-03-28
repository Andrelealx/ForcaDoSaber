import Link from "next/link";
import { PublicationStatus } from "@prisma/client";
import {
  deletePublicationAction,
  togglePublicationArchiveAction,
  togglePublicationStatusAction,
} from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/prisma";

type PublicationsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminPublicacoesPage({ searchParams }: PublicationsPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const status = typeof params.status === "string" ? params.status : "all";
  const archive = typeof params.archive === "string" ? params.archive : "active";
  const category = typeof params.category === "string" ? params.category : "all";

  const [publications, categories] = await Promise.all([
    prisma.publication.findMany({
      where: {
        ...(status === "all"
          ? {}
          : {
              status:
                status === "published" ? PublicationStatus.PUBLISHED : PublicationStatus.DRAFT,
            }),
        ...(archive === "all"
          ? {}
          : {
              isArchived: archive === "archived",
            }),
        ...(category === "all"
          ? {}
          : {
              category,
            }),
        ...(q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { summary: { contains: q, mode: "insensitive" } },
                { category: { contains: q, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      orderBy: [{ updatedAt: "desc" }],
    }),
    prisma.publication.findMany({
      where: { category: { not: null } },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    }),
  ]);

  const categoryOptions = categories
    .map((item) => item.category)
    .filter((item): item is string => Boolean(item));

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Publicações</p>
          <h1 className="mt-2 font-display text-5xl text-brand-champagne">
            Notícias e atualizações
          </h1>
        </div>

        <Link
          href="/admin/publicacoes/nova"
          className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-black hover:bg-brand-champagne"
        >
          Nova publicação
        </Link>
      </div>

      <form className="gold-outline grid gap-4 rounded-2xl border p-4 md:grid-cols-[1fr_180px_180px_180px_auto]">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Pesquisar por título, resumo ou categoria"
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="all">Todos os status</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunhos</option>
        </select>

        <select
          name="archive"
          defaultValue={archive}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="active">Ativos</option>
          <option value="archived">Arquivados</option>
          <option value="all">Todos</option>
        </select>

        <select
          name="category"
          defaultValue={category}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="all">Todas as categorias</option>
          {categoryOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-full border border-brand-gold/45 px-5 py-2 text-sm font-semibold text-brand-beige hover:bg-brand-gold/10"
        >
          Filtrar
        </button>
      </form>

      <div className="space-y-4">
        {publications.length > 0 ? (
          publications.map((item) => (
            <article key={item.id} className="gold-outline rounded-2xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/75">
                    {item.category ?? "Sem categoria"}
                  </p>
                  <h2 className="mt-1 font-display text-3xl text-brand-champagne">
                    {item.title}
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm text-brand-soft-white/82">{item.summary}</p>
                  <p className="mt-2 text-xs text-brand-beige/70">
                    Slug: {item.slug} | Atualizado em {item.updatedAt.toLocaleDateString("pt-BR")}
                  </p>
                </div>

                <span className="rounded-full border border-brand-gold/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-beige/80">
                  {item.status === PublicationStatus.PUBLISHED ? "Publicado" : "Rascunho"}
                </span>
              </div>
              {item.isArchived ? (
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-red-100">
                  Conteúdo arquivado
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/publicacoes/${item.id}`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Visualizar
                </Link>
                <Link
                  href={`/admin/publicacoes/${item.id}/editar`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Editar
                </Link>

                <form action={togglePublicationStatusAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input
                    type="hidden"
                    name="actionType"
                    value={
                      item.status === PublicationStatus.PUBLISHED ? "unpublish" : "publish"
                    }
                  />
                  <SubmitButton
                    label={
                      item.status === PublicationStatus.PUBLISHED
                        ? "Despublicar"
                        : "Publicar"
                    }
                    pendingLabel="Atualizando..."
                    variant="secondary"
                    className="px-4 py-2 text-xs uppercase tracking-[0.1em]"
                  />
                </form>

                <form action={togglePublicationArchiveAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <SubmitButton
                    label={item.isArchived ? "Desarquivar" : "Arquivar"}
                    pendingLabel="Atualizando..."
                    variant="secondary"
                    className="px-4 py-2 text-xs uppercase tracking-[0.1em]"
                  />
                </form>

                <form action={deletePublicationAction}>
                  <input type="hidden" name="id" value={item.id} />
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
            <p className="text-sm text-brand-soft-white/82">Nenhuma publicação encontrada.</p>
          </div>
        )}
      </div>
    </>
  );
}
