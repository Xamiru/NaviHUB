import { useEffect, useState } from 'react'
import { api } from '../../lib/api'
import {
  SIDEBAR_HIDDEN_SETTING,
  parseHiddenSections,
  serializeHiddenSections,
  toggleSectionHidden,
  sidebarSectionDefs,
  type SidebarGroup
} from '../../lib/sidebarSections'
import { UI_SCALE_DEFAULT, UI_SCALE_STEPS, formatUiScale, parseUiScale } from '@shared/uiScale'
import { parseSignalClarity, SIGNAL_CLARITY_OPTIONS, SIGNAL_CLARITY_SETTING } from '../../lib/signalClarity'
import {
  APP_THEME_OPTIONS,
  APP_THEME_SETTING,
  APP_THEME_VARIANT_OPTIONS,
  appThemeVariantSetting,
  type AppTheme
} from '@shared/appTheme'
import {
  persistAppTheme,
  persistAppThemeVariant,
  resolveAppTheme,
  resolveAppThemeVariant,
  stampAppTheme
} from '../../lib/theme'
import { type SaveFn, SettingCard } from './shared'

const SIDEBAR_GROUPS: { id: SidebarGroup; label: string }[] = [
  { id: 'core', label: 'Home' },
  { id: 'library', label: 'Library' },
  { id: 'local', label: 'Local' },
  { id: 'archives', label: 'Archives' },
  { id: 'learn', label: 'Learn' },
  { id: 'quiz', label: 'Quiz' }
]


