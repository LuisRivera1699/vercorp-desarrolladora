export type LandIconId =
  | "water"
  | "road"
  | "title"
  | "location"
  | "calendar"
  | "legal"
  | "security"
  | "trend"
  | "view"
  | "activity";

export type ProjectStatus = "preventa" | "en-venta" | "ultimos-espacios";

export type SoldProject = {
  slug: string;
  name: string;
  district: string;
  totalLots: number;
  areaM2: number;
  image: string;
  imageAlt: string;
};

export type Photo = { src: string; alt: string };

type PhotoCard = { title: string; image: Photo };

export type ActiveProject = {
  slug: string;
  name: string;
  /** Clase que aplica la identidad visual propia del proyecto en su landing. */
  theme: "theme-killa";
  status: ProjectStatus;
  place: string;
  tagline: string;
  subtitle: string;
  summary: string;
  heroImage: string;
  imageAlt: string;
  ogImage: string;
  area: { from: number };
  pricing: {
    pricePerM2: number;
    downPaymentPercent: number;
    installments: number;
  };
  highlights: { value: string; label: string }[];
  lots: { areas: number[]; sold: number[] };
  intro: {
    title: string;
    paragraphs: string[];
    note: string;
    image: Photo;
  };
  facts: { value: string; label: string }[];
  disclaimer: string;
  location: {
    title: string;
    place: string;
    description: string;
    distances: { value: string; label: string }[];
    motto: string;
    image: Photo;
  };
  benefits: PhotoCard[];
  activities: PhotoCard[];
  growth: {
    title: string;
    description: string;
    items: (PhotoCard & { description: string })[];
  };
  lotPlan: {
    image: string;
    width: number;
    height: number;
    alt: string;
    description: string;
    features: string[];
  };
  purchaseSteps: { title: string; description: string }[];
  backing: {
    title: string;
    about: string;
    pillars: { title: string; description: string }[];
  };
  contact: { blurb: string; image: Photo };
};

const LAST_SPACES_RATIO = 0.8;

export function getAvailability(project: ActiveProject) {
  const sold = new Set(project.lots.sold);
  const spaces = project.lots.areas.map((area, index) => ({
    number: index + 1,
    area,
    sold: sold.has(index + 1),
  }));
  const total = spaces.length;
  const soldCount = spaces.filter((space) => space.sold).length;
  return {
    total,
    sold: soldCount,
    available: total - soldCount,
    soldRatio: total > 0 ? soldCount / total : 0,
    availableSpaces: spaces.filter((space) => !space.sold),
  };
}

export function getProjectStatus(project: ActiveProject): ProjectStatus {
  return getAvailability(project).soldRatio >= LAST_SPACES_RATIO
    ? "ultimos-espacios"
    : project.status;
}

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function getFinancing(project: ActiveProject) {
  const { pricePerM2, downPaymentPercent, installments } = project.pricing;
  const area = project.area.from;
  const total = area * pricePerM2;
  const downPayment = Math.ceil((total * downPaymentPercent) / 100);
  // Redondeo hacia arriba: el "desde" publicado nunca puede quedar por debajo de la cuota real.
  const monthly = Math.ceil((total - downPayment) / installments);
  return {
    area,
    pricePerM2,
    downPaymentPercent,
    installments,
    total,
    downPayment,
    monthly,
  };
}

export function financingExample(
  financing: ReturnType<typeof getFinancing>,
) {
  return `Ejemplo: espacio de ${financing.area} m² a ${formatUsd(financing.pricePerM2)}/m² (${formatUsd(financing.total)}). Inicial de ${formatUsd(financing.downPayment)} y ${financing.installments} cuotas de ${formatUsd(financing.monthly)}, sin intereses.`;
}

export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  preventa: "Preventa",
  "en-venta": "En venta",
  "ultimos-espacios": "Últimos espacios",
};

const KILLA_LOT_AREAS = [
  261, 224, 200, 200, 200, 200, 200, 200, 200, 250, 348, 400, 400, 400, 400,
  400, 397, 401, 200, 200, 235, 210, 200, 200, 200, 200, 291, 210, 210,
];

