import { createContext, useContext, useId, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  PERSPECTIVES,
  PROVENANCE_VIA,
  SOURCE_TYPES,
  type Cite,
  type FurtherReading,
  type HistorySource,
  type Locator,
  type Provenance,
  type Quote
} from '@shared/history/schema'
import { usePopover } from '../../lib/hooks'
import { api } from '../../lib/api'

// Footnotes for History pages. Every quote and fact carries a marker [n]
// numbered by its source's first citation on the page (the order the main
// process computed); opening one shows the full reference, the locator and
// how the text was copied. Quote text renders as plain text nodes only.

interface CitationState {
  sources: Record<string, HistorySource>
  number: (sourceId: string) => number
}

const CitationContext = createContext<CitationState>({ sources: {}, number: () => 0 })

export function CitationProvider({
  order,
  sources,
  children
}: {
  order: string[]
  sources: Record<string, HistorySource>
  children: ReactNode
}) {
  const value = useMemo<CitationState>(() => {
    const numbers = new Map(order.map((id, i) => [id, i + 1]))
    let next = order.length
    return {
      sources,
      number: (id) => {
        let n = numbers.get(id)
        if (n === undefined) numbers.set(id, (n = ++next))
        return n
      }
    }
  }, [order, sources])
  return <CitationContext.Provider value={value}>{children}</CitationContext.Provider>
}

export function useCitations(): CitationState {
  return useContext(CitationContext)
}

export function locatorText(loc: Locator): string {
  const parts: string[] = []
  if (loc.page) parts.push(/[-–,]/.test(loc.page) ? `pp. ${loc.page}` : `p. ${loc.page}`)
  if (loc.section) parts.push(`section ${loc.section}`)
  if (loc.folio) parts.push(`fol. ${loc.folio}`)
  if (loc.para) parts.push(`para. ${loc.para}`)
  if (loc.time) parts.push(`at ${loc.time}`)
  return parts.join(', ')
}

export function contributorsText(s: HistorySource): string {
  return s.contributors
    .filter((c) => c.role !== 'translator')
    .map((c) => c.name + (c.role === 'editor' ? ' (ed.)' : ''))
    .join(', ')
}

/** "2" or "2nd" reads "2nd ed."; a catalogue's own wording ("Chāp-i 3", "2nd ed.") is kept as given. */
function editionText(edition: string): string {
  const e = edition.trim().replace(/[.,;\s]+$/, '')
  return /^\d+(st|nd|rd|th)?$/.test(e) ? `${e} ed` : e
}

export function SourceReference({ source, className = '' }: { source: HistorySource; className?: string }) {
  const who = contributorsText(source)
  const translators = source.contributors.filter((c) => c.role === 'translator').map((c) => c.name)
  return (
    <span className={className}>
      {who && <>{who}. </>}
      <i lang={source.lang} dir="auto">
        {source.title}
      </i>
      {source.container && (
        <>
          {' '}
          in <i dir="auto">{source.container}</i>
          {source.volume && ` ${source.volume}`}
          {source.issue && ` (${source.issue})`}
        </>
      )}
      {translators.length > 0 && <>, translated by {translators.join(', ')}</>}
      {source.edition && <>, {editionText(source.edition)}</>}
      {'. '}
      {[source.place, source.publisher].filter(Boolean).join(': ')}
      {(source.place || source.publisher) && ', '}
      {source.date.slice(0, 4)}.
    </span>
  )
}

export function FootnoteMarker({ cite, provenance }: { cite: Cite; provenance?: Provenance }) {
  const { sources, number } = useCitations()
  const [open, setOpen] = useState(false)
  const id = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), { initialFocus: 'panel' })
  const source = sources[cite.source]
  const n = number(cite.source)
  const loc = locatorText(cite.loc)
  return (
    <span className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        className="ml-0.5 align-super text-[0.7em] font-medium leading-none text-signal-link hover:underline"
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        aria-label={`Citation ${n}${source ? `: ${source.title}` : ''}${loc ? `, ${loc}` : ''}`}
        onClick={() => setOpen((o) => !o)}
      >
        [{n}]
      </button>
      {open && (
        <div
          ref={panelRef}
          id={id}
          role="region"
          aria-label={`Citation ${n}`}
          tabIndex={-1}
          className="absolute left-0 top-full z-30 mt-1 w-80 max-w-[80vw] rounded-lg border border-line-strong bg-base-800 p-4 text-left text-xs font-normal normal-case not-italic leading-relaxed tracking-normal text-ink-secondary shadow-2xl"
          dir="ltr"
        >
          {source ? (
            <>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-signal-link">
                Source {n} · {SOURCE_TYPES[source.type] ?? source.type}
              </span>
              <SourceReference source={source} className="mt-1.5 block text-sm text-ink" />
            </>
          ) : (
            <span className="block text-sm text-ink">Source "{cite.source}"</span>
          )}
          {loc && <span className="mt-2 block">Locator: {loc}</span>}
          {provenance && (
            <span className="block text-ink-muted">
              Copied from {PROVENANCE_VIA[provenance.via] ?? provenance.via} on {provenance.at}
            </span>
          )}
          <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {source && (
              <Link to={`/history/source/${source.id}`} className="text-signal-link hover:underline" onClick={() => setOpen(false)}>
                Everything from this source
              </Link>
            )}
            {(provenance?.url || source?.url) && (
              <button
                type="button"
                className="text-signal-link hover:underline"
                onClick={() => void api.app.openExternal((provenance?.url ?? source?.url)!)}
              >
                Open original
              </button>
            )}
          </span>
        </div>
      )}
    </span>
  )
}

