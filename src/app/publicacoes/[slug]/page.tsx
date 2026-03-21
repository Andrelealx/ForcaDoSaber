import type { Metadata } from "next";
import { PublicationStatus } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type PublicationDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PublicationDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await prisma.publication.findUnique({ where: { slug } });

  if (
    !publication ||
    publication.status !== PublicationStatus.PUBLISHED ||
    publication.isArchived
  ) {
    return { title: "Publicação não encontrada" };
  }

  return {
    title: publication.title,
    description: publication.summary,
  };
}

export default async function PublicacaoDetailPage({ params }: PublicationDetailProps) {
  const { slug } = await params;

  const publication = await prisma.publication.findUnique({
    where: { slug },
    include: { gallery: { orderBy: { displayOrder: "asc" } } },
  });

  if (
    !publication ||
    publication.status !== PublicationStatus.PUBLISHED ||
    publication.isArchived
  ) {
    notFound();
  }

  return (
    <section className="pb-24 pt-32">
      <div className="section-shell max-w-5xl">
        <div className="mb-6">
          <Link
            href="/publicacoes"
            className="text-xs uppercase tracking-[0.14em] text-brand-beige/75 hover:text-brand-champagne"
          >
            Voltar para publicações
          </Link>
        </div>

        <article className="gold-outline rounded-[2rem] border p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/75">
            {publication.category ?? "Atualização"}
          </p>
          <h1 className="mt-2 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
            {publication.title}
          </h1>
          <p className="mt-4 text-sm text-brand-beige/80">{publication.summary}</p>

          <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-brand-soft-white/86">
            {publication.content}
          </div>

          {publication.gallery.length > 0 ? (
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {publication.gallery.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-xl border border-brand-gold/25">
                  <div className="relative h-56 w-full">
                    <Image
                      src={image.imageUrl}
                      alt="Imagem da publicação"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </section>
  );
}
