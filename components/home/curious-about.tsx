import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"

export function CuriousAbout({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const curious = dict.home.curious
  const proof = getProof(locale)

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{curious.eyebrow}</p>
              <h2 className="mt-4 max-w-2xl font-display text-display-lg tracking-tight">
                {curious.title}
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {curious.intro}
            </p>
          </div>
        </Reveal>

        <dl className="mt-14 grid gap-x-12 border-t sm:grid-cols-2 md:mt-20">
          {proof.curiosities.map((area, index) => (
            <Reveal key={area.title} delayMs={index * 70}>
              <div className="group border-b py-6">
                <dt className="font-display text-xl tracking-tight md:text-2xl">
                  <span
                    className="mr-3 inline-block font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-highlight"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {area.title}
                </dt>
                <dd className="mt-3 max-w-md pl-8 leading-relaxed text-muted-foreground">
                  {area.detail}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
