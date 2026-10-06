import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { regionLabel } from '@shared/history/schema'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import FranchiseBackground from '../components/FranchiseBackground'
import HistoryTimeline from '../components/history/HistoryTimeline'
import DecadeSpread from '../components/history/DecadeSpread'
import { CitationProvider, QuoteBlock } from '../components/history/Citations'
import { HistoryImg, ImageCredit, NativeName } from '../components/history/HistoryBits'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { historyImageSrc, historyPath, useHistoryImageRefresh } from '../lib/historyUi'
import type { HistoryOverview } from '@shared/types'

// The History landing page: the world timeline over the decade front pages.
// Selecting an event fills the lens below the timeline and sets the page's
// pinned background to its archival photo, the franchise-page treatment.

function Lens({ selected }: { selected: string }) {
  const { data } = useQuery({ queryKey: qk.history.article(selected), queryFn: () => api.history.article(selected) })
  if (!data) return <div className="card mt-4 h-40 animate-pulse p-0 motion-reduce:animate-none" aria-hidden="true" />
  const e = data.entity
  const first = 'sections' in e ? e.sections?.flatMap((s) => s.quotes)[0] : undefined
  const info = { title: data.refs[selected]?.title }
  const native = 'names' in e ? e.names.find((n) => n.role === 'native') : undefined
  const primary = e.names.find((n) => n.role === 'primary')?.text ?? info.title ?? selected
  return (
    <CitationProvider order={data.sourceOrder} sources={data.sources}>
      <div className="card mt-4 grid gap-5 overflow-hidden p-0 md:grid-cols-[240px_minmax(0,1fr)]">
        <div className="relative h-44 bg-base-700 md:h-full">
          <HistoryImg image={data.hero} alt="" width={480} className="absolute inset-0 h-full w-full" />
          <ImageCredit image={data.hero} className="absolute bottom-2 left-2 max-w-[90%] truncate" />
        </div>
        <div className="p-5 md:pl-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">Selected</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-2xl font-semibold leading-tight text-ink">{primary}</h2>
            {native && <NativeName native={native} className="text-lg text-ink-secondary" />}
          </div>
          <p className="mt-1 text-sm text-ink-muted">
            {'regions' in e ? e.regions.map(regionLabel).join(', ') : ''}
            {data.interpretations.length > 0 && ` · ${data.interpretations.length} interpretation${data.interpretations.length === 1 ? '' : 's'}`}
            {data.media.length > 0 && ` · ${data.media.length} in media`}
          </p>
          {first && <QuoteBlock quote={first} size="sm" className="mt-4 line-clamp-4" />}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link to={historyPath(selected) ?? '/history'} className="btn-ghost">
              Open article
            </Link>
            {data.mark.read && <span className="text-xs text-signal-affirmative">✓ Read</span>}
          </div>
        </div>
      </div>
    </CitationProvider>
  )
}

function Decades({ overview }: { overview: HistoryOverview }) {
  // The first decade still to read, skipping thin ones (a decade holding only
  // the start of a war researched with the next one) while a fuller one waits.
  const fullest = Math.max(0, ...overview.decades.map((d) => d.events))
  const unread = overview.decades.filter((d) => d.read < d.events)
  const firstUnread = unread.find((d) => d.events * 2 >= fullest) ?? unread[0] ?? overview.decades[0]
  const [decade, setDecade] = usePersistedState('history.decade', firstUnread?.start ?? 1900)
  const { data, dataUpdatedAt } = useQuery({ queryKey: qk.history.decade(decade), queryFn: () => api.history.decade(decade) })
  useHistoryImageRefresh(dataUpdatedAt)
  return (
    <Section title="Decades" subtitle="A front page for each decade">
      <nav className="mb-5 flex flex-wrap items-center gap-2" aria-label="Decades">
        {overview.decades.map((d) => (
          <button
            key={d.start}
            type="button"
            className={`pill ${d.start === decade ? 'pill-active' : ''}`}
            aria-pressed={d.start === decade}
            onClick={() => setDecade(d.start)}
          >
            {d.start}s <span className={d.start === decade ? 'opacity-70' : 'text-gray-500'}>{d.read > 0 ? `${d.read}/${d.events}` : d.events}</span>
          </button>
        ))}
      </nav>
      {data ? <DecadeSpread data={data} /> : <div className="card h-80 animate-pulse motion-reduce:animate-none" aria-hidden="true" />}
    </Section>
  )
}

export default function HistoryHomePage() {
  const { data, isLoading, error, refetch } = useQuery({ queryKey: qk.history.overview, queryFn: () => api.history.overview() })
  const [selected, setSelected] = usePersistedState<string | null>('history.selected', null)
  const selectedValid = useMemo(
    () => (selected && data?.items.some((i) => i.ref === selected) ? selected : (data?.items.find((i) => i.prominence === 1) ?? data?.items[0])?.ref ?? null),
    [selected, data]
  )
  const { data: lensData } = useQuery({
    queryKey: qk.history.article(selectedValid ?? ''),
    queryFn: () => api.history.article(selectedValid!),
    enabled: !!selectedValid
  })
  const next = data?.items.find((i) => !i.read)

  if (isLoading) return <PageStatus>Loading History…</PageStatus>
  if (error || !data) {
    return (
      <div className="p-6">
        <div className="card p-6" role="alert">
          <p className="text-sm text-signal-anomaly">Could not load History{error instanceof Error ? `: ${error.message}` : '.'}</p>
          <button className="btn-ghost mt-3" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  const empty = data.items.length === 0 && data.periods.length === 0
  return (
    <div className="relative min-h-full">
      <FranchiseBackground url={historyImageSrc(lensData?.hero)} />
      <div className="relative z-10 mx-auto max-w-[1600px] p-6">
        <PageHeader
          title="History"
          subtitle="World history by time. Every passage is a verbatim quote from a cited source, and every date and figure carries its citation."
          actions={
            next ? (
              <Link to={historyPath(next.ref) ?? '/history'} className="btn-primary">
                Continue: {next.title}
              </Link>
            ) : undefined
          }
          className="mb-5"
        />
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
          <span><span className="font-semibold tabular-nums text-ink">{data.counts.events}</span> events</span>
          <span><span className="font-semibold tabular-nums text-ink">{data.counts.people}</span> people</span>
          <span><span className="font-semibold tabular-nums text-ink">{data.counts.periods}</span> named periods</span>
          <Link to="/history/sources" className="hover:text-ink">
            <span className="font-semibold tabular-nums text-ink">{data.counts.sources}</span> sources
          </Link>
          <span><span className="font-semibold tabular-nums text-ink">{data.counts.quotes}</span> quotes</span>
          <span><span className="font-semibold tabular-nums text-accent">{data.counts.read}</span> read</span>
        </div>

        {empty || !data.range ? (
          <EmptyState
            title="Nothing researched yet"
            body="History fills in one research session at a time, decade by decade from the 1900s. Each entry is built only from quoted, cited sources."
          />
        ) : (
          <>
            <Section title="World timeline" className="mb-8">
              <HistoryTimeline items={data.items} periods={data.periods} range={data.range} selected={selectedValid} onSelect={setSelected} />
              {selectedValid && <Lens selected={selectedValid} />}
            </Section>
            {data.decades.length > 0 && <Decades overview={data} />}
          </>
        )}
      </div>
    </div>
  )
}
