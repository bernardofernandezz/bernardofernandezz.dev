import type { CSSProperties } from "react"
import type { ProjectVisualSpec } from "@/lib/content/projects"
import { DrawOnVisible } from "@/components/motion/draw-on-visible"
import { Tilt } from "@/components/motion/tilt"
import { cn } from "@/lib/utils"

interface ProjectVisualProps {
  spec: ProjectVisualSpec
  title: string
  className?: string
}

const STROKE = {
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

function delay(ms: number): CSSProperties {
  return { "--draw-delay": `${ms}ms` } as CSSProperties
}

function animDelay(ms: number): CSSProperties {
  return { animationDelay: `${ms}ms` } as CSSProperties
}

function GridPattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((row) => (
        <line
          key={row}
          x1="40"
          x2="360"
          y1={70 + row * 40}
          y2={70 + row * 40}
          pathLength={1}
          className="draw-line stroke-border"
          style={delay(row * 80)}
          {...STROKE}
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => {
        const height = col % 3 === 1 ? 120 : col % 3 === 2 ? 70 : 150
        return (
          <rect
            key={col}
            x={40 + col * 40}
            y={240 - height}
            width="18"
            height={height}
            rx="4"
            pathLength={1}
            className={cn(
              "draw-line anim-breathe",
              col === 5 ? "stroke-current" : "stroke-border",
            )}
            style={{
              ...delay(400 + col * 70),
              ...animDelay(col * 640),
              ...(col % 3 === 1 ? { "--breathe": 0.82 } : col % 3 === 2 ? { "--breathe": 0.7 } : { "--breathe": 0.9 }),
            }}
            {...STROKE}
          />
        )
      })}
      <circle
        cx="340"
        cy="220"
        r="5"
        pathLength={1}
        className="draw-node anim-glow fill-current"
        style={delay(1000)}
      />
    </svg>
  )
}

function FlowPattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <path
        d="M60 220 C 120 220, 120 90, 200 90 S 280 210, 340 90"
        pathLength={1}
        className="draw-line stroke-border"
        {...STROKE}
      />
      <path
        d="M60 150 C 130 150, 150 220, 220 220 S 300 150, 340 170"
        className="draw-march stroke-current"
        style={{ ...delay(250), ...{ "--march-opacity": 0.8 } } as CSSProperties}
        {...STROKE}
      />
      {[
        [60, 220],
        [200, 90],
        [340, 90],
        [60, 150],
        [220, 220],
        [340, 170],
      ].map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={index % 2 === 0 ? 6 : 4}
          className={
            index % 2 === 0
              ? "draw-node anim-glow fill-current"
              : "draw-node fill-background stroke-current"
          }
          strokeWidth="1.5"
          style={{ ...delay(500 + index * 90), ...animDelay(index * 520) }}
        />
      ))}
    </svg>
  )
}

function LayersPattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {[
        { y: 200, w: 240, cls: "stroke-border" },
        { y: 150, w: 280, cls: "stroke-border" },
        { y: 100, w: 240, cls: "stroke-current opacity-80" },
      ].map(({ y, w, cls }, index) => (
        <rect
          key={y}
          x={(400 - w) / 2}
          y={y}
          width={w}
          height="34"
          rx="8"
          pathLength={1}
          className={`draw-line anim-float ${cls}`}
          style={{
            ...delay(index * 180),
            ...animDelay(index * 900),
            ...(index === 1 ? { "--float-y": "-4px" } : { "--float-y": index === 0 ? "-3px" : "-7px" }),
          }}
          fill="none"
          strokeWidth="1.5"
        />
      ))}
      <rect
        x="140"
        y="112"
        width="120"
        height="10"
        rx="5"
        className="draw-fill fill-current opacity-70"
        style={delay(700)}
      />
    </svg>
  )
}

function PulsePattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <path
        d="M40 150 H120 L150 90 L185 210 L215 150 H360"
        pathLength={1}
        className="draw-line stroke-current"
        style={delay(200)}
        {...STROKE}
      />
      <line x1="40" x2="360" y1="230" y2="230" pathLength={1} className="draw-line stroke-border" {...STROKE} />
      <line x1="40" x2="360" y1="70" y2="70" pathLength={1} className="draw-line stroke-border" style={delay(120)} {...STROKE} />
      {[
        [120, 150],
        [150, 90],
        [185, 210],
        [215, 150],
      ].map(([cx, cy], index) => (
        <circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="4"
          className="draw-node anim-glow fill-current"
          style={{ ...delay(700 + index * 110), ...animDelay(index * 780) }}
        />
      ))}
    </svg>
  )
}

function TypePattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <text
        x="40"
        y="150"
        fontSize="120"
        className="draw-fill anim-float fill-current"
        style={{ ...delay(150), ...{ "--float-y": "-4px" } }}
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        Aa
      </text>
      <text
        x="190"
        y="230"
        fontSize="72"
        className="draw-fill anim-float fill-current opacity-50"
        style={{ ...delay(400), ...animDelay(1400), ...{ "--float-y": "-3px" } }}
        fontFamily="Georgia, serif"
      >
        Bg
      </text>
      <line x1="40" x2="360" y1="258" y2="258" pathLength={1} className="draw-line stroke-border" {...STROKE} />
      <line x1="40" x2="360" y1="42" y2="42" pathLength={1} className="draw-line stroke-border" {...STROKE} />
    </svg>
  )
}

function SchemaPattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <rect x="150" y="30" width="100" height="44" rx="8" pathLength={1} className="draw-line stroke-current" fill="none" strokeWidth="1.5" />
      <rect x="40" y="200" width="100" height="44" rx="8" pathLength={1} className="draw-line stroke-border" fill="none" strokeWidth="1.5" style={delay(200)} />
      <rect x="260" y="200" width="100" height="44" rx="8" pathLength={1} className="draw-line stroke-border" fill="none" strokeWidth="1.5" style={delay(350)} />
      <path d="M180 74 L100 200 M220 74 L300 200" className="draw-march stroke-border" {...STROKE} />
      <rect x="176" y="42" width="48" height="8" rx="4" className="draw-fill anim-glow fill-current opacity-70" style={delay(650)} />
    </svg>
  )
}

const PATTERNS = {
  grid: GridPattern,
  flow: FlowPattern,
  layers: LayersPattern,
  pulse: PulsePattern,
  type: TypePattern,
  schema: SchemaPattern,
} as const

export function ProjectVisual({ spec, title, className }: ProjectVisualProps) {
  const Pattern = PATTERNS[spec.pattern]

  return (
    <div
      role="img"
      aria-label={`Abstract visual composition for ${title}`}
      style={{ "--project-hue": spec.hue } as CSSProperties}
      className={cn(
        "project-accent project-visual relative overflow-hidden rounded-lg border bg-card p-6 md:p-8",
        className,
      )}
    >
      <Tilt max={5}>
        <DrawOnVisible>
          <Pattern />
        </DrawOnVisible>
      </Tilt>
    </div>
  )
}
