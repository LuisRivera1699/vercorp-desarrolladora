import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { isLightColor, sectionVars } from "@/lib/projects/theme";
import type { Backing as BackingContent, Project } from "@/lib/projects/types";
import { CornerMark, Eyebrow, titleClass } from "./shared";

/** "Respaldo del holding": contenido común a todos los proyectos, colores e icono de cada uno. */
export default function Backing({
  project,
  content,
}: {
  project: Project;
  content: BackingContent;
}) {
  const { style, icon, customIcon } = project.backing;
  const mark = icon === "mark" ? project.mark : icon === "custom" ? customIcon : null;
  const darkLogo = isLightColor(style.bg, project.palette);

  return (
    <section
      className="relative overflow-hidden bg-s-bg px-5 py-20 text-s-fg sm:px-8 sm:py-24 lg:py-32"
      style={sectionVars(
        { bg: style.bg, fg: style.fg, accent: style.accent },
        { btn: style.button },
      )}
    >
      <CornerMark mark={mark} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow mark={mark} tone="light">
            {content.eyebrow}
          </Eyebrow>
          <h2 className={`${titleClass} max-w-3xl`}>{content.title}</h2>
          {content.about ? (
            <p className="mt-7 max-w-3xl text-[15px] leading-relaxed font-light text-s-fg/75 sm:text-base sm:leading-8">
              {content.about}
            </p>
          ) : null}
        </Reveal>

        {content.pillars.length ? (
          <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {content.pillars.map((pillar, index) => (
              <li key={pillar.id}>
                <Reveal delay={index * 100} className="border-t border-s-fg/20 pt-6">
                  <h3 className="text-lg font-normal">{pillar.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed font-light text-s-fg/70">
                    {pillar.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-16 flex flex-col gap-6 border-t border-s-fg/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src={
              darkLogo
                ? "/brand/vercorp-desarrolladora-logo-dark.png"
                : "/brand/vercorp-desarrolladora-logo.png"
            }
            alt="Vercorp Desarrolladora"
            width={900}
            height={291}
            className="h-10 w-auto self-start sm:h-11 sm:self-auto"
          />
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center self-start rounded-full px-7 text-sm font-medium text-s-btn-fg ring-1 ring-s-btn/50 transition-colors hover:bg-s-btn-hover hover:text-s-btn-hover-fg sm:self-auto"
          >
            {content.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
