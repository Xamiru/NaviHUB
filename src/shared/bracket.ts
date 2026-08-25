// Single-elimination bracket engine for tournament mode. Pure and
// index-based: the caller shuffles its entry array once, then the bracket
// only ever speaks in pool indices 0..n-1, so the whole thing is
// deterministic and testable without any entry data.
//
// Layout: the pool is padded to P = nextPowerOfTwo(n); round 0 has P/2
// matches and round r has P >> (r+1). The P - n byes (always < P/2, so
// never bye-vs-bye) occupy the first round-0 matches with an empty `b`
// slot and are resolved at creation — the user is never shown a bye, and
// every tournament takes exactly n - 1 picks.

export interface BracketMatch {
  round: number // 0-based; round 0 is the widest
  index: number // 0-based within its round
  a: number | null // pool index; null = empty slot (bye, or not yet fed)
  b: number | null
  winner: number | null
}

export interface Bracket {
  entryCount: number
  rounds: number
  // Flat, round-major: all of round 0, then round 1, … The presentation
  // order of matches is simply array order.
  matches: BracketMatch[]
}

export function nextPowerOfTwo(n: number): number {
  let p = 1
  while (p < n) p *= 2
  return p
}

// The shuffle lives in @shared/shuffle now; re-exported so the tournament page
// and tests/bracket.test.ts keep their import.
export { shuffle } from './shuffle'

// Round r match m feeds round r+1 match m >> 1, slot a if m is even.
function feed(matches: BracketMatch[], rounds: number, match: BracketMatch): void {
  if (match.round === rounds - 1 || match.winner == null) return
  const next = matches.find((m) => m.round === match.round + 1 && m.index === match.index >> 1)!
  if (match.index % 2 === 0) next.a = match.winner
  else next.b = match.winner
}

export function createBracket(entryCount: number): Bracket {
  if (entryCount < 2) throw new Error('A tournament needs at least 2 entries')
  const size = nextPowerOfTwo(entryCount)
  const rounds = Math.log2(size)
  const byes = size - entryCount

  const matches: BracketMatch[] = []
  for (let r = 0; r < rounds; r++) {
    const count = size >> (r + 1)
    for (let i = 0; i < count; i++) matches.push({ round: r, index: i, a: null, b: null, winner: null })
  }

  // Byes first (one entry, empty b), then the rest pairwise.
  for (let i = 0; i < byes; i++) matches[i].a = i
  let entry = byes
  for (let i = byes; i < size / 2; i++) {
    matches[i].a = entry++
    matches[i].b = entry++
  }
  for (let i = 0; i < byes; i++) {
    matches[i].winner = matches[i].a
    feed(matches, rounds, matches[i])
  }

  return { entryCount, rounds, matches }
}

// Immutable: returns a new bracket with the winner recorded and propagated.
export function pickWinner(br: Bracket, matchIndex: number, side: 'a' | 'b'): Bracket {
  const matches = br.matches.map((m) => ({ ...m }))
  const match = matches[matchIndex]
  if (!match) throw new Error(`No match at index ${matchIndex}`)
  if (match.winner != null) throw new Error('Match already decided')
  if (match.a == null || match.b == null) throw new Error('Match is not ready to play')
  match.winner = side === 'a' ? match.a : match.b
  feed(matches, br.rounds, match)
  return { ...br, matches }
}

// The next match to present: first in array (= round-major) order with both
// slots filled and no winner. Round-major order guarantees every real
// round-0 match plays before any round-1 match fed by two byes. Null once
// the final is decided.
export function currentMatch(br: Bracket): { match: BracketMatch; matchIndex: number } | null {
  const i = br.matches.findIndex((m) => m.a != null && m.b != null && m.winner == null)
  return i === -1 ? null : { match: br.matches[i], matchIndex: i }
}

export function championOf(br: Bracket): number | null {
  return br.matches[br.matches.length - 1].winner
}

export function runnerUpOf(br: Bracket): number | null {
  const final = br.matches[br.matches.length - 1]
  if (final.winner == null) return null
  return final.winner === final.a ? final.b : final.a
}

// Full placement order once the bracket is decided: champion, runner-up, then
// everyone else grouped by the round they were knocked out of — semifinal
// losers ahead of quarterfinal losers, and within one round in match order.
// Byes never appear (a bye is not an elimination). Works on partial brackets
// too: undecided matches simply contribute nothing.
export function placementsOf(br: Bracket): { poolIndex: number; outInRound: number | null }[] {
  const out: { poolIndex: number; outInRound: number | null }[] = []
  const champ = championOf(br)
  if (champ != null) out.push({ poolIndex: champ, outInRound: null })
  for (let r = br.rounds - 1; r >= 0; r--) {
    for (const m of br.matches) {
      if (m.round === r && m.winner != null && m.a != null && m.b != null) {
        out.push({ poolIndex: m.winner === m.a ? m.b : m.a, outInRound: r })
      }
    }
  }
  return out
}

// Placement order only — the champion-first list of pool indices.
export function standingsOf(br: Bracket): number[] {
  return placementsOf(br).map((p) => p.poolIndex)
}

export function placementRank(
  placements: ReturnType<typeof placementsOf>,
  index: number
): number {
  const row = placements[index]
  if (!row || row.outInRound == null) return 1
  return placements.findIndex((candidate) => candidate.outInRound === row.outInRound) + 1
}

export function roundLabel(competitors: number): string {
  if (competitors === 2) return 'Final'
  if (competitors === 4) return 'Semifinals'
  if (competitors === 8) return 'Quarterfinals'
  return `Round of ${competitors}`
}

export interface BracketProgress {
  round: number // current round, or the final round once done
  competitorsInRound: number
  playableInRound: number // matches with both slots filled (byes excluded)
  playedInRound: number // 1-based position of the current match among playable ones
  totalPicks: number // always entryCount - 1
  picksMade: number
}

export function bracketProgress(br: Bracket): BracketProgress {
  const size = nextPowerOfTwo(br.entryCount)
  const byes = size - br.entryCount
  const current = currentMatch(br)
  const round = current ? current.match.round : br.rounds - 1
  // Byes only exist in round 0; every later round is fully playable.
  const playableInRound = round === 0 ? (size >> 1) - byes : size >> (round + 1)
  const playedSoFar = br.matches.filter(
    (m) => m.round === round && m.winner != null && m.a != null && m.b != null
  ).length
  return {
    round,
    competitorsInRound: size >> round,
    playableInRound,
    playedInRound: Math.min(playedSoFar + 1, playableInRound),
    totalPicks: br.entryCount - 1,
    picksMade: br.matches.filter((m) => m.winner != null && m.a != null && m.b != null).length
  }
}
