import { Link } from 'react-router-dom'
import { formatFootballScore } from '@shared/football'
import type { FootballBracketRound, FootballBracketTie } from '@shared/footballInsights'
import { FootballTeamMark } from './FootballCommon'

// Every column shares the first round's height, so each tie sits level with its two feeders.
const SLOT_HEIGHT = 112

function gameLabel(tie: FootballBracketTie, index: number): string {
  if (tie.matches.length === 1) return 'Match'
  const alternates = tie.matches.every((match, i) => i === 0 || match.home.id !== tie.matches[i - 1].home.id)
  return alternates ? `Leg ${index + 1}` : index === 0 ? 'Match' : 'Replay'
}

function TieCard({ tie, final }: { tie: FootballBracketTie; final: boolean }) {
  return (
    <div className={`w-60 rounded-md border bg-surface-panel ${final ? 'border-signal-caution/60' : 'border-line-subtle'}`}>
      {tie.teams.map((team, index) => {
        const won = tie.winnerId === team.id
        const lost = tie.winnerId != null && !won
        return (
          <div key={team.id} className={`flex items-center gap-2 px-2.5 py-1.5 ${index ? 'border-t border-line-subtle' : ''}`}>
            <FootballTeamMark team={team} size="xs" />
            <Link
              to={`/football/team/${team.id}`}
              className={`min-w-0 flex-1 truncate text-sm hover:text-signal-link ${won ? 'font-semibold text-ink' : lost ? 'text-ink-muted' : 'text-ink-secondary'}`}
            >
              {team.name}
            </Link>
            {tie.penalties && <span className="text-[11px] tabular-nums text-ink-muted">({tie.penalties[index]})</span>}
            <span className={`w-5 text-right text-sm tabular-nums ${won ? 'font-semibold text-ink' : 'text-ink-muted'}`}>{tie.goals?.[index] ?? '-'}</span>
          </div>
        )
      })}
      <div className="flex flex-wrap gap-x-3 border-t border-line-subtle px-2.5 py-1 text-[11px] text-ink-muted">
        {tie.matches.map((match, index) => (
          <Link key={match.id} to={`/football/match/${match.id}`} className="tabular-nums hover:text-signal-link">
            {gameLabel(tie, index)} {formatFootballScore(match)}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function FootballBracket({ rounds }: { rounds: FootballBracketRound[] }) {
  const height = rounds[0].ties.length * SLOT_HEIGHT
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max gap-6">
        {rounds.map((round, roundIndex) => (
          <section key={round.label} aria-label={round.label}>
            <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{round.label}</h3>
            <ol className="flex flex-col justify-around" style={{ height }}>
              {round.ties.map((tie) => (
                <li key={tie.matches[0].id}>
                  <TieCard tie={tie} final={roundIndex === rounds.length - 1} />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  )
}
