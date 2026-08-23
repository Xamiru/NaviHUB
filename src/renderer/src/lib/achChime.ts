// The authentic Xbox 360 "Achievement Unlocked" chime — the file Microsoft
// itself published on Major Nelson's blog (news.xbox.com, 2011) for personal
// use, served byte-identical by two independent mirrors. Bundled as a renderer
// asset so the popup works fully offline; CSP's media-src 'self' covers it.
//
// The old oscillator homage is gone: a sample beats a synth impression, and at
// ~7 KB there is no bundle cost worth weighing.
//
// Lives ONLY in the popup overlay window (AchPopupPage) — never import it
// from anything inside the main window's provider tree, which owns the one
// global <audio> element.

import chimeUrl from '../assets/achievement-chime.mp3'

// One unlock chime. Safe to call before any user gesture: the popup window is
// created and shown by main without user interaction, and <audio>.play() on an
// Electron page has no autoplay-policy gate.
export function playUnlockChime(): void {
  try {
    const audio = new Audio(chimeUrl)
    void audio.play().catch(() => {
      // No audio device or the play raced the window closing: the popup still shows.
    })
  } catch {
    // See above — sound is decoration, the card is the point.
  }
}
