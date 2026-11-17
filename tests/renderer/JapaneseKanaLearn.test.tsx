import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect, it, vi } from 'vitest'
import JapaneseKanaPage from '../../src/renderer/src/pages/JapaneseKanaPage'
import { expectNoAxeViolations } from './accessibility'

vi.mock('../../src/renderer/src/lib/api', () => ({
  api: {
    quiz: {
      history: async () => ({ totalSessions: 0, bestStreak: 0, best: null, recent: [] }),
      logSession: async () => {}
    },
    dict: { strokes: async () => null },
    japanese: { listCourses: async () => [] }
  }
}))

let entry = 0
function renderKana(search: string) {
  entry += 1
  return render(
    <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
      <MemoryRouter initialEntries={[{ pathname: '/japanese/kana', search, key: `kana-learn-${entry}` }]}>
        <Routes>
          <Route path="/japanese/kana" element={<JapaneseKanaPage />} />
          <Route path="/japanese/loanwords" element={<p>Loanwords page</p>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

it('lists the kana units by script and opens one', async () => {
  const { container } = renderKana('?tab=learn')
  expect(screen.getByRole('tab', { name: 'Learn' })).toHaveAttribute('aria-selected', 'true')
  expect(screen.getByRole('heading', { name: 'Hiragana' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Katakana' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /Hiragana a row/ })).toBeInTheDocument()
  await expectNoAxeViolations(container)

  await userEvent.click(screen.getByRole('button', { name: /Katakana ta row/ }))
  expect(screen.getByRole('heading', { name: 'Katakana ta row' })).toBeInTheDocument()
  const chars = screen.getByRole('list', { name: 'Characters' })
  for (const kana of ['タ', 'チ', 'ツ', 'テ', 'ト']) expect(within(chars).getByText(kana)).toBeInTheDocument()
  expect(screen.getByRole('list', { name: 'Words to read' })).toHaveTextContent('チケット')
  expect(screen.getByRole('link', { name: 'Practice loanwords' })).toHaveAttribute(
    'href',
    '/japanese/loanwords'
  )
  await expectNoAxeViolations(container)

  await userEvent.click(screen.getByRole('button', { name: '← All units' }))
  expect(screen.getByRole('button', { name: /Hiragana ka row/ })).toBeInTheDocument()
})

it('starts the kana drill on the unit row from "Drill this row"', async () => {
  renderKana('?tab=learn')
  await userEvent.click(screen.getByRole('button', { name: /Hiragana ka row/ }))
  await userEvent.click(screen.getByRole('button', { name: 'Drill this row' }))

  expect(screen.getByRole('tab', { name: 'Kana' })).toHaveAttribute('aria-selected', 'true')
  const answer = await screen.findByRole('textbox', { name: 'Kana reading answer' })
  const shown = answer.closest('.card')?.querySelector('p[lang="ja"]')?.textContent
  expect(['か', 'き', 'く', 'け', 'こ']).toContain(shown)

  // Stopping lands on the summary; "Change rows" shows the row now selected.
  await userEvent.click(screen.getByRole('button', { name: 'Stop' }))
  await userEvent.click(await screen.findByRole('button', { name: 'Change rows' }))
  expect(await screen.findByRole('button', { name: 'Start (5 characters)' })).toBeInTheDocument()
})
