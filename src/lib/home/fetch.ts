import { cache } from "react";
import { fetchCollection } from "@/lib/firestoreRest";
import { HOME_TAG, SECTION_IDS, SECTIONS_PATH } from "./constants";
import { DEFAULT_HOME } from "./defaults";
import type { HomeContent, SiteSettings } from "./types";

/** Cada sección se completa con los valores por defecto de los campos que le falten. */
export const getHome = cache(async (): Promise<HomeContent> => {
  const documents = await fetchCollection(SECTIONS_PATH, HOME_TAG, "el contenido del home");
  const stored = Object.fromEntries(documents.map((doc) => [doc.id, doc.data]));
  return Object.fromEntries(
    SECTION_IDS.map((id) => [id, { ...DEFAULT_HOME[id], ...(stored[id] as object | undefined) }]),
  ) as HomeContent;
});

export async function getSiteSettings(): Promise<SiteSettings> {
  const { contact, footer, forSale } = await getHome();
  return {
    phone: contact.phone,
    email: contact.email,
    city: contact.city,
    whatsappMessage: contact.whatsappMessage,
    instagram: footer.instagram,
    bookingUrl: forSale.bookingUrl,
  };
}
