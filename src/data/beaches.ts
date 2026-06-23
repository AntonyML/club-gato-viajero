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
    name: "Punta Uva",
    title: "La joya escondida",
    vibe: "asombro",
    postcard: "Donde la selva besa el mar.",
    stitchSays: [
      "Esta playa es un sueño… ¿puedo quedarme?",
      "Prometo que esta es la última foto… quizás.",
    ],
    detail: "Arena blanca, aguas turquesa y un arrecife de coral que la convierte en la playa más fotografiada del Caribe costarricense.",
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
    name: "Manzanillo",
    title: "El refugio natural",
    vibe: "diversion",
    postcard: "Donde el bosque llega hasta la orilla.",
    stitchSays: [
      "¡Un refugio de vida silvestre!",
      "Vale, necesito una siesta urgente.",
    ],
    detail: "Un paraíso escondido dentro del Refugio Nacional Gandoca-Manzanillo, donde el río se encuentra con el mar.",
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
    name: "Cahuita",
    title: "El tesoro nacional",
    vibe: "calma",
    postcard: "Arena blanca y perezosos en los árboles.",
    stitchSays: [
      "Creo que encontré mi lugar favorito.",
      "Un momento más… por favor.",
    ],
    detail: "El Parque Nacional Cahuita protege la playa más hermosa del Caribe, con arrecifes de coral y fauna que llega hasta la orilla.",
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
    name: "Cocles",
    title: "El alma surfista",
    vibe: "humor",
    postcard: "Donde las olas cuentan historias.",
    stitchSays: [
      "¡Esas olas son enormes!",
      "Por qué los surfistas siempre ganan.",
    ],
    detail: "La playa favorita de surfistas en Puerto Viejo, con palmeras inclinadas por el viento y un ambiente Caribeño único.",
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
    name: "Playa Negra",
    title: "La mística del Caribe",
    vibe: "recompensa",
    postcard: "Arena oscura, magia pura.",
    stitchSays: [
      "No le digas a nadie, pero… ya es mi casa.",
      "Mañana partimos. Hoy no.",
    ],
    detail: "Su arena volcánica negra contrasta con el azul intenso del mar, creando uno de los espectáculos naturales más únicos de Costa Rica.",
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
