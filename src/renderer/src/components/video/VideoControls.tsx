import { useState } from 'react'
import { formatTime, type SubCue } from '@shared/subtitles'
import type { VideoSubtitleTrack } from '@shared/types'
import { PLAYBACK_RATES } from '../../lib/videoPrefs'
import SubtitleTrackMenu from './SubtitleTrackMenu'
import VideoTimeline from './VideoTimeline'

// Toggle in the reader-bar style (MangaReaderPage's BarToggle). Text labels,
// not glyphs — the app's rule is that only transport controls get symbols.
function BarToggle({
  label,
  active,
  title,
  onClick
}: {
  label: string
  active: boolean
  title: string
  onClick: () => void
}): JSX.Element {
  return (
    <button
      className={`rounded px-2 py-1 text-xs ${
        active ? 'bg-accent/20 text-accent' : 'text-gray-500 hover:text-gray-300'
      }`}
      title={title}
      aria-label={title}
      aria-pressed={active}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export interface VideoControlsProps {
  playing: boolean
  time: number
  duration: number
  buffered: { start: number; end: number }[]
  cues: SubCue[]
  volume: number
  muted: boolean
  rate: number
  tracks: VideoSubtitleTrack[]
  primaryId: string | null
  secondaryId: string | null
  subsOn: boolean
  dualSubs: boolean
  dialogueOnly: boolean
  subOffsetSec: number
  transcriptOpen: boolean
  miningOpen: boolean
  hasPrev: boolean
  hasNext: boolean
  visible: boolean
  onToggle: () => void
  onSeek: (t: number) => void
  onPrevEpisode: () => void
  onNextEpisode: () => void
  onVolume: (v: number) => void
  onMute: () => void
  onRate: (r: number) => void
  onPickTrack: (slot: 'primary' | 'secondary', id: string | null) => void
  onToggleSubs: () => void
  onToggleDual: () => void
  onDialogueOnly: (on: boolean) => void
  onSubOffset: (delta: number) => void
  onTranscript: () => void
  onMine: () => void
  onScreenshot: () => void
  onFullscreen: () => void
  onMenuOpenChange: (open: boolean) => void
}

export default function VideoControls(props: VideoControlsProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const setMenu = (open: boolean): void => {
    setMenuOpen(open)
    props.onMenuOpenChange(open)
  }

  return (
    <div
      className={`absolute inset-x-0 bottom-0 z-20 bg-base-900/90 px-4 py-2 backdrop-blur transition-opacity duration-300 ${
        props.visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-center gap-3">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
          title="Previous episode"
          aria-label="Previous episode"
          disabled={!props.hasPrev}
          onClick={props.onPrevEpisode}
        >
          ⏮
        </button>
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-sm text-accent hover:bg-accent/30"
          title={props.playing ? 'Pause' : 'Play'}
          aria-label={props.playing ? 'Pause' : 'Play'}
          onClick={props.onToggle}
        >
          {props.playing ? '❚❚' : '▶'}
        </button>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
          title="Next episode"
          aria-label="Next episode"
          disabled={!props.hasNext}
          onClick={props.onNextEpisode}
        >
          ⏭
        </button>

        <span className="shrink-0 text-xs tabular-nums text-gray-400">
          {formatTime(props.time)} / {formatTime(props.duration)}
        </span>

        <VideoTimeline
          time={props.time}
          duration={props.duration}
          buffered={props.buffered}
          cues={props.cues}
          onSeek={props.onSeek}
        />

        <select
          className="input h-7 w-[4.5rem] shrink-0 px-1 py-0 text-xs"
          aria-label="Playback speed"
          title="Playback speed ([ and ])"
          value={props.rate}
          onChange={(e) => props.onRate(Number(e.target.value))}
        >
          {PLAYBACK_RATES.map((r) => (
            <option key={r} value={r}>
              {r}×
            </option>
          ))}
        </select>

        <BarToggle
          label="Vol"
          active={!props.muted && props.volume > 0}
          title={props.muted ? 'Unmute (Shift+M)' : 'Mute (Shift+M)'}
          onClick={props.onMute}
        />
        <input
          type="range"
          className="w-20 shrink-0 cursor-pointer accent-accent"
          aria-label="Volume"
          min={0}
          max={1}
          step={0.01}
          value={props.muted ? 0 : props.volume}
          onChange={(e) => props.onVolume(Number(e.target.value))}
        />

        <div className="relative flex shrink-0 items-center gap-1">
          <BarToggle
            label="CC"
            active={props.subsOn && props.primaryId != null}
            title="Subtitles on/off (S)"
            onClick={props.onToggleSubs}
          />
          <BarToggle
            label="2nd"
            active={props.dualSubs && props.secondaryId != null}
            title="Second subtitle track (B)"
            onClick={props.onToggleDual}
          />
          <button
            className="rounded px-2 py-1 text-xs text-gray-500 hover:text-gray-300"
            title="Choose subtitle tracks"
            aria-label="Choose subtitle tracks"
            onClick={() => setMenu(!menuOpen)}
          >
            Tracks
          </button>
          {menuOpen && (
            <SubtitleTrackMenu
              tracks={props.tracks}
              primaryId={props.primaryId}
              secondaryId={props.secondaryId}
              dialogueOnly={props.dialogueOnly}
              subOffsetSec={props.subOffsetSec}
              onPick={(slot, id) => props.onPickTrack(slot, id)}
              onDialogueOnly={props.onDialogueOnly}
              onSubOffset={props.onSubOffset}
              onClose={() => setMenu(false)}
            />
          )}
          <BarToggle
            label="Script"
            active={props.transcriptOpen}
            title="Transcript (T)"
            onClick={props.onTranscript}
          />
          <BarToggle
            label="Mine"
            active={props.miningOpen}
            title="Mining panel (M)"
            onClick={props.onMine}
          />
          <BarToggle
            label="Capture"
            active={false}
            title="Capture this frame and line (C)"
            onClick={props.onScreenshot}
          />
          <button
            className="rounded px-2 py-1 text-xs text-gray-500 hover:text-gray-300"
            title="Fullscreen (F)"
            aria-label="Fullscreen"
            onClick={props.onFullscreen}
          >
            ⛶
          </button>
        </div>
      </div>
    </div>
  )
}
