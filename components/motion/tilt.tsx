"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TiltProps {
  children: ReactNode
  className?: string
  /** Max rotation in degrees at the card edge. Default 6. */
  max?: number
}

/*
 * Pointer-driven 3D tilt: the card leans toward the cursor with a
 * lerped spring-back on leave. Desktop fine pointers only, never under
 * reduced motion — content is identical whenever the effect doesn't run.
 * Purely decorative depth; everything inside stays fully interactive.
 */
export function Tilt({ children, className, max = 6 }: TiltProps) {
  const zoneRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const zone = zoneRef.current
    const inner = innerRef.current
    if (!zone || !inner) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (reducedMotion || !canHover) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let scale = 1
    let x = 0
    let y = 0
    let s = 1
    let active = false
    let rect: DOMRect | null = null

    const tick = () => {
      x += (targetX - x) * 0.14
      y += (targetY - y) * 0.14
      s += (scale - s) * 0.14
      inner.style.transform = `rotateX(${y.toFixed(3)}deg) rotateY(${x.toFixed(3)}deg) scale(${s.toFixed(4)})`
      if (
        active ||
        Math.abs(targetX - x) > 0.02 ||
        Math.abs(targetY - y) > 0.02 ||
        Math.abs(scale - s) > 0.0005
      ) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
        inner.style.transform = ""
      }
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const onPointerEnter = () => {
      rect = zone.getBoundingClientRect()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!rect) rect = zone.getBoundingClientRect()
      const px = (event.clientX - rect.left) / rect.width - 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5
      targetX = px * max * 2
      targetY = -py * max * 2
      scale = 1.015
      active = true
      start()
    }

    const onPointerLeave = () => {
      rect = null
      targetX = 0
      targetY = 0
      scale = 1
      active = false
      start()
    }

    zone.addEventListener("pointerenter", onPointerEnter, { passive: true })
    zone.addEventListener("pointermove", onPointerMove, { passive: true })
    zone.addEventListener("pointerleave", onPointerLeave, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      zone.removeEventListener("pointerenter", onPointerEnter)
      zone.removeEventListener("pointermove", onPointerMove)
      zone.removeEventListener("pointerleave", onPointerLeave)
      inner.style.transform = ""
    }
  }, [max])

  return (
    <div ref={zoneRef} className={cn("h-full w-full [perspective:1100px]", className)}>
      <div ref={innerRef} className="h-full w-full will-change-transform [transform-style:preserve-3d]">
        {children}
      </div>
    </div>
  )
}
