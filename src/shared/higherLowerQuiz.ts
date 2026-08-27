import type { MediaType, QuizHigherLowerMetric } from './types'

export interface HigherLowerValueSource {
  releaseDate: string | null
  totalUnits: number | null
  score: number | null
}

export const HIGHER_LOWER_MEDIA_TYPES: ReadonlyArray<{ key: MediaType; label: string }> = [
  { key: 'anime', label: 'Anime' },
  { key: 'manga', label: 'Manga' },
  { key: 'movie', label: 'Movies' },
  { key: 'tv', label: 'TV shows' },
  { key: 'game', label: 'Games' },
  { key: 'visual_novel', label: 'Visual novels' },
  { key: 'book', label: 'Books' }
]

const UNITS: Record<MediaType, { noun: string; suffix: string; comparison: 'count' | 'length' }> = {
  anime: { noun: 'episodes', suffix: ' episodes', comparison: 'count' },
  manga: { noun: 'chapters', suffix: ' chapters', comparison: 'count' },
  movie: { noun: 'runtime', suffix: ' min', comparison: 'length' },
  tv: { noun: 'episodes', suffix: ' episodes', comparison: 'count' },
  game: { noun: 'main-story length', suffix: ' h', comparison: 'length' },
  visual_novel: { noun: 'length', suffix: ' min', comparison: 'length' },
  book: { noun: 'pages', suffix: ' pages', comparison: 'count' }
}

function formatMinutes(value: number): string {
  const hours = value / 60
  return Number.isInteger(hours)
    ? `${hours.toLocaleString()} h`
    : `${hours.toLocaleString(undefined, { maximumFractionDigits: 1 })} h`
}

export function higherLowerValue(
  item: HigherLowerValueSource,
  metric: QuizHigherLowerMetric
): number | null {
  if (metric === 'releaseDate') {
    const match = item.releaseDate?.match(/^(\d{4})/)
    if (!match) return null
    const year = Number(match[1])
    return Number.isInteger(year) && year > 0 ? year : null
  }
  const raw = metric === 'totalUnits' ? item.totalUnits : item.score
  return typeof raw === 'number' && Number.isFinite(raw) && raw > 0 ? raw : null
}

export function higherLowerCopy(mediaType: MediaType, metric: QuizHigherLowerMetric) {
  const unit = UNITS[mediaType]
  if (metric === 'releaseDate') {
    return {
      setupLabel: 'Older or newer',
      valueLabel: 'Release year',
      higherLabel: 'Newer',
      lowerLabel: 'Older',
      question: (challenger: string, reference: string) =>
        `Is ${challenger} older or newer than ${reference}?`,
      formatValue: (value: number) => String(value)
    }
  }
  if (metric === 'personalScore') {
    return {
      setupLabel: 'My rating',
      valueLabel: 'My rating',
      higherLabel: 'Higher',
      lowerLabel: 'Lower',
      question: (challenger: string, reference: string) =>
        `Did you rate ${challenger} higher or lower than ${reference}?`,
      formatValue: (value: number) => `${value.toLocaleString(undefined, { maximumFractionDigits: 1 })}/10`
    }
  }
  if (unit.comparison === 'length') {
    return {
      setupLabel: unit.noun === 'runtime' ? 'Longer or shorter runtime' : 'Longer or shorter',
      valueLabel: unit.noun.charAt(0).toUpperCase() + unit.noun.slice(1),
      higherLabel: 'Longer',
      lowerLabel: 'Shorter',
      question: (challenger: string, reference: string) =>
        `Is ${challenger} longer or shorter than ${reference}?`,
      formatValue: (value: number) => mediaType === 'visual_novel'
        ? formatMinutes(value)
        : `${value.toLocaleString()}${unit.suffix}`
    }
  }
  return {
    setupLabel: `More or fewer ${unit.noun}`,
    valueLabel: unit.noun.charAt(0).toUpperCase() + unit.noun.slice(1),
    higherLabel: 'More',
    lowerLabel: 'Fewer',
    question: (challenger: string, reference: string) =>
      `Does ${challenger} have more or fewer ${unit.noun} than ${reference}?`,
    formatValue: (value: number) => `${value.toLocaleString()}${unit.suffix}`
  }
}
