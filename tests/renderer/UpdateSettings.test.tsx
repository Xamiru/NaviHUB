import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UpdateSettings } from '@/pages/SettingsPage'
import type { SecretStorageState } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const mocks = vi.hoisted(() => ({
  check: vi.fn(),
  kick: vi.fn(),
  confirm: vi.fn()
}))

vi.mock('@/lib/api', () => ({ api: { updates: { check: mocks.check } } }))
vi.mock('@/lib/useUpdateStatus', () => ({
  useUpdateStatus: () => ({
    status: {
      id: '',
      state: 'idle',
      currentVersion: '0.49.0',
      environment: 'ok',
      percent: null,
      version: null,
      message: null
    },
    kick: mocks.kick
  })
}))
vi.mock('@/lib/confirm', () => ({ confirmDialog: mocks.confirm }))

const savedToken: SecretStorageState = {
  available: true,
  backend: 'dpapi',
  protection: 'secure',
  configured: { 'github.token': true },
  unreadable: []
}

beforeEach(() => {
  vi.clearAllMocks()
  mocks.check.mockResolvedValue(undefined)
  mocks.kick.mockResolvedValue(undefined)
  mocks.confirm.mockResolvedValue(true)
})

describe('public release settings', () => {
  it('checks for updates without asking for a GitHub token', async () => {
    const user = userEvent.setup()
    const { container } = render(<UpdateSettings onSave={vi.fn()} />)

    expect(screen.queryByRole('textbox', { name: /GitHub token/i })).not.toBeInTheDocument()
    const check = screen.getByRole('button', { name: 'Check for updates' })
    expect(check).toBeEnabled()
    await user.click(check)
    await waitFor(() => expect(mocks.check).toHaveBeenCalledOnce())
    await expectNoAxeViolations(container)
  })

  it('can clear a protected token left from the private repository', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    render(<UpdateSettings secretStorage={savedToken} onSave={onSave} />)

    expect(screen.getByText(/Public updates no longer use it/)).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Clear saved token' }))
    expect(mocks.confirm).toHaveBeenCalledOnce()
    expect(onSave).toHaveBeenCalledWith('github.token', '')
  })
})
