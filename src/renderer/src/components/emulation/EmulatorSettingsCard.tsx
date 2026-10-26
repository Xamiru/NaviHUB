import { useState } from 'react'
import { api } from '../../lib/api'
import { confirmDialog } from '../../lib/confirm'
import { toastError } from '../../lib/toast'
import { Field, Fieldset } from '../Field'
import { PLATFORM_KEYS, PLATFORMS, type PlatformKey } from '@shared/emulation/platforms'
import { EMULATOR_PRESETS } from '@shared/emulation/emulatorPresets'
import type { EmulatorInfo } from '@shared/types'

function FolderRow({
  label,
  value,
  overridden,
  emptyHint,
  onPick,
  onReset
}: {
  label: string
  value: string | null
  overridden: boolean
  emptyHint: string
  onPick: () => void
  onReset: () => void
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs">
      <span className="w-32 shrink-0 text-gray-400">{label}</span>
      {value ? (
        <span className="min-w-0 flex-1 break-all font-mono text-gray-300">{value}</span>
      ) : (
        <span className="min-w-0 flex-1 text-gray-500">{emptyHint}</span>
      )}
      <button type="button" className="btn-ghost text-xs" onClick={onPick}>
        Choose…
      </button>
      {overridden && (
        <button type="button" className="btn-ghost text-xs" onClick={onReset}>
          Use detected
        </button>
      )}
    </div>
  )
}

