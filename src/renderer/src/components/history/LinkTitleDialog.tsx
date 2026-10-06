import { useId, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { MEDIA_LINK_KINDS, type MediaLinkKind } from '@shared/history/schema'
import Dialog from '../Dialog'
import CoverImage from '../CoverImage'
import { Field } from '../Field'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue } from '../../lib/hooks'
import { configFor } from '../../lib/mediaConfig'

// Links a title already in the library to a History page, as the user's own
// link on this machine. Curated links come from research sessions.

export default function LinkTitleDialog({ target, targetTitle, person, onClose }: { target: string; targetTitle: string; person: boolean; onClose: () => void }) {
  const titleId = useId()
  const queryClient = useQueryClient()
  const [q, setQ] = useState('')
  const [kind, setKind] = useState<MediaLinkKind>(person ? 'features-person' : 'set-during')
  const debounced = useDebouncedValue(q, 200).trim()
  const { data } = useQuery({ queryKey: qk.search(debounced), queryFn: () => api.search.global(debounced), enabled: debounced.length > 1 })
  const media = data?.media.slice(0, 12) ?? []
  const kinds = (Object.keys(MEDIA_LINK_KINDS) as MediaLinkKind[]).filter((k) => (person ? k === 'features-person' || k === 'documentary-about' : k !== 'features-person'))

  const link = async (mediaId: number): Promise<void> => {
    await api.history.linkMedia(target, mediaId, kind)
    await queryClient.invalidateQueries({ queryKey: qk.history.all })
    onClose()
  }

  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card w-full max-w-lg p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={titleId} className="text-lg font-semibold text-ink">
          Link a title to {targetTitle}
        </h2>
        <button type="button" className="btn-ghost h-8 w-8 !px-0" onClick={onClose} aria-label="Close" title="Close">
          ✕
        </button>
      </div>
      <div className="space-y-3">
        <Field label="How it relates">
          <select className="input" value={kind} onChange={(e) => setKind(e.target.value as MediaLinkKind)}>
            {kinds.map((k) => (
              <option key={k} value={k}>
                {MEDIA_LINK_KINDS[k]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Find a title in your library">
          <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Title" />
        </Field>
        <ul className="max-h-80 space-y-1 overflow-y-auto">
          {media.map((m) => (
            <li key={m.id}>
              <button type="button" className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left hover:bg-base-700/60" onClick={() => void link(m.id)}>
                <CoverImage path={m.coverPath} alt="" thumbWidth={160} className="h-12 w-8 shrink-0" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-ink">{m.title}</span>
                  <span className="block text-xs text-ink-muted">
                    {configFor(m.mediaType).singular}
                    {m.releaseDate ? ` · ${m.releaseDate.slice(0, 4)}` : ''}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {debounced.length > 1 && media.length === 0 && <li className="px-2 py-1.5 text-sm text-ink-muted">No titles match.</li>}
        </ul>
      </div>
    </Dialog>
  )
}
