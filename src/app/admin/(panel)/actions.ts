"use server";

import bcrypt from "bcryptjs";
import { PublicationStatus, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import {
  formBoolean,
  formInt,
  formOptionalDate,
  formOptionalString,
  formString,
  linesToArray,
  slugify,
} from "@/lib/admin-utils";
import { prisma } from "@/lib/prisma";

async function uniquePublicationSlug(baseSlug: string, excludeId?: string) {
  let candidate = baseSlug;
  let counter = 2;

  while (true) {
    const existing = await prisma.publication.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === excludeId) {
      return candidate;
    }
    candidate = `${baseSlug}-${counter}`;
    counter += 1;
  }
}

function parseGalleryImages(formData: FormData) {
  const lines = linesToArray(formData.get("galleryImages"));
  return lines.map((imageUrl, index) => ({ imageUrl, displayOrder: index }));
}

function revalidatePublicContent() {
  revalidatePath("/");
  revalidatePath("/contato");
  revalidatePath("/como-funciona");
  revalidatePath("/impacto");
  revalidatePath("/historias");
  revalidatePath("/parceiros");
  revalidatePath("/quem-somos");
  revalidatePath("/publicacoes");
}

export async function createPublicationAction(formData: FormData) {
  const admin = await requireAdmin();

  const title = formString(formData.get("title"));
  const summary = formString(formData.get("summary"));
  const content = formString(formData.get("content"));

  if (!title || !summary || !content) {
    throw new Error("Título, resumo e conteúdo são obrigatórios.");
  }

  const inputSlug = formString(formData.get("slug"));
  const baseSlug = slugify(inputSlug || title);
  const slug = await uniquePublicationSlug(baseSlug || `publicacao-${Date.now()}`);

  const status = formString(formData.get("status")) === "PUBLISHED"
    ? PublicationStatus.PUBLISHED
    : PublicationStatus.DRAFT;

  const publicationDate = formOptionalDate(formData.get("publishedAt"));
  const gallery = parseGalleryImages(formData);

  await prisma.publication.create({
    data: {
      title,
      slug,
      summary,
      content,
      coverImage: formOptionalString(formData.get("coverImage")),
      category: formOptionalString(formData.get("category")),
      authorName: formOptionalString(formData.get("authorName")),
      featuredOnHome: formBoolean(formData.get("featuredOnHome")),
      status,
      isArchived: false,
      publishedAt: status === PublicationStatus.PUBLISHED ? publicationDate ?? new Date() : null,
      createdById: admin.id,
      gallery: gallery.length > 0 ? { create: gallery } : undefined,
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/publicacoes");
  redirect("/admin/publicacoes");
}

export async function updatePublicationAction(formData: FormData) {
  await requireAdmin();

  const id = formString(formData.get("id"));
  const title = formString(formData.get("title"));
  const summary = formString(formData.get("summary"));
  const content = formString(formData.get("content"));

  if (!id || !title || !summary || !content) {
    throw new Error("Dados obrigatórios ausentes para atualização.");
  }

  const inputSlug = formString(formData.get("slug"));
  const baseSlug = slugify(inputSlug || title);
  const slug = await uniquePublicationSlug(baseSlug || `publicacao-${Date.now()}`, id);

  const status = formString(formData.get("status")) === "PUBLISHED"
    ? PublicationStatus.PUBLISHED
    : PublicationStatus.DRAFT;

  const publicationDate = formOptionalDate(formData.get("publishedAt"));
  const gallery = parseGalleryImages(formData);

  await prisma.publication.update({
    where: { id },
    data: {
      title,
      slug,
      summary,
      content,
      coverImage: formOptionalString(formData.get("coverImage")),
      category: formOptionalString(formData.get("category")),
      authorName: formOptionalString(formData.get("authorName")),
      featuredOnHome: formBoolean(formData.get("featuredOnHome")),
      status,
      isArchived: formBoolean(formData.get("isArchived")),
      publishedAt: status === PublicationStatus.PUBLISHED ? publicationDate ?? new Date() : null,
      gallery: {
        deleteMany: {},
        create: gallery,
      },
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/publicacoes");
  redirect("/admin/publicacoes");
}

export async function deletePublicationAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  await prisma.publication.delete({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/publicacoes");
}

export async function togglePublicationStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  const action = formString(formData.get("actionType"));
  if (!id) return;

  const publish = action === "publish";

  await prisma.publication.update({
    where: { id },
    data: {
      status: publish ? PublicationStatus.PUBLISHED : PublicationStatus.DRAFT,
      isArchived: publish ? false : undefined,
      publishedAt: publish ? new Date() : null,
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/publicacoes");
}

export async function togglePublicationArchiveAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  const publication = await prisma.publication.findUnique({
    where: { id },
    select: { isArchived: true },
  });

  if (!publication) return;

  await prisma.publication.update({
    where: { id },
    data: {
      isArchived: !publication.isArchived,
      status: publication.isArchived ? undefined : PublicationStatus.DRAFT,
      featuredOnHome: publication.isArchived ? undefined : false,
      publishedAt: publication.isArchived ? undefined : null,
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/publicacoes");
}

export async function createStoryAction(formData: FormData) {
  await requireAdmin();

  const name = formString(formData.get("name"));
  const testimonial = formString(formData.get("testimonial"));
  if (!name || !testimonial) {
    throw new Error("Nome e depoimento são obrigatórios.");
  }

  await prisma.story.create({
    data: {
      name,
      photo: formOptionalString(formData.get("photo")),
      testimonial,
      fullStory: formOptionalString(formData.get("fullStory")),
      course: formOptionalString(formData.get("course")),
      institution: formOptionalString(formData.get("institution")),
      achievement: formOptionalString(formData.get("achievement")),
      year: formInt(formData.get("year"), 0) || null,
      displayOrder: formInt(formData.get("displayOrder"), 0),
      published: formBoolean(formData.get("published")),
      featured: formBoolean(formData.get("featured")),
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/historias");
  redirect("/admin/historias");
}

export async function updateStoryAction(formData: FormData) {
  await requireAdmin();

  const id = formString(formData.get("id"));
  const name = formString(formData.get("name"));
  const testimonial = formString(formData.get("testimonial"));
  if (!id || !name || !testimonial) {
    throw new Error("Dados obrigatórios ausentes para atualização.");
  }

  await prisma.story.update({
    where: { id },
    data: {
      name,
      photo: formOptionalString(formData.get("photo")),
      testimonial,
      fullStory: formOptionalString(formData.get("fullStory")),
      course: formOptionalString(formData.get("course")),
      institution: formOptionalString(formData.get("institution")),
      achievement: formOptionalString(formData.get("achievement")),
      year: formInt(formData.get("year"), 0) || null,
      displayOrder: formInt(formData.get("displayOrder"), 0),
      published: formBoolean(formData.get("published")),
      featured: formBoolean(formData.get("featured")),
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/historias");
  redirect("/admin/historias");
}

export async function deleteStoryAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  await prisma.story.delete({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/historias");
}

export async function toggleStoryPublishAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  const story = await prisma.story.findUnique({ where: { id }, select: { published: true } });
  if (!story) return;

  await prisma.story.update({
    where: { id },
    data: { published: !story.published },
  });

  revalidatePublicContent();
  revalidatePath("/admin/historias");
}

export async function createPartnerAction(formData: FormData) {
  await requireAdmin();

  const name = formString(formData.get("name"));
  const description = formString(formData.get("description"));
  if (!name || !description) {
    throw new Error("Nome e descrição são obrigatórios.");
  }

  await prisma.partner.create({
    data: {
      name,
      logo: formOptionalString(formData.get("logo")),
      description,
      partnershipType: formOptionalString(formData.get("partnershipType")),
      externalLink: formOptionalString(formData.get("externalLink")),
      isActive: formBoolean(formData.get("isActive")),
      displayOrder: formInt(formData.get("displayOrder"), 0),
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/parceiros");
  redirect("/admin/parceiros");
}

export async function updatePartnerAction(formData: FormData) {
  await requireAdmin();

  const id = formString(formData.get("id"));
  const name = formString(formData.get("name"));
  const description = formString(formData.get("description"));
  if (!id || !name || !description) {
    throw new Error("Dados obrigatórios ausentes para atualização.");
  }

  await prisma.partner.update({
    where: { id },
    data: {
      name,
      logo: formOptionalString(formData.get("logo")),
      description,
      partnershipType: formOptionalString(formData.get("partnershipType")),
      externalLink: formOptionalString(formData.get("externalLink")),
      isActive: formBoolean(formData.get("isActive")),
      displayOrder: formInt(formData.get("displayOrder"), 0),
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/parceiros");
  redirect("/admin/parceiros");
}

export async function deletePartnerAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  await prisma.partner.delete({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/parceiros");
}

export async function togglePartnerStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  const partner = await prisma.partner.findUnique({ where: { id }, select: { isActive: true } });
  if (!partner) return;

  await prisma.partner.update({
    where: { id },
    data: { isActive: !partner.isActive },
  });

  revalidatePublicContent();
  revalidatePath("/admin/parceiros");
}

export async function createGalleryAlbumAction(formData: FormData) {
  await requireAdmin();

  const title = formString(formData.get("title"));
  if (!title) {
    throw new Error("Título do álbum é obrigatório.");
  }

  const images = linesToArray(formData.get("imageUrls"));

  await prisma.galleryAlbum.create({
    data: {
      title,
      description: formOptionalString(formData.get("description")),
      category: formOptionalString(formData.get("category")),
      eventDate: formOptionalDate(formData.get("eventDate")),
      featured: formBoolean(formData.get("featured")),
      published: formBoolean(formData.get("published")),
      displayOrder: formInt(formData.get("displayOrder"), 0),
      images: {
        create: images.map((imageUrl, index) => ({ imageUrl, displayOrder: index })),
      },
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria");
}

export async function updateGalleryAlbumAction(formData: FormData) {
  await requireAdmin();

  const id = formString(formData.get("id"));
  const title = formString(formData.get("title"));
  if (!id || !title) {
    throw new Error("Dados obrigatórios ausentes para atualização.");
  }

  const images = linesToArray(formData.get("imageUrls"));

  await prisma.galleryAlbum.update({
    where: { id },
    data: {
      title,
      description: formOptionalString(formData.get("description")),
      category: formOptionalString(formData.get("category")),
      eventDate: formOptionalDate(formData.get("eventDate")),
      featured: formBoolean(formData.get("featured")),
      published: formBoolean(formData.get("published")),
      displayOrder: formInt(formData.get("displayOrder"), 0),
      images: {
        deleteMany: {},
        create: images.map((imageUrl, index) => ({ imageUrl, displayOrder: index })),
      },
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/galeria");
  redirect("/admin/galeria");
}

export async function deleteGalleryAlbumAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  await prisma.galleryAlbum.delete({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/galeria");
}

export async function saveIndicatorAction(formData: FormData) {
  await requireAdmin();

  const id = formString(formData.get("id"));
  const label = formString(formData.get("label"));
  const keyInput = formString(formData.get("key"));
  if (!label) {
    throw new Error("Label é obrigatório.");
  }

  const key = slugify(keyInput || label);
  const value = formInt(formData.get("value"), 0);

  if (id) {
    await prisma.indicator.update({
      where: { id },
      data: {
        key,
        label,
        value,
        suffix: formOptionalString(formData.get("suffix")),
        displayOrder: formInt(formData.get("displayOrder"), 0),
        isActive: formBoolean(formData.get("isActive")),
      },
    });
  } else {
    await prisma.indicator.create({
      data: {
        key,
        label,
        value,
        suffix: formOptionalString(formData.get("suffix")),
        displayOrder: formInt(formData.get("displayOrder"), 0),
        isActive: formBoolean(formData.get("isActive")),
      },
    });
  }

  revalidatePublicContent();
  revalidatePath("/admin/indicadores");
  redirect("/admin/indicadores");
}

export async function deleteIndicatorAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  await prisma.indicator.delete({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/indicadores");
}

export async function updatePageBlockAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) {
    throw new Error("Bloco inválido.");
  }

  await prisma.pageBlock.update({
    where: { id },
    data: {
      title: formOptionalString(formData.get("title")),
      subtitle: formOptionalString(formData.get("subtitle")),
      body: formOptionalString(formData.get("body")),
      ctaPrimaryLabel: formOptionalString(formData.get("ctaPrimaryLabel")),
      ctaPrimaryHref: formOptionalString(formData.get("ctaPrimaryHref")),
      ctaSecondaryLabel: formOptionalString(formData.get("ctaSecondaryLabel")),
      ctaSecondaryHref: formOptionalString(formData.get("ctaSecondaryHref")),
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/paginas");
  redirect("/admin/paginas");
}

export async function createPageBlockAction(formData: FormData) {
  await requireAdmin();

  const key = formString(formData.get("key"));
  const section = formString(formData.get("section"));

  if (!key || !section) {
    throw new Error("Seção e chave são obrigatórias para criar um bloco.");
  }

  const normalizedKey = key.toLowerCase();

  await prisma.pageBlock.upsert({
    where: { key: normalizedKey },
    update: {
      section,
      title: formOptionalString(formData.get("title")),
      subtitle: formOptionalString(formData.get("subtitle")),
      body: formOptionalString(formData.get("body")),
      ctaPrimaryLabel: formOptionalString(formData.get("ctaPrimaryLabel")),
      ctaPrimaryHref: formOptionalString(formData.get("ctaPrimaryHref")),
      ctaSecondaryLabel: formOptionalString(formData.get("ctaSecondaryLabel")),
      ctaSecondaryHref: formOptionalString(formData.get("ctaSecondaryHref")),
    },
    create: {
      key: normalizedKey,
      section,
      title: formOptionalString(formData.get("title")),
      subtitle: formOptionalString(formData.get("subtitle")),
      body: formOptionalString(formData.get("body")),
      ctaPrimaryLabel: formOptionalString(formData.get("ctaPrimaryLabel")),
      ctaPrimaryHref: formOptionalString(formData.get("ctaPrimaryHref")),
      ctaSecondaryLabel: formOptionalString(formData.get("ctaSecondaryLabel")),
      ctaSecondaryHref: formOptionalString(formData.get("ctaSecondaryHref")),
    },
  });

  revalidatePublicContent();
  revalidatePath("/admin/paginas");
  redirect("/admin/paginas");
}

export async function deletePageBlockAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  await prisma.pageBlock.delete({ where: { id } });
  revalidatePublicContent();
  revalidatePath("/admin/paginas");
}

export async function saveSiteSettingAction(formData: FormData) {
  await requireAdmin();

  const key = formString(formData.get("key"));
  const value = formString(formData.get("value"));
  if (!key) {
    throw new Error("Chave da configuração é obrigatória.");
  }

  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

  revalidatePublicContent();
  revalidatePath("/admin/configuracoes");
  redirect("/admin/configuracoes");
}

export async function createAdminUserAction(formData: FormData) {
  await requireAdmin();

  const name = formString(formData.get("name"));
  const email = formString(formData.get("email")).toLowerCase();
  const password = formString(formData.get("password"));

  if (!name || !email || password.length < 8) {
    throw new Error("Nome, e-mail e senha (mínimo 8 caracteres) são obrigatórios.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: (formString(formData.get("role")) === "EDITOR" ? UserRole.EDITOR : UserRole.ADMIN),
      isActive: formBoolean(formData.get("isActive")),
    },
  });

  revalidatePath("/admin/configuracoes");
  redirect("/admin/configuracoes");
}

export async function toggleAdminUserStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formString(formData.get("id"));
  if (!id) return;

  const user = await prisma.user.findUnique({ where: { id }, select: { isActive: true } });
  if (!user) return;

  await prisma.user.update({
    where: { id },
    data: { isActive: !user.isActive },
  });

  revalidatePath("/admin/configuracoes");
}

export async function updateAdminProfileAction(formData: FormData) {
  const admin = await requireAdmin();

  const name = formString(formData.get("name"));
  const email = formString(formData.get("email")).toLowerCase();

  if (!name || !email) {
    throw new Error("Nome e e-mail são obrigatórios.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing && existing.id !== admin.id) {
    throw new Error("Este e-mail já está em uso por outro usuário.");
  }

  await prisma.user.update({
    where: { id: admin.id },
    data: { name, email },
  });

  revalidatePath("/admin/perfil");
  redirect("/admin/perfil");
}

export async function updateAdminPasswordAction(formData: FormData) {
  const admin = await requireAdmin();

  const currentPassword = formString(formData.get("currentPassword"));
  const newPassword = formString(formData.get("newPassword"));
  const confirmPassword = formString(formData.get("confirmPassword"));

  if (!currentPassword || newPassword.length < 8 || confirmPassword.length < 8) {
    throw new Error("Informe senha atual e nova senha com no mínimo 8 caracteres.");
  }

  if (newPassword !== confirmPassword) {
    throw new Error("A confirmação da nova senha não confere.");
  }

  const user = await prisma.user.findUnique({
    where: { id: admin.id },
    select: { passwordHash: true },
  });

  if (!user) {
    throw new Error("Usuário administrador não encontrado.");
  }

  const validCurrentPassword = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!validCurrentPassword) {
    throw new Error("Senha atual inválida.");
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: admin.id },
    data: { passwordHash: newPasswordHash },
  });

  revalidatePath("/admin/perfil");
  redirect("/admin/perfil");
}
