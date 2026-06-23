"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import type { Beach } from "@/data/beaches";
import { Melvin } from "@/components/stitch/Melvin";

type Props = {
  fromBeach: Beach;
  toBeach: Beach;
  index: number;
};

const LEAF_COLORS = [
  "#6fa67a",
  "#a9e0d4",
  "#e8c98a",
  "#f3a48f",
  "#88c8d3",
];

const BG_GRADIENTS = [
  "from-[var(--color-teal-light)]/30 to-[var(--color-teal-mid)]/20",
  "from-[var(--color-blush)]/30 to-[var(--color-teal-light)]/20",
  "from-[var(--color-teal-light)]/20 to-[var(--color-blush)]/20",
  "from-[var(--color-sand)]/30 to-[var(--color-teal-light)]/20",
  "from-[var(--color-teal-mid)]/20 to-[var(--color-sand)]/20",
];

export default function SwingTransition({ fromBeach, toBeach, index }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const swingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    if (!gsap || !sectionRef.current || !swingRef.current || reduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
        },
      });

      tl.to(swingRef.current, {
        rotation: -18,
        duration: 1,
        ease: "sine.inOut",
      }).to(swingRef.current, {
        rotation: 18,
        duration: 1.6,
        ease: "sine.inOut",
      }).to(swingRef.current, {
        rotation: -12,
        duration: 1,
        ease: "sine.inOut",
      }).to(swingRef.current, {
        rotation: 0,
        duration: 0.6,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [fromBeach, toBeach]);

  const leafColor = LEAF_COLORS[index % LEAF_COLORS.length];
  const gradient = BG_GRADIENTS[index % BG_GRADIENTS.length];

  return (
    <section
      ref={sectionRef}
      className={`relative flex h-[120vh] items-center justify-center overflow-hidden bg-gradient-to-b ${gradient}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <svg viewBox="0 0 1440 900" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          {[0, 1, 2].map((i) => (
            <g key={i} style={{ transform: `translate(${i * 400 + 100}px, ${i * 60 + 50}px)` }}>
              <path
                d="M0,0 Q30,-20 60,0 Q90,20 120,0"
                stroke={leafColor}
                strokeWidth="2"
                fill="none"
                opacity="0.4"
              />
              <ellipse cx="120" cy="0" rx="18" ry="8" fill={leafColor} opacity="0.25" transform="rotate(20 120 0)" />
              <ellipse cx="0" cy="0" rx="16" ry="7" fill={leafColor} opacity="0.3" transform="rotate(-15 0 0)" />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative flex flex-col items-center">
        <div
          ref={swingRef}
          className="flex w-full max-w-[200px] flex-col items-center md:max-w-[280px]"
          style={{ transformOrigin: "50% -80px", willChange: "transform" }}
        >
          <svg
            viewBox="0 0 20 140"
            className="h-48 w-4 md:h-64 md:w-6"
            aria-hidden
          >
            <path
              d="M10,0 Q8,40 10,80 Q12,120 10,140"
              stroke={leafColor}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <ellipse cx="10" cy="30" rx="6" ry="3" fill={leafColor} opacity="0.5" transform="rotate(25 10 30)" />
            <ellipse cx="8" cy="70" rx="5" ry="2.5" fill={leafColor} opacity="0.4" transform="rotate(-20 8 70)" />
            <ellipse cx="11" cy="105" rx="5" ry="2.5" fill={leafColor} opacity="0.35" transform="rotate(15 11 105)" />
          </svg>

          <div className="-mt-6 md:-mt-8">
            <Melvin state="idle" size={200} />
          </div>
        </div>

        <div className="mt-12 text-center font-display text-2xl text-[var(--color-text-secondary)]/60">
          <span className="inline-block animate-pulse">✦</span>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center font-body text-xs text-[var(--color-text-secondary)]/40">
        {fromBeach.name} → {toBeach.name}
      </div>
    </section>
  );
}
