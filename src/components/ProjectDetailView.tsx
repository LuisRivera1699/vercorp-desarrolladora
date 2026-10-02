import Image from "next/image";
import Link from "next/link";
import ImageLightbox from "@/components/ImageLightbox";
import LandIcon from "@/components/LandIcon";
import ParallaxImage from "@/components/ParallaxImage";
import ProjectContactForm from "@/components/ProjectContactForm";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import {
  getOtherActiveProjects,
  type ActiveProject,
  type LandIconId,
} from "@/lib/projects";

const STEP_ICONS: LandIconId[] = ["calendar", "location", "legal"];

export default function ProjectDetailView({
  project,
}: {
  project: ActiveProject;
}) {
  const others = getOtherActiveProjects(project.slug);
  const { manifesto, overview, location, lotPlan, attractions, backing } =
    project;

  return (
    <>
      {/* Portada */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-ink px-5 pt-28 pb-14 sm:px-8 sm:pt-32 sm:pb-16 md:pb-20">
        <Image
          src={project.heroImage}
          alt={project.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />

        <div className="animate-hero-in relative z-10 mx-auto w-full max-w-6xl">
          <nav
            aria-label="Ruta de navegación"
            className="text-[10px] font-medium tracking-[0.28em] text-white/60 uppercase sm:text-[11px]"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Inicio
            </Link>
            <span className="mx-2.5">/</span>
            <Link
              href="/#en-venta"
              className="transition-colors hover:text-white"
            >
              En venta
            </Link>
            <span className="mx-2.5">/</span>
            <span className="text-white/90">{project.name}</span>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <StatusBadge status={project.status} tone="dark" />
            <p className="text-[11px] font-medium tracking-[0.28em] text-white/80 uppercase">
              {project.place}
            </p>
          </div>

          <h1 className="mt-6 flex flex-col gap-4 text-white sm:flex-row sm:items-center sm:gap-8">
            <span className="font-serif text-[4.5rem] leading-[0.9] font-medium tracking-[0.06em] uppercase sm:text-[6.5rem] lg:text-[8rem]">
              {project.name}
            </span>
            <span className="sr-only"> — </span>
            <span
              className="hidden h-24 w-px bg-white/60 sm:block lg:h-28"
              aria-hidden
            />
            <span className="h-px w-16 bg-white/60 sm:hidden" aria-hidden />
            <span className="max-w-[16ch] font-serif text-2xl leading-[1.15] font-medium tracking-wide sm:text-3xl lg:text-[2.6rem]">
              {project.tagline}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-relaxed font-light text-white/85 sm:text-base">
            {project.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#visita"
              className="inline-flex items-center justify-center bg-accent px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors hover:bg-accent-hover sm:px-10"
            >
              Agendar visita
            </a>
            <a
              href="#comprar"
              className="inline-flex items-center justify-center border border-white/80 px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-white hover:text-foreground sm:px-10"
            >
              Quiero comprar
            </a>
          </div>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="relative overflow-hidden bg-ink">
        <ParallaxImage src={manifesto.image.src} alt={manifesto.image.alt} />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 md:py-32 lg:py-40">
          <Reveal>
            <p className="font-serif text-[1.75rem] leading-[1.25] font-medium text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.2]">
              {manifesto.lead}
            </p>
            <span
              className="mx-auto mt-10 block h-px w-20 bg-accent"
              aria-hidden
            />
            <blockquote className="mx-auto mt-10 max-w-2xl space-y-4 text-sm leading-relaxed font-light text-white/80 sm:text-[0.95rem] sm:leading-8">
              {manifesto.quote.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* El proyecto */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="El proyecto"
              title={overview.title}
              description={overview.description}
            />
          </Reveal>

          <div className="lg:col-span-7">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {project.facts.map((fact, index) => (
                <li key={fact.label}>
                  <Reveal
                    delay={index * 90}
                    className="h-full rounded-2xl bg-stone px-4 py-7 sm:px-7 sm:py-9 lg:rounded-3xl"
                  >
                    <p className="font-serif text-[1.65rem] leading-none font-semibold tracking-wide whitespace-nowrap text-accent sm:text-[2.6rem]">
                      {fact.value}
                    </p>
                    <p className="mt-3 text-[10px] font-medium tracking-[0.2em] text-neutral-500 uppercase sm:text-[11px]">
                      {fact.label}
                    </p>
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[12px] leading-relaxed text-neutral-400">
              {overview.disclaimer}
            </p>
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="bg-stone px-5 py-16 sm:px-8 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Ubicación"
              title={location.title}
            />
            <dl className="mt-10 divide-y divide-neutral-300/70 border-y border-neutral-300/70">
              {location.distances.map((item) => (
                <div
                  key={item.value}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <dt className="font-serif text-2xl leading-tight font-semibold tracking-wide text-foreground sm:w-[45%] sm:shrink-0 sm:text-[1.7rem]">
                    {item.value}
                  </dt>
                  <dd className="text-sm leading-relaxed font-light text-neutral-500">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={120}>
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl lg:rounded-3xl">
                <Image
                  src={location.image.src}
                  alt={location.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase backdrop-blur-sm">
                  Vista desde {project.name}
                </span>
              </div>
              <ul className="mt-3 grid grid-cols-3 gap-3">
                {location.neighbor.images.map((image) => (
                  <li
                    key={image.src}
                    className="relative aspect-square overflow-hidden rounded-xl"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 33vw, 180px"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
              <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-serif text-lg font-semibold tracking-wide text-foreground uppercase">
                  {location.neighbor.title}
                </span>
                <span className="text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
                  {location.neighbor.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Plano de lotización */}
      <section
        id="plano"
        className="scroll-mt-16 bg-white px-5 py-16 sm:scroll-mt-20 sm:px-8 sm:py-20 md:py-28"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Plano de lotización"
              title={`${project.lots.areas.length} lotes, cada uno con su propia vista`}
              description={lotPlan.description}
            />
            <p className="mt-9 text-[11px] font-semibold tracking-[0.24em] text-foreground uppercase">
              Cada lote cuenta con
            </p>
            <ul className="mt-5 space-y-4">
              {lotPlan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3.5 text-sm leading-relaxed text-neutral-600"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href="#comprar"
              className="mt-10 inline-flex items-center justify-center bg-accent px-8 py-3.5 text-[11px] font-semibold tracking-[0.22em] text-white uppercase transition-colors hover:bg-accent-hover"
            >
              Elegir mi lote
            </a>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <ImageLightbox
              src={lotPlan.image}
              alt={lotPlan.alt}
              width={lotPlan.width}
              height={lotPlan.height}
              label="Ampliar plano de lotización"
              className="rounded-2xl bg-stone p-5 sm:p-8 lg:rounded-3xl"
            >
              <div className="relative mx-auto aspect-[5/7] w-full max-w-md">
                <Image
                  src={lotPlan.image}
                  alt={lotPlan.alt}
                  fill
                  sizes="(max-width: 1024px) 90vw, 520px"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <span className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[10px] font-semibold tracking-[0.2em] text-foreground uppercase shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-colors group-hover:bg-accent group-hover:text-white sm:top-5 sm:right-5">
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
        </div>
      </section>

      {/* Atractivos */}
      <section className="bg-stone px-5 py-16 sm:px-8 sm:py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="El entorno"
              title={`Atractivos de ${project.name}`}
              description={attractions.intro}
            />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-5">
            {attractions.items.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={index * 100}
                  className="h-full rounded-2xl bg-white p-7 transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] sm:p-8 lg:rounded-3xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 text-accent">
                    <LandIcon id={item.icon} />
                  </div>
                  <h3 className="mt-6 font-serif text-xl leading-tight font-semibold tracking-wide text-foreground uppercase sm:text-[1.35rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed font-light text-neutral-500">
                    {item.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Respaldo de Vercorp */}
      <section className="relative overflow-hidden bg-ink px-5 py-16 sm:px-8 sm:py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <SectionHeading
                align="left"
                tone="light"
                eyebrow="Respaldo de Vercorp"
                title={backing.title}
              />
              <div className="mt-6 space-y-4 text-sm leading-relaxed font-light text-white/70 sm:text-[0.95rem] sm:leading-8">
                {backing.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120} className="lg:col-span-6">
              <ul className="grid h-[340px] grid-cols-5 grid-rows-2 gap-3 sm:h-[420px]">
                {backing.images.map((image, index) => (
                  <li
                    key={image.src}
                    className={`relative overflow-hidden rounded-xl lg:rounded-2xl ${
                      index === 0 ? "col-span-3 row-span-2" : "col-span-2"
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 60vw, 360px"
                      className="object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <ul className="mt-14 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 md:mt-20 md:grid-cols-3 md:gap-8">
            {backing.pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Reveal delay={index * 100}>
                  <p className="font-serif text-3xl font-semibold tracking-wide text-accent uppercase sm:text-4xl">
                    {pillar.title}
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed font-light text-white/65">
                    {pillar.description}
                  </p>
                  {pillar.href ? (
                    <a
                      href={pillar.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-[11px] font-semibold tracking-[0.22em] text-white uppercase underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      Conocer {pillar.title} →
                    </a>
                  ) : null}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proceso de compra */}
      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              eyebrow="Proceso de compra"
              title="Tres pasos, del interés a la escritura pública"
            />
          </Reveal>
          <ol className="relative mt-14 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-3 md:gap-8">
            <span
              className="absolute top-12 right-[16.66%] left-[16.66%] hidden h-px border-t border-dashed border-accent/50 md:block"
              aria-hidden
            />
            {project.purchaseSteps.map((step, index) => (
              <li key={step.title}>
                <Reveal
                  delay={index * 120}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-white text-accent [&>svg]:h-9 [&>svg]:w-9">
                    <LandIcon id={STEP_ICONS[index] ?? "title"} />
                  </div>
                  <p className="mt-6 font-serif text-4xl font-semibold text-accent/60">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-serif text-xl font-semibold tracking-wide text-foreground uppercase sm:text-[1.35rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed font-light text-neutral-500 sm:leading-7">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProjectContactForm project={project} />

      {others.length > 0 ? (
        <section className="border-t border-neutral-200 bg-white px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-center text-[11px] font-medium tracking-[0.28em] text-neutral-400 uppercase">
              Otros proyectos en venta
            </p>
            <ul
              className={`mx-auto mt-8 grid grid-cols-1 gap-6 ${
                others.length > 1 ? "max-w-4xl md:grid-cols-2" : "max-w-xl"
              }`}
            >
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/${other.slug}`}
                    className="group relative block aspect-[16/10] overflow-hidden rounded-2xl lg:rounded-3xl"
                  >
                    <Image
                      src={other.heroImage}
                      alt={other.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute top-5 left-5">
                      <StatusBadge status={other.status} />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-[10px] font-medium tracking-[0.28em] text-white/70 uppercase">
                        {other.place}
                      </p>
                      <p className="mt-2 font-serif text-2xl font-semibold tracking-wide text-white uppercase transition-colors group-hover:text-accent sm:text-3xl">
                        {other.name} →
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
