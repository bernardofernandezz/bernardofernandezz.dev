export interface Service {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly examples: readonly string[]
}

export const services: readonly Service[] = [
  {
    id: "digital-experiences",
    title: "Websites & digital experiences",
    description:
      "Sites that carry a brand and convert visitors — where typography, speed and clarity are treated as engineering requirements, not decoration.",
    examples: ["Company sites", "Landing pages", "Portfolios", "Editorial platforms"],
  },
  {
    id: "web-applications",
    title: "Web applications",
    description:
      "Complete products with real domain logic: accounts, data models, permissions, dashboards — built to be maintained, not just launched.",
    examples: ["SaaS products", "Customer portals", "Booking systems", "Marketplaces"],
  },
  {
    id: "mvp-products",
    title: "MVPs & products from scratch",
    description:
      "Turn an idea into a working product people can use — with the discipline to build the smallest thing that tests the real hypothesis.",
    examples: ["Idea validation", "Product launches", "Founder-led builds"],
  },
  {
    id: "automation-tools",
    title: "Automation & internal tools",
    description:
      "Replace spreadsheets, group chats and copy-paste with systems that give your team one reliable place to run the operation.",
    examples: ["Operations dashboards", "Workflow automation", "Admin panels", "Integrations"],
  },
  {
    id: "architecture",
    title: "Technical architecture",
    description:
      "Structure for products that exist but hurt: data models, APIs, performance and infrastructure decisions that unblock growth instead of slowing it.",
    examples: ["API design", "Database modeling", "Performance work", "Technical audits"],
  },
]
