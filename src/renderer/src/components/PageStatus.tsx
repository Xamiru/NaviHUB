import type { ReactNode } from 'react'

// Uniform page-level placeholder for loading / not-found states: same
// container padding as page content, so the swap to real content doesn't jump.
export default function PageStatus({ children }: { children: ReactNode }) {
  return <p className="p-6 text-sm text-gray-400">{children}</p>
}
