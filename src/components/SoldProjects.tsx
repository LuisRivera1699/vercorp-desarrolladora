import Image from "next/image";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SOLD_PROJECTS, TOTAL_SOLD_LOTS } from "@/lib/projects";

const formatArea = (n: number) => n.toLocaleString("en-US");

export default function SoldProjects() {
  return (
    <section
      id="entregados"
      className="scroll-mt-16 bg-white px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 md:py-28 lg:py-32"
      aria-labelledby="sold-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <Reveal>
            <SectionHeading
              id="sold-heading"
              align="left"
              eyebrow="Proyectos entregados"
              title="Espacios que hoy ya son hogares"
              description="Cada uno de estos condominios en Huaypo, en el Valle Sagrado, se vendió por completo. Hoy son patrimonio de familias e inversionistas que confiaron en Vercorp."
            />
          </Reveal>

          <Reveal delay={120}>
            <dl className="flex shrink-0 gap-10 md:pb-2">
              <div>
                <dt className="text-[10px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
                  Espacios vendidos
                </dt>
                <dd className="mt-1 font-serif text-4xl font-semibold text-accent">
                  {TOTAL_SOLD_LOTS}+
                </dd>
              </div>
              <div className="border-l border-neutral-200 pl-10">
                <dt className="text-[10px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
                  Proyectos
                </dt>
                <dd className="mt-1 font-serif text-4xl font-semibold text-accent">
                  {SOLD_PROJECTS.length}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {SOLD_PROJECTS.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={(index % 3) * 100}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200 lg:rounded-3xl">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale-[55%] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/5" />

                  <SoldSeal />

                  <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-[10px] font-medium tracking-[0.28em] text-white/70 uppercase">
                      {project.district}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl leading-tight font-semibold tracking-wide text-white uppercase sm:text-[1.7rem]">
                      {project.name}
                    </h3>
                    <div className="mt-4 flex items-center gap-4 border-t border-white/20 pt-4 text-[11px] font-medium tracking-[0.16em] text-white/80 uppercase">
                      <span>{project.totalLots} espacios</span>
                      <span className="h-3 w-px bg-white/30" aria-hidden />
                      <span>{formatArea(project.areaM2)} m²</span>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SoldSeal() {
  return (
    <div
      className="absolute top-5 right-5 flex h-[4.5rem] w-[4.5rem] rotate-[-12deg] flex-col items-center justify-center rounded-full border border-white/60 bg-black/20 text-white backdrop-blur-sm transition-transform duration-500 group-hover:rotate-0 sm:top-6 sm:right-6"
      aria-label="100% vendido"
    >
      <span className="font-serif text-xl leading-none font-semibold">100%</span>
      <span className="mt-1 text-[8px] font-semibold tracking-[0.22em] uppercase">
        Vendido
      </span>
    </div>
  );
}
