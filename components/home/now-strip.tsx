import { ArrowLink } from "@/components/site/arrow-link"
import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getNow } from "@/lib/content/now"

export function NowStrip({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const now = dict.home.now
  const data = getNow(locale)

  const highlights = [
    { label: dict.now.sections.building, items: data.building.slice(0, 1) },
    { label: dict.now.sections.learning, items: data.learning.slice(0, 1) },
    { label: dict.now.sections.exploring, items: data.exploring.slice(0, 1) },
  ]

  return (
    <section className="border-t">
      <div className="container-page grid gap-8 py-12 md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <p className="flex items-center gap-2.5 font-display text-xl tracking-tight">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-60 motion-reduce:animate-none motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-highlight" />
              </span>
              {now.eyebrow}
            </p>
            <p className="mt-1 pl-[18px] font-mono text-xs text-muted-foreground">
              {now.title} · {data.updatedAt}
            </p>
          </Reveal>
        </div>
        <div className="flex flex-col gap-3 md:col-span-7">
          {highlights.map((group) => (
            <Reveal key={group.label}>
              <p className="flex flex-col gap-1 text-sm leading-relaxed sm:flex-row sm:items-baseline sm:gap-4">
                <span className="eyebrow shrink-0 sm:w-28">{group.label}</span>
                <span className="text-muted-foreground">{group.items[0]}</span>
              </p>
            </Reveal>
          ))}
        </div>
        <div className="md:col-span-2 md:text-right">
          <Reveal delayMs={150}>
            <ArrowLink href={localePath(locale, "/now")}>
              {now.viewAll}
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
