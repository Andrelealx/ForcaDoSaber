"use client";

type AdminPanelErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function normalizeAdminError(error: Error & { digest?: string }) {
  const rawMessage = String(error.message ?? "").trim();

  if (!rawMessage) {
    return "Não foi possível concluir esta operação no momento.";
  }

  const lowered = rawMessage.toLowerCase();

  if (
    lowered.includes("unique constraint failed") ||
    lowered.includes("já está em uso") ||
    lowered.includes("duplicate key value")
  ) {
    return "Já existe um registro com os mesmos dados. Revise campos únicos como e-mail, slug, código ou chave.";
  }

  if (
    lowered.includes("record to update not found") ||
    lowered.includes("record to delete does not exist") ||
    lowered.includes("not found")
  ) {
    return "O registro não foi encontrado. Atualize a página e tente novamente.";
  }

  if (lowered.includes("acesso restrito")) {
    return rawMessage;
  }

  if (lowered.includes("invalid `prisma")) {
    return "Falha ao executar operação no banco de dados. Verifique conexão e migrações.";
  }

  return rawMessage;
}

export default function AdminPanelError({ error, reset }: AdminPanelErrorProps) {
  const message = normalizeAdminError(error);

  return (
    <div className="gold-outline rounded-2xl border p-6">
      <p className="text-xs uppercase tracking-[0.14em] text-red-200">Erro no painel</p>
      <h2 className="mt-2 font-display text-3xl text-brand-champagne">
        Não foi possível concluir esta operação
      </h2>
      <p className="mt-3 text-sm text-brand-soft-white/82">
        {message || "Tente novamente em instantes."}
      </p>
      {error.digest ? (
        <p className="mt-2 text-xs text-brand-beige/70">Código de referência: {error.digest}</p>
      ) : null}
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
