"use client";

import { createContext, useContext } from "react";
import type { SiteSettings } from "@/lib/home/types";

const SiteSettingsContext = createContext<SiteSettings | null>(null);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return <SiteSettingsContext value={settings}>{children}</SiteSettingsContext>;
}

/** Contacto, Instagram y enlace de agenda que se editan en el home. */
export function useSiteSettings() {
  const settings = useContext(SiteSettingsContext);
  if (!settings) throw new Error("useSiteSettings necesita SiteSettingsProvider.");
  return settings;
}
