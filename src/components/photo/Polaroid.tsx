import { cn } from "@/lib/utils"

type PolaroidProps = {
  children: React.ReactNode
  caption?: string
  /** Degrees; keep small (−3…3) so it feels placed by hand, not thrown. */
  tilt?: number
  tape?: boolean
  className?: string
}

/** A real photo as a polaroid print: thick bottom edge, hand-written caption, optional washi tape. */
export function Polaroid({ children, caption, tilt = -2, tape = true, className }: PolaroidProps) {
  return (
    <figure
      className={cn("relative bg-card-photo p-3 pb-2 shadow-page", className)}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {tape && (
        <span
          aria-hidden="true"
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-4deg] bg-sunlight/45 mix-blend-multiply dark:mix-blend-normal dark:bg-sunlight/30"
        />
      )}
      <div className="overflow-hidden">{children}</div>
      {caption && (
        <figcaption className="pt-2 pb-1 text-center font-hand text-hand text-ink">{caption}</figcaption>
      )}
    </figure>
  )
}
