export interface WorkStep {
  readonly number: string
  readonly title: string
  readonly description: string
}

export const workSteps: readonly WorkStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We figure out what you're actually trying to solve — the first request rarely names the real problem.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "Scope in writing: what gets built, in what order, and what 'done' means — so there's no ambiguity to hide in later.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I'd rather show you a rough working version in week one than a plan. Working software early, decisions based on what exists.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "Performance, edge cases and failure states — the details that decide whether software survives real usage.",
  },
  {
    number: "05",
    title: "Ship",
    description:
      "Deployed, documented and handed over so you're not dependent on me to keep it alive.",
  },
]
