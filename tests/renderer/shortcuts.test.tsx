import { readFileSync } from 'fs'
import { resolve } from 'path'
import { describe, expect, it } from 'vitest'
import { SHORTCUT_GROUPS } from '@/lib/shortcuts'

// jsdom's import.meta.url is not a file URL; tests run from the repo root.
const read = (rel: string) => readFileSync(resolve(process.cwd(), 'src/renderer/src', rel), 'utf8')

const ARROWS: Record<string, string> = { ArrowLeft: '←', ArrowRight: '→', ArrowUp: '↑', ArrowDown: '↓' }

function keysOf(title: string): string {
  const group = SHORTCUT_GROUPS.find((g) => g.title === title)
  if (!group) throw new Error(`missing group ${title}`)
  return group.rows.flatMap((row) => row.keys).join(' ')
}

describe('shortcut reference', () => {
  it('lists every key the tab router handles', () => {
    const source = read('components/TabbedRouter.tsx')
    const codes = [...source.matchAll(/e\.code === '(\w+)'/g)].map((m) => m[1])
    expect(codes.length).toBeGreaterThan(5)
    const listed = `${keysOf('Browser tabs')} ${keysOf('Navigation')}`
    for (const code of codes) {
      const shown = ARROWS[code] ?? code.replace(/^Key/, '')
      expect(listed, code).toContain(shown)
    }
    expect(listed).toContain('Ctrl+1')
  })

  it('lists every key the music player handles', () => {
    const source = read('components/PlayerShortcuts.tsx')
    const keys = JSON.parse(source.match(/const KEYS = (\[[^\]]+\])/)![1].replace(/'/g, '"')) as string[]
    const listed = keysOf('Music player')
    for (const key of keys) {
      const shown = key === ' ' ? 'Space' : (ARROWS[key] ?? key)
      expect(listed, key).toContain(shown)
    }
  })

  it('is what both readers show in their help overlay', () => {
    expect(read('pages/MangaReaderPage.tsx')).toContain('const SHORTCUTS = MANGA_READER_SHORTCUTS')
    expect(read('pages/BookReaderPage.tsx')).toContain('const SHORTCUTS = BOOK_READER_SHORTCUTS')
  })
})
