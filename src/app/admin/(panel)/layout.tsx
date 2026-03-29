import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminBreadcrumbs } from "@/components/admin/admin-breadcrumbs";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SubmitButton } from "@/components/admin/submit-button";
import { getCurrentAdmin, logoutAdmin } from "@/lib/admin-auth";

async function logoutAction() {
  "use server";
  await logoutAdmin();
  redirect("/admin/login");
}

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <section className="section-divider min-h-screen pb-16 pt-8">
      <div className="section-shell space-y-6">
        <header className="gold-outline sticky top-4 z-30 rounded-2xl border border-brand-gold/20 bg-brand-dark/75 px-4 py-3 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold/35 bg-brand-black/80"
              >
                <Image
                  src="/images/logo-forca-do-saber-transparent.png"
                  alt="Projeto Força do Saber"
                  width={30}
                  height={30}
                  className="h-7 w-7 object-contain"
                />
              </Link>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-brand-beige/80">
                  Painel administrativo
                </p>
                <p className="text-sm text-brand-soft-white/90">
                  {admin.name} ({admin.email})
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/admin/perfil"
                className="rounded-full border border-brand-gold/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
              >
                Meu perfil
              </Link>
              <Link
                href="/"
                className="rounded-full border border-brand-gold/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
              >
                Ver site público
              </Link>
              <form action={logoutAction}>
                <SubmitButton
                  label="Sair"
                  pendingLabel="Saindo..."
                  variant="secondary"
                  className="px-4 py-2 text-xs uppercase tracking-[0.12em]"
                />
              </form>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <AdminSidebar role={admin.role} />
          <div className="space-y-6">
            <AdminBreadcrumbs />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
