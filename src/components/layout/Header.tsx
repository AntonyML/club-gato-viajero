"use client";

import { useState, useEffect, useCallback } from "react";
import Logo from "./Logo";

const NAV_ITEMS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Playas", href: "#playas" },
  { label: "Galería", href: "#galeria" },
  { label: "Reservas", href: "#reservas" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--color-bg-dark)]/90 shadow-soft backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className={`mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20 transition-colors duration-500 ${
        scrolled ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-text-primary)]"
      }`}>
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`font-body text-sm font-semibold transition-colors duration-200 hover:text-[var(--color-blush)] ${
                scrolled ? "text-[var(--color-text-on-dark)] opacity-70" : "text-[var(--color-text-primary)] opacity-70"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#reservas"
            className="rounded-full bg-[var(--color-teal-mid)] px-5 py-2 font-body text-sm font-bold text-[var(--color-text-on-dark)] transition-all duration-200 hover:bg-[var(--color-accent-hover)] hover:shadow-md"
          >
            Reservar Tour
          </a>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="flex w-6 flex-col gap-1.5">
            <span
              className={`h-0.5 w-full rounded-full transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text-on-dark)]" : "bg-[var(--color-text-primary)]"
              } ${menuOpen ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-full rounded-full transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text-on-dark)]" : "bg-[var(--color-text-primary)]"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-full rounded-full transition-all duration-300 ${
                scrolled ? "bg-[var(--color-text-on-dark)]" : "bg-[var(--color-text-primary)]"
              } ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-0 z-40 flex flex-col items-center justify-center gap-6 bg-[var(--color-bg-dark)]/95 backdrop-blur-md transition-all duration-400 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        style={{ height: "100dvh" }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="font-display text-3xl text-[var(--color-text-on-dark)] transition-colors hover:text-[var(--color-blush)]"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#reservas"
          onClick={closeMenu}
          className="mt-4 rounded-full bg-[var(--color-teal-mid)] px-8 py-3 font-display text-xl font-bold text-[var(--color-text-on-dark)] transition-all hover:bg-[var(--color-accent-hover)]"
        >
          Reservar Tour
        </a>
      </div>
    </header>
  );
}
