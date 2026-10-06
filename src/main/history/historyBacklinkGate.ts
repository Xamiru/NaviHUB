// Every media detail page asks for History backlinks, and answering parses the
// whole content catalog and builds its index on main. This gate answers the
// common "none" cheaply: a title can have backlinks only when a curated media
// file exists for it (the slug lock lists every media ref ever committed, so
// it is a superset) or the user linked it by hand. Only then does ipc.ts load
// the History service.

import lock from '@shared/history/content/ids.lock.json'
import { mediaFileId, refOf } from '@shared/history/schema'
import * as repo from '../repos/historyRepo'
import { libraryItem } from './library'

let mediaRefs: Set<string> | null = null

export function mayHaveBacklinks(mediaId: number): boolean {
  const item = libraryItem(mediaId)
  if (!item) return false
  if (repo.personalLinksForMedia(mediaId).length > 0) return true
  mediaRefs ??= new Set((lock as { ids: string[] }).ids.filter((id) => id.startsWith('media:')))
  const title = { mediaType: item.mediaType, source: item.source ?? '', externalId: item.externalId ?? '' }
  return mediaRefs.has(refOf('media', mediaFileId(title)))
}
