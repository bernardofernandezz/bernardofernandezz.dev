import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"

export function Positioning({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const positioning = dict.home.positioning
  const proof = getProof(locale)

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="font-serif text-display-lg italic leading-tight tracking-[-0.015em]">
            {dict.home.interlude}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">{positioning.eyebrow}</p>
              <p className="mt-6 font-display text-display-sm tracking-tight">
                {positioning.heading}
              </p>
              <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
                {positioning.intro}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <dl className="border-t">
              {proof.approach.map((point, index) => (
                <Reveal key={point.title} delayMs={index * 80}>
                  <div className="group grid gap-3 border-b py-7 md:grid-cols-12 md:gap-6">
                    <p className="font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-highlight md:col-span-1 md:pt-1.5">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <dt className="text-lg font-medium md:col-span-4">
                      {point.title}
                    </dt>
                    <dd className="leading-relaxed text-muted-foreground md:col-span-7">
                      {point.detail}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
