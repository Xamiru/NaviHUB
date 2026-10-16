import { useState } from 'react'
import type { AchievementProvider, AchievementRarity, AchievementRow } from '@shared/types'
import { mediaUrl } from '@shared/mediaUrl'
import { Field } from './Field'
import { formatProgress, rarityText, trophyDisplayDecision } from '../lib/achievementDisplay'

// Semantic roles, so every theme keeps the four tiers apart.
export const RARITY_CLASS: Record<AchievementRarity, string> = {
  common: 'text-gray-400',
  uncommon: 'text-signal-affirmative',
  rare: 'text-signal-link',
  'ultra-rare': 'text-accent'
}

export function formatAchievementDate(utc: string): string {
  const d = new Date(utc.replace(' ', 'T') + (utc.endsWith('Z') ? '' : 'Z'))
  if (Number.isNaN(d.getTime())) return utc
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

export function providerLabel(provider: AchievementProvider): string {
  return provider === 'steam' ? 'Steam' : 'RetroAchievements'
}

export function TrophyProgress({
  earned,
  total,
  points,
  provider,
  compact = false
}: {
  earned: number
  total: number
  points?: number | null
  provider?: AchievementProvider
  compact?: boolean
}) {
  const pct = total ? Math.round((earned / total) * 100) : 0
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className={compact ? 'text-sm' : 'text-lg'}>
          <span className="font-semibold text-white">{earned}</span>
          <span className="text-gray-400"> / {total} earned</span>
        </p>
        <p className={`${compact ? 'text-xs' : 'text-sm'} shrink-0 text-gray-400`}>
          {pct}%
          {points != null ? ` / ${points} points` : ''}
          {provider ? ` / ${providerLabel(provider)}` : ''}
        </p>
      </div>
      <div className={`${compact ? 'mt-2 h-1' : 'mt-3 h-1.5'} overflow-hidden rounded-full bg-base-700`}>
        <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function TrophyRow({
  achievement,
  busy,
  onToggle,
  selection
}: {
  achievement: AchievementRow
  busy: boolean
  onToggle: (unlocked: boolean) => void
  // Present on every row while picking several to mark earned at once; earned
  // rows pass `disabled` and get an empty slot so the columns stay aligned.
  selection?: { selected: boolean; disabled?: boolean; onChange: (selected: boolean) => void }
}) {
  const a = achievement
  const display = trophyDisplayDecision(a)
  const [revealed, setRevealed] = useState(false)
  const meta: string[] = []
  const rarity = rarityText(a.globalPct, a.rarity)
  if (rarity) meta.push(rarity)
  if (a.points != null) meta.push(`${a.points} points`)
  if (display.unlocked && a.unlockedAt) meta.push(`Unlocked ${formatAchievementDate(a.unlockedAt)}`)
  if (display.unlocked && a.unlockSource === 'manual') meta.push('marked by hand')
  const progress = !display.unlocked && a.progress ? formatProgress(a.progress) : null

  return (
    <li
      className={`group grid min-w-0 items-center gap-4 border-t px-3 py-4 first:border-t-0 sm:px-5 ${
        selection
          ? 'grid-cols-[auto_64px_minmax(0,1fr)] sm:grid-cols-[auto_64px_minmax(0,1fr)_auto]'
          : 'grid-cols-[64px_minmax(0,1fr)] sm:grid-cols-[64px_minmax(0,1fr)_auto]'
      } ${display.unlocked ? 'border-base-700 bg-base-800/45' : 'border-base-700/70'}`}
    >
      {selection?.disabled && <span className="h-4 w-4" aria-hidden="true" />}
      {selection && !selection.disabled && (
        <Field label={`Select ${a.name}`} hiddenLabel className="flex">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={selection.selected}
            onChange={(event) => selection.onChange(event.target.checked)}
          />
        </Field>
      )}
      {display.iconPath ? (
        <img
          src={mediaUrl(display.iconPath) ?? undefined}
          alt=""
          className={`h-16 w-16 rounded-lg object-cover ${
            display.dimLockedArt ? 'grayscale opacity-70' : ''
          }`}
        />
      ) : (
        <span className="h-16 w-16 rounded-lg bg-base-700" />
      )}
      <div className="min-w-0">
        <p className={`truncate text-sm font-semibold ${display.unlocked ? 'text-white' : 'text-gray-300'}`}>
          {a.name}
          <span className="sr-only">{display.unlocked ? ', earned' : ', locked'}</span>
        </p>
        {display.hiddenDescription != null && !revealed ? (
          <button
            type="button"
            className="mt-1 text-left text-xs italic text-gray-500 hover:text-gray-300"
            onClick={() => setRevealed(true)}
          >
            Hidden achievement. Show description
          </button>
        ) : (
          display.description && (
            <p
              className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                display.protectsHiddenDescription && !revealed ? 'italic text-gray-500' : 'text-gray-400'
              }`}
              title={revealed ? (display.hiddenDescription ?? undefined) : display.description}
            >
              {revealed && display.hiddenDescription != null ? display.hiddenDescription : display.description}
            </p>
          )
        )}
        {progress && (
          <div className="mt-2 flex max-w-xs items-center gap-2">
            <div
              className="h-1 flex-1 overflow-hidden rounded-full bg-base-700"
              role="progressbar"
              aria-label={`${a.name} progress`}
              aria-valuemin={0}
              aria-valuemax={a.progress?.max}
              aria-valuenow={a.progress?.current}
              aria-valuetext={progress.label}
            >
              <div className="h-full bg-accent/70" style={{ width: `${progress.pct}%` }} />
            </div>
            <span className="shrink-0 text-xs text-gray-400">{progress.label}</span>
          </div>
        )}
        {meta.length > 0 && (
          <p className={`mt-2 truncate text-xs ${a.rarity ? RARITY_CLASS[a.rarity] : 'text-gray-400'}`}>
            {meta.join(' / ')}
          </p>
        )}
      </div>
      {/* The manual toggle is the floor for untracked games, not the row's
          main action: it shows on hover or keyboard focus, and always at
          narrow widths where there is no hover. */}
      <button
        className={`btn-ghost shrink-0 justify-self-end text-xs sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 ${
          selection ? 'col-span-3 sm:col-span-1' : 'col-span-2 sm:col-span-1'
        }`}
        disabled={busy}
        onClick={() => onToggle(!display.unlocked)}
      >
        {display.unlocked ? 'Mark locked' : 'Mark earned'}
      </button>
    </li>
  )
}
