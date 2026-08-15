import { useEffect, useState } from 'react'

// The franchise page's full-page background — the test run for app-wide
// per-media backgrounds. ONE image per page (curated hero or the user's own
// file), pinned in place while the page scrolls.
//
// Pinning: `background-attachment: fixed` anchors the image to the WINDOW
// viewport while it is painted only inside this element's box, so it holds
// still as <main> (the app's scroll container) scrolls, and it can never
// paint over the sidebar or Topbar — the layer is a normal absolute child of
// the page root, so it needs no knowledge of the shell's widths and is immune
// to the ui.scale zoom. (A `position: fixed` element would need the sidebar's
// rem width and would stack over it; the alternative if this ever proves
// janky on scroll is a `sticky top-0 h-0` wrapper holding a viewport-height
// absolute image.)
//
// Cross-fade: the incoming URL is preloaded off-DOM, then mounted on top of
// the previous image and faded in. A dead URL never swaps in (onload never
// fires), so the page keeps whatever it had.
export default function FranchiseBackground({ url }: { url: string | null }) {
  const [shown, setShown] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)

  useEffect(() => {
    if (url === shown) return
    if (url === null) {
      setPrevious(shown)
      setShown(null)
      return
    }
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (cancelled) return
      setShown((prev) => {
        setPrevious(prev)
        return url
      })
    }
    img.src = url
    return () => {
      cancelled = true
    }
  }, [url, shown])

  const mounted = shown ?? previous
  if (!mounted) return null
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
        shown ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {previous && previous !== shown && <FixedImage url={previous} on />}
      {shown && <FixedImage key={shown} url={shown} />}
      {/* Scrim — also viewport-fixed so its gradient does not travel with
          the page; keeps every text size readable over arbitrary art. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgb(var(--base-900) / 0.85), rgb(var(--base-900) / 0.7) 40%, rgb(var(--base-900) / 0.92))',
          backgroundAttachment: 'fixed'
        }}
      />
    </div>
  )
}

// A viewport-pinned image layer. Mounts at opacity-0 (unless `on`) and flips
// on the next frame so the opacity transition runs; the URL is already in
// the browser cache from the preload above, so it paints immediately.
function FixedImage({ url, on: initiallyOn = false }: { url: string; on?: boolean }) {
  const [on, setOn] = useState(initiallyOn)
  useEffect(() => {
    if (initiallyOn) return
    const raf = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(raf)
  }, [initiallyOn])
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ${on ? 'opacity-100' : 'opacity-0'}`}
      style={{
        backgroundImage: `url("${url.replace(/"/g, '%22')}")`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  )
}
