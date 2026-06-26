"use client";

import { useState } from "react";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { Hero } from "@/components/chapters/Hero";
import { BeachChapter } from "@/components/chapters/BeachChapter";
import { Outro } from "@/components/chapters/Outro";
import SwingTransition from "@/components/chapters/SwingTransition";
import GallerySection from "@/components/layout/GallerySection";
import ContactSection from "@/components/layout/ContactSection";
import { Passport } from "@/components/passport/Passport";
import { TravelProgressBar } from "@/components/progress/TravelProgressBar";
import { AchievementManager } from "@/components/achievements/AchievementManager";
import { BEACHES, TOTAL_BEACHES } from "@/data/beaches";

function Journey() {
  const [unlocked, setUnlocked] = useState(0);

  return (
    <div className="relative">
      <Passport unlocked={unlocked} />
      <TravelProgressBar />

      <section id="inicio">
        <Hero />
      </section>

      <section id="playas">
        {BEACHES.map((beach, i) => (
          <span key={beach.id}>
            <BeachChapter
              beach={beach}
              onUnlock={() => setUnlocked((u) => Math.min(TOTAL_BEACHES, u + 1))}
            />
            {i < TOTAL_BEACHES - 1 && (
              <SwingTransition
                fromBeach={beach}
                toBeach={BEACHES[i + 1]}
                index={i}
              />
            )}
          </span>
        ))}
      </section>

      <GallerySection />

      <ContactSection />

      <Outro />
    </div>
  );
}

export default function Page() {
  return (
    <ScrollProvider>
      <AchievementManager>
        <Journey />
      </AchievementManager>
    </ScrollProvider>
  );
}
