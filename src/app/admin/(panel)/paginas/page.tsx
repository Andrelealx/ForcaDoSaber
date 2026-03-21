import {
  createPageBlockAction,
  deletePageBlockAction,
  updatePageBlockAction,
} from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { prisma } from "@/lib/prisma";

export default async function AdminPaginasPage() {
  const blocks = await prisma.pageBlock.findMany({
    orderBy: [{ section: "asc" }, { key: "asc" }],
  });

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
          Páginas institucionais
        </p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">
          Blocos editáveis do site
        </h1>
        <p className="mt-2 text-sm text-brand-soft-white/82">
          Atualize textos e CTAs sem editar código-fonte.
        </p>
      </div>

      <form action={createPageBlockAction} className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Novo bloco institucional</h2>
        <p className="mt-2 text-sm text-brand-soft-white/82">
          Use chaves no formato <code>pagina.bloco</code>, por exemplo{" "}
          <code>quem-somos.missao</code>.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            name="section"
            required
            placeholder="Seção (ex: home, quem-somos)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            name="key"
            required
            placeholder="Chave (ex: home.hero)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            name="title"
            placeholder="Título"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            name="subtitle"
            placeholder="Subtítulo"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </div>
        <textarea
          name="body"
          rows={4}
          placeholder="Texto principal"
          className="mt-4 w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            name="ctaPrimaryLabel"
            placeholder="CTA primário (label)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            name="ctaPrimaryHref"
            placeholder="CTA primário (link)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <input
            name="ctaSecondaryLabel"
            placeholder="CTA secundário (label)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            name="ctaSecondaryHref"
            placeholder="CTA secundário (link)"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </div>
        <div className="mt-4">
          <SubmitButton label="Criar bloco" pendingLabel="Criando..." />
        </div>
      </form>

      <div className="space-y-4">
        {blocks.length > 0 ? (
          blocks.map((block) => (
            <form
              key={block.id}
              action={updatePageBlockAction}
              className="gold-outline rounded-2xl border p-6"
            >
              <input type="hidden" name="id" value={block.id} />

              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-brand-gold/35 px-3 py-1 text-xs uppercase tracking-[0.12em] text-brand-champagne">
                  {block.section}
                </span>
                <code className="rounded-md bg-brand-black/50 px-2 py-1 text-xs text-brand-beige/85">
                  {block.key}
                </code>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-brand-beige/85">Título</span>
                  <input
                    name="title"
                    defaultValue={block.title ?? ""}
                    className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-2 block text-brand-beige/85">Subtítulo</span>
                  <input
                    name="subtitle"
                    defaultValue={block.subtitle ?? ""}
                    className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
                  />
                </label>
              </div>

              <label className="mt-4 block text-sm">
                <span className="mb-2 block text-brand-beige/85">Texto principal</span>
                <textarea
                  name="body"
                  rows={6}
                  defaultValue={block.body ?? ""}
                  className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
                />
              </label>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-brand-beige/85">CTA primário (label)</span>
                  <input
                    name="ctaPrimaryLabel"
                    defaultValue={block.ctaPrimaryLabel ?? ""}
                    className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-brand-beige/85">CTA primário (link)</span>
                  <input
                    name="ctaPrimaryHref"
                    defaultValue={block.ctaPrimaryHref ?? ""}
                    className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
                  />
                </label>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-2 block text-brand-beige/85">CTA secundário (label)</span>
                  <input
                    name="ctaSecondaryLabel"
                    defaultValue={block.ctaSecondaryLabel ?? ""}
                    className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-brand-beige/85">CTA secundário (link)</span>
                  <input
                    name="ctaSecondaryHref"
                    defaultValue={block.ctaSecondaryHref ?? ""}
                    className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
                  />
                </label>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-2">
                  <SubmitButton label="Salvar bloco" pendingLabel="Salvando bloco..." />
                </div>
              </div>
            </form>
          ))
        ) : (
          <div className="gold-outline rounded-2xl border p-6">
            <p className="text-sm text-brand-soft-white/82">
              Nenhum bloco institucional configurado.
            </p>
          </div>
        )}
      </div>

      {blocks.length > 0 ? (
        <div className="gold-outline rounded-2xl border p-6">
          <h2 className="font-display text-3xl text-brand-champagne">Remover bloco</h2>
          <p className="mt-2 text-sm text-brand-soft-white/82">
            Use com cuidado. A remoção afeta conteúdo institucional no site público.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {blocks.map((block) => (
              <form key={`delete-${block.id}`} action={deletePageBlockAction}>
                <input type="hidden" name="id" value={block.id} />
                <SubmitButton
                  label={`Excluir ${block.key}`}
                  pendingLabel="Excluindo..."
                  variant="danger"
                  className="text-xs"
                />
              </form>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
