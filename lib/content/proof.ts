import type { Locale } from "@/lib/i18n/config"

export interface ApproachPoint {
  readonly title: string
  readonly detail: string
}

export interface StackGroup {
  readonly area: string
  readonly items: readonly string[]
}

export interface CuriosityArea {
  readonly title: string
  readonly detail: string
}

export interface Proof {
  readonly approach: readonly ApproachPoint[]
  readonly stack: readonly StackGroup[]
  readonly curiosities: readonly CuriosityArea[]
}

const EN: Proof = {
  curiosities: [
    {
      title: "Distributed systems",
      detail:
        "How reliable services actually stay reliable — consensus, failure modes, and the boring parts in between.",
    },
    {
      title: "Infrastructure & operations",
      detail:
        "Kubernetes, observability and the side of software that runs, not just the side that builds.",
    },
    {
      title: "Product engineering",
      detail:
        "The place where design decisions and engineering decisions turn out to be the same decision.",
    },
    {
      title: "Type systems",
      detail:
        "How far inference and modeling can go before they start getting in the way.",
    },
    {
      title: "Developer tooling",
      detail:
        "The tools that make the act of building feel better — I've built a few just to sharpen my own workflow.",
    },
  ],
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
  curiosities: [
    {
      title: "Sistemas distribuídos",
      detail:
        "Os padrões por trás de serviços que de fato continuam confiáveis — consenso, modos de falha e as partes chatas no meio.",
    },
    {
      title: "Infraestrutura e operação",
      detail:
        "Kubernetes, observabilidade e o lado do software que roda, não só o lado que aparece na tela.",
    },
    {
      title: "Product engineering",
      detail:
        "O lugar onde decisão de design e decisão técnica descobrem que são a mesma decisão.",
    },
    {
      title: "Sistemas de tipos",
      detail:
        "Até onde inferência e modelagem conseguem ir antes de começarem a atrapalhar.",
    },
    {
      title: "Developer tooling",
      detail:
        "As ferramentas que tornam o ato de construir melhor — já construí algumas só pra afiar meu próprio fluxo.",
    },
  ],
}

export function getProof(locale: Locale): Proof {
  return locale === "pt-br" ? PT_BR : EN
}
