export type LeadIntent = "info" | "visita" | "compra";

export type Lead = {
  source: "home" | "proyecto";
  intent: LeadIntent;
  name: string;
  phone: string;
  email?: string;
  project?: string;
  lot?: string;
  visitDate?: string;
  message?: string;
};

// Sin backend todavía: simula la latencia de un envío real.
export async function submitLead(lead: Lead): Promise<{ ok: true }> {
  void lead;
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { ok: true };
}
