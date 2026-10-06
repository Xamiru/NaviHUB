import { useNavigate } from 'react-router-dom'
import { useCanGoBack } from '../lib/navState'

// Consistent "← Back" for sub-pages (album/artist/playlist/liked/stats):
// always history-back, so it returns wherever the user actually came from.
//
// It sticks to the top of the scroll area so long pages never force a scroll
// back up to reach it — deliberately as bare text with NO bar behind it: the
// old bg-base-900/85 backdrop-blur strip read as a foreign rectangle on the
// detail pages (reported 2026-08-22), and content scrolling under plain quiet
// text is unobtrusive in a way a blurred slab never was. The strip itself is
// click-through and only the button carries a small chip, so once the page
// scrolls the label stays legible and never covers or swallows a button below.
// A page opened with no earlier entry (the first page of a session) goes to
// `fallback` instead of doing nothing.
export default function BackButton({ label = 'Back', fallback = '/' }: { label?: string; fallback?: string }) {
  const navigate = useNavigate()
  const canGoBack = useCanGoBack()
  return (
    <div className="pointer-events-none sticky top-0 z-20 py-2">
      <button className="pointer-events-auto -mx-2 rounded bg-base-900/80 px-2 py-0.5 text-sm text-gray-500 backdrop-blur hover:text-gray-300" onClick={() => (canGoBack() ? navigate(-1) : navigate(fallback, { replace: true }))}>
        ← {label}
      </button>
    </div>
  )
}
