import { useEffect, useId, useState, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { defaultSelection, percent, readTime, selectionSize, toggle } from '../../lib/kindle'
import { toast } from '../../lib/toast'
import Dialog from '../Dialog'
import { Field } from '../Field'
import type { KindleApplySelection, KindlePreviewBook, KindlePreviewWord } from '@shared/types'

// The import preview: what the last Kindle check would change, book by book,
// each line with its own checkbox. Nothing is written until Apply.
export default function KindleImportDialog({
  scanId,
  onClose
}: {
  scanId: string
  onClose: () => void
}) {
  const headingId = useId()
  const qc = useQueryClient()
  const { data: preview, isLoading, isError, error, refetch } = useQuery({
    queryKey: qk.kindle.preview(scanId),
    queryFn: () => api.kindle.preview(),
    // Fresh each time the dialog opens (gcTime 0), but never refetched while
    // it is open: the ticks are built from this list, and a refetch on window
    // focus would change the list under them.
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    gcTime: 0
  })
  const [sel, setSel] = useState<KindleApplySelection | null>(null)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    if (preview && !sel) setSel(defaultSelection(preview))
  }, [preview, sel])

  async function apply(): Promise<void> {
    if (!sel) return
    setApplying(true)
    try {
      const r = await api.kindle.apply(sel)
      const parts = [
        r.progressUpdated && `${r.progressUpdated} progress`,
        r.statusUpdated && `${r.statusUpdated} status`,
        r.quotesAdded && `${r.quotesAdded} new quotes`,
        r.quotesUpdated && `${r.quotesUpdated} quotes updated`,
        r.readingDays && `${r.readingDays} reading days`,
        r.checklistCredits && `${r.checklistCredits} checklist days`,
        r.wordsAdded && `${r.wordsAdded} words`
      ].filter(Boolean)
      toast(`Imported from the Kindle: ${parts.join(', ') || 'nothing changed'}`, 'success')
      onClose()
      void qc.invalidateQueries({ queryKey: qk.kindle.all })
      void qc.invalidateQueries({ queryKey: qk.media.all })
      void qc.invalidateQueries({ queryKey: qk.quotes.all })
      void qc.invalidateQueries({ queryKey: qk.checklist.all })
      if (r.wordsAdded) {
        void qc.invalidateQueries({ queryKey: qk.english.all })
        void qc.invalidateQueries({ queryKey: qk.japanese.all })
      }
    } finally {
      setApplying(false)
    }
  }

  const books = preview?.books ?? []
  const count = sel ? selectionSize(sel) : 0

  return (
    <Dialog
      labelledBy={headingId}
      onClose={onClose}
      panelClassName="card flex max-h-full w-full max-w-2xl flex-col p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 id={headingId} className="text-lg font-semibold">
          Import from {preview?.deviceLabel ?? 'the Kindle'}
        </h2>
        <button className="px-2 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <div className="-mx-1 flex-1 space-y-4 overflow-y-auto px-1">
        {isLoading ? (
          <p className="text-sm text-gray-400">Reading the last check…</p>
        ) : isError ? (
          <div className="text-sm">
            <p className="text-signal-anomaly">{(error as Error).message}</p>
            <button type="button" className="btn-ghost mt-2 text-xs" onClick={() => void refetch()}>
              Try again
            </button>
          </div>
        ) : preview && sel ? (
          <>
            {preview.warnings.map((w) => (
              <p key={w} role="status" className="text-sm text-signal-caution">
                {w}
              </p>
            ))}
            {preview.readingRange && (
              <p className="text-xs text-gray-400">
                Reading records on the Kindle run from {preview.readingRange.first} to {preview.readingRange.last}.
                If those dates look wrong, the Kindle's clock is off.
              </p>
            )}
            {!books.some(actionable) && preview.words.length === 0 && (
              <p className="text-sm text-gray-400">
                Nothing new: every linked book already matches the Kindle.
              </p>
            )}
            {books.map((b) => (
              <BookRow key={b.mediaId} book={b} sel={sel} onChange={setSel} />
            ))}
            {preview.words.length > 0 && <WordsSection words={preview.words} sel={sel} onChange={setSel} />}
            {preview.unmatched.length > 0 && (
              <p className="text-sm text-gray-400">
                {preview.unmatched.length} {preview.unmatched.length === 1 ? 'book' : 'books'} on the Kindle
                {preview.unmatched.length === 1 ? ' is' : ' are'} not linked to your library and{' '}
                {preview.unmatched.length === 1 ? 'is' : 'are'} left out. Link them on the Kindle page to import
                {preview.unmatched.length === 1 ? ' it' : ' them'}.
              </p>
            )}
          </>
        ) : null}
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button type="button" className="btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button
          type="button"
          className="btn-primary"
          disabled={!sel || count === 0 || applying}
          onClick={() => void apply()}
        >
          {applying ? 'Applying…' : `Apply ${count} ${count === 1 ? 'change' : 'changes'}`}
        </button>
      </div>
    </Dialog>
  )
}

