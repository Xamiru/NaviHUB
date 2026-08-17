import { useNavigate } from 'react-router-dom'

// Consistent "← Back" for sub-pages (album/artist/playlist/liked/stats):
// always history-back, so it returns wherever the user actually came from.
//
// It sticks to the top of the scroll area so long pages never force a scroll
// back up to reach it. The wrapper's `-mx-6 px-6` cancels the page's padding
// (every call site is a `p-6` container) so the strip spans the full content
// width and page content scrolls cleanly underneath instead of showing through.
// `overlay` drops the sticky strip and returns the bare control, for callers
// that place it themselves — the full-bleed detail heroes (MediaHero), where the
// strip's `-mx-6` would hang off a container that has no padding to cancel.
// Same history-back behaviour either way; only the chrome differs.
export default function BackButton({
  label = 'Back',
  overlay = false
}: {
  label?: string
  overlay?: boolean
}) {
  const navigate = useNavigate()
  const button = (
    <button
      className={
        overlay
          ? 'text-sm text-gray-300 drop-shadow hover:text-white'
          : 'text-sm text-gray-500 hover:text-gray-300'
      }
      onClick={() => navigate(-1)}
    >
      ← {label}
    </button>
  )
  if (overlay) return button
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 bg-base-900/85 px-6 py-2 backdrop-blur">
      {button}
    </div>
  )
}
