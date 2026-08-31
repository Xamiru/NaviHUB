import { execFile } from 'child_process'
import { statSync } from 'fs'
import { get as getSetting } from '../repos/settingsRepo'
import { buildProbeArgs } from './playability'
import { parseProbeJson, type MediaProbe } from './probeParse'
import type { VideoToolsResult } from '@shared/types'

// Thin execution layer for the optional ffprobe metadata read and one-shot
// embedded-subtitle extraction. The user installs these binaries; playback is
// external and never waits on them.

export function ffmpegBin(): string {
  return getSetting('ffmpeg.path')?.trim() || 'ffmpeg'
}

export function ffprobeBin(): string {
  return getSetting('ffprobe.path')?.trim() || 'ffprobe'
}

function version(bin: string): Promise<string | null> {
  return new Promise((resolve) => {
    execFile(bin, ['-version'], { timeout: 5000 }, (err, stdout) => {
      if (err) return resolve(null)
      resolve(stdout.split('\n')[0]?.trim() ?? '')
    })
  })
}

export async function detectTools(): Promise<VideoToolsResult> {
  const [ff, probe] = await Promise.all([version(ffmpegBin()), version(ffprobeBin())])
  return { ffmpeg: ff != null, ffprobe: probe != null, ffmpegVersion: ff }
}

export async function hasFfmpeg(): Promise<boolean> {
  return (await version(ffmpegBin())) != null
}

// ---------------------------------------------------------------------------
// Probe (mtime-keyed LRU in front, the mokuro.ts idiom)
// ---------------------------------------------------------------------------

const CACHE_MAX = 16
const probeCache = new Map<string, MediaProbe | null>()

export async function probeFile(absPath: string): Promise<MediaProbe | null> {
  let key = absPath
  try {
    const st = statSync(absPath)
    key = `${absPath}|${Math.floor(st.mtimeMs)}|${st.size}`
  } catch {
    return null
  }
  if (probeCache.has(key)) return probeCache.get(key) ?? null

  const result = await new Promise<MediaProbe | null>((resolve) => {
    let args: string[]
    try {
      args = buildProbeArgs(absPath)
    } catch {
      return resolve(null)
    }
    execFile(
      ffprobeBin(),
      args,
      // maxBuffer is load-bearing: the 1MB default is overrun by a Blu-ray
      // remux with 30 streams and 60 chapters, and the failure surfaces as a
      // bare ENOBUFS that looks exactly like a corrupt file.
      { timeout: 30_000, maxBuffer: 8 * 1024 * 1024 },
      (err, stdout) => {
        if (err) return resolve(null)
        resolve(parseProbeJson(stdout))
      }
    )
  })

  probeCache.set(key, result)
  while (probeCache.size > CACHE_MAX) {
    const oldest = probeCache.keys().next().value
    if (oldest === undefined) break
    probeCache.delete(oldest)
  }
  return result
}

// Short one-shot subtitle extraction. Resolves an
// error string rather than throwing, so callers can degrade rather than crash.
export function runFfmpegOnce(args: string[], timeoutMs = 60_000): Promise<string | null> {
  return new Promise((resolve) => {
    execFile(ffmpegBin(), args, { timeout: timeoutMs, maxBuffer: 4 * 1024 * 1024 }, (err, _o, stderr) => {
      if (!err) return resolve(null)
      const detail = (stderr || '').trim().split('\n').slice(-1)[0]
      resolve(detail || err.message)
    })
  })
}
