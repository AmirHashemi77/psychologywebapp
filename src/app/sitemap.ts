import type { MetadataRoute } from "next";

import { articles } from "@/data/articles";
import { toAbsoluteUrl } from "@/lib/siteUrl";

export const revalidate = 86400; // 1 day

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: toAbsoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: toAbsoluteUrl("/aboutus"), changeFrequency: "monthly", priority: 0.7 },
    { url: toAbsoluteUrl("/services"), changeFrequency: "monthly", priority: 0.7 },
    { url: toAbsoluteUrl("/international-treatment"), changeFrequency: "monthly", priority: 0.7 },
    { url: toAbsoluteUrl("/contactus"), changeFrequency: "yearly", priority: 0.6 },
    { url: toAbsoluteUrl("/articles"), changeFrequency: "weekly", priority: 0.8 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: toAbsoluteUrl(`/article/${article.id}`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const lastModified = new Date();
  return [...staticRoutes, ...articleRoutes].map((item) => ({ ...item, lastModified }));
}
