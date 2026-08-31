import { parseAppTheme, type AppTheme } from '@shared/appTheme'

const THEME_STORAGE_KEY = 'ui.theme'

interface ThemeStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export function readStoredAppTheme(storage: ThemeStorage = localStorage): AppTheme {
  try {
    return parseAppTheme(storage.getItem(THEME_STORAGE_KEY))
  } catch {
    return 'lain'
  }
}

export function persistAppTheme(
  theme: AppTheme,
  storage: ThemeStorage = localStorage
): void {
  try {
    storage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // The database setting remains authoritative if storage is unavailable.
  }
}

export function resolveAppTheme(settingValue: string | undefined): AppTheme {
  return settingValue == null ? readStoredAppTheme() : parseAppTheme(settingValue)
}

export function stampAppTheme(
  theme: AppTheme,
  root: Pick<HTMLElement, 'dataset'> = document.documentElement
): void {
  root.dataset.theme = theme
}

const TACTICAL_DESCRIPTORS: Readonly<Record<string, string>> = {
  'Archive broadcast': 'Operations overview',
  'Archive directory': 'Mission database',
  'Connected archive': 'Intelligence network',
  'Screen archive': 'Visual intelligence',
  'Challenge broadcast': 'Simulation suite',
  'Sonic archive': 'Audio intelligence',
  'Curated archive': 'Field dossiers',
  'Tasks and settings': 'System operations'
}

export function themedDescriptor(theme: AppTheme, descriptor: string): string {
  return theme === 'metal-gear' ? (TACTICAL_DESCRIPTORS[descriptor] ?? descriptor) : descriptor
}
