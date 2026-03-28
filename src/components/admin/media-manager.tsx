"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type MediaManagerProps = {
  initialFiles: string[];
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function MediaManager({ initialFiles }: MediaManagerProps) {
  const [files, setFiles] = useState<string[]>(initialFiles);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredFiles = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return files;
    return files.filter((file) => file.toLowerCase().includes(normalized));
  }, [files, query]);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const refreshFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/media", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Não foi possível carregar os arquivos.");
      }
      const payload = (await response.json()) as { files: string[] };
      setFiles(payload.files);
      setStatus(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao carregar mídia.";
      setStatus(message);
    } finally {
      setIsLoading(false);
    }
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

    setIsLoading(true);
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
      setFiles((current) => [payload.url, ...current.filter((fileUrl) => fileUrl !== payload.url)]);
      setStatus("Upload concluído.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao enviar imagem.";
      setStatus(message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (url: string) => {
    const confirmed = window.confirm("Deseja remover esta mídia?");
    if (!confirmed) return;

    setIsLoading(true);
    setStatus("Removendo arquivo...");

    try {
      const response = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { error?: string };
        throw new Error(payload.error ?? "Falha ao remover arquivo.");
      }

      setFiles((current) => current.filter((fileUrl) => fileUrl !== url));
      setStatus("Arquivo removido.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao remover arquivo.";
      setStatus(message);
    } finally {
      setIsLoading(false);
    }
  };

  const copyUrl = async (url: string) => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Seu navegador não permite copiar automaticamente.");
      }

      await navigator.clipboard.writeText(url);
      setStatus("URL copiada para a área de transferência.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Não foi possível copiar a URL.";
      setStatus(`${message} Copie manualmente: ${url}`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="gold-outline rounded-2xl border p-4">
        <div className="flex flex-wrap items-center gap-2">
          <label className="inline-flex cursor-pointer items-center rounded-full border border-brand-gold/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-champagne hover:bg-brand-gold/10">
            {isLoading ? "Processando..." : "Fazer upload"}
            <input
              type="file"
              accept="image/*"
              disabled={isLoading}
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
            onClick={() => void refreshFiles()}
            className="rounded-full border border-brand-gold/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-brand-beige hover:bg-brand-gold/10"
          >
            Atualizar biblioteca
          </button>
        </div>

        <div className="mt-4">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome do arquivo"
            className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-sm text-brand-soft-white outline-none transition-colors focus:border-brand-gold/65"
          />
        </div>

        {status ? <p className="mt-3 text-xs text-brand-beige/85">{status}</p> : null}
      </div>

      {filteredFiles.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredFiles.map((url) => (
            <article key={url} className="gold-outline overflow-hidden rounded-2xl border p-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-brand-gold/20">
                <Image
                  src={url}
                  alt="Mídia enviada"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="mt-2 truncate text-xs text-brand-beige/80">{url}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copyUrl(url)}
                  className="rounded-full border border-brand-gold/35 px-3 py-1 text-xs text-brand-beige hover:bg-brand-gold/10"
                >
                  Copiar URL
                </button>
                <button
                  type="button"
                  onClick={() => void deleteFile(url)}
                  className="rounded-full border border-red-300/45 px-3 py-1 text-xs text-red-100 hover:bg-red-300/10"
                >
                  Remover
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="gold-outline rounded-2xl border p-6">
          <p className="text-sm text-brand-soft-white/82">
            Nenhum arquivo encontrado para este filtro.
          </p>
        </div>
      )}
    </div>
  );
}
