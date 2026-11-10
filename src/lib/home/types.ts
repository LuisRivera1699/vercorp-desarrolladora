import type { LandIconId } from "@/lib/projects";
import type { CmsImage, SvgAsset } from "@/lib/projects/types";

export type NavKey = "home" | "forSale" | "delivered" | "contact";

export type HeaderContent = {
  /** Sobre la portada (fondo oscuro). */
  logoLight: CmsImage;
  /** Con el menú fijo (fondo blanco). */
  logoDark: CmsImage;
  /** Textos del menú; los destinos son fijos. */
  nav: Record<NavKey, string>;
  ctaLabel: string;
};

/** De dónde sale el número: escrito a mano o calculado con los proyectos entregados. */
export type MetricSource = "manual" | "deliveredProjects" | "deliveredLots" | "deliveredArea";

export type Metric = {
  id: string;
  source: MetricSource;
  /** Solo se usa si `source` es `manual`. */
  value: number;
  suffix: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  /** Cada salto de línea es un salto en la web. */
  title: string;
  text: string;
  primaryLabel: string;
  secondaryLabel: string;
  image: CmsImage;
  showPlan: boolean;
  metrics: Metric[];
};

export type StepArt = "terrain" | "urbanize" | "lots" | "home" | "custom";

export type StepCard = {
  id: string;
  title: string;
  description: string;
  art: StepArt;
  /** Solo se usa si `art` es `custom`. */
  customArt: SvgAsset | null;
};

export type StepsContent = {
  eyebrow: string;
  title: string;
  description: string;
  items: StepCard[];
};

export type ForSaleContent = {
  eyebrow: string;
  titleOne: string;
  titleMany: string;
  description: string;
  viewLabel: string;
  bookingLabel: string;
  /** Agendar visita: el mismo enlace en todas las tarjetas y en los formularios. */
  bookingUrl: string;
  areaPrefix: string;
  areaLabel: string;
  extraValue: string;
  extraLabel: string;
};

export type CtaLink = { label: string; href: string };

export type Reason = {
  id: string;
  icon: LandIconId;
  title: string;
  /** `{espacios}` se reemplaza por el total de espacios entregados. */
  description: string;
  /** Opcional: sin enlace no se muestra. */
  link: CtaLink;
};

export type WhyContent = {
  eyebrow: string;
  title: string;
  description: string;
  link: CtaLink;
  image: CmsImage;
  items: Reason[];
};

export type GrowContent = {
  image: CmsImage;
  mark: CmsImage;
  title: string;
  accent: string;
  text: string;
  buttonLabel: string;
};

export type DeliveredProject = {
  id: string;
  name: string;
  district: string;
  lots: number;
  area: number;
  image: CmsImage;
};

export type DeliveredContent = {
  eyebrow: string;
  title: string;
  description: string;
  lotsLabel: string;
  projectsLabel: string;
  sealValue: string;
  sealLabel: string;
  items: DeliveredProject[];
};

export type ContactContent = {
  eyebrow: string;
  /** Cada salto de línea es un salto en pantallas medianas y grandes. */
  title: string;
  successTitle: string;
  successMessage: string;
  /** Tal como se lee; también define el enlace de llamada y el de WhatsApp. */
  phone: string;
  email: string;
  city: string;
  whatsappMessage: string;
};

export type FooterContent = {
  logo: CmsImage;
  text: string;
  instagram: string;
};

export type HomeContent = {
  header: HeaderContent;
  hero: HeroContent;
  steps: StepsContent;
  forSale: ForSaleContent;
  why: WhyContent;
  grow: GrowContent;
  delivered: DeliveredContent;
  contact: ContactContent;
  footer: FooterContent;
};

export type SectionId = keyof HomeContent;

/** Datos de contacto que usan todas las páginas, incluidas las de cada proyecto. */
export type SiteSettings = {
  phone: string;
  email: string;
  city: string;
  instagram: string;
  bookingUrl: string;
  whatsappMessage: string;
};
