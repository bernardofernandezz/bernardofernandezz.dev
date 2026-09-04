import { Reveal } from "@/components/motion/reveal"
import { approach } from "@/lib/content/proof"

export function Positioning() {
  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow">How I work</p>
            <p className="mt-8 font-display text-display-md leading-tight">
              I take problems that start vague and turn them into software
              that ships.
            </p>
            <p className="mt-8 max-w-md leading-relaxed text-muted-foreground">
              &ldquo;We need a system for this&rdquo; is where I like to
              start — before the spec exists, when the problem still needs to
              be shaped into something a person can build.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:pt-4">
          <dl className="flex flex-col divide-y">
            {approach.map((point, index) => (
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
