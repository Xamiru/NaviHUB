import type { ReactNode } from 'react'
import ThemedLoading from './theme/ThemedLoading'

// Uniform page-level placeholder for loading / not-found states: same
// container padding as page content, so the swap to real content doesn't jump.
// A "Loading…" message becomes the theme's loading screen.
export default function PageStatus({ children }: { children: ReactNode }) {
  if (typeof children === 'string' && children.startsWith('Loading')) {
    return <ThemedLoading label={children} compact />
  }
  return <p className="p-6 text-sm text-gray-400" role="status">{children}</p>
}
