import { MediaManager } from "@/components/admin/media-manager";
import { listUploadImages } from "@/lib/media-utils";

export default async function AdminMidiaPage() {
  const files = await listUploadImages();
  const sorted = files.sort((a, b) => b.localeCompare(a, "pt-BR"));

  return (
    <>
      <div>
        <p className="text-xs uppercase tracking-[0.16em] text-brand-champagne">Mídia</p>
        <h1 className="mt-2 font-display text-5xl text-brand-champagne">
          Biblioteca de imagens
        </h1>
        <p className="mt-2 text-sm text-brand-soft-white/82">
          Faça upload, copie URLs e remova arquivos não utilizados.
        </p>
      </div>

      <MediaManager initialFiles={sorted} />
    </>
  );
}
