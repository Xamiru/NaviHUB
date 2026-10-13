/// <reference types="vite/client" />
// The History map's historical borders: CShapes 2.0 (world, 1886-2019),
// CShapes-Europe (from 1816) and Cliopatria (1700-1885), prepared by scripts/build-history-borders.cjs.
// Loaded on first use only (ipc.ts imports this module lazily) and handed to
// the renderer whole, so scrubbing through the years needs no further IPC.
// Imported as raw text and parsed once: as a JSON module Vite would compile
// the 4 MB of coordinates into a three times larger JavaScript literal.

import type { HistoryBorders } from '@shared/types'
import { withAncient } from '@shared/history/mapGeometry'

let cache: HistoryBorders | null = null
let ancientCache: HistoryBorders | null = null
let mergedCache: HistoryBorders | null = null

export async function borders(): Promise<HistoryBorders> {
  if (!cache) cache = JSON.parse((await import('./data/borders.json?raw')).default) as HistoryBorders
  return cache
}

/** Everything Cliopatria draws before 1700 (about 7 MB): loaded only when the map or a state page goes back that far. */
export async function ancientBorders(): Promise<HistoryBorders> {
  if (!ancientCache) ancientCache = JSON.parse((await import('./data/borders-ancient.json?raw')).default) as HistoryBorders
  return ancientCache
}

/** Both files as one set, merged once: state pages that start before 1700 read it on every open. */
export async function allBorders(): Promise<HistoryBorders> {
  if (!mergedCache) mergedCache = withAncient(await borders(), await ancientBorders())
  return mergedCache
}
