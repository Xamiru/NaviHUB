import { describe, expect, it } from 'vitest'
import {
  bracketProgress,
  championOf,
  createBracket,
  currentMatch,
  nextPowerOfTwo,
  pickWinner,
  placementRank,
  placementsOf,
  roundLabel,
  runnerUpOf,
  shuffle,
  standingsOf,
  visibleContenderIndices,
  type Bracket
} from '../src/shared/bracket'

// Plays a whole tournament by always picking side `a`, returning the number
// of human picks it took plus every bracket state visited.
function playThrough(n: number): { picks: number; final: Bracket; roundsSeen: number[] } {
  let br = createBracket(n)
  let picks = 0
  const roundsSeen: number[] = []
  for (;;) {
    const cur = currentMatch(br)
    if (!cur) break
    expect(cur.match.a).not.toBeNull()
    expect(cur.match.b).not.toBeNull()
    roundsSeen.push(cur.match.round)
    br = pickWinner(br, cur.matchIndex, 'a')
    picks++
  }
  return { picks, final: br, roundsSeen }
}

describe('nextPowerOfTwo', () => {
  it('rounds up to the next power of two', () => {
    expect(nextPowerOfTwo(2)).toBe(2)
    expect(nextPowerOfTwo(3)).toBe(4)
    expect(nextPowerOfTwo(4)).toBe(4)
    expect(nextPowerOfTwo(5)).toBe(8)
    expect(nextPowerOfTwo(16)).toBe(16)
    expect(nextPowerOfTwo(17)).toBe(32)
  })
})

describe('createBracket', () => {
  it('rejects pools that cannot form a match', () => {
    expect(() => createBracket(0)).toThrow()
    expect(() => createBracket(1)).toThrow()
  })

  it('builds a single final for 2 entries', () => {
    const br = createBracket(2)
    expect(br.rounds).toBe(1)
    expect(br.matches).toHaveLength(1)
    expect(br.matches[0]).toMatchObject({ round: 0, a: 0, b: 1, winner: null })
  })

  it('pre-resolves byes so a 5-entry bracket has 3 decided round-0 matches', () => {
    const br = createBracket(5)
    const round0 = br.matches.filter((m) => m.round === 0)
    expect(round0).toHaveLength(4)
    const byes = round0.filter((m) => m.b === null)
    expect(byes).toHaveLength(3)
    for (const bye of byes) expect(bye.winner).toBe(bye.a)
    // the one real round-0 match holds the two leftover entries
    const real = round0.find((m) => m.b !== null)!
    expect([real.a, real.b].sort()).toEqual([3, 4])
    // never bye-vs-bye anywhere: every match missing a slot is a round-0 bye
    for (const m of br.matches.filter((x) => x.round > 0)) {
      expect(m.winner).toBeNull()
    }
  })
})

describe('full tournament simulation', () => {
  it('takes exactly n-1 picks and crowns a champion for every pool size 2..17', () => {
    for (let n = 2; n <= 17; n++) {
      const { picks, final, roundsSeen } = playThrough(n)
      expect(picks).toBe(n - 1)
      expect(championOf(final)).not.toBeNull()
      expect(runnerUpOf(final)).not.toBeNull()
      // matches are presented widest round first, never going backwards
      for (let i = 1; i < roundsSeen.length; i++) {
        expect(roundsSeen[i]).toBeGreaterThanOrEqual(roundsSeen[i - 1])
      }
    }
  })

  it('plays the real round-0 match before any round-1 match fed by byes (n=5)', () => {
    const { roundsSeen } = playThrough(5)
    // picks: 1 real round-0 match, then 2 semis, then the final
    expect(roundsSeen).toEqual([0, 1, 1, 2])
  })

  it('propagates a winner into the right slot of the next round', () => {
    let br = createBracket(4)
    br = pickWinner(br, 0, 'b') // round 0 match 0 → entry 1 wins → final slot a
    br = pickWinner(br, 1, 'a') // round 0 match 1 → entry 2 wins → final slot b
    const final = br.matches[2]
    expect(final).toMatchObject({ round: 1, a: 1, b: 2 })
    br = pickWinner(br, 2, 'b')
    expect(championOf(br)).toBe(2)
    expect(runnerUpOf(br)).toBe(1)
  })
})

describe('pickWinner', () => {
  it('does not mutate the input bracket', () => {
    const br = createBracket(4)
    const snapshot = JSON.parse(JSON.stringify(br))
    pickWinner(br, 0, 'a')
    expect(br).toEqual(snapshot)
  })

  it('throws on a decided match and on an unfed match', () => {
    const br = createBracket(4)
    const once = pickWinner(br, 0, 'a')
    expect(() => pickWinner(once, 0, 'b')).toThrow()
    expect(() => pickWinner(br, 2, 'a')).toThrow() // final has empty slots
  })
})

