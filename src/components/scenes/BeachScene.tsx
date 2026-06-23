"use client";

import type { Beach, BeachId } from "@/data/beaches";

type Props = {
  beach: Beach;
  className?: string;
};

/**
 * Background scene: layered SVG illustration for a beach.
 * Layers (back to front): sky, clouds, mountains, palms, sea, shoreline, sand.
 * Each layer is a <g data-parallax="speed"> so ScrollTrigger can move them.
 */
export function BeachScene({ beach, className }: Props) {
  const { palette } = beach;
  const id = `scene-${beach.id}`;

  return (
    <svg
      className={className}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Escena ilustrada de ${beach.name}`}
    >
      <defs>
        <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.skyTop} />
          <stop offset="100%" stopColor={palette.skyBottom} />
        </linearGradient>
        <linearGradient id={`${id}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sea} />
          <stop offset="100%" stopColor={palette.seaDeep} />
        </linearGradient>
        <linearGradient id={`${id}-sand`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={palette.sand} />
          <stop offset="100%" stopColor={palette.sand} stopOpacity="0.7" />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#fff8d6" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#fde7a8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fde7a8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky */}
      <g data-parallax="0.02" data-layer="sky">
        <rect width="1600" height="600" fill={`url(#${id}-sky)`} />
      </g>

      {/* Sun (mood-dependent) */}
      <g data-parallax="0.05" data-layer="sun">
        <Sun mood={beach.mood} accent={palette.accent} id={id} />
      </g>

      {/* Clouds */}
      <g data-parallax="0.08" data-layer="clouds" className="drift-slow">
        <Clouds mood={beach.mood} />
      </g>

      {/* Distant mountains / hills */}
      <g data-parallax="0.12" data-layer="mountains">
        <Mountains />
      </g>

      {/* Far palms */}
      <g data-parallax="0.18" data-layer="palms-far">
        <FarPalms />
      </g>

      {/* Sea */}
      <g data-parallax="0.22" data-layer="sea">
        <rect y="520" width="1600" height="200" fill={`url(#${id}-sea)`} />
        <SeaSparkles />
      </g>

      {/* Sand strip */}
      <g data-parallax="0.28" data-layer="sand">
        <path
          d="M0,720 C300,690 600,740 900,710 C1200,680 1400,720 1600,700 L1600,900 L0,900 Z"
          fill={`url(#${id}-sand)`}
        />
        <Shoreline />
      </g>

      {/* Foreground palms */}
      <g data-parallax="0.4" data-layer="palms-near">
        <NearPalms beachId={beach.id} />
      </g>

      {/* Special props per beach */}
      <g data-parallax="0.45" data-layer="props">
        <BeachProps beachId={beach.id} />
      </g>
    </svg>
  );
}

function Sun({ mood, accent, id }: { mood: Beach["mood"]; accent: string; id: string }) {
  if (mood === "sunset") {
    return (
      <g>
        <circle cx="1180" cy="500" r="120" fill={`url(#${id}-sun)`} />
        <circle cx="1180" cy="500" r="60" fill="#fde0a0" opacity="0.9" />
        <circle cx="1180" cy="500" r="38" fill="#f7c08a" />
      </g>
    );
  }
  if (mood === "magic") {
    return (
      <g>
        <circle cx="320" cy="200" r="90" fill={`url(#${id}-sun)`} />
        <circle cx="320" cy="200" r="42" fill="#fff5d0" />
        <g opacity="0.7">
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4;
            const x1 = 320 + Math.cos(angle) * 55;
            const y1 = 200 + Math.sin(angle) * 55;
            const x2 = 320 + Math.cos(angle) * 78;
            const y2 = 200 + Math.sin(angle) * 78;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={accent}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.5"
              />
            );
          })}
        </g>
      </g>
    );
  }
  return (
    <g>
      <circle cx="1180" cy="220" r="70" fill={`url(#${id}-sun)`} />
      <circle cx="1180" cy="220" r="36" fill="#fff5d0" opacity="0.95" />
    </g>
  );
}

function Clouds({ mood }: { mood: Beach["mood"] }) {
  const tone = mood === "sunset" ? "#fbd6c2" : "#ffffff";
  return (
    <g opacity={mood === "sunset" ? 0.85 : 0.9}>
      <g className="drift">
        <ellipse cx="260" cy="180" rx="120" ry="22" fill={tone} />
        <ellipse cx="320" cy="170" rx="70" ry="18" fill={tone} />
        <ellipse cx="200" cy="200" rx="60" ry="14" fill={tone} />
      </g>
      <g className="drift" style={{ animationDelay: "-3s" }}>
        <ellipse cx="780" cy="120" rx="160" ry="20" fill={tone} />
        <ellipse cx="860" cy="110" rx="80" ry="16" fill={tone} />
      </g>
      <g className="drift" style={{ animationDelay: "-6s" }}>
        <ellipse cx="1340" cy="200" rx="110" ry="18" fill={tone} />
        <ellipse cx="1290" cy="215" rx="60" ry="12" fill={tone} />
      </g>
      <g opacity="0.6">
        <ellipse cx="600" cy="260" rx="90" ry="10" fill={tone} />
        <ellipse cx="1080" cy="280" rx="70" ry="9" fill={tone} />
      </g>
    </g>
  );
}

function Mountains() {
  return (
    <g opacity="0.55">
      <path
        d="M0,520 L160,420 L300,500 L460,380 L640,490 L820,400 L1000,500 L1180,420 L1360,490 L1600,440 L1600,560 L0,560 Z"
        fill="#a9c5b6"
      />
      <path
        d="M0,540 L180,470 L340,520 L500,460 L680,520 L860,470 L1040,520 L1220,470 L1400,520 L1600,490 L1600,580 L0,580 Z"
        fill="#8fb29e"
        opacity="0.7"
      />
    </g>
  );
}

