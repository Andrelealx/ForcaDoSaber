import { notFound } from "next/navigation";
import { updateStoryAction } from "@/app/admin/(panel)/actions";
import { StoryForm } from "@/components/admin/story-form";
import { prisma } from "@/lib/prisma";

type EditStoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { id } = await params;
  const story = await prisma.story.findUnique({ where: { id } });

  if (!story) {
    notFound();
  }

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Histórias</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Editar história</h1>
      </div>
      <StoryForm story={story} action={updateStoryAction} submitLabel="Salvar alterações" />
    </>
  );
}
