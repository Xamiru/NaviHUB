import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { gzipSync } from 'zlib'
import { createGunzip } from 'zlib'
import { afterEach, describe, expect, it } from 'vitest'
import { streamResponseToFile } from '../src/main/streamDownload'

const roots: string[] = []

function root(): string {
  const path = mkdtempSync(join(tmpdir(), 'navihub-stream-'))
  roots.push(path)
  return path
}

function response(chunks: Uint8Array[], declared?: number): Response {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(chunk)
        controller.close()
      }
    }),
    { headers: declared == null ? undefined : { 'content-length': String(declared) } }
  )
}

function partials(path: string): string[] {
  return readdirSync(path).filter((name) => name.includes('.part-'))
}

afterEach(() => {
  for (const path of roots.splice(0)) rmSync(path, { recursive: true, force: true })
})

describe('streamResponseToFile', () => {
  it('streams exact bytes through a sibling partial and publishes only the final file', async () => {
    const dir = root()
    const destination = join(dir, 'image.bin')
    const chunks = [Buffer.from('streamed '), Buffer.from('content')]
    const result = await streamResponseToFile(response(chunks, 16), destination, {
      label: 'Test image',
      maxInputBytes: 32
    })

    expect(readFileSync(destination, 'utf8')).toBe('streamed content')
    expect(result).toEqual({ inputBytes: 16, outputBytes: 16, reusedExisting: false })
    expect(partials(dir)).toEqual([])
  })

  it('streams gzip expansion with independent compressed and expanded limits', async () => {
    const dir = root()
    const destination = join(dir, 'catalog.db')
    const plain = Buffer.from('catalog row\n'.repeat(500))
    const compressed = gzipSync(plain)

    const result = await streamResponseToFile(response([compressed], compressed.length), destination, {
      label: 'Catalog',
      maxInputBytes: compressed.length,
      maxOutputBytes: plain.length,
      transform: createGunzip()
    })

    expect(readFileSync(destination)).toEqual(plain)
    expect(result.inputBytes).toBe(compressed.length)
    expect(result.outputBytes).toBe(plain.length)
  })

  it('rejects an oversized declared length before reading or creating a partial', async () => {
    const dir = root()
    const destination = join(dir, 'too-large.bin')
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        controller.enqueue(Buffer.from('x'))
        controller.close()
      }
    })

    await expect(
      streamResponseToFile(
        new Response(body, { headers: { 'content-length': '100' } }),
        destination,
        { label: 'Asset', maxInputBytes: 10 }
      )
    ).rejects.toThrow(/exceeds/)
    expect(readdirSync(dir)).toEqual([])
  })

  it('removes the partial and preserves an old destination when observed bytes exceed the limit', async () => {
    const dir = root()
    const destination = join(dir, 'existing.bin')
    writeFileSync(destination, 'old')

    await expect(
      streamResponseToFile(response([Buffer.from('123456'), Buffer.from('789012')]), destination, {
        label: 'Asset',
        maxInputBytes: 10,
        replace: true
      })
    ).rejects.toThrow(/exceeds/)
    expect(readFileSync(destination, 'utf8')).toBe('old')
    expect(partials(dir)).toEqual([])
  })

  it('validates the completed partial before replacing a known-good destination', async () => {
    const dir = root()
    const destination = join(dir, 'catalog.db')
    writeFileSync(destination, 'known-good')

    await expect(
      streamResponseToFile(response([Buffer.from('bad')]), destination, {
        label: 'Catalog',
        maxInputBytes: 10,
        replace: true,
        validateTemp: () => {
          throw new Error('invalid catalog')
        }
      })
    ).rejects.toThrow('invalid catalog')
    expect(readFileSync(destination, 'utf8')).toBe('known-good')
    expect(partials(dir)).toEqual([])
  })

  it('aborts a stalled body and cleans its partial file', async () => {
    const dir = root()
    const destination = join(dir, 'cancelled.bin')
    const controller = new AbortController()
    const body = new ReadableStream<Uint8Array>({
      start(stream) {
        stream.enqueue(Buffer.from('partial'))
      }
    })
    const pending = streamResponseToFile(new Response(body), destination, {
      label: 'Asset',
      maxInputBytes: 100,
      signal: controller.signal
    })
    controller.abort()

    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(readdirSync(dir)).toEqual([])
  })
})
