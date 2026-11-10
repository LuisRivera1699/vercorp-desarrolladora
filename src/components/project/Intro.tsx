import Reveal from "@/components/Reveal";
import { getAvailability } from "@/lib/projects";
import { fillTotal } from "@/lib/projects/constants";
import { sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";
import { bodyClass, BrandedPhoto, Eyebrow, titleClass } from "./shared";

export default function Intro({ project }: { project: Project }) {
  const { intro } = project;
  const { style } = intro;
  const availability = getAvailability(project);
  const facts = [
    { id: "area", value: `${project.pricing.areaFrom} m²`, label: intro.areaLabel },
    {
      id: "available",
      value: String(availability.available),
      label: fillTotal(intro.availableLabel, availability.total),
    },
    ...intro.facts,
  ];

  return (
    <section
      id="proyecto"
      className="scroll-mt-16 bg-s-bg px-5 py-20 text-s-fg sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      style={sectionVars({
        bg: style.bg,
        fg: style.fg,
        accent: style.accent,
        card: style.bg,
        "on-photo": style.photoLogo,
      })}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <Eyebrow mark={project.mark}>{intro.eyebrow}</Eyebrow>
          <h2 className={titleClass}>{intro.title}</h2>
          <div className={`mt-7 space-y-4 ${bodyClass}`}>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.id}>{paragraph.text}</p>
            ))}
          </div>
          {intro.note ? (
            <p className="mt-6 text-lg font-extralight text-s-fg italic sm:text-xl">{intro.note}</p>
          ) : null}

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-s-fg/10 ring-1 ring-s-fg/10">
            {facts.map((fact) => (
              <div
                key={fact.id}
                className="flex flex-col-reverse justify-end bg-s-card px-5 py-6 sm:px-6"
              >
                <dt className="mt-2 text-[13px] leading-snug font-light text-s-fg/60">
                  {fact.label}
                </dt>
                <dd className="text-3xl font-extralight tracking-[-0.02em] whitespace-nowrap sm:text-4xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          {intro.disclaimer ? (
            <p className="mt-4 text-[12px] leading-relaxed font-light text-s-fg/50">
              {intro.disclaimer}
            </p>
          ) : null}
        </Reveal>

        <Reveal delay={120} className="lg:col-span-6">
          <BrandedPhoto
            project={project}
            image={intro.image}
            overlay={style.overlay}
            className="aspect-[4/5]"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </Reveal>
      </div>
    </section>
  );
}
