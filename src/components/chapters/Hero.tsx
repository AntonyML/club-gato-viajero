"use client";

import { useEffect, useRef } from "react";
import { HERO_LINES } from "@/data/copy";
import { HeroScene } from "@/components/scenes/HeroScene";
import { Melvin } from "@/components/stitch/Melvin";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    const root = sectionRef.current;
    const lines = linesRef.current;
    if (!gsap || !root || !lines) return;

    if (reduced) {
      lines.querySelectorAll<HTMLSpanElement>("[data-line]").forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const items = lines.querySelectorAll<HTMLSpanElement>("[data-line]");
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.55,
          delay: 0.2,
        },
      );

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: HERO_LINES.length * 0.55 + 0.3, ease: "power3.out" },
        );
      }

      // Parallax hero layers
      const layers = root.querySelectorAll<SVGGElement>("[data-parallax]");
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.parallax ?? 0);
        if (Number.isNaN(speed)) return;
        gsap.to(layer, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Title slight fade as user scrolls past
      gsap.to(lines, {
        opacity: 0,
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const onCta = () => {
    const first = document.querySelector<HTMLElement>("[data-chapter]");
    if (!first) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(first, { offset: -40, duration: 1.4 });
      return;
    }
    first.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-full overflow-hidden"
      aria-label="Inicio"
    >
      <HeroScene className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div ref={linesRef} className="flex max-w-2xl flex-col items-center gap-4">
          {HERO_LINES.map((line, i) => {
            const Tag = i === 0 ? "h1" : "span";
            return (
              <Tag
                key={line.id}
                data-line
                className="font-display text-3xl font-medium leading-tight text-cocoa sm:text-5xl"
              >
                {line.text}
              </Tag>
            );
          })}
        </div>
        <button
          ref={ctaRef}
          onClick={onCta}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-sand bg-cream/95 px-7 py-3 font-display text-base font-semibold text-cocoa shadow-soft transition hover:scale-[1.02] hover:bg-rose-pastel-soft sm:text-lg"
        >
          <span>Comenzar la aventura</span>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Stitch sobre la maleta, en la parte inferior derecha */}
      <div className="pointer-events-none absolute bottom-6 right-4 z-10 sm:bottom-10 sm:right-10">
        <Melvin state="wave" size={200} facing="left" onSuitcase />
      </div>

      {/* Hint inferior */}
      <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center sm:bottom-6">
        <span className="rounded-full bg-cream/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-cocoa/60 backdrop-blur-sm">
          Desliza para comenzar
        </span>
      </div>
    </section>
  );
}
