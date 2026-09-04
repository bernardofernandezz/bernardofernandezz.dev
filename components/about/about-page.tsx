import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/motion/reveal"
import { Magnetic } from "@/components/site/magnetic"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"
import { getNow } from "@/lib/content/now"

export function AboutPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const about = dict.about
  const proof = getProof(locale)

  return (
    <div className="container-page py-16 md:py-24">
      <Reveal>
        <p className="eyebrow">{dict.common.nav.about}</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg tracking-tight">
          {about.intro.plain}{" "}
          <span className="serif-accent">{about.intro.accent}</span>
          <span className="serif-accent text-muted-foreground">.</span>
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <div className="flex flex-col gap-6 border-t pt-8">
            {about.story.map((paragraph, index) => (
              <Reveal key={index} delayMs={index * 80}>
                <p
                  className={
                    index === 0
                      ? "text-xl leading-relaxed text-foreground"
                      : "text-lg leading-relaxed text-muted-foreground"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16">
              <p className="eyebrow">{about.workingWith}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {about.workingWithNote}
              </p>
              <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                {proof.stack.map((group) => (
                  <div key={group.area} className="border-t pt-4">
                    <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {group.area}
                    </dt>
                    <dd className="mt-2 font-mono text-sm leading-relaxed text-foreground/80">
                      {group.items.join(" · ")}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-14 border-t pt-8">
              <p className="eyebrow">{about.currently}</p>
              <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
                {about.currentlyBody(dict.common.availability, dict.common.location)}
              </p>
              <p className="mt-4 flex flex-col gap-1.5 pl-4 text-sm leading-relaxed text-muted-foreground">
                {getNow(locale).learning.map((item) => (
                  <span
                    key={item}
                    className="relative before:absolute before:-left-4 before:top-2.5 before:size-1.5 before:rounded-full before:bg-highlight"
                  >
                    {item}
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col md:col-span-5">
          <Reveal delayMs={150}>
            <div className="border-t pt-6">
              <p className="eyebrow">{about.beliefs.label}</p>
              <ul className="mt-5 border-t">
                {about.beliefs.items.map((belief, index) => (
                  <li
                    key={belief.title}
                    className="group border-b py-5"
                  >
                    <p className="font-display text-xl leading-snug tracking-tight">
                      <span
                        className="mr-3 font-mono text-xs text-muted-foreground transition-colors duration-300 group-hover:text-highlight"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {belief.title}
                    </p>
                    <p className="mt-2 pl-8 text-sm leading-relaxed text-muted-foreground">
                      {belief.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={250}>
            <div className="mt-10 border-t pt-6">
              <p className="eyebrow">{about.thinking.label}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {getNow(locale).thinking.map((question) => (
                  <li
                    key={question}
                    className="serif-accent text-lg leading-snug text-muted-foreground"
                  >
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delayMs={300}>
            <div className="mt-10 border-t pt-6">
              <p className="eyebrow">{about.evidence.label}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {about.evidence.body}
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <div className="mt-24 flex flex-col items-start gap-6 border-t pt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md font-display text-display-sm tracking-tight">
            {about.ctaLine}
          </p>
          <Magnetic>
            <Button asChild className="h-12 rounded-full px-7 text-base">
              <Link href={localePath(locale, "/start-a-project")}>
                {about.ctaButton}
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  )
}
