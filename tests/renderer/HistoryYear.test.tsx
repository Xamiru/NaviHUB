import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import HistoryYearPage from '@/pages/HistoryYearPage'
import type { HistoryRefInfo, HistoryYear } from '@shared/types'
import { expectNoAxeViolations } from './accessibility'

const info = (ref: string, title: string, kind: HistoryRefInfo['kind']): HistoryRefInfo => ({
  ref,
  kind,
  title,
  native: null,
  years: null,
  sub: null,
  image: null,
  region: null,
  personal: false,
  missing: false
})

const year = (y: number): HistoryYear => ({
  year: y,
  label: String(y),
  calendar: 'julian',
  lunarHijri: [919, 920],
  solarHijri: { from: 892, to: 893, proleptic: true },
  events: [{ region: 'iran', items: [info('event:battle-of-chaldiran', 'Battle of Chaldiran', 'event')] }],
  periods: [],
  states: [
    {
      state: info('polity:safavid-iran', 'Safavid Iran', 'polity'),
      holders: [{ person: info('person:ismail-i', 'Ismail I', 'person'), title: 'Shah of Iran' }]
    }
  ],
  born: [],
  died: []
})

const apiMock = vi.hoisted(() => ({
  history: {
    year: vi.fn(),
    imageStatus: vi.fn(async () => ({ running: false, done: 0, total: 0 }))
  }
}))
vi.mock('@/lib/api', () => ({ api: apiMock }))

describe('History year page', () => {
  it('shows the year under way, its states and office holders, and steps between years', async () => {
    apiMock.history.year.mockImplementation(async (y: number) => year(y))
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    const { container } = render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={['/history/year/1514']}>
          <Routes>
            <Route path="/history/year/:year" element={<HistoryYearPage />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    )
    expect(await screen.findByRole('heading', { name: '1514', level: 1 })).toBeTruthy()
    expect(screen.getByText(/919 to 920 AH · 892 to 893 SH \(proleptic\)/)).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Battle of Chaldiran' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Ismail I' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Open the map at this year' }).getAttribute('href')).toBe('/history/map?year=1514')
    await expectNoAxeViolations(container)

    await userEvent.click(screen.getByRole('link', { name: 'Next year (1515)' }))
    expect(await screen.findByRole('heading', { name: '1515', level: 1 })).toBeTruthy()
    expect(apiMock.history.year).toHaveBeenLastCalledWith(1515)
  })
})
