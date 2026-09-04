"use client"

import { useEffect, useRef } from "react"

/*
 * A 1px signal line under the navbar that fills with scroll progress.
 * Writes the transform directly — no React re-renders per scroll event.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let frame = 0

    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0
      element.style.setProperty("--scroll-progress", progress.toFixed(4))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-highlight"
      aria-hidden="true"
    />
  )
}
