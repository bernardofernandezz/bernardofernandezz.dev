import { Check } from "lucide-react"
import type { BriefOption } from "@/lib/briefing/types"
import { cn } from "@/lib/utils"

interface BriefingChoiceProps<T extends string> {
  name: string
  legend: string
  options: readonly BriefOption<T>[]
  selected?: string
  onSelect: (value: T, immediate: boolean) => void
}

const BASE_LABEL_CLASS =
  "flex min-h-14 cursor-pointer items-center justify-between gap-3 rounded-xl border bg-background px-5 py-3.5 text-left text-base transition-colors has-checked:border-highlight has-checked:bg-highlight has-checked:text-highlight-foreground has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50 hover:not-has-checked:border-foreground/40"

/*
 * `immediate` is true only for pointer clicks (event.detail > 0), so keyboard
 * arrow navigation selects an option without jumping to the next question.
 */
export function BriefingChoice<T extends string>({
  name,
  legend,
  options,
  selected,
  onSelect,
}: BriefingChoiceProps<T>) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={BASE_LABEL_CLASS}
            onClick={(event) => onSelect(option.value, event.detail > 0)}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected === option.value}
              onChange={(event) => {
                const chosen = options.find(
                  (candidate) => candidate.value === event.target.value,
                )
                if (chosen) onSelect(chosen.value, false)
              }}
              className="sr-only"
            />
            <span>{option.label}</span>
            <Check
              className={cn(
                "size-4 shrink-0 transition-opacity",
                selected === option.value ? "opacity-100" : "opacity-0",
              )}
              aria-hidden="true"
            />
          </label>
        ))}
      </div>
    </fieldset>
  )
}
