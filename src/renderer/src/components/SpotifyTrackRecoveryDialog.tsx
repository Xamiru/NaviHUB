import { rankMusicSources } from '@shared/musicSourceMatch'
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicSpotifyDownloadCandidate, MusicTrack } from '@shared/types'
import Dialog from './Dialog'
import { Field } from './Field'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue } from '../lib/hooks'
import { usePlayerControls } from '../lib/player'
import { musicTrackToPlayerTrack } from '../lib/musicTracks'
import { errorMessage, toast } from '../lib/toast'
import { formatDuration } from './MusicTrackRow'

function durationDelta(actual: number | null, expected: number | null): string {
  if (actual == null || expected == null) return ''
  const delta = Math.round(actual - expected)
  return delta === 0 ? '' : ` (${delta > 0 ? '+' : ''}${delta}s)`
}

/**
 * One place to settle a song that automatic matching could not: search YouTube
 * Music and download an exact source now, paste a link, or link a copy that is
 * already in the library.
 */
export default function SpotifyTrackRecoveryDialog({ sourceKind, trackId, title, artist,
  duration, candidate, problem, onClose
}: {
  sourceKind: 'playlistItem' | 'entityTrack'
  trackId: number
  title: string
  artist: string
  duration: number | null
  candidate?: MusicSpotifyDownloadCandidate | null
  problem?: string | null
  onClose: () => void
}) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const [query, setQuery] = useState(`${artist} ${title}`)
  const [submitted, setSubmitted] = useState(`${artist} ${title}`.trim())
  const [url, setUrl] = useState('')
  const [localQuery, setLocalQuery] = useState(title)
  const localSearch = useDebouncedValue(localQuery)
  const previewRequest = useRef(0)
  useEffect(() => () => { previewRequest.current++ }, [sourceKind, trackId])
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const remote = useQuery({ queryKey: qk.music.spotifyAudioSearch(submitted),
    queryFn: () => api.music.spotifySearchAudio(submitted), enabled: Boolean(submitted) })
  const local = useQuery({ queryKey: qk.music.search(localSearch),
    queryFn: () => api.music.search(localSearch), enabled: Boolean(localSearch.trim()) })
  const ranked = useMemo(() => rankMusicSources({ title, artist, duration }, remote.data ?? []), [remote.data, title, artist, duration])
  const localTracks = useMemo(() => {
    const seen = new Set<string>()
    return (local.data?.tracks ?? []).filter((track) => {
      const key = [track.title, track.tagArtist ?? track.artistName, track.albumTitle, Math.round(track.duration ?? 0)]
        .join('\n').toLocaleLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    }).slice(0, 8)
  }, [local.data])

  async function run(key: string, fn: () => Promise<unknown>, done?: string): Promise<void> {
    setBusy(key)
    setError(null)
    try {
      await fn()
      void qc.invalidateQueries({ queryKey: qk.music.all })
      if (done) toast(done, 'success')
      onClose()
    } catch (cause) {
      setError(errorMessage(cause))
    } finally {
      setBusy(null)
    }
  }
  const downloadFrom = (source: string) => run(`source:${source}`, () => api.music.spotifySetTrackDownloadOptions({
    sourceKind, trackId, audioSourceUrl: source, approveSource: true, startNow: true
  }), `Downloading “${title}” from the source you chose`)
  const useLocal = (track: MusicTrack) => run(`local:${track.id}`, () => api.music.spotifyMatchPlaylistItem({
    sourceKind, itemId: trackId, trackId: track.id, confirm: true
  }), `“${title}” now plays your library copy`)
  const importFile = async () => {
    setError(null)
    try {
      const picked = await api.music.spotifyPickLocalAudio()
      if (picked) await useLocal(picked)
    } catch (cause) { setError(errorMessage(cause)) }
  }
  const listenRemote = async (source: string, label: string, subtitle: string) => {
    setError(null)
    const request = ++previewRequest.current
    try {
      const audioUrl = await api.music.spotifyPreviewAudio(source)
      if (previewRequest.current !== request) return
      player.playQueue([{ id: `file-preview-${source}`, title: label, subtitle, audioUrl, mediaId: null }], 0)
    } catch (cause) { setError(errorMessage(cause)) }
  }
  const listenLocal = (track: MusicTrack) => { previewRequest.current++; player.playQueue([musicTrackToPlayerTrack(track)], 0) }
  const search = (event: FormEvent) => {
    event.preventDefault()
    if (submitted === query.trim()) void remote.refetch()
    else setSubmitted(query.trim())
  }

  return <Dialog labelledBy="spotify-recovery-title" onClose={onClose}
    panelClassName="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg bg-base-800 p-5 shadow-xl">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 id="spotify-recovery-title" className="text-lg font-semibold">Choose audio for “{title}”</h2>
        <p className="text-sm text-gray-400">{artist} · {formatDuration(duration)}</p>
      </div>
      <button className="btn-ghost px-2" aria-label="Close" onClick={onClose}>✕</button>
    </div>
    {problem && !candidate && <p className="mb-4 rounded border border-amber-800/60 bg-amber-950/30 px-3 py-2 text-sm text-amber-100">{problem}</p>}
    {error && <p role="alert" className="mb-4 text-sm text-red-300">{error}</p>}

    {candidate && <section className="mb-6 rounded border border-base-600 p-3" aria-label="Downloaded version">
      <p className="text-sm font-medium text-gray-200">A version was downloaded but could not be confirmed</p>
      <p className="mt-1 text-xs text-gray-400">
        {candidate.localTrack.title} · {candidate.localTrack.albumTitle} · {formatDuration(candidate.localTrack.duration)}
        {durationDelta(candidate.localTrack.duration, duration)}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button className="btn-ghost" onClick={() => listenLocal(candidate.localTrack)}>Listen</button>
        <button className="btn-primary" disabled={busy != null} onClick={() => void run('confirm',
          () => api.music.spotifyConfirmDownloadCandidate({ sourceKind, trackId }), 'Downloaded version confirmed')}>It’s the right song</button>
        <button className="btn-ghost" disabled={busy != null} onClick={() => void run('reject',
          () => api.music.spotifyRejectDownloadCandidate({ sourceKind, trackId }), 'Rejected; choose another source below or retry')}>Wrong song</button>
      </div>
    </section>}

    <section className="mb-6" aria-labelledby="recovery-remote-title">
      <h3 id="recovery-remote-title" className="mb-2 text-sm font-semibold text-gray-200">Download from YouTube Music</h3>
      <form className="flex gap-2" onSubmit={search}>
        <Field label="Search YouTube Music" hiddenLabel className="contents">
          <input className="input min-w-0 flex-1" value={query} onChange={(event) => setQuery(event.target.value)} />
        </Field>
        <button className="btn-ghost shrink-0" disabled={remote.isFetching || !query.trim()}>{remote.isFetching ? 'Searching…' : 'Search'}</button>
      </form>
      {remote.error && <p role="alert" className="mt-2 text-sm text-red-300">Search failed. Try again or paste a link below.</p>}
      {remote.data?.length === 0 && <p className="mt-2 text-sm text-gray-400">No results. Try different words.</p>}
      <ul className="mt-2 divide-y divide-base-700" aria-busy={remote.isFetching}>
        {ranked.map((result) => {
          const key = `source:${result.url}`
          return <li key={result.url} className="flex flex-wrap items-center gap-3 py-2.5 sm:flex-nowrap">
            <div className="min-w-0 flex-1">
              <p className="line-clamp-1 text-sm text-gray-100">
                {result.title}
                {result.assessment.strong && <span className="ml-2 rounded bg-green-900/60 px-1.5 py-0.5 text-xs text-green-300">Match</span>}
              </p>
              <p className="line-clamp-1 text-xs text-gray-400">
                {[result.artist ?? result.channel, result.album].filter(Boolean).join(' · ')} · {formatDuration(result.duration)}{durationDelta(result.duration, duration)}
              </p>
              {!result.assessment.strong && <p className="line-clamp-1 text-xs text-gray-500">{result.assessment.reasons.join('; ')}</p>}
            </div>
            <div className="flex shrink-0 gap-2">
              <button className="btn-ghost px-2 py-1 text-xs" onClick={() => void listenRemote(result.url, result.title, result.channel)}>Listen</button>
              <button className={`${result.assessment.strong ? 'btn-primary' : 'btn-ghost'} px-2 py-1 text-xs`} disabled={busy != null}
                onClick={() => void downloadFrom(result.url)}>{busy === key ? 'Checking…' : 'Download this'}</button>
            </div>
          </li>
        })}
      </ul>
      <form className="mt-3 flex gap-2" onSubmit={(event) => { event.preventDefault(); if (url.trim()) void downloadFrom(url.trim()) }}>
        <Field label="Or paste a YouTube link" hiddenLabel className="contents">
          <input className="input min-w-0 flex-1" value={url} placeholder="Or paste a YouTube link" onChange={(event) => setUrl(event.target.value)} />
        </Field>
        <button className="btn-ghost shrink-0" disabled={busy != null || !url.trim()}>{busy === `source:${url.trim()}` ? 'Checking…' : 'Download link'}</button>
      </form>
    </section>

    <section aria-labelledby="recovery-local-title">
      <h3 id="recovery-local-title" className="mb-2 text-sm font-semibold text-gray-200">Already in your library?</h3>
      <Field label="Search your library" hiddenLabel className="contents">
        <input className="input w-full" value={localQuery} placeholder="Search your library" onChange={(event) => setLocalQuery(event.target.value)} />
      </Field>
      {localSearch.trim() && !local.isFetching && localTracks.length === 0 && <p className="mt-2 text-sm text-gray-400">Nothing in your library matches.</p>}
      <ul className="mt-2 divide-y divide-base-700">
        {localTracks.map((track) => <li key={track.id} className="flex items-center gap-3 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-sm text-gray-100">{track.title}</p>
            <p className="line-clamp-1 text-xs text-gray-400">{track.tagArtist ?? track.artistName} · {track.albumTitle} · {formatDuration(track.duration)}{durationDelta(track.duration, duration)}</p>
          </div>
          <button className="btn-ghost px-2 py-1 text-xs" onClick={() => listenLocal(track)}>Listen</button>
          <button className="btn-ghost px-2 py-1 text-xs" disabled={busy != null} onClick={() => void useLocal(track)}>Use this</button>
        </li>)}
      </ul>
      <button className="btn-ghost mt-3" disabled={busy != null} onClick={() => void importFile()}>Import an audio file…</button>
    </section>
  </Dialog>
}
