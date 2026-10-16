import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import Dialog from '../Dialog'

// Builds a deck of kanji no card covers yet: kanji from the learner's own words
// first, then the most frequent. Needs KANJIDIC; a frequency dictionary and
// JMdict add example words. Deck #2 continues where #1 stopped.
const SIZES = [50, 100, 200]

export default function KanjiDeckDialog({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const titleId = useId()
  const [size, setSize] = useState(100)
  const [building, setBuilding] = useState(false)

  const { data: dicts = [] } = useQuery({ queryKey: qk.dict.list, queryFn: () => api.dict.list() })
  const { data: status } = useQuery({
    queryKey: qk.japanese.kanjiDeckStatus,
    queryFn: () => api.japanese.kanjiDeckStatus(),
    enabled: building,
    refetchInterval: building ? 400 : false
  })

  const ready = dicts.some((d) => d.kanjiCount > 0)
  const examples = dicts.some((d) => d.freqCount > 0) && dicts.some((d) => d.termCount > 0)

  async function build() {
    setBuilding(true)
    try {
      const res = await api.japanese.buildKanjiDeck(size)
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(`Built "${res.courseTitle}" — ${res.kanji} kanji`, 'success')
      onClose()
      navigate(`/japanese/courses/${res.courseId}`)
    } catch (e) {
      toastError(e)
    } finally {
      setBuilding(false)
    }
  }

  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card w-full max-w-md p-5">
      <h2 id={titleId} className="text-lg font-semibold">
        Kanji deck
      </h2>
      <p className="mt-1 text-sm text-gray-400">
        The next kanji no card covers yet: the ones in your own words first, then the most common,
        each with readings, meanings and an example word. Run it again later and it picks up where
        this deck stops.
      </p>

      {!ready ? (
        <div className="mt-4 rounded-md border border-base-700 bg-base-800 p-3 text-sm text-gray-400">
          <p>Install KANJIDIC to build kanji decks.</p>
          <Link to="/settings?tab=japanese" className="mt-2 inline-block text-accent hover:underline">
            Settings → Japanese dictionaries
          </Link>
        </div>
      ) : (
        <>
          {!examples && (
            <p className="mt-3 text-xs text-gray-400">
              Install JMdict and a frequency dictionary too, so kanji you have no word for get an
              example word.
            </p>
          )}
          <div className="mt-4">
            <p className="label mb-1.5">Deck size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={n === size ? 'btn-primary' : 'btn-ghost'}
                  aria-pressed={n === size}
                  disabled={building}
                  onClick={() => setSize(n)}
                >
                  {n} kanji
                </button>
              ))}
            </div>
          </div>
          {building && status?.running && (
            <p className="mt-3 text-xs text-gray-400" role="status">
              {status.phase === 'writing'
                ? 'Writing the course…'
                : status.phase === 'glossing'
                  ? 'Finding example words…'
                  : 'Choosing kanji…'}
            </p>
          )}
        </>
      )}

      <div className="mt-5 flex justify-end gap-2">
        <button type="button" className="btn-ghost" disabled={building} onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn-primary" disabled={!ready || building} onClick={() => void build()}>
          {building ? 'Building…' : 'Generate'}
        </button>
      </div>
    </Dialog>
  )
}
