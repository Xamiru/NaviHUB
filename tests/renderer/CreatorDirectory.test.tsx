import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import CreatorDirectoryPage from '../../src/renderer/src/pages/CreatorDirectoryPage'
import { MANGA } from '../../src/renderer/src/lib/mediaConfig'
import { mangaCreatorFacts } from '../../src/renderer/src/lib/creatorCredits'
import type { CastEntry, Person } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const person = (id: number, name: string): Person =>
  ({ id, name, nameNative: null, photoPath: null }) as Person

const directory = vi.hoisted(() => vi.fn())
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    settings: { all: async () => ({}) },
    people: { directory }
  }
}))

describe('creator directory', () => {
  it('shows counts and covers, sorts, and narrows to creators the user has read', async () => {
    directory.mockResolvedValue([
      {
        person: person(1, 'Prolific'),
        works: 4,
        readWorks: 0,
        meanScore: null,
        covers: [{ id: 11, title: 'Unread One', coverPath: null, read: false }]
      },
      {
        person: person(2, 'Favourite'),
        works: 2,
        readWorks: 2,
        meanScore: 9,
        covers: [{ id: 21, title: 'Read One', coverPath: null, read: true }]
      }
    ])
    const user = userEvent.setup()
    const { container } = render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter>
          <CreatorDirectoryPage cfg={MANGA} role="mangaka" title="Mangaka" />
        </MemoryRouter>
      </QueryClientProvider>
    )

    expect(await screen.findByText('4 manga')).toBeInTheDocument()
    expect(screen.getByText('2 manga / 2 read / ★ 9.0')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Read One' })).toHaveAttribute('href', '/manga/21')
    expect(directory).toHaveBeenCalledWith({
      role: 'mangaka',
      mediaType: 'manga',
      readStatuses: ['Reading', 'Completed']
    })
    // No "Add" box: a bare name would never appear in a role-scoped list.
    expect(screen.queryByRole('button', { name: 'Add' })).not.toBeInTheDocument()
    await expectNoAxeViolations(container)

    const names = () => screen.getAllByRole('listitem').map((li) => li.textContent?.split(/\d/)[0])
    expect(names()).toEqual(['Prolific', 'Favourite'])
    await user.click(screen.getByRole('button', { name: 'Your score' }))
    expect(names()).toEqual(['Favourite', 'Prolific'])

    await user.click(screen.getByRole('button', { name: "Ones I've read" }))
    expect(names()).toEqual(['Favourite'])
    expect(screen.getByText('1 of 2 people')).toBeInTheDocument()
  })

  it('groups manga creators the way a cover credits them', () => {
    const entry = (id: number, role: CastEntry['role'], roleNote: string | null): CastEntry => ({
      creditId: id,
      person: person(id, `P${id}`),
      character: null,
      role,
      language: null,
      roleNote
    })
    const facts = mangaCreatorFacts([
      entry(1, 'writer', 'Original Creator'),
      entry(2, 'mangaka', 'Art'),
      entry(3, 'mangaka', 'Story, Art'),
      entry(4, 'mangaka', null),
      entry(5, 'staff', 'Touch-up Art & Lettering')
    ])
    expect(facts.map((f) => [f.label, f.people.map((p) => p.name)])).toEqual([
      ['Story & Art', ['P3']],
      ['Art', ['P2']],
      ['Mangaka', ['P4']],
      ['Original work', ['P1']]
    ])
  })
})
