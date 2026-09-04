export interface BriefOption<T extends string> {
  readonly value: T
  readonly label: string
}

export const PROJECT_TYPES = [
  "website",
  "web-app",
  "mvp",
  "automation",
  "architecture",
  "other",
] as const

export type ProjectType = (typeof PROJECT_TYPES)[number]

export const WEBSITE_KINDS = [
  "company",
  "landing",
  "portfolio",
  "ecommerce",
  "other",
] as const

export type WebsiteKind = (typeof WEBSITE_KINDS)[number]

export const AUDIENCES = [
  "customers",
  "team",
  "myself",
  "public",
  "unsure",
] as const

export type Audience = (typeof AUDIENCES)[number]

export const PROJECT_STAGES = [
  "idea",
  "prototype",
  "mvp",
  "existing-product",
  "scaling",
] as const

export type ProjectStage = (typeof PROJECT_STAGES)[number]

export const TIMELINES = [
  "asap",
  "1-3-months",
  "3-6-months",
  "6-months-plus",
  "flexible",
] as const

export type Timeline = (typeof TIMELINES)[number]

export const BUDGET_RANGES = [
  "unsure",
  "under-1k",
  "1k-3k",
  "3k-7k",
  "7k-plus",
] as const

export type BudgetRange = (typeof BUDGET_RANGES)[number]

export interface ProjectBrief {
  readonly intent: ProjectType
  readonly intentDetail: string
  readonly problem: string
  readonly audience: Audience
  readonly stage: ProjectStage
  readonly timeline: Timeline
  readonly budget: BudgetRange
  readonly name: string
  readonly email: string
}

export type BriefAnswers = Partial<ProjectBrief>
