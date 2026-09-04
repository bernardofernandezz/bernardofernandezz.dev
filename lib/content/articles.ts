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
    slug: "the-domain-model-is-the-product",
    title: "The domain model is the product",
    category: "Engineering",
    date: "2026-08-12",
    readingTime: "6 min read",
    summary:
      "Most software problems are modeling problems wearing a UI costume. Why the hardest and most valuable work happens before the first component is written.",
    sections: [
      {
        paragraphs: [
          "When a product is hard to build, it is usually because the domain model is wrong. The interface feels convoluted because it is fighting the data. The edge cases multiply because a concept was named casually and the vagueness spread through the codebase like a stain.",
          "I saw this on a finance tool for freelancers. The first instinct is to model 'documents' — invoices, receipts, statements — because that is what the user touches. But documents are just the packaging. The real domain is money movement: something entered, something is committed, something is available. Once the model became transactions and commitments instead of files, the dashboard that everyone wanted was almost free to build.",
        ],
      },
      {
        heading: "Modeling is a conversation",
        paragraphs: [
          "A good domain model is not invented by the engineer alone. It is negotiated. The client says 'I need a place to store my clients' and what they mean is 'I need to know who owes me money and when'. The words users choose are usually process-shaped; the model needs to be meaning-shaped.",
          "This is why discovery matters even on small projects. Not to produce documents, but to compress the distance between what was said and what was meant before either is encoded into a schema that will outlive the conversation.",
        ],
      },
      {
        heading: "The test of a good model",
        paragraphs: [
          "A model is good when the next feature is easy. When every new request sounds like 'oh, that is just X plus Y', the model is carrying its weight. When every request needs a workaround, a special case, an 'except when' — the model is wrong, and no amount of UI polish will fix it.",
          "The best compliment a codebase can receive is that it feels like the business. Not that it has clean code — that it thinks the way the business thinks. That is what makes software maintainable: not formatting, not frameworks. Agreement between the model and the reality it serves.",
        ],
      },
    ],
  },
  {
    slug: "type-safety-is-product-safety",
    title: "Type safety is product safety",
    category: "Engineering",
    date: "2026-06-30",
    readingTime: "5 min read",
    summary:
      "Strict types are not pedantry. They are the cheapest way to move bugs from production to the editor — and the closest thing engineering has to a design review for data.",
    sections: [
      {
        paragraphs: [
          "There is a version of TypeScript that people write where everything is a string. Status is a string. IDs are strings. Amounts are strings. It compiles, it deploys, and then one day an amount is formatted with a comma where a decimal belongs, and money moves incorrectly.",
          "The fix is not more tests or more code review. The fix is making the illegal state unrepresentable: an Amount is not a string, a UserId is not a random UUID string, a status is one of three literals — not whatever arrives in the payload.",
        ],
      },
      {
        heading: "Types as the first draft of the domain",
        paragraphs: [
          "I treat the type definitions as the first sketch of any system. Before components, before endpoints — what are the nouns, and which operations make sense on them? If the types read clearly, the implementation almost writes itself. If the types need comments to explain what a field means, the domain has not been understood yet.",
          "This is also where strict typing pays for the product, not just the codebase. Refactors become mechanical instead of terrifying. Onboarding a collaborator becomes reading the types instead of a meeting. The cost of change stays flat instead of compounding.",
        ],
      },
      {
        heading: "The discipline part",
        paragraphs: [
          "Strictness has a price: you cannot slap a cast on an API response and move on. But that price is paid at the cheapest possible moment — in the editor, before the code exists — instead of the most expensive one, in front of a user. Any way you measure it, that is a trade worth making.",
        ],
      },
    ],
  },
  {
    slug: "small-scope-big-quality",
    title: "Small scope, big quality",
    category: "Product",
    date: "2026-04-18",
    readingTime: "4 min read",
    summary:
      "The most underrated skill in software is cutting. How building less — at higher quality — is usually the fastest path to a product people trust.",
    sections: [
      {
        paragraphs: [
          "Every ambitious project starts with a list. The list is honest — all of those things will eventually matter — but building them in parallel is how products die: everything is half-done, nothing feels good to use, and the launch date keeps moving.",
          "The alternative is a loop. Not a feature list, a loop: one complete path a user walks, from arrival to the moment the product earns their trust. Build the loop. Polish the loop. Ship the loop. Then let real usage tell you what the second loop should be.",
        ],
      },
      {
        heading: "Quality is the scope multiplier",
        paragraphs: [
          "A small product that feels excellent creates more momentum than a large one that feels approximate. Users forgive missing features; they do not forgive feeling like beta testers. The polish budget is not vanity — it is the difference between a product that spreads and one that stalls.",
          "This is also why I prefer working with founders directly rather than through thick intermediaries. Cutting requires authority. The person who can say 'actually, that can wait' needs to be in the room where the scope is decided.",
        ],
      },
      {
        heading: "What cutting looks like",
        paragraphs: [
          "It looks like an MVP with one screen. It looks like an admin panel made of spreadsheets for the first hundred users. It looks like saying no to the feature that would take twice as long as everything else combined. Every cut is a bet that the core, done well, is enough to learn from — and in my experience, it almost always is.",
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}
