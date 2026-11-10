import Reveal from "@/components/Reveal";
import { sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";
import { CornerMark, Eyebrow, PhotoCardGrid, titleClass } from "./shared";

export default function Benefits({ project }: { project: Project }) {
  const { benefits } = project;
  const { style, activities } = benefits;

  return (
    <section
      id="beneficios"
      className="relative scroll-mt-16 bg-s-bg px-5 py-20 text-s-fg sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      style={sectionVars({ bg: style.bg, fg: style.fg, accent: style.accent })}
    >
      <CornerMark mark={project.mark} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow mark={project.mark}>{benefits.eyebrow}</Eyebrow>
          <h2 className={`${titleClass} max-w-3xl`}>{benefits.title}</h2>
        </Reveal>
        <PhotoCardGrid items={benefits.items} />

        {activities.visible && activities.items.length ? (
          <>
            <Reveal className="mt-20 sm:mt-24">
              <h3 className="text-3xl font-extralight tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
                {activities.title}
              </h3>
            </Reveal>
            <PhotoCardGrid items={activities.items} />
          </>
        ) : null}
      </div>
    </section>
  );
}
