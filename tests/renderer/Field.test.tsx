import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Field, Fieldset } from '@/components/Field'
import { expectNoAxeViolations } from './accessibility'

describe('Field', () => {
  it('associates its label, description and error with the control', async () => {
    const { container } = render(
      <Field
        label="Provider key"
        description="Stored on this device."
        error="The key is required."
      >
        <input />
      </Field>
    )

    const input = screen.getByRole('textbox', { name: 'Provider key' })
    expect(input).toHaveAccessibleDescription('Stored on this device. The key is required.')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    await expectNoAxeViolations(container)
  })

  it('keeps a visually hidden label programmatic', () => {
    render(
      <Field label="Search titles" hiddenLabel>
        <input type="search" />
      </Field>
    )
    expect(screen.getByRole('searchbox', { name: 'Search titles' })).toBeInTheDocument()
  })
})

describe('Fieldset', () => {
  it('gives related controls a programmatic group name', async () => {
    const { container } = render(
      <Fieldset legend="Difficulty">
        <button type="button" aria-pressed="true">
          Easy
        </button>
        <button type="button" aria-pressed="false">
          Hard
        </button>
      </Fieldset>
    )

    expect(screen.getByRole('group', { name: 'Difficulty' })).toBeInTheDocument()
    await expectNoAxeViolations(container)
  })
})
