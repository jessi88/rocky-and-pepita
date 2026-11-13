import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react"

import { Acorn } from "@/components/illustrations"

/**
 * Reading progress as the balcony railing: an acorn rolls along the top rail
 * as you read. Decorative (aria-hidden); the scroll position is the real indicator.
 */
export function RailingProgress() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })
  const progress = reduceMotion ? scrollYProgress : smooth
  const left = useTransform(progress, (p) => `calc(${p * 100}% - ${p * 22}px)`)
  const rotate = useTransform(progress, (p) => p * 720)
  const filled = useTransform(progress, (p) => `${p * 100}%`)

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-40 h-7 bg-paper/85 backdrop-blur-[2px]">
      <svg className="absolute inset-x-0 top-0 h-7 w-full text-ink-soft" preserveAspectRatio="none">
        <defs>
          <pattern id="balusters" width="14" height="28" patternUnits="userSpaceOnUse">
            <line x1="7" y1="10" x2="7" y2="28" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          </pattern>
        </defs>
        <rect y="0" width="100%" height="28" fill="url(#balusters)" />
        <line x1="0" y1="9" x2="100%" y2="9" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      </svg>
      {/* the read part of the rail, warmed by sunlight */}
      <motion.div className="absolute top-[7px] left-0 h-[4px] rounded-full bg-sunlight" style={{ width: filled }} />
      <motion.div className="absolute top-[-6px] text-acorn" style={{ left, rotate: reduceMotion ? 0 : rotate }}>
        <Acorn width={22} height={26} wobble={false} className="fill-paper-raised" />
      </motion.div>
    </div>
  )
}
