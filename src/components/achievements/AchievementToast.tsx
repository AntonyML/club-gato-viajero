"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { getGsap } from "@/lib/gsap";

type Props = {
  show: boolean;
  title: string;
  subtitle?: string;
  onExit?: () => void;
  variant?: "normal" | "final";
};

export function AchievementToast({
  show,
  title,
  subtitle,
  onExit,
  variant = "normal",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onExitRef = useRef(onExit);

  useEffect(() => {
    onExitRef.current = onExit;
  }, [onExit]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    const node = ref.current;
    if (!gsap || !node) return;

    if (!show) {
      gsap.set(node, { opacity: 0, y: 12 });
      return;
    }

    const tl = gsap.timeline();
    tl.set(node, { opacity: 0, y: 12 });
    tl.to(node, {
      opacity: 1,
      y: 0,
      duration: reduced ? 0 : 0.28,
      ease: "power3.out",
    });
    tl.to(node, {
      opacity: 0,
      y: -8,
      duration: reduced ? 0 : 0.3,
      delay: reduced ? 2 : 1.1,
      ease: "power2.in",
      onComplete: () => onExitRef.current?.(),
    });

    return () => {
      tl.kill();
    };
  }, [show, title]);

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 sm:bottom-28"
      style={{ opacity: 0 }}
    >
      <div
        className={`pointer-events-auto flex max-w-[90vw] items-center gap-3 rounded-full px-5 py-2.5 shadow-card backdrop-blur-sm sm:px-6 sm:py-3 ${
          variant === "final"
            ? "bg-[var(--color-teal-deep)] text-[var(--color-text-on-dark)]"
            : "bg-[var(--color-bg-primary)]/95 text-[var(--color-text-primary)]"
        }`}
        style={{
          border:
            variant === "final"
              ? "1px solid rgba(232,201,138,0.6)"
              : "1px solid var(--color-border)",
        }}
      >
        <span
          aria-hidden
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs ${
            variant === "final"
              ? "bg-[var(--color-blush)] text-[var(--color-teal-deep)]"
              : "bg-[var(--color-blush)]/40 text-[var(--color-accent)]"
          }`}
        >
          {variant === "final" ? "★" : "✓"}
        </span>
        <div className="flex flex-col leading-tight">
          <span className="font-display text-sm font-semibold sm:text-base">{title}</span>
          {subtitle ? (
            <span
              className={`font-body text-[11px] sm:text-xs ${
                variant === "final" ? "text-white/70" : "text-[var(--color-text-secondary)]"
              }`}
            >
              {subtitle}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}