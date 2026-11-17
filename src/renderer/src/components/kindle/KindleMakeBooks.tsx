import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { bytes } from '../../lib/kindle'
import { qk } from '../../lib/queryKeys'
import { toast } from '../../lib/toast'
import { Field } from '../Field'
import KindleSendDialog from './KindleSendDialog'
import type { KindleBookRequest, KindleMadeBook } from '@shared/types'

type Level = Extract<KindleBookRequest, { kind: 'jpReadings' }>['level']
const LEVELS: Level[] = ['N5', 'N4', 'N3', 'N2', 'N1']

// EPUBs NaviHUB makes from the library for reading on the Kindle. They are
// written to this computer only; copying them to the Kindle is a separate
// step (Send to Kindle, or by hand from Show in folder).
export default function KindleMakeBooks() {
  const qc = useQueryClient()
  const { data: made = [], isError, refetch } = useQuery({
    queryKey: qk.kindle.madeBooks,
    queryFn: () => api.kindle.madeBooks()
  })
  const [grouping, setGrouping] = useState<'source' | 'theme'>('source')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [level, setLevel] = useState<Level>('N5')
  const [busy, setBusy] = useState(false)
  const [sending, setSending] = useState<KindleMadeBook | null>(null)

  async function make(request: KindleBookRequest): Promise<void> {
    setBusy(true)
    try {
      const book = await api.kindle.makeBook(request)
      toast(`Made ${book.fileName} (${bytes(book.bytes)}).`, 'success')
      await qc.invalidateQueries({ queryKey: qk.kindle.madeBooks })
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="mb-6" aria-label="Make a book for the Kindle">
      <h2 className="label mb-1">Make a book for the Kindle</h2>
      <p className="mb-3 text-xs text-gray-400">
        Builds an EPUB from your library on this computer. Send to Kindle copies it into the NaviHUB folder on
        a connected Kindle.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card p-4">
          <h3 className="font-semibold">My Quotes</h3>
          <p className="mb-3 text-xs text-gray-400">Your quote book, with readings, translations and notes.</p>
          <Field label="Chapters" className="mb-2">
            <select
              className="input"
              value={grouping}
              onChange={(e) => setGrouping(e.target.value as 'source' | 'theme')}
            >
              <option value="source">One per book or title</option>
              <option value="theme">One per theme</option>
            </select>
          </Field>
          <label className="mb-3 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} />
            Favorites only
          </label>
          <button
            type="button"
            className="btn-primary"
            disabled={busy}
            onClick={() => void make({ kind: 'quotes', grouping, favoritesOnly })}
          >
            Make quote book
          </button>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold">Japanese graded readings</h3>
          <p className="mb-3 text-xs text-gray-400">
            The built-in passages of one level, with furigana, words, questions, and answers at the end of each
            chapter.
          </p>
          <Field label="Level" className="mb-3">
            <select className="input" value={level} onChange={(e) => setLevel(e.target.value as Level)}>
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
          <button
            type="button"
            className="btn-primary"
            disabled={busy}
            onClick={() => void make({ kind: 'jpReadings', level })}
          >
            Make reading book
          </button>
        </div>
      </div>

      {isError ? (
        <p className="mt-3 text-sm text-signal-anomaly">
          Could not list the books.{' '}
          <button type="button" className="btn-ghost text-xs" onClick={() => void refetch()}>
            Try again
          </button>
        </p>
      ) : made.length > 0 ? (
        <ul className="mt-3 divide-y divide-line-subtle" aria-label="Books made">
          {made.map((b) => (
            <li key={b.fileName} className="flex flex-wrap items-center gap-3 py-2 text-sm">
              <span className="min-w-0 flex-1 break-all">{b.fileName}</span>
              <span className="text-xs text-gray-400">
                {bytes(b.bytes)} · {new Date(b.madeAt).toLocaleString()}
              </span>
              <button
                type="button"
                className="btn-ghost text-xs"
                onClick={() => void api.kindle.revealMadeBook(b.fileName)}
              >
                Show in folder
              </button>
              <button type="button" className="btn-ghost text-xs" onClick={() => setSending(b)}>
                Send to Kindle…
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {sending && (
        <KindleSendDialog
          title={sending.fileName.replace(/\.epub$/i, '')}
          items={[{ kind: 'made', fileName: sending.fileName }]}
          onClose={() => {
            setSending(null)
            void qc.invalidateQueries({ queryKey: qk.kindle.all })
          }}
        />
      )}
    </section>
  )
}
