"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    alt: "Playa Caribe con palmeras",
    label: "Playa Caleta Azul",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b689",
    alt: "Arena blanca y mar turquesa",
    label: "Playa Punta Coco",
  },
  {
    src: "https://images.unsplash.com/photo-1537956965359-7573183d7f1f",
    alt: "Cangrejo en la arena",
    label: "Playa Manzanillo Travieso",
  },
  {
    src: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6",
    alt: "Atardecer en el Caribe",
    label: "Playa Atardecer Dorado",
  },
  {
    src: "https://images.unsplash.com/photo-1540202404-a2f29016b523",
    alt: "Bahía escondida",
    label: "Playa Bahía Favorita",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    alt: "Aventura en la playa",
    label: "Tours con Melvin Ramón",
  },
];

export default function GallerySection() {
  const [heartAnim, setHeartAnim] = useState<Record<string, unknown> | null>(null);
  const heartLoaded = heartAnim !== null;

  useEffect(() => {
    fetch("/lottie/heart.json")
      .then((r) => r.json())
      .then((data) => setHeartAnim(data as Record<string, unknown>))
      .catch(() => {});
  }, []);

  return (
    <section id="galeria" className="relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          {heartLoaded ? (
            <div className="mx-auto mb-4 w-16 opacity-40">
              <Lottie animationData={heartAnim} loop autoplay aria-hidden={true} />
            </div>
          ) : null}
          <h2 className="font-display text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
            Galería del Viaje
          </h2>
          <p className="mt-2 font-body text-base text-[var(--color-text-secondary)]">
            Momentos capturados por Melvin Ramón en sus andanzas playeras.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-soft transition-all duration-500 hover:shadow-card"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={450}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--color-teal-deep)]/60 to-transparent p-4 pt-12">
                <span className="font-display text-sm font-semibold text-[var(--color-text-on-dark)]">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
