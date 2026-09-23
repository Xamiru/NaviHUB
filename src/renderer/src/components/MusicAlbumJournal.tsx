import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicAlbumPersonalInput, MusicListen, MusicListenInput } from '@shared/types'
import { MUSIC_SHELVES, parseMusicTags } from '@shared/musicPersonal'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { localInputDate, useHobbyAction } from '../lib/hobbyForms'
import { usePersistedState } from '../lib/navState'
import { confirmDialog } from '../lib/confirm'
import Section from './Section'
import { Field } from './Field'
import Pager from './Pager'

export default function MusicAlbumJournal({ albumId }: { albumId: number }) {
  const qc = useQueryClient()
  const [editing, setEditing] = useState(false)
  const [entriesOpen, setEntriesOpen] = useState(false)
  const [entry, setEntry] = useState<MusicListen | 'new' | null>(null)
  const [page, setPage] = usePersistedState(`music.listens.${albumId}`, 0)
  const action = useHobbyAction()
  const profile = useQuery({
    queryKey: qk.music.personalAlbum(albumId),
    queryFn: () => api.musicJournal.album(albumId)
  })
  const listens = useQuery({
    queryKey: qk.music.listens(albumId, page),
    queryFn: () => api.musicJournal.listens(albumId, page)
  })
  const refresh = () => qc.invalidateQueries({ queryKey: qk.music.all })
  return (
    <Section title="My listening journal" className="my-8">
      {profile.isLoading ? (
        <p className="text-sm text-ink-muted">Loading album notes…</p>
      ) : profile.isError || !profile.data ? (
        <p role="alert">
          Could not load album notes.{' '}
          <button className="btn" onClick={() => void profile.refetch()}>
            Retry album notes
          </button>
        </p>
      ) : (
        <>
          {editing ? (
            <AlbumEditor
              value={profile.data}
              onClose={() => setEditing(false)}
              onSave={async (value) => {
                await api.musicJournal.saveAlbum(albumId, value)
                setEditing(false)
                await refresh()
              }}
            />
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-lg font-semibold">
                  {profile.data.rating === null ? 'Unrated' : `${profile.data.rating} / 10`}
                </p>
                {profile.data.shelf && (
                  <span className="chip">{MUSIC_SHELVES[profile.data.shelf]}</span>
                )}
                <button className="btn" onClick={() => setEditing(true)}>
                  Edit album notes
                </button>
                <button className="btn-primary" onClick={() => setEntry('new')}>
                  Log a listen
                </button>
                <Link className="btn-ghost" to="/music/journal">
                  Browse my journal
                </Link>
              </div>
              {profile.data.review ? (
                <p className="mt-4 max-w-3xl whitespace-pre-wrap text-sm leading-relaxed">
                  {profile.data.review}
                </p>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">
                  Save your impression, choose a listening shelf, and tag the album for your smart
                  playlists.
                </p>
              )}
              {!!profile.data.tags.length && (
                <p className="mt-3 text-sm text-ink-muted">Tags: {profile.data.tags.join(', ')}</p>
              )}
            </>
          )}
        </>
      )}
      {entry && (
        <ListenEditor
          key={entry === 'new' ? 'new' : entry.id}
          value={
            entry === 'new' ? { listenedOn: localInputDate(), rating: null, notes: '' } : entry
          }
          onClose={() => setEntry(null)}
          onSave={async (value) => {
            await api.musicJournal.saveListen(albumId, entry === 'new' ? null : entry.id, value)
            setEntry(null)
            setEntriesOpen(true)
            setPage(0)
            await refresh()
          }}
        />
      )}
      <details
        className="mt-5"
        open={entriesOpen}
        onToggle={(e) => setEntriesOpen(e.currentTarget.open)}
      >
        <summary className="cursor-pointer text-sm font-medium">
          Listening entries{listens.data ? ` (${listens.data.total})` : ''}
        </summary>
        <p className="mt-2 text-xs text-ink-muted">
          Your dated impressions. Logging a listen leaves playback counts and your album rating
          unchanged.
        </p>
        {listens.isLoading ? (
          <p className="mt-3 text-sm text-ink-muted">Loading listening entries…</p>
        ) : listens.isError || !listens.data ? (
          <p className="mt-3" role="alert">
            Could not load listening entries.{' '}
            <button className="btn" onClick={() => void listens.refetch()}>
              Retry entries
            </button>
          </p>
        ) : (
          <>
            {!listens.data.items.length && (
              <p className="mt-3 text-sm text-ink-muted">No listening entries on this page.</p>
            )}
            {listens.data.items.map((item) => (
              <article key={item.id} className="border-b border-line-subtle py-4">
                <p className="text-sm font-medium">
                  {item.listenedOn}
                  {item.rating !== null && ` · ${item.rating} / 10`}
                </p>
                {item.notes && (
                  <p className="mt-2 max-w-3xl whitespace-pre-wrap text-sm">{item.notes}</p>
                )}
                <div className="mt-2 flex gap-2">
                  <button className="btn-ghost" onClick={() => setEntry(item)}>
                    Edit listen <span className="sr-only">{item.listenedOn}</span>
                  </button>
                  <button
                    className="btn-ghost"
                    disabled={action.busy}
                    onClick={() =>
                      void action.run(async () => {
                        if (
                          !(await confirmDialog('Delete this listening entry?', { danger: true }))
                        )
                          return
                        await api.musicJournal.removeListen(albumId, item.id)
                        setPage(0)
                        await refresh()
                      })
                    }
                  >
                    Delete listen <span className="sr-only">{item.listenedOn}</span>
                  </button>
                </div>
              </article>
            ))}
            <Pager page={page} pageCount={Math.ceil(listens.data.total / 50)} onChange={setPage} />
          </>
        )}
      </details>
    </Section>
  )
}
function AlbumEditor({
  value,
  onClose,
  onSave
}: {
  value: MusicAlbumPersonalInput
  onClose: () => void
  onSave: (v: MusicAlbumPersonalInput) => Promise<void>
}) {
  const [form, setForm] = useState(value)
  const [tags, setTags] = useState(value.tags.join(', '))
  const action = useHobbyAction()
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave({ ...form, tags: parseMusicTags(tags) }))
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Album rating (0–10)">
          <input
            className="input"
            type="number"
            min={0}
            max={10}
            step="0.1"
            value={form.rating ?? ''}
            onChange={(e) =>
              setForm({ ...form, rating: e.target.value === '' ? null : Number(e.target.value) })
            }
          />
        </Field>
        <Field label="Listening shelf">
          <select
            className="input"
            value={form.shelf ?? ''}
            onChange={(e) =>
              setForm({
                ...form,
                shelf: (e.target.value || null) as MusicAlbumPersonalInput['shelf']
              })
            }
          >
            <option value="">No shelf</option>
            {Object.entries(MUSIC_SHELVES).map(([key, label]) => (
              <option value={key} key={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field
        label="Album tags"
        description="Separate tags with commas, such as instrumental, study. Album tags also match every track in smart playlists."
      >
        <input
          className="input"
          maxLength={1800}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Field>
      <Field label="Album review">
        <textarea
          className="input min-h-32"
          maxLength={10000}
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
        />
      </Field>
      <div className="flex gap-2">
        <button className="btn-primary" type="submit" disabled={action.busy}>
          Save album notes
        </button>
        <button className="btn-ghost" type="button" disabled={action.busy} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}
function ListenEditor({
  value,
  onClose,
  onSave
}: {
  value: MusicListenInput
  onClose: () => void
  onSave: (v: MusicListenInput) => Promise<void>
}) {
  const [form, setForm] = useState(value)
  const action = useHobbyAction()
  return (
    <form
      className="my-5 space-y-4 border-y border-line-subtle py-5"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(() => onSave(form))
      }}
    >
      <h3 className="text-lg font-semibold">Listening entry</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Listening date">
          <input
            className="input"
            type="date"
            required
            value={form.listenedOn}
            onChange={(e) => setForm({ ...form, listenedOn: e.target.value })}
          />
        </Field>
        <Field label="Rating for this listen (0–10)">
          <input
            className="input"
            type="number"
            min={0}
            max={10}
            step="0.1"
            value={form.rating ?? ''}
            onChange={(e) =>
              setForm({ ...form, rating: e.target.value === '' ? null : Number(e.target.value) })
            }
          />
        </Field>
      </div>
      <Field label="Listening notes">
        <textarea
          className="input min-h-28"
          maxLength={10000}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </Field>
      <div className="flex gap-2">
        <button className="btn-primary" type="submit" disabled={action.busy}>
          Save listening entry
        </button>
        <button className="btn-ghost" type="button" disabled={action.busy} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  )
}
