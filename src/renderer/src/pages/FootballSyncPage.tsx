import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import { FOOTBALL_COMPETITIONS } from '@shared/football'
import type {
  FootballCompetitionKey,
  FootballConflictCandidate,
  FootballSetupStep,
  FootballSyncKind,
  FootballSyncRequest
} from '@shared/types'
import { FootballCoverageStrip, FootballFlag, FootballSectionTitle } from '../components/football/FootballCommon'

function careerLine(person: FootballConflictCandidate): string {
  const years = person.firstYear == null
    ? 'no stored appearances'
    : person.firstYear === person.lastYear ? `${person.firstYear}` : `${person.firstYear}-${person.lastYear}`
  return person.teams.length ? `${person.teams.join(', ')} / ${years}` : years
}

const SETUP_STEPS: Array<{ key: FootballSetupStep; title: string; body: string }> = [
  { key: 'history', title: 'Match history', body: 'Every result, table, champion and scorer from the free sources back to 1888, plus this season\'s fixtures and results. About five minutes.' },
  { key: 'detail', title: 'Match detail', body: 'Lineups, assists, cards, substitutions, referees, formations and transfers from 2012 on. About eight minutes and a 230 MB download.' },
  { key: 'pictures', title: 'Pictures and facts', body: 'Club crests, competition logos, player photos, club colours, stadiums, managers and careers. Runs for a few hours in the background.' }
]

const STEP_BY_KIND: Partial<Record<FootballSyncKind, FootballSetupStep>> = {
  history: 'history',
  transfermarkt: 'detail',
  artwork: 'pictures'
}

