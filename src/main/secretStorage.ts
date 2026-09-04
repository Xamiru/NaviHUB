import { safeStorage } from 'electron'
import { getSqlite } from './db/connection'
import { logInfo, logWarn } from './logBus'
import * as settingsRepo from './repos/settingsRepo'
import {
  isSecretSettingKey,
  SECRET_SETTING_KEYS,
  type SecretSettingKey
} from '@shared/secretSettings'
import type { SecretStorageState, SettingsMap } from '@shared/types'

const ENVELOPE_PREFIX = 'navihub-secret:v1:'

export interface SecretBackend {
  available(): Promise<boolean>
  backend(): string
  encrypt(value: string): Promise<Buffer>
  decrypt(value: Buffer): Promise<{ result: string; shouldReEncrypt: boolean }>
}

const electronBackend: SecretBackend = {
  available: () => safeStorage.isAsyncEncryptionAvailable(),
  backend: () => {
    if (process.platform === 'win32') return 'dpapi'
    if (process.platform === 'darwin') return 'keychain'
    return safeStorage.getSelectedStorageBackend()
  },
  encrypt: (value) => safeStorage.encryptStringAsync(value),
  decrypt: (value) => safeStorage.decryptStringAsync(value)
}

let values = new Map<SecretSettingKey, string>()
let unreadable = new Set<SecretSettingKey>()
let available = false
let backendName = 'unavailable'
let initialized = false
let activeBackend = electronBackend

export function encodeSecretEnvelope(value: Buffer): string {
  return `${ENVELOPE_PREFIX}${value.toString('base64')}`
}

export function decodeSecretEnvelope(value: string): Buffer | null {
  if (!value.startsWith(ENVELOPE_PREFIX)) return null
  const encoded = value.slice(ENVELOPE_PREFIX.length)
  if (!encoded || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) return Buffer.alloc(0)
  return Buffer.from(encoded, 'base64')
}

export function isSecretEnvelope(value: string): boolean {
  return value.startsWith(ENVELOPE_PREFIX)
}

function rawSecretRows(): Array<{ key: SecretSettingKey; value: string }> {
  const placeholders = SECRET_SETTING_KEYS.map(() => '?').join(',')
  return getSqlite()
    .prepare(`SELECT key, value FROM settings WHERE key IN (${placeholders})`)
    .all(...SECRET_SETTING_KEYS) as Array<{ key: SecretSettingKey; value: string }>
}

function protection(): SecretStorageState['protection'] {
  if (!available) return 'unavailable'
  return backendName === 'basic_text' ? 'weak' : 'secure'
}

async function encryptedEnvelope(value: string, secretBackend: SecretBackend): Promise<string> {
  return encodeSecretEnvelope(await secretBackend.encrypt(value))
}

export async function initializeSecretStorage(
  secretBackend: SecretBackend = electronBackend
): Promise<void> {
  values = new Map()
  unreadable = new Set()
  available = false
  backendName = 'unavailable'
  activeBackend = secretBackend

  try {
    available = await secretBackend.available()
    backendName = available ? secretBackend.backend() : 'unavailable'
  } catch (error) {
    available = false
    backendName = 'unavailable'
    logWarn('app', `protected storage unavailable: ${error instanceof Error ? error.message : String(error)}`)
  }

  const pendingWrites: Array<{ key: SecretSettingKey; value: string }> = []
  let migrated = 0
  for (const row of rawSecretRows()) {
    if (!row.value) continue
    const encrypted = decodeSecretEnvelope(row.value)
    if (encrypted) {
      if (!available) {
        unreadable.add(row.key)
        continue
      }
      try {
        const result = await secretBackend.decrypt(encrypted)
        values.set(row.key, result.result)
        if (result.shouldReEncrypt) {
          pendingWrites.push({
            key: row.key,
            value: await encryptedEnvelope(result.result, secretBackend)
          })
        }
      } catch {
        unreadable.add(row.key)
      }
      continue
    }

    // Compatibility path: keep a pre-upgrade plaintext value usable in memory,
    // then replace it atomically on disk when protected storage is available.
    values.set(row.key, row.value)
    if (available) {
      try {
        pendingWrites.push({ key: row.key, value: await encryptedEnvelope(row.value, secretBackend) })
        migrated += 1
      } catch (error) {
        logWarn(
          'app',
          `could not protect ${row.key}: ${error instanceof Error ? error.message : String(error)}`
        )
      }
    }
  }

  if (pendingWrites.length > 0) {
    const write = getSqlite().prepare('UPDATE settings SET value = ? WHERE key = ?')
    getSqlite().transaction(() => {
      for (const row of pendingWrites) write.run(row.value, row.key)
    })()
  }

  initialized = true
  settingsRepo.setSecretReader((key) =>
    isSecretSettingKey(key) ? (values.get(key) ?? null) : null
  )
  logInfo(
    'app',
    `protected storage ready (backend=${backendName}, protection=${protection()}, migrated=${migrated}, unreadable=${unreadable.size})`
  )
}

export async function setSecret(key: string, value: string): Promise<void> {
  if (!isSecretSettingKey(key)) throw new Error(`Unknown protected setting: ${key}`)
  if (!initialized) throw new Error('Protected storage is not initialized')

  if (!value) {
    getSqlite().prepare('DELETE FROM settings WHERE key = ?').run(key)
    values.delete(key)
    unreadable.delete(key)
    return
  }
  if (!available) {
    throw new Error('OS protected storage is unavailable. The credential was not saved.')
  }

  const envelope = await encryptedEnvelope(value, activeBackend)
  getSqlite()
    .prepare(
      `INSERT INTO settings (key, value) VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    )
    .run(key, envelope)
  values.set(key, value)
  unreadable.delete(key)
}

export function settingsForRenderer(): SettingsMap {
  const all = settingsRepo.all()
  for (const key of SECRET_SETTING_KEYS) delete all[key]
  return all
}

export function secretStorageState(): SecretStorageState {
  const configured: Record<string, boolean> = {}
  const rows = new Map(rawSecretRows().map((row) => [row.key, row.value]))
  for (const key of SECRET_SETTING_KEYS) configured[key] = Boolean(rows.get(key))
  return {
    available,
    backend: backendName,
    protection: protection(),
    configured,
    unreadable: [...unreadable]
  }
}
