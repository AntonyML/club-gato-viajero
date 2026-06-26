"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL_BEACHES } from "@/data/beaches";
import { useAchievementManager } from "@/components/achievements/AchievementManager";

type Props = {
  unlocked: number;
};

/**
 * Minimalist passport card pinned to the top-right of the viewport.
 * Shows five small "stamp slots" that fill in as the user discovers each beach.
 * Registers itself with the AchievementManager so the manager can target the
 * right slot for the ostrich sequence.
 */
export function Passport({ unlocked }: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lastUnlockedRef = useRef(unlocked);
  const { registerPassportAnchor } = useAchievementManager();
  const [cascade, setCascade] = useState(false);

  useEffect(() => {
    if (unlocked <= lastUnlockedRef.current) {
      lastUnlockedRef.current = unlocked;
      return;
    }
    lastUnlockedRef.current = unlocked;
    const root = rootRef.current;
    if (!root) return;

    const slot = root.querySelector<HTMLDivElement>(`[data-stamp-slot='${unlocked}']`);
    if (!slot) return;
    slot.dataset.pulse = "true";
    const id = window.setTimeout(() => {
      slot.removeAttribute("data-pulse");
    }, 700);
    return () => window.clearTimeout(id);
  }, [unlocked]);

  useEffect(() => {
    const onCascade = () => {
      setCascade(true);
      window.setTimeout(() => setCascade(false), 1400);
    };
    window.addEventListener("passport:cascade", onCascade);
    return () => window.removeEventListener("passport:cascade", onCascade);
  }, []);

  useEffect(() => {
    registerPassportAnchor(rootRef.current);
    return () => registerPassportAnchor(null);
  }, [registerPassportAnchor]);

  const isComplete = unlocked >= TOTAL_BEACHES;

  return (
    <div
      className="pointer-events-none fixed right-3 top-20 z-40 sm:right-5 sm:top-24"
      aria-live="polite"
    >
      <div
        ref={rootRef}
        data-passport-complete={isComplete ? "true" : "false"}
        className={`pointer-events-auto story-card flex items-center gap-3 rounded-2xl px-3 py-2 transition-all duration-500 sm:gap-4 sm:px-4 sm:py-3 ${
          isComplete ? "ring-2 ring-[#e8c98a]/70 shadow-[0_0_28px_-4px_rgba(232,201,138,0.55)]" : ""
        }`}
        style={{
          transform: isComplete ? "scale(1.02)" : "scale(1)",
        }}
      >
        <div className="flex flex-col leading-tight">
          <span className="font-display text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)] sm:text-xs">
            Pasaporte
          </span>
          <span className="font-display text-sm font-semibold text-[var(--color-text-primary)] sm:text-base">
            {unlocked}/{TOTAL_BEACHES} sellos
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: TOTAL_BEACHES }).map((_, i) => {
            const isUnlocked = i < unlocked;
            const cascadeDelay = cascade ? `${i * 80}ms` : undefined;
            return (
              <div
                key={i}
                data-stamp-slot={i + 1}
                className={`stamp-slot relative grid h-6 w-6 place-items-center rounded-md border transition-colors sm:h-7 sm:w-7 ${
                  isUnlocked
                    ? "border-[var(--color-blush)]/70 bg-[var(--color-blush)]/30"
                    : "border-[var(--color-border)] bg-[var(--color-bg-primary)]"
                }`}
                style={cascadeDelay ? { animationDelay: cascadeDelay } : undefined}
                aria-label={isUnlocked ? `Sello ${i + 1} desbloqueado` : `Sello ${i + 1} pendiente`}
              >
                {isUnlocked ? (
                  cascade ? (
                    <span
                      className="stamp-drop inline-block"
                      style={{ animationDelay: cascadeDelay }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="check-icon h-3.5 w-3.5 sm:h-4 sm:w-4"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M5 12.5l4.5 4.5L19 7" />
                      </svg>
                    </span>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className="check-icon h-3.5 w-3.5 sm:h-4 sm:w-4"
                      fill="none"
                      stroke="var(--color-accent)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  )
                ) : (
                  <span className="font-display text-[10px] text-[var(--color-text-secondary)]/30">·</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}