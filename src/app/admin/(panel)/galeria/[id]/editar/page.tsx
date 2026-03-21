import { notFound } from "next/navigation";
import { updateGalleryAlbumAction } from "@/app/admin/(panel)/actions";
import { GalleryAlbumForm } from "@/components/admin/gallery-album-form";
import { prisma } from "@/lib/prisma";

type EditGalleryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditGalleryPage({ params }: EditGalleryPageProps) {
  const { id } = await params;
  const album = await prisma.galleryAlbum.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!album) {
    notFound();
  }

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Galeria</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Editar álbum</h1>
      </div>
      <GalleryAlbumForm album={album} action={updateGalleryAlbumAction} submitLabel="Salvar alterações" />
    </>
  );
}
