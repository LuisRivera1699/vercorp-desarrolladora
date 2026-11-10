import Image from "next/image";
import Reveal from "@/components/Reveal";
import { overlayGradient } from "@/lib/projects/constants";
import { sectionVars } from "@/lib/projects/theme";
import type { Project } from "@/lib/projects/types";
import { bodyClass, CornerMark, Eyebrow, titleClass } from "./shared";

export default function Growth({ project }: { project: Project }) {
  const { growth } = project;
  const { style } = growth;

  return (
    <section
      id="inversion"
      className="relative scroll-mt-16 bg-s-bg px-5 py-20 text-s-fg sm:scroll-mt-20 sm:px-8 sm:py-24 lg:py-32"
      style={sectionVars({
        bg: style.bg,
        fg: style.fg,
        accent: style.accent,
        "on-photo": style.cardFg,
      })}
    >
      <CornerMark mark={project.mark} />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow mark={project.mark}>{growth.eyebrow}</Eyebrow>
          <h2 className={`${titleClass} max-w-3xl`}>{growth.title}</h2>
          {growth.description ? (
            <p className={`mt-5 max-w-xl ${bodyClass}`}>{growth.description}</p>
          ) : null}
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {growth.items.map((item, index) => (
            <li key={item.id}>
              <Reveal
                delay={index * 90}
                className="group relative isolate flex aspect-[5/4] h-full flex-col justify-between overflow-hidden rounded-2xl p-6 text-s-on-photo sm:aspect-[3/4]"
              >
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 -z-10"
                  style={{ backgroundImage: overlayGradient(style.overlay) }}
                />
                <h3 className="text-[1.7rem] leading-[1.05] font-extralight tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed font-light text-s-on-photo/90">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
