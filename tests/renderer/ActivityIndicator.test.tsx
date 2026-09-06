import { describe, expect, it } from 'vitest'
import { activityText } from '../../src/renderer/src/components/ActivityIndicator'
import type { ActivityStatus } from '../../src/shared/types'

const base: ActivityStatus = {
  active: true,
  taskId: 'activity-test',
  label: 'Importing Spotify playlist',
  detail: null,
  phase: 'fetching',
  done: 0,
  total: 0
}

describe('activityText', () => {
  it('shows a provider-specific detail for an indeterminate silent phase', () => {
    expect(activityText({ ...base, detail: 'Found 100 tracks; resolving metadata' })).toBe(
      'Found 100 tracks; resolving metadata'
    )
  })

  it('keeps counted image progress on the shared import surface', () => {
    expect(activityText({ ...base, phase: 'images', done: 12, total: 40 })).toBe(
      'Downloading images 12/40'
    )
  })
})
