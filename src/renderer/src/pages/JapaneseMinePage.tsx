import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useMiningDraft } from '../lib/useMining'
import UniversalPicker, { type PickedEntity } from '../components/UniversalPicker'
import CoverImage from '../components/CoverImage'
import type { JishoResult } from '@shared/types'

export default function JapaneseMinePage() {
  const searchRef = useRef<HTMLInputElement>(null)

  const [term, setTerm] = useState('')
  const [results, setResults] = useState<JishoResult[] | null>(null)
  const [searching, setSearching] = useState(false)
  const [source, setSource] = usePersistedState<PickedEntity | null>('jpMineSource', null)

  // Draft + targets + save loop are shared with the manga reader's mining
  // panel (src/renderer/src/lib/useMining.ts) so the two flows can't drift.
  const mining = useMiningDraft({
    sourceMediaId: source?.entityId ?? null,
    onSaved: () => {
      // Rapid-capture loop: clear the word, keep the source + target lesson.
      setResults(null)
      setTerm('')
      searchRef.current?.focus()
    }
  })
  const { draft, setDraft, targets, targetLessonId, setLessonId, canSave, saving } = mining

  async function search() {
    const q = term.trim()
    if (!q) return
    setSearching(true)
    try {
      setResults(await api.japanese.jishoLookup(q))
    } finally {
      setSearching(false)
    }
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
          <div className="label mb-1">Look up on Jisho</div>
          <div className="flex gap-2">
            <input
              ref={searchRef}
              className="input flex-1"
              placeholder="e.g. 沼, 面白い, つまり…"
              value={term}
              autoFocus
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') void search()
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
              {results.map((r) => (
                <button
                  key={r.slug}
                  onClick={() => mining.fillFromJisho(r)}
                  className={`w-full rounded-lg border p-3 text-left transition-colors ${
                    draft.front === r.word
                      ? 'border-accent bg-accent/10'
                      : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
                  }`}
                >
                  <span className="text-lg">{r.word}</span>
                  {r.reading && r.reading !== r.word && (
                    <span className="ml-2 text-sm text-gray-400">{r.reading}</span>
                  )}
                  {r.isCommon && <span className="chip ml-2 bg-green-500/20 text-green-300">common</span>}
                  {r.jlpt && (
                    <span className="chip ml-1 bg-base-700 text-gray-400">
                      {r.jlpt.replace('jlpt-', '').toUpperCase()}
                    </span>
                  )}
                  <span className="mt-0.5 block text-sm text-gray-400">{r.meanings}</span>
                  {r.pos && <span className="block text-xs text-gray-400">{r.pos}</span>}
                </button>
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
