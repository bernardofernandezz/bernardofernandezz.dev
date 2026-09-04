import { CircleCheck, CircleMinus } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getFit } from "@/lib/content/fit"

export function GoodFit({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const fit = dict.home.fit
  const { goodFit, notAFit } = getFit(locale)

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">{fit.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-display-lg">
            {fit.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <ul className="flex flex-col gap-5">
              {goodFit.map((item, index) => (
                <Reveal key={item} delayMs={index * 70}>
                  <li className="flex gap-3.5 leading-relaxed">
                    <CircleCheck
                      className="mt-1 size-4.5 shrink-0 text-highlight"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <Reveal delayMs={150}>
              <div className="rounded-xl border bg-card/40 p-6 md:p-8">
                <p className="eyebrow">{fit.notFitLabel}</p>
                <ul className="mt-4 flex flex-col gap-4">
                  {notAFit.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CircleMinus
                        className="mt-0.5 size-4 shrink-0 text-muted-foreground/60"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t pt-5 text-sm leading-relaxed text-muted-foreground">
                  {fit.notSure}
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-display text-display-sm">{fit.afterLine}</p>
            <ArrowLink
              href={localePath(locale, "/start-a-project")}
              className="shrink-0 text-base"
            >
              {fit.afterCta}
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
