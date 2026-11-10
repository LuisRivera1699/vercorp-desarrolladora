import type { LandIconId } from "@/lib/projects";
import type { MetricSource, NavKey, SectionId, StepArt } from "./types";

export const HOME_TAG = "home";
export const SECTIONS_PATH = "sites/proyectos/sections";
export const HOME_STORAGE_ROOT = "cms/proyectos/home";

export const HOME_MAX = { metrics: 4, steps: 6, reasons: 8, delivered: 24 } as const;

/** En el orden del home; `anchor` es donde abre "Ver en la web". */
export const SECTIONS: { id: SectionId; label: string; description: string; anchor: string }[] = [
  {
    id: "header",
    label: "Header",
    description: "Logos, textos del menú y botón de contacto.",
    anchor: "/",
  },
  {
    id: "hero",
    label: "Hero y métricas",
    description: "Portada: textos, botones, foto, plano animado y cifras.",
    anchor: "/",
  },
  {
    id: "steps",
    label: "Habilitación urbana",
    description: "Encabezado y pasos con su ilustración.",
    anchor: "/#como-funciona",
  },
  {
    id: "forSale",
    label: "Proyectos en venta",
    description: "Textos de las tarjetas y el enlace de Agendar visita. Se listan los proyectos publicados.",
    anchor: "/#en-venta",
  },
  {
    id: "why",
    label: "Por qué Vercorp",
    description: "Encabezado, foto, enlace y razones con icono.",
    anchor: "/#por-que",
  },
  {
    id: "grow",
    label: "Cuzco crece con él",
    description: "Foto de fondo, marca, título y botón.",
    anchor: "/#crece",
  },
  {
    id: "delivered",
    label: "Proyectos entregados",
    description: "Encabezado, totales y la lista de proyectos vendidos.",
    anchor: "/#entregados",
  },
  {
    id: "contact",
    label: "Contacto",
    description: "Formulario del home y teléfono, correo y ciudad de toda la web.",
    anchor: "/#contacto",
  },
  {
    id: "footer",
    label: "Footer",
    description: "Logo, texto bajo el logo e Instagram de toda la web.",
    anchor: "/",
  },
];

export const SECTION_IDS = SECTIONS.map((section) => section.id);

export const NAV_ITEMS: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "forSale", href: "/#en-venta" },
  { key: "delivered", href: "/#entregados" },
  { key: "contact", href: "/#contacto" },
];

export const NAV_LABELS: Record<NavKey, string> = {
  home: "Inicio",
  forSale: "En venta",
  delivered: "Entregados",
  contact: "Contacto",
};

export const METRIC_SOURCES: { value: MetricSource; label: string }[] = [
  { value: "manual", label: "Escrito a mano" },
  { value: "deliveredProjects", label: "Cantidad de proyectos entregados" },
  { value: "deliveredLots", label: "Suma de espacios entregados" },
  { value: "deliveredArea", label: "Suma de m² entregados" },
];

export const STEP_ARTS: { value: StepArt; label: string }[] = [
  { value: "terrain", label: "Terreno" },
  { value: "urbanize", label: "Habilitación" },
  { value: "lots", label: "Lotes" },
  { value: "home", label: "Casa" },
  { value: "custom", label: "SVG propio" },
];

export const LAND_ICONS: { value: LandIconId; label: string }[] = [
  { value: "trend", label: "Crecimiento" },
  { value: "location", label: "Ubicación" },
  { value: "title", label: "Documento" },
  { value: "water", label: "Agua" },
  { value: "legal", label: "Legal" },
  { value: "security", label: "Escudo" },
  { value: "road", label: "Camino" },
  { value: "calendar", label: "Calendario" },
  { value: "view", label: "Vista" },
  { value: "activity", label: "Actividad" },
];
