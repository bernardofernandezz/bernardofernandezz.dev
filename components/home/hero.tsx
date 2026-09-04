import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { siteConfig } from "@/lib/config/site"

export function Hero() {
  return (
    <section className="container-page pb-20 pt-16 md:pb-28 md:pt-24">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span
            className="inline-block size-1.5 rounded-full bg-highlight"
            aria-hidden="true"
          />
          {siteConfig.role} · {siteConfig.location}
        </p>
      </Reveal>

      <Reveal delayMs={100}>
        <h1 className="mt-10 font-display text-display-xl">
          Bernardo
          <br />
          <span className="italic">Fernandez</span>
        </h1>
      </Reveal>

      <Reveal delayMs={200}>
        <p className="mt-10 max-w-2xl font-display text-display-sm text-muted-foreground">
          I build software people actually use — turning ambiguous ideas into
          products, systems and experiences that work.
        </p>
      </Reveal>

      <Reveal delayMs={300}>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button
            asChild
            className="h-12 rounded-full bg-highlight px-7 text-base text-highlight-foreground hover:bg-highlight/90"
          >
            <Link href="/start-a-project">
              Start a project
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full px-7 text-base"
          >
            <Link href="/work">See my work</Link>
          </Button>
        </div>
      </Reveal>

      <Reveal delayMs={400}>
        <p className="mt-10 text-sm text-muted-foreground">
          {siteConfig.availability}.
        </p>
      </Reveal>
    </section>
  )
}
