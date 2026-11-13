/**
 * Global SVG filters, mounted once. Referenced from CSS (.duotone, .ink-wobble)
 * and from SVG (filter="url(#ink-wobble)").
 *
 * Duotone = tritone ramp shadow → mid → light. Values are the token colours from
 * styles/tokens.css (--duo-*) divided by 255; keep both in sync.
 */
export function SvgDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        {/* Morning: ink → acorn-gold → cream paper */}
        <filter id="duotone-morning" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.165 0.659 0.965" />
            <feFuncG type="table" tableValues="0.133 0.455 0.933" />
            <feFuncB type="table" tableValues="0.110 0.173 0.863" />
          </feComponentTransfer>
        </filter>

        {/* Night: deep night → glass-blue → moonlit paper */}
        <filter id="duotone-night" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.082 0.247 0.886" />
            <feFuncG type="table" tableValues="0.078 0.373 0.839" />
            <feFuncB type="table" tableValues="0.102 0.447 0.749" />
          </feComponentTransfer>
        </filter>

        {/* Hand-inked line: a tiny displacement so strokes aren't machine-perfect. */}
        <filter id="ink-wobble" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}
