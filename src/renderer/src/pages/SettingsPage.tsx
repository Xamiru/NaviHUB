import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { useSettings } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { MEDIA_CONFIGS, type MediaConfig } from '../lib/mediaConfig'

export default function SettingsPage() {
  const { data } = useSettings()
  const qc = useQueryClient()

  const [scoreMax, setScoreMax] = useState('10')
  const [tmdbKey, setTmdbKey] = useState('')
  const [omdbKey, setOmdbKey] = useState('')
  const [rawgKey, setRawgKey] = useState('')
  const [audioDir, setAudioDir] = useState('')
  const [mangaDir, setMangaDir] = useState('')
  const [savedAt, setSavedAt] = useState<string | null>(null)

  useEffect(() => {
    if (!data) return
    setScoreMax(data['score.max'] ?? '10')
    setTmdbKey(data['tmdb.api_key'] ?? '')
    setOmdbKey(data['omdb.api_key'] ?? '')
    setRawgKey(data['rawg.api_key'] ?? '')
    setAudioDir(data['audio.dir'] ?? '')
    setMangaDir(data['manga.dir'] ?? '')
  }, [data])

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

      {savedAt && <p className="text-sm text-green-400">{savedAt}</p>}
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
