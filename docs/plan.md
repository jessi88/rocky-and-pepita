# Cat Stories — an online data-story book about Rocky & Pepita

## Context
Jessica wants a personal, emotional, cute data-visualization "online book": real stories about her two cats, **Rocky** and **Pepita** (a tailless Manx), each backed by trusted public data. Built with D3 + React following the D3 Loves React course and the rules in `holtzy/dataviz-skills`. Design follows her Emily Carr courses (CSCD-103 Typography, CSPD-205 Storytelling). One story at a time; **Chapter 1 = "The Visitor on the Railing"** (`~/Documents/Emily Carr/CSPD-205-EffectiveCommThroughStorytelling/JessicaBosch_Elementsofastory.pdf`). Location: Metro Vancouver.

The project folder `~/Documents/Git/cat-stories` is empty. **Jessica scaffolds the foundation herself first**: Vite + React + TypeScript + Tailwind + shadcn/ui, pushed as a GitHub repo. Implementation starts after that.

Note: the CSPD-205 folder keeps receiving new course material until end of 2026 → re-scan it before starting each new chapter and apply new lessons.

## Step 0 — Setup after Jessica's scaffold
- Save project memory (cats, story backlog, course-folder-updates note, "Jessica scaffolds the foundation herself").
- Install dataviz skills into the project: `.claude/skills/d3` and `.claude/skills/roast-my-chart` (from github.com/holtzy/dataviz-skills, MIT). Follow `d3/SKILL.md`: D3 only for math (scales, shapes, formats), React renders SVG; margin/bounds pattern; axes as React components; `useDimensions` + `ResizeObserver` responsive wrapper; `motion/react` for animation; `useReducedMotion`.
- shadcn components (installed by Jessica): `button tooltip popover hover-card sheet dialog toggle-group separator` — restyled with the book's tokens; no shadcn `chart` (Recharts), all charts are hand-built D3 + React.
- Add deps: `d3`, `@types/d3`, `motion`, `react-router` (HashRouter for GitHub Pages), `sharp` (dev, photo script).
- Scaffold done at `~/Documents/Git/rocky-and-pepita` (repo github.com/jessi88/rocky-and-pepita): `d3`, `@types/d3`, shadcn components, theme-provider, `base: '/rocky-and-pepita/'`, deploy via `npm run deploy` (gh-pages) are already in place — keep them.
- Check `src/lib/utils.ts`: it re-exports `cn` from the npm package `cn`, not the usual shadcn `clsx` + `tailwind-merge` helper; without tailwind-merge, conflicting classes passed via `className` may not override variants. Ask Jessica before switching to the standard helper.

## Book structure
```
src/
  book/            Cover.tsx, TableOfContents.tsx, ChapterLayout.tsx, ChapterNav.tsx (prev/next), Colophon.tsx (sources + credits)
  chapters/
    01-visitor-on-the-railing/
      index.tsx    story text as an ordered array of "beats" (setup, inciting, standoff, climax, resolution, theme)
      charts/      one component per chart
      data/        processed JSON + SOURCES.md (URL, date accessed, licence, transformation)
  components/
    scrolly/Scrolly.tsx   sticky graphic + text steps, active step via motion `useInView` (pattern from d3 skill)
    viz/  useDimensions.ts, AxisBottom.tsx, AxisLeft.tsx, Tooltip.tsx, Annotation.tsx
    photo/ Polaroid.tsx, DuotonePhoto.tsx (SVG feColorMatrix filter in book palette)
  styles/ tokens.css (colour + type tokens, light "morning paper" / dark "night" themes)
data-raw/          downloaded source files (committed if licence allows)
scripts/process-data.ts, scripts/process-photos.mjs
photos-originals/  (gitignored) Jessica's selected photos
public/images/     processed web photos
```
Reading format: **hybrid book** — cover + table of contents, each chapter is a scrolly page where charts appear in sync with the story's beats (like the narrative pieces on Data & Eggs). Chapters close with a "theme" line and a small "Sources" footnote list.

