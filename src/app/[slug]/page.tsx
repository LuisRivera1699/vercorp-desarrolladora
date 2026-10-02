import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProjectDetailView from "@/components/ProjectDetailView";
import { ACTIVE_PROJECTS, getActiveProject } from "@/lib/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return ACTIVE_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getActiveProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.subtitle}`,
    description: project.summary,
    alternates: { canonical: `/${project.slug}` },
    openGraph: {
      title: `${project.name} | ${project.tagline}`,
      description: project.summary,
      images: [{ url: project.heroImage, alt: project.imageAlt }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const project = getActiveProject(slug);
  if (!project) notFound();

  return (
    <>
      <Header />
      <main>
        <ProjectDetailView project={project} />
      </main>
      <Footer />
    </>
  );
}
