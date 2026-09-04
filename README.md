# bernardofernandezz.dev

Personal site of Bernardo Fernandez — a Next.js 16 (App Router) portfolio built as a personal space rather than a sales page: projects as case studies, a now page, writing, and a typed briefing flow instead of a contact form.

## Stack

- Next.js 16 + React 19 + TypeScript (strict)
- Tailwind CSS v4 + shadcn-style components
- next-themes (light/dark), lucide-react
- Zod for the briefing schema
- Bun as package manager

## Structure

```
app/
  (en)/        # English routes (no prefix, default)
  pt-br/       # Portuguese (Brazil) routes
components/    # home / work / about / now / article / brief / site / motion / three
lib/
  content/     # projects, articles, now data (locale-specific)
  i18n/        # locales, dictionaries, metadata helpers
  briefing/    # briefing flow, schema, server action + sink
```

Content lives in `lib/content/` and `lib/i18n/dictionaries/` — update copy or add projects without touching the UI.

## Commands

```bash
bun install
bun run dev      # dev server
bun run lint     # eslint
bunx tsc --noEmit
bun run build    # production build
bun run start
```

## Deployment

Self-hosted on a VPS behind nginx + systemd (`deploy/`), pushed via GitHub Actions (`.github/workflows/deploy.yml`): lint → build → typecheck, then SSH `deploy/update.sh` (pull, install, build, restart, health check).
