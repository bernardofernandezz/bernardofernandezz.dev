import Link from "next/link"
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
        <h1 className="mt-6 max-w-3xl font-display text-display-lg">
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
                  href={localePath(locale, `/work/${project.slug}`)}
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
                  {kindLabels[project.kind].toUpperCase()} · {project.year}
                </p>
                <h2 className="mt-4 font-display text-display-sm">
                  <Link
                    href={localePath(locale, `/work/${project.slug}`)}
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
                <ArrowLink
                  href={localePath(locale, `/work/${project.slug}`)}
                  className="mt-6"
                >
                  {dict.home.work.cardCta}
                </ArrowLink>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-24 flex flex-col items-start gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-display-sm">{index.afterLine}</p>
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
