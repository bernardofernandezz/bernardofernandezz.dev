"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"
import { cn } from "@/lib/utils"

/*
 * One idea open at a time; the rest stay compact. Buttons all the way
 * down so keyboard users get the same experience — no hover-only content.
 */
export function Positioning({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const positioning = dict.home.positioning
  const proof = getProof(locale)
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <Reveal>
          <p className="font-serif text-display-lg italic leading-tight tracking-[-0.015em]">
            {dict.home.interlude}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">{positioning.eyebrow}</p>
              <h2 className="mt-6 font-display text-display-sm tracking-tight">
                {positioning.heading}
              </h2>
              <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
                {positioning.intro}
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="border-t">
              {proof.approach.map((point, index) => {
                const open = index === openIndex
                const panelId = `positioning-panel-${index}`
                const buttonId = `positioning-button-${index}`
                return (
                  <Reveal key={point.title} delayMs={index * 80}>
                    <div className="border-b">
                      <h3>
                        <button
                          type="button"
                          id={buttonId}
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setOpenIndex(open ? -1 : index)}
                          className="group grid w-full items-baseline gap-3 py-7 text-left md:grid-cols-12 md:gap-6"
                        >
                          <span
                            className={cn(
                              "font-mono text-xs transition-colors duration-300 md:col-span-1 md:pt-1.5",
                              open
                                ? "text-highlight"
                                : "text-muted-foreground group-hover:text-highlight",
                            )}
                            aria-hidden="true"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={cn(
                              "text-lg font-medium transition-colors duration-300 md:col-span-10",
                              open ? "text-foreground" : "text-foreground/80",
                            )}
                          >
                            {point.title}
                          </span>
                          <Plus
                            className={cn(
                              "size-4 justify-self-end transition-transform duration-300 motion-reduce:transition-none",
                              open
                                ? "rotate-45 text-highlight"
                                : "text-muted-foreground group-hover:text-foreground",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        inert={!open}
                        className={cn(
                          "grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none",
                          open
                            ? "grid-rows-[1fr] visible"
                            : "grid-rows-[0fr] invisible",
                        )}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="max-w-xl pb-7 leading-relaxed text-muted-foreground md:pb-8">
                            {point.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
