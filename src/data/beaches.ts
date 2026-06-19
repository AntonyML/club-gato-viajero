export type BeachId = 1 | 2 | 3 | 4 | 5;

export type Beach = {
  id: BeachId;
  name: string;
  title: string;
  vibe: "asombro" | "diversion" | "humor" | "calma" | "recompensa";
  /** Short, postcard-style one-liner shown on the card */
  postcard: string;
  /** Stitch's two-line thought at this beach */
  stitchSays: [string, string];
  /** A small detail / "fun fact" line */
  detail: string;
  /** Time-of-day palette tag (drives subtle scene tint) */
  mood: "morning" | "noon" | "afternoon" | "sunset" | "magic";
  /** Accent colors used in the scene layers for this beach */
  palette: {
    skyTop: string;
    skyBottom: string;
    sea: string;
    seaDeep: string;
    sand: string;
    accent: string;
  };
};

export const BEACHES: Beach[] = [
  {
    id: 1,
    name: "Playa Caleta Azul",
    title: "El primer descubrimiento",
    vibe: "asombro",
    postcard: "Donde el mar se vuelve cristal.",
    stitchSays: [
      "Podría quedarme aquí todo el día.",
      "Prometo que esta es la última foto… quizás.",
    ],
    detail: "Arenas blancas, agua turquesa y un silencio que se siente como un secreto.",
    mood: "morning",
    palette: {
      skyTop: "#bfe0f0",
      skyBottom: "#fbe7c8",
      sea: "#9ad6d0",
      seaDeep: "#5fb4c4",
      sand: "#fbf2dc",
      accent: "#e8c98a",
    },
  },
  {
    id: 2,
    name: "Playa Punta Coco",
    title: "El coco perdido",
    vibe: "diversion",
    postcard: "Una cocada con vista al mar.",
    stitchSays: [
      "Creo que ese coco es mío.",
      "Vale, necesito una siesta urgente.",
    ],
    detail: "Una palmera generosa, sombra fresca y cocos rodando con la brisa.",
    mood: "noon",
    palette: {
      skyTop: "#a4d7ee",
      skyBottom: "#d8ecf5",
      sea: "#7ec6c2",
      seaDeep: "#3e98a8",
      sand: "#f6e2b3",
      accent: "#f3a48f",
    },
  },
  {
    id: 3,
    name: "Playa Manzanillo Travieso",
    title: "Los cangrejos traviesos",
    vibe: "humor",
    postcard: "Pequeños arquitectos de arena.",
    stitchSays: [
      "¡Eh, esperen, no se vayan!",
      "Por qué los cangrejos siempre ganan.",
    ],
    detail: "Cangrejos rápidos como relámpagos y castillos de arena que nunca sobreviven.",
    mood: "afternoon",
    palette: {
      skyTop: "#bcdff0",
      skyBottom: "#f7c8c8",
      sea: "#8fd0c8",
      seaDeep: "#4ea2b2",
      sand: "#fbe5be",
      accent: "#e8c98a",
    },
  },
  {
    id: 4,
    name: "Playa Atardecer Dorado",
    title: "El gran atardecer",
    vibe: "calma",
    postcard: "El cielo se pinta lento.",
    stitchSays: [
      "Creo que encontré mi lugar favorito.",
      "Un momento más… por favor.",
    ],
    detail: "Naranjas, rosas y el sonido suave del agua al retroceder.",
    mood: "sunset",
    palette: {
      skyTop: "#f7c8c8",
      skyBottom: "#f3a48f",
      sea: "#e8a78a",
      seaDeep: "#b86f5a",
      sand: "#f3d6a8",
      accent: "#e8c98a",
    },
  },
  {
    id: 5,
    name: "Playa Bahía Favorita",
    title: "La favorita de Stitch",
    vibe: "recompensa",
    postcard: "Donde Stitch decide quedarse un ratito más.",
    stitchSays: [
      "No le digas a nadie, pero… ya es mi casa.",
      "Mañana partimos. Hoy no.",
    ],
    detail: "La playa más bonita del Caribe costarricense, según Stitch.",
    mood: "magic",
    palette: {
      skyTop: "#cfe6f5",
      skyBottom: "#fbe7c8",
      sea: "#a9e0d4",
      seaDeep: "#5fb4c4",
      sand: "#fffdf6",
      accent: "#f3a48f",
    },
  },
];

export const TOTAL_BEACHES = BEACHES.length;
