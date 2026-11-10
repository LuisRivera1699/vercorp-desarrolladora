import { HEX_PATTERN, isValidColor, RESERVED_SLUGS, SLUG_MAX, SLUG_PATTERN } from "./constants";
import type {
  Backing,
  ButtonColors,
  CmsImage,
  Overlay,
  PhotoItem,
  Project,
  SvgAsset,
  TextItem,
  ValueItem,
} from "./types";

export const LIMITS = { label: 40, short: 80, title: 140, text: 400, long: 1000 } as const;

export const MAX = {
  paragraphs: 6,
  facts: 4,
  highlights: 1,
  distances: 4,
  photos: 8,
  growth: 8,
  features: 8,
  steps: 6,
  pillars: 6,
  lots: 400,
  shapes: 300,
};

/** Acumula mensajes; con `complete` en falso solo revisa formato, no que esté lleno. */
export class Errors {
  list: string[] = [];
  constructor(private complete: boolean) {}

  add(message: string) {
    this.list.push(message);
  }

  text(label: string, value: string, max: number, required = true) {
    if (value.length > max) this.add(`${label}: máximo ${max} caracteres.`);
    else if (required && this.complete && !value.trim()) this.add(`${label}: es obligatorio.`);
  }

  /** Un campo numérico vacío se guarda como NaN, que Firestore no admite, así que siempre es error. */
  number(label: string, value: number, { positive = false, max }: { positive?: boolean; max?: number } = {}) {
    if (!Number.isFinite(value)) {
      this.add(`${label}: escribe un número.`);
      return;
    }
    if (value < 0) this.add(`${label}: no puede ser negativo.`);
    else if (max !== undefined && value > max) this.add(`${label}: máximo ${max}.`);
    else if (positive && this.complete && value === 0) this.add(`${label}: debe ser mayor que 0.`);
  }

  image(label: string, image: CmsImage, required = true) {
    if (!image.url) {
      if (required && this.complete) this.add(`${label}: falta la imagen.`);
      return;
    }
    this.text(`${label} · descripción`, image.alt, 160);
  }

  svg(label: string, asset: SvgAsset | null, required = true) {
    if (!asset) {
      if (required && this.complete) this.add(`${label}: falta el archivo SVG.`);
      return;
    }
    if (!asset.shapes.length) this.add(`${label}: el SVG no tiene formas que se puedan dibujar.`);
    if (asset.shapes.length > MAX.shapes) this.add(`${label}: el SVG es demasiado complejo.`);
  }

  count(label: string, length: number, min: number, max: number) {
    if (length > max) this.add(`${label}: máximo ${max}.`);
    else if (this.complete && length < min) {
      this.add(min === 1 ? `${label}: agrega al menos uno.` : `${label}: agrega al menos ${min}.`);
    }
  }

  color(label: string, value: string) {
    if (!isValidColor(value)) this.add(`${label}: color no válido.`);
  }

  colors(label: string, value: object) {
    Object.entries(value).forEach(([key, item]) => {
      if (typeof item === "string") this.color(`${label} (${key})`, item);
    });
  }

  overlay(label: string, overlay: Overlay) {
    this.color(label, overlay.color);
    [overlay.top, overlay.middle, overlay.bottom].forEach((value) =>
      this.number(`${label} · opacidad`, value, { max: 100 }),
    );
  }

  button(label: string, button: ButtonColors) {
    this.colors(label, button);
  }

  texts(label: string, items: TextItem[], min: number, max: number, limit: number) {
    this.count(label, items.length, min, max);
    items.forEach((item, i) => this.text(`${label} ${i + 1}`, item.text, limit));
  }

  values(label: string, items: ValueItem[], min: number, max: number) {
    this.count(label, items.length, min, max);
    items.forEach((item, i) => {
      this.text(`${label} ${i + 1} · valor`, item.value, 24);
      this.text(`${label} ${i + 1} · texto`, item.label, LIMITS.short);
    });
  }

  photos(label: string, items: PhotoItem[], min: number) {
    this.count(label, items.length, min, MAX.photos);
    items.forEach((item, i) => {
      this.text(`${label} ${i + 1} · título`, item.title, LIMITS.short);
      this.image(`${label} ${i + 1}`, item.image);
    });
  }
}

export function validateSlug(slug: string) {
  if (!slug) return "La dirección es obligatoria.";
  if (slug.length > SLUG_MAX) return `La dirección admite máximo ${SLUG_MAX} caracteres.`;
  if (!SLUG_PATTERN.test(slug)) {
    return "La dirección solo puede tener minúsculas, números y guiones (por ejemplo, killa-2).";
  }
  if (RESERVED_SLUGS.includes(slug)) return "Esa dirección está reservada. Elige otra.";
  return null;
}

