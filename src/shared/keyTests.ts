// The provider credentials Settings can test in place ("Test" beside Save).
// Shared so the renderer knows which key cards get the button; the probes
// themselves live in src/main/keyTestCore.ts. Jackett and qBittorrent keep
// their own testers (they also need a URL), and Vertex has no single key.
export const TESTABLE_KEYS = [
  'tmdb.api_key',
  'omdb.api_key',
  'hardcover.token',
  'fanarttv.api_key',
  'football.api_key',
  'steam.web_api_key',
  'steamgriddb.api_key',
  'ra.api_key',
  'gemini.api_key',
  'anthropic.api_key'
] as const

export type TestableKey = (typeof TESTABLE_KEYS)[number]

export function isTestableKey(key: string): key is TestableKey {
  return (TESTABLE_KEYS as readonly string[]).includes(key)
}
