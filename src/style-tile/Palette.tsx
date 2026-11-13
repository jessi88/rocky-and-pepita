import { useEffect, useState } from "react"

import { contrastRatio } from "@/lib/contrast"

type Role = "surface" | "text" | "mark" | "fill"

const SWATCHES: { token: string; name: string; use: string; role: Role }[] = [
  { token: "--paper", name: "Cream paper", use: "Page background", role: "surface" },
  { token: "--paper-raised", name: "Raised page", use: "Reading page, cards", role: "surface" },
  { token: "--paper-deep", name: "Desk", use: "Wells, hover", role: "surface" },
  { token: "--ink", name: "Ink", use: "Body text", role: "text" },
  { token: "--ink-soft", name: "Soft ink", use: "Captions, axes", role: "text" },
  { token: "--acorn", name: "Acorn brown", use: "Links, buttons", role: "text" },
  { token: "--sunlight-ink", name: "Sunlight ink", use: "Drop cap, note numbers", role: "text" },
  { token: "--glass-ink", name: "Glass ink", use: "Blue text accents", role: "text" },
  { token: "--crow", name: "Crow blue-black", use: "The crow", role: "text" },
  { token: "--mark-highlight", name: "Highlight mark", use: "The one emphasised mark", role: "mark" },
  { token: "--dusk", name: "Dusk rose", use: "Dusk shading, 2nd series", role: "mark" },
  { token: "--mark-muted", name: "Muted mark", use: "All other marks (quiet on purpose)", role: "fill" },
  { token: "--sunlight", name: "Sunlight", use: "Fills, tape, progress", role: "fill" },
  { token: "--glass", name: "Glass blue", use: "Window glass fills", role: "fill" },
]

const TARGET: Record<Role, number | null> = { surface: null, text: 4.5, mark: 3, fill: null }

/** Re-reads token values whenever the theme class on <html> changes. */
function useTokens(tokens: string[]) {
  const read = () => {
    const style = getComputedStyle(document.documentElement)
    return Object.fromEntries(tokens.map((t) => [t, style.getPropertyValue(t).trim()]))
  }
  const [values, setValues] = useState<Record<string, string>>(read)

  useEffect(() => {
    const observer = new MutationObserver(() => setValues(read()))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return values
}

export function Palette() {
  const values = useTokens(["--paper", ...SWATCHES.map((s) => s.token)])
  const paper = values["--paper"]

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SWATCHES.map(({ token, name, use, role }) => {
        const hex = values[token]
        const ratio = hex && paper ? contrastRatio(hex, paper) : 0
        const target = TARGET[role]
        const pass = target === null || ratio >= target
        return (
          <li key={token} className="flex items-stretch gap-3 rounded-lg bg-paper-raised p-2 shadow-page">
            <span
              className="w-16 shrink-0 rounded-md border border-rule"
              style={{ background: `var(${token})` }}
              aria-hidden="true"
            />
            <span className="flex min-w-0 flex-col py-1 text-small">
              <strong className="text-ink">{name}</strong>
              <span className="text-ink-soft">{use}</span>
              <span className="mt-1 font-mono text-[0.8125rem] text-ink-soft">
                {hex} · {role === "surface" ? "surface" : `${ratio.toFixed(1)}:1`}
                {target !== null && (
                  <span className={pass ? "text-glass-ink" : "font-bold text-destructive"}>
                    {" "}
                    {pass ? `✓ ≥ ${target}` : `✗ < ${target}`}
                  </span>
                )}
                {role === "fill" && <span> · fill only</span>}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
