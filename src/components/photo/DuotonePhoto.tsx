import { cn } from "@/lib/utils"

type DuotonePhotoProps = {
  src?: string
  alt?: string
  /** Pass children instead of src to duotone any element (e.g. an inline SVG scene). */
  children?: React.ReactNode
  className?: string
}

/** Photo in the book's palette: morning tones by day, night tones in dark mode. */
export function DuotonePhoto({ src, alt = "", children, className }: DuotonePhotoProps) {
  if (src) {
    return <img src={src} alt={alt} className={cn("duotone block h-auto w-full", className)} loading="lazy" />
  }
  return <div className={cn("duotone", className)}>{children}</div>
}
