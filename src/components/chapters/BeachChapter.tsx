"use client";

import { useEffect, useRef } from "react";
import type { Beach } from "@/data/beaches";
import { BeachScene } from "@/components/scenes/BeachScene";
import { Stitch } from "@/components/stitch/Stitch";
import { SpeechBubble } from "@/components/stitch/SpeechBubble";
import { getGsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  beach: Beach;
  onUnlock: () => void;
};

const stateByVibe: Record<
  Beach["vibe"],
  { stitch: Parameters<typeof Stitch>[0]["state"]; line: number }
> = {
  asombro: { stitch: "photo", line: 0 },
  diversion: { stitch: "look", line: 0 },
  humor: { stitch: "wave", line: 0 },
  calma: { stitch: "idle", line: 0 },
  recompensa: { stitch: "celebrate", line: 1 },
};

/**
 * One beach "chapter". It is a sticky section: the SVG scene and Stitch stay
 * pinned while the user scrolls inside the chapter, then the narrative card
 * fades in and the stamp unlocks.
 */
export function BeachChapter({ beach, onUnlock }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const stickerRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const unlockedRef = useRef(false);

  const preset = stateByVibe[beach.vibe];
  const activeLine = beach.stitchSays[preset.line];

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    const root = sectionRef.current;
    if (!gsap || !root) return;

    const ctx = gsap.context(() => {
      // Parallax for scene layers inside this section
      const layers = root.querySelectorAll<SVGGElement>("[data-parallax]");
      layers.forEach((layer) => {
        const speed = Number(layer.dataset.parallax ?? 0);
        if (Number.isNaN(speed)) return;
        gsap.to(layer, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Card entrance
      if (cardRef.current && !reduced) {
        gsap.fromTo(
          cardRef.current,
          { y: 60, opacity: 0, rotate: -1 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      } else if (cardRef.current) {
        cardRef.current.style.opacity = "1";
      }

      // Stitch slide in from the right (per chapter)
      if (stickerRef.current && !reduced) {
        gsap.fromTo(
          stickerRef.current,
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: root,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          },
        );
      } else if (stickerRef.current) {
        stickerRef.current.style.opacity = "1";
      }

      // Typewriter-ish reveal of the line in the bubble
      if (lineRef.current && bubbleRef.current && !reduced) {
        const full = activeLine;
        const el = lineRef.current;
        el.textContent = "";
        bubbleRef.current.style.opacity = "0";
        gsap.to(bubbleRef.current, {
          opacity: 1,
          duration: 0.3,
          scrollTrigger: {
            trigger: bubbleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        const obj = { i: 0 };
        gsap.to(obj, {
          i: full.length,
          duration: Math.max(0.8, full.length * 0.04),
          ease: "none",
          scrollTrigger: {
            trigger: bubbleRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            el.textContent = full.slice(0, Math.floor(obj.i));
          },
        });
      } else if (lineRef.current) {
        lineRef.current.textContent = activeLine;
      }

      // Unlock stamp exactly when the card reaches the center
      if (cardRef.current) {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "top 70%",
          once: true,
          onEnter: () => {
            if (unlockedRef.current) return;
            unlockedRef.current = true;
            onUnlock();
          },
        });
      }
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beach.id]);

  return (
    <section
      ref={sectionRef}
      id={`playa-${beach.id}`}
      data-chapter
      className="relative h-[220vh] w-full"
      aria-labelledby={`playa-${beach.id}-title`}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <BeachScene
          beach={beach}
          className="absolute inset-0 h-full w-full"
        />

        {/* Stitch & bubble on the right side */}
        <div
          ref={stickerRef}
          className="absolute bottom-6 right-4 z-20 flex items-end gap-3 sm:bottom-10 sm:right-10 md:right-16"
        >
          <div ref={bubbleRef} className="mb-6 sm:mb-10">
            <SpeechBubble tail="right" text={activeLine} className="opacity-100" />
          </div>
          <span className="sr-only">
            <span ref={lineRef}>{activeLine}</span>
          </span>
          <Stitch state={preset.stitch} size={180} facing="left" />
        </div>

        {/* Narrative card on the left */}
        <div
          ref={cardRef}
          className="absolute left-4 top-1/2 z-20 w-[88%] max-w-sm -translate-y-1/2 sm:left-8 md:left-16"
        >
          <div className="story-card p-6 sm:p-7">
            <p className="font-display text-[11px] uppercase tracking-[0.2em] text-cocoa/60">
              Playa {beach.id} · {moodLabel(beach.mood)}
            </p>
            <h2
              id={`playa-${beach.id}-title`}
              className="mt-1 font-display text-2xl font-semibold leading-tight text-cocoa sm:text-3xl"
            >
              {beach.title}
            </h2>
            <p className="mt-3 font-display text-base italic text-coral-tropical sm:text-lg">
              {beach.postcard}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cocoa/80 sm:text-base">
              {beach.detail}
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-cocoa/50">
              {beach.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function moodLabel(mood: Beach["mood"]): string {
  switch (mood) {
    case "morning":
      return "Mañana";
    case "noon":
      return "Mediodía";
    case "afternoon":
      return "Tarde";
    case "sunset":
      return "Atardecer";
    case "magic":
      return "Hora mágica";
  }
}
