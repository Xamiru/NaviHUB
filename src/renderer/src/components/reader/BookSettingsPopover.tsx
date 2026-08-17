import type { ReactNode } from 'react'
import { DrawerSlider } from './ReaderSettingsDrawer'

// Typography & theme controls for the book reader ("Aa" in the bottom bar).
// Every pref shows its current value and all its options, rather than the old
// row of blind cycler glyphs. The panel these live in is
// ReaderSettingsDrawer, shared with the manga reader — this module owns the
// controls, not the shell, and still exports the PopoverRow/PopoverOption
// primitives both readers build their rows from.

export type BookTheme = 'dark' | 'black' | 'sepia' | 'paper'
export type BookFont = 'sans' | 'serif'

export interface BookPrefs {
  fontSize: number // px
  lineHeight: number
  maxWidth: number // px, horizontal mode text measure
  vertical: boolean
  theme: BookTheme
  font: BookFont
  // Dim the whole reading column for night reading. Separate from `theme`:
  // the paper and sepia pages are bright by design, and turning them down is
  // not the same choice as switching to the black one.
  brightness: number // 0.3 – 1
}

export const BOOK_DEFAULTS: BookPrefs = {
  fontSize: 18,
  lineHeight: 1.9,
  maxWidth: 700,
  vertical: false,
  theme: 'dark',
  font: 'sans',
  brightness: 1
}
export const LINE_HEIGHTS = [1.6, 1.9, 2.2]
export const WIDTHS = [600, 700, 850, 1100]
export const BOOK_SERIF_STACK = "'Noto Serif JP', Georgia, 'Times New Roman', serif"

// Swatch colors mirror the --book-bg values in styles.css (kept in step).
const THEMES: { key: BookTheme; label: string; swatch: string }[] = [
  { key: 'dark', label: 'Dark', swatch: '#0a0f0b' },
  { key: 'black', label: 'Black', swatch: '#000000' },
  { key: 'sepia', label: 'Sepia', swatch: '#efe4cd' },
  { key: 'paper', label: 'Paper', swatch: '#dfe0dc' }
]

// Row + Option are shared reader-popover primitives (the manga reader's
// display popover uses them too).
export function PopoverRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
        {label}
      </div>
      <div className="flex flex-wrap items-center gap-1">{children}</div>
    </div>
  )
}

export function PopoverOption({
  active,
  onClick,
  title,
  children
}: {
  active: boolean
  onClick: () => void
  title?: string
  children: ReactNode
}) {
  return (
    <button
      className={`rounded px-2.5 py-1 text-xs ${
        active ? 'bg-accent/20 text-accent' : 'bg-base-800 text-gray-400 hover:text-gray-200'
      }`}
      title={title}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function BookSettingsGroups({
  prefs,
  setPref
}: {
  prefs: BookPrefs
  setPref: <K extends keyof BookPrefs>(k: K, v: BookPrefs[K]) => void
}) {
  const { fontSize, lineHeight, maxWidth, vertical, theme, font, brightness } = prefs
  return (
    <>
        <PopoverRow label="Text size">
          <PopoverOption active={false} title="Smaller (-)" onClick={() => setPref('fontSize', Math.max(12, fontSize - 1))}>
            A−
          </PopoverOption>
          <span className="w-12 text-center text-xs tabular-nums text-gray-300">{fontSize}px</span>
          <PopoverOption active={false} title="Larger (+)" onClick={() => setPref('fontSize', Math.min(28, fontSize + 1))}>
            A+
          </PopoverOption>
        </PopoverRow>
        <PopoverRow label="Line height">
          {LINE_HEIGHTS.map((lh) => (
            <PopoverOption key={lh} active={lineHeight === lh} onClick={() => setPref('lineHeight', lh)}>
              {lh}
            </PopoverOption>
          ))}
        </PopoverRow>
        {!vertical && (
          <PopoverRow label="Text width">
            {WIDTHS.map((w) => (
              <PopoverOption key={w} active={maxWidth === w} onClick={() => setPref('maxWidth', w)}>
                {w}
              </PopoverOption>
            ))}
          </PopoverRow>
        )}
        <PopoverRow label="Font">
          <PopoverOption active={font === 'sans'} onClick={() => setPref('font', 'sans')}>
            Sans
          </PopoverOption>
          <PopoverOption active={font === 'serif'} onClick={() => setPref('font', 'serif')}>
            <span style={{ fontFamily: BOOK_SERIF_STACK }}>Serif 明朝</span>
          </PopoverOption>
        </PopoverRow>
        <PopoverRow label="Page">
          {THEMES.map((t) => (
            <PopoverOption key={t.key} active={theme === t.key} onClick={() => setPref('theme', t.key)}>
              <span
                className="mr-1.5 inline-block h-2.5 w-2.5 rounded-sm border border-gray-600 align-[-1px]"
                style={{ background: t.swatch }}
              />
              {t.label}
            </PopoverOption>
          ))}
        </PopoverRow>
        <PopoverRow label="Direction">
          <PopoverOption active={!vertical} title="Horizontal (V toggles)" onClick={() => setPref('vertical', false)}>
            横 Horizontal
          </PopoverOption>
          <PopoverOption active={vertical} title="Vertical tategaki (V toggles)" onClick={() => setPref('vertical', true)}>
            縦 Vertical
          </PopoverOption>
        </PopoverRow>
        <DrawerSlider
          label="Brightness"
          value={brightness}
          display={`${Math.round(brightness * 100)}%`}
          min={0.3}
          max={1}
          step={0.05}
          onChange={(v) => setPref('brightness', v)}
        />
    </>
  )
}
