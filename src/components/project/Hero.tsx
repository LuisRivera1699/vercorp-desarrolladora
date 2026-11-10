import Image from "next/image";
import Link from "next/link";
import ProjectLogo from "@/components/ProjectLogo";
import { contactHref, formatUsd, getFinancing, getProjectStatus, STATUS_LABEL } from "@/lib/projects";
import { overlayGradient } from "@/lib/projects/constants";
import { sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";

export default function Hero({ project }: { project: Project }) {
  const { hero } = project;
  const { style } = hero;
  const financing = getFinancing(project);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-s-bg text-s-fg"
      style={sectionVars(
        { bg: style.bg, fg: style.fg, accent: style.accent },
        { btn: style.primary, btn2: style.secondary },
      )}
    >
      <Image
        src={hero.image.url}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundImage: overlayGradient(style.overlay) }}
      />

      <div className="animate-hero-in flex flex-1 flex-col items-center justify-center px-5 pt-24 pb-10 text-center sm:pt-28">
        <Link
          href="/"
          className="flex flex-col items-center gap-2 text-[11px] font-light text-s-fg/70 transition-opacity hover:opacity-80"
        >
          {hero.byline}
          <Image
            src="/brand/vercorp-desarrolladora-logo.png"
            alt="Vercorp Desarrolladora"
            width={900}
            height={291}
            priority
            className="h-8 w-auto sm:h-9"
          />
        </Link>

        <h1 className="mt-12 sm:mt-14" aria-label={`${project.name} — ${project.tagline}`}>
          <ProjectLogo project={project} className="mx-auto w-[min(76vw,34rem)] text-s-fg" />
        </h1>
        <p className="mt-8 text-lg font-light sm:mt-10 sm:text-2xl">{project.tagline}</p>
        <p className="mt-1.5 text-sm font-light text-s-fg/70 sm:text-base">{project.place}</p>
      </div>

      <div className="animate-hero-in relative mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8 sm:pb-10 [animation-delay:150ms]">
        <div className="flex flex-col items-center gap-5 border-t border-s-fg/20 pt-6 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-s-fg/10 px-3.5 py-1.5 text-[12px] font-medium ring-1 ring-s-fg/25 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-s-accent" />
              {STATUS_LABEL[getProjectStatus(project)]}
            </span>
            <p className="text-sm font-light text-s-fg/85">
              <span className="block text-xl font-normal text-s-fg sm:inline sm:text-2xl">
                Desde {formatUsd(financing.monthly)}/mes
              </span>
              <span className="mx-2 hidden text-s-fg/40 sm:inline">·</span>
              {financing.downPaymentPercent}% de inicial ·{" "}
              {financing.installments} cuotas sin intereses
            </p>
          </div>
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
            <a
              href={contactHref(project, "visita")}
              className="inline-flex h-12 items-center justify-center rounded-full bg-s-btn px-7 text-sm font-medium text-s-btn-fg transition-colors hover:bg-s-btn-hover hover:text-s-btn-hover-fg"
            >
              {hero.primaryLabel}
            </a>
            <a
              href={contactHref(project, "comprar")}
              className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium text-s-btn2-fg ring-1 ring-s-btn2/60 transition-colors hover:bg-s-btn2-hover hover:text-s-btn2-hover-fg"
            >
              {hero.secondaryLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
