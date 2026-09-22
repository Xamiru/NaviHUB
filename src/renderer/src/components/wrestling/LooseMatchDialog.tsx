import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDialog } from '../../lib/hooks'
import { useDebouncedValue } from '../../lib/hooks'
import type { WrestlingMatchWithEvent } from '@shared/types'
import { Field, Fieldset } from '../Field'

// Editing a loose match: what it was, when, and who was in it. Wrestlers are
// picked from the imported wiki, which is what puts the match on their page and
// into their career record alongside the pay-per-view ones.
export default function LooseMatchDialog({
  match,
  onClose,
  onSaved
}: {
  match: WrestlingMatchWithEvent
  onClose: () => void
  onSaved: () => void
}): JSX.Element {
  const ref = useDialog(onClose)
  const [title, setTitle] = useState(match.title)
  const [showLabel, setShowLabel] = useState(match.showLabel ?? '')
  const [matchDate, setMatchDate] = useState(match.matchDate ?? '')
  const [stipulation, setStipulation] = useState(match.stipulation ?? '')
  const [participants, setParticipants] = useState(
    match.participants.map((participant) => ({
      id: participant.wrestlerId,
      name: participant.name
    }))
  )
  const [winners, setWinners] = useState<Set<number>>(
    new Set(match.participants.filter((p) => p.won).map((p) => p.wrestlerId))
  )
  const [search, setSearch] = useState('')
  const [busy, setBusy] = useState(false)
  const debounced = useDebouncedValue(search)

  const { data: results } = useQuery({
    queryKey: qk.wrestling.searchWrestlers(debounced),
    queryFn: () => api.wrestling.searchWrestlers(debounced),
    enabled: debounced.trim().length > 1
  })

  async function save(): Promise<void> {
    setBusy(true)
    try {
      await api.wrestling.updateLooseMatch(match.id, {
        title,
        showLabel: showLabel.trim() || null,
        matchDate: matchDate.trim() || null,
        stipulation: stipulation.trim() || null,
        wrestlerIds: participants.map((w) => w.id),
        winnerIds: [...winners]
      })
      onSaved()
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="loose-match-title"
        tabIndex={-1}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-base-900 p-5"
      >
        <div className="mb-4 flex items-start justify-between">
          <h2 id="loose-match-title" className="font-semibold">
            Edit match
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-gray-500 hover:text-white"
          >
            ✕
          </button>
        </div>

        <Field label="Title" className="mb-3">
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>

        <div className="mb-3 grid grid-cols-2 gap-3">
          <Field label="Show">
            <input
              className="input"
              placeholder="Raw"
              value={showLabel}
              onChange={(e) => setShowLabel(e.target.value)}
            />
          </Field>
          <Field label="Date">
            <input
              type="date"
              className="input"
              placeholder="1997-03-17"
              value={matchDate}
              onChange={(e) => setMatchDate(e.target.value)}
            />
          </Field>
        </div>

        <Field label="Stipulation" className="mb-4">
          <input
            className="input"
            placeholder="Steel cage match"
            value={stipulation}
            onChange={(e) => setStipulation(e.target.value)}
          />
        </Field>

        <Fieldset legend="Wrestlers">
          {participants.length > 0 && (
            <div className="mb-2 space-y-1">
              {participants.map((w) => (
                <div key={w.id} className="flex items-center justify-between text-sm">
                  <span>{w.name}</span>
                  <span className="flex items-center gap-3 text-xs">
                    <label className="flex items-center gap-1 text-gray-400">
                      <input
                        type="checkbox"
                        checked={winners.has(w.id)}
                        onChange={(e) =>
                          setWinners((prev) => {
                            const next = new Set(prev)
                            if (e.target.checked) next.add(w.id)
                            else next.delete(w.id)
                            return next
                          })
                        }
                      />
                      won
                    </label>
                    <button
                      type="button"
                      className="text-gray-500 hover:text-red-400"
                      onClick={() => {
                        setParticipants((prev) => prev.filter((p) => p.id !== w.id))
                        setWinners((prev) => {
                          const next = new Set(prev)
                          next.delete(w.id)
                          return next
                        })
                      }}
                      aria-label={`Remove ${w.name}`}
                    >
                      ✕
                    </button>
                  </span>
                </div>
              ))}
            </div>
          )}
          <Field label="Search imported wrestlers" hiddenLabel>
            <input
              className="input"
              placeholder="Search imported wrestlers…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Field>
          {!!results?.length && search.trim().length > 1 && (
            <div className="mt-1 max-h-40 overflow-y-auto rounded border border-base-700">
              {results.slice(0, 20).map((w) => (
                <button
                  type="button"
                  key={w.id}
                  className="block w-full px-3 py-1.5 text-left text-sm hover:bg-base-800"
                  onClick={() => {
                    if (!participants.some((participant) => participant.id === w.id)) {
                      setParticipants((prev) => [...prev, { id: w.id, name: w.name }])
                    }
                    setSearch('')
                  }}
                >
                  {w.name}
                  <span className="ml-2 text-xs text-gray-500">{w.matchCount} matches</span>
                </button>
              ))}
            </div>
          )}
        </Fieldset>

        <button type="button" className="btn-primary mt-5 w-full" disabled={busy} onClick={save}>
          Save
        </button>
      </div>
    </div>
  )
}
