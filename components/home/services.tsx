import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/site/arrow-link"
import { services } from "@/lib/content/services"

export function Services() {
  return (
    <section className="border-t bg-card/40">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="eyebrow">What I can build</p>
          <h2 className="mt-4 max-w-2xl font-display text-display-lg">
            Problems I solve, in order of appearance
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col border-t md:mt-16">
          {services.map((service, index) => (
            <Reveal key={service.id} delayMs={index * 60}>
              <div className="group grid gap-4 border-b py-8 transition-colors hover:bg-background/60 md:grid-cols-12 md:gap-8 md:py-10">
                <p className="font-mono text-sm text-muted-foreground md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="md:col-span-5">
                  <h3 className="font-display text-2xl transition-colors group-hover:text-highlight md:text-3xl">
                    {service.title}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="max-w-xl leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <p className="mt-4 font-mono text-xs tracking-wide text-muted-foreground/80">
                    {service.examples.join(" · ")}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-lg text-muted-foreground">
              Not sure where your problem fits? That&rsquo;s normal — it&rsquo;s
              the first thing we figure out.
            </p>
            <ArrowLink href="/start-a-project" className="shrink-0 text-base">
              Tell me what you&rsquo;re trying to build
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
