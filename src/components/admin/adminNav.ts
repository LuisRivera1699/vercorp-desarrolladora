export type AdminNavIcon = "projects" | "backing" | "content";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: AdminNavIcon;
};

export const ADMIN_NAV: AdminNavItem[] = [
  { href: "/admin/proyectos", label: "Proyectos", icon: "projects" },
  { href: "/admin/respaldo", label: "Respaldo del holding", icon: "backing" },
  { href: "/admin/contenido", label: "Contenido", icon: "content" },
];

export const ADMIN_NAV_FOOTER: AdminNavItem[] = [];
