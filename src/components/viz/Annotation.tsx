type Point = [number, number]

type AnnotationProps = {
  /** Where the note's text sits (bounds coordinates, baseline of the first line). */
  x: number
  y: number
  lines: string[]
  anchor?: "start" | "end"
  /** Arrow from a point next to the text to the mark it points at. Keep it short. */
  from: Point
  to: Point
  /** Bend of the arrow: positive curves clockwise, 0 is straight. */
  bend?: number
}

/**
 * A pencil note in the margin of the chart: Caveat text + a hand-drawn curved arrow.
 * Place the text in empty space next to what it describes, never across other marks.
 */
export function Annotation({ x, y, lines, anchor = "start", from, to, bend = 0.3 }: AnnotationProps) {
  const lineHeight = 22
  const [fx, fy] = from
  const [tx, ty] = to
  const cx = (fx + tx) / 2 + (ty - fy) * bend
  const cy = (fy + ty) / 2 - (tx - fx) * bend
  // Arrowhead follows the curve's final direction.
  const angle = Math.atan2(ty - cy, tx - cx)
  const head = (a: number) => `${tx - 8 * Math.cos(angle + a)} ${ty - 8 * Math.sin(angle + a)}`

  return (
    <g fill="none" stroke="var(--ink-soft)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fill="var(--ink)"
        stroke="none"
        style={{ fontFamily: "var(--font-hand)", fontSize: 22, fontWeight: 500 }}
      >
        {lines.map((line, i) => (
          <tspan key={i} x={x} dy={i === 0 ? 0 : lineHeight}>
            {line}
          </tspan>
        ))}
      </text>
      <g filter="url(#ink-wobble)">
        <path d={`M${fx} ${fy} Q${cx} ${cy} ${tx} ${ty}`} />
        <path d={`M${head(0.5)} L${tx} ${ty} L${head(-0.5)}`} />
      </g>
    </g>
  )
}
