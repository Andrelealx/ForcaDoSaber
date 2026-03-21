import { notFound } from "next/navigation";
import { updateStudentCardAction } from "@/app/admin/(panel)/actions";
import { StudentCardForm } from "@/components/admin/student-card-form";
import { prisma } from "@/lib/prisma";

type EditStudentCardPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditStudentCardPage({ params }: EditStudentCardPageProps) {
  const { id } = await params;
  const card = await prisma.studentCard.findUnique({ where: { id } });

  if (!card) {
    notFound();
  }

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
          Cartões do aluno
        </p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Editar carteirinha</h1>
      </div>
      <StudentCardForm card={card} action={updateStudentCardAction} submitLabel="Salvar alterações" />
    </>
  );
}
