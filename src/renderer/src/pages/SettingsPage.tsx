import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import { MEDIA_CONFIGS, type MediaConfig } from '../lib/mediaConfig'
import {
  UI_SCALE_DEFAULT,
  UI_SCALE_STEPS,
  formatUiScale,
  parseUiScale
} from '@shared/uiScale'
import type { TorrentServiceTestResult, YtDlpDetectResult } from '@shared/types'
import StartJackettButton from '../components/StartJackettButton'

// Persist a setting and refresh the settings cache. Passed down to every
// section so they all save the same way.
type SaveFn = (key: string, value: string) => Promise<void>

const TABS = [
  { id: 'appearance', label: 'Appearance' },
  { id: 'library', label: 'Library & Tracking' },
  { id: 'importing', label: 'Import Keys' },
  { id: 'folders', label: 'Folders' },
  { id: 'ai', label: 'AI Coach' },
  { id: 'tools', label: 'Tools' },
  { id: 'devices', label: 'Devices' }
] as const
type TabId = (typeof TABS)[number]['id']

export default function SettingsPage() {
  const { data } = useSettings()
  const qc = useQueryClient()
  const [tab, setTab] = usePersistedState<TabId>('settingsTab', 'library')

  const setKey: SaveFn = async (key, value) => {
    await api.settings.set(key, value)
    await qc.invalidateQueries({ queryKey: qk.settings.all })
    toast('Saved', 'success')
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Section nav — sticky on desktop, wrapping row on narrow screens. */}
        <nav className="shrink-0 md:w-52">
          <div className="flex flex-wrap gap-1 md:sticky md:top-6 md:flex-col">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-md px-3 py-2 text-left text-sm transition-colors ${
                  tab === t.id
                    ? 'bg-accent/10 text-accent md:shadow-[inset_2px_0_0_0_rgb(var(--accent))]'
                    : 'text-gray-400 hover:bg-base-800 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="min-w-0 flex-1">
          {tab === 'appearance' && <UiScaleSettings data={data} onSave={setKey} />}
          {tab === 'library' && (
            <>
              {MEDIA_CONFIGS.map((cfg) => (
                <StatusEditor key={cfg.key} cfg={cfg} data={data} onSave={setKey} />
              ))}
              <ScoreSettings data={data} onSave={setKey} />
              <TimeStatsSettings data={data} onSave={setKey} />
            </>
          )}
          {tab === 'importing' && <ApiKeysSettings data={data} onSave={setKey} />}
          {tab === 'folders' && <FoldersSettings data={data} onSave={setKey} />}
          {tab === 'ai' && <CoachSettings data={data} onSave={setKey} />}
          {tab === 'tools' && (
            <>
              <YtdlpSettings data={data} onSave={setKey} />
              <TorrentSettings data={data} onSave={setKey} />
              <DictionarySettings />
            </>
          )}
          {tab === 'devices' && <SyncSettings />}
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
    <section className="card p-5 mb-6">
      <h2 className="font-semibold mb-1">{title}</h2>
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      {children}
    </section>
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
  note
}: {
  settingKey: string
  data: Record<string, string> | undefined
  onSave: SaveFn
  title: string
  description: ReactNode
  type?: 'text' | 'password'
  placeholder?: string
  note?: ReactNode
}) {
  const [value, setValue] = useState('')
  useEffect(() => setValue(data?.[settingKey] ?? ''), [data, settingKey])
  return (
    <SettingCard title={title} description={description}>
      <div className="flex items-center gap-2">
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
      </div>
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    </SettingCard>
  )
}

// ---- Appearance -------------------------------------------------------------

