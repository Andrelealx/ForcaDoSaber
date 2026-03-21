import {
  updateAdminPasswordAction,
  updateAdminProfileAction,
} from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { requireAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export default async function AdminPerfilPage() {
  const admin = await requireAdmin();
  const user = await prisma.user.findUnique({
    where: { id: admin.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    return (
      <div className="gold-outline rounded-2xl border p-6">
        <p className="text-sm text-brand-soft-white/82">Usuário administrador não encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Meu perfil</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Conta administrativa</h1>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Dados do usuário</h2>
        <p className="mt-2 text-sm text-brand-soft-white/82">
          Atualize nome e e-mail da conta logada.
        </p>

        <form action={updateAdminProfileAction} className="mt-5 grid gap-3 md:grid-cols-2">
          <label className="block text-sm">
            <span className="mb-2 block text-brand-beige/85">Nome</span>
            <input
              name="name"
              required
              defaultValue={user.name}
              className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-brand-soft-white outline-none focus:border-brand-gold/65"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-brand-beige/85">E-mail</span>
            <input
              type="email"
              name="email"
              required
              defaultValue={user.email}
              className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-brand-soft-white outline-none focus:border-brand-gold/65"
            />
          </label>

          <div className="md:col-span-2">
            <SubmitButton label="Salvar perfil" pendingLabel="Salvando..." />
          </div>
        </form>

        <div className="mt-4 rounded-xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3 text-xs text-brand-beige/75">
          {user.role} | Criado em {user.createdAt.toLocaleDateString("pt-BR")} | Atualizado em{" "}
          {user.updatedAt.toLocaleDateString("pt-BR")}
        </div>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Alterar senha</h2>
        <p className="mt-2 text-sm text-brand-soft-white/82">
          Para segurança, informe sua senha atual antes da nova senha.
        </p>

        <form action={updateAdminPasswordAction} className="mt-5 grid gap-3 md:grid-cols-3">
          <label className="block text-sm">
            <span className="mb-2 block text-brand-beige/85">Senha atual</span>
            <input
              type="password"
              name="currentPassword"
              required
              className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-brand-soft-white outline-none focus:border-brand-gold/65"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-brand-beige/85">Nova senha</span>
            <input
              type="password"
              name="newPassword"
              required
              minLength={8}
              className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-brand-soft-white outline-none focus:border-brand-gold/65"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-2 block text-brand-beige/85">Confirmar nova senha</span>
            <input
              type="password"
              name="confirmPassword"
              required
              minLength={8}
              className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-brand-soft-white outline-none focus:border-brand-gold/65"
            />
          </label>

          <div className="md:col-span-3">
            <SubmitButton label="Atualizar senha" pendingLabel="Atualizando..." />
          </div>
        </form>
      </div>
    </>
  );
}
