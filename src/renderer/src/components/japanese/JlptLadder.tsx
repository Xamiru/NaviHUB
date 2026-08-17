import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { LEVEL_PASS_RATIO, PASSED_INTERVAL_DAYS } from '@shared/jlptLevels'
import type { JlptLevelProgress } from '@shared/jlptLevels'

// The JLPT ladder: where you are, level by level.
//
// PROGRESS ONLY — nothing here locks anything (the user's call, 2026-08-16).
// This section is their only Japanese source, so it must never be the reason a
// card is unavailable; a level you have not cleared is a number, not a gate.
//
// "Passed" means a card whose next review is at least PASSED_INTERVAL_DAYS out
// — the closest thing this SRS has to WaniKani's Guru, and the definition is
// spelled out in the footnote rather than left as jargon.

function LevelRow({ level, current }: { level: JlptLevelProgress; current: boolean }) {
  const empty = level.cards === 0
  return (
    <div
      className={`rounded-md border px-3 py-2.5 ${
        current ? 'border-accent/40 bg-accent/5' : 'border-base-700'
      } ${empty ? 'opacity-50' : ''}`}
    >
      <div className="flex items-baseline gap-2">
        <span className={`text-sm font-semibold ${level.complete ? 'text-accent' : ''}`}>
          {level.level}
        </span>
        {current && <span className="chip text-[10px]">you are here</span>}
        {level.complete && <span className="text-xs text-accent">cleared</span>}
        <span className="ml-auto text-xs tabular-nums text-gray-500">
          {empty ? 'no cards' : `${level.passed} / ${level.cards} passed`}
        </span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-base-700">
        <div className="h-full rounded-full bg-accent" style={{ width: `${level.pct}%` }} />
      </div>

      {!empty && (
        <div className="mt-1.5 flex flex-wrap gap-x-4 text-[10px] uppercase tracking-widest text-gray-500">
          <span>
            <span className="text-accent">{level.passed}</span> passed
          </span>
          <span>
            <span className="text-gray-300">{level.inProgress}</span> in progress
          </span>
          <span>
            <span className="text-gray-300">{level.untouched}</span> not started
          </span>
          <span className="ml-auto tabular-nums">{level.pct}%</span>
        </div>
      )}
    </div>
  )
}

export default function JlptLadder() {
  const { data } = useQuery({
    queryKey: qk.japanese.jlptLadder,
    queryFn: () => api.japanese.jlptLadder()
  })

  if (!data) return <p className="text-sm text-gray-500">Loading…</p>
  if (data.cards === 0) {
    return (
      <p className="text-sm text-gray-500">
        No course carries a JLPT level yet — add one to a course and its cards show up here.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-3 text-sm">
        <span className="text-gray-400">
          {data.current ? (
            <>
              Working through <span className="font-semibold text-accent">{data.current}</span>
            </>
          ) : (
            'Nothing levelled yet'
          )}
        </span>
        <span className="text-xs tabular-nums text-gray-500">
          {data.passed} of {data.cards} cards passed
        </span>
      </div>

      {data.levels.map((l) => (
        <LevelRow key={l.level} level={l} current={l.level === data.current} />
      ))}

      <p className="pt-1 text-[10px] leading-relaxed text-gray-600">
        Passed = the card&apos;s next review is {PASSED_INTERVAL_DAYS} days or more away. A level
        clears at {Math.round(LEVEL_PASS_RATIO * 100)}%, so a few stubborn cards can&apos;t stall
        it. Levels never lock anything — study whatever you like, whenever.
        {data.unlevelled > 0 && (
          <> {data.unlevelled} cards sit in courses with no JLPT level and aren&apos;t counted.</>
        )}
      </p>
    </div>
  )
}
