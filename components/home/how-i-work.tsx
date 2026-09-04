import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/site/arrow-link"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getWorkSteps } from "@/lib/content/work-steps"

export function HowIWork({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const process = dict.home.process
  const steps = getWorkSteps(locale)

  return (
    <section className="border-t bg-card/40">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 className="mt-4 max-w-2xl font-display text-display-lg">
            {process.title}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.number} className="h-full">
              <Reveal delayMs={index * 80} className="h-full">
                <div className="flex h-full flex-col bg-background p-6 transition-colors hover:bg-card md:p-7">
                  <span className="font-mono text-sm text-highlight">
                    {step.number}
                  </span>
                  <h3 className="mt-6 font-display text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-lg text-muted-foreground">{process.afterLine}</p>
            <ArrowLink
              href={localePath(locale, "/start-a-project")}
              className="shrink-0 text-base"
            >
              {process.afterCta}
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
