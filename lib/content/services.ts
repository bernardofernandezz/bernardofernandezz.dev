export interface ServiceSituation {
  readonly id: string
  readonly situation: string
  readonly response: string
  readonly examples: readonly string[]
}

export const services: readonly ServiceSituation[] = [
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
