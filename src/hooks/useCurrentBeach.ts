"use client";

import { useScrollProgress } from "@/components/providers/ScrollProvider";
import { TOTAL_BEACHES } from "@/data/beaches";

/**
 * Pure derivation of the current beach (1..5) from scroll progress.
 * Reserves the first 18% for the hero, then splits the rest evenly.
 */
export function useCurrentBeach(): number {
  const progress = useScrollProgress();
  if (progress <= 0) return 0;
  const start = 0.18;
  if (progress < start) return 0;
  const span = 1 - start;
  const local = (progress - start) / span;
  return Math.min(TOTAL_BEACHES, Math.max(1, Math.ceil(local * TOTAL_BEACHES)));
}
