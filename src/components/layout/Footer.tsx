export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-dark)] py-12 text-center">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <svg
          viewBox="0 0 40 40"
          className="mx-auto mb-3 h-10 w-10 opacity-60"
          aria-hidden="true"
        >
          <circle cx="20" cy="24" r="14" fill="var(--color-blush)" />
          <path d="M10 10 L15 20 L5 20 Z" fill="var(--color-teal-light)" />
          <path d="M30 10 L25 20 L35 20 Z" fill="var(--color-teal-light)" />
          <ellipse cx="15" cy="22" rx="1.6" ry="2" fill="var(--color-text-on-dark)" />
          <ellipse cx="25" cy="22" rx="1.6" ry="2" fill="var(--color-text-on-dark)" />
          <ellipse cx="20" cy="27" rx="1.5" ry="1.2" fill="var(--color-blush)" />
        </svg>

        <p className="font-display text-lg text-[var(--color-text-on-dark)]/70">
          Cinco sellos. Cinco recuerdos. Una sola maleta.
        </p>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[var(--color-text-on-dark)]/50">
          <a href="#inicio" className="transition-colors hover:text-[var(--color-blush)]">
            Inicio
          </a>
          <a href="#playas" className="transition-colors hover:text-[var(--color-blush)]">
            Playas
          </a>
          <a href="#galeria" className="transition-colors hover:text-[var(--color-blush)]">
            Galería
          </a>
          <a href="#reservas" className="transition-colors hover:text-[var(--color-blush)]">
            Reservas
          </a>
        </div>

        <p className="mt-6 font-body text-sm text-[var(--color-sand)]">
          &copy; {new Date().getFullYear()} El Club del Gato Viajero &mdash; Melvin Ram&oacute;n.
          Hecho con sue&ntilde;os caribe&ntilde;os.
        </p>
      </div>
    </footer>
  );
}
