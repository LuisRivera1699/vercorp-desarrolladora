import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import ProjectDetailView, { projectNav } from "@/components/ProjectDetailView";
import ProjectFooter from "@/components/ProjectFooter";
import ProjectHeader from "@/components/ProjectHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getBacking, getProject, getProjects } from "@/lib/projects/fetch";
import { themeVars } from "@/lib/projects/theme";

export async function generateStaticParams() {
  return (await getProjects()).map((project) => ({ slug: project.slug }));
}

export async function generateViewport({ params }: PageProps<"/[slug]">): Promise<Viewport> {
  const { slug } = await params;
  const project = await getProject(slug);
  return project ? { themeColor: project.palette.ink } : {};
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.tagline}`;
  const source = project.ogImage ?? project.hero.image;
  const image = {
    url: source.url,
    width: project.ogImage ? 1200 : source.width,
    height: project.ogImage ? 630 : source.height,
    alt: `${project.name}, ${project.tagline.toLowerCase()} · ${project.place}`,
  };

  return {
    title,
    description: project.summary,
    alternates: { canonical: `/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      url: `/${project.slug}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
      images: [image.url],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const [project, backing] = await Promise.all([getProject(slug), getBacking()]);
  if (!project) notFound();

  return (
    <div className="project-theme flex flex-1 flex-col" style={themeVars(project)}>
      <ProjectHeader project={project} nav={projectNav(project)} header={project.header} />
      <main>
        <ProjectDetailView project={project} backing={backing} />
      </main>
      <ProjectFooter project={project} />
      <WhatsAppButton message={project.whatsapp.message} colors={project.whatsapp.style} />
    </div>
  );
}
