import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'
import QuizTitleAutocomplete from '../../src/renderer/src/components/quiz/QuizTitleAutocomplete'
import { expectNoAxeViolations } from './accessibility'

const titles = [
  { key: '1', label: 'Heat', aliases: [], imagePath: 'media/1.jpg', releaseYear: 1995, mediaType: 'movie' as const },
  { key: '2', label: 'Heathers', aliases: [], imagePath: 'media/2.jpg', releaseYear: 1989, mediaType: 'movie' as const }
]

it('opens suggestions only for typed text and closes them on blur', async () => {
  const user = userEvent.setup()
  const onSubmit = vi.fn()
  const { container } = render(
    <div>
      <QuizTitleAutocomplete titles={titles} onSubmit={onSubmit} />
      <button type="button">Skip</button>
    </div>
  )
  const input = screen.getByRole('combobox')
  // Focused but empty: no list covering the buttons below.
  expect(input).toHaveFocus()
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

  await user.type(input, 'hea')
  expect(screen.getByRole('listbox')).toBeInTheDocument()
  expect(screen.getAllByRole('option')).toHaveLength(2)

  await user.click(screen.getByRole('button', { name: 'Skip' }))
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

  // Returning to the box with text in it shows the list again.
  await user.click(input)
  expect(screen.getByRole('listbox')).toBeInTheDocument()
  await user.keyboard('{Enter}')
  expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  expect(onSubmit).toHaveBeenCalledWith(titles[0])
  await expectNoAxeViolations(container)
})
