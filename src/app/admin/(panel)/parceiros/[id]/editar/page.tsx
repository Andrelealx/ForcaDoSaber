import { notFound } from "next/navigation";
import { updatePartnerAction } from "@/app/admin/(panel)/actions";
import { PartnerForm } from "@/components/admin/partner-form";
import { prisma } from "@/lib/prisma";

type EditPartnerPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPartnerPage({ params }: EditPartnerPageProps) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });

  if (!partner) {
    notFound();
  }

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Parceiros</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Editar parceiro</h1>
      </div>
      <PartnerForm partner={partner} action={updatePartnerAction} submitLabel="Salvar alterações" />
    </>
  );
}