describe('labels and progress', () => {
  it('names the classic rounds', () => {
    expect(roundLabel(2)).toBe('Final')
    expect(roundLabel(4)).toBe('Semifinals')
    expect(roundLabel(8)).toBe('Quarterfinals')
    expect(roundLabel(16)).toBe('Round of 16')
  })

  it('excludes byes from the per-round match count', () => {
    const br = createBracket(5) // padded to 8, 3 byes
    const p = bracketProgress(br)
    expect(p).toMatchObject({
      round: 0,
      competitorsInRound: 8,
      playableInRound: 1,
      playedInRound: 1,
      totalPicks: 4,
      picksMade: 0
    })
  })

  it('tracks progress through a clean 8-bracket', () => {
    let br = createBracket(8)
    expect(bracketProgress(br)).toMatchObject({
      round: 0,
      competitorsInRound: 8,
      playableInRound: 4,
      playedInRound: 1
    })
    br = pickWinner(br, 0, 'a')
    expect(bracketProgress(br)).toMatchObject({ playedInRound: 2, picksMade: 1 })
    for (let i = 1; i < 4; i++) br = pickWinner(br, i, 'a')
    expect(bracketProgress(br)).toMatchObject({
      round: 1,
      competitorsInRound: 4,
      playableInRound: 2,
      playedInRound: 1,
      picksMade: 4
    })
  })

  it('runnerUpOf is null while the final is undecided', () => {
    const br = createBracket(2)
    expect(runnerUpOf(br)).toBeNull()
    expect(championOf(br)).toBeNull()
  })
})

describe('standingsOf', () => {
  it('orders a decided 4-bracket: final two first, then semifinal losers', () => {
    let br = createBracket(4)
    br = pickWinner(br, 0, 'a') // m0: 0 beats 1 → 1 out in semis
    br = pickWinner(br, 1, 'b') // m1: 3 beats 2 → 2 out in semis
    br = pickWinner(br, 2, 'a') // final: 0 beats 3
    expect(standingsOf(br)).toEqual([0, 3, 1, 2])
  })

  it('groups by elimination round — later rounds place higher (n=8)', () => {
    let br = createBracket(8)
    for (let i = 0; i < 7; i++) br = pickWinner(br, i, 'a')
    // Champion 0; runner-up 4 (final loser); semifinal losers 2 then 6;
    // round-0 losers 1,3,5,7 in match order.
    expect(standingsOf(br)).toEqual([0, 4, 2, 6, 1, 3, 5, 7])
  })

  it('skips byes entirely and works on partial brackets', () => {
    const br = createBracket(5) // padded to 8 with 3 pre-resolved byes
    expect(standingsOf(br)).toHaveLength(0) // nothing eliminated yet
    const one = pickWinner(br, 3, 'a') // the only real round-0 match: 3 beats 4
    expect(standingsOf(one)).toEqual([4])
  })

  it('carries the elimination round per placement', () => {
    let br = createBracket(4)
    br = pickWinner(br, 0, 'a') // 1 out in round 0
    br = pickWinner(br, 1, 'b') // 2 out in round 0
    br = pickWinner(br, 2, 'a') // final: 3 out in round 1, champion 0
    expect(placementsOf(br)).toEqual([
      { poolIndex: 0, outInRound: null },
      { poolIndex: 3, outInRound: 1 },
      { poolIndex: 1, outInRound: 0 },
      { poolIndex: 2, outInRound: 0 }
    ])
  })

  it('assigns tied knockout ranks by elimination round', () => {
    const { final } = playThrough(8)
    const placements = placementsOf(final)
    expect(placements.map((_, index) => placementRank(placements, index))).toEqual([
      1, 2, 3, 3, 5, 5, 5, 5
    ])
  })
})

describe('visibleContenderIndices', () => {
  it('reveals only the current and already-played matchups', () => {
    let bracket = createBracket(8)
    expect([...visibleContenderIndices(bracket)]).toEqual([0, 1])
    bracket = pickWinner(bracket, 0, 'a')
    expect([...visibleContenderIndices(bracket)].sort((a, b) => a - b)).toEqual([0, 1, 2, 3])
    expect(visibleContenderIndices(bracket).has(4)).toBe(false)
  })

  it('does not reveal a bye until that contender reaches a real matchup', () => {
    const bracket = createBracket(5)
    expect([...visibleContenderIndices(bracket)].sort((a, b) => a - b)).toEqual([3, 4])
    expect(visibleContenderIndices(bracket).has(0)).toBe(false)
  })
})

describe('shuffle', () => {
  it('returns a permutation without touching the input', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8]
    const copy = [...input]
    let seed = 0
    const rng = () => {
      // deterministic LCG so the test can assert an actual reordering
      seed = (seed * 1664525 + 1013904223) % 4294967296
      return seed / 4294967296
    }
    const out = shuffle(input, rng)
    expect(input).toEqual(copy)
    expect([...out].sort((a, b) => a - b)).toEqual(copy)
    expect(out).not.toEqual(copy) // this seed does reorder
  })
})
