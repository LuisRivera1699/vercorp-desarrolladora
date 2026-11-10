import type { Metadata } from "next";
import BackingEditor from "@/components/admin/projects/BackingEditor";

export const metadata: Metadata = { title: "Respaldo del holding" };

export default function AdminBackingPage() {
  return <BackingEditor />;
}
