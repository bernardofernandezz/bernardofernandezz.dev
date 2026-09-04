import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ProjectJsonLd } from "@/components/seo/json-ld"
import { ProjectVisual } from "@/components/project/project-visual"
import { ProjectDiagram, hasProjectDiagram } from "@/components/project/project-diagram"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import {
  getProjectBySlug,
  getProjects,
} from "@/lib/content/projects"

export function CaseStudyContent({
  locale,
  slug,
}: {
  locale: Locale
  slug: string
}) {
  const dict = getDictionary(locale)
  const project = getProjectBySlug(slug, locale)
  if (!project) notFound()

  const labels = dict.work.caseStudy.sections
  const kindLabel = dict.work.kinds[project.kind]
  const allProjects = getProjects(locale)
  const currentIndex = allProjects.findIndex((item) => item.slug === slug)
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length]

  const numbered = (index: number) => (
    <span className="mr-2 text-highlight" aria-hidden="true">
      {String(index).padStart(2, "0")}
    </span>
  )

  return (
    <>
      <ProjectJsonLd
        locale={locale}
        slug={project.slug}
        name={project.name}
        tagline={project.tagline}
        summary={project.summary}
      />
      <article className="container-page pb-24">
        <header className="pt-16 md:pt-24">
          <Reveal>
            <p className="eyebrow">
              {kindLabel.toUpperCase()} · {project.year}
            </p>
            <h1 className="mt-6 font-display text-display-xl tracking-tight">
              {project.name}
              <span className="serif-accent text-muted-foreground">.</span>
            </h1>
            <p className="serif-accent mt-4 max-w-2xl text-display-sm text-muted-foreground">
              {project.tagline}
            </p>
          </Reveal>
        </header>

        <Reveal delayMs={120}>
          <ProjectVisual
            spec={project.visual}
            title={project.name}
            className="mt-14 aspect-[16/8]"
          />
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-12">
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-24">
              <p className="eyebrow">{dict.work.caseStudy.builtWith}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {project.stack.map((technology) => (
                  <li
                    key={technology}
                    className="font-mono text-sm text-muted-foreground"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
              <p className="eyebrow mt-10">{labels.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {project.caseStudy.role}
              </p>
            </div>
          </aside>

          <div className="md:col-span-9">
            <Reveal>
              <section aria-labelledby="context">
                <h2 id="context" className="font-display text-display-sm tracking-tight">
                  {numbered(1)}
                  {labels.context}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {project.caseStudy.context}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="problem" className="mt-14">
                <h2 id="problem" className="font-display text-display-sm tracking-tight">
                  {numbered(2)}
                  {labels.problem}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {project.caseStudy.problem}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section
                aria-labelledby="technical-challenge"
                className="mt-14"
              >
                <h2
                  id="technical-challenge"
                  className="font-display text-display-sm tracking-tight"
                >
                  {numbered(3)}
                  {labels.technicalChallenge}
                </h2>
                {project.caseStudy.technicalChallenge.map(
                  (paragraph, paragraphIndex) => (
                    <p
                      key={paragraphIndex}
                      className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </section>
            </Reveal>

            {hasProjectDiagram(slug) && (
              <Reveal>
                <div className="mt-14">
                  <ProjectDiagram
                    slug={slug}
                    title={project.name}
                    label={dict.work.caseStudy.diagramLabel}
                  />
                </div>
              </Reveal>
            )}

            <Reveal>
              <section aria-labelledby="decisions" className="mt-14">
                <h2 id="decisions" className="font-display text-display-sm tracking-tight">
                  {numbered(4)}
                  {labels.decisions}
                </h2>
                <dl className="mt-6 flex flex-col border-t">
                  {project.caseStudy.decisions.map((decision, index) => (
                    <div
                      key={decision.title}
                      className="group grid gap-3 border-b py-7 md:grid-cols-12 md:gap-8"
                    >
                      <dt className="text-base font-medium md:col-span-5">
                        <span
                          className="mr-3 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-highlight"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {decision.title}
                      </dt>
                      <dd className="leading-relaxed text-muted-foreground md:col-span-7">
                        {decision.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="result" className="mt-14">
                <h2 id="result" className="font-display text-display-sm tracking-tight">
                  {numbered(5)}
                  {labels.result}
                </h2>
                <ul className="mt-6 flex max-w-2xl flex-col gap-4">
                  {project.caseStudy.result.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex gap-3 leading-relaxed text-muted-foreground"
                    >
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-highlight"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal>
              <section
                aria-labelledby="lesson"
                className="mt-16 border-l-2 border-highlight py-2 pl-6 md:pl-8"
              >
                <h2 id="lesson" className="eyebrow">
                  {labels.lesson}
                </h2>
                <p className="serif-accent mt-4 max-w-2xl text-2xl leading-snug md:text-3xl">
                  {project.caseStudy.lesson}
                </p>
              </section>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-start gap-6 border-t pt-12 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md font-display text-display-sm tracking-tight">
              {dict.work.caseStudy.ctaLine}
            </p>
            <ArrowLink
              href={localePath(locale, "/start-a-project")}
              className="text-base"
            >
              {dict.work.caseStudy.ctaLink}
            </ArrowLink>
          </div>
        </Reveal>
      </article>

      <div className="border-t">
        <div className="container-page flex items-center justify-between py-10">
          <Link
            href={localePath(locale, "/work")}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← {dict.work.caseStudy.backAll}
          </Link>
          {nextProject && (
            <Link
              href={localePath(locale, `/work/${nextProject.slug}`)}
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="max-md:hidden">{dict.work.caseStudy.next}:</span>
              <span className="font-display text-base text-foreground transition-colors group-hover:text-highlight">
                {nextProject.name}
              </span>
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