export const ACTIVE_PROJECTS: ActiveProject[] = [
  {
    slug: "killa",
    name: "Killa",
    theme: "theme-killa",
    status: "en-venta",
    place: "Huaypo, Cuzco",
    tagline: "Condominio en el Valle Sagrado",
    subtitle: "Espacios con vista a la laguna de Huaypo",
    summary:
      "Un condominio privado de 29 espacios en Huaypo, junto a la laguna y a 30 minutos de Cuzco. Para tu casa de campo, un lodge o una inversión que crece con el Valle Sagrado.",
    heroImage: "/projects/killa/ingreso.jpg",
    imageAlt:
      "Ingreso del condominio Killa al atardecer, con casas de campo y la laguna de Huaypo al fondo",
    ogImage: "/projects/killa/og.jpg",
    area: { from: 200 },
    pricing: { pricePerM2: 60, downPaymentPercent: 10, installments: 12 },
    highlights: [{ value: "30 min", label: "De Cuzco" }],
    // Provisional: números de espacio vendidos de ejemplo, hasta tener los reales.
    lots: { areas: KILLA_LOT_AREAS, sold: [3, 7] },
    intro: {
      title: "Condominio Killa",
      paragraphs: [
        "Killa es un condominio privado ubicado en Huaypo, Valle Sagrado, diseñado para quienes buscan naturaleza, tranquilidad y una conexión privilegiada con el paisaje.",
        "Su principal diferencial es la cercanía a la laguna de Huaypo, con espacios rodeados de montañas, cielo abierto y vistas únicas.",
        "Cada propietario podrá desarrollar una casa de campo pensada para aprovechar al máximo las visuales, la orientación y las características de su espacio, acompañado por nuestro equipo.",
      ],
      note: "Un condominio privado frente al paisaje de Huaypo.",
      image: {
        src: "/projects/killa/casa-hamaca.jpg",
        alt: "Casa de campo con hamaca en la terraza, frente a las montañas y la laguna al atardecer",
      },
    },
    facts: [
      { value: "≈ 0.76 ha", label: "Área total del condominio" },
      { value: "1", label: "Vía de acceso interna" },
    ],
    disclaimer:
      "Áreas y linderos referenciales según levantamiento topográfico, sujetos a verificación notarial y registral.",
    location: {
      title: "En el corazón del Valle Sagrado, junto a la laguna de Huaypo",
      place: "Huaypo",
      description:
        "Un entorno natural estratégico entre Cuzco, Chinchero y el Valle Sagrado, reconocido por su amplitud, tranquilidad y cercanía a la laguna de Huaypo.",
      distances: [
        { value: "30 min", label: "De la ciudad del Cuzco" },
        {
          value: "10 min",
          label: "Del nuevo aeropuerto internacional de Chinchero",
        },
      ],
      motto:
        "Naturaleza · Privacidad · Vistas a la laguna · Conexión con el Valle Sagrado",
      image: {
        src: "/projects/killa/casa-valle.jpg",
        alt: "Casa de campo con terraza y hamaca frente a una montaña del Valle Sagrado",
      },
    },
    benefits: [
      {
        title: "Vista al valle más turístico del Perú",
        image: {
          src: "/projects/killa/vista-valle.jpg",
          alt: "Terraza con vista al Valle Sagrado y la laguna al atardecer",
        },
      },
      {
        title: "Cercanía al nuevo aeropuerto internacional de Chinchero",
        image: {
          src: "/projects/killa/aeropuerto.jpg",
          alt: "Valle de Chinchero al atardecer con la pista del nuevo aeropuerto al fondo",
        },
      },
      {
        title: "Plusvalía de inversión de 10% a 15%",
        image: {
          src: "/projects/killa/casa-lago.jpg",
          alt: "Casas de campo iluminadas frente a la laguna de Huaypo",
        },
      },
      {
        title: "A 30 minutos del centro del Cuzco",
        image: {
          src: "/projects/killa/casa-jardin.jpg",
          alt: "Casa de campo de piedra con jardín y montañas al fondo",
        },
      },
    ],
    activities: [
      {
        title: "Remo y kayak en la laguna",
        image: {
          src: "/projects/killa/kayak.jpg",
          alt: "Dos personas en kayak sobre la laguna, rodeadas de montañas",
        },
      },
      {
        title: "Trekking, senderismo y trail running",
        image: {
          src: "/projects/killa/trekking.jpg",
          alt: "Corredores en un sendero de montaña sobre el valle",
        },
      },
      {
        title: "Cuatrimotos y ciclismo",
        image: {
          src: "/projects/killa/cuatrimotos.jpg",
          alt: "Cuatrimotos recorriendo un camino de tierra al atardecer",
        },
      },
      {
        title: "Meditación y yoga",
        image: {
          src: "/projects/killa/yoga.jpg",
          alt: "Grupo practicando yoga al aire libre frente a las montañas",
        },
      },
    ],
    growth: {
      title: "Múltiples formas de hacer crecer tu inversión",
      description: "Un espacio, distintas posibilidades de desarrollo y uso.",
      items: [
        {
          title: "Desarrollo inmobiliario",
          description:
            "Construye una casa de campo, lodge o proyecto diseñado alrededor del paisaje.",
          image: {
            src: "/projects/killa/desarrollo.jpg",
            alt: "Casa de campo moderna con terraza y fogata frente al valle",
          },
        },
        {
          title: "Plusvalía",
          description:
            "Una inversión que se valoriza con el tiempo, con una proyección de crecimiento de al menos 10% anual en el valor del m².",
          image: {
            src: "/projects/killa/plusvalia.jpg",
            alt: "Laguna rodeada de montañas nevadas al atardecer",
          },
        },
        {
          title: "Turismo de experiencias",
          description:
            "Genera ingresos con glamping, camping y excursiones en un entorno natural con alta demanda.",
          image: {
            src: "/projects/killa/glamping.jpg",
            alt: "Domo de glamping con terraza y fogata frente a la laguna",
          },
        },
        {
          title: "Renta fija",
          description:
            "Obtén ingresos recurrentes con Airbnb o alquileres fijos.",
          image: {
            src: "/projects/killa/renta.jpg",
            alt: "Dormitorio con ventanal abierto hacia la laguna y las montañas",
          },
        },
      ],
    },
    lotPlan: {
      image: "/projects/killa/lotizacion.png",
      width: 1429,
      height: 833,
      alt: "Plano de lotización de Killa con 29 espacios numerados y sus áreas en m²",
      description:
        "29 espacios, numerados y delimitados por levantamiento topográfico, con vía de acceso central.",
      features: [
        "Área y perímetro individual certificados",
        "Deslinde topográfico preciso (coordenadas y linderos)",
        "Acceso directo a la vía interna del condominio",
      ],
    },
    purchaseSteps: [
      {
        title: "Agenda tu cita",
        description:
          "Selecciona los m² que más te gusten según tus necesidades y presupuesto.",
      },
      {
        title: "Separa tu espacio",
        description: "Con una primera inicial del 10% del valor del predio.",
      },
      {
        title: "Proceso jurídico",
        description: "Firma contractual e inscripción de escritura pública.",
      },
    ],
    backing: {
      title: "Un proyecto de Vercorp Desarrolladora",
      about:
        "Vercorp Desarrolladora es parte de Vercorp Perú, holding inmobiliario peruano con 8 años en el rubro que identifica terrenos con potencial y los convierte en proyectos y activos inmobiliarios reales, desde la adquisición hasta la operación.",
      pillars: [
        {
          title: "Condominios urbanos",
          description: "8 condominios entregados con más de 48,000 m².",
        },
        {
          title: "Documentación legal desde el día uno",
          description:
            "Cada espacio con documentación y deslinde topográfico verificable.",
        },
      ],
    },
    contact: {
      blurb: "Agenda tu cita y sé parte de Killa.",
      image: {
        src: "/projects/killa/huaypo.jpg",
        alt: "Campos de Huaypo bajo un cielo de nubes, con montañas al fondo",
      },
    },
  },
];

