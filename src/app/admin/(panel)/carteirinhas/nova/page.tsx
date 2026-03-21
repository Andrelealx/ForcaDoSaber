import { createStudentCardAction } from "@/app/admin/(panel)/actions";
import { StudentCardForm } from "@/components/admin/student-card-form";

export default function NovaCarteirinhaPage() {
  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
          Cartões do aluno
        </p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Nova carteirinha</h1>
      </div>
      <StudentCardForm action={createStudentCardAction} submitLabel="Criar carteirinha" />
    </>
  );
}
