"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BriefingProgress } from "@/components/brief/briefing-progress"
import { BriefingChoice } from "@/components/brief/briefing-choice"
import { BriefingTextStep } from "@/components/brief/briefing-text-step"
import { BriefingContactStep } from "@/components/brief/briefing-contact-step"
import { BriefingSummary } from "@/components/brief/briefing-summary"
import { BriefingConfirmation } from "@/components/brief/briefing-confirmation"
import {
  BRIEF_STEP_IDS,
  buildSummaryRows,
  getStepPresentation,
  isBriefComplete,
  isStepAnswered,
  type BriefStepId,
} from "@/lib/briefing/flow"
import { submitBrief } from "@/lib/briefing/submit-brief"
import type {
  Audience,
  BriefAnswers,
  BudgetRange,
  ProjectStage,
  ProjectType,
  Timeline,
  WebsiteKind,
} from "@/lib/briefing/types"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type BriefingPhase = "intro" | "questions" | "summary" | "confirmation"

interface SavedProgress {
  readonly phase: Exclude<BriefingPhase, "confirmation">
  readonly stepIndex: number
  readonly answers: BriefAnswers
}

const STORAGE_KEY = "brief-progress-v1"

function loadProgress(): SavedProgress | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "phase" in parsed &&
      "stepIndex" in parsed &&
      "answers" in parsed
    ) {
      const saved = parsed as SavedProgress
      const validPhase =
        saved.phase === "intro" ||
        saved.phase === "questions" ||
        (saved.phase === "summary" && isBriefComplete(saved.answers))
      if (validPhase && BRIEF_STEP_IDS[saved.stepIndex]) return saved
    }
    return null
  } catch {
    return null
  }
}

const LAST_STEP_INDEX = BRIEF_STEP_IDS.length - 1

