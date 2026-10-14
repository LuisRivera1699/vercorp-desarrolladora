import Image from "next/image";
import Link from "next/link";
import Availability from "@/components/Availability";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import {
  ACTIVE_PROJECTS,
  formatUsd,
  getFinancing,
  getProjectStatus,
  type ActiveProject,
} from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function ActiveProjects() {
  const single = ACTIVE_PROJECTS.length === 1;

  return (
    <section
      id="en-venta"
      className="scroll-mt-16 bg-white px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 md:py-28 lg:py-32"
      aria-labelledby="active-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            id="active-heading"
            eyebrow="En venta ahora"
            title={single ? "Proyecto en venta" : "Proyectos en venta"}
            description="Espacios en los lugares que están definiendo el futuro de Cuzco. Elige el tuyo antes de que se agoten."
          />
        </Reveal>

        <ul className="mt-14 space-y-10 sm:mt-16 md:mt-20 md:space-y-14">
          {ACTIVE_PROJECTS.map((project) => (
            <li key={project.slug}>
              <Reveal>
                <article className="group overflow-hidden rounded-2xl bg-stone lg:rounded-[1.75rem]">
                  <Link
                    href={`/${project.slug}`}
                    className="relative flex aspect-[4/5] items-end overflow-hidden sm:aspect-[16/10] lg:aspect-[21/9]"
                    aria-label={`Ver ${project.name}`}
                  >
                    <Image
                      src={project.heroImage}
                      alt={project.imageAlt}
                      fill
                      sizes="(max-width: 1152px) 100vw, 1152px"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                    <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
                      <StatusBadge status={getProjectStatus(project)} />
                    </div>

                    <div className="relative p-6 text-white sm:p-10 lg:p-12">
                      <p className="text-[11px] font-medium tracking-[0.28em] text-white/85 uppercase">
                        {project.place}
                      </p>
                      <h3 className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                        <span className="font-serif text-6xl leading-[0.9] font-medium tracking-[0.06em] uppercase sm:text-7xl lg:text-[5.5rem]">
                          {project.name}
                        </span>
                        <span className="sr-only"> — </span>
                        <span
                          className="hidden h-16 w-px bg-white/60 sm:block"
                          aria-hidden
                        />
                        <span className="max-w-[16ch] font-serif text-xl leading-[1.15] font-medium tracking-wide sm:text-2xl lg:text-[1.9rem]">
                          {project.tagline}
                        </span>
                      </h3>
                    </div>
                  </Link>

                  <div className="grid items-center gap-8 px-6 py-8 sm:px-10 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:px-12">
                    <div className="lg:col-span-5">
                      <p className="text-sm leading-relaxed font-light text-neutral-500 sm:leading-7">
                        {project.summary}
                      </p>
                      <FinancingLine project={project} />
                      <Availability project={project} className="mt-4" />
                    </div>

                    <dl className="grid grid-cols-3 border-y border-neutral-200 py-5 lg:col-span-4 lg:border-y-0 lg:py-0">
                      {[
                        {
                          prefix: "desde",
                          value: `${project.area.from} m²`,
                          label: "Por espacio",
                        },
                        { value: "+ m²", label: "Amplíalo a tu medida" },
                        ...project.highlights,
                      ].map((item, index) => (
                        <div
                          key={item.label}
                          className={`flex flex-col-reverse justify-end px-1 text-center ${index > 0 ? "border-l border-neutral-200" : ""}`}
                        >
                          <dt className="mt-1 text-[10px] font-medium tracking-[0.18em] text-neutral-400 uppercase">
                            {item.label}
                          </dt>
                          <dd className="font-serif text-xl font-semibold whitespace-nowrap text-foreground sm:text-2xl">
                            {"prefix" in item ? (
                              <span className="mr-1 font-sans text-[11px] font-light text-neutral-500">
                                {item.prefix}
                              </span>
                            ) : null}
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-3 lg:flex-col lg:items-stretch lg:gap-3">
                      <Link
                        href={`/${project.slug}`}
                        className="inline-flex items-center justify-center bg-accent px-7 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors hover:bg-accent-hover"
                      >
                        Ver proyecto
                      </Link>
                      <a
                        href={SITE.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center border border-foreground/80 px-7 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-foreground uppercase transition-colors hover:bg-foreground hover:text-white"
                      >
                        Agendar visita
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FinancingLine({ project }: { project: ActiveProject }) {
  const financing = getFinancing(project);

  return (
    <p className="mt-4 text-[11px] font-semibold tracking-[0.16em] text-foreground uppercase">
      <span className="font-serif text-lg tracking-normal text-accent normal-case">
        Desde {formatUsd(financing.monthly)}/mes
      </span>{" "}
      · {financing.downPaymentPercent}% de inicial · sin intereses
    </p>
  );
}
