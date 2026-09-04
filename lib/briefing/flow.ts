import type {
  Audience,
  BriefAnswers,
  BudgetRange,
  ProjectBrief,
  ProjectStage,
  ProjectType,
  Timeline,
  WebsiteKind,
} from "@/lib/briefing/types"

export type BriefStepId =
  | "intent"
  | "intent-detail"
  | "problem"
  | "audience"
  | "stage"
  | "timeline"
  | "budget"
  | "contact"

export interface BriefOption<T extends string> {
  readonly value: T
  readonly label: string
}

export interface BriefStepPresentation {
  readonly kicker: string
  readonly question: string
  readonly hint?: string
}

export const INTENT_OPTIONS: readonly BriefOption<ProjectType>[] = [
  { value: "website", label: "A website" },
  { value: "web-app", label: "A web application" },
  { value: "mvp", label: "A product idea" },
  { value: "automation", label: "To automate something" },
  { value: "architecture", label: "Technical or architecture help" },
  { value: "other", label: "Something else" },
]

export const WEBSITE_KIND_OPTIONS: readonly BriefOption<WebsiteKind>[] = [
  { value: "company", label: "Company website" },
  { value: "landing", label: "Landing page" },
  { value: "portfolio", label: "Portfolio" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "other", label: "Something else" },
]

export const AUDIENCE_OPTIONS: readonly BriefOption<Audience>[] = [
  { value: "customers", label: "My customers or users" },
  { value: "team", label: "My team or company" },
  { value: "myself", label: "Myself" },
  { value: "public", label: "The general public" },
  { value: "unsure", label: "Not sure yet" },
]

export const STAGE_OPTIONS: readonly BriefOption<ProjectStage>[] = [
  { value: "idea", label: "It's an idea" },
  { value: "prototype", label: "I have a prototype" },
  { value: "mvp", label: "There's an MVP" },
  { value: "existing-product", label: "It's an existing product" },
  { value: "scaling", label: "It's growing / scaling" },
]

export const TIMELINE_OPTIONS: readonly BriefOption<Timeline>[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Next 1–3 months" },
  { value: "3-6-months", label: "Next 3–6 months" },
  { value: "6-months-plus", label: "In 6 months or more" },
  { value: "flexible", label: "I'm flexible" },
]

export const BUDGET_OPTIONS: readonly BriefOption<BudgetRange>[] = [
  { value: "unsure", label: "Not sure yet" },
  { value: "under-1k", label: "Under $1k" },
  { value: "1k-3k", label: "$1k – $3k" },
  { value: "3k-7k", label: "$3k – $7k" },
  { value: "7k-plus", label: "$7k or more" },
]

export const BRIEF_STEP_IDS: readonly BriefStepId[] = [
  "intent",
  "intent-detail",
  "problem",
  "audience",
  "stage",
  "timeline",
  "budget",
  "contact",
]

const INTENT_DETAIL_QUESTIONS: Record<ProjectType, BriefStepPresentation> = {
  website: {
    kicker: "Got it.",
    question: "What kind of website?",
  },
  "web-app": {
    kicker: "Got it.",
    question: "What should it do for your users?",
  },
  mvp: {
    kicker: "Love it.",
    question: "Tell me about the idea.",
  },
  automation: {
    kicker: "Got it.",
    question: "What currently takes too much time?",
  },
  architecture: {
    kicker: "Got it.",
    question: "What's hurting right now?",
  },
  other: {
    kicker: "Curious.",
    question: "Tell me a little about it.",
  },
}

const PROBLEM_QUESTIONS: Record<ProjectType, string> = {
  website: "What should the website achieve for you?",
  "web-app": "What problem are you trying to solve?",
  mvp: "What problem does the product solve?",
  automation: "What would 'solved' look like?",
  architecture: "What would a good outcome look like?",
  other: "What problem are you trying to solve?",
}

export function isWebsiteIntent(intent: ProjectType): boolean {
  return intent === "website"
}

