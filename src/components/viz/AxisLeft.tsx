import type { ScaleLinear } from "d3"

type AxisLeftProps = {
  yScale: ScaleLinear<number, number>
  width: number // bounds width, for gridlines
  pixelsPerTick?: number
  format?: (value: number) => string
}

/** Light horizontal gridlines with labels on the left. No axis line, no box. */
export function AxisLeft({ yScale, width, pixelsPerTick = 48, format = String }: AxisLeftProps) {
  const [bottom, top] = yScale.range()
  const ticks = yScale.ticks(Math.max(2, Math.floor((bottom - top) / pixelsPerTick)))

  return (
    <g>
      {ticks.map((value) => (
        <g key={value} transform={`translate(0, ${yScale(value)})`}>
          <line x2={width} stroke="var(--rule)" strokeDasharray={value === 0 ? undefined : "2 4"} />
          <text
            x={-10}
            dy="0.32em"
            textAnchor="end"
            fill="var(--ink-soft)"
            style={{ fontSize: 14, fontVariantNumeric: "tabular-nums" }}
          >
            {format(value)}
          </text>
        </g>
      ))}
    </g>
  )
}
