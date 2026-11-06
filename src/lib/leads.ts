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

const OPTIONAL_FIELDS = ["email", "project", "lot", "visitDate", "message"] as const;

export async function submitLead(lead: Lead) {
  const [{ firebaseApp }, { addDoc, collection, getFirestore, serverTimestamp }] =
    await Promise.all([import("./firebaseApp"), import("firebase/firestore/lite")]);

  const optional = Object.fromEntries(
    OPTIONAL_FIELDS.map((key) => [key, lead[key]?.trim()] as const).filter(([, value]) => value),
  );

  await addDoc(collection(getFirestore(firebaseApp), "contacts"), {
    site: "proyectos",
    source: lead.source,
    interest: lead.intent,
    name: lead.name.trim(),
    phone: lead.phone.trim(),
    ...optional,
    consent: true,
    createdAt: serverTimestamp(),
  });
}
