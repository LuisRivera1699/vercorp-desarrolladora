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

export type ProjectStatus = "preventa" | "en-venta" | "ultimos-lotes";

export type SoldProject = {
  slug: string;
  name: string;
  district: string;
  year: string;
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
  highlights: { value: string; label: string }[];
  manifesto: { lead: string; quote: string[]; image: Photo };
  lots: { areas: number[] };
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

export function unsplash(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  preventa: "Preventa",
  "en-venta": "En venta",
  "ultimos-lotes": "Últimos lotes",
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
    place: "Huaypo · Valle Sagrado del Cusco",
    tagline: "Tu lugar en el Valle Sagrado",
    subtitle: "Lotes con vista al lago, junto a Fundo Lago",
    summary:
      "Un condominio de 29 lotes con vista al lago y al valle en Huaypo, a 30 minutos de Cusco. Para casa de campo, segunda vivienda o inversión de largo plazo.",
    heroImage: "/projects/killa/hero.jpg",
    imageAlt:
      "Casa de campo iluminada al atardecer frente al lago, en el entorno de Fundo Lago",
    highlights: [
      { value: "29", label: "Lotes" },
      { value: "200–400", label: "m² por lote" },
      { value: "30 min", label: "De Cusco" },
    ],
    manifesto: {
      lead: "Killa es el lugar donde el valle se detiene. Un sitio propio, silencioso y con vista, a 30 minutos de Cusco.",
      quote: [
        "Hay lugares que se visitan. Y hay lugares que uno elige para quedarse.",
        "En Huaypo, el lago refleja el cielo y el valle baja el ritmo. Killa nace ahí: 29 lugares, cada uno con su propia vista, para construir algo propio en el Valle Sagrado.",
      ],
      image: {
        src: "/projects/killa/valle.jpg",
        alt: "Valle Sagrado bajo un cielo de nubes, con montañas al fondo",
      },
    },
    lots: { areas: KILLA_LOT_AREAS },
    facts: [
      { value: "29", label: "Lotes disponibles" },
      { value: "200–400 m²", label: "Rango de área por lote" },
      { value: "≈ 0.76 ha", label: "Área total del condominio" },
      { value: "1", label: "Vía de acceso interna" },
    ],
    overview: {
      title: "Un condominio de lotes con vista al lago y al valle",
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
        { value: "30 min", label: "De la ciudad del Cusco" },
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
      alt: "Plano de lotización de Killa con 29 lotes numerados y sus áreas en m²",
      description:
        "29 lotes, numerados y delimitados por levantamiento topográfico, con vía de acceso central.",
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
          title: "Plusvalía en alza",
          description:
            "La construcción del Aeropuerto Internacional de Chinchero impulsa la valorización de suelo en toda la zona.",
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
            "Vía de acceso directa a todos los lotes del condominio.",
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
        "Vercorp tiene más de 8 años de trayectoria en Cusco y Killa es nuestro proyecto más reciente.",
      ],
      pillars: [
        {
          title: "8 años",
          description:
            "De trayectoria construyendo valor inmobiliario en Cusco.",
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
            "Cada lote con documentación y deslinde topográfico verificable.",
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
        description: "Selecciona tu lote según tus necesidades y presupuesto.",
      },
      {
        title: "Separa tu lote",
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

// Contenido provisional: nombres, cifras e imágenes se reemplazan con la información real de cada proyecto entregado.
export const SOLD_PROJECTS: SoldProject[] = [
  {
    slug: "los-andenes-de-saylla",
    name: "Los Andenes de Saylla",
    district: "Saylla",
    year: "2019",
    totalLots: 28,
    areaM2: 5600,
    image: unsplash("1500382017468-9049fed747ef", 1000),
    imageAlt: "Campo de cultivo al amanecer",
  },
  {
    slug: "praderas-de-san-jeronimo",
    name: "Praderas de San Jerónimo",
    district: "San Jerónimo",
    year: "2020",
    totalLots: 34,
    areaM2: 6500,
    image: unsplash("1500534314209-a25ddb2bd429", 1000),
    imageAlt: "Cadenas de montañas entre la neblina",
  },
  {
    slug: "mirador-de-poroy",
    name: "Mirador de Poroy",
    district: "Poroy",
    year: "2021",
    totalLots: 22,
    areaM2: 4300,
    image: unsplash("1506905925346-21bda4d32df4", 1000),
    imageAlt: "Cumbres andinas sobre un mar de nubes",
  },
  {
    slug: "villa-oropesa",
    name: "Villa Oropesa",
    district: "Oropesa",
    year: "2022",
    totalLots: 40,
    areaM2: 7600,
    image: unsplash("1500964757637-c85e8a162699", 1000),
    imageAlt: "Montañas al atardecer en tonos cálidos",
  },
  {
    slug: "campina-de-lucre",
    name: "Campiña de Lucre",
    district: "Lucre",
    year: "2023",
    totalLots: 30,
    areaM2: 5700,
    image: unsplash("1465146344425-f00d5f5c8f07", 1000),
    imageAlt: "Campo con flores silvestres",
  },
  {
    slug: "terrazas-de-urubamba",
    name: "Terrazas de Urubamba",
    district: "Urubamba",
    year: "2025",
    totalLots: 36,
    areaM2: 6300,
    image: unsplash("1475113548554-5a36f1f523d6", 1000),
    imageAlt: "Pastizal iluminado por el sol del atardecer",
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
