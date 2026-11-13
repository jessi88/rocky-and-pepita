import { Link } from "react-router"

import { RailingProgress } from "@/components/book/RailingProgress"
import { Sidenote } from "@/components/book/Sidenote"
import { Acorn, CoffeeCup, Crow, Pepita, Railing, Rocky } from "@/components/illustrations"
import { DuotonePhoto } from "@/components/photo/DuotonePhoto"
import { Polaroid } from "@/components/photo/Polaroid"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { ResponsiveCrowsOnRailing, SAMPLE_DATA } from "./CrowsOnRailingSample"
import { Palette } from "./Palette"
import { PlaceholderScene } from "./PlaceholderScene"

function Section({ n, title, intro, children }: { n: string; title: string; intro?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-20 first:mt-0" aria-labelledby={`s-${n}`}>
      <p className="label-caps">{n}</p>
      <h2 id={`s-${n}`} className="mt-2 text-h2 font-semibold text-ink">
        {title}
      </h2>
      {intro && <p className="prose-book mt-3 text-ink-soft">{intro}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ToggleGroup
        type="single"
        variant="outline"
        value={theme}
        onValueChange={(v) => v && setTheme(v as typeof theme)}
        aria-label="Colour theme"
      >
        <ToggleGroupItem value="light" className="px-3 text-small">
          Morning
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" className="px-3 text-small">
          Night
        </ToggleGroupItem>
        <ToggleGroupItem value="system" className="px-3 text-small">
          Follow device
        </ToggleGroupItem>
      </ToggleGroup>
      <span className="text-small text-ink-soft">
        or press <kbd className="rounded border border-rule px-1.5 font-mono text-[0.8125rem]">D</kbd>
      </span>
    </div>
  )
}

const TYPE_SCALE = [
  { cls: "text-display font-display font-medium", label: "Display · Fraunces 500", sample: "Rocky & Pepita" },
  { cls: "text-h1 font-heading font-semibold", label: "H1 · Fraunces 600", sample: "The Visitor on the Railing" },
  { cls: "text-h2 font-heading font-semibold", label: "H2 · Fraunces 600", sample: "A crow, an acorn, two cats" },
  { cls: "text-h3 font-heading font-semibold", label: "H3 · Fraunces 600", sample: "Monday, a quarter past nine" },
  { cls: "text-body", label: "Body · Atkinson Hyperlegible Next 400, 19–21px / 1.5", sample: "Il1 0O — every letter stays distinct, even tired at a desk." },
  { cls: "text-small text-ink-soft", label: "Small · 16px — captions, sidenotes", sample: "Photo: the balcony, October morning." },
  { cls: "label-caps", label: "Label · 13px bold, tracked caps — the only all-caps", sample: "Chapter one" },
  { cls: "font-hand text-hand", label: "Annotation · Caveat — chart notes only", sample: "October: acorn season!" },
]

export function StyleTile() {
  return (
    <>
      <RailingProgress />
      <main className="mx-auto max-w-6xl px-4 pt-16 pb-24 sm:px-8">
        {/* Header */}
        <header className="relative">
          <p className="label-caps">Style tile · for review</p>
          <h1 className="mt-3 text-display font-medium text-ink" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
            Rocky &amp; Pepita
          </h1>
          <p className="prose-book mt-4 text-h3 font-heading text-ink-soft">
            A picture book found on a windowsill: colour, type, paper, drawings, a chart and photos, before any
            chapter is built.
          </p>
          <div className="mt-6">
            <ThemeSwitch />
          </div>
          <div className="mt-10 flex items-end gap-6 text-ink sm:gap-10" aria-hidden="true">
            <Rocky className="h-28 w-auto sm:h-36" />
            <Pepita className="h-28 w-auto sm:h-36" />
            <Crow className="mb-16 h-10 w-auto text-crow sm:h-12" />
          </div>
        </header>

        <Separator className="my-16" />

        <Section
          n="01 — Colour"
          title="A sunny October morning, and the same book at night"
          intro={
            <>
              Contrast is measured live against the paper for the current theme. Text needs 4.5:1, chart marks
              3:1. <strong>Fills</strong> never carry text. The cats' own accent colours come once the photos arrive.
            </>
          }
        >
          <Palette />
        </Section>

        <Section
          n="02 — Type"
          title="Fraunces leads, Atkinson supports"
          intro="Two families do all the work; Caveat appears only as pencil notes on charts. Body stays left-aligned at 65 characters, emphasis is bold, and nothing is set in a Light weight."
        >
          <ul className="space-y-8">
            {TYPE_SCALE.map((t) => (
              <li key={t.label} className="grid gap-1 border-b border-rule pb-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <span className="text-small text-ink-soft">{t.label}</span>
                <span className={`${t.cls} min-w-0 text-ink`}>{t.sample}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 rounded-lg bg-paper-raised p-6 shadow-page sm:p-10">
            <p className="label-caps">Reading column · sample text</p>
            <div className="prose-book mt-4">
              <p className="drop-cap">
                The coffee had gone cold an hour ago, and Slack was still blinking. Then something black dropped onto
                the balcony railing, and two cats hit the glass at the same time. Rocky's tail went straight up.
                Pepita, who has no tail to speak with, wiggled her whole back end instead.
              </p>
              <p>
                This paragraph shows the body setting: 65 characters at most, line height 1.5, a full line of space
                between paragraphs, and <strong>bold for emphasis</strong>.
                <Sidenote n={1}>
                  Sidenotes hold sources and small asides, e.g. <em>eBird, Metro Vancouver, accessed Nov 2026</em>.
                  On a phone they open with a tap.
                </Sidenote>{" "}
                Sources sit in the margin on wide screens and open with a tap on phones.
              </p>
            </div>
          </div>
        </Section>

        <Section
          n="03 — Paper & ink"
          title="Materials, not a dashboard"
          intro="Paper grain sits under everything. The page lifts off the desk with a soft shadow. Decorative lines get a slight hand-inked wobble; chart marks never do."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <figure className="flex flex-col gap-3">
              <div className="h-40 rounded-lg border border-rule bg-paper" />
              <figcaption className="text-small text-ink-soft">The desk: cream paper with fractal-noise grain.</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <div className="h-40 rounded-lg bg-paper-raised shadow-page" />
              <figcaption className="text-small text-ink-soft">The page: one shade lighter, soft page shadow.</figcaption>
            </figure>
            <figure className="flex flex-col gap-3">
              <svg viewBox="0 0 200 120" className="h-40 w-full text-ink-soft" aria-hidden="true">
                <rect x="8" y="10" width="84" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                <rect x="108" y="10" width="84" height="100" rx="4" fill="none" stroke="currentColor" strokeWidth="2" filter="url(#ink-wobble)" />
                <text x="50" y="64" textAnchor="middle" fill="currentColor" style={{ fontSize: 13 }}>machine</text>
                <text x="150" y="64" textAnchor="middle" fill="currentColor" style={{ fontSize: 13 }}>hand-inked</text>
              </svg>
              <figcaption className="text-small text-ink-soft">Ink wobble on frames and drawings only.</figcaption>
            </figure>
          </div>
        </Section>

        <Section
          n="04 — Drawings"
          title="Placeholder line art, ready to be replaced by yours"
          intro="Simple SVG drawings in one stroke weight. Any of them can be swapped for your own Procreate or Illustrator drawings. Pepita is always drawn without a tail."
        >
          <ul className="grid grid-cols-2 gap-6 text-ink sm:grid-cols-3 lg:grid-cols-6">
            {[
              { el: <Rocky className="h-28 w-auto" />, name: "Rocky", note: "tail straight up" },
              { el: <Pepita className="h-28 w-auto" />, name: "Pepita", note: "Manx, no tail" },
              { el: <Crow className="h-16 w-auto text-crow" />, name: "The crow", note: "perched" },
              { el: <Acorn className="h-16 w-auto text-acorn" />, name: "Acorn", note: "the symbol" },
              { el: <CoffeeCup className="h-16 w-auto" />, name: "Coffee", note: "cold: no steam" },
              { el: <Railing className="h-12 w-full text-ink-soft" />, name: "Railing", note: "the x-axis" },
            ].map((d) => (
              <li key={d.name} className="flex flex-col items-center gap-3 rounded-lg bg-paper-raised p-4 shadow-page">
                <div className="flex h-28 w-full items-end justify-center">{d.el}</div>
                <div className="text-center text-small">
                  <strong>{d.name}</strong>
                  <span className="block text-ink-soft">{d.note}</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section
          n="05 — Charts"
          title="Charts built from the story's own objects"
          intro={
            <>
              The railing is the axis, each crow perches on its month. One mark is highlighted, the rest stay quiet,
              the title states the takeaway, and a pencil note replaces the legend. Hover or tab through the months:
              the crow tilts its head.
            </>
          }
        >
          <figure className="rounded-lg bg-paper-raised p-4 shadow-page sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-h3 font-semibold text-ink">October brings the most crows to the railing</h3>
              <span className="rounded-full border border-dashed border-destructive px-3 py-0.5 text-small font-bold text-destructive">
                Sample values, not data
              </span>
            </div>
            <p className="mt-1 text-small text-ink-soft">
              Crows per month · made-up numbers to test the design. The real chart uses eBird data for Metro
              Vancouver, sourced in Chapter 1.
            </p>
            <div className="mt-4 h-[380px]">
              <ResponsiveCrowsOnRailing data={SAMPLE_DATA} />
            </div>
          </figure>
        </Section>

        <Section
          n="06 — Photos"
          title="Real moments, in the book's light"
          intro="Photos appear as polaroids in their own colours, or as duotones in the chapter's palette (morning gold by day, glass blue at night). This scene is a drawn stand-in until the album sync runs."
        >
          <div className="grid items-start gap-12 md:grid-cols-2">
            <Polaroid caption="Rocky & Pepita, on crow watch" tilt={-2.5} className="mx-auto max-w-sm">
              <PlaceholderScene className="block h-auto w-full" />
            </Polaroid>
            <figure className="mx-auto w-full max-w-sm">
              <DuotonePhoto className="overflow-hidden rounded-sm shadow-page">
                <PlaceholderScene className="block h-auto w-full" />
              </DuotonePhoto>
              <figcaption className="mt-3 text-small text-ink-soft">Duotone · switch the theme to see the night version.</figcaption>
            </figure>
          </div>
        </Section>

        <Section
          n="07 — Book furniture"
          title="Chapter opener, notes and controls"
          intro="Each chapter opens as a spread: duotone photo on the left, chapter number and title on the right. The acorn on the railing at the top of this page is the reading progress."
        >
          <div className="grid overflow-hidden rounded-lg bg-paper-raised shadow-page md:grid-cols-2">
            <DuotonePhoto>
              <PlaceholderScene className="block h-full w-full object-cover" />
            </DuotonePhoto>
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
              <p className="label-caps">Chapter one</p>
              <h3
                className="text-h1 font-medium text-ink"
                style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}
              >
                The Visitor on the Railing
              </h3>
              <div className="flex items-center gap-3 text-acorn" aria-hidden="true">
                <span className="h-px w-16 bg-rule" />
                <Acorn className="h-6 w-auto" />
                <span className="h-px w-16 bg-rule" />
              </div>
              <p className="text-small text-ink-soft">Setting · Characters · Conflict · Climax · Resolution · Theme</p>
            </div>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <p className="label-caps">Controls (shadcn, in book colours)</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Button>Next chapter →</Button>
                <Button variant="outline">← Previous</Button>
                <Button variant="ghost">Contents</Button>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>Tooltips use ink on paper, reversed.</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <div>
              <p className="label-caps">Chapter ending</p>
              <p className="mt-4 font-heading text-h3 text-ink">
                “A sample theme line sits here, last, where the eye lands.”
              </p>
              <ol className="mt-6 list-decimal space-y-1 pl-5 text-small text-ink-soft marker:text-sunlight-ink">
                <li>Sources list, numbered like the sidenotes. Example format: Source, dataset, URL, accessed date.</li>
                <li>Every number in a chapter traces back to a line here and in SOURCES.md.</li>
              </ol>
            </div>
          </div>
        </Section>

        <Section
          n="08 — Motion"
          title="Story pace, never in the way"
          intro="Slow reveals (0.5–1 s) when a beat scrolls into view; small delights like the crow's head tilt. With reduced motion turned on in your device settings, everything appears in place, without animation."
        >
          <div className="flex items-center gap-4 text-ink-soft">
            <Railing className="h-10 w-48" />
            <span className="text-small">The acorn above rolls as you scroll.</span>
          </div>
        </Section>

        <Separator className="my-16" />
        <footer className="flex flex-wrap items-center justify-between gap-4 text-small text-ink-soft">
          <span>Stories inspired by real moments with Rocky &amp; Pepita; the data is real.</span>
          <Link to="/">← Back to the cover</Link>
        </footer>
      </main>
    </>
  )
}
