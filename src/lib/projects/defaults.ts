import type { Backing, ButtonColors, CmsImage, Overlay, Palette, Project } from "./types";

/** Paleta base de un proyecto nuevo (la de Killa); se cambia en el admin. */
export const DEFAULT_PALETTE: Palette = {
  background: "#f1f1ea",
  foreground: "#26161f",
  accent: "#26161f",
  accentHover: "#43303b",
  accentSoft: "#c1a9b7",
  earth: "#6f5d66",
  stone: "#e7e4da",
  ink: "#26161f",
};

export function newItemId() {
  return crypto.randomUUID().slice(0, 8);
}

export function emptyImage(): CmsImage {
  return { url: "", path: "", width: 0, height: 0, alt: "" };
}

const overlay = (top: number, middle: number, bottom: number): Overlay => ({
  color: "$ink",
  top,
  middle,
  bottom,
});

const solidButton: ButtonColors = {
  bg: "$foreground",
  fg: "$background",
  hoverBg: "$accentHover",
  hoverFg: "$background",
};

/** Borde claro sobre fondo oscuro; `bg` es el color del borde. */
const outlineLight: ButtonColors = {
  bg: "$background",
  fg: "$background",
  hoverBg: "$background",
  hoverFg: "$foreground",
};

const light = { fg: "$foreground", accent: "$earth" };

