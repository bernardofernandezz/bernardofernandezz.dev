export const PROJECT_CATEGORIES = ["product", "web", "experiment", "open-source"] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  product: "Product",
  web: "Web",
  experiment: "Experiment",
  "open-source": "Open Source",
}

export interface ProjectDecision {
  readonly title: string
  readonly detail: string
}

export interface ProjectCaseStudy {
  readonly challenge: string
  readonly approach: readonly string[]
  readonly decisions: readonly ProjectDecision[]
  readonly outcome: readonly string[]
  readonly demonstrates: string
}

export interface ProjectVisualSpec {
  readonly hue: number
  readonly pattern: "grid" | "flow" | "type" | "layers" | "pulse" | "schema"
}

export interface Project {
  readonly slug: string
  readonly name: string
  readonly tagline: string
  readonly category: ProjectCategory
  readonly role: string
  readonly year: string
  readonly summary: string
  readonly stack: readonly string[]
  readonly visual: ProjectVisualSpec
  readonly featured: boolean
  readonly caseStudy: ProjectCaseStudy
}

/*
 * Placeholder case studies, written to be realistic and easily editable.
 * Replace challenge/approach/outcome with your real work — the structure
 * is what does the selling: problem, decisions, result, capability.
 */
export const projects: readonly Project[] = [
  {
    slug: "ledgerline",
    name: "Ledgerline",
    tagline: "Financial clarity for freelancers",
    category: "product",
    role: "Design, architecture & full-stack development",
    year: "2025",
    summary:
      "A web application that turns scattered invoices, receipts and bank exports into a clear, real-time picture of a freelancer's finances.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Recharts"],
    visual: { hue: 24, pattern: "grid" },
    featured: true,
    caseStudy: {
      challenge:
        "Freelancers manage money across five different places: invoices in one tool, receipts in email, taxes in a spreadsheet and the actual bank somewhere else. By the time the numbers are reconciled, the month is over — and decisions about rates, expenses and runway are made on gut feeling instead of data.",
      approach: [
        "I started from the workflow, not the features: how does money actually move through a freelance business, and where does the information break down? That led to a system organized around imports and categories rather than manual entry.",
        "The ingestion layer accepts CSV exports from major banks and normalizes them into a single transaction model. A rules engine learns recurring payees and applies categories automatically, so the bookkeeping happens as a side effect of importing — not as extra work.",
        "On top of that sits a dashboard designed around the questions freelancers actually ask: how much came in this month, what is committed, what is safely spendable.",
      ],
      decisions: [
        {
          title: "A single normalized transaction model",
          detail:
            "Every bank format is translated at the edge of the system, so the core domain never needs to know where a transaction came from. New bank integrations became a mapping problem, not a core rewrite.",
        },
        {
          title: "Server-side aggregation over client-side math",
          detail:
            "Monthly summaries are computed in SQL views instead of loading raw transactions into the browser. The dashboard stays fast even with years of history.",
        },
        {
          title: "Rules engine with human override",
          detail:
            "Automation handles the 90%, and any manual correction feeds back into the rules. The system gets more accurate the longer it is used.",
        },
      ],
      outcome: [
        "Replaced hours of monthly spreadsheet reconciliation with an automated import-and-categorize pipeline.",
        "Gave the owner a real-time answer to 'how much can I actually spend right now' — the number the spreadsheet could never provide.",
      ],
      demonstrates:
        "The ability to take a messy, real-world workflow and turn it into a domain model, then build the product around it — from data ingestion to interface.",
    },
  },
  {
    slug: "meridian",
    name: "Meridian",
    tagline: "Direct booking for boutique hotels",
    category: "web",
    role: "Architecture, backend & booking experience",
    year: "2024",
    summary:
      "A booking platform that lets boutique hotels take direct reservations with their own identity — instead of losing 20% to aggregators.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Stripe"],
    visual: { hue: 200, pattern: "flow" },
    featured: true,
    caseStudy: {
      challenge:
        "Small hotels depend on booking aggregators that charge heavy commissions and force every property into the same generic template. The hotels wanted direct bookings, but building and maintaining a reliable reservation system was out of reach for a team whose job is hospitality, not software.",
      approach: [
        "The platform gives each hotel a customizable public site and a booking engine underneath it. Availability, rates and restrictions live in one system; the public experience renders on top of it with the hotel's own look and feel.",
        "The booking flow was designed around trust: real-time availability, transparent cancellation policies and immediate confirmation. Every step that could cause abandonment — hidden fees, account creation, slow pages — was removed.",
        "Payments run through Stripe with webhook-driven confirmation, so the reservation state machine can never drift from what was actually paid.",
      ],
      decisions: [
        {
          title: "Availability as the core invariant",
          detail:
            "Reservations, holds and rate restrictions all go through one availability service with transactional checks. Double bookings became structurally impossible instead of a support ticket.",
        },
        {
          title: "Payments confirmed by webhooks, not redirects",
          detail:
            "The reservation only confirms when Stripe's webhook arrives. Users closing the tab after paying no longer create phantom bookings.",
        },
        {
          title: "Per-hotel theming without per-hotel code",
          detail:
            "Hotels configure palette, typography and imagery through data, not forks. A new property goes live in hours, and a fix ships to everyone at once.",
        },
      ],
      outcome: [
        "Hotels take direct reservations with zero commission on the booking itself.",
        "New properties onboard without developer involvement — configuration, not code.",
      ],
      demonstrates:
        "Building a multi-tenant system where correctness matters (money, availability) while keeping the experience fast and the product easy to operate.",
    },
  },
  {
    slug: "fieldnote",
    name: "Fieldnote",
    tagline: "From idea to MVP in six weeks",
    category: "web",
    role: "Product thinking, design & development",
    year: "2024",
    summary:
      "An MVP for a community-driven local guides idea — built from a one-paragraph pitch to a working product people could sign up for and use.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Mapbox"],
    visual: { hue: 140, pattern: "layers" },
    featured: true,
    caseStudy: {
      challenge:
        "The founder had a conviction — local guides written by residents beat generic reviews — and nothing else. No spec, no designs, no brand. The goal was to find out, as cheaply as possible, whether people would create and use guides built around neighborhoods instead of businesses.",
      approach: [
        "The first week produced no code. We cut the idea down to one loop worth testing: write a short guide about a place you know, share it, see someone use it. Everything else — profiles, follow, comments, gamification — went to a 'later' list.",
        "I designed and built exactly that loop: a focused editor, beautiful guide pages that people wanted to share, and just enough of a home feed to make the content discoverable. The editor favors writing over configuring, because the product lives or dies on the quality of what people write.",
        "Six weeks after the first conversation, real users were publishing guides. The MVP became the argument for the next round of work.",
      ],
      decisions: [
        {
          title: "One primary loop, ruthlessly",
          detail:
            "Every feature had to serve the write-share-discover loop or wait. That constraint is what made a six-week deadline possible.",
        },
        {
          title: "Reading experience over admin features",
          detail:
            "Typography, maps and image handling got the polish budget because the risk being tested was about desire, not workflow.",
        },
        {
          title: "Postgres-backed content model, no CMS",
          detail:
            "Guides are structured rows, not documents in a third-party service — which keeps the product portable and the data queryable as the concept evolves.",
        },
      ],
      outcome: [
        "A working product in six weeks, used by real writers within days of launch.",
        "Clear evidence for the founding hypothesis — and a codebase the founder could keep building on.",
      ],
      demonstrates:
        "Turning ambiguity into scope: the discipline to cut, the speed to ship, and the product judgment to build the right small thing.",
    },
  },
  {
    slug: "opsboard",
    name: "OpsBoard",
    tagline: "Real-time coordination for field operations",
    category: "product",
    role: "Full-stack development & infrastructure",
    year: "2023",
    summary:
      "An internal tool that replaced a WhatsApp group and three spreadsheets with a live board where an operations team coordinates every job of the day.",
    stack: ["React", "Node.js", "WebSocket", "Redis", "Docker"],
    visual: { hue: 262, pattern: "pulse" },
    featured: false,
    caseStudy: {
      challenge:
        "A field operations team ran its entire day through a group chat: job assignments, status updates, delays and handoffs all mixed together, scrolling out of sight within hours. Nobody had a current view of the day, and every morning started with reconstructing what happened yesterday.",
      approach: [
        "I mapped the actual day of a coordinator — which information they need at a glance, which updates can be asynchronous, which ones interrupt. The board reflects that: every job is a card that moves through states, every change is broadcast live, and the history is queryable instead of scrollable.",
        "A Node.js service persists each state change to Postgres and publishes it over Redis pub/sub to every open browser. The UI applies updates optimistically and reconciles on the authoritative event, so the board stays responsive on poor mobile connections in the field.",
      ],
      decisions: [
        {
          title: "Events, not diffs",
          detail:
            "The server broadcasts domain events ('job assigned', 'job delayed'), not UI patches. Any client that reconnects can rebuild its view from the event log — no sync logic in the frontend.",
        },
        {
          title: "Mobile-first field usage",
          detail:
            "Technicians update from a phone with gloves on: big targets, one-tap state changes, offline tolerance. The tool fits the environment instead of fighting it.",
        },
      ],
      outcome: [
        "The group chat became a live board that answers 'what is happening right now' without asking anyone.",
        "Morning handoffs shrank from archaeology to glancing at yesterday's timeline.",
      ],
      demonstrates:
        "Designing internal tools people actually adopt — by studying the real workflow and making the correct action the easiest one.",
    },
  },
  {
    slug: "typeset-playground",
    name: "Typeset",
    tagline: "An interactive typography playground",
    category: "experiment",
    role: "Concept, design & development",
    year: "2025",
    summary:
      "A browser tool for exploring type: live variable-font axes, fluid scale previews and side-by-side pairing — built to sharpen my own typographic judgment.",
    stack: ["Next.js", "TypeScript", "Canvas API", "Variable fonts"],
    visual: { hue: 340, pattern: "type" },
    featured: true,
    caseStudy: {
      challenge:
        "Typography decisions are usually made in static mockups, sampled at one size and one weight. The relationships that actually matter — how a scale behaves at real widths, how two faces pair at paragraph sizes — are invisible until implementation, when changing them is most expensive.",
      approach: [
        "Typeset renders real text on canvas with variable font axes exposed as direct-manipulation sliders. A fluid-scale mode shows the same headline across every viewport width at once, so the clamp() curve is a thing you see, not a value you guess.",
        "The pairing view renders two typefaces against each other in a realistic layout — headline, body, caption — and lets you drag the boundaries between them. Every state is shareable through the URL.",
      ],
      decisions: [
        {
          title: "Canvas over DOM for the previews",
          detail:
            "Dozens of live samples updating per frame thrash layout in the DOM. Canvas rendering kept interaction at 60fps while text still comes from real font files.",
        },
        {
          title: "The URL is the save button",
          detail:
            "The entire state serializes into the query string. Sharing a finding costs nothing, and the tool needs no accounts, storage or backend.",
        },
      ],
      outcome: [
        "A tool I use on every project where type is the interface.",
        "A public demonstration that interaction design and typography are engineering disciplines, not decoration.",
      ],
      demonstrates:
        "The craft layer: caring about the details most people feel but never name, and having the technical depth to build tools for them.",
    },
  },
  {
    slug: "route-schema",
    name: "route-schema",
    tagline: "Type-safe routes for typed APIs",
    category: "open-source",
    role: "Author & maintainer",
    year: "2023",
    summary:
      "A small TypeScript library that turns route definitions into typed URL builders — no runtime, no codegen, just inference.",
    stack: ["TypeScript", "Vitest", "tsup"],
    visual: { hue: 210, pattern: "schema" },
    featured: false,
    caseStudy: {
      challenge:
        "In most TypeScript codebases, URLs are strings with the type system switched off. Change a parameter name in one place and the links built in nine other places break silently at runtime — a category of bug that should be impossible in a typed language.",
      approach: [
        "route-schema lets you declare route patterns once ('/users/:userId/posts/:postId') and infers both the builder signature and the parameter type from that single declaration. Building a URL with missing or mistyped parameters becomes a compile error.",
        "The entire library is types plus a tiny parse function. It ships under 2kB with zero dependencies.",
      ],
      decisions: [
        {
          title: "Inference over codegen",
          detail:
            "Types are derived from the declaration itself, so there is no build step to maintain and no generated file to drift from source.",
        },
        {
          title: "Zero runtime by default",
          detail:
            "The type layer does the work at compile time; the runtime surface is one small parse function. Small API, small bundle, easy adoption.",
        },
      ],
      outcome: [
        "Adopted in internal projects to kill an entire class of URL bugs.",
        "Maintained as a public example of API design: small surface, sharp purpose.",
      ],
      demonstrates:
        "Understanding the type system as a design tool — and the restraint to keep a library tiny when the temptation is to grow it.",
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
