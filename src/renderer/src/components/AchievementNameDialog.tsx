import { useMemo, useState } from 'react'
import type { AchievementRow } from '@shared/types'
import { api } from '../lib/api'
import { swapCandidates, trophyDisplayDecision } from '../lib/achievementDisplay'
import { toastError } from '../lib/toast'
import Dialog from './Dialog'
import { Field } from './Field'

// Fixes a name the percentage-rank pairing gave to the wrong achievement.
// Unlocks are recorded against the achievement's Steam id, so only the
// display half (name, text, art) moves; what was earned stays earned. A fixed
// or confirmed name is kept on later re-fetches, except from the Web API,
// whose list is exact.

function describe(row: AchievementRow): string {
  const pct = row.globalPct != null ? ` (${row.globalPct.toFixed(1)}%)` : ''
  return `${row.name}${pct}`
}

export default function AchievementNameDialog({
  achievements,
  onClose,
  onDone
}: {
  achievements: readonly AchievementRow[]
  onClose: () => void
  onDone: () => void
}) {
  const [targetId, setTargetId] = useState<number>(achievements[0]?.id ?? 0)
  const target = achievements.find((row) => row.id === targetId) ?? null
  const candidates = useMemo(
    () => (target ? swapCandidates(achievements, target) : []),
    [achievements, target]
  )
  const [otherId, setOtherId] = useState<number | null>(null)
  const other =
    candidates.find((row) => row.id === otherId) ?? candidates[0] ?? null
  const [busy, setBusy] = useState(false)
  const close = (): void => {
    if (!busy) onClose()
  }

  async function run(fn: () => Promise<void>): Promise<void> {
    setBusy(true)
    try {
      await fn()
      onDone()
    } catch (e) {
      toastError(e)
      setBusy(false)
    }
  }

  return (
    <Dialog
      labelledBy="achievement-name-title"
      describedBy="achievement-name-help"
      onClose={close}
      panelClassName="card w-full max-w-xl p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 id="achievement-name-title" className="text-lg font-medium">
            Fix an achievement name
          </h2>
          <p id="achievement-name-help" className="mt-1 text-sm text-gray-400">
            When two achievements have almost the same global percentage, NaviHUB can give each
            the other's name. Swapping moves only the names, text and art. Unlocks stay with the
            achievement the emulator recorded.
          </p>
        </div>
        <button className="btn-ghost" onClick={close} disabled={busy} aria-label="Close" title="Close">
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <Field label="Achievement">
          <select
            className="input w-full"
            value={targetId}
            disabled={busy}
            onChange={(event) => {
              setTargetId(Number(event.target.value))
              setOtherId(null)
            }}
          >
            {achievements.map((row) => (
              <option key={row.id} value={row.id}>
                {describe(row)}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Swap its name with"
          description="Closest global percentage first; a wrong pairing only ever trades near neighbours."
        >
          <select
            className="input w-full"
            value={other?.id ?? ''}
            disabled={busy || !candidates.length}
            onChange={(event) => setOtherId(Number(event.target.value))}
          >
            {candidates.map((row) => (
              <option key={row.id} value={row.id}>
                {describe(row)}
              </option>
            ))}
          </select>
        </Field>

        {target && other && (
          <dl className="grid gap-3 rounded-lg border border-base-700 p-3 text-xs sm:grid-cols-2">
            {[target, other].map((row) => (
              <div key={row.id} className="min-w-0">
                <dt className="truncate font-medium text-gray-200">{row.name}</dt>
                <dd className="mt-1 text-gray-400">
                  {trophyDisplayDecision(row).description || 'No description'}
                </dd>
                <dd className="mt-1 text-gray-500">
                  {row.unlockedAt ? 'Earned' : 'Locked'} / Steam id {row.apiName}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          className="btn-primary"
          disabled={busy || !target || !other}
          onClick={() =>
            target && other && run(() => api.achievements.swapNames(target.id, other.id))
          }
        >
          Swap names
        </button>
        <button className="btn-ghost" onClick={close} disabled={busy}>
          Cancel
        </button>
      </div>
    </Dialog>
  )
}
