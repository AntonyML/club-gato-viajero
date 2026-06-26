"use client";

import { useAchievementManager } from "@/components/achievements/AchievementManager";
import type { Beach } from "@/data/beaches";

/**
 * Public hook consumed by BeachChapter. Forwards the play() call to the
 * manager; the manager is what owns queueing, layout, and timing.
 */
export function useAchievement() {
  return useAchievementManager();
}

export type { Beach };