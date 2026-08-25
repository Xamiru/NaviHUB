import { useEffect, useRef, useState } from 'react'
import type { PlayerCommand, PlayerSnapshot } from '@shared/types'
import { api } from '../lib/api'
import CoverImage from '../components/CoverImage'
import { PlayIcon, PauseIcon, PrevIcon, NextIcon, VolumeIcon } from '../components/PlayerIcons'

// The pop-out mini player ("gaming widget"). Rendered ALONE in the widget
// window (main.tsx's #/widget branch) — no router, no query client, no
// AudioPlayerProvider. It owns no audio: it mirrors the main window's player
// via the 'player:state' push and sends transport verbs back over
// player:command. Snapshots arrive already quiz-masked (lib/playerMeta.ts).
//
// Drag regions: the pill body drags the window, and everything interactive
// opts out with app-no-drag. Chromium delivers NO mouse events inside a drag
// region, so the song block (which is a button back into the app) and the
// controls must be no-drag, and the flex-1 gutter between them is deliberate —
// it is what is left to grab the pill by.
export default function PlayerWidgetPage(): React.JSX.Element {
  const [snap, setSnap] = useState<PlayerSnapshot | null>(null)
  // Local volume while dragging the slider. The main window echoes every
  // change back as a new snapshot; without this the slider would fight the
  // echo (jumping back a frame) on every move.
  const [localVolume, setLocalVolume] = useState<number | null>(null)
  const pendingVolume = useRef<number | null>(null)

  useEffect(() => {
    // Pull once for mount-time state (widget.ts also re-sends on load, and
    // live changes stream in), then follow the push channel.
    let alive = true
    void api.player.getState().then((s) => {
      if (alive) setSnap(s)
    })
    const unsubscribe = api.player.onState((s) => {
      // Our own volume has come back around: hand control back to the snapshot.
      if (pendingVolume.current != null && s && s.volume === pendingVolume.current) {
        pendingVolume.current = null
        setLocalVolume(null)
      }
      setSnap(s)
    })
    return () => {
      alive = false
      unsubscribe()
    }
  }, [])

  const send = (cmd: PlayerCommand) => (): void => {
    // Optimistic play/pause flip: the round-trip through the main window is
    // fast but visible; the next real snapshot overwrites this either way.
    if (cmd.kind === 'toggle') setSnap((s) => (s ? { ...s, isPlaying: !s.isPlaying } : s))
    void api.player.command(cmd)
  }

  const onVolume = (value: number): void => {
    pendingVolume.current = value
    setLocalVolume(value)
    void api.player.command({ kind: 'volume', value })
  }

  const openApp = (): void => void api.player.showMain()

  return (
    <div className="app-drag flex h-screen select-none items-center gap-2 overflow-hidden border border-base-700 bg-base-800 px-2 text-gray-100">
      {snap ? (
        <>
          <button
            onClick={openApp}
            className="app-no-drag flex min-w-0 shrink-0 items-center gap-2 rounded text-left hover:opacity-80"
            title={`${snap.title}${snap.artist ? ` — ${snap.artist}` : ''} · Open NaviHUB`}
          >
            <CoverImage
              path={snap.coverPath}
              alt={snap.title}
              className="h-12 w-12 shrink-0"
              fallback="music"
            />
            <span className="block w-44 min-w-0">
              <span className="block truncate text-xs font-medium leading-tight">{snap.title}</span>
              {snap.artist && (
                <span className="block truncate text-[10px] leading-tight text-gray-400">
                  {snap.artist}
                </span>
              )}
            </span>
          </button>

          {/* Drag handle: the only wide area the window can be moved by. */}
          <div className="h-full flex-1" aria-hidden="true" />

          <div className="app-no-drag flex shrink-0 items-center gap-1">
            <button
              onClick={send({ kind: 'previous' })}
              disabled={!snap.hasPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              title="Previous"
              aria-label="Previous"
            >
              <PrevIcon />
            </button>
            <button
              onClick={send({ kind: 'toggle' })}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent hover:bg-accent/30"
              title={snap.isPlaying ? 'Pause' : 'Play'}
              aria-label={snap.isPlaying ? 'Pause' : 'Play'}
            >
              {snap.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={send({ kind: 'next' })}
              disabled={!snap.hasNext}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              title="Next"
              aria-label="Next"
            >
              <NextIcon />
            </button>
          </div>

          <div className="app-no-drag flex shrink-0 items-center gap-1">
            <VolumeIcon className="shrink-0 text-gray-500" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={localVolume ?? snap.volume}
              onChange={(e) => onVolume(Number(e.target.value))}
              className="w-12 cursor-pointer accent-accent"
              title="Volume"
              aria-label="Volume"
            />
          </div>
        </>
      ) : (
        <>
          <button
            onClick={openApp}
            className="app-no-drag shrink-0 truncate text-sm text-gray-400 hover:text-white"
            title="Open NaviHUB"
          >
            Nothing playing
          </button>
          <div className="h-full flex-1" aria-hidden="true" />
        </>
      )}
      <button
        onClick={() => void api.player.closeWidget()}
        className="app-no-drag shrink-0 text-lg leading-none text-gray-500 hover:text-white"
        title="Close"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  )
}
