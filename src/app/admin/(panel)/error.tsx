"use client";

type AdminPanelErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminPanelError({ error, reset }: AdminPanelErrorProps) {
  return (
    <div className="gold-outline rounded-2xl border p-6">
      <p className="text-xs uppercase tracking-[0.14em] text-red-200">Erro no painel</p>
      <h2 className="mt-2 font-display text-3xl text-brand-champagne">
        Não foi possível concluir esta operação
      </h2>
      <p className="mt-3 text-sm text-brand-soft-white/82">
        {error.message || "Tente novamente em instantes."}
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-5 rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
      >
        Tentar novamente
      </button>
    </div>
  );
}
