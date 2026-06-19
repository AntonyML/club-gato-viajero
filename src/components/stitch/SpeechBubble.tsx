"use client";

type Props = {
  text: string;
  /** Tail side: "left" puts the pointer on the left (Stitch is on the left). */
  tail?: "left" | "right";
  className?: string;
};

export function SpeechBubble({ text, tail = "left", className }: Props) {
  return (
    <div className={`relative inline-block max-w-[280px] ${className ?? ""}`}>
      <div className="story-card rounded-2xl px-4 py-3 text-sm font-medium leading-snug text-cocoa sm:text-base">
        {text}
      </div>
      {tail === "left" ? (
        <svg
          aria-hidden
          className="absolute -bottom-3 left-8 h-4 w-6"
          viewBox="0 0 24 16"
          fill="none"
        >
          <path
            d="M0 0 L20 0 L8 16 Z"
            fill="#fffdf6"
            stroke="rgba(232,201,138,0.55)"
            strokeWidth="1"
          />
        </svg>
      ) : (
        <svg
          aria-hidden
          className="absolute -bottom-3 right-8 h-4 w-6"
          viewBox="0 0 24 16"
          fill="none"
        >
          <path
            d="M4 0 L24 0 L16 16 Z"
            fill="#fffdf6"
            stroke="rgba(232,201,138,0.55)"
            strokeWidth="1"
          />
        </svg>
      )}
    </div>
  );
}