function ArgsEditor({ emulator, onSaved }: { emulator: EmulatorInfo; onSaved: () => Promise<void> }) {
  const [draft, setDraft] = useState<string | null>(null)
  const text = draft ?? emulator.args.join('\n')

  async function save(): Promise<void> {
    const args = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
    try {
      await api.emulators.update(emulator.id, { args })
      setDraft(null)
      await onSaved()
    } catch (e) {
      toastError(e)
    }
  }

  async function reset(): Promise<void> {
    try {
      await api.emulators.update(emulator.id, { args: null })
      setDraft(null)
      await onSaved()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div>
      <Field
        label="Launch arguments"
        description={
          <>
            One per line. <code>{'{rom}'}</code> is the game file
            {emulator.presetKey === 'retroarch' ? <>, <code>{'{core}'}</code> the core</> : null}; it is
            added at the end when missing.
          </>
        }
      >
        <textarea
          className="input h-28 w-full font-mono text-xs"
          value={text}
          spellCheck={false}
          onChange={(e) => setDraft(e.target.value)}
        />
      </Field>
      <div className="mt-2 flex gap-2">
        <button type="button" className="btn text-xs" disabled={draft == null} onClick={() => void save()}>
          Save arguments
        </button>
        {emulator.argsCustom && (
          <button type="button" className="btn-ghost text-xs" onClick={() => void reset()}>
            Restore {EMULATOR_PRESETS[emulator.presetKey].name} defaults
          </button>
        )}
      </div>
    </div>
  )
}

// One emulator's settings: where it is, which consoles it plays, its core and
// folders, and its launch arguments. Shown on a console page's Setup tab; an
// emulator that plays several consoles appears on each, with the same settings.
export default function EmulatorSettingsCard({
  emulator,
  console: shownFor,
  onChanged,
  onRemoved
}: {
  emulator: EmulatorInfo
  console?: PlatformKey
  onChanged: () => Promise<void>
  onRemoved?: () => void
}) {
  const preset = EMULATOR_PRESETS[emulator.presetKey]

  // True when the action itself went through, whether or not the refresh did.
  async function run(action: () => Promise<unknown>): Promise<boolean> {
    try {
      await action()
    } catch (e) {
      toastError(e)
      return false
    }
    try {
      await onChanged()
    } catch (e) {
      toastError(e)
    }
    return true
  }

  async function togglePlatform(platform: PlatformKey): Promise<void> {
    const next = emulator.platforms.includes(platform)
      ? emulator.platforms.filter((p) => p !== platform)
      : [...emulator.platforms, platform]
    await run(() => api.emulators.update(emulator.id, { platforms: next }))
  }

  async function remove(): Promise<void> {
    const ok = await confirmDialog(
      `Remove ${emulator.name} from NaviHUB? The emulator itself and your games stay where they are; game files set to use it switch to their console's default.`,
      { confirmLabel: 'Remove', danger: true }
    )
    if (!ok) return
    if (await run(() => api.emulators.remove(emulator.id))) onRemoved?.()
  }

  const shownPlatforms = PLATFORM_KEYS.filter(
    (p) => emulator.platforms.includes(p) || preset.platforms.includes(p) || emulator.presetKey === 'custom' || emulator.presetKey === 'retroarch'
  )

  return (
    <li className="card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold">{emulator.name}</h3>
          <p className="break-all font-mono text-xs text-gray-400">{emulator.exePath}</p>
          {!emulator.exeExists && (
            <p className="mt-1 text-xs text-signal-caution" role="status">
              The program is not at this path any more.
            </p>
          )}
          {!emulator.verified && (
            <p className="mt-1 text-xs text-gray-400">
              The launch arguments for {preset.name} come from community reports. If a game does not
              start, adjust them below.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {preset.homepage && (
            <button type="button" className="btn-ghost text-xs" onClick={() => void api.app.openExternal(preset.homepage!)}>
              Website
            </button>
          )}
          <button type="button" className="btn-ghost text-xs" onClick={() => void run(() => api.emulators.locate(emulator.id))}>
            Locate…
          </button>
          <button type="button" className="btn-ghost text-xs" onClick={() => void remove()}>
            Remove
          </button>
        </div>
      </div>

      <Fieldset legend="Plays" className="mt-4">
        <div className="flex flex-wrap gap-2">
          {shownPlatforms.map((p) => {
            const on = emulator.platforms.includes(p)
            return (
              <button
                key={p}
                type="button"
                aria-pressed={on}
                className={on ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
                onClick={() => void togglePlatform(p)}
                title={PLATFORMS[p].label}
              >
                {PLATFORMS[p].short}
              </button>
            )
          })}
        </div>
        {shownFor && emulator.platforms.some((p) => p !== shownFor) && (
          <p className="mt-2 text-xs text-gray-400">
            These settings also apply to{' '}
            {emulator.platforms.filter((p) => p !== shownFor).map((p) => PLATFORMS[p].label).join(', ')}.
          </p>
        )}
        {emulator.defaultFor.length > 0 && (
          <p className="mt-2 text-xs text-gray-400">
            Default for {emulator.defaultFor.map((p) => PLATFORMS[p].label).join(', ')}
          </p>
        )}
      </Fieldset>

      <div className="mt-4 space-y-2">
        {preset.needsCore && (
          <FolderRow
            label="Core"
            value={emulator.corePath}
            overridden={false}
            emptyHint="Pick the core this emulator should run."
            onPick={() => void run(() => api.emulators.pickCore(emulator.id))}
            onReset={() => undefined}
          />
        )}
        <FolderRow
          label="User folder"
          value={emulator.dataDir}
          overridden={emulator.dataDirOverride != null}
          emptyHint="Not found — choose it so mods and screenshots know where to go."
          onPick={() => void run(() => api.emulators.pickFolder(emulator.id, 'data'))}
          onReset={() => void run(() => api.emulators.update(emulator.id, { dataDir: null }))}
        />
        <FolderRow
          label="Screenshots"
          value={emulator.screenshotDir}
          overridden={emulator.screenshotDirOverride != null}
          emptyHint="Unknown — choose the folder its screenshots land in."
          onPick={() => void run(() => api.emulators.pickFolder(emulator.id, 'screenshots'))}
          onReset={() => void run(() => api.emulators.update(emulator.id, { screenshotDir: null }))}
        />
      </div>

      <details className="mt-4">
        <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-200">Launch arguments</summary>
        <div className="mt-3">
          <ArgsEditor emulator={emulator} onSaved={onChanged} />
        </div>
      </details>
    </li>
  )
}
