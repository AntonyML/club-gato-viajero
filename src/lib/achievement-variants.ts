import type { Beach } from "@/data/beaches";

export type AchievementVariant = Beach["vibe"];

export type VariantConfig = {
  /** Headline shown on the toast. */
  title: string;
  /** Approximate arc the ostrich follows (0..1 progress, 0=left edge, 1=right edge). */
  entryArc: "low" | "high" | "curve";
  /** Body lean during approach. */
  lean: number;
  /** End pose on arrival. */
  arrivalPose: "tumble" | "bow" | "sprint" | "wobble" | "ceremony";
  /** Departure direction. */
  exitTo: "right" | "down" | "up";
};

export const VARIANTS: Record<AchievementVariant, VariantConfig> = {
  asombro: {
    title: "¡Punta Uva te recibe!",
    entryArc: "curve",
    lean: 8,
    arrivalPose: "tumble",
    exitTo: "right",
  },
  diversion: {
    title: "¡Manzanillo, pura diversión!",
    entryArc: "high",
    lean: -4,
    arrivalPose: "wobble",
    exitTo: "right",
  },
  humor: {
    title: "¡Cocles te saca una sonrisa!",
    entryArc: "low",
    lean: 14,
    arrivalPose: "sprint",
    exitTo: "down",
  },
  calma: {
    title: "Cahuita respira tranquilo.",
    entryArc: "low",
    lean: 0,
    arrivalPose: "wobble",
    exitTo: "up",
  },
  recompensa: {
    title: "Playa Negra. Lo lograste.",
    entryArc: "curve",
    lean: -2,
    arrivalPose: "ceremony",
    exitTo: "right",
  },
};

export function variantFor(beach: Pick<Beach, "vibe">): VariantConfig {
  return VARIANTS[beach.vibe];
}