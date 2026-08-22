// A synthesized stand-in for the Xbox 360 achievement chime: two bright bell
// strikes ("da-ding!") with inharmonic overtones and a noise sparkle, built
// from raw oscillators so no audio asset ships with the app and the popup
// works fully offline. Layered detuned pairs give it the metallic shimmer of
// the console original; it is an homage, not a sample.
//
// Lives ONLY in the popup overlay window (AchPopupPage) — never import it
// from anything inside the main window's provider tree, which owns the one
// global <audio> element.

let ctx: AudioContext | null = null

// Inharmonic partial stack of a struck metal bar: fundamental plus two
// non-integer overtones, quieter as they climb.
const PARTIALS: [number, number][] = [
  [1, 1],
  [2.76, 0.4],
  [5.4, 0.15]
]

function strike(t0: number, freq: number, dur: number, peak: number): void {
  const c = ctx!
  for (const [mult, amp] of PARTIALS) {
    // A slightly detuned pair per partial beats against itself — the "shimmer".
    for (const cents of [-4, 4]) {
      const osc = c.createOscillator()
      const gain = c.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq * mult
      osc.detune.value = cents
      const f = freq * mult > 4000 ? peak * amp * 0.5 : peak * amp
      gain.gain.setValueAtTime(0.0001, t0)
      gain.gain.exponentialRampToValueAtTime(Math.max(f, 0.0001), t0 + 0.008)
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
      osc.connect(gain).connect(c.destination)
      osc.start(t0)
      osc.stop(t0 + dur + 0.05)
    }
  }
}

function sparkle(t0: number): void {
  const c = ctx!
  const len = Math.floor(c.sampleRate * 0.12)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1
  const src = c.createBufferSource()
  src.buffer = buf
  const bp = c.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 6000
  bp.Q.value = 2.5
  const gain = c.createGain()
  gain.gain.setValueAtTime(0.06, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14)
  src.connect(bp).connect(gain).connect(c.destination)
  src.start(t0)
}

// One unlock chime. Safe to call before any user gesture: the popup window is
// created and shown by main without user interaction, so a suspended context
// gets a resume attempt and the chime simply stays silent if the browser
// refuses (it does not, for AudioContext without autoplay policy triggers in
// Electron).
export function playUnlockChime(): void {
  try {
    if (!ctx) ctx = new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    const t = ctx.currentTime + 0.02
    strike(t, 830.6, 0.45, 0.22) // "da" — G#5, quick decay
    strike(t + 0.19, 1108.7, 1.25, 0.3) // "ding!" — C#6, long tail
    sparkle(t + 0.19)
  } catch {
    // No audio device: the popup still shows.
  }
}