export const SOLD_PROJECTS: SoldProject[] = [
  {
    slug: "raiz",
    name: "Raíz Condominio",
    district: "Huaypo · Valle Sagrado",
    totalLots: 30,
    areaM2: 7107,
    image: "/projects/entregados/raiz.jpg",
    imageAlt: "Campos de cultivo en Huaypo con montañas y cielo nublado al fondo",
  },
  {
    slug: "fundo-lago",
    name: "Fundo Lago",
    district: "Huaypo · Valle Sagrado",
    totalLots: 16,
    areaM2: 4667,
    image: "/projects/entregados/fundo-lago.jpg",
    imageAlt: "Vista a la laguna de Huaypo entre árboles y montañas",
  },
  {
    slug: "finca-san-jose",
    name: "Finca San José",
    district: "Huaypo · Valle Sagrado",
    totalLots: 14,
    areaM2: 5000,
    image: "/projects/entregados/finca-san-jose.jpg",
    imageAlt: "Terreno verde con camino de acceso y la laguna de Huaypo al fondo",
  },
  {
    slug: "vittoria",
    name: "Vittoria",
    district: "Huaypo · Valle Sagrado",
    totalLots: 11,
    areaM2: 2267,
    image: "/projects/entregados/vittoria.jpg",
    imageAlt: "Pradera con camino de tierra y nevados al fondo",
  },
  {
    slug: "vista-lago",
    name: "Vista Lago",
    district: "Huaypo · Valle Sagrado",
    totalLots: 4,
    areaM2: 1937,
    image: "/projects/entregados/vista-lago.jpg",
    imageAlt: "Campo verde frente a la laguna de Huaypo y las montañas",
  },
];

export const TOTAL_SOLD_LOTS = SOLD_PROJECTS.reduce(
  (sum, project) => sum + project.totalLots,
  0,
);

export function getActiveProject(slug: string) {
  return ACTIVE_PROJECTS.find((project) => project.slug === slug);
}
