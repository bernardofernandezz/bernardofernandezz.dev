import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"

export function Positioning({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const proof = getProof(locale)

  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow">{dict.home.positioning.eyebrow}</p>
            <p className="mt-8 font-display text-display-md leading-tight">
              {dict.home.positioning.heading}
            </p>
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
              {dict.home.positioning.intro}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <dl className="flex flex-col divide-y">
            {proof.approach.map((point, index) => (
              <Reveal key={point.title} delayMs={index * 80}>
                <div className="py-6 first:pt-0 last:pb-0">
                  <dt className="text-base font-medium">{point.title}</dt>
                  <dd className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                    {point.detail}
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
