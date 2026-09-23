import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicSmartInput, MusicSmartPlaylist, MusicSmartRules } from '@shared/types'
import { DEFAULT_SMART_RULES, MUSIC_SHELVES, parseMusicTags } from '@shared/musicPersonal'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue } from '../lib/hooks'
import { useHobbyAction } from '../lib/hobbyForms'
import { usePersistedState } from '../lib/navState'
import { usePlayerControls } from '../lib/player'
import { playTracks, musicTrackToPlayerTrack } from '../lib/musicTracks'
import { confirmDialog } from '../lib/confirm'
import PageHeader from '../components/PageHeader'
import MusicTrackRow from '../components/MusicTrackRow'
import { Field } from '../components/Field'
import Pager from '../components/Pager'

export default function MusicSmartPage() {
  const { id } = useParams()
  const query = useQuery({ queryKey: qk.music.smart, queryFn: () => api.musicSmart.list() })
  const current = query.data?.find((p) => p.id === Number(id))
  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <PageHeader
        title="Smart playlists"
        subtitle="Save rules once. Matching tracks update as you listen, tag, and rate your library."
        actions={
          <Link className="btn-primary" to="/music/smart/new">
            New smart playlist
          </Link>
        }
      />
      {query.isLoading ? (
        <p className="text-sm text-ink-muted">Loading smart playlists…</p>
      ) : query.isError || !query.data ? (
        <p role="alert">
          Could not load smart playlists.{' '}
          <button className="btn" onClick={() => void query.refetch()}>
            Retry playlists
          </button>
        </p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Saved smart playlists" className="min-w-0">
            <h2 className="mb-3 text-sm font-semibold">Saved playlists</h2>
            {!query.data.length && <p className="text-sm text-ink-muted">No saved rules yet.</p>}
            <ul className="space-y-1">
              {query.data.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/music/smart/${p.id}`}
                    aria-current={current?.id === p.id ? 'page' : undefined}
                    className={`block break-words px-3 py-2 text-sm ${current?.id === p.id ? 'pill-active' : 'hover:bg-surface-raised'}`}
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0">
            {id === 'new' || current ? (
              <SmartEditor key={id} value={current ?? null} />
            ) : (
              <div className="border-y border-line-subtle py-8">
                <h2 className="text-lg font-semibold">
                  {id ? 'Smart playlist not found' : 'Choose a playlist or create your first'}
                </h2>
                <p className="mt-3 max-w-2xl text-sm text-ink-muted">
                  Try unheard soundtracks, rarely played favorites, or a study mix using your
                  personal tags. Everything matches against your local music library.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function SmartEditor({ value }: { value: MusicSmartPlaylist | null }) {
  const [form, setForm] = useState<MusicSmartInput>(
    value ?? { title: '', description: '', rules: { ...DEFAULT_SMART_RULES } }
  )
  const [baseline, setBaseline] = useState(
    JSON.stringify(
      value ? { title: value.title, description: value.description, rules: value.rules } : null
    )
  )
  const [tagText, setTagText] = useState(form.rules.tags.join(', '))
  const [page, setPage] = usePersistedState(`music.smartPage.${value?.id ?? 'new'}`, 0)
  const qc = useQueryClient()
  const navigate = useNavigate()
  const player = usePlayerControls()
  const action = useHobbyAction()
  const debouncedRules = useDebouncedValue(form.rules, 300)
  const preview = useQuery({
    queryKey: qk.music.smartPreview(debouncedRules, page),
    queryFn: () => api.musicSmart.preview(debouncedRules, page)
  })
  const knownTags = useQuery({
    queryKey: qk.music.personalTags,
    queryFn: () => api.musicJournal.tags()
  })
  const snapshot = JSON.stringify({
    title: form.title,
    description: form.description,
    rules: form.rules
  })
  const dirty = snapshot !== baseline
  const sourceSnapshot = JSON.stringify(
    value ? { title: value.title, description: value.description, rules: value.rules } : null
  )
  const previousSource = useRef(sourceSnapshot)
  const [conflict, setConflict] = useState(false)
  useEffect(() => {
    if (previousSource.current === sourceSnapshot) return
    previousSource.current = sourceSnapshot
    if (dirty) {
      setConflict(true)
    } else if (value) {
      setForm(value)
      setTagText(value.rules.tags.join(', '))
      setBaseline(sourceSnapshot)
    }
  }, [sourceSnapshot, dirty, value])
  function reloadSaved(): void {
    if (!value) return
    setForm(value)
    setTagText(value.rules.tags.join(', '))
    setBaseline(sourceSnapshot)
    setConflict(false)
  }
  const rulesPending = debouncedRules !== form.rules
  function rule<K extends keyof MusicSmartRules>(key: K, next: MusicSmartRules[K]) {
    setForm((f) => ({ ...f, rules: { ...f.rules, [key]: next } }))
    setPage(0)
  }
  function preset(title: string, rules: Partial<MusicSmartRules>) {
    const next = { ...DEFAULT_SMART_RULES, ...rules }
    setForm({ title, description: '', rules: next })
    setTagText(next.tags.join(', '))
    setPage(0)
  }
  async function play(shuffle: boolean, trackId?: number): Promise<void> {
    if (!value || dirty || conflict) return
    const tracks = await api.musicSmart.queue(value.id)
    if (!tracks.length) throw new Error('No tracks currently match this playlist')
    if (trackId !== undefined) {
      const index = tracks.findIndex((t) => t.id === trackId)
      if (index < 0) throw new Error('This track no longer matches. Refresh the preview.')
      player.playQueue(tracks.map(musicTrackToPlayerTrack), index)
    } else playTracks(player, tracks, { shuffle })
  }
  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          if (conflict) return
          void action.run(async () => {
            const saved = await api.musicSmart.save(value?.id ?? null, form)
            setBaseline(snapshot)
            await qc.invalidateQueries({ queryKey: qk.music.all })
            navigate(`/music/smart/${saved}`, { replace: true })
          })
        }}
      >
        <h2 className="text-xl font-semibold">
          {value ? 'Playlist rules' : 'Build a smart playlist'}
        </h2>
        {conflict && (
          <p role="alert" className="text-sm">
            Saved rules changed while you were editing.{' '}
            <button className="btn" type="button" onClick={reloadSaved}>
              Reload saved rules
            </button>
          </p>
        )}
        {!value && (
          <div className="flex flex-wrap gap-2" aria-label="Starting recipes">
            <button
              type="button"
              className="btn-ghost"
              onClick={() =>
                preset('Unheard soundtracks', { soundtrack: 'linked', playState: 'unplayed' })
              }
            >
              Unheard soundtracks
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() =>
                preset('Rediscover favorites', {
                  liked: 'liked',
                  notPlayedDays: 90,
                  order: 'oldestPlayed'
                })
              }
            >
              Rediscover favorites
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => preset('Study mix', { tags: ['study', 'instrumental'] })}
            >
              Study mix
            </button>
          </div>
        )}
        <Field label="Smart playlist name">
          <input
            className="input"
            required
            maxLength={200}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Field>
        <Field label="Playlist description">
          <input
            className="input"
            maxLength={2000}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>
        <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
          <Field
            label="Match personal tags"
            description="Comma-separated. A track inherits its album’s tags."
          >
            <input
              className="input"
              maxLength={1800}
              value={tagText}
              onChange={(e) => {
                setTagText(e.target.value)
                rule('tags', parseMusicTags(e.target.value))
              }}
            />
          </Field>
          <Field label="Tag match">
            <select
              className="input"
              value={form.rules.tagMode}
              onChange={(e) => rule('tagMode', e.target.value as MusicSmartRules['tagMode'])}
            >
              <option value="all">All of these tags</option>
              <option value="any">Any of these tags</option>
            </select>
          </Field>
        </div>
        {!!knownTags.data?.length && (
          <p className="text-xs text-ink-muted">Your tags: {knownTags.data.join(', ')}</p>
        )}
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Favorites">
            <select
              className="input"
              value={form.rules.liked}
              onChange={(e) => rule('liked', e.target.value as MusicSmartRules['liked'])}
            >
              <option value="any">Any track</option>
              <option value="liked">Liked songs only</option>
              <option value="unliked">Not liked</option>
            </select>
          </Field>
          <Field label="Listening history">
            <select
              className="input"
              value={form.rules.playState}
              onChange={(e) => rule('playState', e.target.value as MusicSmartRules['playState'])}
            >
              <option value="any">Any play count</option>
              <option value="unplayed">Never played</option>
              <option value="played">Played before</option>
            </select>
          </Field>
          <Field label="Soundtrack connections">
            <select
              className="input"
              value={form.rules.soundtrack}
              onChange={(e) => rule('soundtrack', e.target.value as MusicSmartRules['soundtrack'])}
            >
              <option value="any">Any track</option>
              <option value="linked">Linked to a work or wrestler</option>
              <option value="unlinked">No soundtrack link</option>
            </select>
          </Field>
        </div>
        <details className="border-y border-line-subtle py-3">
          <summary className="cursor-pointer text-sm font-medium">
            More filters: artist, album rating, shelf, and play dates
          </summary>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Artist contains">
              <input
                className="input"
                maxLength={200}
                value={form.rules.artist}
                onChange={(e) => rule('artist', e.target.value)}
              />
            </Field>
            <Field label="Album shelf">
              <select
                className="input"
                value={form.rules.shelf ?? ''}
                onChange={(e) =>
                  rule('shelf', (e.target.value || null) as MusicSmartRules['shelf'])
                }
              >
                <option value="">Any shelf</option>
                {Object.entries(MUSIC_SHELVES).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
            {(
              [
                ['minAlbumRating', 'Minimum album rating', 10, 0.1],
                ['notPlayedDays', 'Not played in the last N days', 36500, 1],
                ['minPlays', 'Minimum play count', 1000000, 1],
                ['maxPlays', 'Maximum play count', 1000000, 1]
              ] as const
            ).map(([key, label, max, step]) => (
              <Field
                key={key}
                label={label}
                description={
                  key === 'notPlayedDays'
                    ? 'Also includes tracks that have never played.'
                    : undefined
                }
              >
                <input
                  className="input"
                  type="number"
                  min={0}
                  max={max}
                  step={step}
                  value={form.rules[key] ?? ''}
                  onChange={(e) => rule(key, e.target.value === '' ? null : Number(e.target.value))}
                />
              </Field>
            ))}
          </div>
        </details>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Playlist order">
            <select
              className="input"
              value={form.rules.order}
              onChange={(e) => rule('order', e.target.value as MusicSmartRules['order'])}
            >
              <option value="title">Track title</option>
              <option value="leastPlayed">Least played first</option>
              <option value="recent">Recently played first</option>
              <option value="oldestPlayed">Longest since last played</option>
            </select>
          </Field>
          <Field label="Maximum tracks" description="Keep between 1 and 2,000 tracks.">
            <input
              className="input"
              type="number"
              min={1}
              max={2000}
              step={1}
              required
              value={form.rules.maxTracks}
              onChange={(e) => rule('maxTracks', Number(e.target.value))}
            />
          </Field>
        </div>
        <p className="text-xs text-ink-muted">
          All filters must match. Only the tags can use “any.” With no filters, the playlist
          includes your whole library up to the track limit.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            className="btn-primary"
            type="submit"
            disabled={
              action.busy || conflict || !form.title.trim() || preview.isError || rulesPending
            }
          >
            {value ? 'Save rules' : 'Create smart playlist'}
          </button>
          {value && (
            <button
              type="button"
              className="btn-ghost"
              disabled={action.busy}
              onClick={() =>
                void action.run(async () => {
                  if (
                    !(await confirmDialog(
                      `Delete “${value.title}”? Your audio files and other playlists remain.`,
                      { danger: true }
                    ))
                  )
                    return
                  await api.musicSmart.remove(value.id)
                  await qc.invalidateQueries({ queryKey: qk.music.all })
                  navigate('/music/smart', { replace: true })
                })
              }
            >
              Delete smart playlist
            </button>
          )}
        </div>
      </form>
      <section className="mt-8 border-t border-line-subtle pt-5" aria-label="Matching tracks">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Matching tracks</h2>
          <div className="flex gap-2">
            <button
              className="btn"
              disabled={!value || dirty || conflict || action.busy || !preview.data?.total}
              onClick={() => void action.run(() => play(false))}
            >
              Play playlist
            </button>
            <button
              className="btn"
              disabled={!value || dirty || conflict || action.busy || !preview.data?.total}
              onClick={() => void action.run(() => play(true))}
            >
              Shuffle playlist
            </button>
          </div>
        </div>
        {(!value || dirty) && (
          <p className="mb-3 text-xs text-ink-muted">Save these rules to play the playlist.</p>
        )}
        {preview.isLoading || rulesPending ? (
          <p className="text-sm text-ink-muted">Updating preview…</p>
        ) : preview.isError || !preview.data ? (
          <p role="alert">
            Could not preview these rules:{' '}
            {preview.error instanceof Error ? preview.error.message : 'Please retry.'}{' '}
            <button className="btn" onClick={() => void preview.refetch()}>
              Retry preview
            </button>
          </p>
        ) : (
          <>
            <p className="mb-3 text-sm text-ink-muted" role="status">
              {preview.data.total} tracks in this playlist · {preview.data.matching} match the rules
            </p>
            {!preview.data.total && (
              <p className="py-4 text-sm text-ink-muted">
                No tracks match yet. Adjust the rules or add tags from an album page or a track’s
                actions menu.
              </p>
            )}
            {preview.data.items.map((track, index) =>
              value && !dirty && !conflict ? (
                <MusicTrackRow
                  key={track.id}
                  track={track}
                  index={page * 50 + index + 1}
                  showAlbum
                  onPlay={() => void action.run(() => play(false, track.id))}
                />
              ) : (
                <div key={track.id} className="border-b border-line-subtle py-2">
                  <p className="text-sm">{track.title}</p>
                  <p className="text-xs text-ink-muted">
                    {track.artistName} · {track.albumTitle}
                  </p>
                </div>
              )
            )}
            <Pager page={page} pageCount={Math.ceil(preview.data.total / 50)} onChange={setPage} />
          </>
        )}
      </section>
    </>
  )
}
