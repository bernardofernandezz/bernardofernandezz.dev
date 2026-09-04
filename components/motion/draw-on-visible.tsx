"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DrawOnVisibleProps {
  children: ReactNode
  className?: string
}

/*
 * Sets data-drawn once the element enters the viewport so CSS can play
 * the stroke draw-on. Purely an attribute toggle — no re-render.
 */
export function DrawOnVisible({ children, className }: DrawOnVisibleProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.drawn = "true"
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} data-drawn="false" className={cn("h-full w-full", className)}>
      {children}
    </div>
  )
}
