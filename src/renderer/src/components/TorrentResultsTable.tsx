import { useMemo, useState } from 'react'
import { api } from '../lib/api'
import { toast, toastError } from '../lib/toast'
import { formatBytes } from '@shared/torrents'
import type { TorrentSearchResult } from '@shared/types'

interface Props {
  results: TorrentSearchResult[]
  indexerErrors: string[]
}

type SortCol = 'seeders' | 'size' | 'date' | 'title'

// Shared by TorrentSearchDialog and TorrentsPage: sortable results list with a
// per-row "Add to qBittorrent" hand-off. One Jackett response is a single
// batch (no pagination), so sorting is pure client-side.
export default function TorrentResultsTable({ results, indexerErrors }: Props): React.JSX.Element {
  const [sort, setSort] = useState<{ col: SortCol; dir: 'asc' | 'desc' }>({
    col: 'seeders',
    dir: 'desc'
  })
  // r.id -> transient row state ("added" never settles from a query — nothing
  // in the cache changes when qBittorrent accepts a torrent).
  const [pending, setPending] = useState<Record<string, 'busy' | 'added'>>({})

  const sorted = useMemo(() => {
    const val = (r: TorrentSearchResult): string | number | null => {
      switch (sort.col) {
        case 'seeders':
          return r.seeders
        case 'size':
          return r.sizeBytes
        case 'date':
          return r.publishDate
        case 'title':
          return r.title.toLowerCase()
      }
    }
    const dir = sort.dir === 'asc' ? 1 : -1
    return [...results].sort((a, b) => {
      const av = val(a)
      const bv = val(b)
      if (av == null && bv == null) return 0
      if (av == null) return 1 // nulls last regardless of direction
      if (bv == null) return -1
      return av < bv ? -dir : av > bv ? dir : 0
    })
  }, [results, sort])

  function toggleSort(col: SortCol): void {
    setSort((s) =>
      s.col === col
        ? { col, dir: s.dir === 'desc' ? 'asc' : 'desc' }
        : { col, dir: col === 'title' ? 'asc' : 'desc' }
    )
  }

  async function add(r: TorrentSearchResult): Promise<void> {
    if (pending[r.id]) return
    setPending((p) => ({ ...p, [r.id]: 'busy' }))
    try {
      await api.torrents.add({ magnetUri: r.magnetUri, link: r.link })
      setPending((p) => ({ ...p, [r.id]: 'added' }))
      toast('Sent to qBittorrent', 'success')
    } catch (e) {
      setPending((p) => {
        const next = { ...p }
        delete next[r.id]
        return next
      })
      toastError(e)
    }
  }

  function header(col: SortCol, label: string, extra = ''): React.JSX.Element {
    const active = sort.col === col
    return (
      <th className={`px-2 py-1.5 font-medium ${extra}`}>
        <button
          className={active ? 'text-accent' : 'text-gray-400 hover:text-white'}
          onClick={() => toggleSort(col)}
        >
          {label}
          {active ? (sort.dir === 'desc' ? ' v' : ' ^') : ''}
        </button>
      </th>
    )
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-base-700 text-left text-xs uppercase">
              {header('title', 'Title')}
              <th className="px-2 py-1.5 font-medium text-gray-400">Tracker</th>
              <th className="px-2 py-1.5 font-medium text-gray-400">Category</th>
              {header('size', 'Size', 'text-right')}
              {header('seeders', 'Seeds', 'text-right')}
              <th className="px-2 py-1.5 font-medium text-gray-400 text-right">Peers</th>
              {header('date', 'Date')}
              <th className="px-2 py-1.5" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => {
              const status = pending[r.id]
              const addable = !!(r.magnetUri || r.link)
              return (
                <tr key={r.id} className="border-b border-base-800 hover:bg-base-800/50">
                  <td className="px-2 py-1.5 max-w-md">
                    <span className="block truncate" title={r.title}>
                      {r.title}
                    </span>
                  </td>
                  <td className="px-2 py-1.5 text-gray-400 whitespace-nowrap">{r.tracker}</td>
                  <td className="px-2 py-1.5 text-gray-400 whitespace-nowrap">{r.category ?? '—'}</td>
                  <td className="px-2 py-1.5 text-right tabular-nums whitespace-nowrap">
                    {formatBytes(r.sizeBytes)}
                  </td>
                  <td
                    className={`px-2 py-1.5 text-right tabular-nums ${
                      (r.seeders ?? 0) > 0 ? 'text-green-400' : 'text-gray-400'
                    }`}
                  >
                    {r.seeders ?? '—'}
                  </td>
                  <td className="px-2 py-1.5 text-right tabular-nums text-gray-400">
                    {r.peers ?? '—'}
                  </td>
                  <td className="px-2 py-1.5 text-gray-400 whitespace-nowrap">
                    {r.publishDate?.slice(0, 10) ?? '—'}
                  </td>
                  <td className="px-2 py-1.5 whitespace-nowrap text-right">
                    <div className="inline-flex gap-1.5">
                      <button
                        className="btn-primary px-2.5 py-1 text-xs"
                        disabled={!addable || !!status}
                        title={addable ? 'Send to qBittorrent' : 'No magnet or download link'}
                        onClick={() => void add(r)}
                      >
                        {status === 'busy' ? 'Adding…' : status === 'added' ? 'Sent' : 'Add'}
                      </button>
                      {r.detailsUrl && (
                        <button
                          className="btn-ghost px-2.5 py-1 text-xs"
                          title="Open tracker page in browser"
                          onClick={() => void api.app.openExternal(r.detailsUrl!)}
                        >
                          Details
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {indexerErrors.length > 0 && (
        <div className="mt-2 text-xs text-gray-500">
          <p>
            {indexerErrors.length} indexer{indexerErrors.length === 1 ? '' : 's'} failed:
          </p>
          {indexerErrors.map((e) => (
            <p key={e} className="truncate" title={e}>
              {e}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
