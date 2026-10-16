import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { toast, toastError } from '../lib/toast'
import { useGameSession } from '../lib/useGameSession'
import { Field } from './Field'
import { PLATFORM_KEYS, PLATFORMS, type PlatformKey } from '@shared/emulation/platforms'
import { EMULATOR_PRESETS } from '@shared/emulation/emulatorPresets'
import { isPortExe, portsForTitle } from '@shared/emulation/nativePorts'
import type { GameLaunchChoice, GamePlayOptions, GameRom } from '@shared/types'

// The game files linked to one game and how each is played: which console it
// is, which emulator runs it, the disc id mods are filed under, and which way
// Play uses. The linked executable stays in GameLaunchSection above.

export function usePlayOptions(mediaId: number, enabled = true) {
  return useQuery({
    queryKey: qk.games.playOptions(mediaId),
    queryFn: () => api.games.playOptions(mediaId),
    enabled
  })
}

// The way Play takes, mirroring emulation.chooseLaunch: the preferred file,
// else the executable, else the first file.
export function defaultChoice(opts: GamePlayOptions | undefined): GameLaunchChoice | null {
  if (!opts) return null
  const preferred = opts.roms.find((r) => r.preferred)
  if (preferred) return { kind: 'rom', romId: preferred.id }
  if (opts.exePath) return { kind: 'native' }
  if (opts.roms.length > 0) return { kind: 'rom', romId: opts.roms[0].id }
  return null
}

function fileName(path: string): string {
  return path.split(/[\\/]/).pop() ?? path
}

