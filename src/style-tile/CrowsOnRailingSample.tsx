import * as d3 from "d3"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useMemo, useRef, useState } from "react"

import { CROW_BEAK, CROW_BODY, CROW_HEAD, Acorn } from "@/components/illustrations"
import { Annotation } from "@/components/viz/Annotation"
import { AxisLeft } from "@/components/viz/AxisLeft"
import { useDimensions } from "@/components/viz/useDimensions"

type Datum = { month: string; value: number }

/**
 * SAMPLE VALUES FOR DESIGN REVIEW ONLY — NOT DATA.
 * Round, made-up numbers to test the chart's look. The real chart uses
 * eBird bar-chart data for Metro Vancouver, sourced in Chapter 1's SOURCES.md.
 */
export const SAMPLE_DATA: Datum[] = [
  { month: "Jan", value: 6 },
  { month: "Feb", value: 7 },
  { month: "Mar", value: 9 },
  { month: "Apr", value: 8 },
  { month: "May", value: 7 },
  { month: "Jun", value: 10 },
  { month: "Jul", value: 12 },
  { month: "Aug", value: 13 },
  { month: "Sep", value: 15 },
  { month: "Oct", value: 18 },
  { month: "Nov", value: 11 },
  { month: "Dec", value: 8 },
]

const HIGHLIGHT = "Oct"
const MARGIN = { top: 64, right: 12, bottom: 64, left: 40 }
const RAIL_DEPTH = 26 // railing drawn under the baseline

type ChartProps = { width: number; height: number; data: Datum[] }

