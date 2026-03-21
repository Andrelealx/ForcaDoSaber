"use client";

import { clsx } from "clsx";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
  label: string;
  pendingLabel?: string;
  className?: string;
  variant?: "primary" | "danger" | "secondary";
};

const variantClasses: Record<NonNullable<SubmitButtonProps["variant"]>, string> = {
  primary:
    "bg-brand-gold text-brand-black hover:bg-brand-champagne disabled:opacity-60",
  danger:
    "bg-red-600 text-white hover:bg-red-500 disabled:opacity-60",
  secondary:
    "border border-brand-gold/45 text-brand-beige hover:bg-brand-gold/10 disabled:opacity-60",
};

export function SubmitButton({
  label,
  pendingLabel,
  className,
  variant = "primary",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-colors",
        variantClasses[variant],
        className,
      )}
    >
      {pending ? pendingLabel ?? "Salvando..." : label}
    </button>
  );
}
