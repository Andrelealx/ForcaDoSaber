"use client";

import { MessageCircle } from "lucide-react";
import { FormEvent, useState } from "react";

type ContactFormProps = {
  whatsappUrl: string;
};

export function ContactForm({ whatsappUrl }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      return;
    }

    const text = [
      "Olá! Vim pelo site do Projeto Força do Saber.",
      "",
      `Nome: ${name.trim()}`,
      `E-mail: ${email.trim()}`,
      "",
      "Mensagem:",
      message.trim(),
    ].join("\n");

    const whatsappLink = `${whatsappUrl}?text=${encodeURIComponent(text)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setStatus("success");
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Nome</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Seu nome completo"
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none transition-colors focus:border-brand-gold/65"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">E-mail</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="nome@instituicao.com.br"
          className="w-full rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none transition-colors focus:border-brand-gold/65"
          required
        />
      </label>

      <label className="block text-sm">
        <span className="mb-2 block text-brand-beige/85">Mensagem</span>
        <textarea
          name="message"
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Conte como sua instituição ou iniciativa deseja colaborar."
          className="w-full resize-none rounded-xl border border-brand-gold/25 bg-brand-black/45 px-4 py-3 text-brand-soft-white outline-none transition-colors focus:border-brand-gold/65"
          required
        />
      </label>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-champagne"
      >
        <MessageCircle size={16} />
        Enviar e abrir WhatsApp
      </button>

      {status === "error" ? (
        <p className="text-sm text-red-200">
          Preencha nome, e-mail e mensagem para continuar.
        </p>
      ) : null}

      {status === "success" ? (
        <p className="text-sm text-brand-beige/90">
          Perfeito. Sua mensagem foi preparada e enviada para o WhatsApp
          institucional.
        </p>
      ) : null}
    </form>
  );
}
