import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { useJapaneseTutorModel } from '../lib/useJapaneseTutorModel'
import {
  saveTutorSession,
  startTutorSession,
  updateTutorSession,
  useTutorSessionState
} from '../lib/japaneseTutorSession'
import {
  tutorSessionDebrief,
  tutorSessionProgress,
  type TutorSessionEvidence
} from '@shared/japanese/tutorSession'
import type { TutorSkill } from '@shared/japanese/tutor'

const SKILL_LABEL: Record<TutorSkill, string> = {
  recall: 'Recall',
  sound: 'Sound',
  listening: 'Listening',
  reading: 'Reading',
  output: 'Output',
  curriculum: 'Curriculum'
}

export default function JapaneseTutorSessionPage() {
  const qc = useQueryClient()
  const model = useJapaneseTutorModel()
  const session = useTutorSessionState()
  const [saving, setSaving] = useState(false)

  if (!model.ready) return <PageStatus>Reading today’s study evidence…</PageStatus>

  const { stats, detail, history, mangaLibrary, plan } = model

  function begin(): void {
    startTutorSession(plan, {
      due: stats.dueCount,
      reviewsToday: stats.reviewsToday,
      introducedToday: stats.introducedToday,
      chaptersRead: detail.journey.chaptersRead
    })
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-4xl p-4 sm:p-6">
        <PageHeader
          back={{ to: '/japanese/tutor', label: 'Tutor' }}
          title="Guided study session"
          subtitle="Work through one responsive docket. NaviHUB advances the plan from evidence it can verify and leaves every recommendation open."
        />
        <div className="border-y border-base-700 py-8">
          <p className="max-w-2xl text-lg leading-8 text-gray-300">
            Today’s plan contains {plan.tasks.length} blocks and about {plan.totalMinutes} minutes.
            Start when you are ready; the baseline is captured at that moment.
          </p>
          <button type="button" className="btn-primary mt-6" onClick={begin}>
            Start today’s docket
          </button>
        </div>
      </div>
    )
  }

  const chapterDates = mangaLibrary?.chapters
    .map((chapter) => chapter.readAt)
    .filter((value): value is string => !!value)
    .sort()
  const evidence: TutorSessionEvidence = {
    due: stats.dueCount,
    reviewsToday: stats.reviewsToday,
    introducedToday: stats.introducedToday,
    chaptersRead: detail.journey.chaptersRead,
    latestChapterReadAt: chapterDates?.at(-1) ?? null,
    histories: history
  }
  const progress = tutorSessionProgress(session, evidence)
  const debrief = tutorSessionDebrief(progress)
  const repair = progress.find((item) => item.repair)?.repair ?? null
  const next = progress.find((item) => !item.complete) ?? null
  const current = repair
    ? progress.find((item) => item.repair?.key === repair.key) ?? next
    : next
  const complete = debrief.completed === debrief.total

  function toggleManual(key: string): void {
    updateTutorSession((state) => ({
      ...state,
      manualCompleted: state.manualCompleted.includes(key)
        ? state.manualCompleted.filter((item) => item !== key)
        : [...state.manualCompleted, key]
    }))
  }

  function dismissRepair(key: string): void {
    updateTutorSession((state) => ({
      ...state,
      dismissedRepairs: [...new Set([...state.dismissedRepairs, key])]
    }))
  }

  async function endDay(): Promise<void> {
    if (saving || !session) return
    const endedAt = new Date().toISOString()
    setSaving(true)
    try {
      await api.japanese.saveTutorDebrief({
        day: session.day,
        phaseId: session.phaseId,
        startedAt: session.startedAt,
        endedAt,
        plannedMinutes: debrief.plannedMinutesTotal,
        completedMinutes: debrief.plannedMinutesCompleted,
        completedBlocks: debrief.completed,
        totalBlocks: debrief.total,
        strongest: debrief.strongest,
        tomorrowFocus: debrief.tomorrowFocus,
        tasks: progress.map((item) => ({
          key: item.key,
          skill: item.task.skill,
          title: item.task.title,
          plannedMinutes: item.task.minutes,
          complete: item.complete,
          evidence: item.evidence,
          score:
            item.latestSession && item.latestSession.total > 0
              ? Math.round((item.latestSession.score / item.latestSession.total) * 100)
              : null
        })),
        errors: progress.flatMap((item) =>
          item.weakness
            ? [
                {
                  day: session.day,
                  skill: item.weakness.skill,
                  label: item.weakness.title,
                  detail: item.weakness.detail,
                  sourceKind: item.weakness.sourceKind,
                  sourceSessionId: item.weakness.sourceSessionId,
                  score: item.weakness.score,
                  threshold: item.weakness.threshold
                }
              ]
            : []
        )
      })
      updateTutorSession((state) => ({ ...state, endedAt }))
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.japanese.tutorDays }),
        qc.invalidateQueries({ queryKey: qk.japanese.tutorErrors })
      ])
    } finally {
      setSaving(false)
    }
  }

  function freshStart(): void {
    saveTutorSession(null)
    begin()
  }

  return (
    <div className="mx-auto max-w-[1320px] p-4 sm:p-6">
      <PageHeader
        back={{ to: '/japanese/tutor', label: 'Tutor' }}
        title={session.endedAt ? 'Today’s Tutor debrief' : 'Guided study session'}
        subtitle={`${plan.phase.title}. The docket updates from evidence logged after ${formatStart(session.startedAt)}.`}
        actions={
          session.endedAt ? (
            <button type="button" className="btn-ghost" onClick={freshStart}>Start fresh session</button>
          ) : (
            <button type="button" className="btn-ghost" disabled={saving} onClick={() => void endDay()}>
              {saving ? 'Saving debrief…' : 'End and debrief'}
            </button>
          )
        }
      />

      {!session.endedAt && repair && (
        <section className="mb-7 border border-signal-caution/40 bg-signal-caution/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-signal-caution">Immediate repair</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{repair.title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-300">{repair.detail}</p>
          <p className="mt-2 text-xs text-gray-500">
            Latest result: {repair.score}%. Repair target: {repair.threshold}%.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to={repair.route} className="btn-primary">Open five-minute repair</Link>
            <button type="button" className="btn-ghost" onClick={() => dismissRepair(repair.key)}>
              Continue without repair
            </button>
          </div>
        </section>
      )}

      <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_310px]">
        <div className="min-w-0">
          {!session.endedAt && current && !repair && (
            <section className="mb-7 border-y border-accent/40 bg-accent/5 px-1 py-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">Current block</p>
              <div className="mt-3 flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-semibold text-white">{current.task.title}</h2>
                  <p className="mt-2 leading-7 text-gray-300">{current.task.detail}</p>
                  <p className="mt-2 text-sm text-gray-500">Why now: {current.task.reason}</p>
                </div>
                <Link to={current.task.route} className="btn-primary">Open block</Link>
              </div>
            </section>
          )}

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Study docket</h2>
                <p className="mt-1 text-sm text-gray-500">{debrief.completed} of {debrief.total} blocks complete</p>
              </div>
              <p className="text-sm tabular-nums text-gray-400">
                {debrief.plannedMinutesCompleted} of {debrief.plannedMinutesTotal} planned minutes complete
              </p>
            </div>
            <div className="mt-4 divide-y divide-base-700 border-y border-base-700">
              {progress.map((item, index) => {
                const isCurrent = current?.key === item.key && !session.endedAt
                return (
                  <article
                    key={item.key}
                    className={`grid gap-3 px-1 py-4 sm:grid-cols-[44px_100px_minmax(0,1fr)_auto] sm:items-center ${
                      isCurrent ? 'bg-accent/5' : ''
                    }`}
                  >
                    <span className="text-xs tabular-nums text-gray-500">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="text-sm font-medium text-white">{SKILL_LABEL[item.task.skill]}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{item.task.minutes} minutes</p>
                    </div>
                    <div>
                      <p className={item.complete ? 'font-medium text-gray-400' : 'font-medium text-white'}>
                        {item.task.title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{item.evidence}</p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {!item.complete && <Link to={item.task.route} className="btn-ghost">Open</Link>}
                      <button
                        type="button"
                        className="btn-ghost"
                        disabled={item.complete && !session.manualCompleted.includes(item.key)}
                        aria-pressed={item.complete && session.manualCompleted.includes(item.key)}
                        onClick={() => toggleManual(item.key)}
                      >
                        {session.manualCompleted.includes(item.key) ? 'Undo manual mark' : item.complete ? 'Completed' : 'Mark complete'}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Daily debrief</p>
            <p className="mt-3 text-3xl font-semibold tabular-nums text-white">
              {debrief.completed} / {debrief.total}
            </p>
            <p className="mt-3 text-sm leading-6 text-gray-400">{debrief.summary}</p>
            <dl className="mt-5 space-y-3 border-t border-base-700 pt-4 text-sm">
              <DebriefRow
                label="Planned time completed"
                value={`${debrief.plannedMinutesCompleted} / ${debrief.plannedMinutesTotal} min`}
              />
              <DebriefRow label="Strongest result" value={debrief.strongest ?? 'not scored yet'} />
              <DebriefRow label="Tomorrow first" value={debrief.tomorrowFocus} />
            </dl>
            {!session.endedAt && (complete || debrief.completed > 0) && (
              <button
                type="button"
                className="btn-primary mt-5 w-full"
                disabled={saving}
                onClick={() => void endDay()}
              >
                {saving
                  ? 'Saving debrief…'
                  : complete
                    ? 'Close today’s session'
                    : 'End here and keep the evidence'}
              </button>
            )}
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold text-white">How completion works</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Reviews, quiz results, new cards, and local chapter progress complete blocks automatically.
              Use a manual mark for unlogged reading, speaking, or another valid variation.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function DebriefRow({ label, value }: { label: string; value: string }): JSX.Element {
  return <div><dt className="text-gray-500">{label}</dt><dd className="mt-1 leading-5 text-gray-200">{value}</dd></div>
}

function formatStart(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'the start of this session'
    : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
