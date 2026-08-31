export const APP_THEME_SETTING = 'ui.theme'

export const APP_THEME_OPTIONS = [
  {
    value: 'lain',
    label: 'Lain',
    subtitle: 'Wired terminal',
    description: 'Phosphor green, signal topology and restrained CRT atmosphere.'
  },
  {
    value: 'metal-gear',
    label: 'Metal Gear',
    subtitle: 'Tactical operations',
    description: 'Olive field displays, amber actions and codec-green intelligence.'
  }
] as const

export type AppTheme = (typeof APP_THEME_OPTIONS)[number]['value']

export function parseAppTheme(value: string | null | undefined): AppTheme {
  return APP_THEME_OPTIONS.some((option) => option.value === value)
    ? (value as AppTheme)
    : 'lain'
}

// BrowserWindow paints this before the renderer exists. Keep these values in
// sync with styles.css so a launch never flashes the other theme's canvas.
export function appThemeBackground(theme: AppTheme): string {
  return theme === 'metal-gear' ? '#0c0e0a' : '#0a0f0b'
}
