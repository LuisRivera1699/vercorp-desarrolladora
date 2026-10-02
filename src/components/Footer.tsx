import Image from "next/image";
import Link from "next/link";
import { ACTIVE_PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

const LINKS = [
  ...ACTIVE_PROJECTS.map((project) => ({
    label: project.name,
    href: `/${project.slug}`,
    external: false,
  })),
  { label: "Proyectos entregados", href: "/#entregados", external: false },
  { label: "Vercorp", href: SITE.parentUrl, external: true },
  { label: "WeGrow", href: SITE.wegrowUrl, external: true },
  { label: "Términos y Condiciones", href: "#", external: false },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <LotPattern />

      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20 sm:pb-12 md:pt-24 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:gap-16">
          <div>
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
            >
              <Image
                src="/brand/vercorp-desarrolladora-logo.png"
                alt="Vercorp Desarrolladora"
                width={900}
                height={291}
                className="h-11 w-auto sm:h-12"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed font-light text-white/55">
              Habilitamos y lotizamos terrenos en Cusco para que construyas tu
              hogar, tu patrimonio y tu futuro.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wide text-accent uppercase sm:text-xl">
              Contacto
            </h3>
            <ul className="mt-5 space-y-3 text-sm font-light text-white/60">
              <li>Cusco, Perú</li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-accent"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="transition-colors hover:text-accent"
                >
                  {SITE.phoneLabel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold tracking-wide text-accent uppercase sm:text-xl">
              Enlaces
            </h3>
            <ul className="mt-5 space-y-3 text-sm font-light text-white/60">
              {LINKS.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center sm:mt-16">
          <p className="text-[12px] font-light tracking-wide text-white/45 sm:text-[13px]">
            Copyright © Vercorp Desarrolladora 2026. Todos los derechos
            reservados.
          </p>
          <p className="mt-2 text-[12px] font-light tracking-wide text-white/45 sm:text-[13px]">
            Construido por{" "}
            <a
              href="https://teamaurora.pe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-accent"
            >
              Team Aurora
            </a>
          </p>

          <div className="mt-5 flex justify-center">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Vercorp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/70 text-accent transition-colors hover:border-accent hover:bg-accent hover:text-white"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LotPattern() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      aria-hidden
    >
      <defs>
        <pattern
          id="footer-lots"
          width="180"
          height="140"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke="#c4a484" strokeWidth="1">
            <rect x="8" y="8" width="52" height="54" />
            <rect x="60" y="8" width="44" height="54" />
            <rect x="104" y="8" width="68" height="54" />
            <rect x="8" y="78" width="70" height="54" />
            <rect x="78" y="78" width="40" height="54" />
            <rect x="118" y="78" width="54" height="54" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#footer-lots)" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
