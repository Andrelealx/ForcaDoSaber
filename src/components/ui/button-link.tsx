import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: ButtonLinkProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300";
  const variants = {
    primary:
      "bg-brand-gold text-brand-black shadow-[0_0_0_1px_rgba(184,155,82,0.42)] hover:bg-brand-champagne hover:shadow-[0_0_30px_rgba(184,155,82,0.35)]",
    secondary:
      "border border-brand-gold/60 text-brand-beige hover:border-brand-champagne hover:text-brand-soft-white hover:bg-brand-gold/10",
  };

  const classes = clsx(baseClasses, variants[variant], className);

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
