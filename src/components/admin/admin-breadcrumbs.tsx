"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const segmentLabels: Record<string, string> = {
  publicacoes: "Publicações",
  historias: "Histórias",
  parceiros: "Parceiros",
  galeria: "Galeria",
  carteirinhas: "Carteirinhas",
  indicadores: "Indicadores",
  paginas: "Páginas institucionais",
  configuracoes: "Configurações",
  perfil: "Meu perfil",
  midia: "Mídia",
  nova: "Nova",
  novo: "Novo",
  editar: "Editar",
  impressao: "Impressão",
  print: "Impressão",
};

function segmentToLabel(segment: string) {
  const mapped = segmentLabels[segment];
  if (mapped) return mapped;

  if (/^[a-z0-9]{16,}$/i.test(segment)) {
    return "Registro";
  }

  return segment.replaceAll("-", " ");
}

export function AdminBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1);
  const breadcrumbItems = segments.map((segment, index) => ({
    segment,
    href: `/admin/${segments.slice(0, index + 1).join("/")}`,
    isLast: index === segments.length - 1,
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-2">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-brand-beige/70">
        <li>
          <Link href="/admin" className="hover:text-brand-champagne">
            Painel
          </Link>
        </li>

        {breadcrumbItems.map((item) => {
          const { segment, href, isLast } = item;
          const label = segmentToLabel(segment);

          return (
            <li key={href} className="inline-flex items-center gap-2">
              <span className="text-brand-gold/60">/</span>
              {isLast ? (
                <span className="text-brand-champagne">{label}</span>
              ) : (
                <Link href={href} className="hover:text-brand-champagne">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
