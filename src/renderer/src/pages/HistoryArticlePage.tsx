import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { decimalYear, formatHistDate } from '@shared/history/calendars'
import {
  EVENT_TYPES,
  FIGURE_KEYS,
  NAME_ROLES,
  PARTICIPANT_ROLES,
  PERIOD_TYPES,
  PERSON_ROLES,
  PLACE_TYPES,
  RANGE_QUALIFIERS,
  RELATION_KINDS,
  SECTION_KINDS,
  regionLabel,
  type HistoryArticle,
  type HistoryEvent,
  type HistoryPerson,
  type NameVariant,
  type Range
} from '@shared/history/schema'
import type { HistoryArticleView, HistoryRefInfo } from '@shared/types'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import FavoriteButton from '../components/FavoriteButton'
import FranchiseBackground from '../components/FranchiseBackground'
import { Field } from '../components/Field'
import { Bibliography, CitationProvider, Cites, QuoteBlock } from '../components/history/Citations'
import {
  ClaimView,
  DateClaim,
  HistDateText,
  HolderNames,
  ImageCredit,
  NativeName,
  PersonalBadge,
  RefCard,
  RefRow
} from '../components/history/HistoryBits'
import InterpretationsPanel from '../components/history/InterpretationsPanel'
import { MediaRows } from '../components/history/HistoryMediaCards'
import HistoryArchiveList from '../components/history/HistoryArchiveList'
import LinkTitleDialog from '../components/history/LinkTitleDialog'
import ActionMenu from '../components/ActionMenu'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { historyImageSrc, historyPath, useHistoryImageRefresh } from '../lib/historyUi'
import { confirmDialog } from '../lib/confirm'
import { useLeaveDeleted } from '../lib/navState'

// One History entity as a long wiki page: a hero over its pinned archival
// background, a sticky contents rail, the quoted article itself and a cited
// infobox. Every sentence in the article column is a QuoteBlock; everything
// else is a name, a date, a link or a fixed label.

type Kind = HistoryArticle['kind']

interface TocItem {
  id: string
  label: string
  count?: number
}

function SectionBlock({ id, title, aside, children }: { id: string; title: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="mb-12 scroll-mt-6">
      <div className="section-heading mb-4 flex items-center gap-3">
        <h2 id={`${id}-h`} className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">
          {title}
        </h2>
        <span className="h-px flex-1 bg-line-subtle" aria-hidden="true" />
        {aside}
      </div>
      {children}
    </section>
  )
}

