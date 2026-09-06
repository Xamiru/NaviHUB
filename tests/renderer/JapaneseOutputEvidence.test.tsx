import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import JapaneseOutputPage from '@/pages/JapaneseOutputPage'

vi.mock('@/lib/api', () => ({ api: {
  settings: { all: async () => ({}), set: async () => {} },
  quiz: { history: async () => ({ recent: [], totalSessions: 0 }), logSession: async () => {} }
} }))
vi.mock('@/lib/usePitchRecorder', () => ({ usePitchRecorder: () => ({
  status: 'idle', seconds: 0, level: 0, release: () => {}, stop: () => null, start: async () => {}, replay: () => {}
}) }))
vi.mock('@/components/TutorSessionContinue', () => ({ default: () => null }))

describe('Japanese first-draft evidence', () => {
  it('keeps the original response visible after revision and labels structure as coverage', async () => {
    const user = userEvent.setup()
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    render(<QueryClientProvider client={client}><MemoryRouter><JapaneseOutputPage /></MemoryRouter></QueryClientProvider>)
    await user.click(screen.getByRole('button', { name: 'Start this three-prompt unit' }))
    const answer = screen.getByRole('textbox', { name: 'Your Japanese' })
    await user.type(answer, '学生。')
    await user.click(screen.getByRole('button', { name: 'Compare with model' }))
    expect(screen.getByText('Your first draft (before the model):')).toBeInTheDocument()
    expect(screen.getByText('学生。', { selector: 'p' })).toBeInTheDocument()
    await user.clear(answer)
    await user.type(answer, '私は学生です。')
    expect(screen.getByText('学生。', { selector: 'p' })).toBeInTheDocument()
    expect(screen.getByText('Target-form coverage in the revised text')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ready independently' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Needed the model' }))
    expect(screen.getByRole('textbox', { name: 'Your Japanese' })).toHaveValue('')
    expect(screen.queryByText('学生。', { selector: 'p' })).not.toBeInTheDocument()
  }, 15000)
})
