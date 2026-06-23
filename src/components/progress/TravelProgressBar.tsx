"use client";

import { useScrollProgress } from "@/components/providers/ScrollProvider";
import { TOTAL_BEACHES } from "@/data/beaches";
import { mapRange } from "@/lib/motion";

/**
 * Sticky bottom bar that visualises the trip as a small path.
 * A cat icon moves from left to right as the user scrolls.
 */
export function TravelProgressBar() {
  const progress = useScrollProgress();
  const x = mapRange(progress, 0, 1, 0, 100);
  const filled = Math.min(1, Math.max(0, x / 100));

  const hidden = progress > 0.88;

  return (
    <div className={`pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 transition-opacity duration-500 sm:bottom-6 ${
      hidden ? "opacity-0" : "opacity-100"
    }`}>
      <div className="pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-primary)]/85 px-4 py-2.5 shadow-soft backdrop-blur-sm">
        <span aria-hidden className="text-base sm:text-lg" style={{ transform: `translateX(${x * 0.6}px)`, display: "inline-block" }}>
          <CatIcon />
        </span>
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--color-sand)]/30">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-teal-mid)] transition-[width] duration-200 ease-out"
            style={{ width: `${filled * 100}%` }}
          />
          {Array.from({ length: TOTAL_BEACHES - 1 }).map((_, i) => (
            <span
              key={i}
              className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[var(--color-bg-primary)] ring-2 ring-[var(--color-border)]"
              style={{ left: `calc(${(i + 1) * (100 / TOTAL_BEACHES)}% - 4px)` }}
              aria-hidden
            />
          ))}
        </div>
        <span aria-hidden className="text-base sm:text-lg" style={{ opacity: 0.3 + filled * 0.7 }}>
          <BeachIcon />
        </span>
      </div>
    </div>
  );
}

function CatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path
        d="M5 9 L7 4 L9 8 L15 8 L17 4 L19 9 C20.5 10 21 11.5 21 13 C21 17 18 20 12 20 C6 20 3 17 3 13 C3 11.5 3.5 10 5 9 Z"
        fill="var(--color-teal-deep)"
      />
      <circle cx="9.5" cy="13" r="0.9" fill="var(--color-text-on-dark)" />
      <circle cx="14.5" cy="13" r="0.9" fill="var(--color-text-on-dark)" />
      <path d="M11 16 L13 16 L12 17.5 Z" fill="var(--color-blush)" />
    </svg>
  );
}

function BeachIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <circle cx="12" cy="9" r="3.2" fill="var(--color-blush)" />
      <path
        d="M4 18 C6 15 18 15 20 18 L20 20 L4 20 Z"
        fill="var(--color-teal-light)"
      />
      <path
        d="M3 20 C5 18 19 18 21 20 L21 21 L3 21 Z"
        fill="var(--color-sand)"
      />
    </svg>
  );
}
