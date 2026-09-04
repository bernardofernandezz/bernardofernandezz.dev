import type { Locale } from "@/lib/i18n/config"

export interface ApproachPoint {
  readonly title: string
  readonly detail: string
}

export interface StackGroup {
  readonly area: string
  readonly items: readonly string[]
}

interface Proof {
  readonly approach: readonly ApproachPoint[]
  readonly stack: readonly StackGroup[]
  readonly currentlyExploring: readonly string[]
}

const EN: Proof = {
  approach: [
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
  ],
  stack: [
    { area: "Interface", items: ["React", "Next.js", "TypeScript"] },
    { area: "Backend", items: ["Node.js", "NestJS", "Java", "Go"] },
    { area: "Data", items: ["PostgreSQL", "Prisma", "TypeORM", "Supabase"] },
    { area: "Infrastructure", items: ["Docker", "Kubernetes", "Grafana"] },
  ],
  currentlyExploring: [
    "Distributed systems — the patterns behind reliable services",
    "Go for backend services and tooling",
    "Kubernetes and the operational side of running software",
    "Observability — metrics and traces that explain production behavior",
  ],
}

const PT_BR: Proof = {
  approach: [
    {
      title: "Entra vago, sai definido",
      detail:
        "A maioria dos projetos começa com um 'precisamos de um sistema pra isso'. Gosto de pegar algo que ainda não tem forma e transformar em escopo, decisão e entrega — primeiro o problema, depois o código.",
    },
    {
      title: "O sistema por trás da interface",
      detail:
        "O que acontece depois do demo me interessa: modelo de dados, APIs, estados de erro, migrations e performance — porque o software precisa sobreviver à primeira versão.",
    },
    {
      title: "Dono de ponta a ponta",
      detail:
        "Eu não paro no componente. Deploy, observabilidade e o que fazer quando o primeiro usuário real faz algo inesperado fazem parte do trabalho — não são ticket de outra pessoa.",
    },
    {
      title: "Design como parte da engenharia",
      detail:
        "Tipografia, hierarquia e ritmo são como o sistema mostra a qualidade que tem por dentro — trato isso com o mesmo rigor do modelo de dados, não como enfeite por cima.",
    },
  ],
  stack: [
    { area: "Interface", items: ["React", "Next.js", "TypeScript"] },
    { area: "Backend", items: ["Node.js", "NestJS", "Java", "Go"] },
    { area: "Dados", items: ["PostgreSQL", "Prisma", "TypeORM", "Supabase"] },
    { area: "Infraestrutura", items: ["Docker", "Kubernetes", "Grafana"] },
  ],
  currentlyExploring: [
    "Sistemas distribuídos — os padrões por trás de serviços confiáveis",
    "Go para serviços e tooling de backend",
    "Kubernetes e o lado operacional de rodar software",
    "Observabilidade — métricas e traces que explicam o comportamento em produção",
  ],
}

export function getProof(locale: Locale): Proof {
  return locale === "pt-br" ? PT_BR : EN
}
