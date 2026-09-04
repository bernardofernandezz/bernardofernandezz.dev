export interface ArticleSection {
  readonly heading?: string
  readonly paragraphs: readonly string[]
}

export interface Article {
  readonly slug: string
  readonly title: string
  readonly category: string
  readonly date: string
  readonly readingTime: string
  readonly summary: string
  readonly sections: readonly ArticleSection[]
}

export const articles: readonly Article[] = [
  {
    slug: "business-logic-out-of-react-components",
    title: "Why I stopped putting business logic inside React components",
    category: "Engineering",
    date: "2026-08-20",
    readingTime: "5 min read",
    summary:
      "Components are where bugs get discovered, not where rules should live. What changed when I moved decisions out of the view layer — and where I draw the line now.",
    sections: [
      {
        paragraphs: [
          "The first version of any feature puts the logic right there in the component. It's fast, it's obvious, and it works — until the second screen needs the same rule and copies it, or the rule changes and someone finds the third copy two months later.",
          "That was me for a while: a date comparison here, a currency format there, a status check embedded in JSX. Each one harmless. Together, they made every screen slightly different from every other one, and none of them wrong in a way a test could catch.",
        ],
      },
      {
        heading: "Where I draw the line now",
        paragraphs: [
          "My rule is blunt: components render and capture intent; they don't decide. If a piece of code answers 'what is this UI state?', it can live in the component or a hook. If it answers 'what does the business allow?', it belongs in typed functions with no knowledge of React at all.",
          "The type system does more work than any architecture diagram here. A status that is a string with six valid values is a bug waiting for a typo; the same status as a union type makes half the invalid states impossible to write. The component then becomes a rendering of a decision that was already made.",
        ],
      },
      {
        heading: "What actually changed",
        paragraphs: [
          "Domain rules became testable without rendering anything. Refactors stopped being archaeology. And the components got boring — which is the goal. A boring component is one whose bugs are about rendering, not about rules nobody remembers writing.",
          "The framework didn't matter as much as I expected: the discipline is the same whether the view is React or something else. The view layer is for translation, not for policy.",
        ],
      },
    ],
  },
  {
    slug: "what-a-broken-endpoint-taught-me-about-architecture",
    title: "What a broken endpoint taught me about architecture",
    category: "Engineering",
    date: "2026-05-14",
    readingTime: "5 min read",
    summary:
      "An endpoint that passed every test and failed with real data. What it taught me about boundaries, validation and designing for the failure you haven't seen yet.",
    sections: [
      {
        paragraphs: [
          "The endpoint worked perfectly in every test: correct inputs in, correct outputs out, edge cases covered, integration suite green. Then real traffic arrived and it failed in a way none of the tests had imagined — not because the logic was wrong, but because the world was allowed to send things the tests never considered.",
          "The bug itself was ordinary. The interesting part was where it lived: exactly on the boundary between my system and the outside world, in the place where I had trusted the shape of the data instead of verifying it.",
        ],
      },
      {
        heading: "Tests verify what you assumed",
        paragraphs: [
          "Every test I had written confirmed the behavior for data shaped the way I expected it to arrive. Not one of them asked the more important question: what does this endpoint do with data shaped like nothing we expected?",
          "Validation at the boundary is architecture, not bureaucracy. A strict parser at the edge of a system converts an unknown future failure into a known present rejection — and that difference is the difference between a bug report and a log line.",
        ],
      },
      {
        heading: "What changed in how I build",
        paragraphs: [
          "I now treat the edges of a system — inputs from users, other services, third parties — as hostile by default, with narrow, explicit contracts that fail loudly. The interior can then be elegant, because it only ever sees data that has already been through the door guard.",
          "The irony is that the fix made the code smaller, not bigger. Trusting less means checking once at the boundary instead of defensively everywhere.",
        ],
      },
    ],
  },
  {
    slug: "how-to-build-an-mvp-without-building-a-mess",
    title: "How I think about building an MVP without building a mess",
    category: "Product",
    date: "2026-02-11",
    readingTime: "4 min read",
    summary:
      "Speed and maintainability aren't opposites. The constraints I use so a six-week MVP doesn't become a six-month rewrite.",
    sections: [
      {
        paragraphs: [
          "Every ambitious project starts with a list, and the list is honest — all of those things will eventually matter. The mistake is building them in parallel: everything half-done, nothing good to use, and the launch date drifting while the codebase gets harder to change.",
          "The alternative I've settled on is a loop, not a feature list: one complete path a user walks, from arrival to the moment the product earns their trust. Build the loop. Polish the loop. Ship the loop. Let real usage decide what loop two is.",
        ],
      },
      {
        heading: "Quality is the scope multiplier",
        paragraphs: [
          "A small product that feels solid creates more momentum than a large one that feels approximate. Users forgive missing features; they don't forgive feeling like beta testers. The polish budget isn't vanity — it's the difference between a product that spreads and one that stalls.",
          "The trick is directing that polish at the loop. Polishing features nobody has asked for yet is how teams feel productive while building the wrong thing.",
        ],
      },
      {
        heading: "What I cut first",
        paragraphs: [
          "Admin panels become scripts. Permissions become conventions. The second content type becomes a future feature. Every cut is a bet that the core, done well, is enough to learn from — and in my experience it almost always is.",
          "What I refuse to cut is the part users touch and the part the next developer will read. A small codebase that a stranger can navigate is worth more than a large one that only its author can change.",
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
