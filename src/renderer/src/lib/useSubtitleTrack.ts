import { useQuery } from '@tanstack/react-query'
import {
  buildTrack,
  decodeSubtitleBytes,
  parseSubtitles,
  type CueTrack
} from '@shared/subtitles'
import type { VideoSourceRef, VideoSubtitleTrack } from '@shared/types'
import { api } from './api'
import { qk } from './queryKeys'

function refId(ref: VideoSourceRef): number {
  if (ref.kind === 'clip') return ref.clipId
  if (ref.kind === 'football') return ref.mediaId
  return ref.fileId
}

export interface SubtitleTrackState {
  cues: CueTrack | undefined
  // An embedded track is being pulled out of the container (ffmpeg reads the
  // whole file, which takes a while on a large MKV).
  extracting: boolean
  error: string | null
}

// Loads and parses one subtitle track.
//
// Embedded tracks arrive with no URL and are extracted on first use through
// video:subtitleTrack. The cues themselves are fetched straight over navimg,
// as BookReaderPage fetches EPUB spine XHTML: bytes rather than .text(),
// because Japanese .srt rips are routinely Shift-JIS and decodeSubtitleBytes
// is what keeps a mojibake track from poisoning both the overlay and any card
// mined off it.
export function useSubtitleTrack(
  ref: VideoSourceRef,
  track: VideoSubtitleTrack | null
): SubtitleTrackState {
  const needsExtract = !!track && track.textual && !track.url
  const extracted = useQuery({
    queryKey: qk.video.subtitleTrack(ref.kind, refId(ref), track?.id ?? ''),
    queryFn: () => api.video.subtitleTrack(ref, track!.id),
    enabled: needsExtract,
    staleTime: Infinity,
    retry: false
  })
  const url = track?.url ?? extracted.data?.url ?? ''
  const cues = useQuery({
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
  const extractFailed = needsExtract && extracted.isSuccess && !extracted.data?.url
  return {
    cues: cues.data,
    extracting: needsExtract && extracted.isFetching,
    error: extractFailed
      ? 'This track could not be extracted. Install ffmpeg, or put a subtitle file next to the video.'
      : extracted.error || cues.error
        ? 'This subtitle track could not be read.'
        : null
  }
}
