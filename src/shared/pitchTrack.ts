// Pitch tracking + contour comparison for the Speak drill — pure DSP over
// Float32Array frames, zero deps, so vitest drives it with synthesized
// signals. The renderer records (lib/usePitchRecorder.ts) and draws; this
// module owns every decision: YIN F0 estimation, contour cleanup, semitone
// normalization (SHAPE, never absolute Hz), the idealized target from a
// Kanjium downstep position, and the per-mora rise/fall/flat comparison.
//
// Honest limits, by design: equal-TIME mora slicing (Japanese is mora-timed;
// no forced alignment offline), shape-only grading (no segmental checking —
// say the wrong word and the grade is meaningless; the UI says so), and odaka
// in isolation ≡ heiban (the drop lands on the particle, which isn't spoken).

// ---- constants (exported: tests pin them, the UI cites them, tuning is one line) ----
export const ANALYSIS_RATE = 16000 // Hz — downsample target; halves aren't needed for F0
export const FRAME_SIZE = 1024 // ≈64 ms at 16 kHz
export const HOP = 160 // ≈10 ms
export const F_MIN = 60 // Hz — creaky male floor
export const F_MAX = 500 // Hz — high female ceiling
export const YIN_THRESHOLD = 0.14 // CMNDF absolute threshold
export const RMS_FLOOR = 0.008 // absolute silence gate
export const RMS_GATE_RATIO = 0.1 // frame RMS must beat ratio × p95 utterance RMS
export const MEDIAN_WINDOW = 5
export const OCTAVE_JUMP_ST = 7 // semitones vs previous voiced frame → try ×2/÷2
export const STEP_DEADZONE_ST = 1.0 // |Δ| between mora means below this = flat
export const SLICE_MIN_VOICED = 0.35 // a mora slice under this voiced ratio = unclear
export const MIN_VOICED_RATIO = 0.3 // whole take under this = no usable voice
export const MAX_TAKE_SECONDS = 6

// ---- pipeline ----

// Integer-factor boxcar decimation toward `target` Hz. Crude anti-aliasing is
// fine for F0 (everything of interest is < 500 Hz) and cuts naive-YIN cost ~9×.
export function downsampleTo(
  samples: Float32Array,
  sampleRate: number,
  target = ANALYSIS_RATE
): { samples: Float32Array; sampleRate: number } {
  const factor = Math.max(1, Math.floor(sampleRate / target))
  if (factor === 1) return { samples, sampleRate }
  const out = new Float32Array(Math.floor(samples.length / factor))
  for (let i = 0; i < out.length; i++) {
    let sum = 0
    const base = i * factor
    for (let j = 0; j < factor; j++) sum += samples[base + j]
    out[i] = sum / factor
  }
  return { samples: out, sampleRate: sampleRate / factor }
}

// Plain YIN (de Cheveigné & Kawahara 2002): difference function over half the
// frame, cumulative-mean normalization, first dip under the threshold descended
// to its local minimum, parabolic interpolation for sub-sample lag. Returns
// null f0 when no dip clears the threshold (unvoiced/noise).
export function yin(
  frame: Float32Array,
  sampleRate: number
): { f0: number | null; aperiodicity: number } {
  const w = Math.floor(frame.length / 2)
  const tauMin = Math.max(2, Math.floor(sampleRate / F_MAX))
  const tauMax = Math.min(w - 1, Math.ceil(sampleRate / F_MIN))
  if (tauMax <= tauMin) return { f0: null, aperiodicity: 1 }

  // Difference function d(τ).
  const d = new Float64Array(tauMax + 1)
  for (let tau = tauMin; tau <= tauMax; tau++) {
    let sum = 0
    for (let i = 0; i < w; i++) {
      const diff = frame[i] - frame[i + tau]
      sum += diff * diff
    }
    d[tau] = sum
  }
  // Cumulative mean normalized difference d'(τ).
  const cmndf = new Float64Array(tauMax + 1)
  let running = 0
  for (let tau = tauMin; tau <= tauMax; tau++) {
    running += d[tau]
    cmndf[tau] = running === 0 ? 1 : (d[tau] * (tau - tauMin + 1)) / running
  }
  // First τ under the threshold, descended to its local minimum.
  let tau = -1
  for (let t = tauMin; t <= tauMax; t++) {
    if (cmndf[t] < YIN_THRESHOLD) {
      while (t + 1 <= tauMax && cmndf[t + 1] < cmndf[t]) t++
      tau = t
      break
    }
  }
  if (tau === -1) {
    let best = 1
    for (let t = tauMin; t <= tauMax; t++) if (cmndf[t] < best) best = cmndf[t]
    return { f0: null, aperiodicity: best }
  }
  // Parabolic interpolation over cmndf around τ.
  let refined = tau
  if (tau > tauMin && tau < tauMax) {
    const a = cmndf[tau - 1]
    const b = cmndf[tau]
    const c = cmndf[tau + 1]
    const denom = a - 2 * b + c
    if (denom !== 0) refined = tau + (0.5 * (a - c)) / denom
  }
  return { f0: sampleRate / refined, aperiodicity: cmndf[tau] }
}

