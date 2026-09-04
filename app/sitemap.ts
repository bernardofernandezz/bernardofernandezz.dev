import type { MetadataRoute } from "next"
import { getProjects } from "@/lib/content/projects"
import { getArticles } from "@/lib/content/articles"
import { siteConfig } from "@/lib/config/site"
import { localePath, locales } from "@/lib/i18n/config"

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/work", "/about", "/writing", "/now", "/start-a-project"]

  // Both locales as primary URLs. No lastModified on static routes —
  // "always today" would defeat change detection; content routes below
  // carry real dates.
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteConfig.url}${localePath(locale, path)}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : path === "/start-a-project" ? 0.9 : 0.7,
      alternates: {
        languages: {
          en: `${siteConfig.url}${localePath("en", path)}`,
          "pt-BR": `${siteConfig.url}${localePath("pt-br", path)}`,
        },
      },
    })),
  )

  const projectRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getProjects(locale).map((project) => ({
      url: `${siteConfig.url}${localePath(locale, `/work/${project.slug}`)}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${siteConfig.url}${localePath("en", `/work/${project.slug}`)}`,
          "pt-BR": `${siteConfig.url}${localePath("pt-br", `/work/${project.slug}`)}`,
        },
      },
    })),
  )

  const articleRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      url: `${siteConfig.url}${localePath(locale, `/writing/${article.slug}`)}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${siteConfig.url}${localePath("en", `/writing/${article.slug}`)}`,
          "pt-BR": `${siteConfig.url}${localePath("pt-br", `/writing/${article.slug}`)}`,
        },
      },
    })),
  )

  return [...staticRoutes, ...projectRoutes, ...articleRoutes]
}
