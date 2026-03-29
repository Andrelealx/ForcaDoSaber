import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import {
  getDynamicContactInfo,
  getSeoSettings,
  getSiteIdentity,
} from "@/lib/content-service";
import { contactInfo as fallbackContactInfo } from "@/lib/site-data";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.PUBLIC_SITE_URL ??
  process.env.CARD_VALIDATION_BASE_URL ??
  (process.env.NODE_ENV === "production" ? "https://forcadosaber.com.br" : "http://localhost:3000");

export const dynamic = "force-dynamic";
export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [seo, siteIdentity] = await Promise.all([getSeoSettings(), getSiteIdentity()]);
    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: seo.defaultTitle,
        template: `%s | ${siteIdentity.name}`,
      },
      description: seo.defaultDescription,
      keywords: [
        siteIdentity.name,
        "Guapimirim",
        "educação",
        "impacto social",
        "apoio estudantil",
        "bolsas",
      ],
      openGraph: {
        title: siteIdentity.name,
        description: seo.defaultDescription,
        locale: "pt_BR",
        type: "website",
        siteName: siteIdentity.name,
        images: [seo.ogImage],
      },
      manifest: "/manifest.webmanifest?v=20260329-pwa1",
      applicationName: siteIdentity.name,
      icons: {
        icon: [{ url: "/favicon.ico?v=20260329-pwa1" }],
        shortcut: [{ url: "/favicon.ico?v=20260329-pwa1" }],
        apple: [{ url: "/apple-icon.png?v=20260329-pwa1" }],
      },
      appleWebApp: {
        capable: true,
        title: "Força do Saber",
        statusBarStyle: "black-translucent",
      },
      formatDetection: {
        telephone: false,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch {
    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: "Projeto Força do Saber | Educação e Transformação em Guapimirim",
        template: "%s | Projeto Força do Saber",
      },
      description:
        "Iniciativa educacional de impacto social em Guapimirim-RJ, dedicada a ampliar oportunidades acadêmicas e profissionais por meio da educação.",
      openGraph: {
        title: "Projeto Força do Saber",
        description:
          "Transformando vidas por meio da educação com impacto social em Guapimirim-RJ.",
        locale: "pt_BR",
        type: "website",
        siteName: "Projeto Força do Saber",
        images: ["/images/logo-forca-do-saber.jpg"],
      },
      manifest: "/manifest.webmanifest?v=20260329-pwa1",
      applicationName: "Projeto Força do Saber",
      icons: {
        icon: [{ url: "/favicon.ico?v=20260329-pwa1" }],
        shortcut: [{ url: "/favicon.ico?v=20260329-pwa1" }],
        apple: [{ url: "/apple-icon.png?v=20260329-pwa1" }],
      },
      appleWebApp: {
        capable: true,
        title: "Força do Saber",
        statusBarStyle: "black-translucent",
      },
      formatDetection: {
        telephone: false,
      },
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const layoutMode = headerStore.get("x-fds-layout-mode");
  const isAdminLayout = layoutMode === "admin";
  const isPrintLayout = layoutMode === "print";
  const hidePublicChrome = isAdminLayout || isPrintLayout;

  const defaultSiteIdentity = {
    name: "Projeto Força do Saber",
    tagline: "Guapimirim - RJ",
    description:
      "Projeto educacional de impacto social comprometido com acesso, apoio e oportunidades para transformar vidas por meio da educação.",
  };

  let siteIdentity = defaultSiteIdentity;
  let contactInfo = fallbackContactInfo;

  if (!hidePublicChrome) {
    try {
      [siteIdentity, contactInfo] = await Promise.all([
        getSiteIdentity(),
        getDynamicContactInfo(),
      ]);
    } catch {
      siteIdentity = defaultSiteIdentity;
      contactInfo = fallbackContactInfo;
    }
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: siteIdentity.name,
    url: siteUrl,
    sameAs: [contactInfo.instagramUrl],
    areaServed: "Guapimirim-RJ",
    description: siteIdentity.description,
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>
        {isPrintLayout ? (
          <main id="conteudo-principal" className="min-h-screen bg-white text-black">
            {children}
          </main>
        ) : isAdminLayout ? (
          <main
            id="conteudo-principal"
            className="relative min-h-screen overflow-x-clip bg-brand-black text-brand-soft-white"
          >
            {children}
          </main>
        ) : (
          <div className="relative min-h-screen overflow-x-clip bg-brand-black text-brand-soft-white">
            <a
              href="#conteudo-principal"
              className="sr-only left-4 top-4 z-[60] rounded-full border border-brand-gold/60 bg-brand-black px-4 py-2 text-sm font-semibold text-brand-champagne focus:not-sr-only focus:absolute"
            >
              Pular para conteúdo principal
            </a>
            <div className="pointer-events-none fixed inset-0 -z-10">
              <div className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(184,155,82,0.2)_0%,rgba(5,5,5,0)_68%)]" />
              <div className="absolute bottom-0 left-0 h-80 w-80 bg-[radial-gradient(circle,rgba(210,191,138,0.14)_0%,rgba(5,5,5,0)_72%)]" />
              <div className="absolute right-0 top-1/3 h-64 w-64 bg-[radial-gradient(circle,rgba(231,219,182,0.1)_0%,rgba(5,5,5,0)_78%)]" />
            </div>
            <Header siteName={siteIdentity.name} siteTagline={siteIdentity.tagline} />
            <main id="conteudo-principal">{children}</main>
            <Footer />
          </div>
        )}
      </body>
    </html>
  );
}
