import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { beforeEach, expect, it } from 'vitest'
import ParentBackLink from '@/components/ParentBackLink'
import TabbedRouter from '@/components/TabbedRouter'
import { activeTab, resetBrowserTabs } from '@/lib/browserTabs'

let go: ReturnType<typeof useNavigate>

function Shell({ to, label }: { to: string; label: string }) {
  go = useNavigate()
  const { pathname } = useLocation()
  return (
    <>
      <p data-testid="path">{pathname}</p>
      <ParentBackLink to={to} label={label} />
    </>
  )
}

function renderApp(to = '/football/teams', label = 'Teams') {
  render(
    <TabbedRouter>
      <Routes>
        <Route path="*" element={<Shell to={to} label={label} />} />
      </Routes>
    </TabbedRouter>
  )
}

const path = () => screen.getByTestId('path').textContent
async function visit(...paths: string[]) {
  for (const p of paths) await act(async () => go(p))
}

beforeEach(() => {
  resetBrowserTabs('/')
})

it('returns to the page the user came from, not the fixed parent list', async () => {
  const user = userEvent.setup()
  renderApp()
  await visit('/football/match/9', '/football/team/3')
  const link = screen.getByRole('link', { name: '← Back' })
  await user.click(link)
  expect(path()).toBe('/football/match/9')
})

it('names the parent when the previous page is that parent', async () => {
  const user = userEvent.setup()
  renderApp()
  await visit('/football/teams', '/football/team/3')
  await user.click(screen.getByRole('link', { name: '← Teams' }))
  expect(path()).toBe('/football/teams')
  // Back, not a new push: forward history still holds the team page.
  expect(activeTab().history.entries.at(-1)?.pathname).toBe('/football/team/3')
})

it('falls back to the parent on the first page of a tab, replacing it', async () => {
  const user = userEvent.setup()
  resetBrowserTabs('/football/team/3')
  renderApp()
  await user.click(screen.getByRole('link', { name: '← Teams' }))
  expect(path()).toBe('/football/teams')
  expect(activeTab().history.canGoBack).toBe(false)
})

it('stays a plain link when it points at the current route', async () => {
  const user = userEvent.setup()
  renderApp('/japanese/immersion', 'Listening setup')
  await visit('/japanese', '/japanese/immersion')
  await user.click(screen.getByRole('link', { name: '← Listening setup' }))
  expect(path()).toBe('/japanese/immersion')
})
