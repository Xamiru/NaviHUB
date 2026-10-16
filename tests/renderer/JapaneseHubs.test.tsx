import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import JapaneseHubTabs from '../../src/renderer/src/components/japanese/JapaneseHubTabs'
import { JP_HUBS, hubForPath } from '../../src/renderer/src/lib/japaneseHubs'
import { JP_TOOLS } from '../../src/renderer/src/lib/japaneseTools'
import { expectNoAxeViolations } from './accessibility'

it('joins a hub’s sibling pages with one navigation strip', async () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/japanese/pitch']}>
      <JapaneseHubTabs />
    </MemoryRouter>
  )
  const nav = screen.getByRole('navigation', { name: 'Sound and listening tools' })
  const links = within(nav).getAllByRole('link')
  expect(links.map((l) => l.textContent)).toEqual(['Sound foundation', 'Pitch accent', 'Listening', 'Watch a scene'])
  expect(within(nav).getByRole('link', { name: 'Pitch accent' })).toHaveAttribute('aria-current', 'page')
  await expectNoAxeViolations(container)
})

it('renders nothing outside the hubs', () => {
  const { container } = render(
    <MemoryRouter initialEntries={['/japanese/dictionary']}>
      <JapaneseHubTabs />
    </MemoryRouter>
  )
  expect(container).toBeEmptyDOMElement()
})

it('keeps every hub tool on a real Japanese route, each in one hub only', () => {
  const routes = JP_HUBS.flatMap((hub) => hub.tools.map((t) => t.to))
  expect(new Set(routes).size).toBe(routes.length)
  for (const to of routes) expect(hubForPath(to)?.tool.to).toBe(to)
  // Every tool card that points at a hub page names the same route.
  for (const tool of JP_TOOLS.filter((t) => t.to && hubForPath(t.to))) {
    expect(hubForPath(tool.to!)!.tool.key).toBe(tool.key)
  }
})

it('every hub tool has its route in App.tsx', async () => {
  const { readFileSync } = await import('node:fs')
  const app = readFileSync('src/renderer/src/App.tsx', 'utf8')
  for (const hub of JP_HUBS) for (const t of hub.tools) expect(app, t.to).toContain(`path="${t.to}"`)
})
