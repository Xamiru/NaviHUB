import { titleKey } from './launchboxCatalogCore'
import type { PlatformKey } from '@shared/emulation/platforms'

// The pure half of the game-folder scan (romScan.ts): turning release-group
// file names into matchable titles, and pairing found files with library
// games. Nothing here links anything — every match is a suggestion the user
// accepts in the review list.

// File extensions the walk ignores even though some console uses them: bare
// executables and archives are too often something else.
export const SCAN_SKIP_EXTENSIONS: ReadonlySet<string> = new Set(['zip', '7z', 'elf', 'self', 'dol', 'god', 'xex', 'rpx'])

// "Legend of Zelda, The - Ocarina of Time (USA) (Rev 1) [!].z64"
//   → "Legend of Zelda, The - Ocarina of Time"
export function cleanRomName(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, '')
  return base
    .replace(/\[[^\]]*\]|\([^)]*\)|\{[^}]*\}/g, ' ')
    .replace(/\b(disc|disk|cd)\s*\d+\b/gi, ' ')
    .replace(/\bv\d+(\.\d+)*\b/gi, ' ')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// The key both sides are compared by: the catalog titleKey with the word
// "the" removed wherever it sits ("Legend of Zelda, The" == "The Legend of Zelda").
export function matchKey(title: string): string {
  const words = title
    .normalize('NFKC')
    .toLowerCase()
    .split(/[^\p{L}\p{N}&]+/u)
    .filter((w) => w && w !== 'the')
  return titleKey(words.join(' '))
}

export interface ScanFile {
  path: string
  fileName: string
  platforms: PlatformKey[] // candidates from the extension, or the header's one
  gameCode: string | null
}

export interface LibraryGame {
  mediaId: number
  title: string
  platforms: PlatformKey[] // from its platform tags; empty = unknown
  linkedPaths: ReadonlySet<string>
}

export interface ScanMatch {
  file: ScanFile
  platform: PlatformKey
  candidates: number[] // media ids
  suggested: number | null
  alreadyLinked: boolean
}

// One row per file. A file is suggested only when exactly one library game
// shares its key and (when the game has platform tags) a console; a second
// file for an already-suggested game (disc 2, a revision) is listed but not
// preselected.
export function matchScan(files: readonly ScanFile[], games: readonly LibraryGame[]): ScanMatch[] {
  const byKey = new Map<string, LibraryGame[]>()
  for (const game of games) {
    const key = matchKey(game.title)
    if (!key) continue
    const list = byKey.get(key)
    if (list) list.push(game)
    else byKey.set(key, [game])
  }
  const suggestedFor = new Set<number>()
  const linked = new Set(games.flatMap((g) => [...g.linkedPaths].map((p) => p.toLowerCase())))
  const out: ScanMatch[] = []
  const sorted = [...files].sort((a, b) => a.path.localeCompare(b.path))
  for (const file of sorted) {
    if (file.platforms.length === 0) continue
    const key = matchKey(cleanRomName(file.fileName))
    const named = key ? byKey.get(key) ?? [] : []
    const fitting = named.filter(
      (g) => g.platforms.length === 0 || g.platforms.some((p) => file.platforms.includes(p))
    )
    const alreadyLinked = linked.has(file.path.toLowerCase())
    const platform =
      fitting.length === 1
        ? file.platforms.find((p) => fitting[0].platforms.includes(p)) ?? file.platforms[0]
        : file.platforms[0]
    let suggested: number | null = null
    if (!alreadyLinked && fitting.length === 1 && !suggestedFor.has(fitting[0].mediaId)) {
      suggested = fitting[0].mediaId
      suggestedFor.add(suggested)
    }
    out.push({ file, platform, candidates: fitting.map((g) => g.mediaId), suggested, alreadyLinked })
  }
  return out
}

function folderOf(p: string): string {
  return p.slice(0, Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\')) + 1).toLowerCase()
}

function stemOf(p: string): string {
  return p.slice(Math.max(p.lastIndexOf('/'), p.lastIndexOf('\\')) + 1).replace(/\.[^.]+$/, '').toLowerCase()
}

// A BIN named after a CUE sheet beside it ("Game.bin", "Game (Track 2).bin")
// is one of its tracks, not a game of its own. Unrelated BINs in the same
// folder (Genesis cartridges) stay.
export function dropCueTracks(paths: readonly string[]): string[] {
  const cueStems = new Map<string, string[]>()
  for (const p of paths.filter((x) => /\.cue$/i.test(x))) {
    cueStems.set(folderOf(p), [...(cueStems.get(folderOf(p)) ?? []), stemOf(p)])
  }
  return paths.filter((p) => {
    if (!/\.bin$/i.test(p)) return true
    const stems = cueStems.get(folderOf(p)) ?? []
    const stem = stemOf(p)
    return !stems.some((cue) => stem === cue || stem.startsWith(`${cue} (track`) || stem.startsWith(`${cue}(track`))
  })
}
