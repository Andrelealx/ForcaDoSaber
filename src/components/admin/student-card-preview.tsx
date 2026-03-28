import Image from "next/image";
import { clsx } from "clsx";

export type StudentCardPreviewData = {
  fullName: string;
  photo?: string | null;
  enrollment: string;
  course: string;
  unit: string;
  cardCode: string;
  validationCode?: string | null;
  validityDate?: string | null;
  issueDate?: string | null;
  responsibleName?: string | null;
  responsibleRole?: string | null;
};

type StudentCardPreviewProps = {
  side: "front" | "back";
  data: StudentCardPreviewData;
  className?: string;
};

function formatDate(date?: string | null) {
  if (!date) return "--/--/----";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "--/--/----";
  return parsed.toLocaleDateString("pt-BR");
}

export function StudentCardPreview({ side, data, className }: StudentCardPreviewProps) {
  const fullName = data.fullName?.trim() || "NOME DO ALUNO";
  const enrollment = data.enrollment?.trim() || "0000000";
  const course = data.course?.trim() || "CURSO";
  const unit = data.unit?.trim() || "Nova Guapimirim";
  const cardCode = data.cardCode?.trim() || "FS-000000";
  const validationCode = data.validationCode?.trim() || cardCode;
  const qrSrc = `/api/cartao/qr?codigo=${encodeURIComponent(validationCode)}`;
  const responsibleName = data.responsibleName?.trim() || "José Augusto Oliveira Cordeiro";
  const responsibleRole = data.responsibleRole?.trim() || "Responsável institucional";

  return (
    <article
      className={clsx(
        "relative w-full max-w-[360px] overflow-hidden rounded-[1.3rem] border border-brand-gold/45 bg-black text-brand-soft-white shadow-[0_16px_32px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="relative aspect-[3/5] w-full">
        {side === "front" ? (
          <>
            <div className="absolute inset-y-0 left-0 w-[22%] bg-[linear-gradient(180deg,#d6bf75_0%,#f3e7bf_30%,#b28e3a_62%,#ecdca8_100%)]" />
            <div className="absolute inset-y-0 left-[22%] w-[2px] bg-brand-beige/35" />
            <p className="absolute inset-y-0 left-[6.7%] flex items-center [writing-mode:vertical-rl] rotate-180 select-none text-[2.15rem] font-bold uppercase leading-none tracking-[0.08em] text-black/60 [text-shadow:_0_1px_0_rgba(255,255,255,0.35)]">
              Carteirão de Benefícios
            </p>

            <div className="absolute inset-y-0 right-0 w-[78%] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_36%),linear-gradient(160deg,#050505_0%,#000000_100%)] px-6 pb-7 pt-6">
              <div className="text-center">
                <div className="mx-auto mb-2 h-16 w-16 overflow-hidden rounded-full border border-brand-gold/35">
                  <Image
                    src="/images/logo-forca-do-saber-transparent.png"
                    alt="Logo do Projeto Força do Saber"
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[0.62rem] uppercase tracking-[0.16em] text-brand-beige/85">
                  Projeto
                </p>
                <p className="font-sans text-[1.12rem] font-bold uppercase leading-none tracking-[0.03em]">
                  Força do Saber
                </p>
                <p className="mt-1 font-display text-[1.15rem] leading-none text-brand-beige/90">
                  {unit}
                </p>
              </div>

              <div className="mx-auto mt-5 h-[148px] w-[130px] overflow-hidden rounded-xl border border-brand-beige/35 bg-brand-dark/80">
                <Image
                  src={data.photo || "/images/jose-augusto.jpeg"}
                  alt={`Foto de ${fullName}`}
                  width={130}
                  height={148}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="font-sans text-[1.66rem] font-black uppercase leading-none tracking-[0.015em] text-brand-soft-white">
                  {fullName}
                </p>
              </div>

              <div className="mt-6 space-y-2 text-center">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-beige/80">
                    Matrícula
                  </p>
                  <p className="text-[1.14rem] font-bold leading-none">{enrollment}</p>
                </div>

                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-beige/80">
                    Curso
                  </p>
                  <p className="text-[1.14rem] font-bold uppercase leading-none">{course}</p>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 flex flex-col items-center rounded-xl border border-brand-gold/45 bg-white/95 p-1.5 shadow-md">
                <Image
                  src={qrSrc}
                  alt={`QR code de validação do cartão ${cardCode}`}
                  width={56}
                  height={56}
                  unoptimized
                  className="h-14 w-14 rounded-sm object-cover"
                />
                <p className="mt-1 text-[0.52rem] font-semibold uppercase tracking-[0.14em] text-black">
                  Validar
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(160deg,#1a1a1f_0%,#121216_48%,#0b0b0e_100%)]" />
            <div className="absolute -left-20 top-0 h-[130%] w-[140px] rotate-[22deg] bg-[linear-gradient(180deg,#f0e1b2_0%,#c7a44f_48%,#a9812f_100%)] opacity-95" />
            <div className="absolute -left-16 top-0 h-[130%] w-[50px] rotate-[22deg] bg-brand-beige/40 blur-[1px]" />

            <div className="relative flex h-full flex-col px-8 pb-8 pt-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.18em] text-brand-beige/85">
                    Projeto
                  </p>
                  <p className="font-sans text-[1.7rem] font-bold uppercase leading-[0.95] text-brand-soft-white">
                    Força do Saber
                  </p>
                  <p className="mt-1 font-display text-[1.4rem] leading-none text-brand-beige/90">
                    {unit}
                  </p>
                </div>
                <div className="h-14 w-14 overflow-hidden rounded-full border border-brand-beige/35">
                  <Image
                    src="/images/logo-forca-do-saber-transparent.png"
                    alt="Logo do projeto"
                    width={56}
                    height={56}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-10 rounded-2xl border border-brand-beige/30 bg-black/35 p-4 text-sm leading-relaxed text-brand-soft-white/88">
                <p>
                  Cartão virtual de identificação estudantil do Projeto Força do Saber.
                  Documento institucional de uso pessoal e intransferível.
                </p>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <p className="text-brand-beige/88">
                  <span className="uppercase tracking-[0.12em] text-brand-beige/70">Código:</span>{" "}
                  {cardCode}
                </p>
                <p className="max-w-[70%] break-all text-brand-beige/82">
                  <span className="uppercase tracking-[0.12em] text-brand-beige/70">Token:</span>{" "}
                  {validationCode}
                </p>
                <p className="text-brand-beige/88">
                  <span className="uppercase tracking-[0.12em] text-brand-beige/70">Emissão:</span>{" "}
                  {formatDate(data.issueDate)}
                </p>
                <p className="text-brand-beige/88">
                  <span className="uppercase tracking-[0.12em] text-brand-beige/70">Validade:</span>{" "}
                  {formatDate(data.validityDate)}
                </p>
              </div>

              <div className="mt-auto">
                <div className="mb-3 h-px w-full bg-brand-beige/55" />
                <p className="font-display text-[2rem] leading-none text-brand-soft-white/90">
                  {responsibleName}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-brand-beige/78">
                  Assinatura responsável
                </p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.16em] text-brand-beige/60">
                  {responsibleRole}
                </p>
              </div>

              <div className="absolute right-8 top-[50%] flex flex-col items-center rounded-xl border border-brand-gold/45 bg-white/95 p-1.5 shadow-md">
                <Image
                  src={qrSrc}
                  alt={`QR code de validação do cartão ${cardCode}`}
                  width={64}
                  height={64}
                  unoptimized
                  className="h-16 w-16 rounded-sm object-cover"
                />
                <p className="mt-1 text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-black">
                  Validar
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
