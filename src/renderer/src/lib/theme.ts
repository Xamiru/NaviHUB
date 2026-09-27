import {
  appThemeVariantSetting,
  parseAppTheme,
  parseAppThemeVariant,
  type AppTheme,
  type AppThemeVariant
} from '@shared/appTheme'

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

// Each theme remembers its own style. The mirror uses the same key as the
// database row so the pre-React stamp can read it without the settings query.
export function readStoredAppThemeVariant(
  theme: AppTheme,
  storage: ThemeStorage = localStorage
): AppThemeVariant {
  try {
    return parseAppThemeVariant(theme, storage.getItem(appThemeVariantSetting(theme)))
  } catch {
    return parseAppThemeVariant(theme, null)
  }
}

export function persistAppThemeVariant(
  theme: AppTheme,
  variant: string,
  storage: ThemeStorage = localStorage
): void {
  try {
    storage.setItem(appThemeVariantSetting(theme), variant)
  } catch {
    // The database setting remains authoritative if storage is unavailable.
  }
}

export function resolveAppThemeVariant(
  theme: AppTheme,
  settings: Record<string, string> | undefined
): AppThemeVariant {
  const value = settings?.[appThemeVariantSetting(theme)]
  return value == null ? readStoredAppThemeVariant(theme) : parseAppThemeVariant(theme, value)
}

export function stampAppTheme(
  theme: AppTheme,
  variant: string = parseAppThemeVariant(theme, null),
  root: Pick<HTMLElement, 'dataset'> = document.documentElement
): void {
  root.dataset.theme = theme
  root.dataset.themeVariant = parseAppThemeVariant(theme, variant)
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
