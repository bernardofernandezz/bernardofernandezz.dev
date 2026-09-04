import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getFeaturedProjects } from "@/lib/content/projects"
import { cn } from "@/lib/utils"

export function SelectedWork({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const work = dict.home.work
  const kindLabels = dict.work.kinds
  const projects = getFeaturedProjects(locale)

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{work.eyebrow}</p>
              <h2 className="mt-4 font-display text-display-lg">{work.title}</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {work.intro}
              </p>
            </div>
            <ArrowLink href={localePath(locale, "/work")} className="text-base">
              {work.allProjects}
            </ArrowLink>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1
            return (
              <Reveal key={project.slug}>
                <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                  <div
                    className={cn(
                      "md:col-span-5",
                      reversed && "md:order-2 md:col-start-8",
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
                      reversed && "md:order-1 md:col-start-1",
                    )}
                  >
                    <p className="eyebrow">
                      {kindLabels[project.kind].toUpperCase()} · {project.year}
                    </p>
                    <h3 className="mt-4 font-display text-display-sm">
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
                    </h3>
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
                      {work.cardCta}
                    </ArrowLink>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col items-start gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-display-sm">{work.afterLine}</p>
            <ArrowLink
              href={localePath(locale, "/start-a-project")}
              className="text-base"
            >
              {work.afterCta}
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
