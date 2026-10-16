import type { RefObject } from 'react'
import type { VideoSubtitleTrack } from '@shared/types'

// Panel for the two subtitle slots. The split is the point: ONE track is the
// clickable/mineable one, the other is a crutch you can read past. The owner
// (VideoControls) drives open/close through usePopover; this is the panel.

function TrackRow({
  track,
  selected,
  onPick
}: {
  track: VideoSubtitleTrack | null
  selected: boolean
  onPick: () => void
}): JSX.Element {
  const disabled = track != null && !track.textual
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm disabled:opacity-40 ${
        selected ? 'bg-accent/10 text-accent' : 'text-gray-300 hover:bg-base-700'
      }`}
      disabled={disabled}
      aria-pressed={selected}
      title={
        disabled
          ? "Image-based subtitles (PGS/VobSub) can't be turned into text, so there is nothing to click."
          : undefined
      }
      onClick={onPick}
    >
      <span className="min-w-0 flex-1 truncate">{track ? track.label : 'Off'}</span>
      {track?.signs && <span className="chip shrink-0 text-xs">signs</span>}
      {track?.forced && <span className="chip shrink-0 text-xs">forced</span>}
      {track && !track.textual && <span className="chip shrink-0 text-xs">image</span>}
      {track && track.textual && !track.url && (
        <span className="chip shrink-0 text-xs" title="Pulled out of the video file when picked">
          embedded
        </span>
      )}
      {selected && <span className="shrink-0 text-xs">✓</span>}
    </button>
  )
}

export default function SubtitleTrackMenu({
  id,
  panelRef,
  tracks,
  primaryId,
  secondaryId,
  dialogueOnly,
  subDelaySec,
  extracting,
  trackError,
  onPick,
  onDialogueOnly,
  onSubDelay
}: {
  id: string
  panelRef: RefObject<HTMLDivElement>
  tracks: VideoSubtitleTrack[]
  primaryId: string | null
  secondaryId: string | null
  dialogueOnly: boolean
  subDelaySec: number
  extracting: boolean
  trackError: string | null
  onPick: (slot: 'primary' | 'secondary', id: string | null) => void
  onDialogueOnly: (on: boolean) => void
  onSubDelay: (delta: number) => void
}): JSX.Element {
  return (
    <div
      id={id}
      ref={panelRef}
      role="region"
      aria-label="Subtitle tracks"
      className="theme-dark absolute bottom-full right-0 z-40 mb-2 max-h-[60vh] w-72 overflow-y-auto rounded border border-base-700 bg-base-900/95 p-2 backdrop-blur"
    >
      {tracks.length === 0 ? (
        <p className="px-2 py-3 text-sm text-gray-400">
          No subtitles found. Put a .srt or .ass file next to the video (or in a Subs folder), or
          install ffmpeg to use tracks inside the file.
        </p>
      ) : (
        <>
          <p className="label mb-1 px-2">Clickable track</p>
          <TrackRow track={null} selected={primaryId === null} onPick={() => onPick('primary', null)} />
          {tracks.map((t) => (
            <TrackRow
              key={t.id}
              track={t}
              selected={primaryId === t.id}
              onPick={() => onPick('primary', t.id)}
            />
          ))}
          <p className="label mb-1 mt-3 px-2">Second track</p>
          <TrackRow
            track={null}
            selected={secondaryId === null}
            onPick={() => onPick('secondary', null)}
          />
          {tracks.map((t) => (
            <TrackRow
              key={t.id}
              track={t}
              selected={secondaryId === t.id}
              onPick={() => onPick('secondary', t.id)}
            />
          ))}
        </>
      )}

      {extracting && (
        <p className="px-2 pt-2 text-xs text-gray-400" role="status">
          Extracting the track from the video file…
        </p>
      )}
      {trackError && (
        <p className="px-2 pt-2 text-xs text-signal-caution" role="status">
          {trackError}
        </p>
      )}

      <div className="mt-3 space-y-2 border-t border-base-700 pt-2">
        <label className="flex items-center gap-2 px-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={dialogueOnly}
            onChange={(e) => onDialogueOnly(e.target.checked)}
          />
          Hide signs and songs
        </label>
        <div className="flex items-center gap-2 px-2 text-sm text-gray-300">
          <span className="flex-1">Timing</span>
          <button
            type="button"
            className="btn-ghost px-2 py-0.5 text-xs"
            aria-label="Subtitles half a second earlier"
            onClick={() => onSubDelay(-0.5)}
          >
            −0.5s
          </button>
          <span className="w-12 text-center text-xs tabular-nums text-gray-400" aria-live="polite">
            {subDelaySec > 0 ? '+' : ''}
            {subDelaySec.toFixed(1)}s
          </span>
          <button
            type="button"
            className="btn-ghost px-2 py-0.5 text-xs"
            aria-label="Subtitles half a second later"
            onClick={() => onSubDelay(0.5)}
          >
            +0.5s
          </button>
        </div>
        <p className="px-2 text-xs leading-snug text-gray-500">
          Audio plays the file&apos;s default track. Open the file externally to choose another one.
        </p>
      </div>
    </div>
  )
}
