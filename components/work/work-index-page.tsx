import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getFeaturedProjects, getProjects } from "@/lib/content/projects"

export function WorkIndexPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const index = dict.work.index
  const kindLabels = dict.work.kinds
  const featured = getFeaturedProjects(locale)
  const featuredSlugs = new Set(featured.map((project) => project.slug))
  const others = getProjects(locale).filter(
    (project) => !featuredSlugs.has(project.slug),
  )
  const [lead, ...rest] = featured

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

      <Reveal>
        <p className="eyebrow mt-16 md:mt-20">{index.featuredLabel}</p>
      </Reveal>

      {lead && (
        <Reveal>
          <article className="group mt-8 border-t pt-10">
            <Link
              href={localePath(locale, `/work/${lead.slug}`)}
              aria-label={`${lead.name}: ${lead.tagline}`}
              className="block"
            >
              <ProjectVisual
                spec={lead.visual}
                title={lead.name}
                className="aspect-[16/8] transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7">
                  <h2 className="font-display text-display-md tracking-tight transition-colors duration-300 group-hover:text-highlight">
                    {lead.name}
                    <ArrowUpRight
                      className="ml-2 inline size-7 -translate-x-1 text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="serif-accent mt-2 text-2xl text-muted-foreground md:text-3xl">
                    {lead.tagline}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {kindLabels[lead.kind]} · {lead.year}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {lead.summary}
                  </p>
                </div>
              </div>
            </Link>
          </article>
        </Reveal>
      )}

      <div className="mt-14 border-t">
        {rest.map((project, position) => (
          <Reveal key={project.slug}>
            <article className="group border-b">
              <Link
                href={localePath(locale, `/work/${project.slug}`)}
                className="grid items-center gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-12"
                aria-label={`${project.name}: ${project.tagline}`}
              >
                <p className="eyebrow transition-colors duration-300 group-hover:text-highlight md:col-span-1">
                  {String(position + 2).padStart(2, "0")}
                </p>

                <div className="md:col-span-5">
                  <h2 className="font-display text-display-sm tracking-tight transition-colors duration-300 group-hover:text-highlight">
                    {project.name}
                    <ArrowUpRight
                      className="ml-1 inline size-6 -translate-x-1 text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </h2>
                  <p className="serif-accent mt-1 text-xl text-muted-foreground md:text-2xl">
                    {project.tagline}
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {kindLabels[project.kind]} · {project.year}
                  </p>
                </div>

                <div className="max-w-lg md:col-span-3">
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {project.summary}
                  </p>
                  <p className="mt-4 font-mono text-xs tracking-wide text-muted-foreground">
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

      {others.length > 0 && (
        <>
          <Reveal>
            <p className="eyebrow mt-20">{index.otherLabel}</p>
          </Reveal>
          <div className="mt-6 border-t">
            {others.map((project) => (
              <Reveal key={project.slug}>
                <article className="group border-b">
                  <Link
                    href={localePath(locale, `/work/${project.slug}`)}
                    className="flex items-baseline gap-4 py-6 md:gap-6"
                    aria-label={`${project.name}: ${project.tagline}`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-highlight md:text-2xl">
                        {project.name}
                      </span>
                      <span className="serif-accent ml-3 text-base text-muted-foreground md:text-lg">
                        {project.tagline}
                      </span>
                    </span>
                    <span className="hidden shrink-0 font-mono text-xs uppercase tracking-wider text-muted-foreground sm:block">
                      {kindLabels[project.kind]} · {project.year}
                    </span>
                    <ArrowRight
                      className="size-4 shrink-0 -translate-x-1 self-center text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </>
      )}

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
