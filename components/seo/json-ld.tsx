import { siteConfig } from "@/lib/config/site"
import { localePath, type Locale } from "@/lib/i18n/config"

function absolute(locale: Locale, path: string): string {
  return `${siteConfig.url}${localePath(locale, path)}`
}

function person(locale: Locale) {
  return {
    "@type": "Person",
    name: siteConfig.name,
    url: absolute(locale, "/"),
    sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
    jobTitle:
      locale === "pt-br" ? "Desenvolvedor de software" : "Software developer",
    homeLocation: {
      "@type": "Country",
      name: locale === "pt-br" ? "Brasil" : "Brazil",
    },
  }
}

export function PersonJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    ...person(locale),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd({
  locale,
  slug,
  title,
  summary,
  date,
}: {
  locale: Locale
  slug: string
  title: string
  summary: string
  date: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: summary,
    datePublished: date,
    url: absolute(locale, `/writing/${slug}`),
    inLanguage: locale === "pt-br" ? "pt-BR" : "en",
    author: person(locale),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ProjectJsonLd({
  locale,
  slug,
  name,
  tagline,
  summary,
}: {
  locale: Locale
  slug: string
  name: string
  tagline: string
  summary: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${name} — ${tagline}`,
    description: summary,
    url: absolute(locale, `/work/${slug}`),
    inLanguage: locale === "pt-br" ? "pt-BR" : "en",
    creator: person(locale),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
