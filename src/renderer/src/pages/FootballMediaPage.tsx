import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { Group, Pill } from '../components/PillGroup'
import StatTile from '../components/StatTile'
import Tabs, { TabPanel } from '../components/Tabs'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { confirmDialog } from '../lib/confirm'
import { FOOTBALL_MEDIA_KINDS } from '@shared/football'
import type { FootballEntityKind, FootballMatchSummary, FootballMediaKind } from '@shared/types'
import {
  FootballFlag,
  FootballStars,
  FootballTeamMark,
  footballCompetitionStyle
} from '../components/football/FootballCommon'

const MONTH_FORMAT = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' })

function DiaryRow({ match }: { match: FootballMatchSummary }) {
  const watched = match.watchedAt ?? match.matchDate
  return (
    <Link
      to={`/football/match/${match.id}`}
      className="group grid grid-cols-[48px_4px_minmax(0,1fr)_auto] items-center gap-4 border-b border-line-subtle py-3 hover:bg-surface-raised/40"
      style={footballCompetitionStyle(match.competitionKey)}
    >
      <span className="text-center text-2xl font-semibold tabular-nums text-ink-secondary">{watched.slice(8, 10)}</span>
      <span className="h-10 rounded-full bg-[rgb(var(--football-c))]" aria-hidden="true" />
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink group-hover:text-signal-link">
          <FootballTeamMark team={match.home} size="xs" />
          <span className="truncate">{match.home.name}</span>
          <span className="shrink-0 rounded bg-surface-raised px-1.5 tabular-nums">{match.homeScore ?? '-'}-{match.awayScore ?? '-'}</span>
          <span className="truncate">{match.away.name}</span>
          <FootballTeamMark team={match.away} size="xs" />
        </span>
        <span className="mt-1 flex items-center gap-2 text-xs text-ink-muted"><FootballFlag competitionKey={match.competitionKey} />{match.seasonLabel}{match.stageName ? ` / ${match.stageName}` : ''} / played {match.matchDate}</span>
      </span>
      <FootballStars rating={match.rating} className="text-sm" />
    </Link>
  )
}

interface LinkDraft {
  entityKind: FootballEntityKind
  entityId: number
  label: string
}

