import { useEffect, useState } from 'react'

// Full-page artwork layer for the franchise pages — the test run for
// app-wide per-media backgrounds. Deliberately page-local (absolute inside
// the page's relative root, NOT fixed, NOT in the app shell): `main` is the
// scroll container and the Topbar's backdrop-blur creates a containing block
// that makes `fixed` fragile, so the art simply scrolls with the page.
//
// Cross-fade: the incoming URL is preloaded off-DOM, then mounted on top of
// the previous image and faded in; the whole layer fades out when url goes
// null. A dead URL never swaps in (onload never fires), so the page just
// keeps whatever background it had.
export default function FranchiseBackground({ url }: { url: string | null }) {
  const [shown, setShown] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)

  useEffect(() => {
    if (url === shown) return
    if (url === null) {
      // Keep the image mounted; the container's opacity transition fades it
      // out. `previous` has to become the image that is actually ON SCREEN —
      // it is what `mounted` falls back to below. Left pointing at the one
      // before it, the layer fades out the WRONG artwork, and on the very
      // first hover-then-leave (previous still null) the background vanishes
      // with no transition at all.
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
      {previous && previous !== shown && (
        <img src={previous} alt="" className="absolute inset-0 h-full w-full scale-105 object-cover" />
      )}
      {shown && <FadeInImage key={shown} url={shown} />}
      {/* Scrim: keeps every text size readable over arbitrary art. */}
      <div className="absolute inset-0 bg-gradient-to-b from-base-900/85 via-base-900/65 to-base-900/95" />
    </div>
  )
}

// Mount at opacity-0, flip to 100 on the next frame so the CSS transition
// runs. The URL is already in the browser cache (preloaded above), so the
// img paints immediately.
function FadeInImage({ url }: { url: string }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOn(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <img
      src={url}
      alt=""
      className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-700 ${
        on ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
