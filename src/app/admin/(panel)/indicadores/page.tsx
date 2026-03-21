import { deleteIndicatorAction, saveIndicatorAction } from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/prisma";

export default async function AdminIndicadoresPage() {
  const indicators = await prisma.indicator.findMany({
    orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Indicadores</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">
          Números da Home e do impacto
        </h1>
      </div>

      <form action={saveIndicatorAction} className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Novo indicador</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <input
            name="label"
            placeholder="Label"
            required
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            name="key"
            placeholder="Key (opcional)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            type="number"
            name="value"
            placeholder="Valor"
            required
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            name="suffix"
            placeholder="Sufixo (+, %, etc)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
            <span>Ordem</span>
            <input
              type="number"
              name="displayOrder"
              defaultValue={0}
              className="w-20 rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
            />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
            <input type="checkbox" name="isActive" defaultChecked className="h-4 w-4 accent-brand-gold" />
            Ativo
          </label>
          <SubmitButton label="Adicionar" pendingLabel="Salvando..." />
        </div>
      </form>

      <div className="space-y-4">
        {indicators.length > 0 ? (
          indicators.map((indicator) => (
            <form
              key={indicator.id}
              action={saveIndicatorAction}
              className="gold-outline rounded-2xl border p-5"
            >
              <input type="hidden" name="id" value={indicator.id} />
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                <input
                  name="label"
                  defaultValue={indicator.label}
                  required
                  className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
                />
                <input
                  name="key"
                  defaultValue={indicator.key}
                  required
                  className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
                />
                <input
                  type="number"
                  name="value"
                  defaultValue={indicator.value}
                  required
                  className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
                />
                <input
                  name="suffix"
                  defaultValue={indicator.suffix ?? ""}
                  className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
                  <span>Ordem</span>
                  <input
                    type="number"
                    name="displayOrder"
                    defaultValue={indicator.displayOrder}
                    className="w-20 rounded-xl border border-brand-gold/25 bg-brand-black/45 px-3 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
                  />
                </label>

                <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
                  <input
                    type="checkbox"
                    name="isActive"
                    defaultChecked={indicator.isActive}
                    className="h-4 w-4 accent-brand-gold"
                  />
                  Ativo
                </label>

                <SubmitButton label="Salvar" pendingLabel="Salvando..." variant="secondary" />
              </div>
            </form>
          ))
        ) : (
          <div className="gold-outline rounded-2xl border p-6">
            <p className="text-sm text-brand-soft-white/82">Nenhum indicador cadastrado.</p>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {indicators.map((indicator) => (
          <form key={`delete-${indicator.id}`} action={deleteIndicatorAction}>
            <input type="hidden" name="id" value={indicator.id} />
            <SubmitButton
              label={`Excluir: ${indicator.label}`}
              pendingLabel="Excluindo..."
              variant="danger"
              className="text-xs"
            />
          </form>
        ))}
      </div>
    </>
  );
}
