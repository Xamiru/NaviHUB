import { describe, expect, it } from 'vitest'
import {
  Ring,
  formatLine,
  levelAtLeast,
  makeProcLineFilter,
  redact,
  rotationPlan
} from '../src/main/logCore'
import type { LogEntry } from '../src/shared/types'

// logCore is the pure half of the logger: no electron, no fs, no timers. That
// is exactly why this file can import it directly with no mocks at all.

describe('levelAtLeast', () => {
  it('orders debug < info < warn < error', () => {
    expect(levelAtLeast('error', 'debug')).toBe(true)
    expect(levelAtLeast('debug', 'debug')).toBe(true)
    expect(levelAtLeast('info', 'warn')).toBe(false)
    expect(levelAtLeast('warn', 'warn')).toBe(true)
  })
})

describe('redact', () => {
  it('masks API keys in query strings', () => {
    expect(redact('GET https://api.themoviedb.org/3/movie/5?api_key=deadbeef1234')).toBe(
      'GET https://api.themoviedb.org/3/movie/5?api_key=***'
    )
    expect(redact('https://x.test/a?foo=1&apikey=secret&bar=2')).toBe(
      'https://x.test/a?foo=1&apikey=***&bar=2'
    )
    expect(redact('https://x.test/a?token=abc')).toBe('https://x.test/a?token=***')
  })

  // RetroAchievements is the one source whose credentials are single-letter
  // params, so no name-based rule reaches them. http.ts logs the full URL on
  // every retry and every >=400, and the log file is outside the export
  // sanitizer — an unredacted key here is a key in a file the user shares.
  it('masks the RetroAchievements z/y credential pair', () => {
    expect(
      redact(
        'HTTP 401: https://retroachievements.org/API/API_GetGameList.php?z=xamir&y=abc123KEY&i=1'
      )
    ).toBe('HTTP 401: https://retroachievements.org/API/API_GetGameList.php?z=***&y=***&i=1')
  })

  it('leaves single-letter params on other hosts alone', () => {
    expect(redact('https://maps.test/tile?x=12&y=34&z=5')).toBe(
      'https://maps.test/tile?x=12&y=34&z=5'
    )
  })

  it('is idempotent over an already-redacted RA url', () => {
    const once = redact('https://retroachievements.org/API/x.php?z=me&y=key')
    expect(redact(once)).toBe(once)
  })

  it('masks Authorization headers', () => {
    expect(redact('authorization: Bearer abc.def.ghi')).toBe('authorization: Bearer ***')
    expect(redact('Authorization: token 0123456789')).toBe('Authorization: token ***')
  })

  it('masks the API-Football authorization header', () => {
    expect(redact('x-apisports-key: secret-football-key')).toBe('x-apisports-key: ***')
    expect(redact('"x-apisports-key":"secret-football-key"')).toBe('"x-apisports-key":"***"')
  })

  it('masks GitHub tokens anywhere in the line', () => {
    expect(redact('bad credentials for ghp_abcdefghijklmnopqrstuvwxyz')).toBe(
      'bad credentials for ghp_***'
    )
    expect(redact('github_pat_11ABCDEFG0abcdefghij_more')).toBe('github_pat_***')
  })

  it('is idempotent — an already-redacted line survives a second pass', () => {
    const once = redact('https://x.test/a?api_key=hunter2&token=swordfish')
    expect(redact(once)).toBe(once)
  })

  it('leaves ordinary text alone', () => {
    const plain = 'importing 40 characters from AniList (media 12345)'
    expect(redact(plain)).toBe(plain)
  })
})

describe('formatLine', () => {
  const base: LogEntry = {
    seq: 1,
    ts: new Date(2026, 7, 14, 9, 5, 3, 47).getTime(),
    level: 'warn',
    source: 'http',
    taskId: null,
    message: 'slow host'
  }

  it('pads level and source into columns', () => {
    expect(formatLine(base)).toBe('2026-08-14 09:05:03.047 WARN  http  slow host')
  })

  it('includes the task id when there is one', () => {
    expect(formatLine({ ...base, taskId: 'import-7' })).toContain('[import-7] slow host')
  })
})

describe('rotationPlan', () => {
  it('does nothing below the cap', () => {
    expect(rotationPlan(1000, 2048, 3)).toEqual({ rotate: false, unlink: [], renames: [] })
  })

  it('shifts the chain newest-index-first so nothing is clobbered', () => {
    const plan = rotationPlan(4096, 2048, 3)
    expect(plan.rotate).toBe(true)
    expect(plan.unlink).toEqual(['navihub.3.log'])
    expect(plan.renames).toEqual([
      ['navihub.2.log', 'navihub.3.log'],
      ['navihub.1.log', 'navihub.2.log'],
      ['navihub.log', 'navihub.1.log']
    ])
  })

  it('keep=1 drops straight to one archive', () => {
    const plan = rotationPlan(4096, 2048, 1)
    expect(plan.unlink).toEqual(['navihub.1.log'])
    expect(plan.renames).toEqual([['navihub.log', 'navihub.1.log']])
  })

  it('keep=0 truncates with no history', () => {
    expect(rotationPlan(4096, 2048, 0)).toEqual({
      rotate: true,
      unlink: ['navihub.log'],
      renames: []
    })
  })
})

