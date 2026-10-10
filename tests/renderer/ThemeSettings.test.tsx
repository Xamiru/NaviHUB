import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { APP_THEME_OPTIONS, APP_THEME_VARIANT_OPTIONS } from '@shared/appTheme'
import { ThemeSettings } from '@/pages/settings/AppearanceSettings'
import AppMark from '@/components/AppMark'
import { expectNoAxeViolations } from './accessibility'

vi.mock('@/lib/api', () => ({ api: {} }))

afterEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
  delete document.documentElement.dataset.themeVariant
})

describe('application theme selection', () => {
  it.each(APP_THEME_OPTIONS)('saves and restores $label', async (option) => {
    const user = userEvent.setup()
    let finishSave!: () => void
    const onSave = vi.fn(() => new Promise<void>((resolve) => { finishSave = resolve }))
    localStorage.setItem('ui.theme', 'lain')
    document.documentElement.dataset.theme = 'lain'
    const { rerender, container } = render(<ThemeSettings data={{ 'ui.theme': 'lain' }} onSave={onSave} />)
    const themes = screen.getByRole('group', { name: 'Application theme' })
    const button = within(themes).getByRole('button', { name: new RegExp(option.label) })
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
    expect(within(themes).getAllByRole('button').filter((item) => item.getAttribute('aria-pressed') === 'true')).toEqual([button])
    expect(document.documentElement.dataset.themeVariant).toBe(APP_THEME_VARIANT_OPTIONS[option.value][0].value)
    await expectNoAxeViolations(container)
  })

  it('saves the style for the active theme only', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn(() => Promise.resolve())
    const data = { 'ui.theme': 'miku', 'ui.themeVariant.lain': 'copland' }
    const { rerender, container } = render(<ThemeSettings data={data} onSave={onSave} />)
    const styles = screen.getByRole('group', { name: 'Hatsune Miku style' })
    expect(within(styles).getAllByRole('button')).toHaveLength(3)
    expect(within(styles).getByRole('button', { name: /Crypton teal/ })).toHaveAttribute('aria-pressed', 'true')
    await user.click(within(styles).getByRole('button', { name: /Concert night/ }))
    expect(onSave).toHaveBeenCalledWith('ui.themeVariant.miku', 'concert-night')
    await waitFor(() => expect(document.documentElement.dataset.themeVariant).toBe('concert-night'))
    expect(document.documentElement.dataset.theme).toBe('miku')
    expect(localStorage.getItem('ui.themeVariant.miku')).toBe('concert-night')
    rerender(<ThemeSettings data={{ ...data, 'ui.themeVariant.miku': 'concert-night' }} onSave={onSave} />)
    expect(within(styles).getByRole('button', { name: /Concert night/ })).toHaveAttribute('aria-pressed', 'true')

    // Switching theme restores that theme's own saved style.
    await user.click(within(screen.getByRole('group', { name: 'Application theme' })).getByRole('button', { name: /Lain/ }))
    await waitFor(() => expect(document.documentElement.dataset.theme).toBe('lain'))
    expect(document.documentElement.dataset.themeVariant).toBe('copland')
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
