import type { SvgShape, SvgShapeTag } from "./types";

const SHAPE_ATTRS: Record<SvgShapeTag, string[]> = {
  path: ["d"],
  circle: ["cx", "cy", "r"],
  ellipse: ["cx", "cy", "rx", "ry"],
  rect: ["x", "y", "width", "height", "rx", "ry"],
  polygon: ["points"],
  polyline: ["points"],
};

const COMMON_ATTRS = ["fill-rule", "clip-rule"];

/** Elementos cuyo contenido nunca se dibuja tal cual. */
const SKIPPED = new Set([
  "defs",
  "clippath",
  "mask",
  "symbol",
  "pattern",
  "lineargradient",
  "radialgradient",
  "style",
  "script",
  "title",
  "desc",
  "metadata",
  "text",
  "image",
  "foreignobject",
  "use",
]);

const NUMERIC = /^[-+0-9.eE,\s]*$/;
const PATH_DATA = /^[-+0-9.eE,\sMmLlHhVvCcSsQqTtAaZz]*$/;
const TRANSFORM = /^[-+0-9.eE,\s()a-zA-Z]*$/;

function safeValue(name: string, value: string) {
  if (name === "d") return PATH_DATA.test(value);
  if (name === "transform") return TRANSFORM.test(value) && !/url|javascript/i.test(value);
  if (name === "fill-rule" || name === "clip-rule") return value === "evenodd" || value === "nonzero";
  return NUMERIC.test(value);
}

function isHidden(el: Element) {
  const fill = el.getAttribute("fill");
  const display = el.getAttribute("display");
  const opacity = el.getAttribute("opacity");
  return fill === "none" || display === "none" || opacity === "0";
}

export type ParsedSvg = { viewBox: string; width: number; height: number; shapes: SvgShape[] };

/**
 * Extrae las formas rellenas de un SVG monocromo. Descarta todo lo demás
 * (scripts, estilos, textos, degradados, imágenes) y combina las
 * transformaciones de los grupos en cada forma.
 */
export function parseSvg(source: string): ParsedSvg {
  const doc = new DOMParser().parseFromString(source, "image/svg+xml");
  const root = doc.documentElement;
  if (root.nodeName.toLowerCase() !== "svg" || doc.querySelector("parsererror")) {
    throw new Error("El archivo no es un SVG válido.");
  }

  let viewBox = (root.getAttribute("viewBox") ?? "").trim().replace(/,/g, " ").replace(/\s+/g, " ");
  if (!/^-?[\d.]+ -?[\d.]+ [\d.]+ [\d.]+$/.test(viewBox)) {
    const width = parseFloat(root.getAttribute("width") ?? "");
    const height = parseFloat(root.getAttribute("height") ?? "");
    if (!(width > 0 && height > 0)) throw new Error("El SVG no indica su tamaño (viewBox).");
    viewBox = `0 0 ${width} ${height}`;
  }
  const [, , width, height] = viewBox.split(" ").map(Number);
  if (!(width > 0 && height > 0)) throw new Error("El viewBox del SVG no es válido.");

  const shapes: SvgShape[] = [];

  function walk(el: Element, transforms: string[]) {
    const tag = el.nodeName.toLowerCase().replace(/^svg:/, "");
    if (SKIPPED.has(tag) || isHidden(el)) return;

    const own = el.getAttribute("transform");
    const chain = own && safeValue("transform", own) ? [...transforms, own] : transforms;

    if (tag in SHAPE_ATTRS) {
      const shapeTag = tag as SvgShapeTag;
      const attrs: Record<string, string> = {};
      for (const name of [...SHAPE_ATTRS[shapeTag], ...COMMON_ATTRS]) {
        const value = el.getAttribute(name)?.trim();
        if (value && safeValue(name, value)) attrs[name] = value;
      }
      if (chain.length) attrs.transform = chain.join(" ");
      const required = SHAPE_ATTRS[shapeTag][0];
      if (attrs[required]) shapes.push({ tag: shapeTag, attrs });
      return;
    }

    for (const child of Array.from(el.children)) walk(child, chain);
  }

  for (const child of Array.from(root.children)) walk(child, []);

  if (!shapes.length) {
    throw new Error(
      "No encontramos formas en el SVG. Exporta el logo con los textos y trazos convertidos a contornos.",
    );
  }
  return { viewBox, width, height, shapes };
}

const REACT_NAMES: Record<string, string> = {
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
};

/** Atributos con los nombres que espera React. */
export function reactAttrs(attrs: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(attrs).map(([name, value]) => [REACT_NAMES[name] ?? name, value]),
  );
}
