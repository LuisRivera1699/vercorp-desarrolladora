import type { Metadata } from "next";
import ProjectList from "@/components/admin/projects/ProjectList";

export const metadata: Metadata = { title: "Proyectos" };

export default function AdminProjectsPage() {
  return <ProjectList />;
}
