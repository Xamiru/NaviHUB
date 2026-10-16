import type { PresetKey } from '@shared/emulation/emulatorPresets'

// Where an extracted mod goes inside an emulator's user folder, decided from
// the archive's own tree. Pure: mods.ts lists the staging folder and hands the
// tree in. A layout NaviHUB does not recognise is refused rather than guessed.
//
// Paths in the tree are '/'-separated and relative to the staging root.

export interface TreeEntry {
  path: string
  isDir: boolean
}

export interface Variant {
  // Staging-relative folder the mod is copied from ('' = the root).
  root: string
  label: string
}

export type InstallPlan =
  | {
      kind: 'folder'
      // Folders under the emulator's user folder that hold the new mod folder.
      targetSubdir: string[]
      // The new folder's name; the IO half makes it unique.
      folderName: string
      // Must the folder be exactly this name (PPSSPP) rather than made unique?
      exactName: boolean
      variants: Variant[]
    }
  // Loose files (PCSX2 .pnach). An archive with the same file name in several
  // folders offers each folder as a variant.
  | { kind: 'files'; targetSubdir: string[]; variants: (Variant & { files: string[] })[] }
  | { kind: 'unsupported'; reason: string }

export const MOD_LAYOUT_PRESETS: ReadonlySet<PresetKey> = new Set([
  'eden',
  'ryubing',
  'cemu',
  'dolphin',
  'pcsx2',
  'ppsspp'
])

function parentOf(path: string): string {
  const i = path.lastIndexOf('/')
  return i < 0 ? '' : path.slice(0, i)
}

function baseOf(path: string): string {
  return path.slice(path.lastIndexOf('/') + 1)
}

function depth(path: string): number {
  return path === '' ? 0 : path.split('/').length
}

// "The Best Mod v1.2 / 60 FPS!" → "The Best Mod v1.2 60 FPS". Safe as one
// Windows folder name: no separators, reserved characters or trailing dots.
export function safeFolderName(name: string): string {
  const cleaned = name
    .normalize('NFKC')
    .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60)
    .replace(/[. ]+$/, '')
  const reserved = /^(con|prn|aux|nul|com\d|lpt\d)$/i
  return !cleaned || reserved.test(cleaned) ? 'Mod' : cleaned
}

// Folders whose children include one of the marker names, outermost first;
// a match nested inside another match is part of it, not a second variant.
function markedRoots(tree: readonly TreeEntry[], test: (child: string) => boolean): string[] {
  const roots = new Set<string>()
  for (const e of tree) {
    if (test(baseOf(e.path).toLowerCase())) roots.add(parentOf(e.path))
  }
  const sorted = [...roots].sort((a, b) => depth(a) - depth(b) || a.localeCompare(b))
  return sorted.filter((r, i) => !sorted.slice(0, i).some((outer) => outer === '' || r.startsWith(outer + '/')))
}

// The archive's content root: a lone top-level folder is a wrapper.
export function contentRoot(tree: readonly TreeEntry[]): string {
  const top = tree.filter((e) => depth(e.path) === 1)
  return top.length === 1 && top[0].isDir ? top[0].path : ''
}

function variants(roots: string[], modName: string): Variant[] {
  return roots.map((root) => ({ root, label: root === '' ? modName : baseOf(root) }))
}

const IMAGE_EXT = /\.(png|dds|jpg|jpeg|tga|bmp)$/i

function hasImages(tree: readonly TreeEntry[], under: string): boolean {
  return tree.some((e) => !e.isDir && IMAGE_EXT.test(e.path) && (under === '' || e.path.startsWith(under + '/')))
}

export const SWITCH_TITLE_ID = /^[0-9A-F]{16}$/
export const DISC_ID = /^[A-Z0-9]{6}$/
export const PS2_SERIAL = /^[A-Z]{4}-\d{5}$/
export const PSP_ID = /^[A-Z]{4}\d{5}$/

