import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import VnReadingPage from '../../src/renderer/src/pages/VnReadingPage'
const mocks = vi.hoisted(() => ({
  overview: vi.fn(),
  notes: vi.fn(),
  saveNode: vi.fn(),
  saveNote: vi.fn(),
  saveResume: vi.fn(),
  reorder: vi.fn()
}))
vi.mock('../../src/renderer/src/lib/api', () => ({ api: { vnReading: mocks } }))
function mount() {
  render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <MemoryRouter initialEntries={['/visual-novels/1/reading']}>
        <Routes>
          <Route path="/visual-novels/:id/reading" element={<VnReadingPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}
beforeEach(() => {
  vi.clearAllMocks()
  mocks.overview.mockResolvedValue({
    title: 'A visual novel',
    generalNotes: 'General note',
    nodes: [],
    resume: { nodeId: null, saveSlot: 'Slot 12', recap: 'At the station' }
  })
  mocks.notes.mockResolvedValue({ notes: [], total: 0 })
  mocks.saveNode.mockResolvedValue(1)
  mocks.saveNote.mockResolvedValue(1)
})
describe('VN reading workspace', () => {
  it('shows the saved recap and creates a completed reading entry without a media progress mutation', async () => {
    const user = userEvent.setup()
    mount()
    expect(await screen.findByText('At the station')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Add reading entry' }))
    const form = within(screen.getByRole('form', { name: 'Reading entry' }))
    await user.type(form.getByLabelText('Title'), 'First ending')
    await user.selectOptions(form.getByLabelText('Entry kind'), 'ending')
    await user.selectOptions(form.getByLabelText('Entry status'), 'completed')
    expect((form.getByLabelText('Completed on') as HTMLInputElement).value).toMatch(
      /^\d{4}-\d{2}-\d{2}$/
    )
    await user.click(form.getByRole('button', { name: 'Save reading entry' }))
    await waitFor(() =>
      expect(mocks.saveNode).toHaveBeenCalledWith(
        1,
        null,
        expect.objectContaining({ title: 'First ending', kind: 'ending', status: 'completed' })
      )
    )
  })
  it('saves a dated theory and preserves source fields', async () => {
    const user = userEvent.setup()
    mount()
    await screen.findByText('At the station')
    await user.click(screen.getByRole('button', { name: 'Write a note' }))
    const form = within(screen.getByRole('form', { name: 'Notebook entry' }))
    await user.selectOptions(form.getByLabelText('Note category'), 'theory')
    await user.type(form.getByLabelText('Note', { exact: true }), 'The visitor knows more.')
    await user.click(form.getByRole('button', { name: 'Save note' }))
    await waitFor(() =>
      expect(mocks.saveNote).toHaveBeenCalledWith(
        1,
        null,
        expect.objectContaining({
          category: 'theory',
          body: 'The visitor knows more.',
          nodeId: null,
          imageData: null
        })
      )
    )
  })
  it('offers retry instead of showing an empty workspace when the read fails', async () => {
    mocks.overview.mockRejectedValue(new Error('Database busy'))
    mount()
    expect(await screen.findByRole('button', { name: 'Retry' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Add reading entry' })).not.toBeInTheDocument()
  })
})
