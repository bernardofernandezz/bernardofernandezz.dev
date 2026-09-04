"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/get-dictionary"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const copy = getDictionary("en").common.errorFallback

  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-32 text-center">
      <p className="eyebrow">500</p>
      <h1 className="mt-6 font-display text-display-md">
        {copy.titlePlain} <span className="serif-accent">{copy.titleAccent}</span>.
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">{copy.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button onClick={reset} className="h-11 rounded-full px-6 text-base">
          {copy.retry}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
