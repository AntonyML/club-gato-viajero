"use client";

import { useState } from "react";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { Hero } from "@/components/chapters/Hero";
import { BeachChapter } from "@/components/chapters/BeachChapter";
import { Outro } from "@/components/chapters/Outro";
import { Passport } from "@/components/passport/Passport";
import { TravelProgressBar } from "@/components/progress/TravelProgressBar";
import { BEACHES, TOTAL_BEACHES } from "@/data/beaches";

function Journey() {
  const [unlocked, setUnlocked] = useState(0);

  return (
    <main className="relative">
      <Passport unlocked={unlocked} />
      <TravelProgressBar />

      <Hero />

      {BEACHES.map((beach) => (
        <BeachChapter
          key={beach.id}
          beach={beach}
          onUnlock={() => setUnlocked((u) => Math.min(TOTAL_BEACHES, u + 1))}
        />
      ))}

      <Outro />
    </main>
  );
}

export default function Page() {
  return (
    <ScrollProvider>
      <Journey />
    </ScrollProvider>
  );
}
