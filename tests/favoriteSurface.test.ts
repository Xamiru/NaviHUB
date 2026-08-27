import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('..', import.meta.url))
const renderer = join(root, 'src/renderer/src')

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.tsx?$/.test(name) ? [path] : []
  })
}

describe('favorite controls', () => {
  it('uses SVG hearts instead of platform-dependent unicode hearts', () => {
    const offenders = sourceFiles(renderer).filter((path) => /[♥♡]/.test(readFileSync(path, 'utf8')))
    expect(offenders).toEqual([])
  })

  it('keeps one shared filled/outline favorite button', () => {
    const button = readFileSync(
      join(renderer, 'components/FavoriteButton.tsx'),
      'utf8'
    )
    expect(button).toContain('<HeartIcon className="h-4 w-4" filled={active} />')
    expect(button).toContain('aria-pressed={active}')
    expect(button).toContain("variant?: 'default' | 'compact' | 'overlay' | 'pill'")
  })
})
