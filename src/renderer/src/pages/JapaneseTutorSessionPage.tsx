import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import SessionSummary from '../components/japanese/SessionSummary'
import { BudgetPicker, PlanBlocks } from '../components/japanese/SessionPlanPicker'
import { useJapaneseTutorModel } from '../lib/useJapaneseTutorModel'
import { loadJpSessionBudget, saveJpSessionBudget } from '../lib/japanesePrefs'
import {
  saveTutorSession,
  startTutorSession,
  tutorBaseline,
  updateTutorSession,
  useTutorSessionState
} from '../lib/japaneseTutorSession'
import {
  tutorSessionDebrief,
  tutorSessionProgress,
  type TutorSessionEvidence
} from '@shared/japanese/tutorSession'
import { TUTOR_SKILL_LABEL, type TutorBudget } from '@shared/japanese/tutor'

// Today's guided session, one block at a time: a segmented bar, the block to do
// now with one Go button, and the whole plan underneath. Blocks complete from
// what the app can see (reviews, quiz results, lessons, chapters); anything it
// cannot see can be marked done by hand and says so.
export default function JapaneseTutorSessionPage() {
  const qc = useQueryClient()
  const [budget, setBudget] = useState<TutorBudget>(loadJpSessionBudget)
  const model = useJapaneseTutorModel(budget)
  const session = useTutorSessionState()
  const [saving, setSaving] = useState(false)

  if (!model.ready) return <PageStatus>Preparing today’s session…</PageStatus>

  const { stats, detail, history, mangaLibrary, plan } = model

  function begin(): void {
    startTutorSession(plan, tutorBaseline(stats, detail), budget)
  }

  function pickBudget(next: TutorBudget): void {
    setBudget(next)
    saveJpSessionBudget(next)
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-3xl p-4 sm:p-6">
        <PageHeader
          back={{ to: '/japanese', label: 'Japanese' }}
          title="Today’s session"
          subtitle="Pick how long you have. The session walks you through each part in order."
        />
        <div className="card space-y-6 p-6">
          <BudgetPicker value={budget} onChange={pickBudget} />
          <PlanBlocks tasks={plan.tasks} />
          <button type="button" className="btn-primary" onClick={begin}>
            Start {budget}-minute session
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
    learnedLessons: stats.learnedLessons,
    histories: history
  }
  const progress = tutorSessionProgress(session, evidence)
  const debrief = tutorSessionDebrief(progress)
  const repair = progress.find((item) => item.repair)?.repair ?? null
  const current = progress.find((item) => !item.complete) ?? null
  const allDone = debrief.completed === debrief.total
  const sessionMinutes = session.budgetMinutes ?? debrief.plannedMinutesTotal

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

  function startAgain(): void {
    saveTutorSession(null)
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title={session.endedAt ? 'Session saved' : 'Today’s session'}
        subtitle={`${sessionMinutes}-minute session · ${plan.phase.title} · started ${formatStart(session.startedAt)}`}
        actions={
          !session.endedAt && (
            <button type="button" className="btn-ghost" disabled={saving} onClick={() => void endDay()}>
              {saving ? 'Saving…' : 'End session'}
            </button>
          )
        }
      />

      <ol className="mb-2 flex gap-1.5" aria-label="Session progress">
        {progress.map((item, index) => {
          const now = !session.endedAt && current?.key === item.key
          return (
            <li key={item.key} className="min-w-0 flex-1">
              <span
                className={`block h-2 rounded-full ${
                  item.complete ? 'bg-accent' : now ? 'bg-accent/40 ring-1 ring-accent' : 'bg-base-700'
                }`}
                aria-hidden="true"
              />
              <span className="sr-only">
                Block {index + 1}, {TUTOR_SKILL_LABEL[item.task.skill]}:{' '}
                {item.complete ? 'done' : now ? 'now' : 'not started'}
              </span>
            </li>
          )
        })}
      </ol>
      <p className="mb-6 text-xs tabular-nums text-gray-400">
        {debrief.completed} of {debrief.total} blocks done · {debrief.plannedMinutesCompleted} of{' '}
        {debrief.plannedMinutesTotal} planned minutes completed
      </p>

      {session.endedAt ? (
        <div className="mb-8">
          <SessionSummary
            title={allDone ? 'Every block done' : 'Session saved'}
            facts={[
              { label: 'Blocks done', value: `${debrief.completed} / ${debrief.total}` },
              {
                label: 'Planned minutes completed',
                value: `${debrief.plannedMinutesCompleted} / ${debrief.plannedMinutesTotal}`
              },
              { label: 'Best result', value: debrief.strongest ?? 'not scored' }
            ]}
            note={`Tomorrow: ${debrief.tomorrowFocus}`}
            celebrate={debrief.completed > 0}
            actions={
              <button type="button" className="btn-ghost" onClick={startAgain}>
                Start another session
              </button>
            }
          />
        </div>
      ) : repair ? (
        <section className="card mb-8 border-signal-caution/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-signal-caution">Quick practice</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">{repair.title}</h2>
          <p className="mt-2 max-w-2xl leading-7 text-gray-300">{repair.detail}</p>
          <p className="mt-2 text-sm text-gray-400">
            Your last result was {repair.score}%; aim for {repair.threshold}%.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to={repair.route} className="btn-primary">Practise now · 5 min</Link>
            <button type="button" className="btn-ghost" onClick={() => dismissRepair(repair.key)}>
              Skip and continue
            </button>
          </div>
        </section>
      ) : current ? (
        <section className="card mb-8 p-6 sm:p-8" aria-labelledby="current-block">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            Now · {TUTOR_SKILL_LABEL[current.task.skill]} · {current.task.minutes} min
          </p>
          <h2 id="current-block" className="mt-3 text-3xl font-semibold text-white text-balance">
            {current.task.title}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-gray-300">{current.task.detail}</p>
          <p className="mt-2 text-sm text-gray-400">{current.task.reason}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to={current.task.route} className="btn-primary px-6 py-2.5 text-base">Go</Link>
            <button type="button" className="btn-ghost" onClick={() => toggleManual(current.key)}>
              I did this another way
            </button>
          </div>
        </section>
      ) : (
        <section className="card mb-8 p-6 text-center sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Every block is done</h2>
          <p className="mt-2 text-gray-300">Save the session to keep today’s record.</p>
          <button
            type="button"
            className="btn-primary mt-5"
            disabled={saving}
            onClick={() => void endDay()}
          >
            {saving ? 'Saving…' : 'Finish session'}
          </button>
        </section>
      )}

      <section aria-labelledby="session-plan">
        <h2 id="session-plan" className="text-sm font-semibold text-white">The whole session</h2>
        <ol className="mt-3 divide-y divide-base-700 border-y border-base-700">
          {progress.map((item) => {
            const manual = session.manualCompleted.includes(item.key)
            return (
              <li key={item.key} className="flex flex-wrap items-center gap-3 px-1 py-3">
                <span
                  className={`w-5 text-center ${item.complete ? 'text-accent' : 'text-gray-500'}`}
                  aria-label={item.complete ? 'Done' : 'Not done'}
                >
                  {item.complete ? '✓' : '○'}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={item.complete ? 'text-gray-400' : 'text-white'}>{item.task.title}</p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {TUTOR_SKILL_LABEL[item.task.skill]} · {item.task.minutes} min · {item.evidence}
                  </p>
                </div>
                {!session.endedAt && (
                  <div className="flex gap-2">
                    {!item.complete && <Link to={item.task.route} className="btn-ghost">Open</Link>}
                    {(manual || !item.complete) && (
                      <button
                        type="button"
                        className="btn-ghost"
                        aria-pressed={manual}
                        onClick={() => toggleManual(item.key)}
                      >
                        {manual ? 'Undo' : 'Mark done'}
                      </button>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ol>
        <p className="mt-3 text-xs text-gray-500">
          Reviews, quiz results, lessons and chapter progress tick blocks off on their own. Mark a
          block done yourself when you practised in a way the app cannot see; it is recorded as
          marked by you.
        </p>
      </section>
    </div>
  )
}

function formatStart(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'today'
    : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
