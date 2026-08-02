import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast } from '../../lib/toast'
import { useMiningDraft } from '../../lib/useMining'
import { mediaUrl } from '@shared/mediaUrl'
import { englishLookupTerm, splitEnglishWords } from '@shared/subtitles'
import DictResultRow from '../japanese/DictResultRow'
import EnEntryCard, { savedKey } from '../english/EnEntryCard'
import type { DictEntry, EnDictEntry, EnDictMeaning, JpToken } from '@shared/types'

// Screenshot + sentence audio captured off the video player, handed in as a
// prop so the panel stays a dumb renderer of whatever the page captured.
export interface MiningAttachment {
  imagePath: string | null
  audioPath: string | null
}

export interface MiningPanelProps {
  mediaId: number | null // the source manga/book/anime, or null off a reader page
  blockText: string | null // tapped OCR block (joined lines); null = manual mode
  initialTerm: string | null // drag-selected text — pre-fills the term box
  attach?: MiningAttachment | null // video player: frame + line audio for the card
  // Which dictionary the caller expects. UNDEFINED keeps the original
  // Japanese-only behaviour with no mode switch — which is why the manga and
  // book readers are untouched by the English mode existing at all.
  lang?: 'ja' | 'en' | 'other'
  onClose: () => void
}

// The word-mining side panel: shows a tapped OCR block, a book paragraph or a
// subtitle line, looks terms up, and saves them. The shell owns the mode
// switch; each body owns its own queries, so English mode never runs kuromoji
// and Japanese mode never queries the English dictionary.
export default function MiningPanel(props: MiningPanelProps) {
  const { lang, onClose } = props
  const [mode, setMode] = useState<'ja' | 'en'>(lang === 'en' ? 'en' : 'ja')
  // Clicking a word in the EN crutch row FLIPS this panel rather than opening a
  // competing one.
  useEffect(() => {
    if (lang === 'ja' || lang === 'en') setMode(lang)
  }, [lang])

  return (
    <div className="w-[360px] shrink-0 h-full overflow-y-auto bg-base-900 border-l border-base-700 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-300">Mine words</h2>
        <div className="flex items-center gap-2">
          {lang !== undefined && (
            <div className="flex gap-1">
              <button
                className={mode === 'ja' ? 'pill pill-active' : 'pill'}
                onClick={() => setMode('ja')}
              >
                JP
              </button>
              <button
                className={mode === 'en' ? 'pill pill-active' : 'pill'}
                onClick={() => setMode('en')}
              >
                EN
              </button>
            </div>
          )}
          <button className="btn-ghost py-0.5 px-2 text-xs" onClick={onClose} title="Close (M)">
            ✕
          </button>
        </div>
      </div>
      {mode === 'en' ? <EnglishMineBody {...props} /> : <JapaneseMineBody {...props} />}
    </div>
  )
}