export default function FootballSyncPage() {
  const qc = useQueryClient()
  const [deepCompetition, setDeepCompetition] = useState<FootballCompetitionKey>('premier-league')
  const [deepSeason, setDeepSeason] = useState('')
  const [mergeTargets, setMergeTargets] = useState<Record<number, string>>({})
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.football.sync,
    queryFn: () => api.football.syncOverview(),
    refetchInterval: (query) => {
      const state = query.state.data?.status.state
      return state && ['running', 'pausing', 'paused'].includes(state) ? 700 : false
    }
  })
  if (isLoading) return <PageStatus>Reading Football source state...</PageStatus>
  if (isError) return <PageStatus>Could not load Football source state.</PageStatus>
  if (!data) return <PageStatus>Football source state is unavailable.</PageStatus>
  const active = ['running', 'pausing', 'paused'].includes(data.status.state)

  async function start(request: FootballSyncRequest) {
    await api.football.startSync(request)
    qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function control(action: 'pause' | 'resume' | 'cancel') {
    if (action === 'pause') await api.football.pauseSync()
    else if (action === 'resume') await api.football.resumeSync()
    else await api.football.cancelSync()
    qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function resolveConflict(
    id: number,
    resolution: Parameters<typeof api.football.resolveConflict>[1]
  ): Promise<void> {
    await api.football.resolveConflict(id, resolution)
    await qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function repairIdentities(): Promise<void> {
    const result = await api.football.repairIdentities()
    await qc.invalidateQueries({ queryKey: qk.football.all })
    toast(
      `Merged ${result.merged} duplicate players, removed ${result.removed} unused entries, closed ${result.resolved} conflicts`,
      'success'
    )
  }
  const openConflicts = data.conflicts.filter((item) => item.status === 'open')
  const pending = SETUP_STEPS.filter((step) => !data.setup[step.key])

  return (
    <div className="mx-auto max-w-[1200px] p-6">
      <PageHeader
        title="Football setup"
        subtitle="Three steps build the whole archive. Each runs in the background; you can pause, leave the page or quit, and it picks up where it stopped."
        back={{ to: '/football', label: 'Football Archive' }}
        actions={<Link to="/settings?tab=data" className="btn-ghost">Keys and folders</Link>}
      />

      <section className="card mb-8 overflow-hidden">
        <ol className="divide-y divide-line-subtle">
          {SETUP_STEPS.map((step, index) => {
            const done = data.setup[step.key]
            const running = active && (data.status.setupStep?.step === step.key || (data.status.kind != null && STEP_BY_KIND[data.status.kind] === step.key))
            const legacyHistory = step.key === 'history' && !done && data.installed
            const blocked = step.key !== 'history' && !data.installed
            return (
              <li key={step.key} className="grid gap-4 p-5 sm:grid-cols-[40px_minmax(0,1fr)_auto] sm:items-center">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${done ? 'bg-signal-affirmative text-ink-inverse' : running ? 'bg-signal-live text-ink-inverse' : 'bg-surface-raised text-ink-secondary'}`} aria-hidden="true">{done ? '✓' : index + 1}</span>
                <span className="min-w-0">
                  <span className="block font-semibold text-ink">{step.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{step.body}</span>
                  <span className={`mt-1.5 block text-xs ${done ? 'text-signal-affirmative' : running ? 'text-signal-live' : legacyHistory ? 'text-signal-caution' : 'text-ink-muted'}`}>
                    {running
                      ? data.status.message ?? 'Running'
                      : done
                        ? `Done ${done.slice(0, 10)}`
                        : legacyHistory
                          ? 'Installed with an older version: run it again to fill in missing champions and merge duplicate seasons'
                          : blocked ? 'Needs step 1 first' : 'Not done yet'}
                  </span>
                  {step.key === 'pictures' && data.artwork.teams > 0 && (
                    <span className="mt-1 block text-xs tabular-nums text-ink-muted">
                      {data.artwork.teamsWithCrest.toLocaleString()} of {data.artwork.teams.toLocaleString()} crests / {data.artwork.peopleWithPortrait.toLocaleString()} player photos / {data.artwork.competitionsWithLogo} of 9 logos
                    </span>
                  )}
                </span>
                <button className="btn-ghost" disabled={active || blocked} onClick={() => start({ kind: 'setup', setupSteps: [step.key] })}>
                  {done || legacyHistory ? 'Run again' : 'Run this step'}
                </button>
              </li>
            )
          })}
        </ol>
        <div className="border-t border-line-subtle bg-surface-raised/40 p-5">
          {active ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-medium text-ink">
                  {data.status.setupStep ? `Step ${data.status.setupStep.index} of ${data.status.setupStep.count}: ` : ''}{data.status.message ?? 'Working'}
                </p>
                <div className="flex gap-2">
                  {data.status.state === 'running' && <button className="btn-ghost" onClick={() => control('pause')}>Pause</button>}
                  {(data.status.state === 'paused' || data.status.state === 'pausing') && <button className="btn-ghost" onClick={() => control('resume')}>Resume</button>}
                  <button className="btn-ghost text-signal-anomaly" onClick={() => control('cancel')}>Cancel</button>
                </div>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded bg-surface-raised"><div className="h-full bg-signal-live transition-[width]" style={{ width: `${data.status.total ? Math.min(100, (data.status.done / data.status.total) * 100) : 4}%` }} /></div>
            </div>
          ) : pending.length ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-secondary">{data.installed ? `${pending.length} of ${SETUP_STEPS.length} steps left.` : 'Nothing installed yet.'} One button runs them in order.</p>
              <button className="btn-primary" onClick={() => start({ kind: 'setup' })}>{data.installed ? 'Continue setup' : 'Set up everything'}</button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink-secondary">Setup complete. Run it again now and then for new seasons, fixes and pictures.</p>
              <button className="btn-ghost" onClick={() => start({ kind: 'setup', setupSteps: ['history', 'detail', 'pictures'] })}>Refresh everything</button>
            </div>
          )}
          {data.status.state === 'error' && <p className="mt-3 text-sm text-signal-anomaly">Last run stopped: {data.status.message}</p>}
        </div>
      </section>

      {openConflicts.length > 0 && (
        <div className="mb-8">
              <details className="border-y border-line-subtle py-4" open>
                <summary className="cursor-pointer text-sm font-medium text-ink">Resolution queue / {openConflicts.length} open</summary>
                {openConflicts.some((item) => item.entityKind === 'person' && item.facet === 'identity') && (
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-y border-line-subtle py-3">
                    <p className="max-w-2xl text-xs leading-relaxed text-ink-muted">Players with the same name who played for the same team within fifteen years are merged. Other same-name players stay here for you to decide.</p>
                    <button className="btn-ghost" disabled={active} onClick={repairIdentities}>Merge same-team duplicates</button>
                  </div>
                )}
                <div className="divide-y divide-line-subtle">
                  {openConflicts.map((conflict) => (
                    <div key={conflict.id} className="grid gap-3 py-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                      {conflict.subject ? (
                        <div>
                          <p className="text-sm font-medium text-ink">{conflict.subject.name}</p>
                          <p className="mt-1 text-xs text-ink-muted">{careerLine(conflict.subject)}</p>
                          {conflict.candidates.length > 0 && <p className="mt-2 text-xs text-ink-muted">Same name elsewhere in the archive:</p>}
                        </div>
                      ) : (
                        <div><p className="text-sm font-medium text-ink">{conflict.entityLabel ?? `${conflict.entityKind} ${conflict.entityId ?? ''}`}</p><p className="mt-1 text-xs leading-relaxed text-ink-muted">{conflict.facet}: {conflict.sourceA} says {conflict.valueA ?? 'empty'}; {conflict.sourceB} says {conflict.valueB ?? 'empty'}.</p></div>
                      )}
                      <div className="flex flex-wrap items-end gap-2">
                        {conflict.candidates.map((candidate) => (
                          <button key={candidate.id} className="btn-ghost text-left" title={`Merge into ${candidate.name} (${careerLine(candidate)})`} onClick={() => resolveConflict(conflict.id, { action: 'mergeEntity', targetEntityId: candidate.id })}>
                            Same as {candidate.name} <span className="text-ink-muted">/ {careerLine(candidate)}</span>
                          </button>
                        ))}
                        {conflict.facet === 'result' && <>
                          <button className="btn-ghost" onClick={() => resolveConflict(conflict.id, { action: 'acceptSourceA' })}>Accept {conflict.sourceA}</button>
                          <button className="btn-ghost" onClick={() => resolveConflict(conflict.id, { action: 'acceptSourceB' })}>Accept {conflict.sourceB}</button>
                        </>}
                        {conflict.facet === 'identity' && <>
                          {conflict.candidates.length === 0 && <label className="block w-36">
                            <span className="label">Merge target ID</span>
                            <input className="input" inputMode="numeric" value={mergeTargets[conflict.id] ?? ''} onChange={(event) => setMergeTargets((current) => ({ ...current, [conflict.id]: event.target.value }))} />
                          </label>}
                          {conflict.candidates.length === 0 && <button className="btn-ghost" disabled={!Number.isInteger(Number(mergeTargets[conflict.id])) || Number(mergeTargets[conflict.id]) < 1} onClick={() => resolveConflict(conflict.id, { action: 'mergeEntity', targetEntityId: Number(mergeTargets[conflict.id]) })}>Merge</button>}
                          <button className="btn-ghost" onClick={() => resolveConflict(conflict.id, { action: 'keepSeparate' })}>Keep separate</button>
                        </>}
                        <button className="btn-ghost" onClick={() => resolveConflict(conflict.id, { action: 'ignore' })}>Ignore and quarantine</button>
                      </div>
                    </div>
                  ))}
                  {openConflicts.length === 0 && <p className="py-5 text-sm text-ink-muted">No quarantined identities or source conflicts.</p>}
                </div>
              </details>
        </div>
      )}

      <section className="mb-8 flex flex-wrap items-center justify-between gap-4 border-y border-line-subtle py-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-ink">Current season, live tables and today's fixtures <span className="font-normal text-ink-muted">(optional)</span></p>
          <p className="mt-1 text-xs text-ink-muted">Needs a free API-Football key in Settings. {data.quota.remaining} of {data.quota.limit} requests left today{data.quota.backlog > 0 ? `, ${data.quota.backlog} waiting` : ''}.</p>
        </div>
        <button className="btn-ghost" disabled={active || !data.installed} onClick={() => start({ kind: 'current' })}>Refresh current season</button>
      </section>

      <details className="border-y border-line-subtle py-4">
        <summary className="cursor-pointer text-sm font-medium text-ink">Extra sources and details</summary>
        <div className="mt-6 space-y-10">
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
                <FootballSectionTitle title="Player Quiz Pack" detail={`${data.playerQuizEligible} / ${data.playerQuizTarget}`} />
                <p className="text-sm leading-relaxed text-ink-muted">A resumable structured-career pack for up to 250 well-connected players. Biographies and imagery stay lazy.</p>
                <button className="btn-ghost mt-3" disabled={active} onClick={() => start({ kind: 'playerQuizPack' })}>Enrich player facts</button>
              </section>
              <section>
                <FootballSectionTitle title="Coverage matrix" detail="Missing means not supplied" />
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-xs text-ink-muted"><tr><th className="py-2">Competition</th><th>Results</th><th>Scorers</th><th>Lineups</th><th>Current plan</th></tr></thead>
                    <tbody className="divide-y divide-line-subtle">
                      {FOOTBALL_COMPETITIONS.map((competition) => {
                        const coverage = data.coverage.filter((item) => item.competitionKey === competition.key)
                        const entitlement = data.entitlements.find((item) => item.competitionKey === competition.key)
                        const state = (facet: string) => {
                          const rows = coverage.filter((item) => item.facet === facet)
                          return rows.length
                            ? rows.map((item) => `${item.source}: ${item.state}`).join(', ')
                            : 'not supplied'
                        }
                        return <tr key={competition.key}><td className="py-3 font-medium text-ink"><span className="flex items-center gap-3"><FootballFlag competitionKey={competition.key} />{competition.shortName}</span></td><td className="text-ink-muted">{state('results')}</td><td className="text-ink-muted">{state('scorers')}</td><td className="text-ink-muted">{state('lineups')}</td><td className="text-ink-muted">{entitlement?.entitled ? 'available' : entitlement ? 'unavailable' : 'unchecked'}</td></tr>
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-5"><FootballCoverageStrip coverage={data.coverage.slice(0, 20)} /></div>
              </section>
              <section>
                <FootballSectionTitle title="Recent runs" />
                <div className="divide-y divide-line-subtle">{data.lastRuns.map((run) => <div key={run.id} className="py-2.5"><p className="text-sm text-ink">{run.kind} / {run.source}</p><p className="mt-0.5 text-xs text-ink-muted">{run.state} / {run.itemCount} items / {run.startedAt.slice(0, 16).replace('T', ' ')}</p></div>)}</div>
              </section>
        </div>
      </details>
    </div>
  )
}
