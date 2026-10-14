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

type Photo = { src: string; alt: string };

export type ActiveProject = {
  slug: string;
  name: string;
  status: ProjectStatus;
  place: string;
  tagline: string;
  subtitle: string;
  summary: string;
  heroImage: string;
  imageAlt: string;
  area: { from: number };
  pricing: {
    pricePerM2: number;
    downPaymentPercent: number;
    installments: number;
  };
  highlights: { value: string; label: string }[];
  manifesto: { lead: string; quote: string[]; image: Photo };
  lots: { areas: number[]; sold: number[] };
  facts: { value: string; label: string }[];
  overview: { title: string; description: string; disclaimer: string };
  location: {
    title: string;
    distances: { value: string; label: string }[];
    image: Photo;
    neighbor: { title: string; caption: string; images: Photo[] };
  };
  lotPlan: {
    image: string;
    width: number;
    height: number;
    alt: string;
    description: string;
    features: string[];
  };
  attractions: {
    intro: string;
    items: { icon: LandIconId; title: string; description: string }[];
  };
  backing: {
    title: string;
    about: string[];
    pillars: { title: string; description: string; href?: string }[];
    images: Photo[];
  };
  purchaseSteps: { title: string; description: string }[];
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
    status: "en-venta",
    place: "Huaypo · Valle Sagrado del Cuzco",
    tagline: "Tu lugar en el Valle Sagrado",
    subtitle: "Espacios con vista al lago",
    summary:
      "Un condominio de 29 espacios con vista al lago y al valle en Huaypo, a 30 minutos de Cuzco. Para casa de campo, segunda vivienda o inversión de largo plazo.",
    heroImage: "/projects/killa/hero.jpg",
    imageAlt:
      "Casa de campo iluminada al atardecer frente al lago, en el entorno de Fundo Lago",
    area: { from: 200 },
    pricing: { pricePerM2: 60, downPaymentPercent: 10, installments: 12 },
    highlights: [{ value: "30 min", label: "De Cuzco" }],
    manifesto: {
      lead: "Killa es el lugar donde el valle se detiene. Un sitio propio, silencioso y con vista, a 30 minutos de Cuzco.",
      quote: [
        "Hay lugares que se visitan. Y hay lugares que uno elige para quedarse.",
        "En Huaypo, el lago refleja el cielo y el valle baja el ritmo. Killa nace ahí: 29 lugares, cada uno con su propia vista, para construir algo propio en el Valle Sagrado.",
      ],
      image: {
        src: "/projects/killa/valle.jpg",
        alt: "Valle Sagrado bajo un cielo de nubes, con montañas al fondo",
      },
    },
    // Provisional: números de espacio vendidos de ejemplo, hasta tener los reales.
    lots: { areas: KILLA_LOT_AREAS, sold: [3, 7] },
    facts: [
      { value: "≈ 0.76 ha", label: "Área total del condominio" },
      { value: "1", label: "Vía de acceso interna" },
    ],
    overview: {
      title: "Un condominio de espacios con vista al lago y al valle",
      description:
        "Un terreno habilitado para uso residencial, pensado para casa de campo, segunda vivienda o inversión de largo plazo — en la misma zona que Fundo Lago.",
      disclaimer:
        "Áreas y linderos referenciales según levantamiento topográfico — sujetos a verificación notarial y registral.",
    },
    location: {
      title: "En el corazón del Valle Sagrado, junto a Fundo Lago",
      distances: [
        {
          value: "Huaypo",
          label: "Distrito de Chinchero, Valle Sagrado de los Incas",
        },
        { value: "30 min", label: "De la ciudad del Cuzco" },
        { value: "10 min", label: "Del aeropuerto internacional de Chinchero" },
        {
          value: "Al costado de Fundo Lago",
          label: "Mismo entorno de lago y valle ya consolidado",
        },
      ],
      image: {
        src: "/projects/killa/terreno.jpg",
        alt: "Terreno de Killa con la laguna de Huaypo y las montañas al fondo",
      },
      neighbor: {
        title: "Fundo Lago",
        caption: "El entorno vecino · imágenes referenciales",
        images: [
          {
            src: "/projects/killa/fundo-lago-interior.jpg",
            alt: "Interior de una casa de campo con ventanales hacia el lago",
          },
          {
            src: "/projects/killa/fundo-lago-terraza.jpg",
            alt: "Terraza con chimenea y vista a las montañas",
          },
          {
            src: "/projects/killa/fundo-lago-tina.jpg",
            alt: "Tina de madera al aire libre frente al lago al atardecer",
          },
        ],
      },
    },
    lotPlan: {
      image: "/projects/killa/plano.png",
      width: 1512,
      height: 2144,
      alt: "Plano de lotización de Killa con 29 espacios numerados y sus áreas en m²",
      description:
        "29 espacios, numerados y delimitados por levantamiento topográfico, con vía de acceso central.",
      features: [
        "Área y perímetro individual certificados",
        "Deslinde topográfico preciso (coordenadas y linderos)",
        "Acceso directo a la vía interna del condominio",
      ],
    },
    attractions: {
      intro:
        "Los mismos atractivos que hacen valioso el entorno de Fundo Lago.",
      items: [
        {
          icon: "trend",
          title: "Zona con mayor proyección",
          description:
            "El Aeropuerto Internacional de Chinchero, en construcción a 10 minutos, impulsa el desarrollo de toda la zona.",
        },
        {
          icon: "view",
          title: "Vista y entorno natural",
          description:
            "Lago, montañas y valle — un paisaje que no se puede replicar cerca de la ciudad.",
        },
        {
          icon: "road",
          title: "Acceso vehicular",
          description:
            "Vía de acceso directa a todos los espacios del condominio.",
        },
        {
          icon: "activity",
          title: "Actividades en la zona",
          description:
            "Paddle, remo y kayak en el lago; trekking, cuatrimotos, meditación y yoga en los alrededores.",
        },
      ],
    },
    backing: {
      title: "Un proyecto respaldado por un ecosistema real",
      about: [
        "Vercorp es un holding inmobiliario peruano que identifica terrenos con potencial y los convierte en proyectos y activos inmobiliarios reales — desde la adquisición hasta la operación.",
        "Vercorp tiene más de 8 años de trayectoria en Cuzco y Killa es nuestro proyecto más reciente.",
      ],
      pillars: [
        {
          title: "8 años",
          description:
            "De trayectoria construyendo valor inmobiliario en Cuzco.",
        },
        {
          title: "WeGrow",
          description:
            "2 edificios en operación, +50 habitaciones generando alquileres — prueba de ejecución real, no solo promesas.",
          href: "https://wegrow.pe",
        },
        {
          title: "Procesos claros",
          description:
            "Cada espacio con documentación y deslinde topográfico verificable.",
        },
      ],
      images: [
        {
          src: "/projects/killa/obra-gruas.jpg",
          alt: "Grúas sobre edificios en construcción",
        },
        {
          src: "/projects/killa/obra-equipo.jpg",
          alt: "Equipo de obra revisando avances en un edificio",
        },
        {
          src: "/projects/killa/obra-encofrado.jpg",
          alt: "Obreros trabajando en el encofrado de una estructura",
        },
      ],
    },
    purchaseSteps: [
      {
        title: "Agenda tu cita",
        description: "Selecciona tu espacio según tus necesidades y presupuesto.",
      },
      {
        title: "Separa tu espacio",
        description: "Pago íntegro del predio y toma de posesión.",
      },
      {
        title: "Proceso jurídico",
        description:
          "Firma contractual e inscripción de escritura pública.",
      },
    ],
    contact: {
      blurb: "Agenda tu cita y conoce el terreno en Huaypo, junto a Fundo Lago.",
      image: {
        src: "/projects/killa/planos.jpg",
        alt: "Manos revisando los planos de un proyecto",
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

export function getOtherActiveProjects(slug: string) {
  return ACTIVE_PROJECTS.filter((project) => project.slug !== slug);
}
