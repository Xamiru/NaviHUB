// Bundled hardware photos for the Emulators hub, one per platform key. Sources
// and licences are listed in assets/consoles/README.md; tests/consoleArt.test.ts
// fails when a platform has no tile, banner or README row.
import type { PlatformKey } from '@shared/emulation/platforms'

export type ConsoleArtSize = 'tile' | 'banner'

const files = import.meta.glob<string>('../assets/consoles/*.webp', {
  eager: true,
  query: '?url',
  import: 'default'
})

const byName = new Map<string, string>()
for (const [path, url] of Object.entries(files)) {
  byName.set(path.slice(path.lastIndexOf('/') + 1, -'.webp'.length), url)
}

// Tiles are at most 640 x 400 (cards, chips, rows); banners at most 1600 x 1000.
export function consoleArt(platform: PlatformKey, size: ConsoleArtSize = 'tile'): string | null {
  return byName.get(`${platform}-${size}`) ?? null
}
