import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ImageLightbox from "@/components/ImageLightbox";
import { KillaMark } from "@/components/KillaLogo";
import ProjectContactForm from "@/components/ProjectContactForm";
import ProjectLogo from "@/components/ProjectLogo";
import Reveal from "@/components/Reveal";
import {
  financingExample,
  formatUsd,
  getAvailability,
  getFinancing,
  getProjectStatus,
  STATUS_LABEL,
  type ActiveProject,
  type Photo,
} from "@/lib/projects";
const titleClass =
  "text-[2.15rem] leading-[1.06] font-extralight tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.5rem]";
const bodyClass =
  "text-[15px] leading-relaxed font-light text-foreground/75 sm:text-base sm:leading-8";

export default function ProjectDetailView({
  project,
}: {
  project: ActiveProject;
}) {
  const financing = getFinancing(project);
  const availability = getAvailability(project);
  const { intro, location, growth, lotPlan, backing } = project;

  return (
    <>
      {/* Portada */}
      <section
        id="top"
        className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-background"
      >
        <Image
          src={project.heroImage}
          alt={project.imageAlt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/25 to-ink/85" />

        <div className="animate-hero-in flex flex-1 flex-col items-center justify-center px-5 pt-24 pb-10 text-center sm:pt-28">
          <Link
            href="/"
            className="flex flex-col items-center gap-2 text-[11px] font-light text-background/70 transition-opacity hover:opacity-80"
          >
            Un proyecto de
            <Image
              src="/brand/vercorp-desarrolladora-logo.png"
              alt="Vercorp Desarrolladora"
              width={900}
              height={291}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <h1
            className="mt-12 sm:mt-14"
            aria-label={`${project.name} — ${project.tagline}`}
          >
            <ProjectLogo
              project={project}
              className="mx-auto w-[min(76vw,34rem)] text-background"
            />
          </h1>
          <p className="mt-8 text-lg font-light sm:mt-10 sm:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-1.5 text-sm font-light text-background/70 sm:text-base">
            {project.place}
          </p>
        </div>

        <div className="animate-hero-in relative mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8 sm:pb-10 [animation-delay:150ms]">
          <div className="flex flex-col items-center gap-5 border-t border-background/20 pt-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/10 px-3.5 py-1.5 text-[12px] font-medium ring-1 ring-background/25 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
                {STATUS_LABEL[getProjectStatus(project)]}
              </span>
              <p className="text-sm font-light text-background/85">
                <span className="block text-xl font-normal text-background sm:inline sm:text-2xl">
                  Desde {formatUsd(financing.monthly)}/mes
                </span>
                <span className="mx-2 hidden text-background/40 sm:inline">·</span>
                {financing.downPaymentPercent}% de inicial ·{" "}
                {financing.installments} cuotas sin intereses
              </p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
              <a
                href="#visita"
                className="inline-flex h-12 items-center justify-center rounded-full bg-background px-7 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
              >
                Agendar visita
              </a>
              <a
                href="#comprar"
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium text-background ring-1 ring-background/60 transition-colors hover:bg-background hover:text-foreground"
              >
                Quiero comprar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Condominio */}
      <section
        id="proyecto"
        className="scroll-mt-16 px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <Eyebrow>El proyecto</Eyebrow>
            <h2 className={titleClass}>{intro.title}</h2>
            <div className={`mt-7 space-y-4 ${bodyClass}`}>
              {intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <p className="mt-6 text-lg font-extralight text-foreground italic sm:text-xl">
              {intro.note}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-foreground/10 ring-1 ring-foreground/10">
              {[
                {
                  value: `${project.area.from} m²`,
                  label: "Desde, por espacio. Amplíalo a tu medida",
                },
                {
                  value: String(availability.available),
                  label: `Disponibles de ${availability.total} espacios`,
                },
                ...project.facts,
              ].map((fact) => (
                <div
                  key={fact.label}
                  className="flex flex-col-reverse justify-end bg-background px-5 py-6 sm:px-6"
                >
                  <dt className="mt-2 text-[13px] leading-snug font-light text-foreground/60">
                    {fact.label}
                  </dt>
                  <dd className="text-3xl font-extralight tracking-[-0.02em] whitespace-nowrap sm:text-4xl">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[12px] leading-relaxed font-light text-foreground/50">
              {project.disclaimer}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6">
            <BrandedPhoto
              project={project}
              image={intro.image}
              className="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </Reveal>
        </div>
      </section>

      {/* Ubicación */}
      <section
        id="ubicacion"
        className="scroll-mt-16 bg-stone px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:order-2 lg:col-span-6">
            <Eyebrow>Ubicación</Eyebrow>
            <h2 className={titleClass}>{location.title}</h2>
            <h3 className="mt-8 text-lg font-medium">{location.place}</h3>
            <p className={`mt-2 ${bodyClass}`}>{location.description}</p>
            <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-foreground/15 pt-7">
              {location.distances.map((item) => (
                <div key={item.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 text-[13px] leading-snug font-light text-foreground/65">
                    {item.label}
                  </dt>
                  <dd className="text-4xl font-extralight tracking-[-0.02em] sm:text-5xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-9 text-[13px] font-light text-foreground/60 italic">
              {location.motto}
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:order-1 lg:col-span-6">
            <BrandedPhoto
              project={project}
              image={location.image}
              className="aspect-[4/3]"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </Reveal>
        </div>
      </section>

      {/* Beneficios y actividades */}
      <section
        id="beneficios"
        className="relative scroll-mt-16 px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      >
        <CornerMark />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Excelente oportunidad</Eyebrow>
            <h2 className={`${titleClass} max-w-3xl`}>
              Beneficios de tu nueva inversión
            </h2>
          </Reveal>
          <PhotoCardGrid items={project.benefits} />

          <Reveal className="mt-20 sm:mt-24">
            <h3 className="text-3xl font-extralight tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
              Actividades de la zona
            </h3>
          </Reveal>
          <PhotoCardGrid items={project.activities} />
        </div>
      </section>

      {/* Rentabilidad */}
      <section
        id="inversion"
        className="relative scroll-mt-16 bg-stone px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      >
        <CornerMark />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Rentabilidad</Eyebrow>
            <h2 className={`${titleClass} max-w-3xl`}>{growth.title}</h2>
            <p className={`mt-5 max-w-xl ${bodyClass}`}>{growth.description}</p>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
            {growth.items.map((item, index) => (
              <li key={item.title}>
                <Reveal
                  delay={index * 90}
                  className="group relative isolate flex aspect-[5/4] h-full flex-col justify-between overflow-hidden rounded-2xl p-6 text-background sm:aspect-[3/4]"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                    className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/85" />
                  <h3 className="text-[1.7rem] leading-[1.05] font-extralight tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed font-light text-background/90">
                    {item.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Plano de lotización */}
      <section
        id="plano"
        className="scroll-mt-16 px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <Reveal className="lg:col-span-7">
              <Eyebrow>Plano de lotización</Eyebrow>
              <h2 className={titleClass}>
                {availability.total} espacios, cada uno con su propia vista
              </h2>
              <p className={`mt-5 max-w-xl ${bodyClass}`}>
                {lotPlan.description}
              </p>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <p className="text-sm font-medium">Cada espacio cuenta con</p>
              <ul className="mt-4 space-y-3">
                {lotPlan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[15px] leading-relaxed font-light text-foreground/75"
                  >
                    <KillaMark className="mt-[0.45rem] h-2.5 w-3 shrink-0 text-earth" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="mt-12 lg:mt-14">
            <ImageLightbox
              src={lotPlan.image}
              alt={lotPlan.alt}
              width={lotPlan.width}
              height={lotPlan.height}
              label="Ampliar plano de lotización"
              className="overflow-hidden rounded-2xl bg-white/60 p-4 ring-1 ring-foreground/10 sm:p-8 lg:rounded-3xl lg:p-12"
            >
              <div className="pointer-events-none flex items-center gap-4 pb-4 sm:pb-6">
                <ProjectLogo project={project} className="h-7 w-auto text-[#380c0f] sm:h-10" />
              </div>
              <Image
                src={lotPlan.image}
                alt={lotPlan.alt}
                width={lotPlan.width}
                height={lotPlan.height}
                sizes="(max-width: 1152px) 100vw, 1100px"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
              />
              <span className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-foreground px-3.5 py-2 text-[12px] font-medium text-background transition-colors group-hover:bg-accent-hover sm:top-6 sm:right-6">
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
            <p className="flex items-center gap-2.5 text-[15px] font-light text-foreground/75">
              <span className="h-2 w-2 rounded-full bg-accent-soft ring-4 ring-accent-soft/30" />
              <span>
                <span className="font-normal text-foreground">
                  {availability.available} de {availability.total}
                </span>{" "}
                espacios disponibles
              </span>
            </p>
            <a
              href="#comprar"
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Elegir mi espacio
            </a>
          </Reveal>
        </div>
      </section>

      {/* Proceso de compra */}
      <section
        id="compra"
        className="relative scroll-mt-16 bg-stone px-5 py-20 sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      >
        <CornerMark />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow>Proceso de compra</Eyebrow>
            <h2 className={`${titleClass} max-w-3xl`}>
              Tres pasos, del interés a la escritura pública
            </h2>
          </Reveal>

          <ol className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
            {project.purchaseSteps.map((step, index) => (
              <li key={step.title}>
                <Reveal
                  delay={index * 110}
                  className="border-t border-foreground/20 pt-6"
                >
                  <p className="text-5xl font-extralight tracking-[-0.03em] text-earth">
                    {index + 1}.
                  </p>
                  <h3 className="mt-5 text-xl font-normal">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-[15px] leading-relaxed font-light text-foreground/70">
                    {step.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal className="mt-14 flex flex-col gap-6 rounded-2xl bg-background p-6 sm:p-8 md:flex-row md:items-center md:justify-between lg:rounded-3xl">
            <div>
              <p className="text-3xl font-extralight tracking-[-0.02em] sm:text-4xl">
                Desde {formatUsd(financing.monthly)}/mes
              </p>
              <p className="mt-1 text-[15px] font-light text-foreground/70">
                {financing.downPaymentPercent}% de inicial y{" "}
                {financing.installments} cuotas sin intereses
              </p>
              <p className="mt-3 max-w-xl text-[12px] leading-relaxed font-light text-foreground/50">
                {financingExample(financing)}
              </p>
            </div>
            <a
              href="#comprar"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-accent-hover"
            >
              Quiero comprar
            </a>
          </Reveal>
        </div>
      </section>

      {/* Respaldo del holding */}
      <section className="relative overflow-hidden bg-ink px-5 py-20 text-background sm:px-8 sm:py-24 lg:py-32">
        <CornerMark tone="light" />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Eyebrow tone="light">Respaldo del holding</Eyebrow>
            <h2 className={`${titleClass} max-w-3xl`}>{backing.title}</h2>
            <p className="mt-7 max-w-3xl text-[15px] leading-relaxed font-light text-background/75 sm:text-base sm:leading-8">
              {backing.about}
            </p>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
            {backing.pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Reveal
                  delay={index * 100}
                  className="border-t border-background/20 pt-6"
                >
                  <h3 className="text-lg font-normal">{pillar.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed font-light text-background/70">
                    {pillar.description}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-16 flex flex-col gap-6 border-t border-background/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <Image
              src="/brand/vercorp-desarrolladora-logo.png"
              alt="Vercorp Desarrolladora"
              width={900}
              height={291}
              className="h-10 w-auto self-start sm:h-11 sm:self-auto"
            />
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center self-start rounded-full px-7 text-sm font-medium ring-1 ring-background/50 transition-colors hover:bg-background hover:text-foreground sm:self-auto"
            >
              Ver todos sus proyectos
            </Link>
          </div>
        </div>
      </section>

      <ProjectContactForm project={project} />
    </>
  );
}

function Eyebrow({
  children,
  tone = "dark",
}: {
  children: ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`mb-5 flex items-center gap-2.5 text-sm font-normal ${
        tone === "light" ? "text-background/75" : "text-foreground/70"
      }`}
    >
      <KillaMark
        className={`h-2.5 w-3 ${tone === "light" ? "text-accent-soft" : "text-earth"}`}
      />
      {children}
    </p>
  );
}

function CornerMark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <KillaMark
      className={`pointer-events-none absolute top-10 right-6 hidden w-16 sm:block lg:top-14 lg:right-12 lg:w-20 ${
        tone === "light" ? "text-background/80" : "text-foreground/80"
      }`}
    />
  );
}

function BrandedPhoto({
  project,
  image,
  className,
  sizes,
}: {
  project: ActiveProject;
  image: Photo;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl lg:rounded-3xl ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
      <ProjectLogo
        project={project}
        className="absolute bottom-5 left-5 h-6 w-auto text-background sm:bottom-6 sm:left-6 sm:h-7"
      />
    </div>
  );
}

function PhotoCardGrid({ items }: { items: ActiveProject["benefits"] }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 lg:grid-cols-4 lg:gap-x-5">
      {items.map((item, index) => (
        <li key={item.title}>
          <Reveal delay={index * 80}>
            <figure className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:rounded-2xl">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3.5 text-center text-[13px] leading-snug font-light text-foreground/80 sm:text-sm">
                {item.title}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
