import { describe, expect, it } from 'vitest'
import {
  ROLEPLAY_SCENARIOS,
  checkRoleplayResponse,
  nextRoleplayScenario,
  roleplayNode
} from '../src/shared/japanese/roleplay'

describe('offline Japanese role-play', () => {
  it('keeps every branch local and resolvable', () => {
    for (const scenario of ROLEPLAY_SCENARIOS) {
      expect(roleplayNode(scenario, scenario.startNodeId)).not.toBeNull()
      for (const node of scenario.nodes) {
        expect(node.choices.length).toBeGreaterThanOrEqual(2)
        expect(
          node.choices.some(
            (choice) => checkRoleplayResponse(choice.japanese, node).missing.length === 0
          ),
          `${scenario.id}/${node.id} needs at least one fully matching authored path`
        ).toBe(true)
        for (const choice of node.choices) {
          if (choice.nextNodeId) expect(roleplayNode(scenario, choice.nextNodeId)).not.toBeNull()
        }
      }
    }
  })

  it('delays repeats by choosing an unseen or least-recent scenario', () => {
    const scenarios = ROLEPLAY_SCENARIOS.slice(0, 4)
    expect(nextRoleplayScenario(scenarios, ['cafe-repair'], 'cafe-repair').id).toBe(
      scenarios[1].id
    )
    expect(
      nextRoleplayScenario(
        scenarios,
        [scenarios[0].id, scenarios[1].id, scenarios[2].id, scenarios[3].id],
        scenarios[0].id
      ).id
    ).toBe(scenarios[3].id)
  })

  it('accepts alternative structures after normalization', () => {
    const node = ROLEPLAY_SCENARIOS[0].nodes[0]
    expect(checkRoleplayResponse('温かい コーヒーをお願いします！', node)).toEqual({
      matched: 3,
      total: 3,
      missing: []
    })
  })

  it('reports the specific functions still missing', () => {
    const node = ROLEPLAY_SCENARIOS[1].nodes[0]
    const result = checkRoleplayResponse('映画はどう？', node)
    expect(result.matched).toBe(1)
    expect(result.missing).toContain('土曜日 / 土曜')
  })
})
