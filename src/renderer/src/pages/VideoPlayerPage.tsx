import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import type { VideoSourceRef, VideoSubtitleTrack } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayer } from '../lib/player'
import { toast } from '../lib/toast'
import { pathForMedia } from '../lib/mediaConfig'
import {
  DEFAULT_VIDEO_PREFS,
  PLAYBACK_RATES,
  loadVideoPrefs,
  saveVideoPrefs,
  type VideoPrefs
} from '../lib/videoPrefs'
import { useSubtitleTrack } from '../lib/useSubtitleTrack'
import MiningPanel from '../components/reader/MiningPanel'
import PreparePanel from '../components/video/PreparePanel'
import SubtitleOverlay, { type SubtitleWordPick } from '../components/video/SubtitleOverlay'
import TranscriptPanel from '../components/video/TranscriptPanel'
import VideoControls from '../components/video/VideoControls'

const EMPTY_TRACK: CueTrack = { cues: [], maxEnd: [] }

// The local video player. Chrome-free (App.tsx renders it outside the shell)
// and SOURCE-AGNOSTIC: it speaks only VideoSource, so a library episode and an
// ad-hoc "open this file" session drive exactly the same page. Every
// persistence path is guarded on `fileId`, so an ad-hoc session simply saves
// nothing — mining still works fully, since MiningPanel already accepts a null
// mediaId.
export default function VideoPlayerPage({
  refKind = 'file'
}: {
  // Both /watch/file/:fileId and /watch/wrestling/:fileId fill the same param,
  // so the route has to say which table the id belongs to.
  refKind?: 'file' | 'wrestling'
} = {}): JSX.Element {
  const { fileId: fileIdParam, token } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const qc = useQueryClient()
  const player = usePlayer()

  const ref: VideoSourceRef = fileIdParam
    ? { kind: refKind, fileId: Number(fileIdParam) }
    : { kind: 'adhoc', token: token ?? '' }

  const { data: source, isLoading } = useQuery({
    queryKey: qk.video.source(ref.kind, String(fileIdParam ?? token)),
    queryFn: () => api.video.source(ref),
    staleTime: 0
  })

  // ---- prefs ----
  const [prefs, setPrefs] = useState<VideoPrefs>(() => loadVideoPrefs())
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
  // subtitle sync with ZERO renders; `activeCues` changes only when the active
  // set changes, so the overlay repaints once per cue rather than 60× a second;
  // `uiTime` is a coarse 4Hz mirror for the scrubber and transcript highlight.
  // A single currentTime-in-state would repaint a 1500-row transcript 4×/s and
  // still put cues on screen up to 250ms late (timeupdate fires at ~4Hz).
  const videoRef = useRef<HTMLVideoElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef(0)
  const [uiTime, setUiTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [buffered, setBuffered] = useState<{ start: number; end: number }[]>([])
  const [activeCues, setActiveCues] = useState<SubCue[]>([])
  const [activeSecondary, setActiveSecondary] = useState<SubCue[]>([])

  // ---- subtitle tracks ----
  const tracks = useMemo(() => source?.subtitles ?? [], [source])
  const [primaryId, setPrimaryId] = useState<string | null>(null)
  const [secondaryId, setSecondaryId] = useState<string | null>(null)
  // Track IDs are re-derived per file from the LANGUAGE preferences: an id from
  // one release means nothing in the next, so only the languages persist.
  useEffect(() => {
    const picked = pickDefaultTracks(tracks, {
      primary: prefs.primaryLang,
      secondary: prefs.secondaryLang
    })
    setPrimaryId(picked.primary?.id ?? null)
    setSecondaryId(picked.secondary?.id ?? null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tracks])

  const primaryTrack = tracks.find((t) => t.id === primaryId) ?? null
  const secondaryTrack = tracks.find((t) => t.id === secondaryId) ?? null
  const { data: primaryCues } = useSubtitleTrack(primaryTrack)
  const { data: secondaryCues } = useSubtitleTrack(secondaryTrack)

  // The signs/songs filter is applied here, once, so the overlay, the ticks and
  // the transcript all agree on what "the script" is.
  const shownPrimary = useMemo(() => {
    if (!primaryCues) return EMPTY_TRACK
    return prefs.dialogueOnly ? buildTrack(filterDialogue(primaryCues.cues)) : primaryCues
  }, [primaryCues, prefs.dialogueOnly])
  const shownSecondary = secondaryCues ?? EMPTY_TRACK

  // ---- frame-accurate cue sync ----
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
      const s = syncRef.current
      const t = el.currentTime + s.offset
      const nextPrimary = s.subsOn ? cuesAt(s.shownPrimary, t) : []
      const nextSecondary = s.subsOn && s.dual ? cuesAt(s.shownSecondary, t) : []
      setActiveCues((prev) => (sameIds(prev, nextPrimary) ? prev : nextPrimary))
      setActiveSecondary((prev) => (sameIds(prev, nextSecondary) ? prev : nextSecondary))
      schedule()
    }
    const schedule = (): void => {
      if ('requestVideoFrameCallback' in el) {
        vfc = (el as HTMLVideoElement & {
          requestVideoFrameCallback: (cb: () => void) => number
        }).requestVideoFrameCallback(tick)
      } else {
        raf = requestAnimationFrame(tick)
      }
    }
    schedule()
    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (vfc && 'cancelVideoFrameCallback' in el) {
        ;(el as HTMLVideoElement & { cancelVideoFrameCallback: (h: number) => void })
          .cancelVideoFrameCallback(vfc)
      }
    }
  }, [source?.url])

  // ---- element wiring ----
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.volume = prefs.volume
    el.muted = prefs.muted
    el.playbackRate = prefs.rate
  }, [prefs.volume, prefs.muted, prefs.rate, source?.url])

  // ---- resume ----
  // ?t= wins so a reload lands back on the spot; otherwise the stored position.
  const resumedRef = useRef<string | null>(null)
  useEffect(() => {
    const el = videoRef.current
    if (!el || !source?.url) return
    const sourceKey = `${ref.kind}:${fileIdParam ?? token}`
    if (resumedRef.current === sourceKey) return
    resumedRef.current = sourceKey
    const fromUrl = Number(searchParams.get('t'))
    const start = Number.isFinite(fromUrl) && fromUrl > 0 ? fromUrl : (source.resumeSeconds ?? 0)
    if (start > 1) el.currentTime = start
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source?.url])

  // ---- progress autosave ----
  //
  // The manga reader's contract with three deliberate differences: the debounce
  // input is COARSENED to 5s buckets (a playing video would otherwise re-arm
  // the timer every frame and the save would never fire); pause/seek/hide also
  // flush (a video is left running far more often than a manga page is); and
  // the whole thing no-ops for an ad-hoc session, which has nowhere to save to.
  const saveRef = useRef<{ fileId: number; seconds: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const fileId = source?.fileId ?? null

  const flushProgress = useCallback(() => {
    const s = saveRef.current
    if (s) void api.video.markProgress({ kind: refKind, fileId: s.fileId }, s.seconds)
    saveRef.current = null
  }, [refKind])

  const bucket = Math.floor(uiTime / 5)
  useEffect(() => {
    if (fileId == null || uiTime <= 0) return
    saveRef.current = { fileId, seconds: uiTime }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(flushProgress, 800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [bucket, fileId, flushProgress]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onHide = (): void => {
      if (document.visibilityState === 'hidden') flushProgress()
    }
    document.addEventListener('visibilitychange', onHide)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      flushProgress()
      qc.invalidateQueries({ queryKey: qk.video.all })
      if (source?.mediaId) qc.invalidateQueries({ queryKey: qk.media.detail(source.mediaId) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source?.mediaId])

  // Keep ?t= in step at the same granularity as the manga reader's ?page=.
  useEffect(() => {
    if (uiTime <= 0) return
    const next = new URLSearchParams(searchParams)
    next.set('t', String(bucket * 5))
    setSearchParams(next, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket])

  // ---- watched ----
  const watchedRef = useRef(false)
  const markWatched = useCallback(async () => {
    if (fileId == null || watchedRef.current) return
    watchedRef.current = true
    await api.video.markWatched({ kind: refKind, fileId }, true)
    // Invalidate the library this file actually belongs to: a wrestling row can
    // change nothing in the media library or the checklist (main refuses to log
    // progress for it), and its own queries live under qk.wrestling.
    if (refKind === 'wrestling') {
      qc.invalidateQueries({ queryKey: qk.wrestling.all })
    } else {
      qc.invalidateQueries({ queryKey: qk.video.all })
      qc.invalidateQueries({ queryKey: qk.media.all })
      qc.invalidateQueries({ queryKey: qk.checklist.all })
    }
  }, [fileId, qc, refKind])

  // ---- music interop ----
  // Stop rather than pause: a queue resuming under a two-hour episode is worse
  // than a stopped one. Ref-guarded because StrictMode double-invokes effects.
  const stoppedMusicRef = useRef(false)

  // ---- panels ----
  const [panelOpen, setPanelOpen] = useState(false)
  const [transcriptOpen, setTranscriptOpen] = useState(prefs.transcriptOpen)
  const [blockText, setBlockText] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  // Which dictionary the panel should open in — taken from the TRACK the word
  // was clicked in, so the EN crutch row flips the panel to English.
  const [mineLang, setMineLang] = useState<'ja' | 'en' | 'other'>('ja')
  const [menuOpen, setMenuOpen] = useState(false)
  const [ended, setEnded] = useState(false)

  // ---- transport ----
  const seekTo = useCallback((t: number) => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = Math.max(0, Math.min(t, el.duration || t))
    setUiTime(el.currentTime)
    flushProgress()
  }, [flushProgress])

  const seekBy = useCallback((d: number) => seekTo(timeRef.current + d), [seekTo])

  const togglePlay = useCallback(() => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      if (!stoppedMusicRef.current) {
        stoppedMusicRef.current = true
        if (player.track) player.stop()
      }
      void el.play().catch(() => undefined)
    } else {
      el.pause()
    }
  }, [player])

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
    // Fullscreen the whole flex ROW, never the <video>, or the mining panel and
    // transcript would be locked out exactly when you want them.
    if (document.fullscreenElement) void document.exitFullscreen()
    else void rootRef.current?.requestFullscreen().catch(() => undefined)
  }, [])

  // ---- mining ----
  const openMining = useCallback(
    (text: string | null, term: string | null, lang: 'ja' | 'en' | 'other' = 'ja') => {
      setBlockText(text)
      setSelectedTerm(term)
      setMineLang(lang)
      setPanelOpen(true)
      if (prefs.autoPauseOnMine) videoRef.current?.pause()
    },
    [prefs.autoPauseOnMine]
  )

  const onWordPick = useCallback(
    (pick: SubtitleWordPick) => openMining(pick.cueText, pick.term, pick.lang),
    [openMining]
  )

  // ---- capture (screenshot + sentence audio) ----
  //
  // The frame comes from the renderer's own canvas — it already has the decoded
  // picture, so this is instant and needs no ffmpeg. It only works because the
  // navimg protocol sends access-control-allow-origin and the <video> carries
  // crossOrigin="anonymous"; without both, navimg's different origin taints the
  // canvas and toBlob throws SecurityError.
  const [attach, setAttach] = useState<{
    imagePath: string | null
    audioPath: string | null
  } | null>(null)

  const capture = useCallback(async () => {
    const el = videoRef.current
    const cue = activeCues[0] ?? null
    openMining(cue?.text ?? null, null)

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
          imagePath = await api.files.saveBytes(
            new Uint8Array(await blob.arrayBuffer()),
            'jpg',
            'mining'
          )
        }
      } catch {
        toast(
          "Couldn't read the frame — the media protocol needs to allow canvas reads (see the navimg handler).",
          'error'
        )
      }
    }

    // The clip is a bonus: no ffmpeg, or a failed clip, still leaves you the
    // screenshot and the card.
    let audioPath: string | null = null
    if (cue) {
      audioPath =
        (await api.video.clipAudio({ ref, startSec: cue.start, endSec: cue.end }))?.audioPath ??
        null
    }
    setAttach({ imagePath, audioPath })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCues, openMining])

  // pauseOnHover only ever resumes a video IT paused, so it can't fight a
  // deliberate pause.
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

  // ---- auto-hiding bar ----
  const [barsVisible, setBarsVisible] = useState(true)
  const barsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const keepBarRef = useRef(false)
  keepBarRef.current = menuOpen || !playing
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

  // ---- navigation ----
  const exitPlayer = useCallback(() => {
    // Main builds backPath, so a new library scope needs no player change.
    if (source?.mediaId && source.mediaType) {
      navigate(`${pathForMedia({ id: source.mediaId, mediaType: source.mediaType })}?tab=video`)
    } else if (source?.backPath) {
      navigate(source.backPath)
    } else {
      navigate('/watch')
    }
  }, [navigate, source?.mediaId, source?.mediaType, source?.backPath])

  const goToEpisode = useCallback(
    (id: number) => {
      resumedRef.current = null
      watchedRef.current = false
      setEnded(false)
      // replace: a whole binge stays ONE history entry, so Back lands on the
      // detail page rather than walking every episode in reverse.
      navigate(`/watch/${refKind === 'wrestling' ? 'wrestling' : 'file'}/${id}`, { replace: true })
    },
    [navigate]
  )

  // ---- keyboard ----
  useEffect(() => {
    function onKey(e: KeyboardEvent): void {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable) {
        return
      }
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
          setTranscriptOpen((v) => {
            setPref('transcriptOpen', !v)
            return !v
          })
          return
        case 'm':
          setPanelOpen((v) => !v)
          return
        case 'c':
          void capture()
          return
        case 'f':
          toggleFullscreen()
          return
        case 'n':
          if (source?.next) goToEpisode(source.next.fileId)
          return
        case 'p':
          if (source?.prev) goToEpisode(source.prev.fileId)
          return
        case 'Home':
          seekTo(0)
          return
        case 'End':
          if (el?.duration) seekTo(el.duration - 1)
          return
        case 'Escape':
        case 'Backspace':
          // Cascading close. Fullscreen goes FIRST and checks the real state:
          // the browser also handles Escape natively, so without this one press
          // would both exit fullscreen and close a panel.
          if (document.fullscreenElement) void document.exitFullscreen()
          else if (menuOpen) setMenuOpen(false)
          else if (transcriptOpen) setTranscriptOpen(false)
          else if (panelOpen) setPanelOpen(false)
          else exitPlayer()
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
    exitPlayer,
    goToEpisode,
    menuOpen,
    panelOpen,
    pokeBar,
    prefs,
    primaryId,
    replayCue,
    seekBy,
    seekTo,
    setPref,
    source?.next,
    source?.prev,
    toggleFullscreen,
    togglePlay,
    tracks,
    transcriptOpen
  ])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-sm text-gray-500">
        Loading…
      </div>
    )
  }

  if (!source) {
    return (
      <UnplayableScreen
        title="Video not found"
        message="That episode is no longer in the library."
        onBack={() => navigate('/watch')}
      />
    )
  }

  // Needs an ffmpeg pass before Chromium can touch it (MKV container, HEVC
  // video, AC3 audio…). PreparePanel runs it and re-resolves the source, which
  // then comes back as 'cached'.
  if (source.action === 'needsPrepare') {
    return (
      <PreparePanel
        source={source}
        sourceRef={ref}
        onReady={() =>
          qc.invalidateQueries({
            queryKey: qk.video.source(ref.kind, String(fileIdParam ?? token))
          })
        }
        onBack={exitPlayer}
      />
    )
  }

  if (source.action === 'unsupported' || !source.url) {
    return (
      <UnplayableScreen
        title={source.title}
        message={source.reason ?? 'This file cannot be played.'}
        onBack={exitPlayer}
      />
    )
  }

  const activeCueId = activeCues[0]?.id ?? null

  return (
    <div ref={rootRef} className="flex h-screen bg-black" onMouseMove={pokeBar}>
      <div className="relative flex min-w-0 flex-1 flex-col">
        <div
          className={`absolute inset-x-0 top-0 z-20 flex items-center gap-3 bg-base-900/90 px-4 py-2 backdrop-blur transition-opacity duration-300 ${
            barsVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <button className="btn-ghost px-3 py-1 text-sm" onClick={exitPlayer}>
            ← Back
          </button>
          <div className="min-w-0 flex-1 truncate text-sm text-gray-300">
            {source.seriesTitle ? `${source.seriesTitle} · ` : ''}
            {source.title}
          </div>
          {tracks.length === 0 && (
            <span className="chip text-[10px]" title="No .srt/.ass sidecar found next to this file">
              no subtitles
            </span>
          )}
        </div>

        <div className="relative min-h-0 flex-1" onClick={togglePlay}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full bg-black object-contain"
            src={source.url}
            // Required for the frame grab: navimg:// is a different origin, so
            // without this (and the ACAO header on the protocol handler) the
            // canvas is tainted and toBlob throws SecurityError.
            crossOrigin="anonymous"
            preload="metadata"
            playsInline
            autoPlay
            onPlay={() => {
              setPlaying(true)
              if (!stoppedMusicRef.current) {
                stoppedMusicRef.current = true
                if (player.track) player.stop()
              }
            }}
            onPause={() => {
              setPlaying(false)
              flushProgress()
            }}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
            onTimeUpdate={(e) => setUiTime(e.currentTarget.currentTime)}
            onSeeked={flushProgress}
            onProgress={(e) => {
              const b = e.currentTarget.buffered
              setBuffered(
                Array.from({ length: b.length }, (_, i) => ({ start: b.start(i), end: b.end(i) }))
              )
            }}
            onEnded={() => {
              setEnded(true)
              void markWatched()
            }}
          />

          {prefs.subsOn && (
            <SubtitleOverlay
              primary={activeCues}
              secondary={prefs.dualSubs ? activeSecondary : null}
              primaryLang={primaryTrack?.lang ?? 'other'}
              secondaryLang={secondaryTrack?.lang ?? 'other'}
              fontScale={prefs.subFontScale}
              backdrop={prefs.subBackdrop}
              barsVisible={barsVisible}
              onWordPick={onWordPick}
              onTextSelect={(text, cue, lang) => openMining(cue.text, text, lang)}
              onHoverStart={onHoverStart}
              onHoverEnd={onHoverEnd}
            />
          )}

          {ended && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-black/85">
              <p className="text-sm text-gray-400">Finished {source.title}</p>
              {source.next ? (
                <button
                  className="btn-primary"
                  onClick={() => goToEpisode(source.next!.fileId)}
                >
                  Next: {source.next.title}
                </button>
              ) : (
                <p className="text-sm text-gray-500">That was the last one.</p>
              )}
              <button className="btn-ghost" onClick={exitPlayer}>
                Back to series
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
          transcriptOpen={transcriptOpen}
          miningOpen={panelOpen}
          hasPrev={!!source.prev}
          hasNext={!!source.next}
          visible={barsVisible}
          onToggle={togglePlay}
          onSeek={seekTo}
          onPrevEpisode={() => source.prev && goToEpisode(source.prev.fileId)}
          onNextEpisode={() => source.next && goToEpisode(source.next.fileId)}
          onVolume={(v) => {
            setPref('volume', v)
            if (v > 0) setPref('muted', false)
          }}
          onMute={() => setPref('muted', !prefs.muted)}
          onRate={(r) => setPref('rate', r)}
          onPickTrack={(slot, id) => {
            const track = tracks.find((x) => x.id === id) ?? null
            if (slot === 'primary') {
              setPrimaryId(id)
              if (track) setPref('primaryLang', track.lang)
            } else {
              setSecondaryId(id)
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
          onScreenshot={() => void capture()}
          onFullscreen={toggleFullscreen}
          onMenuOpenChange={setMenuOpen}
        />
      </div>

      {transcriptOpen && (
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
          onMineCue={(cue) => openMining(cue.text, null)}
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
    </div>
  )
}

function UnplayableScreen({
  title,
  message,
  onBack
}: {
  title: string
  message: string
  onBack: () => void
}): JSX.Element {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3 bg-black px-8 text-center">
      <p className="text-sm uppercase tracking-wide text-gray-500">{title}</p>
      <p className="max-w-md text-sm text-gray-400">{message}</p>
      <button className="btn-ghost" onClick={onBack}>
        ← Back
      </button>
    </div>
  )
}
