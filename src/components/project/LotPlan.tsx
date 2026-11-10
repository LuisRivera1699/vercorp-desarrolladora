import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";
import ProjectLogo, { ProjectMark } from "@/components/ProjectLogo";
import Reveal from "@/components/Reveal";
import { contactHref, getAvailability } from "@/lib/projects";
import { fillTotal } from "@/lib/projects/constants";
import { sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";
import { bodyClass, Eyebrow, titleClass } from "./shared";

export default function LotPlan({ project }: { project: Project }) {
  const { lotPlan } = project;
  const { style, image } = lotPlan;
  const availability = getAvailability(project);

  return (
    <section
      id="plano"
      className="scroll-mt-16 bg-s-bg px-5 py-20 text-s-fg sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      style={sectionVars(
        {
          bg: style.bg,
          fg: style.fg,
          accent: style.accent,
          card: style.planBg,
          detail: style.planLogo,
          dot: style.dot,
        },
        { btn: style.button },
      )}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-7">
            <Eyebrow mark={project.mark}>{lotPlan.eyebrow}</Eyebrow>
            <h2 className={titleClass}>{fillTotal(lotPlan.title, availability.total)}</h2>
            <p className={`mt-5 max-w-xl ${bodyClass}`}>{lotPlan.description}</p>
          </Reveal>
          {lotPlan.features.length ? (
            <Reveal delay={100} className="lg:col-span-5">
              {lotPlan.featuresTitle ? (
                <p className="text-sm font-medium">{lotPlan.featuresTitle}</p>
              ) : null}
              <ul className="mt-4 space-y-3">
                {lotPlan.features.map((feature) => (
                  <li
                    key={feature.id}
                    className="flex items-start gap-3 text-[15px] leading-relaxed font-light text-s-fg/75"
                  >
                    <ProjectMark
                      asset={project.mark}
                      className="mt-[0.45rem] h-2.5 w-3 shrink-0 text-s-accent"
                    />
                    {feature.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={120} className="mt-12 lg:mt-14">
          <ImageLightbox
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            label="Ampliar plano de lotización"
            className="overflow-hidden rounded-2xl bg-s-card/60 p-4 ring-1 ring-s-fg/10 sm:p-8 lg:rounded-3xl lg:p-12"
          >
            <div className="pointer-events-none flex items-center gap-4 pb-4 sm:pb-6">
              <ProjectLogo project={project} className="h-7 w-auto text-s-detail sm:h-10" />
            </div>
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 1152px) 100vw, 1100px"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
            />
            <span className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-s-btn px-3.5 py-2 text-[12px] font-medium text-s-btn-fg transition-colors group-hover:bg-s-btn-hover group-hover:text-s-btn-hover-fg sm:top-6 sm:right-6">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
                <path
                  d="M16 16l4.5 4.5M11 8.5v5M8.5 11h5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Ampliar
            </span>
          </ImageLightbox>
        </Reveal>

        <Reveal className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5 text-[15px] font-light text-s-fg/75">
            <span className="h-2 w-2 rounded-full bg-s-dot ring-4 ring-s-dot/30" />
            <span>
              <span className="font-normal text-s-fg">
                {availability.available} de {availability.total}
              </span>{" "}
              espacios disponibles
            </span>
          </p>
          <a
            href={contactHref(project, "comprar")}
            className="inline-flex h-12 items-center justify-center rounded-full bg-s-btn px-7 text-sm font-medium text-s-btn-fg transition-colors hover:bg-s-btn-hover hover:text-s-btn-hover-fg"
          >
            {lotPlan.buttonLabel}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
