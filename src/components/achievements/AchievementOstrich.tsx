"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import type { VariantConfig } from "@/lib/achievement-variants";

export type OstrichPlayConfig = {
  /** Where the ostrich should end up (in viewport coordinates). */
  target: { x: number; y: number };
  /** Variant styling. */
  variant: VariantConfig;
  /** When true, plays the ceremonial entrance with extra flourishes. */
  isFinal?: boolean;
  /** Called once the entrance+arrive phase finishes and the deposit happened. */
  onArrived?: () => void;
  /** Called once the entire sequence (including exit) finishes. */
  onDone?: () => void;
};

/**
 * A stylised ostrich that lives off-screen and animates via GSAP.
 *
 * The component renders an SVG group whose `transform` is driven entirely by
 * GSAP — React never re-renders during the sequence. A `<div>` host is used
 * so we can position it via `position: fixed` and pass through-pointer events.
 */
export function AchievementOstrich() {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<SVGGElement | null>(null);
  const neckRef = useRef<SVGGElement | null>(null);
  const legLRef = useRef<SVGGElement | null>(null);
  const legRRef = useRef<SVGGElement | null>(null);
  const wingLRef = useRef<SVGGElement | null>(null);
  const wingRRef = useRef<SVGGElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const eyeRef = useRef<SVGGElement | null>(null);

  useEffect(() => {
    const gsap = getGsap();
    const host = hostRef.current;
    if (!gsap || !host) return;

    gsap.set(host, { xPercent: -200, yPercent: -200, opacity: 0 });

    let playing = false;

    function playSequence(cfg: OstrichPlayConfig) {
      const g = getGsap();
      const h = hostRef.current;
      const body = bodyRef.current;
      const neck = neckRef.current;
      const legL = legLRef.current;
      const legR = legRRef.current;
      const wingL = wingLRef.current;
      const wingR = wingRRef.current;
      const head = headRef.current;
      const eye = eyeRef.current;
      if (!g || !h || !body || !neck || !legL || !legR || !wingL || !wingR || !head || !eye) return;

      if (playing) return;
      playing = true;

      const reduced = prefersReducedMotion();
      const { target, variant, isFinal = false, onArrived, onDone } = cfg;

      const startX = -160;
      const startY = window.innerHeight + 80;
      const exitX = window.innerWidth + 160;

      g.killTweensOf([h, body, neck, legL, legR, wingL, wingR, head, eye]);

      const tl = g.timeline({
        onComplete: () => {
          playing = false;
          onDone?.();
        },
      });

      tl.set(h, { x: startX, y: startY, opacity: 0, scale: 0.55, rotation: 0 });
      tl.set([legL, legR], { rotation: 0, y: 0 });
      tl.set([wingL, wingR], { rotation: 0, scaleX: 1 });
      tl.set(neck, { rotation: 0 });
      tl.set(head, { rotation: 0, x: 0, y: 0 });
      tl.set(body, { scaleY: 1, y: 0 });

      tl.to(h, { opacity: 1, duration: 0.08 });

      const legStride = reduced ? 0 : 0.16;
      tl.to(
        h,
        {
          motionPath: {
            path: [
              { x: startX, y: startY - 60 },
              { x: startX + (target.x - startX) * 0.55, y: target.y - 80 },
              { x: target.x, y: target.y },
            ],
            curviness: 1.6,
            autoRotate: false,
          },
          scale: 1,
          rotation: variant.lean,
          duration: reduced ? 0.15 : 0.7,
          ease: "power3.out",
        },
        0,
      );

      if (!reduced) {
        tl.to(
          [legL, legR],
          {
            rotation: 22,
            duration: legStride,
            yoyo: true,
            repeat: 8,
            ease: "sine.inOut",
            stagger: { each: legStride / 2, from: "start" },
          },
          0,
        );
      }

      tl.call(() => onArrived?.());

      if (variant.arrivalPose === "tumble") {
        tl.to(h, { rotation: variant.lean + 14, duration: 0.08, ease: "power1.out" }, ">");
        tl.to(h, { rotation: variant.lean - 6, duration: 0.12, ease: "power2.out" });
        tl.to(h, { rotation: variant.lean, duration: 0.12, ease: "power3.out" });
      } else if (variant.arrivalPose === "bow") {
        tl.to(neck, { rotation: 22, duration: 0.22, transformOrigin: "50% 0%", ease: "power2.out" }, ">");
        tl.to(neck, { rotation: 0, duration: 0.32, ease: "elastic.out(1, 0.6)" }, ">-0.05");
      } else if (variant.arrivalPose === "sprint") {
        tl.to(h, { scale: 0.92, duration: 0.08 }, ">");
        tl.to(h, { scale: 1.04, duration: 0.1, ease: "power2.out" });
        tl.to([wingL, wingR], { rotation: -18, duration: 0.08, yoyo: true, repeat: 3 }, "<");
        tl.to(h, { scale: 1, duration: 0.18 });
      } else if (variant.arrivalPose === "wobble") {
        tl.to(h, { rotation: variant.lean + 6, duration: 0.18, yoyo: true, repeat: 2, ease: "sine.inOut" }, ">");
      } else if (variant.arrivalPose === "ceremony") {
        tl.to([wingL, wingR], { scaleY: 0.3, duration: 0.16, transformOrigin: "50% 100%" }, ">");
        tl.to(neck, { rotation: 26, duration: 0.3, transformOrigin: "50% 0%", ease: "power2.out" }, ">-0.1");
        tl.to(head, { rotation: -6, duration: 0.18, transformOrigin: "50% 100%" }, "<");
        tl.to(eye, { scaleY: 0.1, duration: 0.06, yoyo: true, repeat: 1 }, ">-0.05");
        tl.to({}, { duration: 0.18 });
        tl.to(neck, { rotation: 0, duration: 0.34, ease: "elastic.out(1, 0.7)" }, ">-0.05");
        tl.to(head, { rotation: 0, duration: 0.22 }, "<");
        tl.to([wingL, wingR], { scaleY: 1, duration: 0.18 }, "<");
      }

      tl.add("deposit");

      if (isFinal) {
        tl.to(h, { scale: 1.08, duration: 0.16, ease: "power2.out" }, "deposit");
        tl.to(h, { scale: 1, duration: 0.22, ease: "elastic.out(1, 0.7)" });
      }

      tl.to(
        {},
        {
          duration: isFinal ? 0.7 : 0.45,
        },
        "deposit",
      );

      const exitY = (() => {
        if (variant.exitTo === "right") return target.y + 30;
        if (variant.exitTo === "down") return window.innerHeight + 80;
        return target.y - 200;
      })();

      tl.to(
        h,
        {
          x: exitX,
          y: exitY,
          rotation: variant.lean - 6,
          opacity: 0.85,
          duration: reduced ? 0.2 : 0.55,
          ease: "power2.in",
        },
        `deposit+=${isFinal ? 0.7 : 0.45}`,
      );

      tl.to(h, { opacity: 0, duration: 0.18 }, ">-0.05");
    }

    const handler = (e: Event) => {
      const cfg = (e as CustomEvent<OstrichPlayConfig>).detail;
      if (!cfg) return;
      playSequence(cfg);
    };
    window.addEventListener("ostrich:play", handler as EventListener);

    return () => {
      window.removeEventListener("ostrich:play", handler as EventListener);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-0 w-0"
      style={{ willChange: "transform, opacity" }}
    >
      <svg
        width="180"
        height="220"
        viewBox="0 0 180 220"
        style={{ overflow: "visible", transform: "translate(-50%, -50%)" }}
      >
        <ellipse cx="90" cy="208" rx="46" ry="6" fill="rgba(74,58,48,0.18)" />

        <g ref={legLRef} style={{ transformOrigin: "60px 180px" }}>
          <path d="M60,180 L60,202" stroke="#d6a36a" strokeWidth="4" strokeLinecap="round" />
          <path d="M60,202 L48,204" stroke="#d6a36a" strokeWidth="4" strokeLinecap="round" />
          <path d="M60,202 L62,206" stroke="#a87a3f" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g ref={legRRef} style={{ transformOrigin: "118px 180px" }}>
          <path d="M118,180 L118,202" stroke="#d6a36a" strokeWidth="4" strokeLinecap="round" />
          <path d="M118,202 L130,204" stroke="#d6a36a" strokeWidth="4" strokeLinecap="round" />
          <path d="M118,202 L120,206" stroke="#a87a3f" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g ref={bodyRef}>
          <ellipse cx="90" cy="160" rx="44" ry="34" fill="#5a3d2e" />
          <ellipse cx="90" cy="166" rx="28" ry="20" fill="#7a5742" opacity="0.7" />
          <path
            d="M70,138 Q90,118 110,138 Q104,150 90,150 Q76,150 70,138 Z"
            fill="#5a3d2e"
            opacity="0.6"
          />

          <g ref={wingLRef} style={{ transformOrigin: "60px 152px" }}>
            <ellipse cx="50" cy="154" rx="16" ry="9" fill="#5a3d2e" transform="rotate(-12 50 154)" />
            <path d="M40,150 Q44,144 52,148" stroke="#3a2a24" strokeWidth="1" fill="none" opacity="0.5" />
          </g>
          <g ref={wingRRef} style={{ transformOrigin: "120px 152px" }}>
            <ellipse cx="130" cy="154" rx="16" ry="9" fill="#5a3d2e" transform="rotate(12 130 154)" />
            <path d="M140,150 Q136,144 128,148" stroke="#3a2a24" strokeWidth="1" fill="none" opacity="0.5" />
          </g>

          <g ref={neckRef} style={{ transformOrigin: "90px 130px" }}>
            <path
              d="M90,130 C92,108 96,86 88,62 C84,52 82,46 84,42"
              stroke="#5a3d2e"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            <g ref={headRef} style={{ transformOrigin: "84px 42px" }}>
              <ellipse cx="84" cy="42" rx="14" ry="11" fill="#5a3d2e" />
              <path d="M76,38 L72,30 L80,36 Z" fill="#5a3d2e" />
              <ellipse cx="80" cy="44" rx="4" ry="5" fill="#fff8ec" />
              <g ref={eyeRef} style={{ transformOrigin: "80px 44px" }}>
                <ellipse cx="80" cy="44" rx="2.4" ry="3.4" fill="#3a2a24" />
                <circle cx="81" cy="43" r="0.8" fill="#fff8ec" />
              </g>
              <path d="M73,48 Q78,52 84,48" stroke="#3a2a24" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M90,42 Q98,40 100,38" stroke="#3a2a24" strokeWidth="1" fill="none" opacity="0.6" />
            </g>
          </g>

          <circle cx="86" cy="158" r="2" fill="#f7c8c8" opacity="0.7" />
          <circle cx="94" cy="158" r="2" fill="#f7c8c8" opacity="0.7" />
        </g>
      </svg>
    </div>
  );
}