describe('Ring', () => {
  const entry = (seq: number): { seq: number } => ({ seq })

  it('retains only the newest cap entries', () => {
    const ring = new Ring<{ seq: number }>(3)
    for (let i = 1; i <= 5; i++) ring.push(entry(i))
    expect(ring.size).toBe(3)
    expect(ring.oldestSeq()).toBe(3)
    expect(ring.newestSeq()).toBe(5)
    expect([0, 1, 2].map((i) => ring.at(i).seq)).toEqual([3, 4, 5])
  })

  it('never reuses a seq as it wraps — a cursor can only move forward', () => {
    const ring = new Ring<{ seq: number }>(4)
    const seen: number[] = []
    for (let i = 1; i <= 20; i++) {
      ring.push(entry(i))
      seen.push(ring.newestSeq())
    }
    // Strictly increasing across the wrap; an index-based id would have reset.
    expect(seen).toEqual([...Array(20)].map((_, i) => i + 1))
    expect(ring.oldestSeq()).toBe(17)
  })

  it('firstIndexAfter finds the cursor position by binary search', () => {
    const ring = new Ring<{ seq: number }>(10)
    for (const s of [2, 4, 6, 8, 10]) ring.push(entry(s))
    expect(ring.firstIndexAfter(0)).toBe(0)
    expect(ring.firstIndexAfter(4)).toBe(2)
    expect(ring.firstIndexAfter(5)).toBe(2)
    expect(ring.firstIndexAfter(10)).toBe(5) // past the end == nothing new
  })

  it('reports an empty ring as seq 0 rather than throwing', () => {
    const ring = new Ring<{ seq: number }>(4)
    expect(ring.size).toBe(0)
    expect(ring.oldestSeq()).toBe(0)
    expect(ring.newestSeq()).toBe(0)
    expect(ring.firstIndexAfter(99)).toBe(0)
  })

  it('clear() resets it completely', () => {
    const ring = new Ring<{ seq: number }>(4)
    for (let i = 1; i <= 4; i++) ring.push(entry(i))
    ring.clear()
    expect(ring.size).toBe(0)
    ring.push(entry(99))
    expect(ring.at(0).seq).toBe(99)
  })
})

describe('makeProcLineFilter', () => {
  it('drops blank lines for every tool', () => {
    for (const tool of ['ytdlp', 'spotdl', 'mokuro'] as const) {
      expect(makeProcLineFilter(tool)('   ')).toBe(false)
    }
  })

  it('thins yt-dlp download percentages to 10% buckets', () => {
    const keep = makeProcLineFilter('ytdlp')
    expect(keep('[download]   0.0% of 100.00MiB')).toBe(true)
    expect(keep('[download]   3.2% of 100.00MiB')).toBe(false)
    expect(keep('[download]   9.9% of 100.00MiB')).toBe(false)
    expect(keep('[download]  10.1% of 100.00MiB')).toBe(true)
    expect(keep('[download]  11.0% of 100.00MiB')).toBe(false)
    expect(keep('[download]  25.0% of 100.00MiB')).toBe(true)
    // Non-percentage yt-dlp lines are always kept.
    expect(keep('[ExtractAudio] Destination: track.opus')).toBe(true)
  })

  it('thins mokuro tqdm bars to 25% buckets', () => {
    const keep = makeProcLineFilter('mokuro')
    expect(keep('0%|          | 0/26 [00:00<?, ?it/s]')).toBe(true)
    expect(keep('12%|█         | 3/26 [00:01<00:08, 2.9it/s]')).toBe(false)
    expect(keep('27%|██        | 7/26 [00:02<00:06, 2.9it/s]')).toBe(true)
    expect(keep('99%|█████████ | 25/26 [00:09<00:00, 2.9it/s]')).toBe(true)
    expect(keep('Traceback (most recent call last):')).toBe(true)
  })

  it('gives each spawn its own bucket state', () => {
    const a = makeProcLineFilter('ytdlp')
    const b = makeProcLineFilter('ytdlp')
    expect(a('[download]  50.0% of 1.00MiB')).toBe(true)
    expect(a('[download]  50.5% of 1.00MiB')).toBe(false)
    // A fresh filter must not inherit the other run's last bucket.
    expect(b('[download]  50.5% of 1.00MiB')).toBe(true)
  })
})
