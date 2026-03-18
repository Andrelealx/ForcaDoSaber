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
      <PartnersSection />
      <ContactSection />
    </>
  );
}
