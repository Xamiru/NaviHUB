import { describe, expect, it } from 'vitest'
import {
  ANALYSIS_RATE,
  FRAME_SIZE,
  MIN_VOICED_RATIO,
  STEP_DEADZONE_ST,
  compareToTarget,
  correctOctaveJumps,
  downsampleTo,
  extractContour,
  medianFilterF0,
  moraSlices,
  normalizeContour,
  targetLevels,
  targetSteps,
  yin,
  type ContourFrame,
  type MoraSlice
} from '../src/shared/pitchTrack'

// ---- signal builders (deterministic, no rng) ----

function sine(freq: number, seconds: number, sampleRate: number, amp = 0.5): Float32Array {
  const out = new Float32Array(Math.floor(seconds * sampleRate))
  for (let i = 0; i < out.length; i++) out[i] = amp * Math.sin((2 * Math.PI * freq * i) / sampleRate)
  return out
}

function silence(seconds: number, sampleRate: number): Float32Array {
  return new Float32Array(Math.floor(seconds * sampleRate))
}

// Deterministic pseudo-noise (LCG), amp scaled.
function noise(seconds: number, sampleRate: number, amp = 0.5): Float32Array {
  const out = new Float32Array(Math.floor(seconds * sampleRate))
  let s = 12345
  for (let i = 0; i < out.length; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    out[i] = amp * ((s / 0x7fffffff) * 2 - 1)
  }
  return out
}

function concat(...parts: Float32Array[]): Float32Array {
  const total = parts.reduce((n, p) => n + p.length, 0)
  const out = new Float32Array(total)
  let off = 0
  for (const p of parts) {
    out.set(p, off)
    off += p.length
  }
  return out
}

const frameOf = (freq: number): Float32Array => sine(freq, FRAME_SIZE / ANALYSIS_RATE, ANALYSIS_RATE)

describe('yin', () => {
  it('finds pure-sine F0 within ~1 Hz', () => {
    for (const f of [110, 220, 440]) {
      const { f0 } = yin(frameOf(f), ANALYSIS_RATE)
      expect(f0, `${f} Hz`).not.toBeNull()
      expect(Math.abs(f0! - f)).toBeLessThan(1.5)
    }
  })

  it('detects near the F_MIN/F_MAX bounds', () => {
    expect(Math.abs(yin(frameOf(70), ANALYSIS_RATE).f0! - 70)).toBeLessThan(2)
    expect(Math.abs(yin(frameOf(480), ANALYSIS_RATE).f0! - 480)).toBeLessThan(5)
  })

  it('returns null on silence and on noise', () => {
    expect(yin(new Float32Array(FRAME_SIZE), ANALYSIS_RATE).f0).toBeNull()
    expect(yin(noise(FRAME_SIZE / ANALYSIS_RATE, ANALYSIS_RATE), ANALYSIS_RATE).f0).toBeNull()
  })

  it('survives 10% additive noise', () => {
    const clean = frameOf(220)
    const dirty = noise(FRAME_SIZE / ANALYSIS_RATE, ANALYSIS_RATE, 0.05)
    const mixed = new Float32Array(FRAME_SIZE)
    for (let i = 0; i < FRAME_SIZE; i++) mixed[i] = clean[i] + dirty[i]
    const { f0 } = yin(mixed, ANALYSIS_RATE)
    expect(Math.abs(f0! - 220)).toBeLessThan(3)
  })
})

describe('downsampleTo', () => {
  it('preserves F0 through 48k → 16k decimation', () => {
    const s48 = sine(220, 0.2, 48000)
    const ds = downsampleTo(s48, 48000)
    expect(ds.sampleRate).toBe(16000)
    const { f0 } = yin(ds.samples.subarray(0, FRAME_SIZE), ds.sampleRate)
    expect(Math.abs(f0! - 220)).toBeLessThan(3)
  })

  it('passes 16k through untouched', () => {
    const s = sine(220, 0.1, 16000)
    const ds = downsampleTo(s, 16000)
    expect(ds.samples).toBe(s)
  })
})

describe('extractContour', () => {
  it('tracks a 150→250 Hz sweep as rising, with silent edges unvoiced', () => {
    const sr = 48000
    const seconds = 1
    const sweep = new Float32Array(sr * seconds)
    let phase = 0
    for (let i = 0; i < sweep.length; i++) {
      const f = 150 + (100 * i) / sweep.length
      phase += (2 * Math.PI * f) / sr
      sweep[i] = 0.5 * Math.sin(phase)
    }
    const samples = concat(silence(0.1, sr), sweep, silence(0.1, sr))
    const contour = extractContour(samples, sr)
    const voiced = contour.filter((c) => c.f0 !== null)
    expect(voiced.length).toBeGreaterThan(30)
    // Rising overall: last voiced clearly above first voiced.
    expect(voiced[voiced.length - 1].f0!).toBeGreaterThan(voiced[0].f0! + 60)
    // Leading frames (fully inside the silent head) unvoiced.
    expect(contour[0].f0).toBeNull()
  })
})

describe('post-processors', () => {
  it('fixes an isolated halving error', () => {
    const fixed = correctOctaveJumps([200, 200, 100, 200])
    expect(fixed).toEqual([200, 200, 200, 200])
  })

  it('leaves a sustained shift alone', () => {
    const fixed = correctOctaveJumps([200, 400, 400, 400])
    expect(fixed).toEqual([200, 400, 400, 400])
  })

  it('median filter kills a single spike, keeps nulls', () => {
    const filtered = medianFilterF0([200, 200, 900, 200, null, 200], 5)
    expect(filtered[2]).toBe(200)
    expect(filtered[4]).toBeNull()
  })
})

