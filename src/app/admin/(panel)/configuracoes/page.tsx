import {
  createAdminUserAction,
  saveSiteSettingAction,
  toggleAdminUserStatusAction,
} from "@/app/admin/(panel)/actions";
import { SubmitButton } from "@/components/admin/submit-button";
import { requireAdmin } from "@/lib/admin-auth";
import { contactInfo } from "@/lib/site-data";
import { prisma } from "@/lib/prisma";

const generalSettingKeys = [
  { key: "site.name", label: "Nome do projeto", fallback: "Projeto Força do Saber" },
  { key: "site.tagline", label: "Tagline/local", fallback: "Guapimirim - RJ" },
  {
    key: "site.description",
    label: "Descrição institucional",
    fallback:
      "Projeto educacional de impacto social comprometido com acesso, apoio e oportunidades para transformar vidas por meio da educação.",
  },
];

const contactSettingKeys = [
  { key: "site.whatsapp", label: "WhatsApp", fallback: contactInfo.whatsappUrl },
  { key: "site.whatsapp_label", label: "Rótulo do WhatsApp", fallback: contactInfo.whatsappLabel },
  { key: "site.instagram", label: "Instagram", fallback: contactInfo.instagramUrl },
  { key: "site.instagram_label", label: "Rótulo do Instagram", fallback: contactInfo.instagramLabel },
  { key: "site.email", label: "E-mail", fallback: contactInfo.email },
  { key: "site.local", label: "Referência local", fallback: contactInfo.localReference },
  { key: "site.address", label: "Endereço", fallback: "Guapimirim - RJ" },
];

const socialSettingKeys = [
  { key: "site.facebook", label: "Facebook", fallback: "" },
  { key: "site.youtube", label: "YouTube", fallback: "" },
  { key: "site.linkedin", label: "LinkedIn", fallback: "" },
];

const seoSettingKeys = [
  {
    key: "seo.default_title",
    label: "Título SEO global",
    fallback: "Projeto Força do Saber | Educação e Transformação em Guapimirim",
  },
  {
    key: "seo.default_description",
    label: "Descrição SEO global",
    fallback:
      "Iniciativa educacional de impacto social em Guapimirim-RJ, dedicada a ampliar oportunidades acadêmicas e profissionais por meio da educação.",
  },
  { key: "seo.og_image", label: "Imagem Open Graph", fallback: "/images/logo-forca-do-saber.jpg" },
];

const institutionalLinks = [
  { key: "site.privacy_url", label: "Política de privacidade", fallback: "" },
  { key: "site.terms_url", label: "Termos de uso", fallback: "" },
  { key: "site.about_url", label: "Link institucional externo", fallback: "" },
];