// Isolated octave errors (halving/doubling for 1-2 frames) get folded back to
// the neighborhood; sustained shifts are left alone — they may be real.
export function correctOctaveJumps(f0s: (number | null)[]): (number | null)[] {
  const out = [...f0s]
  let prev: number | null = null
  for (let i = 0; i < out.length; i++) {
    const f = out[i]
    if (f === null) continue
    if (prev !== null) {
      const st = 12 * Math.log2(f / prev)
      if (Math.abs(st) > OCTAVE_JUMP_ST) {
        // Only "fix" if a ×2 or ÷2 lands near the previous frame AND the jump
        // does not persist (the next voiced frame agrees with prev, not f).
        let next: number | null = null
        for (let j = i + 1; j < out.length; j++) {
          if (out[j] !== null) {
            next = out[j]
            break
          }
        }
        const sustained = next !== null && Math.abs(12 * Math.log2(next / prev)) > OCTAVE_JUMP_ST
        if (!sustained) {
          for (const candidate of [f / 2, f * 2]) {
            if (Math.abs(12 * Math.log2(candidate / prev)) <= OCTAVE_JUMP_ST) {
              out[i] = candidate
              break
            }
          }
        }
      }
    }
    prev = out[i]
  }
  return out
}

// Median filter over voiced frames; nulls stay null (voicing decisions are
// the RMS gate's job, not the smoother's).
export function medianFilterF0(f0s: (number | null)[], window = MEDIAN_WINDOW): (number | null)[] {
  const half = Math.floor(window / 2)
  return f0s.map((f, i) => {
    if (f === null) return null
    const neighborhood: number[] = []
    for (let j = Math.max(0, i - half); j <= Math.min(f0s.length - 1, i + half); j++) {
      const v = f0s[j]
      if (v !== null) neighborhood.push(v)
    }
    neighborhood.sort((a, b) => a - b)
    return neighborhood[Math.floor(neighborhood.length / 2)]
  })
}

export interface ContourFrame {
  t: number // frame-center seconds
  f0: number | null
}

// samples (any rate) → cleaned F0 contour.
export function extractContour(samples: Float32Array, sampleRate: number): ContourFrame[] {
  const ds = downsampleTo(samples, sampleRate)
  const frames: { t: number; frame: Float32Array; rms: number }[] = []
  for (let start = 0; start + FRAME_SIZE <= ds.samples.length; start += HOP) {
    const frame = ds.samples.subarray(start, start + FRAME_SIZE)
    let sum = 0
    for (let i = 0; i < frame.length; i++) sum += frame[i] * frame[i]
    frames.push({
      t: (start + FRAME_SIZE / 2) / ds.sampleRate,
      frame,
      rms: Math.sqrt(sum / frame.length)
    })
  }
  if (frames.length === 0) return []
  const sortedRms = frames.map((f) => f.rms).sort((a, b) => a - b)
  const p95 = sortedRms[Math.min(sortedRms.length - 1, Math.floor(sortedRms.length * 0.95))]
  const gate = Math.max(RMS_FLOOR, RMS_GATE_RATIO * p95)

  const raw: (number | null)[] = frames.map(({ frame, rms }) => {
    if (rms < gate) return null
    return yin(frame, ds.sampleRate).f0
  })
  const cleaned = medianFilterF0(correctOctaveJumps(raw))
  return frames.map((f, i) => ({ t: f.t, f0: cleaned[i] }))
}

export interface NormalizedContour {
  frames: { t: number; st: number | null }[] // semitones re: voiced median
  medianHz: number
  voicedRatio: number // inside the trimmed region
  duration: number // trimmed voiced span, seconds
}

// Trim leading/trailing unvoiced frames, convert to semitones relative to the
// voiced median (SHAPE, never Hz). null = nothing usable in the take.
export function normalizeContour(frames: ContourFrame[]): NormalizedContour | null {
  let first = -1
  let last = -1
  for (let i = 0; i < frames.length; i++) {
    if (frames[i].f0 !== null) {
      if (first === -1) first = i
      last = i
    }
  }
  if (first === -1) return null
  const region = frames.slice(first, last + 1)
  const voiced = region.filter((f) => f.f0 !== null).map((f) => f.f0!)
  const voicedRatio = voiced.length / region.length
  if (voicedRatio < MIN_VOICED_RATIO) return null
  const sorted = [...voiced].sort((a, b) => a - b)
  const medianHz = sorted[Math.floor(sorted.length / 2)]
  return {
    frames: region.map((f) => ({
      t: f.t,
      st: f.f0 === null ? null : 12 * Math.log2(f.f0 / medianHz)
    })),
    medianHz,
    voicedRatio,
    duration: region.length > 1 ? region[region.length - 1].t - region[0].t : 0
  }
}

