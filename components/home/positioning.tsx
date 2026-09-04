import { Reveal } from "@/components/motion/reveal"
import { capabilities } from "@/lib/content/experience"

export function Positioning() {
  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <Reveal>
            <p className="eyebrow">Beyond the code</p>
            <p className="mt-8 font-display text-display-md leading-tight">
              I don&rsquo;t just write code. I turn ambiguous ideas, complex
              problems and business needs into software that actually works.
            </p>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              That means thinking through the problem before touching the
              editor, designing the experience as carefully as the architecture,
              and staying accountable for the result — not just the tasks.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:pt-20">
          <dl className="flex flex-col divide-y">
            {capabilities.map((capability, index) => (
              <Reveal key={capability.title} delayMs={index * 80}>
                <div className="py-5 first:pt-0 last:pb-0">
                  <dt className="text-base font-medium">{capability.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {capability.detail}
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
