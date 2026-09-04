import type { MetadataRoute } from "next"
import { getProjects } from "@/lib/content/projects"
import { getArticles } from "@/lib/content/articles"
import { siteConfig } from "@/lib/config/site"
import { localePath, locales } from "@/lib/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/about", "/writing", "/start-a-project"]

  const staticRoutes: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${siteConfig.url}${localePath("en", path)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path === "/start-a-project" ? 0.9 : 0.7,
    alternates: {
      languages: {
        en: `${siteConfig.url}${localePath("en", path)}`,
        "pt-BR": `${siteConfig.url}${localePath("pt-br", path)}`,
      },
    },
  }))

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      url: `${siteConfig.url}${localePath(locale, `/work/${project.slug}`)}`,
      lastModified: new Date(project.year),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  )

  const articleRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      url: `${siteConfig.url}${localePath(locale, `/writing/${article.slug}`)}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly",
      priority: 0.5,
    })),
  )

  return [...staticRoutes, ...projectRoutes, ...articleRoutes]
}
