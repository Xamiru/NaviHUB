import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue, useDialog, useIncrementalList, useStatuses } from '../../lib/hooks'
import { configFor } from '../../lib/mediaConfig'
import CoverImage from '../CoverImage'
import type { ChecklistTaskStatus, MediaItem, MediaType } from '@shared/types'

// Pick the title this checklist entry is about. Scoped to the item's media type
// through api.media.list (SQL-filtered and uncapped — the global search caps at
// 20 rows across every type, which can hide the anime you're watching).
// What you're most likely to log floats to the top: anime you're mid-way
// through, films still on the watchlist.
export default function ChecklistMediaPickerDialog({
  task,
  mediaType,
  onPick,
  onClose
}: {
  task: ChecklistTaskStatus
  mediaType: MediaType
  onPick: (mediaId: number) => void
  onClose: () => void
}) {
  const panelRef = useDialog(onClose)
  const [search, setSearch] = useState('')
  const debounced = useDebouncedValue(search)
  const cfg = configFor(mediaType)
  const statuses = useStatuses(cfg)

  const filter = { mediaType, search: debounced || null }
  const { data: matches = [], isLoading } = useQuery({
    queryKey: qk.media.list(filter),
    queryFn: () => api.media.list(filter)
  })

  // Positional status convention: first = in progress, second = completed,
  // last = planned. A finished title isn't hidden — logging it just starts the
  // next pass, which the row labels so it's never a surprise.
  const pinned = mediaType === 'movie' ? statuses[statuses.length - 1] : statuses[0]
  const finished = (m: MediaItem): boolean =>
    m.status === statuses[1] || (!!m.totalUnits && m.progress >= m.totalUnits)
  const ordered = useMemo(() => {
    const rank = (m: MediaItem): number => (m.status === pinned ? 0 : 1)
    return [...matches].sort((a, b) => rank(a) - rank(b) || a.title.localeCompare(b.title))
  }, [matches, pinned])
  const { visible, sentinelRef } = useIncrementalList(ordered)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={task.label}
        tabIndex={-1}
        className="card flex max-h-full w-full max-w-lg flex-col p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{task.label}</h2>
          <button
            className="px-2 text-gray-500 hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <input
          className="input mb-3"
          autoFocus
          placeholder={`Search your ${cfg.plural.toLowerCase()}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="-mx-1 flex-1 overflow-y-auto px-1">
          {isLoading ? (
            <p className="text-sm text-gray-400">Loading…</p>
          ) : ordered.length === 0 ? (
            <p className="text-sm text-gray-400">
              Nothing in your {cfg.plural.toLowerCase()} matches that.
            </p>
          ) : (
            <>
              {visible.map((m) => (
                <button
                  key={m.id}
                  className="flex w-full items-center gap-3 rounded px-2 py-2 text-left hover:bg-base-700"
                  onClick={() => onPick(m.id)}
                >
                  <CoverImage path={m.coverPath} alt={m.title} className="h-12 w-9 object-cover" thumbWidth={160} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{m.title}</span>
                    <span className="block truncate text-xs text-gray-500">
                      {m.status ?? 'No status'}
                      {cfg.unitProgress &&
                        ` · ${m.progress}${m.totalUnits ? ` / ${m.totalUnits}` : ''}`}
                    </span>
                  </span>
                  {finished(m) && (
                    <span className="chip shrink-0 text-[11px]" title="Logging starts a new pass">
                      Again
                    </span>
                  )}
                </button>
              ))}
              <div ref={sentinelRef} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
