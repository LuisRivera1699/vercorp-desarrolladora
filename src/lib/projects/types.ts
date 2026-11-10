export type PaletteKey =
  | "background"
  | "foreground"
  | "accent"
  | "accentHover"
  | "accentSoft"
  | "earth"
  | "stone"
  | "ink";

export type Palette = Record<PaletteKey, string>;

/** Un color de la paleta (`$ink`) o uno propio en hexadecimal (`#26161f`). */
export type Color = string;

export type FontId = "zalando" | "montserrat" | "cormorant";

export type CmsImage = {
  url: string;
  path: string;
  width: number;
  height: number;
  alt: string;
};

export type SvgShapeTag = "path" | "circle" | "ellipse" | "rect" | "polygon" | "polyline";

export type SvgShape = { tag: SvgShapeTag; attrs: Record<string, string> };

/**
 * Logo o icono vectorial. El archivo original queda en Storage; la web solo
 * dibuja `shapes`, que el admin extrae del SVG con una lista blanca.
 */
export type SvgAsset = {
  url: string;
  path: string;
  width: number;
  height: number;
  viewBox: string;
  shapes: SvgShape[];
};

/** Degradado de arriba hacia abajo sobre una foto; opacidades de 0 a 100. */
export type Overlay = { color: Color; top: number; middle: number; bottom: number };

export type ButtonColors = { bg: Color; fg: Color; hoverBg: Color; hoverFg: Color };

export type SectionColors = { bg: Color; fg: Color; accent: Color };

export type TextItem = { id: string; text: string };
export type ValueItem = { id: string; value: string; label: string };
export type PhotoItem = { id: string; title: string; image: CmsImage };
export type StepItem = { id: string; title: string; description: string };
export type GrowthItem = { id: string; title: string; description: string; image: CmsImage };
export type Lot = { area: number; sold: boolean };

export type ProjectStatus = "preventa" | "en-venta" | "ultimos-espacios";
export type EditableStatus = Exclude<ProjectStatus, "ultimos-espacios">;

export type HeaderSection = {
  ctaLabel: string;
  style: {
    solidBg: Color;
    solidFg: Color;
    clearFg: Color;
    menuBg: Color;
    menuFg: Color;
    ctaSolid: ButtonColors;
    ctaClear: ButtonColors;
  };
};

export type HeroSection = {
  image: CmsImage;
  byline: string;
  primaryLabel: string;
  secondaryLabel: string;
  style: SectionColors & {
    overlay: Overlay;
    primary: ButtonColors;
    secondary: ButtonColors;
  };
};

type PhotoSectionStyle = SectionColors & { overlay: Overlay; photoLogo: Color };

export type IntroSection = {
  visible: boolean;
  navLabel: string;
  eyebrow: string;
  title: string;
  paragraphs: TextItem[];
  note: string;
  areaLabel: string;
  availableLabel: string;
  facts: ValueItem[];
  disclaimer: string;
  image: CmsImage;
  style: PhotoSectionStyle;
};

export type LocationSection = {
  visible: boolean;
  navLabel: string;
  eyebrow: string;
  title: string;
  place: string;
  description: string;
  distances: ValueItem[];
  motto: string;
  image: CmsImage;
  style: PhotoSectionStyle;
};

export type BenefitsSection = {
  visible: boolean;
  eyebrow: string;
  title: string;
  items: PhotoItem[];
  activities: { visible: boolean; title: string; items: PhotoItem[] };
  style: SectionColors;
};

export type GrowthSection = {
  visible: boolean;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  items: GrowthItem[];
  style: SectionColors & { overlay: Overlay; cardFg: Color };
};

export type LotPlanSection = {
  visible: boolean;
  navLabel: string;
  eyebrow: string;
  /** `{total}` se reemplaza por la cantidad de espacios. */
  title: string;
  description: string;
  featuresTitle: string;
  features: TextItem[];
  image: CmsImage;
  buttonLabel: string;
  style: SectionColors & { planBg: Color; planLogo: Color; dot: Color; button: ButtonColors };
};

export type PurchaseSection = {
  visible: boolean;
  navLabel: string;
  eyebrow: string;
  title: string;
  steps: StepItem[];
  buttonLabel: string;
  style: SectionColors & { cardBg: Color; button: ButtonColors };
};

export type BackingIcon = "mark" | "custom" | "none";

export type BackingSection = {
  visible: boolean;
  icon: BackingIcon;
  customIcon: SvgAsset | null;
  style: SectionColors & { button: ButtonColors };
};

export type ContactCopy = {
  tab: string;
  title: string;
  description: string;
  submit: string;
  success: string;
};

export type ContactSection = {
  visible: boolean;
  heading: string;
  blurb: string;
  image: CmsImage;
  visit: ContactCopy;
  buy: ContactCopy;
  style: SectionColors & {
    overlay: Overlay;
    photoFg: Color;
    tabsBg: Color;
    tabActive: ButtonColors;
    button: ButtonColors;
  };
};

export type FooterSection = { style: { bg: Color; fg: Color } };

export type WhatsappSection = { message: string; style: ButtonColors };

export type Project = {
  slug: string;
  name: string;
  order: number;
  published: boolean;
  status: EditableStatus;
  place: string;
  tagline: string;
  summary: string;
  highlights: ValueItem[];
  ogImage: CmsImage | null;
  logo: SvgAsset | null;
  mark: SvgAsset | null;
  font: FontId;
  palette: Palette;
  pricing: {
    areaFrom: number;
    pricePerM2: number;
    downPaymentPercent: number;
    installments: number;
  };
  lots: Lot[];
  header: HeaderSection;
  hero: HeroSection;
  intro: IntroSection;
  location: LocationSection;
  benefits: BenefitsSection;
  growth: GrowthSection;
  lotPlan: LotPlanSection;
  purchase: PurchaseSection;
  backing: BackingSection;
  contact: ContactSection;
  footer: FooterSection;
  whatsapp: WhatsappSection;
};

/** "Respaldo del holding": el mismo contenido en todos los proyectos. */
export type Backing = {
  eyebrow: string;
  title: string;
  about: string;
  pillars: StepItem[];
  buttonLabel: string;
};
