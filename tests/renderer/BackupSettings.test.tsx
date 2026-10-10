import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { beforeEach, expect, it, vi } from 'vitest'

const backup = vi.hoisted(() => ({
  estimate: vi.fn(),
  status: vi.fn(),
  safetyCopies: vi.fn(),
  start: vi.fn(),
  cancel: vi.fn(),
  reveal: vi.fn(),
  chooseRestore: vi.fn(),
  startRestore: vi.fn(),
  discardRestore: vi.fn(),
  restoreSafetyCopy: vi.fn(),
  deleteSafetyCopy: vi.fn()
}))
vi.mock('@/lib/api', () => ({ api: { backup } }))
vi.mock('@/lib/confirm', () => ({ confirmDialog: async () => true }))

import { BackupSettings } from '@/pages/settings/BackupSettings'
import { expectNoAxeViolations } from './accessibility'

const idle = {
  id: null,
  kind: null,
  running: false,
  phase: 'idle',
  message: null,
  done: 0,
  total: 0,
  percent: null,
  outputPath: null,
  error: null
}

beforeEach(() => {
  vi.clearAllMocks()
  backup.estimate.mockResolvedValue({ database: 50 * 2 ** 20, media: 2 ** 30, history: 0, pictures: 3 * 2 ** 30, jpaudio: 0, audio: 0 })
  backup.status.mockResolvedValue(idle)
  backup.safetyCopies.mockResolvedValue([])
  backup.start.mockResolvedValue({ started: true })
  backup.startRestore.mockResolvedValue(undefined)
  backup.chooseRestore.mockResolvedValue({
    createdAt: '2026-10-09T20:00:00.000Z',
    appVersion: '0.2.0',
    machine: 'navi-pc',
    sameMachine: false,
    titles: 3625,
    files: 9000,
    bytes: 2 ** 30,
    includes: { media: true, history: true, pictures: false, jpaudio: true, audio: false }
  })
})

function renderCard() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <BackupSettings />
    </QueryClientProvider>
  )
}

it('backs up with the Pictures choice and shows the size', async () => {
  const user = userEvent.setup()
  const { container } = renderCard()
  // Measuring walks every file, so it waits to be asked.
  await user.click(await screen.findByRole('button', { name: 'Measure size' }))
  expect(await screen.findByText(/This backup will be about 1\.0\d? GiB/)).toBeInTheDocument()
  expect(backup.estimate).toHaveBeenCalledTimes(1)
  await user.click(screen.getByRole('checkbox', { name: /Include the Pictures folder \(3 GiB\)|Include the Pictures folder/ }))
  await user.click(screen.getByRole('button', { name: 'Back up now…' }))
  expect(backup.start).toHaveBeenCalledWith({ includePictures: true })
  await expectNoAxeViolations(container)
})

it('shows what a backup holds before replacing the library', async () => {
  const user = userEvent.setup()
  renderCard()
  await user.click(await screen.findByRole('button', { name: 'Restore from backup…' }))
  const dialog = await screen.findByRole('dialog', { name: 'Restore this backup?' })
  expect(within(dialog).getByText('3,625')).toBeInTheDocument()
  expect(within(dialog).getByText(/Keys saved on another machine/)).toBeInTheDocument()
  await user.click(within(dialog).getByRole('button', { name: 'Replace library and restart' }))
  await waitFor(() => expect(backup.startRestore).toHaveBeenCalled())
})

it('cancelling the preview discards the staged backup', async () => {
  const user = userEvent.setup()
  renderCard()
  await user.click(await screen.findByRole('button', { name: 'Restore from backup…' }))
  const dialog = await screen.findByRole('dialog', { name: 'Restore this backup?' })
  await user.click(within(dialog).getByRole('button', { name: 'Cancel' }))
  await waitFor(() => expect(backup.discardRestore).toHaveBeenCalled())
  expect(backup.startRestore).not.toHaveBeenCalled()
})