function CrowsOnRailing({ width, height, data }: ChartProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const reduceMotion = useReducedMotion()
  const [hovered, setHovered] = useState<string | null>(null)

  const boundsWidth = width - MARGIN.left - MARGIN.right
  const boundsHeight = height - MARGIN.top - MARGIN.bottom

  const xScale = useMemo(
    () => d3.scaleBand<string>().domain(data.map((d) => d.month)).range([0, boundsWidth]).padding(0.3),
    [data, boundsWidth]
  )
  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) ?? 0])
        .nice()
        .range([boundsHeight, 0]),
    [data, boundsHeight]
  )

  if (width === 0 || height === 0) return null

  const band = xScale.bandwidth()
  const postWidth = Math.min(band * 0.45, 14)
  const crowScale = Math.min(band * 1.5, 46) / 100
  const narrow = boundsWidth < 480
  const show = inView || !!reduceMotion
  const highlight = data.find((d) => d.month === HIGHLIGHT)!
  const hx = xScale(HIGHLIGHT)! + band / 2
  const hy = yScale(highlight.value)
  const hoveredDatum = data.find((d) => d.month === hovered)

  return (
    <div className="relative">
      <svg ref={ref} width={width} height={height} role="img" aria-labelledby="crows-sample-desc">
        <desc id="crows-sample-desc">
          Sample chart: crows perched on railing posts, one per month. Post height shows the (made-up) number of
          crows; October is the tallest and highlighted.
        </desc>
        <g transform={`translate(${MARGIN.left}, ${MARGIN.top})`}>
          <AxisLeft yScale={yScale} width={boundsWidth} pixelsPerTick={60} />

          {/* the railing is the x-axis */}
          <g filter="url(#ink-wobble)" stroke="var(--ink-soft)" strokeLinecap="round">
            <line x1={0} x2={boundsWidth} y1={boundsHeight} y2={boundsHeight} strokeWidth={3.5} />
            <line x1={0} x2={boundsWidth} y1={boundsHeight + RAIL_DEPTH} y2={boundsHeight + RAIL_DEPTH} />
            {d3.range(0, boundsWidth + 1, 12).map((x) => (
              <line key={x} x1={x} x2={x} y1={boundsHeight + 3} y2={boundsHeight + RAIL_DEPTH} opacity={0.4} />
            ))}
          </g>

          {data.map((d, i) => {
            const cx = xScale(d.month)! + band / 2
            const top = yScale(d.value)
            const isHighlight = d.month === HIGHLIGHT
            const isHovered = d.month === hovered
            const delay = reduceMotion ? 0 : i * 0.05
            return (
              <g key={d.month}>
                <motion.rect
                  x={cx - postWidth / 2}
                  width={postWidth}
                  rx={2}
                  fill={isHighlight ? "var(--mark-highlight)" : "var(--mark-muted)"}
                  initial={reduceMotion ? false : { y: boundsHeight, height: 0 }}
                  animate={show ? { y: top, height: boundsHeight - top } : { y: boundsHeight, height: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
                />
                <motion.g
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: show ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: delay + 0.6 }}
                >
                  <g
                    transform={`translate(${cx - 49 * crowScale}, ${top - 64 * crowScale}) scale(${crowScale})`}
                    fill={isHighlight ? "var(--crow)" : "var(--mark-muted)"}
                    stroke="none"
                  >
                    <path d={`${CROW_BODY} Z`} />
                    <motion.g
                      style={{ transformBox: "fill-box", transformOrigin: "30% 80%" }}
                      animate={{ rotate: isHovered && !reduceMotion ? -18 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    >
                      <circle {...CROW_HEAD} />
                      <path d={`${CROW_BEAK} Z`} />
                      <circle cx={70} cy={23} r={1.8} fill="var(--paper)" />
                      {isHighlight && (
                        <g transform="translate(82 22) scale(0.36)" className="text-acorn">
                          <Acorn width={60} height={72} wobble={false} strokeWidth={4} fill="var(--sunlight)" />
                        </g>
                      )}
                    </motion.g>
                    <path d="M45 57 L43 66 M53 57 L55 66" stroke={isHighlight ? "var(--crow)" : "var(--mark-muted)"} strokeWidth={3} />
                  </g>
                </motion.g>
                <text
                  x={cx}
                  y={boundsHeight + RAIL_DEPTH + 24}
                  textAnchor="middle"
                  fill={isHighlight ? "var(--ink)" : "var(--ink-soft)"}
                  fontWeight={isHighlight ? 700 : 400}
                  style={{ fontSize: 14 }}
                >
                  {narrow ? d.month[0] : d.month}
                </text>
                {/* hit area: hover or keyboard-focus a month */}
                <rect
                  x={xScale(d.month)! - (xScale.step() - band) / 2}
                  width={xScale.step()}
                  y={-MARGIN.top}
                  height={boundsHeight + MARGIN.top + RAIL_DEPTH}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`${d.month}: ${d.value} (sample value)`}
                  onMouseEnter={() => setHovered(d.month)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(d.month)}
                  onBlur={() => setHovered(null)}
                  style={{ outline: "none" }}
                />
              </g>
            )
          })}

          {/* the one value worth reading, labelled directly */}
          <text
            x={hx}
            y={hy - 46 * crowScale - 10}
            textAnchor="middle"
            fill="var(--ink)"
            fontWeight={700}
            style={{ fontSize: 15, fontVariantNumeric: "tabular-nums" }}
          >
            {highlight.value}
          </text>

          {show && (
            <motion.g
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reduceMotion ? 0 : 1.3 }}
            >
              {/* Note sits in the empty top margin, left of October; short arrow down to its crow. */}
              <Annotation
                x={hx - crowScale * 60 - 34}
                y={hy - crowScale * 50 - 26}
                anchor="end"
                lines={["October: acorn season"]}
                from={[hx - crowScale * 60 - 28, hy - crowScale * 50 - 32]}
                to={[hx - crowScale * 40, hy - crowScale * 46]}
                bend={-0.35}
              />
            </motion.g>
          )}
        </g>
      </svg>

      {hoveredDatum && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md bg-ink px-2.5 py-1 text-small text-paper shadow-page"
          style={{
            left: MARGIN.left + xScale(hoveredDatum.month)! + band / 2,
            top: MARGIN.top + yScale(hoveredDatum.value) - 46 * crowScale - 30,
          }}
        >
          <strong>{hoveredDatum.month}</strong> · {hoveredDatum.value} crows <span className="opacity-75">(sample)</span>
        </div>
      )}
    </div>
  )
}

/** Responsive wrapper: measures, forwards size, nothing else. Parent sets the height. */
export function ResponsiveCrowsOnRailing(props: Omit<ChartProps, "width" | "height">) {
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useDimensions(ref)
  return (
    <div ref={ref} style={{ width: "100%", height: "100%", minWidth: 0 }}>
      <CrowsOnRailing width={width} height={height} {...props} />
    </div>
  )
}
