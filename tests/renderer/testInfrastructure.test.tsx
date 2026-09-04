import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { expectNoAxeViolations } from './accessibility'

function AccessibleFixture(): JSX.Element {
  const [saved, setSaved] = useState(false)

  return (
    <main>
      <label htmlFor="fixture-name">Name</label>
      <input id="fixture-name" />
      <button type="button" onClick={() => setSaved(true)}>
        Save
      </button>
      <p aria-live="polite">{saved ? 'Saved' : ''}</p>
    </main>
  )
}

describe('renderer test infrastructure', () => {
  it('supports accessible queries, keyboard interaction and DOM matchers', async () => {
    const user = userEvent.setup()
    render(<AccessibleFixture />)

    await user.tab()
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus()

    await user.tab()
    await user.keyboard('{Enter}')
    expect(screen.getByText('Saved')).toBeInTheDocument()
  })

  it('runs axe-core against rendered components', async () => {
    const { container } = render(<AccessibleFixture />)
    await expectNoAxeViolations(container)
  })
})
