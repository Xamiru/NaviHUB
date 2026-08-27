export const IMAGE_REVEAL_STAGE_SECONDS = 4
export const IMAGE_REVEAL_STAGES = [
  { points: 400, blur: 20, scale: 1.8 },
  { points: 300, blur: 12, scale: 1.5 },
  { points: 200, blur: 6, scale: 1.25 },
  { points: 100, blur: 0, scale: 1 }
] as const

export const IMAGE_REVEAL_SECONDS = IMAGE_REVEAL_STAGE_SECONDS * IMAGE_REVEAL_STAGES.length

export function imageRevealStageStyle(stage: number): { filter: string; transform: string } {
  const safe = IMAGE_REVEAL_STAGES[Math.max(0, Math.min(IMAGE_REVEAL_STAGES.length - 1, stage))]
  return { filter: `blur(${safe.blur}px)`, transform: `scale(${safe.scale})` }
}
