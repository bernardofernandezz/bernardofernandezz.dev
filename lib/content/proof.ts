export interface ApproachPoint {
  readonly title: string
  readonly detail: string
}

export const approach: readonly ApproachPoint[] = [
  {
    title: "Vague in, defined out",
    detail:
      "Most projects start as 'we need a system for this'. I like taking something that sounds vague and turning it into something we can define, build and ship — scope first, code second.",
  },
  {
    title: "The system behind the interface",
    detail:
      "I care about what happens after the demo: data models, APIs, failure states, migrations and performance — because the software has to survive its first version.",
  },
  {
    title: "Ownership end to end",
    detail:
      "I don't stop at the component. Deployment, observability and what happens when the first real user does something unexpected are part of the job, not someone else's ticket.",
  },
  {
    title: "Design as part of engineering",
    detail:
      "Typography, hierarchy and rhythm are how the system shows its quality — I treat them with the same rigor as the data model, not as decoration on top.",
  },
]

export interface StackGroup {
  readonly area: string
  readonly items: readonly string[]
}

export const stack: readonly StackGroup[] = [
  { area: "Interface", items: ["React", "Next.js", "TypeScript"] },
  { area: "Backend", items: ["Node.js", "NestJS", "Java", "Go"] },
  { area: "Data", items: ["PostgreSQL", "Prisma", "TypeORM", "Supabase"] },
  { area: "Infrastructure", items: ["Docker", "Kubernetes", "Grafana"] },
]

export const currentlyExploring: readonly string[] = [
  "Distributed systems — the patterns behind reliable services",
  "Go for backend services and tooling",
  "Kubernetes and the operational side of running software",
  "Observability — metrics and traces that explain production behavior",
]
