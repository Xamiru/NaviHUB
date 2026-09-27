import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { activeLyricIndex, parseLrc } from '@shared/lyrics'
import type { MusicLyrics } from '@shared/types'

// Lines light up slightly early so the highlight lands as the line is sung.
const LEAD_S = 0.25

const SOURCE_NOTE: Record<NonNullable<MusicLyrics['source']>, string> = {
  file: 'From the .lrc file beside the audio',
  embedded: 'From the lyrics saved in the file',
  lrclib: 'From LRCLIB, saved for offline use'
}

// Library tracks only: the caller never mounts this for quiz or theme audio.
export default function LyricsPanel({
  trackId,
  currentTime,
  onSeek
}: {
  trackId: number
  currentTime: number
  onSeek: (time: number) => void
}) {
  const qc = useQueryClient()
  const query = useQuery({ queryKey: qk.music.lyrics(trackId), queryFn: () => api.music.lyrics(trackId) })
  const [searchingId, setSearchingId] = useState<number | null>(null)
  const [error, setError] = useState<{ trackId: number; message: string } | null>(null)
  const autoSearched = useRef(new Set<number>())

  const search = useCallback(async () => {
    setSearchingId(trackId)
    setError(null)
    try {
      qc.setQueryData(qk.music.lyrics(trackId), await api.music.fetchLyrics(trackId))
    } catch (e) {
      setError({ trackId, message: e instanceof Error ? e.message : String(e) })
    } finally {
      setSearchingId((current) => (current === trackId ? null : current))
    }
  }, [qc, trackId])

  // First open of a track with nothing stored looks it up once; after that the
  // stored result (including "none found") is shown until Search again.
  useEffect(() => {
    if (query.data?.state !== 'unchecked' || autoSearched.current.has(trackId)) return
    autoSearched.current.add(trackId)
    void search()
  }, [query.data?.state, trackId, search])

  const lyrics = query.data
  const lines = useMemo(() => (lyrics?.synced ? parseLrc(lyrics.synced) : []), [lyrics?.synced])
  const active = lines.length ? activeLyricIndex(lines, currentTime + LEAD_S) : -1
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const container = scrollRef.current
    const line = activeRef.current
    if (!container || !line) return
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    container.scrollTo?.({
      top: line.offsetTop - container.clientHeight / 2 + line.clientHeight / 2,
      behavior: reduced ? 'auto' : 'smooth'
    })
  }, [active])

  const searching = searchingId === trackId
  const failure = error?.trackId === trackId ? error.message : null
  const searchAgain = (
    <button className="btn-ghost text-xs" onClick={() => void search()} disabled={searching}>
      {searching ? 'Searching…' : 'Search again'}
    </button>
  )

  if (query.isLoading || (searching && lyrics?.state === 'unchecked')) {
    return <p className="text-sm text-gray-400">Looking up lyrics…</p>
  }
  if (query.isLoadingError) {
    return (
      <p role="alert" className="text-sm">
        Could not load lyrics.{' '}
        <button className="btn" onClick={() => void query.refetch()}>
          Retry lyrics
        </button>
      </p>
    )
  }
  if (failure && lyrics?.state === 'unchecked') {
    return (
      <p role="alert" className="text-sm">
        {failure}{' '}
        <button className="btn" onClick={() => void search()}>
          Try again
        </button>
      </p>
    )
  }
  if (!lyrics || lyrics.state === 'unchecked') return null

  const footer = (
    <div className="mt-3 flex items-center justify-between gap-2">
      <span className="text-xs text-gray-500">{lyrics.source ? SOURCE_NOTE[lyrics.source] : ''}</span>
      {lyrics.source !== 'file' && searchAgain}
    </div>
  )
  const failureNote = failure && <p role="alert" className="mt-2 text-xs">{failure}</p>

  if (lyrics.state === 'missing' || lyrics.state === 'instrumental') {
    return (
      <div>
        <p className="text-sm text-gray-400">
          {lyrics.state === 'instrumental' ? 'Instrumental track.' : 'No lyrics found for this track.'}
        </p>
        {failureNote}
        {footer}
      </div>
    )
  }

  return (
    <div>
      {lines.length ? (
        <div ref={scrollRef} className="relative max-h-[60vh] overflow-y-auto pr-1">
          {lines.map((line, i) =>
            line.text ? (
              <button
                key={`${line.time}-${i}`}
                ref={i === active ? activeRef : undefined}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => onSeek(line.time)}
                className={`block w-full rounded px-2 py-1 text-left text-base leading-snug transition-colors ${
                  i === active ? 'text-accent font-semibold' : i < active ? 'text-gray-500' : 'text-gray-300'
                } hover:bg-base-700/60`}
              >
                {line.text}
              </button>
            ) : (
              <div key={`${line.time}-${i}`} className="h-4" aria-hidden="true" />
            )
          )}
        </div>
      ) : (
        <p className="max-h-[60vh] overflow-y-auto whitespace-pre-line text-sm leading-7 text-gray-300">
          {lyrics.plain}
        </p>
      )}
      {failureNote}
      {footer}
    </div>
  )
}
