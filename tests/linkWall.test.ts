import { describe, expect, it } from 'vitest'
import {
  buildLinkWallQuestion,
  initialLinkWallState,
  linkWallPartitions,
  linkWallScore,
  submitLinkWallGroup,
  toggleLinkWallTitle,
  type LinkWallCandidate
} from '../src/shared/linkWall'

function candidates(): LinkWallCandidate[] {
  return Array.from({ length: 16 }, (_, index) => {
    const group = Math.floor(index / 4)
    return {
      key: String(index + 1),
      label: `Title ${index + 1}`,
      aliases: [],
      imagePath: `media/${index + 1}.jpg`,
      // Group 3 shares the 1990s; every other title has its own decade.
      releaseYear: group === 3 ? 1990 + index - 12 : 1800 + index * 10,
      mediaType: index % 2 ? 'tv' : 'movie',
      genres: [{ key: group === 3 ? 'mystery' : `genre-${index}`, label: group === 3 ? 'Mystery' : `Genre ${index}` }],
      companies: [{ key: group === 2 ? 'company' : `company-${index}`, label: group === 2 ? 'Wall Company' : `Company ${index}` }],
      relations: [],
      people: group === 0
        ? [{ id: 1, name: 'Wall Actor', role: 'actor', billingOrder: 0 }]
        : group === 1
          ? [{ id: 2, name: 'Wall Director', role: 'director', billingOrder: 99 }]
          : []
    }
  })
}

describe('Link Wall', () => {
  it('builds a deterministic uniquely partitioned wall with diverse relation families', () => {
    const first = buildLinkWallQuestion(candidates(), 12, 'both')
    const second = buildLinkWallQuestion(candidates(), 12, 'both')
    expect(first).toEqual(second)
    expect(first?.titles).toHaveLength(16)
    expect(first?.groups).toHaveLength(4)
    expect(new Set(first?.groups.map((group) => group.family)).size).toBeGreaterThanOrEqual(3)
    expect(linkWallPartitions(first!.titles.map((title) => title.key), first!.groups)).toHaveLength(1)
  })

  it('locks selection at four and transitions through correct and failed submissions', () => {
    const question = buildLinkWallQuestion(candidates(), 12, 'both')!
    let state = initialLinkWallState()
    for (const key of question.groups[0].titleKeys) state = toggleLinkWallTitle(state, key)
    state = toggleLinkWallTitle(state, question.groups[1].titleKeys[0])
    expect(state.selectedKeys).toHaveLength(4)
    const correct = submitLinkWallGroup(question, state)
    expect(correct.outcome).toBe('correct')
    state = correct.state
    // Four different wrong guesses, none with three titles from one group.
    const [g1, g2, g3] = question.groups.slice(1).map((group) => group.titleKeys)
    const wrongGuesses = [
      [g1[0], g2[0], g3[0], g1[1]],
      [g1[0], g2[0], g3[0], g2[1]],
      [g1[0], g2[0], g3[0], g3[1]],
      [g1[1], g2[1], g3[1], g1[2]]
    ]
    for (const guess of wrongGuesses) {
      state = { ...state, selectedKeys: guess }
      const result = submitLinkWallGroup(question, state)
      expect(result.oneAway).toBe(false)
      state = result.state
    }
    expect(state.status).toBe('failed')
    expect(linkWallScore(state)).toBe(150)
  })

  it('says one away for three of a group and never charges a repeated guess', () => {
    const question = buildLinkWallQuestion(candidates(), 12, 'both')!
    const [g0, g1] = question.groups.map((group) => group.titleKeys)
    let state = { ...initialLinkWallState(), selectedKeys: [g0[0], g0[1], g0[2], g1[0]] }
    const first = submitLinkWallGroup(question, state)
    expect(first.outcome).toBe('wrong')
    expect(first.oneAway).toBe(true)
    expect(first.state.mistakes).toBe(1)
    // The selection stays so one title can be swapped.
    expect(first.state.selectedKeys).toHaveLength(4)
    state = first.state
    const repeat = submitLinkWallGroup(question, state)
    expect(repeat.outcome).toBe('repeated')
    expect(repeat.state.mistakes).toBe(1)
  })

  it('never puts a deep-billed fifth title on a wall beside that actor group', () => {
    const pool = candidates()
    pool.push({
      ...pool[4],
      key: 'trap',
      label: 'Trap Title',
      releaseYear: 1700,
      companies: [{ key: 'trap-company', label: 'Trap Company' }],
      people: [{ id: 1, name: 'Wall Actor', role: 'actor', billingOrder: 13 }]
    })
    for (let seed = 0; seed < 20; seed++) {
      const wall = buildLinkWallQuestion(pool, seed, 'both')
      if (!wall) continue
      const actorGroup = wall.groups.find((group) => group.family === 'actor')
      if (actorGroup) expect(wall.titles.map((title) => title.key)).not.toContain('trap')
    }
  })
})
