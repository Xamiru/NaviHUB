import { useId, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue, useIncrementalList } from '../../lib/hooks'
import CoverImage from '../CoverImage'
import Dialog from '../Dialog'
import { Field } from '../Field'
// Link a Kindle book NaviHUB did not send to a book in the library, or a
// manga series folder to a manga. The search starts with the device name, so
// the likely match is already listed.
export default function KindleLinkDialog({
  name,
  mediaType = 'book',
  onPick,
  onClose
}: {
  name: string
  mediaType?: 'book' | 'manga'
  onPick: (mediaId: number) => void
  onClose: () => void
}) {
  const headingId = useId()
  const [search, setSearch] = useState(name)
  const debounced = useDebouncedValue(search)
  const filter = { mediaType, search: debounced || null }
  const noun = mediaType === 'manga' ? 'manga' : 'books'
  const { data: matches = [], isLoading } = useQuery({
    queryKey: qk.media.list(filter),
    queryFn: () => api.media.list(filter)
  })
  const { visible, sentinelRef } = useIncrementalList(matches)

  return (
    <Dialog
      labelledBy={headingId}
      onClose={onClose}
      panelClassName="card flex max-h-full w-full max-w-lg flex-col p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 id={headingId} className="text-lg font-semibold">
          Link {name}
        </h2>
        <button className="px-2 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <Field label={`Search your ${noun}`} hiddenLabel className="mb-3">
        <input
          className="input w-full"
          autoFocus
          placeholder={`Search your ${noun}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Field>

      <div className="-mx-1 flex-1 overflow-y-auto px-1">
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading…</p>
        ) : matches.length === 0 ? (
          <p className="text-sm text-gray-400">No {mediaType === 'manga' ? 'manga' : 'book'} in your library matches that.</p>
        ) : (
          <>
            {visible.map((m) => (
              <button
                key={m.id}
                type="button"
                className="flex w-full items-center gap-3 rounded px-2 py-2 text-left hover:bg-base-700"
                onClick={() => onPick(m.id)}
              >
                <CoverImage path={m.coverPath} alt="" className="h-12 w-9 object-cover" thumbWidth={160} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{m.title}</span>
                  <span className="block truncate text-xs text-gray-400">{m.status ?? 'No status'}</span>
                </span>
              </button>
            ))}
            <div ref={sentinelRef} />
          </>
        )}
      </div>
    </Dialog>
  )
}
