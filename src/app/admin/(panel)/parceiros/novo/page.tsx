import { createPartnerAction } from "@/app/admin/(panel)/actions";
import { PartnerForm } from "@/components/admin/partner-form";

export default function NovoParceiroPage() {
  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Parceiros</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Novo parceiro</h1>
      </div>
      <PartnerForm action={createPartnerAction} submitLabel="Criar parceiro" />
    </>
  );
}
