import { useEffect, useRef, useState, type RefObject } from 'react'
import { assDialogueOnly, assStyleClass } from '@shared/subtitles'
import type { VideoSourceRef } from '@shared/types'
import { api } from '../../lib/api'
import { localCjkFamily } from '../../lib/subtitleFallbackFont'

// The styled ASS layer: libass (jassub, WebAssembly in a worker) draws the
// track exactly as authored — fonts, colours, positioned signs, karaoke — on a
// canvas over the video. It cannot carry clickable words, so the page shows it
// only while playing; pausing hides it and the clickable overlay takes over.
//
// Everything heavy is loaded here on demand: the jassub module, its worker and
// WASM, the file's attached fonts and a local Japanese fallback family. One
// instance per track and filter; it is destroyed on track or filter change and unmount, which ends
// the worker and frees its font memory.

type JassubInstance = {
  ready: Promise<void>
  timeOffset: number
  renderer: {
    getStyles(): Promise<StyleRecord[]>
    setStyle(style: StyleRecord, index: number): Promise<void>
  }
  destroy(): Promise<void>
}
type StyleRecord = {
  Name: string
  FontSize: number
  Outline: number
  Shadow: number
  MarginV: number
} & Record<string, unknown>

// Dialogue styles grow with the size setting; signs and songs keep their
// authored size, since they are positioned against the picture.
export function scaledStyle(style: StyleRecord, scale: number): StyleRecord {
  if (scale === 1 || assStyleClass(style.Name) !== 'dialogue') return style
  return {
    ...style,
    FontSize: style.FontSize * scale,
    Outline: style.Outline * scale,
    Shadow: style.Shadow * scale,
    MarginV: Math.round(style.MarginV * scale)
  }
}

export default function StyledSubtitleLayer({
  videoRef,
  sourceRef,
  trackUrl,
  dialogueOnly,
  visible,
  scale,
  offsetSec,
  onReady,
  onFailure
}: {
  videoRef: RefObject<HTMLVideoElement>
  sourceRef: VideoSourceRef
  trackUrl: string
  // Drops sign and song events, matching the clickable overlay's filter.
  dialogueOnly: boolean
  visible: boolean
  scale: number
  offsetSec: number
  // true once libass is drawing; until then (and after a failure) the page
  // keeps the clickable overlay on screen so the track never goes blank.
  onReady: (ready: boolean) => void
  onFailure: (message: string) => void
}): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const instanceRef = useRef<JassubInstance | null>(null)
  const stylesRef = useRef<StyleRecord[] | null>(null)
  const [ready, setReady] = useState(false)
  const latest = useRef({ scale, offsetSec, onReady, onFailure })
  latest.current = { scale, offsetSec, onReady, onFailure }

  // A canvas can be handed to a worker only once, so each instance gets a
  // fresh element (keyed by track URL and filter below).
  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    let cancelled = false
    let instance: JassubInstance | null = null
    setReady(false)
    ;(async () => {
      const [script, fonts, defaultFont, mod, assets] = await Promise.all([
        dialogueOnly
          ? fetch(trackUrl).then(async (r) => {
              if (!r.ok) throw new Error(`subtitle track ${r.status}`)
              return assDialogueOnly(await r.text())
            })
          : null,
        api.video.subtitleFonts(sourceRef).catch(() => [] as string[]),
        localCjkFamily(),
        import('jassub'),
        import('../../lib/jassubAssets')
      ])
      if (cancelled) return
      instance = new mod.default({
        video,
        canvas,
        ...(script != null ? { subContent: script } : { subUrl: trackUrl }),
        fonts,
        queryFonts: 'local',
        ...(defaultFont ? { defaultFont } : {}),
        workerUrl: assets.workerUrl,
        wasmUrl: assets.wasmUrl,
        modernWasmUrl: assets.modernWasmUrl,
        // Caps render cost on large or high-DPI screens; 1080 lines is plenty
        // for subtitle sharpness.
        maxRenderHeight: 1080,
        timeOffset: latest.current.offsetSec
      }) as unknown as JassubInstance
      await instance.ready
      if (cancelled) return
      instanceRef.current = instance
      stylesRef.current = await instance.renderer.getStyles()
      await applyScale(instance, stylesRef.current, latest.current.scale)
      if (!cancelled) {
        setReady(true)
        latest.current.onReady(true)
      }
    })().catch((err: unknown) => {
      if (cancelled) return
      latest.current.onFailure(
        `Styled subtitles could not start (${err instanceof Error ? err.message : 'unknown error'}); showing plain subtitles.`
      )
    })
    return () => {
      cancelled = true
      latest.current.onReady(false)
      instanceRef.current = null
      stylesRef.current = null
      void instance?.destroy().catch(() => undefined)
    }
  }, [videoRef, sourceRef, trackUrl, dialogueOnly])

  useEffect(() => {
    const instance = instanceRef.current
    if (instance && stylesRef.current) void applyScale(instance, stylesRef.current, scale)
  }, [scale, ready])

  useEffect(() => {
    if (instanceRef.current) instanceRef.current.timeOffset = offsetSec
  }, [offsetSec, ready])

  return (
    <canvas
      key={`${trackUrl}|${dialogueOnly}`}
      ref={canvasRef}
      aria-hidden="true"
      data-testid="styled-subtitles"
      className="pointer-events-none absolute"
      style={{ visibility: visible && ready ? 'visible' : 'hidden' }}
    />
  )
}

async function applyScale(instance: JassubInstance, originals: StyleRecord[], scale: number): Promise<void> {
  for (let i = 0; i < originals.length; i++) {
    await instance.renderer.setStyle(scaledStyle(originals[i], scale), i)
  }
}
