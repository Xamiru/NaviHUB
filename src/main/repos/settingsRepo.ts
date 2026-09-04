import { getSqlite } from '../db/connection'
import type { SettingsMap } from '@shared/types'
import { isSecretSettingKey } from '@shared/secretSettings'

let secretReader: ((key: string) => string | null) | null = null

// Installed once after Electron is ready and the secret rows have been
// decrypted into process memory. Tests and maintenance contexts that do not
// initialize Electron keep the ordinary raw-settings behavior.
export function setSecretReader(reader: ((key: string) => string | null) | null): void {
  secretReader = reader
}

export function all(): SettingsMap {
  const rows = getSqlite().prepare('SELECT key, value FROM settings').all() as {
    key: string
    value: string
  }[]
  const out: SettingsMap = {}
  for (const r of rows) out[r.key] = r.value
  return out
}

export function get(key: string): string | null {
  if (secretReader && isSecretSettingKey(key)) return secretReader(key)
  const row = getSqlite().prepare('SELECT value FROM settings WHERE key = ?').get(key) as
    | { value: string }
    | undefined
  return row ? row.value : null
}

export function set(key: string, value: string): void {
  getSqlite()
    .prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
    .run(key, value)
}
