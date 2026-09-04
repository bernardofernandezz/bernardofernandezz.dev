export const common = {
  siteTitle: "Bernardo Fernandez — Software Developer",
  siteDescription:
    "Bernardo's personal space on the web: the things he builds, the systems behind them, and what he's curious about right now. Sometimes, an opportunity to build something together.",
  brandRole: "Software Developer & Builder",
  location: "Brazil",
  availability: "Available for new projects",
  localTimeShort: "local",
  skipToContent: "Skip to content",
  toggleTheme: "Toggle theme",
  close: "Close",
  notFound: {
    titlePlain: "This page wandered",
    titleAccent: "off",
    body: "The link may be broken, or the page moved and didn't leave a note.",
    backHome: "Back home",
    seeWork: "See my work",
  },
  nav: {
    home: "Home",
    work: "Work",
    about: "About",
    writing: "Writing",
    now: "Now",
    startProject: "Let's build something",
    menu: "Menu",
    openMenu: "Open menu",
    mainNav: "Main navigation",
    mobileNav: "Mobile navigation",
  },
  commandPalette: {
    open: "Open command menu",
    label: "Command menu",
    placeholder: "Type a command or search…",
    noResults: "Nothing matches — try something else.",
    matchCount: (count: number) =>
      `${count} option${count === 1 ? "" : "s"} found`,
    groups: {
      navigate: "Go to",
      actions: "Actions",
    },
    actions: {
      toggleTheme: "Toggle light / dark",
      copyEmail: "Copy my email address",
      emailCopied: "Copied to clipboard",
    },
  },
  footer: {
    siteColumn: "Site",
    elsewhere: "Elsewhere",
    email: "Email",
    navLabel: "Footer navigation",
    rights: "All rights reserved.",
    localTimeLabel: "My local time",
    colophon:
      "Designed and built by Bernardo — set in Instrument Sans, Instrument Serif and Geist Mono. No trackers, no cookies.",
  },
  language: {
    label: "Language",
    switchToPortuguese: "Switch to Portuguese",
    switchToEnglish: "Switch to English",
  },
}

export type Common = typeof common
