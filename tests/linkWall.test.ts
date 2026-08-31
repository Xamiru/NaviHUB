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
      releaseYear: 1800 + index * 10,
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
    const wrongKeys = question.groups.slice(1).map((group) => group.titleKeys[0])
    wrongKeys.push(question.groups[1].titleKeys[1])
    for (let mistake = 0; mistake < question.maxMistakes; mistake++) {
      state = { ...state, selectedKeys: wrongKeys }
      state = submitLinkWallGroup(question, state).state
    }
    expect(state.status).toBe('failed')
    expect(linkWallScore(state)).toBe(150)
  })
})
