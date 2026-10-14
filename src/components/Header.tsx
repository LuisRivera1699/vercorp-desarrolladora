"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Inicio", href: "/" },
  { label: "En venta", href: "/#en-venta" },
  { label: "Entregados", href: "/#entregados" },
  { label: "Contacto", href: "/#contacto" },
] as const;

export default function Header({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (solid) return;

    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const inverted = solid || scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        inverted
          ? "bg-white/95 text-foreground shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="relative z-10 transition-opacity hover:opacity-80"
          aria-label="Vercorp Desarrolladora — inicio"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src={
              inverted
                ? "/brand/vercorp-desarrolladora-logo-dark.png"
                : "/brand/vercorp-desarrolladora-logo.png"
            }
            alt="Vercorp Desarrolladora"
            width={900}
            height={291}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-10">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`text-[11px] font-medium tracking-[0.2em] uppercase transition-colors ${
                inverted
                  ? "text-foreground/75 hover:text-accent"
                  : "text-white/90 hover:text-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            className={`border px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 ${
              inverted
                ? "border-accent bg-accent text-white hover:border-accent-hover hover:bg-accent-hover"
                : "border-white/80 text-white hover:bg-white hover:text-foreground"
            }`}
          >
            Quiero mi espacio
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="sr-only">Menú</span>
          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full transition-all duration-300 ${
                inverted ? "bg-foreground" : "bg-white"
              } ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-full transition-all duration-300 ${
                inverted ? "bg-foreground" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-px w-full transition-all duration-300 ${
                inverted ? "bg-foreground" : "bg-white"
              } ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      <div
        className={`fixed inset-0 top-16 bg-white transition-all duration-300 md:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 pt-16">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium tracking-[0.22em] text-foreground uppercase transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-accent px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors hover:bg-accent-hover"
          >
            Quiero mi espacio
          </Link>
        </nav>
      </div>
    </header>
  );
}
