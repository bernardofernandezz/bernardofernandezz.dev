import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getNow } from "@/lib/content/now"
import { getProof } from "@/lib/content/proof"

/*
 * The human layer, right after the hero: what Bernardo is curious about
 * this week, and what he can talk about for too long. Only reuses data
 * that already exists (now + curiosities) — no invented facts.
 * Indices, not titles: titles differ per locale, order doesn't.
 */
const TALK_INDICES = [3, 0, 4]

export function PersonalCuriosity({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const personal = dict.home.personal
  const now = getNow(locale)
  const curiosities = getProof(locale).curiosities
  const talk = TALK_INDICES.map((index) => curiosities[index]).filter(
    (area) => area !== undefined,
  )

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">{personal.eyebrow}</p>
          <h2 className="mt-6 max-w-3xl font-serif text-display-md italic leading-tight tracking-[-0.015em] md:text-display-lg">
            {personal.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {personal.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-10">
          <Reveal className="md:col-span-5">
            <div className="border-t pt-6">
              <p className="eyebrow">{personal.curiousLabel}</p>
              <ul className="mt-5 flex flex-col gap-4">
                {now.exploring.map((item) => (
                  <li
                    key={item}
                    className="max-w-md leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden="true" className="mr-3 text-highlight">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={120} className="md:col-span-6 md:col-start-7">
            <div className="border-t pt-6">
              <p className="eyebrow">{personal.talkLabel}</p>
              <ul className="mt-5 flex flex-col gap-5">
                {talk.map((area) => (
                  <li key={area.title} className="max-w-md">
                    <p className="font-display text-lg tracking-tight">
                      {area.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {area.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