export function SidebarSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const hidden = parseHiddenSections(data?.[SIDEBAR_HIDDEN_SETTING])
  const defs = sidebarSectionDefs()
  const [saving, setSaving] = useState(false)

  async function toggle(key: string) {
    if (saving) return
    setSaving(true)
    try {
      await onSave(SIDEBAR_HIDDEN_SETTING, serializeHiddenSections(toggleSectionHidden(hidden, key)))
    } finally {
      setSaving(false)
    }
  }

  return (
    <SettingCard
      title="Sidebar"
      description="Hide sections you are not using. A hidden section leaves the sidebar only — search (Ctrl+K) and direct links still reach it. Home and the footer links always stay."
    >
      <div className="space-y-4">
        {SIDEBAR_GROUPS.map((g) => (
          <div key={g.id}>
            <span className="label mb-1.5 block">{g.label}</span>
            <div className="flex flex-wrap gap-2">
              {/* Lit chip = section is in the sidebar; dim = hidden. */}
              {defs
                .filter((d) => d.group === g.id)
                .map((d) => (
                  <button
                    key={d.key}
                    className={hidden.has(d.key) ? 'chip-toggle' : 'chip-toggle chip-toggle-active'}
                    aria-pressed={!hidden.has(d.key)}
                    disabled={saving}
                    onClick={() => toggle(d.key)}
                  >
                    {d.label}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </SettingCard>
  )
}

// ---- Appearance -------------------------------------------------------------

export function ThemeSettings({
  data,
  onSave
}: {
  data?: Record<string, string>
  onSave: SaveFn
}) {
  const current = resolveAppTheme(data?.[APP_THEME_SETTING])
  const currentVariant = resolveAppThemeVariant(current, data)
  const currentLabel = APP_THEME_OPTIONS.find((option) => option.value === current)?.label ?? ''
  const [saving, setSaving] = useState(false)

  async function selectTheme(theme: AppTheme): Promise<void> {
    // Save through the same local settings path as the rest of this page, then
    // mirror and stamp it. A failed database write must not leave a false choice.
    setSaving(true)
    try {
      await onSave(APP_THEME_SETTING, theme)
      stampAppTheme(theme, resolveAppThemeVariant(theme, data))
      persistAppTheme(theme)
    } finally {
      setSaving(false)
    }
  }

  async function selectVariant(variant: string): Promise<void> {
    setSaving(true)
    try {
      await onSave(appThemeVariantSetting(current), variant)
      stampAppTheme(current, variant)
      persistAppThemeVariant(current, variant)
    } finally {
      setSaving(false)
    }
  }

  return (
    <SettingCard
      title="Theme"
      description="Choose the visual language for NaviHUB. Your library, layout and features stay exactly the same."
    >
      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Application theme">
        {APP_THEME_OPTIONS.map((option) => {
          const active = current === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`theme-choice text-left ${active ? 'theme-choice-active' : ''}`}
              aria-pressed={active}
              disabled={saving}
              onClick={() => void selectTheme(option.value)}
            >
              <span className={`theme-swatch theme-swatch-${option.value}`} aria-hidden="true">
                <span className="theme-swatch-field" />
                <span className="theme-swatch-rule" />
              </span>
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{option.label}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-signal-link">
                  {option.subtitle}
                </span>
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-ink-muted">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
      {APP_THEME_VARIANT_OPTIONS[current].length > 1 && (
      <>
      <p className="label mt-5">{currentLabel} style</p>
      <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label={`${currentLabel} style`}>
        {APP_THEME_VARIANT_OPTIONS[current].map((option) => {
          const active = currentVariant === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`theme-choice text-left ${active ? 'theme-choice-active' : ''}`}
              aria-pressed={active}
              disabled={saving}
              onClick={() => void selectVariant(option.value)}
            >
              <span className="block text-sm font-semibold text-ink">{option.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
      </>
      )}
    </SettingCard>
  )
}

export function SignalClaritySettings({
  data,
  onSave
}: {
  data?: Record<string, string>
  onSave: SaveFn
}) {
  const current = parseSignalClarity(data?.[SIGNAL_CLARITY_SETTING])

  return (
    <SettingCard
      title="Signal clarity"
      description="Controls how strongly the Lain atmosphere appears. Route moods still keep readers chromeless and workspaces calm."
    >
      <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label="Signal clarity">
        {SIGNAL_CLARITY_OPTIONS.map((option) => {
          const active = current === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`rounded-md border p-3 text-left transition-colors ${
                active
                  ? 'border-signal-live/50 bg-signal-live/10 text-ink'
                  : 'border-line-subtle bg-surface-panel text-ink-secondary hover:border-line-strong hover:text-ink'
              }`}
              aria-pressed={active}
              onClick={() => void onSave(SIGNAL_CLARITY_SETTING, option.value)}
            >
              <span className="block text-sm font-semibold">{option.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-ink-muted">
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
    </SettingCard>
  )
}

// UI scale = Electron's zoom factor. Applied live on click (so the effect is
// visible while choosing) and persisted, since main re-applies it on load.
// "Assume the top N frequency words are known." Without it, everything the
// section calls known comes from the deck alone, so a learner who already reads
// some Japanese is told they understand ~3% of a series they can mostly follow,
// and the i+1 feed (which keeps only exactly-one-unknown sentences) finds
// nothing for months. Off by default so no number ever changes silently.


export function UiScaleSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [scale, setScale] = useState(UI_SCALE_DEFAULT)
  const savedScale = data?.['ui.scale']
  useEffect(() => setScale(parseUiScale(savedScale)), [savedScale])

  async function pick(next: number) {
    setScale(next)
    // Apply first so the change is instant, then persist for the next launch.
    await api.app.setUiScale(next)
    await onSave('ui.scale', String(next))
  }

  return (
    <SettingCard
      title="UI scale"
      description="Scales the whole interface. Below 100% everything gets smaller and more fits on screen — useful on a smaller or lower-resolution monitor where you'd otherwise scroll a lot. Applies immediately and is remembered."
    >
      <div className="flex flex-wrap gap-2">
        {UI_SCALE_STEPS.map((s) => (
          <button
            key={s}
            onClick={() => pick(s)}
            className={Math.abs(scale - s) < 0.001 ? 'pill pill-active' : 'pill'}
          >
            {formatUiScale(s)}
            {s === UI_SCALE_DEFAULT && <span className="ml-1 text-xs opacity-70">default</span>}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Currently {formatUiScale(scale)}. Tip: on a 1366×768 screen, 80% gives roughly the room of a
        1707×960 one. Ctrl+scroll zooms from anywhere.
      </p>
    </SettingCard>
  )
}

// Native File/Edit/View bar. Hidden by default — zoom lives on Ctrl+scroll
// (and Ctrl+= / Ctrl+-), and the hidden menu's other shortcuts keep working.
export function MenuBarSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const shown = data?.['ui.menuBar'] === '1'

  async function pick(next: boolean) {
    // Apply first so the change is instant, then persist for the next launch.
    await api.app.setMenuBarVisible(next)
    await onSave('ui.menuBar', next ? '1' : '0')
  }

  return (
    <SettingCard
      title="Menu bar"
      description="The native File / Edit / View bar above the app. Hidden by default — zoom works with Ctrl+scroll, and keyboard shortcuts (Ctrl+R, F11, Ctrl+= / Ctrl+-) keep working while it's hidden."
    >
      <div className="flex gap-2">
        <button className={!shown ? 'pill pill-active' : 'pill'} onClick={() => pick(false)}>
          Hidden
        </button>
        <button className={shown ? 'pill pill-active' : 'pill'} onClick={() => pick(true)}>
          Shown
        </button>
      </div>
    </SettingCard>
  )
}
