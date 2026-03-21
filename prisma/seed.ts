import bcrypt from "bcryptjs";
import { PrismaClient, PublicationStatus, UserRole } from "@prisma/client";
import {
  founderBiography,
  impactMetrics,
  studentCardPartners,
  studentTestimonials,
  values,
  contactInfo,
} from "../src/lib/site-data";

const prisma = new PrismaClient();

function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seedAdmin() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@forcadosaber.org.br";
  const adminName = process.env.ADMIN_NAME ?? "Administrador Força do Saber";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123456";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: UserRole.ADMIN,
      isActive: true,
    },
  });
}

async function seedIndicators() {
  for (const [index, metric] of impactMetrics.entries()) {
    await prisma.indicator.upsert({
      where: { key: slugify(metric.label) },
      update: {
        label: metric.label,
        value: metric.value,
        suffix: metric.suffix,
        displayOrder: index,
        isActive: true,
      },
      create: {
        key: slugify(metric.label),
        label: metric.label,
        value: metric.value,
        suffix: metric.suffix,
        displayOrder: index,
        isActive: true,
      },
    });
  }
}

async function seedStories() {
  for (const [index, testimonial] of studentTestimonials.entries()) {
    await prisma.story.upsert({
      where: { id: `seed-story-${index + 1}` },
      update: {
        name: testimonial.name,
        photo: testimonial.primaryPhoto.src,
        testimonial: testimonial.quote,
        fullStory: testimonial.story.join("\n\n"),
        course: testimonial.title,
        achievement: testimonial.summary,
        year: new Date().getFullYear(),
        displayOrder: index,
        published: true,
        featured: index === 0,
      },
      create: {
        id: `seed-story-${index + 1}`,
        name: testimonial.name,
        photo: testimonial.primaryPhoto.src,
        testimonial: testimonial.quote,
        fullStory: testimonial.story.join("\n\n"),
        course: testimonial.title,
        achievement: testimonial.summary,
        year: new Date().getFullYear(),
        displayOrder: index,
        published: true,
        featured: index === 0,
      },
    });
  }
}

async function seedPartners() {
  for (const [index, partner] of studentCardPartners.entries()) {
    await prisma.partner.upsert({
      where: { id: `seed-partner-${index + 1}` },
      update: {
        name: partner.name,
        logo: null,
        description: `${partner.segment} - ${partner.benefit}`,
        partnershipType: partner.segment,
        externalLink: null,
        isActive: true,
        displayOrder: index,
      },
      create: {
        id: `seed-partner-${index + 1}`,
        name: partner.name,
        logo: null,
        description: `${partner.segment} - ${partner.benefit}`,
        partnershipType: partner.segment,
        externalLink: null,
        isActive: true,
        displayOrder: index,
      },
    });
  }
}

