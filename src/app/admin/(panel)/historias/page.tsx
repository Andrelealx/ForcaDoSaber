import Link from "next/link";
import {
  deleteStoryAction,
  toggleStoryPublishAction,
} from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/prisma";

type StoriesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminHistoriasPage({ searchParams }: StoriesPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const visibility = typeof params.visibility === "string" ? params.visibility : "all";

  const stories = await prisma.story.findMany({
    where: {
      ...(visibility === "all"
        ? {}
        : {
            published: visibility === "published",
          }),
      ...(q
        ? {
            OR: [
              { name: { contains: q } },
              { course: { contains: q } },
              { institution: { contains: q } },
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
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Histórias</p>
          <h1 className="mt-2 font-display text-5xl text-brand-champagne">
            Depoimentos e casos de sucesso
          </h1>
        </div>

        <Link
          href="/admin/historias/nova"
          className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-black hover:bg-brand-champagne"
        >
          Nova história
        </Link>
      </div>

      <form className="gold-outline grid gap-4 rounded-2xl border p-4 md:grid-cols-[1fr_180px_auto]">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Pesquisar por nome, curso ou instituição"
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
        <select
          name="visibility"
          defaultValue={visibility}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="all">Todos</option>
          <option value="published">Publicados</option>
          <option value="draft">Não publicados</option>
        </select>
        <button
          type="submit"
          className="rounded-full border border-brand-gold/45 px-5 py-2 text-sm font-semibold text-brand-beige hover:bg-brand-gold/10"
        >
          Filtrar
        </button>
      </form>

      <div className="space-y-4">
        {stories.length > 0 ? (
          stories.map((story) => (
            <article key={story.id} className="gold-outline rounded-2xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl text-brand-champagne">{story.name}</h2>
                  <p className="mt-1 text-sm text-brand-soft-white/82">
                    {story.course ?? "Curso não informado"}
                    {story.institution ? ` | ${story.institution}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-brand-soft-white/82">{story.achievement}</p>
                  <p className="mt-2 text-xs text-brand-beige/70">
                    Ordem: {story.displayOrder} | Ano: {story.year ?? "-"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {story.featured ? (
                    <span className="rounded-full border border-brand-gold/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-beige/80">
                      Destaque
                    </span>
                  ) : null}
                  <span className="rounded-full border border-brand-gold/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-beige/80">
                    {story.published ? "Publicado" : "Rascunho"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/historias/${story.id}/editar`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Editar
                </Link>

                <form action={toggleStoryPublishAction}>
                  <input type="hidden" name="id" value={story.id} />
                  <SubmitButton
                    label={story.published ? "Despublicar" : "Publicar"}
                    pendingLabel="Atualizando..."
                    variant="secondary"
                    className="px-4 py-2 text-xs uppercase tracking-[0.1em]"
                  />
                </form>

                <form action={deleteStoryAction}>
                  <input type="hidden" name="id" value={story.id} />
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
            <p className="text-sm text-brand-soft-white/82">Nenhuma história encontrada.</p>
          </div>
        )}
      </div>
    </>
  );
}
