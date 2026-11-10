import Reveal from "@/components/Reveal";
import { sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";
import { bodyClass, BrandedPhoto, Eyebrow, titleClass } from "./shared";

export default function Location({ project }: { project: Project }) {
  const { location } = project;
  const { style } = location;

  return (
    <section
      id="ubicacion"
      className="scroll-mt-16 bg-s-bg px-5 py-20 text-s-fg sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      style={sectionVars({
        bg: style.bg,
        fg: style.fg,
        accent: style.accent,
        "on-photo": style.photoLogo,
      })}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:order-2 lg:col-span-6">
          <Eyebrow mark={project.mark}>{location.eyebrow}</Eyebrow>
          <h2 className={titleClass}>{location.title}</h2>
          <h3 className="mt-8 text-lg font-medium">{location.place}</h3>
          <p className={`mt-2 ${bodyClass}`}>{location.description}</p>
          {location.distances.length ? (
            <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-s-fg/15 pt-7">
              {location.distances.map((item) => (
                <div key={item.id} className="flex flex-col-reverse justify-end">
                  <dt className="mt-2 text-[13px] leading-snug font-light text-s-fg/65">
                    {item.label}
                  </dt>
                  <dd className="text-4xl font-extralight tracking-[-0.02em] sm:text-5xl">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {location.motto ? (
            <p className="mt-9 text-[13px] font-light text-s-fg/60 italic">{location.motto}</p>
          ) : null}
        </Reveal>

        <Reveal delay={120} className="lg:order-1 lg:col-span-6">
          <BrandedPhoto
            project={project}
            image={location.image}
            overlay={style.overlay}
            className="aspect-[4/3]"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
        </Reveal>
      </div>
    </section>
  );
}
