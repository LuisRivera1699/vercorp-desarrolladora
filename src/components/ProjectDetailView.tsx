import Backing from "@/components/project/Backing";
import Benefits from "@/components/project/Benefits";
import Growth from "@/components/project/Growth";
import Hero from "@/components/project/Hero";
import Intro from "@/components/project/Intro";
import Location from "@/components/project/Location";
import LotPlan from "@/components/project/LotPlan";
import Purchase from "@/components/project/Purchase";
import ProjectContactForm from "@/components/ProjectContactForm";
import type { NavItem } from "@/components/ProjectHeader";
import type { Backing as BackingContent, Project } from "@/lib/projects/types";

/** Secciones con entrada en el menú, en el orden de la página. */
export function projectNav(project: Project): NavItem[] {
  const { intro, location, growth, lotPlan, purchase } = project;
  return [
    { section: intro, href: "#proyecto" },
    { section: location, href: "#ubicacion" },
    { section: growth, href: "#inversion" },
    { section: lotPlan, href: "#plano" },
    { section: purchase, href: "#compra" },
  ]
    .filter(({ section }) => section.visible && section.navLabel.trim())
    .map(({ section, href }) => ({ label: section.navLabel, href }));
}

export default function ProjectDetailView({
  project,
  backing,
}: {
  project: Project;
  backing: BackingContent;
}) {
  return (
    <>
      <Hero project={project} />
      {project.intro.visible ? <Intro project={project} /> : null}
      {project.location.visible ? <Location project={project} /> : null}
      {project.benefits.visible ? <Benefits project={project} /> : null}
      {project.growth.visible ? <Growth project={project} /> : null}
      {project.lotPlan.visible ? <LotPlan project={project} /> : null}
      {project.purchase.visible ? <Purchase project={project} /> : null}
      {project.backing.visible ? <Backing project={project} content={backing} /> : null}
      {project.contact.visible ? <ProjectContactForm project={project} /> : null}
    </>
  );
}
