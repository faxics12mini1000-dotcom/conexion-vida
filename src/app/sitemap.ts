import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/** Sitio de una sola página: las secciones son anclas, no URLs indexables. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
