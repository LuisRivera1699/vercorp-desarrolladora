import { createElement } from "react";
import { reactAttrs } from "@/lib/projects/svg";
import type { Project, SvgAsset } from "@/lib/projects/types";

/** Dibuja un logo o icono subido en el admin, del color del texto (`currentColor`). */
export function VectorAsset({
  asset,
  className = "",
  title,
}: {
  asset: SvgAsset;
  className?: string;
  /** Sin título, el gráfico es decorativo y se oculta a lectores de pantalla. */
  title?: string;
}) {
  return (
    <svg
      viewBox={asset.viewBox}
      fill="currentColor"
      className={className}
      {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })}
    >
      {asset.shapes.map((shape, index) =>
        createElement(shape.tag, { key: index, ...reactAttrs(shape.attrs) }),
      )}
    </svg>
  );
}

export default function ProjectLogo({
  project,
  className = "",
}: {
  project: Pick<Project, "name" | "logo">;
  className?: string;
}) {
  if (project.logo) {
    return <VectorAsset asset={project.logo} title={project.name} className={className} />;
  }
  return <span className={className}>{project.name}</span>;
}

export function ProjectMark({
  asset,
  className = "",
}: {
  asset: SvgAsset | null;
  className?: string;
}) {
  return asset ? <VectorAsset asset={asset} className={className} /> : null;
}
