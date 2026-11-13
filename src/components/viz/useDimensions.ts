import { useLayoutEffect, useState, type RefObject } from "react"

/**
 * Measures a div before first paint and on every size change (ResizeObserver).
 * Returns { width: 0, height: 0 } until measured — charts should return null then.
 */
export function useDimensions(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      setSize((prev) =>
        prev.width === Math.round(width) && prev.height === Math.round(height)
          ? prev
          : { width: Math.round(width), height: Math.round(height) }
      )
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref])

  return size
}
