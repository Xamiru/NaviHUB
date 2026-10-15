// Stage 1 is a blurred close-up of a random spot; each stage widens out
// toward it. The blur is applied before the zoom, so it scales with it.
export const IMAGE_REVEAL_STAGE_SECONDS = 4
// Typing a title needs longer than tapping one of four choices.
export const IMAGE_REVEAL_TYPED_STAGE_SECONDS = 6
export const IMAGE_REVEAL_STAGES = [
  { points: 400, blur: 14, scale: 2.6 },
  { points: 300, blur: 9, scale: 1.9 },
  { points: 200, blur: 4, scale: 1.35 },
  { points: 100, blur: 0, scale: 1 }
] as const

export const IMAGE_REVEAL_SECONDS = IMAGE_REVEAL_STAGE_SECONDS * IMAGE_REVEAL_STAGES.length

export type ImageRevealAnswerMode = 'choices' | 'typed'

export function imageRevealStageSeconds(mode: ImageRevealAnswerMode): number {
  return mode === 'typed' ? IMAGE_REVEAL_TYPED_STAGE_SECONDS : IMAGE_REVEAL_STAGE_SECONDS
}

/** Percent coordinates of the zoom's focal point. */
export interface ImageRevealFocus {
  x: number
  y: number
}

/**
 * A seeded focal point away from the edges, so the close-up shows a detail of
 * the image instead of always its centre (where cover titles tend to sit).
 */
export function imageRevealFocus(rng: () => number): ImageRevealFocus {
  return { x: Math.round(15 + rng() * 70), y: Math.round(15 + rng() * 70) }
}

export function imageRevealStageStyle(
  stage: number,
  focus: ImageRevealFocus = { x: 50, y: 50 }
): { filter: string; transform: string; transformOrigin: string } {
  const safe = IMAGE_REVEAL_STAGES[Math.max(0, Math.min(IMAGE_REVEAL_STAGES.length - 1, stage))]
  return {
    filter: `blur(${safe.blur}px)`,
    transform: `scale(${safe.scale})`,
    transformOrigin: `${focus.x}% ${focus.y}%`
  }
}