export function getIntentDetailPresentation(intent: ProjectType): BriefStepPresentation {
  const base = INTENT_DETAIL_QUESTIONS[intent]
  return isWebsiteIntent(intent)
    ? { ...base, hint: "Pick the closest one — details can come later." }
    : { ...base, hint: "A couple of sentences is enough." }
}

export function getProblemPresentation(intent: ProjectType): BriefStepPresentation {
  return {
    kicker: "The important part.",
    question: PROBLEM_QUESTIONS[intent],
    hint: "Rough is fine — this just gives me direction.",
  }
}

export function getStepPresentation(
  stepId: BriefStepId,
  answers: BriefAnswers,
): BriefStepPresentation {
  switch (stepId) {
    case "intent":
      return {
        kicker: "Let's start simple.",
        question: "What are you trying to build?",
      }
    case "intent-detail":
      return getIntentDetailPresentation(answers.intent ?? "other")
    case "problem":
      return getProblemPresentation(answers.intent ?? "other")
    case "audience":
      return {
        kicker: "Context.",
        question: "Who is this for?",
      }
    case "stage":
      return {
        kicker: "Where you are.",
        question: "How far along are you?",
      }
    case "timeline":
      return {
        kicker: "Timing.",
        question: "When would you like to start?",
      }
    case "budget":
      return {
        kicker: "One last thing...",
        question: "Do you already have a budget in mind?",
        hint: "A range is enough — it just helps me propose the right approach.",
      }
    case "contact":
      return {
        kicker: "Almost there.",
        question: "Where can I reach you?",
        hint: "No newsletters, no spam — just a reply about your project.",
      }
  }
}

export function isStepAnswered(
  stepId: BriefStepId,
  answers: BriefAnswers,
): boolean {
  switch (stepId) {
    case "intent":
      return answers.intent !== undefined
    case "intent-detail":
      return (answers.intentDetail?.trim().length ?? 0) > 0
    case "problem":
      return (answers.problem?.trim().length ?? 0) >= 4
    case "audience":
      return answers.audience !== undefined
    case "stage":
      return answers.stage !== undefined
    case "timeline":
      return answers.timeline !== undefined
    case "budget":
      return answers.budget !== undefined
    case "contact":
      return (
        (answers.name?.trim().length ?? 0) >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email ?? "")
      )
  }
}

export function isBriefComplete(answers: BriefAnswers): answers is ProjectBrief {
  return BRIEF_STEP_IDS.every((stepId) => isStepAnswered(stepId, answers))
}

function optionLabel<T extends string>(
  options: readonly BriefOption<T>[],
  value: T,
): string {
  return options.find((option) => option.value === value)?.label ?? value
}

export interface BriefSummaryRow {
  readonly label: string
  readonly value: string
  readonly editStepId: BriefStepId
}

export function buildSummaryRows(brief: ProjectBrief): BriefSummaryRow[] {
  const projectDetail = isWebsiteIntent(brief.intent)
    ? WEBSITE_KIND_OPTIONS.find((option) => option.value === brief.intentDetail)?.label ??
      brief.intentDetail
    : brief.intentDetail

  return [
    {
      label: "Project",
      value: `${optionLabel(INTENT_OPTIONS, brief.intent)} — ${projectDetail}`,
      editStepId: "intent",
    },
    { label: "Goal", value: brief.problem, editStepId: "problem" },
    {
      label: "Audience",
      value: optionLabel(AUDIENCE_OPTIONS, brief.audience),
      editStepId: "audience",
    },
    {
      label: "Stage",
      value: optionLabel(STAGE_OPTIONS, brief.stage),
      editStepId: "stage",
    },
    {
      label: "Timeline",
      value: optionLabel(TIMELINE_OPTIONS, brief.timeline),
      editStepId: "timeline",
    },
    {
      label: "Budget",
      value: optionLabel(BUDGET_OPTIONS, brief.budget),
      editStepId: "budget",
    },
  ]
}
