import type { Project, ProjectStatus } from "./types";

export type * from "./types";

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

const LAST_SPACES_RATIO = 0.8;

export function getAvailability(project: Pick<Project, "lots">) {
  const spaces = project.lots.map((lot, index) => ({
    number: index + 1,
    area: lot.area,
    sold: lot.sold,
  }));
  const total = spaces.length;
  const soldCount = spaces.filter((space) => space.sold).length;
  return {
    total,
    sold: soldCount,
    available: total - soldCount,
    soldRatio: total > 0 ? soldCount / total : 0,
    availableSpaces: spaces.filter((space) => !space.sold),
  };
}

export function getProjectStatus(project: Pick<Project, "lots" | "status">): ProjectStatus {
  return getAvailability(project).soldRatio >= LAST_SPACES_RATIO
    ? "ultimos-espacios"
    : project.status;
}

/** Formulario del proyecto; si su sección de contacto está oculta, el del home. */
export function contactHref(project: Pick<Project, "contact">, tab: "visita" | "comprar") {
  return project.contact.visible ? `#${tab}` : "/#contacto";
}

export function formatUsd(amount: number) {
  return `$${amount.toLocaleString("en-US")}`;
}

export function getFinancing(project: Pick<Project, "pricing">) {
  const { areaFrom: area, pricePerM2, downPaymentPercent, installments } = project.pricing;
  const total = area * pricePerM2;
  const downPayment = Math.ceil((total * downPaymentPercent) / 100);
  // Redondeo hacia arriba: el "desde" publicado nunca puede quedar por debajo de la cuota real.
  const monthly = Math.ceil((total - downPayment) / installments);
  return {
    area,
    pricePerM2,
    downPaymentPercent,
    installments,
    total,
    downPayment,
    monthly,
  };
}

export function financingExample(
  financing: ReturnType<typeof getFinancing>,
) {
  return `Ejemplo: espacio de ${financing.area} m² a ${formatUsd(financing.pricePerM2)}/m² (${formatUsd(financing.total)}). Inicial de ${formatUsd(financing.downPayment)} y ${financing.installments} cuotas de ${formatUsd(financing.monthly)}, sin intereses.`;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  preventa: "Preventa",
  "en-venta": "En venta",
  "ultimos-espacios": "Últimos espacios",
};
