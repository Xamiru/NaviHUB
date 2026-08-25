import { describe, expect, it } from 'vitest'
import {
  moveContextLensSelection,
  orderedContextLensSelections,
  reconcileContextLensSelection
} from '../src/renderer/src/lib/contextLens'
import type { GlobalSearchResults } from '../src/shared/types'

const results = {
  media: [{ id: 8 }],
  people: [{ id: 4 }, { id: 7 }],
  companies: [{ id: 3 }],
  characters: [{ id: 9 }]
} as GlobalSearchResults

describe('context lens selection', () => {
  it('orders grouped search results predictably', () => {
    expect(orderedContextLensSelections(results)).toEqual([
      { kind: 'media', id: 8 },
      { kind: 'person', id: 4 },
      { kind: 'person', id: 7 },
      { kind: 'company', id: 3 },
      { kind: 'character', id: 9 }
    ])
  })

  it('retains a valid selection and falls back to the first result', () => {
    expect(reconcileContextLensSelection(results, { kind: 'person', id: 7 })).toEqual({
      kind: 'person',
      id: 7
    })
    expect(reconcileContextLensSelection(results, { kind: 'person', id: 99 })).toEqual({
      kind: 'media',
      id: 8
    })
  })

  it('moves within the flattened result order without wrapping', () => {
    expect(moveContextLensSelection(results, { kind: 'media', id: 8 }, -1)).toEqual({
      kind: 'media',
      id: 8
    })
    expect(moveContextLensSelection(results, { kind: 'person', id: 7 }, 1)).toEqual({
      kind: 'company',
      id: 3
    })
  })
})
