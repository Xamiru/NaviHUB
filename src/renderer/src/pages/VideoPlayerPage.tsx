import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  CUE_SEEK_LEAD,
  buildTrack,
  cuesAt,
  filterDialogue,
  nextCue,
  prevCue,
  pickDefaultTracks,
  type CueTrack,
  type SubCue
} from '@shared/subtitles'
import type { VideoSource, VideoSourceKind, VideoSourceRef } from '@shared/types'
import {
  formatVideoStudyCue,
  parseWatchRange,
  type VideoStudyRange
} from '@shared/videoStudyRange'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { toast } from '../lib/toast'
import { pathForMedia } from '../lib/mediaConfig'
import { useCanGoBack } from '../lib/navState'
import { VIDEO_PLAYER_SHORTCUTS } from '../lib/shortcuts'
import {
  PLAYBACK_RATES,
  loadVideoPrefs,
  lookOf,
  saveVideoPrefs,
  type SubtitleLook,
  type VideoPrefs
} from '../lib/videoPrefs'
import { useSubtitleTrack } from '../lib/useSubtitleTrack'
import { readDecodeStats, silentDecodeFailure } from '../lib/videoDecodeStats'
import MiningPanel from '../components/reader/MiningPanel'
import ShortcutHelp from '../components/reader/ShortcutHelp'
import DecodePanel from '../components/video/DecodePanel'
import StyledSubtitleLayer from '../components/video/StyledSubtitleLayer'
import SubtitleOverlay, { type SubtitleWordPick } from '../components/video/SubtitleOverlay'
import TranscriptPanel from '../components/video/TranscriptPanel'
import VideoControls from '../components/video/VideoControls'

const EMPTY_TRACK: CueTrack = { cues: [], maxEnd: [] }
const KINDS: VideoSourceKind[] = ['file', 'wrestling', 'clip', 'football']
// Media seconds of playback before the watchdog judges the decode.
const WATCHDOG_GRACE_SECONDS = 1.5

function refFor(kind: string | undefined, idParam: string | undefined): VideoSourceRef | null {
  const id = Number(idParam)
  if (!Number.isInteger(id) || id <= 0 || !KINDS.includes(kind as VideoSourceKind)) return null
  if (kind === 'clip') return { kind: 'clip', clipId: id }
  if (kind === 'football') return { kind: 'football', mediaId: id }
  return { kind: kind as 'file' | 'wrestling', fileId: id }
}

// The in-app video player. Chrome-free (App.tsx renders it outside the shell),
// fed by /watch/:kind/:id. It plays the file itself off navimg:// with no
// conversion: main's decode verdict decides whether a <video> mounts at all,
// and a watchdog catches the two failures Chromium never reports (a blank
// HEVC picture, silent AC3/DTS audio). Either way the file is one click from
// the system player.
export default function VideoPlayerPage(): JSX.Element {
  const { kind, id } = useParams()
  const ref = useMemo(() => refFor(kind, id), [kind, id])
  const navigate = useNavigate()
  const canGoBack = useCanGoBack()

  const { data: source, error, isLoading } = useQuery({
    queryKey: qk.video.source(kind ?? '', Number(id)),
    queryFn: () => api.video.source(ref!),
    enabled: ref != null,
    staleTime: 0,
    retry: false
  })

  const fallbackPath = source
    ? source.mediaId && source.mediaType
      ? pathForMedia({ id: source.mediaId, mediaType: source.mediaType })
      : (source.backPath ?? '/')
    : '/'
  const exitPlayer = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen()
    if (canGoBack()) navigate(-1)
    else navigate(fallbackPath, { replace: true })
  }, [canGoBack, navigate, fallbackPath])

  const openExternal = useCallback(() => {
    if (!ref) return
    void api.video.openExternal(ref).catch((err: unknown) => {
      toast(err instanceof Error ? err.message : 'Could not open the system player', 'error')
    })
  }, [ref])

  if (!ref) {
    return (
      <DecodePanel
        title="Video"
        heading="Video unavailable"
        reason="This player link is not valid."
        onExternal={null}
        onBack={exitPlayer}
      />
    )
  }
  if (isLoading) {
    return (
      <div className="theme-dark flex h-screen items-center justify-center bg-black text-sm text-gray-400" role="status">
        Loading video…
      </div>
    )
  }
  if (!source) {
    return (
      <DecodePanel
        title="Video"
        heading="Video unavailable"
        reason={error instanceof Error ? error.message : 'That file is no longer available.'}
        onExternal={null}
        onBack={exitPlayer}
      />
    )
  }
  if (source.decode.verdict === 'unsupported') {
    return (
      <DecodePanel
        title={source.title}
        heading="This file plays in the system player"
        reason={source.decode.reason ?? 'This file cannot be decoded inside NaviHUB.'}
        onExternal={openExternal}
        onBack={exitPlayer}
      />
    )
  }
  return (
    <Player
      key={source.url}
      sourceRef={ref}
      source={source}
      onExit={exitPlayer}
      onExternal={openExternal}
    />
  )
}