function JapaneseMineBody({
  mediaId,
  blockText,
  initialTerm,
  attach
}: MiningPanelProps) {
  const termRef = useRef<HTMLInputElement>(null)
  const [term, setTerm] = useState('')
  const [results, setResults] = useState<DictEntry[] | null>(null)
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
    ...(results?.map((r) => r.expression) ?? [])
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
      let found = await api.dict.lookup(trimmed)
      // A token's base form can miss (OCR noise, names); retry with the
      // surface form before giving up.
      if (found.length === 0 && retryWith && retryWith !== trimmed) {
        found = await api.dict.lookup(retryWith)
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

  // Capture from the video player lands here. Merged into the draft rather
  // than replacing it, so grabbing a frame doesn't wipe a half-typed card.
  useEffect(() => {
    if (!attach) return
    setDraft((d) => ({
      ...d,
      imagePath: attach.imagePath ?? d.imagePath,
      audioPath: attach.audioPath ?? d.audioPath
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attach?.imagePath, attach?.audioPath])

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
    <>
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
              <span className="mt-1 block text-xs text-gray-400">
                (No tokenizer — select text on the page or type below.)
              </span>
            </p>
          )}
        </div>
      )}

      <div>
        <div className="label mb-1">Look up (offline)</div>
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
            {searching ? '…' : 'Search'}
          </button>
        </div>
      </div>

      {results !== null &&
        (results.length === 0 ? (
          <p className="text-sm text-gray-500">Nothing found — fill in the card by hand below.</p>
        ) : (
          <div className="space-y-1.5">
            {results.map((r, i) => (
              <DictResultRow
                key={`${r.expression} ${r.reading} ${i}`}
                entry={r}
                size="sm"
                selected={draft.front === r.expression}
                mined={isMined(r.expression)}
                onPick={() => mining.fillFromEntry(r, blockText ?? undefined)}
              />
            ))}
          </div>
        ))}

      <div className="border-t border-base-700 pt-3 space-y-2">
        {(draft.imagePath || draft.audioPath) && (
          <div className="flex items-start gap-2 rounded-lg border border-base-700 bg-base-800 p-2">
            {draft.imagePath && (
              <div className="relative shrink-0">
                <img
                  src={mediaUrl(draft.imagePath) ?? undefined}
                  alt="Captured frame"
                  className="h-14 w-24 rounded object-cover"
                />
                <button
                  className="absolute -right-1 -top-1 rounded-full bg-base-900/90 px-1 text-xs text-gray-400 hover:text-white"
                  title="Remove screenshot"
                  aria-label="Remove screenshot"
                  onClick={() => setDraft((d) => ({ ...d, imagePath: null }))}
                >
                  ✕
                </button>
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-gray-500">
                Captured
              </span>
              {draft.audioPath && (
                <div className="flex items-center gap-1">
                  <button
                    className="btn-ghost px-2 py-0.5 text-xs"
                    title="Play the line"
                    onClick={() => {
                      const url = mediaUrl(draft.audioPath!)
                      if (url) void new Audio(url).play().catch(() => undefined)
                    }}
                  >
                    ▶ Sentence audio
                  </button>
                  <button
                    className="text-xs text-gray-500 hover:text-white"
                    title="Remove audio"
                    aria-label="Remove audio"
                    onClick={() => setDraft((d) => ({ ...d, audioPath: null }))}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
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
    </>
  )
}

// English lookups from a subtitle line. Saves land in the flat `en_word` list
// (deliberately outside the Japanese SRS — CLAUDE.md 2026-07-29), so there is
// no draft form here and no attachment strip: the screenshot and sentence audio
// are card fields, and an English save isn't a card.
function EnglishMineBody({ blockText, initialTerm }: MiningPanelProps) {
  const qc = useQueryClient()
  const termRef = useRef<HTMLInputElement>(null)
  const [term, setTerm] = useState('')
  const [query, setQuery] = useState('')
  const [saving, setSaving] = useState<Set<string>>(new Set())

  const { data: entries = [], isFetching } = useQuery({
    queryKey: qk.english.lookup(query),
    queryFn: () => api.english.lookup(query),
    enabled: query.length > 0
  })

  // The same single unfiltered list the /english page uses, so a word saved
  // here shows as saved there immediately (and vice versa).
  const { data: words = [] } = useQuery({
    queryKey: qk.english.words(''),
    queryFn: () => api.english.listWords()
  })
  const saved = useMemo(() => new Set(words.map((w) => savedKey(w.word, w.meaning))), [words])

  useEffect(() => {
    if (!initialTerm) return
    const t = englishLookupTerm(initialTerm)
    setTerm(t)
    setQuery(t)
  }, [initialTerm])

  async function save(
    entry: EnDictEntry,
    meaning: EnDictMeaning,
    definition: string,
    example: string | null
  ): Promise<void> {
    const key = savedKey(entry.word, definition)
    setSaving((s) => new Set(s).add(key))
    try {
      await api.english.saveWord({
        word: entry.word,
        phonetic: entry.phonetic,
        pos: meaning.partOfSpeech || null,
        meaning: definition,
        example
      })
      await qc.invalidateQueries({ queryKey: qk.english.all })
      toast(`Saved “${entry.word}”`, 'success')
    } finally {
      setSaving((s) => {
        const next = new Set(s)
        next.delete(key)
        return next
      })
    }
  }

  return (
    <>
      {blockText && (
        <div className="rounded-lg border border-base-700 bg-base-800 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-gray-500">The line</span>
            <button
              className="btn-ghost px-2 py-0.5 text-xs"
              onClick={() => navigator.clipboard.writeText(blockText)}
              title="Copy sentence"
            >
              Copy
            </button>
          </div>
          {/* splitEnglishWords is pure and synchronous — an English line is
              clickable with no IPC at all. */}
          <div className="flex flex-wrap gap-1 leading-relaxed">
            {splitEnglishWords(blockText).map((part, i) =>
              part.word ? (
                <button
                  key={i}
                  className="rounded px-1 text-base text-gray-100 transition-colors hover:bg-accent/20 hover:text-accent"
                  onClick={() => {
                    const t = englishLookupTerm(part.text)
                    setTerm(t)
                    setQuery(t)
                  }}
                >
                  {part.text}
                </button>
              ) : (
                <span key={i} className="px-0.5 text-base text-gray-600">
                  {part.text}
                </span>
              )
            )}
          </div>
        </div>
      )}

      <div>
        <div className="label mb-1">Look up (English)</div>
        <div className="flex gap-2">
          <input
            ref={termRef}
            className="input flex-1"
            placeholder="e.g. reticent…"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setQuery(term.trim())
              e.stopPropagation() // don't trigger player shortcuts while typing
            }}
          />
          <button
            className="btn-primary"
            disabled={isFetching || !term.trim()}
            onClick={() => setQuery(term.trim())}
          >
            {isFetching ? '…' : 'Search'}
          </button>
        </div>
      </div>

      {query.length > 0 &&
        !isFetching &&
        (entries.length === 0 ? (
          <p className="text-sm text-gray-500">No definitions found for “{query}”.</p>
        ) : (
          <div className="space-y-2">
            {entries.map((entry, i) => (
              <EnEntryCard
                key={`${entry.word}-${i}`}
                entry={entry}
                saved={saved}
                saving={saving}
                onSave={save}
              />
            ))}
          </div>
        ))}
    </>
  )
}
