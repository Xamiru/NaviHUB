import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SecretInput, SecretStateLine } from '../../src/renderer/src/components/SecretField'
import type { SecretStorageState } from '../../src/shared/types'
import { expectNoAxeViolations } from './accessibility'

const secureState: SecretStorageState = {
  available: true,
  backend: 'dpapi',
  protection: 'secure',
  configured: { 'github.token': true },
  unreadable: []
}

function Harness({ onSave }: { onSave: (key: 'github.token', value: string) => Promise<void> }) {
  const [value, setValue] = useState('')
  return (
    <SecretInput
      id="test-secret"
      label="GitHub token"
      settingKey="github.token"
      value={value}
      onChange={setValue}
      onSave={onSave}
      state={secureState}
      placeholder="Saved — enter a replacement"
    />
  )
}

describe('SecretInput', () => {
  it('never hydrates a stored value and replaces it explicitly', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(async () => undefined)
    const { container } = render(<Harness onSave={onSave} />)

    const input = screen.getByLabelText('GitHub token')
    expect(input).toHaveValue('')
    expect(input).toHaveAttribute('type', 'password')
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(screen.getByText(/Saved with OS protection \(dpapi\)/)).toBeInTheDocument()

    await user.type(input, ' replacement-token ')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(onSave).toHaveBeenCalledWith('github.token', 'replacement-token')
    expect(input).toHaveValue('')
    await expectNoAxeViolations(container)
  })

  it('states weak and unavailable protection without claiming security', () => {
    const { rerender } = render(
      <SecretStateLine
        settingKey="github.token"
        state={{ ...secureState, backend: 'basic_text', protection: 'weak' }}
      />
    )
    expect(screen.getByText(/weak basic_text backend/)).toBeInTheDocument()

    rerender(
      <SecretStateLine
        settingKey="github.token"
        state={{ ...secureState, available: false, backend: 'unavailable', protection: 'unavailable' }}
      />
    )
    expect(screen.getByText(/OS protected storage is unavailable/)).toBeInTheDocument()
  })
})
