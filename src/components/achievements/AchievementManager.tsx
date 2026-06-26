"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { TOTAL_BEACHES } from "@/data/beaches";
import { prefersReducedMotion } from "@/lib/motion";
import { getGsap } from "@/lib/gsap";
import { AchievementOstrich } from "./AchievementOstrich";
import { AchievementStamp } from "./AchievementStamp";
import { AchievementConfetti } from "./AchievementConfetti";
import { AchievementToast } from "./AchievementToast";
import { variantFor, type VariantConfig } from "@/lib/achievement-variants";
import type { Beach } from "@/data/beaches";

export type AchievementEvent = {
  id: string;
  beachName: string;
  beachNumber: number;
  variant: VariantConfig;
  isFinal: boolean;
};

type InternalEvent = AchievementEvent & {
  beach: Beach;
};

type AchievementContextValue = {
  play: (beach: Beach) => void;
  registerPassportAnchor: (el: HTMLElement | null) => void;
};

const AchievementContext = createContext<AchievementContextValue | null>(null);

const FINAL_TITLE = "¡Viaje completado!";
const FINAL_SUBTITLE = "5 playas · 1 maleta · infinitos recuerdos";

export function useAchievementManager(): AchievementContextValue {
  const ctx = useContext(AchievementContext);
  if (!ctx) {
    return {
      play: () => {},
      registerPassportAnchor: () => {},
    };
  }
  return ctx;
}

type ToastState = {
  visible: boolean;
  title: string;
  subtitle: string;
  variant: "normal" | "final";
};

export function AchievementManager({ children }: { children: ReactNode }) {
  const passportRef = useRef<HTMLElement | null>(null);
  const stampRef = useRef<HTMLDivElement | null>(null);
  const queueRef = useRef<InternalEvent[]>([]);
  const playedRef = useRef<Set<string>>(new Set());
  const playingRef = useRef(false);
  const drainRef = useRef<() => void>(() => {});
  const [current, setCurrent] = useState<InternalEvent | null>(null);
  const [confettiTick, setConfettiTick] = useState(0);
  const [confettiAnchor, setConfettiAnchor] = useState<{ x: number; y: number } | undefined>(undefined);
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    title: "",
    subtitle: "",
    variant: "normal",
  });

  const registerPassportAnchor = useCallback((el: HTMLElement | null) => {
    passportRef.current = el;
  }, []);

  useEffect(() => {
    drainRef.current = () => {
      if (playingRef.current) return;
      const next = queueRef.current.shift();
      if (!next) return;
      playingRef.current = true;
      setCurrent(next);
    };
  }, []);

  const play = useCallback((beach: Beach) => {
    if (playedRef.current.has(`beach-${beach.id}`)) return;
    playedRef.current.add(`beach-${beach.id}`);

    const event: InternalEvent = {
      id: `beach-${beach.id}`,
      beachName: beach.name,
      beachNumber: beach.id,
      variant: variantFor(beach),
      isFinal: beach.id === TOTAL_BEACHES,
      beach,
    };

    if (event.isFinal) queueRef.current.unshift(event);
    else queueRef.current.push(event);

    drainRef.current();
  }, []);

  useEffect(() => {
    const ev = current;
    if (!ev) return;

    const reduced = prefersReducedMotion();
    const gsap = getGsap();
    const passportEl = passportRef.current;
    const stampNode = stampRef.current;

    if (!gsap || !passportEl || !stampNode) {
      playingRef.current = false;
      setCurrent(null);
      drainRef.current();
      return;
    }

    const slot = passportEl.querySelector<HTMLElement>(`[data-stamp-slot='${ev.beachNumber}']`);
    const slotRect = slot?.getBoundingClientRect();
    const passportRect = passportEl.getBoundingClientRect();

    const targetX = slotRect ? slotRect.left + slotRect.width / 2 : passportRect.left + passportRect.width / 2;
    const targetY = slotRect ? slotRect.top + slotRect.height / 2 : passportRect.top + passportRect.height / 2;

    if (reduced) {
      const title = ev.isFinal ? FINAL_TITLE : ev.variant.title;
      const subtitle = ev.isFinal ? FINAL_SUBTITLE : `Sello ${ev.beachNumber}/${TOTAL_BEACHES} · ${ev.beachName}`;
      setConfettiAnchor({ x: targetX, y: targetY });
      setConfettiTick((t) => t + 1);
      setToast({ visible: true, title, subtitle, variant: ev.isFinal ? "final" : "normal" });
      window.setTimeout(() => {
        playingRef.current = false;
        setCurrent(null);
        setToast((t) => ({ ...t, visible: false }));
        drainRef.current();
      }, 2000);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        playingRef.current = false;
        setCurrent(null);
        setToast((t) => ({ ...t, visible: false }));
        drainRef.current();
      },
    });

    const title = ev.isFinal ? FINAL_TITLE : ev.variant.title;
    const subtitle = ev.isFinal ? FINAL_SUBTITLE : `Sello ${ev.beachNumber}/${TOTAL_BEACHES} · ${ev.beachName}`;

    gsap.set(stampNode, {
      x: targetX,
      y: targetY,
      scale: 0,
      opacity: 0,
    });

    const ostrichTarget = { x: targetX - 70, y: targetY + 30 };

    tl.call(
      () => {
        window.dispatchEvent(
          new CustomEvent("ostrich:play", {
            detail: {
              target: ostrichTarget,
              variant: ev.variant,
              isFinal: ev.isFinal,
            },
          }),
        );
      },
      [],
      0,
    );

    const arriveAt = 0.7;
    tl.to(
      stampNode,
      {
        opacity: 1,
        scale: 0.6,
        duration: 0.18,
        ease: "power2.out",
      },
      arriveAt,
    );
    tl.to(
      stampNode,
      {
        x: targetX,
        y: targetY,
        scale: ev.isFinal ? 1.5 : 1.2,
        duration: 0.22,
        ease: "back.out(1.8)",
      },
      ">-0.05",
    );
    tl.to(
      stampNode,
      {
        scale: ev.isFinal ? 1.0 : 0.9,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          setConfettiAnchor({ x: targetX, y: targetY });
          setConfettiTick((t) => t + 1);
        },
      },
      ">-0.05",
    );

    tl.to(
      stampNode,
      {
        opacity: 0,
        duration: 0.18,
        ease: "power2.in",
      },
      ">-0.05",
    );

    if (ev.isFinal) {
      tl.call(() => window.dispatchEvent(new CustomEvent("passport:cascade")), [], ">-0.1");
    }

    const toastShowAt = arriveAt + 0.3;
    tl.call(
      () => setToast({ visible: true, title, subtitle, variant: ev.isFinal ? "final" : "normal" }),
      [],
      toastShowAt,
    );

    if (ev.isFinal) {
      tl.call(() => setToast((t) => ({ ...t, visible: false })), [], ">+3.4");
    }
  }, [current]);

  const value = useMemo<AchievementContextValue>(
    () => ({ play, registerPassportAnchor }),
    [play, registerPassportAnchor],
  );

  return (
    <AchievementContext.Provider value={value}>
      {children}
      <AchievementOstrich />
      <div
        ref={stampRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[58]"
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <AchievementStamp size={current?.isFinal ? 64 : 48} golden={current?.isFinal ?? false} />
      </div>
      <AchievementConfetti
        playKey={confettiTick}
        variant={current?.isFinal ? "global" : "focal"}
        anchor={confettiAnchor}
      />
      <AchievementToast
        show={toast.visible}
        title={toast.title}
        subtitle={toast.subtitle}
        variant={toast.variant}
      />
    </AchievementContext.Provider>
  );
}