import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { useIncrementalList } from '../lib/hooks'
import type { GameUpgradePlan, GameUpgradeReview } from '@shared/types'
import QuietWorkspace from './QuietWorkspace'

// "Upgrade games": the games already in the library get the games catalog's
// box art (Japanese first), platforms and Japanese titles, and those Bangumi
// knows get their cast. Check first (a dry run that writes nothing), then run
// in the background; games the matcher could not decide wait in the review
// list below for the user's pick.

let lastSettled: string | null = null

export default function GamesUpgradeSection(): React.JSX.Element {
  const qc = useQueryClient()
  const [plan, setPlan] = useState<GameUpgradePlan | null>(null)
  const [checking, setChecking] = useState(false)
  const [installing, setInstalling] = useState(false)
  const [resolved, setResolved] = useState<Set<number>>(new Set())

  const { data: catalog } = useQuery({ queryKey: qk.gamesCatalog.status, queryFn: () => api.gameCatalog.status() })
  const { data: status } = useQuery({
    queryKey: qk.gameUpgrade.status,
    queryFn: () => api.gameUpgrade.status(),
    refetchInterval: (q) => (q.state.data?.state === 'running' ? 700 : false)
  })
  const running = status?.state === 'running'

  useEffect(() => {
    if (!status || status.state === 'running' || status.state === 'idle') return
    const key = `${status.id}:${status.state}`
    if (lastSettled === key) return
    lastSettled = key
    const tally = `${status.upgraded} upgraded${status.failed ? `, ${status.failed} failed` : ''}`
    toast(status.state === 'done' ? `Games upgrade finished: ${tally}.` : `Games upgrade stopped: ${tally} kept.`, 'success')
    void qc.invalidateQueries({ queryKey: qk.media.all })
  }, [status, qc])

  async function check(): Promise<void> {
    setChecking(true)
    try {
      setPlan(await api.gameUpgrade.plan())
      setResolved(new Set())
    } catch (e) {
      toastError(e)
    } finally {
      setChecking(false)
    }
  }

  async function start(): Promise<void> {
    try {
      await api.gameUpgrade.start()
    } catch (e) {
      toastError(e)
    }
    await qc.invalidateQueries({ queryKey: qk.gameUpgrade.status })
  }

  async function install(): Promise<void> {
    setInstalling(true)
    try {
      await api.gameCatalog.install()
      await qc.invalidateQueries({ queryKey: qk.gamesCatalog.status })
    } catch (e) {
      toastError(e)
    } finally {
      setInstalling(false)
    }
  }

  const review = (plan?.review ?? []).filter((r) => !resolved.has(r.mediaId))

  return (
    <QuietWorkspace
      title="Upgrade games"
      description="Real box art (Japanese editions first), platforms, Japanese titles and, where Bangumi has it, the voice cast shared with your anime and visual novels."
    >
      {catalog && !catalog.installed ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-300">
            The games catalog is a one-time ~60 MB download. Install it to upgrade your games.
          </p>
          <button className="btn-primary" disabled={installing} onClick={() => void install()}>
            {installing ? 'Downloading…' : 'Install catalog'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {running && status ? (
            <div className="space-y-2" aria-live="polite">
              <p className="text-sm text-gray-300">
                {status.done} of {status.total}
                {status.message ? `: ${status.message}` : ''}
              </p>
              <div className="h-1.5 overflow-hidden rounded bg-base-700" aria-hidden="true">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${status.total ? Math.round((status.done / status.total) * 100) : 0}%` }}
                />
              </div>
              <button
                className="btn-ghost text-xs"
                onClick={async () => {
                  await api.gameUpgrade.cancel()
                  await qc.invalidateQueries({ queryKey: qk.gameUpgrade.status })
                }}
              >
                Stop
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button className="btn" disabled={checking} onClick={() => void check()}>
                {checking ? 'Checking…' : plan ? 'Check again' : 'Check my games'}
              </button>
              {plan && plan.toUpgrade > 0 && (
                <button className="btn-primary" onClick={() => void start()}>
                  Upgrade {plan.toUpgrade} game{plan.toUpgrade === 1 ? '' : 's'}
                </button>
              )}
            </div>
          )}

          {plan && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm sm:grid-cols-3">
              <Stat label="Games" value={plan.total} />
              <Stat label="Already linked" value={plan.linked} />
              <Stat label="Will link automatically" value={plan.autoLinks} />
              <Stat label="Need your pick" value={review.length} />
              <Stat label="Not in the catalog" value={plan.unmatched} />
              <Stat label="To upgrade now" value={plan.toUpgrade} />
            </dl>
          )}

          {status && status.failures.length > 0 && !running && (
            <details className="text-sm">
              <summary className="cursor-pointer text-gray-300">{status.failures.length} failed</summary>
              <ul className="mt-2 space-y-1 text-xs text-gray-400">
                {status.failures.map((f) => (
                  <li key={f.id}>
                    {f.title}: {f.error}
                  </li>
                ))}
              </ul>
            </details>
          )}

          {review.length > 0 && (
            <ReviewList
              items={review}
              onResolved={(id) => setResolved((prev) => new Set(prev).add(id))}
            />
          )}
        </div>
      )}
    </QuietWorkspace>
  )
}

function Stat({ label, value }: { label: string; value: number }): React.JSX.Element {
  return (
    <div className="flex justify-between gap-3 border-b border-base-700 py-1">
      <dt className="text-gray-400">{label}</dt>
      <dd className="tabular-nums text-gray-200">{value}</dd>
    </div>
  )
}

function ReviewList({
  items,
  onResolved
}: {
  items: GameUpgradeReview[]
  onResolved: (mediaId: number) => void
}): React.JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState<number | null>(null)
  const { visible, sentinelRef } = useIncrementalList(items, 24, items.length)

  async function act(mediaId: number, action: () => Promise<unknown>): Promise<void> {
    setBusy(mediaId)
    try {
      await action()
      onResolved(mediaId)
      await qc.invalidateQueries({ queryKey: qk.media.all })
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(null)
    }
  }

  return (
    <section aria-labelledby="games-upgrade-review">
      <h3 id="games-upgrade-review" className="label">
        Which game is it?
      </h3>
      <ul className="space-y-4">
        {visible.map((r) => (
          <li key={r.mediaId} className="border-t border-base-700 pt-3">
            <p className="text-sm font-medium text-gray-200">
              {r.title}
              {r.year ? <span className="text-gray-400"> ({r.year})</span> : null}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {r.candidates.map((c) => (
                <button
                  key={c.workId}
                  type="button"
                  disabled={busy === r.mediaId}
                  className="flex w-56 items-center gap-2 rounded-md border border-base-700 p-2 text-left hover:bg-base-700/40 disabled:opacity-50"
                  onClick={() => void act(r.mediaId, () => api.gameLinks.setWork(r.mediaId, c.workId))}
                >
                  {c.coverUrl ? (
                    <img src={c.coverUrl} alt="" loading="lazy" className="h-14 w-10 shrink-0 rounded object-cover" />
                  ) : (
                    <div className="h-14 w-10 shrink-0 rounded bg-base-700" />
                  )}
                  <span className="min-w-0 text-xs">
                    <span className="block truncate text-gray-200">{c.title}</span>
                    <span className="block truncate text-gray-400">
                      {[c.year, c.platforms.slice(0, 2).join(' · ')].filter(Boolean).join(' · ')}
                    </span>
                  </span>
                </button>
              ))}
              <button
                type="button"
                className="btn-ghost text-xs"
                disabled={busy === r.mediaId}
                onClick={() => void act(r.mediaId, () => api.gameLinks.unlinkWork(r.mediaId))}
              >
                None of these
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div ref={sentinelRef} />
    </section>
  )
}
