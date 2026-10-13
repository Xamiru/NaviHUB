import type { RefObject } from 'react'
import { Field } from '../Field'
import {
  DEFAULT_SUBTITLE_LOOK,
  SUBTITLE_LIMITS,
  type SubBackground,
  type SubColor,
  type SubFont,
  type SubtitleLook
} from '../../lib/videoPrefs'
import { cueLook } from './SubtitleOverlay'

const FONT_LABELS: Record<SubFont, string> = {
  app: 'App font',
  gothic: 'Gothic',
  mincho: 'Mincho',
  rounded: 'Rounded'
}
const COLOR_LABELS: Record<SubColor, string> = {
  white: 'White',
  yellow: 'Yellow',
  cyan: 'Light blue'
}
const BACKGROUND_LABELS: Record<SubBackground, string> = {
  outline: 'Outline',
  box: 'Box'
}

const percent = (n: number): string => `${Math.round(n * 100)}%`

// Anchored panel for how subtitles look, opened from the controls' Style
// button (VideoControls owns the usePopover state; this is the panel). Every
// change applies live and is saved with the player prefs.
export default function SubtitleStylePanel({
  id,
  panelRef,
  look,
  styledSubs,
  styledStatus,
  onChange,
  onStyledSubs
}: {
  id: string
  panelRef: RefObject<HTMLDivElement>
  look: SubtitleLook
  styledSubs: boolean
  styledStatus: string | null
  onChange: (patch: Partial<SubtitleLook>) => void
  onStyledSubs: (on: boolean) => void
}): JSX.Element {
  const sample = cueLook(look, 'primary')
  const sampleSecondary = cueLook(look, 'secondary')
  const range = (key: keyof typeof SUBTITLE_LIMITS, label: string, value: string) => (
    <Field label={`${label}: ${value}`} className="px-2">
      <input
        type="range"
        className="w-full cursor-pointer accent-accent"
        min={SUBTITLE_LIMITS[key].min}
        max={SUBTITLE_LIMITS[key].max}
        step={SUBTITLE_LIMITS[key].step}
        value={look[key]}
        onChange={(e) => onChange({ [key]: Number(e.target.value) })}
      />
    </Field>
  )

  return (
    <div
      id={id}
      ref={panelRef}
      role="region"
      aria-label="Subtitle style"
      className="theme-dark absolute bottom-full right-0 z-40 mb-2 max-h-[70vh] w-80 space-y-3 overflow-y-auto rounded border border-base-700 bg-base-900/95 p-3 backdrop-blur"
    >
      <div className="sub-sample rounded px-2 py-3 text-center">
        <p className={`mx-auto inline-block leading-snug ${sample.className}`} style={sample.style}>
          字幕のサンプル
        </p>
        <p
          className={`mx-auto mt-1 block leading-snug ${sampleSecondary.className}`}
          style={sampleSecondary.style}
        >
          Subtitle sample
        </p>
      </div>

      {range('scale', 'Size', percent(look.scale))}
      {range('position', 'Height above the bottom', `${look.position}%`)}

      <div className="grid grid-cols-2 gap-2 px-2">
        <Field label="Font">
          <select
            className="input w-full py-1 text-sm"
            value={look.font}
            onChange={(e) => onChange({ font: e.target.value as SubFont })}
          >
            {(Object.keys(FONT_LABELS) as SubFont[]).map((f) => (
              <option key={f} value={f}>
                {FONT_LABELS[f]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Colour">
          <select
            className="input w-full py-1 text-sm"
            value={look.color}
            onChange={(e) => onChange({ color: e.target.value as SubColor })}
          >
            {(Object.keys(COLOR_LABELS) as SubColor[]).map((c) => (
              <option key={c} value={c}>
                {COLOR_LABELS[c]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Background">
          <select
            className="input w-full py-1 text-sm"
            value={look.background}
            onChange={(e) => onChange({ background: e.target.value as SubBackground })}
          >
            {(Object.keys(BACKGROUND_LABELS) as SubBackground[]).map((b) => (
              <option key={b} value={b}>
                {BACKGROUND_LABELS[b]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {look.background === 'box' && range('boxOpacity', 'Box opacity', percent(look.boxOpacity))}
      {range('secondaryScale', 'Second track size', percent(look.secondaryScale))}

      <div className="space-y-1 border-t border-base-700 px-2 pt-3">
        <label className="flex items-center gap-2 text-sm text-gray-200">
          <input type="checkbox" checked={styledSubs} onChange={(e) => onStyledSubs(e.target.checked)} />
          Styled ASS subtitles
        </label>
        <p className="text-xs leading-snug text-gray-400">
          ASS tracks keep their authored fonts, colours and signs while playing, sized by Size.
          Pausing shows the clickable line in the style above. Font, colour and background apply to
          SRT tracks, the second track and the paused line.
        </p>
        {styledStatus && (
          <p className="text-xs text-signal-caution" role="status">
            {styledStatus}
          </p>
        )}
      </div>

      <div className="flex justify-end px-2">
        <button
          type="button"
          className="btn-ghost px-2 py-0.5 text-xs"
          onClick={() => onChange({ ...DEFAULT_SUBTITLE_LOOK })}
        >
          Reset style
        </button>
      </div>
    </div>
  )
}