function FarPalms() {
  return (
    <g opacity="0.85">
      <Palm x={120} y={520} scale={0.55} tone="#5b8c66" />
      <Palm x={380} y={530} scale={0.45} tone="#6fa67a" />
      <Palm x={1080} y={525} scale={0.5} tone="#5b8c66" />
      <Palm x={1450} y={520} scale={0.6} tone="#6fa67a" />
    </g>
  );
}

function NearPalms({ beachId }: { beachId: BeachId }) {
  return (
    <g>
      <Palm x={140} y={680} scale={1.05} tone="#4f7d59" />
      <Palm x={1480} y={660} scale={1.2} tone="#4f7d59" />
      {beachId === 2 && <Palm x={780} y={620} scale={0.95} tone="#4f7d59" />}
      {beachId === 3 && <Palm x={600} y={650} scale={0.85} tone="#4f7d59" />}
    </g>
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

function SeaSparkles() {
  return (
    <g opacity="0.6">
      {Array.from({ length: 24 }).map((_, i) => {
        const cx = (i * 67 + 40) % 1600;
        const cy = 560 + ((i * 31) % 130);
        return (
          <circle key={i} cx={cx} cy={cy} r={1.4 + (i % 3) * 0.6} fill="#fff8d6" />
        );
      })}
    </g>
  );
}

function Shoreline() {
  return (
    <g>
      <path
        d="M0,720 C300,690 600,740 900,710 C1200,680 1400,720 1600,700"
        stroke="#ffffff"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M0,740 C300,712 600,758 900,732 C1200,706 1400,742 1600,724"
        stroke="#ffffff"
        strokeWidth="2"
        fill="none"
        opacity="0.4"
      />
    </g>
  );
}

function BeachProps({ beachId }: { beachId: BeachId }) {
  if (beachId === 1) {
    return (
      <g>
        <Starfish x={420} y={780} />
        <Seashell x={1180} y={820} />
      </g>
    );
  }
  if (beachId === 2) {
    return (
      <g>
        <Coconut x={780} y={780} />
        <Coconut x={900} y={810} />
      </g>
    );
  }
  if (beachId === 3) {
    return (
      <g>
        <Crab x={520} y={830} />
        <Crab x={1080} y={860} />
      </g>
    );
  }
  if (beachId === 4) {
    return (
      <g>
        <Boat x={300} y={620} />
      </g>
    );
  }
  return (
    <g>
      <Lighthouse x={1320} y={680} />
      <Starfish x={420} y={830} />
      <Seashell x={900} y={860} />
    </g>
  );
}

function Starfish({ x, y }: { x: number; y: number }) {
  const points = 5;
  const outer = 22;
  const inner = 9;
  const path = Array.from({ length: points * 2 })
    .map((_, i) => {
      const r = i % 2 === 0 ? outer : inner;
      const angle = (Math.PI * i) / points - Math.PI / 2;
      const px = Math.cos(angle) * r;
      const py = Math.sin(angle) * r;
      return `${i === 0 ? "M" : "L"}${px},${py}`;
    })
    .join(" ") + " Z";
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={path} fill="#f3a48f" />
      <circle cx="0" cy="0" r="3" fill="#fff8ec" />
    </g>
  );
}

function Seashell({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0,0 C-18,-6 -22,-22 0,-28 C22,-22 18,-6 0,0 Z" fill="#fbe7c8" />
      <path d="M0,0 C-12,-4 -14,-16 0,-20 C14,-16 12,-4 0,0 Z" fill="#f7c8c8" opacity="0.7" />
    </g>
  );
}

function Coconut({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="14" ry="12" fill="#6b4a3a" />
      <ellipse cx="-3" cy="-3" rx="4" ry="3" fill="#8a6a52" opacity="0.6" />
    </g>
  );
}

function Crab({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="0" rx="18" ry="11" fill="#e8c98a" />
      <circle cx="-10" cy="-2" r="2" fill="#4a3a30" />
      <circle cx="10" cy="-2" r="2" fill="#4a3a30" />
      <path d="M-18,-4 L-26,-10" stroke="#e8c98a" strokeWidth="3" strokeLinecap="round" />
      <path d="M18,-4 L26,-10" stroke="#e8c98a" strokeWidth="3" strokeLinecap="round" />
      <path d="M-14,8 L-18,16" stroke="#e8c98a" strokeWidth="3" strokeLinecap="round" />
      <path d="M14,8 L18,16" stroke="#e8c98a" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Boat({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0,0 L120,0 L110,18 L10,18 Z" fill="#f7c8c8" />
      <rect x="58" y="-50" width="2" height="50" fill="#6b4a3a" />
      <path d="M60,-50 L60,-10 L100,-10 Z" fill="#fff8ec" />
    </g>
  );
}

function Lighthouse({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-12,0 L12,0 L8,-100 L-8,-100 Z" fill="#fff8ec" stroke="#e8c98a" strokeWidth="1.5" />
      <rect x="-14" y="-100" width="28" height="8" fill="#e8c98a" />
      <circle cx="0" cy="-108" r="6" fill="#f3a48f" />
      <path d="M-2,-108 L-30,-140" stroke="#fde0a0" strokeWidth="2" opacity="0.7" />
      <path d="M2,-108 L30,-140" stroke="#fde0a0" strokeWidth="2" opacity="0.7" />
    </g>
  );
}
