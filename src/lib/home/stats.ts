import type { DeliveredProject, Metric } from "./types";

export type DeliveredStats = { projects: number; lots: number; area: number };

export function deliveredStats(items: DeliveredProject[]): DeliveredStats {
  return {
    projects: items.length,
    lots: items.reduce((sum, item) => sum + item.lots, 0),
    area: items.reduce((sum, item) => sum + item.area, 0),
  };
}

export function metricValue(metric: Metric, stats: DeliveredStats) {
  switch (metric.source) {
    case "deliveredProjects":
      return stats.projects;
    case "deliveredLots":
      return stats.lots;
    case "deliveredArea":
      return stats.area;
    default:
      return metric.value;
  }
}

/** Reemplaza `{espacios}` por el total de espacios entregados. */
export function fillDelivered(text: string, stats: DeliveredStats) {
  return text.replaceAll("{espacios}", String(stats.lots));
}
