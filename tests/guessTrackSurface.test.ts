import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

describe('Guess the Track renderer contract', () => {
  const page = read('../src/renderer/src/pages/GuessTrackPage.tsx')

  it('keeps the six progressive clip lengths, autocomplete semantics, and manual reveal advance', () => {
    expect(page).toContain('GUESS_TRACK_CLIP_SECONDS')
    expect(page).toContain('role="combobox"')
    expect(page).toContain('role="listbox"')
    expect(page).toContain('Continue')
    expect(page).toContain('See results')
  })

  it('uses a masked quiz namespace and stops only quiz audio', () => {
    expect(page).toContain('quiz-guess-track-')
    expect(page).toContain('shouldStopQuizTrack(activePlayer.track?.id)')
    expect(page).toContain("title: 'Song Quiz'")
    expect(page).toContain('coverPath: null')
  })

  it('guards stale audio resolutions and duplicate submissions', () => {
    expect(page).toContain('request !== audioRequestRef.current')
    expect(page).toContain('transitionLockRef.current')
  })

  it('saves the central points-session metadata', () => {
    for (const field of ['correct:', 'attempted:', 'scorePolicy:', "playMode: 'solo'", 'seed:']) {
      expect(page).toContain(field)
    }
  })
})
