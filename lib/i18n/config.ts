export const locales = ["en", "pt-br"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const htmlLang: Record<Locale, string> = {
  en: "en",
  "pt-br": "pt-BR",
}

export const openGraphLocale: Record<Locale, string> = {
  en: "en_US",
  "pt-br": "pt_BR",
}

export const languageLabel: Record<Locale, string> = {
  en: "EN",
  "pt-br": "PT",
}

const LOCALE_PREFIX: Record<Locale, string> = {
  en: "",
  "pt-br": "/pt-br",
}

export function localePath(locale: Locale, path: string): string {
  const prefix = LOCALE_PREFIX[locale]
  if (!prefix) return path
  return `${prefix}${path === "/" ? "" : path}`
}

export interface LocaleAlternates {
  canonical: string
  languages: Record<string, string>
}

export function alternatesFor(locale: Locale, path: string): LocaleAlternates {
  return {
    canonical: localePath(locale, path),
    languages: {
      en: localePath("en", path),
      "pt-BR": localePath("pt-br", path),
    },
  }
}

export function switchLocalePath(pathname: string, target: Locale): string {
  const hasPrefix = pathname.startsWith("/pt-br")
  const withoutPrefix = hasPrefix ? pathname.slice("/pt-br".length) || "/" : pathname
  return localePath(target, withoutPrefix)
}
