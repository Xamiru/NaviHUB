import { rankMusicSources } from '@shared/musicSourceMatch'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicSpotifyDownloadCandidate, MusicTrack } from '@shared/types'
import Dialog from './Dialog'
import { Field } from './Field'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useDebouncedValue } from '../lib/hooks'
import { usePlayerControls } from '../lib/player'
import { musicTrackToPlayerTrack } from '../lib/musicTracks'
import { formatDuration } from './MusicTrackRow'

export default function SpotifyTrackRecoveryDialog({ sourceKind, trackId, title, artist,
  duration, candidate, initialUrl = '', onClose
}: {
  sourceKind: 'playlistItem' | 'entityTrack'
  trackId: number
  title: string
  artist: string
  duration: number | null
  candidate?: MusicSpotifyDownloadCandidate | null
  initialUrl?: string
  onClose: () => void
}) {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const [query, setQuery] = useState(`${artist} ${title}`)
  const [submitted, setSubmitted] = useState('')
  const [url, setUrl] = useState(initialUrl)
  const [localQuery, setLocalQuery] = useState('')
  const localSearch = useDebouncedValue(localQuery)
  const [picked, setPicked] = useState<MusicTrack | null>(null)
  const previewRequest = useRef(0)
  useEffect(() => () => { previewRequest.current++ }, [sourceKind, trackId])
  const [startNow, setStartNow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [checkingSource, setCheckingSource] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const remote = useQuery({ queryKey: qk.music.spotifyAudioSearch(submitted),
    queryFn: () => api.music.spotifySearchAudio(submitted), enabled: Boolean(submitted) })
  const local = useQuery({ queryKey: qk.music.search(localSearch),
    queryFn: () => api.music.search(localSearch), enabled: Boolean(localSearch.trim()) })
  const uniqueLocalTracks = useMemo(() => {
    const seen = new Set<string>()
    return (local.data?.tracks ?? []).filter((track) => {
      const normalized = (value: string) => value.normalize('NFKC').toLocaleLowerCase()
        .replace(/[\p{P}\p{S}]+/gu, ' ').replace(/\s+/g, ' ').trim()
      const key = [normalized(track.title), normalized(track.tagArtist ?? track.artistName),
        normalized(track.albumTitle), track.duration == null ? '?' : Math.round(track.duration)].join('\n')
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  }, [local.data])
  async function action(fn: () => Promise<unknown>, close = true, invalidate = true) {
    setBusy(true)
    setError(null)
    try {
      await fn()
      const refresh = invalidate ? qc.invalidateQueries({ queryKey: qk.music.all }) : Promise.resolve()
      if (close) void refresh
      else await refresh
      if (close) onClose()
    } catch (error) { setError(error instanceof Error ? error.message : String(error)) }
    finally { setBusy(false) }
  }
  const previewLocal = (track: MusicTrack) => { previewRequest.current++; player.playQueue([musicTrackToPlayerTrack(track)], 0) }
  const saveSource = async (source: string) => {
    setCheckingSource(source)
    try {
      await action(() => api.music.spotifySetTrackDownloadOptions({
        sourceKind, trackId, audioSourceUrl: source, approveSource: true, startNow
      }))
    } finally { setCheckingSource(null) }
  }
  const compare = (track: MusicTrack) => <div className="space-y-2 rounded border border-base-600 p-3">
    <p className="text-sm text-gray-200">{track.title} · {track.tagArtist ?? track.artistName}</p>
    <p className="text-xs text-gray-400">{track.albumTitle} · {formatDuration(track.duration)}
      {duration != null && track.duration != null && ` · ${Math.round(track.duration - duration)}s difference`}</p>
    <p className="break-all text-xs text-gray-400">{track.filePath}</p>
    <button className="btn-ghost" onClick={() => previewLocal(track)}>Listen to local file</button>
  </div>
  return <Dialog labelledBy="spotify-recovery-title" onClose={onClose}
    panelClassName="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-lg bg-base-800 p-5 shadow-xl">
    <div className="mb-4 flex justify-between gap-3">
      <div><h2 id="spotify-recovery-title" className="text-lg font-semibold">Resolve this song</h2>
        <p className="text-sm text-gray-300">{title} · {artist} · expected {formatDuration(duration)}</p></div>
      <button className="btn-ghost" aria-label="Close" onClick={onClose}>✕</button>
    </div>
    {error && <p role="alert" className="mb-3 text-sm text-red-300">{error}</p>}
    {checkingSource && <p role="status" className="mb-3 text-sm text-gray-300">Checking source…</p>}
    {candidate && <section className="mb-5 space-y-2" aria-label="Downloaded candidate">
      <p className="text-sm text-gray-300">Compare and listen before confirming this downloaded version.</p>
      {compare(candidate.localTrack)}
      {candidate.sourceUrl && <button className="btn-ghost" onClick={() => api.app.openExternal(candidate.sourceUrl!)}>Open audio source</button>}
      <button className="btn-primary" disabled={busy} onClick={() => void action(() => api.music.spotifyConfirmDownloadCandidate({ sourceKind, trackId }))}>Confirm this recording</button>
      <button className="btn-ghost" disabled={busy} onClick={() => void action(() => api.music.spotifyRejectDownloadCandidate({ sourceKind, trackId }))}>Reject downloaded version</button>
    </section>}
    <section className="mb-5 space-y-2" aria-label="Find audio">
      <Field label="Search YouTube"><input className="input w-full" value={query} onChange={(e) => setQuery(e.target.value)} /></Field>
      <button className="btn-ghost" disabled={remote.isFetching || !query.trim()} onClick={() => {
        if (submitted === query.trim()) void remote.refetch()
        else setSubmitted(query.trim())
      }}>{remote.isFetching ? 'Searching…' : 'Find audio'}</button>
      {remote.error && <p role="alert" className="text-sm text-red-300">Search failed. Retry or paste a source below.</p>}
      {remote.data?.length === 0 && <p className="text-sm text-gray-400">No results. Try another search.</p>}
      {rankMusicSources({ title, artist, duration }, remote.data ?? []).map((result) => <div key={result.url} className="rounded border border-base-600 p-3">
        <p className="text-sm">{result.title}</p><p className="text-xs text-gray-400">{result.channel} · {formatDuration(result.duration)}</p>
        <p className="mt-1 text-xs text-gray-400">{result.assessment.strong ? 'Title, artist and duration agree' : result.assessment.reasons.join('; ')}</p>
        <div className="mt-2 flex flex-wrap gap-2"><button className="btn-ghost" disabled={busy} onClick={() => void action(async () => {
          const request = ++previewRequest.current
          const audioUrl = await api.music.spotifyPreviewAudio(result.url)
          if (previewRequest.current !== request) return
          player.playQueue([{ id: `file-preview-${result.url}`, title: result.title, subtitle: result.channel,
            audioUrl, mediaId: null }], 0)
        }, false, false)}>Listen</button>
        <button className="btn-ghost" onClick={() => api.app.openExternal(result.url)}>Open video</button>
        <button className="btn-primary" disabled={busy} onClick={() => void saveSource(result.url)}>{checkingSource === result.url ? 'Checking source…' : 'Use this version'}</button></div>
      </div>)}
      <Field label="Exact YouTube video URL"><input className="input w-full" value={url} onChange={(e) => setUrl(e.target.value)} /></Field>
      <button className="btn-ghost" disabled={busy || !url.trim()} onClick={() => void saveSource(url)}>{checkingSource === url ? 'Checking source…' : 'Use this version'}</button>
      <Field label="Start this download now"><input type="checkbox" checked={startNow} onChange={(event) => setStartNow(event.target.checked)} /></Field>
      <p className="text-xs text-gray-400">Use this version approves this exact source and adds it to Downloads. Broader automatic matches still need review.</p>
      <button className="btn-ghost" disabled={busy} onClick={() => void action(() => api.music.spotifySetTrackDownloadOptions({ sourceKind, trackId, allowUnverified: true }))}>Try broader matching on retry</button>
    </section>
    {<section className="space-y-2" aria-label="Choose local recording">
      <Field label="Search the whole local library"><input className="input w-full" value={localQuery} onChange={(e) => setLocalQuery(e.target.value)} /></Field>
      {uniqueLocalTracks.slice(0, 12).map((track) => <button key={track.id} className="btn-ghost block w-full text-left" onClick={() => setPicked(track)}>{track.title} · {track.artistName} · {formatDuration(track.duration)}</button>)}
      <button className="btn-ghost" disabled={busy} onClick={() => void action(async () => setPicked(await api.music.spotifyPickLocalAudio()), false)}>Choose a file to copy into the library</button>
      {picked && <>{compare(picked)}<p className="text-xs text-gray-400">This explicitly overrides automatic matching and is remembered across scans.</p>
        <button className="btn-primary" disabled={busy} onClick={() => void action(() => api.music.spotifyMatchPlaylistItem({ sourceKind, itemId: trackId, trackId: picked.id, confirm: true }))}>Confirm this local recording</button></>}
    </section>}
  </Dialog>
}
