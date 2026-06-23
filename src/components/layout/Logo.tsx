"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#inicio"
      className={`group inline-flex items-center gap-2 no-underline ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      >
        <circle cx="24" cy="28" r="18" fill="var(--color-blush)" />
        <path
          d="M12 12 L18 24 L6 24 Z"
          fill="var(--color-teal-light)"
          stroke="var(--color-teal-deep)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <path
          d="M36 12 L30 24 L42 24 Z"
          fill="var(--color-teal-light)"
          stroke="var(--color-teal-deep)"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
        <ellipse cx="18" cy="26" rx="2.2" ry="2.6" fill="var(--color-teal-deep)" />
        <ellipse cx="30" cy="26" rx="2.2" ry="2.6" fill="var(--color-teal-deep)" />
        <ellipse cx="18" cy="25" rx="1" ry="1.2" fill="var(--color-text-on-dark)" />
        <ellipse cx="30" cy="25" rx="1" ry="1.2" fill="var(--color-text-on-dark)" />
        <ellipse cx="24" cy="32" rx="2" ry="1.6" fill="var(--color-blush)" />
        <ellipse cx="24" cy="31.5" rx="0.9" ry="0.7" fill="var(--color-teal-deep)" />
        <path
          d="M12 36 Q24 46 36 36"
          fill="none"
          stroke="var(--color-teal-deep)"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <line x1="6" y1="24" x2="16" y2="26" stroke="var(--color-teal-deep)" strokeWidth="0.4" opacity="0.4" />
        <line x1="6" y1="28" x2="16" y2="28" stroke="var(--color-teal-deep)" strokeWidth="0.4" opacity="0.4" />
        <line x1="6" y1="32" x2="16" y2="30" stroke="var(--color-teal-deep)" strokeWidth="0.4" opacity="0.4" />
        <line x1="42" y1="24" x2="32" y2="26" stroke="var(--color-teal-deep)" strokeWidth="0.4" opacity="0.4" />
        <line x1="42" y1="28" x2="32" y2="28" stroke="var(--color-teal-deep)" strokeWidth="0.4" opacity="0.4" />
        <line x1="42" y1="32" x2="32" y2="30" stroke="var(--color-teal-deep)" strokeWidth="0.4" opacity="0.4" />
      </svg>
      <span className="font-display text-lg leading-tight tracking-tight">
        El Club del<br />
        <span className="text-[var(--color-blush)]">Gato Viajero</span>
      </span>
    </a>
  );
}
