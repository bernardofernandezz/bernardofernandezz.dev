import type { Locale } from "@/lib/i18n/config"

export interface ServiceSituation {
  readonly id: string
  readonly situation: string
  readonly response: string
  readonly examples: readonly string[]
}

const EN: readonly ServiceSituation[] = [
  {
    id: "idea-to-product",
    situation: "I have an idea, but I don't know where to start.",
    response:
      "MVP and product development — we cut the idea to the smallest version worth building, then I take it from scope to data model to something people can use.",
    examples: ["MVP development", "Product launches", "Prototypes that survive contact with users"],
  },
  {
    id: "web-applications",
    situation: "We need a real application, not another landing page.",
    response:
      "Web applications with real domain logic — accounts, data models, permissions, workflows — built to be maintained, not just demoed.",
    examples: ["SaaS products", "Customer portals", "Booking systems", "Marketplaces"],
  },
  {
    id: "architecture",
    situation: "The product works, but the codebase is becoming the problem.",
    response:
      "Architecture and refactoring: data models, APIs, type safety and performance — structural work that makes the next six features cheap instead of terrifying.",
    examples: ["API design", "Database modeling", "Performance work", "Technical audits"],
  },
]

const PT_BR: readonly ServiceSituation[] = [
  {
    id: "idea-to-product",
    situation: "Tenho uma ideia, mas não sei por onde começar.",
    response:
      "Desenvolvimento de MVP e produto: a gente corta a ideia até a menor versão que vale construir, e eu levo do escopo ao modelo de dados até algo que dá pra usar de verdade.",
    examples: ["Desenvolvimento de MVP", "Lançamentos de produto", "Protótipos que sobrevivem ao contato com usuários"],
  },
  {
    id: "web-applications",
    situation: "A gente precisa de uma aplicação de verdade, não de mais uma landing page.",
    response:
      "Aplicações web com lógica de domínio real — contas, modelos de dados, permissões, fluxos — feitas pra durar, não só pra demonstrar.",
    examples: ["Produtos SaaS", "Portais de clientes", "Sistemas de reserva", "Marketplaces"],
  },
  {
    id: "architecture",
    situation: "O produto funciona, mas o código virou o problema.",
    response:
      "Arquitetura e refatoração: modelos de dados, APIs, type safety e performance — trabalho estrutural que torna os próximos seis recursos baratos em vez de assustadores.",
    examples: ["Desenho de APIs", "Modelagem de dados", "Trabalho de performance", "Auditoria técnica"],
  },
]

export const services: Record<Locale, readonly ServiceSituation[]> = {
  en: EN,
  "pt-br": PT_BR,
}
