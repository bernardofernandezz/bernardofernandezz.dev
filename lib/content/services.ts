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
      "MVP and product development — we cut the idea to the smallest version worth building, then I take it from scope to data model to a product people can actually use.",
    examples: ["MVP development", "Product launches", "Prototypes that survive contact with users"],
  },
  {
    id: "web-applications",
    situation: "We need a real application, not another landing page.",
    response:
      "Web applications with actual domain logic — accounts, data models, permissions, workflows — built to be maintained after launch, not just demoed once.",
    examples: ["SaaS products", "Customer portals", "Booking systems", "Marketplaces"],
  },
  {
    id: "automation-tools",
    situation: "Our workflow lives in spreadsheets and group chats.",
    response:
      "I turn manual coordination into internal tools that give the team one reliable place to run the operation — dashboards, automations and integrations that fit how the work actually happens.",
    examples: ["Operations dashboards", "Workflow automation", "Admin panels", "Integrations"],
  },
  {
    id: "architecture",
    situation: "The product works, but the codebase is becoming the problem.",
    response:
      "Architecture and refactoring: data models, APIs, type safety and performance — structural work that makes the next six features cheap instead of terrifying.",
    examples: ["API design", "Database modeling", "Performance work", "Technical audits"],
  },
  {
    id: "end-to-end",
    situation: "I need someone technical who can actually own this.",
    response:
      "End-to-end product development: one person who moves between product decisions, design and implementation — no translation losses between what's decided and what's built.",
    examples: ["Founder-led builds", "Product engineering", "Zero-to-launch ownership"],
  },
]

const PT_BR: readonly ServiceSituation[] = [
  {
    id: "idea-to-product",
    situation: "Tenho uma ideia, mas não sei por onde começar.",
    response:
      "Desenvolvimento de MVP e produto: a gente corta a ideia até a menor versão que vale construir, e eu levo do escopo ao modelo de dados até um produto que dá pra usar de verdade.",
    examples: ["Desenvolvimento de MVP", "Lançamentos de produto", "Protótipos que sobrevivem ao contato com usuários"],
  },
  {
    id: "web-applications",
    situation: "A gente precisa de uma aplicação de verdade, não de mais uma landing page.",
    response:
      "Aplicações web com lógica de domínio real — contas, modelos de dados, permissões, fluxos — construídas pra serem mantidas depois do lançamento, não só demonstradas uma vez.",
    examples: ["Produtos SaaS", "Portais de clientes", "Sistemas de reserva", "Marketplaces"],
  },
  {
    id: "automation-tools",
    situation: "Nosso processo vive numa planilha e num grupo de WhatsApp.",
    response:
      "Eu transformo coordenação manual em ferramentas internas que dão ao time um lugar confiável de onde operar — dashboards, automações e integrações que se encaixam em como o trabalho acontece de verdade.",
    examples: ["Dashboards de operação", "Automação de fluxos", "Painéis de administração", "Integrações"],
  },
  {
    id: "architecture",
    situation: "O produto funciona, mas o código virou o problema.",
    response:
      "Arquitetura e refatoração: modelos de dados, APIs, type safety e performance — trabalho estrutural que torna os próximos seis recursos baratos em vez de assustadores.",
    examples: ["Desenho de APIs", "Modelagem de dados", "Trabalho de performance", "Auditoria técnica"],
  },
  {
    id: "end-to-end",
    situation: "Preciso de alguém técnico que realmente assuma isso.",
    response:
      "Desenvolvimento de produto ponta a ponta: uma pessoa que transita entre decisões de produto, design e implementação — sem perdas de tradução entre o que é decidido e o que é construído.",
    examples: ["Construção com fundadores", "Product engineering", "Do zero ao lançamento"],
  },
]

export const services: Record<Locale, readonly ServiceSituation[]> = {
  en: EN,
  "pt-br": PT_BR,
}
