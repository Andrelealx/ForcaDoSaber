import type { Metadata } from "next";
import { PublicationStatus } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Publicações",
  description: "Notícias, atualizações e comunicados do Projeto Força do Saber.",
};

export default async function PublicacoesPage() {
  const publications = await prisma.publication.findMany({
    where: { status: PublicationStatus.PUBLISHED, isArchived: false },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <section className="pb-24 pt-32">
      <div className="section-shell">
        <div className="gold-outline rounded-[2rem] border p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Publicações</p>
          <h1 className="mt-3 font-display text-5xl text-brand-champagne sm:text-6xl">
            Notícias e atualizações do projeto
          </h1>
        </div>

        <div className="mt-8 space-y-4">
          {publications.length > 0 ? (
            publications.map((item) => (
              <article key={item.id} className="gold-outline rounded-2xl border p-6">
                <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/75">
                  {item.category ?? "Atualização"}
                </p>
                <h2 className="mt-2 font-display text-4xl text-brand-champagne">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84">{item.summary}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-brand-beige/75">
                    {item.publishedAt
                      ? new Date(item.publishedAt).toLocaleDateString("pt-BR")
                      : "Sem data de publicação"}
                  </p>
                  <Link
                    href={`/publicacoes/${item.slug}`}
                    className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-brand-beige hover:bg-brand-gold/10"
                  >
                    Ler publicação
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="gold-outline rounded-2xl border p-6">
              <p className="text-sm text-brand-soft-white/82">Nenhuma publicação disponível.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
