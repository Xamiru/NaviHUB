import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import ListsIndexPage from '../../src/renderer/src/pages/ListsIndexPage'
import { expectNoAxeViolations } from './accessibility'

const base = { description: null, createdAt: '', updatedAt: '' }
vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    lists: {
      list: async () => [
        { ...base, id: 1, title: 'top 10 anime', kind: 'media', ranked: true, itemCount: 10, previewImages: ['media/a.jpg', 'media/b.jpg'] },
        { ...base, id: 2, title: 'top 10 characters', kind: 'character', ranked: true, itemCount: 0, previewImages: [] }
      ]
    },
    tierLists: {
      list: async () => [
        {
          ...base, id: 5, title: '2000s anime tiers', kind: 'media', itemCount: 3,
          previewRows: [
            { label: 'S', color: '#ff7f7f', images: ['media/a.jpg'] },
            { label: 'A', color: '#ffbf7f', images: [] },
            { label: 'B', color: '#ffdf7f', images: [] }
          ]
        }
      ]
    }
  }
}))

it('offers only the kinds that have lists and previews tier boards', async () => {
  const user = userEvent.setup()
  const { container } = render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter>
        <ListsIndexPage />
      </MemoryRouter>
    </QueryClientProvider>
  )
  expect(await screen.findByText('top 10 anime')).toBeInTheDocument()
  const kinds = screen.getByRole('group', { name: 'Kind' })
  expect([...kinds.querySelectorAll('button')].map((b) => b.textContent)).toEqual(['All 2', 'Media 1', 'Characters 1'])
  expect(screen.getByText('Empty')).toBeInTheDocument()
  await expectNoAxeViolations(container)

  await user.click(screen.getByRole('button', { name: 'Characters 1' }))
  expect(screen.queryByText('top 10 anime')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: /^Tier lists/ }))
  expect(await screen.findByText('2000s anime tiers')).toBeInTheDocument()
  expect(['S', 'A', 'B'].every((label) => screen.getByText(label))).toBe(true)
  // One kind only: no kind row to choose from.
  expect(screen.queryByRole('group', { name: 'Kind' })).not.toBeInTheDocument()
})
