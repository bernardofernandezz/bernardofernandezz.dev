export const about = {
  intro: {
    plain: "I'm Bernardo. I build the software behind the",
    accent: "idea",
  },
  metaDescription:
    "Who Bernardo Fernandez is, how he approaches software, what he cares about technically and what he's currently exploring.",
  story: [
    "I'm a software developer from Brazil. I build web apps, internal tools and the systems behind them. I got here the direct way: I wanted to make things on the web and refused to stop at the surface — so curiosity about interfaces turned into interest in everything underneath them.",
    "What I care about most is where product meets engineering: data models that make the next feature cheap or expensive, APIs that fail loudly or silently, interfaces that feel inevitable instead of merely functional. Same concern, seen from different distances.",
    "I don't have fifteen years of experience, and I won't pretend otherwise. What I have is a habit: taking technical problems seriously — reading the docs, testing assumptions, staying until it's actually solved.",
  ],
  storyLabel: "How I ended up here",
  howLabel: "How I work",
  workingWith: "What I build with",
  workingWithNote:
    "Not a skills wall — just what shows up across the projects, grouped by where it lives.",
  beliefs: {
    label: "What I care about",
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
    label: "Behind this site",
    body:
      "This portfolio is its own case study: Next.js with strict TypeScript, a typed briefing flow, self-hosted on a VPS with nginx, systemd, Let's Encrypt and CI/CD. A small system — built the way I'd build yours.",
  },
  outsideCode: {
    label: "Outside the code",
    items: [] as string[],
  },
  currently: "Currently",
  currentlyBody: (availability: string, location: string) =>
    `Based in ${location}. ${availability} — and always up for a conversation about something worth building.`,
  ctaLine: "Now you know a little about me.",
  ctaButton: "Get in touch",
}

export type About = typeof about