export function planInstall(
  preset: PresetKey,
  tree: readonly TreeEntry[],
  gameCode: string | null,
  modName: string
): InstallPlan {
  const folderName = safeFolderName(modName)
  const code = gameCode?.toUpperCase() ?? null
  switch (preset) {
    case 'eden':
    case 'ryubing': {
      if (!code || !SWITCH_TITLE_ID.test(code)) {
        return { kind: 'unsupported', reason: 'Set the game file’s title id (16 characters, like 0100F2C0115B6000) first.' }
      }
      const roots = markedRoots(tree, (c) => c === 'romfs' || c === 'exefs' || c === 'cheats')
      if (roots.length === 0) return { kind: 'unsupported', reason: 'This archive has no romfs, exefs or cheats folder.' }
      const targetSubdir = preset === 'eden' ? ['load', code] : ['mods', 'contents', code]
      return { kind: 'folder', targetSubdir, folderName, exactName: false, variants: variants(roots, folderName) }
    }
    case 'cemu': {
      const roots = markedRoots(tree, (c) => c === 'rules.txt')
      if (roots.length === 0) return { kind: 'unsupported', reason: 'This archive has no Cemu graphic pack (rules.txt).' }
      return { kind: 'folder', targetSubdir: ['graphicPacks'], folderName, exactName: false, variants: variants(roots, folderName) }
    }
    case 'dolphin': {
      const graphicMods = markedRoots(tree, (c) => c === 'metadata.json')
      if (graphicMods.length > 0) {
        return {
          kind: 'folder',
          targetSubdir: ['Load', 'GraphicMods'],
          folderName,
          exactName: false,
          variants: variants(graphicMods, folderName)
        }
      }
      if (!code || !DISC_ID.test(code)) {
        return { kind: 'unsupported', reason: 'Set the game file’s 6-character game id (like GZ2E01) first.' }
      }
      // A pack that ships its own <GameID> folder is copied from inside it.
      const idFolder = tree.find(
        (e) => e.isDir && [code, code.slice(0, 3)].includes(baseOf(e.path).toUpperCase())
      )
      const root = idFolder ? idFolder.path : contentRoot(tree)
      if (!hasImages(tree, root)) return { kind: 'unsupported', reason: 'This archive has no texture images.' }
      return {
        kind: 'folder',
        targetSubdir: ['Load', 'Textures', code],
        folderName,
        exactName: false,
        variants: [{ root, label: folderName }]
      }
    }
    case 'pcsx2': {
      const pnach = tree.filter((e) => !e.isDir && /\.pnach$/i.test(e.path)).map((e) => e.path)
      if (pnach.length > 0) return { kind: 'files', targetSubdir: ['patches'], variants: pnachVariants(pnach, folderName) }
      if (!code || !PS2_SERIAL.test(code)) {
        return { kind: 'unsupported', reason: 'Set the game file’s serial (like SLUS-20312) first.' }
      }
      const serialFolder = tree.find((e) => e.isDir && baseOf(e.path).toUpperCase() === code)
      let root = serialFolder ? serialFolder.path : contentRoot(tree)
      const replacements = tree.find(
        (e) => e.isDir && e.path === (root ? `${root}/replacements` : 'replacements')
      )
      if (replacements) root = replacements.path
      if (!hasImages(tree, root)) return { kind: 'unsupported', reason: 'This archive has no texture images or .pnach patches.' }
      return {
        kind: 'folder',
        targetSubdir: ['textures', code, 'replacements'],
        folderName,
        exactName: false,
        variants: [{ root, label: folderName }]
      }
    }
    case 'ppsspp': {
      if (!code || !PSP_ID.test(code)) {
        return { kind: 'unsupported', reason: 'Set the game file’s PSP id (like ULUS10041) first.' }
      }
      const roots = markedRoots(tree, (c) => c === 'textures.ini')
      if (roots.length === 0) return { kind: 'unsupported', reason: 'This archive has no textures.ini.' }
      return { kind: 'folder', targetSubdir: ['PSP', 'TEXTURES'], folderName: code, exactName: true, variants: variants(roots, code) }
    }
    default:
      return {
        kind: 'unsupported',
        reason: 'NaviHUB cannot install mods for this emulator yet.'
      }
  }
}

// All patches as one install when their names are unique; otherwise one
// variant per folder, so two "SLUS-20312_1234ABCD.pnach" never collide.
function pnachVariants(paths: string[], modName: string): (Variant & { files: string[] })[] {
  const names = paths.map((p) => baseOf(p).toLowerCase())
  if (new Set(names).size === names.length) return [{ root: '', label: modName, files: paths }]
  const byFolder = new Map<string, string[]>()
  for (const p of paths) byFolder.set(parentOf(p), [...(byFolder.get(parentOf(p)) ?? []), p])
  return [...byFolder.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([root, files]) => ({ root, label: root === '' ? modName : baseOf(root), files }))
}

// Every staging file under a variant root, relative to that root.
export function filesUnder(tree: readonly TreeEntry[], root: string): { from: string; rel: string }[] {
  return tree
    .filter((e) => !e.isDir && (root === '' || e.path.startsWith(root + '/')))
    .map((e) => ({ from: e.path, rel: root === '' ? e.path : e.path.slice(root.length + 1) }))
}
