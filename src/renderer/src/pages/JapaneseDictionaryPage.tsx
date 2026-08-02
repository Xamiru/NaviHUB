import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { useMiningDraft } from '../lib/useMining'
import PitchAccent from '../components/japanese/PitchAccent'
import StructuredContent from '../components/japanese/StructuredContent'
import StrokeOrderDiagram from '../components/japanese/StrokeOrderDiagram'
import { flattenGlossary } from '@shared/dictContent'
import { mediaUrl } from '@shared/mediaUrl'
import { transitivityPartner } from '@shared/transitivity'
import type { DictEntry, GlossaryItem, KanjiInfo } from '@shared/types'

// Standalone offline dictionary: search JMdict / KANJIDIC / pitch / grammar dicts
// at once, see definitions with pitch and a kanji breakdown, and mine any entry
// straight into the SRS. Falls back to jisho.org when nothing is installed.
export default function JapaneseDictionaryPage() {
  const [query, setQuery] = usePersistedState('jpDictQuery', '')
  const debounced = useDebouncedValue(query.trim(), 250)

  // Deep links (?q=…) from lesson tables and elsewhere pre-fill the search.
  const [params, setParams] = useSearchParams()
  const linkedQuery = params.get('q')
  useEffect(() => {
    if (linkedQuery) {
      setQuery(linkedQuery)
      setParams({}, { replace: true }) // consume it so typing isn't overridden
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedQuery])

  const { data: dicts = [] } = useQuery({
    queryKey: qk.dict.list,
    queryFn: () => api.dict.list()
  })

  // One page-level check: entries only offer an Examples section when a bank
  // is actually installed.
  const { data: sentenceBank } = useQuery({
    queryKey: qk.dict.sentenceBank,
    queryFn: () => api.dict.sentenceBank()
  })

  const { data: entries = [], isFetching } = useQuery({
    queryKey: qk.dict.lookup(debounced),
    queryFn: () => api.dict.lookup(debounced),
    enabled: debounced.length > 0
  })

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Dictionary"
        subtitle="Offline lookup across every dictionary you&apos;ve installed. Type Japanese or English."
      />

      {dicts.length === 0 && (
        <div className="card mb-4 p-4 text-sm text-gray-400">
          No dictionaries installed yet — searches fall back to jisho.org (online). Add JMdict,
          KANJIDIC and more in{' '}
          <Link to="/settings" className="text-accent hover:underline">
            Settings → Japanese dictionaries
          </Link>
          .
        </div>
      )}

      <input
        className="input w-full text-lg"
        placeholder="e.g. 食べる, 面白い, sunset…"
        value={query}
        autoFocus
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="mt-5 space-y-4">
        {debounced.length === 0 ? (
          <p className="text-sm text-gray-500">Start typing to search.</p>
        ) : isFetching && entries.length === 0 ? (
          <p className="text-sm text-gray-500">Searching…</p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-gray-500">Nothing found for &ldquo;{debounced}&rdquo;.</p>
        ) : (
          <ResultsList entries={entries} onSearch={setQuery} hasSentences={!!sentenceBank} />
        )}
      </div>
    </div>
  )
}

