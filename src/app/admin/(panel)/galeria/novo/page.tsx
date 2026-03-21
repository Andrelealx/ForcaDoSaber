import { createGalleryAlbumAction } from "@/app/admin/(panel)/actions";
import { GalleryAlbumForm } from "@/components/admin/gallery-album-form";

export default function NovoAlbumPage() {
  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Galeria</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">Novo álbum</h1>
      </div>
      <GalleryAlbumForm action={createGalleryAlbumAction} submitLabel="Criar álbum" />
    </>
  );
}