async function seedPageBlocks() {
  const blocks = [
    {
      key: "home.hero",
      section: "home",
      title: "Educação que abre caminhos reais para estudantes de Guapimirim",
      subtitle:
        "O Força do Saber conecta estudantes a orientação, bolsas e oportunidades para transformar trajetórias com seriedade e presença local.",
      body: null,
      ctaPrimaryLabel: "Conheça o projeto",
      ctaPrimaryHref: "/quem-somos",
      ctaSecondaryLabel: "Quero apoiar",
      ctaSecondaryHref: "/contato",
    },
    {
      key: "home.about",
      section: "home",
      title: "Uma iniciativa institucional de educação e mobilidade social",
      subtitle:
        "O projeto atua em Guapimirim para aproximar estudantes de orientação educacional, bolsas e oportunidades concretas.",
      body:
        "O Força do Saber nasceu para responder a desafios reais do território: apoiar quem quer estudar, reduzir barreiras e conectar pessoas a caminhos de crescimento.",
      ctaPrimaryLabel: "Ver Quem Somos",
      ctaPrimaryHref: "/quem-somos",
      ctaSecondaryLabel: null,
      ctaSecondaryHref: null,
    },
    {
      key: "home.jose-legacy",
      section: "home",
      title: "Inspirado pelo legado de José Augusto",
      subtitle:
        "Uma liderança local que transformou compromisso social em uma iniciativa educacional com impacto real em Guapimirim.",
      body: null,
      ctaPrimaryLabel: "Conhecer esse legado",
      ctaPrimaryHref: "/o-projeto#legado-jose-augusto",
      ctaSecondaryLabel: null,
      ctaSecondaryHref: null,
    },
    {
      key: "home.final-cta",
      section: "home",
      title: "Sua participação amplia oportunidades reais",
      subtitle:
        "Empresas, instituições e apoiadores individuais podem fortalecer bolsas, orientação e estrutura para estudantes de Guapimirim.",
      body: null,
      ctaPrimaryLabel: "Quero apoiar",
      ctaPrimaryHref: "/contato",
      ctaSecondaryLabel: "Quero ser parceiro",
      ctaSecondaryHref: "/parceiros",
    },
    {
      key: "quem-somos.historia",
      section: "quem-somos",
      title: "Trajetória do Projeto Força do Saber",
      subtitle: "Resumo institucional da construção do projeto na cidade.",
      body: founderBiography.join("\n\n"),
      ctaPrimaryLabel: null,
      ctaPrimaryHref: null,
      ctaSecondaryLabel: null,
      ctaSecondaryHref: null,
    },
    {
      key: "quem-somos.missao",
      section: "quem-somos",
      title: "Missão",
      subtitle: null,
      body: "Transformar vidas com orientação, acolhimento e oportunidades que ampliem autonomia, dignidade e futuro.",
      ctaPrimaryLabel: null,
      ctaPrimaryHref: null,
      ctaSecondaryLabel: null,
      ctaSecondaryHref: null,
    },
    {
      key: "quem-somos.visao",
      section: "quem-somos",
      title: "Visão",
      subtitle: null,
      body: "Ser uma referência regional de impacto educacional com resultados sociais consistentes e atuação institucional séria.",
      ctaPrimaryLabel: null,
      ctaPrimaryHref: null,
      ctaSecondaryLabel: null,
      ctaSecondaryHref: null,
    },
    {
      key: "quem-somos.valores",
      section: "quem-somos",
      title: "Valores",
      subtitle: "Princípios que orientam cada decisão",
      body: values.join("\n"),
      ctaPrimaryLabel: null,
      ctaPrimaryHref: null,
      ctaSecondaryLabel: null,
      ctaSecondaryHref: null,
    },
    {
      key: "o-projeto.jose-legacy",
      section: "o-projeto",
      title: "Legado de José Augusto",
      subtitle:
        "A liderança de José Augusto é parte central da origem, identidade e continuidade institucional do Força do Saber.",
      body: founderBiography.join("\n\n"),
      ctaPrimaryLabel: null,
      ctaPrimaryHref: null,
      ctaSecondaryLabel: null,
      ctaSecondaryHref: null,
    },
  ];

  for (const block of blocks) {
    await prisma.pageBlock.upsert({
      where: { key: block.key },
      update: {
        section: block.section,
        title: block.title,
        subtitle: block.subtitle,
        body: block.body,
        ctaPrimaryLabel: block.ctaPrimaryLabel,
        ctaPrimaryHref: block.ctaPrimaryHref,
        ctaSecondaryLabel: block.ctaSecondaryLabel,
        ctaSecondaryHref: block.ctaSecondaryHref,
      },
      create: {
        key: block.key,
        section: block.section,
        title: block.title,
        subtitle: block.subtitle,
        body: block.body,
        ctaPrimaryLabel: block.ctaPrimaryLabel,
        ctaPrimaryHref: block.ctaPrimaryHref,
        ctaSecondaryLabel: block.ctaSecondaryLabel,
        ctaSecondaryHref: block.ctaSecondaryHref,
      },
    });
  }
}

