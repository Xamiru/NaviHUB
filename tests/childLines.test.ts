import { EventEmitter } from 'events'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { onLines, pipeProcLines } from '../src/main/childLines'
import { __reset as resetLog, readLog } from '../src/main/logBus'

// A ReadableStream stand-in with just the surface childLines uses, so no real
// binary is ever spawned (the TagReader / Prober seam pattern).
class FakeStream extends EventEmitter {
  encoding: string | null = null
  setEncoding(enc: string): this {
    this.encoding = enc
    return this
  }
  feed(chunk: string): void {
    this.emit('data', chunk)
  }
  finish(): void {
    this.emit('end')
  }
}

function fakeProc(): { stdout: FakeStream; stderr: FakeStream } {
  return { stdout: new FakeStream(), stderr: new FakeStream() }
}

beforeEach(() => {
  resetLog()
})

describe('onLines', () => {
  it('splits on \\n', () => {
    const s = new FakeStream()
    const got: string[] = []
    onLines(s as unknown as NodeJS.ReadableStream, (l) => got.push(l))
    s.feed('one\ntwo\n')
    expect(got).toEqual(['one', 'two'])
  })

  it('splits on a bare \\r — the whole reason this is not readline', () => {
    // tqdm (mokuro) and ffmpeg draw progress with \r and no newline; readline
    // buffers a whole bar's worth of updates waiting for a \n that never comes.
    const s = new FakeStream()
    const got: string[] = []
    onLines(s as unknown as NodeJS.ReadableStream, (l) => got.push(l))
    s.feed(' 10%|#   | 1/10\r 20%|##  | 2/10\r')
    expect(got).toEqual([' 10%|#   | 1/10', ' 20%|##  | 2/10'])
  })

  it('handles \\r\\n without emitting a blank between them', () => {
    const s = new FakeStream()
    const got: string[] = []
    onLines(s as unknown as NodeJS.ReadableStream, (l) => got.push(l))
    s.feed('one\r\ntwo\r\n')
    expect(got).toEqual(['one', 'two'])
  })

  it('joins a line split across chunks', () => {
    const s = new FakeStream()
    const got: string[] = []
    onLines(s as unknown as NodeJS.ReadableStream, (l) => got.push(l))
    s.feed('[download] 4')
    s.feed('5.0% of 100MiB\n')
    expect(got).toEqual(['[download] 45.0% of 100MiB'])
  })

  it('flushes an unterminated final line at end', () => {
    const s = new FakeStream()
    const got: string[] = []
    onLines(s as unknown as NodeJS.ReadableStream, (l) => got.push(l))
    s.feed('no trailing newline')
    expect(got).toEqual([])
    s.finish()
    expect(got).toEqual(['no trailing newline'])
  })

  it('drops blank lines', () => {
    const s = new FakeStream()
    const got: string[] = []
    onLines(s as unknown as NodeJS.ReadableStream, (l) => got.push(l))
    s.feed('one\n\n   \ntwo\n')
    expect(got).toEqual(['one', 'two'])
  })
})

describe('pipeProcLines', () => {
  it('routes each stream to its own callback', () => {
    const proc = fakeProc()
    const out: string[] = []
    const err: string[] = []
    pipeProcLines(proc as never, {
      tool: 'mokuro',
      onStdout: (l) => out.push(l),
      onStderr: (l) => err.push(l)
    })
    proc.stdout.feed('out_time_ms=1000\n')
    proc.stderr.feed('Stream #0:0: Video: h264\n')
    // Each stream is delivered independently.
    expect(out).toEqual(['out_time_ms=1000'])
    expect(err).toEqual(['Stream #0:0: Video: h264'])
  })

  it('logs kept lines as proc rows against the task id', () => {
    const proc = fakeProc()
    pipeProcLines(proc as never, {
      tool: 'mokuro',
      taskId: 'mangaOcr-3',
      onStdout: () => undefined,
      onStderr: () => undefined
    })
    proc.stderr.feed('Traceback (most recent call last):\n')

    const entries = readLog({ afterSeq: 0.5 }).entries
    expect(entries).toHaveLength(1)
    expect(entries[0]!.source).toBe('proc')
    expect(entries[0]!.taskId).toBe('mangaOcr-3')
    expect(entries[0]!.message).toBe('mokuro: Traceback (most recent call last):')
  })

  it('thins progress spam so one run cannot evict the whole ring', () => {
    const proc = fakeProc()
    pipeProcLines(proc as never, {
      tool: 'ytdlp',
      onStdout: () => undefined,
      onStderr: () => undefined
    })
    // 100 progress updates, one per percent.
    for (let i = 0; i < 100; i++) proc.stdout.feed(`[download]  ${i}.0% of 100.00MiB\n`)

    // Only the 10% boundaries survive.
    expect(readLog({ afterSeq: 0.5, limit: 2000 }).entries).toHaveLength(10)
  })

  it('can keep machine-readable stdout out of the log', () => {
    const proc = fakeProc()
    const seen: string[] = []
    pipeProcLines(proc as never, {
      tool: 'ytdlp',
      logStdout: false,
      onStdout: (l) => seen.push(l),
      onStderr: () => undefined
    })
    for (let i = 0; i < 50; i++) proc.stdout.feed(`out_time_ms=${i * 1000}\nspeed=1.8x\n`)

    // The parser still sees every line…
    expect(seen).toHaveLength(100)
    // …but none of it reaches the log.
    expect(readLog({ afterSeq: 0.5, limit: 2000 }).entries).toHaveLength(0)
  })

  it('gives each stream its own percentage bucket', () => {
    const proc = fakeProc()
    pipeProcLines(proc as never, {
      tool: 'mokuro',
      onStdout: () => undefined,
      onStderr: () => undefined
    })
    // A shared bucket would swallow the second stream's identical percentage.
    proc.stdout.feed('50%|#####     | 5/10\n')
    proc.stderr.feed('50%|#####     | 5/10\n')
    expect(readLog({ afterSeq: 0.5 }).entries).toHaveLength(2)
  })

  it('the callback still sees lines the log filter drops', () => {
    const proc = fakeProc()
    const seen: string[] = []
    pipeProcLines(proc as never, {
      tool: 'ytdlp',
      onStdout: (l) => seen.push(l),
      onStderr: () => undefined
    })
    proc.stdout.feed('[download]   1.0% of 1MiB\n')
    proc.stdout.feed('[download]   2.0% of 1MiB\n')
    // The status object must keep updating smoothly even though only one of
    // these is worth a log row.
    expect(seen).toHaveLength(2)
    expect(readLog({ afterSeq: 0.5 }).entries).toHaveLength(1)
  })
})

describe('no console output', () => {
  it('logging a proc line writes nothing to the console', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
    const proc = fakeProc()
    pipeProcLines(proc as never, {
      tool: 'ytdlp',
      onStdout: () => undefined,
      onStderr: () => undefined
    })
    proc.stderr.feed('ERROR: unavailable video\n')
    expect(spy).not.toHaveBeenCalled()
    spy.mockRestore()
  })
})
