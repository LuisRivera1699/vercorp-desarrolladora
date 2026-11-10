import type { Metadata } from "next";
import NewProjectForm from "@/components/admin/projects/NewProjectForm";

export const metadata: Metadata = { title: "Nuevo proyecto" };

export default function AdminNewProjectPage() {
  return <NewProjectForm />;
}
