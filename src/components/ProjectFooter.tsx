import Image from "next/image";
import Link from "next/link";
import ProjectLogo, { ProjectMark } from "@/components/ProjectLogo";
import { telHref } from "@/lib/home/contact";
import { getSiteSettings } from "@/lib/home/fetch";
import { isLightColor, sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";
import { SITE } from "@/lib/site";
import { TermsLink } from "./TermsModal";

export default async function ProjectFooter({
  project,
}: {
  project: Pick<Project, "name" | "tagline" | "place" | "logo" | "mark" | "footer" | "palette">;
}) {
  const settings = await getSiteSettings();
  const { style } = project.footer;
  const darkLogo = isLightColor(style.bg, project.palette);

  return (
    <footer
      className="relative overflow-hidden bg-s-bg text-s-fg"
      style={sectionVars({ bg: style.bg, fg: style.fg })}
    >
      <ProjectMark
        asset={project.mark}
        className="pointer-events-none absolute -right-16 -bottom-24 w-[28rem] text-s-fg/[0.04] sm:w-[36rem]"
      />

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
            <p className="mt-5 text-[15px] font-light text-s-fg/75">
              {project.tagline}
            </p>
            <p className="mt-1 text-sm font-light text-s-fg/50">
              {project.place}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm font-medium">Contacto</h2>
            <ul className="mt-4 space-y-2.5 text-sm font-light text-s-fg/65">
              <li>
                <a
                  href={telHref(settings.phone)}
                  className="transition-colors hover:text-s-fg"
                >
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors hover:text-s-fg"
                >
                  {settings.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.parentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-s-fg"
                >
                  {SITE.parentUrl.replace("https://", "www.")}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm font-medium">Vercorp Desarrolladora</h2>
            <ul className="mt-4 space-y-2.5 text-sm font-light text-s-fg/65">
              <li>
                <Link href="/" className="transition-colors hover:text-s-fg">
                  Todos nuestros proyectos
                </Link>
              </li>
              <li>
                <Link
                  href="/#entregados"
                  className="transition-colors hover:text-s-fg"
                >
                  Proyectos entregados
                </Link>
              </li>
              <li>
                <TermsLink className="text-left transition-colors hover:text-s-fg">
                  Términos y condiciones
                </TermsLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-s-fg/15 pt-8 sm:mt-16 md:flex-row md:items-center md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-[12px] font-light text-s-fg/55 transition-opacity hover:opacity-80"
          >
            Un proyecto de
            <Image
              src={
                darkLogo
                  ? "/brand/vercorp-desarrolladora-logo-dark.png"
                  : "/brand/vercorp-desarrolladora-logo.png"
              }
              alt="Vercorp Desarrolladora"
              width={900}
              height={291}
              className="h-8 w-auto"
            />
          </Link>

          <div className="flex flex-col gap-1 text-[12px] font-light text-s-fg/50 md:items-end">
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
                className="text-s-fg/75 transition-colors hover:text-s-fg"
              >
                Team Aurora
              </a>
              <span className="mx-2">·</span>
              <a
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-s-fg/75 transition-colors hover:text-s-fg"
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
