import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = (path: string): string => readFileSync(resolve(process.cwd(), path), 'utf8')

describe('keyboard interaction accessibility contracts', () => {
  it('keeps keyboard sensors on both persisted reorder primitives', () => {
    for (const path of [
      'src/renderer/src/components/SortableList.tsx',
      'src/renderer/src/components/TierBoard.tsx'
    ]) {
      const text = source(path)
      expect(text).toContain('KeyboardSensor')
      expect(text).toContain('sortableKeyboardCoordinates')
    }
  })

  it('does not make hover-only actions invisible on focus', () => {
    expect(source('src/renderer/src/pages/GachaCoachPage.tsx')).toContain(
      'group-focus-within:opacity-100'
    )
    expect(source('src/renderer/src/components/gacha/CoachRail.tsx').match(
      /group-focus-within:opacity-100/g
    )).toHaveLength(3)
    expect(source('src/renderer/src/components/TierBoard.tsx')).toContain(
      'group-focus-within/tile:opacity-100'
    )
  })

  it('keeps reader chrome visible while its controls have focus', () => {
    const text = source('src/renderer/src/pages/MangaReaderPage.tsx')
    expect(text).toContain('barHasFocus()')
    expect(text).toContain('focus-within:opacity-100')
    expect(text).toContain("if (e.key === 'Tab') pokeBar()")
  })
})
