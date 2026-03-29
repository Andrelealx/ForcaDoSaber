import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/about-section";
import { FounderLegacyCalloutSection } from "@/components/sections/founder-legacy-callout-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowWeHelpSection } from "@/components/sections/how-we-help-section";
import { ImpactSection } from "@/components/sections/impact-section";
import { SupportCtaSection } from "@/components/sections/support-cta-section";
import { TestimonialsPreviewSection } from "@/components/sections/testimonials-preview-section";
import {
  getFeaturedStory,
  getHomeIndicators,
  getPageBlock,
} from "@/lib/content-service";

export const metadata: Metadata = {
  title: "Projeto Força do Saber",
  description:
    "Projeto Força do Saber: iniciativa educacional de impacto social em Guapimirim-RJ para transformar vidas por meio da educação.",
};

export default async function Home() {
  const [heroBlock, aboutBlock, legacyCalloutBlock, finalCtaBlock, indicators, featuredStory] = await Promise.all([
    getPageBlock("home.hero"),
    getPageBlock("home.about"),
    getPageBlock("home.jose-legacy"),
    getPageBlock("home.final-cta"),
    getHomeIndicators(),
    getFeaturedStory(),
  ]);

  return (
    <>
      <HeroSection content={heroBlock} />
      <AboutSection content={aboutBlock} />
      <FounderLegacyCalloutSection content={legacyCalloutBlock} />
      <ImpactSection compact metrics={indicators} />
      <HowWeHelpSection />
      <TestimonialsPreviewSection featuredStory={featuredStory} />
      <SupportCtaSection content={finalCtaBlock} />
    </>
  );
}
