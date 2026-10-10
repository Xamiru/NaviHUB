import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { FolderStatus, KeyTestResult, SecretStorageState } from '@shared/types'
import { isTestableKey } from '@shared/keyTests'
import { api } from '../../lib/api'
import { isSecretSettingKey, type SecretSettingKey } from '@shared/secretSettings'
import { confirmDialog } from '../../lib/confirm'
import QuietWorkspace from '../../components/QuietWorkspace'
import { Field } from '../../components/Field'
import { SecretStateLine } from '../../components/SecretField'

// Persist a setting and refresh the settings cache. Passed down to every
// section so they all save the same way.
export type SaveFn = (key: string, value: string) => Promise<void>

// Every PackRow's Remove asks the same way.
export const confirmRemove = (message: string): Promise<boolean> =>
  confirmDialog(message, { confirmLabel: 'Remove', danger: true })

// ---- reusable section shells ----------------------------------------------

export function SettingCard({
  title,
  description,
  children
}: {
  title: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <QuietWorkspace title={title} description={description}>
      {children}
    </QuietWorkspace>
  )
}

// Lets a card send the user to another card (the AI card's "set the key"
// link). Provided by SettingsPage; the default is a no-op so cards render alone
// in tests.
const OpenSettingContext = createContext<(title: string) => void>(() => {})
export const OpenSettingProvider = OpenSettingContext.Provider
export function useOpenSetting(): (title: string) => void {
  return useContext(OpenSettingContext)
}

// A single "text field + Save" setting seeded from the settings row `settingKey`.
// Covers the API keys and folder paths, which are all this shape.
export function TextSetting({
  settingKey,
  data,
  onSave,
  title,
  description,
  type = 'text',
  folder = false,
  secretStorage,
  placeholder,
  note,
  actions
}: {
  settingKey: string
  data: Record<string, string> | undefined
  onSave: SaveFn
  title: string
  description: ReactNode
  type?: 'text' | 'password'
  // A folder path: adds Browse… and warns when the saved folder is missing.
  folder?: boolean
  secretStorage?: SecretStorageState
  placeholder?: string
  note?: ReactNode
  // Extra control(s) beside Save — e.g. "Open folder" for a directory setting.
  actions?: ReactNode
}) {
  const [value, setValue] = useState('')
  const secret = type === 'password' && isSecretSettingKey(settingKey)
  const secretKey = secret ? (settingKey as SecretSettingKey) : null
  const configured = secretKey ? !!secretStorage?.configured[secretKey] : false
  const savedValue = data?.[settingKey]
  useEffect(() => setValue(secret ? '' : (savedValue ?? '')), [savedValue, settingKey, secret])

  async function save(): Promise<void> {
    if (secret && !value.trim()) return
    await onSave(settingKey, value.trim())
    if (secret) setValue('')
    // A replaced key keeps `configured` true, so the effect below cannot see it.
    setTestResult(null)
  }

  const [folderState, setFolderState] = useState<FolderStatus | null>(null)
  useEffect(() => {
    if (!folder || !savedValue?.trim()) {
      setFolderState(null)
      return
    }
    let live = true
    void api.files.folderStatus(savedValue).then((status) => live && setFolderState(status))
    return () => {
      live = false
    }
  }, [folder, savedValue])

  async function browse(): Promise<void> {
    const picked = await api.files.chooseFolder(`Choose the ${title.toLowerCase()}`, value || undefined)
    if (!picked) return
    setValue(picked)
    await onSave(settingKey, picked)
  }

  const testable = secret && isTestableKey(settingKey)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<KeyTestResult | null>(null)
  // A new or cleared key makes the last verdict stale.
  useEffect(() => setTestResult(null), [configured])

  async function test(): Promise<void> {
    if (!isTestableKey(settingKey)) return
    setTesting(true)
    setTestResult(null)
    try {
      setTestResult(await api.settings.testKey(settingKey))
    } finally {
      setTesting(false)
    }
  }

  async function clear(): Promise<void> {
    if (!secret) return
    if (!(await confirmDialog(`Clear the saved ${title}?`, { confirmLabel: 'Clear', danger: true }))) return
    await onSave(settingKey, '')
    setValue('')
    setTestResult(null)
  }

  return (
    <SettingCard title={title} description={description}>
      <div className="grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto]">
        <Field label={title} hiddenLabel className="contents">
          <input
            className="input"
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
        </Field>
        <button
          className="btn-ghost shrink-0"
          disabled={secret && (!value.trim() || !secretStorage?.available)}
          onClick={save}
        >
          Save
        </button>
        {folder && (
          <button className="btn-ghost shrink-0" onClick={() => void browse()}>
            Browse…
          </button>
        )}
        {testable && configured && (
          <button className="btn-ghost shrink-0" disabled={testing} onClick={() => void test()}>
            {testing ? 'Testing…' : 'Test'}
          </button>
        )}
        {secret && configured && (
          <button className="btn-ghost shrink-0" onClick={clear}>
            Clear
          </button>
        )}
        {actions}
      </div>
      {secretKey && <SecretStateLine settingKey={secretKey} state={secretStorage} />}
      {testable && (
        <p
          role="status"
          className={`mt-1 text-xs ${
            testResult?.ok ? 'text-signal-affirmative' : 'text-signal-anomaly'
          }`}
        >
          {testResult?.message ?? ''}
        </p>
      )}
      {folderState && !(folderState.exists && folderState.isDirectory) && (
        <p className="mt-1 text-xs text-signal-caution" role="status">
          {folderState.exists
            ? 'This path is a file, not a folder.'
            : 'Folder not found. Files under it will not open until the drive is connected or you choose its new location.'}
        </p>
      )}
      {note && <p className="mt-1 text-xs text-gray-500">{note}</p>}
    </SettingCard>
  )
}
