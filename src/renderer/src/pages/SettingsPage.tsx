import { useEffect, useState, type ReactNode } from 'react'
import Tabs, { TabPanel } from '../components/Tabs'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useSecretStorage, useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import { MEDIA_CONFIGS, type MediaConfig } from '../lib/mediaConfig'
import {
  SIDEBAR_HIDDEN_SETTING,
  parseHiddenSections,
  serializeHiddenSections,
  toggleSectionHidden,
  sidebarSectionDefs,
  type SidebarGroup
} from '../lib/sidebarSections'
import {
  UI_SCALE_DEFAULT,
  UI_SCALE_STEPS,
  formatUiScale,
  parseUiScale
} from '@shared/uiScale'
import type {
  TorrentServiceTestResult,
  SecretStorageState,
  VideoToolsResult,
  YtDlpDetectResult,
  SpotdlDetectResult,
  MokuroDetectResult
} from '@shared/types'
import { isSecretSettingKey, type SecretSettingKey } from '@shared/secretSettings'
import StartJackettButton from '../components/StartJackettButton'
import { useUpdateStatus } from '../lib/useUpdateStatus'
import { confirmDialog } from '../lib/confirm'
import EmptyState from '../components/EmptyState'
import QuietWorkspace from '../components/QuietWorkspace'
import LibraryExportSettings from '../components/LibraryExportSettings'
import {
  filterSettingsSections,
  type SettingsSearchSection
} from '../lib/settingsFilter'
import {
  parseSignalClarity,
  SIGNAL_CLARITY_OPTIONS,
  SIGNAL_CLARITY_SETTING
} from '../lib/signalClarity'
import { APP_THEME_OPTIONS, APP_THEME_SETTING, type AppTheme } from '@shared/appTheme'
import { persistAppTheme, resolveAppTheme, stampAppTheme } from '../lib/theme'
import { Field } from '../components/Field'
import { SecretInput, SecretStateLine } from '../components/SecretField'

// Persist a setting and refresh the settings cache. Passed down to every
// section so they all save the same way.
type SaveFn = (key: string, value: string) => Promise<void>

// Every PackRow's Remove asks the same way.
const confirmRemove = (message: string): Promise<boolean> =>
  confirmDialog(message, { confirmLabel: 'Remove', danger: true })

const TABS = [
  { key: 'general', label: 'General' },
  { key: 'statuses', label: 'Statuses' },
  { key: 'data', label: 'Keys & Folders' },
  // Key stays 'japanese' (persisted in nav state); the tab now holds every
  // offline dictionary, English included.
  { key: 'japanese', label: 'Dictionaries' },
  { key: 'ai', label: 'AI Coach' },
  { key: 'integrations', label: 'Integrations' },
  { key: 'system', label: 'System' }
] as const
type TabId = (typeof TABS)[number]['key']

const SETTINGS_SEARCH: readonly SettingsSearchSection<TabId>[] = [
  {
    key: 'general',
    title: 'General',
    terms: [
      'appearance',
      'theme',
      'lain',
      'metal gear',
      'hatsune miku',
      'twin peaks',
      'tactical',
      'signal clarity',
      'effects',
      'ui scale',
      'zoom',
      'menu bar',
      'sidebar',
      'score',
      'time stats'
    ]
  },
  {
    key: 'statuses',
    title: 'Statuses',
    terms: ['anime', 'manga', 'games', 'movies', 'television', 'books', 'tracking']
  },
  {
    key: 'data',
    title: 'Keys & Folders',
    terms: [
      'api keys',
      'library paths',
      'music folder',
      'spotify',
      'spotdl',
      'deno',
      'youtube music',
      'premium cookies',
      'video folder',
      'pictures',
      'tokens',
      'export',
      'backup',
      'transfer',
      'privacy',
      'portable',
      'zip'
    ]
  },
  {
    key: 'japanese',
    title: 'Dictionaries',
    terms: ['japanese', 'english', 'offline', 'frequency', 'jmdict', 'known words']
  },
  {
    key: 'ai',
    title: 'AI Coach',
    terms: ['gemini', 'anthropic', 'vertex', 'model', 'fgo']
  },
  {
    key: 'integrations',
    title: 'Integrations',
    terms: ['ffmpeg', 'video', 'yt-dlp', 'music download', 'mokuro', 'ocr', 'jackett', 'qbittorrent', 'torrent']
  },
  {
    key: 'system',
    title: 'System',
    terms: ['updates', 'version', 'release']
  }
]

