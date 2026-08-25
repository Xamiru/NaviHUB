export type SurfaceMood = 'cinematic' | 'standard' | 'quiet' | 'immersive'

const IMMERSIVE_ROUTES = [
  /^\/(manga|books)\/\d+\/(read|book)\//,
  /^\/watch\/(file|wrestling|adhoc)\//,
  /^\/read\/(manga|book)\//
]

const QUIET_PREFIXES = [
  '/japanese',
  '/english',
  '/programming',
  '/settings',
  '/tasks',
  '/bulk',
  '/torrents'
]

const CINEMATIC_PREFIXES = [
  '/anime',
  '/manga',
  '/visual-novels',
  '/games',
  '/books',
  '/movies',
  '/tv',
  '/music',
  '/now-playing',
  '/wrestling',
  '/lists',
  '/tags',
  '/people',
  '/actors',
  '/directors',
  '/authors',
  '/artists',
  '/mangaka',
  '/studios',
  '/characters'
]

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

// One route-level intensity decision for the shell. Pages still own their
// information hierarchy; this only tunes the shared atmospheric field.
export function surfaceMoodForPath(pathname: string): SurfaceMood {
  if (IMMERSIVE_ROUTES.some((route) => route.test(pathname))) return 'immersive'
  if (QUIET_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))) return 'quiet'
  if (pathname === '/' || CINEMATIC_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))) {
    return 'cinematic'
  }
  return 'standard'
}
