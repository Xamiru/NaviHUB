import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import {
  IMAGE_REVEAL_SECONDS,
  IMAGE_REVEAL_STAGES,
  imageRevealStageStyle
} from '../src/shared/imageRevealQuiz'

describe('image reveal stages', () => {
  it('provides four equal stages over a sixteen-second round', () => {
    expect(IMAGE_REVEAL_SECONDS).toBe(16)
    expect(IMAGE_REVEAL_STAGES.map((stage) => stage.points)).toEqual([400, 300, 200, 100])
    expect(imageRevealStageStyle(0)).toEqual({ filter: 'blur(20px)', transform: 'scale(1.8)' })
    expect(imageRevealStageStyle(3)).toEqual({ filter: 'blur(0px)', transform: 'scale(1)' })
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
