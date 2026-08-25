import { describe, expect, it } from 'vitest'
import { advanceParty, answerParty, createPartyState, partyResult } from '../src/shared/partyQuiz'

describe('party quiz turn and steal rules', () => {
  it('awards two to an owner and rotates ownership only after reveal', () => {
    const start = createPartyState(3)
    const answered = answerParty(start, true)
    expect(answered.scores).toEqual([2, 0, 0])
    expect(answered.owner).toBe(0)
    expect(answered.phase).toBe('reveal')
    const next = advanceParty(answered)
    expect(next.owner).toBe(1)
    expect(next.question).toBe(1)
  })

  it('offers the next side one steal for one point without changing ownership order', () => {
    const steal = answerParty(createPartyState(4), false)
    expect(steal.phase).toBe('steal')
    expect(steal.stealSide).toBe(1)
    const won = answerParty(steal, true)
    expect(won.scores).toEqual([0, 1, 0, 0])
    expect(advanceParty(won).owner).toBe(1)
  })

  it('uses five owned questions per side and reports ties', () => {
    let state = createPartyState('teams')
    for (let i = 0; i < 10; i++) {
      state = answerParty(state, i % 2 === 0)
      if (state.phase === 'steal') state = answerParty(state, false)
      state = advanceParty(state)
    }
    expect(state.phase).toBe('done')
    expect(state.questionCount).toBe(10)
    const result = partyResult(state, 'connections', 'consumed', 9)
    expect(result.winners.length).toBeGreaterThan(0)
    expect(result.seed).toBe(9)
  })
})
