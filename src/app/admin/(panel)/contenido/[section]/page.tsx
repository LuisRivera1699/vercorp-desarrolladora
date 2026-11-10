import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionEditor from "@/components/admin/home/SectionEditor";
import { SECTIONS } from "@/lib/home/constants";

type Props = { params: Promise<{ section: string }> };

function findSection(id: string) {
  return SECTIONS.find((section) => section.id === id);
}

export function generateStaticParams() {
  return SECTIONS.map((section) => ({ section: section.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const section = findSection((await params).section);
  return { title: section ? section.label : "Contenido" };
}

export default async function AdminSectionPage({ params }: Props) {
  const section = findSection((await params).section);
  if (!section) notFound();

  return <SectionEditor section={section} />;
}
