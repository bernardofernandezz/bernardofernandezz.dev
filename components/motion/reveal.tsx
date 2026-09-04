"use client"

import { useEffect, useRef } from "react"
import type { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  delayMs?: number
}

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.dataset.visible = "true"
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style = delayMs > 0 ? ({ "--reveal-delay": `${delayMs}ms` } as CSSProperties) : undefined

  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  )
}
