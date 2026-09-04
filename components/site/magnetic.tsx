"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MagneticProps {
  children: ReactNode
  className?: string
}

/*
 * Subtle magnetic hover: the inner span leans toward the cursor and
 * springs back on leave. Desktop pointer only, never under reduced
 * motion — content is unchanged whenever the effect doesn't run.
 */
export function Magnetic({ children, className }: MagneticProps) {
  const zoneRef = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)

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
    let x = 0
    let y = 0
    let following = false
    let rect: DOMRect | null = null

    const tick = () => {
      x += (targetX - x) * 0.22
      y += (targetY - y) * 0.22
      inner.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`
      if (following || Math.abs(targetX - x) > 0.05 || Math.abs(targetY - y) > 0.05) {
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
      // Cached for the whole hover — reading the rect per pointermove
      // would force layout on every event.
      rect = zone.getBoundingClientRect()
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!rect) rect = zone.getBoundingClientRect()
      targetX = (event.clientX - (rect.left + rect.width / 2)) * 0.18
      targetY = (event.clientY - (rect.top + rect.height / 2)) * 0.24
      following = true
      start()
    }

    const onPointerLeave = () => {
      rect = null
      targetX = 0
      targetY = 0
      following = false
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
  }, [])

  return (
    <span ref={zoneRef} className={cn("inline-block", className)}>
      <span ref={innerRef} className="inline-block will-change-transform">
        {children}
      </span>
    </span>
  )
}
