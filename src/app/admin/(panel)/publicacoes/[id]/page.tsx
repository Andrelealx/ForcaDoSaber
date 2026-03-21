import type { PublicationStatus } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type AdminPublicationPreviewPageProps = {
  params: Promise<{ id: string }>;
};

function statusLabel(status: PublicationStatus) {
  return status === "PUBLISHED" ? "Publicado" : "Rascunho";
}

export default async function AdminPublicationPreviewPage({
  params,
}: AdminPublicationPreviewPageProps) {
  const { id } = await params;

  const publication = await prisma.publication.findUnique({
    where: { id },
    include: {
      gallery: { orderBy: { displayOrder: "asc" } },
      createdBy: { select: { name: true, email: true } },
    },
  });

  if (!publication) {
    notFound();
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Publicações</p>
          <h1 className="mt-2 font-display text-5xl text-brand-champagne">Visualizar publicação</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/admin/publicacoes/${publication.id}/editar`}
            className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
          >
            Editar
          </Link>
          {publication.status === "PUBLISHED" && !publication.isArchived ? (
            <Link
              href={`/publicacoes/${publication.slug}`}
              className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
            >
              Ver no site
            </Link>
          ) : null}
        </div>
      </div>

      <article className="gold-outline rounded-[2rem] border p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-brand-beige/75">
          <span className="rounded-full border border-brand-gold/30 px-3 py-1 uppercase tracking-[0.12em]">
            {statusLabel(publication.status)}
          </span>
          {publication.isArchived ? (
            <span className="rounded-full border border-red-300/45 px-3 py-1 uppercase tracking-[0.12em] text-red-100">
              Arquivado
            </span>
          ) : null}
          <span>{publication.category ?? "Sem categoria"}</span>
        </div>

        <h2 className="mt-4 font-display text-5xl leading-tight text-brand-champagne">
          {publication.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">{publication.summary}</p>

        <div className="mt-4 grid gap-2 text-xs text-brand-beige/75 sm:grid-cols-2">
          <p>Slug: {publication.slug}</p>
          <p>
            Publicação:{" "}
            {publication.publishedAt
              ? publication.publishedAt.toLocaleDateString("pt-BR")
              : "Sem data"}
          </p>
          <p>Autor: {publication.authorName ?? "Não informado"}</p>
          <p>
            Criado por: {publication.createdBy?.name ?? "Não informado"} (
            {publication.createdBy?.email ?? "-"})
          </p>
        </div>

        {publication.coverImage ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-brand-gold/20">
            <div className="relative h-64 w-full">
              <Image
                src={publication.coverImage}
                alt="Imagem de capa da publicação"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        ) : null}

        <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-brand-soft-white/86 sm:text-base">
          {publication.content}
        </div>

        {publication.gallery.length > 0 ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {publication.gallery.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-xl border border-brand-gold/20"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.imageUrl}
                    alt={image.caption ?? "Imagem da galeria da publicação"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </article>
    </>
  );
}
