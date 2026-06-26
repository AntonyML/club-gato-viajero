"use client";

type Props = {
  size?: number;
  golden?: boolean;
  className?: string;
};

/**
 * Tiny SVG stamp used as the deliverable during the achievement sequence.
 * Lives in its own node so the AchievementManager can GSAP-animate it
 * independently of the ostrich and the passport slot.
 */
export function AchievementStamp({ size = 44, golden = false, className }: Props) {
  const ring = golden ? "#e8c98a" : "var(--color-blush)";
  const fill = golden ? "#fff5d0" : "var(--color-bg-primary)";
  const check = golden ? "#a86a2a" : "var(--color-accent)";
  const glow = golden ? "rgba(232,201,138,0.7)" : "rgba(245,199,179,0.55)";

  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={className}
      aria-hidden
      style={{ filter: `drop-shadow(0 0 8px ${glow})` }}
    >
      <circle cx="30" cy="30" r="27" fill={fill} stroke={ring} strokeWidth="3" strokeDasharray="3 2" />
      <circle cx="30" cy="30" r="20" fill="none" stroke={ring} strokeWidth="1.5" opacity="0.6" />
      <path
        d="M19 31 L26 38 L42 22"
        fill="none"
        stroke={check}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}