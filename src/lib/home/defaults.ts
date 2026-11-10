import type { CmsImage } from "@/lib/projects/types";
import { NAV_LABELS } from "./constants";
import type { HomeContent } from "./types";

const image = (alt: string, url = "", width = 0, height = 0): CmsImage => ({
  url,
  path: "",
  width,
  height,
  alt,
});

const DISTRICT = "Huaypo · Valle Sagrado";

/**
 * Contenido con el que se cargó el home. Si falta una sección en Firestore se
 * usa esta; las fotos quedan vacías y la web las omite.
 */
export const DEFAULT_HOME: HomeContent = {
  header: {
    logoLight: image("Vercorp Desarrolladora", "/brand/vercorp-desarrolladora-logo.png", 900, 291),
    logoDark: image("Vercorp Desarrolladora", "/brand/vercorp-desarrolladora-logo-dark.png", 900, 291),
    nav: NAV_LABELS,
    ctaLabel: "Quiero mi espacio",
  },
  hero: {
    eyebrow: "Habilitaciones urbanas en Cuzco",
    title: "Tu lugar para\ncrecer en Cuzco",
    text: "Transformamos grandes terrenos en espacios listos para ser tuyos, en las zonas con mayor proyección del Cuzco. Tú pones la idea; nosotros, el lugar.",
    primaryLabel: "Ver espacios disponibles",
    secondaryLabel: "Condominios entregados",
    image: image("Valle andino de Cuzco con parcelas de cultivo y montañas"),
    showPlan: true,
    metrics: [
      { id: "projects", source: "manual", value: 8, suffix: "", label: "Proyectos urbanísticos" },
      { id: "area", source: "manual", value: 48000, suffix: "+", label: "M² habilitados" },
      { id: "lots", source: "deliveredLots", value: 0, suffix: "+", label: "Espacios entregados" },
      { id: "sold", source: "deliveredProjects", value: 0, suffix: "", label: "Proyectos 100% vendidos" },
    ],
  },
  steps: {
    eyebrow: "Habilitación urbana",
    title: "De un gran terreno a tu propio espacio",
    description:
      "En Vercorp Desarrolladora convertimos terrenos amplios en comunidades ordenadas y listas para crecer. Así funciona:",
    items: [
      {
        id: "terrain",
        title: "Elegimos el terreno",
        description:
          "Identificamos grandes extensiones en zonas de Cuzco con proyección real de crecimiento, conectividad y servicios.",
        art: "terrain",
        customArt: null,
      },
      {
        id: "urbanize",
        title: "Habilitamos",
        description:
          "Saneamos cada terreno con un estudio jurídico y dejamos todos los papeles en regla. Al comprar, recibes tu boleta o factura.",
        art: "urbanize",
        customArt: null,
      },
      {
        id: "lots",
        title: "Lotizamos",
        description:
          "Dividimos el terreno en espacios independientes, con medidas claras, documentación en regla y precio transparente.",
        art: "lots",
        customArt: null,
      },
      {
        id: "home",
        title: "Crece tu patrimonio",
        description:
          "Invierte en zonas con mayor proyección en lugar de dejar tu dinero parado, expuesto a la inflación. A futuro, un inmueble que es patrimonio de por vida.",
        art: "home",
        customArt: null,
      },
    ],
  },
  forSale: {
    eyebrow: "En venta ahora",
    titleOne: "Proyecto en venta",
    titleMany: "Proyectos en venta",
    description:
      "Espacios en los lugares que están definiendo el futuro de Cuzco. Elige el tuyo antes de que se agoten.",
    viewLabel: "Ver proyecto",
    bookingLabel: "Agendar visita",
    bookingUrl:
      "https://calendar.google.com/appointments/schedules/AcZssZ2dAMV_EP_1eV1RY-yFLYonYK6Mx4xxxleKsLmItk2YDwZzpUA9_zd3pn8BWyQG0y4fteFGB888",
    areaPrefix: "desde",
    areaLabel: "Por espacio",
    extraValue: "+ m²",
    extraLabel: "Amplíalo a tu medida",
  },
  why: {
    eyebrow: "Por qué Vercorp",
    title: "Invierte en tierra con proyección",
    description:
      "Un espacio en Cuzco no es un gasto: es patrimonio. En lugar de dejar tu dinero parado, lo inviertes en una zona con mayor proyección, con el respaldo de un holding inmobiliario con trayectoria.",
    link: { label: "Conoce el holding Vercorp", href: "https://vercorpperu.com" },
    image: image("Revisión de planos de un proyecto de habilitación urbana"),
    items: [
      {
        id: "trend",
        icon: "trend",
        title: "Zonas con mayor proyección",
        description:
          "Elegimos zonas donde Cuzco está creciendo: nuevas vías, servicios y polos de desarrollo como el aeropuerto de Chinchero.",
        link: { label: "", href: "" },
      },
      {
        id: "price",
        icon: "location",
        title: "Precio de entrada competitivo",
        description:
          "Precios por m² competitivos en zonas en plena expansión, con precios especiales si necesitas más metros.",
        link: { label: "", href: "" },
      },
      {
        id: "title",
        icon: "title",
        title: "Título en regla",
        description:
          "Espacios independizados y saneados, listos para inscribirse a tu nombre en Registros Públicos.",
        link: { label: "", href: "" },
      },
      {
        id: "services",
        icon: "water",
        title: "Servicios habilitados",
        description:
          "Agua, luz, desagüe y vías proyectadas: un activo que puedes usar, alquilar o revender.",
        link: { label: "", href: "" },
      },
      {
        id: "legal",
        icon: "legal",
        title: "Acompañamiento legal",
        description: "Te guiamos en cada paso: separación, minuta, escritura e inscripción.",
        link: { label: "", href: "" },
      },
      {
        id: "backing",
        icon: "security",
        title: "Respaldo Vercorp",
        description:
          "Holding inmobiliario con 8 proyectos desarrollados en Cuzco y más de {espacios} espacios entregados.",
        link: { label: "Visitar vercorpperu.com", href: "https://vercorpperu.com" },
      },
    ],
  },
  grow: {
    image: image("Montañas sagradas de Cuzco al atardecer"),
    mark: image("", "/brand/vercorp-v-white.png", 395, 381),
    title: "Cuzco crece.",
    accent: "Crece con él.",
    text: "Cada espacio es el comienzo de una historia: una casa para la familia, un negocio propio, un patrimonio para toda la vida. Construye tu futuro en la tierra donde la historia sigue escribiéndose.",
    buttonLabel: "Elegir mi espacio",
  },
  delivered: {
    eyebrow: "Proyectos entregados",
    title: "Espacios que hoy ya son hogares",
    description:
      "Cada uno de estos condominios en Huaypo, en el Valle Sagrado, se vendió por completo. Hoy son patrimonio de familias e inversionistas que confiaron en Vercorp.",
    lotsLabel: "Espacios vendidos",
    projectsLabel: "Proyectos",
    sealValue: "100%",
    sealLabel: "Vendido",
    items: [
      {
        id: "raiz",
        name: "Raíz Condominio",
        district: DISTRICT,
        lots: 30,
        area: 7107,
        image: image("Campos de cultivo en Huaypo con montañas y cielo nublado al fondo"),
      },
      {
        id: "fundo-lago",
        name: "Fundo Lago",
        district: DISTRICT,
        lots: 16,
        area: 4667,
        image: image("Vista a la laguna de Huaypo entre árboles y montañas"),
      },
      {
        id: "finca-san-jose",
        name: "Finca San José",
        district: DISTRICT,
        lots: 14,
        area: 5000,
        image: image("Terreno verde con camino de acceso y la laguna de Huaypo al fondo"),
      },
      {
        id: "vittoria",
        name: "Vittoria",
        district: DISTRICT,
        lots: 11,
        area: 2267,
        image: image("Pradera con camino de tierra y nevados al fondo"),
      },
      {
        id: "vista-lago",
        name: "Vista Lago",
        district: DISTRICT,
        lots: 4,
        area: 1937,
        image: image("Campo verde frente a la laguna de Huaypo y las montañas"),
      },
    ],
  },
  contact: {
    eyebrow: "Encuentra tu espacio",
    title: "Hablemos de tu próximo proyecto.\nUn asesor te contactará.",
    successTitle: "¡Gracias!",
    successMessage:
      "Recibimos tu consulta. Un asesor de Vercorp Desarrolladora te contactará muy pronto para ayudarte a elegir tu espacio.",
    phone: "+51 979 381 776",
    email: "contacto@vercorpperu.com",
    city: "Cuzco, Perú",
    whatsappMessage: "Hola, quiero información sobre los espacios de Vercorp Desarrolladora.",
  },
  footer: {
    logo: image("Vercorp Desarrolladora", "/brand/vercorp-desarrolladora-logo.png", 900, 291),
    text: "Habilitamos y lotizamos terrenos en Cuzco para que construyas tu hogar, tu patrimonio y tu futuro.",
    instagram: "https://www.instagram.com/vercorp__/",
  },
};