export default function FootballMediaPage() {
  const [params] = useSearchParams()
  const qc = useQueryClient()
  const [tab, setTab] = usePersistedState<'diary' | 'media'>('footballArchiveTab', params.has('match') ? 'media' : 'diary')
  const [showAttach, setShowAttach] = useState(() => params.has('match'))
  const overviewQuery = useQuery({ queryKey: qk.football.overview, queryFn: () => api.football.overview() })
  const diaryQuery = useInfiniteQuery({
    queryKey: qk.football.matches({ watchedOnly: true }),
    queryFn: ({ pageParam }) => api.football.matches({ watchedOnly: true, limit: 100, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === 100 ? pages.length * 100 : undefined
  })
  const diary = diaryQuery.data?.pages.flat() ?? []
  const diaryMonths = useMemo(() => {
    const months = new Map<string, FootballMatchSummary[]>()
    for (const match of diary) {
      const month = (match.watchedAt ?? match.matchDate).slice(0, 7)
      months.set(month, [...(months.get(month) ?? []), match])
    }
    return [...months]
  }, [diary])
  const [filterKind, setFilterKind] = usePersistedState<FootballMediaKind | null>('footballMediaKind', null)
  const [filterSearch, setFilterSearch] = usePersistedState('footballMediaSearch', '')
  const debouncedFilterSearch = useDebouncedValue(filterSearch, 200)
  const filter = useMemo(
    () => ({ kind: filterKind, search: debouncedFilterSearch || null }),
    [filterKind, debouncedFilterSearch]
  )
  const mediaQuery = useInfiniteQuery({
    queryKey: qk.football.media(filter),
    queryFn: ({ pageParam }) => api.football.media({ ...filter, limit: 100, offset: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === 100 ? pages.length * 100 : undefined
  })
  const data = mediaQuery.data?.pages.flat() ?? []
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState<FootballMediaKind>('highlight')
  const [localPath, setLocalPath] = useState<string | null>(null)
  const [url, setUrl] = useState('')
  const [note, setNote] = useState('')
  const [links, setLinks] = useState<LinkDraft[]>([])
  const [linkSearch, setLinkSearch] = useState('')
  const [saving, setSaving] = useState(false)
  const consumedMatch = useRef<string | null>(null)
  const query = useDebouncedValue(linkSearch, 200)
  const searchQuery = useQuery({
    queryKey: qk.football.search(query),
    queryFn: () => api.football.search(query),
    enabled: query.trim().length >= 2
  })

  useEffect(() => {
    const rawMatch = params.get('match')
    const matchId = Number(rawMatch)
    if (!rawMatch || !Number.isInteger(matchId) || matchId < 1 || consumedMatch.current === rawMatch) return
    consumedMatch.current = rawMatch
    setShowAttach(true)
    setTab('media')
    api.football.match(matchId).then((match) => {
      if (!match) return
      setLinks([{ entityKind: 'match', entityId: match.id, label: `${match.home.name} vs ${match.away.name}` }])
      setTitle((current) => current || `${match.home.name} vs ${match.away.name}`)
    })
  }, [params])

  const suggestions: LinkDraft[] = searchQuery.data ? [
    ...searchQuery.data.competitions.map((item) => ({ entityKind: 'competition' as const, entityId: item.id, label: item.name })),
    ...searchQuery.data.teams.map((item) => ({ entityKind: 'team' as const, entityId: item.id, label: item.name })),
    ...searchQuery.data.people.map((item) => ({ entityKind: 'person' as const, entityId: item.id, label: item.name })),
    ...searchQuery.data.matches.map((item) => ({ entityKind: 'match' as const, entityId: item.id, label: `${item.home.name} vs ${item.away.name} / ${item.matchDate}` }))
  ].filter((item) => !links.some((link) => link.entityKind === item.entityKind && link.entityId === item.entityId)).slice(0, 10) : []

  function reset() {
    setTitle('')
    setKind('highlight')
    setLocalPath(null)
    setUrl('')
    setNote('')
    setLinks([])
    setLinkSearch('')
  }
  async function pick() {
    const path = await api.football.pickMediaFile()
    if (path) {
      setLocalPath(path)
      setUrl('')
      if (!title) setTitle(path.split('/').at(-1)?.replace(/\.[^.]+$/, '') ?? '')
    }
  }
  async function save() {
    setSaving(true)
    try {
      await api.football.saveMedia({
        title,
        kind,
        localPath,
        url: localPath ? null : url,
        note,
        links: links.map(({ entityKind, entityId }) => ({ entityKind, entityId }))
      })
      reset()
      setShowAttach(false)
      qc.invalidateQueries({ queryKey: qk.football.all })
    } finally {
      setSaving(false)
    }
  }
  async function remove(id: number, mediaTitle: string) {
    const ok = await confirmDialog(`Remove the attachment record for "${mediaTitle}"? The underlying file or link is not deleted.`, { confirmLabel: 'Remove', danger: true })
    if (!ok) return
    await api.football.removeMedia(id)
    qc.invalidateQueries({ queryKey: qk.football.all })
  }

  const journal = overviewQuery.data?.journal
  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title="My archive"
        subtitle="Every match you have watched, rated and noted, plus your clips, highlights and full matches. Files stay where you put them."
        back={{ to: '/football', label: 'Football Archive' }}
        actions={<button className={showAttach ? 'btn-ghost' : 'btn-primary'} onClick={() => { setTab('media'); setShowAttach((value) => !value) }}>{showAttach ? 'Close form' : 'Add media'}</button>}
      />

      {journal && (
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Matches logged" value={journal.logged} accent />
          <StatTile label={`In ${new Date().getFullYear()}`} value={journal.thisYear} />
          <StatTile label="Average rating" value={journal.averageRating?.toFixed(1) ?? '-'} />
          <div className="card border-t border-t-line-strong p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Most watched</p>
            {journal.mostWatched
              ? <Link to={`/football/team/${journal.mostWatched.id}`} className="mt-2 flex items-center gap-2 text-lg font-semibold text-ink hover:text-signal-link"><FootballTeamMark team={journal.mostWatched} size="xs" /><span className="truncate">{journal.mostWatched.name}</span></Link>
              : <p className="mt-2 text-lg font-semibold text-ink-muted">-</p>}
          </div>
        </div>
      )}

      <Tabs
        id="football-archive"
        label="Archive view"
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'diary', label: 'Diary', count: journal?.logged },
          { key: 'media', label: 'Media' }
        ]}
      />
      <TabPanel tabsId="football-archive" value={tab}>
      {tab === 'diary' && (
        <section>
          {diaryQuery.isError && <PageStatus>Could not load your match diary.</PageStatus>}
          {diaryMonths.map(([month, matches]) => (
            <div key={month} className="mb-6">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">{MONTH_FORMAT.format(new Date(`${month}-01T12:00:00`))}</p>
              {matches.map((match) => <DiaryRow key={match.id} match={match} />)}
            </div>
          ))}
          {!diaryQuery.isLoading && !diaryQuery.isError && !diary.length && (
            <p className="border-y border-line-subtle py-6 text-sm text-ink-muted">Nothing logged yet. Open any match and tick Watched to start your diary.</p>
          )}
          {diaryQuery.hasNextPage && (
            <button className="btn-ghost mt-2" disabled={diaryQuery.isFetchingNextPage} onClick={() => diaryQuery.fetchNextPage()}>
              {diaryQuery.isFetchingNextPage ? 'Loading more...' : 'Load earlier entries'}
            </button>
          )}
        </section>
      )}
      {tab === 'media' && <>

      {mediaQuery.isError && <PageStatus>Could not load saved Football media.</PageStatus>}

      {showAttach && <section className="mb-10 border-y border-line-subtle py-6">
        <h2 className="text-xl font-semibold text-ink">Attach media</h2>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="block"><span className="label mb-1 block">Title</span><input className="input" value={title} onChange={(event) => setTitle(event.target.value)} /></label>
            <div><span className="label mb-2 block">Shelf</span><div className="flex flex-wrap gap-2">{FOOTBALL_MEDIA_KINDS.map((value) => <Pill key={value} active={kind === value} onClick={() => setKind(value)} label={value === 'fullMatch' ? 'Full match' : value} />)}</div></div>
            <div>
              <span className="label mb-1 block">Source</span>
              {localPath ? <div className="flex items-center gap-2"><p className="input min-w-0 flex-1 truncate text-sm">{localPath}</p><button className="btn-ghost" onClick={() => setLocalPath(null)}>Clear</button></div> : <div className="flex gap-2"><input className="input" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://... or choose a local file" aria-label="Media web address" /><button className="btn-ghost shrink-0" onClick={pick}>Choose file</button></div>}
            </div>
            <label className="block"><span className="label mb-1 block">Note</span><textarea className="input min-h-24 resize-y" value={note} onChange={(event) => setNote(event.target.value)} /></label>
          </div>
          <div>
            <span className="label mb-1 block">Linked archive entries</span>
            <input className="input" value={linkSearch} onChange={(event) => setLinkSearch(event.target.value)} placeholder="Search competitions, teams, people or matches..." aria-label="Search Football entries to link" />
            {suggestions.length > 0 && <div className="mt-1 max-h-48 overflow-y-auto border border-line-subtle bg-surface-raised">{suggestions.map((item) => <button key={`${item.entityKind}-${item.entityId}`} className="block w-full border-b border-line-subtle px-3 py-2 text-left text-sm hover:bg-surface-overlay" onClick={() => { setLinks((current) => [...current, item]); setLinkSearch('') }}><span className="text-ink">{item.label}</span><span className="ml-2 text-xs text-ink-muted">{item.entityKind}</span></button>)}</div>}
            {searchQuery.isError && <p className="mt-2 text-sm text-signal-anomaly">Could not search Football entries.</p>}
            <div className="mt-4 flex flex-wrap gap-2">{links.map((link) => <button key={`${link.entityKind}-${link.entityId}`} className="chip" title="Remove link" onClick={() => setLinks((current) => current.filter((item) => item !== link))}>{link.label} / remove</button>)}</div>
            {!links.length && <p className="mt-3 text-sm text-ink-muted">One attachment can link to several archive entries. Match footage rolls up to both teams and the competition automatically.</p>}
          </div>
        </div>
        <button className="btn-primary mt-5" disabled={saving || !title.trim() || (!localPath && !url.trim()) || !links.length} onClick={save}>Save attachment</button>
      </section>}

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-3 text-xs uppercase tracking-[0.14em] text-ink-muted">{data.length} saved records</p><Group label="Shelf"><Pill active={filterKind == null} onClick={() => setFilterKind(null)} label="All" />{FOOTBALL_MEDIA_KINDS.map((value) => <Pill key={value} active={filterKind === value} onClick={() => setFilterKind(value)} label={value === 'fullMatch' ? 'Full matches' : value} />)}</Group></div>
        <input className="input max-w-sm" value={filterSearch} onChange={(event) => setFilterSearch(event.target.value)} placeholder="Filter saved media..." aria-label="Filter saved Football media" />
      </div>
      <div className="divide-y divide-line-subtle border-y border-line-subtle">
        {data.map((item) => (
          <div key={item.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(220px,0.8fr)_auto] sm:items-center">
            <div className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3"><span className="border-r border-line-subtle pr-3 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">{item.kind === 'fullMatch' ? 'match' : item.kind}</span><span><span className="block font-medium text-ink">{item.title}</span><span className="mt-1 block text-xs text-ink-muted">{item.localPath ? 'Local file' : 'Web link'}</span></span></div>
            <p className="truncate text-sm text-ink-muted">{item.links.map((link) => link.label).filter(Boolean).join(', ')}</p>
            <div className="flex gap-2"><button className="btn-ghost" onClick={() => item.localPath ? api.football.openMedia(item.localPath) : item.url && api.football.openExternalLink('website', item.url)}>Open</button><button className="btn-ghost text-signal-anomaly" onClick={() => remove(item.id, item.title)}>Remove</button></div>
          </div>
        ))}
        {!mediaQuery.isError && !data.length && <p className="py-8 text-sm text-ink-muted">No media attachments match this shelf.</p>}
      </div>
      {mediaQuery.hasNextPage && (
        <button className="btn-ghost mt-5" disabled={mediaQuery.isFetchingNextPage} onClick={() => mediaQuery.fetchNextPage()}>
          {mediaQuery.isFetchingNextPage ? 'Loading more...' : 'Load more media'}
        </button>
      )}
      </>}
      </TabPanel>
    </div>
  )
}
