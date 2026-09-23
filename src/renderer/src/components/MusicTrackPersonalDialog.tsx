import { useId, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicTrack, MusicTrackPersonal } from '@shared/types'
import { parseMusicTags } from '@shared/musicPersonal'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useHobbyAction } from '../lib/hobbyForms'
import Dialog from './Dialog'
import { Field } from './Field'

export default function MusicTrackPersonalDialog({
  track,
  onClose
}: {
  track: MusicTrack
  onClose: () => void
}) {
  const id = useId()
  const query = useQuery({
    queryKey: qk.music.personalTrack(track.id),
    queryFn: () => api.musicJournal.track(track.id)
  })
  return (
    <Dialog
      labelledBy={id}
      onClose={onClose}
      panelClassName="w-full max-w-lg rounded-lg border border-line-subtle bg-surface-panel p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={id} className="text-lg font-semibold">
          Tags and standout track: {track.title}
        </h2>
        <button className="btn-ghost" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
      {query.isLoading ? (
        <p className="text-sm text-ink-muted">Loading track tags…</p>
      ) : query.isError || !query.data ? (
        <p role="alert">
          Could not load track tags.{' '}
          <button className="btn" onClick={() => void query.refetch()}>
            Retry track tags
          </button>
        </p>
      ) : (
        <TrackEditor value={query.data} onClose={onClose} />
      )}
    </Dialog>
  )
}
function TrackEditor({ value, onClose }: { value: MusicTrackPersonal; onClose: () => void }) {
  const [tags, setTags] = useState(value.tags.join(', '))
  const [standout, setStandout] = useState(value.standout)
  const action = useHobbyAction()
  const qc = useQueryClient()
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault()
        void action.run(async () => {
          await api.musicJournal.saveTrack({
            trackId: value.trackId,
            standout,
            tags: parseMusicTags(tags)
          })
          await qc.invalidateQueries({ queryKey: qk.music.all })
          onClose()
        })
      }}
    >
      <Field
        label="Track tags"
        description="Separate tags with commas. Smart playlists also include tags from this track’s album."
      >
        <input
          className="input"
          maxLength={1800}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </Field>
      <Field label="Standout track on this album">
        <input type="checkbox" checked={standout} onChange={(e) => setStandout(e.target.checked)} />
      </Field>
      <p className="text-xs text-ink-muted">Standout marks are separate from Liked Songs.</p>
      <button className="btn-primary" type="submit" disabled={action.busy}>
        Save track tags
      </button>
    </form>
  )
}
