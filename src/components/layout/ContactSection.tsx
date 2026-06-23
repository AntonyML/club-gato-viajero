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
          <h2 className="font-display text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
            Reserva tu Tour
          </h2>
          <p className="mt-2 font-body text-sm text-[var(--color-text-secondary)]">
            Melvin Ramón te espera en el Caribe. Déjanos tus datos y te contactamos.
          </p>
        </div>

        {submitted && doneLoaded ? (
          <div className="story-card flex flex-col items-center py-16 text-center">
            <div className="mb-6 h-24 w-24 pointer-events-none">
              <Lottie animationData={doneAnim} loop={false} autoplay aria-hidden={true} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[var(--color-text-primary)]">
              ¡Gracias por tu reserva!
            </h3>
            <p className="mt-2 font-body text-sm text-[var(--color-text-secondary)]">
              Melvin Ramón ya está alistando su mochila. Te escribiremos pronto.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="story-card space-y-5 p-6 sm:p-8"
          >
            <div>
              <label htmlFor="name" className="mb-1 block font-body text-sm font-semibold text-[var(--color-text-primary)]">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-2.5 font-body text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-teal-mid)] focus:ring-2 focus:ring-[var(--color-teal-mid)]/20"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block font-body text-sm font-semibold text-[var(--color-text-primary)]">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-2.5 font-body text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-teal-mid)] focus:ring-2 focus:ring-[var(--color-teal-mid)]/20"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block font-body text-sm font-semibold text-[var(--color-text-primary)]">
                Teléfono
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-2.5 font-body text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-teal-mid)] focus:ring-2 focus:ring-[var(--color-teal-mid)]/20"
                placeholder="+506 8888 8888"
              />
            </div>

            <div>
              <label htmlFor="beach" className="mb-1 block font-body text-sm font-semibold text-[var(--color-text-primary)]">
                Tour de interés
              </label>
              <select
                id="beach"
                required
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-2.5 font-body text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-teal-mid)] focus:ring-2 focus:ring-[var(--color-teal-mid)]/20"
              >
                <option value="">Selecciona un tour</option>
                {BEACH_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block font-body text-sm font-semibold text-[var(--color-text-primary)]">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={3}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] px-4 py-2.5 font-body text-sm text-[var(--color-text-primary)] outline-none transition-colors focus:border-[var(--color-teal-mid)] focus:ring-2 focus:ring-[var(--color-teal-mid)]/20"
                placeholder="¿Alguna pregunta o preferencia?"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[var(--color-teal-mid)] px-6 py-3 font-display text-base font-bold text-[var(--color-text-on-dark)] transition-all duration-200 hover:bg-[var(--color-accent-hover)] hover:shadow-md active:scale-[0.97]"
            >
              Enviar Reserva
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
