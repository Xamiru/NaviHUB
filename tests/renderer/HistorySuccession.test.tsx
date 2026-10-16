import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import SuccessionChart from '@/components/history/SuccessionChart'
import type { HistoryRefInfo } from '@shared/types'
import { expectNoAxeViolations } from './accessibility'

const cite = [{ source: 's', loc: { page: '1' } }]
const at = (d: string) => ({ alts: [{ value: { d }, cites: cite }] })
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

const refs: Record<string, HistoryRefInfo> = {
  'person:ismail-i': info('person:ismail-i', 'Ismail I', 'person'),
  'person:tahmasp-i': info('person:tahmasp-i', 'Tahmasp I', 'person'),
  'polity:aq-qoyunlu': info('polity:aq-qoyunlu', 'Aq Qoyunlu', 'polity'),
  'polity:hotaki': info('polity:hotaki', 'Hotaki dynasty', 'polity')
}

describe('History succession chart', () => {
  it('draws the reigns and gives screen readers the same data as a table', async () => {
    const { container } = render(
      <MemoryRouter>
        <SuccessionChart
          rulers={[
            { person: 'person:ismail-i', title: 'Shah', start: at('1501'), end: at('1524-05-23') },
            { person: 'person:tahmasp-i', title: 'Shah', start: at('1524-05-23'), end: at('1576-05-14') }
          ]}
          span={{ s: 1501, e: 1736 }}
          refs={refs}
          predecessors={['polity:aq-qoyunlu']}
          successors={['polity:hotaki']}
          stateNames={['Safavid Iran']}
        />
      </MemoryRouter>
    )
    expect(screen.getByTitle(/Ismail I, Shah, 1501 to/)).toBeTruthy()
    const table = screen.getByRole('table', { name: 'Succession chart' })
    const rows = within(table).getAllByRole('row')
    expect(rows).toHaveLength(3)
    expect(within(rows[2]).getByText('Tahmasp I')).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Aq Qoyunlu' })).toBeTruthy()
    expect(screen.getByRole('link', { name: 'Hotaki dynasty' })).toBeTruthy()
    await expectNoAxeViolations(container)
  })

  it('draws nothing for a single dated holder', () => {
    const { container } = render(
      <MemoryRouter>
        <SuccessionChart
          rulers={[{ person: 'person:ismail-i', title: 'Shah', start: at('1501'), end: null }]}
          span={null}
          refs={refs}
          predecessors={[]}
          successors={[]}
          stateNames={[]}
        />
      </MemoryRouter>
    )
    expect(container.innerHTML).toBe('')
  })
})
