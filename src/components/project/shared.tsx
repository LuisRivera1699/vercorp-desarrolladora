import Image from "next/image";
import type { ReactNode } from "react";
import ProjectLogo, { ProjectMark } from "@/components/ProjectLogo";
import Reveal from "@/components/Reveal";
import { bottomShade } from "@/lib/projects/constants";
import type { CmsImage, Overlay, PhotoItem, Project, SvgAsset } from "@/lib/projects/types";

export const titleClass =
  "text-[2.15rem] leading-[1.06] font-extralight tracking-[-0.02em] text-balance sm:text-5xl lg:text-[3.5rem]";
export const bodyClass =
  "text-[15px] leading-relaxed font-light text-s-fg/75 sm:text-base sm:leading-8";

/** Antetítulo con el icono del proyecto. `tone="light"` es el de las secciones oscuras. */
export function Eyebrow({
  children,
  mark,
  tone = "dark",
}: {
  children: ReactNode;
  mark: SvgAsset | null;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`mb-5 flex items-center gap-2.5 text-sm font-normal ${
        tone === "light" ? "text-s-fg/75" : "text-s-fg/70"
      }`}
    >
      <ProjectMark asset={mark} className="h-2.5 w-3 text-s-accent" />
      {children}
    </p>
  );
}

export function CornerMark({ mark }: { mark: SvgAsset | null }) {
  return (
    <ProjectMark
      asset={mark}
      className="pointer-events-none absolute top-10 right-6 hidden w-16 text-s-fg/80 sm:block lg:top-14 lg:right-12 lg:w-20"
    />
  );
}

/** Foto con sombra en la base y el logo del proyecto encima. */
export function BrandedPhoto({
  project,
  image,
  overlay,
  className,
  sizes,
}: {
  project: Pick<Project, "name" | "logo">;
  image: CmsImage;
  overlay: Overlay;
  className: string;
  sizes: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl lg:rounded-3xl ${className}`}>
      <Image src={image.url} alt={image.alt} fill sizes={sizes} className="object-cover" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{ backgroundImage: bottomShade(overlay) }}
      />
      <ProjectLogo
        project={project}
        className="absolute bottom-5 left-5 h-6 w-auto text-s-on-photo sm:bottom-6 sm:left-6 sm:h-7"
      />
    </div>
  );
}

export function PhotoCardGrid({ items }: { items: PhotoItem[] }) {
  return (
    <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-12 lg:grid-cols-4 lg:gap-x-5">
      {items.map((item, index) => (
        <li key={item.id}>
          <Reveal delay={index * 80}>
            <figure className="group">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:rounded-2xl">
                <Image
                  src={item.image.url}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 280px"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption className="mt-3.5 text-center text-[13px] leading-snug font-light text-s-fg/80 sm:text-sm">
                {item.title}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
