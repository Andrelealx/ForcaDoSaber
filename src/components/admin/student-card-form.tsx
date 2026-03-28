"use client";

import { StudentCardStatus, type StudentCard } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ImageUploadField } from "@/components/admin/image-upload-field";
import {
  StudentCardPreview,
  type StudentCardPreviewData,
} from "@/components/admin/student-card-preview";
import { SubmitButton } from "@/components/admin/submit-button";

type StudentCardFormProps = {
  card?: StudentCard;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
};

function dateToInput(date?: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export function StudentCardForm({ card, action, submitLabel }: StudentCardFormProps) {
  const [fullName, setFullName] = useState(card?.fullName ?? "");
  const [photo, setPhoto] = useState(card?.photo ?? "");
  const [enrollment, setEnrollment] = useState(card?.enrollment ?? "");
  const [course, setCourse] = useState(card?.course ?? "");
  const [unit, setUnit] = useState(card?.unit ?? "Nova Guapimirim");
  const [cardCode, setCardCode] = useState(card?.cardCode ?? "");
  const [validationCode, setValidationCode] = useState(card?.validationToken ?? "");
  const [validityDate, setValidityDate] = useState(dateToInput(card?.validityDate));
  const [issueDate, setIssueDate] = useState(dateToInput(card?.issueDate) || dateToInput(new Date()));
  const [responsibleName, setResponsibleName] = useState(
    card?.responsibleName ?? "José Augusto Oliveira Cordeiro",
  );
  const [responsibleRole, setResponsibleRole] = useState(
    card?.responsibleRole ?? "Responsável institucional",
  );

  const previewData: StudentCardPreviewData = useMemo(
    () => ({
      fullName,
      photo,
      enrollment,
      course,
      unit,
      cardCode,
      validationCode,
      validityDate,
      issueDate,
      responsibleName,
      responsibleRole,
    }),
    [
      fullName,
      photo,
      enrollment,
      course,
      unit,
      cardCode,
      validationCode,
      validityDate,
      issueDate,
      responsibleName,
      responsibleRole,
    ],
  );

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="gold-outline space-y-5 rounded-[2rem] border p-6 sm:p-8">
          {card ? <input type="hidden" name="id" value={card.id} /> : null}

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Nome completo</span>
              <input
                name="fullName"
                required
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Matrícula</span>
              <input
                name="enrollment"
                required
                value={enrollment}
                onChange={(event) => setEnrollment(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Curso</span>
              <input
                name="course"
                required
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Unidade / projeto</span>
              <input
                name="unit"
                required
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>
          </div>

          <ImageUploadField
            name="photo"
            label="Foto do aluno"
            defaultValue={card?.photo}
            onValueChange={setPhoto}
            helpText="Foto principal exibida na frente da carteirinha."
          />

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Código do cartão (opcional)</span>
              <input
                name="cardCode"
                value={cardCode}
                onChange={(event) => setCardCode(event.target.value)}
                placeholder="FDS-2026-123456"
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Token validação/QR (opcional)</span>
              <input
                name="validationToken"
                value={validationCode}
                onChange={(event) => setValidationCode(event.target.value)}
                placeholder="token-publico-validacao"
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Validade</span>
              <input
                type="date"
                name="validityDate"
                required
                value={validityDate}
                onChange={(event) => setValidityDate(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Data de emissão</span>
              <input
                type="date"
                name="issueDate"
                value={issueDate}
                onChange={(event) => setIssueDate(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Status</span>
              <select
                name="status"
                defaultValue={card?.status ?? StudentCardStatus.ACTIVE}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              >
                <option value={StudentCardStatus.ACTIVE}>Ativo</option>
                <option value={StudentCardStatus.INACTIVE}>Inativo</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Responsável (verso)</span>
              <input
                name="responsibleName"
                value={responsibleName}
                onChange={(event) => setResponsibleName(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Cargo do responsável</span>
              <input
                name="responsibleRole"
                value={responsibleRole}
                onChange={(event) => setResponsibleRole(event.target.value)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">CPF (opcional)</span>
              <input
                name="cpf"
                defaultValue={card?.cpf ?? ""}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Data de nascimento (opcional)</span>
              <input
                type="date"
                name="birthDate"
                defaultValue={dateToInput(card?.birthDate)}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Turma (opcional)</span>
              <input
                name="classGroup"
                defaultValue={card?.classGroup ?? ""}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-2 block text-brand-beige/85">Série/Nível (opcional)</span>
              <input
                name="level"
                defaultValue={card?.level ?? ""}
                className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
            </label>
          </div>

          <label className="block text-sm">
            <span className="mb-2 block text-brand-beige/85">Observações (opcional)</span>
            <textarea
              name="notes"
              rows={4}
              defaultValue={card?.notes ?? ""}
              className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none focus:border-brand-gold/65"
            />
          </label>

          {card ? (
            <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
              <input
                type="checkbox"
                name="isArchived"
                defaultChecked={card.isArchived}
                className="h-4 w-4 accent-brand-gold"
              />
              Arquivar carteirinha
            </label>
          ) : null}

          <div className="flex flex-wrap items-center gap-3">
            <SubmitButton label={submitLabel} pendingLabel="Salvando carteirinha..." />
            <Link
              href="/admin/carteirinhas"
              className="rounded-full border border-brand-gold/35 px-5 py-2 text-sm text-brand-beige hover:bg-brand-gold/10"
            >
              Cancelar
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="gold-outline rounded-2xl border p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-brand-champagne">
              Prévia da frente
            </p>
            <StudentCardPreview side="front" data={previewData} className="mx-auto" />
          </div>

          <div className="gold-outline rounded-2xl border p-4">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-brand-champagne">
              Prévia do verso
            </p>
            <StudentCardPreview side="back" data={previewData} className="mx-auto" />
          </div>
        </div>
      </div>
    </form>
  );
}
