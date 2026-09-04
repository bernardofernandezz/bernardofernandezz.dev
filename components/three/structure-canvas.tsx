"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface StructureCanvasProps {
  hue: number
  className?: string
}

interface Vec3 {
  readonly x: number
  readonly y: number
  readonly z: number
}

interface Edge {
  readonly a: number
  readonly b: number
}

interface Pulse {
  readonly path: readonly number[]
  readonly startedAt: number
  readonly duration: number
}

const GRID = 6
const SPREAD = 1.18
const PULSE_INTERVAL = 2100
const PULSE_MAX_ACTIVE = 4
const POINTER_RADIUS = 130

function projectPoint(
  point: Vec3,
  angleY: number,
  angleX: number,
  centerX: number,
  centerY: number,
  scale: number,
): { x: number; y: number; z: number } {
  const cosY = Math.cos(angleY)
  const sinY = Math.sin(angleY)
  const cosX = Math.cos(angleX)
  const sinX = Math.sin(angleX)

  const x1 = point.x * cosY - point.z * sinY
  const z1 = point.x * sinY + point.z * cosY
  const y1 = point.y * cosX - z1 * sinX

  const depth = 6.5
  const factor = depth / (depth + z1)
  return {
    x: centerX + x1 * scale * factor,
    y: centerY + y1 * scale * factor,
    z: z1,
  }
}

interface Lattice {
  readonly base: readonly Vec3[]
  readonly edges: readonly Edge[]
  readonly adjacency: readonly number[][]
  readonly accents: ReadonlySet<number>
}

function buildLattice(): Lattice {
  const base: Vec3[] = []
  const index = (x: number, y: number, z: number) =>
    x + y * GRID + z * GRID * GRID

  for (let z = 0; z < GRID; z++) {
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        base.push({
          x: (x - (GRID - 1) / 2) * SPREAD,
          y: (y - (GRID - 1) / 2) * SPREAD,
          z: (z - (GRID - 1) / 2) * SPREAD,
        })
      }
    }
  }

  const edges: Edge[] = []
  const adjacency: number[][] = base.map(() => [])
  const pushEdge = (a: number, b: number) => {
    edges.push({ a, b })
    adjacency[a].push(b)
    adjacency[b].push(a)
  }

  for (let z = 0; z < GRID; z++) {
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        if (x + 1 < GRID) pushEdge(index(x, y, z), index(x + 1, y, z))
        if (y + 1 < GRID) pushEdge(index(x, y, z), index(x, y + 1, z))
        if (z + 1 < GRID) pushEdge(index(x, y, z), index(x, y, z + 1))
      }
    }
  }

  // A deterministic subset of nodes carries the accent — sparse, not neon.
  const accents = new Set<number>()
  for (let z = 0; z < GRID; z++) {
    for (let y = 0; y < GRID; y++) {
      for (let x = 0; x < GRID; x++) {
        const i = index(x, y, z)
        if ((x + 2 * y + 3 * z) % 9 === 0) accents.add(i)
      }
    }
  }

  return { base, edges, adjacency, accents }
}

/*
 * A random walk through the lattice — the pulse is the path, not a particle.
 */
function buildPulsePath(lattice: Lattice): readonly number[] {
  const path: number[] = [Math.floor(Math.random() * lattice.base.length)]
  for (let hop = 1; hop < 9; hop++) {
    const neighbors = lattice.adjacency[path[hop - 1]]
    const previous = path[hop - 2]
    const candidates =
      neighbors.length > 1 && previous !== undefined
        ? neighbors.filter((n) => n !== previous)
        : neighbors
    path.push(candidates[Math.floor(Math.random() * candidates.length)])
  }
  return path
}

