import { existsSync } from 'fs'
import { mkdir, readdir, rename, rm, stat, writeFile } from 'fs/promises'
import { join } from 'path'
import {
  expectedReading,
  isPlayableWav,
  packSubdir,
  speakableText,
  ttsCacheName,
  TTS_ARCHIVES
} from './ttsCore'

// The voice's cache and pack checks around an injectable synthesizer (the
// worker in production, a stub in tests). Clips are content-addressed under
// ttscache/ (files.ttsCacheDir), so a word is synthesized once and replayed
// from disk; the cache is pruned oldest-first past a size cap.

export const TTS_CACHE_CAP_BYTES = 300 * 1024 * 1024

export interface TtsServiceOptions {
  packDir: string // holds dic/ and voice/
  cacheDir: string // <userData>/ttscache
  synth: (text: string, reading: string | null) => Promise<Uint8Array>
  // False while the pack is being replaced: no synthesis may start against it.
  enabled?: () => boolean
  cacheCapBytes?: number
}

export function packInstalled(packDir: string): boolean {
  return TTS_ARCHIVES.every((a) => a.files.every((f) => existsSync(join(packDir, packSubdir(a.key), f))))
}

// Deletes the oldest clips until the cache fits under `cap`.
export async function pruneCache(dir: string, cap: number): Promise<number> {
  if (!existsSync(dir)) return 0
  const files = await Promise.all(
    (await readdir(dir))
      .filter((f) => f.endsWith('.wav'))
      .map(async (f) => {
        const s = await stat(join(dir, f))
        return { f, size: s.size, at: s.mtimeMs }
      })
  )
  let total = files.reduce((n, x) => n + x.size, 0)
  let removed = 0
  for (const x of files.sort((a, b) => a.at - b.at)) {
    if (total <= cap) break
    await rm(join(dir, x.f), { force: true })
    total -= x.size
    removed++
  }
  return removed
}

export function createTtsService(opts: TtsServiceOptions) {
  const inFlight = new Map<string, Promise<string | null>>()
  const cap = opts.cacheCapBytes ?? TTS_CACHE_CAP_BYTES
  let writesSincePrune = 0

  // ttscache/<name>.wav for `text` (held to `reading` when given), synthesizing
  // on a cache miss; null when the voice pack is missing or being replaced, or
  // the text has nothing Japanese to say.
  async function speak(text: unknown, reading?: unknown): Promise<string | null> {
    const t = speakableText(text)
    if (!t || (opts.enabled && !opts.enabled()) || !packInstalled(opts.packDir)) return null
    const r = expectedReading(reading)
    const name = ttsCacheName(t, undefined, r)
    const rel = `ttscache/${name}`
    const abs = join(opts.cacheDir, name)
    if (existsSync(abs)) return rel
    const running = inFlight.get(name)
    if (running) return running
    const job = (async () => {
      const wav = await opts.synth(t, r)
      // A clip that is not a real WAV would replay broken forever from cache.
      if (!isPlayableWav(wav)) throw new Error('The voice produced no audio for this text')
      await mkdir(opts.cacheDir, { recursive: true })
      const tmp = `${abs}.partial`
      await writeFile(tmp, wav)
      await rename(tmp, abs)
      if (++writesSincePrune >= 50) {
        writesSincePrune = 0
        await pruneCache(opts.cacheDir, cap)
      }
      return rel
    })().finally(() => inFlight.delete(name))
    inFlight.set(name, job)
    return job
  }

  return { speak }
}
