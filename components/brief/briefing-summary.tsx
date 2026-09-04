import { ArrowRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Briefing } from "@/lib/i18n/dictionaries/en/briefing"
import type { BriefStepId, BriefSummaryRow } from "@/lib/briefing/flow"
import type { ProjectBrief } from "@/lib/briefing/types"

interface BriefingSummaryProps {
  rows: readonly BriefSummaryRow[]
  brief: ProjectBrief
  text: Briefing
  sending: boolean
  error: string | null
  onEdit: (stepId: BriefStepId) => void
  onSubmit: () => void
}

export function BriefingSummary({
  rows,
  brief,
  text,
  sending,
  error,
  onEdit,
  onSubmit,
}: BriefingSummaryProps) {
  return (
    <div>
      <p className="font-display text-display-md leading-tight">
        {text.summary.title}
        <span className="text-muted-foreground"> {text.summary.titleSuffix}</span>
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
                {text.summary.edit}
              </button>
            </div>
          </div>
        ))}
        <div className="grid gap-1 border-b py-4 sm:grid-cols-12 sm:gap-4">
          <dt className="eyebrow sm:col-span-3 sm:pt-1">{text.labels.contact}</dt>
          <dd className="leading-relaxed text-muted-foreground sm:col-span-9">
            {brief.name} · {brief.email}
          </dd>
        </div>
      </dl>

      <p className="mt-10 font-display text-display-sm">{text.summary.lead}</p>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        onClick={onSubmit}
        disabled={sending}
        className="mt-8 h-12 rounded-full bg-primary px-8 text-base text-primary-foreground hover:bg-primary/90"
      >
        {sending ? text.summary.sending : text.summary.send}
        <ArrowRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  )
}
