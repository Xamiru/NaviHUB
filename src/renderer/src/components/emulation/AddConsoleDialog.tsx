import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import Dialog from '../Dialog'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import { consoleArt } from '../../lib/consoleArt'
import { consolePath } from '../../lib/emulationHub'
import { PLATFORMS, type PlatformKey } from '@shared/emulation/platforms'
import { EMULATOR_PRESETS, PRESET_KEYS } from '@shared/emulation/emulatorPresets'
import type { EmulatorInfo } from '@shared/types'

function labels(platforms: readonly PlatformKey[]): string {
  return platforms.map((p) => PLATFORMS[p].label).join(', ')
}

// Adds an emulator through main's file picker. Given the console it was added
// for, a custom emulator or RetroArch takes that console on; a known emulator
// keeps its own consoles, and the user is told when they picked one that does
// not play the console they started from. `open` moves to the console page.
export function useAddEmulator({ open = true }: { open?: boolean } = {}) {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)

  async function add(platform?: PlatformKey): Promise<EmulatorInfo | null> {
    setAdding(true)
    try {
      const info = await api.emulators.add(platform)
      if (!info) return null
      await qc.invalidateQueries({ queryKey: qk.games.all })
      if (platform && !info.platforms.includes(platform)) {
        toast(
          info.platforms.length > 0
            ? `${info.name} plays ${labels(info.platforms)}, not ${PLATFORMS[platform].label}. Added under ${labels(info.platforms)}.`
            : `${info.name} does not play ${PLATFORMS[platform].label}.`,
          'warning'
        )
        if (open && info.platforms[0]) navigate(consolePath(info.platforms[0]))
        return info
      }
      toast(
        info.platforms.length === 0 ? `Added ${info.name}. Tick the consoles it plays.` : `Added ${info.name}.`,
        'success'
      )
      const target = platform ?? info.platforms[0]
      if (open && target) navigate(consolePath(target))
      return info
    } catch (e) {
      toastError(e)
      return null
    } finally {
      setAdding(false)
    }
  }

  return { add, adding }
}

// Setting up a console that has no emulator yet: the emulators NaviHUB knows
// for it, each with its website, and the picker for the program itself.
export default function AddConsoleDialog({ platform, onClose }: { platform: PlatformKey; onClose: () => void }) {
  const { add, adding } = useAddEmulator()
  const info = PLATFORMS[platform]
  const known = PRESET_KEYS.filter((k) => EMULATOR_PRESETS[k].platforms.includes(platform)).map((k) => EMULATOR_PRESETS[k])
  const retroarch = EMULATOR_PRESETS.retroarch
  const art = consoleArt(platform, 'tile')
  const titleId = `add-console-${platform}`

  async function choose(): Promise<void> {
    const added = await add(platform)
    if (added) onClose()
  }

  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Set up a console</p>
          <h2 id={titleId} className="mt-1 text-xl font-semibold">{info.label}</h2>
        </div>
        <button type="button" className="btn-ghost" aria-label="Close" title="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      {art && <img src={art} alt="" className="mx-auto my-4 max-h-36 object-contain drop-shadow-xl" />}
      <p className="text-sm text-ink-secondary">
        Install an emulator for the {info.short}, then choose its program file. NaviHUB recognises these and fills in how
        to launch them:
      </p>
      <ul className="mt-3 space-y-2">
        {[...known, retroarch].map((preset) => (
          <li key={preset.key} className="flex items-center justify-between gap-3 rounded-lg border border-line-subtle px-3 py-2">
            <div className="min-w-0">
              <p className="text-sm font-medium">{preset.name}</p>
              {preset.key === 'retroarch' && <p className="text-xs text-ink-muted">Plays many consoles through a core you pick</p>}
              {preset.key !== 'retroarch' && preset.platforms.length > 1 && (
                <p className="text-xs text-ink-muted">Also plays {labels(preset.platforms.filter((p) => p !== platform))}</p>
              )}
            </div>
            {preset.homepage && (
              <button
                type="button"
                className="btn-ghost shrink-0 text-xs"
                aria-label={`${preset.name} website`}
                onClick={() => void api.app.openExternal(preset.homepage!)}
              >
                Website
              </button>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-ink-muted">Any other emulator works too; you can adjust its launch arguments afterwards.</p>
      <div className="mt-5 flex justify-end gap-2">
        <button type="button" className="btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="btn-primary" disabled={adding} onClick={() => void choose()}>
          Choose the program…
        </button>
      </div>
    </Dialog>
  )
}