export function StructureCanvas({ hue, className }: StructureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const lattice = buildLattice()
    const drift = lattice.base.map((_, index) => ({
      phaseX: (index % 7) * 0.9,
      phaseY: (index % 11) * 0.7,
      phaseZ: (index % 13) * 0.5,
      amplitude: 0.045 + (index % 5) * 0.008,
    }))

    let width = 0
    let height = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    let angleY = 0.55
    let angleX = 0.26
    let targetAngleY = angleY
    let targetAngleX = angleX
    let pointerActive = false
    let pointerX = -Infinity
    let pointerY = -Infinity

    // Scroll rotates the structure — the hero keeps reacting after the cursor leaves.
    let scrollTilt = 0
    const onScroll = () => {
      scrollTilt = Math.min(window.scrollY / 900, 1)
    }
    onScroll()

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = event.clientX - rect.left
      pointerY = event.clientY - rect.top
      pointerActive =
        pointerX >= 0 && pointerX <= rect.width && pointerY >= 0 && pointerY <= rect.height
      const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width
      const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height
      targetAngleY = 0.55 + dx * 0.5
      targetAngleX = 0.26 + dy * 0.32
    }
    const onPointerLeave = () => {
      pointerActive = false
      pointerX = -Infinity
      pointerY = -Infinity
    }

    const pulses: Pulse[] = []
    let lastPulseAt = 0

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height)
      const dark = document.documentElement.classList.contains("dark")
      const ink = dark ? "240,238,232" : "28,26,23"
      const strokeAlpha = dark ? 0.14 : 0.1
      const nodeAlpha = dark ? 0.4 : 0.36
      const accentLightness = dark ? 68 : 48
      const accent = `hsl(${hue} ${dark ? 62 : 68}% ${accentLightness}%)`

      const scale = Math.min(width, height) * 0.085
      const t = time / 1000

      // Organic drift keeps the structure continuously changing.
      const current: Vec3[] = lattice.base.map((point, index) => {
        const d = drift[index]
        return {
          x: point.x + Math.sin(t * 0.5 + d.phaseX) * d.amplitude,
          y: point.y + Math.cos(t * 0.42 + d.phaseY) * d.amplitude,
          z: point.z + Math.sin(t * 0.36 + d.phaseZ) * d.amplitude,
        }
      })

      const projected = current.map((point) =>
        projectPoint(
          point,
          angleY + scrollTilt * 0.6,
          angleX - scrollTilt * 0.24,
          width / 2,
          height / 2,
          scale,
        ),
      )

      // Pointer proximity excites nodes — they lean toward the cursor.
      const excite = new Float32Array(projected.length)
      if (pointerActive) {
        const radiusSquared = POINTER_RADIUS * POINTER_RADIUS
        for (let i = 0; i < projected.length; i++) {
          const dx = projected[i].x - pointerX
          const dy = projected[i].y - pointerY
          const distanceSquared = dx * dx + dy * dy
          if (distanceSquared < radiusSquared) {
            excite[i] = 1 - Math.sqrt(distanceSquared) / POINTER_RADIUS
          }
        }
      }

      context.lineWidth = 1

      for (const edge of lattice.edges) {
        const pa = projected[edge.a]
        const pb = projected[edge.b]
        const depthFade = 1 - Math.min(Math.abs(pa.z + pb.z) / 9, 0.55)
        context.strokeStyle = `rgba(${ink},${(strokeAlpha * depthFade).toFixed(3)})`
        context.beginPath()
        context.moveTo(pa.x, pa.y)
        context.lineTo(pb.x, pb.y)
        context.stroke()
      }

      // Signals travel the edges — the system is alive, not just rotating.
      if (time - lastPulseAt > PULSE_INTERVAL && pulses.length < PULSE_MAX_ACTIVE) {
        pulses.push({
          path: buildPulsePath(lattice),
          startedAt: time,
          duration: 1500 + Math.random() * 900,
        })
        lastPulseAt = time
      }
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p]
        const progress = (time - pulse.startedAt) / pulse.duration
        if (progress >= 1) {
          pulses.splice(p, 1)
          continue
        }
        const head = progress * (pulse.path.length - 1)
        const segment = Math.min(Math.floor(head), pulse.path.length - 2)
        const fraction = head - segment
        const from = projected[pulse.path[segment]]
        const to = projected[pulse.path[segment + 1]]
        const x = from.x + (to.x - from.x) * fraction
        const y = from.y + (to.y - from.y) * fraction

        // Trail: recent segments glow with decaying strength.
        for (let s = 0; s < Math.min(segment, 4); s++) {
          const a = projected[pulse.path[segment - s]]
          const b = projected[pulse.path[segment - s + 1]]
          context.strokeStyle = accent
          context.globalAlpha = (1 - progress) * (0.32 - s * 0.07)
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
        context.globalAlpha = (1 - progress) * 0.85 + 0.15
        context.fillStyle = accent
        context.beginPath()
        context.arc(x, y, 2.4, 0, Math.PI * 2)
        context.fill()
        context.globalAlpha = 1
      }

      projected.forEach((point, index) => {
        const excited = excite[index]
        const accentNode = lattice.accents.has(index)
        if (accentNode) {
          const breathe = 0.5 + 0.5 * Math.sin(t * 0.9 + index * 1.7)
          context.globalAlpha = (0.5 + breathe * 0.4) * (1 + excited * 0.5)
          context.fillStyle = accent
          context.beginPath()
          context.arc(
            point.x + excited * 4,
            point.y + excited * 3,
            2.6 + breathe * 1.1 + excited * 2.4,
            0,
            Math.PI * 2,
          )
          context.fill()
          context.globalAlpha = 1
          return
        }
        if (excited > 0.05) {
          context.globalAlpha = nodeAlpha + excited * 0.6
          context.fillStyle = accent
          context.beginPath()
          context.arc(
            point.x + excited * 5,
            point.y + excited * 4,
            2.4 + excited * 1.8,
            0,
            Math.PI * 2,
          )
          context.fill()
          context.globalAlpha = 1
          return
        }
        context.globalAlpha = nodeAlpha * (1 - Math.min(Math.abs(point.z) / 9, 0.45))
        context.fillStyle = `rgb(${ink})`
        context.beginPath()
        context.arc(point.x, point.y, 2.2, 0, Math.PI * 2)
        context.fill()
        context.globalAlpha = 1
      })
    }

    let frame = 0
    let running = false

    const tick = (time: number) => {
      if (!pointerActive) {
        // Wrapped so idle sessions running for hours don't lose float precision.
        targetAngleY =
          0.55 + ((targetAngleY - 0.55 + 0.0014) % (Math.PI * 2))
      }
      angleY += (targetAngleY - angleY) * 0.045
      angleX += (targetAngleX - angleX) * 0.045
      draw(time)
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || reducedMotion) return
      running = true
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(frame)
    }

    let visible = true
    const onVisibilityChange = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    intersectionObserver.observe(canvas)
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("scroll", onScroll, { passive: true })

    const pointerTarget = canvas.parentElement ?? canvas
    const section = pointerTarget.closest("section") ?? pointerTarget
    section.addEventListener("pointermove", onPointerMove)
    section.addEventListener("pointerleave", onPointerLeave)

    if (reducedMotion) {
      angleY = 0.72
      angleX = 0.3
      draw(0)
    } else {
      start()
    }

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("scroll", onScroll)
      section.removeEventListener("pointermove", onPointerMove)
      section.removeEventListener("pointerleave", onPointerLeave)
    }
  }, [hue])

  // Announced once by the HeroStructure wrapper (role="img") —
  // a second label here would double-announce when the canvas mounts.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  )
}
