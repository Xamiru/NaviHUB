import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { type MediaConfig } from '../../lib/mediaConfig'
import { Field } from '../../components/Field'
import { confirmDialog } from '../../lib/confirm'
import { type SaveFn, SettingCard } from './shared'

// ---- Library & tracking -----------------------------------------------------



export function ScoreSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
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
        {(savedScoreMax ?? '10') !== '10' && (
          <button className="btn-ghost" onClick={() => onSave('score.max', '10')}>
            Reset to 10
          </button>
        )}
      </div>
    </SettingCard>
  )
}

const TIME_STATS_DEFAULTS: Record<string, string> = {
  'stats.animeEpMinutes': '24',
  'stats.tvEpMinutes': '40',
  'stats.mangaChapterMinutes': '5',
  'stats.bookPageMinutes': '1.5'
}

export function TimeStatsSettings({ data, onSave }: { data?: Record<string, string>; onSave: SaveFn }) {
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
      <button
        type="button"
        className="btn-ghost mt-4"
        onClick={async () => {
          if (!(await confirmDialog('Reset the time estimates to 24, 40, 5 and 1.5 minutes?', { confirmLabel: 'Reset' }))) return
          for (const [key, value] of Object.entries(TIME_STATS_DEFAULTS)) await onSave(key, value)
        }}
      >
        Reset to defaults
      </button>
    </SettingCard>
  )
}

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

  // `replacing` names statuses the new list no longer has; any still in use by
  // a title blocks the save, so no title is left on a status nothing shows.
  async function persist(next: string[], replacing?: string | string[]): Promise<boolean> {
    if (saving) return false
    setSaving(true)
    setError(null)
    try {
      for (const status of replacing == null ? [] : ([] as string[]).concat(replacing)) {
        const page = await api.media.listPage({
          filter: { mediaType: cfg.key, status },
          offset: 0,
          limit: 24
        })
        if (page.total > 0) {
          setError(`“${status}” is used by ${page.total} titles. Change those titles to another status first.`)
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

  const customised = JSON.stringify(statuses) !== JSON.stringify(cfg.defaultStatuses)

  async function resetStatuses(): Promise<void> {
    const ok = await confirmDialog(
      `Reset ${cfg.singular.toLowerCase()} statuses to ${cfg.defaultStatuses.join(', ')}?`,
      { confirmLabel: 'Reset' }
    )
    if (!ok) return
    await persist(
      cfg.defaultStatuses,
      statuses.filter((status) => !cfg.defaultStatuses.includes(status))
    )
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
        {customised && (
          <button className="btn-ghost" disabled={saving} onClick={() => void resetStatuses()}>
            Reset to defaults
          </button>
        )}
      </div>
    </SettingCard>
  )
}
