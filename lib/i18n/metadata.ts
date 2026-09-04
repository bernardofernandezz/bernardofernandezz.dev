import type { Metadata } from "next"
import { siteConfig } from "@/lib/config/site"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import {
  alternatesFor,
  localePath,
  openGraphLocale,
  type Locale,
} from "@/lib/i18n/config"

export function rootMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.common.siteTitle,
      template: `%s — ${siteConfig.name}`,
    },
    description: dict.common.siteDescription,
    alternates: {
      canonical: localePath(locale, "/"),
      languages: {
        en: "/",
        "pt-BR": "/pt-br",
      },
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale[locale],
      url: localePath(locale, "/"),
      siteName: siteConfig.name,
      title: dict.common.siteTitle,
      description: dict.common.siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.common.siteTitle,
      description: dict.common.siteDescription,
    },
  }
}

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const alternates = alternatesFor(locale, path)

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      locale: openGraphLocale[locale],
      url: localePath(locale, path),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}