// A book with something to tick; a re-read alone is only a note.
function actionable(b: KindlePreviewBook): boolean {
  return b.progress != null || b.status != null || b.quotes.length > 0 || b.reading != null
}

function Check({
  label,
  checked,
  onChange,
  children
}: {
  label: string
  checked: boolean
  onChange: (on: boolean) => void
  children?: ReactNode
}) {
  return (
    <label className="flex items-start gap-2 text-sm">
      <input
        type="checkbox"
        className="mt-1"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
      <span className="min-w-0 flex-1">{children ?? label}</span>
    </label>
  )
}

function BookRow({
  book: b,
  sel,
  onChange
}: {
  book: KindlePreviewBook
  sel: KindleApplySelection
  onChange: (s: KindleApplySelection) => void
}) {
  const quoteKeys = b.quotes.map((q) => q.key)
  const allQuotes = quoteKeys.every((k) => sel.quotes.includes(k))
  return (
    <section className="rounded border border-line-subtle p-3" aria-label={b.title}>
      <h3 className="mb-2 font-semibold">{b.title}</h3>
      <div className="space-y-2">
        {b.progress && (
          <Check
            label={`Progress for ${b.title}`}
            checked={sel.progress.includes(b.mediaId)}
            onChange={(on) => onChange({ ...sel, progress: toggle(sel.progress, b.mediaId, on) })}
          >
            {b.kind === 'manga' ? (
              <>
                Progress: chapter {b.progress.from} to {b.progress.to}
                {b.progress.total != null && ` of ${b.progress.total}`}
                <span className="text-gray-400">
                  {b.chapterNumbering === 'per-volume'
                    ? ' (counted in volume order, because the chapter numbers start again in each volume; check it before ticking)'
                    : ' (the highest chapter read on the Kindle)'}
                </span>
              </>
            ) : (
              <>
                Progress: page {b.progress.from} to {b.progress.to} of {b.progress.total}
                {b.percent != null && <span className="text-gray-400"> ({percent(b.percent)} on the Kindle)</span>}
              </>
            )}
          </Check>
        )}
        {b.status && (
          <Check
            label={`Status for ${b.title}`}
            checked={sel.status.includes(b.mediaId)}
            onChange={(on) => onChange({ ...sel, status: toggle(sel.status, b.mediaId, on) })}
          >
            Status: {b.status.from ?? 'none'} to {b.status.to}
            <span className="text-gray-400">
              {b.status.reason === 'finished'
                ? ' (marked finished in KOReader)'
                : b.status.reason === 'abandoned'
                  ? ' (on hold in KOReader)'
                  : ' (started on the Kindle)'}
            </span>
          </Check>
        )}
        {b.volumesRead.length > 0 && (
          <p className="text-sm text-gray-400">
            {b.volumesRead.length} {b.volumesRead.length === 1 ? 'volume file is' : 'volume files are'} read on the
            Kindle. Volumes do not say which chapters they hold, so set those chapters on the manga page.
          </p>
        )}
        {b.rereading && (
          <p className="text-sm text-gray-400">
            Completed here, and {percent(b.percent) ?? 'part-way'} through on the Kindle. Nothing changes; start a
            re-read from the book page if that is what this is.
          </p>
        )}
        {b.reading && (
          <Check
            label={`Reading time for ${b.title}`}
            checked={sel.reading.includes(b.mediaId)}
            onChange={(on) => onChange({ ...sel, reading: toggle(sel.reading, b.mediaId, on) })}
          >
            Reading time: {readTime(b.reading.seconds)} over {b.reading.days}{' '}
            {b.reading.days === 1 ? 'day' : 'days'} ({b.reading.firstDay} to {b.reading.lastDay})
            {b.reading.credits > 0 && (
              <span className="text-gray-400">
                {' '}
                · counts {b.reading.credits} {b.reading.credits === 1 ? 'day' : 'days'} toward the checklist
              </span>
            )}
          </Check>
        )}
        {b.quotes.length > 0 && (
          <details>
            <summary className="cursor-pointer text-sm">
              {b.quotes.filter((q) => q.kind === 'new').length} new and{' '}
              {b.quotes.filter((q) => q.kind === 'update').length} updated highlights for Quotes
            </summary>
            <div className="mt-2 space-y-2 pl-1">
              <Check
                label={`All highlights for ${b.title}`}
                checked={allQuotes}
                onChange={(on) =>
                  onChange({
                    ...sel,
                    quotes: on
                      ? [...new Set([...sel.quotes, ...quoteKeys])]
                      : sel.quotes.filter((k) => !quoteKeys.includes(k))
                  })
                }
              >
                All highlights
              </Check>
              {b.quotes.map((q) => (
                <Check
                  key={q.key}
                  label={`Highlight: ${q.text.slice(0, 60)}`}
                  checked={sel.quotes.includes(q.key)}
                  onChange={(on) => onChange({ ...sel, quotes: toggle(sel.quotes, q.key, on) })}
                >
                  <span className="block whitespace-pre-line">{q.text}</span>
                  {q.note && <span className="block text-xs text-gray-400">Note: {q.note}</span>}
                  <span className="block text-xs text-gray-500">
                    {q.kind === 'update' ? 'Changed on the Kindle' : 'New'}
                    {q.locator ? ` · ${q.locator}` : ''}
                  </span>
                </Check>
              ))}
            </div>
          </details>
        )}
        {b.skippedDeleted > 0 && (
          <p className="text-xs text-gray-400">
            {b.skippedDeleted} {b.skippedDeleted === 1 ? 'highlight was' : 'highlights were'} deleted from Quotes
            and will not come back.
          </p>
        )}
      </div>
    </section>
  )
}

