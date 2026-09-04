import type { Locale } from "@/lib/i18n/config"
import { en, type Dictionary } from "@/lib/i18n/dictionaries/en"
import { ptBR } from "@/lib/i18n/dictionaries/pt-br"

export type { Dictionary }

const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  "pt-br": ptBR,
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale]
}