async function seedSiteSettings() {
  const settings = [
    ["site.name", "Projeto Força do Saber"],
    ["site.tagline", "Guapimirim - RJ"],
    [
      "site.description",
      "Projeto educacional de impacto social comprometido com acesso, apoio e oportunidades para transformar vidas por meio da educação.",
    ],
    ["site.whatsapp", contactInfo.whatsappUrl],
    ["site.whatsapp_label", contactInfo.whatsappLabel],
    ["site.instagram", contactInfo.instagramUrl],
    ["site.instagram_label", contactInfo.instagramLabel],
    ["site.email", contactInfo.email],
    ["site.local", contactInfo.localReference],
    ["site.address", "Guapimirim - RJ"],
    ["seo.default_title", "Projeto Força do Saber | Educação e Transformação em Guapimirim"],
    [
      "seo.default_description",
      "Iniciativa educacional de impacto social em Guapimirim-RJ, dedicada a ampliar oportunidades acadêmicas e profissionais por meio da educação.",
    ],
    ["seo.og_image", "/images/logo-forca-do-saber.jpg"],
  ] as const;

  for (const [key, value] of settings) {
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}

async function seedPublicationSample() {
  const title = "Força do Saber fortalece novas oportunidades em Guapimirim";
  await prisma.publication.upsert({
    where: { slug: slugify(title) },
    update: {
      title,
      summary:
        "Projeto amplia articulações para fortalecer acesso educacional e permanência estudantil.",
      content:
        "Conteúdo inicial para validar o módulo de publicações. Este texto pode ser editado no painel administrativo.",
      status: PublicationStatus.PUBLISHED,
      featuredOnHome: true,
      publishedAt: new Date(),
      category: "Atualizações",
      authorName: "Equipe Força do Saber",
    },
    create: {
      title,
      slug: slugify(title),
      summary:
        "Projeto amplia articulações para fortalecer acesso educacional e permanência estudantil.",
      content:
        "Conteúdo inicial para validar o módulo de publicações. Este texto pode ser editado no painel administrativo.",
      status: PublicationStatus.PUBLISHED,
      featuredOnHome: true,
      publishedAt: new Date(),
      category: "Atualizações",
      authorName: "Equipe Força do Saber",
    },
  });
}

async function seedStudentCards() {
  const validityDate = new Date();
  validityDate.setFullYear(validityDate.getFullYear() + 1);

  await prisma.studentCard.upsert({
    where: { cardCode: "FDS-EXEMPLO-0001" },
    update: {
      fullName: "José Augusto",
      photo: "/images/jose-augusto.jpeg",
      enrollment: "0000000",
      course: "Administração",
      unit: "Nova Guapimirim",
      validityDate,
      issueDate: new Date(),
      status: "ACTIVE",
      notes: "Cartão de referência para validação do módulo administrativo.",
      validationToken: "validacao-fds-exemplo-0001",
      responsibleName: "José Augusto Oliveira Cordeiro",
      responsibleRole: "Responsável institucional",
      isArchived: false,
    },
    create: {
      fullName: "José Augusto",
      photo: "/images/jose-augusto.jpeg",
      enrollment: "0000000",
      course: "Administração",
      unit: "Nova Guapimirim",
      cardCode: "FDS-EXEMPLO-0001",
      validityDate,
      issueDate: new Date(),
      status: "ACTIVE",
      notes: "Cartão de referência para validação do módulo administrativo.",
      validationToken: "validacao-fds-exemplo-0001",
      responsibleName: "José Augusto Oliveira Cordeiro",
      responsibleRole: "Responsável institucional",
      isArchived: false,
    },
  });
}

async function main() {
  await seedAdmin();
  await seedIndicators();
  await seedStories();
  await seedPartners();
  await seedPageBlocks();
  await seedSiteSettings();
  await seedPublicationSample();
  await seedStudentCards();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
