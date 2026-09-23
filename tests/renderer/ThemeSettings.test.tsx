import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { APP_THEME_OPTIONS } from '@shared/appTheme'
import { ThemeSettings } from '@/pages/SettingsPage'
import AppMark from '@/components/AppMark'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({ api: {} }))

afterEach(() => {
  localStorage.removeItem('ui.theme')
  delete document.documentElement.dataset.theme
})

describe('application theme selection', () => {
  it.each(APP_THEME_OPTIONS)('saves and restores $label', async (option) => {
    const user = userEvent.setup()
    let finishSave!: () => void
    const onSave = vi.fn(() => new Promise<void>((resolve) => { finishSave = resolve }))
    localStorage.setItem('ui.theme', 'lain')
    document.documentElement.dataset.theme = 'lain'
    const { rerender, container } = render(<ThemeSettings data={{ 'ui.theme': 'lain' }} onSave={onSave} />)
    const button = screen.getByRole('button', { name: new RegExp(option.label) })
    await user.click(button)
    expect(onSave).toHaveBeenCalledWith('ui.theme', option.value)
    expect(button).toBeDisabled()
    expect(localStorage.getItem('ui.theme')).toBe('lain')
    expect(document.documentElement.dataset.theme).toBe('lain')
    finishSave()
    await waitFor(() => expect(button).not.toBeDisabled())
    expect(localStorage.getItem('ui.theme')).toBe(option.value)
    expect(document.documentElement.dataset.theme).toBe(option.value)
    rerender(<ThemeSettings data={{ 'ui.theme': option.value }} onSave={onSave} />)
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getAllByRole('button').filter((item) => item.getAttribute('aria-pressed') === 'true')).toEqual([button])
    await expectNoAxeViolations(container)
  })

  it.each([
    ['miku', 'miku-classic.png'],
    ['twin-peaks', 'peaks-laura.jpg']
  ] as const)('uses the approved %s portrait instead of a different theme mark', (theme, asset) => {
    const { container } = render(<AppMark theme={theme} className="h-7 w-7" />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect((container.firstElementChild as HTMLElement).style.backgroundImage).toContain(asset)
  })
})
