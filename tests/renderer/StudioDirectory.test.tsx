import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import StudioListPage from '../../src/renderer/src/pages/StudioListPage'
import type { Company, CompanyDirectoryEntry } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const company = (id: number, name: string): Company => ({
  id,
  name,
  nameNative: null,
  type: 'studio',
  logoPath: null,
  externalSource: null,
  externalId: null
})

const entry = (
  id: number,
  name: string,
  works: number,
  readWorks: number,
  meanScore: number | null
): CompanyDirectoryEntry => ({
  company: company(id, name),
  works,
  readWorks,
  meanScore,
  covers: [{ id: id * 10, title: `${name} Show`, coverPath: null, read: readWorks > 0 }]
})

const directory = vi.hoisted(() => vi.fn())
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    companies: { directory }
  }
}))

describe('studio directory', () => {
  it('shows studios through their covers, hides one-off studios until searched, and sorts', async () => {
    directory.mockResolvedValue([
      entry(1, 'Prolific', 12, 0, null),
      entry(2, 'Favourite', 4, 4, 9),
      entry(3, 'One Off', 1, 1, 7),
      entry(4, 'Unseen', 1, 0, null)
    ])
    const user = userEvent.setup()
    const { container } = render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter>
          <StudioListPage />
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(await screen.findByText('12 anime')).toBeInTheDocument()
    expect(screen.getByText('4 anime / 4 watched / ★ 9.0')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Favourite Show' })).toHaveAttribute('href', '/anime/20')
    expect(directory).toHaveBeenCalledWith({
      mediaType: 'anime',
      readStatuses: ['Watching', 'Completed']
    })
    await expectNoAxeViolations(container)

    const names = () => screen.getAllByRole('listitem').map((li) => li.textContent?.split(/\d/)[0])
    // The default view leaves out studios with fewer than three works, unless
    // the user has watched one of their titles.
    expect(names()).toEqual(['Prolific', 'Favourite', 'One Off'])
    expect(screen.getByText('3 of 4 studios')).toBeInTheDocument()

    // A search reaches every studio, whatever the filter.
    await user.type(screen.getByRole('textbox', { name: 'Search studios' }), 'unseen')
    expect(await screen.findByText('Unseen')).toBeInTheDocument()
    await user.clear(screen.getByRole('textbox', { name: 'Search studios' }))
    expect(await screen.findByText('Prolific')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'All' }))
    expect(names()).toEqual(['Prolific', 'Favourite', 'One Off', 'Unseen'])
    await user.click(screen.getByRole('button', { name: 'Your score' }))
    expect(names()).toEqual(['Favourite', 'One Off', 'Prolific', 'Unseen'])

    await user.click(screen.getByRole('button', { name: "Ones I've watched" }))
    expect(names()).toEqual(['Favourite', 'One Off'])
  })
})
