import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Projeto Força do Saber",
  url: siteUrl,
  sameAs: ["https://www.instagram.com/projetoforcadosaberng/"],
  areaServed: "Guapimirim-RJ",
  description:
    "Iniciativa educacional de impacto social em Guapimirim, voltada à transformação de vidas por meio da educação.",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Projeto Força do Saber | Educação e Transformação em Guapimirim",
    template: "%s | Projeto Força do Saber",
  },
  description:
    "Iniciativa educacional de impacto social em Guapimirim-RJ, dedicada a ampliar oportunidades acadêmicas e profissionais por meio da educação.",
  keywords: [
    "Projeto Força do Saber",
    "Guapimirim",
    "educação",
    "impacto social",
    "apoio estudantil",
    "bolsas",
  ],
  openGraph: {
    title: "Projeto Força do Saber",
    description:
      "Transformando vidas por meio da educação com impacto social em Guapimirim-RJ.",
    locale: "pt_BR",
    type: "website",
    siteName: "Projeto Força do Saber",
    images: ["/images/logo-forca-do-saber.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>
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
          <Header />
          <main id="conteudo-principal">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
