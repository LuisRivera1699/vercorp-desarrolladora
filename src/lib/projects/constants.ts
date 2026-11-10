import type { Color, EditableStatus, FontId, Overlay, Palette, PaletteKey } from "./types";

export const PROJECTS_TAG = "projects";
export const BACKING_TAG = "backing";
export const PROJECTS_PATH = "sites/proyectos/projects";
export const SHARED_PATH = "sites/proyectos/shared";
export const BACKING_DOC = "backing";
export const PROJECTS_STORAGE_ROOT = "cms/proyectos/projects";

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const SLUG_MAX = 40;

/** Rutas de la web y del admin (`/admin/proyectos/nuevo`) que un proyecto no puede usar como slug. */
export const RESERVED_SLUGS = [
  "nuevo",
  "admin",
  "api",
  "sitemap",
  "robots",
  "icon",
  "apple-icon",
  "favicon",
  "brand",
  "photos",
  "projects",
];

export const STATUS_OPTIONS: { value: EditableStatus; label: string }[] = [
  { value: "preventa", label: "Preventa" },
  { value: "en-venta", label: "En venta" },
];

export const FONTS: { value: FontId; label: string }[] = [
  { value: "zalando", label: "Zalando Sans" },
  { value: "montserrat", label: "Montserrat" },
  { value: "cormorant", label: "Cormorant Garamond" },
];

export const PALETTE_KEYS: PaletteKey[] = [
  "background",
  "foreground",
  "accent",
  "accentHover",
  "accentSoft",
  "earth",
  "stone",
  "ink",
];

export const PALETTE_LABELS: Record<PaletteKey, string> = {
  background: "Fondo",
  foreground: "Texto",
  accent: "Acento",
  accentHover: "Acento (hover)",
  accentSoft: "Acento suave",
  earth: "Detalles",
  stone: "Fondo alterno",
  ink: "Oscuro",
};

const PALETTE_VARS: Record<PaletteKey, string> = {
  background: "--background",
  foreground: "--foreground",
  accent: "--accent",
  accentHover: "--accent-hover",
  accentSoft: "--accent-soft",
  earth: "--earth",
  stone: "--stone",
  ink: "--ink",
};

export const HEX_PATTERN = /^#[0-9a-f]{6}$/i;

export function isPaletteRef(color: Color): color is `$${PaletteKey}` {
  return color.startsWith("$") && (PALETTE_KEYS as string[]).includes(color.slice(1));
}

export function isValidColor(color: Color) {
  return HEX_PATTERN.test(color) || isPaletteRef(color);
}

/** Valor CSS de un color: las referencias a la paleta siguen a la paleta del proyecto. */
export function cssColor(color: Color) {
  return isPaletteRef(color) ? `var(${PALETTE_VARS[color.slice(1) as PaletteKey]})` : color;
}

export function resolveColor(color: Color, palette: Palette) {
  return isPaletteRef(color) ? palette[color.slice(1) as PaletteKey] : color;
}

/** Variables CSS que reemplazan los tokens del sitio dentro de la página del proyecto. */
export function paletteVars(palette: Palette) {
  return Object.fromEntries(
    PALETTE_KEYS.map((key) => [PALETTE_VARS[key], palette[key]]),
  ) as Record<string, string>;
}

function shade(color: Color, opacity: number) {
  return `color-mix(in oklab, ${cssColor(color)} ${opacity}%, transparent)`;
}

/** Degradado de arriba hacia abajo sobre una foto. */
export function overlayGradient(overlay: Overlay) {
  return `linear-gradient(to bottom in oklab, ${shade(overlay.color, overlay.top)}, ${shade(overlay.color, overlay.middle)}, ${shade(overlay.color, overlay.bottom)})`;
}

/** Sombra solo en la base de la foto (fotos con el logo del proyecto). */
export function bottomShade(overlay: Overlay) {
  return `linear-gradient(to top in oklab, ${shade(overlay.color, overlay.bottom)}, transparent)`;
}

export function fillTotal(text: string, total: number) {
  return text.replaceAll("{total}", String(total));
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, SLUG_MAX)
    .replace(/-+$/, "");
}

/** Luminancia relativa (WCAG) de un color hexadecimal. */
function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string) {
  if (!HEX_PATTERN.test(a) || !HEX_PATTERN.test(b)) return 21;
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}
