"use client"

import { useEffect, useRef, useState } from "react"
import { StructureCanvas } from "@/components/three/structure-canvas"
import { LatticeFallbackSvg } from "@/components/three/lattice-fallback-svg"
import { cn } from "@/lib/utils"

interface HeroStructureProps {
  hue: number
  label: string
  className?: string
}

/*
 * Progressive enhancement: an SVG wireframe renders by default (SSR,
 * no-JS, reduced motion); the interactive canvas only mounts once the
 * element approaches the viewport.
 */
export function HeroStructure({ hue, label, className }: HeroStructureProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [nearViewport, setNearViewport] = useState(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true)
          observer.disconnect()
        }
      },
      { rootMargin: "200px" },
    )
    const node = ref.current
    if (!node) return
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("relative overflow-hidden", className)}
    >
      <LatticeFallbackSvg
        className={cn(
          "absolute inset-0 h-full w-full p-8 transition-opacity duration-700",
          nearViewport ? "opacity-0" : "opacity-100",
        )}
      />
      {nearViewport && (
        <StructureCanvas hue={hue} label={label} className="absolute inset-0" />
      )}
    </div>
  )
}
