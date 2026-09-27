import { useNavigate } from 'react-router-dom'

// Consistent "← Back" for sub-pages (album/artist/playlist/liked/stats):
// always history-back, so it returns wherever the user actually came from.
//
// It sticks to the top of the scroll area so long pages never force a scroll
// back up to reach it — deliberately as bare text with NO bar behind it: the
// old bg-base-900/85 backdrop-blur strip read as a foreign rectangle on the
// detail pages (reported 2026-08-22), and content scrolling under plain quiet
// text is unobtrusive in a way a blurred slab never was.
export default function BackButton({ label = 'Back' }: { label?: string }) {
  const navigate = useNavigate()
  return (
    <div className="sticky top-0 z-20 py-2">
      <button className="text-sm text-gray-500 hover:text-gray-300" onClick={() => navigate(-1)}>
        ← {label}
      </button>
    </div>
  )
}
