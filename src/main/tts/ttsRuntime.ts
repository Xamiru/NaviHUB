import { app } from 'electron'
import { join } from 'path'
import { Worker } from 'worker_threads'
import workerPath from './ttsWorker?modulePath'
import { ttsCacheDir } from '../files'
import { logWarn } from '../logBus'
import { installVoicePack, removeVoicePack } from './openJTalkPack'
import { openJTalkArgs, packSubdir } from './ttsCore'
import { createTtsService } from './ttsService'
import { registerTtsStopper, voicePackDir, voicePackInstalled } from './ttsPaths'
import type { JpVoiceInfo } from '@shared/types'

// The voice's IO half: where the engine and pack live, and the one worker
// thread that runs the engine. Loaded lazily from ipc.ts on the first voice
// call; stopTts() is in the before-quit registry (via ttsPaths). The worker
// stops itself after a quiet spell, so its engine heap (the dictionary is
// ~100 MB) is not held for a whole session after one click.

const IDLE_MS = 3 * 60_000

const enginePath = (): string =>
  app.isPackaged
    ? join(process.resourcesPath, 'openjtalk', 'open_jtalk.js')
    : join(app.getAppPath(), 'resources', 'openjtalk', 'open_jtalk.js')

type Job = { resolve: (wav: Uint8Array) => void; reject: (err: Error) => void }

interface Running {
  worker: Worker
  jobs: Map<number, Job>
}

let current: Running | null = null
let nextId = 1
let replacing = false
let idle: ReturnType<typeof setTimeout> | null = null

function failAll(run: Running, err: Error): void {
  for (const job of run.jobs.values()) job.reject(err)
  run.jobs.clear()
}

function touchIdle(): void {
  if (idle) clearTimeout(idle)
  idle = setTimeout(() => {
    if (current && current.jobs.size === 0) void stopTts()
  }, IDLE_MS)
  idle.unref()
}

function getRunning(): Running {
  if (current) return current
  const worker = new Worker(workerPath, {
    workerData: {
      enginePath: enginePath(),
      dicDir: join(voicePackDir(), packSubdir('dictionary')),
      voiceDir: join(voicePackDir(), packSubdir('voice')),
      args: openJTalkArgs()
    }
  })
  const run: Running = { worker, jobs: new Map() }
  worker.on('message', (msg: { id: number; wav?: Uint8Array; error?: string }) => {
    const job = run.jobs.get(msg.id)
    if (!job) return
    run.jobs.delete(msg.id)
    if (msg.wav) job.resolve(msg.wav)
    else job.reject(new Error(msg.error ?? 'Synthesis failed'))
  })
  // Each handler settles only its own worker's jobs, and clears `current` only
  // if it is still this worker: a late exit of a replaced worker must not
  // orphan or fail the one that took over.
  worker.on('error', (err) => {
    logWarn('app', `voice worker failed: ${err.message}`)
    failAll(run, err)
    if (current === run) current = null
  })
  worker.on('exit', () => {
    failAll(run, new Error('Voice worker stopped'))
    if (current === run) current = null
  })
  current = run
  return run
}

const service = createTtsService({
  packDir: voicePackDir(),
  cacheDir: ttsCacheDir(),
  enabled: () => !replacing,
  synth: (text, reading) =>
    new Promise((resolve, reject) => {
      const run = getRunning()
      const id = nextId++
      run.jobs.set(id, { resolve, reject })
      run.worker.postMessage({ id, text, reading })
      touchIdle()
    })
})

export const speak = (text: unknown, reading?: unknown): Promise<string | null> => service.speak(text, reading)

export function voiceInfo(): JpVoiceInfo {
  return { installed: voicePackInstalled() }
}

// Install and remove hold synthesis off for their whole run: the worker has
// the pack mounted, and a new one must not start against folders being swapped.
async function withPackReplaced<T>(fn: () => Promise<T>): Promise<T> {
  replacing = true
  try {
    await stopTts()
    return await fn()
  } finally {
    replacing = false
  }
}

export function installVoice(): Promise<JpVoiceInfo> {
  return withPackReplaced(async () => {
    await installVoicePack(voicePackDir())
    return voiceInfo()
  })
}

export function removeVoice(): Promise<JpVoiceInfo> {
  return withPackReplaced(async () => {
    await removeVoicePack(voicePackDir(), ttsCacheDir())
    return voiceInfo()
  })
}

export async function stopTts(): Promise<void> {
  if (idle) clearTimeout(idle)
  idle = null
  const run = current
  current = null
  if (run) await run.worker.terminate()
}

registerTtsStopper(stopTts)
