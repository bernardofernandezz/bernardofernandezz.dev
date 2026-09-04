import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { HeroStructure } from "@/components/three/hero-structure"
import { HeroName } from "@/components/home/hero-name"
import { LocalTime } from "@/components/site/local-time"
import { Magnetic } from "@/components/site/magnetic"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const hero = dict.home.hero

  return (
    <section className="relative overflow-hidden">
      <div className="container-page pb-14 pt-10 md:pb-24 md:pt-14">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span
              className="relative inline-flex size-1.5"
              aria-hidden="true"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-60 motion-reduce:animate-none motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-highlight" />
            </span>
            {dict.common.brandRole} · {dict.common.location} ·{" "}
            <LocalTime label={dict.common.localTimeShort} />
          </p>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-8 md:mt-12">
            <HeroName
              first="Bernardo"
              second="Fernandez"
              label="Bernardo Fernandez"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 md:mt-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal delayMs={150}>
              <p className="flex max-w-md flex-col font-display text-display-sm text-foreground">
                {hero.identity.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
            </Reveal>

            <Reveal delayMs={220}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {hero.body}
              </p>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Magnetic>
                  <Button
                    asChild
                    className="h-12 rounded-full px-7 text-base"
                  >
                    <Link href={localePath(locale, "/work")}>
                      {hero.ctaPrimary}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </Magnetic>
                <Link
                  href={localePath(locale, "/about")}
                  className="group inline-flex items-center gap-2 text-base text-muted-foreground transition-colors hover:text-foreground"
                >
                  {hero.ctaSecondary}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delayMs={380}>
              <Link
                href={localePath(locale, "/start-a-project")}
                className="group mt-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-highlight"
              >
                <span className="border-b border-border pb-1 transition-colors group-hover:border-highlight">
                  {hero.quietCta}
                </span>
                <ArrowRight
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          <div className="relative md:col-span-5 md:-mt-40 lg:-mt-48">
            <Reveal delayMs={200}>
              <HeroStructure
                hue={262}
                label={hero.structureLabel}
                className="aspect-[4/5] w-full max-md:mx-auto max-md:max-w-sm"
              />
            </Reveal>
          </div>
        </div>

        <Reveal delayMs={450} className="max-md:hidden">
          <p className="eyebrow mt-12 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-border" aria-hidden="true" />
            {hero.scrollHint}
            <span className="h-px w-10 bg-border" aria-hidden="true" />
          </p>
        </Reveal>
      </div>
    </section>
  )
}
