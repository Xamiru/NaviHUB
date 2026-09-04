import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import Tabs, { RouteTabs, TabPanel } from '@/components/Tabs'
import { expectNoAxeViolations } from './accessibility'

function LocalTabs({ onChange = vi.fn() }: { onChange?: (value: string) => void }): JSX.Element {
  const [value, setValue] = useState('first')

  return (
    <>
      <Tabs
        id="example"
        label="Example views"
        tabs={[
          { key: 'first', label: 'First' },
          { key: 'second', label: 'Second', count: 2 },
          { key: 'third', label: 'Third' }
        ]}
        value={value}
        onChange={(next) => {
          setValue(next)
          onChange(next)
        }}
        actions={<button type="button">Separate action</button>}
      />
      <TabPanel tabsId="example" value={value}>
        {value} panel
      </TabPanel>
    </>
  )
}

describe('Tabs', () => {
  it('exposes a named tablist, one roving tab stop and its active panel', () => {
    render(<LocalTabs />)

    const tablist = screen.getByRole('tablist', { name: 'Example views' })
    const tabs = within(tablist).getAllByRole('tab')
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true')
    expect(tabs[0]).toHaveAttribute('tabindex', '0')
    expect(tabs[0]).toHaveAttribute('aria-controls', 'example-panel')
    expect(tabs[1]).toHaveAttribute('tabindex', '-1')
    expect(screen.getByRole('tabpanel')).toHaveAttribute('aria-labelledby', 'example-tab-first')
    expect(within(tablist).queryByRole('button', { name: 'Separate action' })).toBeNull()
  })

  it('selects and focuses tabs with arrows, Home and End', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<LocalTabs onChange={onChange} />)

    const first = screen.getByRole('tab', { name: 'First' })
    first.focus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Second 2' })).toHaveFocus()
    expect(onChange).toHaveBeenLastCalledWith('second')

    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Third' })).toHaveFocus()
    await user.keyboard('{Home}')
    expect(first).toHaveFocus()
  })

  it('uses vertical arrow keys for a vertical tablist', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <Tabs
        id="vertical"
        label="Vertical views"
        orientation="vertical"
        value="first"
        onChange={onChange}
        tabs={[
          { key: 'first', label: 'First' },
          { key: 'second', label: 'Second' }
        ]}
      />
    )

    screen.getByRole('tab', { name: 'First' }).focus()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveFocus()
    expect(onChange).toHaveBeenCalledWith('second')
  })

  it('has no applicable axe violations', async () => {
    const { container } = render(<LocalTabs />)
    await expectNoAxeViolations(container)
  })
})

describe('RouteTabs', () => {
  it('uses navigation links and aria-current instead of tab semantics', async () => {
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <RouteTabs
          label="Library types"
          value="movies"
          tabs={[
            { key: 'movies', label: 'Movies', to: '/movies' },
            { key: 'tv', label: 'TV', to: '/tv' }
          ]}
        />
      </MemoryRouter>
    )

    const navigation = screen.getByRole('navigation', { name: 'Library types' })
    expect(within(navigation).queryByRole('tab')).toBeNull()
    expect(screen.getByRole('link', { name: 'Movies' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'TV' })).not.toHaveAttribute('aria-current')
    await expectNoAxeViolations(container)
  })
})
