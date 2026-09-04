export interface ExperienceEntry {
  readonly period: string
  readonly title: string
  readonly context: string
  readonly description: string
}

/*
 * Placeholder entries — replace with your real trajectory.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    period: "2022 — Now",
    title: "Independent software developer",
    context: "Freelance & consulting",
    description:
      "Building web applications, internal tools and digital experiences for founders and companies — from first brief to deployed product.",
  },
  {
    period: "2020 — 2022",
    title: "Product engineer",
    context: "SaaS startup",
    description:
      "Owned features end to end across a product used daily by operations teams: data modeling, APIs, interfaces and the decisions in between.",
  },
  {
    period: "2018 — 2020",
    title: "Web developer",
    context: "Digital agency",
    description:
      "Delivered client websites and e-commerce builds, learning how design, performance and deadlines interact in the real world.",
  },
  {
    period: "2014 — 2018",
    title: "Computer science",
    context: "University",
    description:
      "Algorithms, systems, databases — and the discovery that building products is what I wanted to do with it.",
  },
]

export interface Capability {
  readonly title: string
  readonly detail: string
}

export const capabilities: readonly Capability[] = [
  {
    title: "Product thinking",
    detail: "Every technical decision starts from the question of what the software is for.",
  },
  {
    title: "Design sensibility",
    detail: "Typography, hierarchy and rhythm as part of the engineering, not after it.",
  },
  {
    title: "Full-stack range",
    detail: "From data model to interface — one person, no translation losses.",
  },
  {
    title: "Ownership",
    detail: "I take problems, not tickets. From ambiguity to deployed, working software.",
  },
]
