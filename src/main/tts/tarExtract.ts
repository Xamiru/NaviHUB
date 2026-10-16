import { createReadStream, createWriteStream, type WriteStream } from 'fs'
import { join } from 'path'
import { Writable } from 'stream'
import { pipeline } from 'stream/promises'
import { createGunzip } from 'zlib'
import { keptName, parseTarHeader, type TtsArchive } from './ttsCore'

// Streams a .tar.gz into `dir`, writing only the files keptName() allows. The
// whole unpacked stream is capped (`maxBytes`), so a hostile archive cannot
// fill the disk; nothing is buffered beyond one 512-byte block and a chunk.
// Any output-file error (a full disk, a duplicate name) fails the extraction
// rather than crashing the process or leaving it waiting forever.
export async function extractTarGz(
  file: string,
  dir: string,
  archive: TtsArchive,
  maxBytes: number,
  signal?: AbortSignal
): Promise<string[]> {
  const written: string[] = []
  let pending: Buffer<ArrayBufferLike> = Buffer.alloc(0)
  let total = 0
  // The entry being read: bytes left in it, its padding, and where it goes.
  let remaining = 0
  let padding = 0
  let out: WriteStream | null = null
  let outError: Error | null = null
  let longName: Buffer[] | null = null
  let nextName: string | null = null
  let ended = false

  const open = (name: string): void => {
    const stream = createWriteStream(join(dir, name), { flags: 'wx' })
    stream.on('error', (err) => {
      outError = err
    })
    out = stream
    written.push(name)
  }

  const finishFile = async (): Promise<void> => {
    if (!out) return
    const stream = out
    out = null
    await new Promise<void>((resolve, reject) => {
      stream.once('error', reject)
      stream.end(() => resolve())
    })
    if (outError) throw outError
  }

  // Waits for room in the file, failing on a write error instead of hanging.
  const drain = (stream: WriteStream): Promise<void> =>
    new Promise<void>((resolve, reject) => {
      const onDrain = (): void => {
        stream.off('error', onError)
        resolve()
      }
      const onError = (err: Error): void => {
        stream.off('drain', onDrain)
        reject(err)
      }
      stream.once('drain', onDrain)
      stream.once('error', onError)
    })

  const abandon = (): void => {
    out?.destroy()
    out = null
  }

  const sink = new Writable({
    async write(chunk: Buffer, _enc, callback) {
      try {
        total += chunk.length
        if (total > maxBytes) throw new Error(`${archive.key} archive unpacks beyond ${maxBytes} bytes`)
        pending = pending.length ? Buffer.concat([pending, chunk]) : chunk
        while (!ended) {
          if (outError) throw outError
          if (remaining > 0) {
            if (!pending.length) break
            const take = Math.min(remaining, pending.length)
            const part = pending.subarray(0, take)
            pending = pending.subarray(take)
            remaining -= take
            if (longName) longName.push(Buffer.from(part))
            else if (out) {
              const stream: WriteStream = out
              if (!stream.write(part)) await drain(stream)
            }
            if (remaining === 0) {
              if (longName) {
                nextName = Buffer.concat(longName).toString('utf8').replace(/\0+$/, '')
                longName = null
              }
              await finishFile()
            }
            continue
          }
          if (padding > 0) {
            if (!pending.length) break
            const take = Math.min(padding, pending.length)
            pending = pending.subarray(take)
            padding -= take
            continue
          }
          if (pending.length < 512) break
          const entry = parseTarHeader(pending.subarray(0, 512))
          pending = pending.subarray(512)
          if (entry.kind === 'end') {
            ended = true
            break
          }
          remaining = entry.size
          padding = (512 - (entry.size % 512)) % 512
          if (entry.kind === 'longname') {
            longName = []
            continue
          }
          const name = entry.kind === 'file' ? keptName(archive, nextName ?? entry.name) : null
          nextName = null
          if (name) {
            open(name)
            if (entry.size === 0) await finishFile()
          }
        }
        callback()
      } catch (err) {
        abandon()
        callback(err instanceof Error ? err : new Error(String(err)))
      }
    },
    async final(callback) {
      try {
        await finishFile()
        if (!ended) throw new Error(`${archive.key} archive ended early`)
        callback()
      } catch (err) {
        abandon()
        callback(err instanceof Error ? err : new Error(String(err)))
      }
    },
    destroy(err, callback) {
      abandon()
      callback(err)
    }
  })

  await pipeline(createReadStream(file), createGunzip(), sink, signal ? { signal } : {})
  return written
}