// Words render as always; JMnedict-only results group under a collapsed Names
// disclosure — auto-expanded when names are ALL there is, which is the whole
// point (name lookups stop being misses without burying real words).
function ResultsList({
  entries,
  onSearch,
  hasSentences
}: {
  entries: DictEntry[]
  onSearch: (q: string) => void
  hasSentences: boolean
}) {
  const words = entries.filter((e) => !e.isName)
  const names = entries.filter((e) => e.isName)
  const [showNames, setShowNames] = useState(false)
  const namesOpen = showNames || words.length === 0

  return (
    <>
      {words.map((entry, i) => (
        <EntryCard
          key={`${entry.expression} ${entry.reading} ${i}`}
          entry={entry}
          onSearch={onSearch}
          hasSentences={hasSentences}
        />
      ))}
      {names.length > 0 && (
        <div>
          {words.length > 0 && (
            <button
              className="mb-2 text-sm text-gray-500 hover:text-gray-300"
              onClick={() => setShowNames(!showNames)}
            >
              {namesOpen ? '▾' : '▸'} Names ({names.length})
            </button>
          )}
          {namesOpen && (
            <div className="space-y-4">
              {names.map((entry, i) => (
                <EntryCard
                  key={`${entry.expression} ${entry.reading} n${i}`}
                  entry={entry}
                  onSearch={onSearch}
                  hasSentences={hasSentences}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

function EntryCard({
  entry,
  onSearch,
  hasSentences
}: {
  entry: DictEntry
  onSearch: (q: string) => void
  hasSentences: boolean
}) {
  const [showKanji, setShowKanji] = useState(false)
  const [showExamples, setShowExamples] = useState(false)
  const [mining, setMining] = useState(false)

  const kanjiChars = [...entry.expression].filter((ch) => {
    const c = ch.codePointAt(0)!
    return c >= 0x4e00 && c <= 0x9fff
  })

  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl font-semibold">{entry.expression}</span>
            {entry.reading && <span className="text-base text-gray-400">{entry.reading}</span>}
            {entry.pitches.map((p, i) => (
              <span key={i} className="text-base text-gray-300">
                <PitchAccent reading={p.reading || entry.reading || entry.expression} position={p.position} />
              </span>
            ))}
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {entry.isName && <span className="chip bg-base-700 text-gray-400">name</span>}
            {entry.isCommon && <span className="chip bg-green-500/20 text-green-300">common</span>}
            {(() => {
              // Pure shared lookup, no IPC: the classic transitivity partner.
              const hit = transitivityPartner(entry.expression)
              if (!hit) return null
              return (
                <button
                  className="chip bg-base-700 text-gray-300 hover:text-accent"
                  onClick={() => onSearch(hit.partner)}
                  title={`${entry.expression} is ${hit.role}; ${hit.partner} is its ${
                    hit.role === 'transitive' ? 'intransitive' : 'transitive'
                  } partner`}
                >
                  pairs with {hit.partner}（{hit.role === 'transitive' ? '自動詞' : '他動詞'}）
                </button>
              )
            })()}
            {entry.frequency && (
              <span
                className="chip bg-base-700 text-gray-400"
                title={`Corpus frequency rank, ${entry.frequency.dictTitle}`}
              >
                rank {entry.frequency.display ?? `#${entry.frequency.rank.toLocaleString()}`}
              </span>
            )}
            {entry.tags.map((t) => (
              <span key={t} className="chip bg-base-700 text-gray-400">
                {t}
              </span>
            ))}
            {entry.source === 'jisho' && (
              <span className="chip bg-base-700 text-gray-500">via jisho.org</span>
            )}
          </div>
        </div>
        <button className="btn-ghost shrink-0 text-sm" onClick={() => setMining((v) => !v)}>
          {mining ? 'Close' : 'Mine'}
        </button>
      </div>

      <div className="mt-3 space-y-3">
        {entry.defs.map((def, i) => (
          <div key={i}>
            <div className="mb-0.5 text-[11px] uppercase tracking-widest text-gray-500">
              {def.dictTitle}
              {def.tags.length > 0 && (
                <span className="ml-2 normal-case tracking-normal text-gray-500">
                  {def.tags.join(' · ')}
                </span>
              )}
            </div>
            <GlossaryBlock items={def.glossary} onSearch={onSearch} />
          </div>
        ))}
      </div>

      {hasSentences && (
        <div className="mt-3 border-t border-base-700 pt-2">
          <button
            className="text-xs text-gray-500 hover:text-gray-300"
            onClick={() => setShowExamples((v) => !v)}
          >
            {showExamples ? '▾' : '▸'} Examples
          </button>
          {showExamples && <ExampleSentences term={entry.expression} />}
        </div>
      )}

      {kanjiChars.length > 0 && (
        <div className="mt-3 border-t border-base-700 pt-2">
          <button
            className="text-xs text-gray-500 hover:text-gray-300"
            onClick={() => setShowKanji((v) => !v)}
          >
            {showKanji ? '▾' : '▸'} Kanji ({kanjiChars.join('')})
          </button>
          {showKanji && <KanjiBreakdown text={entry.expression} />}
        </div>
      )}

      {mining && <MineForm entry={entry} onDone={() => setMining(false)} />}
    </div>
  )
}

function GlossaryBlock({
  items,
  onSearch
}: {
  items: GlossaryItem[]
  onSearch: (q: string) => void
}) {
  return (
    <div className="text-sm text-gray-300">
      {items.map((item, i) => {
        if (typeof item === 'string') return <p key={i}>{item}</p>
        if (item.type === 'text') return <p key={i}>{item.text}</p>
        if (item.type === 'structured-content') {
          return <StructuredContent key={i} content={item.content} onSearch={onSearch} />
        }
        return null // image / unknown
      })}
    </div>
  )
}

function KanjiBreakdown({ text }: { text: string }) {
  const { data: kanji = [], isLoading } = useQuery({
    queryKey: qk.dict.kanji(text),
    queryFn: () => api.dict.kanji(text)
  })
  if (isLoading) return <p className="mt-2 text-xs text-gray-500">Loading…</p>
  if (kanji.length === 0) return <p className="mt-2 text-xs text-gray-500">No kanji data installed.</p>
  return (
    <div className="mt-2 space-y-2">
      {kanji.map((k) => (
        <KanjiRow key={k.character} k={k} />
      ))}
    </div>
  )
}

// Real sentences containing the word, from the offline Tatoeba bank. Loaded
// only when the section is opened — one query per expanded entry. Sentences
// with a recording (sentence-audio pack) get a Play button through a
// module-scoped Audio element — deliberately not the global player queue.
let exampleAudio: HTMLAudioElement | null = null
function playExample(path: string): void {
  exampleAudio?.pause()
  const url = mediaUrl(path)
  if (!url) return
  exampleAudio = new Audio(url)
  void exampleAudio.play().catch(() => {})
}

function ExampleSentences({ term }: { term: string }) {
  const { data: sentences = [], isLoading } = useQuery({
    queryKey: qk.dict.sentences(term),
    queryFn: () => api.dict.sentences(term, 5)
  })
  if (isLoading) return <p className="mt-2 text-xs text-gray-500">Loading…</p>
  if (sentences.length === 0) {
    return <p className="mt-2 text-xs text-gray-500">No example sentences for this word.</p>
  }
  return (
    <ul className="mt-2 space-y-2">
      {sentences.map((s, i) => (
        <li key={i} title={s.attribution ?? undefined}>
          <p className="text-sm text-gray-200">
            {s.jp}
            {s.audioPath && (
              <button
                className="btn-ghost ml-2 px-1.5 py-0 text-xs"
                onClick={() => playExample(s.audioPath!)}
                aria-label="Play recording"
              >
                Play
              </button>
            )}
          </p>
          <p className="text-xs text-gray-500">{s.en}</p>
        </li>
      ))}
    </ul>
  )
}

function KanjiRow({ k }: { k: KanjiInfo }) {
  return (
    <div className="flex gap-3">
      <StrokeOrderDiagram char={k.character} size={80} />
      <span className="text-3xl leading-none">{k.character}</span>
      <div className="min-w-0 text-sm">
        <p className="text-gray-300">{k.meanings.join(', ')}</p>
        {k.onyomi.length > 0 && (
          <p className="text-xs text-gray-500">音 {k.onyomi.join('、')}</p>
        )}
        {k.kunyomi.length > 0 && (
          <p className="text-xs text-gray-500">訓 {k.kunyomi.join('、')}</p>
        )}
        {(k.stats.strokes || k.stats.grade) && (
          <p className="text-xs text-gray-600">
            {k.stats.strokes && <span>{k.stats.strokes} strokes</span>}
            {k.stats.strokes && k.stats.grade && ' · '}
            {k.stats.grade && <span>grade {k.stats.grade}</span>}
          </p>
        )}
        {k.components.length > 0 && (
          <p className="mt-1 flex flex-wrap items-center gap-1">
            <span className="text-xs text-gray-600">parts</span>
            {k.components.map((c) => (
              <Link
                key={c}
                to={`/japanese/kanji?c=${encodeURIComponent(c)}`}
                className="chip bg-base-700 text-gray-400 hover:text-accent"
                title="Find kanji with this part"
              >
                {c}
              </Link>
            ))}
          </p>
        )}
        <SimilarKanjiRow char={k.character} />
      </div>
    </div>
  )
}

// Visual look-alikes (kradfile × KANJIDIC, computed on demand). Renders
// nothing when the packs are missing or nothing clears the threshold.
function SimilarKanjiRow({ char }: { char: string }) {
  const { data: similar = [] } = useQuery({
    queryKey: qk.dict.similar(char),
    queryFn: () => api.dict.similarKanji(char)
  })
  if (similar.length === 0) return null
  return (
    <p className="mt-1 flex flex-wrap items-center gap-1">
      <span className="text-xs text-gray-600">looks like</span>
      {similar.map((s) => (
        <Link
          key={s.character}
          to={`/japanese/dictionary?q=${encodeURIComponent(s.character)}`}
          className="chip bg-base-700 text-gray-400 hover:text-accent"
          title={
            s.sharedComponents.length > 0
              ? `shares ${s.sharedComponents.join(' ')}`
              : 'classic confusion pair'
          }
        >
          {s.character}
        </Link>
      ))}
    </p>
  )
}

// Inline mine form: pre-fills the shared draft from this entry, lets the user
// pick a target lesson, saves into the SRS.
function MineForm({ entry, onDone }: { entry: DictEntry; onDone: () => void }) {
  const mining = useMiningDraft({ sourceMediaId: null, onSaved: onDone })
  const { draft, setDraft, targets, targetLessonId, setLessonId, canSave, saving } = mining

  // Pre-fill the draft from this entry when the form opens, then borrow a real
  // example sentence from the offline bank if one is installed.
  useEffect(() => {
    mining.fillFromEntry(entry)
    void mining.fillExampleFromBank(entry.expression)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mt-3 space-y-2 border-t border-base-700 pt-3">
      <div className="grid grid-cols-2 gap-2">
        <input
          className="input"
          placeholder="Word"
          value={draft.front}
          onChange={(e) => setDraft((d) => ({ ...d, front: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Reading"
          value={draft.reading}
          onChange={(e) => setDraft((d) => ({ ...d, reading: e.target.value }))}
        />
      </div>
      <textarea
        className="input min-h-[60px]"
        placeholder="Meaning"
        value={draft.back}
        onChange={(e) => setDraft((d) => ({ ...d, back: e.target.value }))}
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
      <button className="btn-primary w-full" disabled={!canSave || saving} onClick={() => void mining.save()}>
        {saving ? 'Saving…' : '+ Add to review queue'}
      </button>
    </div>
  )
}
