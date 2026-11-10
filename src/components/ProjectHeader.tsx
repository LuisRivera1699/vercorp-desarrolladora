"use client";

import { useEffect, useState } from "react";
import ProjectLogo from "@/components/ProjectLogo";
import { contactHref } from "@/lib/projects";
import { sectionVars } from "@/lib/projects/theme";
import type { HeaderSection, Project } from "@/lib/projects/types";

export type NavItem = { label: string; href: string };

export default function ProjectHeader({
  project,
  nav,
  header,
}: {
  project: Pick<Project, "name" | "logo" | "contact">;
  /** Solo las secciones visibles. */
  nav: NavItem[];
  header: HeaderSection;
}) {
  const { style } = header;
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
          ? "bg-s-bg/90 text-s-fg shadow-[0_1px_0_color-mix(in_oklab,var(--s-fg)_8%,transparent)] backdrop-blur-md"
          : "bg-transparent text-s-on-photo"
      }`}
      style={sectionVars(
        {
          bg: style.solidBg,
          fg: style.solidFg,
          "on-photo": style.clearFg,
          card: style.menuBg,
          detail: style.menuFg,
        },
        { btn: style.ctaSolid, btn2: style.ctaClear },
      )}
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
          {nav.map((item) => (
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
            href={contactHref(project, "visita")}
            className={`inline-flex h-10 items-center rounded-full px-5 text-[13px] font-medium transition-colors duration-300 ${
              solid
                ? "bg-s-btn text-s-btn-fg hover:bg-s-btn-hover hover:text-s-btn-hover-fg"
                : "bg-s-btn2 text-s-btn2-fg hover:bg-s-btn2-hover hover:text-s-btn2-hover-fg"
            }`}
          >
            {header.ctaLabel}
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
        className={`fixed inset-0 -z-10 flex flex-col bg-s-card px-6 pt-28 pb-10 text-s-detail transition-opacity duration-300 md:hidden ${
          menuOpen ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-5">
          {nav.map((item) => (
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
          href={contactHref(project, "visita")}
          onClick={close}
          className="mt-auto inline-flex h-12 items-center justify-center rounded-full bg-s-btn2 text-sm font-medium text-s-btn2-fg"
        >
          {header.ctaLabel}
        </a>
      </div>
    </header>
  );
}
