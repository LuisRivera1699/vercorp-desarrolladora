import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import ProjectDetailView from "@/components/ProjectDetailView";
import ProjectFooter from "@/components/ProjectFooter";
import ProjectHeader from "@/components/ProjectHeader";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ACTIVE_PROJECTS, getActiveProject } from "@/lib/projects";

export const dynamicParams = false;

export const viewport: Viewport = {
  themeColor: "#26161f",
};

export function generateStaticParams() {
  return ACTIVE_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getActiveProject(slug);
  if (!project) return {};

  const title = `${project.name} — ${project.tagline}`;
  const image = {
    url: project.ogImage,
    width: 1200,
    height: 630,
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
  const project = getActiveProject(slug);
  if (!project) notFound();

  return (
    <div className={`${project.theme} flex flex-1 flex-col`}>
      <ProjectHeader project={project} />
      <main>
        <ProjectDetailView project={project} />
      </main>
      <ProjectFooter project={project} />
      <WhatsAppButton
        message={`Hola, quiero información sobre ${project.name}, en ${project.place}.`}
        hoverClassName="hover:bg-accent-soft hover:text-foreground"
      />
    </div>
  );
}
