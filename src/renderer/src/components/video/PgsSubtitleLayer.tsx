import { useEffect, useRef, useState, type RefObject } from 'react'
import {
  decodePgsObject,
  parsePgs,
  pgsSetAt,
  type PgsDisplaySet,
  type PgsPlacement,
  type PgsTrack
} from '@shared/pgs'

// Blu-ray PGS subtitles: pictures, not text, so they are drawn on a canvas at
// the stream's presentation size (normally the video's) and scaled with
// object-contain exactly as the video is. Nothing here is clickable.
//
// The .sup is parsed once; a display set's bitmaps are decoded only when it
// comes on screen (and the next one just after), keeping a few in a small
// cache so a seek back or a replayed line does not decode again.

const CACHE_SETS = 8

type Drawn = {
  placements: { canvas: HTMLCanvasElement; x: number; y: number; crop: PgsPlacement['crop'] }[]
}

function render(set: PgsDisplaySet): Drawn {
  return {
    placements: set.placements.map((p) => {
      const canvas = document.createElement('canvas')
      canvas.width = p.object.width
      canvas.height = p.object.height
      const pixels = decodePgsObject(p.object, set.palette)
      canvas
        .getContext('2d')
        ?.putImageData(new ImageData(pixels, p.object.width, p.object.height), 0, 0)
      return { canvas, x: p.x, y: p.y, crop: p.crop }
    })
  }
}

export default function PgsSubtitleLayer({
  videoRef,
  trackUrl,
  offsetSec,
  visible,
  onFailure
}: {
  videoRef: RefObject<HTMLVideoElement>
  trackUrl: string
  offsetSec: number
  visible: boolean
  onFailure: (message: string | null) => void
}): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [track, setTrack] = useState<PgsTrack | null>(null)
  const latest = useRef({ offsetSec, onFailure, visible })
  latest.current = { offsetSec, onFailure, visible }

  useEffect(() => {
    let cancelled = false
    setTrack(null)
    latest.current.onFailure(null)
    fetch(trackUrl)
      .then(async (r) => {
        if (!r.ok) throw new Error(`subtitle track ${r.status}`)
        const parsed = parsePgs(new Uint8Array(await r.arrayBuffer()))
        if (!parsed.width || !parsed.height) throw new Error('no pictures in the track')
        if (!cancelled) setTrack(parsed)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        latest.current.onFailure(
          `These image subtitles could not be read (${err instanceof Error ? err.message : 'unknown error'}).`
        )
      })
    return () => {
      cancelled = true
    }
  }, [trackUrl])

  // One frame loop: a time compare per frame, drawing only when the set on
  // screen changes. While the subtitles are off nothing is decoded or drawn;
  // turning them back on redraws the current set.
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!track || !canvas || !ctx) return
    canvas.width = track.width
    canvas.height = track.height
    const cache = new Map<number, Drawn>()
    const drawnSet = (index: number): Drawn => {
      let drawn = cache.get(index)
      if (drawn) {
        cache.delete(index)
      } else {
        drawn = render(track.sets[index])
      }
      cache.set(index, drawn)
      while (cache.size > CACHE_SETS) cache.delete(cache.keys().next().value as number)
      return drawn
    }
    let shown = -2
    let raf = 0
    let idle = 0
    const tick = (): void => {
      raf = requestAnimationFrame(tick)
      const video = videoRef.current
      if (!video) return
      if (!latest.current.visible) {
        if (shown !== -2) {
          cancelIdleCallback(idle)
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          shown = -2
        }
        return
      }
      const index = pgsSetAt(track, video.currentTime + latest.current.offsetSec)
      if (index === shown) return
      shown = index
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      if (index < 0) return
      for (const p of drawnSet(index).placements) {
        const crop = p.crop
        if (crop) {
          ctx.drawImage(
            p.canvas,
            crop.x,
            crop.y,
            crop.width,
            crop.height,
            p.x,
            p.y,
            crop.width,
            crop.height
          )
        } else {
          ctx.drawImage(p.canvas, p.x, p.y)
        }
      }
      // Decode the next line while nothing is happening, so it appears on time.
      const next = index + 1
      if (next < track.sets.length && !cache.has(next)) {
        cancelIdleCallback(idle)
        idle = requestIdleCallback(() => {
          if (!cache.has(next)) drawnSet(next)
        })
      }
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      cancelIdleCallback(idle)
      cache.clear()
    }
  }, [track, videoRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="pgs-subtitles"
      className="pointer-events-none absolute inset-0 h-full w-full object-contain"
      style={{ visibility: visible && track ? 'visible' : 'hidden' }}
    />
  )
}
