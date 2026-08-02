import { useQuery, type UseQueryResult } from '@tanstack/react-query'
import {
  buildTrack,
  decodeSubtitleBytes,
  parseSubtitles,
  type CueTrack
} from '@shared/subtitles'
import type { VideoSubtitleTrack } from '@shared/types'
import { qk } from './queryKeys'

// Loads and parses one subtitle track.
//
// No IPC: the renderer fetches the file straight over navimg: (the CSP already
// allows it in connect-src), exactly as BookReaderPage fetches EPUB spine XHTML.
// Bytes rather than .text() on purpose — Japanese .srt rips are routinely
// Shift-JIS, and decodeSubtitleBytes is what keeps a mojibake track from
// poisoning both the overlay and any card mined off it.
export function useSubtitleTrack(track: VideoSubtitleTrack | null): UseQueryResult<CueTrack> {
  const url = track?.url ?? ''
  return useQuery({
    queryKey: qk.video.cues(url),
    enabled: !!url && (track?.textual ?? false),
    staleTime: Infinity, // a subtitle file is immutable for the session
    retry: false,
    queryFn: async () => {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Could not read that subtitle file (${res.status})`)
      const text = decodeSubtitleBytes(new Uint8Array(await res.arrayBuffer()))
      return buildTrack(parseSubtitles(text, track?.format))
    }
  })
}
