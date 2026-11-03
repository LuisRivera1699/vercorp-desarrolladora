import { KillaLogo } from "@/components/KillaLogo";
import type { ActiveProject } from "@/lib/projects";

export default function ProjectLogo({
  project,
  className = "",
}: {
  project: Pick<ActiveProject, "slug" | "name">;
  className?: string;
}) {
  if (project.slug === "killa") {
    return <KillaLogo className={className} title={project.name} />;
  }
  return <span className={className}>{project.name}</span>;
}
