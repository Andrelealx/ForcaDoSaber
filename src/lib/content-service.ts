import "server-only";

import type { PageBlock, Story } from "@prisma/client";
import {
  contactInfo,
  impactMetrics,
  studentCardPartners,
  studentTestimonials,
  type StudentTestimonial,
} from "@/lib/site-data";
import { prisma } from "@/lib/prisma";

export type PublicIndicator = {
  label: string;
  value: number;
  suffix: string;
};

export type PublicPartner = {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  partnershipType: string | null;
  externalLink: string | null;
  displayOrder: number;
};

type SettingsMap = Map<string, string>;

function storyToTestimonial(story: Story): StudentTestimonial {
  const titleParts = [story.course, story.institution].filter(Boolean);
  const title = titleParts.length > 0 ? titleParts.join(" | ") : "Aluno do Projeto Força do Saber";
  const storyParagraphs = story.fullStory
    ? story.fullStory.split(/\n{2,}/).map((item) => item.trim()).filter(Boolean)
    : [story.testimonial];

  return {
    name: story.name,
    title,
    summary: story.achievement ?? story.testimonial,
    quote: story.testimonial,
    story: storyParagraphs,
    primaryPhoto: {
      src: story.photo ?? "/images/logo-forca-do-saber.jpg",
      alt: `Foto de ${story.name}`,
      caption: story.achievement ?? "História de transformação",
    },
    supportingPhotos: [],
  };
}

export async function getHomeIndicators(): Promise<PublicIndicator[]> {
  const indicators = await prisma.indicator.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
  });

  if (indicators.length === 0) {
    return impactMetrics.map((metric) => ({
      label: metric.label,
      value: metric.value,
      suffix: metric.suffix,
    }));
  }

  return indicators.map((item) => ({
    label: item.label,
    value: item.value,
    suffix: item.suffix ?? "",
  }));
}

export async function getPublicStories(): Promise<StudentTestimonial[]> {
  const stories = await prisma.story.findMany({
    where: { published: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  if (stories.length === 0) {
    return studentTestimonials;
  }

  return stories.map(storyToTestimonial);
}

export async function getFeaturedStory(): Promise<StudentTestimonial | null> {
  const featured = await prisma.story.findFirst({
    where: { published: true, featured: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  if (featured) {
    return storyToTestimonial(featured);
  }

  const stories = await getPublicStories();
  return stories[0] ?? null;
}

export async function getPublicPartners(): Promise<PublicPartner[]> {
  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
  });

  if (partners.length === 0) {
    return studentCardPartners.map((partner, index) => ({
      id: `fallback-partner-${index}`,
      name: partner.name,
      logo: null,
      description: `${partner.segment} - ${partner.benefit}`,
      partnershipType: partner.segment,
      externalLink: null,
      displayOrder: index,
    }));
  }

  return partners.map((partner) => ({
    id: partner.id,
    name: partner.name,
    logo: partner.logo,
    description: partner.description,
    partnershipType: partner.partnershipType,
    externalLink: partner.externalLink,
    displayOrder: partner.displayOrder,
  }));
}

export async function getPageBlock(key: string): Promise<PageBlock | null> {
  return prisma.pageBlock.findUnique({ where: { key } });
}

async function getSettingsMap(keys: string[]): Promise<SettingsMap> {
  const settings = await prisma.siteSetting.findMany({
    where: { key: { in: keys } },
  });

  return new Map(settings.map((item) => [item.key, item.value]));
}

export async function getDynamicContactInfo() {
  const map = await getSettingsMap([
    "site.whatsapp",
    "site.whatsapp_label",
    "site.instagram",
    "site.instagram_label",
    "site.email",
    "site.local",
    "site.address",
  ]);

  return {
    ...contactInfo,
    whatsappUrl: map.get("site.whatsapp") ?? contactInfo.whatsappUrl,
    whatsappLabel: map.get("site.whatsapp_label") ?? contactInfo.whatsappLabel,
    instagramUrl: map.get("site.instagram") ?? contactInfo.instagramUrl,
    instagramLabel: map.get("site.instagram_label") ?? contactInfo.instagramLabel,
    email: map.get("site.email") ?? contactInfo.email,
    localReference:
      map.get("site.local") ?? map.get("site.address") ?? contactInfo.localReference,
  };
}

export async function getSiteIdentity() {
  const map = await getSettingsMap(["site.name", "site.tagline", "site.description"]);

  return {
    name: map.get("site.name") ?? "Projeto Força do Saber",
    tagline: map.get("site.tagline") ?? "Guapimirim - RJ",
    description:
      map.get("site.description") ??
      "Projeto educacional de impacto social comprometido com acesso, apoio e oportunidades para transformar vidas por meio da educação.",
  };
}

export async function getSeoSettings() {
  const map = await getSettingsMap([
    "seo.default_title",
    "seo.default_description",
    "seo.og_image",
  ]);

  return {
    defaultTitle:
      map.get("seo.default_title") ??
      "Projeto Força do Saber | Educação e Transformação em Guapimirim",
    defaultDescription:
      map.get("seo.default_description") ??
      "Iniciativa educacional de impacto social em Guapimirim-RJ, dedicada a ampliar oportunidades acadêmicas e profissionais por meio da educação.",
    ogImage: map.get("seo.og_image") ?? "/images/logo-forca-do-saber.jpg",
  };
}