/** Markers for a claim's citations, one per distinct source and locator. */
export function Cites({ cites }: { cites?: Cite[] }) {
  if (!cites?.length) return null
  const seen = new Set<string>()
  const unique = cites.filter((c) => {
    const k = `${c.source}|${locatorText(c.loc)}`
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
  return (
    <>
      {unique.map((c, i) => (
        <FootnoteMarker key={i} cite={c} />
      ))}
    </>
  )
}

function Paragraphs({ text }: { text: string }) {
  const parts = text.split(/\n{2,}/)
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className={i > 0 ? 'mt-3 block' : undefined}>
          {p}
        </span>
      ))}
    </>
  )
}

/**
 * A verbatim quote. Right-to-left originals align themselves through
 * `dir="auto"`; a published translation follows with its own citation.
 */
export function QuoteBlock({
  quote,
  size = 'md',
  className = ''
}: {
  quote: Quote
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const text = size === 'lg' ? 'text-[17px] leading-relaxed' : size === 'sm' ? 'text-sm leading-relaxed' : 'text-[15px] leading-relaxed'
  const rtl = /^(fa|ar|he|ur|ps|ku|yi)\b/.test(quote.lang)
  return (
    <figure className={className}>
      <blockquote
        lang={quote.lang}
        dir="auto"
        className={`${rtl ? 'border-r-2 pr-4 leading-loose' : 'border-l-2 pl-4'} border-line-strong ${text} text-ink-secondary`}
      >
        <Paragraphs text={quote.text} />
        <FootnoteMarker cite={quote.cite} provenance={quote.provenance} />
      </blockquote>
      {quote.translation && (
        <figcaption className="mt-2 border-l-2 border-line-subtle pl-4">
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Published translation</span>
          <span lang={quote.translation.lang} dir="auto" className="mt-1 block text-sm leading-relaxed text-ink-muted">
            <Paragraphs text={quote.translation.text} />
            <FootnoteMarker cite={quote.translation.cite} provenance={quote.translation.provenance} />
          </span>
        </figcaption>
      )}
    </figure>
  )
}

/** The page's numbered source list, in footnote order. */
export function Bibliography({ order }: { order: string[] }) {
  const { sources, number } = useCitations()
  const ids = [...order].sort((a, b) => number(a) - number(b))
  if (ids.length === 0) return <p className="text-sm text-ink-muted">No sources yet.</p>
  return (
    <ol className="space-y-3 text-sm">
      {ids.map((id) => {
        const s = sources[id]
        return (
          <li key={id} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
            <span className="tabular-nums text-signal-link">{number(id)}</span>
            <div className="min-w-0">
              {s ? (
                <Link to={`/history/source/${id}`} className="text-ink-secondary hover:text-ink">
                  <SourceReference source={s} />
                </Link>
              ) : (
                <span className="text-ink-muted">{id}</span>
              )}
              {s && (
                <span className="mt-1 flex flex-wrap gap-2 text-xs text-ink-muted">
                  <span className="chip">{SOURCE_TYPES[s.type] ?? s.type}</span>
                  {s.translationOf && <span className="chip">Published translation</span>}
                  {s.accessed && <span className="chip">Web, accessed {s.accessed}</span>}
                </span>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * Further reading: works from other traditions, grouped by perspective. They are
 * bibliography only (never quoted on the page), so they carry no footnote number.
 */
export function FurtherReadingList({ items }: { items: FurtherReading[] }) {
  const { sources } = useCitations()
  const groups = new Map<string, FurtherReading[]>()
  for (const r of items) groups.set(r.perspective, [...(groups.get(r.perspective) ?? []), r])
  return (
    <div className="space-y-5">
      {[...groups.entries()].map(([perspective, list]) => (
        <div key={perspective}>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-signal-link">
            {PERSPECTIVES[perspective as keyof typeof PERSPECTIVES] ?? perspective}
          </p>
          <ul className="space-y-2 text-sm">
            {list.map((r) => {
              const s = sources[r.source]
              return (
                <li key={r.source}>
                  {s ? (
                    <Link to={`/history/source/${r.source}`} className="text-ink-secondary hover:text-ink">
                      <SourceReference source={s} />
                    </Link>
                  ) : (
                    <span className="text-ink-muted">{r.source}</span>
                  )}
                  {s && s.lang !== 'en' && <span className="ml-2 chip">{languageName(s.lang)}</span>}
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

function languageName(code: string): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) ?? code
  } catch {
    return code
  }
}
