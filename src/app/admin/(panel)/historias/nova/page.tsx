import { createStoryAction } from "@/app/admin/(panel)/actions";
import { StoryForm } from "@/components/admin/story-form";

export default function NovaHistoriaPage() {
  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Histórias</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Nova história</h1>
      </div>
      <StoryForm action={createStoryAction} submitLabel="Criar história" />
    </>
  );
}
