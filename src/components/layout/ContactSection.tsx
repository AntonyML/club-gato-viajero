"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const BEACH_OPTIONS = [
  "Playa Caleta Azul",
  "Playa Punta Coco",
  "Playa Manzanillo Travieso",
  "Playa Atardecer Dorado",
  "Playa Bahía Favorita",
  "Tour completo (5 playas)",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [doneAnim, setDoneAnim] = useState<Record<string, unknown> | null>(null);
  const doneLoaded = doneAnim !== null;

  useEffect(() => {
    fetch("/lottie/done.json")
      .then((r) => r.json())
      .then((data) => setDoneAnim(data as Record<string, unknown>))
      .catch(() => {});
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  return (
    <section id="reservas" className="relative py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Reserva tu Tour
          </h2>
          <p className="mt-2 font-body text-sm text-ink/50">
            Melvin Ramón te espera en el Caribe. Déjanos tus datos y te contactamos.
          </p>
        </div>

        {submitted && doneLoaded ? (
          <div className="story-card flex flex-col items-center py-16 text-center">
            <div className="mb-6 h-24 w-24">
              <Lottie animationData={doneAnim} loop={false} autoplay />
            </div>
            <h3 className="font-display text-2xl font-semibold text-cocoa">
              ¡Gracias por tu reserva!
            </h3>
            <p className="mt-2 font-body text-sm text-cocoa/60">
              Melvin Ramón ya está alistando su mochila. Te escribiremos pronto.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="story-card space-y-5 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-1 block font-body text-sm font-semibold text-cocoa">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-xl border border-gold-soft/40 bg-cream px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral-tropical focus:ring-2 focus:ring-coral-tropical/20"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block font-body text-sm font-semibold text-cocoa">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-xl border border-gold-soft/40 bg-cream px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral-tropical focus:ring-2 focus:ring-coral-tropical/20"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block font-body text-sm font-semibold text-cocoa">
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-xl border border-gold-soft/40 bg-cream px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral-tropical focus:ring-2 focus:ring-coral-tropical/20"
                placeholder="+506 8888 8888"
              />
            </div>

            <div>
              <label htmlFor="beach" className="mb-1 block font-body text-sm font-semibold text-cocoa">
                Tour de interés
              </label>
              <select
                id="beach"
                required
                className="w-full rounded-xl border border-gold-soft/40 bg-cream px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral-tropical focus:ring-2 focus:ring-coral-tropical/20"
              >
                <option value="">Selecciona un tour</option>
                {BEACH_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block font-body text-sm font-semibold text-cocoa">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full rounded-xl border border-gold-soft/40 bg-cream px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-coral-tropical focus:ring-2 focus:ring-coral-tropical/20"
                placeholder="¿Alguna pregunta o preferencia?"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-coral-tropical px-6 py-3 font-display text-base font-bold text-cream transition-all duration-200 hover:bg-coral-tropical/80 hover:shadow-md active:scale-[0.97]"
            >
              Enviar Reserva
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
