import { cache } from "react";
import { fetchCollection } from "@/lib/firestoreRest";
import {
  BACKING_DOC,
  BACKING_TAG,
  PROJECTS_PATH,
  PROJECTS_TAG,
  SHARED_PATH,
} from "./constants";
import { DEFAULT_BACKING } from "./defaults";
import type { Backing, Project } from "./types";

/** Proyectos publicados, en el orden definido en el admin. */
export const getProjects = cache(async (): Promise<Project[]> => {
  const documents = await fetchCollection(PROJECTS_PATH, PROJECTS_TAG, "los proyectos");
  return documents
    .map((doc) => doc.data as Project)
    .filter((project) => project.published)
    .sort((a, b) => a.order - b.order);
});

export async function getProject(slug: string) {
  return (await getProjects()).find((project) => project.slug === slug);
}

export const getBacking = cache(async (): Promise<Backing> => {
  const documents = await fetchCollection(SHARED_PATH, BACKING_TAG, "el respaldo del holding");
  const backing = documents.find((doc) => doc.id === BACKING_DOC)?.data as Backing | undefined;
  return backing ?? DEFAULT_BACKING;
});
