import { ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { BriefStepId, BriefSummaryRow } from "@/lib/briefing/flow"
import type { ProjectBrief } from "@/lib/briefing/types"

interface BriefingSummaryProps {
  rows: readonly BriefSummaryRow[]
  brief: ProjectBrief
  sending: boolean
  error: string | null
  onEdit: (stepId: BriefStepId) => void
  onSubmit: () => void
}

export function BriefingSummary({
  rows,
  brief,
  sending,
  error,
  onEdit,
  onSubmit,
}: BriefingSummaryProps) {
  return (
    <div>
      <p className="font-display text-display-md leading-tight">
        I think I understand the direction.
        <span className="text-muted-foreground"> Here&rsquo;s what I got:</span>
      </p>

      <dl className="mt-10 flex flex-col border-t">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid gap-1 border-b py-4 sm:grid-cols-12 sm:gap-4"
          >
            <dt className="eyebrow sm:col-span-3 sm:pt-1">{row.label}</dt>
            <dd className="leading-relaxed sm:col-span-8">{row.value}</dd>
            <div className="sm:col-span-1 sm:text-right">
              <button
                type="button"
                onClick={() => onEdit(row.editStepId)}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-3" aria-hidden="true" />
                Edit
              </button>
            </div>
          </div>
        ))}
        <div className="grid gap-1 border-b py-4 sm:grid-cols-12 sm:gap-4">
          <dt className="eyebrow sm:col-span-3 sm:pt-1">Contact</dt>
          <dd className="leading-relaxed text-muted-foreground sm:col-span-9">
            {brief.name} · {brief.email}
          </dd>
        </div>
      </dl>

      <p className="mt-10 font-display text-display-sm">
        Sounds interesting. Let&rsquo;s talk about it.
      </p>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        onClick={onSubmit}
        disabled={sending}
        className="mt-8 h-12 rounded-full bg-highlight px-8 text-base text-highlight-foreground hover:bg-highlight/90"
      >
        {sending ? "Sending..." : "Send project"}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  )
}