// ---- target side ----

// The H/L level of each mora for a downstep position — the ONE truth shared
// with PitchAccent.tsx (which imports this): 0 = heiban (low, then high and
// stays high); 1 = atamadaka (high, then low); >=2 = low, high up to the drop.
export function targetLevels(position: number, moraCount: number): boolean[] {
  const isHigh = (i: number): boolean => {
    if (position === 0) return i !== 0
    if (position === 1) return i === 0
    return i !== 0 && i < position
  }
  return Array.from({ length: moraCount }, (_, i) => isHigh(i))
}

export type StepDir = 'rise' | 'fall' | 'flat'

export function targetSteps(levels: boolean[]): StepDir[] {
  const out: StepDir[] = []
  for (let i = 0; i + 1 < levels.length; i++) {
    out.push(levels[i] === levels[i + 1] ? 'flat' : levels[i + 1] ? 'rise' : 'fall')
  }
  return out
}

// ---- comparison ----

export interface MoraSlice {
  st: number | null // mean semitones over voiced frames; null when too unvoiced
  voicedRatio: number
}

// Equal TIME slices of the trimmed voiced region — crude but honest (Japanese
// is mora-timed; forced alignment is out of scope offline).
export function moraSlices(contour: NormalizedContour, moraCount: number): MoraSlice[] {
  const frames = contour.frames
  if (frames.length === 0 || moraCount <= 0) return []
  const out: MoraSlice[] = []
  for (let m = 0; m < moraCount; m++) {
    const from = Math.floor((m * frames.length) / moraCount)
    const to = Math.max(from + 1, Math.floor(((m + 1) * frames.length) / moraCount))
    const slice = frames.slice(from, to)
    const voiced = slice.filter((f) => f.st !== null).map((f) => f.st!)
    const voicedRatio = slice.length ? voiced.length / slice.length : 0
    out.push({
      st: voicedRatio >= SLICE_MIN_VOICED && voiced.length > 0
        ? voiced.reduce((a, b) => a + b, 0) / voiced.length
        : null,
      voicedRatio
    })
  }
  return out
}

export interface CompareResult {
  steps: { expected: StepDir; got: StepDir | 'unclear'; ok: boolean | null }[]
  moraVerdicts: ('ok' | 'miss' | 'unclear')[]
  matched: number
  graded: number // excludes unclear steps
  matchPct: number // matched/graded; 0 when nothing gradable
  spuriousFall: boolean // target had no fall but the user fell hard
  odakaNote: boolean // position >= moraCount: the drop lands on the particle
}

export function compareToTarget(slices: MoraSlice[], position: number): CompareResult {
  const moraCount = slices.length
  const expected = targetSteps(targetLevels(position, moraCount))
  const odakaNote = position >= moraCount && position > 0

  const steps: CompareResult['steps'] = []
  let matched = 0
  let graded = 0
  let spuriousFall = false
  for (let i = 0; i < expected.length; i++) {
    const a = slices[i]
    const b = slices[i + 1]
    if (a.st === null || b.st === null) {
      steps.push({ expected: expected[i], got: 'unclear', ok: null })
      continue
    }
    const delta = b.st - a.st
    const got: StepDir = delta > STEP_DEADZONE_ST ? 'rise' : delta < -STEP_DEADZONE_ST ? 'fall' : 'flat'
    let ok: boolean
    if (expected[i] === 'rise') {
      // The initial L→H rise is subtle in real speech: flat passes, a fall never does.
      ok = got === 'rise' || (i === 0 && got === 'flat')
    } else if (expected[i] === 'fall') {
      ok = got === 'fall'
    } else {
      ok = got === 'flat'
      if (got === 'fall') spuriousFall = true
    }
    steps.push({ expected: expected[i], got, ok })
    graded++
    if (ok) matched++
  }

  // Per-mora verdicts derived from adjacent steps: a mora is ok when every
  // step touching it is ok; unclear when any touching step is unclear.
  const moraVerdicts: CompareResult['moraVerdicts'] = []
  for (let m = 0; m < moraCount; m++) {
    const touching = steps.filter((_, i) => i === m - 1 || i === m)
    if (touching.length === 0) {
      moraVerdicts.push('ok')
    } else if (touching.some((s) => s.ok === null)) {
      moraVerdicts.push('unclear')
    } else {
      moraVerdicts.push(touching.every((s) => s.ok) ? 'ok' : 'miss')
    }
  }

  return {
    steps,
    moraVerdicts,
    matched,
    graded,
    matchPct: graded === 0 ? 0 : matched / graded,
    spuriousFall,
    odakaNote
  }
}
