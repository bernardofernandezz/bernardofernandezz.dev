import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)

  return (
    <section className="container-page pb-20 pt-16 md:pb-28 md:pt-24">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span
            className="inline-block size-1.5 rounded-full bg-highlight"
            aria-hidden="true"
          />
          {dict.common.brandRole} · {dict.common.location}
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
        <p className="mt-10 max-w-2xl font-display text-display-sm">
          {dict.home.hero.statement}
        </p>
      </Reveal>

      <Reveal delayMs={300}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {dict.home.hero.sub}
        </p>
      </Reveal>

      <Reveal delayMs={400}>
        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button
            asChild
            className="h-12 rounded-full bg-highlight px-7 text-base text-highlight-foreground hover:bg-highlight/90"
          >
            <Link href={localePath(locale, "/start-a-project")}>
              {dict.home.hero.ctaPrimary}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-12 rounded-full px-7 text-base"
          >
            <Link href={localePath(locale, "/work")}>
              {dict.home.hero.ctaSecondary}
            </Link>
          </Button>
        </div>
      </Reveal>

      <Reveal delayMs={500}>
        <p className="mt-10 text-sm text-muted-foreground">
          {dict.common.availability}.
        </p>
      </Reveal>
    </section>
  )
}
