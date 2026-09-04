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
      "We figure out what you're actually trying to solve — which is often not what the first request says.",
  },
  {
    number: "02",
    title: "Define",
    description:
      "We turn the idea into a clear scope: what gets built, in what order, and what success looks like.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "I design and develop the product, keeping you close to the process with working software early.",
  },
  {
    number: "04",
    title: "Refine",
    description:
      "We iterate against real usage until the details feel right — speed, clarity, edge cases.",
  },
  {
    number: "05",
    title: "Ship",
    description:
      "The result goes live with documentation and a handover you can build on. The idea becomes a system.",
  },
]
