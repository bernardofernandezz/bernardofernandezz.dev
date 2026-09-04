import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"

export function ProjectCta({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const cta = dict.home.cta

  return (
    <section className="border-t">
      <div className="container-page py-24 text-center md:py-36">
        <Reveal>
          <p className="eyebrow">{cta.eyebrow}</p>
          <h2 className="mx-auto mt-8 max-w-3xl font-display text-display-lg">
            {cta.line1}
            <br />
            <span className="italic text-muted-foreground">{cta.line2}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-muted-foreground">
            {cta.body}
          </p>
        </Reveal>
        <Reveal delayMs={150}>
          <Button
            asChild
            className="mt-12 h-12 rounded-full bg-highlight px-8 text-base text-highlight-foreground hover:bg-highlight/90"
          >
            <Link href={localePath(locale, "/start-a-project")}>
              {cta.button}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
