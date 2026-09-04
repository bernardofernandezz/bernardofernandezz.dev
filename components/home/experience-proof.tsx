import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/site/arrow-link"
import { experience } from "@/lib/content/experience"

export function ExperienceProof() {
  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <Reveal>
            <p className="eyebrow">Experience</p>
            <h2 className="mt-4 font-display text-display-md leading-tight">
              A track record you can check
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
              No inflated numbers, no invented clients. The work speaks through
              the case studies — and through the people I&rsquo;ve built it
              with.
            </p>
            <ArrowLink href="/about" className="mt-8">
              More about me
            </ArrowLink>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <ol className="flex flex-col border-t">
            {experience.map((entry, index) => (
              <li key={entry.title}>
                <Reveal delayMs={index * 70}>
                  <div className="grid gap-2 border-b py-7 md:grid-cols-12 md:gap-6">
                    <p className="font-mono text-sm text-muted-foreground md:col-span-3">
                      {entry.period}
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="text-base font-medium">
                        {entry.title}
                        <span className="font-normal text-muted-foreground">
                          {" "}
                          — {entry.context}
                        </span>
                      </h3>
                      <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                        {entry.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
