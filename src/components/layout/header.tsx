"use client";

import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/site-data";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    if (href.startsWith("/#")) {
      return false;
    }

    return pathname === href;
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-brand-gold/15 bg-brand-black/80 backdrop-blur-xl">
      <div className="section-shell flex h-20 items-center justify-between">
        <Link href="/" className="group inline-flex items-center gap-3">
          <Image
            src="/images/logo-forca-do-saber.jpg"
            alt="Logo do Projeto Força do Saber"
            width={52}
            height={52}
            className="h-12 w-12 rounded-full border border-brand-gold/60 object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          <div className="hidden sm:block">
            <p className="font-display text-xl leading-none text-brand-champagne">
              Projeto Força do Saber
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-beige/80">
              Guapimirim - RJ
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={clsx(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "bg-brand-gold/20 text-brand-champagne"
                  : "text-brand-soft-white/80 hover:text-brand-soft-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contato"
            className="inline-flex rounded-full border border-brand-gold/55 bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-black transition-all duration-300 hover:bg-brand-champagne hover:shadow-[0_0_26px_rgba(184,155,82,0.38)]"
          >
            Seja um parceiro
          </Link>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/40 text-brand-champagne transition-colors hover:bg-brand-gold/10 lg:hidden"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-controls="mobile-menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            id="mobile-menu"
            className="border-t border-brand-gold/15 bg-brand-dark/95 px-4 py-4 lg:hidden"
          >
            <nav className="section-shell flex flex-col gap-2 pb-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={clsx(
                    "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                    isActive(item.href)
                      ? "bg-brand-gold/15 text-brand-champagne"
                      : "text-brand-soft-white/80 hover:bg-brand-gold/10 hover:text-brand-soft-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contato"
                onClick={() => setMenuOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-xl border border-brand-gold/50 bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-black transition-colors hover:bg-brand-champagne"
              >
                Seja um parceiro
              </Link>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
