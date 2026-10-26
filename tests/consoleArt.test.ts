import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { PLATFORM_KEYS } from '../src/shared/emulation/platforms'

// Every console the Emulators hub can show has bundled hardware art and a
// provenance row (assets/consoles/README.md).
const dir = join(__dirname, '../src/renderer/src/assets/consoles')

describe('console artwork', () => {
  const readme = readFileSync(join(dir, 'README.md'), 'utf8')

  it.each([...PLATFORM_KEYS])('%s has a tile, a banner and a README row', (key) => {
    for (const size of ['tile', 'banner']) {
      const file = join(dir, `${key}-${size}.webp`)
      expect(existsSync(file), `${key}-${size}.webp`).toBe(true)
      expect(statSync(file).size).toBeGreaterThan(1000)
    }
    expect(readme).toContain(`| \`${key}\` |`)
  })
})
