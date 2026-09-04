import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface BriefingProgressProps {
  current: number
  total: number
  canGoBack: boolean
  onBack: () => void
  backLabel: string
  ariaLabel: (current: number, total: number) => string
}

export function BriefingProgress({
  current,
  total,
  canGoBack,
  onBack,
  backLabel,
  ariaLabel,
}: BriefingProgressProps) {
  const counter = `${String(current).padStart(2, "0")} / ${String(total).padStart(2, "0")}`

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        disabled={!canGoBack}
        className="gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {backLabel}
      </Button>
      <p
        className="font-mono text-xs tracking-widest text-muted-foreground"
        aria-hidden="true"
      >
        {counter}
      </p>
      <Progress
        value={(current / total) * 100}
        className="ml-auto h-1 w-28 bg-border sm:w-40"
        aria-label={ariaLabel(current, total)}
      />
    </div>
  )
}
