import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/motion/reveal"
import type { Briefing } from "@/lib/i18n/dictionaries/en/briefing"
import { localePath, type Locale } from "@/lib/i18n/config"
import type { BriefSummaryRow } from "@/lib/briefing/flow"
import type { ProjectBrief } from "@/lib/briefing/types"

interface BriefingConfirmationProps {
  brief: ProjectBrief
  rows: readonly BriefSummaryRow[]
  text: Briefing
  locale: Locale
}

export function BriefingConfirmation({
  brief,
  rows,
  text,
  locale,
}: BriefingConfirmationProps) {
  const firstName = brief.name.trim().split(/\s+/)[0]

  return (
    <Reveal>
      <div>
        <CheckCircle2 className="size-8 text-highlight" aria-hidden="true" />
        <p className="mt-6 font-display text-display-md leading-tight">
          {text.confirmation.thanks(firstName)}
        </p>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          {text.confirmation.body}
        </p>

        <dl className="mt-10 flex max-w-xl flex-col border-t">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-1 border-b py-4 sm:grid-cols-12 sm:gap-4"
            >
              <dt className="eyebrow sm:col-span-3 sm:pt-1">{row.label}</dt>
              <dd className="leading-relaxed text-muted-foreground sm:col-span-9">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href={localePath(locale, "/")}
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-highlight"
        >
          <span className="border-b border-border pb-1 transition-colors group-hover:border-highlight">
            {text.confirmation.backHome}
          </span>
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </Reveal>
  )
}
