import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
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

  return (
    <>
      <article className="container-page pb-24">
        <header className="pt-16 md:pt-24">
          <Reveal>
            <p className="eyebrow">
              {kindLabel.toUpperCase()} · {project.year}
            </p>
            <h1 className="mt-6 font-display text-display-xl">
              {project.name}
              <span className="text-muted-foreground">.</span>
            </h1>
            <p className="mt-6 max-w-2xl font-display text-display-sm text-muted-foreground">
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
            </div>
          </aside>

          <div className="md:col-span-9">
            <Reveal>
              <section aria-labelledby="context">
                <h2
                  id="context"
                  className="font-display text-display-sm"
                >
                  {labels.context}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {project.caseStudy.context}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="problem" className="mt-14">
                <h2 id="problem" className="font-display text-display-sm">
                  {labels.problem}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {project.caseStudy.problem}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section aria-labelledby="role" className="mt-14 border-y py-8">
                <h2 id="role" className="eyebrow">
                  {labels.role}
                </h2>
                <p className="mt-3 text-lg leading-relaxed">
                  {project.caseStudy.role}
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
                  className="font-display text-display-sm"
                >
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

            <Reveal>
              <section aria-labelledby="decisions" className="mt-14">
                <h2 id="decisions" className="font-display text-display-sm">
                  {labels.decisions}
                </h2>
                <dl className="mt-6 flex flex-col border-t">
                  {project.caseStudy.decisions.map((decision) => (
                    <div
                      key={decision.title}
                      className="grid gap-3 border-b py-7 md:grid-cols-12 md:gap-8"
                    >
                      <dt className="text-base font-medium md:col-span-5">
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
                <h2 id="result" className="font-display text-display-sm">
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
                className="mt-14 rounded-xl border bg-card/40 p-8"
              >
                <h2 id="lesson" className="eyebrow">
                  {labels.lesson}
                </h2>
                <p className="mt-4 max-w-2xl font-display text-xl leading-snug md:text-2xl">
                  {project.caseStudy.lesson}
                </p>
              </section>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-start gap-6 border-t pt-12 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md font-display text-display-sm">
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
              {dict.work.caseStudy.next}: {nextProject.name}
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