describe('normalizeContour', () => {
  const frames = (f0s: (number | null)[]): ContourFrame[] =>
    f0s.map((f0, i) => ({ t: i * 0.01, f0 }))

  it('centers on the voiced median in semitones and trims edges', () => {
    const n = normalizeContour(frames([null, 200, 200, 400, null]))!
    expect(n.frames).toHaveLength(3)
    expect(n.medianHz).toBe(200)
    expect(n.frames[0].st).toBeCloseTo(0, 5)
    expect(n.frames[2].st).toBeCloseTo(12, 5) // one octave up
  })

  it('returns null for no voice or sparse voicing', () => {
    expect(normalizeContour(frames([null, null]))).toBeNull()
    // 2 voiced of 10 inside the trimmed span < MIN_VOICED_RATIO
    const sparse = [200, null, null, null, null, null, null, null, null, 200]
    expect(2 / 10).toBeLessThan(MIN_VOICED_RATIO)
    expect(normalizeContour(frames(sparse))).toBeNull()
  })
})

describe('targetLevels / targetSteps', () => {
  it('matches the PitchAccent semantics truth table', () => {
    expect(targetLevels(0, 3)).toEqual([false, true, true]) // heiban LHH
    expect(targetLevels(1, 3)).toEqual([true, false, false]) // atamadaka HLL
    expect(targetLevels(2, 3)).toEqual([false, true, false]) // nakadaka LHL
    expect(targetLevels(3, 3)).toEqual([false, true, true]) // odaka ≡ heiban in isolation
    expect(targetLevels(2, 4)).toEqual([false, true, false, false])
  })

  it('derives steps', () => {
    expect(targetSteps([false, true, true])).toEqual(['rise', 'flat'])
    expect(targetSteps([true, false, false])).toEqual(['fall', 'flat'])
  })
})

describe('moraSlices', () => {
  it('averages per equal time slice', () => {
    const contour = normalizeContour(
      Array.from({ length: 20 }, (_, i) => ({ t: i * 0.01, f0: i < 10 ? 200 : 200 * 2 ** (4 / 12) }))
    )!
    const slices = moraSlices(contour, 2)
    expect(slices[0].st!).toBeCloseTo(slices[1].st! - 4, 1)
  })

  it('marks a mostly-unvoiced slice unclear (null st)', () => {
    const frames: ContourFrame[] = [
      ...Array.from({ length: 10 }, (_, i) => ({ t: i * 0.01, f0: 200 })),
      ...Array.from({ length: 9 }, (_, i) => ({ t: 0.1 + i * 0.01, f0: null as number | null })),
      { t: 0.2, f0: 200 }
    ]
    const contour = normalizeContour(frames)!
    const slices = moraSlices(contour, 2)
    expect(slices[0].st).not.toBeNull()
    expect(slices[1].st).toBeNull()
  })
})

describe('compareToTarget', () => {
  const s = (st: number | null): MoraSlice => ({ st, voicedRatio: st === null ? 0 : 1 })

  it('clean atamadaka H→L matches fully', () => {
    const r = compareToTarget([s(3), s(-3), s(-3)], 1)
    expect(r.matchPct).toBe(1)
    expect(r.moraVerdicts).toEqual(['ok', 'ok', 'ok'])
  })

  it('a hard fall on heiban sets spuriousFall and misses', () => {
    const r = compareToTarget([s(-2), s(3), s(-3)], 0)
    expect(r.spuriousFall).toBe(true)
    expect(r.matchPct).toBeLessThan(1)
  })

  it('unclear slices are excluded from grading', () => {
    const r = compareToTarget([s(0), s(null), s(2)], 2)
    expect(r.graded).toBe(0)
    expect(r.steps.every((x) => x.got === 'unclear')).toBe(true)
    expect(r.moraVerdicts).toContain('unclear')
  })

  it('deadzone reads small movement as flat; first rise leniently accepts flat', () => {
    const half = STEP_DEADZONE_ST / 2
    const r = compareToTarget([s(0), s(half), s(half)], 0) // heiban, barely-moving
    expect(r.steps[0].got).toBe('flat')
    expect(r.steps[0].ok).toBe(true) // lenient first rise
    expect(r.matchPct).toBe(1)
  })

  it('the first-rise leniency never accepts a fall', () => {
    const r = compareToTarget([s(2), s(-2), s(-2)], 0)
    expect(r.steps[0].ok).toBe(false)
  })

  it('flags odaka in isolation', () => {
    const r = compareToTarget([s(-2), s(1), s(2)], 3)
    expect(r.odakaNote).toBe(true)
    expect(compareToTarget([s(-2), s(1), s(2)], 0).odakaNote).toBe(false)
  })
})

describe('end to end', () => {
  it('grades a synthesized H-L-L utterance as atamadaka', () => {
    const sr = 48000
    const seg = (f: number): Float32Array => sine(f, 0.15, sr)
    const gap = silence(0.02, sr)
    const samples = concat(silence(0.05, sr), seg(260), gap, seg(196), gap, seg(185), silence(0.05, sr))
    const contour = extractContour(samples, sr)
    const normalized = normalizeContour(contour)!
    expect(normalized).not.toBeNull()
    const slices = moraSlices(normalized, 3)
    const result = compareToTarget(slices, 1) // atamadaka
    expect(result.graded).toBeGreaterThan(0)
    expect(result.matchPct).toBe(1)
  })
})
