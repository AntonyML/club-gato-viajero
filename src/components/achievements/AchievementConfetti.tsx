"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { loadLottie } from "@/lib/lottie-cache";
import { prefersReducedMotion } from "@/lib/motion";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {
  /** Trigger: when changed (any reference change), the animation plays once. */
  playKey: number;
  /** "focal" mounts a small 160×160 layer; "global" mounts a full-viewport fixed overlay. */
  variant: "focal" | "global";
  /** Position for the focal variant (CSS anchor). */
  anchor?: { x: number; y: number };
  onComplete?: () => void;
};

export function AchievementConfetti({
  playKey,
  variant,
  anchor,
  onComplete,
}: Props) {
  const [data, setData] = useState<unknown>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    loadLottie("/lottie/confetti.json").then((d) => {
      if (!cancelled) setData(d);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (playKey === 0) return;
    completedRef.current = false;
  }, [playKey]);

  if (prefersReducedMotion()) return null;
  if (!data) return null;

  if (variant === "global") {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[55] flex items-start justify-center"
      >
        <div className="h-[100dvh] w-screen">
          <Lottie
            animationData={data as Record<string, unknown>}
            loop={false}
            autoplay
            onComplete={() => {
              if (completedRef.current) return;
              completedRef.current = true;
              onComplete?.();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-50"
      style={{
        left: anchor?.x ?? 0,
        top: anchor?.y ?? 0,
        width: 160,
        height: 160,
        transform: "translate(-50%, -50%)",
      }}
    >
      <Lottie
        animationData={data as Record<string, unknown>}
        loop={false}
        autoplay
        onComplete={() => {
          if (completedRef.current) return;
          completedRef.current = true;
          onComplete?.();
        }}
      />
    </div>
  );
}