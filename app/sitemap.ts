import type { MetadataRoute } from "next"
import { projects } from "@/lib/content/projects"
import { articles } from "@/lib/content/articles"
import { siteConfig } from "@/lib/config/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/writing", priority: 0.7 },
    { path: "/start-a-project", priority: 0.9 },
  ].map(({ path, priority }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/work/${project.slug}`,
    lastModified: new Date(project.year),
    changeFrequency: "yearly",
    priority: 0.6,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteConfig.url}/writing/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }))

  return [...staticRoutes, ...projectRoutes, ...articleRoutes]
}
