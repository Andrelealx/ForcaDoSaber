import type { Partner } from "@prisma/client";
import Link from "next/link";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import { SubmitButton } from "@/components/admin/submit-button";

type PartnerFormProps = {
  partner?: Partner;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

export function PartnerForm({ partner, action, submitLabel }: PartnerFormProps) {
  return (
    <form action={action} className="gold-outline space-y-5 rounded-[2rem] border p-6 sm:p-8">
      {partner ? <input type="hidden" name="id" value={partner.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Nome</span>
          <input
            name="name"
            required
            defaultValue={partner?.name ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Tipo de parceria</span>
          <input
            name="partnershipType"
            defaultValue={partner?.partnershipType ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <ImageUploadField
        name="logo"
        label="Logo"
        defaultValue={partner?.logo}
        helpText="Upload opcional da marca do parceiro."
      />

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Descrição</span>
        <textarea
          name="description"
          rows={6}
          required
          defaultValue={partner?.description ?? ""}
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Link externo</span>
          <input
            name="externalLink"
            defaultValue={partner?.externalLink ?? ""}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-2 block text-brand-beige/85">Ordem de exibição</span>
          <input
            type="number"
            name="displayOrder"
            defaultValue={partner?.displayOrder ?? 0}
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
        </label>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={partner?.isActive ?? true}
          className="h-4 w-4 accent-brand-gold"
        />
        Ativo
      </label>

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton label={submitLabel} pendingLabel="Salvando parceiro..." />
        <Link
          href="/admin/parceiros"
          className="rounded-full border border-brand-gold/35 px-5 py-2 text-sm text-brand-beige hover:bg-brand-gold/10"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
