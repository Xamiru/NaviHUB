import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  SoundtrackInput,
  SoundtrackLink,
  SoundtrackOwner,
  SoundtrackTarget
} from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { playTracks } from '../lib/musicTracks'
import { useHobbyAction } from '../lib/hobbyForms'
import { useDebouncedValue } from '../lib/hooks'
import { configFor } from '../lib/mediaConfig'
import { confirmDialog } from '../lib/confirm'
import { Field } from './Field'
import Section from './Section'

export default function SoundtrackSection({
  owner,
  tracks = []
}: {
  owner: SoundtrackOwner
  tracks?: { id: number; title: string }[]
}) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const action = useHobbyAction()
  const [editor, setEditor] = useState<SoundtrackLink | 'new' | null>(null)
  const query = useQuery({
    queryKey: qk.soundtracks.list(owner.kind, owner.id),
    queryFn: () => api.soundtracks.list(owner)
  })
  const refresh = async () => {
    await qc.invalidateQueries({ queryKey: qk.soundtracks.all })
    await qc.invalidateQueries({ queryKey: qk.music.all })
  }
  const fromMusic = owner.kind === 'album' || owner.kind === 'track'
  return (
    <Section
      title={
        fromMusic
          ? 'Associated works and wrestlers'
          : owner.kind === 'wrestler'
            ? 'Entrance themes'
            : 'Soundtracks'
      }
      className="my-6"
    >
      {query.isLoading ? (
        <p className="text-sm text-ink-muted">Loading music links…</p>
      ) : query.isError ? (
        <p role="alert">
          Could not load links.{' '}
          <button className="btn" onClick={() => void query.refetch()}>
            Retry music links
          </button>
        </p>
      ) : (
        <>
          {query.data?.map((link) => (
            <article key={link.id} className="border-b border-line-subtle py-3">
              <p className="font-medium">
                <Link className="text-accent" to={`/music/albums/${link.albumId}`}>
                  {link.musicTitle}
                </Link>
                <span className="px-2 text-xs text-ink-muted">{link.music.kind}</span>
                <Link
                  className="text-accent"
                  to={
                    link.target.kind === 'wrestler'
                      ? `/wrestling/wrestler/${link.target.id}`
                      : `${configFor(link.mediaType!).basePath}/${link.target.id}`
                  }
                >
                  {link.targetTitle}
                </Link>
              </p>
              {link.label && <p className="mt-1 text-sm">{link.label}</p>}
              {link.notes && (
                <p className="mt-1 whitespace-pre-wrap text-sm text-ink-muted">{link.notes}</p>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  className="btn"
                  disabled={action.busy}
                  onClick={() =>
                    void action.run(async () => {
                      const songs = await api.soundtracks.tracks(link.id)
                      if (!songs.length) throw new Error('No local tracks remain for this link')
                      playTracks(player, songs)
                    })
                  }
                >
                  Play <span className="sr-only">{link.musicTitle}</span>
                </button>
                <button className="btn-ghost" onClick={() => setEditor(link)}>
                  Edit link <span className="sr-only">{link.musicTitle}</span>
                </button>
                <button
                  className="btn-ghost"
                  disabled={action.busy}
                  onClick={() =>
                    void action.run(async () => {
                      if (
                        await confirmDialog(
                          'Remove this association? The local music files remain.'
                        )
                      ) {
                        await api.soundtracks.remove(link.id)
                        await refresh()
                      }
                    })
                  }
                >
                  Unlink <span className="sr-only">{link.musicTitle}</span>
                </button>
              </div>
            </article>
          ))}
          {!query.data?.length && (
            <p className="mb-3 text-sm text-ink-muted">
              Link a local album or individual track, with your own relationship label and notes.
            </p>
          )}
          {editor ? (
            <LinkEditor
              key={editor === 'new' ? 'new' : editor.id}
              owner={owner}
              tracks={tracks}
              value={editor === 'new' ? null : editor}
              onClose={() => setEditor(null)}
              onSave={async (value) => {
                await api.soundtracks.save(editor === 'new' ? null : editor.id, value)
                await refresh()
                setEditor(null)
              }}
            />
          ) : (
            <button className="btn-ghost mt-3" onClick={() => setEditor('new')}>
              Link local music
            </button>
          )}
        </>
      )}
    </Section>
  )
}
function LinkEditor({
  owner,
  tracks,
  value,
  onSave,
  onClose
}: {
  owner: SoundtrackOwner
  tracks: { id: number; title: string }[]
  value: SoundtrackLink | null
  onSave: (input: SoundtrackInput) => Promise<void>
  onClose: () => void
}) {
  const fromMusic = owner.kind === 'album' || owner.kind === 'track'
  const [kind, setKind] = useState<SoundtrackOwner['kind']>(fromMusic ? 'media' : 'album')
  const [search, setSearch] = useState('')
  const [chosen, setChosen] = useState<SoundtrackTarget | null>(null)
  const [trackId, setTrackId] = useState<number | null>(null)
  const [label, setLabel] = useState(value?.label ?? '')
  const [notes, setNotes] = useState(value?.notes ?? '')
  const action = useHobbyAction()
  const debounced = useDebouncedValue(search, 250)
  const results = useQuery({
    queryKey: qk.soundtracks.search(kind, debounced),
    queryFn: () => api.soundtracks.search(kind, debounced),
    enabled: !value && !!debounced.trim()
  })
  function input(): SoundtrackInput {
    if (value) return { music: value.music, target: value.target, label, notes }
    if (!chosen) throw new Error('Choose an item to link')
    const music = fromMusic
      ? {
          kind: trackId ? ('track' as const) : (owner.kind as 'album' | 'track'),
          id: trackId ?? owner.id
        }
      : { kind: chosen.kind as 'album' | 'track', id: chosen.id }
    const target = fromMusic
      ? { kind: chosen.kind as 'media' | 'wrestler', id: chosen.id }
      : { kind: owner.kind as 'media' | 'wrestler', id: owner.id }
    return { music, target, label, notes }
  }
  return (
    <form
      aria-label="Soundtrack association"
      className="mt-4 max-w-xl space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(input()))
      }}
    >
      {!value && (
        <>
          {owner.kind === 'album' && tracks.length > 0 && (
            <Field label="Music source">
              <select
                className="input w-full"
                value={trackId ?? ''}
                onChange={(e) => setTrackId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Whole album</option>
                {tracks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <Field label="Link to">
            <select
              className="input"
              value={kind}
              onChange={(e) => {
                setKind(e.target.value as SoundtrackOwner['kind'])
                setChosen(null)
              }}
            >
              {(fromMusic ? ['media', 'wrestler'] : ['album', 'track']).map((k) => (
                <option value={k} key={k}>
                  {k}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Search local library">
            <input
              className="input w-full"
              value={search}
              maxLength={200}
              onChange={(e) => {
                setSearch(e.target.value)
                setChosen(null)
              }}
            />
          </Field>
          {chosen ? (
            <p className="text-sm">
              Selected: {chosen.title} / {chosen.detail}
            </p>
          ) : results.isError ? (
            <p role="alert">
              Search failed.{' '}
              <button className="btn" type="button" onClick={() => void results.refetch()}>
                Retry search
              </button>
            </p>
          ) : results.isFetching ? (
            <p className="text-sm text-ink-muted">Searching…</p>
          ) : (
            <ul className="max-h-56 overflow-y-auto">
              {results.data?.map((r) => (
                <li key={r.id}>
                  <button
                    type="button"
                    className="btn-ghost w-full text-left"
                    onClick={() => setChosen(r)}
                  >
                    {r.title} <span className="text-xs text-ink-muted">{r.detail}</span>
                  </button>
                </li>
              ))}
              {results.data?.length === 0 && (
                <li className="text-sm text-ink-muted">No local matches.</li>
              )}
            </ul>
          )}
        </>
      )}
      <Field label="Relationship label">
        <input
          className="input w-full"
          placeholder="Original soundtrack, ending theme, entrance theme…"
          value={label}
          maxLength={150}
          onChange={(e) => setLabel(e.target.value)}
        />
      </Field>
      <Field label="Association notes">
        <textarea
          className="input w-full"
          rows={3}
          value={notes}
          maxLength={10000}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Field>
      <button className="btn-primary" disabled={action.busy || (!value && !chosen)}>
        Save association
      </button>{' '}
      <button className="btn-ghost" type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  )
}
