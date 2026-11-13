import type { SVGProps } from "react"

/**
 * Placeholder line art. Strokes use currentColor so a parent sets the ink.
 * Jessica can replace any of these with her own drawings (Procreate/Illustrator → SVG)
 * as long as the component name and viewBox proportions stay the same.
 */

type IllustrationProps = SVGProps<SVGSVGElement> & { title?: string; wobble?: boolean }

function Frame({ title, wobble = true, children, ...props }: IllustrationProps & { children: React.ReactNode }) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <g filter={wobble ? "url(#ink-wobble)" : undefined}>{children}</g>
    </svg>
  )
}

/** Crow body outline, side view facing right, perched. Shared by line art and the chart glyph. */
export const CROW_BODY =
  "M66 21 C56 19 45 26 36 35 L8 49 L13 54 L31 51 C41 58 56 58 64 50 C70 44 73 36 72 29"
export const CROW_HEAD = { cx: 67, cy: 25, r: 10 }
export const CROW_BEAK = "M75 21 L90 26 L75 30"

export function Crow(props: IllustrationProps) {
  return (
    <Frame viewBox="0 0 100 72" {...props}>
      <path d={CROW_BODY} />
      <circle {...CROW_HEAD} />
      <path d={CROW_BEAK} />
      <path d="M36 43 C45 39 55 40 63 45" />
      <path d="M40 47 C47 45 54 46 60 49" opacity={0.6} />
      <circle cx={70} cy={23} r={1.4} fill="currentColor" stroke="none" />
      <path d="M45 57 L43 66 M53 57 L55 66" />
      <path d="M38 66 L62 66" opacity={0.5} />
    </Frame>
  )
}

export function Acorn(props: IllustrationProps) {
  return (
    <Frame viewBox="0 0 60 72" {...props}>
      {/* stem */}
      <path d="M30 6 C31 10 31 13 30 16" />
      {/* cap */}
      <path d="M10 28 C10 18 19 14 30 14 C41 14 50 18 50 28 C43 31 17 31 10 28 Z" />
      <path d="M16 22 L22 27 M24 18 L30 28 M34 17 L38 28 M43 20 L45 27" opacity={0.55} />
      {/* nut */}
      <path d="M13 29 C13 46 21 62 30 66 C39 62 47 46 47 29" />
      <path d="M22 38 C23 46 26 53 29 57" opacity={0.45} />
    </Frame>
  )
}

/** Rocky: sitting cat, side view, tail straight up with a curl at the tip ("Rocky's tail went straight up"). */
export function Rocky(props: IllustrationProps) {
  return (
    <Frame viewBox="0 0 120 140" {...props}>
      <CatHeadAndFront />
      {/* back and haunch */}
      <path d="M70 58 C54 64 42 88 42 112 C42 124 47 132 58 132" />
      <path d="M47 113 C52 100 67 99 71 116 C72 124 70 130 66 132" />
      {/* tail: up from the rump, curling over at the tip */}
      <path d="M43 120 C30 116 22 98 22 76 C22 60 22 48 28 42 C33 37 39 40 38 46" />
      <path d="M43 112 C34 106 30 94 30 78 C30 62 29 52 32 47" />
    </Frame>
  )
}

/** Pepita: a Manx — rounded rump, longer hind legs, and no tail. Ever. */
export function Pepita(props: IllustrationProps) {
  return (
    <Frame viewBox="0 0 120 140" {...props}>
      <CatHeadAndFront />
      {/* higher, rounder Manx rump */}
      <path d="M70 58 C52 62 38 82 38 104 C38 122 46 132 58 132" />
      <path d="M43 108 C48 92 66 91 71 112 C73 122 70 130 66 132" />
      {/* no tail: just the round of the rump */}
      <path d="M38 104 C36 112 38 120 42 125" opacity={0.4} />
    </Frame>
  )
}

function CatHeadAndFront() {
  return (
    <>
      {/* head */}
      <path d="M64 44 C62 30 70 22 80 22 C92 22 99 31 97 43 C95 54 86 59 78 58 C70 58 65 52 64 44 Z" />
      {/* ears */}
      <path d="M67 30 L66 12 L78 23" />
      <path d="M87 23 L97 10 L96 31" />
      {/* eye (slow blink), nose, whiskers */}
      <path d="M84 38 C86 40 89 40 91 38" />
      <path d="M95 46 L97 47" />
      <path d="M92 50 L110 47 M92 52 L109 54" opacity={0.5} />
      {/* chest and front legs */}
      <path d="M76 58 C82 72 86 90 86 132" />
      <path d="M92 56 C94 74 96 104 96 132" />
      <path d="M58 132 L100 132" />
    </>
  )
}

export function Railing({ posts = 9, ...props }: IllustrationProps & { posts?: number }) {
  const width = 300
  const step = width / (posts - 1)
  return (
    <Frame viewBox="0 0 300 80" preserveAspectRatio="none" {...props}>
      <path d="M0 10 L300 10" strokeWidth={4} />
      <path d="M0 18 L300 18" />
      <path d="M0 72 L300 72" />
      {Array.from({ length: posts }, (_, i) => (
        <path key={i} d={`M${i * step} 18 L${i * step} 72`} />
      ))}
    </Frame>
  )
}

/** The cold coffee from Chapter 1 — no steam on purpose. */
export function CoffeeCup(props: IllustrationProps) {
  return (
    <Frame viewBox="0 0 90 80" {...props}>
      <path d="M18 24 L24 58 C25 63 29 66 34 66 L54 66 C59 66 63 63 64 58 L70 24 Z" />
      <path d="M18 24 C30 28 58 28 70 24" opacity={0.5} />
      <path d="M68 33 C82 31 84 51 64 53" />
      <ellipse cx={44} cy={70} rx={34} ry={5} />
    </Frame>
  )
}
