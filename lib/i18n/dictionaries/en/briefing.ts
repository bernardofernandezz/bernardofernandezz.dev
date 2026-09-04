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
    { value: "website", label: "A website" },
    { value: "web-app", label: "A web application" },
    { value: "mvp", label: "A product idea" },
    { value: "automation", label: "To automate something" },
    { value: "architecture", label: "Technical or architecture help" },
    { value: "other", label: "Something else" },
  ],
  websiteKind: [
    { value: "company", label: "Company website" },
    { value: "landing", label: "Landing page" },
    { value: "portfolio", label: "Portfolio" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "other", label: "Something else" },
  ],
  audience: [
    { value: "customers", label: "My customers or users" },
    { value: "team", label: "My team or company" },
    { value: "myself", label: "Myself" },
    { value: "public", label: "The general public" },
    { value: "unsure", label: "Not sure yet" },
  ],
  stage: [
    { value: "idea", label: "It's an idea" },
    { value: "prototype", label: "I have a prototype" },
    { value: "mvp", label: "There's an MVP" },
    { value: "existing-product", label: "It's an existing product" },
    { value: "scaling", label: "It's growing / scaling" },
  ],
  timeline: [
    { value: "asap", label: "As soon as possible" },
    { value: "1-3-months", label: "Next 1–3 months" },
    { value: "3-6-months", label: "Next 3–6 months" },
    { value: "6-months-plus", label: "In 6 months or more" },
    { value: "flexible", label: "I'm flexible" },
  ],
  budget: [
    { value: "unsure", label: "Not sure yet" },
    { value: "under-1k", label: "Under $1k" },
    { value: "1k-3k", label: "$1k – $3k" },
    { value: "3k-7k", label: "$3k – $7k" },
    { value: "7k-plus", label: "$7k or more" },
  ],
}

export const briefing = {
  metaDescription:
    "Tell me what you're trying to build. A short guided briefing — enough to understand the direction of your project before we talk.",
  intro: {
    eyebrow: "Start a project",
    title: "Have something worth building?",
    body:
      "Tell me about it. A few short questions — enough for me to understand the direction of your project before we even talk.",
    button: "Let's begin",
    note: "Takes about two minutes. No commitment.",
  },
  progress: {
    back: "Back",
    ariaLabel: (current: number, total: number) =>
      `Briefing progress: step ${current} of ${total}`,
  },
  steps: {
    intent: {
      kicker: "Let's start simple.",
      question: "What are you trying to build?",
    },
    intentDetail: {
      website: {
        kicker: "Got it.",
        question: "What kind of website?",
        hint: "Pick the closest one — details can come later.",
      },
      "web-app": {
        kicker: "Got it.",
        question: "What should it do for your users?",
        hint: "A couple of sentences is enough.",
      },
      mvp: {
        kicker: "Love it.",
        question: "Tell me about the idea.",
        hint: "A couple of sentences is enough.",
      },
      automation: {
        kicker: "Got it.",
        question: "What currently takes too much time?",
        hint: "A couple of sentences is enough.",
      },
      architecture: {
        kicker: "Got it.",
        question: "What's hurting right now?",
        hint: "A couple of sentences is enough.",
      },
      other: {
        kicker: "Curious.",
        question: "Tell me a little about it.",
        hint: "A couple of sentences is enough.",
      },
    },
    problem: {
      kicker: "The important part.",
      hint: "Rough is fine — this just gives me direction.",
      questions: {
        website: "What should the website achieve for you?",
        "web-app": "What problem are you trying to solve?",
        mvp: "What problem does the product solve?",
        automation: "What would “solved” look like?",
        architecture: "What would a good outcome look like?",
        other: "What problem are you trying to solve?",
      },
    },
    audience: {
      kicker: "Context.",
      question: "Who is this for?",
    },
    stage: {
      kicker: "Where you are.",
      question: "Where does the project stand today?",
    },
    timeline: {
      kicker: "Timing.",
      question: "When would you like to start?",
    },
    budget: {
      kicker: "One last thing...",
      question: "Do you already have a budget in mind?",
      hint: "A range is enough — it just helps me propose the right approach.",
    },
    contact: {
      kicker: "Almost there.",
      question: "Where can I reach you?",
      hint: "No newsletters, no spam — just a reply about your project.",
      nameLabel: "Your name",
      emailLabel: "Email",
      namePlaceholder: "Ana Silva",
      emailPlaceholder: "ana@company.com",
    },
  },
  options,
  summary: {
    title: "I think I understand the direction.",
    titleSuffix: "Here's what I got:",
    edit: "Edit",
    lead: "Sounds interesting. Let's talk about it.",
    send: "Send project",
    sending: "Sending...",
  },
  confirmation: {
    thanks: (name: string) => `Thanks, ${name}.`,
    body:
      "I have everything I need to understand the direction of your project. I'll get back to you soon.",
    backHome: "Back to the site",
  },
  labels: {
    project: "Project",
    goal: "Goal",
    audience: "Audience",
    stage: "Stage",
    timeline: "Timeline",
    budget: "Budget",
    contact: "Contact",
  },
  choicesLegend: "Options",
  next: "Next",
  textPlaceholder: "A couple of sentences is enough...",
}

export type Briefing = typeof briefing