## Design system (from CSCD-103 + CSPD-205)
- **Type**: max two families, serif + sans pairing (Week 7 "complementary": one leads, one supports). Display/headings: **Fraunces** (soft, warm, playful serif; variable weight). Body/labels: **Atkinson Hyperlegible Next** (meets Week 3 rules: tall x-height, open apertures, distinct I/l/1). Self-hosted via `@fontsource`.
- Body ≥ 19px, line-height 1.5, paragraph spacing ~1em extra, measure ≤ 65ch, left-aligned (no justified rivers), emphasis in **bold** not italics, no Light weights, ALL CAPS only for tiny letter-spaced labels.
- Hierarchy per Ogilvy order: image → headline → body → the takeaway seen last. Each chapter ends on the theme line.
- **Colour**: warm cream paper background, deep ink text (high contrast, WCAG AA), October accents (sunlight gold, acorn brown, crow blue-black). Cat accent colours derived from Rocky's and Pepita's coats once photos arrive. Colour only for headings, highlights and data emphasis; one highlighted mark per chart, rest muted grey.
- **Fiction vs. fact**: the story text may add fictional elements (extra scenes, dialogue-like inner thoughts of the cats, embellished details) to strengthen the arc and emotion; Jessica reviews every chapter draft. **Data stays strictly factual** — every chart and number comes from a verified source. The colophon says "Stories inspired by real moments with Rocky & Pepita; the data is real."
- **Story structure** per chapter: Setting → Characters → Conflict (external + internal) → Climax → Resolution → Theme; one vivid sensory detail and one symbolic object (Ch. 1: the acorn) — matches Jessica's own voice.
- Charts: chosen via data-to-viz logic; check against `roast-my-chart` caveats (sorted bars, no truncated bar axes, no rainbow, annotate instead of legends).

## Art direction — "a picture book found on a windowsill"
Goal: visually appealing, unique, specific; natural and crafted, not a dashboard or template. Main reference from Data & Eggs staff picks: **"Searching for Birds"** (Nadieh Bremer / Visual Cinnamon): hand-drawn Procreate illustrations, hand-lettered section names, feather dividers, and custom D3 charts built on the subject's own metaphors (nest, eggs). Before Chapter 2, browse more of the Data & Eggs "narrative" filter (99 pieces) for new ideas.
- **Material**: warm, uncoated-paper background with subtle grain (SVG `feTurbulence` noise, very low opacity), soft page shadow on the reading column, slightly irregular "ink" strokes (SVG displacement filter) on illustrations and chart outlines. Charts stay precise; the wobble is only on decorative frames.
- **Book furniture**: cover with the two cats as illustrated characters (Pepita drawn without a tail, true to her); chapter opener as a two-page spread (duotone photo left, "Chapter One" + hand-lettered title right, then a drop cap); sources as **margin sidenotes** (Tufte-style) on desktop, tap-to-open footnotes on phones; a reading-progress bar shaped like the **balcony railing**, with an acorn moving along it.
- **Each chapter has its own light**: Ch. 1 = sunny October morning (cream, sunlight gold, acorn brown, crow blue-black, glass blue). Later chapters get their own time of day (e.g., night-time zoomies = indigo). Dark mode = "the same book at night".
- **Third typeface, annotations only**: a handwriting face (e.g., Caveat) for chart notes with hand-drawn arrows, like pencil notes in a book's margin (course allows 2–3 families; it never replaces body text).
- **Illustration**: I provide simple SVG line art placeholders (crow, acorn, Rocky, tailless Pepita, railing, coffee cup). Jessica can replace them with her own drawings or hand lettering (Procreate/Illustrator → SVG) for a truly personal touch.
- **Charts built on the story's own objects** (instead of generic bars):
  - *Crows by month*: 12 crow glyphs perched along a drawn **railing** (the x-axis); bar height shown as a stack/perch height, October's crow holds an acorn.
  - *Cat activity clock*: radial 24-hour area wrapped around an illustration of a curled-up cat, dawn and dusk shaded gold/rose, a pin at "the crow arrives".
  - *One day in minutes*: 1,440-square waffle laid out like **window panes**; screen minutes glow phone-blue, one square becomes an acorn (the standoff).
  - *Why the glass matters*: estimated range of birds killed by outdoor cats in Canada as dots behind a pane of glass, the uncertain range fading out (shows uncertainty honestly).
- **Motion**: slow, gentle reveals (0.5–1 s, story pace) when a beat scrolls into view; small delights like the crow head-tilting on hover and cats' ears twitching; all off with reduced motion.
- **Style tile first**: before building Chapter 1, I build a `/style-tile` page (palette, type scale, paper texture, sample annotated chart, photo treatments) for Jessica to review and adjust.

