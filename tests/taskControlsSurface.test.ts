import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const row = readFileSync('src/renderer/src/components/TaskRow.tsx', 'utf8')
const page = readFileSync('src/renderer/src/pages/TasksPage.tsx', 'utf8')
const spotify = readFileSync('src/main/musicSpotify.ts', 'utf8')

describe('task control surface', () => {
  it('renders pause and stop only when the task advertises those controls', () => {
    expect(row).toContain('{task.canPause && !cancelling && (')
    expect(row).toContain('{task.canCancel && (')
    expect(row).toContain("{cancelling ? 'Stopping' : 'Stop'}")
  })

  it('explains delayed pause and stop states instead of claiming they completed', () => {
    expect(row).toContain('Pausing after the current operation')
    expect(row).toContain('Stopping; finishing or aborting the current operation')
    expect(row).toContain('task.pauseNote')
  })

  it('enables Stop all only when at least one active task is stoppable', () => {
    expect(page).toContain('const stoppable = active.filter((t) => t.canCancel)')
    expect(page).toContain('disabled: stoppable.length === 0')
  })

  it('classifies explicit Spotify inspection stops as cancellations', () => {
    expect(
      spotify.match(/new tasks\.TaskCancelledError\('Spotify inspection'\)/g)?.length ?? 0
    ).toBeGreaterThanOrEqual(2)
    expect(spotify).not.toContain("throw new Error('Spotify inspection cancelled')")
  })
})
