import { createWriteStream, existsSync } from 'fs'
import { rename, rm } from 'fs/promises'
import { Readable, Transform } from 'stream'
import { pipeline } from 'stream/promises'
import { currentActivitySignal } from './activityContext'

let partialCounter = 0

export interface StreamResponseOptions {
  label: string
  maxInputBytes: number
  maxOutputBytes?: number
  transform?: Transform
  replace?: boolean
  signal?: AbortSignal
  onProgress?: (done: number, total: number) => void
  validateTemp?: (path: string) => void | Promise<void>
  beforeCommit?: () => void | Promise<void>
}

export interface StreamResponseResult {
  inputBytes: number
  outputBytes: number
  reusedExisting: boolean
}

function byteCount(chunk: unknown): number {
  if (typeof chunk === 'string') return Buffer.byteLength(chunk)
  if (chunk instanceof Uint8Array) return chunk.byteLength
  throw new Error('Download stream produced an unsupported chunk')
}

function byteLimiter(
  label: string,
  maxBytes: number,
  onBytes?: (bytes: number) => void
): { stream: Transform; bytes: () => number } {
  let total = 0
  const stream = new Transform({
    transform(chunk, _encoding, callback) {
      try {
        total += byteCount(chunk)
        if (total > maxBytes) {
          callback(new Error(`${label} exceeds the ${maxBytes}-byte limit`))
          return
        }
        onBytes?.(total)
        callback(null, chunk)
      } catch (error) {
        callback(error instanceof Error ? error : new Error(String(error)))
      }
    }
  })
  return { stream, bytes: () => total }
}

function declaredLength(response: Response): number {
  const value = Number(response.headers.get('content-length'))
  return Number.isSafeInteger(value) && value >= 0 ? value : 0
}

function partialPath(destination: string): string {
  partialCounter += 1
  return `${destination}.part-${process.pid}-${partialCounter}`
}

// Streams one successful HTTP response to a sibling partial file and exposes
// the destination only after the stream, optional transform and validation all
// finish. Both the declared and observed response sizes are bounded; transformed
// output has an independent limit to contain decompression bombs.
export async function streamResponseToFile(
  response: Response,
  destination: string,
  options: StreamResponseOptions
): Promise<StreamResponseResult> {
  if (!response.body) throw new Error(`${options.label} response has no body`)
  const declared = declaredLength(response)
  if (declared > options.maxInputBytes) {
    throw new Error(`${options.label} exceeds the ${options.maxInputBytes}-byte limit`)
  }

  const tmp = partialPath(destination)
  const input = byteLimiter(options.label, options.maxInputBytes, (done) => {
    options.onProgress?.(done, declared)
  })
  const output = options.transform
    ? byteLimiter(
        `${options.label} expanded output`,
        options.maxOutputBytes ?? options.maxInputBytes
      )
    : input
  const signal = options.signal ?? currentActivitySignal()
  let committed = false

  try {
    options.onProgress?.(0, declared)
    const source = Readable.fromWeb(response.body as never)
    const writer = createWriteStream(tmp, { flags: 'wx' })
    if (options.transform) {
      await pipeline(source, input.stream, options.transform, output.stream, writer, { signal })
    } else {
      await pipeline(source, input.stream, writer, { signal })
    }
    options.onProgress?.(input.bytes(), declared)
    await options.validateTemp?.(tmp)
    await options.beforeCommit?.()

    if (!options.replace && existsSync(destination)) {
      return {
        inputBytes: input.bytes(),
        outputBytes: output.bytes(),
        reusedExisting: true
      }
    }
    await rename(tmp, destination)
    committed = true
    return {
      inputBytes: input.bytes(),
      outputBytes: output.bytes(),
      reusedExisting: false
    }
  } finally {
    if (!committed) await rm(tmp, { force: true }).catch(() => {})
  }
}
