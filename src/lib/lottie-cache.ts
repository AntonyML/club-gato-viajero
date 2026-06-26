"use client";

type LottieData = Record<string, unknown>;

const cache = new Map<string, Promise<LottieData>>();

export function loadLottie(url: string): Promise<LottieData> {
  const existing = cache.get(url);
  if (existing) return existing;

  const promise = fetch(url, { cache: "force-cache" })
    .then((res) => {
      if (!res.ok) throw new Error(`Lottie load failed: ${url}`);
      return res.json() as Promise<LottieData>;
    })
    .catch((err) => {
      cache.delete(url);
      throw err;
    });

  cache.set(url, promise);
  return promise;
}

export function clearLottieCache(): void {
  cache.clear();
}