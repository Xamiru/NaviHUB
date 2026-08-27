import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const page = readFileSync('src/renderer/src/pages/TournamentPage.tsx', 'utf8')
const tree = readFileSync('src/renderer/src/components/TournamentTree.tsx', 'utf8')
const landing = readFileSync('src/renderer/src/pages/QuizLandingPage.tsx', 'utf8')

describe('tournament renderer contracts', () => {
  it('uses one shared validated version-3 resume contract on the page and hub', () => {
    expect(page).toContain('version: 3')
    expect(page).toContain('parseSavedTournament(raw)')
    expect(landing).toContain('parseSavedTournament(raw)')
    expect(page).toContain('setUndoStack(s.undoStack)')
  })

  it('keeps unseen bracket contenders concealed', () => {
    expect(tree).toContain('visibleContenderIndices(bracket)')
    expect(tree).toContain('Hidden contender')
  })

  it('keeps picking and audio playback as separate real buttons', () => {
    expect(page).not.toContain('role="button"')
    expect(page).toContain('aria-label={`Pick ${entry.name}`}')
    expect(page).toContain('aria-label={playing ? `Pause ${entry.name}` : `Play ${entry.name}`}')
  })

  it('records the original field size and offers explicit exit choices', () => {
    expect(page).toContain('total: tournamentSize')
    expect(page).toContain('Save and exit')
    expect(page).toContain('Abandon')
    expect(page).toContain('Confirm champion')
  })
})
