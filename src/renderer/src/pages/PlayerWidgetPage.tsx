import { useEffect, useState } from 'react'
import type { PlayerSnapshot } from '@shared/types'
import { api } from '../lib/api'
import CoverImage from '../components/CoverImage'
import { PlayIcon, PauseIcon, PrevIcon, NextIcon } from '../components/PlayerIcons'

// The pop-out mini player ("gaming widget"). Rendered ALONE in the widget
// window (main.tsx's #/widget branch) — no router, no query client, no
// AudioPlayerProvider. It owns no audio: it mirrors the main window's player
// via the 'player:state' push and sends transport verbs back over
// player:command. Snapshots arrive already quiz-masked (lib/playerMeta.ts).
export default function PlayerWidgetPage(): React.JSX.Element {
  const [snap, setSnap] = useState<PlayerSnapshot | null>(null)

  useEffect(() => {
    // Pull once for mount-time state (widget.ts also re-sends on load, and
    // live changes stream in), then follow the push channel.
    let alive = true
    void api.player.getState().then((s) => {
      if (alive) setSnap(s)
    })
    const unsubscribe = api.player.onState((s) => setSnap(s))
    return () => {
      alive = false
      unsubscribe()
    }
  }, [])

  const send = (cmd: 'toggle' | 'next' | 'previous') => (): void => {
    // Optimistic play/pause flip: the round-trip through the main window is
    // fast but visible; the next real snapshot overwrites this either way.
    if (cmd === 'toggle') setSnap((s) => (s ? { ...s, isPlaying: !s.isPlaying } : s))
    void api.player.command(cmd)
  }

  return (
    <div className="app-drag flex h-screen select-none items-center gap-3 overflow-hidden border border-base-700 bg-base-800 px-3 text-gray-100">
      {snap ? (
        <>
          <CoverImage
            path={snap.coverPath}
            alt={snap.title}
            className="h-12 w-12 shrink-0"
            fallback="music"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium leading-tight">{snap.title}</p>
            {snap.artist && (
              <p className="truncate text-xs leading-tight text-gray-400">{snap.artist}</p>
            )}
          </div>
          <div className="app-no-drag flex shrink-0 items-center gap-1">
            <button
              onClick={send('previous')}
              disabled={!snap.hasPrev}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              title="Previous"
              aria-label="Previous"
            >
              <PrevIcon />
            </button>
            <button
              onClick={send('toggle')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent hover:bg-accent/30"
              title={snap.isPlaying ? 'Pause' : 'Play'}
              aria-label={snap.isPlaying ? 'Pause' : 'Play'}
            >
              {snap.isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <button
              onClick={send('next')}
              disabled={!snap.hasNext}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-base-700 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              title="Next"
              aria-label="Next"
            >
              <NextIcon />
            </button>
          </div>
        </>
      ) : (
        <p className="flex-1 truncate text-sm text-gray-400">Nothing playing</p>
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
