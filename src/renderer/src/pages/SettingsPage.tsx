import { useEffect, useState, type ReactNode } from 'react'
import Tabs from '../components/Tabs'
import PageHeader from '../components/PageHeader'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useSettings } from '../lib/hooks'
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
  UpdateTestResult,
  VideoToolsResult,
  YtDlpDetectResult,
  SpotdlDetectResult,
  MokuroDetectResult
} from '@shared/types'
import StartJackettButton from '../components/StartJackettButton'
import { useUpdateStatus } from '../lib/useUpdateStatus'
import { confirmDialog } from '../lib/confirm'
import EmptyState from '../components/EmptyState'
import QuietWorkspace from '../components/QuietWorkspace'
import {
  filterSettingsSections,
  type SettingsSearchSection
} from '../lib/settingsFilter'

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
    terms: ['appearance', 'ui scale', 'zoom', 'menu bar', 'sidebar', 'score', 'time stats']
  },
  {
    key: 'statuses',
    title: 'Statuses',
    terms: ['anime', 'manga', 'games', 'movies', 'television', 'books', 'tracking']
  },
  {
    key: 'data',
    title: 'Keys & Folders',
    terms: ['api keys', 'library paths', 'music folder', 'video folder', 'pictures', 'tokens']
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
  const { data } = useSettings()
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
    toast('Saved', 'success')
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
          {displayTab === 'general' && (
            <>
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
              <ApiKeysSettings data={data} onSave={setKey} />
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
          {displayTab === 'ai' && <CoachSettings data={data} onSave={setKey} />}
          {displayTab === 'integrations' && (
            <>
              <YtdlpSettings data={data} onSave={setKey} />
              <SpotdlSettings data={data} onSave={setKey} />
              <VideoToolsSettings data={data} onSave={setKey} />
              <MokuroSettings data={data} onSave={setKey} />
              <TorrentSettings data={data} onSave={setKey} />
            </>
          )}
          {displayTab === 'system' && <UpdateSettings data={data} onSave={setKey} />}
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
function TextSetting({
  settingKey,
  data,
  onSave,
  title,
  description,
  type = 'text',
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
  placeholder?: string
  note?: ReactNode
  // Extra control(s) beside Save — e.g. "Open folder" for a directory setting.
  actions?: ReactNode
}) {
  const [value, setValue] = useState('')
  useEffect(() => setValue(data?.[settingKey] ?? ''), [data, settingKey])
  return (
    <SettingCard title={title} description={description}>
      <div className="grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
        <input
          className="input"
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
        <button className="btn-ghost shrink-0" onClick={() => onSave(settingKey, value.trim())}>
          Save
        </button>
        {actions}
      </div>
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    </SettingCard>
  )
}

// ---- Appearance -------------------------------------------------------------

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
  useEffect(() => setScale(parseUiScale(data?.['ui.scale'])), [data])

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
  useEffect(() => setScoreMax(data?.['score.max'] ?? '10'), [data])
  return (
    <SettingCard title="Score scale" description="Maximum score value (e.g. 10 or 100).">
      <div className="flex items-center gap-2">
        <input
          className="input max-w-[120px]"
          type="number"
          min={1}
          value={scoreMax}
          onChange={(e) => setScoreMax(e.target.value)}
        />
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
  useEffect(() => {
    if (!data) return
    setAnimeEpMin(data['stats.animeEpMinutes'] ?? '24')
    setTvEpMin(data['stats.tvEpMinutes'] ?? '40')
    setMangaChMin(data['stats.mangaChapterMinutes'] ?? '5')
    setBookPageMin(data['stats.bookPageMinutes'] ?? '1.5')
  }, [data])

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

function ApiKeysSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  return (
    <>
      <TextSetting
        settingKey="tmdb.api_key"
        data={data}
        onSave={onSave}
        title="TMDB API key"
        type="password"
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
        placeholder="Paste your OMDb API key…"
        description={
          <>
            Optional. Adds IMDb rating + Rotten Tomatoes to movies/TV on import. Get a free key at{' '}
            <span className="text-gray-400">omdbapi.com → API Key</span> (1,000 lookups/day). Stored
            locally on this machine only.
          </>
        }
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

function CoachSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [coachProvider, setCoachProvider] = useState('gemini')
  const [coachModel, setCoachModel] = useState('gemini-2.5-flash')
  const [geminiKey, setGeminiKey] = useState('')
  const [anthropicKey, setAnthropicKey] = useState('')
  const [vertexProject, setVertexProject] = useState('')
  const [vertexRegion, setVertexRegion] = useState('')
  const [vertexCreds, setVertexCreds] = useState('')

  useEffect(() => {
    if (!data) return
    setCoachProvider(data['coach.provider'] ?? 'gemini')
    setCoachModel(data['coach.model'] ?? 'gemini-2.5-flash')
    setGeminiKey(data['gemini.api_key'] ?? '')
    setAnthropicKey(data['anthropic.api_key'] ?? '')
    setVertexProject(data['vertex.project_id'] ?? '')
    setVertexRegion(data['vertex.region'] ?? '')
    setVertexCreds(data['vertex.credentials_path'] ?? '')
  }, [data])

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
      <label className="label">Provider</label>
      <div className="mb-4 flex items-center gap-2">
        <select
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

      <label className="label">Model</label>
      <div className="mb-4 flex items-center gap-2">
        <select className="input" value={coachModel} onChange={(e) => setCoachModel(e.target.value)}>
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
        <div>
          <label className="label">Gemini API key</label>
          <div className="flex items-center gap-2">
            <input
              className="input"
              type="password"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              placeholder="AIza…"
            />
            <button
              className="btn-ghost shrink-0"
              onClick={() => onSave('gemini.api_key', geminiKey.trim())}
            >
              Save
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Free at <span className="text-gray-400">aistudio.google.com</span> → “Get API key”. No
            credit card; rate-limited but $0.
          </p>
        </div>
      ) : coachProvider === 'vertex' ? (
        <div className="space-y-3">
          <div>
            <label className="label">Google Cloud project id</label>
            <div className="flex items-center gap-2">
              <input
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
            <label className="label">Region (optional, defaults to global)</label>
            <div className="flex items-center gap-2">
              <input
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
            <label className="label">Service-account key file (optional)</label>
            <div className="flex items-center gap-2">
              <input
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
        <div>
          <label className="label">Anthropic API key</label>
          <div className="flex items-center gap-2">
            <input
              className="input"
              type="password"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
              placeholder="sk-ant-…"
            />
            <button
              className="btn-ghost shrink-0"
              onClick={() => onSave('anthropic.api_key', anthropicKey.trim())}
            >
              Save
            </button>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Get one at <span className="text-gray-400">platform.claude.com</span> (needs prepaid
            credit — separate from a Claude.ai subscription).
          </p>
        </div>
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
        <input
          className="input"
          type="text"
          value={ytdlpPath}
          onChange={(e) => setYtdlpPath(e.target.value)}
          placeholder="yt-dlp"
        />
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
              ⚠ This yt-dlp is over 3 months old — update it (yt-dlp -U or your package manager) if
              downloads fail.
            </span>
          )}
        </p>
      )}
    </SettingCard>
  )
}

function SpotdlSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [path, setPath] = useState('')
  const [check, setCheck] = useState<SpotdlDetectResult | null>(null)
  useEffect(() => setPath(data?.['spotdl.path'] ?? ''), [data])

  async function test(): Promise<void> {
    setCheck(null)
    await onSave('spotdl.path', path.trim())
    setCheck(await api.music.spotifyDetect())
  }

  return (
    <SettingCard
      title="spotDL (Spotify playlist imports)"
      description={
        <>
          Imports public Spotify playlist metadata and downloads missing songs from YouTube Music
          as 320 kbps MP3 files. Install spotDL and ffmpeg yourself with{' '}
          <span className="text-gray-400">pipx install spotdl</span>. Leave blank to use{' '}
          <span className="text-gray-400">spotdl</span> from PATH, or enter its full executable
          path. Spotify login is not used.
        </>
      }
    >
      <div className="flex items-center gap-2">
        <input
          className="input"
          type="text"
          value={path}
          onChange={(event) => setPath(event.target.value)}
          placeholder="spotdl"
        />
        <button className="btn-ghost shrink-0" onClick={test}>
          Save &amp; test
        </button>
      </div>
      {check && (
        <p className={`mt-3 text-sm ${check.ok ? 'text-green-400' : 'text-red-400'}`}>
          {check.ok
            ? `spotDL ${check.version ?? ''}; ffmpeg found`
            : (check.error ?? 'spotDL is not ready')}
        </p>
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
        <input
          className="input"
          type="text"
          value={mokuroPath}
          onChange={(e) => setMokuroPath(e.target.value)}
          placeholder="mokuro"
        />
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

// ffmpeg/ffprobe for the video player: probing files and converting the ones
// Chromium can't demux (MKV) or decode (HEVC, AC3) into a cached playable copy.
// Same posture as yt-dlp — user-installed, never bundled.
function VideoToolsSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [ffmpegPath, setFfmpegPath] = useState('')
  const [ffprobePath, setFfprobePath] = useState('')
  const [check, setCheck] = useState<VideoToolsResult | null>(null)
  const [clearing, setClearing] = useState(false)
  useEffect(() => {
    setFfmpegPath(data?.['ffmpeg.path'] ?? '')
    setFfprobePath(data?.['ffprobe.path'] ?? '')
  }, [data])

  const { data: cache, refetch } = useQuery({
    queryKey: qk.video.cacheStats,
    queryFn: () => api.video.cacheStats()
  })

  async function test() {
    setCheck(null)
    await onSave('ffmpeg.path', ffmpegPath.trim())
    await onSave('ffprobe.path', ffprobePath.trim())
    setCheck(await api.video.tools())
  }

  async function clearCache() {
    setClearing(true)
    try {
      await api.video.clearCache()
      await refetch()
    } finally {
      setClearing(false)
    }
  }

  const gb = (bytes: number): string => `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`

  return (
    <SettingCard
      title="ffmpeg (video player)"
      description={
        <>
          The player uses ffprobe to inspect files and ffmpeg to convert the ones this app
          can&apos;t play natively — MKV containers, HEVC video, AC3/DTS audio — into a cached copy.
          Without ffmpeg only .mp4 and .webm play. Install it yourself (your package manager); leave
          the fields blank to use PATH.
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
        {cache && (
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>
              Converted copies: {cache.entries} file{cache.entries === 1 ? '' : 's'} ·{' '}
              {gb(cache.bytes)} of {gb(cache.capBytes)}
            </span>
            <button
              className="btn-ghost px-2 py-0.5 text-xs"
              disabled={clearing || cache.entries === 0}
              onClick={clearCache}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </SettingCard>
  )
}

// Jackett (torrent search) + qBittorrent (hand-off) — both user-installed
// local services, like yt-dlp. "Save & test" saves every field first, then
// probes the service; the probe never rejects, so results render inline.
function TorrentSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const [jackettUrl, setJackettUrl] = useState('')
  const [jackettKey, setJackettKey] = useState('')
  const [jackettStart, setJackettStart] = useState('')
  const [jackettCheck, setJackettCheck] = useState<TorrentServiceTestResult | null>(null)
  const [qbUrl, setQbUrl] = useState('')
  const [qbUser, setQbUser] = useState('')
  const [qbPass, setQbPass] = useState('')
  const [qbCheck, setQbCheck] = useState<TorrentServiceTestResult | null>(null)

  useEffect(() => {
    setJackettUrl(data?.['jackett.url'] ?? '')
    setJackettKey(data?.['jackett.api_key'] ?? '')
    setJackettStart(data?.['jackett.start_cmd'] ?? '')
    setQbUrl(data?.['qbittorrent.url'] ?? '')
    setQbUser(data?.['qbittorrent.username'] ?? '')
    setQbPass(data?.['qbittorrent.password'] ?? '')
  }, [data])

  async function testJackett() {
    setJackettCheck(null)
    await onSave('jackett.url', jackettUrl.trim())
    await onSave('jackett.api_key', jackettKey.trim())
    await onSave('jackett.start_cmd', jackettStart.trim())
    setJackettCheck(await api.torrents.testJackett())
  }

  async function testQb() {
    setQbCheck(null)
    await onSave('qbittorrent.url', qbUrl.trim())
    await onSave('qbittorrent.username', qbUser.trim())
    await onSave('qbittorrent.password', qbPass)
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
            <span className="label">URL</span>
            <input
              className="input"
              value={jackettUrl}
              onChange={(e) => setJackettUrl(e.target.value)}
              placeholder="http://localhost:9117"
            />
          </div>
          <div className={field}>
            <span className="label">API key</span>
            <input
              className="input"
              type="password"
              value={jackettKey}
              onChange={(e) => setJackettKey(e.target.value)}
            />
          </div>
          <div className={field}>
            <span className="label">Start command</span>
            <input
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
          <button className="btn-ghost" onClick={testJackett}>
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
            <span className="label">URL</span>
            <input
              className="input"
              value={qbUrl}
              onChange={(e) => setQbUrl(e.target.value)}
              placeholder="http://localhost:8080"
            />
          </div>
          <div className={field}>
            <span className="label">Username</span>
            <input className="input" value={qbUser} onChange={(e) => setQbUser(e.target.value)} />
          </div>
          <div className={field}>
            <span className="label">Password</span>
            <input
              className="input"
              type="password"
              value={qbPass}
              onChange={(e) => setQbPass(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-ghost mt-3" onClick={testQb}>
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
// "Save & test" mirrors the Jackett/qBittorrent cards: the test IPC resolves a
// { ok, message } result instead of rejecting, so it renders inline in
// green/red. Progress comes from polling update:status via useUpdateStatus —
// there is no push channel. `environment` explains any build that can't update
// itself (dev run, portable exe, missing token) rather than failing on click.
function UpdateSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
  const { status, kick } = useUpdateStatus()
  const [token, setToken] = useState('')
  const [check, setCheck] = useState<UpdateTestResult | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => setToken(data?.['github.token'] ?? ''), [data])

  const field = 'grid grid-cols-[110px_1fr] items-center gap-2'
  const canUpdate = status?.environment === 'ok'

  async function testToken() {
    setCheck(null)
    await onSave('github.token', token.trim())
    setCheck(await api.updates.testToken())
    await kick()
  }

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
      <div className={field}>
        <span className="label">GitHub token</span>
        <input
          className="input"
          type="password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="github_pat_…"
        />
      </div>
      <p className="mt-2 text-sm text-gray-500">
        The repository is private, so updates need a token that can read it:
        <span className="text-gray-400"> repo</span> scope on a classic token, or
        <span className="text-gray-400"> Contents: read</span> on a fine-grained one.
      </p>
      <button className="btn-ghost mt-3" onClick={testToken}>
        Save &amp; test
      </button>
      {check && (
        <p className={`mt-3 text-sm ${check.ok ? 'text-green-400' : 'text-red-400'}`}>
          {check.message}
        </p>
      )}

      <div className="mt-5 rounded-md border border-base-700 bg-base-800 p-3">
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

  const { data: dicts = [] } = useQuery({
    queryKey: qk.dict.list,
    queryFn: () => api.dict.list()
  })
  const { data: status } = useQuery({
    queryKey: qk.dict.importStatus,
    queryFn: () => api.dict.importStatus(),
    // Self-gating off the polled data as well as local busy: the sentence-audio
    // pack downloads for ~20 minutes, and navigating away+back must resume the
    // progress display (updater.ts idiom).
    refetchInterval: (q) => (busy || q.state.data?.running ? 400 : false)
  })
  const { data: sentenceBank } = useQuery({
    queryKey: qk.dict.sentenceBank,
    queryFn: () => api.dict.sentenceBank()
  })
  const { data: strokeSet } = useQuery({
    queryKey: qk.dict.strokeSet,
    queryFn: () => api.dict.strokeSet()
  })
  const { data: kradSet } = useQuery({
    queryKey: qk.dict.kradSet,
    queryFn: () => api.dict.kradSet()
  })
  const { data: grammarBank } = useQuery({
    queryKey: qk.dict.grammarBank,
    queryFn: () => api.dict.grammarBank()
  })
  const { data: pairSet } = useQuery({
    queryKey: qk.dict.pairSet,
    queryFn: () => api.dict.pairSet()
  })
  const { data: sentenceAudio } = useQuery({
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

      <button className="btn-ghost" disabled={busy} onClick={() => void run(() => api.dict.importZip())}>
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

  const { data: info } = useQuery({
    queryKey: qk.english.dictInfo,
    queryFn: () => api.english.dictInfo()
  })
  const { data: freqInfo } = useQuery({
    queryKey: qk.english.freqInfo,
    queryFn: () => api.english.freqInfo()
  })
  const { data: status } = useQuery({
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
function StatusEditor({
  cfg,
  data,
  onSave
}: {
  cfg: MediaConfig
  data: Record<string, string> | undefined
  onSave: (key: string, value: string) => void
}) {
  const [statuses, setStatuses] = useState<string[]>([])
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    if (!data) return
    try {
      const parsed = JSON.parse(data[cfg.statusesKey] ?? '[]')
      setStatuses(Array.isArray(parsed) && parsed.length ? parsed : cfg.defaultStatuses)
    } catch {
      setStatuses(cfg.defaultStatuses)
    }
  }, [data, cfg])

  function persist(next: string[]) {
    setStatuses(next)
    onSave(cfg.statusesKey, JSON.stringify(next))
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir
    if (j < 0 || j >= statuses.length) return
    const next = [...statuses]
    ;[next[i], next[j]] = [next[j], next[i]]
    persist(next)
  }

  function addStatus() {
    const s = newStatus.trim()
    if (!s || statuses.includes(s)) return
    setNewStatus('')
    persist([...statuses, s])
  }

  return (
    <SettingCard
      title={`${cfg.singular} statuses`}
      description={`Customize the status options used when logging ${cfg.plural.toLowerCase()}. Order here is the order shown in filters and forms.`}
    >
      <div className="space-y-2 mb-4">
        {statuses.map((s, i) => (
          <div key={s} className="flex items-center gap-2 bg-base-700 rounded-md px-3 py-2">
            <span className="flex-1 text-sm">{s}</span>
            <button className="text-gray-500 hover:text-white px-1" onClick={() => move(i, -1)}>
              ↑
            </button>
            <button className="text-gray-500 hover:text-white px-1" onClick={() => move(i, 1)}>
              ↓
            </button>
            <button
              className="text-gray-500 hover:text-red-400 px-1"
              onClick={() => persist(statuses.filter((_, idx) => idx !== i))}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="input max-w-xs"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addStatus()}
          placeholder="New status name"
        />
        <button className="btn-ghost" onClick={addStatus}>
          Add status
        </button>
      </div>
    </SettingCard>
  )
}
