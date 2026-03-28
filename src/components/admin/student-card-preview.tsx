import { clsx } from "clsx";
import Image from "next/image";

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

export function StudentCardPreview({ side, data, className }: StudentCardPreviewProps) {
  const payload = JSON.stringify({
    fullName: data.fullName,
    photo: data.photo,
    enrollment: data.enrollment,
    course: data.course,
    unit: data.unit,
    cardCode: data.cardCode,
    validationCode: data.validationCode,
    validityDate: data.validityDate,
    issueDate: data.issueDate,
    responsibleName: data.responsibleName,
    responsibleRole: data.responsibleRole,
  });

  const query = new URLSearchParams({
    side,
    format: "png",
    payload,
  });

  return (
    <article
      className={clsx(
        "relative w-full max-w-[360px] overflow-hidden rounded-[1.3rem] border border-brand-gold/45 bg-black text-brand-soft-white shadow-[0_16px_32px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="aspect-[3/5] w-full">
        <Image
          src={`/api/admin/carteirinhas/preview?${query.toString()}`}
          alt={side === "front" ? "Prévia da frente da carteirinha" : "Prévia do verso da carteirinha"}
          width={360}
          height={600}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
    </article>
  );
}
