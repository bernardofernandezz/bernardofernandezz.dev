import type { CSSProperties, ReactElement } from "react"
import { DrawOnVisible } from "@/components/motion/draw-on-visible"
import { cn } from "@/lib/utils"

/*
 * Per-project system diagrams, drawn from the case-study copy — not
 * screenshots (there are none to show), but the actual architecture
 * each project is about. Labels stick to universal technical terms so
 * no translation is needed. Only slugs listed here render a diagram.
 */

function delay(ms: number): CSSProperties {
  return { "--draw-delay": `${ms}ms` } as CSSProperties
}

const LABEL = "fill-muted-foreground font-mono"
const ACCENT = "stroke-current"
const INK = "stroke-border"

function Box({
  x,
  y,
  w,
  lines,
  accent = false,
  delayMs = 0,
}: {
  x: number
  y: number
  w: number
  lines: readonly [string] | readonly [string, string]
  accent?: boolean
  delayMs?: number
}) {
  const h = 56
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        pathLength={1}
        fill="none"
        strokeWidth={1.5}
        style={delay(delayMs)}
        className={cn("draw-line", accent ? ACCENT : INK)}
      />
      <text
        x={x + w / 2}
        y={lines.length > 1 ? y + h / 2 - 8 : y + h / 2 + 1}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={12.5}
        className={cn("draw-fill", LABEL)}
        style={delay(delayMs + 250)}
      >
        {lines[0]}
      </text>
      {lines.length > 1 && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12.5}
          className={cn("draw-fill", LABEL)}
          style={delay(delayMs + 250)}
        >
          {lines[1]}
        </text>
      )}
    </g>
  )
}

function Flow({
  x1,
  y1,
  x2,
  y2,
  dashed = false,
  accent = false,
  delayMs = 0,
  marker,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  dashed?: boolean
  accent?: boolean
  delayMs?: number
  marker: string
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      pathLength={1}
      fill="none"
      strokeWidth={1.5}
      markerEnd={`url(#${marker})`}
      style={delay(delayMs)}
      className={cn(
        dashed ? "draw-march" : "draw-line",
        accent ? ACCENT : INK,
      )}
    />
  )
}

function ArrowHead({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX={8}
        refY={5}
        markerWidth={7}
        markerHeight={7}
        orient="auto-start-reverse"
      >
        <path d="M0 0L10 5L0 10z" className="fill-muted-foreground/70" />
      </marker>
    </defs>
  )
}

function MeridianDiagram() {
  return (
    <svg viewBox="0 0 640 300" className="h-full w-full" aria-hidden="true">
      <ArrowHead id="meridian-arrow" />
      <Box x={24} y={40} w={120} lines={["Client"]} delayMs={0} />
      <Flow x1={144} y1={68} x2={206} y2={68} delayMs={150} marker="meridian-arrow" />
      <Box x={206} y={40} w={196} lines={["Availability", "service"]} accent delayMs={250} />
      <Flow x1={402} y1={68} x2={464} y2={68} delayMs={450} marker="meridian-arrow" />
      <Box x={464} y={40} w={152} lines={["PostgreSQL"]} delayMs={550} />
      <Box x={24} y={196} w={120} lines={["Stripe"]} delayMs={150} />
      <Flow x1={144} y1={224} x2={330} y2={224} dashed delayMs={400} marker="meridian-arrow" />
      <text x={237} y={208} textAnchor="middle" fontSize={12} className="draw-fill fill-muted-foreground font-mono" style={delay(650)}>
        webhook
      </text>
      <Box x={330} y={196} w={200} lines={["Reservation:", "confirmed"]} accent delayMs={700} />
    </svg>
  )
}

