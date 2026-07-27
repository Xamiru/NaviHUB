import type { JpTierCounts, JpWordTier } from '@shared/types'

// Shared comprehension readouts. Tier colours are content data (like the stats
// page's TYPE_COLORS), so they stay literal rather than theme tokens.

export const TIER_LABEL: Record<JpWordTier, string> = {
  known: 'Known',
  learning: 'Learning',
  unstarted: 'In a deck, not started',
  unknown: 'Unknown'
}

export const TIER_TEXT: Record<JpWordTier, string> = {
  known: 'text-green-300',
  learning: 'text-amber-300',
  unstarted: 'text-sky-300',
  unknown: 'text-gray-300'
}

const TIER_BG: Record<JpWordTier, string> = {
  known: 'bg-green-400',
  learning: 'bg-amber-400',
  unstarted: 'bg-sky-400',
  unknown: 'bg-base-700'
}

const ORDER: JpWordTier[] = ['known', 'learning', 'unstarted', 'unknown']

export function tierTotals(tiers: Record<JpWordTier, JpTierCounts>): {
  tokens: number
  unique: number
} {
  return ORDER.reduce(
    (acc, t) => ({
      tokens: acc.tokens + tiers[t].tokenCount,
      unique: acc.unique + tiers[t].uniqueCount
    }),
    { tokens: 0, unique: 0 }
  )
}

// The headline number: what share of the words you'd actually READ are known.
// Token-weighted, because common words dominate running text.
export function knownShare(tiers: Record<JpWordTier, JpTierCounts>): number {
  const { tokens } = tierTotals(tiers)
  return tokens > 0 ? tiers.known.tokenCount / tokens : 0
}

export function learningShare(tiers: Record<JpWordTier, JpTierCounts>): number {
  const { tokens } = tierTotals(tiers)
  return tokens > 0 ? tiers.learning.tokenCount / tokens : 0
}

export function uniqueKnownShare(tiers: Record<JpWordTier, JpTierCounts>): number {
  const { unique } = tierTotals(tiers)
  return unique > 0 ? tiers.known.uniqueCount / unique : 0
}

export const pct = (x: number): string => `${Math.round(x * 100)}%`

export default function CoverageBar({
  tiers,
  weight = 'tokens',
  className = ''
}: {
  tiers: Record<JpWordTier, JpTierCounts>
  weight?: 'tokens' | 'unique'
  className?: string
}) {
  const totals = tierTotals(tiers)
  const total = weight === 'tokens' ? totals.tokens : totals.unique
  if (total === 0) return null
  return (
    <div className={`flex h-1.5 w-full overflow-hidden rounded-full bg-base-700 ${className}`}>
      {ORDER.map((t) => {
        const n = weight === 'tokens' ? tiers[t].tokenCount : tiers[t].uniqueCount
        if (n === 0) return null
        return (
          <div
            key={t}
            className={TIER_BG[t]}
            style={{ width: `${(n / total) * 100}%` }}
            title={`${TIER_LABEL[t]}: ${n.toLocaleString()}`}
          />
        )
      })}
    </div>
  )
}
