import Link from "next/link"
import { Reveal } from "@/components/motion/reveal"
import { ProjectVisual } from "@/components/project/project-visual"
import { ArrowLink } from "@/components/site/arrow-link"
import { featuredProjects, PROJECT_CATEGORY_LABELS } from "@/lib/content/projects"
import { cn } from "@/lib/utils"

function ProjectCard({
  project,
  index,
}: {
  project: (typeof featuredProjects)[number]
  index: number
}) {
  const reversed = index % 2 === 1

  return (
    <Reveal>
      <article className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
        <div className={cn("md:col-span-5", reversed && "md:order-2 md:col-start-8")}>
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

        <div className={cn("md:col-span-6", reversed && "md:order-1 md:col-start-1")}>
          <p className="eyebrow">
            {String(index + 1).padStart(2, "0")} ·{" "}
            {PROJECT_CATEGORY_LABELS[project.category]} · {project.year}
          </p>
          <h3 className="mt-4 font-display text-display-sm">
            <Link
              href={`/work/${project.slug}`}
              className="transition-colors hover:text-highlight"
            >
              {project.name}
              <span className="text-muted-foreground"> — {project.tagline}</span>
            </Link>
          </h3>
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
  )
}

export function SelectedWork() {
  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="mt-4 font-display text-display-lg">
                Work that shipped
              </h2>
            </div>
            <ArrowLink href="/work" className="text-base">
              All projects
            </ArrowLink>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        <Reveal>
          <div className="mt-20 flex flex-col items-start gap-4 border-t pt-10 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-display-sm">
              Have a similar problem?
            </p>
            <ArrowLink href="/start-a-project" className="text-base">
              Let&rsquo;s build yours
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
