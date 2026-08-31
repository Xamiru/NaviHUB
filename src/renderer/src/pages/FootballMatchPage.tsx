import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import FavoriteButton from '../components/FavoriteButton'
import AddToListMenu from '../components/AddToListMenu'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { formatFootballScore } from '@shared/football'
import {
  FootballMediaShelf,
  FootballSectionTitle
} from '../components/football/FootballCommon'

export default function FootballMatchPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: qk.football.match(id),
    queryFn: () => api.football.match(id),
    enabled: Number.isInteger(id) && id > 0
  })
  const [watchedAt, setWatchedAt] = useState<string | null>(null)
  const [rating, setRating] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [fotmob, setFotmob] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!data) return
    setWatchedAt(data.watchedAt)
    setRating(data.rating)
    setNote(data.note ?? '')
  }, [data])

  if (isLoading) return <PageStatus>Opening match record...</PageStatus>
  if (!data) return <PageStatus>Match not found.</PageStatus>

  async function refresh() {
    await qc.invalidateQueries({ queryKey: qk.football.match(id) })
    await qc.invalidateQueries({ queryKey: qk.football.overview })
  }
  async function favorite() {
    await api.football.setFavorite('match', id, !data!.favorite)
    await refresh()
  }
  async function saveJournal() {
    setSaving(true)
    try {
      await api.football.saveJournal(id, { watchedAt, rating, note })
      await refresh()
    } finally {
      setSaving(false)
    }
  }
  async function saveFotmob() {
    if (!fotmob.trim()) return
    await api.football.saveExternalLink({
      entityKind: 'match',
      entityId: id,
      provider: 'fotmob',
      label: 'FotMob match page',
      url: fotmob.trim()
    })
    setFotmob('')
    await refresh()
  }

  return (
    <div className="mx-auto max-w-[1450px] p-6">
      <PageHeader
        title={`${data.home.name} vs ${data.away.name}`}
        subtitle={`${data.competitionName} / ${data.seasonLabel}${data.stageName ? ` / ${data.stageName}` : ''} / ${data.matchDate}`}
        back="history"
        actions={<><FavoriteButton active={data.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" /><AddToListMenu kind="footballMatch" entityId={id} /></>}
      />

      <section className="mb-10 grid items-center gap-6 border-y border-line-subtle py-8 sm:grid-cols-[minmax(0,1fr)_180px_minmax(0,1fr)]">
        <Link to={`/football/team/${data.home.id}`} className="text-center sm:text-right">
          <p className="text-2xl font-semibold text-ink hover:text-signal-link">{data.home.name}</p>
          <p className="mt-1 text-sm text-ink-muted">Home</p>
        </Link>
        <div className="text-center">
          <p className="text-4xl font-semibold tabular-nums tracking-tight text-ink">{formatFootballScore(data)}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-ink-muted">{data.status}</p>
        </div>
        <Link to={`/football/team/${data.away.id}`} className="text-center sm:text-left">
          <p className="text-2xl font-semibold text-ink hover:text-signal-link">{data.away.name}</p>
          <p className="mt-1 text-sm text-ink-muted">Away</p>
        </Link>
      </section>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.7fr)]">
        <div className="space-y-10">
          <section>
            <FootballSectionTitle title="Goal timeline" detail={data.eventCoverage.replace('_', ' ')} />
            {data.events.length ? (
              <ol className="divide-y divide-line-subtle">
                {data.events.map((event) => (
                  <li key={event.id} className="grid grid-cols-[58px_minmax(0,1fr)_auto] items-center gap-3 py-3 text-sm">
                    <span className="font-mono tabular-nums text-ink-muted">{event.minute ?? '?'}{event.extraMinute ? `+${event.extraMinute}` : ''}'</span>
                    <span>
                      {event.person ? <Link to={`/football/person/${event.person.id}`} className="font-medium text-ink hover:text-signal-link">{event.person.name}</Link> : <span className="text-ink-muted">Scorer not identified</span>}
                      <span className="ml-2 text-xs text-ink-muted">{event.ownGoal ? 'own goal' : event.penalty ? 'penalty' : event.detail}</span>
                    </span>
                    {event.scoreHome != null && event.scoreAway != null && <span className="font-semibold tabular-nums text-ink">{event.scoreHome}-{event.scoreAway}</span>}
                  </li>
                ))}
              </ol>
            ) : <p className="text-sm text-ink-muted">Scorer data not supplied.</p>}
          </section>

          <section>
            <FootballSectionTitle title="Lineups" detail={data.lineupCoverage.replace('_', ' ')} />
            {data.lineups.length ? (
              <div className="grid gap-8 md:grid-cols-2">
                {[data.home, data.away].map((team) => (
                  <div key={team.id}>
                    <p className="mb-2 font-medium text-ink">{team.name}</p>
                    <div className="divide-y divide-line-subtle">{data.lineups.filter((entry) => entry.teamId === team.id).map((entry) => <Link key={entry.id} to={`/football/person/${entry.person.id}`} className="flex justify-between gap-3 py-2 text-sm"><span className="text-ink hover:text-signal-link">{entry.person.name}{entry.captain ? ' (captain)' : ''}</span><span className="text-ink-muted">{entry.position ?? entry.role}</span></Link>)}</div>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-ink-muted">Lineup data not supplied.</p>}
          </section>

          <section>
            <FootballSectionTitle title="Media" detail="Files stay in place" />
            <FootballMediaShelf media={data.media} />
            <Link to={`/football/media?match=${id}`} className="mt-3 inline-block text-sm text-signal-link hover:underline">Attach media to this match</Link>
          </section>
        </div>

        <aside className="space-y-9">
          <section>
            <FootballSectionTitle title="Match facts" />
            <dl className="divide-y divide-line-subtle text-sm">
              {[['Venue', [data.venue, data.city].filter(Boolean).join(', ') || null], ['Attendance', data.attendance?.toLocaleString() ?? null], ['Referee', data.referee], ['Round', data.round]].map(([label, value]) => <div key={label} className="flex justify-between gap-4 py-2.5"><dt className="text-ink-muted">{label}</dt><dd className="text-right text-ink">{value ?? 'Not supplied'}</dd></div>)}
            </dl>
          </section>

          <section>
            <FootballSectionTitle title="Private journal" />
            <label className="mb-3 flex items-center gap-2 text-sm text-ink-secondary"><input type="checkbox" checked={watchedAt != null} onChange={(event) => setWatchedAt(event.target.checked ? new Date().toISOString() : null)} />Watched</label>
            <label className="block"><span className="label mb-1 block">Rating</span><select className="input" value={rating ?? ''} onChange={(event) => setRating(event.target.value ? Number(event.target.value) : null)}><option value="">No rating</option>{Array.from({ length: 11 }, (_, index) => index / 2).map((value) => <option key={value} value={value}>{value.toFixed(1)}</option>)}</select></label>
            <label className="mt-3 block"><span className="label mb-1 block">Private note</span><textarea className="input min-h-28 resize-y" value={note} onChange={(event) => setNote(event.target.value)} /></label>
            <button className="btn-primary mt-3" disabled={saving} onClick={saveJournal}>Save journal</button>
          </section>

          <section>
            <FootballSectionTitle title="External references" />
            <div className="divide-y divide-line-subtle">{data.externalLinks.map((link) => <button key={link.id} className="block w-full py-2.5 text-left text-sm text-signal-link hover:underline" onClick={() => api.football.openExternalLink(link.provider, link.url)}>{link.label ?? link.provider}</button>)}</div>
            <label className="mt-3 block"><span className="label mb-1 block">FotMob deep link</span><input className="input" value={fotmob} onChange={(event) => setFotmob(event.target.value)} placeholder="https://www.fotmob.com/matches/..." /></label>
            <button className="btn-ghost mt-2" disabled={!fotmob.trim()} onClick={saveFotmob}>Save FotMob link</button>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">Stored as a user-pasted link only. NaviHUB does not scrape, cache or embed FotMob.</p>
          </section>

          <section>
            <FootballSectionTitle title="Sources" />
            {data.sources.map((source) => <button key={source.id} className="block w-full border-b border-line-subtle py-2 text-left text-xs text-ink-muted hover:text-signal-link" disabled={!source.sourceUrl} onClick={() => source.sourceUrl && api.football.openExternalLink('website', source.sourceUrl)}>{source.source} / {source.revision ?? 'unversioned'}</button>)}
          </section>
        </aside>
      </div>
    </div>
  )
}
