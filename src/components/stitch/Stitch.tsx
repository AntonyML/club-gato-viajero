"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export type StitchState =
  | "idle"
  | "walk"
  | "look"
  | "photo"
  | "celebrate"
  | "sleep"
  | "wave";

type Props = {
  state?: StitchState;
  size?: number;
  facing?: "right" | "left";
  className?: string;
  /** When true, the figure is placed sitting on a suitcase (used in hero). */
  onSuitcase?: boolean;
};

export function Stitch({
  state = "idle",
  size = 220,
  facing = "right",
  className,
  onSuitcase = false,
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const animRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    if (!gsap || !rootRef.current || reduced) return;

    const ctx = gsap.context(() => {
      const root = rootRef.current;
      if (!root) return;
      const sel = (s: string) => root.querySelectorAll<SVGElement>(s);

      // Soft idle breathing
      gsap.to(sel("[data-stitch='body']"), {
        scaleY: 1.02,
        transformOrigin: "50% 100%",
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Tail wags gently
      gsap.to(sel("[data-stitch='tail']"), {
        rotation: 8,
        transformOrigin: "0% 50%",
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Blink (eyes)
      const blink = () => {
        gsap.fromTo(
          sel("[data-stitch='eye']"),
          { scaleY: 1 },
          { scaleY: 0.08, duration: 0.08, yoyo: true, repeat: 1, transformOrigin: "center" });
      };
      gsap.delayedCall(1.5, blink);
      const blinkInterval = window.setInterval(blink, 4200);

      // Cleanup
      return () => window.clearInterval(blinkInterval);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Walk cycle
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    if (!gsap || !rootRef.current || reduced) {
      animRef.current?.kill();
      animRef.current = null;
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    animRef.current?.kill();

    if (state === "walk") {
      const legs = root.querySelectorAll<SVGElement>("[data-stitch='leg']");
      const body = root.querySelector<SVGElement>("[data-stitch='body']");
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(legs, {
        y: -6,
        duration: 0.22,
        stagger: { each: 0.11, yoyo: true, repeat: 1 },
        ease: "sine.inOut",
      }).to(
        body ?? null,
        { y: -3, duration: 0.22, yoyo: true, repeat: 1, ease: "sine.inOut" },
        "<",
      );
      animRef.current = tl;
    } else if (state === "celebrate") {
      const body = root.querySelector<SVGElement>("[data-stitch='body']");
      const tl = gsap.timeline({ repeat: 1 });
      tl.to(body ?? null, { y: -22, duration: 0.22, ease: "power2.out" }).to(
        body ?? null,
        { y: 0, duration: 0.32, ease: "bounce.out" },
      );
      animRef.current = tl;
    } else if (state === "photo") {
      const arm = root.querySelector<SVGElement>("[data-stitch='arm-photo']");
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(arm ?? null, {
        rotation: 6,
        duration: 0.6,
        transformOrigin: "0% 100%",
      });
      animRef.current = tl;
    } else if (state === "wave") {
      const arm = root.querySelector<SVGElement>("[data-stitch='arm-wave']");
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(
        arm ?? null,
        { rotation: -10 },
        { rotation: 18, duration: 0.28, yoyo: true, repeat: 5, ease: "sine.inOut" },
      );
      animRef.current = tl;
    } else if (state === "sleep") {
      const body = root.querySelector<SVGElement>("[data-stitch='body']");
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(body ?? null, {
        y: 2,
        scaleY: 0.96,
        duration: 1.6,
        ease: "sine.inOut",
      });
      animRef.current = tl;
    }

    return () => {
      animRef.current?.kill();
      animRef.current = null;
    };
  }, [state]);

  const flip = facing === "left" ? "scaleX(-1)" : undefined;

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        width: size,
        height: size * 1.15,
        display: "inline-block",
        transform: flip,
        transformOrigin: "center",
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 220 260"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="110" cy="248" rx="60" ry="8" fill="rgba(74,58,48,0.18)" />

        {onSuitcase && (
          <g>
            <rect x="58" y="208" width="104" height="32" rx="6" fill="#c98a55" />
            <rect x="58" y="208" width="104" height="6" rx="3" fill="#a76a3a" />
            <rect x="100" y="200" width="20" height="10" rx="2" fill="#6b4a3a" />
            <rect x="62" y="218" width="96" height="2" fill="#6b4a3a" opacity="0.4" />
          </g>
        )}

        {/* Tail */}
        <g data-stitch="tail" style={{ transformOrigin: "60px 200px" }}>
          <path
            d="M60,200 C20,180 18,150 50,140 C30,160 50,180 60,200 Z"
            fill="#3a2a24"
          />
          <path
            d="M58,196 C32,182 30,158 50,150"
            stroke="#5b3f33"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
        </g>

        {/* Body */}
        <g data-stitch="body">
          {/* Back haunches */}
          <ellipse cx="110" cy="200" rx="46" ry="38" fill="#5a3d2e" />
          {/* Belly highlight */}
          <ellipse cx="110" cy="208" rx="32" ry="24" fill="#7a5742" opacity="0.8" />

          {/* Legs */}
          <g data-stitch="leg">
            <ellipse cx="84" cy="232" rx="10" ry="14" fill="#5a3d2e" />
            <ellipse cx="84" cy="240" rx="9" ry="5" fill="#3a2a24" />
          </g>
          <g data-stitch="leg">
            <ellipse cx="136" cy="232" rx="10" ry="14" fill="#5a3d2e" />
            <ellipse cx="136" cy="240" rx="9" ry="5" fill="#3a2a24" />
          </g>

          {/* Head */}
          <g>
            <ellipse cx="110" cy="140" rx="50" ry="46" fill="#5a3d2e" />
            {/* Ears */}
            <path d="M70,108 L78,82 L96,108 Z" fill="#5a3d2e" />
            <path d="M80,102 L84,90 L92,104 Z" fill="#f7c8c8" />
            <path d="M150,108 L142,82 L124,108 Z" fill="#5a3d2e" />
            <path d="M140,102 L136,90 L128,104 Z" fill="#f7c8c8" />

            {/* Face (lighter muzzle area) */}
            <ellipse cx="110" cy="156" rx="28" ry="22" fill="#cfa88a" opacity="0.7" />

            {/* Eyes */}
            <g data-stitch="eye" style={{ transformOrigin: "96px 138px" }}>
              <ellipse cx="96" cy="138" rx="6" ry="9" fill="#fff8ec" />
              <ellipse cx="96" cy="140" rx="3.5" ry="6" fill="#3a2a24" />
              <circle cx="97" cy="136" r="1" fill="#fff8ec" />
            </g>
            <g data-stitch="eye" style={{ transformOrigin: "124px 138px" }}>
              <ellipse cx="124" cy="138" rx="6" ry="9" fill="#fff8ec" />
              <ellipse cx="124" cy="140" rx="3.5" ry="6" fill="#3a2a24" />
              <circle cx="125" cy="136" r="1" fill="#fff8ec" />
            </g>

            {state === "sleep" ? (
              <g stroke="#3a2a24" strokeWidth="2" fill="none" strokeLinecap="round">
                <path d="M90,138 Q96,144 102,138" />
                <path d="M118,138 Q124,144 130,138" />
              </g>
            ) : null}

            {/* Nose + mouth */}
            <path d="M105,154 L115,154 L110,160 Z" fill="#3a2a24" />
            <path
              d="M110,160 Q106,166 102,164 M110,160 Q114,166 118,164"
              stroke="#3a2a24"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Whiskers */}
            <g stroke="#3a2a24" strokeWidth="1" strokeLinecap="round" opacity="0.7">
              <line x1="80" y1="160" x2="60" y2="156" />
              <line x1="80" y1="164" x2="58" y2="166" />
              <line x1="140" y1="160" x2="160" y2="156" />
              <line x1="140" y1="164" x2="162" y2="166" />
            </g>
          </g>

          {/* Arms */}
          {/* Photo arm (right) */}
          <g
            data-stitch="arm-photo"
            style={{ transformOrigin: "152px 180px" }}
          >
            <ellipse cx="158" cy="180" rx="10" ry="18" fill="#5a3d2e" transform="rotate(20 158 180)" />
            {/* Camera */}
            <rect x="160" y="160" width="22" height="14" rx="3" fill="#3a2a24" />
            <circle cx="171" cy="167" r="4" fill="#e8c98a" />
            <circle cx="171" cy="167" r="2" fill="#3a2a24" />
          </g>

          {/* Wave / idle arm (left) */}
          <g
            data-stitch="arm-wave"
            style={{ transformOrigin: "68px 180px" }}
          >
            <ellipse cx="62" cy="180" rx="10" ry="18" fill="#5a3d2e" transform="rotate(-20 62 180)" />
            <ellipse cx="56" cy="166" rx="8" ry="8" fill="#5a3d2e" />
          </g>

          {/* Sleep Z's */}
          {state === "sleep" && (
            <g className="zzz" fontSize="22" fontFamily="serif">
              <text x="150" y="100">Z</text>
              <text x="160" y="84">Z</text>
              <text x="170" y="68">Z</text>
            </g>
          )}

          {/* Camera strap across body */}
          {state !== "sleep" && (
            <path
              d="M86,200 Q110,170 134,200"
              stroke="#6b4a3a"
              strokeWidth="3"
              fill="none"
              opacity="0.6"
            />
          )}
        </g>
      </svg>
    </div>
  );
}
