import Image from "next/image";
import Link from "next/link";
import { KillaMark } from "@/components/KillaLogo";
import ProjectLogo from "@/components/ProjectLogo";
import type { ActiveProject } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function ProjectFooter({
  project,
}: {
  project: Pick<ActiveProject, "slug" | "name" | "tagline" | "place">;
}) {
  return (
    <footer className="relative overflow-hidden bg-ink text-background">
      <KillaMark className="pointer-events-none absolute -right-16 -bottom-24 w-[28rem] text-background/[0.04] sm:w-[36rem]" />

      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <a
              href="#top"
              aria-label={`${project.name} — volver arriba`}
              className="inline-block transition-opacity hover:opacity-75"
            >
              <ProjectLogo project={project} className="h-10 w-auto sm:h-12" />
            </a>
            <p className="mt-5 text-[15px] font-light text-background/75">
              {project.tagline}
            </p>
            <p className="mt-1 text-sm font-light text-background/50">
              {project.place}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm font-medium">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-sm font-light text-background/65">
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="transition-colors hover:text-background"
                >
                  {SITE.phoneLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="transition-colors hover:text-background"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-background"
                >
                  {SITE.parentUrl.replace("https://", "www.")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm font-medium">Vercorp Desarrolladora</h2>
            <ul className="mt-4 space-y-2.5 text-sm font-light text-background/65">
              <li>
                <Link href="/" className="transition-colors hover:text-background">
                  Todos nuestros proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="/#entregados"
                  className="transition-colors hover:text-background"
                >
                  Proyectos entregados
                </Link>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-background">
                  Términos y condiciones
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-background/15 pt-8 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-[12px] font-light text-background/55 transition-opacity hover:opacity-80"
          >
            Un proyecto de
            <Image
              src="/brand/vercorp-desarrolladora-logo.png"
              alt="Vercorp Desarrolladora"
              width={900}
              height={291}
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex flex-col gap-1 text-[12px] font-light text-background/50 md:items-end">
            <p>
              © 2026 {project.name} · Vercorp Desarrolladora. Todos los derechos
              reservados.
            </p>
            <p>
              Construido por{" "}
              <a
                href="https://teamaurora.pe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/75 transition-colors hover:text-background"
              >
                Team Aurora
              </a>
              <span className="mx-2">·</span>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/75 transition-colors hover:text-background"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