export function BriefingExperience({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)
  const text = dict.briefing

  const [phase, setPhase] = useState<BriefingPhase>("intro")
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<BriefAnswers>({})
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const headingRef = useRef<HTMLHeadingElement>(null)

  const stepId = BRIEF_STEP_IDS[stepIndex]
  const presentation = getStepPresentation(stepId, answers, text)
  const stepAnswered = isStepAnswered(stepId, answers)

  useEffect(() => {
    if (phase === "questions") {
      headingRef.current?.focus({ preventScroll: true })
    }
  }, [phase, stepIndex])

  useEffect(() => {
    const save = () => {
      if (phase === "confirmation") {
        window.sessionStorage.removeItem(STORAGE_KEY)
        return
      }
      const progress: SavedProgress = { phase, stepIndex, answers }
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
    save()
  }, [phase, stepIndex, answers])

  useEffect(() => {
    const saved = loadProgress()
    if (!saved || !BRIEF_STEP_IDS[saved.stepIndex]) return
    const frame = requestAnimationFrame(() => {
      setPhase(saved.phase)
      setStepIndex(saved.stepIndex)
      setAnswers(saved.answers)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  function moveNext() {
    setDirection("forward")
    setSubmitError(null)
    if (stepIndex === LAST_STEP_INDEX) {
      setPhase("summary")
    } else {
      setStepIndex(stepIndex + 1)
    }
  }

  function moveBack() {
    setDirection("back")
    setSubmitError(null)
    if (phase === "summary") {
      setPhase("questions")
      return
    }
    if (stepIndex === 0) {
      setPhase("intro")
      return
    }
    setStepIndex(stepIndex - 1)
  }

  function selectIntent(value: ProjectType, immediate: boolean) {
    setAnswers((prev) => ({ ...prev, intent: value, intentDetail: undefined }))
    if (immediate) moveNext()
  }

  function selectWebsiteKind(value: WebsiteKind, immediate: boolean) {
    setAnswers((prev) => ({ ...prev, intentDetail: value }))
    if (immediate) moveNext()
  }

  function selectAudience(value: Audience, immediate: boolean) {
    setAnswers((prev) => ({ ...prev, audience: value }))
    if (immediate) moveNext()
  }

  function selectStage(value: ProjectStage, immediate: boolean) {
    setAnswers((prev) => ({ ...prev, stage: value }))
    if (immediate) moveNext()
  }

  function selectTimeline(value: Timeline, immediate: boolean) {
    setAnswers((prev) => ({ ...prev, timeline: value }))
    if (immediate) moveNext()
  }

  function selectBudget(value: BudgetRange, immediate: boolean) {
    setAnswers((prev) => ({ ...prev, budget: value }))
    if (immediate) moveNext()
  }

  function editFromSummary(editStepId: BriefStepId) {
    setDirection("back")
    setPhase("questions")
    setStepIndex(BRIEF_STEP_IDS.indexOf(editStepId))
  }

  async function handleSubmit() {
    if (!isBriefComplete(answers)) return

    setSending(true)
    setSubmitError(null)
    const result = await submitBrief(answers)
    setSending(false)

    if (result.ok) {
      setPhase("confirmation")
    } else {
      setSubmitError(text.submitError)
    }
  }

  const stepKey = phase === "questions" ? stepId : phase
  const animationClassName = cn(
    "duration-500 motion-safe:animate-in motion-safe:fade-in-0",
    direction === "forward"
      ? "motion-safe:slide-in-from-bottom-4"
      : "motion-safe:slide-in-from-top-4",
  )

  const progressCurrent =
    phase === "intro" ? 0 : phase === "summary" ? BRIEF_STEP_IDS.length : stepIndex + 1

  return (
    <div className="container-page flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col py-10 md:py-14">
      {phase !== "confirmation" && (
        <BriefingProgress
          current={progressCurrent}
          total={BRIEF_STEP_IDS.length}
          canGoBack={phase !== "intro"}
          onBack={moveBack}
          backLabel={text.progress.back}
          ariaLabel={text.progress.ariaLabel}
        />
      )}

      <div aria-live="polite" className="flex flex-1 flex-col justify-center py-12">
        <div key={stepKey} className={animationClassName}>
          {phase === "intro" && (
            <div>
              <p className="eyebrow">{text.intro.eyebrow}</p>
              <h1 className="mt-6 font-display text-display-lg">
                {text.intro.title}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {text.intro.body}
              </p>
              <Button
                onClick={() => {
                  setDirection("forward")
                  setPhase("questions")
                }}
                className="mt-10 h-12 rounded-full bg-primary px-8 text-base text-primary-foreground hover:bg-primary/90"
              >
                {text.intro.button}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">{text.intro.note}</p>
            </div>
          )}

          {phase === "questions" && (
            <div
              onKeyDown={(event) => {
                if (event.key !== "Enter" || event.shiftKey) return
                if (event.target instanceof HTMLButtonElement) return
                if (!stepAnswered) return
                event.preventDefault()
                moveNext()
              }}
            >
              <p className="eyebrow">{presentation.kicker}</p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-4 font-display text-display-md leading-tight focus:outline-none"
              >
                {presentation.question}
              </h2>
              {presentation.hint && (
                <p className="mt-4 text-muted-foreground">{presentation.hint}</p>
              )}

              <div className="mt-8">
                {stepId === "intent" && (
                  <BriefingChoice
                    name="brief-intent"
                    legend={text.choicesLegend}
                    options={text.options.intent}
                    selected={answers.intent}
                    onSelect={selectIntent}
                  />
                )}
                {stepId === "intent-detail" &&
                  (answers.intent !== undefined && answers.intent === "website" ? (
                    <BriefingChoice
                      name="brief-website-kind"
                      legend={text.choicesLegend}
                      options={text.options.websiteKind}
                      selected={answers.intentDetail}
                      onSelect={selectWebsiteKind}
                    />
                  ) : (
                    <BriefingTextStep
                      name="intentDetail"
                      value={answers.intentDetail}
                      placeholder={text.textPlaceholder}
                      onChange={(value) =>
                        setAnswers((prev) => ({ ...prev, intentDetail: value }))
                      }
                    />
                  ))}
                {stepId === "problem" && (
                  <BriefingTextStep
                    name="problem"
                    value={answers.problem}
                    placeholder={text.textPlaceholder}
                    onChange={(value) =>
                      setAnswers((prev) => ({ ...prev, problem: value }))
                    }
                  />
                )}
                {stepId === "audience" && (
                  <BriefingChoice
                    name="brief-audience"
                    legend={text.choicesLegend}
                    options={text.options.audience}
                    selected={answers.audience}
                    onSelect={selectAudience}
                  />
                )}
                {stepId === "stage" && (
                  <BriefingChoice
                    name="brief-stage"
                    legend={text.choicesLegend}
                    options={text.options.stage}
                    selected={answers.stage}
                    onSelect={selectStage}
                  />
                )}
                {stepId === "timeline" && (
                  <BriefingChoice
                    name="brief-timeline"
                    legend={text.choicesLegend}
                    options={text.options.timeline}
                    selected={answers.timeline}
                    onSelect={selectTimeline}
                  />
                )}
                {stepId === "budget" && (
                  <BriefingChoice
                    name="brief-budget"
                    legend={text.choicesLegend}
                    options={text.options.budget}
                    selected={answers.budget}
                    onSelect={selectBudget}
                  />
                )}
                {stepId === "contact" && (
                  <BriefingContactStep
                    name={answers.name}
                    email={answers.email}
                    nameLabel={text.steps.contact.nameLabel}
                    emailLabel={text.steps.contact.emailLabel}
                    namePlaceholder={text.steps.contact.namePlaceholder}
                    emailPlaceholder={text.steps.contact.emailPlaceholder}
                    onNameChange={(value) =>
                      setAnswers((prev) => ({ ...prev, name: value }))
                    }
                    onEmailChange={(value) =>
                      setAnswers((prev) => ({ ...prev, email: value }))
                    }
                  />
                )}
              </div>

              <div className="mt-10 flex justify-end">
                <Button
                  onClick={moveNext}
                  disabled={!stepAnswered}
                  className="h-11 rounded-full px-7 text-base"
                >
                  {text.next}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          )}

          {phase === "summary" && isBriefComplete(answers) && (
            <BriefingSummary
              rows={buildSummaryRows(answers, text)}
              brief={answers}
              text={text}
              sending={sending}
              error={submitError}
              onEdit={editFromSummary}
              onSubmit={handleSubmit}
            />
          )}

          {phase === "confirmation" && isBriefComplete(answers) && (
            <BriefingConfirmation
              brief={answers}
              rows={buildSummaryRows(answers, text)}
              text={text}
              locale={locale}
            />
          )}
        </div>
      </div>
    </div>
  )
}
