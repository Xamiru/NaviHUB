export const SECRET_SETTING_KEYS = [
  'tmdb.api_key',
  'omdb.api_key',
  'football.api_key',
  'steam.web_api_key',
  'ra.api_key',
  'gemini.api_key',
  'anthropic.api_key',
  'jackett.api_key',
  'qbittorrent.password',
  'github.token',
  // Legacy integrations remain protected even when their UI is unavailable.
  'rawg.api_key',
  'igdb.client_id',
  'igdb.client_secret',
  'sync.token'
] as const

export type SecretSettingKey = (typeof SECRET_SETTING_KEYS)[number]

const SECRET_SETTING_KEY_SET = new Set<string>(SECRET_SETTING_KEYS)

export function isSecretSettingKey(key: string): key is SecretSettingKey {
  return SECRET_SETTING_KEY_SET.has(key)
}
