import { useEffect } from 'react'
import { useDialog } from '../lib/hooks'

// Fullscreen image viewer for the wallpaper/fan-art grids: object-contain over
// a near-black backdrop, ←/→ steps through the section's images (wrapping),
// Escape / the mouse Back button / a click beside the image / × closes. Deliberately chrome-light — no zoom; the
// manga reader remains the heavy-duty viewer.
export default function Lightbox({
  images,
  index,
  onIndexChange,
  onClose,
  onContextMenu
}: {
  images: { url: string; alt?: string }[]
  index: number
  onIndexChange: (i: number) => void
  onClose: () => void
  // Right-click on the image itself; the OWNER draws the menu (the grid section
  // knows which row this index is and what the actions do).
  onContextMenu?: (index: number, e: React.MouseEvent) => void
}): React.JSX.Element | null {
  const panelRef = useDialog(onClose)
  const count = images.length

  useEffect(() => {
    if (count < 2) return
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'ArrowLeft') onIndexChange((index - 1 + count) % count)
      else if (e.key === 'ArrowRight') onIndexChange((index + 1) % count)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, count, onIndexChange])

  // Mouse Back button (button 3). Captured on window so nothing underneath
  // treats it as history navigation while the viewer is open.
  useEffect(() => {
    function onDown(e: MouseEvent): void {
      if (e.button === 3) e.preventDefault()
    }
    function onUp(e: MouseEvent): void {
      if (e.button !== 3) return
      e.preventDefault()
      e.stopPropagation()
      onClose()
    }
    window.addEventListener('mousedown', onDown, true)
    window.addEventListener('mouseup', onUp, true)
    return () => {
      window.removeEventListener('mousedown', onDown, true)
      window.removeEventListener('mouseup', onUp, true)
    }
  }, [onClose])

  const img = images[index]
  if (!img) return null

  return (
    <div className="theme-dark fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* The panel fills the backdrop, so the click-beside-the-image close lives here. */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={img.alt ?? 'Image viewer'}
        tabIndex={-1}
        className="relative w-full h-full flex items-center justify-center p-4 outline-none"
        onMouseDown={(e) => {
          if (e.button === 0 && e.target === e.currentTarget) onClose()
        }}
      >
        <img
          src={img.url}
          alt={img.alt ?? ''}
          draggable={false}
          className="max-w-full max-h-full object-contain select-none"
          onContextMenu={(e) => {
            if (!onContextMenu) return
            e.preventDefault()
            onContextMenu(index, e)
          }}
        />

        <button
          className="absolute top-3 right-4 text-3xl leading-none text-gray-400 hover:text-gray-100"
          onClick={onClose}
          aria-label="Close viewer"
          title="Close (Esc)"
        >
          ✕
        </button>

        {count > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-6 text-4xl text-gray-400 hover:text-gray-100"
              onClick={() => onIndexChange((index - 1 + count) % count)}
              aria-label="Previous image"
              title="Previous (←)"
            >
              ‹
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-6 text-4xl text-gray-400 hover:text-gray-100"
              onClick={() => onIndexChange((index + 1) % count)}
              aria-label="Next image"
              title="Next (→)"
            >
              ›
            </button>
            <div className="media-contrast absolute bottom-3 left-1/2 -translate-x-1/2 rounded bg-black/70 px-2 py-0.5 text-xs text-gray-300">
              {index + 1} / {count}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
