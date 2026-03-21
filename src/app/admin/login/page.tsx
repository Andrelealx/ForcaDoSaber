import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Login Administrativo",
  description: "Acesso seguro ao painel administrativo do Projeto Força do Saber.",
};

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const currentAdmin = await getCurrentAdmin();
  if (currentAdmin) {
    redirect("/admin");
  }

  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : "/admin";

  return (
    <section className="section-divider min-h-screen pb-16 pt-32">
      <div className="section-shell max-w-xl">
        <div className="gold-outline rounded-[2rem] border p-8 sm:p-10">
          <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">
            Área restrita
          </p>
          <h1 className="mt-3 font-display text-5xl leading-tight text-brand-champagne">
            Painel administrativo
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
            Faça login para gerenciar publicações, histórias, parceiros, galeria,
            indicadores e conteúdos institucionais do site.
          </p>

          <LoginForm nextPath={next} />
        </div>
      </div>
    </section>
  );
}
