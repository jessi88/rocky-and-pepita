# Rocky & Pepita — a data-story book

An online "picture book" of real stories about Jessica's two cats, each chapter backed by trusted public data. Built with Vite + React + TypeScript + Tailwind + shadcn/ui; charts are hand-built with D3 (math) + React (rendering). Deployed to GitHub Pages (`npm run deploy`, `base: '/rocky-and-pepita/'`). Location context: Metro Vancouver.

Full plan: [docs/plan.md](docs/plan.md). One story at a time; Chapter 1 = "The Visitor on the Railing".

## The cats
- **Rocky** — belly pets while eating, leads Jessica to his food while looking back, slow blinks, hears the treat bag from anywhere.
- **Pepita** — a **tailless Manx**. Always draw/describe her without a tail. Sleeps on Jessica, mouths her glasses, "takes seats", daily meow-for-cuddles, bed-to-bathroom zoomies.

## Working rules
- **Jessica always sets up the foundation herself** (scaffold, config, base tooling). Don't re-scaffold or replace what she set up (theme-provider, shadcn components, `base`, deploy script); build on top of it, and ask before changing foundation files.
- **Fiction vs. fact**: story text may include fictional elements (extra scenes, the cats' inner thoughts, embellished details). **Data must be real and sourced**: every chart and number comes from a verified source, recorded in the chapter's `data/SOURCES.md` (URL, date accessed, licence, transformation). No number goes into the text before its source is verified. Jessica reviews every chapter draft. Colophon: "Stories inspired by real moments with Rocky & Pepita; the data is real."
- **Before each new chapter**, re-check `~/Documents/Emily Carr/CSPD-205-EffectiveCommThroughStorytelling/` for new course material (it keeps growing until end of 2026) and apply new lessons.
- Before Chapter 2, browse more of the Data & Eggs "narrative" pieces for ideas.

## Photos
Shared Google Photos album (only this album): https://photos.app.goo.gl/K9q8kSavPf1xjcCp6
Never hotlink from the live site. Sync locally (`scripts/sync-photos.mjs` → `photos-cache/`, gitignored), then process with sharp (strip metadata, resize, WebP/AVIF → `public/images/`). Chapters reference photos by manifest id with alt text.

## Story ideas (backlog, after Ch. 1)
1. Rocky wants belly pets while eating
2. Rocky leads me to his food, looking back → cat–human attachment (Vitale et al. 2019)
3. Rocky's slow blink → Humphrey et al. 2020, *Scientific Reports*
4. Rocky hears the treat bag → cat vs. human hearing range (Heffner & Heffner 1985)
5. Licking that ends in a fight → allogrooming & aggression research
6. Pepita sleeps on me → cat thermoneutral zone
7. Pepita mouths my glasses
8. Pepita grooms herself close to me
9. Pepita "takes seats", no tail → Manx gene; VetCompass life tables
10. Pepita's daily meow-for-cuddles → cats meow mainly to humans
11. Pepita's bed-to-bathroom zoomies → cat jump height, FRAPs

Extra ideas for review: "Dear Data"-style personal tracking chapters; "Where they sit" apartment map; "How they came home" (BC SPCA data); "Two of 8.2 million" (CAHI 2024). Data pairings are candidates until verified.

## Design & typography (CSCD-103 Typography, CSPD-205 Storytelling)
- **Type**: serif + sans pairing, one leads, one supports. Headings **Fraunces**; body/labels **Atkinson Hyperlegible Next**; self-hosted via `@fontsource`. A handwriting face (e.g. Caveat) only for chart annotations, never body text.
- Body ≥ 19px, line-height 1.5, ~1em paragraph spacing, measure ≤ 65ch, left-aligned (never justified). Emphasis in **bold**, not italics. No Light weights. ALL CAPS only for tiny letter-spaced labels.
- Hierarchy (Ogilvy): image → headline → body → takeaway last. Each chapter ends on its theme line, then a short Sources list.
- **Colour**: warm cream paper, deep ink text (WCAG AA). Ch. 1 palette: sunlight gold, acorn brown, crow blue-black, glass blue. Each chapter has its own light; dark mode = "the same book at night". Colour only for headings, highlights and data emphasis; one highlighted mark per chart, the rest muted grey. Cat accent colours come from their coats.
- **Story structure** per chapter: Setting → Characters → Conflict (external + internal) → Climax → Resolution → Theme; one vivid sensory detail and one symbolic object.
- **Art direction**: "a picture book found on a windowsill" — paper grain, soft page shadow, slight ink wobble on decorative frames only (charts stay precise). Charts built on the story's own objects (crows on a railing, window-pane waffle, cat activity clock).
- **Motion**: slow gentle reveals (0.5–1 s) on scroll; everything off with `prefers-reduced-motion`.

## Charts
- Follow `.claude/skills/d3/SKILL.md`: D3 for math only, React renders SVG; `MARGIN` + bounds pattern; axes as React components; shared `useDimensions` hook + `Responsive*` wrapper; `motion/react` for animation with `useReducedMotion`. No shadcn `chart` (Recharts).
- Check each chart with `.claude/skills/roast-my-chart` and fix 🔴/🟠 items: sorted bars, zero-based bar axes, no rainbow, annotate instead of legends, text ≥ 14px.
- Test at 375px width, no horizontal scroll.

## Commands
`npm run dev` · `npm run build` · `npm run lint` · `npm run typecheck` · `npm run deploy`
