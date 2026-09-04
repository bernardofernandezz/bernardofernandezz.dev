import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"

/*
 * A typographic breather between the curiosity list and the notes:
 * one personal line, one link. No rows, no borders, no cards.
 */
export function AboutTeaser({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const teaser = dict.home.aboutTeaser

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">{teaser.eyebrow}</p>
          <p className="mt-6 max-w-3xl font-display text-display-md tracking-tight">
            {teaser.line}
          </p>
          <ArrowLink
            href={localePath(locale, "/about")}
            className="mt-8 text-base"
          >
            {teaser.link}
          </ArrowLink>
        </Reveal>
      </div>
    </section>
  )
}
