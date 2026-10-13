import { leadingSilenceSeconds } from '@shared/guessTrack'

// Decoding at 8 kHz keeps a full-length fallback decode small; silence
// detection needs loudness, not fidelity.
const DECODE_RATE = 8000
const HEAD_BYTES = 2 * 1024 * 1024
const MAX_FULL_BYTES = 80 * 1024 * 1024
const TIMEOUT_MS = 4000

async function decode(buffer: ArrayBuffer): Promise<AudioBuffer> {
  return new OfflineAudioContext(1, 1, DECODE_RATE).decodeAudioData(buffer)
}

function channels(audio: AudioBuffer): Float32Array[] {
  return Array.from({ length: audio.numberOfChannels }, (_, i) => audio.getChannelData(i))
}

function totalSize(response: Response): number | null {
  const range = response.headers.get('content-range')?.match(/\/(\d+)$/)
  const size = Number(range?.[1] ?? response.headers.get('content-length'))
  return Number.isFinite(size) && size > 0 ? size : null
}

async function detect(src: string, signal: AbortSignal): Promise<number> {
  const head = await fetch(src, { headers: { range: `bytes=0-${HEAD_BYTES - 1}` }, signal })
  if (!head.ok) return 0
  const size = totalSize(head)
  const headBytes = await head.arrayBuffer()
  signal.throwIfAborted()
  try {
    // MP3, FLAC and Ogg decode from their first frames.
    return leadingSilenceSeconds(channels(await decode(headBytes)), DECODE_RATE)
  } catch {
    // MP4/M4A may keep their index at the end of the file; decode it whole.
    if (head.status === 200 || size == null || size > MAX_FULL_BYTES) return 0
    signal.throwIfAborted()
    const full = await fetch(src, { signal })
    if (!full.ok) return 0
    const fullBytes = await full.arrayBuffer()
    signal.throwIfAborted()
    return leadingSilenceSeconds(channels(await decode(fullBytes)), DECODE_RATE)
  }
}

/**
 * Where audible sound begins in a local file, in seconds. Remote streams,
 * undecodable files and slow decodes all answer 0, i.e. play from the start.
 * A timeout aborts the download too, so an abandoned probe stops using the
 * network and never starts a decode.
 */
export async function audioOnsetSeconds(src: string): Promise<number> {
  if (!src.startsWith('navimg:')) return 0
  const controller = new AbortController()
  let timer = 0
  const timeout = new Promise<number>((resolve) => {
    timer = window.setTimeout(() => {
      controller.abort()
      resolve(0)
    }, TIMEOUT_MS)
  })
  try {
    return await Promise.race([detect(src, controller.signal).catch(() => 0), timeout])
  } finally {
    window.clearTimeout(timer)
  }
}

/**
 * A file's duration from its metadata alone, without playing it, so a quiz
 * can start straight at a random point instead of jumping there audibly.
 * Unknown (a live stream, an error, a slow host) answers null.
 */
export function audioDurationSeconds(src: string): Promise<number | null> {
  return new Promise((resolve) => {
    const probe = new Audio()
    let timer = 0
    const finish = (value: number | null): void => {
      window.clearTimeout(timer)
      probe.onloadedmetadata = null
      probe.onerror = null
      probe.removeAttribute('src')
      probe.load()
      resolve(value)
    }
    timer = window.setTimeout(() => finish(null), TIMEOUT_MS)
    probe.preload = 'metadata'
    probe.onloadedmetadata = () =>
      finish(Number.isFinite(probe.duration) && probe.duration > 0 ? probe.duration : null)
    probe.onerror = () => finish(null)
    probe.src = src
  })
}