function Player({
  sourceRef,
  source,
  onExit,
  onExternal
}: {
  sourceRef: VideoSourceRef
  source: VideoSource
  onExit: () => void
  onExternal: () => void
}): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const music = usePlayerControls()
  const isFileRef = sourceRef.kind === 'file' || sourceRef.kind === 'wrestling'

  // ---- prefs ----
  const [prefs, setPrefs] = useState<VideoPrefs>(() => loadVideoPrefs())
  const setLook = useCallback((patch: Partial<SubtitleLook>): void => {
    setPrefs((p) => {
      const next = { ...p, ...patch }
      saveVideoPrefs(next)
      return next
    })
  }, [])
  const look = useMemo(() => lookOf(prefs), [prefs])
  const setPref = useCallback(<K extends keyof VideoPrefs>(k: K, v: VideoPrefs[K]): void => {
    setPrefs((p) => {
      const next = { ...p, [k]: v }
      saveVideoPrefs(next)
      return next
    })
  }, [])

  // ---- element + clocks ----
  //
  // Three separate clocks on purpose. `timeRef` is frame-accurate and drives
  // subtitle sync and the range stop with ZERO renders; `activeCues` changes
  // only when the active set changes; `uiTime` is a coarse ~4 Hz mirror for
  // the scrubber and transcript highlight. One currentTime-in-state would
  // repaint a 1500-row transcript 4x a second and still show cues late.
  const videoRef = useRef<HTMLVideoElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef(0)
  const [uiTime, setUiTime] = useState(0)
  const [duration, setDuration] = useState(source.durationSeconds ?? 0)
  const [playing, setPlaying] = useState(false)
  const [buffered, setBuffered] = useState<{ start: number; end: number }[]>([])
  const [activeCues, setActiveCues] = useState<SubCue[]>([])
  const [activeSecondary, setActiveSecondary] = useState<SubCue[]>([])
  const [decodeFailure, setDecodeFailure] = useState<string | null>(null)

  // ---- study range (?start=&end=) ----
  const range = useMemo(
    () => parseWatchRange(searchParams, duration || source.durationSeconds),
    [searchParams, duration, source.durationSeconds]
  )
  const [loopRange, setLoopRange] = useState(false)
  const [rangeDone, setRangeDone] = useState(false)
  const rangeRef = useRef<{ range: VideoStudyRange | null; loop: boolean; done: boolean }>({
    range: null,
    loop: false,
    done: false
  })
  rangeRef.current = { range, loop: loopRange, done: rangeDone }

  // ---- subtitle tracks ----
  const tracks = source.subtitles
  const [primaryId, setPrimaryId] = useState<string | null>(null)
  const [secondaryId, setSecondaryId] = useState<string | null>(null)
  // Track ids are re-derived per file from the LANGUAGE preferences: an id from
  // one release means nothing in the next, so only the languages persist. The
  // key is the file plus its track ids, not the array: the source query
  // refetches on focus, and a refetch must not undo an explicit Off or a
  // second-track choice mid-playback.
  const trackSetKey = `${source.url}|${tracks.map((t) => t.id).join('|')}`
  useEffect(() => {
    const picked = pickDefaultTracks(tracks, {
      primary: prefs.primaryLang,
      secondary: prefs.secondaryLang
    })
    setPrimaryId(picked.primary?.id ?? null)
    setSecondaryId(picked.secondary?.id ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackSetKey])

  const primaryTrack = tracks.find((t) => t.id === primaryId) ?? null
  const secondaryTrack = tracks.find((t) => t.id === secondaryId) ?? null
  const primary = useSubtitleTrack(sourceRef, primaryTrack)
  const secondary = useSubtitleTrack(sourceRef, prefs.dualSubs ? secondaryTrack : null)
  const primaryCues = primary.cues
  const secondaryCues = secondary.cues

  // ---- styled ASS layer ----
  // An ASS primary track renders as authored while playing; the clickable
  // overlay takes the primary line whenever the layer is not drawing it.
  const [styledFailure, setStyledFailure] = useState<string | null>(null)
  const [styledReady, setStyledReady] = useState(false)
  useEffect(() => setStyledFailure(null), [primary.url])
  const styledUrl =
    prefs.styledSubs && prefs.subsOn && primaryTrack?.format === 'ass' && !styledFailure
      ? primary.url
      : null

  // The signs/songs filter is applied once, so the overlay, the ticks and the
  // transcript agree on what "the script" is.
  const shownPrimary = useMemo(() => {
    if (!primaryCues) return EMPTY_TRACK
    return prefs.dialogueOnly ? buildTrack(filterDialogue(primaryCues.cues)) : primaryCues
  }, [primaryCues, prefs.dialogueOnly])
  const shownSecondary = secondaryCues ?? EMPTY_TRACK

  // ---- frame-accurate cue sync and range stop ----
  const syncRef = useRef({ shownPrimary, shownSecondary, offset: 0, dual: true, subsOn: true })
  syncRef.current = {
    shownPrimary,
    shownSecondary,
    offset: prefs.subOffsetSec,
    dual: prefs.dualSubs,
    subsOn: prefs.subsOn
  }
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    let raf = 0
    let vfc = 0
    const sameIds = (a: SubCue[], b: SubCue[]): boolean =>
      a.length === b.length && a.every((c, i) => c.id === b[i].id)

    const tick = (): void => {
      timeRef.current = el.currentTime
      const r = rangeRef.current
      if (r.range && !r.done && !el.paused && el.currentTime >= r.range.end) {
        if (r.loop) {
          el.currentTime = r.range.start
        } else {
          el.pause()
          setRangeDone(true)
        }
      }
      const s = syncRef.current
      if (s.shownPrimary.cues.length > 0 || s.shownSecondary.cues.length > 0) {
        const t = el.currentTime + s.offset
        const nextPrimary = s.subsOn ? cuesAt(s.shownPrimary, t) : []
        const nextSecondary = s.subsOn && s.dual ? cuesAt(s.shownSecondary, t) : []
        setActiveCues((prev) => (sameIds(prev, nextPrimary) ? prev : nextPrimary))
        setActiveSecondary((prev) => (sameIds(prev, nextSecondary) ? prev : nextSecondary))
      }
      schedule()
    }
    const schedule = (): void => {
      if ('requestVideoFrameCallback' in el) {
        vfc = (
          el as HTMLVideoElement & { requestVideoFrameCallback: (cb: () => void) => number }
        ).requestVideoFrameCallback(tick)
      } else {
        raf = requestAnimationFrame(tick)
      }
    }
    schedule()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (vfc && 'cancelVideoFrameCallback' in el) {
        ;(el as HTMLVideoElement & { cancelVideoFrameCallback: (h: number) => void }).cancelVideoFrameCallback(vfc)
      }
    }
  }, [])

  // ---- element wiring ----
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.volume = prefs.volume
    el.muted = prefs.muted
    el.playbackRate = prefs.rate
  }, [prefs.volume, prefs.muted, prefs.rate])

  // ---- start position ----
  // A study range wins, then ?t= (a reload lands back on the spot), then the
  // stored resume position. Applied once, on the first loadedmetadata.
  const startedRef = useRef(false)
  const onLoadedMetadata = useCallback(
    (el: HTMLVideoElement) => {
      setDuration(el.duration || source.durationSeconds || 0)
      if (startedRef.current) return
      startedRef.current = true
      const fromUrl = Number(searchParams.get('t'))
      const r = parseWatchRange(searchParams, el.duration)
      const start = r
        ? r.start
        : Number.isFinite(fromUrl) && fromUrl > 0
          ? fromUrl
          : (source.resumeSeconds ?? 0)
      if (start > 1 || r) el.currentTime = start
    },
    [searchParams, source.durationSeconds, source.resumeSeconds]
  )

  // ---- progress autosave (library episodes and wrestling files only) ----
  // The debounce input is coarsened to 5 s buckets, and pause, seek, hide and
  // unmount all flush. A resume position is not progress: main never logs it.
  const pendingRef = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const endedRef = useRef(false)
  const flushProgress = useCallback(() => {
    const seconds = pendingRef.current
    pendingRef.current = null
    if (seconds == null || !isFileRef || endedRef.current) return
    void api.video.markProgress(sourceRef, seconds).catch(() => undefined)
  }, [isFileRef, sourceRef])

  // pendingRef follows every timeupdate, so a flush always writes the latest
  // position, even when the player is left inside the first 5-second bucket.
  const bucket = Math.floor(uiTime / 5)
  useEffect(() => {
    if (!isFileRef || uiTime <= 0) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(flushProgress, 800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [bucket, isFileRef, flushProgress]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onHide = (): void => {
      if (document.visibilityState === 'hidden') flushProgress()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      flushProgress()
      void qc.invalidateQueries({ queryKey: qk.video.all })
      if (sourceRef.kind === 'wrestling') void qc.invalidateQueries({ queryKey: qk.wrestling.all })
    }
  }, [flushProgress, qc, sourceRef.kind])

  // Keep ?t= in step so a reload lands on the spot; a study range keeps its
  // own parameters instead.
  useEffect(() => {
    if (uiTime <= 0 || range) return
    const next = new URLSearchParams(searchParams)
    next.set('t', String(bucket * 5))
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket])

  // ---- watched ----
  const [ended, setEnded] = useState(false)
  const markFinished = useCallback(async () => {
    if (!isFileRef || endedRef.current) return
    endedRef.current = true
    pendingRef.current = null
    await api.video.markWatched(sourceRef, true)
    // A finished file reopens from the start.
    await api.video.markProgress(sourceRef, null)
    if (sourceRef.kind === 'wrestling') {
      void qc.invalidateQueries({ queryKey: qk.wrestling.all })
    } else {
      void qc.invalidateQueries({ queryKey: qk.video.all })
      void qc.invalidateQueries({ queryKey: qk.media.all })
      void qc.invalidateQueries({ queryKey: qk.checklist.all })
    }
  }, [isFileRef, qc, sourceRef])

  // ---- transport ----
  const seekTo = useCallback(
    (t: number) => {
      const el = videoRef.current
      if (!el) return
      el.currentTime = Math.max(0, Math.min(t, el.duration || t))
      setUiTime(el.currentTime)
      // onSeeked flushes once the seek lands; a flush here would write on
      // every scrub step of the timeline.
      if (!endedRef.current) pendingRef.current = el.currentTime
    },
    []
  )
  const seekBy = useCallback((d: number) => seekTo(timeRef.current + d), [seekTo])

  const play = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    if (rangeRef.current.range && rangeRef.current.done) {
      setRangeDone(false)
      el.currentTime = rangeRef.current.range.start
    }
    void el.play().catch(() => undefined)
  }, [])
  const pause = useCallback(() => videoRef.current?.pause(), [])
  const togglePlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) play()
    else el.pause()
  }, [play])

  const replayRange = useCallback(() => {
    const r = rangeRef.current.range
    if (!r) return
    setRangeDone(false)
    seekTo(r.start)
    void videoRef.current?.play().catch(() => undefined)
  }, [seekTo])

  // ---- music and the OS media session ----
  // Music pauses (not stops) when the video starts, so a 30-second clip does
  // not cost the queue. While mounted, this page owns the media keys.
  const pauseMusic = useCallback(() => {
    if (music.isPlaying) music.toggle()
  }, [music])
  const transportRef = useRef({ play, pause, seekTo, seekBy })
  transportRef.current = { play, pause, seekTo, seekBy }
  const { claimMediaSession } = music
  useEffect(() => {
    claimMediaSession({
      title: source.title,
      artist: source.seriesTitle ?? '',
      playing,
      play: () => transportRef.current.play(),
      pause: () => transportRef.current.pause(),
      seekTo: (s) => transportRef.current.seekTo(s),
      seekBy: (d) => transportRef.current.seekBy(d)
    })
  }, [claimMediaSession, source.title, source.seriesTitle, playing])
  useEffect(() => () => claimMediaSession(null), [claimMediaSession])

  const cueStep = useCallback(
    (dir: -1 | 1) => {
      const track = syncRef.current.shownPrimary
      if (track.cues.length === 0) return
      const t = timeRef.current + syncRef.current.offset
      const target = dir === 1 ? nextCue(track, t) : prevCue(track, t)
      if (target) seekTo(Math.max(0, target.start - CUE_SEEK_LEAD - syncRef.current.offset))
    },
    [seekTo]
  )
  const replayCue = useCallback(() => {
    const active = activeCues[0]
    if (active) seekTo(Math.max(0, active.start - CUE_SEEK_LEAD - prefs.subOffsetSec))
  }, [activeCues, prefs.subOffsetSec, seekTo])

  const toggleFullscreen = useCallback(() => {
    // Fullscreen the whole row, never the <video>, so the mining panel and the
    // transcript stay reachable.
    if (document.fullscreenElement) void document.exitFullscreen()
    else void rootRef.current?.requestFullscreen().catch(() => undefined)
  }, [])

  // ---- panels ----
  const [panelOpen, setPanelOpen] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(prefs.transcriptOpen)
  const [helpOpen, setHelpOpen] = useState(false)
  const [blockText, setBlockText] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  const [mineLang, setMineLang] = useState<'ja' | 'en' | 'other'>('ja')
  const [menuOpen, setMenuOpen] = useState(false)
  const [attach, setAttach] = useState<{ imagePath: string | null; audioPath: string | null } | null>(
    null
  )
  const hasSubs = tracks.length > 0

  const openMining = useCallback(
    (text: string | null, term: string | null, lang: 'ja' | 'en' | 'other' = 'ja') => {
      setBlockText(text)
      setSelectedTerm(term)
      setMineLang(lang)
      setAttach(null)
      setPanelOpen(true)
      if (prefs.autoPauseOnMine) videoRef.current?.pause()
    },
    [prefs.autoPauseOnMine]
  )
  const onWordPick = useCallback(
    (pick: SubtitleWordPick) => openMining(pick.cueText, pick.term, pick.lang),
    [openMining]
  )

  // ---- capture (frame + sentence audio) ----
  // The frame comes from the renderer's own canvas. It only works because the
  // navimg protocol sends access-control-allow-origin and the <video> carries
  // crossOrigin="anonymous"; without both the canvas is tainted.
  const capture = useCallback(async () => {
    const el = videoRef.current
    const cue = activeCues[0] ?? null
    openMining(cue?.text ?? null, null, primaryTrack?.lang ?? 'ja')
    let imagePath: string | null = null
    if (el && el.videoWidth > 0) {
      try {
        const scale = Math.min(1, 1280 / el.videoWidth)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(el.videoWidth * scale)
        canvas.height = Math.round(el.videoHeight * scale)
        canvas.getContext('2d')?.drawImage(el, 0, 0, canvas.width, canvas.height)
        const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.82))
        if (blob) {
          imagePath = await api.files.saveBytes(new Uint8Array(await blob.arrayBuffer()), 'jpg', 'mining')
        }
      } catch {
        toast('Could not read this frame for the card.', 'error')
      }
    }
    // The clip is a bonus: without ffmpeg the card keeps its frame and text.
    let audioPath: string | null = null
    if (cue) {
      audioPath =
        (await api.video.clipAudio({ ref: sourceRef, startSec: cue.start, endSec: cue.end }))
          ?.audioPath ?? null
    }
    setAttach({ imagePath, audioPath })
  }, [activeCues, openMining, primaryTrack?.lang, sourceRef])

  // pauseOnHover only ever resumes a video IT paused.
  const hoverPausedRef = useRef(false)
  const onHoverStart = useCallback(() => {
    const el = videoRef.current
    if (!prefs.pauseOnHover || !el || el.paused) return
    hoverPausedRef.current = true
    el.pause()
  }, [prefs.pauseOnHover])
  const onHoverEnd = useCallback(() => {
    if (!hoverPausedRef.current) return
    hoverPausedRef.current = false
    void videoRef.current?.play().catch(() => undefined)
  }, [])

  // ---- auto-hiding bars ----
  // They stay up while paused, while a menu is open, while the pointer is over
  // a bar, and while one of their controls has KEYBOARD focus
  // (has-[:focus-visible] on the bars). A mouse click leaves ordinary focus on
  // a button, which must not pin the bars, or fullscreen never clears.
  const [barsVisible, setBarsVisible] = useState(true)
  const barsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const keepBarRef = useRef(false)
  const [overBar, setOverBar] = useState(false)
  keepBarRef.current = menuOpen || !playing || overBar
  const pokeBar = useCallback(() => {
    setBarsVisible(true)
    if (barsTimer.current) clearTimeout(barsTimer.current)
    barsTimer.current = setTimeout(() => {
      if (!keepBarRef.current) setBarsVisible(false)
    }, 2500)
  }, [])
  useEffect(() => {
    pokeBar()
    return () => {
      if (barsTimer.current) clearTimeout(barsTimer.current)
    }
  }, [pokeBar])
  useEffect(() => {
    if (!playing) setBarsVisible(true)
  }, [playing])
  useEffect(() => {
    if (!overBar) pokeBar()
  }, [overBar, pokeBar])
  // Entering or leaving fullscreen restarts the hide timer.
  useEffect(() => {
    document.addEventListener('fullscreenchange', pokeBar)
    return () => document.removeEventListener('fullscreenchange', pokeBar)
  }, [pokeBar])
  // Only a pointer that really moved counts as activity. Chromium can deliver
  // mousemove when the content under a resting cursor changes (bars fading,
  // subtitles appearing), which would keep waking the bars and the cursor.
  const lastPointer = useRef<{ x: number; y: number } | null>(null)
  const onPointerActivity = useCallback(
    (e: ReactMouseEvent) => {
      const last = lastPointer.current
      lastPointer.current = { x: e.screenX, y: e.screenY }
      if (last && last.x === e.screenX && last.y === e.screenY) return
      pokeBar()
    },
    [pokeBar]
  )
  const barHover = {
    onMouseEnter: () => setOverBar(true),
    onMouseLeave: () => setOverBar(false)
  }

  // ---- neighbours ----
  const goToFile = useCallback(
    (fileId: number) => {
      flushProgress()
      // replace: a whole binge stays ONE history entry, so Back lands on the
      // page the player was opened from.
      navigate(`/watch/${sourceRef.kind}/${fileId}`, { replace: true })
    },
    [flushProgress, navigate, sourceRef.kind]
  )

  // ---- watchdog ----
  const watchRef = useRef<{ from: number | null; judged: boolean }>({ from: null, judged: false })
  const judgeDecode = useCallback(
    (el: HTMLVideoElement) => {
      const w = watchRef.current
      if (w.judged || w.from == null || el.currentTime - w.from < WATCHDOG_GRACE_SECONDS) return
      w.judged = true
      const failure = silentDecodeFailure({
        videoWidth: el.videoWidth,
        hasAudio: source.hasAudio,
        stats: readDecodeStats(el)
      })
      if (failure) {
        el.pause()
        setDecodeFailure(failure)
      }
    },
    [source.hasAudio]
  )

  // ---- keyboard ----
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      if (helpOpen || e.defaultPrevented) return
      const t = e.target as HTMLElement
      if (
        t instanceof HTMLInputElement ||
        t instanceof HTMLTextAreaElement ||
        t instanceof HTMLSelectElement ||
        t.isContentEditable
      ) {
        return
      }
      if (e.metaKey || e.altKey) return
      if (e.ctrlKey && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const el = videoRef.current
      pokeBar()
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          return
        case 'ArrowRight':
          e.preventDefault()
          if (e.ctrlKey) cueStep(1)
          else seekBy(e.shiftKey ? 1 : 5)
          return
        case 'ArrowLeft':
          e.preventDefault()
          if (e.ctrlKey) cueStep(-1)
          else seekBy(e.shiftKey ? -1 : -5)
          return
        case 'a':
          cueStep(-1)
          return
        case 'd':
          cueStep(1)
          return
        case 'r':
          replayCue()
          return
        case 'R':
          replayRange()
          return
        case 'L':
          if (range) setLoopRange((v) => !v)
          return
        case 'j':
          seekBy(-10)
          return
        case 'l':
          seekBy(10)
          return
        case ',':
          if (el?.paused) seekBy(-0.042)
          return
        case '.':
          if (el?.paused) seekBy(0.042)
          return
        case 'ArrowUp':
          e.preventDefault()
          setPref('volume', Math.min(1, prefs.volume + 0.05))
          setPref('muted', false)
          return
        case 'ArrowDown':
          e.preventDefault()
          setPref('volume', Math.max(0, prefs.volume - 0.05))
          return
        case 'M':
          setPref('muted', !prefs.muted)
          return
        case '[': {
          const i = PLAYBACK_RATES.indexOf(prefs.rate as (typeof PLAYBACK_RATES)[number])
          setPref('rate', PLAYBACK_RATES[Math.max(0, (i === -1 ? 3 : i) - 1)])
          return
        }
        case ']': {
          const i = PLAYBACK_RATES.indexOf(prefs.rate as (typeof PLAYBACK_RATES)[number])
          setPref('rate', PLAYBACK_RATES[Math.min(PLAYBACK_RATES.length - 1, (i === -1 ? 3 : i) + 1)])
          return
        }
        case '\\':
          setPref('rate', 1)
          return
        case 's':
          setPref('subsOn', !prefs.subsOn)
          return
        case 'b':
          setPref('dualSubs', !prefs.dualSubs)
          return
        case 'S': {
          const idx = tracks.findIndex((x) => x.id === primaryId)
          setPrimaryId(tracks.length ? tracks[(idx + 1) % tracks.length].id : null)
          return
        }
        case '-':
          setPref('subOffsetSec', Number((prefs.subOffsetSec - 0.1).toFixed(2)))
          return
        case '=':
          setPref('subOffsetSec', Number((prefs.subOffsetSec + 0.1).toFixed(2)))
          return
        case 't':
          if (!hasSubs) return
          setTranscriptOpen((v) => {
            setPref('transcriptOpen', !v)
            return !v
          })
          return
        case 'm':
          if (hasSubs) setPanelOpen((v) => !v)
          return
        case 'c':
          if (hasSubs) void capture()
          return
        case 'f':
          toggleFullscreen()
          return
        case 'o':
          el?.pause()
          onExternal()
          return
        case '?':
          setHelpOpen(true)
          return
        case 'n':
          if (source.next) goToFile(source.next.fileId)
          return
        case 'p':
          if (source.prev) goToFile(source.prev.fileId)
          return
        case 'Home':
          seekTo(range?.start ?? 0)
          return
        case 'End':
          if (el?.duration) seekTo(el.duration - 1)
          return
        case 'Escape':
        case 'Backspace':
          // Fullscreen goes FIRST and checks the real state, so one press never
          // both leaves fullscreen and closes a panel.
          if (document.fullscreenElement) void document.exitFullscreen()
          else if (menuOpen) setMenuOpen(false)
          else if (transcriptOpen) setTranscriptOpen(false)
          else if (panelOpen) setPanelOpen(false)
          else onExit()
          return
        default:
          if (/^[0-9]$/.test(e.key) && el?.duration) seekTo((Number(e.key) / 10) * el.duration)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [
    capture,
    cueStep,
    goToFile,
    hasSubs,
    helpOpen,
    menuOpen,
    onExit,
    onExternal,
    panelOpen,
    pokeBar,
    prefs,
    primaryId,
    range,
    replayCue,
    replayRange,
    seekBy,
    seekTo,
    setPref,
    source.next,
    source.prev,
    toggleFullscreen,
    togglePlay,
    tracks,
    transcriptOpen
  ])

  if (decodeFailure) {
    return (
      <DecodePanel
        title={source.title}
        heading="This file plays in the system player"
        reason={decodeFailure}
        onExternal={onExternal}
        onBack={onExit}
      />
    )
  }

  const activeCueId = activeCues[0]?.id ?? null
  // libass draws the primary track only while playing with no mining panel
  // open; pausing hands the line to the clickable overlay for mining.
  const styledDrawing = styledUrl != null && styledReady && playing && !panelOpen
  const showTranscript = hasSubs && transcriptOpen

  return (
    <div
      ref={rootRef}
      // Hidden bars hide the cursor too, on every descendant, so an element
      // with its own cursor (a subtitle word) cannot bring it back.
      className={`theme-dark flex h-screen bg-black ${
        barsVisible ? '' : 'cursor-none [&_*]:!cursor-none'
      }`}
      onMouseMove={onPointerActivity}
    >
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div
          {...barHover}
          className={`media-contrast absolute inset-x-0 top-0 z-30 flex items-center gap-3 bg-base-900/90 px-4 py-2 backdrop-blur transition-opacity duration-300 has-[:focus-visible]:pointer-events-auto has-[:focus-visible]:opacity-100 ${
            barsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <button type="button" className="btn-ghost px-3 py-1 text-sm" onClick={onExit}>
            ← Back
          </button>
          <h1 className="min-w-0 flex-1 truncate text-sm font-normal text-gray-200">
            {source.seriesTitle ? `${source.seriesTitle} · ` : ''}
            {source.title}
          </h1>
          {range && (
            <div className="flex shrink-0 items-center gap-2 text-xs text-gray-300">
              <span className="chip">{formatVideoStudyCue(range)}</span>
              <button
                type="button"
                className="btn-ghost px-2 py-0.5 text-xs"
                title="Replay the study range (Shift+R)"
                onClick={replayRange}
              >
                Replay range
              </button>
              <button
                type="button"
                className={`btn-ghost px-2 py-0.5 text-xs ${loopRange ? 'text-accent' : ''}`}
                title="Loop the study range (Shift+L)"
                aria-pressed={loopRange}
                onClick={() => setLoopRange((v) => !v)}
              >
                Loop
              </button>
            </div>
          )}
        </div>

        {/* A single click on the picture does nothing (it only wakes the bars);
            a double-click toggles fullscreen. Play/pause lives on Space/K, the
            Play button and the media keys. */}
        <div className="relative min-h-0 flex-1" onClick={pokeBar} onDoubleClick={toggleFullscreen}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full bg-black object-contain"
            src={source.url}
            crossOrigin="anonymous"
            preload="metadata"
            playsInline
            autoPlay
            aria-label={source.title}
            onPlay={() => {
              setPlaying(true)
              pauseMusic()
            }}
            onPlaying={(e) => {
              if (watchRef.current.from == null) watchRef.current.from = e.currentTarget.currentTime
            }}
            onPause={() => {
              setPlaying(false)
              flushProgress()
            }}
            onLoadedMetadata={(e) => onLoadedMetadata(e.currentTarget)}
            onTimeUpdate={(e) => {
              setUiTime(e.currentTarget.currentTime)
              if (!endedRef.current) pendingRef.current = e.currentTarget.currentTime
              judgeDecode(e.currentTarget)
            }}
            onSeeked={flushProgress}
            onProgress={(e) => {
              const b = e.currentTarget.buffered
              setBuffered(Array.from({ length: b.length }, (_, i) => ({ start: b.start(i), end: b.end(i) })))
            }}
            onError={(e) =>
              setDecodeFailure(
                e.currentTarget.error?.message
                  ? `This file could not be played inside NaviHUB (${e.currentTarget.error.message}).`
                  : 'This file could not be played inside NaviHUB.'
              )
            }
            onEnded={() => {
              setEnded(true)
              void markFinished()
            }}
          />

          {styledUrl && (
            <StyledSubtitleLayer
              key={`${styledUrl}|${prefs.dialogueOnly}`}
              videoRef={videoRef}
              sourceRef={sourceRef}
              trackUrl={styledUrl}
              dialogueOnly={prefs.dialogueOnly}
              visible={styledDrawing}
              scale={prefs.scale}
              offsetSec={prefs.subOffsetSec}
              onReady={setStyledReady}
              onFailure={setStyledFailure}
            />
          )}

          {prefs.subsOn && hasSubs && (
            <SubtitleOverlay
              primary={activeCues}
              secondary={prefs.dualSubs ? activeSecondary : null}
              primaryLang={primaryTrack?.lang ?? 'other'}
              secondaryLang={secondaryTrack?.lang ?? 'other'}
              look={look}
              showPrimary={!styledDrawing}
              barsVisible={barsVisible}
              onWordPick={onWordPick}
              onTextSelect={(text, cue, lang) => openMining(cue.text, text, lang)}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          )}

          {rangeDone && range && !loopRange && (
            <div
              className="media-contrast absolute left-1/2 top-16 z-20 -translate-x-1/2 rounded bg-base-900/90 px-4 py-2 text-sm text-gray-200"
              role="status"
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              Range finished.{' '}
              <button type="button" className="btn-ghost px-2 py-0.5 text-xs" onClick={replayRange}>
                Replay range
              </button>
            </div>
          )}

          {ended && (
            <div
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/85"
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <p className="text-sm text-gray-300" role="status">
                Finished {source.title}
              </p>
              {source.next ? (
                <button type="button" className="btn-primary" onClick={() => goToFile(source.next!.fileId)}>
                  Next: {source.next.title}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setEnded(false)
                    endedRef.current = false
                    seekTo(0)
                    void videoRef.current?.play().catch(() => undefined)
                  }}
                >
                  Play again
                </button>
              )}
              <button type="button" className="btn-ghost" onClick={onExit}>
                ← Back
              </button>
            </div>
          )}
        </div>

        <VideoControls
          playing={playing}
          time={uiTime}
          duration={duration || source.durationSeconds || 0}
          buffered={buffered}
          cues={shownPrimary.cues}
          volume={prefs.volume}
          muted={prefs.muted}
          rate={prefs.rate}
          tracks={tracks}
          primaryId={primaryId}
          secondaryId={secondaryId}
          subsOn={prefs.subsOn}
          dualSubs={prefs.dualSubs}
          dialogueOnly={prefs.dialogueOnly}
          subOffsetSec={prefs.subOffsetSec}
          extracting={primary.extracting || secondary.extracting}
          trackError={primary.error ?? secondary.error}
          transcriptOpen={showTranscript}
          miningOpen={panelOpen}
          hasPrev={!!source.prev}
          hasNext={!!source.next}
          visible={barsVisible}
          hoverHandlers={barHover}
          onToggle={togglePlay}
          onSeek={seekTo}
          onPrevEpisode={() => source.prev && goToFile(source.prev.fileId)}
          onNextEpisode={() => source.next && goToFile(source.next.fileId)}
          onVolume={(v) => {
            setPref('volume', v)
            if (v > 0) setPref('muted', false)
          }}
          onMute={() => setPref('muted', !prefs.muted)}
          onRate={(r) => setPref('rate', r)}
          onPickTrack={(slot, trackId) => {
            const track = tracks.find((x) => x.id === trackId) ?? null
            if (slot === 'primary') {
              setPrimaryId(trackId)
              if (track) setPref('primaryLang', track.lang)
            } else {
              setSecondaryId(trackId)
              if (track) setPref('secondaryLang', track.lang)
            }
          }}
          onToggleSubs={() => setPref('subsOn', !prefs.subsOn)}
          onToggleDual={() => setPref('dualSubs', !prefs.dualSubs)}
          onDialogueOnly={(on) => setPref('dialogueOnly', on)}
          onSubOffset={(d) => setPref('subOffsetSec', Number((prefs.subOffsetSec + d).toFixed(2)))}
          onTranscript={() => {
            setTranscriptOpen(!transcriptOpen)
            setPref('transcriptOpen', !transcriptOpen)
          }}
          onMine={() => setPanelOpen(!panelOpen)}
          onCapture={() => void capture()}
          onFullscreen={toggleFullscreen}
          onExternal={() => {
            videoRef.current?.pause()
            onExternal()
          }}
          onHelp={() => setHelpOpen(true)}
          onMenuOpenChange={setMenuOpen}
          look={look}
          styledSubs={prefs.styledSubs}
          styledStatus={styledFailure}
          onLook={setLook}
          onStyledSubs={(on) => {
            setStyledFailure(null)
            setPref('styledSubs', on)
          }}
        />
      </div>

      {showTranscript && (
        <TranscriptPanel
          track={primaryCues ?? null}
          secondary={secondaryCues ?? null}
          showSecondary={prefs.dualSubs}
          dialogueOnly={prefs.dialogueOnly}
          activeCueId={activeCueId}
          onSeek={(cue) => {
            seekTo(Math.max(0, cue.start - CUE_SEEK_LEAD - prefs.subOffsetSec))
            void videoRef.current?.play().catch(() => undefined)
          }}
          onMineCue={(cue) => openMining(cue.text, null, primaryTrack?.lang ?? 'ja')}
          onClose={() => {
            setTranscriptOpen(false)
            setPref('transcriptOpen', false)
          }}
        />
      )}

      {panelOpen && (
        <MiningPanel
          mediaId={source.mediaId}
          blockText={blockText}
          initialTerm={selectedTerm}
          attach={attach}
          lang={mineLang}
          onClose={() => setPanelOpen(false)}
        />
      )}

      {helpOpen && (
        <ShortcutHelp
          title="Video player shortcuts"
          rows={VIDEO_PLAYER_SHORTCUTS}
          onClose={() => setHelpOpen(false)}
        />
      )}
    </div>
  )
}
