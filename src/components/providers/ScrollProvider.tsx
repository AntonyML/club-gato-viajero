"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

type ScrollStore = {
  getProgress: () => number;
  subscribe: (cb: () => void) => () => void;
};

type ScrollContextValue = {
  lenis: Lenis | null;
  store: ScrollStore | null;
};

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  store: null,
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

export function useScrollProgress(): number {
  const { store } = useScrollContext();
  return useSyncExternalStore(
    store?.subscribe ?? (() => () => {}),
    store?.getProgress ?? (() => 0),
    () => 0,
  );
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState<ScrollContextValue>({ lenis: null, store: null });
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = prefersReducedMotion();
    const lenis = new Lenis({
      duration: reduced ? 0 : 1.2,
      smoothWheel: !reduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const gsap = getGsap();
    if (gsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // External store for scroll progress
    const listeners = new Set<() => void>();
    const compute = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return 0;
      return Math.min(1, Math.max(0, window.scrollY / max));
    };
    let lastEmitted = -1;
    const emit = () => {
      const next = compute();
      if (Math.abs(next - lastEmitted) < 0.0005) return;
      lastEmitted = next;
      listeners.forEach((cb) => cb());
    };
    const store: ScrollStore = {
      getProgress: () => lastEmitted < 0 ? compute() : lastEmitted,
      subscribe: (cb) => {
        listeners.add(cb);
        return () => listeners.delete(cb);
      },
    };
    lenis.on("scroll", emit);
    // Force first emission so SSR hydrates at 0
    lastEmitted = compute();
    // Expose the instance for cross-component imperative access (e.g. CTA scroll)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    // Publish store asynchronously to avoid cascading renders in the effect body
    const publishId = window.setTimeout(() => {
      setValue({ lenis, store });
    }, 0);

    const refreshId = window.setTimeout(() => ScrollTrigger?.refresh(), 250);

    return () => {
      window.clearTimeout(refreshId);
      window.clearTimeout(publishId);
      listeners.clear();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
