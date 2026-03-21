import { redirect } from "next/navigation";

type StudentCardPrintPageProps = {
  params: Promise<{ id: string }>;
};

export default async function StudentCardPrintPage({ params }: StudentCardPrintPageProps) {
  const { id } = await params;
  redirect(`/api/admin/carteirinhas/${id}/pdf?download=1`);
}
