import type { Locale } from "@/lib/i18n/config"

export interface NowData {
  readonly updatedAt: string
  readonly building: readonly string[]
  readonly learning: readonly string[]
  readonly exploring: readonly string[]
  readonly thinking: readonly string[]
}

const EN: NowData = {
  updatedAt: "2026-09",
  building: [
    "This site — the iteration you're looking at, plus whatever breaks next week",
    "Small experiments around the briefing experience",
  ],
  learning: [
    "Go, deeper than tutorials allow",
    "Kubernetes from the operator's side, not just the consumer's",
  ],
  exploring: [
    "Distributed systems — how services actually stay reliable, not just in diagrams",
    "Observability — making production behavior explainable",
  ],
  thinking: [
    "When does a data model earn its complexity?",
    "Why do most internal tools fail socially before they fail technically?",
    "What would a type system look like if it were designed for domain modeling first?",
  ],
}

const PT_BR: NowData = {
  updatedAt: "2026-09",
  building: [
    "Este site — a próxima iteração que você está olhando",
    "Pequenos experimentos em volta da experiência de briefing",
  ],
  learning: [
    "Go, mais a fundo do que os tutoriais vão",
    "Kubernetes pelo lado de quem opera, não só de quem consome",
  ],
  exploring: [
    "Sistemas distribuídos — como serviços realmente continuam confiáveis, não só nos diagramas",
    "Observabilidade — tornar o comportamento em produção explicável",
  ],
  thinking: [
    "Quando um modelo de dados merece a própria complexidade?",
    "Por que a maioria das ferramentas internas falha socialmente antes de falhar tecnicamente?",
    "Como seria um sistema de tipos desenhado primeiro para modelagem de domínio?",
  ],
}

export function getNow(locale: Locale): NowData {
  return locale === "pt-br" ? PT_BR : EN
}
