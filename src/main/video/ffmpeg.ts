import { execFile, spawn, type ChildProcessWithoutNullStreams } from 'child_process'
import { statSync } from 'fs'
import { get as getSetting } from '../repos/settingsRepo'
import { buildProbeArgs } from './playability'
import { parseProbeJson, type MediaProbe } from './probeParse'
import { applyProgressLine, emptyProgress, type FfProgress } from './progressParse'
import { pipeProcLines } from '../childLines'
import type { VideoToolsResult } from '@shared/types'

// Spawning ffmpeg/ffprobe. Every DECISION lives in playability.ts (pure); this
// file only runs things. Same posture as musicDownload.ts: external binaries
// the user installs, never bundled — `execFile` for short probes that resolve
// null on failure and never throw, `spawn` with an argv array (never a shell)
// for the long job.

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

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

export interface FfmpegRun {
  proc: ChildProcessWithoutNullStreams
  done: Promise<{ code: number | null; stderr: string }>
}

// Spawns ffmpeg with an argv ARRAY and no shell (musicDownload's rule), feeding
// -progress lines to the caller. The last stderr lines are kept because
// ffmpeg's real error is always the final one, and that's what the status
// message should show rather than "exited with code 1".
export function runFfmpeg(
  args: string[],
  onProgress: (p: FfProgress) => void,
  taskId?: string | null
): FfmpegRun {
  const proc = spawn(ffmpegBin(), args) as ChildProcessWithoutNullStreams
  let state = emptyProgress()
  const tail: string[] = []

  // The stderr tail is KEPT as well as logged — it is what produces the real
  // error message on VideoPrepareStatus, and losing it would degrade the panel
  // to "exited with code 1".
  //
  // logStdout:false because ffmpeg's stdout here is the -progress key=value
  // protocol, already parsed into the status object. Routing a line per frame
  // into the ring would evict everything else in under a minute.
  pipeProcLines(proc, {
    tool: 'ffmpeg',
    taskId,
    logStdout: false,
    onStdout: (line) => {
      state = applyProgressLine(state, line)
      onProgress(state)
    },
    onStderr: (line) => {
      tail.push(line)
      if (tail.length > 20) tail.shift()
    }
  })

  const done = new Promise<{ code: number | null; stderr: string }>((resolve) => {
    let settled = false
    const finish = (code: number | null, err?: string): void => {
      if (settled) return
      settled = true
      resolve({ code, stderr: err ?? tail.join('\n') })
    }
    // A spawn failure (ENOENT — ffmpeg not installed) may never produce a
    // 'close' with a code, so this path must settle the promise itself.
    proc.on('error', (err) => finish(null, err.message))
    proc.on('close', (code) => finish(code))
  })

  return { proc, done }
}

// Short one-shot runs (subtitle extraction, clips, frame grabs). Resolves an
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
