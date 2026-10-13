import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { HistDateText } from '@/components/history/HistoryBits'

const show = (node: JSX.Element): void => {
  render(<MemoryRouter>{node}</MemoryRouter>)
}

describe('History date display', () => {
  it('reads a day before the Gregorian reform in the Julian calendar it is stored in', () => {
    // Chaldiran: 23 August 1514 (Julian), stored as its sources give it.
    show(<HistDateText date={{ d: '1514-08-23' }} lunarHijri />)
    expect(screen.getByText('23 August 1514 (Julian)')).toBeTruthy()
    expect(screen.getByText('2 September 1514 proleptic Gregorian')).toBeTruthy()
    // The Hijri form comes from the converted day. The tabular reckoning gives
    // 2 Rajab 920, a day after the sighted-moon 1 Rajab the sources give: hence "(tabular)".
    expect(screen.getByText('2 Rajab 920 AH (tabular)')).toBeTruthy()
  })

  it('adds the lunar Hijri date on Iran and Middle East pages before 1925', () => {
    show(<HistDateText date={{ d: '1722-10-23' }} lunarHijri />)
    expect(screen.getByText('23 October 1722')).toBeTruthy()
    expect(screen.getByText('12 Muharram 1135 AH (tabular)')).toBeTruthy()
  })

  it('stops the lunar Hijri date once Iran adopted the solar calendar', () => {
    show(<HistDateText date={{ d: '1979-02-11' }} lunarHijri />)
    expect(screen.queryByText(/AH \(tabular\)/)).toBeNull()
  })

  it('writes years before 1 CE as BCE', () => {
    show(<HistDateText date={{ d: '-0479', approx: true }} />)
    expect(screen.getByText('c. 480 BCE')).toBeTruthy()
  })
})
