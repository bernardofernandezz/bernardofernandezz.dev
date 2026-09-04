import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"

/*
 * Editorial two-column layout — the sticky-feeling label column on the left
 * and a plain reading list on the right. Deliberately breaks the numbered
 * border-row pattern the other home sections use.
 */
export function CuriousAbout({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const curious = dict.home.curious
  const proof = getProof(locale)

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <div className="md:sticky md:top-28">
                <p className="eyebrow">{curious.eyebrow}</p>
                <h2 className="mt-4 font-display text-display-md tracking-tight md:text-display-lg">
                  {curious.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {curious.intro}
                </p>
              </div>
            </Reveal>
          </div>

          <dl className="md:col-span-8">
            {proof.curiosities.map((area, index) => (
              <Reveal key={area.title} delayMs={index * 60}>
                <div
                  className="group border-b py-7 first:border-t md:py-8"
                >
                  <dt className="font-display text-xl tracking-tight transition-colors duration-300 group-hover:text-highlight md:text-2xl">
                    {area.title}
                  </dt>
                  <dd className="mt-2.5 max-w-xl leading-relaxed text-muted-foreground">
                    {area.detail}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
