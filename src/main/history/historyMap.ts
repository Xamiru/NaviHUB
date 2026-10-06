/// <reference types="vite/client" />
// The History map's historical borders: CShapes 2.0 (world, 1886-2019) and
// CShapes-Europe (from 1806), prepared by scripts/build-history-borders.cjs.
// Loaded on first use only (ipc.ts imports this module lazily) and handed to
// the renderer whole, so scrubbing through the years needs no further IPC.
// Imported as raw text and parsed once: as a JSON module Vite would compile
// the 1.6 MB of coordinates into a three times larger JavaScript literal.

import type { HistoryBorders } from '@shared/types'

let cache: HistoryBorders | null = null

export async function borders(): Promise<HistoryBorders> {
  if (!cache) cache = JSON.parse((await import('./data/borders.json?raw')).default) as HistoryBorders
  return cache
}
