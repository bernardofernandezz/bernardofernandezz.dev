import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getFeaturedProjects } from "@/lib/content/projects"

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
              <h2 className="mt-4 font-display text-display-lg tracking-tight">
                {work.title}
              </h2>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {work.intro}
              </p>
            </div>
            <ArrowLink href={localePath(locale, "/work")} className="text-base">
              {work.allProjects}
            </ArrowLink>
          </div>
        </Reveal>

        <div className="mt-16 border-t md:mt-20">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <article className="group border-b">
                <Link
                  href={localePath(locale, `/work/${project.slug}`)}
                  className="grid items-center gap-6 py-10 md:grid-cols-12 md:gap-8 md:py-14"
                  aria-label={`${project.name}: ${project.tagline}`}
                >
                  <p className="eyebrow transition-colors duration-300 group-hover:text-highlight md:col-span-1">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div className="md:col-span-4">
                    <h3 className="font-display text-display-sm tracking-tight">
                      {project.name}
                      <ArrowUpRight
                        className="ml-1 inline size-6 -translate-x-1 text-highlight opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </h3>
                    <p className="serif-accent mt-1 text-xl text-muted-foreground md:text-2xl">
                      {project.tagline}
                    </p>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground/80">
                      {kindLabels[project.kind]} · {project.year}
                    </p>
                  </div>

                  <div className="max-w-lg md:col-span-3">
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      {project.summary}
                    </p>
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100">
                      {project.caseStudy.role}
                    </p>
                  </div>

                  <div className="md:col-span-4">
                    <ProjectVisual
                      spec={project.visual}
                      title={project.name}
                      className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.015]"
                    />
                  </div>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
