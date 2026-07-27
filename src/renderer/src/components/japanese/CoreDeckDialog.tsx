import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDialog } from '../../lib/hooks'
import { toast, toastError } from '../../lib/toast'

// Builds a deck of the most frequent words the user doesn't have yet. Needs a
// frequency dictionary and JMdict installed; deck #2 continues where #1 left
// off, because the generator dedupes against every existing card.
const SIZES = [100, 250, 500, 1000]

export default function CoreDeckDialog({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const dialogRef = useDialog(onClose)
  const [size, setSize] = useState(500)
  const [building, setBuilding] = useState(false)

  const { data: dicts = [] } = useQuery({ queryKey: qk.dict.list, queryFn: () => api.dict.list() })
  const { data: status } = useQuery({
    queryKey: qk.japanese.coreDeckStatus,
    queryFn: () => api.japanese.coreDeckStatus(),
    enabled: building,
    refetchInterval: building ? 400 : false
  })

  const hasFreq = dicts.some((d) => d.freqCount > 0)
  const hasWords = dicts.some((d) => d.termCount > 0)
  const ready = hasFreq && hasWords

  async function build() {
    setBuilding(true)
    try {
      const res = await api.japanese.buildCoreDeck(size)
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(`Built "${res.courseTitle}" — ${res.words} words`, 'success')
      onClose()
      navigate(`/japanese/courses/${res.courseId}`)
    } catch (e) {
      toastError(e)
    } finally {
      setBuilding(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal
        tabIndex={-1}
        className="card w-full max-w-md p-5"
      >
        <h2 className="text-lg font-semibold">Core frequency deck</h2>
        <p className="mt-1 text-sm text-gray-400">
          The most common Japanese words you don&apos;t have a card for yet, glossed from your offline
          dictionary. Run it again later and it picks up where this deck stops.
        </p>

        {!ready ? (
          <div className="mt-4 rounded-md border border-base-700 bg-base-800 p-3 text-sm text-gray-400">
            {!hasWords && <p>Install JMdict to gloss the words.</p>}
            {!hasFreq && <p>Install a frequency dictionary (JPDB or BCCWJ) to rank them.</p>}
            <Link to="/settings" className="mt-2 inline-block text-accent hover:underline">
              Settings → Japanese dictionaries
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-4">
              <p className="label mb-1.5">Deck size</p>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((n) => (
                  <button
                    key={n}
                    className={n === size ? 'btn-primary' : 'btn-ghost'}
                    disabled={building}
                    onClick={() => setSize(n)}
                  >
                    {n} words
                  </button>
                ))}
              </div>
            </div>

            {building && status?.running && (
              <p className="mt-3 text-xs text-gray-400">
                {status.phase === 'writing' ? 'Writing the course…' : 'Choosing words…'}
                {status.done > 0 ? ` ${status.done}/${status.total}` : ''}
              </p>
            )}
          </>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" disabled={building} onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" disabled={!ready || building} onClick={() => void build()}>
            {building ? 'Building…' : 'Generate'}
          </button>
        </div>
      </div>
    </div>
  )
}
