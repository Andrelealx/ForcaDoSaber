import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionTitle } from "@/components/ui/section-title";
import { studentGallerySlots } from "@/lib/site-data";

type StudentGallerySectionProps = {
  limit?: number;
  title?: string;
  description?: string;
  eyebrow?: string;
  photos?: Array<{
    src: string;
    alt: string;
    caption: string;
  }>;
  folderName?: string;
  autoCaptionPrefix?: string;
};

function getAvailablePhotos(
  photos: Array<{
    src: string;
    alt: string;
    caption: string;
  }>,
) {
  return photos.filter((item) =>
    fs.existsSync(path.join(process.cwd(), "public", item.src.replace(/^\//, ""))),
  );
}

function getPhotosFromFolder(
  folderName: string,
  title: string,
  autoCaptionPrefix = "Registro institucional",
) {
  const folderPath = path.join(process.cwd(), "public", "images", folderName);

  if (!fs.existsSync(folderPath)) {
    return [];
  }

  const files = fs
    .readdirSync(folderPath)
    .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  return files.map((file, index) => ({
    src: `/images/${folderName}/${file}`,
    alt: `${title} - foto ${index + 1}`,
    caption: `${autoCaptionPrefix} ${index + 1}`,
  }));
}

export function StudentGallerySection({
  limit,
  title = "Galeria de conquistas",
  description = "Registros reais de alunos e famílias celebrando vitórias acadêmicas.",
  eyebrow = "Fotos dos alunos",
  photos = studentGallerySlots,
  folderName,
  autoCaptionPrefix,
}: StudentGallerySectionProps) {
  const availablePhotos = folderName
    ? getPhotosFromFolder(folderName, title, autoCaptionPrefix)
    : getAvailablePhotos(photos);
  const photosToRender = typeof limit === "number" ? availablePhotos.slice(0, limit) : availablePhotos;

  return (
    <section className="py-24">
      <div className="section-shell">
        <SectionTitle eyebrow={eyebrow} title={title} description={description} />

        {photosToRender.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {photosToRender.map((photo, index) => (
              <Reveal
                key={photo.src}
                delay={index * 0.05}
                className="gold-outline overflow-hidden rounded-[1.5rem] border"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
                <p className="px-4 py-3 text-sm text-brand-beige/90">{photo.caption}</p>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="gold-outline rounded-[1.5rem] border p-8">
            <p className="text-sm leading-relaxed text-brand-soft-white/85 sm:text-base">
              A galeria está pronta para receber as fotos enviadas pelo projeto.
              Para publicação automática, adicione os arquivos na pasta{" "}
              <code className="text-brand-champagne">public/images/alunos</code> com os
              nomes definidos no código.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
