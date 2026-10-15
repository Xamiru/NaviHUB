import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  IMAGE_REVEAL_SECONDS,
  IMAGE_REVEAL_STAGES,
  imageRevealFocus,
  imageRevealStageSeconds,
  imageRevealStageStyle
} from '../src/shared/imageRevealQuiz'
import { seededRng } from '../src/shared/quizCore'

describe('image reveal stages', () => {
  it('provides four equal stages over a sixteen-second round', () => {
    expect(IMAGE_REVEAL_SECONDS).toBe(16)
    expect(IMAGE_REVEAL_STAGES.map((stage) => stage.points)).toEqual([400, 300, 200, 100])
    expect(imageRevealStageStyle(0)).toEqual({
      filter: 'blur(14px)',
      transform: 'scale(2.6)',
      transformOrigin: '50% 50%'
    })
    expect(imageRevealStageStyle(3, { x: 20, y: 70 })).toEqual({
      filter: 'blur(0px)',
      transform: 'scale(1)',
      transformOrigin: '20% 70%'
    })
  })

  it('closes in on a seeded focal point away from the edges, with longer typed stages', () => {
    const rng = seededRng(5)
    for (let i = 0; i < 50; i++) {
      const focus = imageRevealFocus(rng)
      expect(focus.x).toBeGreaterThanOrEqual(15)
      expect(focus.x).toBeLessThanOrEqual(85)
      expect(focus.y).toBeGreaterThanOrEqual(15)
      expect(focus.y).toBeLessThanOrEqual(85)
    }
    expect(imageRevealStageSeconds('choices')).toBe(4)
    expect(imageRevealStageSeconds('typed')).toBe(6)
  })

  it('mounts a fresh obscured image for every Solo and Party question', () => {
    const solo = readFileSync('src/renderer/src/pages/ChallengeQuizPage.tsx', 'utf8')
    const party = readFileSync('src/renderer/src/pages/PartyQuizPage.tsx', 'utf8')
    for (const source of [solo, party]) {
      expect(source).toContain('key={question.id}')
      expect(source).toContain('imageRevealStageStyle')
    }
    expect(solo).toContain("imageReady ? 'transition-all duration-700' : ''")
  })
})
