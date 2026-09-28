// JoJo: a title's six Stand parameters, graded A (best) to E like the anime's
// eyecatch cards, from the title's own tracking data. Pure so it can be tested.
export type StandGrade = 'A' | 'B' | 'C' | 'D' | 'E'

export interface StandParameter {
  label: string
  value: number
  grade: StandGrade
  detail: string
}

export interface StandSource {
  score: number | null
  progress: number
  totalUnits: number | null
  rewatchCount: number
  favorite: boolean
}

export function gradeOf(value: number): StandGrade {
  const clamped = Math.max(0, Math.min(1, value))
  return (['E', 'D', 'C', 'B', 'A'] as const)[Math.round(clamped * 4)]
}

function lengthValue(total: number | null): number {
  if (total == null) return 0
  if (total >= 200) return 1
  if (total >= 100) return 0.75
  if (total >= 50) return 0.5
  if (total >= 13) return 0.25
  return 0
}

// In the order the eyecatch cards draw them, clockwise from the top.
export function standParameters(m: StandSource, scoreMax: number, unit: string): StandParameter[] {
  const share = m.totalUnits ? Math.min(1, m.progress / m.totalUnits) : m.progress > 0 ? 0.5 : 0
  const power = m.score != null && scoreMax > 0 ? m.score / scoreMax : 0
  const passes = Math.min(1, m.rewatchCount / 3)
  const rows: [string, number, string][] = [
    ['Power', power, m.score != null ? `Score ${m.score} / ${scoreMax}` : 'Not scored'],
    ['Speed', share, m.totalUnits ? `${Math.round(share * 100)}% done` : `${m.progress} ${unit}`],
    ['Range', lengthValue(m.totalUnits), m.totalUnits ? `${m.totalUnits} ${unit}` : 'Length unknown'],
    ['Durability', passes, m.rewatchCount === 1 ? '1 repeat pass' : `${m.rewatchCount} repeat passes`],
    ['Precision', m.favorite ? 1 : 0.5, m.favorite ? 'In favourites' : 'Not a favourite'],
    ['Potential', m.totalUnits ? 1 - share : 0.5, m.totalUnits ? `${Math.max(0, m.totalUnits - m.progress)} ${unit} left` : 'Unknown']
  ]
  return rows.map(([label, value, detail]) => ({ label, value, grade: gradeOf(value), detail }))
}
