import { useEffect, useRef, useState } from 'react'
import type { AchievementUnlockEvent } from '@shared/types'
import { ACH_POPUP_BURST_AT, ACH_POPUP_LIFE_MS } from '@shared/achievements'
import { api } from '../lib/api'
import CoverImage from '../components/CoverImage'
import { playUnlockChime } from '../lib/achChime'
import { advancePopupQueue, visiblePopups } from '../lib/achievementPopupQueue'

// The in-game achievement overlay (window owned by src/main/achPopup.ts,
// loaded at #/achpop). Rendered ALONE like PlayerWidgetPage — no router, no
// query client, no AudioPlayerProvider. The window is click-through glass
// pinned over the game, so nothing here can be interactive.
//
// Data path: this page POLLS achievements:watchStatus every 500 ms and diffs
// seq exactly like lib/useAchievementWatch.ts does in the main window (seed
// from the first status seen, then take anything newer). No push channel —
// the frozen surface stays player:cmd/player:state. Main preloads this window
// at session start precisely so the seed lands before the first unlock.
//
// Burst policy mirrors the watcher's fallback: more than ACH_POPUP_BURST_AT
// unlocks in one poll become ONE summary card instead of an unreadable stack.

const POLL_MS = 500

type Card =
  | { key: number; kind: 'unlock'; event: AchievementUnlockEvent; shownAt: number | null }
  | { key: number; kind: 'burst'; count: number; mediaTitle: string; shownAt: number | null }

let cardKey = 0

export default function AchPopupPage(): React.JSX.Element {
  const [cards, setCards] = useState<Card[]>([])
  // Seeded from the FIRST status seen — anything in `recent` at mount has been
  // popped once already (or predates us).
  const lastSeq = useRef<number | null>(null)
  // The Achievements page's "Test popup & sound" request rides the same poll
  // (status.test/testId). Deduped by id — main serves it for a TTL window, and
  // this is the only consumer that renders it.
  const lastTestId = useRef(0)

  useEffect(() => {
    // The window is transparent; body's theme background would paint it black.
    for (const el of [document.documentElement, document.body]) el.style.background = 'transparent'
  }, [])

  useEffect(() => {
    let alive = true
    const tick = async (): Promise<void> => {
      let status: Awaited<ReturnType<typeof api.achievements.watchStatus>> = null
      try {
        status = await api.achievements.watchStatus()
      } catch {
        return // the app is shutting down around us; nothing to show anyway
      }
      if (!alive) return
      // Expire cards whose life is up — piggybacked on the poll rather than
      // one timeout per card.
      setCards((cs) => advancePopupQueue(cs, Date.now()))
      if (!status) return
      // The test card is independent of the session seq — a test can arrive
      // with no watch running at all.
      if (status.test && status.testId && status.testId !== lastTestId.current) {
        lastTestId.current = status.testId
        playUnlockChime()
        setCards((cs) =>
          advancePopupQueue(
            [...cs, { key: ++cardKey, kind: 'unlock', event: status.test!, shownAt: null }],
            Date.now()
          )
        )
      }
      if (lastSeq.current === null) {
        lastSeq.current = status.seq
        return
      }
      const fresh = status.recent.filter((e) => e.seq > (lastSeq.current as number))
      if (!fresh.length) return
      lastSeq.current = status.seq
      playUnlockChime()
      setCards((cs) => {
        const next = [...cs]
        if (fresh.length > ACH_POPUP_BURST_AT) {
          next.push({
            key: ++cardKey,
            kind: 'burst',
            count: fresh.length,
            mediaTitle: fresh[0]!.mediaTitle,
            shownAt: null
          })
        } else {
          for (const event of fresh) {
            next.push({ key: ++cardKey, kind: 'unlock', event, shownAt: null })
          }
        }
        return advancePopupQueue(next, Date.now())
      })
    }
    void tick()
    const t = setInterval(tick, POLL_MS)
    return () => {
      alive = false
      clearInterval(t)
    }
  }, [])

  const visible = visiblePopups(cards)

  return (
    <div className="pointer-events-none flex h-screen select-none flex-col justify-end gap-2.5 overflow-hidden p-1">
      {visible.map((c) =>
        c.kind === 'unlock' ? (
          <UnlockCard key={c.key} e={c.event} />
        ) : (
          <BurstCard key={c.key} count={c.count} mediaTitle={c.mediaTitle} />
        )
      )}
    </div>
  )
}

function CardShell({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className="ach-card relative w-full shrink-0 overflow-hidden rounded-lg border border-white/15 bg-black/85 shadow-xl shadow-black/60">
      {children}
      {/* Lifetime strip — empties left-to-right over ACH_POPUP_LIFE_MS. */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent/80 ach-card-life"
        style={{ animationDuration: `${ACH_POPUP_LIFE_MS}ms` }}
      />
    </div>
  )
}

function UnlockCard({ e }: { e: AchievementUnlockEvent }): React.JSX.Element {
  return (
    <CardShell>
      <div className="flex h-32 items-center gap-3 px-4 py-3">
        <CoverImage
          path={e.iconPath}
          alt={e.name}
          rounded="rounded"
          className="h-16 w-16 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs text-gray-400">{e.mediaTitle}</div>
          <div className="text-sm font-semibold uppercase tracking-wide text-signal-affirmative">
            Achievement unlocked
          </div>
          <div className="mt-0.5 truncate font-medium text-white">{e.name}</div>
          {e.description && (
            <div className="mt-0.5 line-clamp-2 text-xs leading-snug text-gray-400">
              {e.description}
            </div>
          )}
          {(e.points != null || e.rarity) && (
            <div className="mt-1 text-xs text-gray-500">
              {e.points != null && <span className="text-gray-300">{e.points} points</span>}
              {e.points != null && e.rarity && <span> · </span>}
              {e.rarity && <span>{e.rarity.replace('-', ' ')}</span>}
            </div>
          )}
        </div>
      </div>
    </CardShell>
  )
}

function BurstCard({ count, mediaTitle }: { count: number; mediaTitle: string }) {
  return (
    <CardShell>
      <div className="flex h-32 items-center gap-3 px-4 py-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-base-700 text-lg font-semibold text-signal-affirmative">
          +{count}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs text-gray-400">{mediaTitle}</div>
          <div className="text-sm font-semibold uppercase tracking-wide text-signal-affirmative">
            Achievements unlocked
          </div>
          <div className="mt-0.5 truncate font-medium text-white">{count} achievements</div>
          <div className="mt-0.5 text-xs text-gray-400">Open NaviHUB to see them all</div>
        </div>
      </div>
    </CardShell>
  )
}