export default function SettingsPage() {
  const settingsQueryResult = useSettings()
  const secretStorageQueryResult = useSecretStorage()
  const { data } = settingsQueryResult
  const { data: secretStorage } = secretStorageQueryResult
  const qc = useQueryClient()
  // ?tab= deep-links a section (the Japanese hub's Set up list uses
  // ?tab=japanese); one-shot seed of history-scoped state, the MediaDetailPage
  // idiom — Back into an old Settings entry still restores what it had.
  const [params] = useSearchParams()
  const requested = params.get('tab') as TabId | null
  const [tab, setTab] = usePersistedState<TabId>(
    'settingsTab',
    requested && TABS.some((t) => t.key === requested) ? requested : 'general'
  )
  const [settingsQuery, setSettingsQuery] = usePersistedState('settingsSearch', '')
  const matches = filterSettingsSections(SETTINGS_SEARCH, settingsQuery)
  const displayTab = settingsQuery.trim() ? (matches[0]?.key ?? null) : tab

  function openTab(next: TabId): void {
    setTab(next)
    setSettingsQuery('')
  }

  const setKey: SaveFn = async (key, value) => {
    await api.settings.set(key, value)
    await qc.invalidateQueries({ queryKey: qk.settings.all })
    if (key.endsWith('.statuses')) {
      await qc.invalidateQueries({ queryKey: qk.media.homeOverview })
    }
    toast('Saved', 'success')
  }

  if (settingsQueryResult.isPending || secretStorageQueryResult.isPending) {
    return <PageStatus>Loading settings…</PageStatus>
  }
  if (settingsQueryResult.isError || secretStorageQueryResult.isError) {
    return (
      <div className="mx-auto max-w-6xl p-4 sm:p-6">
        <PageHeader title="Settings" className="mb-6" />
        <EmptyState
          title="Settings could not be loaded"
          body="The saved settings or protected storage state is unavailable. Retry before changing a setting."
          action={
            <button
              className="btn-primary"
              onClick={() => {
                void settingsQueryResult.refetch()
                void secretStorageQueryResult.refetch()
              }}
            >
              Retry
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <PageHeader
        title="Settings"
        subtitle="Search the local system, then adjust one quiet group at a time."
        className="mb-6"
      />
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Section nav — sticky on desktop, wrapping row on narrow screens. */}
        <nav className="shrink-0 md:w-52">
          <div className="md:sticky md:top-6">
            <label className="block">
              <span className="label">Find a section</span>
              <input
                className="input w-full"
                type="search"
                placeholder="Video, folders, updates…"
                value={settingsQuery}
                onChange={(e) => setSettingsQuery(e.target.value)}
              />
            </label>
            <div className="mt-4 border-t border-base-700 pt-4">
              <Tabs
                id="settings-sections"
                label="Settings section"
                orientation="vertical"
                tabs={matches.map((section) => ({ key: section.key, label: section.title }))}
                value={displayTab ?? tab}
                onChange={openTab}
              />
            </div>
            {settingsQuery.trim() && matches.length > 0 && (
              <div className="mt-4 border-t border-base-700 pt-4">
                <p className="text-xs text-gray-500">
                  {matches.length} matching section{matches.length === 1 ? '' : 's'}
                </p>
                <button
                  className="mt-2 text-sm text-accent hover:underline"
                  onClick={() => setSettingsQuery('')}
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </nav>

        <div className="min-w-0 flex-1">
          {displayTab == null ? (
            <EmptyState
              title="No matching settings"
              body="Try a feature name such as video, dictionary, sidebar, torrent or updates."
              action={
                <button className="btn-primary" onClick={() => setSettingsQuery('')}>
                  Clear search
                </button>
              }
            />
          ) : null}
          {displayTab != null && (
            <TabPanel tabsId="settings-sections" value={displayTab}>
              {displayTab === 'general' && (
                <>
                  <ThemeSettings data={data} onSave={setKey} />
                  {resolveAppTheme(data?.[APP_THEME_SETTING]) === 'lain' && (
                    <SignalClaritySettings data={data} onSave={setKey} />
                  )}
                  <UiScaleSettings data={data} onSave={setKey} />
                  <MenuBarSettings data={data} onSave={setKey} />
                  <SidebarSettings data={data} onSave={setKey} />
                  <ScoreSettings data={data} onSave={setKey} />
                  <TimeStatsSettings data={data} onSave={setKey} />
                </>
              )}
              {displayTab === 'statuses' &&
                MEDIA_CONFIGS.map((cfg) => (
                  <StatusEditor key={cfg.key} cfg={cfg} data={data} onSave={setKey} />
                ))}
              {displayTab === 'data' && (
                <>
                  <LibraryExportSettings />
                  <ApiKeysSettings data={data} secretStorage={secretStorage} onSave={setKey} />
                  <FoldersSettings data={data} onSave={setKey} />
                </>
              )}
              {displayTab === 'japanese' && (
                <>
                  <KnownBaselineSettings data={data} onSave={setKey} />
                  <DictionarySettings />
                  <EnglishDictionarySettings />
                </>
              )}
              {displayTab === 'ai' && (
                <CoachSettings data={data} secretStorage={secretStorage} onSave={setKey} />
              )}
              {displayTab === 'integrations' && (
                <>
                  <YtdlpSettings data={data} onSave={setKey} />
                  <SpotdlSettings data={data} onSave={setKey} />
                  <VideoSubtitleToolsSettings data={data} onSave={setKey} />
                  <MokuroSettings data={data} onSave={setKey} />
                  <TorrentSettings data={data} secretStorage={secretStorage} onSave={setKey} />
                </>
              )}
              {displayTab === 'system' && (
                <UpdateSettings secretStorage={secretStorage} onSave={setKey} />
              )}
            </TabPanel>
          )}
        </div>
      </div>
    </div>
  )
}

// ---- reusable section shells ----------------------------------------------

function SettingCard({
  title,
  description,
  children
}: {
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <QuietWorkspace title={title} description={description}>
      {children}
    </QuietWorkspace>
  )
}

// A single "text field + Save" setting seeded from the settings row `settingKey`.
// Covers the API keys and folder paths, which are all this shape.
export function TextSetting({
  settingKey,
  data,
  onSave,
  title,
  description,
  type = 'text',
  secretStorage,
  placeholder,
  note,
  actions
}: {
  settingKey: string
  data: Record<string, string> | undefined
  onSave: SaveFn
  title: string
  description: ReactNode
  type?: 'text' | 'password'
  secretStorage?: SecretStorageState
  placeholder?: string
  note?: ReactNode
  // Extra control(s) beside Save — e.g. "Open folder" for a directory setting.
  actions?: ReactNode
}) {
  const [value, setValue] = useState('')
  const secret = type === 'password' && isSecretSettingKey(settingKey)
  const secretKey = secret ? (settingKey as SecretSettingKey) : null
  const configured = secretKey ? !!secretStorage?.configured[secretKey] : false
  const savedValue = data?.[settingKey]
  useEffect(() => setValue(secret ? '' : (savedValue ?? '')), [savedValue, settingKey, secret])

  async function save(): Promise<void> {
    if (secret && !value.trim()) return
    await onSave(settingKey, value.trim())
    if (secret) setValue('')
  }

  async function clear(): Promise<void> {
    if (!secret) return
    if (!(await confirmDialog(`Clear the saved ${title}?`, { confirmLabel: 'Clear', danger: true }))) return
    await onSave(settingKey, '')
    setValue('')
  }

  return (
    <SettingCard title={title} description={description}>
      <div className="grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <Field label={title} hiddenLabel className="contents">
          <input
            className="input"
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
        </Field>
        <button
          className="btn-ghost shrink-0"
          disabled={secret && (!value.trim() || !secretStorage?.available)}
          onClick={save}
        >
          Save
        </button>
        {secret && configured && (
          <button className="btn-ghost shrink-0" onClick={clear}>
            Clear
          </button>
        )}
        {actions}
      </div>
      {secretKey && <SecretStateLine settingKey={secretKey} state={secretStorage} />}
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
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
  const [saving, setSaving] = useState(false)

  async function selectTheme(theme: AppTheme): Promise<void> {
    // Save through the same local settings path as the rest of this page, then
    // mirror and stamp it. A failed database write must not leave a false choice.
    setSaving(true)
    try {
      await onSave(APP_THEME_SETTING, theme)
      stampAppTheme(theme)
      persistAppTheme(theme)
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
    </SettingCard>
  )
}

function SignalClaritySettings({
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
const BASELINE_STEPS = [0, 500, 1000, 2000, 3000, 5000]

function KnownBaselineSettings({
  data,
  onSave
}: {
  data?: Record<string, string>
  onSave: SaveFn
}) {
  const current = Number(data?.['jp.knownBaseline'] ?? 0) || 0
  return (
    <SettingCard
      title="Assumed known words"
      description="Counts the most common N Japanese words as already known, on top of your deck. This feeds comprehension percentages, the i+1 feed and the coverage list. Needs a frequency dictionary installed below."
    >
      <div className="flex flex-wrap gap-2">
        {BASELINE_STEPS.map((n) => (
          <button
            key={n}
            onClick={() => void onSave('jp.knownBaseline', String(n))}
            className={current === n ? 'pill pill-active' : 'pill'}
          >
            {n === 0 ? 'Off' : `Top ${n.toLocaleString()}`}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        {current === 0
          ? 'Off — only cards in your deck count as known.'
          : `Your deck plus the top ${current.toLocaleString()} words. Set it to what you can honestly read, not what you would like to: every comprehension number is built on it.`}
      </p>
    </SettingCard>
  )
}

function UiScaleSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
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
function MenuBarSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
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

// ---- Library & tracking -----------------------------------------------------

const SIDEBAR_GROUPS: { id: SidebarGroup; label: string }[] = [
  { id: 'core', label: 'Core' },
  { id: 'library', label: 'Library' },
  { id: 'play', label: 'Play' },
  { id: 'learn', label: 'Learn' }
]

function SidebarSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
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

function ScoreSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [scoreMax, setScoreMax] = useState('10')
  const savedScoreMax = data?.['score.max']
  useEffect(() => setScoreMax(savedScoreMax ?? '10'), [savedScoreMax])
  return (
    <SettingCard title="Score scale" description="Maximum score value (e.g. 10 or 100).">
      <div className="flex items-center gap-2">
        <Field label="Maximum score" hiddenLabel className="contents">
          <input
            className="input max-w-[120px]"
            type="number"
            min={1}
            value={scoreMax}
            onChange={(e) => setScoreMax(e.target.value)}
          />
        </Field>
        <button
          className="btn-ghost"
          onClick={() => onSave('score.max', String(Math.max(1, Number(scoreMax) || 10)))}
        >
          Save
        </button>
      </div>
    </SettingCard>
  )
}

function TimeStatsSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [animeEpMin, setAnimeEpMin] = useState('24')
  const [tvEpMin, setTvEpMin] = useState('40')
  const [mangaChMin, setMangaChMin] = useState('5')
  const [bookPageMin, setBookPageMin] = useState('1.5')
  const savedAnimeEpMin = data?.['stats.animeEpMinutes']
  const savedTvEpMin = data?.['stats.tvEpMinutes']
  const savedMangaChMin = data?.['stats.mangaChapterMinutes']
  const savedBookPageMin = data?.['stats.bookPageMinutes']
  useEffect(() => setAnimeEpMin(savedAnimeEpMin ?? '24'), [savedAnimeEpMin])
  useEffect(() => setTvEpMin(savedTvEpMin ?? '40'), [savedTvEpMin])
  useEffect(() => setMangaChMin(savedMangaChMin ?? '5'), [savedMangaChMin])
  useEffect(() => setBookPageMin(savedBookPageMin ?? '1.5'), [savedBookPageMin])

  return (
    <SettingCard
      title="Time stats estimates"
      description={
        <>
          Per-unit minutes used on the{' '}
          <Link to="/stats" className="text-accent hover:underline">
            Stats
          </Link>{' '}
          page to estimate time spent on anime, TV, manga and books. Only used as a fallback when a title
          has no real runtime from AniList/TMDB — re-import to fill those in. Games and visual novels
          use your logged playtime directly (no estimate).
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="label mb-1 block">Anime · min / episode</span>
          <input
            className="input"
            type="number"
            min={1}
            value={animeEpMin}
            onChange={(e) => setAnimeEpMin(e.target.value)}
            onBlur={() =>
              onSave('stats.animeEpMinutes', String(Math.max(1, Number(animeEpMin) || 24)))
            }
          />
        </label>
        <label className="block">
          <span className="label mb-1 block">TV · min / episode</span>
          <input
            className="input"
            type="number"
            min={1}
            value={tvEpMin}
            onChange={(e) => setTvEpMin(e.target.value)}
            onBlur={() => onSave('stats.tvEpMinutes', String(Math.max(1, Number(tvEpMin) || 40)))}
          />
        </label>
        <label className="block">
          <span className="label mb-1 block">Manga · min / chapter</span>
          <input
            className="input"
            type="number"
            min={1}
            value={mangaChMin}
            onChange={(e) => setMangaChMin(e.target.value)}
            onBlur={() =>
              onSave('stats.mangaChapterMinutes', String(Math.max(1, Number(mangaChMin) || 5)))
            }
          />
        </label>
        <label className="block">
          <span className="label mb-1 block">Books · min / page</span>
          <input
            className="input"
            type="number"
            min={0.1}
            step={0.1}
            value={bookPageMin}
            onChange={(e) => setBookPageMin(e.target.value)}
            onBlur={() =>
              onSave('stats.bookPageMinutes', String(Math.max(0.1, Number(bookPageMin) || 1.5)))
            }
          />
        </label>
      </div>
    </SettingCard>
  )
}

// ---- Import API keys --------------------------------------------------------

function ApiKeysSettings({
  data,
  secretStorage,
  onSave
}: {
  data?: Record<string, string>
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  return (
    <>
      <TextSetting
        settingKey="tmdb.api_key"
        data={data}
        onSave={onSave}
        title="TMDB API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your TMDB API key…"
        description={
          <>
            Required to import movies. Get a free key at{' '}
            <span className="text-gray-400">themoviedb.org → Settings → API</span> (the v3 “API
            Key”). Stored locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="omdb.api_key"
        data={data}
        onSave={onSave}
        title="OMDb API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your OMDb API key…"
        description={
          <>
            Optional. Adds IMDb rating + Rotten Tomatoes to movies/TV on import. Get a free key at{' '}
            <span className="text-gray-400">omdbapi.com → API Key</span> (1,000 lookups/day). Stored
            locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="football.api_key"
        data={data}
        onSave={onSave}
        title="API-Football key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your API-Football key…"
        description="Optional. Enables manual current-season refreshes for Football. The key is sent only in API-Football's authorization header and stays on this machine. History installation uses keyless bulk datasets."
      />
      {/* Games IMPORT runs on Steam's keyless storefront API — no key needed.
          The key below is only for achievement lists, which come from the
          separate Web API. (RAWG and IGDB both remain in code but need
          keys/2FA the user can't get; their settings keys stay in the sanitize
          wipe list.) */}
      <TextSetting
        settingKey="steam.web_api_key"
        data={data}
        onSave={onSave}
        title="Steam Web API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your Steam Web API key…"
        description={
          <>
            Optional, and most people can skip it: achievement lists come from the game’s own
            steam_settings folder or Steam’s public stats page without one. Steam only issues keys
            to accounts that have spent money. Stored locally on this machine only.
          </>
        }
      />
      <TextSetting
        settingKey="ra.username"
        data={data}
        onSave={onSave}
        title="RetroAchievements username"
        placeholder="Your RA account name…"
        description={
          <>
            Optional. Enables achievements for emulated games. Play through an RA-enabled emulator
            signed into this account and unlocks sync here.
          </>
        }
      />
      <TextSetting
        settingKey="ra.api_key"
        data={data}
        onSave={onSave}
        title="RetroAchievements Web API key"
        type="password"
        secretStorage={secretStorage}
        placeholder="Paste your RA Web API key…"
        description={
          <>
            Found on <span className="text-gray-400">retroachievements.org → Settings → Keys</span>.
            Stored locally on this machine only.
          </>
        }
      />
    </>
  )
}

// ---- Local folders ----------------------------------------------------------

function FoldersSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  return (
    <>
      <TextSetting
        settingKey="audio.dir"
        data={data}
        onSave={onSave}
        title="Anime music folder"
        placeholder="/media/you/Drive/Music/Anime"
        description="Where downloaded opening/ending audio is stored. Point it at a roomier drive to save space — songs are a few MB each and add up. Leave blank to use the default app folder. Changing this only affects newly-downloaded songs; existing files stay where they were saved."
      />
      <TextSetting
        settingKey="manga.dir"
        data={data}
        onSave={onSave}
        title="Manga library folder"
        placeholder="/home/you/Manga"
        description="The root folder your manga lives in. Set automatically the first time you link a series folder from a manga page; chapter paths are stored relative to this root, so if you move the library, just update this to the new location."
      />
      <TextSetting
        settingKey="books.dir"
        data={data}
        onSave={onSave}
        title="Books library folder"
        placeholder="/home/you/Books"
        description="The root folder your books (EPUBs) live in. Set automatically the first time you link a book's folder from a book page; volume paths are stored relative to this root, so if you move the library, just update this to the new location."
      />
      <TextSetting
        settingKey="wrestling.dir"
        data={data}
        onSave={onSave}
        title="Wrestling library folder"
        placeholder="/home/you/Wrestling"
        description="The root folder your PPV and match rips live in. Set automatically the first time you attach a folder from an event page; file paths are stored relative to this root, so if you move the library, just update this and rescan."
      />
      <TextSetting
        settingKey="football.dir"
        data={data}
        onSave={onSave}
        title="Football media folder"
        placeholder="/home/you/Football"
        description="The root containing Football clips, highlights, full matches, interviews and documentaries. Attachments stay in place and are opened in the OS player; NaviHUB never scans, copies, moves or deletes these files."
      />
      <TextSetting
        settingKey="music.dir"
        data={data}
        onSave={onSave}
        title="Music library folder"
        placeholder="/home/you/Music"
        description="The root folder your music lives in (artists as folders, albums inside them). Set automatically when you pick a folder on the Music page; tracks are stored relative to this root, so if you move the library, just update this and rescan."
      />
      <TextSetting
        settingKey="pictures.dir"
        data={data}
        onSave={onSave}
        title="Pictures folder"
        placeholder="/home/you/Pictures/NaviHUB"
        description={
          <>
            Where wallpapers and fan art are saved, organized per title (e.g.{' '}
            <span className="text-gray-400">Berserk (manga)/wallpapers/…</span>). Leave blank to use
            the app&apos;s data folder. Changing this only affects newly added images — existing
            files stay where they were saved.
          </>
        }
      />
      <TextSetting
        settingKey="slideshow.dir"
        data={data}
        onSave={onSave}
        title="Slideshow folder"
        placeholder="/home/you/Pictures/NaviHUB/Slideshow"
        description={
          <>
            Right-click any image on a title&apos;s Art tab and choose{' '}
            <span className="text-gray-400">Add to slideshow</span> to copy it here. Point Windows
            Settings &gt; Personalization &gt; Background &gt; Slideshow at this folder once and the
            desktop cycles through them — NaviHUB does not need to be running. Leave blank to use{' '}
            <span className="text-gray-400">&lt;Pictures folder&gt;/Slideshow</span>. Changing this
            only affects newly added images.
          </>
        }
        actions={
          <button
            className="btn-ghost shrink-0"
            onClick={() => void api.pictures.openSlideshowFolder()}
          >
            Open folder
          </button>
        }
      />
    </>
  )
}

// ---- AI Coach ---------------------------------------------------------------

function CoachSettings({
  data,
  secretStorage,
  onSave
}: {
  data?: Record<string, string>
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  const [coachProvider, setCoachProvider] = useState('gemini')
  const [coachModel, setCoachModel] = useState('gemini-2.5-flash')
  const [geminiKey, setGeminiKey] = useState('')
  const [anthropicKey, setAnthropicKey] = useState('')
  const [vertexProject, setVertexProject] = useState('')
  const [vertexRegion, setVertexRegion] = useState('')
  const [vertexCreds, setVertexCreds] = useState('')

  const savedCoachProvider = data?.['coach.provider']
  const savedCoachModel = data?.['coach.model']
  const savedVertexProject = data?.['vertex.project_id']
  const savedVertexRegion = data?.['vertex.region']
  const savedVertexCreds = data?.['vertex.credentials_path']
  useEffect(() => setCoachProvider(savedCoachProvider ?? 'gemini'), [savedCoachProvider])
  useEffect(() => setCoachModel(savedCoachModel ?? 'gemini-2.5-flash'), [savedCoachModel])
  useEffect(() => setVertexProject(savedVertexProject ?? ''), [savedVertexProject])
  useEffect(() => setVertexRegion(savedVertexRegion ?? ''), [savedVertexRegion])
  useEffect(() => setVertexCreds(savedVertexCreds ?? ''), [savedVertexCreds])

  return (
    <SettingCard
      title="Coach (AI)"
      description={
        <>
          Powers the FGO coach (Gacha → FGO → Coach). The default is Google Gemini — a free API key
          from <span className="text-gray-400">aistudio.google.com</span>, no credit card. Claude
          (via a paid Anthropic key or Google Cloud Vertex AI) is available too. Keys are stored
          locally on this machine only.
        </>
      }
    >
      <label className="label" htmlFor="coach-provider">Provider</label>
      <div className="mb-4 flex items-center gap-2">
        <select
          id="coach-provider"
          className="input"
          value={coachProvider}
          onChange={(e) => {
            const p = e.target.value
            setCoachProvider(p)
            // Keep the model list coherent with the chosen provider.
            if (p === 'gemini' && coachModel.startsWith('claude')) setCoachModel('gemini-2.5-flash')
            if (p !== 'gemini' && coachModel.startsWith('gemini')) setCoachModel('claude-opus-4-8')
          }}
        >
          <option value="gemini">Google Gemini (free — AI Studio)</option>
          <option value="anthropic">Anthropic API (Claude)</option>
          <option value="vertex">Google Cloud Vertex AI (Claude)</option>
        </select>
        <button className="btn-ghost shrink-0" onClick={() => onSave('coach.provider', coachProvider)}>
          Save
        </button>
      </div>

      <label className="label" htmlFor="coach-model">Model</label>
      <div className="mb-4 flex items-center gap-2">
        <select id="coach-model" className="input" value={coachModel} onChange={(e) => setCoachModel(e.target.value)}>
          {coachProvider === 'gemini' ? (
            <>
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (free, recommended)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (smarter, tighter free limit)</option>
              <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
            </>
          ) : (
            <>
              <option value="claude-opus-4-8">Claude Opus 4.8 (best)</option>
              <option value="claude-sonnet-5">Claude Sonnet 5 (cheaper)</option>
              <option value="claude-haiku-4-5">Claude Haiku 4.5 (cheapest)</option>
            </>
          )}
        </select>
        <button className="btn-ghost shrink-0" onClick={() => onSave('coach.model', coachModel)}>
          Save
        </button>
      </div>

      {coachProvider === 'gemini' ? (
        <SecretInput
          id="gemini-api-key"
          label="Gemini API key"
          settingKey="gemini.api_key"
          value={geminiKey}
          onChange={setGeminiKey}
          onSave={onSave}
          state={secretStorage}
          placeholder="AIza…"
          note={
            <p className="mt-1 text-xs text-gray-500">
              Free at <span className="text-gray-400">aistudio.google.com</span> → “Get API key”.
              No credit card; rate-limited but $0.
            </p>
          }
        />
      ) : coachProvider === 'vertex' ? (
        <div className="space-y-3">
          <div>
            <label className="label" htmlFor="vertex-project">Google Cloud project id</label>
            <div className="flex items-center gap-2">
              <input
                id="vertex-project"
                className="input"
                type="text"
                value={vertexProject}
                onChange={(e) => setVertexProject(e.target.value)}
                placeholder="my-gcp-project-123456"
              />
              <button
                className="btn-ghost shrink-0"
                onClick={() => onSave('vertex.project_id', vertexProject.trim())}
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="vertex-region">Region (optional, defaults to global)</label>
            <div className="flex items-center gap-2">
              <input
                id="vertex-region"
                className="input"
                type="text"
                value={vertexRegion}
                onChange={(e) => setVertexRegion(e.target.value)}
                placeholder="global"
              />
              <button
                className="btn-ghost shrink-0"
                onClick={() => onSave('vertex.region', vertexRegion.trim())}
              >
                Save
              </button>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="vertex-credentials">Service-account key file (optional)</label>
            <div className="flex items-center gap-2">
              <input
                id="vertex-credentials"
                className="input"
                type="text"
                value={vertexCreds}
                onChange={(e) => setVertexCreds(e.target.value)}
                placeholder="/home/you/gcp-service-account.json"
              />
              <button
                className="btn-ghost shrink-0"
                onClick={() => onSave('vertex.credentials_path', vertexCreds.trim())}
              >
                Save
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Leave blank if you've run{' '}
              <span className="text-gray-400">gcloud auth application-default login</span> on this
              machine.
            </p>
          </div>
        </div>
      ) : (
        <SecretInput
          id="anthropic-api-key"
          label="Anthropic API key"
          settingKey="anthropic.api_key"
          value={anthropicKey}
          onChange={setAnthropicKey}
          onSave={onSave}
          state={secretStorage}
          placeholder="sk-ant-…"
          note={
            <p className="mt-1 text-xs text-gray-500">
              Get one at <span className="text-gray-400">platform.claude.com</span> (needs prepaid
              credit — separate from a Claude.ai subscription).
            </p>
          }
        />
      )}
    </SettingCard>
  )
}

// ---- Tools ------------------------------------------------------------------

function YtdlpSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [ytdlpPath, setYtdlpPath] = useState('')
  const [ytdlpCheck, setYtdlpCheck] = useState<YtDlpDetectResult | null>(null)
  useEffect(() => setYtdlpPath(data?.['ytdlp.path'] ?? ''), [data])

  async function testYtdlp() {
    setYtdlpCheck(null)
    await onSave('ytdlp.path', ytdlpPath.trim())
    setYtdlpCheck(await api.music.downloadDetect())
  }

  return (
    <SettingCard
      title="yt-dlp (music downloads)"
      description={
        <>
          Used by the Music page&apos;s Download button. Install yt-dlp and ffmpeg yourself (e.g.{' '}
          <span className="text-gray-400">pipx install yt-dlp</span> or your package manager) and
          keep yt-dlp updated — YouTube changes often. Leave blank to use{' '}
          <span className="text-gray-400">yt-dlp</span> from PATH, or set a full binary path.
        </>
      }
    >
      <div className="flex items-center gap-2">
        <Field label="yt-dlp executable path" hiddenLabel className="contents">
          <input
            className="input"
            type="text"
            value={ytdlpPath}
            onChange={(e) => setYtdlpPath(e.target.value)}
            placeholder="yt-dlp"
          />
        </Field>
        <button className="btn-ghost shrink-0" onClick={testYtdlp}>
          Save &amp; test
        </button>
      </div>
      {ytdlpCheck && (
        <p className={`mt-3 text-sm ${ytdlpCheck.ok ? 'text-green-400' : 'text-red-400'}`}>
          {ytdlpCheck.ok
            ? `✓ yt-dlp ${ytdlpCheck.version} · ffmpeg found`
            : (ytdlpCheck.error ?? 'yt-dlp not found')}
          {ytdlpCheck.ok && ytdlpCheck.versionOld && (
            <span className="block text-yellow-400">
              This yt-dlp is over 3 months old — update it (yt-dlp -U or your package manager) if
              downloads fail.
            </span>
          )}
        </p>
      )}
    </SettingCard>
  )
}

export function SpotdlSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [path, setPath] = useState('')
  const [cookieFile, setCookieFile] = useState('')
  const [pythonPath, setPythonPath] = useState('')
  const [workers, setWorkers] = useState('4')
  const [ffmpegPath, setFfmpegPath] = useState('')
  const [audioProviders, setAudioProviders] = useState('youtube-music')
  const [check, setCheck] = useState<SpotdlDetectResult | null>(null)
  const [testingYouTube, setTestingYouTube] = useState(false)
  const [installingDeno, setInstallingDeno] = useState(false)
  useEffect(() => setPath(data?.['spotdl.path'] ?? ''), [data])
  useEffect(() => setCookieFile(data?.['spotdl.cookieFile'] ?? ''), [data])
  useEffect(() => setPythonPath(data?.['spotdl.pythonPath'] ?? ''), [data])
  useEffect(() => setWorkers(data?.['music.downloadWorkers'] ?? '4'), [data])
  useEffect(() => setFfmpegPath(data?.['music.ffmpegPath'] ?? ''), [data])
  useEffect(() => setAudioProviders(data?.['spotdl.audioProviders'] ?? 'youtube-music'), [data])

  async function test(): Promise<void> {
    setCheck(null)
    await onSave('spotdl.path', path.trim())
    await onSave('spotdl.pythonPath', pythonPath.trim())
    await onSave('spotdl.cookieFile', cookieFile.trim())
    await onSave('spotdl.audioProviders', audioProviders)
    await onSave('music.downloadWorkers', workers)
    await onSave('music.ffmpegPath', ffmpegPath.trim())
    setCheck(await api.music.spotifyDetect())
  }

  async function installDeno(): Promise<void> {
    setInstallingDeno(true)
    try {
      await onSave('spotdl.path', path.trim())
    await onSave('spotdl.pythonPath', pythonPath.trim())
      setCheck(await api.music.spotifyInstallDeno())
    } finally {
      setInstallingDeno(false)
    }
  }

  async function chooseCookieFile(): Promise<void> {
    const chosen = await api.music.spotifyPickCookieFile()
    if (!chosen) return
    setCookieFile(chosen)
    await onSave('spotdl.cookieFile', chosen)
    setCheck(await api.music.spotifyDetect())
  }

  async function testYouTube(): Promise<void> {
    setTestingYouTube(true)
    try {
      const nextCookieFile = cookieFile.trim()
      if (nextCookieFile !== (data?.['spotdl.cookieFile'] ?? '')) {
        await onSave('spotdl.cookieFile', nextCookieFile)
      }
      const result = await api.music.spotifyTestYouTubeAccess(true)
      setCheck(await api.music.spotifyDetect())
      if (!result.ok) throw new Error(result.message)
    } finally {
      setTestingYouTube(false)
    }
  }

  return (
    <SettingCard
      title="spotDL (Spotify music downloads)"
      description={
        <>
          Imports public Spotify playlist metadata and downloads missing songs from YouTube Music
          as native Opus or AAC audio when available. Cookies can change which formats the source offers. Install spotDL 4.5.2 or
          newer and ffmpeg with{' '}
          <span className="text-gray-400">pipx install spotdl</span>. Leave blank to use{' '}
          <span className="text-gray-400">spotdl</span> from PATH, or enter its full executable
          path. Spotify login is not used. NaviHUB disables lyrics and tries verified music
          matches first.
        </>
      }
    >
      <div className="flex items-center gap-2">
        <Field label="spotDL executable path" hiddenLabel className="contents">
          <input
            className="input"
            type="text"
            value={path}
            onChange={(event) => setPath(event.target.value)}
            placeholder="spotdl"
          />
        </Field>
        <button className="btn-ghost shrink-0" onClick={test}>
          Save &amp; test
        </button>
      </div>
      <Field label="Concurrent music downloads" description="One shared limit for the queue; lower it if your connection is throttled.">
        <select className="input" value={workers} onChange={(event) => setWorkers(event.target.value)}>{[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}</select>
      </Field>
      <Field label="ffmpeg executable path (optional)"><input className="input w-full" value={ffmpegPath} onChange={(event) => setFfmpegPath(event.target.value)} placeholder="ffmpeg" /></Field>
      <Field label="Python executable for resumable metadata (optional)" description="Use the Python environment containing spotDL 4.5.2. Blank tries automatic discovery; unsupported versions use the normal CLI.">
        <input className="input w-full" value={pythonPath} onChange={(event) => setPythonPath(event.target.value)} placeholder="python" />
      </Field>
      <label className="label mt-4" htmlFor="spotdl-cookie-file">YouTube cookies.txt (optional)</label>
      <div className="flex gap-2">
        <input
          id="spotdl-cookie-file"
          className="input min-w-0 flex-1"
          type="text"
          value={cookieFile}
          onChange={(event) => setCookieFile(event.target.value)}
          placeholder="C:\\Users\\you\\Documents\\youtube-cookies.txt"
        />
        <button className="btn-ghost shrink-0" onClick={() => void chooseCookieFile()}>Choose…</button>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        Export from a fresh private YouTube session and keep the same VPN connection. Treat this
        file like a password; NaviHUB never copies it into a library export.
      </p>
      <label className="label mt-4" htmlFor="spotdl-audio-providers">Audio source fallback</label>
      <select
        id="spotdl-audio-providers"
        className="input"
        value={audioProviders}
        onChange={(event) => setAudioProviders(event.target.value)}
      >
        <option value="youtube-music">YouTube Music only (recommended)</option>
        <option value="piped">YouTube Music, then Piped</option>
        <option value="catalogues">YouTube Music, Piped, Bandcamp, then SoundCloud</option>
      </select>
      <p className="mt-2 text-xs text-gray-400">
        Extra providers can rescue unavailable songs, but may return a less exact recording.
        They are never enabled automatically.
      </p>
      {check && (
        <div className="mt-3 text-sm">
          <p className="text-xs text-gray-400">Preview yt-dlp: {check.standaloneYtdlpVersion ?? 'Not detected'}; spotDL embedded yt-dlp: {check.embeddedYtdlpVersion ?? 'Version unavailable'}. Preview access does not test the embedded downloader.</p>
          <p className={check.metadataReady ?? check.ok ? 'text-green-400' : 'text-red-400'}>
            {check.metadataReady
              ? `spotDL ${check.version ?? ''} is ready for metadata`
              : (check.error ?? 'spotDL is not ready')}
          </p>
          <p className="mt-1 text-gray-400">
            ffmpeg: {check.ffmpeg ? 'ready' : 'missing'} · Deno: {check.deno ? 'ready' : 'missing'}
            {check.premiumCookieConfigured && ` · cookies file: ${check.premiumCookieValid ? 'readable' : 'invalid'}`}
          </p>
          <p className="mt-1 text-gray-400">
            YouTube: {check.youtubeAccess?.state === 'ready'
              ? `working with cookies${check.youtubeAccess.bitrate ? ` · ${Math.round(check.youtubeAccess.bitrate)} kbps available` : ''}`
              : check.youtubeAccess?.state === 'anonymous' ? 'working without cookies'
                : check.youtubeAccess?.state === 'untested' ? 'not tested' : (check.youtubeAccess?.message ?? 'not available')}
          </p>
          <button className="btn-ghost mt-3" disabled={testingYouTube} onClick={() => void testYouTube()}>
            {testingYouTube ? 'Testing YouTube…' : 'Save cookies & test YouTube access'}
          </button>
          {!check.deno && check.version && (
            <button className="btn-ghost mt-3" disabled={installingDeno} onClick={() => void installDeno()}>
              {installingDeno ? 'Installing Deno…' : 'Install Deno for spotDL'}
            </button>
          )}
        </div>
      )}
    </SettingCard>
  )
}

function MokuroSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [mokuroPath, setMokuroPath] = useState('')
  const [check, setCheck] = useState<MokuroDetectResult | null>(null)
  useEffect(() => setMokuroPath(data?.['mokuro.path'] ?? ''), [data])

  async function test() {
    setCheck(null)
    await onSave('mokuro.path', mokuroPath.trim())
    setCheck(await api.manga.ocrDetect())
  }

  return (
    <SettingCard
      title="mokuro (manga OCR)"
      description={
        <>
          Powers the Run OCR button on a manga&apos;s Chapters tab: mokuro reads speech bubbles so
          the reader can overlay tappable text for dictionary lookups and mining. Install it
          yourself (<span className="text-gray-400">pipx install mokuro</span>); its first run
          downloads ~450 MB of OCR models. Leave blank to use{' '}
          <span className="text-gray-400">mokuro</span> from PATH, or set a full binary path.
        </>
      }
    >
      <div className="flex items-center gap-2">
        <Field label="mokuro executable path" hiddenLabel className="contents">
          <input
            className="input"
            type="text"
            value={mokuroPath}
            onChange={(e) => setMokuroPath(e.target.value)}
            placeholder="mokuro"
          />
        </Field>
        <button className="btn-ghost shrink-0" onClick={test}>
          Save &amp; test
        </button>
      </div>
      {check && (
        <p className={`mt-3 text-sm ${check.ok ? 'text-green-400' : 'text-red-400'}`}>
          {check.ok ? `✓ mokuro ${check.version}` : (check.error ?? 'mokuro not found')}
        </p>
      )}
    </SettingCard>
  )
}

// ffmpeg/ffprobe remain optional helpers for linked-video metadata and offline
// Japanese subtitle-corpus extraction. Playback is external and never uses
// either binary.
function VideoSubtitleToolsSettings({
  data,
  onSave
}: {
  data?: Record<string, string>
  onSave: SaveFn
}) {
  const [ffmpegPath, setFfmpegPath] = useState('')
  const [ffprobePath, setFfprobePath] = useState('')
  const [check, setCheck] = useState<VideoToolsResult | null>(null)
  const savedFfmpegPath = data?.['ffmpeg.path']
  const savedFfprobePath = data?.['ffprobe.path']
  useEffect(() => setFfmpegPath(savedFfmpegPath ?? ''), [savedFfmpegPath])
  useEffect(() => setFfprobePath(savedFfprobePath ?? ''), [savedFfprobePath])

  async function test() {
    setCheck(null)
    await onSave('ffmpeg.path', ffmpegPath.trim())
    await onSave('ffprobe.path', ffprobePath.trim())
    setCheck(await api.video.tools())
  }

  return (
    <SettingCard
      title="ffmpeg (video library tools)"
      description={
        <>
          Optional: ffprobe reads duration and codec metadata, while ffmpeg extracts embedded text
          subtitles for offline Japanese coverage and prep decks. Files always open in your system
          video player, whether these tools are installed or not. Leave the fields blank to use PATH.
        </>
      }
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="text"
            value={ffmpegPath}
            onChange={(e) => setFfmpegPath(e.target.value)}
            placeholder="ffmpeg"
            aria-label="ffmpeg path"
          />
          <input
            className="input"
            type="text"
            value={ffprobePath}
            onChange={(e) => setFfprobePath(e.target.value)}
            placeholder="ffprobe"
            aria-label="ffprobe path"
          />
          <button className="btn-ghost shrink-0" onClick={test}>
            Save &amp; test
          </button>
        </div>
        {check && (
          <p className={`text-sm ${check.ffmpeg && check.ffprobe ? 'text-green-400' : 'text-red-400'}`}>
            {check.ffmpeg && check.ffprobe
              ? `✓ ${check.ffmpegVersion ?? 'ffmpeg found'}`
              : `${check.ffmpeg ? 'ffmpeg found' : 'ffmpeg not found'} · ${check.ffprobe ? 'ffprobe found' : 'ffprobe not found'}`}
          </p>
        )}
      </div>
    </SettingCard>
  )
}

// Jackett (torrent search) + qBittorrent (hand-off) — both user-installed
// local services, like yt-dlp. "Save & test" saves every field first, then
// probes the service; the probe never rejects, so results render inline.
function TorrentSettings({
  data,
  secretStorage,
  onSave
}: {
  data?: Record<string, string>
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  const [jackettUrl, setJackettUrl] = useState('')
  const [jackettKey, setJackettKey] = useState('')
  const [jackettStart, setJackettStart] = useState('')
  const [jackettCheck, setJackettCheck] = useState<TorrentServiceTestResult | null>(null)
  const [qbUrl, setQbUrl] = useState('')
  const [qbUser, setQbUser] = useState('')
  const [qbPass, setQbPass] = useState('')
  const [qbCheck, setQbCheck] = useState<TorrentServiceTestResult | null>(null)

  const savedJackettUrl = data?.['jackett.url']
  const savedJackettStart = data?.['jackett.start_cmd']
  const savedQbUrl = data?.['qbittorrent.url']
  const savedQbUser = data?.['qbittorrent.username']
  useEffect(() => setJackettUrl(savedJackettUrl ?? ''), [savedJackettUrl])
  useEffect(() => setJackettStart(savedJackettStart ?? ''), [savedJackettStart])
  useEffect(() => setQbUrl(savedQbUrl ?? ''), [savedQbUrl])
  useEffect(() => setQbUser(savedQbUser ?? ''), [savedQbUser])

  async function testJackett() {
    setJackettCheck(null)
    await onSave('jackett.url', jackettUrl.trim())
    if (jackettKey.trim()) {
      await onSave('jackett.api_key', jackettKey.trim())
      setJackettKey('')
    }
    await onSave('jackett.start_cmd', jackettStart.trim())
    setJackettCheck(await api.torrents.testJackett())
  }

  async function testQb() {
    setQbCheck(null)
    await onSave('qbittorrent.url', qbUrl.trim())
    await onSave('qbittorrent.username', qbUser.trim())
    if (qbPass) {
      await onSave('qbittorrent.password', qbPass)
      setQbPass('')
    }
    setQbCheck(await api.torrents.testQbittorrent())
  }

  const field = 'grid grid-cols-[110px_1fr] items-center gap-2'
  return (
    <>
      <SettingCard
        title="Jackett (torrent search)"
        description="Powers the Find torrents button on media pages and the Torrents page. Run Jackett yourself; the API key is shown on its dashboard."
      >
        <div className="space-y-2">
          <div className={field}>
            <label className="label" htmlFor="jackett-url">URL</label>
            <input
              id="jackett-url"
              className="input"
              value={jackettUrl}
              onChange={(e) => setJackettUrl(e.target.value)}
              placeholder="http://localhost:9117"
            />
          </div>
          <div className={field}>
            <label className="label" htmlFor="jackett-api-key">API key</label>
            <div className="flex items-center gap-2">
              <input
                id="jackett-api-key"
                className="input"
                type="password"
                value={jackettKey}
                onChange={(e) => setJackettKey(e.target.value)}
                placeholder={secretStorage?.configured['jackett.api_key'] ? 'Saved — enter a replacement' : undefined}
              />
              {secretStorage?.configured['jackett.api_key'] && (
                <button
                  className="btn-ghost shrink-0"
                  onClick={async () => {
                    if (!(await confirmDialog('Clear the saved Jackett API key?', { confirmLabel: 'Clear', danger: true }))) return
                    await onSave('jackett.api_key', '')
                    setJackettKey('')
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <SecretStateLine settingKey="jackett.api_key" state={secretStorage} />
          <div className={field}>
            <label className="label" htmlFor="jackett-start-command">Start command</label>
            <input
              id="jackett-start-command"
              className="input"
              value={jackettStart}
              onChange={(e) => setJackettStart(e.target.value)}
              placeholder="systemctl start --no-ask-password jackett.service"
            />
          </div>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Run by the Start Jackett button when Jackett isn&apos;t answering. Leave blank for the
          default shown above. Run directly, not through a shell — no pipes or quoting.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            className="btn-ghost"
            disabled={!!jackettKey.trim() && !secretStorage?.available}
            onClick={testJackett}
          >
            Save &amp; test
          </button>
          <StartJackettButton />
        </div>
        {jackettCheck && (
          <p className={`mt-3 text-sm ${jackettCheck.ok ? 'text-green-400' : 'text-red-400'}`}>
            {jackettCheck.message}
          </p>
        )}
      </SettingCard>

      <SettingCard
        title="qBittorrent (torrent hand-off)"
        description={
          <>
            Where the Add button sends torrents. Username/password can stay blank if
            qBittorrent&apos;s{' '}
            <span className="text-gray-400">Bypass authentication for clients on localhost</span> is
            enabled (Options → Web UI).
          </>
        }
      >
        <div className="space-y-2">
          <div className={field}>
            <label className="label" htmlFor="qbittorrent-url">URL</label>
            <input
              id="qbittorrent-url"
              className="input"
              value={qbUrl}
              onChange={(e) => setQbUrl(e.target.value)}
              placeholder="http://localhost:8080"
            />
          </div>
          <div className={field}>
            <label className="label" htmlFor="qbittorrent-username">Username</label>
            <input id="qbittorrent-username" className="input" value={qbUser} onChange={(e) => setQbUser(e.target.value)} />
          </div>
          <div className={field}>
            <label className="label" htmlFor="qbittorrent-password">Password</label>
            <div className="flex items-center gap-2">
              <input
                id="qbittorrent-password"
                className="input"
                type="password"
                value={qbPass}
                onChange={(e) => setQbPass(e.target.value)}
                placeholder={secretStorage?.configured['qbittorrent.password'] ? 'Saved — enter a replacement' : undefined}
              />
              {secretStorage?.configured['qbittorrent.password'] && (
                <button
                  className="btn-ghost shrink-0"
                  onClick={async () => {
                    if (!(await confirmDialog('Clear the saved qBittorrent password?', { confirmLabel: 'Clear', danger: true }))) return
                    await onSave('qbittorrent.password', '')
                    setQbPass('')
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          <SecretStateLine settingKey="qbittorrent.password" state={secretStorage} />
        </div>
        <button
          className="btn-ghost mt-3"
          disabled={!!qbPass && !secretStorage?.available}
          onClick={testQb}
        >
          Save &amp; test
        </button>
        {qbCheck && (
          <p className={`mt-3 text-sm ${qbCheck.ok ? 'text-green-400' : 'text-red-400'}`}>
            {qbCheck.message}
          </p>
        )}
      </SettingCard>
    </>
  )
}

// Offline Japanese dictionaries: install JMdict/KANJIDIC with one click, import
// any other Yomitan .zip, watch import progress, and remove installed ones.
// ---- in-app updates -------------------------------------------------------
// Progress comes from polling update:status via useUpdateStatus — there is no
// push channel. `environment` explains builds that cannot update themselves.
export function UpdateSettings({
  secretStorage,
  onSave
}: {
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  const { status, kick } = useUpdateStatus()
  const [busy, setBusy] = useState(false)

  const canUpdate = status?.environment === 'ok'

  // Every mutation ends in kick(): refetchInterval is false while idle, so the
  // poll has to be restarted or a running download would never report progress.
  async function act(fn: () => Promise<unknown>) {
    setBusy(true)
    try {
      await fn()
    } finally {
      setBusy(false)
      await kick()
    }
  }

  return (
    <SettingCard
      title="Updates"
      description="Checks GitHub Releases for a newer build. Always manual — nothing checks on launch."
    >
      {secretStorage?.configured['github.token'] && (
        <div className="rounded-md border border-base-700 bg-base-800 p-3">
          <p className="text-sm text-gray-400">
            A GitHub token from the private repository setup is saved. Public updates no longer use it.
          </p>
          <SecretStateLine settingKey="github.token" state={secretStorage} />
          <button
            className="btn-ghost mt-3"
            onClick={async () => {
              if (!(await confirmDialog('Clear the saved GitHub token?', { confirmLabel: 'Clear', danger: true }))) return
              await onSave('github.token', '')
            }}
          >
            Clear saved token
          </button>
        </div>
      )}

      <div className="mt-3 rounded-md border border-base-700 bg-base-800 p-3">
        <p className="text-sm">
          Current version <span className="text-gray-400">{status?.currentVersion ?? '—'}</span>
        </p>

        {status && !canUpdate && status.message && (
          <p className="mt-2 text-sm text-gray-400">{status.message}</p>
        )}
        {status?.state === 'available' && (
          <p className="mt-2 text-sm">Version {status.version} is available.</p>
        )}
        {status?.state === 'upToDate' && (
          <p className="mt-2 text-sm text-gray-400">You are on the latest version.</p>
        )}
        {status?.state === 'error' && status.message && (
          <p className="mt-2 text-sm text-red-400">{status.message}</p>
        )}
        {status?.state === 'downloading' && (
          <div className="mt-3">
            <p className="mb-1 text-sm text-gray-400">
              Downloading {status.version} — {status.percent ?? 0}%
            </p>
            <div className="h-1.5 overflow-hidden rounded bg-base-600">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${status.percent ?? 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-3 flex gap-2">
          {status?.state === 'downloading' ? (
            <button className="btn-ghost" onClick={() => act(() => api.updates.cancel())}>
              Stop
            </button>
          ) : status?.state === 'ready' ? (
            <button className="btn-primary" onClick={() => api.updates.install()}>
              Restart &amp; install {status.version}
            </button>
          ) : (
            <>
              <button
                className="btn-ghost"
                disabled={!canUpdate || busy}
                onClick={() => act(() => api.updates.check())}
              >
                {busy ? 'Checking…' : 'Check for updates'}
              </button>
              {status?.state === 'available' && (
                <button className="btn-primary" onClick={() => act(() => api.updates.download())}>
                  Download {status.version}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </SettingCard>
  )
}

function DictionarySettings() {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Installed-detection for the preset rows: match by title prefix (the zips'
  // index.json titles start with these).
  const hasDict = (prefix: string): boolean =>
    dicts.some((d) => d.title.toLowerCase().startsWith(prefix.toLowerCase()))

  const { data: dicts = [], isPending: dictsPending, isError: dictsError } = useQuery({
    queryKey: qk.dict.list,
    queryFn: () => api.dict.list()
  })
  const { data: status, isPending: statusPending, isError: statusError } = useQuery({
    queryKey: qk.dict.importStatus,
    queryFn: () => api.dict.importStatus(),
    // Self-gating off the polled data as well as local busy: the sentence-audio
    // pack downloads for ~20 minutes, and navigating away+back must resume the
    // progress display (updater.ts idiom).
    refetchInterval: (q) => (busy || q.state.data?.running ? 400 : false)
  })
  const { data: sentenceBank, isPending: sentencesPending, isError: sentencesError } = useQuery({
    queryKey: qk.dict.sentenceBank,
    queryFn: () => api.dict.sentenceBank()
  })
  const { data: strokeSet, isPending: strokesPending, isError: strokesError } = useQuery({
    queryKey: qk.dict.strokeSet,
    queryFn: () => api.dict.strokeSet()
  })
  const { data: kradSet, isPending: kradPending, isError: kradError } = useQuery({
    queryKey: qk.dict.kradSet,
    queryFn: () => api.dict.kradSet()
  })
  const { data: grammarBank, isPending: grammarPending, isError: grammarError } = useQuery({
    queryKey: qk.dict.grammarBank,
    queryFn: () => api.dict.grammarBank()
  })
  const { data: pairSet, isPending: pairsPending, isError: pairsError } = useQuery({
    queryKey: qk.dict.pairSet,
    queryFn: () => api.dict.pairSet()
  })
  const { data: sentenceAudio, isPending: audioPending, isError: audioError } = useQuery({
    queryKey: qk.dict.sentenceAudioBank,
    queryFn: () => api.dict.sentenceAudioBank()
  })

  async function run(fn: () => Promise<unknown>) {
    setError(null)
    setBusy(true)
    try {
      await fn()
      await qc.invalidateQueries({ queryKey: qk.dict.all })
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const running = !!status?.running
  const blocked = busy || running
  const readError = dictsError || statusError || sentencesError || strokesError || kradError ||
    grammarError || pairsError || audioError
  const readPending = dictsPending || statusPending || sentencesPending || strokesPending ||
    kradPending || grammarPending || pairsPending || audioPending

  if (readError || readPending) {
    return (
      <SettingCard title="Japanese dictionaries">
        {readError ? (
          <div role="alert" className="text-sm text-red-400">
            Dictionary state could not be loaded.
            <button className="btn-ghost ml-3" onClick={() => void qc.invalidateQueries({ queryKey: qk.dict.all })}>
              Retry
            </button>
          </div>
        ) : <p className="text-sm text-gray-500">Loading dictionaries…</p>}
      </SettingCard>
    )
  }

  return (
    <SettingCard
      title="Japanese dictionaries"
      description={
        <>
          Offline dictionaries power the Japanese section&apos;s lookup, word mining and the manga
          reader. Install JMdict and KANJIDIC with one click; import pitch-accent, grammar (DOJG) and
          和英 dictionaries as Yomitan <span className="text-gray-400">.zip</span> files exported from
          the extension. Large one-time downloads (JMdict is ~60&nbsp;MB); everything then works with
          no network.
        </>
      }
    >
      <div className="mb-4 space-y-1.5">
          {dicts.map((d) => (
            <PackRow
              key={d.id}
              title={d.title}
              detail={
                <>
                  {d.termCount > 0 && <span>{d.termCount.toLocaleString()} words</span>}
                  {d.termCount > 0 && d.kanjiCount > 0 && ' · '}
                  {d.kanjiCount > 0 && <span>{d.kanjiCount.toLocaleString()} kanji</span>}
                  {d.freqCount > 0 && (d.termCount > 0 || d.kanjiCount > 0) && ' · '}
                  {d.freqCount > 0 && <span>{d.freqCount.toLocaleString()} frequency ranks</span>}
                  {d.pitchCount > 0 && d.termCount === 0 && d.kanjiCount === 0 && (
                    <span>{d.pitchCount.toLocaleString()} pitch accents</span>
                  )}
                  {d.revision && <span className="ml-1 text-gray-600">· {d.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove(`Remove "${d.title}"?`)) void run(() => api.dict.remove(d.id))
              }}
            />
          ))}
          {sentenceBank && (
            <PackRow
              title="Example sentences (Tatoeba)"
              detail={<span>{sentenceBank.sentenceCount.toLocaleString()} sentence pairs</span>}
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the example-sentence bank?')) {
                  void run(() => api.dict.removeSentences())
                }
              }}
            />
          )}
          {strokeSet && (
            <PackRow
              title="Stroke order (KanjiVG)"
              detail={
                <>
                  <span>{strokeSet.charCount.toLocaleString()} characters</span>
                  {strokeSet.revision && <span className="ml-1 text-gray-600">· {strokeSet.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the stroke-order data?')) {
                  void run(() => api.dict.removeStrokes())
                }
              }}
            />
          )}
          {sentenceAudio && (
            <PackRow
              title="Sentence audio (Tatoeba)"
              detail={<span>{sentenceAudio.clipCount.toLocaleString()} recorded sentences</span>}
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the sentence audio (and its clip files)?')) {
                  void run(() => api.dict.removeSentenceAudio())
                }
              }}
            />
          )}
          {pairSet && (
            <PackRow
              title="Pitch minimal pairs (kotu)"
              detail={
                <>
                  <span>{pairSet.pairCount.toLocaleString()} pairs with audio</span>
                  {pairSet.revision && <span className="ml-1 text-gray-600">· {pairSet.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the minimal-pairs pack (and its audio files)?')) {
                  void run(() => api.dict.removePairs())
                }
              }}
            />
          )}
          {grammarBank && (
            <PackRow
              title="Grammar library (N5–N1)"
              detail={<span>{grammarBank.pointCount.toLocaleString()} grammar points</span>}
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the grammar library?')) {
                  void run(() => api.dict.removeGrammar())
                }
              }}
            />
          )}
          {kradSet && (
            <PackRow
              title="Kanji components (KRADFILE)"
              detail={
                <>
                  <span>
                    {kradSet.kanjiCount.toLocaleString()} kanji ·{' '}
                    {kradSet.componentCount.toLocaleString()} components
                  </span>
                  {kradSet.revision && <span className="ml-1 text-gray-600">· {kradSet.revision}</span>}
                </>
              }
              busy={blocked}
              onRemove={async () => {
                if (await confirmRemove('Remove the kanji-components data?')) {
                  void run(() => api.dict.removeKrad())
                }
              }}
            />
          )}
          {/* Presets not installed yet join the same list as Download rows.
              Dict presets are matched to installed rows by title prefix. */}
          {!hasDict('JMdict') && (
            <PackRow
              title="JMdict (EN)"
              detail="The dictionary itself — lookups, mining, deck generators. ~60 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('jmdict-en'))}
            />
          )}
          {!hasDict('KANJIDIC') && (
            <PackRow
              title="KANJIDIC (EN)"
              detail="Per-kanji readings and meanings for the kanji breakdown."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('kanjidic-en'))}
            />
          )}
          {!hasDict('JPDB') && (
            <PackRow
              title="JPDB frequency"
              detail="Word frequency ranks — rank badges, better prep decks, core decks."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('jpdb-freq'))}
            />
          )}
          {!hasDict('BCCWJ') && (
            <PackRow
              title="BCCWJ frequency"
              detail="Alternative frequency corpus (written Japanese)."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('bccwj-freq'))}
            />
          )}
          {!hasDict('Kanjium') && (
            <PackRow
              title="Kanjium pitch accents"
              detail="Pitch contours in the dictionary + the pitch-pattern quiz. ~3 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importKanjium())}
            />
          )}
          {!hasDict('JMnedict') && (
            <PackRow
              title="Names (JMnedict)"
              detail="People, places, companies — the #1 lookup miss in manga. ~740k entries, ~11 MB, takes a few minutes."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPreset('jmnedict'))}
            />
          )}
          {!sentenceBank && (
            <PackRow
              title="Example sentences (Tatoeba)"
              detail="Real usage examples in the dictionary and on mined cards. Takes a minute to index."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importSentences())}
            />
          )}
          {!strokeSet && (
            <PackRow
              title="Stroke order (KanjiVG)"
              detail="Animated stroke diagrams and the writing drill. ~4 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importStrokes())}
            />
          )}
          {!kradSet && (
            <PackRow
              title="Kanji components (KRADFILE)"
              detail="Kanji broken into parts — search by what you can see, build-a-kanji drill. <1 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importKrad())}
            />
          )}
          {!grammarBank && (
            <PackRow
              title="Grammar library (N5–N1)"
              detail="Every JLPT grammar point with formation and examples — the library page + cloze drill. ~2 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importGrammar())}
            />
          )}
          {!pairSet && (
            <PackRow
              title="Pitch minimal pairs (kotu)"
              detail="Native recordings for the pitch perception drill — hear the difference between 箸 and 橋. ~18 MB."
              busy={blocked}
              onDownload={() => void run(() => api.dict.importPairs())}
            />
          )}
          {!sentenceAudio && (
            <PackRow
              title="Sentence audio (Tatoeba)"
              detail={
                sentenceBank
                  ? 'Native recordings for the dictation drill and example playback. Thousands of small downloads — 15-30 min, safe to interrupt (re-running resumes).'
                  : 'Native recordings for the dictation drill. Install the example sentences first — the audio attaches to them.'
              }
              busy={blocked || !sentenceBank}
              onDownload={() => void run(() => api.dict.importSentenceAudio())}
            />
          )}
        </div>

      {running && status && (
        <div className="mb-4">
          <p className="mb-1 text-xs text-gray-400">
            {phaseLabelFor(status.phase)}
            {status.dictTitle ? ` · ${status.dictTitle}` : ''}
            {status.phase === 'downloading' && status.total > 0
              ? ` · ${Math.round((status.done / status.total) * 100)}%`
              : status.done > 0
                ? ` · ${status.done.toLocaleString()}`
                : ''}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full bg-accent transition-all"
              style={{
                width:
                  status.phase === 'downloading' && status.total > 0
                    ? `${(status.done / status.total) * 100}%`
                    : '100%',
                opacity: status.phase === 'downloading' ? 1 : 0.5
              }}
            />
          </div>
        </div>
      )}

      <button className="btn-ghost" disabled={blocked} onClick={() => void run(() => api.dict.importZip())}>
        Import Yomitan .zip…
      </button>

      {error && <p className="mt-3 text-sm text-red-400">Import failed: {error}</p>}

      <p className="mt-4 text-xs leading-relaxed text-gray-500">
        Data credits: JMdict, KANJIDIC, JMnedict &amp; KRADFILE © EDRDG (CC BY-SA 4.0) · frequency
        dictionaries from Kuuuube&apos;s yomitan-dictionaries · example sentences © Tatoeba
        contributors (CC BY 2.0 FR, per-sentence attribution kept) · sentence audio © its Tatoeba
        contributors (per-clip licenses kept) · stroke order © KanjiVG, Ulrich Apel (CC BY-SA 3.0)
        · pitch accents © Kanjium (CC BY-SA 4.0) · grammar points © hanabira.org (MIT) · minimal
        pairs from Kuuuube&apos;s kotu.io backup.
      </p>
    </SettingCard>
  )
}

// The offline English dictionary (WordNet + CMUdict). Separate card, same
// download/progress mechanics — it shares the single import gate and the polled
// dict:importStatus, so its progress renders through the same block.
function EnglishDictionarySettings() {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: info, isPending: infoPending, isError: infoError } = useQuery({
    queryKey: qk.english.dictInfo,
    queryFn: () => api.english.dictInfo()
  })
  const { data: freqInfo, isPending: freqPending, isError: freqError } = useQuery({
    queryKey: qk.english.freqInfo,
    queryFn: () => api.english.freqInfo()
  })
  const { data: status, isPending: statusPending, isError: statusError } = useQuery({
    queryKey: qk.dict.importStatus,
    queryFn: () => api.dict.importStatus(),
    refetchInterval: busy ? 400 : false
  })

  async function run(fn: () => Promise<unknown>) {
    setError(null)
    setBusy(true)
    try {
      await fn()
      await qc.invalidateQueries({ queryKey: qk.english.all })
      await qc.invalidateQueries({ queryKey: qk.dict.all })
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const running = !!status?.running
  const blocked = busy || running

  if (infoError || freqError || statusError || infoPending || freqPending || statusPending) {
    return (
      <SettingCard title="English dictionary">
        {infoError || freqError || statusError ? (
          <div role="alert" className="text-sm text-red-400">
            English dictionary state could not be loaded.
            <button className="btn-ghost ml-3" onClick={() => {
              void qc.invalidateQueries({ queryKey: qk.english.all })
              void qc.invalidateQueries({ queryKey: qk.dict.all })
            }}>
              Retry
            </button>
          </div>
        ) : <p className="text-sm text-gray-500">Loading English dictionary…</p>}
      </SettingCard>
    )
  }

  return (
    <SettingCard
      title="English dictionary"
      description={
        <>
          Offline definitions, examples and synonyms for the English section, from Princeton
          WordNet, plus pronunciations from CMUdict. One ~14&nbsp;MB download; lookups then work with
          no network. Without it the section falls back to the online dictionaryapi.dev. The
          frequency pack ranks 50k words by commonness — it is what the vocab and spelling tests
          build their difficulty bands from.
        </>
      }
    >
      <div className="mb-4 space-y-1.5">
        {info ? (
          <PackRow
            title={`WordNet ${info.version ?? ''}`.trim()}
            detail={`${info.lemmaCount.toLocaleString()} words · ${info.synsetCount.toLocaleString()} senses · ${info.pronCount.toLocaleString()} pronunciations`}
            busy={blocked}
            onRemove={async () => {
              if (await confirmRemove('Remove the offline English dictionary? Lookups will go online.')) {
                void run(() => api.english.removeDict())
              }
            }}
          />
        ) : (
          <PackRow
            title="WordNet 3.0 + pronunciations"
            detail="Definitions, usage examples, synonyms and IPA. ~14 MB, takes a minute to index."
            busy={blocked}
            onDownload={() => void run(() => api.english.importDict())}
          />
        )}
        {freqInfo ? (
          <PackRow
            title="Word frequency (OpenSubtitles)"
            detail={`${freqInfo.wordCount.toLocaleString()} ranked words`}
            busy={blocked}
            onRemove={async () => {
              if (
                await confirmRemove(
                  'Remove the frequency pack? The vocab/spelling band sources will stop working.'
                )
              ) {
                void run(() => api.english.removeFreq())
              }
            }}
          />
        ) : (
          <PackRow
            title="Word frequency (OpenSubtitles)"
            detail="50k ranked words for the vocab and spelling tests' difficulty bands. ~1 MB."
            busy={blocked}
            onDownload={() => void run(() => api.english.importFreq())}
          />
        )}
      </div>

      {running && status && (
        <div className="mb-4">
          <p className="mb-1 text-xs text-gray-400">
            {phaseLabelFor(status.phase)}
            {status.phase === 'downloading' && status.total > 0
              ? ` · ${Math.round((status.done / status.total) * 100)}%`
              : status.done > 0
                ? ` · ${status.done.toLocaleString()}`
                : ''}
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-base-700">
            <div
              className="h-full bg-accent transition-all"
              style={{
                width:
                  status.phase === 'downloading' && status.total > 0
                    ? `${(status.done / status.total) * 100}%`
                    : '100%',
                opacity: status.phase === 'downloading' ? 1 : 0.5
              }}
            />
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-400">Import failed: {error}</p>}

      <p className="mt-4 text-xs leading-relaxed text-gray-500">
        Data credits: WordNet 3.0 © Princeton University (WordNet License) · CMU Pronouncing
        Dictionary © Carnegie Mellon University (BSD-2-Clause) · word frequency from
        hermitdave/FrequencyWords, OpenSubtitles 2018 (CC BY-SA 4.0).
      </p>
    </SettingCard>
  )
}

// Shared by both dictionary cards — they poll the same import status object.
function phaseLabelFor(phase: string): string {
  const labels: Record<string, string> = {
    downloading: 'Downloading',
    reading: 'Reading',
    terms: 'Importing words',
    kanji: 'Importing kanji',
    pitch: 'Importing pitch accent',
    frequency: 'Importing frequency ranks',
    tags: 'Importing tags',
    sentences: 'Indexing example sentences',
    strokes: 'Importing stroke order',
    english: 'Importing English words',
    pronunciations: 'Importing pronunciations',
    components: 'Importing kanji components',
    grammar: 'Importing grammar points',
    audio: 'Downloading sentence audio',
    pairs: 'Importing minimal pairs',
    finalizing: 'Finalizing'
  }
  return labels[phase] ?? phase
}

// One pack row: an installed dictionary/bank/set (detail + Remove) or an
// available preset (description + Download). One list, per-row state — not a
// wall of download buttons.
function PackRow({
  title,
  detail,
  busy,
  onRemove,
  onDownload
}: {
  title: string
  detail: ReactNode
  busy: boolean
  onRemove?: () => void
  onDownload?: () => void
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-md border border-base-700 p-2.5 ${
        onDownload ? 'bg-base-900/40' : 'bg-base-800'
      }`}
    >
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${onDownload ? 'text-gray-400' : ''}`}>
          {title}
        </p>
        <p className="text-xs text-gray-500">{detail}</p>
      </div>
      {onRemove && (
        <button
          className="btn-ghost shrink-0 py-1 px-2 text-xs text-gray-500 hover:text-red-400"
          disabled={busy}
          onClick={onRemove}
        >
          Remove
        </button>
      )}
      {onDownload && (
        <button className="btn-ghost shrink-0 py-1 px-3 text-xs" disabled={busy} onClick={onDownload}>
          Download
        </button>
      )}
    </div>
  )
}

// Reorderable, customizable status list for one media type.
export function StatusEditor({
  cfg,
  data,
  onSave
}: {
  cfg: MediaConfig
  data: Record<string, string> | undefined
  onSave: SaveFn
}) {
  const [statuses, setStatuses] = useState<string[]>([])
  const [newStatus, setNewStatus] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const savedStatuses = data?.[cfg.statusesKey]

  useEffect(() => {
    if (!data) return
    try {
      const parsed = JSON.parse(savedStatuses ?? '[]')
      setStatuses(Array.isArray(parsed) && parsed.length >= 3 ? parsed : cfg.defaultStatuses)
    } catch {
      setStatuses(cfg.defaultStatuses)
    }
  }, [savedStatuses, cfg])

  async function persist(next: string[], replacing?: string): Promise<boolean> {
    if (saving) return false
    setSaving(true)
    setError(null)
    try {
      if (replacing) {
        const page = await api.media.listPage({
          filter: { mediaType: cfg.key, status: replacing },
          offset: 0,
          limit: 24
        })
        if (page.total > 0) {
          setError(`“${replacing}” is used by ${page.total} titles. Change those titles to another status first.`)
          return false
        }
      }
      await onSave(cfg.statusesKey, JSON.stringify(next))
      setStatuses(next)
      return true
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      return false
    } finally {
      setSaving(false)
    }
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (i < 2 || j < 2 || j >= statuses.length - 1) return
    const next = [...statuses]
    ;[next[i], next[j]] = [next[j], next[i]]
    void persist(next)
  }

  async function addStatus() {
    const s = newStatus.trim()
    if (!s) return
    if (statuses.some((status) => status.toLocaleLowerCase() === s.toLocaleLowerCase())) {
      setError('That status already exists.')
      return
    }
    const next = [...statuses.slice(0, -1), s, statuses[statuses.length - 1]]
    if (await persist(next)) setNewStatus('')
  }

  async function renameStatus(i: number) {
    const nextName = editValue.trim()
    const previous = statuses[i]
    if (!nextName || nextName === previous) {
      setEditingIndex(null)
      return
    }
    if (statuses.some((status, index) => index !== i && status.toLocaleLowerCase() === nextName.toLocaleLowerCase())) {
      setError('That status already exists.')
      return
    }
    const next = [...statuses]
    next[i] = nextName
    if (await persist(next, previous)) setEditingIndex(null)
  }

  function roleAt(i: number): string | null {
    if (i === 0) return 'In progress'
    if (i === 1) return 'Completed'
    if (i === statuses.length - 1) return 'Planned'
    return null
  }

  return (
    <SettingCard
      title={`${cfg.singular} statuses`}
      description={`The first status means in progress, the second means completed, and the last means planned throughout NaviHUB. You can reorder the other statuses. To rename or remove a status in use, change those titles first.`}
    >
      <div className="space-y-2 mb-4">
        {statuses.map((s, i) => (
          <div key={s} className="flex flex-wrap items-center gap-2 bg-base-700 rounded-md px-3 py-2">
            {editingIndex === i ? (
              <>
                <Field label={`Rename ${s}`} hiddenLabel className="contents">
                  <input
                    className="input min-w-0 flex-1"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') void renameStatus(i) }}
                  />
                </Field>
                <button className="btn-ghost shrink-0" disabled={saving} onClick={() => void renameStatus(i)}>Save</button>
                <button className="btn-ghost shrink-0" disabled={saving} onClick={() => setEditingIndex(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className="min-w-0 flex-1 text-sm">
                  {s}
                  {roleAt(i) && <span className="ml-2 text-xs text-gray-400">{roleAt(i)}</span>}
                </span>
                <button
                  className="btn-ghost shrink-0 px-2 py-1 text-xs"
                  aria-label={`Rename ${s}`}
                  disabled={saving}
                  onClick={() => { setEditingIndex(i); setEditValue(s); setError(null) }}
                >
                  Rename
                </button>
                {i >= 2 && i < statuses.length - 1 && (
                  <>
                    <button className="btn-ghost shrink-0 px-2 py-1 text-xs" aria-label={`Move ${s} up`} disabled={saving || i === 2} onClick={() => move(i, -1)}>↑</button>
                    <button className="btn-ghost shrink-0 px-2 py-1 text-xs" aria-label={`Move ${s} down`} disabled={saving || i === statuses.length - 2} onClick={() => move(i, 1)}>↓</button>
                    <button className="btn-ghost shrink-0 px-2 py-1 text-xs" aria-label={`Remove ${s}`} disabled={saving} onClick={() => void persist(statuses.filter((_, index) => index !== i), s)}>✕</button>
                  </>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {error && <p role="alert" className="mb-3 text-sm text-red-400">{error}</p>}

      <div className="flex gap-2">
        <Field label={`New ${cfg.singular.toLowerCase()} status name`} hiddenLabel className="contents">
          <input
            className="input max-w-xs"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') void addStatus() }}
            placeholder="New status name"
          />
        </Field>
        <button className="btn-ghost" disabled={saving} onClick={() => void addStatus()}>
          Add status
        </button>
      </div>
    </SettingCard>
  )
}
