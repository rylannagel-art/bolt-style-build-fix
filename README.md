# Case study: "It works in preview, but the deploy fails"

A small React + Vite + TypeScript app of the kind Bolt, Lovable or v0 generate. It ran fine with `npm run dev`
but failed every production build on Netlify, and once it did build, the live site was a blank white page.

> Demo project built for this case study, not client work. Built and fixed with AI assistance (Claude) and checked by me.

## The symptom (in the client's words)

"Everything looks right in the preview, but Netlify says the build failed. Someone told me to just turn off the
checks, and then the site was completely blank."

## The cause

Three separate faults, all invisible in the dev server:

1. **Letter case in an import.** `App.tsx` imported `./components/priceCard`, but the file is `PriceCard.tsx`.
   Windows and macOS don't care; Netlify and Vercel build on Linux, where the file "does not exist".
   (`forceConsistentCasingInFileNames` makes TypeScript catch this on every computer.)
2. **A TypeScript error the dev server never shows.** Vite's dev server strips types without checking them, so
   `const cheapest: number = formatPrice(...)` (a string) only fails at `npm run build`.
3. **A missing environment variable.** The app did `new URL(import.meta.env.VITE_API_BASE_URL)` at start-up. With
   the variable unset on the host, that line throws before React draws anything: a blank page, and the error only
   appears in the browser console.

## The fix (commit 2)

- Import path matches the file name exactly (`./components/PriceCard`).
- Correct type (`const cheapest: string`), so `tsc` passes.
- `src/config.ts` reads the variable safely and the page shows a clear "Setup needed" message instead of going blank.
- `.env.example` documents the variable; `netlify.toml` sets the build command, the `dist` folder, the Node version
  and the single-page-app redirect.

Compare the two commits to see each change: `git diff HEAD~1 HEAD`.

## How to check it yourself (Node 18 or newer)

1. `npm install`
2. `npm run build` → it finishes with `✓ built in …` (on the first commit, `git checkout HEAD~1`, it fails with the
   two errors above; `git checkout -` to come back).
3. `npm run preview` and open the address it prints: you see the three price cards and an orange **"Setup needed:
   VITE_API_BASE_URL is not set"** box instead of a blank page. Copy `.env.example` to `.env`, run `npm run build`
   and `npm run preview` again: the box is gone and the page says where quotes are sent.

MIT licence.
