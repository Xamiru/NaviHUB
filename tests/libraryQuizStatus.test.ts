import { describe, expect, it } from 'vitest'
import { statusesExceptPlanned } from '../src/renderer/src/lib/mediaConfig'

describe('statusesExceptPlanned', () => {
  it('excludes the positional planned status without depending on its label', () => {
    expect(
      statusesExceptPlanned(['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch'])
    ).toEqual(['Watching', 'Watched', 'On Hold', 'Dropped'])
    expect(statusesExceptPlanned(['Active', 'Finished', 'Paused', 'Someday'])).toEqual([
      'Active',
      'Finished',
      'Paused'
    ])
  })

  it('returns no watched statuses when planned is the only configured state', () => {
    expect(statusesExceptPlanned(['Later'])).toEqual([])
  })
})
