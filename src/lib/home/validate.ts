import { Errors, LIMITS } from "@/lib/projects/validate";
import { HOME_MAX, NAV_ITEMS, NAV_LABELS } from "./constants";
import type { CtaLink, HomeContent, SectionId } from "./types";

const URL_PATTERN = /^https?:\/\/\S+\.\S+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

class HomeErrors extends Errors {
  constructor() {
    super(true);
  }

  url(label: string, value: string, required = true) {
    if (!value.trim()) {
      if (required) this.add(`${label}: es obligatorio.`);
    } else if (!URL_PATTERN.test(value)) {
      this.add(`${label}: escribe un enlace completo, que empiece con https://.`);
    }
  }

  /** Enlace opcional: o los dos campos o ninguno. */
  link(label: string, link: CtaLink, required = false) {
    this.text(`${label} · texto`, link.label, LIMITS.label, required || Boolean(link.href));
    this.url(`${label} · enlace`, link.href, required || Boolean(link.label.trim()));
  }
}

type Validators = { [K in SectionId]: (value: HomeContent[K]) => string[] };

export const VALIDATORS: Validators = {
  header(s) {
    const e = new HomeErrors();
    e.image("Logo claro", s.logoLight);
    e.image("Logo oscuro", s.logoDark);
    NAV_ITEMS.forEach(({ key }) => e.text(`Menú · ${NAV_LABELS[key]}`, s.nav[key], LIMITS.label));
    e.text("Botón", s.ctaLabel, LIMITS.label);
    return e.list;
  },

  hero(s) {
    const e = new HomeErrors();
    e.text("Antetítulo", s.eyebrow, LIMITS.short);
    e.text("Título", s.title, LIMITS.short);
    e.text("Texto", s.text, LIMITS.text);
    e.text("Botón principal", s.primaryLabel, LIMITS.label);
    e.text("Botón secundario", s.secondaryLabel, LIMITS.label);
    e.image("Foto", s.image);
    e.count("Métricas", s.metrics.length, 1, HOME_MAX.metrics);
    s.metrics.forEach((metric, i) => {
      if (metric.source === "manual") e.number(`Métrica ${i + 1} · número`, metric.value);
      e.text(`Métrica ${i + 1} · sufijo`, metric.suffix, 4, false);
      e.text(`Métrica ${i + 1} · texto`, metric.label, LIMITS.label);
    });
    return e.list;
  },

  steps(s) {
    const e = new HomeErrors();
    e.text("Antetítulo", s.eyebrow, LIMITS.label);
    e.text("Título", s.title, LIMITS.title);
    e.text("Descripción", s.description, LIMITS.text);
    e.count("Pasos", s.items.length, 1, HOME_MAX.steps);
    s.items.forEach((step, i) => {
      e.text(`Paso ${i + 1} · título`, step.title, LIMITS.short);
      e.text(`Paso ${i + 1} · texto`, step.description, LIMITS.text);
      if (step.art === "custom") e.svg(`Paso ${i + 1} · ilustración`, step.customArt);
    });
    return e.list;
  },

  forSale(s) {
    const e = new HomeErrors();
    e.text("Antetítulo", s.eyebrow, LIMITS.label);
    e.text("Título con un proyecto", s.titleOne, LIMITS.title);
    e.text("Título con varios proyectos", s.titleMany, LIMITS.title);
    e.text("Descripción", s.description, LIMITS.text);
    e.text("Botón Ver proyecto", s.viewLabel, LIMITS.label);
    e.text("Botón Agendar visita", s.bookingLabel, LIMITS.label);
    e.url("Enlace de Agendar visita", s.bookingUrl);
    e.text("Área · prefijo", s.areaPrefix, 12, false);
    e.text("Área · texto", s.areaLabel, LIMITS.label);
    e.text("Segunda columna · valor", s.extraValue, 12);
    e.text("Segunda columna · texto", s.extraLabel, LIMITS.label);
    return e.list;
  },

  why(s) {
    const e = new HomeErrors();
    e.text("Antetítulo", s.eyebrow, LIMITS.label);
    e.text("Título", s.title, LIMITS.title);
    e.text("Descripción", s.description, LIMITS.text);
    e.link("Enlace", s.link);
    e.image("Foto", s.image);
    e.count("Razones", s.items.length, 1, HOME_MAX.reasons);
    s.items.forEach((reason, i) => {
      e.text(`Razón ${i + 1} · título`, reason.title, LIMITS.short);
      e.text(`Razón ${i + 1} · texto`, reason.description, LIMITS.text);
      e.link(`Razón ${i + 1} · enlace`, reason.link);
    });
    return e.list;
  },

  grow(s) {
    const e = new HomeErrors();
    e.image("Foto de fondo", s.image);
    if (!s.mark.url) e.add("Marca: falta la imagen.");
    e.text("Título", s.title, LIMITS.short);
    e.text("Línea resaltada", s.accent, LIMITS.short, false);
    e.text("Texto", s.text, LIMITS.text);
    e.text("Botón", s.buttonLabel, LIMITS.label);
    return e.list;
  },

  delivered(s) {
    const e = new HomeErrors();
    e.text("Antetítulo", s.eyebrow, LIMITS.label);
    e.text("Título", s.title, LIMITS.title);
    e.text("Descripción", s.description, LIMITS.text);
    e.text("Total de espacios · texto", s.lotsLabel, LIMITS.label);
    e.text("Total de proyectos · texto", s.projectsLabel, LIMITS.label);
    e.text("Sello · valor", s.sealValue, 8);
    e.text("Sello · texto", s.sealLabel, 16);
    e.count("Proyectos", s.items.length, 1, HOME_MAX.delivered);
    s.items.forEach((item, i) => {
      e.text(`Proyecto ${i + 1} · nombre`, item.name, LIMITS.label);
      e.text(`Proyecto ${i + 1} · ubicación`, item.district, LIMITS.short);
      e.number(`Proyecto ${i + 1} · espacios`, item.lots, { positive: true });
      e.number(`Proyecto ${i + 1} · m²`, item.area, { positive: true });
      e.image(`Proyecto ${i + 1}`, item.image);
    });
    return e.list;
  },

  contact(s) {
    const e = new HomeErrors();
    e.text("Antetítulo", s.eyebrow, LIMITS.label);
    e.text("Título", s.title, LIMITS.title);
    e.text("Mensaje de éxito · título", s.successTitle, LIMITS.label);
    e.text("Mensaje de éxito · texto", s.successMessage, LIMITS.text);
    e.text("Teléfono", s.phone, 24);
    if (s.phone.trim() && s.phone.replace(/\D/g, "").length < 8) {
      e.add("Teléfono: incluye el código de país, por ejemplo +51 979 381 776.");
    }
    e.text("Correo", s.email, LIMITS.short);
    if (s.email.trim() && !EMAIL_PATTERN.test(s.email)) e.add("Correo: no es un correo válido.");
    e.text("Ciudad", s.city, LIMITS.label);
    e.text("Mensaje de WhatsApp", s.whatsappMessage, LIMITS.text);
    return e.list;
  },

  footer(s) {
    const e = new HomeErrors();
    e.image("Logo", s.logo);
    e.text("Texto", s.text, LIMITS.text);
    e.url("Instagram", s.instagram);
    return e.list;
  },
};

export function validateSection<K extends SectionId>(id: K, value: HomeContent[K]) {
  return [...new Set(VALIDATORS[id](value))];
}
