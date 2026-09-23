export const APP_THEME_SETTING = 'ui.theme'

export const APP_THEME_OPTIONS = [
  {
    value: 'lain',
    label: 'Lain',
    subtitle: 'Wired, after dark',
    description: 'Black violet, dusty rose signals and the quiet atmosphere of the Wired.'
  },
  {
    value: 'metal-gear',
    label: 'Metal Gear',
    subtitle: 'Solid / Ink',
    description: 'Paper, dark green ink, red actions and classic Metal Gear Solid artwork.'
  },
  {
    value: 'miku',
    label: 'Hatsune Miku',
    subtitle: 'Beyond the blue',
    description: 'Cyan-blue surfaces, soft lettering and Miku in the open sky.'
  },
  {
    value: 'twin-peaks',
    label: 'Twin Peaks',
    subtitle: 'The waiting room',
    description: 'Curtain red, warm black and ivory, from the classic series and Fire Walk with Me.'
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
  const backgrounds: Record<AppTheme, string> = {
    lain: '#0f0d15',
    'metal-gear': '#e4e6e0',
    miku: '#6fd4e2',
    'twin-peaks': '#170e0c'
  }
  return backgrounds[theme]
}
