import type { BriefOption } from "@/lib/briefing/types"
import type {
  Audience,
  BudgetRange,
  ProjectStage,
  ProjectType,
  Timeline,
  WebsiteKind,
} from "@/lib/briefing/types"

const options: {
  readonly intent: readonly BriefOption<ProjectType>[]
  readonly websiteKind: readonly BriefOption<WebsiteKind>[]
  readonly audience: readonly BriefOption<Audience>[]
  readonly stage: readonly BriefOption<ProjectStage>[]
  readonly timeline: readonly BriefOption<Timeline>[]
  readonly budget: readonly BriefOption<BudgetRange>[]
} = {
  intent: [
    { value: "website", label: "Um site" },
    { value: "web-app", label: "Uma aplicação web" },
    { value: "mvp", label: "Uma ideia de produto" },
    { value: "automation", label: "Automatizar algo" },
    { value: "architecture", label: "Ajuda técnica ou de arquitetura" },
    { value: "other", label: "Outra coisa" },
  ],
  websiteKind: [
    { value: "company", label: "Site institucional" },
    { value: "landing", label: "Landing page" },
    { value: "portfolio", label: "Portfólio" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "other", label: "Outra coisa" },
  ],
  audience: [
    { value: "customers", label: "Meus clientes ou usuários" },
    { value: "team", label: "Meu time ou empresa" },
    { value: "myself", label: "Eu mesmo" },
    { value: "public", label: "Público geral" },
    { value: "unsure", label: "Ainda não sei" },
  ],
  stage: [
    { value: "idea", label: "É uma ideia" },
    { value: "prototype", label: "Tenho um protótipo" },
    { value: "mvp", label: "Já existe um MVP" },
    { value: "existing-product", label: "É um produto existente" },
    { value: "scaling", label: "Está crescendo" },
  ],
  timeline: [
    { value: "asap", label: "O quanto antes" },
    { value: "1-3-months", label: "Próximos 1–3 meses" },
    { value: "3-6-months", label: "Próximos 3–6 meses" },
    { value: "6-months-plus", label: "Em 6 meses ou mais" },
    { value: "flexible", label: "Estou flexível" },
  ],
  budget: [
    { value: "unsure", label: "Ainda não sei" },
    { value: "under-1k", label: "Até R$5k" },
    { value: "1k-3k", label: "R$5k – R$15k" },
    { value: "3k-7k", label: "R$15k – R$35k" },
    { value: "7k-plus", label: "R$35k ou mais" },
  ],
}

export const briefing = {
  metaDescription:
    "Me conta o que você quer construir. Um briefing guiado e curto — o suficiente pra entender a direção do projeto antes de qualquer conversa.",
  intro: {
    eyebrow: "Começar um projeto",
    title: "Tem algo que vale a pena construir?",
    body:
      "Me conta. São algumas perguntas curtas — o suficiente pra eu entender a direção do projeto antes de qualquer conversa.",
    button: "Vamos lá",
    note: "Leva uns dois minutos. Sem compromisso.",
  },
  progress: {
    back: "Voltar",
    ariaLabel: (current: number, total: number) =>
      `Progresso do briefing: etapa ${current} de ${total}`,
  },
  steps: {
    intent: {
      kicker: "Vamos começar pelo simples.",
      question: "O que você está tentando construir?",
    },
    intentDetail: {
      website: {
        kicker: "Entendi.",
        question: "Que tipo de site?",
        hint: "Escolhe o mais próximo — os detalhes podem vir depois.",
      },
      "web-app": {
        kicker: "Entendi.",
        question: "O que ela deve fazer pros seus usuários?",
        hint: "Um ou dois parágrafos bastam.",
      },
      mvp: {
        kicker: "Adorei.",
        question: "Me conta da ideia.",
        hint: "Um ou dois parágrafos bastam.",
      },
      automation: {
        kicker: "Entendi.",
        question: "O que hoje toma tempo demais?",
        hint: "Um ou dois parágrafos bastam.",
      },
      architecture: {
        kicker: "Entendi.",
        question: "O que está doendo agora?",
        hint: "Um ou dois parágrafos bastam.",
      },
      other: {
        kicker: "Fiquei curioso.",
        question: "Me conta um pouco sobre isso.",
        hint: "Um ou dois parágrafos bastam.",
      },
    },
    problem: {
      kicker: "A parte importante.",
      hint: "Rascunhado está ótimo — isso só me dá direção.",
      questions: {
        website: "O que o site precisa alcançar pra você?",
        "web-app": "Qual problema você está tentando resolver?",
        mvp: "Qual problema o produto resolve?",
        automation: "O que seria “resolvido”?",
        architecture: "O que seria um bom desfecho?",
        other: "Qual problema você está tentando resolver?",
      },
    },
    audience: {
      kicker: "Contexto.",
      question: "Pra quem é isso?",
    },
    stage: {
      kicker: "Onde você está.",
      question: "Em que estágio o projeto está hoje?",
    },
    timeline: {
      kicker: "Prazo.",
      question: "Quando você quer começar?",
    },
    budget: {
      kicker: "Uma última coisa...",
      question: "Já tem um valor em mente?",
      hint: "Uma faixa já basta — só me orienta a propor o caminho certo.",
    },
    contact: {
      kicker: "Quase lá.",
      question: "Onde eu te encontro?",
      hint: "Sem newsletter, sem spam — só uma resposta sobre o seu projeto.",
      nameLabel: "Seu nome",
      emailLabel: "Email",
      namePlaceholder: "Ana Silva",
      emailPlaceholder: "ana@empresa.com",
    },
  },
  options,
  summary: {
    title: "Acho que entendi a direção.",
    titleSuffix: "O que eu anotei:",
    edit: "Editar",
    lead: "Parece interessante. Vamos conversar.",
    send: "Enviar projeto",
    sending: "Enviando...",
  },
  submitError:
    "Falta alguma resposta ou algo ficou inválido. Dá uma revisada e tenta de novo.",
  confirmation: {
    thanks: (name: string) => `Obrigado, ${name}.`,
    body:
      "Tenho tudo que preciso pra entender a direção do projeto. Respondo em breve.",
    backHome: "Voltar pro site",
  },
  labels: {
    project: "Projeto",
    goal: "Objetivo",
    audience: "Público",
    stage: "Estágio",
    timeline: "Prazo",
    budget: "Investimento",
    contact: "Contato",
  },
  choicesLegend: "Opções",
  next: "Próximo",
  textPlaceholder: "Um ou dois parágrafos bastam...",
}

export type Briefing = typeof briefing
