export const about = {
  intro: {
    plain: "I'm Bernardo. I build the software behind the",
    accent: "idea",
  },
  metaDescription:
    "Who Bernardo Fernandez is, how he approaches software, what he cares about technically and what he's currently exploring.",
  story: [
    "I'm a software developer from Brazil. I build web applications, internal tools and the systems behind them — and I got here the direct way: I wanted to make things on the web and refused to stop at the surface. Curiosity about interfaces turned into interest in everything that has to work for those interfaces to exist at all.",
    "The part of building I care most about is where product meets engineering. Whether a data model makes the next feature cheap or expensive. Whether an API fails loudly or silently. Whether an interface feels inevitable or merely functional. I don't think those are separate concerns — they're the same concern, seen from different distances.",
    "I don't have fifteen years of experience, and I won't pretend otherwise. What I have is a habit: taking technical problems seriously — reading the docs, testing the assumption, staying with the problem until it's actually solved, not until it stops being my turn.",
  ],
  workingWith: "What I build with",
  workingWithNote:
    "Not a skills wall — this is just what shows up across the projects on the work page, grouped by where it lives.",
  beliefs: {
    label: "What I believe",
    items: [
      {
        title: "The boring parts are the product",
        detail:
          "Data models, migrations, failure states, empty screens. Users never praise them — but everything they love sits on top of them.",
      },
      {
        title: "Small scope, real quality",
        detail:
          "One complete, solid thing beats five approximate ones. Cutting is a skill, not a compromise.",
      },
      {
        title: "Types are the first draft",
        detail:
          "Before components or endpoints, I write the types. If the domain reads clearly, the implementation almost writes itself.",
      },
      {
        title: "Learn in public",
        detail:
          "Experiments, writing and open source keep me honest — explaining something exposes the parts I only pretended to understand.",
      },
    ],
  },
  thinking: {
    label: "Questions I'm thinking about",
  },
  evidence: {
    label: "This site as evidence",
    body:
      "This portfolio is a small case study of how I work: Next.js with strict TypeScript, a typed interactive briefing, self-hosted on a VPS with nginx, systemd, Let's Encrypt and CI/CD with quality gates and health checks. A small system — built the way I'd build yours.",
  },
  currently: "Currently",
  currentlyBody: (availability: string, location: string) =>
    `Based in ${location}. ${availability} — and always up for a conversation about something worth building.`,
  ctaLine: "Now you know a little about me. Tell me what you're building.",
  ctaButton: "Tell me what you're building",
}

export type About = typeof about
