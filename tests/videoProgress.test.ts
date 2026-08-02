import { describe, expect, it } from 'vitest'
import {
  applyProgressLine,
  emptyProgress,
  progressEta,
  progressPercent,
  progressTime,
  type FfProgress
} from '../src/main/video/progressParse'

const feed = (lines: string[], from: FfProgress = emptyProgress()): FfProgress =>
  lines.reduce(applyProgressLine, from)

// A real -progress block, verbatim in shape.
const BLOCK = (seconds: number, speed = '2.13x'): string[] => [
  `frame=${Math.round(seconds * 24)}`,
  'fps=53.2',
  'stream_0_0_q=-1.0',
  'total_size=10485760',
  `out_time_us=${Math.round(seconds * 1e6)}`,
  `out_time_ms=${Math.round(seconds * 1e6)}`,
  `out_time=00:00:0${seconds}.000000`,
  `speed=${speed}`,
  'progress=continue'
]

describe('applyProgressLine', () => {
  it('reads a full block', () => {
    const s = feed(BLOCK(5))
    expect(progressTime(s)).toBeCloseTo(5)
    expect(s.frame).toBe(120)
    expect(s.speed).toBe(2.13)
    expect(s.totalSize).toBe(10485760)
    expect(s.ended).toBe(false)
  })

  it('treats out_time_ms as MICROseconds, matching ffmpeg not its name', () => {
    // 5170000 "ms" is really 5.17s. Read as milliseconds it would be 86 minutes
    // and every ETA would be nonsense.
    const s = feed(['out_time_ms=5170000', 'progress=continue'])
    expect(progressTime(s)).toBeCloseTo(5.17)
  })

  it('prefers out_time_us, then out_time_ms, then the clock string', () => {
    expect(progressTime(feed(['out_time_us=1000000', 'out_time_ms=9000000', 'out_time=00:00:09.0']))).toBe(1)
    expect(progressTime(feed(['out_time_ms=2000000', 'out_time=00:00:09.0']))).toBe(2)
    expect(progressTime(feed(['out_time=01:02:03.500']))).toBeCloseTo(3723.5)
  })

  it('keeps the clock moving across blocks even without out_time_us', () => {
    // The regression that a "first writer wins" implementation causes: after
    // block one the time never updates again and the bar freezes.
    let s = feed(['out_time_ms=1000000', 'progress=continue'])
    s = feed(['out_time_ms=4000000', 'progress=continue'], s)
    expect(progressTime(s)).toBeCloseTo(4)
  })

  it('handles speed=N/A and ignores junk lines', () => {
    expect(feed(['speed=N/A']).speed).toBeNull()
    expect(feed(['speed=0.5x']).speed).toBe(0.5)
    const s = feed(['garbage without an equals', 'unknown_key=1'])
    expect(s).toEqual(emptyProgress())
  })

  it('flags the terminal block', () => {
    expect(feed(['progress=end']).ended).toBe(true)
    expect(feed(['progress=continue']).ended).toBe(false)
  })
})

describe('progressPercent / progressEta', () => {
  it('clamps to [0,100] and returns null without a duration', () => {
    expect(progressPercent(feed(BLOCK(5)), 10)).toBeCloseTo(50)
    expect(progressPercent(feed(BLOCK(5)), null)).toBeNull()
    expect(progressPercent(feed(BLOCK(5)), 0)).toBeNull()
    expect(progressPercent(feed(['out_time_us=99000000']), 10)).toBe(100)
    expect(progressPercent(emptyProgress(), 10)).toBeNull()
  })

  it('reports 100 once ffmpeg says end, even mid-file', () => {
    // The +faststart rewrite happens after this point, which is exactly why the
    // caller needs a separate 'finalizing' state rather than trusting the bar.
    expect(progressPercent(feed(['out_time_us=1000000', 'progress=end']), 600)).toBe(100)
  })

  it('derives an ETA from the reported speed', () => {
    expect(progressEta(feed(BLOCK(5, '2x')), 105)).toBeCloseTo(50)
    expect(progressEta(feed(BLOCK(5, 'N/A')), 105)).toBeNull()
    expect(progressEta(feed(BLOCK(5, '2x')), null)).toBeNull()
    expect(progressEta(feed(BLOCK(5, '2x')), 5)).toBe(0)
  })
})
