import { decodeFields, type FirestoreValue } from "@/lib/firestoreRest";

export type TermsSection = { id: string; title: string; text: string };

export type Terms = {
  title: string;
  intro: string;
  sections: TermsSection[];
  updatedAt: string;
};

export const TERMS_COLLECTION = "legal";
export const TERMS_DOC = "terms";

const TERMS_URL = `https://firestore.googleapis.com/v1/projects/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/databases/(default)/documents/${TERMS_COLLECTION}/${TERMS_DOC}`;

function normalize(data: Partial<Terms>): Terms | null {
  const sections = (data.sections ?? []).filter((s) => s?.title?.trim() || s?.text?.trim());
  if (!data.title?.trim() && !data.intro?.trim() && !sections.length) return null;
  return {
    title: data.title ?? "",
    intro: data.intro ?? "",
    sections,
    updatedAt: data.updatedAt ?? "",
  };
}

let cached: Promise<Terms | null> | null = null;

export function fetchTerms(): Promise<Terms | null> {
  cached ??= (async () => {
    const response = await fetch(TERMS_URL, { cache: "no-store" });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`Terms ${response.status}`);
    const document = (await response.json()) as { fields?: Record<string, FirestoreValue> };
    return normalize(decodeFields(document.fields) as Partial<Terms>);
  })().catch((error) => {
    cached = null;
    throw error;
  });
  return cached;
}

export function prefetchTerms() {
  fetchTerms().catch(() => {});
}

export function paragraphs(text: string) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function formatTermsDate(iso: string) {
  const date = new Date(iso);
  if (!iso || Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Lima",
  }).format(date);
}
