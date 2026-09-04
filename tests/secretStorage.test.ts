import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { readFileSync } from 'node:fs'
import { createTestDb } from './helpers'
import { SECRET_SETTING_KEYS } from '../src/shared/secretSettings'

let db: Database.Database

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

vi.mock('electron', () => ({
  safeStorage: {}
}))

import * as settingsRepo from '../src/main/repos/settingsRepo'
import {
  decodeSecretEnvelope,
  encodeSecretEnvelope,
  initializeSecretStorage,
  isSecretEnvelope,
  secretStorageState,
  setSecret,
  settingsForRenderer,
  type SecretBackend
} from '../src/main/secretStorage'

function backend(options: { available?: boolean; decryptFails?: boolean } = {}): SecretBackend {
  return {
    available: async () => options.available ?? true,
    backend: () => 'basic_text',
    encrypt: async (value) => Buffer.from(`protected:${value}`, 'utf8'),
    decrypt: async (value) => {
      if (options.decryptFails) throw new Error('key unavailable')
      return {
        result: value.toString('utf8').replace(/^protected:/, ''),
        shouldReEncrypt: false
      }
    }
  }
}

function raw(key: string): string | null {
  return (
    db.prepare('SELECT value FROM settings WHERE key = ?').pluck().get(key) as string | undefined
  ) ?? null
}

beforeEach(() => {
  db = createTestDb()
  settingsRepo.setSecretReader(null)
})

describe('protected settings', () => {
  it('migrates plaintext in place, serves plaintext only in main, and redacts renderer settings', async () => {
    settingsRepo.set('tmdb.api_key', 'plain-secret')
    settingsRepo.set('ui.theme', 'lain')

    await initializeSecretStorage(backend())

    expect(isSecretEnvelope(raw('tmdb.api_key')!)).toBe(true)
    expect(raw('tmdb.api_key')).not.toContain('plain-secret')
    expect(settingsRepo.get('tmdb.api_key')).toBe('plain-secret')
    expect(settingsForRenderer()).toEqual(expect.objectContaining({ 'ui.theme': 'lain' }))
    expect(settingsForRenderer()).not.toHaveProperty('tmdb.api_key')
    expect(secretStorageState()).toMatchObject({
      available: true,
      backend: 'basic_text',
      protection: 'weak',
      configured: { 'tmdb.api_key': true },
      unreadable: []
    })
  })

  it('replaces and clears credentials without exposing their encrypted representation', async () => {
    await initializeSecretStorage(backend())

    await setSecret('github.token', 'replacement-token')
    const stored = raw('github.token')!
    expect(decodeSecretEnvelope(stored)?.toString('utf8')).toBe('protected:replacement-token')
    expect(settingsRepo.get('github.token')).toBe('replacement-token')
    expect(settingsForRenderer()).not.toHaveProperty('github.token')

    await setSecret('github.token', '')
    expect(raw('github.token')).toBeNull()
    expect(settingsRepo.get('github.token')).toBeNull()
    expect(secretStorageState().configured['github.token']).toBe(false)
  })

  it('preserves legacy data when protection is unavailable and keeps unreadable envelopes replaceable', async () => {
    settingsRepo.set('ra.api_key', 'legacy-key')
    await initializeSecretStorage(backend({ available: false }))

    expect(raw('ra.api_key')).toBe('legacy-key')
    expect(settingsRepo.get('ra.api_key')).toBe('legacy-key')
    expect(secretStorageState().protection).toBe('unavailable')
    await expect(setSecret('ra.api_key', 'new-key')).rejects.toThrow('not saved')
    await setSecret('ra.api_key', '')
    expect(raw('ra.api_key')).toBeNull()

    settingsRepo.setSecretReader(null)
    settingsRepo.set('anthropic.api_key', encodeSecretEnvelope(Buffer.from('unreadable')))
    await initializeSecretStorage(backend({ decryptFails: true }))
    expect(settingsRepo.get('anthropic.api_key')).toBeNull()
    expect(secretStorageState().unreadable).toContain('anthropic.api_key')

    await setSecret('anthropic.api_key', 're-entered')
    expect(settingsRepo.get('anthropic.api_key')).toBe('re-entered')
    expect(secretStorageState().unreadable).not.toContain('anthropic.api_key')
  })

  it('keeps the headless bulk importer outside the protected-storage boundary', () => {
    const source = readFileSync('scripts/bulk-import.cjs', 'utf8')
    expect(source).toContain("const PROTECTED_SECRET_PREFIX = 'navihub-secret:v1:'")
    expect(source).toContain("maintenanceSecret('tmdb.api_key', 'NAVIHUB_TMDB_API_KEY', true)")
    expect(source).toContain("maintenanceSecret('omdb.api_key', 'NAVIHUB_OMDB_API_KEY')")
    expect(source).toContain("maintenanceSecret('rawg.api_key', 'NAVIHUB_RAWG_API_KEY', true)")
    expect(source).not.toContain("VALUES ('rawg.api_key', ?)")
  })

  it('keeps every protected key in the library-export sanitizer', () => {
    const sanitizer = readFileSync('scripts/sanitizeSql.cjs', 'utf8')
    for (const key of SECRET_SETTING_KEYS) expect(sanitizer).toContain(`'${key}'`)
  })
})
