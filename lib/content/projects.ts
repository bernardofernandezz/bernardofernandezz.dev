import type { Locale } from "@/lib/i18n/config"
import { TEXT_EN } from "@/lib/content/projects/text-en"
import { TEXT_PT_BR } from "@/lib/content/projects/text-pt-br"

export const PROJECT_CATEGORIES = ["product", "web", "experiment", "open-source"] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export const PROJECT_KINDS = ["personal", "prototype", "experiment", "open-source"] as const

export type ProjectKind = (typeof PROJECT_KINDS)[number]

export interface ProjectDecision {
  readonly title: string
  readonly detail: string
}

export interface ProjectCaseStudy {
  readonly context: string
  readonly problem: string
  readonly role: string
  readonly technicalChallenge: readonly string[]
  readonly decisions: readonly ProjectDecision[]
  readonly result: readonly string[]
  readonly lesson: string
}

export interface ProjectVisualSpec {
  readonly hue: number
  readonly pattern: "grid" | "flow" | "type" | "layers" | "pulse" | "schema"
}

interface ProjectBase {
  readonly slug: string
  readonly kind: ProjectKind
  readonly category: ProjectCategory
  readonly year: string
  readonly stack: readonly string[]
  readonly visual: ProjectVisualSpec
  readonly featured: boolean
}

export interface ProjectText {
  readonly name: string
  readonly tagline: string
  readonly summary: string
  readonly caseStudy: ProjectCaseStudy
}

export interface Project extends ProjectBase, ProjectText {}

/*
 * These are Bernardo's own builds — personal projects, prototypes,
 * experiments and open source. Labeled as such and framed around real
 * technical problems, not invented client outcomes. Professional work
 * is added here as it becomes public.
 */
const BASE: readonly ProjectBase[] = [
  {
    slug: "ledgerline",
    kind: "personal",
    category: "product",
    year: "2025",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts"],
    visual: { hue: 24, pattern: "grid" },
    featured: true,
  },
  {
    slug: "meridian",
    kind: "prototype",
    category: "web",
    year: "2024",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    visual: { hue: 200, pattern: "flow" },
    featured: true,
  },
  {
    slug: "fieldnote",
    kind: "personal",
    category: "web",
    year: "2024",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Mapbox"],
    visual: { hue: 140, pattern: "layers" },
    featured: true,
  },
  {
    slug: "opsboard",
    kind: "prototype",
    category: "product",
    year: "2023",
    stack: ["React", "Node.js", "WebSocket", "Redis", "PostgreSQL"],
    visual: { hue: 262, pattern: "pulse" },
    featured: false,
  },
  {
    slug: "typeset-playground",
    kind: "experiment",
    category: "experiment",
    year: "2025",
    stack: ["Next.js", "TypeScript", "Canvas API", "Variable fonts"],
    visual: { hue: 340, pattern: "type" },
    featured: true,
  },
  {
    slug: "route-schema",
    kind: "open-source",
    category: "open-source",
    year: "2023",
    stack: ["TypeScript", "Vitest", "tsup"],
    visual: { hue: 210, pattern: "schema" },
    featured: false,
  },
]

const TEXT: Record<Locale, Record<string, ProjectText>> = {
  en: TEXT_EN,
  "pt-br": TEXT_PT_BR,
}

export function getProjects(locale: Locale): readonly Project[] {
  return BASE.map((base) => ({ ...base, ...TEXT[locale][base.slug] }))
}

export function getProjectBySlug(
  slug: string,
  locale: Locale,
): Project | undefined {
  const text = TEXT[locale][slug]
  const base = BASE.find((project) => project.slug === slug)
  if (!base || !text) return undefined
  return { ...base, ...text }
}

export function getFeaturedProjects(locale: Locale): readonly Project[] {
  return getProjects(locale).filter((project) => project.featured)
}
