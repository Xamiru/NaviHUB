import { useSyncExternalStore } from 'react'
import { shuffle } from '@shared/shuffle'
import type { VideoFile } from '@shared/types'

// The video shuffle queue (2026-11-16): one show or a mix of shows played in
// random order until the user stops it, like the music queue.
//
// Each show keeps its own shuffled deck of episodes. A slot picks a show
// uniformly among the queue's shows and takes that deck's next card; a deck
// refills with a fresh shuffle only once it is used up. So no episode repeats
// until its whole show has played, and a mix stays evenly mixed forever (a
// ten-episode show is not swamped by one with 180). A single show is the same
// mechanism with one deck. The queue holds AHEAD upcoming items and tops up as
// it plays; it is a per-viewer convenience in localStorage, never library data.

export interface QueueFile {
  fileId: number
  title: string
}

export interface QueueShow {
  mediaId: number
  title: string
  files: QueueFile[]
}

export interface QueueItem {
  fileId: number
  mediaId: number
  title: string
  show: string
}

export interface VideoQueue {
  v: 1
  shows: QueueShow[]
  // Remaining draw order per show, keyed by String(mediaId).
  decks: Record<string, number[]>
  items: QueueItem[]
  index: number
}

export const QUEUE_AHEAD = 50
// Played items kept behind the current one, for Previous.
export const QUEUE_BEHIND = 20
const KEY = 'video.shuffleQueue'

type Rng = () => number

// A show's queueable files. Specials (season 0) stay out unless asked for,
// except when a folder holds nothing else.
export function showFromFiles(
  mediaId: number,
  title: string,
  files: Pick<VideoFile, 'id' | 'title' | 'season'>[],
  specials = false
): QueueShow {
  const main = specials ? files : files.filter((f) => f.season !== 0)
  const picked = main.length > 0 ? main : files
  return { mediaId, title, files: picked.map((f) => ({ fileId: f.id, title: f.title })) }
}

function draw(q: VideoQueue, rng: Rng): QueueItem | null {
  const shows = q.shows.filter((s) => s.files.length > 0)
  if (shows.length === 0) return null
  const show = shows[Math.min(shows.length - 1, Math.floor(rng() * shows.length))]
  const key = String(show.mediaId)
  let deck = q.decks[key] ?? []
  if (deck.length === 0) {
    deck = shuffle(
      show.files.map((f) => f.fileId),
      rng
    )
    // A fresh cycle never opens with the episode that just closed the last one.
    const last = [...q.items].reverse().find((i) => i.mediaId === show.mediaId)
    if (deck.length > 1 && last && deck[0] === last.fileId) [deck[0], deck[1]] = [deck[1], deck[0]]
  }
  const [fileId, ...rest] = deck
  q.decks[key] = rest
  const file = show.files.find((f) => f.fileId === fileId)
  return { fileId, mediaId: show.mediaId, title: file?.title ?? '', show: show.title }
}

function copy(q: VideoQueue): VideoQueue {
  const decks: Record<string, number[]> = {}
  for (const [k, v] of Object.entries(q.decks)) decks[k] = [...v]
  return { ...q, decks, items: [...q.items] }
}

// Keeps AHEAD items after the current one and at most BEHIND before it.
export function topUp(q: VideoQueue, rng: Rng = Math.random): VideoQueue {
  const next = copy(q)
  while (next.items.length - next.index - 1 < QUEUE_AHEAD) {
    const item = draw(next, rng)
    if (!item) break
    next.items.push(item)
  }
  if (next.index > QUEUE_BEHIND) {
    const drop = next.index - QUEUE_BEHIND
    next.items = next.items.slice(drop)
    next.index -= drop
  }
  return next
}

export function startQueue(shows: QueueShow[], rng: Rng = Math.random): VideoQueue | null {
  const usable = shows.filter((s) => s.files.length > 0)
  if (usable.length === 0) return null
  const q = topUp({ v: 1, shows: usable, decks: {}, items: [], index: 0 }, rng)
  return q.items.length > 0 ? q : null
}

export function advanceTo(q: VideoQueue, index: number, rng: Rng = Math.random): VideoQueue {
  const i = Math.max(0, Math.min(index, q.items.length - 1))
  return topUp({ ...q, index: i }, rng)
}

