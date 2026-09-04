"use client"

import { useEffect, useState } from "react"

/*
 * Hydration-safe: renders nothing until mounted, then ticks every 30s.
 * Bernardo is in Brazil — the timezone is fixed rather than derived from
 * the visitor, which is the whole point of the detail.
 */
const TIME_ZONE = "America/Sao_Paulo"

export function LocalTime({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: TIME_ZONE,
    })

    const update = () => setTime(formatter.format(new Date()))
    update()

    const interval = window.setInterval(update, 30_000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span className="tabular-nums">
      {label} {time ?? "—"}
    </span>
  )
}