## Chapter 1 — "The Visitor on the Railing": beats × data
| Beat | Text | Chart | Source (verify + record in SOURCES.md) |
|---|---|---|---|
| Setup: rushed Monday, Slack, cold coffee | ¶1 opening | **Waffle of one day (1,440 squares = minutes)**: screen minutes filled, later a single highlighted square = the standoff | Statistics Canada (Canadian Internet Use Survey tables, CSV) and/or DataReportal Canada 2026 |
| Inciting: crow lands | crow arrives | **Crows by month, Metro Vancouver** (bar chart, October highlighted, acorn icon) | eBird bar-chart data, American Crow (Northwestern Crow lumped), region CA-BC Metro Vancouver (free TSV download) |
| Cats skid to the glass, chatter | Rocky's tail, Pepita's hip-wiggle | **24-hour radial "clock" of cat activity**, dawn/dusk peaks, pin at the crow's morning time | peer-reviewed accelerometer study (e.g., PLOS ONE 2020, PMC7394395) — extract published hourly values or digitize the figure, documented |
| Standoff / climax | phone down, crow caws | Waffle returns: the one square she didn't spend on a screen | — |
| Aside: the glass | crow flies off safely | **Gentle range chart**: estimated birds killed by cats per year in Canada (range bar, not a single number) + share of BC cats kept indoors if available | Blancher 2013, *Avian Conservation & Ecology*; BC SPCA |
| Resolution / theme | acorn on desk | photo of the acorn + cats at the window (duotone), final line | — |

The text is expanded from the assignment version into a longer, book-length chapter (may include fictional details, e.g., what the cats "think", the crow's return visits), drafted for Jessica's review before building. Exact figures are fetched and cross-checked during implementation; no number is written into the story before its source is verified.

## Photos — synced from Jessica's shared Google Photos album
Source: shared album https://photos.app.goo.gl/K9q8kSavPf1xjcCp6 (only this album is accessed; Jessica adds photos over time). Verified: the public album page resolves and exposes ~219 `lh3.googleusercontent.com/pw/...` image URLs.
- Don't hotlink from the live site: those URLs are unofficial and can expire, and Google's Photos API no longer gives apps read access to existing albums.
- Instead `npm run sync-photos` (`scripts/sync-photos.mjs`): fetch the album page → extract image URLs → download any new ones (sized `=w2000`) into `photos-cache/` (gitignored) with a `photos-manifest.json` (stable id, date added, width/height). Re-run whenever the album changes; existing photos are skipped.
- `scripts/process-photos.mjs` (sharp): strips any metadata, resizes (800/1600 px), outputs WebP/AVIF to `public/images/`, extracts coat-colour palette candidates.
- Picking photos for chapters: I generate a local contact sheet (`photos-cache/contact-sheet.html`) to browse; chapters reference photos by manifest id in `chapters/*/photos.ts`, with alt text and captions.
- Fallback if Google changes the page format: album → ⋮ → Download all → unzip into `photos-cache/`; the processing step is unchanged.
- Styling: polaroid frames for real photos + duotone (book palette) versions; optional hand-made cut-outs (Illustrator/Photoshop) for "character" illustrations on the cover.

## Story backlog (one at a time, after Ch. 1)
Jessica's ideas, each with a candidate public-data pairing (to verify):
1. Rocky wants belly pets while eating
2. Rocky leads me to his food, looking back → cat–human attachment study (Vitale et al. 2019, *Current Biology*)
3. Rocky's slow blink → Humphrey et al. 2020, *Scientific Reports* (slow-blink experiments)
4. Rocky hears the treat bag → cat vs. human hearing range (Heffner & Heffner 1985)
5. Licking that ends in a fight → allogrooming & aggression research
6. Pepita sleeps on me → cat thermoneutral zone / body warmth
7. Pepita mouths my glasses
8. Pepita grooms herself close to me
9. Pepita "takes seats", no tail → Manx gene; VetCompass life tables (free XLSX)
10. Pepita's daily meow-for-cuddles → cats meow mainly to humans
11. Pepita's bed-to-bathroom zoomies → cat jump height, FRAPs
Additional suggestions for review:
- **Personal data chapters ("Dear Data" style)**: track one week of naps, seats, or meows yourself and set it beside public data — very human-centred.
- **"Where they sit"**: an illustrated apartment map of favourite spots by time of day.
- **"How they came home"**: adoption story + BC SPCA / Canadian shelter data.
- **"Two of 8.2 million"**: Rocky & Pepita among Canada's cats (CAHI 2024).

## Verification
- `npm run dev`: read Chapter 1 top to bottom on desktop and phone width (375px): charts resize, scroll steps trigger at the right beats, no horizontal scroll.
- `prefers-reduced-motion` on → no animations; dark mode readable.
- Contrast check (WCAG AA) for text and chart marks; keyboard focus visible on nav.
- Run the `roast-my-chart` skill on each chart; fix 🔴/🟠 items.
- Every number on the page traceable in `SOURCES.md`; photos checked for no EXIF (`exiftool public/images/*`).
- `npm run build` + `npm run deploy` works at `jessi88.github.io/rocky-and-pepita/`.
