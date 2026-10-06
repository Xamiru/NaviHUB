/// <reference types="vite/client" />
// Loads the committed History content. Every file under content/<kind>/ is
// picked up by Vite's compile-time glob, so research sessions add files and
// never maintain an index. This module is the ONLY importer of the content
// bundle: the main process reaches it through a cached dynamic import (see
// src/main/history/) and nothing in the renderer may import it —
// tests/performanceBoundaries.test.ts guards both.

import type { CatalogEntry, IdLock } from './model'
import type { HistoryEntity } from './schema'
import lockJson from './content/ids.lock.json'

const modules = import.meta.glob<HistoryEntity>('./content/*/*.ts', { eager: true, import: 'default' })

export function loadCatalogEntries(): CatalogEntry[] {
  return Object.entries(modules)
    .map(([key, entity]) => ({ path: key.replace(/^\.\/content\//, ''), entity }))
    .sort((a, b) => a.path.localeCompare(b.path))
}

export const ID_LOCK: IdLock = lockJson as IdLock
