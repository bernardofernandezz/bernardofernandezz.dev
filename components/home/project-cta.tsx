import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"

export function ProjectCta() {
  return (
    <section className="border-t">
      <div className="container-page py-24 text-center md:py-36">
        <Reveal>
          <p className="eyebrow">Start a project</p>
          <h2 className="mx-auto mt-8 max-w-3xl font-display text-display-lg">
            You have the idea.
            <br />
            <span className="italic text-muted-foreground">
              I can help turn it into something real.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground">
            Tell me what you&rsquo;re trying to build — even if it&rsquo;s still
            fuzzy. Especially if it&rsquo;s still fuzzy.
          </p>
        </Reveal>
        <Reveal delayMs={150}>
          <Button
            asChild
            className="mt-12 h-12 rounded-full bg-highlight px-8 text-base text-highlight-foreground hover:bg-highlight/90"
          >
            <Link href="/start-a-project">
              I have an idea
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
