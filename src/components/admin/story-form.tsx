import type { Story } from "@prisma/client";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";

type StoryFormProps = {
  story?: Story;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

export function StoryForm({ story, action, submitLabel }: StoryFormProps) {
  return (
    <form action={action} className="gold-outline space-y-5 rounded-[2rem] border p-6 sm:p-8">
      {story ? <input type="hidden" name="id" value={story.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Nome</span>
          <input
            name="name"
            required
            defaultValue={story?.name ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Ano</span>
          <input
            type="number"
            name="year"
            defaultValue={story?.year ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <ImageUploadField
        name="photo"
        label="Foto"
        defaultValue={story?.photo}
        helpText="A imagem será usada no destaque da história no site."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Curso</span>
          <input
            name="course"
            defaultValue={story?.course ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Instituição</span>
          <input
            name="institution"
            defaultValue={story?.institution ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Conquista / resumo</span>
        <input
          name="achievement"
          defaultValue={story?.achievement ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Depoimento</span>
        <textarea
          name="testimonial"
          rows={3}
          required
          defaultValue={story?.testimonial ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">História completa</span>
        <textarea
          name="fullStory"
          rows={10}
          defaultValue={story?.fullStory ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Ordem de exibição</span>
          <input
            type="number"
            name="displayOrder"
            defaultValue={story?.displayOrder ?? 0}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <div className="space-y-3 pt-6">
          <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
            <input
              type="checkbox"
              name="published"
              defaultChecked={story?.published ?? true}
              className="h-4 w-4 accent-brand-gold"
            />
            Publicado
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={story?.featured ?? false}
              className="h-4 w-4 accent-brand-gold"
            />
            Destaque na Home
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton label={submitLabel} pendingLabel="Salvando história..." />
        <Link
          href="/admin/historias"
          className="rounded-full border border-brand-gold/35 px-5 py-2 text-sm text-brand-beige hover:bg-brand-gold/10"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
