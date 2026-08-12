import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import StarRating from './StarRating'
import AddToListMenu from '../AddToListMenu'
import type { WrestlingMatch, WrestlingParticipant } from '@shared/types'

// One row of a card. Participants are already structured rows, so every name is
// a Link without any text resolution — this is the "clickable like Wikipedia"
// part the whole section exists for.

function fmtDuration(seconds: number | null): string | null {
  if (seconds == null) return null
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

// Groups a side's participants by team so "The Steiner Brothers (Rick & Scott)"
// reads the way the card does.
function Side({ people }: { people: WrestlingParticipant[] }): JSX.Element {
  const teams: { name: string | null; members: WrestlingParticipant[] }[] = []
  for (const p of people) {
    const last = teams[teams.length - 1]
    if (last && last.name === (p.teamName ?? null)) last.members.push(p)
    else teams.push({ name: p.teamName ?? null, members: [p] })
  }
  return (
    <>
      {teams.map((team, ti) => (
        <Fragment key={ti}>
          {ti > 0 && <span className="text-gray-600"> &amp; </span>}
          {team.name && <span className="text-gray-400">{team.name} (</span>}
          {team.members.map((p, i) => (
            <Fragment key={p.wrestlerId}>
              {i > 0 && <span className="text-gray-600"> &amp; </span>}
              <Link
                to={`/wrestling/wrestler/${p.wrestlerId}`}
                className="hover:text-accent hover:underline"
              >
                {p.name}
              </Link>
              {p.isChampion && (
                <span className="ml-0.5 text-xs text-gray-500" title="Champion entering the match">
                  (c)
                </span>
              )}
            </Fragment>
          ))}
          {team.name && <span className="text-gray-400">)</span>}
        </Fragment>
      ))}
    </>
  )
}

export default function WrestlingMatchRow({
  match,
  highlighted = false
}: {
  match: WrestlingMatch
  highlighted?: boolean
}): JSX.Element {
  const qc = useQueryClient()
  const sides = [...new Set(match.participants.map((p) => p.side))].sort()
  const duration = fmtDuration(match.durationSeconds)

  // Ratings and hearts are denormalized into every row-returning query, so
  // both invalidate the broad prefix (the music posture).
  async function rate(stars: number | null): Promise<void> {
    await api.wrestling.rateMatch(match.id, stars)
    await qc.invalidateQueries({ queryKey: qk.wrestling.all })
  }
  async function toggleFavorite(): Promise<void> {
    await api.wrestling.setFavorite('match', match.id, !match.favorite)
    await qc.invalidateQueries({ queryKey: qk.wrestling.all })
  }

  return (
    <div
      // Arrived here from a list entry for this match — mark it so the row is
      // findable on a 12-match card.
      ref={(el) => highlighted && el?.scrollIntoView({ block: 'center' })}
      className={`border-b border-base-700 py-3 last:border-0 ${
        highlighted ? '-mx-2 rounded bg-accent/10 px-2' : ''
      }`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0 text-sm">
          {sides.length > 0 ? (
            sides.map((side, i) => (
              <Fragment key={side}>
                {i > 0 && <span className="mx-1.5 text-gray-600">vs.</span>}
                <span className={side === 0 && match.outcome === 'decision' ? 'text-white' : ''}>
                  <Side people={match.participants.filter((p) => p.side === side)} />
                </span>
              </Fragment>
            ))
          ) : (
            // No linked participants (an unlinked card, or a battle royal whose
            // entrants we deliberately don't store) — the prose still reads.
            <span className="text-gray-300">{match.title}</span>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 text-xs text-gray-500">
          {duration}
          <StarRating value={match.rating} onChange={rate} />
          <AddToListMenu kind="wrestlingMatch" entityId={match.id} label="+" />
          <button
            onClick={toggleFavorite}
            aria-label={match.favorite ? 'Remove from favorites' : 'Add to favorites'}
            title={match.favorite ? 'Remove from favorites' : 'Add to favorites'}
            className={match.favorite ? 'text-accent' : 'text-gray-600 hover:text-gray-400'}
          >
            ♥
          </button>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
        {match.cardSlot && <span className="chip">{match.cardSlot === 'pre' ? 'Pre-show' : 'Dark'}</span>}
        {match.stipulation && <span>{match.stipulation}</span>}
        {match.championship && <span className="text-gray-400">for the {match.championship}</span>}
        {match.outcome === 'draw' && <span className="text-gray-400">Draw</span>}
        {match.outcome === 'nocontest' && <span className="text-gray-400">No contest</span>}
      </div>
    </div>
  )
}