// UI scale = Electron's zoom factor. Applied live on click (so the effect is
// visible while choosing) and persisted, since main re-applies it on load.
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
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
              Math.abs(scale - s) < 0.001
                ? 'bg-accent text-white'
                : 'bg-base-700 text-gray-300 hover:bg-base-600'
            }`}
          >
            {formatUiScale(s)}
            {s === UI_SCALE_DEFAULT && <span className="ml-1 text-xs opacity-70">default</span>}
          </button>
        ))}
      </div>
      <p className="mt-3 text-xs text-gray-500">
        Currently {formatUiScale(scale)}. Tip: on a 1366×768 screen, 80% gives roughly the room of a
        1707×960 one.
      </p>
    </SettingCard>
  )
}

// ---- Library & tracking -----------------------------------------------------

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
  useEffect(() => {
    if (!data) return
    setAnimeEpMin(data['stats.animeEpMinutes'] ?? '24')
    setTvEpMin(data['stats.tvEpMinutes'] ?? '40')
    setMangaChMin(data['stats.mangaChapterMinutes'] ?? '5')
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
          page to estimate time spent on anime, TV and manga. Only used as a fallback when a title
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
      <TextSetting
        settingKey="rawg.api_key"
        data={data}
        onSave={onSave}
        title="RAWG API key"
        type="password"
        placeholder="Paste your RAWG API key…"
        description={
          <>
            Required to import games. Get a free key at{' '}
            <span className="text-gray-400">rawg.io/apidocs</span>. Stored locally on this machine
            only.
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

// PC↔phone sync: a LAN server the Android companion connects to. Button-only
// like every online feature — it listens ONLY while started here, and pairing
// shows a 6-digit code the phone must echo back.
function SyncSettings() {
  const qc = useQueryClient()
  const { data: status } = useQuery({
    queryKey: qk.sync.status,
    queryFn: () => api.sync.status(),
    // Poll while the server runs so pairing success and sync results show live.
    refetchInterval: (q) => (q.state.data?.running ? 1500 : false)
  })

  async function refresh() {
    await qc.invalidateQueries({ queryKey: qk.sync.all })
  }

  return (
    <SettingCard
      title="Phone sync"
      description="LAN server for the NaviHUB Android app. Start it, open the app on the phone (same Wi-Fi), and press Sync there. Pairing a phone shows a 6-digit code here that the phone asks for once. The server only runs while started — stop it when you're done."
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {status?.running ? (
          <button className="btn-ghost" onClick={async () => (await api.sync.stop(), refresh())}>
            Stop server
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={async () => (await api.sync.start(false), refresh())}
          >
            Start server
          </button>
        )}
        <button className="btn-ghost" onClick={async () => (await api.sync.start(true), refresh())}>
          Pair a phone
        </button>
        {status?.pairedDevice && (
          <button className="btn-ghost" onClick={async () => (await api.sync.unpair(), refresh())}>
            Unpair
          </button>
        )}
      </div>

      {status?.running && (
        <div className="text-sm space-y-1 mb-3">
          <p className="text-green-400">
            Listening on{' '}
            {status.addresses.length ? status.addresses.join(' · ') : `port ${status.port}`}
          </p>
          {status.pairingCode && (
            <p>
              <span className="text-gray-400">Pairing code: </span>
              <span className="text-accent text-xl tracking-[0.3em]">{status.pairingCode}</span>
            </p>
          )}
        </div>
      )}

      <div className="text-sm text-gray-400 space-y-1">
        <p>
          Paired phone:{' '}
          {status?.pairedDevice ? (
            <span className="text-gray-200">{status.pairedDevice}</span>
          ) : (
            <span className="text-gray-500">none yet</span>
          )}
        </p>
        {status?.lastSync && (
          <p>
            Last sync: {status.lastSync.device} · {status.lastSync.applied} applied
            {status.lastSync.skipped > 0 && (
              <span className="text-yellow-400"> · {status.lastSync.skipped} skipped</span>
            )}{' '}
            · {new Date(status.lastSync.at).toLocaleString()}
          </p>
        )}
        {status?.error && <p className="text-red-400">{status.error}</p>}
      </div>
    </SettingCard>
  )
}

// Offline Japanese dictionaries: install JMdict/KANJIDIC with one click, import
// any other Yomitan .zip, watch import progress, and remove installed ones.
function DictionarySettings() {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { data: dicts = [] } = useQuery({
    queryKey: qk.dict.list,
    queryFn: () => api.dict.list()
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
      await qc.invalidateQueries({ queryKey: qk.dict.all })
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setBusy(false)
    }
  }

  const running = busy && status?.running
  const phaseLabel: Record<string, string> = {
    downloading: 'Downloading',
    reading: 'Reading',
    terms: 'Importing words',
    kanji: 'Importing kanji',
    pitch: 'Importing pitch accent',
    tags: 'Importing tags',
    finalizing: 'Finalizing'
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
      {dicts.length > 0 && (
        <div className="mb-4 space-y-1.5">
          {dicts.map((d) => (
            <div
              key={d.id}
              className="flex items-center gap-3 rounded-md border border-base-700 bg-base-800 p-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{d.title}</p>
                <p className="text-xs text-gray-500">
                  {d.termCount > 0 && <span>{d.termCount.toLocaleString()} words</span>}
                  {d.termCount > 0 && d.kanjiCount > 0 && ' · '}
                  {d.kanjiCount > 0 && <span>{d.kanjiCount.toLocaleString()} kanji</span>}
                  {d.revision && <span className="ml-1 text-gray-600">· {d.revision}</span>}
                </p>
              </div>
              <button
                className="btn-ghost shrink-0 py-1 px-2 text-xs text-gray-500 hover:text-red-400"
                disabled={busy}
                onClick={() => {
                  if (window.confirm(`Remove "${d.title}"?`)) void run(() => api.dict.remove(d.id))
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {running && status && (
        <div className="mb-4">
          <p className="mb-1 text-xs text-gray-400">
            {phaseLabel[status.phase] ?? status.phase}
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

      <div className="flex flex-wrap gap-2">
        <button
          className="btn-ghost"
          disabled={busy}
          onClick={() => void run(() => api.dict.importPreset('jmdict-en'))}
        >
          ⬇ Download JMdict (EN)
        </button>
        <button
          className="btn-ghost"
          disabled={busy}
          onClick={() => void run(() => api.dict.importPreset('kanjidic-en'))}
        >
          ⬇ Download KANJIDIC (EN)
        </button>
        <button
          className="btn-ghost"
          disabled={busy}
          onClick={() => void run(() => api.dict.importZip())}
        >
          Import Yomitan .zip…
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">Import failed: {error}</p>}
    </SettingCard>
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
