import type { Briefing } from "@/lib/i18n/dictionaries/en/briefing"
import type {
  BriefAnswers,
  BriefOption,
  ProjectBrief,
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

export interface BriefStepPresentation {
  readonly kicker: string
  readonly question: string
  readonly hint?: string
}

export function isBriefComplete(answers: BriefAnswers): answers is ProjectBrief {
  return BRIEF_STEP_IDS.every((stepId) => isStepAnswered(stepId, answers))
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

export function getStepPresentation(
  stepId: BriefStepId,
  answers: BriefAnswers,
  text: Briefing,
): BriefStepPresentation {
  switch (stepId) {
    case "intent":
      return text.steps.intent
    case "intent-detail":
      return text.steps.intentDetail[answers.intent ?? "other"]
    case "problem":
      return {
        kicker: text.steps.problem.kicker,
        question: text.steps.problem.questions[answers.intent ?? "other"],
        hint: text.steps.problem.hint,
      }
    case "audience":
      return text.steps.audience
    case "stage":
      return text.steps.stage
    case "timeline":
      return text.steps.timeline
    case "budget":
      return text.steps.budget
    case "contact":
      return text.steps.contact
  }
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

export function buildSummaryRows(
  brief: ProjectBrief,
  text: Briefing,
): BriefSummaryRow[] {
  const projectDetail =
    brief.intent === "website"
      ? (text.options.websiteKind.find(
          (option) => option.value === brief.intentDetail,
        )?.label ?? brief.intentDetail)
      : brief.intentDetail

  return [
    {
      label: text.labels.project,
      value: `${optionLabel(text.options.intent, brief.intent)} — ${projectDetail}`,
      editStepId: "intent",
    },
    { label: text.labels.goal, value: brief.problem, editStepId: "problem" },
    {
      label: text.labels.audience,
      value: optionLabel(text.options.audience, brief.audience),
      editStepId: "audience",
    },
    {
      label: text.labels.stage,
      value: optionLabel(text.options.stage, brief.stage),
      editStepId: "stage",
    },
    {
      label: text.labels.timeline,
      value: optionLabel(text.options.timeline, brief.timeline),
      editStepId: "timeline",
    },
    {
      label: text.labels.budget,
      value: optionLabel(text.options.budget, brief.budget),
      editStepId: "budget",
    },
  ]
}
