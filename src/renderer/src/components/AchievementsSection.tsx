import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { AchievementProvider, MediaDetail } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { toast, toastError } from '../lib/toast'
import { usePersistedState } from '../lib/navState'
import { localInputDate } from '../lib/hobbyForms'
import {
  selectTrophies,
  summarizeTrophies,
  type TrophyFilter,
  type TrophySort
} from '../lib/achievementDisplay'
import AchievementSetupDialog, { reportSetup } from './AchievementSetupDialog'
import GoldbergWizardDialog from './GoldbergWizardDialog'
import AchievementNameDialog from './AchievementNameDialog'
import { Field } from './Field'
import EmptyState from './EmptyState'
import ActionMenu from './ActionMenu'
import { TrophyProgress, TrophyRow, providerLabel } from './TrophyDisplay'

const FILTERS: { key: TrophyFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'earned', label: 'Earned' },
  { key: 'locked', label: 'Locked' },
  { key: 'ultra-rare', label: 'Ultra rare' }
]

// Local noon of the picked day, so no timezone pushes it onto a neighbour.
function dateInputToMs(value: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!m) return null
  const ms = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), 12).getTime()
  return Number.isFinite(ms) ? ms : null
}

export default function AchievementsSection({ m }: { m: MediaDetail }) {
  const qc = useQueryClient()
  const [setupProvider, setSetupProvider] = useState<AchievementProvider | null>(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [filter, setFilter] = usePersistedState<TrophyFilter>('trophyFilter', 'all')
  const [sort, setSort] = usePersistedState<TrophySort>('trophySort', 'default')
  const [nameDialogOpen, setNameDialogOpen] = useState(false)
  // Picking several locked achievements to mark earned with one date.
  // Selection shows only locked achievements as a VIEW, never by rewriting
  // the remembered filter: that is history-scoped, so Back would otherwise
  // return to "Locked" with selection already off.
  const [selecting, setSelecting] = useState(false)
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<number>>(new Set())
  const [bulkDate, setBulkDate] = useState(localInputDate)

  const query = useQuery({
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

  if (query.isError) {
    return (
      <div className="card max-w-xl border-red-500/30 p-5">
        <p className="font-medium">This trophy set could not be loaded</p>
        <p className="mt-2 text-sm text-gray-400">The stored set and unlocks are unchanged.</p>
        <button className="btn-ghost mt-4" onClick={() => void query.refetch()}>
          Try again
        </button>
      </div>
    )
  }
  if (query.isLoading || !query.data) {
    return (
      <div className="card p-5" aria-label="Loading achievements">
        <div className="h-3 w-48 motion-safe:animate-pulse rounded bg-base-600" />
        <div className="mt-4 h-16 motion-safe:animate-pulse rounded bg-base-700" />
        <div className="mt-3 h-16 motion-safe:animate-pulse rounded bg-base-700" />
      </div>
    )
  }

  const data = query.data
  if (!data.eligible) {
    return (
      <EmptyState
        title="No achievements yet"
        body="Achievements are tracked for games you play through NaviHUB. Link this title's executable on the Playtime tab first, then return here."
      />
    )
  }

  if (!data.tracking) {
    return (
      <>
        <div className="grid gap-4 sm:grid-cols-2">
          <SetupCard
            title="Steam achievements"
            body="For PC games. The provider supplies the set, rarity and artwork; compatible emulator files can supply unlocks."
            onClick={() => setSetupProvider('steam')}
          />
          <SetupCard
            title="RetroAchievements"
            body="For emulated games. Your RetroAchievements account supplies the set, points, rarity and unlock history."
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
  const counts = summarizeTrophies(achievements)
  const shownFilter: TrophyFilter = selecting ? 'locked' : filter
  const selected = selectTrophies(achievements, shownFilter, sort)
  const countFor = (key: TrophyFilter): number => {
    if (key === 'earned') return counts.earned
    if (key === 'locked') return counts.locked
    if (key === 'ultra-rare') return counts.ultraRare
    return counts.total
  }

  function stopSelecting(): void {
    setSelecting(false)
    setSelectedIds(new Set())
  }

  function toggleSelected(id: number, on: boolean): void {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  }

  async function markSelectedEarned(): Promise<void> {
    const ids = [...selectedIds]
    if (!ids.length) return
    const at = dateInputToMs(bulkDate)
    await act(async () => {
      const changed = await api.achievements.markEarnedMany(ids, at)
      toast(`Marked ${changed} achievement${changed === 1 ? '' : 's'} earned by hand.`, 'success')
      stopSelecting()
    })
  }

  async function disableTracking(): Promise<void> {
    const ok = await confirmDialog(
      'Stop tracking achievements for this title? The set and its recorded unlocks will be deleted.',
      { confirmLabel: 'Stop tracking', danger: true }
    )
    if (ok) await api.achievements.disable(m.id)
  }

  return (
    <>
      <div className="mb-6 grid gap-5 border-b border-base-700 pb-6 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div className="card max-w-3xl p-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-white">{m.title} trophy set</h2>
              <p className="mt-1 text-xs text-gray-400">
                {providerLabel(tracking.provider)} / provider rarity and artwork
              </p>
            </div>
            {counts.ultraRare > 0 && <span className="chip">{counts.ultraRare} ultra rare</span>}
          </div>
          <TrophyProgress
            earned={summary.unlocked}
            total={summary.total}
            points={summary.points}
            provider={tracking.provider}
          />
        </div>
        <div className="flex flex-wrap items-end gap-2 lg:justify-end">
          <button
            className="btn-ghost"
            disabled={busy}
            onClick={() =>
              act(async () => {
                const result = await api.achievements.refresh(m.id)
                reportSetup(result)
              })
            }
          >
            Re-fetch list
          </button>
          <ActionMenu
            items={[
              ...(tracking.provider === 'steam'
                ? [
                    {
                      label: 'Import from emulator files',
                      disabled: busy,
                      onSelect: () =>
                        act(async () => {
                          const result = await api.achievements.importEmu(m.id)
                          const removed = result.removed
                            ? ` ${result.removed} withdrawn because the files now mark ${result.removed === 1 ? 'it' : 'them'} not earned.`
                            : ''
                          toast(
                            result.found === 0
                              ? 'No compatible emulator save files were found for this game.'
                              : `Read ${result.found} file${result.found === 1 ? '' : 's'} from ${result.emus.join(', ')}. ${result.imported} new unlock${result.imported === 1 ? '' : 's'} imported.${removed}`,
                            result.found === 0 ? 'error' : 'success'
                          )
                        })
                    },
                    {
                      label: 'Fix achievement names',
                      disabled: busy || achievements.length < 2,
                      onSelect: () => setNameDialogOpen(true)
                    },
                    {
                      label: 'Set up achievement saving',
                      disabled: busy,
                      onSelect: () => setWizardOpen(true)
                    }
                  ]
                : []),
              {
                label: 'Mark several earned',
                disabled: busy || counts.locked === 0,
                onSelect: () => {
                  setSelecting(true)
                }
              },
              {
                label: 'Stop tracking',
                danger: true,
                disabled: busy,
                onSelect: () => act(disableTracking)
              }
            ]}
          />
        </div>
      </div>

      {achievements.length === 0 ? (
        <EmptyState title="No achievements in this set" />
      ) : (
        <>
          {selecting && (
            <div className="card mb-5 flex flex-wrap items-end gap-3 p-4" role="region" aria-label="Mark several earned">
              <p className="basis-full text-sm text-gray-300">
                Tick the achievements you earned but the emulator never recorded.{' '}
                <span className="text-gray-400">{selectedIds.size} selected.</span>
              </p>
              <Field label="Earned on" description="One date for all of them; your best guess is fine.">
                <input
                  type="date"
                  className="input h-9 w-44"
                  value={bulkDate}
                  max={localInputDate()}
                  onChange={(event) => setBulkDate(event.target.value)}
                />
              </Field>
              <button
                className="btn"
                disabled={busy || selectedIds.size === 0 || dateInputToMs(bulkDate) == null}
                onClick={() => void markSelectedEarned()}
              >
                Mark {selectedIds.size || ''} earned
              </button>
              <button className="btn-ghost" disabled={busy} onClick={stopSelecting}>
                Cancel
              </button>
            </div>
          )}

          <div className="mb-5 flex flex-wrap items-center gap-2">
            {FILTERS.map((item) => (
              <button
                key={item.key}
                className={`pill ${shownFilter === item.key ? 'pill-active' : ''}`}
                aria-pressed={shownFilter === item.key}
                disabled={selecting}
                onClick={() => setFilter(item.key)}
              >
                {item.label} <span className={shownFilter === item.key ? 'opacity-75' : 'text-gray-500'}>{countFor(item.key)}</span>
              </button>
            ))}
            <label className="ml-auto flex items-center gap-2 text-xs text-gray-400">
              Sort
              <select className="input h-9 w-44" value={sort} onChange={(event) => setSort(event.target.value as TrophySort)}>
                <option value="default">Default</option>
                <option value="unlock-date">Unlock date</option>
                <option value="rarity">Rarity</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>

          {selected.length ? (
            <ul className="card overflow-hidden p-0">
              {selected.map((achievement) => (
                <TrophyRow
                  key={achievement.id}
                  achievement={achievement}
                  provider={tracking.provider}
                  busy={busy}
                  selection={
                    selecting
                      ? {
                          selected: selectedIds.has(achievement.id),
                          disabled: achievement.unlockedAt != null,
                          onChange: (on) => toggleSelected(achievement.id, on)
                        }
                      : undefined
                  }
                  onToggle={(unlocked) =>
                    act(async () => {
                      if (!unlocked) {
                        const ok = await confirmDialog(`Mark "${achievement.name}" as locked again?`, {
                          confirmLabel: 'Mark locked'
                        })
                        if (!ok) return
                      }
                      await api.achievements.toggleManual(achievement.id, unlocked)
                    })
                  }
                />
              ))}
            </ul>
          ) : (
            <EmptyState
              title={`No ${FILTERS.find((item) => item.key === shownFilter)?.label.toLowerCase()} achievements`}
              body="Choose another trophy filter to return to the full set."
              action={<button className="btn-primary" onClick={() => setFilter('all')}>Show all achievements</button>}
            />
          )}
        </>
      )}

      {wizardOpen && (
        <GoldbergWizardDialog
          mediaId={m.id}
          onClose={() => setWizardOpen(false)}
        />
      )}
      {nameDialogOpen && (
        <AchievementNameDialog
          achievements={achievements}
          onClose={() => setNameDialogOpen(false)}
          onDone={() => {
            setNameDialogOpen(false)
            void refresh()
          }}
        />
      )}
    </>
  )
}

function SetupCard({ title, body, onClick }: { title: string; body: string; onClick: () => void }) {
  return (
    <div className="card flex flex-col p-5">
      <h3 className="font-medium text-white">{title}</h3>
      <p className="mb-4 mt-2 flex-1 text-sm leading-6 text-gray-400">{body}</p>
      <button className="btn self-start" onClick={onClick}>Set up</button>
    </div>
  )
}
