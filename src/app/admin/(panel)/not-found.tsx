import Link from "next/link";

export default function AdminNotFoundPage() {
  return (
    <div className="gold-outline rounded-2xl border p-6">
      <p className="text-xs uppercase tracking-[0.16em] text-red-200">Não encontrado</p>
      <h1 className="mt-2 font-display text-4xl text-brand-champagne">
        Página ou registro indisponível
      </h1>
      <p className="mt-3 text-sm text-brand-soft-white/82">
        O conteúdo que você tentou acessar não existe ou foi removido.
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          href="/admin"
          className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
        >
          Voltar ao dashboard
        </Link>
        <Link
          href="/admin/publicacoes"
          className="rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
        >
          Ver publicações
        </Link>
      </div>
    </div>
  );
}
