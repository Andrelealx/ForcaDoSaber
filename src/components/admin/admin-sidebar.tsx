"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/publicacoes", label: "Publicações" },
  { href: "/admin/historias", label: "Histórias" },
  { href: "/admin/parceiros", label: "Parceiros" },
  { href: "/admin/carteirinhas", label: "Carteirinhas" },
  { href: "/admin/galeria", label: "Galeria" },
  { href: "/admin/midia", label: "Mídia" },
  { href: "/admin/indicadores", label: "Indicadores" },
  { href: "/admin/paginas", label: "Páginas institucionais" },
  { href: "/admin/configuracoes", label: "Configurações" },
  { href: "/admin/perfil", label: "Meu perfil" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="gold-outline h-fit rounded-2xl border p-4 lg:sticky lg:top-28">
      <p className="mb-4 px-2 text-xs uppercase tracking-[0.18em] text-brand-beige/80">
        Módulos do painel
      </p>
      <nav className="space-y-1">
        {links.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "block rounded-xl px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-brand-gold/20 text-brand-champagne"
                  : "text-brand-soft-white/80 hover:bg-brand-gold/10 hover:text-brand-soft-white",
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
