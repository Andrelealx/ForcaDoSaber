import type { GalleryAlbum, GalleryImage } from "@prisma/client";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";

type GalleryAlbumFormProps = {
  album?: GalleryAlbum & { images: GalleryImage[] };
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

function dateToInput(date: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function GalleryAlbumForm({ album, action, submitLabel }: GalleryAlbumFormProps) {
  const imageUrls = album?.images
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((item) => item.imageUrl)
    .join("\n");

  return (
    <form action={action} className="gold-outline space-y-5 rounded-[2rem] border p-6 sm:p-8">
      {album ? <input type="hidden" name="id" value={album.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Título do álbum</span>
          <input
            name="title"
            required
            defaultValue={album?.title ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Categoria</span>
          <input
            name="category"
            defaultValue={album?.category ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Descrição</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={album?.description ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <ImageUploadField
        name="helperImage"
        label="Upload auxiliar"
        helpText="Faça upload e copie a URL gerada para a lista de imagens abaixo."
      />

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Imagens do álbum (uma URL por linha)</span>
        <textarea
          name="imageUrls"
          rows={10}
          defaultValue={imageUrls ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Data do álbum</span>
          <input
            type="date"
            name="eventDate"
            defaultValue={dateToInput(album?.eventDate ?? null)}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Ordem de exibição</span>
          <input
            type="number"
            name="displayOrder"
            defaultValue={album?.displayOrder ?? 0}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={album?.featured ?? false}
            className="h-4 w-4 accent-brand-gold"
          />
          Destaque
        </label>

        <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
          <input
            type="checkbox"
            name="published"
            defaultChecked={album?.published ?? true}
            className="h-4 w-4 accent-brand-gold"
          />
          Publicado
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton label={submitLabel} pendingLabel="Salvando álbum..." />
        <Link
          href="/admin/galeria"
          className="rounded-full border border-brand-gold/35 px-5 py-2 text-sm text-brand-beige hover:bg-brand-gold/10"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
