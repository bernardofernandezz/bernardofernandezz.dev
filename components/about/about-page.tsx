import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"

export function AboutPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const about = dict.about
  const proof = getProof(locale)

  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{dict.common.nav.about}</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg">
          {about.intro.plain}{" "}
          <span className="italic">{about.intro.accent}</span>.
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div className="flex flex-col gap-6">
            {about.story.map((paragraph, index) => (
              <Reveal key={index} delayMs={index * 80}>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16">
              <p className="eyebrow">{about.workingWith}</p>
              <dl className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {proof.stack.map((group) => (
                  <div key={group.area}>
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {group.area}
                    </dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border px-3 py-1 font-mono text-xs text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal delayMs={150}>
            <div className="rounded-xl border bg-card/40 p-8">
              <p className="eyebrow">{about.beliefs.label}</p>
              <ul className="mt-6 flex flex-col gap-6">
                {about.beliefs.items.map((belief) => (
                  <li key={belief.title}>
                    <p className="font-display text-xl leading-snug">
                      {belief.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {belief.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={250}>
            <div className="mt-8 rounded-xl border p-8">
              <p className="eyebrow">{about.exploring}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {proof.currentlyExploring.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-highlight"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="mt-8 rounded-xl border p-8">
              <p className="eyebrow">{about.evidence.label}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {about.evidence.body}
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={350}>
            <div className="mt-8 rounded-xl border p-8">
              <p className="eyebrow">{about.currently}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {about.currentlyBody(dict.common.availability, dict.common.location)}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="mt-24 flex flex-col items-start gap-6 border-t pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-display text-display-sm">{about.ctaLine}</p>
          <Button
            asChild
            className="rounded-full bg-highlight px-7 text-base text-highlight-foreground hover:bg-highlight/90"
          >
            <Link href={localePath(locale, "/start-a-project")}>
              {about.ctaButton}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Reveal>
    </div>
  )
}
