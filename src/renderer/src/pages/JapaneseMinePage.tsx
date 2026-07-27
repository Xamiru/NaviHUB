import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useMiningDraft } from '../lib/useMining'
import UniversalPicker, { type PickedEntity } from '../components/UniversalPicker'
import CoverImage from '../components/CoverImage'
import DictResultRow from '../components/japanese/DictResultRow'

export default function JapaneseMinePage() {
  const searchRef = useRef<HTMLInputElement>(null)

  // Persisted so a detour (checking a lesson, the reader) and Back doesn't
  // lose the lookup mid-mining. `submitted` drives the query; empty = no search.
  const [term, setTerm] = usePersistedState('jpMineTerm', '')
  const [submitted, setSubmitted] = usePersistedState('jpMineSubmitted', '')
  const [source, setSource] = usePersistedState<PickedEntity | null>('jpMineSource', null)

  const { data: lookup, isFetching: searching } = useQuery({
    queryKey: qk.dict.lookup(submitted),
    queryFn: () => api.dict.lookup(submitted),
    enabled: submitted.trim().length > 0
  })
  const results = submitted.trim() ? (lookup ?? null) : null

  // Draft + targets + save loop are shared with the manga reader's mining
  // panel (src/renderer/src/lib/useMining.ts) so the two flows can't drift.
  const mining = useMiningDraft({
    sourceMediaId: source?.entityId ?? null,
    onSaved: () => {
      // Rapid-capture loop: clear the word, keep the source + target lesson.
      setSubmitted('')
      setTerm('')
      searchRef.current?.focus()
    }
  })
  const { draft, setDraft, targets, targetLessonId, setLessonId, canSave, saving } = mining

  function search() {
    const q = term.trim()
    if (!q) return
    setSubmitted(q)
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link to="/japanese" className="text-sm text-gray-500 hover:text-white">
          ← Japanese
        </Link>
        <h1 className="mt-1 text-2xl font-bold">⛏ Mine words</h1>
        <p className="text-sm text-gray-500">
          Hit a word while reading? Look it up, tweak it, save it — it goes straight into your
          review queue.
        </p>
      </div>

      <div className="card p-5 space-y-5">
        <div>
          <div className="label mb-1">Look up (offline dictionaries · English works too)</div>
          <div className="flex gap-2">
            <input
              ref={searchRef}
              className="input flex-1"
              placeholder="e.g. 沼, 面白い, or an English word…"
              value={term}
              autoFocus
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') search()
              }}
            />
            <button className="btn-primary" disabled={searching || !term.trim()} onClick={search}>
              {searching ? '…' : 'Search'}
            </button>
          </div>
        </div>

        {results !== null &&
          (results.length === 0 ? (
            <p className="text-sm text-gray-500">
              Nothing found — you can still fill in the card by hand below.
            </p>
          ) : (
            <div className="space-y-1.5">
              {results.map((r, i) => (
                <DictResultRow
                  key={`${r.expression} ${r.reading} ${i}`}
                  entry={r}
                  selected={draft.front === r.expression}
                  onPick={() => {
                    mining.fillFromEntry(r)
                    void mining.fillExampleFromBank(r.expression)
                  }}
                />
              ))}
            </div>
          ))}

        <div className="border-t border-base-700 pt-4 space-y-3">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              className="input"
              placeholder="Word"
              value={draft.front}
              onChange={(e) => setDraft((d) => ({ ...d, front: e.target.value }))}
            />
            <input
              className="input"
              placeholder="Reading (kana)"
              value={draft.reading}
              onChange={(e) => setDraft((d) => ({ ...d, reading: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr]">
            <input
              className="input"
              placeholder="Meaning"
              value={draft.back}
              onChange={(e) => setDraft((d) => ({ ...d, back: e.target.value }))}
            />
            <input
              className="input"
              placeholder="Part of speech"
              value={draft.pos}
              onChange={(e) => setDraft((d) => ({ ...d, pos: e.target.value }))}
            />
          </div>
          <input
            className="input"
            placeholder="Example sentence (JP, optional)"
            value={draft.exampleJp}
            onChange={(e) => setDraft((d) => ({ ...d, exampleJp: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Example translation (EN, optional)"
            value={draft.exampleEn}
            onChange={(e) => setDraft((d) => ({ ...d, exampleEn: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Note (optional — e.g. where you found it)"
            value={draft.notes}
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
          />

          <div>
            <div className="label mb-1">Found in (optional)</div>
            {source ? (
              <div className="flex items-center gap-2 rounded-md border border-base-700 bg-base-800 p-2">
                <CoverImage path={source.imagePath} alt={source.name} className="h-8 w-8 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-sm">{source.name}</span>
                <button
                  className="btn-ghost py-1 px-2 text-xs text-gray-500 hover:text-red-400"
                  onClick={() => setSource(null)}
                >
                  ✕
                </button>
              </div>
            ) : (
              <UniversalPicker
                kind="media"
                mediaTypes={['manga', 'visual_novel']}
                placeholder="Search your manga / visual novels…"
                onPick={setSource}
              />
            )}
          </div>

          <div>
            <div className="label mb-1">Save to</div>
            <select
              className="input"
              value={targetLessonId ?? ''}
              onChange={(e) => setLessonId(Number(e.target.value))}
            >
              {targets?.inboxLessonId != null &&
                !targets.lessons.some((l) => l.lessonId === targets.inboxLessonId) && (
                  <option value={targets.inboxLessonId}>Mined words (inbox)</option>
                )}
              {targets?.lessons.map((l) => (
                <option key={l.lessonId} value={l.lessonId}>
                  {l.lessonId === targets.inboxLessonId ? 'Mined words (inbox)' : l.label}
                </option>
              ))}
            </select>
          </div>

          <button className="btn-primary w-full" disabled={!canSave || saving} onClick={() => void mining.save()}>
            {saving ? 'Saving…' : '+ Add card'}
          </button>
        </div>
      </div>
    </div>
  )
}
