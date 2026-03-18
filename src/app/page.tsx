import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FounderSection } from "@/components/sections/founder-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { LearningCenterSection } from "@/components/sections/learning-center-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { PurposeSection } from "@/components/sections/purpose-section";
import { StudentGallerySection } from "@/components/sections/student-gallery-section";
import { TestimonialsPreviewSection } from "@/components/sections/testimonials-preview-section";
import { tutoringCenterGallery } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Início",
  description:
    "Projeto Força do Saber: iniciativa educacional de impacto social em Guapimirim-RJ para transformar vidas por meio da educação.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <HowItWorksSection />
      <ImpactSection />
      <FounderSection />
      <TestimonialsPreviewSection />
      <LearningCenterSection />
      <PurposeSection />
      <StudentGallerySection
        limit={3}
        title="Conquistas em destaque"
        description="Alguns registros da jornada acadêmica dos alunos beneficiados."
      />
      <StudentGallerySection
        photos={tutoringCenterGallery}
        limit={4}
        eyebrow="Tutoria acadêmica"
        title="Centro de Ensino Gratuito em ação"
        description="Registros da tutoria acadêmica com acompanhamento, orientação e apoio direto aos estudantes."
      />
      <StudentGallerySection
        folderName="formaturas"
        limit={3}
        eyebrow="Formaturas"
        title="Conquistas que inspiram novas trajetórias"
        description="Registros de alunos celebrando a conclusão de etapas acadêmicas importantes."
        autoCaptionPrefix="Formatura"
      />
      <PartnersSection />
      <ContactSection />
    </>
  );
}