/** Proyecto nuevo: textos genéricos de Vercorp, colores tomados de la paleta, sin imágenes. */
export function newProject(
  fields: Pick<Project, "slug" | "name" | "place" | "tagline" | "status">,
  order: number,
): Project {
  const items = (texts: string[]) => texts.map((text) => ({ id: newItemId(), text }));

  return {
    ...fields,
    order,
    published: false,
    summary: "",
    highlights: [],
    ogImage: null,
    logo: null,
    mark: null,
    font: "zalando",
    palette: { ...DEFAULT_PALETTE },
    pricing: { areaFrom: 200, pricePerM2: 0, downPaymentPercent: 10, installments: 12 },
    lots: [],
    header: {
      ctaLabel: "Agendar visita",
      style: {
        solidBg: "$background",
        solidFg: "$foreground",
        clearFg: "$background",
        menuBg: "$ink",
        menuFg: "$background",
        ctaSolid: solidButton,
        ctaClear: { bg: "$background", fg: "$foreground", hoverBg: "$accentSoft", hoverFg: "$foreground" },
      },
    },
    hero: {
      image: emptyImage(),
      byline: "Un proyecto de",
      primaryLabel: "Agendar visita",
      secondaryLabel: "Quiero comprar",
      style: {
        bg: "$ink",
        fg: "$background",
        accent: "$accentSoft",
        overlay: overlay(60, 25, 85),
        primary: { bg: "$background", fg: "$foreground", hoverBg: "$accentSoft", hoverFg: "$foreground" },
        secondary: outlineLight,
      },
    },
    intro: {
      visible: true,
      navLabel: "El proyecto",
      eyebrow: "El proyecto",
      title: fields.name,
      paragraphs: [],
      note: "",
      areaLabel: "Desde, por espacio. Amplíalo a tu medida",
      availableLabel: "Disponibles de {total} espacios",
      facts: [],
      disclaimer:
        "Áreas y linderos referenciales según levantamiento topográfico, sujetos a verificación notarial y registral.",
      image: emptyImage(),
      style: { bg: "$background", ...light, overlay: overlay(0, 0, 55), photoLogo: "$background" },
    },
    location: {
      visible: true,
      navLabel: "Ubicación",
      eyebrow: "Ubicación",
      title: "",
      place: "",
      description: "",
      distances: [],
      motto: "",
      image: emptyImage(),
      style: { bg: "$stone", ...light, overlay: overlay(0, 0, 55), photoLogo: "$background" },
    },
    benefits: {
      visible: true,
      eyebrow: "Excelente oportunidad",
      title: "Beneficios de tu nueva inversión",
      items: [],
      activities: { visible: true, title: "Actividades de la zona", items: [] },
      style: { bg: "$background", ...light },
    },
    growth: {
      visible: true,
      navLabel: "Inversión",
      eyebrow: "Rentabilidad",
      title: "Múltiples formas de hacer crecer tu inversión",
      description: "Un espacio, distintas posibilidades de desarrollo y uso.",
      items: [],
      style: { bg: "$stone", ...light, overlay: overlay(55, 10, 85), cardFg: "$background" },
    },
    lotPlan: {
      visible: true,
      navLabel: "Plano",
      eyebrow: "Plano de lotización",
      title: "{total} espacios, cada uno con su propia vista",
      description: "",
      featuresTitle: "Cada espacio cuenta con",
      features: items([
        "Área y perímetro individual certificados",
        "Deslinde topográfico preciso (coordenadas y linderos)",
        "Acceso directo a la vía interna del condominio",
      ]),
      image: emptyImage(),
      buttonLabel: "Elegir mi espacio",
      style: {
        bg: "$background",
        ...light,
        planBg: "#ffffff",
        planLogo: "$foreground",
        dot: "$accentSoft",
        button: solidButton,
      },
    },
    purchase: {
      visible: true,
      navLabel: "Compra",
      eyebrow: "Proceso de compra",
      title: "Tres pasos, del interés a la escritura pública",
      steps: [
        {
          id: newItemId(),
          title: "Agenda tu cita",
          description: "Selecciona los m² que más te gusten según tus necesidades y presupuesto.",
        },
        {
          id: newItemId(),
          title: "Separa tu espacio",
          description: "Con una primera inicial del 10% del valor del predio.",
        },
        {
          id: newItemId(),
          title: "Proceso jurídico",
          description: "Firma contractual e inscripción de escritura pública.",
        },
      ],
      buttonLabel: "Quiero comprar",
      style: { bg: "$stone", ...light, cardBg: "$background", button: solidButton },
    },
    backing: {
      visible: true,
      icon: "mark",
      customIcon: null,
      style: { bg: "$ink", fg: "$background", accent: "$accentSoft", button: outlineLight },
    },
    contact: {
      visible: true,
      heading: "Conversemos",
      blurb: `Agenda tu cita y sé parte de ${fields.name}.`,
      image: emptyImage(),
      visit: {
        tab: "Agendar visita",
        title: "Agenda tu cita",
        description:
          "Elige el día que prefieras y un asesor te confirmará el horario para recorrer el terreno contigo.",
        submit: "Agendar",
        success: "¡Nos vemos en el terreno!",
      },
      buy: {
        tab: "Quiero comprar",
        title: "Separa tu espacio",
        description:
          "Cuéntanos qué espacio te interesa. Te confirmamos disponibilidad, precio y los pasos para hacerlo tuyo.",
        submit: "Quiero este espacio",
        success: "¡Espacio en camino!",
      },
      style: {
        bg: "$background",
        fg: "$foreground",
        accent: "$accent",
        overlay: overlay(25, 35, 90),
        photoFg: "$background",
        tabsBg: "$stone",
        tabActive: { bg: "$foreground", fg: "$background", hoverBg: "$foreground", hoverFg: "$background" },
        button: { bg: "$accent", fg: "#ffffff", hoverBg: "$accentHover", hoverFg: "#ffffff" },
      },
    },
    footer: { style: { bg: "$ink", fg: "$background" } },
    whatsapp: {
      message: `Hola, quiero información sobre ${fields.name}, en ${fields.place}.`,
      style: { bg: "$ink", fg: "#ffffff", hoverBg: "$accentSoft", hoverFg: "$foreground" },
    },
  };
}

export const DEFAULT_BACKING: Backing = {
  eyebrow: "Respaldo del holding",
  title: "Un proyecto de Vercorp Desarrolladora",
  about: "",
  pillars: [],
  buttonLabel: "Ver todos sus proyectos",
};
