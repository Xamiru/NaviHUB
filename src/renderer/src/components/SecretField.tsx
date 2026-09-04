import type { ReactNode } from 'react'
import type { SecretStorageState } from '@shared/types'
import type { SecretSettingKey } from '@shared/secretSettings'
import { confirmDialog } from '../lib/confirm'

export function SecretStateLine({
  settingKey,
  state
}: {
  settingKey: SecretSettingKey
  state?: SecretStorageState
}) {
  if (!state) return <p className="mt-1 text-xs text-gray-500">Checking protected storage…</p>
  if (state.unreadable.includes(settingKey)) {
    return (
      <p className="mt-1 text-xs text-red-400">
        A saved credential exists but cannot be decrypted on this system. Replace or clear it.
      </p>
    )
  }
  const saved = state.configured[settingKey]
  if (state.protection === 'unavailable') {
    return (
      <p className="mt-1 text-xs text-red-400">
        OS protected storage is unavailable.{' '}
        {saved ? 'The existing value remains unchanged.' : 'No credential is saved.'}
      </p>
    )
  }
  if (state.protection === 'weak') {
    return (
      <p className="mt-1 text-xs text-amber-300">
        {saved ? 'Saved' : 'Not saved'}; Linux is using Electron&apos;s weak basic_text backend.
      </p>
    )
  }
  return (
    <p className="mt-1 text-xs text-gray-500">
      {saved
        ? `Saved with OS protection (${state.backend}). Leave blank to keep it.`
        : `Not saved. Protection backend: ${state.backend}.`}
    </p>
  )
}

export function SecretInput<K extends SecretSettingKey>({
  id,
  label,
  settingKey,
  value,
  onChange,
  onSave,
  state,
  placeholder,
  trim = true,
  note
}: {
  id: string
  label: string
  settingKey: K
  value: string
  onChange: (value: string) => void
  onSave: (key: K, value: string) => Promise<void>
  state?: SecretStorageState
  placeholder?: string
  trim?: boolean
  note?: ReactNode
}) {
  const configured = !!state?.configured[settingKey]

  async function save(): Promise<void> {
    const next = trim ? value.trim() : value
    if (!next) return
    await onSave(settingKey, next)
    onChange('')
  }

  async function clear(): Promise<void> {
    if (
      !(await confirmDialog(`Clear the saved ${label}?`, {
        confirmLabel: 'Clear',
        danger: true
      }))
    )
      return
    await onSave(settingKey, '')
    onChange('')
  }

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          className="input"
          type="password"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
        <button
          className="btn-ghost shrink-0"
          disabled={!(trim ? value.trim() : value) || !state?.available}
          onClick={save}
        >
          Save
        </button>
        {configured && (
          <button className="btn-ghost shrink-0" onClick={clear}>
            Clear
          </button>
        )}
      </div>
      <SecretStateLine settingKey={settingKey} state={state} />
      {note}
    </div>
  )
}
