import { HashRouter, Link, Route, Routes } from "react-router"

import { SvgDefs } from "@/components/book/SvgDefs"
import { Pepita, Rocky } from "@/components/illustrations"
import { TooltipProvider } from "@/components/ui/tooltip"
import { StyleTile } from "@/style-tile/StyleTile"

/** Temporary cover until the real one is designed. */
function Home() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col justify-center px-4 py-16 sm:px-8">
      <p className="label-caps">A data-story book · in progress</p>
      <h1 className="mt-3 text-display font-medium text-ink" style={{ fontVariationSettings: '"SOFT" 100, "WONK" 1' }}>
        Rocky &amp; Pepita
      </h1>
      <div className="mt-8 flex items-end gap-8 text-ink" aria-hidden="true">
        <Rocky className="h-32 w-auto" />
        <Pepita className="h-32 w-auto" />
      </div>
      <p className="mt-10">
        <Link to="/style-tile">See the style tile →</Link>
      </p>
    </main>
  )
}

export function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <SvgDefs />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/style-tile" element={<StyleTile />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  )
}

export default App