/**
 * Siempre valida formato y límites; si el proyecto está publicado, exige que
 * todo lo que se ve en la web esté completo. Las secciones ocultas no se exigen.
 */
export function validateProject(p: Project): string[] {
  const e = new Errors(p.published);

  const slugError = validateSlug(p.slug);
  if (slugError) e.add(slugError);

  e.text("Nombre", p.name, LIMITS.label);
  e.text("Ubicación", p.place, LIMITS.short);
  e.text("Frase", p.tagline, LIMITS.short);
  e.text("Resumen", p.summary, LIMITS.text);
  e.values("Dato destacado del home", p.highlights, 0, MAX.highlights);
  if (p.ogImage) e.image("Imagen para redes", p.ogImage, false);

  e.svg("Logo", p.logo);
  e.svg("Icono", p.mark);
  if (Object.values(p.palette).some((value) => !HEX_PATTERN.test(value))) {
    e.add("Paleta: usa colores en formato #rrggbb.");
  }

  e.number("Área mínima por espacio (m²)", p.pricing.areaFrom, { positive: true });
  e.number("Precio por m²", p.pricing.pricePerM2, { positive: true });
  e.number("Inicial (%)", p.pricing.downPaymentPercent, { positive: true, max: 100 });
  e.number("Cuotas", p.pricing.installments, { positive: true, max: 360 });
  e.count("Espacios", p.lots.length, 1, MAX.lots);
  p.lots.forEach((lot, i) => e.number(`Espacio ${i + 1} · área`, lot.area, { positive: true }));

  const { header, hero, intro, location, benefits, growth, lotPlan, purchase, backing, contact } = p;

  e.text("Menú · botón", header.ctaLabel, LIMITS.label);
  e.colors("Menú", header.style);
  e.button("Menú · botón", header.style.ctaSolid);
  e.button("Menú · botón sobre la portada", header.style.ctaClear);

  e.image("Portada", hero.image);
  e.text("Portada · texto sobre el logo", hero.byline, LIMITS.label);
  e.text("Portada · botón principal", hero.primaryLabel, LIMITS.label);
  e.text("Portada · botón secundario", hero.secondaryLabel, LIMITS.label);
  e.colors("Portada", hero.style);
  e.overlay("Portada · capa sobre la foto", hero.style.overlay);
  e.button("Portada · botón principal", hero.style.primary);
  e.button("Portada · botón secundario", hero.style.secondary);

  const section = (visible: boolean) => new Errors(p.published && visible);
  const sub = (check: Errors) => e.list.push(...check.list);

  const i = section(intro.visible);
  i.text("El proyecto · menú", intro.navLabel, LIMITS.label);
  i.text("El proyecto · antetítulo", intro.eyebrow, LIMITS.label);
  i.text("El proyecto · título", intro.title, LIMITS.title);
  i.texts("El proyecto · párrafo", intro.paragraphs, 1, MAX.paragraphs, LIMITS.long);
  i.text("El proyecto · frase final", intro.note, LIMITS.title, false);
  i.text("El proyecto · texto del área", intro.areaLabel, LIMITS.short);
  i.text("El proyecto · texto de disponibles", intro.availableLabel, LIMITS.short);
  i.values("El proyecto · dato", intro.facts, 0, MAX.facts);
  i.text("El proyecto · aclaración", intro.disclaimer, LIMITS.text, false);
  i.image("El proyecto · foto", intro.image);
  i.colors("El proyecto", intro.style);
  i.overlay("El proyecto · sombra de la foto", intro.style.overlay);
  sub(i);

  const l = section(location.visible);
  l.text("Ubicación · menú", location.navLabel, LIMITS.label);
  l.text("Ubicación · antetítulo", location.eyebrow, LIMITS.label);
  l.text("Ubicación · título", location.title, LIMITS.title);
  l.text("Ubicación · lugar", location.place, LIMITS.label);
  l.text("Ubicación · descripción", location.description, LIMITS.long);
  l.values("Ubicación · distancia", location.distances, 0, MAX.distances);
  l.text("Ubicación · lema", location.motto, LIMITS.title, false);
  l.image("Ubicación · foto", location.image);
  l.colors("Ubicación", location.style);
  l.overlay("Ubicación · sombra de la foto", location.style.overlay);
  sub(l);

  const b = section(benefits.visible);
  b.text("Beneficios · antetítulo", benefits.eyebrow, LIMITS.label);
  b.text("Beneficios · título", benefits.title, LIMITS.title);
  b.photos("Beneficio", benefits.items, 1);
  b.colors("Beneficios", benefits.style);
  sub(b);
  const a = section(benefits.visible && benefits.activities.visible);
  a.text("Actividades · título", benefits.activities.title, LIMITS.title);
  a.photos("Actividad", benefits.activities.items, 1);
  sub(a);

  const g = section(growth.visible);
  g.text("Rentabilidad · menú", growth.navLabel, LIMITS.label);
  g.text("Rentabilidad · antetítulo", growth.eyebrow, LIMITS.label);
  g.text("Rentabilidad · título", growth.title, LIMITS.title);
  g.text("Rentabilidad · descripción", growth.description, LIMITS.text, false);
  g.count("Rentabilidad · tarjetas", growth.items.length, 1, MAX.growth);
  growth.items.forEach((item, n) => {
    g.text(`Rentabilidad ${n + 1} · título`, item.title, LIMITS.short);
    g.text(`Rentabilidad ${n + 1} · texto`, item.description, LIMITS.text);
    g.image(`Rentabilidad ${n + 1}`, item.image);
  });
  g.colors("Rentabilidad", growth.style);
  g.overlay("Rentabilidad · capa sobre las fotos", growth.style.overlay);
  sub(g);

  const lp = section(lotPlan.visible);
  lp.text("Plano · menú", lotPlan.navLabel, LIMITS.label);
  lp.text("Plano · antetítulo", lotPlan.eyebrow, LIMITS.label);
  lp.text("Plano · título", lotPlan.title, LIMITS.title);
  lp.text("Plano · descripción", lotPlan.description, LIMITS.text);
  lp.text("Plano · título de la lista", lotPlan.featuresTitle, LIMITS.short, false);
  lp.texts("Plano · característica", lotPlan.features, 0, MAX.features, LIMITS.short);
  lp.image("Plano · imagen", lotPlan.image);
  lp.text("Plano · botón", lotPlan.buttonLabel, LIMITS.label);
  lp.colors("Plano", lotPlan.style);
  lp.button("Plano · botón", lotPlan.style.button);
  sub(lp);

  const pu = section(purchase.visible);
  pu.text("Compra · menú", purchase.navLabel, LIMITS.label);
  pu.text("Compra · antetítulo", purchase.eyebrow, LIMITS.label);
  pu.text("Compra · título", purchase.title, LIMITS.title);
  pu.count("Compra · pasos", purchase.steps.length, 1, MAX.steps);
  purchase.steps.forEach((step, n) => {
    pu.text(`Paso ${n + 1} · título`, step.title, LIMITS.short);
    pu.text(`Paso ${n + 1} · texto`, step.description, LIMITS.text);
  });
  pu.text("Compra · botón", purchase.buttonLabel, LIMITS.label);
  pu.colors("Compra", purchase.style);
  pu.button("Compra · botón", purchase.style.button);
  sub(pu);

  const bk = section(backing.visible);
  if (backing.icon === "custom") bk.svg("Respaldo · icono", backing.customIcon);
  bk.colors("Respaldo", backing.style);
  bk.button("Respaldo · botón", backing.style.button);
  sub(bk);

  const c = section(contact.visible);
  c.text("Contacto · título", contact.heading, LIMITS.label);
  c.text("Contacto · texto", contact.blurb, LIMITS.title);
  c.image("Contacto · foto", contact.image);
  for (const [label, copy] of [
    ["Contacto · visita", contact.visit],
    ["Contacto · compra", contact.buy],
  ] as const) {
    c.text(`${label} · pestaña`, copy.tab, LIMITS.label);
    c.text(`${label} · título`, copy.title, LIMITS.short);
    c.text(`${label} · descripción`, copy.description, LIMITS.text);
    c.text(`${label} · botón`, copy.submit, LIMITS.label);
    c.text(`${label} · mensaje de éxito`, copy.success, LIMITS.short);
  }
  c.colors("Contacto", contact.style);
  c.overlay("Contacto · capa sobre la foto", contact.style.overlay);
  c.button("Contacto · pestaña activa", contact.style.tabActive);
  c.button("Contacto · botón", contact.style.button);
  sub(c);

  e.colors("Footer", p.footer.style);
  e.text("WhatsApp · mensaje", p.whatsapp.message, LIMITS.text);
  e.button("WhatsApp", p.whatsapp.style);

  return [...new Set(e.list)];
}

export function validateBacking(backing: Backing): string[] {
  const e = new Errors(true);
  e.text("Antetítulo", backing.eyebrow, LIMITS.label);
  e.text("Título", backing.title, LIMITS.title);
  e.text("Texto", backing.about, LIMITS.long);
  e.count("Pilares", backing.pillars.length, 0, MAX.pillars);
  backing.pillars.forEach((pillar, i) => {
    e.text(`Pilar ${i + 1} · título`, pillar.title, LIMITS.short);
    e.text(`Pilar ${i + 1} · texto`, pillar.description, LIMITS.text);
  });
  e.text("Botón", backing.buttonLabel, LIMITS.label);
  return e.list;
}
