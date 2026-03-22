# Next.js + PGlite on Vercel

Sample app showing how to build a local-first todo app with Next.js and
PGlite. The database runs in the browser and persists to IndexedDB, so no
cloud Postgres setup is required for prototyping.

## Stack

- Next.js 16.2.1
- React 19.2.4
- PGlite 0.4.1
- Tailwind CSS 4.2.2
- TypeScript 5.9.3
- pnpm

## Getting Started

```bash
npm install -g portless
pnpm install
pnpm dev
```

Open the named local URL printed by `portless`, for example
`http://pglite-todos.localhost:1355`.

## End-to-End Verification

```bash
pnpm test:e2e
```

The Playwright test verifies that a todo can be added and is still present
after a page reload, confirming local persistence. It runs through a stable
`portless` URL instead of relying on a fixed port.

## Goal

This repository follows the implementation plan in `plan.md`:

1. Set up the Next.js application shell with pinned dependencies.
2. Add a client-side todo app backed by PGlite and IndexedDB.
