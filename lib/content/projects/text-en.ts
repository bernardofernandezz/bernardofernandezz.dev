import type { ProjectText } from "@/lib/content/projects"

export const TEXT_EN: Record<string, ProjectText> = {
  ledgerline: {
    name: "Ledgerline",
    tagline: "Financial clarity for freelancers",
    summary:
      "A web application that turns scattered invoices, receipts and bank exports into a clear, real-time picture of a freelancer's finances — my own take on a problem every freelancer knows.",
    caseStudy: {
      context:
        "Freelance money is scattered by default: invoices in one tool, receipts in email, taxes in a spreadsheet, the actual bank somewhere else. I built Ledgerline around a different model — instead of managing documents, track the movement of money: what entered, what is committed, what is safely spendable.",
      problem:
        "The hard part was never the dashboard. It was making ingestion and categorization trustworthy enough to act on: bank CSVs in different formats, recurring payees with inconsistent names, and the fact that a financial tool users can't trust is worse than no tool at all.",
      role: "Sole developer — domain modeling, backend, data pipeline and interface.",
      technicalChallenge: [
        "Every bank exports CSVs with its own quirks: dates in different formats, debits as positive or negative values, encodings that break mid-file. The ingestion layer has to translate all of them into one reliable transaction model without losing data.",
        "Categorization needs to be automatic enough to save time and correctable enough to stay accurate — a rules engine that learns recurring payees, with every manual correction feeding back into the rules.",
        "The dashboard's core question — 'how much can I safely spend right now' — depends on commitments, not just balances. That means modeling future obligations, not only past transactions.",
      ],
      decisions: [
        {
          title: "A single normalized transaction model",
          detail:
            "Every bank format is translated at the edge of the system, so the core domain never needs to know where a transaction came from. Adding a bank became a mapping problem instead of a core rewrite.",
        },
        {
          title: "Server-side aggregation over client-side math",
          detail:
            "Monthly summaries are computed in SQL views instead of loading raw transactions into the browser, so the dashboard stays fast even with years of history.",
        },
        {
          title: "Rules engine with human override",
          detail:
            "Automation handles the majority of categorization, and manual corrections feed back into the rules — the system gets more accurate the longer it is used.",
        },
      ],
      result: [
        "Different bank exports normalize into one transaction model, so the pipeline is extendable by mapping, not rewriting.",
        "Monthly and commitment-aware summaries are computed in SQL — the interface never re-derives financial state.",
        "Corrections improve the rules engine instead of accumulating as unstructured exceptions.",
      ],
      lesson:
        "Automating a domain teaches you the domain. Every category I got wrong at first was a gap in my own understanding of how money actually moves through freelance work.",
    },
  },
  meridian: {
    name: "Meridian",
    tagline: "Direct booking for boutique stays",
    summary:
      "A multi-tenant booking prototype that explores what direct reservations without aggregators require: availability as an invariant, payments confirmed by webhooks, per-property identity.",
    caseStudy: {
      context:
        "Small hotels depend on booking aggregators that charge heavy commissions and force every property into the same template. I built Meridian as a prototype to understand what a direct-booking system actually requires — not the surface, the guarantees underneath.",
      problem:
        "Reservations look like a UI problem and are actually a correctness problem: availability, rates and payment confirmations must stay consistent under concurrency. The interesting question was how to make double bookings and phantom payments structurally impossible instead of handling them in support.",
      role: "Sole developer — system design, availability model, payments and booking flow.",
      technicalChallenge: [
        "Availability has to be checked at the moment of booking, under concurrency — two users booking the last room at the same time must both get a truthful answer.",
        "Payment state and reservation state live in two systems (the app and the payment provider). Keeping them synchronized is where most booking systems drift.",
        "Each property needs its own identity, but a per-property fork would make every fix a fleet-wide operation.",
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
            "A reservation only confirms when Stripe's webhook arrives — a user closing the tab after paying can no longer create a phantom booking.",
        },
        {
          title: "Per-property theming without per-property code",
          detail:
            "Palette, typography and imagery are configuration data, not forks — a new property is an onboarding step, not a deploy.",
        },
      ],
      result: [
        "The availability service makes conflicting reservations impossible at the database level, not by convention.",
        "Payment state can only advance through webhook events, so the system can never show a confirmed booking that wasn't paid.",
        "Properties are data — the prototype demonstrated that a new property needs no code changes.",
      ],
      lesson:
        "Invariants first. Once availability and payment state are guarded by design, everything else in a booking system becomes a much simpler problem.",
    },
  },
  fieldnote: {
    name: "Fieldnote",
    tagline: "An MVP built in six weeks",
    summary:
      "A self-imposed product exercise: take a one-paragraph idea — community-written guides around neighborhoods — and take it from concept to a working MVP in six weeks.",
    caseStudy: {
      context:
        "I wanted to practice the hardest part of building products: the cutting. The premise — guides written by residents beat generic reviews — came with no spec, no designs and no second chance. Six weeks, one loop, ship.",
      problem:
        "The risk wasn't technical. Every feature I imagined (profiles, follows, comments, gamification) was a way to avoid the real question: is the write → share → discover loop compelling enough on its own?",
      role: "Product thinking, interface design and full development.",
      technicalChallenge: [
        "Cutting to one loop meant saying no to a dozen features that felt mandatory — and building the one loop so well it didn't feel small.",
        "The reading experience carries the product: typography, maps and image handling needed real polish, because the test was about desire, not workflow.",
        "Content had to be structured data in the application's own database — portable and queryable — rather than documents inside a third-party CMS.",
      ],
      decisions: [
        {
          title: "One primary loop, ruthlessly",
          detail:
            "Every feature had to serve write → share → discover or wait. That constraint is what made the six-week deadline possible.",
        },
        {
          title: "Reading experience over admin features",
          detail:
            "The polish budget went to the guide pages — typography, maps, image handling — because the risk being tested was emotional, not operational.",
        },
        {
          title: "Postgres-backed content model, no CMS",
          detail:
            "Guides are structured rows, not documents in a service, keeping the product portable and the data queryable as the concept evolves.",
        },
      ],
      result: [
        "A working MVP in six weeks: focused editor, shareable guide pages, a minimal discovery feed.",
        "Clear evidence for and against the founding hypothesis — the MVP became the argument for what to build next.",
      ],
      lesson:
        "Cutting is a design skill. The scope you refuse is what makes the scope you ship worth using.",
    },
  },
  opsboard: {
    name: "OpsBoard",
    tagline: "Real-time coordination for field operations",
    summary:
      "A realtime coordination prototype for the kind of workday that runs through a group chat and three spreadsheets — every job on one live board, updated by every participant, rebuildable from an event log.",
    caseStudy: {
      context:
        "Field operations coordinate through the worst possible medium: a chat where assignments, delays and handoffs scroll out of sight within hours. I built OpsBoard as a prototype to answer one question — what does a tool look like when 'what is happening right now' is its only job?",
      problem:
        "Realtime state over unreliable mobile connections, for users wearing gloves, is a harder problem than it sounds. The board had to stay truthful on bad networks, survive disconnects, and fit a day that happens mostly on a phone.",
      role: "Sole developer — event architecture, realtime layer and interface.",
      technicalChallenge: [
        "Broadcasting state is easy; keeping every client correct across reconnects, offline periods and concurrent edits is the actual problem.",
        "Field usage means gloves, sunlight and one-bar connections — the interface budget is measured in taps, and every state change has to survive being delayed.",
        "History matters as much as the present: 'what happened yesterday' has to be queryable, not archaeological.",
      ],
      decisions: [
        {
          title: "Events, not diffs",
          detail:
            "The server broadcasts domain events ('job assigned', 'job delayed'), not UI patches — any client that reconnects rebuilds its view from the event log, with no sync logic in the frontend.",
        },
        {
          title: "Optimistic UI, authoritative reconciliation",
          detail:
            "The interface applies updates immediately and reconciles against the authoritative event, so the board stays responsive on poor connections without lying about state.",
        },
        {
          title: "Mobile-first field usage",
          detail:
            "One-tap state changes and large targets — the tool fits the environment instead of fighting it.",
        },
      ],
      result: [
        "Every client reconstructs its view from the event log — reconnecting after an offline gap needs no special logic.",
        "A state change is one tap on a phone, and the board reflects it for everyone without a refresh.",
      ],
      lesson:
        "Internal tools fail socially before they fail technically. Designing for the environment — gloves, bad signal, interruptions — mattered more than any architectural choice.",
    },
  },
  "typeset-playground": {
    name: "Typeset",
    tagline: "An interactive typography playground",
    summary:
      "A browser tool for exploring type: live variable-font axes, fluid scale previews across every viewport at once, and side-by-side pairing — built to sharpen my own typographic judgment.",
    caseStudy: {
      context:
        "Typography decisions are usually made in static mockups, sampled at one size and one weight. The relationships that actually matter — how a fluid scale behaves at real widths, how two typefaces pair at paragraph sizes — are invisible until implementation, when changing them is most expensive.",
      problem:
        "Rendering dozens of live type samples in the DOM at interactive framerates is a performance problem; sharing a finding without accounts or storage is a product problem.",
      role: "Concept, design and development.",
      technicalChallenge: [
        "Many live text samples updating per frame thrash layout in the DOM — the previews had to stay at 60fps while still using real font files.",
        "A fluid scale is a function of viewport width; showing it as one number hides the curve that actually decides whether it works.",
        "The tool needed to be shareable with zero backend, zero accounts and zero storage.",
      ],
      decisions: [
        {
          title: "Canvas over DOM for the previews",
          detail:
            "Dozens of live samples updating per frame thrash layout in the DOM. Canvas rendering keeps interaction at 60fps while the text still comes from real font files.",
        },
        {
          title: "The URL is the save button",
          detail:
            "The entire state serializes into the query string — sharing a finding costs nothing and the tool needs no accounts or backend.",
        },
      ],
      result: [
        "A tool I use on every project where type is part of the interface.",
        "A public demonstration that interaction design and typography are engineering disciplines, not decoration.",
      ],
      lesson:
        "Build the tool your judgment needs. Nothing teaches a craft faster than making it measurable.",
    },
  },
  "route-schema": {
    name: "route-schema",
    tagline: "Type-safe routes for typed APIs",
    summary:
      "A small TypeScript library that turns route declarations into typed URL builders — no runtime, no codegen, just inference.",
    caseStudy: {
      context:
        "In most TypeScript codebases, URLs are strings with the type system switched off. Change a parameter name in one place and the links built in nine others break silently at runtime — a category of bug that shouldn't exist in a typed language.",
      problem:
        "The fix had to be adoptable: no build step, no generated files to drift, no runtime cost — or teams would simply keep writing template strings.",
      role: "Author and maintainer.",
      technicalChallenge: [
        "Inferring both the builder's signature and the parameter types from a single route declaration, without codegen, requires pushing TypeScript's template literal types to their practical limits.",
        "The value proposition is smallness — every feature that adds runtime weight works against adoption.",
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
      result: [
        "Building a URL with missing or mistyped parameters is a compile error instead of a production bug.",
        "The library ships under 2kB with zero dependencies.",
      ],
      lesson:
        "The type system is a design tool, and restraint is a feature — the best library is often the one that refuses to grow.",
    },
  },
}
