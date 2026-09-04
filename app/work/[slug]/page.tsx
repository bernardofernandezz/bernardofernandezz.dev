import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
import { ArrowLink } from "@/components/site/arrow-link"
import {
  getProjectBySlug,
  PROJECT_CATEGORY_LABELS,
  projects,
} from "@/lib/content/projects"

interface CaseStudyProps {
  project: NonNullable<ReturnType<typeof getProjectBySlug>>
}

function CaseStudyHeader({ project }: CaseStudyProps) {
  return (
    <header className="pt-16 md:pt-24">
      <Reveal>
        <p className="eyebrow">
          {PROJECT_CATEGORY_LABELS[project.category]} · {project.year} ·{" "}
          {project.role}
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
  )
}

function CaseStudyVisual({ project }: CaseStudyProps) {
  return (
    <Reveal delayMs={120}>
      <ProjectVisual
        spec={project.visual}
        title={project.name}
        className="mt-14 aspect-[16/8]"
      />
    </Reveal>
  )
}

function CaseStudyBody({ project }: CaseStudyProps) {
  const { caseStudy } = project

  return (
    <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-12">
      <aside className="md:col-span-3">
        <div className="md:sticky md:top-24">
          <p className="eyebrow">Built with</p>
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
          <section aria-labelledby="challenge">
            <h2 id="challenge" className="font-display text-display-sm">
              The challenge
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {caseStudy.challenge}
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section aria-labelledby="approach" className="mt-14">
            <h2 id="approach" className="font-display text-display-sm">
              The approach
            </h2>
            {caseStudy.approach.map((paragraph, paragraphIndex) => (
              <p
                key={paragraphIndex}
                className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
          </section>
        </Reveal>

        <Reveal>
          <section aria-labelledby="decisions" className="mt-14">
            <h2 id="decisions" className="font-display text-display-sm">
              Key decisions
            </h2>
            <dl className="mt-6 flex flex-col border-t">
              {caseStudy.decisions.map((decision) => (
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
          <section aria-labelledby="outcome" className="mt-14">
            <h2 id="outcome" className="font-display text-display-sm">
              The result
            </h2>
            <ul className="mt-6 flex max-w-2xl flex-col gap-4">
              {caseStudy.outcome.map((item, itemIndex) => (
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
            aria-labelledby="demonstrates"
            className="mt-14 rounded-xl border bg-card/40 p-8"
          >
            <h2 id="demonstrates" className="eyebrow">
              What this demonstrates
            </h2>
            <p className="mt-4 max-w-2xl font-display text-xl leading-snug md:text-2xl">
              {caseStudy.demonstrates}
            </p>
          </section>
        </Reveal>
      </div>
    </div>
  )
}

function CaseStudyCta({ project }: CaseStudyProps) {
  return (
    <Reveal>
      <div className="mt-24 flex flex-col items-start gap-6 border-t pt-12 md:flex-row md:items-center md:justify-between">
        <p className="max-w-md font-display text-display-sm">
          Need something similar to {project.name}?
        </p>
        <ArrowLink href="/start-a-project" className="text-base">
          Tell me about your project
        </ArrowLink>
      </div>
    </Reveal>
  )
}

function CaseStudyNavigation({ slug }: { slug: string }) {
  const currentIndex = projects.findIndex((project) => project.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return (
    <div className="border-t">
      <div className="container-page flex items-center justify-between py-10">
        <Link
          href="/work"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          ← All projects
        </Link>
        {nextProject && (
          <Link
            href={`/work/${nextProject.slug}`}
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Next: {nextProject.name}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        )}
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: `${project.name} — ${project.tagline}`,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  }
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <>
      <article className="container-page pb-24">
        <CaseStudyHeader project={project} />
        <CaseStudyVisual project={project} />
        <CaseStudyBody project={project} />
        <CaseStudyCta project={project} />
      </article>
      <CaseStudyNavigation slug={project.slug} />
    </>
  )
}
