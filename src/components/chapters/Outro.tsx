"use client";

import { useEffect, useRef } from "react";
import { Melvin } from "@/components/stitch/Melvin";
import { SLOGAN } from "@/data/copy";
import { TOTAL_BEACHES } from "@/data/beaches";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Outro() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    const root = ref.current;
    if (!gsap || !root) return;
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.querySelectorAll("[data-fade]"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: root,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-rose-pastel-soft/40 via-cream to-turquoise-soft/30 px-6 py-24 text-center"
    >
      <Melvin state="celebrate" size={180} className="mb-6" />
      <p data-fade className="font-display text-2xl font-semibold text-cocoa sm:text-3xl">
        {SLOGAN.text}
      </p>
      <p data-fade className="mt-3 max-w-md text-base text-cocoa/70 sm:text-lg">
        Has acompañado a Melvin Ramón por {TOTAL_BEACHES} arenas distintas.
        Cada sello es un secreto que ahora también es tuyo.
      </p>
      <div data-fade className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => {
            const el = document.querySelector<HTMLElement>("#reservas");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="rounded-full bg-coral-tropical px-7 py-3 font-display text-base font-bold text-cream transition-all duration-200 hover:bg-coral-tropical/80 hover:shadow-md active:scale-[0.97]"
        >
          Reserva tu tour ahora
        </button>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })
          }
          className="inline-flex items-center gap-2 rounded-full border border-sand bg-cream px-5 py-2.5 font-display text-sm font-medium text-cocoa shadow-soft transition hover:bg-rose-pastel-soft sm:text-base"
        >
          Volver al inicio
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 19V5" />
            <path d="M6 11l6-6 6 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
