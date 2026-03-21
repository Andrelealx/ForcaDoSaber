import { redirect } from "next/navigation";

type LegacyStudentCardPrintPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LegacyStudentCardPrintPage({
  params,
}: LegacyStudentCardPrintPageProps) {
  const { id } = await params;
  redirect(`/api/admin/carteirinhas/${id}/pdf?download=1`);
}
