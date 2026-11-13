/**
 * Stand-in "photo" until the album sync runs: two cats at the balcony door,
 * a crow on the railing. Uses ordinary photo-like colours on purpose, so the
 * duotone treatment has something to transform.
 */
export function PlaceholderScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} role="img" aria-label="Placeholder scene: two cats watching a crow on the balcony railing">
      <defs>
        <linearGradient id="ps-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9cc4dc" />
          <stop offset="1" stopColor="#f1e3c0" />
        </linearGradient>
        <radialGradient id="ps-sun" cx="0.8" cy="0.15" r="0.6">
          <stop offset="0" stopColor="#fff4c8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff4c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ps-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8a6a4a" />
          <stop offset="1" stopColor="#5a4330" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#ps-sky)" />
      {/* far trees */}
      <path d="M0 150 C40 120 70 135 100 118 C140 100 170 130 210 112 C250 96 290 124 330 108 C360 98 385 110 400 104 L400 190 L0 190 Z" fill="#6f8a63" />
      <rect width="400" height="300" fill="url(#ps-sun)" />
      {/* railing */}
      <rect x="0" y="150" width="400" height="7" fill="#3a2f28" />
      {Array.from({ length: 21 }, (_, i) => (
        <rect key={i} x={i * 20 + 6} y="157" width="3" height="62" fill="#3a2f28" />
      ))}
      <rect x="0" y="216" width="400" height="5" fill="#3a2f28" />
      {/* crow */}
      <g transform="translate(250 112) scale(0.42)" fill="#14161c">
        <path d="M66 21 C56 19 45 26 36 35 L8 49 L13 54 L31 51 C41 58 56 58 64 50 C70 44 73 36 72 29 Z" />
        <circle cx="67" cy="25" r="10" />
        <path d="M75 21 L90 26 L75 30 Z" />
        <path d="M45 57 L43 90 M53 57 L55 90" stroke="#14161c" strokeWidth="4" />
      </g>
      {/* window frame */}
      <rect x="0" y="0" width="400" height="300" fill="none" stroke="#efe6d4" strokeWidth="18" />
      <rect x="196" y="0" width="8" height="240" fill="#efe6d4" />
      {/* floor */}
      <rect x="0" y="236" width="400" height="64" fill="url(#ps-floor)" />
      {/* Rocky, from behind, tail up */}
      <g fill="#c98a4b">
        <ellipse cx="120" cy="246" rx="34" ry="30" />
        <circle cx="120" cy="204" r="21" />
        <path d="M102 196 L100 174 L116 186 Z M138 196 L140 174 L124 186 Z" />
        <path d="M150 262 C176 256 178 226 166 210" stroke="#c98a4b" strokeWidth="9" fill="none" strokeLinecap="round" />
      </g>
      {/* Pepita, from behind, no tail */}
      <g fill="#e8e1d6">
        <ellipse cx="272" cy="248" rx="31" ry="30" />
        <circle cx="272" cy="208" r="19" />
        <path d="M256 200 L254 180 L268 191 Z M288 200 L290 180 L276 191 Z" />
        <ellipse cx="262" cy="240" rx="12" ry="9" fill="#3b3330" />
      </g>
    </svg>
  )
}
