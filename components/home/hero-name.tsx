"use client"

import { useEffect, useRef } from "react"

interface HeroNameProps {
  first: string
  second: string
  label: string
}

/*
 * Cursor-reactive display type. The sans line carries per-letter variable
 * weight; the serif line lifts its letters toward the pointer. Both ease
 * with a distance falloff. Disabled for touch devices and
 * prefers-reduced-motion — the name is static text whenever the effect
 * doesn't run.
 *
 * Letter centers are cached relative to the container and re-projected
 * once per frame against its live bounding rect, so scrolling stays cheap
 * and correct. The rAF loop parks itself when everything has settled.
 */
const SANS_BASE = 480
const SANS_MAX = 700
const SERIF_LIFT_PX = 7
const RADIUS = 190

export function HeroName({ first, second, label }: HeroNameProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches
    if (reducedMotion || !canHover) return

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-letter]"))
    if (!letters.length) return

    let centers: {
      x: number
      y: number
      el: HTMLElement
      line: "sans" | "serif"
    }[] = []

    const measure = () => {
      centers = letters.map((el) => ({
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + el.offsetHeight / 2,
        el,
        line:
          el.closest<HTMLElement>("[data-hero-line]")?.dataset.heroLine === "serif"
            ? "serif"
            : "sans",
      }))
    }
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(root)

    let pointerX = -Infinity
    let pointerY = -Infinity
    let raf = 0
    let running = false
    const state = new WeakMap<HTMLElement, number>()

    const frame = () => {
      const rect = root.getBoundingClientRect()
      let active = false
      for (const center of centers) {
        const dx = rect.left + center.x - pointerX
        const dy = rect.top + center.y - pointerY
        const distance = Math.hypot(dx, dy)
        const falloff = Math.max(0, 1 - distance / RADIUS)
        const eased = falloff * falloff

        const target =
          center.line === "sans"
            ? SANS_BASE + (SANS_MAX - SANS_BASE) * eased
            : -SERIF_LIFT_PX * eased
        const previous = state.get(center.el) ?? 0
        const next = previous + (target - previous) * 0.16
        state.set(center.el, next)
        if (Math.abs(target - next) > 0.05) active = true

        if (center.line === "sans") {
          center.el.style.fontVariationSettings = `'wght' ${next.toFixed(1)}`
        } else {
          center.el.style.translate = `0 ${next.toFixed(2)}px`
        }
      }
      if (active) {
        raf = requestAnimationFrame(frame)
      } else {
        running = false
      }
    }

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      start()
    }

    const onPointerLeave = () => {
      pointerX = -Infinity
      pointerY = -Infinity
      start()
    }

    const zone = root.closest("section") ?? root
    zone.addEventListener("pointermove", onPointerMove, { passive: true })
    zone.addEventListener("pointerleave", onPointerLeave, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      zone.removeEventListener("pointermove", onPointerMove)
      zone.removeEventListener("pointerleave", onPointerLeave)
      letters.forEach((el) => {
        el.style.fontVariationSettings = ""
        el.style.translate = ""
      })
    }
  }, [])

  const renderLine = (word: string, variant: "sans" | "serif") => (
    <span
      data-hero-line={variant}
      aria-hidden="true"
      className={
        variant === "serif"
          ? "block font-serif italic tracking-[-0.015em] md:ml-[4%] md:-mt-[0.08em]"
          : "block"
      }
    >
      {Array.from(word).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          data-letter
          className="inline-block will-change-transform"
          style={
            variant === "sans"
              ? { fontVariationSettings: `'wght' ${SANS_BASE}` }
              : undefined
          }
        >
          {letter}
        </span>
      ))}
    </span>
  )

  return (
    <h1
      ref={ref}
      aria-label={label}
      className="relative font-display text-display-xl"
    >
      {renderLine(first, "sans")}
      {renderLine(second, "serif")}
    </h1>
  )
}
