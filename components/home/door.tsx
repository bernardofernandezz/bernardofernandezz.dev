import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Magnetic } from "@/components/site/magnetic"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { services } from "@/lib/content/services"
import { siteConfig } from "@/lib/config/site"

export function Door({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const door = dict.home.door
  const situations = services[locale]

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">{door.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-display-lg tracking-tight">
            {door.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {door.intro}
          </p>
        </Reveal>

        <Reveal delayMs={80}>
          <p className="eyebrow mt-14 md:mt-20">{door.situationsLabel}</p>
        </Reveal>
        <div className="mt-4 border-t">
          {situations.map((service, index) => (
            <Reveal key={service.id} delayMs={index * 50}>
              <div className="group grid gap-2 border-b py-6 sm:grid-cols-12 sm:gap-6 md:py-7">
                <p className="font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-highlight sm:col-span-1 sm:pt-1.5">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="font-display text-xl tracking-tight sm:col-span-4 md:text-2xl">
                  &ldquo;{service.situation}&rdquo;
                </p>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:col-span-7">
                  {service.response}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={100}>
          <p className="mt-6 text-sm text-muted-foreground/80">{door.notSure}</p>
        </Reveal>

        <Reveal delayMs={150}>
          <div className="mt-16 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md font-display text-display-sm tracking-tight">
              {door.afterLine}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <Magnetic>
                <Button asChild className="h-12 rounded-full px-7 text-base">
                  <Link href={localePath(locale, "/start-a-project")}>
                    {door.afterCta}
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </Magnetic>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-muted-foreground underline-offset-8 transition-colors hover:text-highlight hover:underline"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
