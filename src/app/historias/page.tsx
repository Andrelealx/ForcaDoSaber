import type { Metadata } from "next";
import { ArrowRight, BookHeart } from "lucide-react";
import Image from "next/image";
import { StudentGallerySection } from "@/components/sections/student-gallery-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { getPublicStories } from "@/lib/content-service";
import { prisma } from "@/lib/prisma";
import { tutoringCenterGallery } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Histórias e Depoimentos",
  description:
    "Conheça as histórias de alunos acompanhados pelo Projeto Força do Saber em Guapimirim.",
};

export default async function HistoriasPage() {
  const [stories, albums] = await Promise.all([
    getPublicStories(),
    prisma.galleryAlbum.findMany({
      where: { published: true },
      include: { images: { orderBy: { displayOrder: "asc" } } },
      orderBy: [{ displayOrder: "asc" }, { updatedAt: "desc" }],
    }),
  ]);

  return (
    <>
      <section className="pb-16 pt-32">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/35 bg-brand-gold/10 px-4 py-2 text-xs uppercase tracking-[0.16em] text-brand-champagne">
              <BookHeart size={14} />
              Histórias reais
            </span>
            <h1 className="mt-4 font-display text-5xl leading-tight text-brand-champagne sm:text-6xl">
              Depoimentos de transformação por meio da educação
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-relaxed text-brand-soft-white/86 sm:text-lg">
              Esta página centraliza relatos de alunos, registros de conquistas e
              momentos que mostram o impacto da atuação do Força do Saber.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="section-shell">
          <SectionTitle
            eyebrow="Depoimentos"
            title="A jornada dos alunos"
            description="Relatos de superação, apoio familiar e conquista acadêmica."
          />

          <div className="space-y-6">
            {stories.map((student, index) => (
              <Reveal
                key={student.name}
                delay={index * 0.06}
                className="gold-outline rounded-[2rem] border p-8 sm:p-10"
              >
                <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr]">
                  <div className="space-y-3">
                    <div className="relative overflow-hidden rounded-[1.5rem] border border-brand-gold/30">
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={student.primaryPhoto.src}
                          alt={student.primaryPhoto.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                      </div>
                    </div>
                    <p className="text-xs uppercase tracking-[0.14em] text-brand-beige/75">
                      {student.primaryPhoto.caption}
                    </p>

                    {student.supportingPhotos && student.supportingPhotos.length > 0 ? (
                      <div className="grid grid-cols-2 gap-2">
                        {student.supportingPhotos.map((photo) => (
                          <div
                            key={photo.src}
                            className="relative overflow-hidden rounded-xl border border-brand-gold/20"
                          >
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 50vw, 20vw"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-brand-beige/75">
                      {student.title}
                    </p>
                    <h2 className="mt-2 font-display text-4xl text-brand-champagne">
                      {student.name}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-brand-soft-white/85 sm:text-base">
                      {student.summary}
                    </p>
                    <div className="mt-5 space-y-4 text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
                      {student.story.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="mt-5 rounded-2xl border border-brand-gold/20 bg-brand-black/45 p-4 text-sm text-brand-beige/90">
                  {student.quote}
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <StudentGallerySection
        photos={tutoringCenterGallery}
        eyebrow="Tutoria acadêmica"
        title="Registros do acompanhamento educacional"
        description="Momentos de mentoria, acolhimento e direcionamento da jornada dos estudantes."
      />

      {albums.length > 0 ? (
        <section className="py-16">
          <div className="section-shell">
            <SectionTitle
              eyebrow="Galeria dinâmica"
              title="Álbuns publicados no painel"
              description="Conteúdo de galeria gerenciado diretamente pela área administrativa."
            />

            <div className="space-y-6">
              {albums.map((album, index) => (
                <Reveal key={album.id} delay={index * 0.05} className="gold-outline rounded-2xl border p-6">
                  <h3 className="font-display text-4xl text-brand-champagne">{album.title}</h3>
                  <p className="mt-2 text-sm text-brand-soft-white/84">{album.description}</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {album.images.map((image) => (
                      <div key={image.id} className="relative overflow-hidden rounded-xl border border-brand-gold/20">
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={image.imageUrl}
                            alt={image.caption ?? `Imagem do álbum ${album.title}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <StudentGallerySection
        folderName="formaturas"
        eyebrow="Formaturas"
        title="Celebrações e conquistas acadêmicas"
        description="Registros de colação e etapas concluídas pelos estudantes apoiados pelo projeto."
        autoCaptionPrefix="Formatura"
      />

      <StudentGallerySection
        folderName="fotos-aulas-praticas-educacao-fisica"
        eyebrow="Aulas práticas"
        title="Vivências formativas"
        description="Atividades que conectam teoria e prática na construção da trajetória profissional."
        autoCaptionPrefix="Aula prática"
      />

      <section className="pb-24">
        <div className="section-shell">
          <Reveal className="gold-outline rounded-[2rem] border p-8 text-center sm:p-10">
            <h2 className="font-display text-4xl text-brand-champagne sm:text-5xl">
              Faça parte dessa transformação
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-brand-soft-white/84 sm:text-base">
              O Força do Saber segue ampliando oportunidades com apoio de parceiros,
              apoiadores e comunidade.
            </p>
            <div className="mt-6">
              <ButtonLink href="/contato" className="mx-auto w-fit gap-2">
                Quero apoiar o projeto
                <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
