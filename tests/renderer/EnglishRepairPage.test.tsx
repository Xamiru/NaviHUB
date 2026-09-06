import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import EnglishRepairPage from '@/pages/EnglishRepairPage'

vi.mock('@/lib/api', () => ({ api: { settings: { all: async () => ({}), set: async () => {} } } }))

describe('English repair routing', () => {
  it('keeps the exact missed item visible and lets the learner change the suggested rule', async () => {
    const user = userEvent.setup()
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><MemoryRouter initialEntries={['/english/repair?item=articles-01']}><EnglishRepairPage /></MemoryRouter></QueryClientProvider>)
    expect(screen.getByRole('complementary', { name: 'Original missed item' })).toHaveTextContent('MSc in molecular biology')
    const choice = screen.getByRole('combobox', { name: 'Rule to practise' })
    expect(choice).toHaveValue('articles-sound')
    await user.selectOptions(choice, 'articles-reference')
    expect(choice).toHaveValue('articles-reference')
    expect(screen.getByRole('heading', { name: 'Separate general and identifiable reference' })).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Original missed item' })).toHaveTextContent('MSc in molecular biology')
    expect(screen.getByRole('link', { name: 'Try a fresh mechanics round' })).toHaveAttribute('href', '/english/mechanics?category=articles')
  }, 15000)
})
