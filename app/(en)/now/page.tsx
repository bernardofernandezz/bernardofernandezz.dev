import type { Metadata } from "next"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/site/arrow-link"
import { LocalTime } from "@/components/site/local-time"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { pageMetadata } from "@/lib/i18n/metadata"
import { localePath } from "@/lib/i18n/config"
import { getNow } from "@/lib/content/now"

const locale = "en" as const

export const metadata: Metadata = (() => {
  const dict = getDictionary(locale)
  return pageMetadata(locale, "/now", dict.now.title, dict.now.intro)
})()

export default function NowPage() {
  const dict = getDictionary(locale)
  const now = dict.now
  const data = getNow(locale)

  const groups = [
    { label: now.sections.building, items: data.building },
    { label: now.sections.learning, items: data.learning },
    { label: now.sections.exploring, items: data.exploring },
    { label: now.sections.thinking, items: data.thinking },
  ]

  return (
    <div className="container-page max-w-3xl py-16 md:py-24">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="relative inline-flex size-1.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-60 motion-reduce:animate-none motion-reduce:hidden" />
            <span className="relative inline-flex size-1.5 rounded-full bg-highlight" />
          </span>
          {now.title} · {data.updatedAt} · <LocalTime label={dict.common.localTimeShort} />
        </p>
        <h1 className="mt-6 font-display text-display-lg tracking-tight">
          <span className="serif-accent">{now.title}</span>
          <span className="serif-accent text-muted-foreground">.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          {now.intro}
        </p>
      </Reveal>

      <div className="mt-14 border-t">
        {groups.map((group, index) => (
          <Reveal key={group.label} delayMs={index * 60}>
            <section
              aria-labelledby={`now-${index}`}
              className="border-b py-8 first:pt-8"
            >
              <h2 id={`now-${index}`} className="font-display text-xl tracking-tight">
                <span
                  className="mr-3 font-mono text-xs text-muted-foreground"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {group.label}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 pl-8">
                {group.items.map((item) => (
                  <li key={item} className="leading-relaxed text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-14 border-t pt-8">
          <p className="eyebrow">{now.whyLabel}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {now.whyBody}
          </p>
        </div>
      </Reveal>

      <Reveal>
        <div className="mt-16 flex flex-col items-start gap-6 border-t pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-display text-display-sm tracking-tight">
            {now.ctaLine}
          </p>
          <ArrowLink
            href={localePath(locale, "/start-a-project")}
            className="text-base"
          >
            {now.ctaLink}
          </ArrowLink>
        </div>
      </Reveal>
    </div>
  )
}
