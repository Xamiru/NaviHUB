import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { MangaLibrary, MangaPages } from '@shared/types'
import { api } from './api'
import { qk } from './queryKeys'

// Where a reader's content comes from. Both readers serve two routes now:
//
//   /manga/:id/(read|book)/:chapterId   a chapter in the library
//   /read/(manga|book)/:token           a file the OS handed us ("open with")
//
// The ad-hoc side has no chapter row, no series and no media item, so the page
// gets chapterId/mediaId 0 and an empty chapter list. Callers guard persistence
// on `adhoc`, so callers can skip persistence for files outside the library.

const EMPTY_LIBRARY: MangaLibrary = { localDir: null, chapters: [] }

export interface ReaderSource {
  doc: MangaPages | null | undefined
  library: MangaLibrary | undefined
  chapterId: number
  mediaId: number
  adhoc: boolean
  /** True once the content query has settled, whichever way it went. */
  missing: boolean
}

export function useReaderSource(): ReaderSource {
  const { id, chapterId: chapterIdParam, token } = useParams()
  const adhoc = token != null
  const mediaId = adhoc ? 0 : Number(id)
  const chapterId = adhoc ? 0 : Number(chapterIdParam)

  const { data: doc, isFetched } = useQuery({
    queryKey: adhoc ? qk.manga.adhocPages(token) : qk.manga.pages(chapterId),
    queryFn: () => (adhoc ? api.manga.adhocPages(token) : api.manga.pages(chapterId))
  })

  const { data: library } = useQuery({
    queryKey: qk.manga.chapters(mediaId),
    queryFn: () => api.manga.chapters(mediaId),
    enabled: !adhoc
  })

  return {
    doc,
    // Ad-hoc has no siblings to page between; a synthetic empty library keeps
    // the readers' `if (!doc || !library)` gate and prev/next logic untouched.
    library: adhoc ? EMPTY_LIBRARY : library,
    chapterId,
    mediaId,
    adhoc,
    missing: isFetched && !doc
  }
}
