import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { currentlyExploring, stack } from "@/lib/content/proof"
import { siteConfig } from "@/lib/config/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Who Bernardo Fernandez is, how he approaches software, what he cares about technically and what he's currently exploring.",
  alternates: { canonical: "/about" },
}

const STORY = [
  "I'm a software developer from Brazil. I build web applications, internal tools and the systems behind them — and I got here the direct way: by wanting to make things on the web and refusing to stop at the surface. What started as curiosity about interfaces turned into a deeper interest in everything that has to work for those interfaces to exist at all.",
  "The part of building I care most about is where product and engineering meet. Whether a data model makes the next feature cheap or expensive. Whether an API fails loudly instead of silently. Whether the interface feels inevitable or merely functional. I don't think those are separate concerns — they're the same concern, seen from different distances.",
  "I don't have fifteen years of experience, and I won't pretend otherwise. What I have is a habit of taking technical problems seriously: reading the docs, testing the assumption, and being the person who stays with a problem until it's actually solved — not until it stops being my turn.",
] as const

const BELIEFS = [
  {
    title: "The boring parts are the product",
    detail:
      "Data models, migrations, failure states, empty screens. Users never praise them — but everything they love sits on top of them.",
  },
  {
    title: "Small scope, real quality",
    detail:
      "One complete, solid thing beats five approximate ones. Cutting is a skill, not a compromise.",
  },
  {
    title: "Types are the first draft",
    detail:
      "Before components or endpoints, I write the types. If the domain reads clearly, the implementation almost writes itself.",
  },
  {
    title: "Learn in public",
    detail:
      "Experiments, writing and open source keep me honest — explaining something exposes the parts I only pretended to understand.",
  },
] as const

export default function AboutPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">About</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg">
          I&rsquo;m Bernardo. I build the software behind the{" "}
          <span className="italic">idea</span>.
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
              <p className="eyebrow">What I work with</p>
              <dl className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {stack.map((group) => (
                  <div key={group.area}>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {group.area}
                    </dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delayMs={150}>
            <div className="rounded-xl border bg-card/40 p-8">
              <p className="eyebrow">What I believe</p>
              <ul className="mt-6 flex flex-col gap-6">
                {BELIEFS.map((belief) => (
                  <li key={belief.title}>
                    <p className="font-display text-xl leading-snug">
                      {belief.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {belief.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={250}>
            <div className="mt-8 rounded-xl border p-8">
              <p className="eyebrow">Currently exploring</p>
              <ul className="mt-4 flex flex-col gap-3">
                {currentlyExploring.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-highlight"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="mt-8 rounded-xl border p-8">
              <p className="eyebrow">This site as evidence</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This portfolio is a small case study of how I work: Next.js
                with strict TypeScript, a typed interactive briefing,
                self-hosted on a VPS with nginx, systemd, Let&rsquo;s Encrypt
                and CI/CD with quality gates and health checks. A small
                system — built the way I&rsquo;d build yours.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={350}>
            <div className="mt-8 rounded-xl border p-8">
              <p className="eyebrow">Currently</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Based in {siteConfig.location}, working with clients anywhere.{" "}
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
            Have a problem that sounds like one of these stories?
          </p>
          <Button
            asChild
            className="rounded-full bg-highlight px-7 text-base text-highlight-foreground hover:bg-highlight/90"
          >
            <Link href="/start-a-project">
              Let&rsquo;s talk about it
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  )
}
