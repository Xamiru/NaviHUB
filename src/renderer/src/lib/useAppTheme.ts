import { useSyncExternalStore } from 'react'
import { parseAppTheme, parseAppThemeVariant, type AppTheme, type AppThemeVariant } from '@shared/appTheme'

// The active theme and style for components that change markup (not just CSS)
// per theme: toasts, loading, empty and error states. It follows the
// data-theme stamp on <html>, which App and Settings keep authoritative, so it
// works anywhere without the settings query.
function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'data-theme-variant']
  })
  return () => observer.disconnect()
}

function snapshot(): string {
  const { theme, themeVariant } = document.documentElement.dataset
  return `${theme ?? ''}|${themeVariant ?? ''}`
}

export function useAppTheme(): { theme: AppTheme; variant: AppThemeVariant } {
  const [rawTheme, rawVariant] = useSyncExternalStore(subscribe, snapshot).split('|')
  const theme = parseAppTheme(rawTheme)
  return { theme, variant: parseAppThemeVariant(theme, rawVariant) }
}
