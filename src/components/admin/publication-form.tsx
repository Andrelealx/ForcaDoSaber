import { PublicationStatus, type Publication, type PublicationImage } from "@prisma/client";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";

type PublicationFormProps = {
  publication?: Publication & { gallery: PublicationImage[] };
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

function dateToInput(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function PublicationForm({ publication, action, submitLabel }: PublicationFormProps) {
  const gallery = publication?.gallery
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((image) => image.imageUrl)
    .join("\n");

  return (
    <form action={action} className="gold-outline space-y-5 rounded-[2rem] border p-6 sm:p-8">
      {publication ? <input type="hidden" name="id" value={publication.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Título</span>
          <input
            name="title"
            required
            defaultValue={publication?.title ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Slug (opcional)</span>
          <input
            name="slug"
            defaultValue={publication?.slug ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Resumo</span>
        <textarea
          name="summary"
          rows={3}
          required
          defaultValue={publication?.summary ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Conteúdo completo</span>
        <textarea
          name="content"
          rows={10}
          required
          defaultValue={publication?.content ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <ImageUploadField
          name="coverImage"
          label="Imagem de capa"
          defaultValue={publication?.coverImage}
          helpText="Use upload seguro ou selecione uma mídia existente."
        />

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Galeria (uma URL por linha)</span>
          <textarea
            name="galleryImages"
            rows={10}
            defaultValue={gallery ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Categoria</span>
          <input
            name="category"
            defaultValue={publication?.category ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Autor</span>
          <input
            name="authorName"
            defaultValue={publication?.authorName ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Status</span>
          <select
            name="status"
            defaultValue={publication?.status ?? PublicationStatus.DRAFT}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          >
            <option value={PublicationStatus.DRAFT}>Rascunho</option>
            <option value={PublicationStatus.PUBLISHED}>Publicado</option>
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Data de publicação</span>
          <input
            type="date"
            name="publishedAt"
            defaultValue={dateToInput(publication?.publishedAt ?? null)}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
        <input
          type="checkbox"
          name="featuredOnHome"
          defaultChecked={publication?.featuredOnHome ?? false}
          className="h-4 w-4 accent-brand-gold"
        />
        Destacar na Home
      </label>

      {publication ? (
        <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
          <input
            type="checkbox"
            name="isArchived"
            defaultChecked={publication.isArchived}
            className="h-4 w-4 accent-brand-gold"
          />
          Arquivar publicação
        </label>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton label={submitLabel} pendingLabel="Salvando publicação..." />
        <Link
          href="/admin/publicacoes"
          className="rounded-full border border-brand-gold/35 px-5 py-2 text-sm text-brand-beige hover:bg-brand-gold/10"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
