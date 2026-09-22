import type { AchievementProvider, AchievementRarity, AchievementRow } from '@shared/types'
import { mediaUrl } from '@shared/mediaUrl'
import { trophyDisplayDecision } from '../lib/achievementDisplay'

const RARITY_LABEL: Record<AchievementRarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'ultra-rare': 'Ultra rare'
}

const RARITY_CLASS: Record<AchievementRarity, string> = {
  common: 'text-gray-400',
  uncommon: 'text-gray-300',
  rare: 'text-gray-200',
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
  provider,
  busy,
  onToggle
}: {
  achievement: AchievementRow
  provider: AchievementProvider
  busy: boolean
  onToggle: (unlocked: boolean) => void
}) {
  const a = achievement
  const display = trophyDisplayDecision(a)
  const meta: string[] = [providerLabel(provider)]
  if (a.globalPct != null) meta.push(`${a.globalPct.toFixed(1)}% rarity`)
  else if (a.rarity) meta.push(RARITY_LABEL[a.rarity])
  if (a.points != null) meta.push(`${a.points} points`)
  if (display.unlocked && a.unlockedAt) meta.push(`Unlocked ${formatAchievementDate(a.unlockedAt)}`)

  return (
    <li
      className={`grid min-w-0 grid-cols-[64px_minmax(0,1fr)] items-center gap-4 border-t px-3 py-4 first:border-t-0 sm:grid-cols-[64px_minmax(0,1fr)_auto] sm:px-5 ${
        display.unlocked ? 'border-base-700 bg-base-800/45' : 'border-base-700/70'
      }`}
    >
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
        <div className="flex min-w-0 items-center gap-2">
          <p className={`truncate text-sm font-semibold ${display.unlocked ? 'text-white' : 'text-gray-300'}`}>
            {a.name}
          </p>
          <span className="chip shrink-0">{display.unlocked ? 'Earned' : 'Locked'}</span>
        </div>
        {display.description && (
          <p
            className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
              display.protectsHiddenDescription ? 'italic text-gray-500' : 'text-gray-400'
            }`}
            title={display.description}
          >
            {display.description}
          </p>
        )}
        <p className={`mt-2 truncate text-[11px] ${a.rarity ? RARITY_CLASS[a.rarity] : 'text-gray-400'}`}>
          {meta.join(' / ')}
        </p>
      </div>
      <button
        className="btn-ghost col-span-2 shrink-0 justify-self-end text-xs sm:col-span-1"
        disabled={busy}
        onClick={() => onToggle(!display.unlocked)}
      >
        {display.unlocked ? 'Mark locked' : 'Mark earned'}
      </button>
    </li>
  )
}
