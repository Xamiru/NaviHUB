import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useSettings } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { MEDIA_CONFIGS, type MediaConfig } from '../lib/mediaConfig'
import type { YtDlpDetectResult } from '@shared/types'

export default function SettingsPage() {
  const { data } = useSettings()
  const qc = useQueryClient()

  const [scoreMax, setScoreMax] = useState('10')
  const [animeEpMin, setAnimeEpMin] = useState('24')
  const [tvEpMin, setTvEpMin] = useState('40')
  const [mangaChMin, setMangaChMin] = useState('5')
  const [tmdbKey, setTmdbKey] = useState('')
  const [omdbKey, setOmdbKey] = useState('')
  const [rawgKey, setRawgKey] = useState('')
  const [audioDir, setAudioDir] = useState('')
  const [mangaDir, setMangaDir] = useState('')
  const [musicDir, setMusicDir] = useState('')
  const [ytdlpPath, setYtdlpPath] = useState('')
  const [ytdlpCheck, setYtdlpCheck] = useState<YtDlpDetectResult | null>(null)
  const [savedAt, setSavedAt] = useState<string | null>(null)

  useEffect(() => {
    if (!data) return
    setScoreMax(data['score.max'] ?? '10')
    setAnimeEpMin(data['stats.animeEpMinutes'] ?? '24')
    setTvEpMin(data['stats.tvEpMinutes'] ?? '40')
    setMangaChMin(data['stats.mangaChapterMinutes'] ?? '5')
    setTmdbKey(data['tmdb.api_key'] ?? '')
    setOmdbKey(data['omdb.api_key'] ?? '')
    setRawgKey(data['rawg.api_key'] ?? '')
    setAudioDir(data['audio.dir'] ?? '')
    setMangaDir(data['manga.dir'] ?? '')
    setMusicDir(data['music.dir'] ?? '')
    setYtdlpPath(data['ytdlp.path'] ?? '')
  }, [data])

  async function testYtdlp() {
    setYtdlpCheck(null)
    await api.settings.set('ytdlp.path', ytdlpPath.trim())
    await qc.invalidateQueries({ queryKey: qk.settings.all })
    setYtdlpCheck(await api.music.downloadDetect())
  }

  async function setKey(key: string, value: string) {
    await api.settings.set(key, value)
    await qc.invalidateQueries({ queryKey: qk.settings.all })
    setSavedAt('Saved')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {MEDIA_CONFIGS.map((cfg) => (
        <StatusEditor key={cfg.key} cfg={cfg} data={data} onSave={setKey} />
      ))}

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">Score scale</h2>
        <p className="text-sm text-gray-500 mb-4">Maximum score value (e.g. 10 or 100).</p>
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
            onClick={() => setKey('score.max', String(Math.max(1, Number(scoreMax) || 10)))}
          >
            Save
          </button>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">Time stats estimates</h2>
        <p className="text-sm text-gray-500 mb-4">
          Per-unit minutes used on the{' '}
          <Link to="/stats" className="text-accent hover:underline">
            Stats
          </Link>{' '}
          page to estimate time spent on anime, TV and manga. Only used as a fallback when a
          title has no real runtime from AniList/TMDB — re-import to fill those in. Games and
          visual novels use your logged playtime directly (no estimate).
        </p>
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
                setKey('stats.animeEpMinutes', String(Math.max(1, Number(animeEpMin) || 24)))
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
              onBlur={() => setKey('stats.tvEpMinutes', String(Math.max(1, Number(tvEpMin) || 40)))}
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
                setKey('stats.mangaChapterMinutes', String(Math.max(1, Number(mangaChMin) || 5)))
              }
            />
          </label>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">TMDB API key</h2>
        <p className="text-sm text-gray-500 mb-4">
          Required to import movies. Get a free key at{' '}
          <span className="text-gray-400">themoviedb.org → Settings → API</span> (the v3 “API Key”).
          Stored locally on this machine only.
        </p>
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="password"
            value={tmdbKey}
            onChange={(e) => setTmdbKey(e.target.value)}
            placeholder="Paste your TMDB API key…"
          />
          <button className="btn-ghost shrink-0" onClick={() => setKey('tmdb.api_key', tmdbKey.trim())}>
            Save
          </button>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">OMDb API key</h2>
        <p className="text-sm text-gray-500 mb-4">
          Optional. Adds IMDb rating + Rotten Tomatoes to movies/TV on import. Get a free key at{' '}
          <span className="text-gray-400">omdbapi.com → API Key</span> (1,000 lookups/day). Stored
          locally on this machine only.
        </p>
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="password"
            value={omdbKey}
            onChange={(e) => setOmdbKey(e.target.value)}
            placeholder="Paste your OMDb API key…"
          />
          <button className="btn-ghost shrink-0" onClick={() => setKey('omdb.api_key', omdbKey.trim())}>
            Save
          </button>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">RAWG API key</h2>
        <p className="text-sm text-gray-500 mb-4">
          Required to import games. Get a free key at{' '}
          <span className="text-gray-400">rawg.io/apidocs</span>. Stored locally on this machine
          only.
        </p>
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="password"
            value={rawgKey}
            onChange={(e) => setRawgKey(e.target.value)}
            placeholder="Paste your RAWG API key…"
          />
          <button className="btn-ghost shrink-0" onClick={() => setKey('rawg.api_key', rawgKey.trim())}>
            Save
          </button>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">Anime music folder</h2>
        <p className="text-sm text-gray-500 mb-4">
          Where downloaded opening/ending audio is stored. Point it at a roomier
          drive to save space — songs are a few MB each and add up. Leave blank to
          use the default app folder. Changing this only affects newly-downloaded
          songs; existing files stay where they were saved.
        </p>
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="text"
            value={audioDir}
            onChange={(e) => setAudioDir(e.target.value)}
            placeholder="/media/you/Drive/Music/Anime"
          />
          <button className="btn-ghost shrink-0" onClick={() => setKey('audio.dir', audioDir.trim())}>
            Save
          </button>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">Manga library folder</h2>
        <p className="text-sm text-gray-500 mb-4">
          The root folder your manga lives in. Set automatically the first time you link a series
          folder from a manga page; chapter paths are stored relative to this root, so if you move
          the library, just update this to the new location.
        </p>
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="text"
            value={mangaDir}
            onChange={(e) => setMangaDir(e.target.value)}
            placeholder="/home/you/Manga"
          />
          <button className="btn-ghost shrink-0" onClick={() => setKey('manga.dir', mangaDir.trim())}>
            Save
          </button>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">Music library folder</h2>
        <p className="text-sm text-gray-500 mb-4">
          The root folder your music lives in (artists as folders, albums inside them). Set
          automatically when you pick a folder on the Music page; tracks are stored relative to this
          root, so if you move the library, just update this and rescan.
        </p>
        <div className="flex items-center gap-2">
          <input
            className="input"
            type="text"
            value={musicDir}
            onChange={(e) => setMusicDir(e.target.value)}
            placeholder="/home/you/Music"
          />
          <button className="btn-ghost shrink-0" onClick={() => setKey('music.dir', musicDir.trim())}>
            Save
          </button>
        </div>
      </section>

      <section className="card p-5 mb-6">
        <h2 className="font-semibold mb-1">yt-dlp (music downloads)</h2>
        <p className="text-sm text-gray-500 mb-4">
          Used by the Music page&apos;s Download button. Install yt-dlp and ffmpeg yourself (e.g.{' '}
          <span className="text-gray-400">pipx install yt-dlp</span> or your package manager) and
          keep yt-dlp updated — YouTube changes often. Leave blank to use{' '}
          <span className="text-gray-400">yt-dlp</span> from PATH, or set a full binary path.
        </p>
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
                ⚠ This yt-dlp is over 3 months old — update it (yt-dlp -U or your package manager)
                if downloads fail.
              </span>
            )}
          </p>
        )}
      </section>

      <DictionarySettings />

      {savedAt && <p className="text-sm text-green-400">{savedAt}</p>}
    </div>
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
    <section className="card p-5 mb-6">
      <h2 className="font-semibold mb-1">Japanese dictionaries</h2>
      <p className="text-sm text-gray-500 mb-4">
        Offline dictionaries power the Japanese section&apos;s lookup, word mining and the manga
        reader. Install JMdict and KANJIDIC with one click; import pitch-accent, grammar (DOJG) and
        和英 dictionaries as Yomitan <span className="text-gray-400">.zip</span> files exported from
        the extension. Large one-time downloads (JMdict is ~60&nbsp;MB); everything then works with
        no network.
      </p>

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
        <button className="btn-ghost" disabled={busy} onClick={() => void run(() => api.dict.importZip())}>
          Import Yomitan .zip…
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">Import failed: {error}</p>}
    </section>
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
    <section className="card p-5 mb-6">
      <h2 className="font-semibold mb-1">{cfg.singular} statuses</h2>
      <p className="text-sm text-gray-500 mb-4">
        Customize the status options used when logging {cfg.plural.toLowerCase()}. Order here is the
        order shown in filters and forms.
      </p>

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
    </section>
  )
}
