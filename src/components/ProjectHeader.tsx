"use client";

import { useEffect, useState } from "react";
import ProjectLogo from "@/components/ProjectLogo";
import type { ActiveProject } from "@/lib/projects";

const NAV = [
  { label: "El proyecto", href: "#proyecto" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Inversión", href: "#inversion" },
  { label: "Plano", href: "#plano" },
  { label: "Compra", href: "#compra" },
] as const;

export default function ProjectHeader({
  project,
}: {
  project: Pick<ActiveProject, "slug" | "name">;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled && !menuOpen;
  const close = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-background/90 text-foreground shadow-[0_1px_0_rgba(38,22,31,0.08)] backdrop-blur-md"
          : "bg-transparent text-background"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-10">
        <a
          href="#top"
          onClick={close}
          aria-label={`${project.name} — inicio`}
          className={`relative z-10 transition-opacity duration-500 hover:opacity-75 ${
            scrolled || menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <ProjectLogo project={project} className="h-7 w-auto sm:h-8" />
        </a>

        <nav className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] font-normal transition-opacity hover:opacity-100 ${
                solid ? "opacity-70" : "opacity-85"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#visita"
            className={`inline-flex h-10 items-center rounded-full px-5 text-[13px] font-medium transition-colors duration-300 ${
              solid
                ? "bg-foreground text-background hover:bg-accent-hover"
                : "bg-background text-foreground hover:bg-accent-soft"
            }`}
          >
            Agendar visita
          </a>
        </nav>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="flex w-5 flex-col gap-1.5" aria-hidden>
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 -z-10 flex flex-col bg-ink px-6 pt-28 pb-10 text-background transition-opacity duration-300 md:hidden ${
          menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-5">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="text-3xl font-extralight tracking-[-0.01em] transition-opacity hover:opacity-70"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href="#visita"
          onClick={close}
          className="mt-auto inline-flex h-12 items-center justify-center rounded-full bg-background text-sm font-medium text-foreground"
        >
          Agendar visita
        </a>
      </div>
    </header>
  );
}
