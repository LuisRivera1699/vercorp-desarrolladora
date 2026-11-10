import type { Metadata } from "next";
import ProjectEditor from "@/components/admin/projects/ProjectEditor";

export const metadata: Metadata = { title: "Editar proyecto" };

export default async function AdminProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectEditor slug={slug} />;
}
