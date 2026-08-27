import { describe, expect, it } from 'vitest'
import { higherLowerCopy, higherLowerValue } from '../src/shared/higherLowerQuiz'

describe('higher/lower quiz language and values', () => {
  it('compares release years rather than hidden timestamps', () => {
    expect(higherLowerValue({ releaseDate: '2001-04-03', totalUnits: null, score: null }, 'releaseDate')).toBe(2001)
    expect(higherLowerValue({ releaseDate: 'not-a-date', totalUnits: null, score: null }, 'releaseDate')).toBeNull()
  })

  it('uses category-specific unit questions', () => {
    const anime = higherLowerCopy('anime', 'totalUnits')
    expect(anime.question('Cowboy Bebop', 'Monster')).toContain('more or fewer episodes')
    expect(anime.formatValue(26)).toBe('26 episodes')

    const movie = higherLowerCopy('movie', 'totalUnits')
    expect(movie.question('Heat', 'Alien')).toContain('longer or shorter')
    expect(movie.formatValue(170)).toBe('170 min')
  })

  it('uses older/newer and personal-rating language', () => {
    const release = higherLowerCopy('anime', 'releaseDate')
    expect([release.lowerLabel, release.higherLabel]).toEqual(['Older', 'Newer'])
    expect(release.question('B', 'A')).toBe('Is B older or newer than A?')
    expect(release.formatValue(1998)).toBe('1998')

    const rating = higherLowerCopy('tv', 'personalScore')
    expect(rating.question('The Wire', 'Twin Peaks')).toContain('Did you rate')
    expect(rating.formatValue(9.5)).toBe('9.5/10')
  })

  it('turns visual-novel minutes into readable hours', () => {
    expect(higherLowerCopy('visual_novel', 'totalUnits').formatValue(1530)).toBe('25.5 h')
  })
})
