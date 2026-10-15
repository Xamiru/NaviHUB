import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import QuizPersonAutocomplete from '../../src/renderer/src/components/quiz/QuizPersonAutocomplete'

const people = [
  { key: '1', label: 'Hayao Miyazaki', roles: ['director' as const], photoPath: null },
  { key: '2', label: 'Hayley Atwell', roles: ['actor' as const], photoPath: 'people/2.jpg' }
]

it('opens suggestions only for typed text and closes them on blur', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  render(
    <div>
      <QuizPersonAutocomplete people={people} onSubmit={onSubmit} />
      <button type="button">Give up</button>
    </div>
  )
  const input = screen.getByRole('combobox')
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  await user.type(input, 'hay')
  expect(screen.getAllByRole('option')).toHaveLength(2)
  await user.click(screen.getByRole('button', { name: 'Give up' }))
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  await user.click(input)
  await user.keyboard('{Enter}')
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  expect(onSubmit).toHaveBeenCalledWith(people[0])
})
