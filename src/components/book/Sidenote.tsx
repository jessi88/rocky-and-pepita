import { useSyncExternalStore } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const WIDE_QUERY = "(min-width: 80rem)"

function useIsWide() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(WIDE_QUERY)
      mq.addEventListener("change", onChange)
      return () => mq.removeEventListener("change", onChange)
    },
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true
  )
}

type SidenoteProps = {
  n: number
  children: React.ReactNode
}

/**
 * Tufte-style sidenote: in the right margin on wide screens, a tap-to-open
 * footnote on phones and tablets. Place it inline right after the sentence it supports.
 */
export function Sidenote({ n, children }: SidenoteProps) {
  const wide = useIsWide()
  const marker = <sup className="ml-0.5 font-bold text-sunlight-ink">{n}</sup>

  if (wide) {
    return (
      <>
        {marker}
        {/* a span, not <aside>: sidenotes sit inside <p>, which can't hold block elements */}
        <span role="note" className="float-right clear-right mr-[-15rem] block w-52 text-small text-ink-soft">
          <span className="font-bold text-sunlight-ink">{n} </span>
          {children}
        </span>
      </>
    )
  }

  return (
    <Popover>
      <PopoverTrigger
        className="mx-0.5 inline-flex size-7 -translate-y-1.5 items-center justify-center rounded-full align-baseline text-small font-bold text-sunlight-ink hover:bg-paper-deep"
        aria-label={`Note ${n}`}
      >
        {n}
      </PopoverTrigger>
      <PopoverContent className="w-72 text-small text-ink-soft">{children}</PopoverContent>
    </Popover>
  )
}
