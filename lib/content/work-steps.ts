import type { Locale } from "@/lib/i18n/config"

export interface WorkStep {
  readonly number: string
  readonly title: string
  readonly description: string
}

const EN: readonly WorkStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We figure out what you're actually trying to solve — the first request rarely names the real problem.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Scope in writing: what gets built, in what order, and what 'done' means — so there's no ambiguity to hide in later.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I'd rather show you a rough working version in week one than a plan. Working software early, decisions based on what exists.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Performance, edge cases and failure states — the details that decide whether software survives real usage.",
  },
  {
    number: "05",
    title: "Ship",
    description:
      "Deployed, documented and handed over so you're not dependent on me to keep it alive.",
  },
]

const PT_BR: readonly WorkStep[] = [
  {
    number: "01",
    title: "Entender",
    description:
      "A gente descobre o que você está realmente tentando resolver — o primeiro pedido raramente nomeia o problema real.",
  },
  {
    number: "02",
    title: "Definir",
    description:
      "Escopo por escrito: o que será construído, em que ordem e o que significa 'pronto' — pra não ter ambiguidade onde se esconder depois.",
  },
  {
    number: "03",
    title: "Construir",
    description:
      "Prefiro te mostrar uma versão funcional grosseira na primeira semana do que um plano. Software funcionando cedo, decisões baseadas no que existe.",
  },
  {
    number: "04",
    title: "Refinar",
    description:
      "Performance, casos de borda e estados de falha — os detalhes que decidem se o software sobrevive ao uso real.",
  },
  {
    number: "05",
    title: "Entregar",
    description:
      "No ar, documentado e passado adiante — pra você não ficar dependente de mim pra manter vivo.",
  },
]

export function getWorkSteps(locale: Locale): readonly WorkStep[] {
  return locale === "pt-br" ? PT_BR : EN
}
