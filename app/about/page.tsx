import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { experience } from "@/lib/content/experience"
import { siteConfig } from "@/lib/config/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Bernardo Fernandez is, how he thinks about software, and the kind of problems he likes to solve.",
  alternates: { canonical: "/about" },
}

const STORY = [
  "I'm a software developer from Brazil, and I've been building for the web since I realized that code is the shortest path between an idea and something real.",
  "My trajectory runs from agency websites through startup product work to independent practice — and each step moved me closer to the same place: owning problems end to end, not just implementing tickets. Today I work with founders and companies who need someone to carry an idea from 'we should build something' to 'it's live and people are using it'.",
  "What I care about most is the space where engineering meets product. The type system as the first draft of the domain. The typography as part of the interface's honesty. The migration that makes the next six features trivial instead of terrifying. I believe quality is not the opposite of speed — it's what makes speed compound.",
] as const

export default function AboutPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">About</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg">
          I&rsquo;m Bernardo. I build software people actually{" "}
          <span className="italic">use</span>.
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div className="flex flex-col gap-6">
            {STORY.map((paragraph, index) => (
              <Reveal key={index} delayMs={index * 80}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16">
              <p className="eyebrow">Trajectory</p>
              <ol className="mt-6 flex flex-col border-t">
                {experience.map((entry) => (
                  <li key={entry.title} className="grid gap-2 border-b py-6 md:grid-cols-12 md:gap-6">
                    <p className="font-mono text-sm text-muted-foreground md:col-span-3">
                      {entry.period}
                    </p>
                    <div className="md:col-span-9">
                      <h2 className="text-base font-medium">
                        {entry.title}
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          — {entry.context}
                        </span>
                      </h2>
                      <p className="mt-2 leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delayMs={150}>
            <div className="rounded-xl border bg-card/40 p-8">
              <p className="eyebrow">What I believe</p>
              <ul className="mt-6 flex flex-col gap-6">
                <li>
                  <p className="font-display text-xl leading-snug">
                    Software should feel inevitable
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    The best interfaces don&rsquo;t impress you — they simply
                    make sense the moment you touch them.
                  </p>
                </li>
                <li>
                  <p className="font-display text-xl leading-snug">
                    Small scope, big quality
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    One complete, polished thing beats five approximate ones.
                    Cutting is a skill, not a compromise.
                  </p>
                </li>
                <li>
                  <p className="font-display text-xl leading-snug">
                    The model is the product
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Most hard problems are modeling problems. Get the domain
                    right and the rest follows.
                  </p>
                </li>
                <li>
                  <p className="font-display text-xl leading-snug">
                    Details are engineering
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Typography, latency, empty states — the polish layer is
                    where trust is built.
                  </p>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={250}>
            <div className="mt-8 rounded-xl border p-8">
              <p className="eyebrow">Currently</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Based in {siteConfig.location}, working with clients anywhere.
                {siteConfig.availability.toLowerCase()} — the fastest way to
                start is the briefing below.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="mt-24 flex flex-col items-start gap-6 border-t pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-display text-display-sm">
            If any of this resonates, we&rsquo;ll probably work well together.
          </p>
          <Button
            asChild
            className="rounded-full bg-highlight px-7 text-base text-highlight-foreground hover:bg-highlight/90"
          >
            <Link href="/start-a-project">
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  )
}