function Contents({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id)
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e)
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setCurrent(visible[0].target.id)
      },
      { rootMargin: '-10% 0px -70% 0px' }
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [items])
  return (
    <nav className="sticky top-6 hidden lg:block" aria-label="Contents">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Contents</p>
      <ol className="space-y-0.5 border-l border-line-subtle text-sm">
        {items.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              aria-current={current === i.id ? 'location' : undefined}
              onClick={() => document.getElementById(i.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              className={`-ml-px block w-full border-l-2 py-1 pl-3 text-left ${
                current === i.id ? 'border-accent text-accent' : 'border-transparent text-ink-secondary hover:text-ink'
              }`}
            >
              {i.label}
              {i.count !== undefined && <span className="ml-1 text-ink-muted">{i.count}</span>}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-line-subtle py-3 first:border-t-0 first:pt-0">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-signal-link">{label}</p>
      <div className="mt-1 text-sm text-ink-secondary">{children}</div>
    </div>
  )
}

function RefLink({ info }: { info: HistoryRefInfo | undefined }) {
  if (!info) return null
  const to = historyPath(info.ref)
  return to && !info.missing ? (
    <Link to={to} className="hover:text-accent">
      {info.title}
    </Link>
  ) : (
    <span className="text-ink-muted">{info.title}</span>
  )
}

const rangeText = (r: Range): string =>
  r.max !== undefined && r.max !== r.min
    ? `${r.min.toLocaleString()} to ${r.max.toLocaleString()}`
    : `${r.qualifier ? `${RANGE_QUALIFIERS[r.qualifier]} ` : ''}${r.min.toLocaleString()}`

function Infobox({ view, inline }: { view: HistoryArticleView; inline?: boolean }) {
  const card = <InfoCard view={view} />
  // Facts are content, not optional context: below xl they move inline
  // above the article instead of disappearing.
  return inline ? (
    <section className="mb-8 xl:hidden" aria-label="Facts">
      {card}
    </section>
  ) : (
    <aside className="hidden xl:block" aria-label="Facts">
      <div className="sticky top-6">{card}</div>
    </aside>
  )
}

function InfoCard({ view }: { view: HistoryArticleView }) {
  const e = view.entity
  const sh = view.solarHijri
  const ref = (r: string): HistoryRefInfo | undefined => view.refs[r]
  return (
        <div className="context-panel card overflow-hidden p-0">
          <div className="p-5">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-ink">Facts</h2>
              {view.personal && <PersonalBadge />}
            </div>
            <div className="mt-4">
              {e.kind === 'event' && (
                <>
                  <Fact label="Type">{EVENT_TYPES[e.type]}</Fact>
                  <Fact label={e.end ? 'Began' : 'Date'}>
                    <DateClaim claim={e.start} solarHijri={sh} />
                  </Fact>
                  {e.end && (
                    <Fact label="Ended">
                      <DateClaim claim={e.end} solarHijri={sh} />
                    </Fact>
                  )}
                  {e.places && e.places.length > 0 && (
                    <Fact label="Where">
                      {e.places.map((p, i) => (
                        <span key={p.ref}>
                          {i > 0 && ', '}
                          <RefLink info={ref(p.ref)} />
                          <Cites cites={p.cites} />
                        </span>
                      ))}
                    </Fact>
                  )}
                  {e.sides && e.sides.length > 0 && (
                    <Fact label="Sides">
                      <ul className="space-y-1">
                        {e.sides.map((s) => (
                          <li key={s.key}>
                            {s.name}
                            <Cites cites={s.cites} />
                          </li>
                        ))}
                      </ul>
                    </Fact>
                  )}
                  {e.figures?.map((f, i) => (
                    <Fact key={i} label={`${FIGURE_KEYS[f.key]}${f.side ? ` · ${e.sides?.find((s) => s.key === f.side)?.name ?? f.side}` : ''}`}>
                      <ClaimView claim={f.value} render={(v) => <span className="font-semibold tabular-nums text-ink">{rangeText(v)}</span>} />
                    </Fact>
                  ))}
                </>
              )}
              {e.kind === 'person' && (
                <>
                  <Fact label="Born">
                    {e.born ? <DateClaim claim={e.born} solarHijri={sh} /> : 'Unknown'}
                    {e.bornIn && (
                      <span className="block">
                        <RefLink info={ref(e.bornIn.ref)} />
                        <Cites cites={e.bornIn.cites} />
                      </span>
                    )}
                  </Fact>
                  {(e.died || e.diedIn) && (
                    <Fact label="Died">
                      {e.died && <DateClaim claim={e.died} solarHijri={sh} />}
                      {e.diedIn && (
                        <span className="block">
                          <RefLink info={ref(e.diedIn.ref)} />
                          <Cites cites={e.diedIn.cites} />
                        </span>
                      )}
                    </Fact>
                  )}
                  <Fact label="Roles">{e.roles.map((r) => PERSON_ROLES[r]).join(', ')}</Fact>
                  {e.offices && e.offices.length > 0 && (
                    <Fact label="Offices">
                      <ul className="space-y-2">
                        {e.offices.map((o, i) => (
                          <li key={i}>
                            <span lang={o.lang} dir="auto" className="text-ink">
                              {o.title}
                            </span>
                            <Cites cites={o.cites} />
                            {(o.start || o.end) && (
                              <span className="block text-xs text-ink-muted">
                                {o.start?.alts[0] ? formatHistDate(o.start.alts[0].value, { short: true }) : '?'} to{' '}
                                {o.end?.alts[0] ? formatHistDate(o.end.alts[0].value, { short: true }) : '?'}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </Fact>
                  )}
                </>
              )}
              {e.kind === 'period' && (
                <>
                  <Fact label="Type">{PERIOD_TYPES[e.periodType]}</Fact>
                  <Fact label="Began">
                    <DateClaim claim={e.start} solarHijri={sh} />
                  </Fact>
                  {e.end && (
                    <Fact label="Ended">
                      <DateClaim claim={e.end} solarHijri={sh} />
                    </Fact>
                  )}
                  {e.parent && (
                    <Fact label="Part of">
                      <RefLink info={ref(e.parent)} />
                    </Fact>
                  )}
                </>
              )}
              {e.kind === 'place' && (
                <>
                  <Fact label="Type">{PLACE_TYPES[e.placeType]}</Fact>
                  {e.coords && (
                    <Fact label="Coordinates">
                      <span className="tabular-nums">
                        {e.coords.lat.toFixed(3)}, {e.coords.lon.toFixed(3)}
                      </span>
                      <Cites cites={e.coords.cites} />
                    </Fact>
                  )}
                </>
              )}
              {e.kind === 'event' && e.partOf && e.partOf.length > 0 && (
                <Fact label="Part of">
                  {e.partOf.map((p, i) => (
                    <span key={p.ref}>
                      {i > 0 && ', '}
                      <RefLink info={ref(p.ref)} />
                      <Cites cites={p.cites} />
                    </span>
                  ))}
                </Fact>
              )}
              <Fact label="Regions">{e.regions.map(regionLabel).join(', ')}</Fact>
            </div>
          </div>
          <div className="border-t border-line-subtle px-5 py-3 text-xs text-ink-muted">
            {view.mark.read ? `Read ${view.mark.read.slice(0, 10)}` : 'Not read yet'}
            {'researched' in e && ` · Researched ${e.researched}`}
          </div>
        </div>
  )
}

function OtherNames({ names }: { names: NameVariant[] }) {
  const others = names.filter((n) => n.role !== 'primary' && n.role !== 'native')
  if (others.length === 0) return null
  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-gray-300">
      {others.map((n, i) => (
        <span key={i}>
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">{NAME_ROLES[n.role]} </span>
          <span lang={n.lang} dir="auto" className="text-white">
            {n.text}
          </span>
          {n.translit && <span className="text-gray-400"> ({n.translit})</span>}
          {n.usedBy && (
            <span className="text-gray-400">
              {' '}
              <HolderNames holders={n.usedBy} />
            </span>
          )}
          <Cites cites={n.cites} />
        </span>
      ))}
    </div>
  )
}

function Hero({
  view,
  onMark,
  menu
}: {
  view: HistoryArticleView
  onMark: (field: 'read' | 'favorite', v: boolean) => void
  menu?: ReactNode
}) {
  const e = view.entity
  const primary = e.names.find((n) => n.role === 'primary')?.text ?? e.id
  const native = e.names.find((n) => n.role === 'native')
  const typeLabel =
    e.kind === 'event' ? EVENT_TYPES[e.type] : e.kind === 'period' ? PERIOD_TYPES[e.periodType] : e.kind === 'place' ? PLACE_TYPES[e.placeType] : e.roles.map((r) => PERSON_ROLES[r]).join(', ')
  const kindLabel = { event: 'Event', person: 'Person', period: 'Period', place: 'Place' }[e.kind]
  const start = e.kind === 'event' || e.kind === 'period' ? e.start : e.kind === 'person' ? e.born : undefined
  const end = e.kind === 'event' || e.kind === 'period' ? e.end : e.kind === 'person' ? e.died : undefined
  return (
    <header className="relative mb-8 flex min-h-[300px] items-end overflow-hidden rounded-lg border border-line-subtle">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />
      <ImageCredit image={view.hero} className="absolute right-3 top-3 max-w-[60%] truncate" />
      <div className="media-contrast relative flex w-full flex-wrap items-end justify-between gap-6 p-7">
        <div className="min-w-0 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{kindLabel}</span>
            <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-300">{typeLabel}</span>
            {e.regions.map((r) => (
              <span key={r} className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-300">
                {regionLabel(r)}
              </span>
            ))}
            {view.personal && <PersonalBadge />}
          </div>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white">{primary}</h1>
            {native && <NativeName native={native} className="text-3xl text-gray-200" />}
          </div>
          {start?.alts[0] && (
            <p className="mt-2 text-base text-gray-200">
              <HistDateText date={start.alts[0].value} solarHijri={view.solarHijri} inline />
              {end?.alts[0] && (
                <>
                  <span className="mx-2 text-gray-400">to</span>
                  <HistDateText date={end.alts[0].value} solarHijri={view.solarHijri} inline />
                </>
              )}
              {(start.alts.length > 1 || (end?.alts.length ?? 0) > 1) && (
                <span className="ml-2 text-xs text-signal-caution">dates disputed, see facts</span>
              )}
            </p>
          )}
          <OtherNames names={e.names} />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {menu}
          {view.mapYear !== null && (
            <Link to={`/history/map?focus=${encodeURIComponent(view.ref)}`} className="btn-ghost bg-black/50">
              On the map
            </Link>
          )}
          <FavoriteButton variant="overlay" active={view.mark.favorite} onClick={() => onMark('favorite', !view.mark.favorite)} className="!inline-flex" />
          <button type="button" className={view.mark.read ? 'btn-ghost bg-black/50' : 'btn-primary'} onClick={() => onMark('read', !view.mark.read)}>
            {view.mark.read ? '✓ Read' : 'Mark as read'}
          </button>
        </div>
      </div>
    </header>
  )
}

function Timeline({ items }: { items: Array<{ key: string; date: ReactNode; body: ReactNode; strong?: boolean }> }) {
  return (
    <ol className="relative space-y-6 border-l border-line-strong pl-6">
      {items.map((i) => (
        <li key={i.key} className="relative">
          <span
            aria-hidden="true"
            className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rotate-45 border ${i.strong ? 'border-accent bg-accent' : 'border-accent bg-base-900'}`}
          />
          <div className="mb-1 text-sm text-ink">{i.date}</div>
          {i.body}
        </li>
      ))}
    </ol>
  )
}

function PeopleBySide({ event, view }: { event: HistoryEvent; view: HistoryArticleView }) {
  const parts = event.participants ?? []
  const groups = new Map<string, typeof parts>()
  for (const p of parts) {
    const k = p.side ?? ''
    groups.set(k, [...(groups.get(k) ?? []), p])
  }
  return (
    <div className="space-y-6">
      {[...groups.entries()].map(([side, list]) => (
        <div key={side}>
          {side && <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{event.sides?.find((s) => s.key === side)?.name ?? side}</p>}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
            {list.map((p, i) => {
              const info = p.ref ? view.refs[p.ref] : undefined
              return (
                <div key={i}>
                  {info ? (
                    <RefCard info={info} caption={<>{PARTICIPANT_ROLES[p.role]}{info.years ? ` · ${info.years}` : ''}</>} />
                  ) : (
                    <div>
                      <div className="flex aspect-[3/4] items-center justify-center rounded-lg border border-dashed border-line-strong text-xs text-ink-muted">No entry</div>
                      <p className="mt-2 text-sm font-medium text-ink">{p.name}</p>
                      <p className="text-xs text-ink-muted">{PARTICIPANT_ROLES[p.role]}</p>
                    </div>
                  )}
                  <Cites cites={p.cites} />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function Lifeline({ person, view }: { person: HistoryPerson; view: HistoryArticleView }) {
  const born = person.born?.alts[0] ? decimalYear(person.born.alts[0].value.d) : null
  const diedV = person.died?.alts[0]?.value
  const died = diedV ? decimalYear(diedV.d, 'end') : null
  const events = view.appearsIn
    .map((a) => ({ a, info: view.refs[a.ref] }))
    .filter((x) => x.info)
    .map((x) => ({ ...x, y: Number(x.info!.years?.match(/-?\d{4}/)?.[0] ?? NaN) }))
    .filter((x) => Number.isFinite(x.y))
    .sort((p, q) => p.y - q.y)
  if (born === null || events.length === 0) return null
  const end = died ?? Math.max(born + 1, ...events.map((e) => e.y + 1))
  const pct = (y: number): number => Math.min(100, Math.max(0, ((y - born) / (end - born)) * 100))
  return (
    <div className="mb-6">
      <div className="relative h-14" aria-hidden="true">
        <div className="absolute inset-x-0 top-7 h-1 rounded-full bg-gradient-to-r from-accent/30 via-accent to-accent/30" />
        <span className="absolute left-0 top-0 text-[10px] tabular-nums text-ink-muted">{Math.floor(born)}</span>
        {died !== null && <span className="absolute right-0 top-0 text-[10px] tabular-nums text-ink-muted">{Math.floor(died - 1e-6)}</span>}
        {events.map((x) => (
          <span key={x.a.ref} title={`${x.info!.title}, ${x.info!.years}`} className="absolute top-[22px] h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-2 border-accent bg-base-900" style={{ left: `${pct(x.y)}%` }} />
        ))}
      </div>
    </div>
  )
}

function Notes({ view }: { view: HistoryArticleView }) {
  const queryClient = useQueryClient()
  const [body, setBody] = useState(view.note?.body ?? '')
  const [correction, setCorrection] = useState(view.note?.kind === 'correction')
  const dirty = body !== (view.note?.body ?? '') || correction !== (view.note?.kind === 'correction')
  return (
    <div>
      <Field label="Your note" hiddenLabel>
        <textarea rows={3} className="input w-full" placeholder="A private note on this page" value={body} onChange={(e) => setBody(e.target.value)} />
      </Field>
      <div className="mt-2 flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-ink-secondary">
          <input type="checkbox" checked={correction} onChange={(e) => setCorrection(e.target.checked)} />
          Correction for the next research session
        </label>
        <button
          type="button"
          className="btn-ghost ml-auto"
          disabled={!dirty}
          onClick={async () => {
            await api.history.saveNote(view.ref, body, correction ? 'correction' : 'note')
            void queryClient.invalidateQueries({ queryKey: qk.history.all })
          }}
        >
          Save note
        </button>
      </div>
    </div>
  )
}

export default function HistoryArticlePage({ kind }: { kind: Kind }) {
  const { id = '' } = useParams()
  const ref = `${kind}:${id}`
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const leaveDeleted = useLeaveDeleted()
  const [linking, setLinking] = useState(false)
  const { data: view, isLoading, dataUpdatedAt } = useQuery({ queryKey: qk.history.article(ref), queryFn: () => api.history.article(ref) })
  useHistoryImageRefresh(dataUpdatedAt)

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!view) {
    return (
      <div className="p-6">
        <BackButton fallback="/history" />
        <PageStatus>This History page does not exist (it may have been renamed).</PageStatus>
      </div>
    )
  }

  const e = view.entity
  const mark = async (field: 'read' | 'favorite', value: boolean): Promise<void> => {
    await api.history.setMark(ref, field, value)
    void queryClient.invalidateQueries({ queryKey: qk.history.all })
  }

  const sections = e.sections ?? []
  const course = e.kind === 'event' ? e.course ?? [] : []
  const related = e.kind === 'event' ? e.related ?? [] : []
  const hasPeople = e.kind === 'event' && (e.participants?.length ?? 0) > 0
  const quoteCount = sections.reduce((n, s) => n + s.quotes.length, 0) + course.length
  const toc: TocItem[] = [
    ...(sections.length ? [{ id: 'text', label: 'Overview', count: quoteCount }] : []),
    ...(course.length ? [{ id: 'course', label: 'Course of events', count: course.length }] : []),
    ...(view.appearsIn.length ? [{ id: 'life', label: 'Took part in', count: view.appearsIn.length }] : []),
    ...(view.children.length ? [{ id: 'within', label: e.kind === 'period' ? 'In this period' : 'Within', count: view.children.length }] : []),
    ...(related.length || view.inbound.length ? [{ id: 'context', label: 'Before and after' }] : []),
    ...(view.interpretations.length ? [{ id: 'views', label: 'Interpretations', count: view.interpretations.reduce((n, i) => n + i.positions.length, 0) }] : []),
    ...(hasPeople ? [{ id: 'people', label: 'People', count: e.kind === 'event' ? e.participants!.length : 0 }] : []),
    ...(view.meanwhile.length ? [{ id: 'meanwhile', label: 'Meanwhile elsewhere' }] : []),
    ...(view.contemporaries.length ? [{ id: 'contemporaries', label: 'Contemporaries' }] : []),
    { id: 'media', label: 'In media', count: view.media.length },
    { id: 'archive', label: 'Archive', count: view.archive.length },
    { id: 'sources', label: 'Sources', count: view.sourceOrder.length },
    { id: 'notes', label: 'Your notes' }
  ]

  return (
    <CitationProvider order={view.sourceOrder} sources={view.sources}>
      <div className="relative min-h-full">
        <FranchiseBackground url={historyImageSrc(view.hero)} />
        <div className="relative z-10 mx-auto max-w-[1600px] px-6 pb-10">
          <BackButton fallback="/history" />
          <Hero
            view={view}
            onMark={(f, v) => void mark(f, v)}
            menu={
              view.personal ? (
                <ActionMenu
                  buttonClassName="btn-ghost bg-black/50"
                  items={[
                    { label: 'Edit', onSelect: () => navigate(`/history/my/${id}/edit`) },
                    {
                      label: 'Delete',
                      danger: true,
                      onSelect: async () => {
                        if (!(await confirmDialog('Delete this entry of yours?', { confirmLabel: 'Delete', danger: true }))) return
                        await api.history.removeUserEntity(id)
                        await queryClient.invalidateQueries({ queryKey: qk.history.all })
                        leaveDeleted((p) => p.endsWith(`/${id}`), '/history/my')
                      }
                    }
                  ]}
                />
              ) : undefined
            }
          />
          <div className="grid items-start gap-8 lg:grid-cols-[180px_minmax(0,1fr)] xl:grid-cols-[180px_minmax(0,1fr)_320px]">
            <Contents items={toc} />
            <article className="min-w-0 max-w-3xl">
              <Infobox view={view} inline />
              {sections.length > 0 && (
                <section id="text" aria-label="Overview" className="mb-12 scroll-mt-6 space-y-8">
                  {sections.map((s, i) => (
                    <div key={i}>
                      {(i > 0 || s.kind !== 'overview') && (
                        <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">{SECTION_KINDS[s.kind]}</h2>
                      )}
                      <div className="space-y-5">
                        {s.quotes.map((q) => (
                          <QuoteBlock key={q.id} quote={q} />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {course.length > 0 && (
                <SectionBlock id="course" title="Course of events">
                  <Timeline
                    items={course.map((c, i) => ({
                      key: c.quote.id,
                      strong: i === course.length - 1,
                      date: <DateClaim claim={c.date} solarHijri={view.solarHijri} />,
                      body: <QuoteBlock quote={c.quote} size="sm" />
                    }))}
                  />
                </SectionBlock>
              )}

              {view.appearsIn.length > 0 && e.kind === 'person' && (
                <SectionBlock id="life" title="Took part in">
                  <Lifeline person={e} view={view} />
                  <Timeline
                    items={[...view.appearsIn]
                      .sort((a, b) => (view.refs[a.ref]?.years ?? '').localeCompare(view.refs[b.ref]?.years ?? ''))
                      .map((a) => ({
                        key: a.ref,
                        date: <span className="text-xs tabular-nums text-ink-muted">{view.refs[a.ref]?.years}</span>,
                        body: <RefRow info={view.refs[a.ref]} extra={<span className="chip">{PARTICIPANT_ROLES[a.role as keyof typeof PARTICIPANT_ROLES] ?? a.role}</span>} />
                      }))}
                  />
                </SectionBlock>
              )}

              {view.children.length > 0 && (
                <SectionBlock id="within" title={e.kind === 'period' ? 'In this period' : 'Within this event'}>
                  <Timeline
                    items={view.children.map((c) => ({
                      key: c.ref,
                      date: <span className="text-xs tabular-nums text-ink-muted">{c.years}</span>,
                      body: <RefRow info={c} />
                    }))}
                  />
                </SectionBlock>
              )}

              {(related.length > 0 || view.inbound.length > 0) && (
                <SectionBlock id="context" title="Before and after">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {related.map((r, i) => (
                      <div key={`o${i}`} className="card p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal-link">
                          {RELATION_KINDS[r.rel]}
                          {r.disputedIn && <span className="ml-1 normal-case tracking-normal text-signal-caution">contested</span>}
                        </p>
                        <div className="mt-2">
                          <RefRow info={view.refs[r.ref]} />
                        </div>
                        <Cites cites={r.cites} />
                      </div>
                    ))}
                    {view.inbound.map((r, i) => (
                      <div key={`i${i}`} className="card p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-signal-link">
                          {RELATION_KINDS[r.rel as keyof typeof RELATION_KINDS] ?? r.rel} this
                        </p>
                        <div className="mt-2">
                          <RefRow info={view.refs[r.ref]} />
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionBlock>
              )}

              {view.interpretations.length > 0 && (
                <SectionBlock id="views" title="Interpretations" aside={<span className="text-xs text-ink-muted">Every notable view, labelled and attributed</span>}>
                  <InterpretationsPanel items={view.interpretations} pageKey={ref} />
                </SectionBlock>
              )}

              {hasPeople && e.kind === 'event' && (
                <SectionBlock id="people" title="People">
                  <PeopleBySide event={e} view={view} />
                </SectionBlock>
              )}

              {view.meanwhile.length > 0 && (
                <SectionBlock id="meanwhile" title="Meanwhile elsewhere" aside={<span className="text-xs text-ink-muted">Same years, other regions</span>}>
                  <ul className="divide-y divide-line-subtle rounded-lg border border-line-subtle bg-base-900/40">
                    {view.meanwhile.map((m) => (
                      <li key={m.ref} className="flex items-center gap-4 px-4 py-3">
                        <span className="w-40 shrink-0 text-[10px] font-semibold uppercase tracking-[0.14em] text-signal-link">{m.region ? regionLabel(m.region) : ''}</span>
                        <div className="min-w-0 flex-1">
                          <RefRow info={m} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </SectionBlock>
              )}

              {view.contemporaries.length > 0 && (
                <SectionBlock id="contemporaries" title="Contemporaries">
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
                    {view.contemporaries.map((c) => (
                      <RefCard key={c.ref} info={c} />
                    ))}
                  </div>
                </SectionBlock>
              )}

              <SectionBlock
                id="media"
                title="In media"
                aside={
                  <button type="button" className="btn-ghost h-7 text-xs" onClick={() => setLinking(true)}>
                    Link a title
                  </button>
                }
              >
                <MediaRows cards={view.media} here={ref} />
                {linking && (
                  <LinkTitleDialog
                    target={ref}
                    targetTitle={e.names.find((n) => n.role === 'primary')?.text ?? id}
                    person={e.kind === 'person'}
                    onClose={() => setLinking(false)}
                  />
                )}
              </SectionBlock>

              <SectionBlock id="archive" title="Archive">
                <HistoryArchiveList view={view} />
              </SectionBlock>

              <SectionBlock id="sources" title="Sources" aside={<span className="text-xs text-ink-muted">Every citation on this page</span>}>
                <Bibliography order={view.sourceOrder} />
              </SectionBlock>

              <SectionBlock id="notes" title="Your notes" aside={<span className="text-xs text-ink-muted">Private, this machine only</span>}>
                <Notes key={view.note?.updatedAt ?? 'none'} view={view} />
              </SectionBlock>
            </article>
            <Infobox view={view} />
          </div>
        </div>
      </div>
    </CitationProvider>
  )
}
