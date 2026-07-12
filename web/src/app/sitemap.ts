import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { courses } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/academy", priority: 0.9, freq: "weekly" },
    { path: "/services/ecommerce", priority: 0.9, freq: "monthly" },
    { path: "/services/software-development", priority: 0.9, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "monthly" },
  ];

  const courseRoutes = courses.map((c) => ({
    path: `/academy/${c.slug}`,
    priority: 0.7,
    freq: "monthly" as const,
  }));

  return [...staticRoutes, ...courseRoutes].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