// Words looked up in KOReader: English ones go to the English deck, Japanese
// ones to the Japanese mining inbox, each with the sentence it was read in.
function WordsSection({
  words,
  sel,
  onChange
}: {
  words: KindlePreviewWord[]
  sel: KindleApplySelection
  onChange: (s: KindleApplySelection) => void
}) {
  const importable = words.filter((w) => w.importable).map((w) => w.key)
  const all = importable.length > 0 && importable.every((k) => sel.words.includes(k))
  const en = words.filter((w) => w.kind === 'en').length
  const jp = words.length - en
  return (
    <section className="rounded border border-line-subtle p-3" aria-label="Looked-up words">
      <h3 className="mb-1 font-semibold">Words you looked up</h3>
      <p className="mb-2 text-xs text-gray-400">
        {[en && `${en} English for the English deck`, jp && `${jp} Japanese for the Japanese mining inbox`]
          .filter(Boolean)
          .join(', ')}
        . Meanings come from the offline dictionaries; each word keeps the sentence and the book.
        {words.some((w) => !w.importable && w.kind === 'en') &&
          ' For English meanings, install the English dictionary in Settings, Learning.'}
      </p>
      <details>
        <summary className="cursor-pointer text-sm">
          {sel.words.length} of {words.length} words ticked
        </summary>
        <div className="mt-2 space-y-2 pl-1">
          {importable.length > 1 && (
            <Check
              label="All words"
              checked={all}
              onChange={(on) =>
                onChange({
                  ...sel,
                  words: on
                    ? [...new Set([...sel.words, ...importable])]
                    : sel.words.filter((k) => !importable.includes(k))
                })
              }
            >
              All words
            </Check>
          )}
          {words.map((w) =>
            w.importable ? (
              <Check
                key={w.key}
                label={`Word: ${w.word}`}
                checked={sel.words.includes(w.key)}
                onChange={(on) => onChange({ ...sel, words: toggle(sel.words, w.key, on) })}
              >
                <WordText word={w} />
              </Check>
            ) : (
              <div key={w.key} className="pl-6 text-sm">
                <WordText word={w} />
                <Field
                  label={`Meaning for ${w.word}`}
                  hiddenLabel
                  className="mt-1"
                  description="No offline dictionary entry. Type a meaning to add it."
                >
                  <input
                    className="input w-full text-sm"
                    placeholder="Type a meaning to add this word"
                    value={sel.wordMeanings?.[w.key] ?? ''}
                    onChange={(e) => {
                      const text = e.target.value
                      const wordMeanings = { ...(sel.wordMeanings ?? {}), [w.key]: text }
                      onChange({ ...sel, wordMeanings, words: toggle(sel.words, w.key, text.trim().length > 0) })
                    }}
                  />
                </Field>
              </div>
            )
          )}
        </div>
      </details>
    </section>
  )
}

function WordText({ word: w }: { word: KindlePreviewWord }) {
  return (
    <>
      <span className="block">
        <span className="font-medium">{w.word}</span>
        {w.reading && <span className="text-gray-400"> ({w.reading})</span>}
        {w.meaning && <span>: {w.meaning}</span>}
      </span>
      {w.context && <span className="block text-xs text-gray-400">{w.context}</span>}
      {w.book && <span className="block text-xs text-gray-500">{w.book}</span>}
    </>
  )
}
