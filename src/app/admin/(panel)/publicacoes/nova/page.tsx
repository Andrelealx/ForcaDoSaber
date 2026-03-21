import { createPublicationAction } from "@/app/admin/(panel)/actions";
import { PublicationForm } from "@/components/admin/publication-form";

export default function NovaPublicacaoPage() {
  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Publicações</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Nova publicação</h1>
      </div>
      <PublicationForm action={createPublicationAction} submitLabel="Criar publicação" />
    </>
  );
}
