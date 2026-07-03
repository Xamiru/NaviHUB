import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useMiningDraft } from '../../lib/useMining'
import type { JishoResult, JpToken } from '@shared/types'

// The manga reader's word-mining side panel: shows the tapped OCR block as
// tokenized word chips, looks terms up on Jisho, and saves cards straight into
// the SRS with this manga as the source. Works with no OCR too — just type.
export default function MiningPanel({
  mediaId,
  blockText,
  initialTerm,
  onClose
}: {
  mediaId: number
  blockText: string | null // tapped OCR block (joined lines); null = manual mode
  initialTerm: string | null // drag-selected text — pre-fills the term box
  onClose: () => void
}) {
  const termRef = useRef<HTMLInputElement>(null)
  const [term, setTerm] = useState('')
  const [results, setResults] = useState<JishoResult[] | null>(null)
  const [searching, setSearching] = useState(false)

  const mining = useMiningDraft({ sourceMediaId: mediaId })
  const { draft, setDraft, targets, targetLessonId, setLessonId, canSave, saving } = mining

  // Tokenize the tapped block; [] means "tokenizer unavailable" and we fall
  // back to showing the raw (selectable) sentence.
  const { data: tokens } = useQuery({
    queryKey: qk.japanese.tokens(blockText ?? ''),
    queryFn: () => api.japanese.tokenize(blockText!),
    enabled: !!blockText,
    staleTime: Infinity
  })

  // Which of the visible words are already in a deck (any lesson, any source).
  const candidateFronts = [
    ...(tokens?.filter((t) => t.wordLike).map((t) => t.base) ?? []),
    ...(results?.map((r) => r.word) ?? [])
  ]
  const { data: mined } = useQuery({
    queryKey: qk.japanese.minedFronts(candidateFronts),
    queryFn: () => api.japanese.minedFronts(candidateFronts),
    enabled: candidateFronts.length > 0
  })
  const isMined = (front: string) => !!mined?.includes(front)

  async function search(q: string, retryWith?: string) {
    const trimmed = q.trim()
    if (!trimmed) return
    setSearching(true)
    try {
      let found = await api.japanese.jishoLookup(trimmed)
      // A token's base form can miss (OCR noise, names); retry with the
      // surface form before giving up.
      if (found.length === 0 && retryWith && retryWith !== trimmed) {
        found = await api.japanese.jishoLookup(retryWith)
      }
      setResults(found)
    } finally {
      setSearching(false)
    }
  }

  function lookupToken(t: JpToken) {
    setTerm(t.base)
    void search(t.base, t.surface)
  }

  // Drag-selection in the overlay lands here.
  useEffect(() => {
    if (initialTerm) {
      setTerm(initialTerm)
      void search(initialTerm)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTerm])

  async function save() {
    if (await mining.save()) {
      setResults(null)
      setTerm('')
      termRef.current?.focus()
    }
  }

  return (
    <div className="w-[360px] shrink-0 h-full overflow-y-auto bg-base-900 border-l border-base-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-300">⛏ Mine words</h2>
        <button className="btn-ghost py-0.5 px-2 text-xs" onClick={onClose} title="Close (M)">
          ✕
        </button>
      </div>

      {blockText && (
        <div className="rounded-lg border border-base-700 bg-base-800 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">Tapped text</span>
            <button
              className="btn-ghost py-0.5 px-2 text-xs"
              onClick={() => navigator.clipboard.writeText(blockText)}
              title="Copy sentence"
            >
              ⧉ Copy
            </button>
          </div>
          {tokens && tokens.length > 0 ? (
            <div className="flex flex-wrap gap-1 leading-relaxed">
              {tokens.map((t, i) =>
                t.wordLike ? (
                  <button
                    key={i}
                    onClick={() => lookupToken(t)}
                    title={t.base !== t.surface ? `→ ${t.base}` : undefined}
                    className={`rounded px-1 text-base transition-colors hover:bg-accent/20 hover:text-accent ${
                      isMined(t.base)
                        ? 'text-green-300 underline decoration-green-500/50'
                        : 'text-gray-100'
                    }`}
                  >
                    {t.surface}
                    {isMined(t.base) && <span className="ml-0.5 text-[10px]">✓</span>}
                  </button>
                ) : (
                  <span key={i} className="px-0.5 text-base text-gray-600">
                    {t.surface}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="select-text text-base text-gray-100 leading-relaxed">
              {blockText}
              <span className="mt-1 block text-xs text-gray-600">
                (No tokenizer — select text on the page or type below.)
              </span>
            </p>
          )}
        </div>
      )}

      <div>
        <div className="label mb-1">Look up on Jisho</div>
        <div className="flex gap-2">
          <input
            ref={termRef}
            className="input flex-1"
            placeholder="e.g. 沼, 面白い…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void search(term)
              e.stopPropagation() // don't trigger reader shortcuts while typing
            }}
          />
          <button
            className="btn-primary"
            disabled={searching || !term.trim()}
            onClick={() => void search(term)}
          >
            {searching ? '…' : '🔍'}
          </button>
        </div>
      </div>

      {results !== null &&
        (results.length === 0 ? (
          <p className="text-sm text-gray-500">Nothing found — fill in the card by hand below.</p>
        ) : (
          <div className="space-y-1.5">
            {results.map((r) => (
              <button
                key={r.slug}
                onClick={() => mining.fillFromJisho(r, blockText ?? undefined)}
                className={`w-full rounded-lg border p-2.5 text-left transition-colors ${
                  draft.front === r.word
                    ? 'border-accent bg-accent/10'
                    : 'border-base-700 bg-base-800 hover:border-accent hover:bg-base-700'
                }`}
              >
                <span className="text-base">{r.word}</span>
                {r.reading && r.reading !== r.word && (
                  <span className="ml-2 text-sm text-gray-400">{r.reading}</span>
                )}
                {isMined(r.word) && (
                  <span className="chip ml-2 bg-green-500/20 text-green-300">✓ mined</span>
                )}
                {r.isCommon && <span className="chip ml-1 bg-green-500/20 text-green-300">common</span>}
                {r.jlpt && (
                  <span className="chip ml-1 bg-base-700 text-gray-400">
                    {r.jlpt.replace('jlpt-', '').toUpperCase()}
                  </span>
                )}
                <span className="mt-0.5 block text-sm text-gray-400">{r.meanings}</span>
              </button>
            ))}
          </div>
        ))}

      <div className="border-t border-base-700 pt-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
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
        <input
          className="input"
          placeholder="Meaning"
          value={draft.back}
          onChange={(e) => setDraft((d) => ({ ...d, back: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Example sentence (JP)"
          value={draft.exampleJp}
          onChange={(e) => setDraft((d) => ({ ...d, exampleJp: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Note (optional)"
          value={draft.notes}
          onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
        />
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
        <button className="btn-primary w-full" disabled={!canSave || saving} onClick={save}>
          {saving ? 'Saving…' : '+ Add card'}
        </button>
      </div>
    </div>
  )
}
