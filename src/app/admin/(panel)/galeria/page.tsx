import Link from "next/link";
import { deleteGalleryAlbumAction } from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/prisma";

type GalleryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminGaleriaPage({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const visibility = typeof params.visibility === "string" ? params.visibility : "all";
  const featured = typeof params.featured === "string" ? params.featured : "all";

  const albums = await prisma.galleryAlbum.findMany({
    where: {
      ...(visibility === "all"
        ? {}
        : {
            published: visibility === "published",
          }),
      ...(featured === "all"
        ? {}
        : {
            featured: featured === "featured",
          }),
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { description: { contains: q, mode: "insensitive" } },
              { category: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    include: { _count: { select: { images: true } } },
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Galeria</p>
          <h1 className="mt-2 font-display text-5xl text-brand-champagne">Álbuns de fotos</h1>
        </div>

        <Link
          href="/admin/galeria/novo"
          className="rounded-full bg-brand-gold px-5 py-2 text-sm font-semibold text-brand-black hover:bg-brand-champagne"
        >
          Novo álbum
        </Link>
      </div>

      <form className="gold-outline grid gap-4 rounded-2xl border p-4 md:grid-cols-[1fr_180px_220px_auto]">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Pesquisar por título, categoria ou descrição"
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
        <select
          name="visibility"
          defaultValue={visibility}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="all">Todos os status</option>
          <option value="published">Publicados</option>
          <option value="draft">Rascunhos</option>
        </select>
        <select
          name="featured"
          defaultValue={featured}
          className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        >
          <option value="all">Com e sem destaque</option>
          <option value="featured">Somente destaque</option>
          <option value="regular">Sem destaque</option>
        </select>
        <button
          type="submit"
          className="rounded-full border border-brand-gold/45 px-5 py-2 text-sm font-semibold text-brand-beige hover:bg-brand-gold/10"
        >
          Filtrar
        </button>
      </form>

      <div className="space-y-4">
        {albums.length > 0 ? (
          albums.map((album) => (
            <article key={album.id} className="gold-outline rounded-2xl border p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl text-brand-champagne">{album.title}</h2>
                  <p className="mt-1 text-sm text-brand-soft-white/82">{album.category}</p>
                  <p className="mt-2 text-sm text-brand-soft-white/82">{album.description}</p>
                  <p className="mt-2 text-xs text-brand-beige/70">
                    {album._count.images} imagens | Ordem: {album.displayOrder}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {album.featured ? (
                    <span className="rounded-full border border-brand-gold/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-beige/80">
                      Destaque
                    </span>
                  ) : null}
                  <span className="rounded-full border border-brand-gold/30 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-beige/80">
                    {album.published ? "Publicado" : "Rascunho"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                  href={`/admin/galeria/${album.id}/editar`}
                  className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                >
                  Editar
                </Link>

                <form action={deleteGalleryAlbumAction}>
                  <input type="hidden" name="id" value={album.id} />
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
            <p className="text-sm text-brand-soft-white/82">Nenhum álbum encontrado.</p>
          </div>
        )}
      </div>
    </>
  );
}
