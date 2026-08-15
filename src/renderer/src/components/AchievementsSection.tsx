import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { mediaUrl } from '@shared/mediaUrl'
import { confirmDialog } from '../lib/confirm'
import { toast, toastError } from '../lib/toast'
import AchievementSetupDialog, { reportSetup } from './AchievementSetupDialog'
import GoldbergWizardDialog from './GoldbergWizardDialog'
import EmptyState from './EmptyState'
import type { AchievementProvider, AchievementRarity, AchievementRow, MediaDetail } from '@shared/types'

// The Achievements tab on a game/VN detail page (cfg.hasAchievements). Three
// states: not eligible (no exe was ever linked), eligible but untracked (pick a
// provider), tracked (the list). Manual toggling is always available, which is
// the floor for games nothing can track automatically.

const RARITY_LABEL: Record<AchievementRarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'ultra-rare': 'Ultra rare'
}

// Reserved for decorative marks; rarity is a real distinction so it gets a
// readable tone, brightest for the rarest.
const RARITY_CLASS: Record<AchievementRarity, string> = {
  common: 'text-gray-500',
  uncommon: 'text-gray-400',
  rare: 'text-gray-300',
  'ultra-rare': 'text-accent'
}

function fmtUnlockDate(utc: string): string {
  const d = new Date(utc.replace(' ', 'T') + (utc.endsWith('Z') ? '' : 'Z'))
  if (Number.isNaN(d.getTime())) return utc
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function AchievementsSection({ m }: { m: MediaDetail }) {
  const qc = useQueryClient()
  const [setupProvider, setSetupProvider] = useState<AchievementProvider | null>(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: qk.achievements.list(m.id),
    queryFn: () => api.achievements.list(m.id)
  })

  async function refresh(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.achievements.all })
  }

  async function act(fn: () => Promise<void>): Promise<void> {
    setBusy(true)
    try {
      await fn()
      await refresh()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  // isError first: a failed query leaves data undefined with isLoading false,
  // so `isLoading || !data` on its own renders "Loading…" for ever.
  if (isError)
    return <p className="text-sm text-gray-500">Could not load achievements — try again in a moment.</p>
  if (isLoading || !data) return <p className="text-sm text-gray-500">Loading…</p>

  if (!data.eligible) {
    return (
      <EmptyState
        title="No achievements yet"
        body={
          <>
            Achievements are tracked for games you play through NaviHUB. Link this title’s
            executable on the Playtime tab first, then come back.
          </>
        }
      />
    )
  }

  if (!data.tracking) {
    return (
      <>
        <div className="grid gap-4 sm:grid-cols-2">
          <SetupCard
            title="Steam achievements"
            body="For PC games. The achievement list comes from Steam; unlocks are read from whatever Steam emulator the game uses, and pop up as you earn them."
            onClick={() => setSetupProvider('steam')}
          />
          <SetupCard
            title="RetroAchievements"
            body="For emulated games. Play through an RA-enabled emulator signed into your account and your unlocks sync here."
            onClick={() => setSetupProvider('ra')}
          />
        </div>
        {setupProvider && (
          <AchievementSetupDialog
            mediaId={m.id}
            provider={setupProvider}
            onClose={() => setSetupProvider(null)}
            onDone={(result) => {
              setSetupProvider(null)
              reportSetup(result)
              void refresh()
            }}
          />
        )}
      </>
    )
  }

  const { summary, achievements, tracking } = data
  const pct = summary.total ? Math.round((summary.unlocked / summary.total) * 100) : 0

  return (
    <>
      {/* Completion header */}
      <div className="card p-4 mb-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-lg">
            <span className="font-medium">{summary.unlocked}</span>
            <span className="text-gray-500"> of {summary.total} unlocked</span>
          </p>
          <p className="text-sm text-gray-500">
            {pct}%{summary.points != null ? ` · ${summary.points} points` : ''} ·{' '}
            {tracking.provider === 'steam' ? 'Steam' : 'RetroAchievements'}
          </p>
        </div>
        <div className="mt-3 h-2 rounded bg-base-700 overflow-hidden">
          <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button className="btn-ghost text-xs" disabled={busy} onClick={() => act(async () => {
          const res = await api.achievements.refresh(m.id)
          reportSetup(res)
        })}>
          Re-fetch list
        </button>
        {tracking.provider === 'steam' && (
          <>
            <button className="btn-ghost text-xs" disabled={busy} onClick={() => act(async () => {
              const res = await api.achievements.importEmu(m.id)
              toast(
                res.found === 0
                  ? 'No emulator save files found for this game — use "Set up Goldberg" if its crack writes none.'
                  : `Read ${res.found} file${res.found === 1 ? '' : 's'} (${res.emus.join(', ')}) — ${res.imported} new unlock${res.imported === 1 ? '' : 's'}.`,
                res.found === 0 ? 'error' : 'success'
              )
            })}>
              Import from emulator files
            </button>
            <button className="btn-ghost text-xs" disabled={busy} onClick={() => setWizardOpen(true)}>
              Set up Goldberg
            </button>
          </>
        )}
        <button className="btn-ghost text-xs" disabled={busy} onClick={() => act(async () => {
          const ok = await confirmDialog(
            'Stop tracking achievements for this title? The list and your recorded unlocks for it are deleted.',
            { confirmLabel: 'Stop tracking', danger: true }
          )
          if (ok) await api.achievements.disable(m.id)
        })}>
          Stop tracking
        </button>
      </div>

      {achievements.length === 0 ? (
        <EmptyState title="No achievements in this set" />
      ) : (
        <ul className="space-y-1">
          {achievements.map((a) => (
            <AchievementItem
              key={a.id}
              a={a}
              busy={busy}
              onToggle={(unlocked) =>
                act(async () => {
                  if (!unlocked) {
                    const ok = await confirmDialog(`Mark “${a.name}” as locked again?`, {
                      confirmLabel: 'Mark locked'
                    })
                    if (!ok) return
                  }
                  await api.achievements.toggleManual(a.id, unlocked)
                })
              }
            />
          ))}
        </ul>
      )}

      {wizardOpen && <GoldbergWizardDialog mediaId={m.id} onClose={() => setWizardOpen(false)} />}
    </>
  )
}

function SetupCard({ title, body, onClick }: { title: string; body: string; onClick: () => void }) {
  return (
    <div className="card p-5 flex flex-col">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 mb-4 flex-1 text-sm text-gray-500">{body}</p>
      <button className="btn self-start" onClick={onClick}>
        Set up
      </button>
    </div>
  )
}

function AchievementItem({
  a,
  busy,
  onToggle
}: {
  a: AchievementRow
  busy: boolean
  onToggle: (unlocked: boolean) => void
}) {
  const unlocked = a.unlockedAt != null
  const icon = unlocked ? a.iconPath : (a.iconGrayPath ?? a.iconPath)
  return (
    <li className="flex items-center gap-3 rounded border border-base-700/40 px-3 py-2">
      {icon ? (
        <img
          src={mediaUrl(icon) ?? undefined}
          alt=""
          className={`h-12 w-12 rounded object-cover shrink-0 ${unlocked ? '' : 'opacity-40 grayscale'}`}
        />
      ) : (
        <span className="h-12 w-12 rounded bg-base-700 shrink-0" />
      )}
      <div className="min-w-0 flex-1">
        <p className={`truncate ${unlocked ? 'text-gray-100' : 'text-gray-400'}`}>
          {a.name}
          {a.hidden && !unlocked ? <span className="ml-2 text-xs text-gray-600">hidden</span> : null}
        </p>
        <p className="truncate text-sm text-gray-500">{a.description ?? ''}</p>
      </div>
      <div className="shrink-0 text-right text-xs">
        {a.rarity && (
          <p className={RARITY_CLASS[a.rarity]}>
            ★ {RARITY_LABEL[a.rarity]}
            {a.globalPct != null ? ` · ${a.globalPct.toFixed(1)}%` : ''}
          </p>
        )}
        {a.points != null && <p className="text-gray-500">{a.points} points</p>}
        {unlocked && <p className="text-gray-500">{fmtUnlockDate(a.unlockedAt as string)}</p>}
      </div>
      <button
        className="btn-ghost text-xs shrink-0"
        disabled={busy}
        onClick={() => onToggle(!unlocked)}
        title={unlocked ? 'Mark as locked' : 'Mark as unlocked'}
        aria-label={unlocked ? `Mark ${a.name} as locked` : `Mark ${a.name} as unlocked`}
      >
        {unlocked ? '✓' : '○'}
      </button>
    </li>
  )
}
