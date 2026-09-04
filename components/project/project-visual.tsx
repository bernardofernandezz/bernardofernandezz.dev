import type { ProjectVisualSpec } from "@/lib/content/projects"
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
          className="stroke-border"
          {...STROKE}
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
        <rect
          key={col}
          x={40 + col * 40}
          y={70}
          width="18"
          height={col % 3 === 1 ? 120 : col % 3 === 2 ? 70 : 150}
          rx="4"
          className="fill-current opacity-70"
          transform={`translate(0 ${170 - (col % 3 === 1 ? 120 : col % 3 === 2 ? 70 : 150)})`}
        />
      ))}
    </svg>
  )
}

function FlowPattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <path
        d="M60 220 C 120 220, 120 90, 200 90 S 280 210, 340 90"
        className="stroke-border"
        {...STROKE}
      />
      <path
        d="M60 150 C 130 150, 150 220, 220 220 S 300 150, 340 170"
        className="stroke-current opacity-80"
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
          className={index % 2 === 0 ? "fill-current" : "fill-background stroke-current"}
          strokeWidth="1.5"
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
      ].map(({ y, w, cls }) => (
        <rect
          key={y}
          x={(400 - w) / 2}
          y={y}
          width={w}
          height="34"
          rx="8"
          className={cls}
          fill="none"
          strokeWidth="1.5"
        />
      ))}
      <rect x="140" y="112" width="120" height="10" rx="5" className="fill-current opacity-70" />
    </svg>
  )
}

function PulsePattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <path
        d="M40 150 H120 L150 90 L185 210 L215 150 H360"
        className="stroke-current"
        {...STROKE}
      />
      <line x1="40" x2="360" y1="230" y2="230" className="stroke-border" {...STROKE} />
      <line x1="40" x2="360" y1="70" y2="70" className="stroke-border" {...STROKE} />
      {[
        [120, 150],
        [150, 90],
        [185, 210],
        [215, 150],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" className="fill-current" />
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
        className="fill-current"
        fontFamily="Georgia, serif"
        fontStyle="italic"
      >
        Aa
      </text>
      <text x="190" y="230" fontSize="72" className="fill-current opacity-50" fontFamily="Georgia, serif">
        Bg
      </text>
      <line x1="40" x2="360" y1="258" y2="258" className="stroke-border" {...STROKE} />
      <line x1="40" x2="360" y1="42" y2="42" className="stroke-border" {...STROKE} />
    </svg>
  )
}

function SchemaPattern() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      <rect x="150" y="30" width="100" height="44" rx="8" className="stroke-current" fill="none" strokeWidth="1.5" />
      <rect x="40" y="200" width="100" height="44" rx="8" className="stroke-border" fill="none" strokeWidth="1.5" />
      <rect x="260" y="200" width="100" height="44" rx="8" className="stroke-border" fill="none" strokeWidth="1.5" />
      <path d="M180 74 L100 200 M220 74 L300 200" className="stroke-border" {...STROKE} />
      <rect x="176" y="42" width="48" height="8" rx="4" className="fill-current opacity-70" />
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
      style={{ "--project-hue": spec.hue } as React.CSSProperties}
      className={cn(
        "project-accent relative overflow-hidden rounded-xl border bg-card p-6 md:p-8",
        className,
      )}
    >
      <Pattern />
    </div>
  )
}
