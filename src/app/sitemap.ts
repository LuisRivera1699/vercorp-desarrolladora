import type { MetadataRoute } from "next";
import { ACTIVE_PROJECTS } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...ACTIVE_PROJECTS.map((project) => ({
      url: `${SITE.url}/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
