import Link from "next/link";
import { listUploadImages } from "@/lib/media-utils";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    publicationCount,
    storyCount,
    partnerCount,
    studentCardCount,
    galleryCount,
    indicatorCount,
    blockCount,
    mediaFiles,
    recentPublications,
    recentStories,
    recentPartners,
  ] = await Promise.all([
    prisma.publication.count(),
    prisma.story.count(),
    prisma.partner.count(),
    prisma.studentCard.count(),
    prisma.galleryAlbum.count(),
    prisma.indicator.count(),
    prisma.pageBlock.count(),
    listUploadImages(),
    prisma.publication.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, status: true, updatedAt: true, publishedAt: true },
    }),
    prisma.story.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
      select: { id: true, name: true, published: true, updatedAt: true },
    }),
    prisma.partner.findMany({
      orderBy: { updatedAt: "desc" },
      take: 4,
      select: { id: true, name: true, isActive: true, updatedAt: true },
    }),
  ]);

  const cards = [
    { label: "Publicações", value: publicationCount, href: "/admin/publicacoes" },
    { label: "Histórias", value: storyCount, href: "/admin/historias" },
    { label: "Parceiros", value: partnerCount, href: "/admin/parceiros" },
    { label: "Carteirinhas", value: studentCardCount, href: "/admin/carteirinhas" },
    { label: "Galeria", value: galleryCount, href: "/admin/galeria" },
    { label: "Arquivos de mídia", value: mediaFiles.length, href: "/admin/midia" },
    { label: "Indicadores", value: indicatorCount, href: "/admin/indicadores" },
    { label: "Blocos institucionais", value: blockCount, href: "/admin/paginas" },
  ];

  return (
    <>
      <div className="gold-outline rounded-[2rem] border p-8 sm:p-10">
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Dashboard</p>
        <h1 className="mt-3 font-display text-5xl leading-tight text-brand-champagne">
          Gestão de conteúdo do site
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
          Monitore os módulos e publique atualizações no site institucional sem editar
          o código-fonte.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="gold-outline rounded-2xl border p-6 transition-colors hover:border-brand-gold/65"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/70">
              {card.label}
            </p>
            <p className="mt-2 font-display text-5xl text-brand-champagne">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="gold-outline rounded-[2rem] border p-6 sm:p-8">
        <h2 className="font-display text-4xl text-brand-champagne">Atualizações recentes</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/75">Publicações</p>
            {recentPublications.length > 0 ? (
              recentPublications.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-brand-champagne">{item.title}</p>
                  <p className="mt-1 text-xs text-brand-beige/75">
                    {item.status === "PUBLISHED" ? "Publicado" : "Rascunho"} |{" "}
                    {item.updatedAt.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-brand-soft-white/80">Nenhuma publicação cadastrada.</p>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/75">Histórias</p>
            {recentStories.length > 0 ? (
              recentStories.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-brand-champagne">{item.name}</p>
                  <p className="mt-1 text-xs text-brand-beige/75">
                    {item.published ? "Publicado" : "Rascunho"} |{" "}
                    {item.updatedAt.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-brand-soft-white/80">Nenhuma história cadastrada.</p>
            )}
          </div>

          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/75">Parceiros</p>
            {recentPartners.length > 0 ? (
              recentPartners.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3"
                >
                  <p className="text-sm font-semibold text-brand-champagne">{item.name}</p>
                  <p className="mt-1 text-xs text-brand-beige/75">
                    {item.isActive ? "Ativo" : "Inativo"} |{" "}
                    {item.updatedAt.toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-brand-soft-white/80">Nenhum parceiro cadastrado.</p>
            )}
          </div>
        </div>
      </div>

      <div className="gold-outline rounded-[2rem] border p-6 sm:p-8">
        <h2 className="font-display text-4xl text-brand-champagne">Ações rápidas</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/admin/publicacoes/nova"
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Nova publicação
          </Link>
          <Link
            href="/admin/historias/nova"
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Nova história
          </Link>
          <Link
            href="/admin/parceiros/novo"
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Novo parceiro
          </Link>
          <Link
            href="/admin/carteirinhas/nova"
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Nova carteirinha
          </Link>
          <Link
            href="/admin/midia"
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Gerenciar mídia
          </Link>
        </div>
      </div>
    </>
  );
}