export default async function AdminConfiguracoesPage() {
  const admin = await requireAdmin();

  if (admin.role !== "ADMIN") {
    return (
      <div className="gold-outline rounded-2xl border p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-red-200">Acesso restrito</p>
        <h1 className="mt-2 font-display text-4xl text-brand-champagne">
          Configurações disponíveis apenas para administradores
        </h1>
        <p className="mt-3 text-sm text-brand-soft-white/82">
          Seu perfil está como <strong>{admin.role}</strong>. Para editar configurações globais e
          usuários do painel, use uma conta com papel ADMIN.
        </p>
      </div>
    );
  }

  const [settings, users] = await Promise.all([
    prisma.siteSetting.findMany({ orderBy: { key: "asc" } }),
    prisma.user.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  const settingMap = new Map(settings.map((item) => [item.key, item.value]));

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Configurações</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Ajustes básicos</h1>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Identidade do projeto</h2>
        <div className="mt-4 space-y-3">
          {generalSettingKeys.map((item) => (
            <form key={item.key} action={saveSiteSettingAction} className="flex flex-wrap gap-3">
              <input type="hidden" name="key" value={item.key} />
              <input
                name="value"
                defaultValue={settingMap.get(item.key) ?? item.fallback}
                className="min-w-[280px] flex-1 rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
              <SubmitButton
                label={`Salvar ${item.label}`}
                pendingLabel="Salvando..."
                variant="secondary"
              />
            </form>
          ))}
        </div>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Contatos principais</h2>
        <div className="mt-4 space-y-3">
          {contactSettingKeys.map((item) => (
            <form key={item.key} action={saveSiteSettingAction} className="flex flex-wrap gap-3">
              <input type="hidden" name="key" value={item.key} />
              <input
                name="value"
                defaultValue={settingMap.get(item.key) ?? item.fallback}
                className="min-w-[280px] flex-1 rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
              <SubmitButton
                label={`Salvar ${item.label}`}
                pendingLabel="Salvando..."
                variant="secondary"
              />
            </form>
          ))}
        </div>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Redes sociais</h2>
        <div className="mt-4 space-y-3">
          {socialSettingKeys.map((item) => (
            <form key={item.key} action={saveSiteSettingAction} className="flex flex-wrap gap-3">
              <input type="hidden" name="key" value={item.key} />
              <input
                name="value"
                defaultValue={settingMap.get(item.key) ?? item.fallback}
                className="min-w-[280px] flex-1 rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
              <SubmitButton
                label={`Salvar ${item.label}`}
                pendingLabel="Salvando..."
                variant="secondary"
              />
            </form>
          ))}
        </div>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Links institucionais</h2>
        <div className="mt-4 space-y-3">
          {institutionalLinks.map((item) => (
            <form key={item.key} action={saveSiteSettingAction} className="flex flex-wrap gap-3">
              <input type="hidden" name="key" value={item.key} />
              <input
                name="value"
                defaultValue={settingMap.get(item.key) ?? item.fallback}
                className="min-w-[280px] flex-1 rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
              <SubmitButton
                label={`Salvar ${item.label}`}
                pendingLabel="Salvando..."
                variant="secondary"
              />
            </form>
          ))}
        </div>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">SEO básico global</h2>
        <div className="mt-4 space-y-3">
          {seoSettingKeys.map((item) => (
            <form key={item.key} action={saveSiteSettingAction} className="flex flex-wrap gap-3">
              <input type="hidden" name="key" value={item.key} />
              <input
                name="value"
                defaultValue={settingMap.get(item.key) ?? item.fallback}
                className="min-w-[280px] flex-1 rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
              />
              <SubmitButton
                label={`Salvar ${item.label}`}
                pendingLabel="Salvando..."
                variant="secondary"
              />
            </form>
          ))}
        </div>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Criar usuário administrador</h2>
        <form action={createAdminUserAction} className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            name="name"
            placeholder="Nome"
            required
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <input
            type="password"
            name="password"
            placeholder="Senha (mín. 8 caracteres)"
            required
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          />
          <select
            name="role"
            defaultValue="ADMIN"
            className="rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-2 text-sm text-brand-soft-white outline-none focus:border-brand-gold/65"
          >
            <option value="ADMIN">ADMIN</option>
            <option value="EDITOR">EDITOR</option>
          </select>

          <label className="inline-flex items-center gap-2 text-sm text-brand-soft-white/88">
            <input type="checkbox" name="isActive" defaultChecked className="h-4 w-4 accent-brand-gold" />
            Usuário ativo
          </label>

          <div>
            <SubmitButton label="Criar usuário" pendingLabel="Criando..." />
          </div>
        </form>
      </div>

      <div className="gold-outline rounded-2xl border p-6">
        <h2 className="font-display text-3xl text-brand-champagne">Usuários cadastrados</h2>
        <div className="mt-4 space-y-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-xl border border-brand-gold/20 bg-brand-black/45 px-4 py-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-brand-champagne">{user.name}</p>
                  <p className="text-xs text-brand-beige/75">
                    {user.email} | {user.role} | {user.isActive ? "Ativo" : "Inativo"}
                  </p>
                </div>

                <form action={toggleAdminUserStatusAction}>
                  <input type="hidden" name="id" value={user.id} />
                  <SubmitButton
                    label={user.isActive ? "Desativar" : "Ativar"}
                    pendingLabel="Atualizando..."
                    variant="secondary"
                    className="text-xs"
                  />
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