function OpsBoardDiagram() {
  return (
    <svg viewBox="0 0 640 220" className="h-full w-full" aria-hidden="true">
      <ArrowHead id="opsboard-arrow" />
      <Box x={16} y={70} w={128} lines={["Field", "phones"]} delayMs={0} />
      <Flow x1={144} y1={98} x2={186} y2={98} delayMs={150} marker="opsboard-arrow" />
      <Box x={186} y={70} w={138} lines={["Domain", "events"]} accent delayMs={250} />
      <Flow x1={324} y1={98} x2={366} y2={98} delayMs={450} marker="opsboard-arrow" />
      <Box x={366} y={70} w={118} lines={["Event log"]} delayMs={550} />
      <Flow x1={484} y1={98} x2={496} y2={98} delayMs={700} marker="opsboard-arrow" />
      <text x={562} y={92} textAnchor="middle" fontSize={12} className="draw-fill fill-muted-foreground font-mono" style={delay(850)}>
        reconnect
      </text>
      <text x={562} y={110} textAnchor="middle" fontSize={12} className="draw-fill fill-muted-foreground font-mono" style={delay(850)}>
        rebuilds
      </text>
    </svg>
  )
}

function LedgerlineDiagram() {
  return (
    <svg viewBox="0 0 640 220" className="h-full w-full" aria-hidden="true">
      <ArrowHead id="ledgerline-arrow" />
      <Box x={12} y={70} w={108} lines={["Bank", "CSVs"]} delayMs={0} />
      <Flow x1={120} y1={98} x2={152} y2={98} delayMs={150} marker="ledgerline-arrow" />
      <Box x={152} y={70} w={132} lines={["Normalize", "at the edge"]} accent delayMs={250} />
      <Flow x1={284} y1={98} x2={316} y2={98} delayMs={450} marker="ledgerline-arrow" />
      <Box x={316} y={70} w={132} lines={["Transaction", "model"]} delayMs={550} />
      <Flow x1={448} y1={98} x2={480} y2={98} delayMs={700} marker="ledgerline-arrow" />
      <Box x={480} y={70} w={148} lines={["SQL views →", "dashboard"]} delayMs={800} />
    </svg>
  )
}

function FieldnoteDiagram() {
  return (
    <svg viewBox="0 0 640 300" className="h-full w-full" aria-hidden="true">
      <ArrowHead id="fieldnote-arrow" />
      <Box x={250} y={30} w={140} lines={["Write"]} accent delayMs={0} />
      <Flow x1={390} y1={58} x2={462} y2={170} delayMs={250} marker="fieldnote-arrow" />
      <Box x={462} y={196} w={140} lines={["Share"]} delayMs={350} />
      <Flow x1={462} y1={224} x2={178} y2={224} delayMs={550} marker="fieldnote-arrow" />
      <Box x={38} y={196} w={140} lines={["Discover"]} delayMs={650} />
      <Flow x1={108} y1={196} x2={230} y2={80} dashed delayMs={850} marker="fieldnote-arrow" />
      <text x={320} y={168} textAnchor="middle" fontSize={12} className="draw-fill fill-muted-foreground font-mono" style={delay(1000)}>
        six weeks · one loop
      </text>
    </svg>
  )
}

const DIAGRAMS: Readonly<Record<string, () => ReactElement>> = {
  ledgerline: LedgerlineDiagram,
  meridian: MeridianDiagram,
  fieldnote: FieldnoteDiagram,
  opsboard: OpsBoardDiagram,
}

export function hasProjectDiagram(slug: string): boolean {
  return slug in DIAGRAMS
}

export function ProjectDiagram({
  slug,
  title,
  label,
  className,
}: {
  slug: string
  title: string
  label: string
  className?: string
}) {
  const Diagram = DIAGRAMS[slug]
  if (!Diagram) return null

  return (
    <div
      role="img"
      aria-label={`${title} — ${label}`}
      className={cn("rounded-lg border bg-card p-6 md:p-8", className)}
    >
      <DrawOnVisible>
        <Diagram />
      </DrawOnVisible>
    </div>
  )
}
