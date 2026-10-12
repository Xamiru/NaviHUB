import { useId, useState } from 'react'
import { formatTime, type SubCue } from '@shared/subtitles'
import type { VideoSubtitleTrack } from '@shared/types'
import { usePopover } from '../../lib/hooks'
import { PLAYBACK_RATES } from '../../lib/videoPrefs'
import { Field } from '../Field'
import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from '../PlayerIcons'
import SubtitleTrackMenu from './SubtitleTrackMenu'
import VideoTimeline from './VideoTimeline'

// Toggle in the reader-bar style. Text labels, not glyphs: only transport
// controls get symbols.
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
      type="button"
      className={`rounded px-2 py-1 text-xs ${
        active ? 'bg-accent/20 text-accent' : 'text-gray-400 hover:text-gray-200'
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

function BarButton({
  label,
  title,
  onClick
}: {
  label: string
  title: string
  onClick: () => void
}): JSX.Element {
  return (
    <button
      type="button"
      className="rounded px-2 py-1 text-xs text-gray-400 hover:text-gray-200"
      title={title}
      aria-label={title}
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
  extracting: boolean
  trackError: string | null
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
  onCapture: () => void
  onFullscreen: () => void
  onExternal: () => void
  onHelp: () => void
  onMenuOpenChange: (open: boolean) => void
}

export default function VideoControls(props: VideoControlsProps): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const setMenu = (open: boolean): void => {
    setMenuOpen(open)
    props.onMenuOpenChange(open)
  }
  const { panelRef, triggerRef } = usePopover(menuOpen, () => setMenu(false), {
    initialFocus: 'first'
  })
  const hasSubs = props.tracks.length > 0

  return (
    <div
      className={`media-contrast absolute inset-x-0 bottom-0 z-20 bg-base-900/90 px-4 py-2 backdrop-blur transition-opacity duration-300 focus-within:opacity-100 ${
        props.visible ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {(props.hasPrev || props.hasNext) && (
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
            title="Previous file (P)"
            aria-label="Previous file"
            disabled={!props.hasPrev}
            onClick={props.onPrevEpisode}
          >
            <PrevIcon />
          </button>
        )}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-base text-accent hover:bg-accent/30"
          title={props.playing ? 'Pause (Space)' : 'Play (Space)'}
          aria-label={props.playing ? 'Pause' : 'Play'}
          onClick={props.onToggle}
        >
          {props.playing ? <PauseIcon /> : <PlayIcon />}
        </button>
        {(props.hasPrev || props.hasNext) && (
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
            title="Next file (N)"
            aria-label="Next file"
            disabled={!props.hasNext}
            onClick={props.onNextEpisode}
          >
            <NextIcon />
          </button>
        )}

        <span className="shrink-0 text-xs tabular-nums text-gray-300">
          {formatTime(props.time)} / {formatTime(props.duration)}
        </span>

        <VideoTimeline
          time={props.time}
          duration={props.duration}
          buffered={props.buffered}
          cues={props.cues}
          onSeek={props.onSeek}
        />

        <Field label="Playback speed" hiddenLabel className="contents">
          <select
            className="input h-7 w-[4.5rem] shrink-0 px-1 py-0 text-xs"
            title="Playback speed ([ and ])"
            value={props.rate}
            onChange={(e) => props.onRate(Number(e.target.value))}
          >
            {PLAYBACK_RATES.map((r) => (
              <option key={r} value={r}>
                {r}x
              </option>
            ))}
          </select>
        </Field>

        <BarToggle
          label="Vol"
          active={!props.muted && props.volume > 0}
          title={props.muted ? 'Unmute (Shift+M)' : 'Mute (Shift+M)'}
          onClick={props.onMute}
        />
        <Field label="Volume" hiddenLabel className="contents">
          <input
            type="range"
            className="w-20 shrink-0 cursor-pointer accent-accent"
            min={0}
            max={1}
            step={0.01}
            value={props.muted ? 0 : props.volume}
            onChange={(e) => props.onVolume(Number(e.target.value))}
          />
        </Field>

        <div className="relative flex shrink-0 items-center gap-1">
          {hasSubs && (
            <>
              <BarToggle
                label="CC"
                active={props.subsOn && props.primaryId != null}
                title="Subtitles on or off (S)"
                onClick={props.onToggleSubs}
              />
              <BarToggle
                label="2nd"
                active={props.dualSubs && props.secondaryId != null}
                title="Second subtitle track (B)"
                onClick={props.onToggleDual}
              />
            </>
          )}
          <button
            ref={triggerRef}
            type="button"
            className="rounded px-2 py-1 text-xs text-gray-400 hover:text-gray-200"
            title="Choose subtitle tracks"
            aria-expanded={menuOpen}
            aria-controls={menuOpen ? menuId : undefined}
            onClick={() => setMenu(!menuOpen)}
          >
            Tracks
          </button>
          {menuOpen && (
            <SubtitleTrackMenu
              id={menuId}
              panelRef={panelRef}
              tracks={props.tracks}
              primaryId={props.primaryId}
              secondaryId={props.secondaryId}
              dialogueOnly={props.dialogueOnly}
              subOffsetSec={props.subOffsetSec}
              extracting={props.extracting}
              trackError={props.trackError}
              onPick={props.onPickTrack}
              onDialogueOnly={props.onDialogueOnly}
              onSubOffset={props.onSubOffset}
            />
          )}
          {hasSubs && (
            <>
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
              <BarButton label="Capture" title="Capture this frame and line (C)" onClick={props.onCapture} />
            </>
          )}
          <BarButton label="Full" title="Fullscreen (F)" onClick={props.onFullscreen} />
          <BarButton label="External" title="Open in the system player (O)" onClick={props.onExternal} />
          <BarButton label="Keys" title="Keyboard shortcuts (?)" onClick={props.onHelp} />
        </div>
      </div>
    </div>
  )
}
