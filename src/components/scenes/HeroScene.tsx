"use client";

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Cielo del Caribe con nubes, mar y palmeras"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bfe0f0" />
          <stop offset="55%" stopColor="#d8ecf5" />
          <stop offset="100%" stopColor="#fbe7c8" />
        </linearGradient>
        <linearGradient id="hero-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ad6d0" />
          <stop offset="100%" stopColor="#5fb4c4" />
        </linearGradient>
        <radialGradient id="hero-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff8d6" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#fde7a8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fde7a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g data-parallax="0.0">
        <rect width="1600" height="900" fill="url(#hero-sky)" />
      </g>

      <g data-parallax="0.04">
        <circle cx="1180" cy="200" r="120" fill="url(#hero-sun)" />
        <circle cx="1180" cy="200" r="48" fill="#fff5d0" opacity="0.95" />
      </g>

      <g data-parallax="0.08" className="drift-slow">
        <g className="drift">
          <ellipse cx="260" cy="200" rx="140" ry="22" fill="#ffffff" />
          <ellipse cx="330" cy="190" rx="80" ry="18" fill="#ffffff" />
          <ellipse cx="200" cy="220" rx="60" ry="14" fill="#ffffff" />
        </g>
        <g className="drift" style={{ animationDelay: "-3s" }}>
          <ellipse cx="780" cy="140" rx="170" ry="22" fill="#ffffff" />
          <ellipse cx="860" cy="130" rx="80" ry="16" fill="#ffffff" />
        </g>
        <g className="drift" style={{ animationDelay: "-6s" }}>
          <ellipse cx="1340" cy="240" rx="120" ry="20" fill="#ffffff" />
        </g>
        <g opacity="0.6">
          <ellipse cx="600" cy="290" rx="100" ry="10" fill="#ffffff" />
          <ellipse cx="1080" cy="320" rx="80" ry="9" fill="#ffffff" />
        </g>
      </g>

      <g data-parallax="0.12" opacity="0.6">
        <path
          d="M0,560 L160,470 L300,540 L460,440 L640,540 L820,460 L1000,540 L1180,460 L1360,540 L1600,490 L1600,600 L0,600 Z"
          fill="#a9c5b6"
        />
      </g>

      <g data-parallax="0.18">
        <Palm x={120} y={560} scale={0.55} tone="#5b8c66" />
        <Palm x={380} y={570} scale={0.5} tone="#6fa67a" />
        <Palm x={1080} y={565} scale={0.55} tone="#5b8c66" />
        <Palm x={1450} y={560} scale={0.6} tone="#6fa67a" />
      </g>

      <g data-parallax="0.22">
        <rect y="560" width="1600" height="200" fill="url(#hero-sea)" />
        <g opacity="0.55">
          {Array.from({ length: 26 }).map((_, i) => {
            const cx = (i * 61 + 30) % 1600;
            const cy = 600 + ((i * 27) % 130);
            return <circle key={i} cx={cx} cy={cy} r={1.2 + (i % 3) * 0.5} fill="#fff8d6" />;
          })}
        </g>
      </g>

      <g data-parallax="0.3">
        <path
          d="M0,760 C300,730 600,790 900,750 C1200,720 1400,770 1600,740 L1600,900 L0,900 Z"
          fill="#fbf2dc"
        />
        <path
          d="M0,760 C300,730 600,790 900,750 C1200,720 1400,770 1600,740"
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          opacity="0.6"
        />
      </g>

      <g data-parallax="0.4">
        <Palm x={140} y={740} scale={1.1} tone="#4f7d59" />
        <Palm x={1480} y={720} scale={1.25} tone="#4f7d59" />
      </g>
    </svg>
  );
}

function Palm({ x, y, scale, tone }: { x: number; y: number; scale: number; tone: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <path
        d="M0,0 C-6,-80 -4,-160 4,-220 L14,-220 C18,-160 16,-80 8,0 Z"
        fill="#6b4a3a"
      />
      <g transform="translate(4 -220)">
        {[
          { rot: -100, len: 130, droop: 20 },
          { rot: -55, len: 150, droop: 10 },
          { rot: -15, len: 145, droop: 18 },
          { rot: 30, len: 140, droop: 8 },
          { rot: 70, len: 150, droop: 22 },
          { rot: 115, len: 130, droop: 14 },
          { rot: 160, len: 135, droop: 16 },
        ].map((leaf, i) => (
          <g key={i} transform={`rotate(${leaf.rot})`}>
            <path
              d={`M0,0 Q${leaf.len / 2},${-leaf.droop} ${leaf.len},${leaf.droop * 1.2}`}
              stroke={tone}
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d={`M0,0 Q${leaf.len / 2},${-leaf.droop} ${leaf.len},${leaf.droop * 1.2}`}
              stroke="#4f7d59"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
          </g>
        ))}
      </g>
    </g>
  );
}
