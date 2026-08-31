import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { FOOTBALL_COMPETITIONS } from '@shared/football'
import type { FootballCompetitionKey, FootballSyncRequest } from '@shared/types'
import { FootballCoverageStrip, FootballFlag, FootballSectionTitle } from '../components/football/FootballCommon'

export default function FootballSyncPage() {
  const qc = useQueryClient()
  const [deepCompetition, setDeepCompetition] = useState<FootballCompetitionKey>('premier-league')
  const [deepSeason, setDeepSeason] = useState('')
  const { data, isLoading } = useQuery({
    queryKey: qk.football.sync,
    queryFn: () => api.football.syncOverview(),
    refetchInterval: (query) => {
      const state = query.state.data?.status.state
      return state && ['running', 'pausing', 'paused'].includes(state) ? 700 : false
    }
  })
  if (isLoading || !data) return <PageStatus>Reading Football source state...</PageStatus>
  const active = ['running', 'pausing', 'paused'].includes(data.status.state)

  async function start(request: FootballSyncRequest) {
    await api.football.startSync(request)
    qc.invalidateQueries({ queryKey: qk.football.sync })
  }
  async function control(action: 'pause' | 'resume' | 'cancel') {
    if (action === 'pause') await api.football.pauseSync()
    else if (action === 'resume') await api.football.resumeSync()
    else await api.football.cancelSync()
    qc.invalidateQueries({ queryKey: qk.football.sync })
  }

  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title="Football sources"
        subtitle="Install and refresh explicit source slices. One Football job runs at a time; pause, cancellation and failures keep every previously completed slice intact."
        back={{ to: '/football', label: 'Football Archive' }}
        actions={<Link to="/settings?tab=data" className="btn-ghost">Keys and folders</Link>}
      />

      <section className="mb-9 border-y border-line-subtle py-5">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-ink">{active ? data.status.message ?? 'Football sync is running' : data.installed ? 'History archive installed' : 'History archive not installed'}</p>
            <p className="mt-1 text-xs text-ink-muted">State: {data.status.state}{data.status.source ? ` / ${data.status.source}` : ''}{data.status.competitionKey ? ` / ${data.status.competitionKey}` : ''}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {!active && <button className="btn-primary" onClick={() => start({ kind: 'history' })}>{data.installed ? 'Refresh history' : 'Install history'}</button>}
            {!active && <button className="btn-ghost" onClick={() => start({ kind: 'current' })}>Refresh current seasons</button>}
            {data.status.state === 'running' && <button className="btn-ghost" onClick={() => control('pause')}>Pause</button>}
            {(data.status.state === 'paused' || data.status.state === 'pausing') && <button className="btn-ghost" onClick={() => control('resume')}>Resume</button>}
            {active && <button className="btn-ghost text-signal-anomaly" onClick={() => control('cancel')}>Cancel</button>}
          </div>
        </div>
        {active && (
          <div className="mt-5">
            <div className="h-1.5 overflow-hidden rounded bg-surface-raised"><div className="h-full bg-signal-live transition-[width]" style={{ width: `${data.status.total ? Math.min(100, data.status.done / data.status.total * 100) : 5}%` }} /></div>
            <p className="mt-2 text-xs tabular-nums text-ink-muted">{data.status.done} of {data.status.total || '?'} slices / {data.status.imported} matches / {data.status.requests} requests / {data.status.conflicts} conflicts</p>
          </div>
        )}
      </section>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.3fr)_minmax(340px,0.7fr)]">
        <div className="space-y-10">
          <details className="border-y border-line-subtle py-4">
            <summary className="cursor-pointer text-sm font-medium text-ink">Optional match-detail packs</summary>
            <p className="mb-4 max-w-3xl text-sm leading-relaxed text-ink-muted">
              Add verified lineups and goal events for one public competition-season. StatsBomb uses the entered season, or its newest supported season when blank. Wyscout has fixed public editions and downloads a 74 MB event archive.
            </p>
            <div className="grid gap-3 sm:grid-cols-[minmax(180px,1fr)_minmax(140px,0.65fr)_auto_auto]">
              <select
                className="input"
                value={deepCompetition}
                onChange={(event) => setDeepCompetition(event.target.value as FootballCompetitionKey)}
                aria-label="Deep-pack competition"
              >
                {FOOTBALL_COMPETITIONS.map((competition) => (
                  <option key={competition.key} value={competition.key}>{competition.shortName}</option>
                ))}
              </select>
              <input
                className="input"
                value={deepSeason}
                onChange={(event) => setDeepSeason(event.target.value)}
                placeholder="Season, for example 2017/18"
                aria-label="Deep-pack season"
              />
              <button
                className="btn-ghost"
                disabled={active}
                onClick={() => start({
                  kind: 'deepPack',
                  deepSource: 'statsbomb',
                  competitionKeys: [deepCompetition],
                  seasonKey: deepSeason.trim() || undefined
                })}
              >
                Install StatsBomb
              </button>
              <button
                className="btn-ghost"
                disabled={active}
                onClick={() => start({
                  kind: 'deepPack',
                  deepSource: 'wyscout',
                  competitionKeys: [deepCompetition],
                  seasonKey: deepSeason.trim() || undefined
                })}
              >
                Install Wyscout
              </button>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Wyscout availability: Premier League, La Liga, Serie A, and Bundesliga 2017/18; World Cup 2018; Euros 2016. Unsupported selections fail without changing the archive.
            </p>
          </details>

          <section>
            <FootballSectionTitle title="Coverage matrix" detail="Missing means not supplied" />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-ink-muted"><tr><th className="py-2">Competition</th><th>Results</th><th>Scorers</th><th>Lineups</th><th>Current plan</th></tr></thead>
                <tbody className="divide-y divide-line-subtle">
                  {FOOTBALL_COMPETITIONS.map((competition) => {
                    const coverage = data.coverage.filter((item) => item.competitionKey === competition.key)
                    const entitlement = data.entitlements.find((item) => item.competitionKey === competition.key)
                    const state = (facet: string) => coverage.find((item) => item.facet === facet)?.state ?? 'not supplied'
                    return <tr key={competition.key}><td className="py-3 font-medium text-ink"><span className="flex items-center gap-3"><FootballFlag competitionKey={competition.key} />{competition.shortName}</span></td><td className="text-ink-muted">{state('results')}</td><td className="text-ink-muted">{state('scorers')}</td><td className="text-ink-muted">{state('lineups')}</td><td className="text-ink-muted">{entitlement?.entitled ? 'available' : entitlement ? 'unavailable' : 'unchecked'}</td></tr>
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-5"><FootballCoverageStrip coverage={data.coverage.slice(0, 20)} /></div>
          </section>

          <details className="border-y border-line-subtle py-4" open={data.conflicts.some((item) => item.status === 'open')}>
            <summary className="cursor-pointer text-sm font-medium text-ink">Resolution queue / {data.conflicts.filter((item) => item.status === 'open').length} open</summary>
            <div className="divide-y divide-line-subtle">
              {data.conflicts.filter((item) => item.status === 'open').map((conflict) => (
                <div key={conflict.id} className="grid gap-3 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div><p className="text-sm font-medium text-ink">{conflict.entityLabel ?? `${conflict.entityKind} ${conflict.entityId ?? ''}`}</p><p className="mt-1 text-xs leading-relaxed text-ink-muted">{conflict.facet}: {conflict.sourceA} says {conflict.valueA ?? 'empty'}; {conflict.sourceB} says {conflict.valueB ?? 'empty'}.</p></div>
                  <div className="flex gap-2"><button className="btn-ghost" onClick={async () => { await api.football.resolveConflict(conflict.id, 'resolved', 'Manually accepted'); qc.invalidateQueries({ queryKey: qk.football.sync }) }}>Resolve</button><button className="btn-ghost" onClick={async () => { await api.football.resolveConflict(conflict.id, 'ignored'); qc.invalidateQueries({ queryKey: qk.football.sync }) }}>Ignore</button></div>
                </div>
              ))}
              {!data.conflicts.some((item) => item.status === 'open') && <p className="py-5 text-sm text-ink-muted">No quarantined identities or source conflicts.</p>}
            </div>
          </details>
        </div>

        <aside className="space-y-9">
          <section>
            <FootballSectionTitle title="API-Football budget" />
            <p className="text-3xl font-semibold tabular-nums text-ink">{data.quota.remaining}</p>
            <p className="mt-1 text-sm text-ink-muted">of {data.quota.limit} requests remaining today</p>
            {data.quota.backlog > 0 && <p className="mt-3 text-sm text-signal-anomaly">{data.quota.backlog} detail requests are waiting for a later refresh.</p>}
          </section>
          <section>
            <FootballSectionTitle title="Player Quiz Pack" detail={`${data.playerQuizEligible} / ${data.playerQuizTarget}`} />
            <p className="text-sm leading-relaxed text-ink-muted">A resumable structured-career pack for up to 250 well-connected players. Biographies and imagery stay lazy.</p>
            <button className="btn-ghost mt-3" disabled={active} onClick={() => start({ kind: 'playerQuizPack' })}>Enrich player facts</button>
          </section>
          <section>
            <FootballSectionTitle title="Recent runs" />
            <div className="divide-y divide-line-subtle">{data.lastRuns.map((run) => <div key={run.id} className="py-2.5"><p className="text-sm text-ink">{run.kind} / {run.source}</p><p className="mt-0.5 text-xs text-ink-muted">{run.state} / {run.itemCount} items / {run.startedAt.slice(0, 16).replace('T', ' ')}</p></div>)}</div>
          </section>
        </aside>
      </div>
    </div>
  )
}
