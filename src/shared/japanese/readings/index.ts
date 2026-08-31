import { N5_PASSAGES } from './n5'
import { N4_PASSAGES } from './n4'
import { N3_PASSAGES } from './n3'
import { N2_PASSAGES } from './n2'
import { N1_PASSAGES } from './n1'
import { EXPANDED_PASSAGES } from './expanded'
import type { JpPassage } from '../types'

// One file per level (the programming/ courses idiom) so authors never collide.
export const JP_PASSAGES: JpPassage[] = [
  ...N5_PASSAGES,
  ...N4_PASSAGES,
  ...N3_PASSAGES,
  ...N2_PASSAGES,
  ...N1_PASSAGES,
  ...EXPANDED_PASSAGES
]

export function jpPassage(key: string): JpPassage | undefined {
  return JP_PASSAGES.find((p) => p.key === key)
}
