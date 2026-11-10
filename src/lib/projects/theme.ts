import type { CSSProperties } from "react";
import { contrastRatio, cssColor, paletteVars, resolveColor } from "./constants";
import type { ButtonColors, Color, FontId, Palette, Project } from "./types";

const FONT_VARS: Record<FontId, string> = {
  zalando: "var(--font-zalando)",
  montserrat: "var(--font-montserrat)",
  cormorant: "var(--font-cormorant)",
};

/**
 * Paleta y tipografía del proyecto sobre los tokens del sitio. Las clases
 * `font-sans` y `font-serif` también pasan a usar la tipografía elegida.
 */
export function themeVars(project: Pick<Project, "palette" | "font">): CSSProperties {
  const font = FONT_VARS[project.font];
  return {
    ...paletteVars(project.palette),
    "--project-font": font,
    ...(project.font !== "montserrat" ? { "--font-montserrat": font } : {}),
    ...(project.font !== "cormorant" ? { "--font-cormorant": font } : {}),
  } as CSSProperties;
}

type SectionToken =
  | "bg"
  | "fg"
  | "accent"
  | "card"
  | "on-photo"
  | "detail"
  | "dot";

/** Variables `--s-*` que usan las clases `bg-s-bg`, `text-s-fg`, etc. dentro de una sección. */
export function sectionVars(
  colors: Partial<Record<SectionToken, Color>>,
  buttons: { btn?: ButtonColors; btn2?: ButtonColors } = {},
): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [token, color] of Object.entries(colors)) {
    if (color) vars[`--s-${token}`] = cssColor(color);
  }
  for (const [prefix, button] of Object.entries(buttons)) {
    if (!button) continue;
    vars[`--s-${prefix}`] = cssColor(button.bg);
    vars[`--s-${prefix}-fg`] = cssColor(button.fg);
    vars[`--s-${prefix}-hover`] = cssColor(button.hoverBg);
    vars[`--s-${prefix}-hover-fg`] = cssColor(button.hoverFg);
  }
  return vars as CSSProperties;
}

/** Un fondo claro pide el logo oscuro de Vercorp Desarrolladora, y viceversa. */
export function isLightColor(color: Color, palette: Palette) {
  const hex = resolveColor(color, palette);
  return contrastRatio(hex, "#000000") > contrastRatio(hex, "#ffffff");
}
