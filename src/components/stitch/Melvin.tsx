"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export type MelvinState =
  | "idle"
  | "walk"
  | "look"
  | "photo"
  | "celebrate"
  | "sleep"
  | "wave"
  | "sit"
  | "sneak"
  | "pounce"
  | "groom"
  | "confused"
  | "happy"
  | "sad";

type Props = {
  state?: MelvinState;
  size?: number;
  facing?: "right" | "left";
  className?: string;
  onSuitcase?: boolean;
};

export function Melvin({
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

      gsap.to(sel("[data-melvin='body']"), {
        scaleY: 1.02,
        transformOrigin: "50% 100%",
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      gsap.to(sel("[data-melvin='tail']"), {
        rotation: 8,
        transformOrigin: "0% 50%",
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      const blink = () => {
        gsap.fromTo(
          sel("[data-melvin='eye']"),
          { scaleY: 1 },
          { scaleY: 0.08, duration: 0.08, yoyo: true, repeat: 1, transformOrigin: "center" },
        );
      };
      gsap.delayedCall(1.5, blink);
      const blinkInterval = window.setInterval(blink, 4200);

      return () => window.clearInterval(blinkInterval);
    }, rootRef);

    return () => ctx.revert();
  }, []);

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

    const legs = root.querySelectorAll<SVGElement>("[data-melvin='leg']");
    const body = root.querySelector<SVGElement>("[data-melvin='body']");

    if (state === "walk") {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(legs, {
        y: -6, duration: 0.22, stagger: { each: 0.11, yoyo: true, repeat: 1 }, ease: "sine.inOut",
      }).to(body ?? null, { y: -3, duration: 0.22, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<");
      animRef.current = tl;
    } else if (state === "sneak") {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(legs, {
        y: -3, duration: 0.35, stagger: { each: 0.175, yoyo: true, repeat: 1 }, ease: "sine.inOut",
      }).to(body ?? null, { y: -1.5, duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, "<");
      animRef.current = tl;
    } else if (state === "celebrate") {
      const tl = gsap.timeline({ repeat: 1 });
      tl.to(body ?? null, { y: -22, duration: 0.22, ease: "power2.out" })
        .to(body ?? null, { y: 0, duration: 0.32, ease: "bounce.out" });
      animRef.current = tl;
    } else if (state === "pounce") {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(body ?? null, { y: -14, scaleY: 1.06, duration: 0.4, ease: "power1.out" });
      animRef.current = tl;
    } else if (state === "photo") {
      const arm = root.querySelector<SVGElement>("[data-melvin='arm-photo']");
      const flash = root.querySelector<SVGElement>("[data-melvin='flash']");
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(arm ?? null, { rotation: 6, duration: 0.6, transformOrigin: "0% 100%" })
        .to(flash ?? null, { opacity: 0.9, duration: 0.05 })
        .to(flash ?? null, { opacity: 0, duration: 0.3 });
      animRef.current = tl;
    } else if (state === "wave") {
      const arm = root.querySelector<SVGElement>("[data-melvin='arm-wave']");
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(arm ?? null, { rotation: -10 }, { rotation: 18, duration: 0.28, yoyo: true, repeat: 5, ease: "sine.inOut" });
      animRef.current = tl;
    } else if (state === "sleep") {
      const bodyEl = root.querySelector<SVGElement>("[data-melvin='sleep-body']");
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(bodyEl ?? null, { y: 2, scaleY: 0.96, duration: 1.6, ease: "sine.inOut" });
      animRef.current = tl;
    } else if (state === "groom") {
      const head = root.querySelector<SVGElement>("[data-melvin='head']");
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(head ?? null, { rotation: -6, duration: 0.4, transformOrigin: "50% 100%", ease: "power1.inOut" });
      animRef.current = tl;
    } else if (state === "confused") {
      const head = root.querySelector<SVGElement>("[data-melvin='head']");
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(head ?? null, { rotation: 8, duration: 0.6, transformOrigin: "50% 100%", ease: "sine.inOut" });
      animRef.current = tl;
    } else if (state === "happy") {
      const tail = root.querySelector<SVGElement>("[data-melvin='tail']");
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(tail ?? null, { rotation: 20, duration: 0.25, yoyo: true, repeat: 5, ease: "power1.inOut" });
      animRef.current = tl;
    } else if (state === "sad") {
      const ears = root.querySelectorAll<SVGElement>("[data-melvin='ear']");
      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(ears, { y: 4, duration: 0.8, ease: "sine.inOut" });
      animRef.current = tl;
    }

    return () => {
      animRef.current?.kill();
      animRef.current = null;
    };
  }, [state]);

  const flip = facing === "left" ? "scaleX(-1)" : undefined;

  const isSit = state === "sit" || state === "sleep" || state === "groom";

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
        <defs>
          <radialGradient id="flashGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="110" cy="248" rx="60" ry="8" fill="rgba(74,58,48,0.18)" />

        {onSuitcase && (
          <g>
            <rect x="58" y="208" width="104" height="32" rx="6" fill="#c98a55" />
            <rect x="58" y="208" width="104" height="6" rx="3" fill="#a76a3a" />
            <rect x="100" y="200" width="20" height="10" rx="2" fill="#6b4a3a" />
            <rect x="62" y="218" width="96" height="2" fill="#6b4a3a" opacity="0.4" />
          </g>
        )}

        {/* Backpack (visible behind body) */}
        <g data-melvin="backpack">
          <rect x="82" y="155" width="56" height="50" rx="10" fill="#4f7d59" />
          <rect x="86" y="158" width="48" height="44" rx="8" fill="#6fa67a" />
          <line x1="110" y1="158" x2="110" y2="202" stroke="#4f7d59" strokeWidth="1.5" />
          <rect x="95" y="162" width="30" height="12" rx="3" fill="#4f7d59" />
          <rect x="100" y="170" width="20" height="20" rx="2" fill="#e8c98a" opacity="0.5" />
          {/* Strap */}
          <path d="M86,165 Q60,170 62,190" stroke="#6b4a3a" strokeWidth="2.5" fill="none" opacity="0.5" />
          <path d="M134,165 Q160,170 158,190" stroke="#6b4a3a" strokeWidth="2.5" fill="none" opacity="0.5" />
        </g>

        {/* Tail */}
        {state !== "sleep" && (
          <g data-melvin="tail" style={{ transformOrigin: "60px 200px" }}>
            <path
              d="M60,200 C16,176 14,144 44,130 C42,146 48,168 64,192 C58,196 56,200 60,200 Z"
              fill="#5a3d2e"
            />
            <path
              d="M52,186 C36,172 28,150 42,134"
              stroke="#3a2a24"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
          </g>
        )}

        {/* Sleep curled body */}
        {state === "sleep" ? (
          <g data-melvin="sleep-body">
            <ellipse cx="110" cy="220" rx="54" ry="34" fill="#5a3d2e" />
            <ellipse cx="110" cy="226" rx="38" ry="20" fill="#7a5742" opacity="0.7" />
            <ellipse cx="110" cy="202" rx="44" ry="28" fill="#5a3d2e" />
            <ellipse cx="110" cy="208" rx="30" ry="18" fill="#7a5742" opacity="0.6" />
            <ellipse cx="88" cy="220" rx="14" ry="10" fill="#5a3d2e" />
            <ellipse cx="132" cy="220" rx="14" ry="10" fill="#5a3d2e" />
            <ellipse cx="110" cy="200" rx="40" ry="30" fill="#5a3d2e" />
            <ellipse cx="110" cy="182" rx="28" ry="24" fill="#5a3d2e" />
            <ellipse cx="80" cy="192" rx="16" ry="14" fill="#5a3d2e" />
            <ellipse cx="140" cy="192" rx="16" ry="14" fill="#5a3d2e" />
            <ellipse cx="110" cy="172" rx="18" ry="14" fill="#5a3d2e" />
            <path d="M96,168 Q110,162 124,168" stroke="#3a2a24" strokeWidth="1.5" fill="none" />
            <path d="M102,174 Q110,170 118,174" stroke="#3a2a24" strokeWidth="1" fill="none" opacity="0.5" />
            <g className="zzz" fontSize="22" fontFamily="serif">
              <text x="150" y="100">Z</text>
              <text x="162" y="82">Z</text>
              <text x="174" y="64">Z</text>
            </g>
          </g>
        ) : (
          <g data-melvin="body">
            {/* Body */}
            {isSit ? (
              <ellipse cx="110" cy="210" rx="52" ry="44" fill="#5a3d2e" />
            ) : (
              <>
                <ellipse cx="110" cy="200" rx="48" ry="42" fill="#5a3d2e" />
                <ellipse cx="110" cy="208" rx="34" ry="28" fill="#7a5742" opacity="0.7" />
              </>
            )}

            {/* Sitting haunches */}
            {isSit && (
              <>
                <ellipse cx="74" cy="228" rx="24" ry="20" fill="#5a3d2e" />
                <ellipse cx="146" cy="228" rx="24" ry="20" fill="#5a3d2e" />
                <ellipse cx="110" cy="226" rx="38" ry="20" fill="#7a5742" opacity="0.6" />
              </>
            )}

            {/* Legs */}
            {isSit ? (
              <>
                <ellipse cx="80" cy="238" rx="12" ry="10" fill="#5a3d2e" />
                <ellipse cx="80" cy="244" rx="10" ry="5" fill="#3a2a24" />
                <ellipse cx="76" cy="246" rx="4" ry="3" fill="#f7c8c8" />
                <ellipse cx="84" cy="246" rx="4" ry="3" fill="#f7c8c8" />
                <ellipse cx="140" cy="238" rx="12" ry="10" fill="#5a3d2e" />
                <ellipse cx="140" cy="244" rx="10" ry="5" fill="#3a2a24" />
                <ellipse cx="136" cy="246" rx="4" ry="3" fill="#f7c8c8" />
                <ellipse cx="144" cy="246" rx="4" ry="3" fill="#f7c8c8" />
              </>
            ) : (
              <>
                <g data-melvin="leg">
                  <ellipse cx="84" cy="232" rx="12" ry="16" fill="#5a3d2e" />
                  <ellipse cx="84" cy="242" rx="11" ry="6" fill="#3a2a24" />
                  <ellipse cx="81" cy="244" rx="4" ry="3" fill="#f7c8c8" />
                  <ellipse cx="87" cy="244" rx="4" ry="3" fill="#f7c8c8" />
                </g>
                <g data-melvin="leg">
                  <ellipse cx="136" cy="232" rx="12" ry="16" fill="#5a3d2e" />
                  <ellipse cx="136" cy="242" rx="11" ry="6" fill="#3a2a24" />
                  <ellipse cx="133" cy="244" rx="4" ry="3" fill="#f7c8c8" />
                  <ellipse cx="139" cy="244" rx="4" ry="3" fill="#f7c8c8" />
                </g>
              </>
            )}

            {/* Head */}
            <g data-melvin="head">
              <ellipse cx="110" cy="140" rx="54" ry="50" fill="#5a3d2e" />

              {/* Ears */}
              <g data-melvin="ear">
                <path d="M68,110 L72,76 L96,106 Z" fill="#5a3d2e" />
                <path d="M76,100 L78,86 L92,102 Z" fill="#f7c8c8" />
              </g>
              <g data-melvin="ear">
                <path d="M152,110 L148,76 L124,106 Z" fill="#5a3d2e" />
                <path d="M144,100 L142,86 L128,102 Z" fill="#f7c8c8" />
              </g>

              {/* Forehead stripes */}
              <path d="M100,110 L110,102 L120,110" stroke="#3a2a24" strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M95,116 L110,106 L125,116" stroke="#3a2a24" strokeWidth="1.5" fill="none" opacity="0.25" />

              {/* Muzzle */}
              <ellipse cx="110" cy="160" rx="32" ry="24" fill="#cfa88a" opacity="0.7" />

              {/* Blush */}
              <ellipse cx="80" cy="154" rx="12" ry="7" fill="#f7c8c8" opacity="0.5" />
              <ellipse cx="140" cy="154" rx="12" ry="7" fill="#f7c8c8" opacity="0.5" />

              {/* Eyes */}
              <g data-melvin="eye" style={{ transformOrigin: "94px 136px" }}>
                <ellipse cx="94" cy="136" rx="8" ry="11" fill="#fff8ec" />
                <ellipse cx="95" cy="138" rx="5" ry="8" fill="#3a2a24" />
                <circle cx="97" cy="133" r="2.5" fill="#fff8ec" />
              </g>
              <g data-melvin="eye" style={{ transformOrigin: "126px 136px" }}>
                <ellipse cx="126" cy="136" rx="8" ry="11" fill="#fff8ec" />
                <ellipse cx="127" cy="138" rx="5" ry="8" fill="#3a2a24" />
                <circle cx="129" cy="133" r="2.5" fill="#fff8ec" />
              </g>

              {/* Sad droopy eyes */}
              {state === "sad" && (
                <g>
                  <ellipse cx="94" cy="140" rx="7" ry="8" fill="#fff8ec" />
                  <ellipse cx="94" cy="142" rx="4" ry="5" fill="#3a2a24" />
                  <circle cx="95" cy="139" r="2" fill="#fff8ec" opacity="0.5" />
                  <ellipse cx="126" cy="140" rx="7" ry="8" fill="#fff8ec" />
                  <ellipse cx="126" cy="142" rx="4" ry="5" fill="#3a2a24" />
                  <circle cx="127" cy="139" r="2" fill="#fff8ec" opacity="0.5" />
                </g>
              )}

              {/* Happy squint eyes */}
              {state === "happy" && (
                <g>
                  <path d="M86,136 Q94,130 102,136" stroke="#3a2a24" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M118,136 Q126,130 134,136" stroke="#3a2a24" strokeWidth="3" fill="none" strokeLinecap="round" />
                </g>
              )}

              {/* Confused eyes */}
              {state === "confused" && (
                <g>
                  <circle cx="94" cy="136" r="6" fill="#fff8ec" />
                  <circle cx="94" cy="136" r="3.5" fill="#3a2a24" />
                  <circle cx="128" cy="130" r="5" fill="#fff8ec" />
                  <circle cx="128" cy="130" r="3" fill="#3a2a24" />
                </g>
              )}

              {/* Nose */}
              <path d="M105,154 L115,154 L110,160 Z" fill="#3a2a24" />

              {/* Mouth */}
              {state === "happy" || state === "celebrate" ? (
                <path
                  d="M104,164 Q110,172 116,164"
                  stroke="#3a2a24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : state === "sad" ? (
                <path
                  d="M104,168 Q110,162 116,168"
                  stroke="#3a2a24"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              ) : (
                <>
                  <path
                    d="M110,160 Q106,166 102,164 M110,160 Q114,166 118,164"
                    stroke="#3a2a24"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </>
              )}

              {/* Whiskers */}
              <g stroke="#3a2a24" strokeWidth="1.2" strokeLinecap="round" opacity="0.6">
                <line x1="76" y1="158" x2="52" y2="154" />
                <line x1="76" y1="162" x2="50" y2="164" />
                <line x1="76" y1="166" x2="54" y2="172" />
                <line x1="144" y1="158" x2="168" y2="154" />
                <line x1="144" y1="162" x2="170" y2="164" />
                <line x1="144" y1="166" x2="166" y2="172" />
              </g>
            </g>

            {/* Confused question mark */}
            {state === "confused" && (
              <g>
                <circle cx="160" cy="104" r="12" fill="#e8c98a" opacity="0.6" />
                <text x="160" y="110" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#6b4a3a">?</text>
              </g>
            )}

            {/* Pounce effect lines */}
            {state === "pounce" && (
              <g stroke="#3a2a24" strokeWidth="1.5" opacity="0.3" strokeLinecap="round">
                <line x1="16" y1="200" x2="40" y2="210" />
                <line x1="20" y1="180" x2="44" y2="190" />
                <line x1="180" y1="200" x2="200" y2="210" />
                <line x1="176" y1="180" x2="196" y2="190" />
              </g>
            )}

            {/* Arms */}
            <g
              data-melvin="arm-photo"
              style={{ transformOrigin: "152px 180px" }}
            >
              <ellipse cx="158" cy="180" rx="10" ry="18" fill="#5a3d2e" transform="rotate(20 158 180)" />
              <rect x="160" y="160" width="24" height="16" rx="4" fill="#3a2a24" />
              <circle cx="172" cy="168" r="5" fill="#e8c98a" />
              <circle cx="172" cy="168" r="2.5" fill="#3a2a24" />
              <rect x="162" y="174" width="8" height="3" rx="1" fill="#e8c98a" opacity="0.6" />
              <rect x="162" y="163" width="4" height="8" rx="1" fill="#e8c98a" opacity="0.4" />
            </g>

            {/* Camera flash */}
            {state === "photo" && (
              <circle data-melvin="flash" cx="172" cy="168" r="40" fill="url(#flashGrad)" opacity="0" />
            )}

            <g
              data-melvin="arm-wave"
              style={{ transformOrigin: "68px 180px" }}
            >
              <ellipse cx="62" cy="180" rx="10" ry="18" fill="#5a3d2e" transform="rotate(-20 62 180)" />
              <ellipse cx="52" cy="166" rx="9" ry="9" fill="#5a3d2e" />
              <ellipse cx="52" cy="166" rx="4" ry="3" fill="#f7c8c8" />
            </g>

            {/* Camera strap */}
            {state !== "sit" && (
              <path
                d="M86,200 Q110,168 134,200"
                stroke="#6b4a3a"
                strokeWidth="3"
                fill="none"
                opacity="0.5"
              />
            )}

            {/* Happy sparkles */}
            {(state === "happy" || state === "celebrate") && (
              <g fill="#e8c98a" opacity="0.6">
                <circle cx="40" cy="120" r="3" />
                <circle cx="36" cy="108" r="2" />
                <circle cx="180" cy="116" r="3" />
                <circle cx="184" cy="104" r="2" />
              </g>
            )}
          </g>
        )}
      </svg>
    </div>
  );
}
