// Player ids are namespaced because the shared queue carries several kinds of
// audio. Keep parsing strict: a bare prefix or mixed suffix must never become a
// database id.
export function musicIdOf(trackId: string): number | null {
  return idAfterPrefix(trackId, 'music')
}

export function themeIdOf(trackId: string): number | null {
  return idAfterPrefix(trackId, 'theme')
}

function idAfterPrefix(trackId: string, prefix: string): number | null {
  const match = new RegExp(`^${prefix}-(\\d+)$`).exec(trackId)
  return match ? Number(match[1]) : null
}
