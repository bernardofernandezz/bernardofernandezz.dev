import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import {
  getProjects,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from "@/lib/content/projects"
import { cn } from "@/lib/utils"

export interface WorkSearchParams {
  readonly category?: string | string[]
}

function readFilterParam(
  value: string | string[] | undefined,
): ProjectCategory | null {
  const first = Array.isArray(value) ? value[0] : value
  if (first && PROJECT_CATEGORIES.includes(first as ProjectCategory)) {
    return first as ProjectCategory
  }
  return null
}

export async function WorkIndexPage({
  locale,
  searchParams,
}: {
  locale: Locale
  searchParams: Promise<WorkSearchParams>
}) {
  const dict = getDictionary(locale)
  const index = dict.work.index
  const kindLabels = dict.work.kinds
  const resolvedParams = await searchParams
  const filter = readFilterParam(resolvedParams.category)
  const projects = getProjects(locale)
  const visibleProjects = filter
    ? projects.filter((project) => project.category === filter)
    : projects

  const filters = [
    { value: null, label: dict.work.filters.all },
    ...PROJECT_CATEGORIES.map((category) => ({
      value: category,
      label: dict.work.filters[category],
    })),
  ]

  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{index.eyebrow}</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg tracking-tight">
          {index.title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {index.intro}
        </p>
      </Reveal>

      <Reveal delayMs={100}>
        <nav
          aria-label={index.filterNav}
          className="mt-12 flex flex-wrap gap-2"
        >
          {filters.map((item) => {
            const href = item.value
              ? localePath(locale, `/work?category=${item.value}`)
              : localePath(locale, "/work")
            const isActive = filter === item.value
            return (
              <Link
                key={item.label}
                href={href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                  isActive
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </Reveal>

      <div className="mt-16 border-t">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.slug}>
            <article className="group border-b">
              <Link
                href={localePath(locale, `/work/${project.slug}`)}
                className="grid items-center gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12"
                aria-label={`${project.name}: ${project.tagline}`}
              >
                <p className="eyebrow transition-colors duration-300 group-hover:text-highlight md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div className="md:col-span-5">
                  <h2 className="font-display text-display-sm tracking-tight">
                    {project.name}
                    <ArrowUpRight
                      className="ml-1 inline size-6 -translate-x-1 text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="serif-accent mt-1 text-xl text-muted-foreground md:text-2xl">
                    {project.tagline}
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
                    {kindLabels[project.kind]} · {project.year}
                  </p>
                </div>

                <div className="max-w-lg md:col-span-3">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.summary}
                  </p>
                  <p className="mt-4 font-mono text-xs tracking-wide text-muted-foreground/70">
                    {project.stack.slice(0, 3).join(" · ")}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <ProjectVisual
                    spec={project.visual}
                    title={project.name}
                    className="aspect-[16/10] opacity-80 transition-all duration-500 group-hover:scale-[1.015] group-hover:opacity-100"
                  />
                </div>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-20 flex flex-col items-start gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-display-sm tracking-tight">
            {index.afterLine}
          </p>
          <ArrowLink
            href={localePath(locale, "/start-a-project")}
            className="text-base"
          >
            {index.afterCta}
          </ArrowLink>
        </div>
      </Reveal>
    </div>
  )
}
