import { notFound } from "next/navigation";
import { updatePublicationAction } from "@/app/admin/(panel)/actions";
import { PublicationForm } from "@/components/admin/publication-form";
import { prisma } from "@/lib/prisma";

type EditPublicationPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPublicationPage({ params }: EditPublicationPageProps) {
  const { id } = await params;

  const publication = await prisma.publication.findUnique({
    where: { id },
    include: { gallery: true },
  });

  if (!publication) {
    notFound();
  }

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Publicações</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Editar publicação</h1>
      </div>
      <PublicationForm
        publication={publication}
        action={updatePublicationAction}
        submitLabel="Salvar alterações"
      />
    </>
  );
}
