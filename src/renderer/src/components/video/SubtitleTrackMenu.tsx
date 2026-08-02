import { useEffect } from 'react'
import type { VideoSubtitleTrack } from '@shared/types'

// Popover for the two subtitle slots. The split is the point: ONE track is the
// clickable/mineable one, the other is a crutch you can read past. Fixed
// click-away backdrop plus its own Escape case, the app's popover idiom.

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
      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm disabled:opacity-40 ${
        selected ? 'bg-accent/10 text-accent' : 'text-gray-300 hover:bg-base-700'
      }`}
      disabled={disabled}
      title={
        disabled
          ? "Image-based subtitles (PGS/VobSub) can't be turned into text — nothing to click."
          : undefined
      }
      onClick={onPick}
    >
      <span className="min-w-0 flex-1 truncate">{track ? track.label : 'Off'}</span>
      {track?.signs && <span className="chip shrink-0 text-[10px]">signs</span>}
      {track?.forced && <span className="chip shrink-0 text-[10px]">forced</span>}
      {track && !track.textual && <span className="chip shrink-0 text-[10px]">image</span>}
      {selected && <span className="shrink-0 text-xs">✓</span>}
    </button>
  )
}

export default function SubtitleTrackMenu({
  tracks,
  primaryId,
  secondaryId,
  dialogueOnly,
  subOffsetSec,
  onPick,
  onDialogueOnly,
  onSubOffset,
  onClose
}: {
  tracks: VideoSubtitleTrack[]
  primaryId: string | null
  secondaryId: string | null
  dialogueOnly: boolean
  subOffsetSec: number
  onPick: (slot: 'primary' | 'secondary', id: string | null) => void
  onDialogueOnly: (on: boolean) => void
  onSubOffset: (delta: number) => void
  onClose: () => void
}): JSX.Element {
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
    }
    document.addEventListener('keydown', onKey, true)
    return () => document.removeEventListener('keydown', onKey, true)
  }, [onClose])

  return (
    <>
      <div className="fixed inset-0 z-30" onMouseDown={onClose} />
      <div
        className="absolute bottom-full right-0 z-40 mb-2 max-h-[60vh] w-72 overflow-y-auto rounded border border-base-700 bg-base-900/95 p-2 backdrop-blur"
        role="dialog"
        aria-label="Subtitle tracks"
      >
        {tracks.length === 0 ? (
          <p className="px-2 py-3 text-sm text-gray-500">
            No subtitles found. Put a .srt/.ass file next to the video (or in a Subs folder), or
            install ffmpeg to pull tracks out of the container.
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
            <p className="label mb-1 mt-3 px-2">Second track (crutch)</p>
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

        <div className="mt-3 space-y-2 border-t border-base-700 pt-2">
          <label className="flex items-center gap-2 px-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={dialogueOnly}
              onChange={(e) => onDialogueOnly(e.target.checked)}
            />
            Hide signs &amp; songs
          </label>
          <div className="flex items-center gap-2 px-2 text-sm text-gray-300">
            <span className="flex-1">Timing</span>
            <button className="btn-ghost px-2 py-0.5 text-xs" onClick={() => onSubOffset(-0.5)}>
              −0.5s
            </button>
            <span className="w-12 text-center text-xs tabular-nums text-gray-400">
              {subOffsetSec > 0 ? '+' : ''}
              {subOffsetSec.toFixed(1)}s
            </span>
            <button className="btn-ghost px-2 py-0.5 text-xs" onClick={() => onSubOffset(0.5)}>
              +0.5s
            </button>
          </div>
          {/* An honest note beats a control that can't work: Chromium does not
              implement HTMLMediaElement.audioTracks, so there is no way to
              switch audio streams on a file the browser is decoding itself. */}
          <p className="px-2 text-xs leading-snug text-gray-500">
            Audio plays the file&apos;s default track — switching to another one needs a converted
            copy.
          </p>
        </div>
      </div>
    </>
  )
}
