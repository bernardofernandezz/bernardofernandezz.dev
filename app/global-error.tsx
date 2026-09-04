"use client"

import { fontVariables } from "@/lib/fonts"
import "./globals.css"

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center font-sans text-foreground antialiased">
        <p className="font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
          500
        </p>
        <h1 className="mt-6 text-4xl font-medium tracking-tight">
          Something broke{" "}
          <span className="font-serif italic">on my end</span>.
        </h1>
        <button
          type="button"
          onClick={reset}
          className="mt-10 h-11 rounded-full bg-primary px-6 text-base text-primary-foreground"
        >
          Try again
        </button>
      </body>
    </html>
  )
}