// Removes an upcoming item; the current and played ones stay put.
export function removeAt(q: VideoQueue, index: number, rng: Rng = Math.random): VideoQueue {
  if (index <= q.index || index >= q.items.length) return q
  const next = copy(q)
  next.items.splice(index, 1)
  return topUp(next, rng)
}

// Puts every upcoming item back in its show's deck, reshuffles each deck and
// deals the upcoming list again. The current item keeps playing. The upcoming
// window can span a cycle boundary (the same episode drawn twice), so each
// deck is de-duplicated, and the playing episode stays out of it unless it is
// all that is left.
export function reshuffleUpcoming(q: VideoQueue, rng: Rng = Math.random): VideoQueue {
  const next = copy(q)
  const playing = next.items[next.index]?.fileId
  const returned = next.items.slice(next.index + 1)
  next.items = next.items.slice(0, next.index + 1)
  for (const show of next.shows) {
    const key = String(show.mediaId)
    const back = returned.filter((i) => i.mediaId === show.mediaId).map((i) => i.fileId)
    let ids = [...new Set([...back, ...(next.decks[key] ?? [])])]
    if (ids.length > 1) ids = ids.filter((id) => id !== playing)
    next.decks[key] = shuffle(ids, rng)
  }
  return topUp(next, rng)
}

export function queueCurrent(q: VideoQueue | null): QueueItem | null {
  return q?.items[q.index] ?? null
}

export function queueHasShow(q: VideoQueue | null, mediaId: number): boolean {
  return !!q?.shows.some((s) => s.mediaId === mediaId)
}

// ---- persistence ----

function isQueue(v: unknown): v is VideoQueue {
  if (!v || typeof v !== 'object') return false
  const q = v as Partial<VideoQueue>
  const num = (n: unknown): boolean => typeof n === 'number' && Number.isInteger(n)
  return (
    q.v === 1 &&
    Array.isArray(q.shows) &&
    q.shows.every(
      (s) => num(s?.mediaId) && typeof s.title === 'string' && Array.isArray(s.files) &&
        s.files.every((f) => num(f?.fileId) && typeof f.title === 'string')
    ) &&
    !!q.decks && typeof q.decks === 'object' &&
    Object.values(q.decks).every((d) => Array.isArray(d) && d.every(num)) &&
    Array.isArray(q.items) &&
    q.items.length > 0 &&
    q.items.every((i) => num(i?.fileId) && num(i.mediaId) && typeof i.title === 'string' && typeof i.show === 'string') &&
    num(q.index) &&
    (q.index as number) >= 0 &&
    (q.index as number) < q.items.length
  )
}

export function loadQueue(): VideoQueue | null {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? 'null') as unknown
    return isQueue(parsed) ? parsed : null
  } catch {
    return null
  }
}

function saveQueue(q: VideoQueue | null): void {
  try {
    if (q) localStorage.setItem(KEY, JSON.stringify(q))
    else localStorage.removeItem(KEY)
  } catch {
    // A full or disabled localStorage must never break playback.
  }
}

// ---- store ----

let current: VideoQueue | null | undefined
const listeners = new Set<() => void>()

function read(): VideoQueue | null {
  if (current === undefined) current = loadQueue()
  return current
}

function write(q: VideoQueue | null): void {
  current = q
  saveQueue(q)
  for (const l of listeners) l()
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useVideoQueue(): VideoQueue | null {
  return useSyncExternalStore(subscribe, read)
}

// Actions return the item to play (or null when there is none), so a caller
// updates the queue first and then navigates.
export const videoQueue = {
  get: read,
  start(shows: QueueShow[]): QueueItem | null {
    const q = startQueue(shows)
    write(q)
    return queueCurrent(q)
  },
  jump(index: number): QueueItem | null {
    const q = read()
    if (!q || index < 0 || index >= q.items.length) return null
    const next = advanceTo(q, index)
    write(next)
    return queueCurrent(next)
  },
  remove(index: number): void {
    const q = read()
    if (q) write(removeAt(q, index))
  },
  reshuffle(): void {
    const q = read()
    if (q) write(reshuffleUpcoming(q))
  },
  stop(): void {
    write(null)
  },
  // Test seam: drop the in-memory copy so the next read reloads storage.
  resetForTests(): void {
    current = undefined
  }
}
