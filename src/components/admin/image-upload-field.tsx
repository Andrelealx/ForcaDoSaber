"use client";

import Image from "next/image";
import { useState } from "react";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  defaultValue?: string | null;
  helpText?: string;
  onValueChange?: (value: string) => void;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function ImageUploadField({
  name,
  label,
  defaultValue,
  helpText,
  onValueChange,
}: ImageUploadFieldProps) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [library, setLibrary] = useState<string[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);

  const updateValue = (nextValue: string) => {
    setValue(nextValue);
    onValueChange?.(nextValue);
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setStatus("Envie apenas arquivos de imagem.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setStatus("A imagem deve ter no máximo 5MB.");
      return;
    }

    setIsUploading(true);
    setStatus("Enviando imagem...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Falha no upload.");
      }

      const payload = (await response.json()) as { url: string };
      updateValue(payload.url);
      setStatus("Upload concluído.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao enviar imagem.";
      setStatus(message);
    } finally {
      setIsUploading(false);
    }
  };

  const loadLibrary = async () => {
    setStatus("Carregando biblioteca de mídia...");
    try {
      const response = await fetch("/api/admin/media", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Não foi possível carregar a biblioteca.");
      }
      const payload = (await response.json()) as { files: string[] };
      setLibrary(payload.files);
      setShowLibrary(true);
      setStatus(payload.files.length > 0 ? null : "Nenhuma mídia disponível.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao carregar mídia.";
      setStatus(message);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-brand-beige/90">{label}</label>

      <input type="hidden" name={name} value={value} readOnly />

      <input
        type="text"
        value={value}
        onChange={(event) => updateValue(event.target.value)}
        placeholder="/uploads/..."
        className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none transition-colors focus:border-brand-gold/65"
      />

      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-champagne hover:bg-brand-gold/10">
          {isUploading ? "Enviando..." : "Fazer upload"}
          <input
            type="file"
            accept="image/*"
            disabled={isUploading}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleUpload(file);
              }
            }}
          />
        </label>

        <button
          type="button"
          onClick={() => void loadLibrary()}
          className="inline-flex items-center rounded-full border border-brand-gold/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
        >
          Biblioteca de mídia
        </button>
      </div>

      {value ? (
        <div className="gold-outline max-w-sm overflow-hidden rounded-2xl border p-2">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 360px"
            />
          </div>
        </div>
      ) : null}

      {showLibrary && library.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {library.map((url) => (
            <button
              key={url}
              type="button"
              onClick={() => {
                updateValue(url);
                setStatus("Imagem selecionada da biblioteca.");
              }}
              className="gold-outline overflow-hidden rounded-xl border p-2 text-left"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <Image
                  src={url}
                  alt="Mídia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <p className="mt-2 truncate text-xs text-brand-beige/80">{url}</p>
            </button>
          ))}
        </div>
      ) : null}

      {helpText ? <p className="text-xs text-brand-beige/70">{helpText}</p> : null}
      {status ? <p className="text-xs text-brand-beige/85">{status}</p> : null}
    </div>
  );
}
