import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"

export function EngineeringProof({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const engineering = dict.home.engineering
  const proof = getProof(locale)

  return (
    <section className="border-t">
      <div className="container-page grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow">{engineering.eyebrow}</p>
            <h2 className="mt-4 font-display text-display-md leading-tight">
              {engineering.title}
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              {engineering.body1}
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              {engineering.body2}
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delayMs={100}>
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {proof.stack.map((group) => (
                <div key={group.area}>
                  <dt className="eyebrow">{group.area}</dt>
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
          </Reveal>

          <Reveal delayMs={200}>
            <div className="mt-12 rounded-xl border bg-card/40 p-6 md:p-8">
              <p className="eyebrow">{engineering.exploringLabel}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
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
        </div>
      </div>
    </section>
  )
}
