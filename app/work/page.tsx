import type { Metadata } from "next"
import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
import { ArrowLink } from "@/components/site/arrow-link"
import {
  PROJECT_CATEGORIES,
  PROJECT_CATEGORY_LABELS,
  projects,
} from "@/lib/content/projects"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies — web applications, products, internal tools and experiments, with the thinking behind them.",
  alternates: { canonical: "/work" },
}

const FILTERS = [
  { value: null, label: "All" },
  ...PROJECT_CATEGORIES.map((category) => ({
    value: category,
    label: PROJECT_CATEGORY_LABELS[category],
  })),
] as const

type WorkFilter = (typeof PROJECT_CATEGORIES)[number]

function readFilterParam(
  value: string | string[] | undefined,
): WorkFilter | null {
  const first = Array.isArray(value) ? value[0] : value
  if (first && PROJECT_CATEGORIES.includes(first as WorkFilter)) {
    return first as WorkFilter
  }
  return null
}

export default async function WorkPage({ searchParams }: PageProps<"/work">) {
  const filter = readFilterParam((await searchParams).category)
  const visibleProjects = filter
    ? projects.filter((project) => project.category === filter)
    : projects

  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">Work</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg">
          Case studies, not screenshots
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Each project here includes the problem, the decisions and the result —
          because that&rsquo;s the part of the work you&rsquo;re actually
          hiring.
        </p>
      </Reveal>

      <Reveal delayMs={100}>
        <nav
          aria-label="Filter projects by category"
          className="mt-12 flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const href = item.value ? `/work?category=${item.value}` : "/work"
            const isActive = filter === item.value
            return (
              <Link
                key={item.label}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                  isActive
                    ? "border-highlight bg-highlight text-highlight-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </Reveal>

      <div className="mt-14 flex flex-col gap-20 md:gap-24">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.slug}>
            <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <div
                className={cn(
                  "md:col-span-5",
                  index % 2 === 1 && "md:order-2 md:col-start-8",
                )}
              >
                <Link
                  href={`/work/${project.slug}`}
                  className="group block transition-opacity hover:opacity-90"
                  aria-label={`View case study: ${project.name}`}
                >
                  <ProjectVisual
                    spec={project.visual}
                    title={project.name}
                    className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </Link>
              </div>

              <div
                className={cn(
                  "md:col-span-6",
                  index % 2 === 1 && "md:order-1 md:col-start-1",
                )}
              >
                <p className="eyebrow">
                  {String(index + 1).padStart(2, "0")} ·{" "}
                  {PROJECT_CATEGORY_LABELS[project.category]} · {project.year}
                </p>
                <h2 className="mt-4 font-display text-display-sm">
                  <Link
                    href={`/work/${project.slug}`}
                    className="transition-colors hover:text-highlight"
                  >
                    {project.name}
                    <span className="text-muted-foreground">
                      {" "}
                      — {project.tagline}
                    </span>
                  </Link>
                </h2>
                <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">
                  {project.summary}
                </p>
                <p className="mt-5 font-mono text-xs tracking-wide text-muted-foreground/80">
                  {project.stack.join(" · ")}
                </p>
                <ArrowLink href={`/work/${project.slug}`} className="mt-6">
                  Read the case study
                </ArrowLink>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-24 flex flex-col items-start gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-display-sm">
            Your project could be next.
          </p>
          <ArrowLink href="/start-a-project" className="text-base">
            Tell me about it
          </ArrowLink>
        </div>
      </Reveal>
    </div>
  )
}