function RomRow({
  rom,
  emulators,
  onChanged,
  onPlay,
  playDisabled
}: {
  rom: GameRom
  emulators: { id: number; name: string; platforms: PlatformKey[] }[]
  onChanged: () => Promise<void>
  onPlay: (choice: GameLaunchChoice) => void
  playDisabled: boolean
}) {
  const [code, setCode] = useState<string | null>(null)

  async function run(action: () => Promise<unknown>): Promise<void> {
    try {
      await action()
      await onChanged()
    } catch (e) {
      toastError(e)
    }
  }

  async function unlink(): Promise<void> {
    if (!(await confirmDialog(`Unlink ${fileName(rom.romPath)}? The file itself stays where it is.`, { confirmLabel: 'Unlink' }))) {
      return
    }
    await run(() => api.games.unlinkRom(rom.id))
  }

  const able = emulators.filter((e) => e.platforms.includes(rom.platform))

  return (
    <li className="rounded-lg border border-base-700 bg-base-800/60 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium" title={rom.romPath}>
            {fileName(rom.romPath)}
          </p>
          <p className="break-all font-mono text-[11px] text-gray-500">{rom.romPath}</p>
          {!rom.exists && (
            <p className="text-xs text-signal-caution" role="status">
              The file is not at this path any more.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="btn text-xs"
            disabled={playDisabled}
            onClick={() => onPlay({ kind: 'rom', romId: rom.id })}
          >
            Play this
          </button>
          <button type="button" className="btn-ghost text-xs" onClick={() => void unlink()}>
            Unlink
          </button>
        </div>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Field label="Console">
          <select
            className="input w-full"
            value={rom.platform}
            onChange={(e) => void run(() => api.games.updateRom(rom.id, { platform: e.target.value as PlatformKey }))}
          >
            {PLATFORM_KEYS.map((p) => (
              <option key={p} value={p}>
                {PLATFORMS[p].label}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Emulator"
          description={
            rom.effectiveEmulatorName == null ? (
              <>
                None plays {PLATFORMS[rom.platform].label} yet — <Link className="underline" to="/games/emulators">add one</Link>.
              </>
            ) : undefined
          }
        >
          <select
            className="input w-full"
            value={rom.emulatorId ?? ''}
            onChange={(e) =>
              void run(() => api.games.updateRom(rom.id, { emulatorId: e.target.value ? Number(e.target.value) : null }))
            }
          >
            <option value="">
              Console default{rom.emulatorId == null && rom.effectiveEmulatorName ? ` (${rom.effectiveEmulatorName})` : ''}
            </option>
            {able.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </Field>
        <Field
          label="Game code"
          description={
            rom.gameCodeSource === 'file'
              ? 'Read from the file. Mods are filed under it.'
              : 'Mods and texture packs are filed under this, e.g. SLUS-20312.'
          }
        >
          <input
            className="input w-full font-mono"
            value={code ?? rom.gameCode ?? ''}
            placeholder="Not known"
            onChange={(e) => setCode(e.target.value)}
            onBlur={() => {
              if (code == null || code === (rom.gameCode ?? '')) return
              void run(() => api.games.updateRom(rom.id, { gameCode: code || null })).then(() => setCode(null))
            }}
          />
        </Field>
      </div>
    </li>
  )
}

export default function WaysToPlay({ mediaId, title }: { mediaId: number; title: string }) {
  const qc = useQueryClient()
  const session = useGameSession()
  const [busy, setBusy] = useState(false)
  const { data: opts } = usePlayOptions(mediaId)
  const { data: emulators } = useQuery({ queryKey: qk.games.emulators, queryFn: () => api.emulators.list() })

  async function refresh(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.games.all })
  }

  async function link(): Promise<void> {
    setBusy(true)
    try {
      const rom = await api.games.pickRom(mediaId)
      if (rom) {
        toast(
          rom.gameCode
            ? `Linked as ${PLATFORMS[rom.platform].label} (${rom.gameCode}).`
            : `Linked as ${PLATFORMS[rom.platform].label}. Change the console below if that is wrong.`,
          'success'
        )
        await refresh()
      }
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  async function play(choice: GameLaunchChoice): Promise<void> {
    try {
      await api.games.launch(mediaId, choice)
      await session.kick()
    } catch (e) {
      toastError(e)
    }
  }

  async function setPreferred(value: string): Promise<void> {
    try {
      await api.games.setPreferredRom(mediaId, value === 'native' ? null : Number(value))
      await refresh()
    } catch (e) {
      toastError(e)
    }
  }

  async function dropEmulatorExe(): Promise<void> {
    try {
      await api.games.clearExe(mediaId)
      await refresh()
    } catch (e) {
      toastError(e)
    }
  }

  if (!opts) return null
  const choice = defaultChoice(opts)
  const preferredValue = choice?.kind === 'rom' ? String(choice.romId) : choice?.kind === 'native' ? 'native' : ''
  const ways = (opts.exePath ? 1 : 0) + opts.roms.length
  const playDisabled = !opts.supported || session.running

  return (
    <div className="mt-5 border-t border-base-700 pt-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Game files</h3>
        <button type="button" className="btn-ghost text-xs" disabled={busy} onClick={() => void link()}>
          Link game file
        </button>
      </div>
      <p className="mt-1 text-xs text-gray-400">
        A disc image or ROM you own. Play opens it in the emulator for its console.
      </p>

      <NativePortNote title={title} exePath={opts.exePath} />

      {opts.exePreset && (
        <div className="mt-3 rounded-lg border border-accent/30 bg-accent/5 p-3 text-xs text-gray-300" role="note">
          The linked executable is {EMULATOR_PRESETS[opts.exePreset].name} itself, so Play only opens the
          emulator.{' '}
          {opts.roms.length > 0 ? (
            <button type="button" className="underline" onClick={() => void dropEmulatorExe()}>
              Unlink the emulator executable
            </button>
          ) : (
            'Link the game file so Play opens the game directly.'
          )}
        </div>
      )}

      {opts.roms.length > 0 && (
        <ul className="mt-3 space-y-3">
          {opts.roms.map((rom) => (
            <RomRow
              key={rom.id}
              rom={rom}
              emulators={emulators ?? []}
              onChanged={refresh}
              onPlay={(c) => void play(c)}
              playDisabled={playDisabled}
            />
          ))}
        </ul>
      )}

      {ways > 1 && (
        <Field label="Play button uses" className="mt-4 max-w-md">
          <select className="input w-full" value={preferredValue} onChange={(e) => void setPreferred(e.target.value)}>
            {opts.exePath && <option value="native">The linked executable</option>}
            {opts.roms.map((rom) => (
              <option key={rom.id} value={rom.id}>
                {fileName(rom.romPath)}
                {rom.effectiveEmulatorName ? ` in ${rom.effectiveEmulatorName}` : ''}
              </option>
            ))}
          </select>
        </Field>
      )}
    </div>
  )
}

// "This game has a native PC port" for titles on the curated list, until the
// port's own program is the linked executable.
function NativePortNote({ title, exePath }: { title: string; exePath: string | null }) {
  const ports = portsForTitle(title).filter((p) => !isPortExe(p, exePath))
  if (ports.length === 0 || ports.length < portsForTitle(title).length) return null
  return (
    <div className="mt-3 rounded-lg border border-base-600 bg-base-800/60 p-3 text-xs text-gray-300">
      <p className="font-semibold text-gray-200">
        {ports.length === 1 ? 'A native PC port exists' : 'Native PC ports exist'}
      </p>
      <ul className="mt-2 space-y-2">
        {ports.map((port) => (
          <li key={port.id}>
            <button type="button" className="underline hover:text-accent" onClick={() => void api.app.openExternal(port.homepage)}>
              {port.name}
            </button>{' '}
            — {port.needs}
            {port.exeName ? ` Once installed, link ${port.exeName} as the executable above.` : ' Once installed, link its program as the executable above.'}
          </li>
        ))}
      </ul>
    </div>
  )
}
