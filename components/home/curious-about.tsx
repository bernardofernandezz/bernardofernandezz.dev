"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { localePath, type Locale } from "@/lib/i18n/config"
import { getProof } from "@/lib/content/proof"
import { cn } from "@/lib/utils"

/*
 * A map of curiosity, not a skills chart. Node positions are fixed in a
 * 600×470 space; edges are an editorial view of how the threads connect
 * in Bernardo's head. Hover, focus or tap a topic: connected threads
 * light up and the detail appears below. Nothing here depends on hover
 * alone — tap selects, keyboard works through real buttons.
 *
 * Evidence links exist only where a project directly demonstrates the
 * topic (route-schema is a type-system tool; Typeset is developer
 * tooling). Topics without direct evidence link nowhere.
 */
const VIEW_W = 600
const VIEW_H = 470

interface MapNode {
  index: number
  x: number
  y: number
  anchor: "start" | "middle" | "end"
}

const NODES: readonly MapNode[] = [
  { index: 3, x: 300, y: 64, anchor: "middle" },
  { index: 0, x: 24, y: 196, anchor: "start" },
  { index: 1, x: 576, y: 196, anchor: "end" },
  { index: 2, x: 196, y: 384, anchor: "middle" },
  { index: 4, x: 404, y: 384, anchor: "middle" },
]

const LINKS: ReadonlyArray<readonly [number, number]> = [
  [3, 0],
  [0, 2],
  [2, 4],
  [4, 1],
  [1, 3],
]

const EVIDENCE_SLUG: Record<number, string> = {
  3: "route-schema",
  4: "typeset-playground",
}

export function CuriousAbout({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const curious = dict.home.curious
  const curiosities = getProof(locale).curiosities
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  const current = hovered ?? active
  const activeArea = curiosities[current]
  const evidenceSlug = EVIDENCE_SLUG[current]

  const edgeActive = (from: number, to: number) =>
    from === current || to === current

  const nodeProps = (index: number) => ({
    onMouseEnter: () => setHovered(index),
    onMouseLeave: () => setHovered(null),
    onFocus: () => setHovered(index),
    onBlur: () => setHovered(null),
    onClick: () => setActive(index),
  })

  return (
    <section className="border-t">
      <div className="container-page py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <Reveal>
              <div className="md:sticky md:top-28">
                <p className="eyebrow">{curious.eyebrow}</p>
                <h2 className="mt-4 font-display text-display-md tracking-tight md:text-display-lg">
                  {curious.title}
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {curious.intro}
                </p>
                <p className="mt-4 max-w-sm font-mono text-xs leading-relaxed text-muted-foreground/80">
                  {curious.mapHint}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            {/* Map — desktop and tablet. Hidden on small screens, where
                the list below takes over with the same state. */}
            <Reveal className="hidden md:block">
              <div
                role="group"
                aria-label={curious.title}
                className="relative aspect-[600/470] w-full"
              >
                <svg
                  viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  {LINKS.map(([from, to]) => {
                    const a = NODES.find((node) => node.index === from)
                    const b = NODES.find((node) => node.index === to)
                    if (!a || !b) return null
                    return (
                      <line
                        key={`${from}-${to}`}
                        x1={a.x}
                        y1={a.y}
                        x2={b.x}
                        y2={b.y}
                        strokeWidth={edgeActive(from, to) ? 2 : 1.5}
                        className={cn(
                          "transition-colors duration-300",
                          edgeActive(from, to)
                            ? "stroke-highlight"
                            : "stroke-border",
                        )}
                      />
                    )
                  })}
                  {NODES.map((node) => (
                    <circle
                      key={node.index}
                      cx={node.x}
                      cy={node.y}
                      r={5}
                      className={cn(
                        "transition-colors duration-300",
                        node.index === current
                          ? "fill-highlight"
                          : "fill-background stroke-muted-foreground/50",
                      )}
                      strokeWidth={node.index === current ? 0 : 1.5}
                    />
                  ))}
                </svg>
                {NODES.map((node) => {
                  const area = curiosities[node.index]
                  const selected = node.index === current
                  return (
                    <button
                      key={node.index}
                      type="button"
                      aria-pressed={selected}
                      {...nodeProps(node.index)}
                      style={{
                        left: `${(node.x / VIEW_W) * 100}%`,
                        top: `${(node.y / VIEW_H) * 100}%`,
                      }}
                      className={cn(
                        "absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-background px-4 py-2 text-left text-sm transition-colors duration-300",
                        node.anchor === "start" && "translate-x-0",
                        node.anchor === "end" && "-translate-x-full",
                        selected
                          ? "border-highlight text-highlight"
                          : "border-border text-foreground hover:border-highlight hover:text-highlight",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-[11px] text-muted-foreground"
                      >
                        {String(node.index + 1).padStart(2, "0")}
                      </span>
                      {area.title}
                    </button>
                  )
                })}
              </div>
            </Reveal>

            {/* List — small screens. Same state, same detail panel. */}
            <div role="group" aria-label={curious.title} className="md:hidden">
              {curiosities.map((area, index) => {
                const selected = index === current
                return (
                  <Reveal key={area.title} delayMs={index * 60}>
                    <button
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setActive(index)}
                      className={cn(
                        "group flex w-full items-baseline gap-3 border-b py-5 text-left transition-colors first:border-t",
                        selected ? "text-highlight" : "text-foreground",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl tracking-tight">
                        {area.title}
                      </span>
                    </button>
                  </Reveal>
                )
              })}
            </div>

            <Reveal>
              <div className="mt-8 min-h-[9rem] border-t pt-6 md:min-h-[8rem]">
                <p className="font-display text-xl tracking-tight md:text-2xl">
                  {activeArea.title}
                </p>
                <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                  {activeArea.detail}
                </p>
                {evidenceSlug && (
                  <Link
                    href={localePath(locale, `/work/${evidenceSlug}`)}
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-highlight"
                  >
                    {curious.evidenceLink}
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
