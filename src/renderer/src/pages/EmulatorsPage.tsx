import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { toast, toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import { Field, Fieldset } from '../components/Field'
import { PLATFORM_KEYS, PLATFORMS, type PlatformKey } from '@shared/emulation/platforms'
import { EMULATOR_PRESETS } from '@shared/emulation/emulatorPresets'
import { NATIVE_PORTS, portTitleKey } from '@shared/emulation/nativePorts'
import { fmtDurationSec } from '../lib/useGameSession'
import { InstalledMods } from '../components/ModsSection'
import type { EmulatorInfo, RomScanRow } from '@shared/types'

// Games → Emulators: the emulators installed on this machine, which consoles
// each one plays, and the default per console. Every path is picked in main;
// this page only ever sends ids and plain settings.

function useEmulators() {
  return useQuery({ queryKey: qk.games.emulators, queryFn: () => api.emulators.list() })
}

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

function EmulatorCard({ emulator, onChanged }: { emulator: EmulatorInfo; onChanged: () => Promise<void> }) {
  const preset = EMULATOR_PRESETS[emulator.presetKey]

  async function run(action: () => Promise<unknown>): Promise<void> {
    try {
      await action()
      await onChanged()
    } catch (e) {
      toastError(e)
    }
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
    if (ok) await run(() => api.emulators.remove(emulator.id))
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

function DefaultsTable({ emulators, onChanged }: { emulators: EmulatorInfo[]; onChanged: () => Promise<void> }) {
  const platforms = PLATFORM_KEYS.filter((p) => emulators.some((e) => e.platforms.includes(p)))
  if (platforms.length === 0) return null
  const defaultOf = (p: PlatformKey): number | null => emulators.find((e) => e.defaultFor.includes(p))?.id ?? null

  async function set(platform: PlatformKey, value: string): Promise<void> {
    try {
      await api.emulators.setDefault(platform, value ? Number(value) : null)
      await onChanged()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <Section title="Default per console" subtitle="Used when a game file names no emulator">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {platforms.map((p) => (
          <Field key={p} label={PLATFORMS[p].label}>
            <select className="input w-full" value={defaultOf(p) ?? ''} onChange={(e) => void set(p, e.target.value)}>
              <option value="">None</option>
              {emulators
                .filter((e) => e.platforms.includes(p))
                .map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))}
            </select>
          </Field>
        ))}
      </div>
    </Section>
  )
}

export default function EmulatorsPage() {
  const qc = useQueryClient()
  const { data, isLoading, isError, refetch } = useEmulators()
  const [adding, setAdding] = useState(false)

  async function refresh(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.games.all })
  }

  async function add(): Promise<void> {
    setAdding(true)
    try {
      const added = await api.emulators.add()
      if (added) {
        toast(
          added.presetKey === 'custom'
            ? `Added ${added.name}. Tick the consoles it plays.`
            : `Added ${added.name}.`,
          'success'
        )
        await refresh()
      }
    } catch (e) {
      toastError(e)
    } finally {
      setAdding(false)
    }
  }

  const header = (
    <PageHeader
      title="Emulators"
      eyebrow={<span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Game archive / launcher</span>}
      subtitle="Point NaviHUB at your emulators once; Play then opens each game straight from its game file."
      actions={
        data && data.length > 0 ? (
          <button type="button" className="btn" disabled={adding} onClick={() => void add()}>
            Add emulator
          </button>
        ) : undefined
      }
    />
  )

  if (isError) {
    return (
      <div className="p-6">
        {header}
        <div role="alert" className="text-sm text-gray-400">
          Could not load emulators.
          <button type="button" className="btn ml-3" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <div className="p-6">
        {header}
        <p className="text-sm text-gray-500" role="status">
          Loading emulators…
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] p-4 sm:p-6">
      {header}
      {data.length === 0 ? (
        <EmptyState
          title="No emulators yet"
          body={
            <>
              Add the program file of an emulator you have installed, such as PCSX2, DuckStation or
              Dolphin. NaviHUB recognises common emulators and fills in how to launch them.
            </>
          }
          action={
            <button type="button" className="btn-primary" disabled={adding} onClick={() => void add()}>
              Add emulator
            </button>
          }
        />
      ) : (
        <>
          <Section title="Your emulators" subtitle={`${data.length} on this machine`}>
            <ul className="space-y-4">
              {data.map((e) => (
                <EmulatorCard key={e.id} emulator={e} onChanged={refresh} />
              ))}
            </ul>
          </Section>
          <DefaultsTable emulators={data} onChanged={refresh} />
          <ScanPanel />
          <StatsPanel />
          <InstalledMods mediaId={null} title="Mods from removed games" />
        </>
      )}
      <PortsPanel />
    </div>
  )
}

// ---- Find game files ----

function ScanRowView({
  row,
  choice,
  onChoose
}: {
  row: RomScanRow
  choice: number | null
  onChoose: (mediaId: number | null) => void
}) {
  return (
    <tr className="border-t border-base-700 align-top">
      <td className="py-2 pr-3">
        <p className="break-all text-sm">{row.fileName}</p>
        <p className="break-all font-mono text-[11px] text-gray-500">{row.folder}</p>
      </td>
      <td className="py-2 pr-3 text-xs text-gray-300">
        {PLATFORMS[row.platform].short}
        {row.gameCode ? <span className="block font-mono text-gray-400">{row.gameCode}</span> : null}
      </td>
      <td className="py-2">
        {row.alreadyLinked ? (
          <span className="text-xs text-gray-400">Linked</span>
        ) : row.candidates.length === 0 ? (
          <span className="text-xs text-gray-400">No matching game in the library</span>
        ) : (
          <Field label={`Game for ${row.fileName}`} hiddenLabel>
            <select
              className="input w-full"
              value={choice ?? ''}
              onChange={(e) => onChoose(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Skip</option>
              {row.candidates.map((c) => (
                <option key={c.mediaId} value={c.mediaId}>
                  {c.title}
                </option>
              ))}
            </select>
          </Field>
        )}
      </td>
    </tr>
  )
}

function ScanPanel() {
  const qc = useQueryClient()
  const { data: scan } = useQuery({
    queryKey: qk.games.romScan,
    queryFn: () => api.games.romScanStatus(),
    refetchInterval: (q) => (q.state.data?.state === 'scanning' ? 700 : false)
  })
  const [choices, setChoices] = useState<Record<number, number | null>>({})
  const [busy, setBusy] = useState(false)

  const effective = useMemo(() => {
    const out = new Map<number, number>()
    for (const row of scan?.results ?? []) {
      const picked = row.id in choices ? choices[row.id] : row.suggestedMediaId
      if (picked != null && !row.alreadyLinked) out.set(row.id, picked)
    }
    return out
  }, [scan, choices])

  async function start(): Promise<void> {
    try {
      const started = await api.games.romScanStart()
      if (started) {
        setChoices({})
        await qc.invalidateQueries({ queryKey: qk.games.romScan })
      }
    } catch (e) {
      toastError(e)
    }
  }

  async function accept(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.games.romScanAccept([...effective].map(([resultId, mediaId]) => ({ resultId, mediaId })))
      toast(
        res.failed.length > 0
          ? `Linked ${res.linked} game files; ${res.failed.length} failed: ${res.failed[0]}`
          : `Linked ${res.linked} game files.`,
        res.failed.length > 0 ? 'warning' : 'success'
      )
      setChoices({})
      await qc.invalidateQueries({ queryKey: qk.games.all })
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const rows = scan?.results ?? []
  const matched = rows.filter((r) => r.candidates.length > 0 && !r.alreadyLinked)
  const unmatched = rows.filter((r) => r.candidates.length === 0 && !r.alreadyLinked)

  return (
    <Section
      title="Find game files"
      actions={
        scan?.state === 'scanning' ? (
          <button type="button" className="btn-ghost text-xs" onClick={() => void api.games.romScanCancel()}>
            Stop
          </button>
        ) : (
          <button type="button" className="btn text-xs" onClick={() => void start()}>
            Scan folders…
          </button>
        )
      }
    >
      <p className="text-xs text-gray-400">
        Pick the folders that hold your disc images and ROMs. NaviHUB reads each file&apos;s id and suggests
        the library game it belongs to; nothing is linked until you confirm.
      </p>
      {scan?.state === 'scanning' && (
        <p className="mt-3 text-sm text-gray-300" role="status">
          Scanning… {scan.found} game files in {scan.scanned} files.
        </p>
      )}
      {scan?.state === 'error' && (
        <p className="mt-3 text-sm text-signal-caution" role="alert">
          The scan failed: {scan.message}
        </p>
      )}
      {scan?.state === 'done' && (
        <div className="mt-4">
          {matched.length > 0 ? (
            <>
              <table className="w-full text-left">
                <caption className="sr-only">Game files with a matching library game</caption>
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    <th scope="col" className="pb-2">File</th>
                    <th scope="col" className="pb-2">Console</th>
                    <th scope="col" className="pb-2">Library game</th>
                  </tr>
                </thead>
                <tbody>
                  {matched.map((row) => (
                    <ScanRowView
                      key={row.id}
                      row={row}
                      choice={effective.get(row.id) ?? null}
                      onChoose={(mediaId) => setChoices((c) => ({ ...c, [row.id]: mediaId }))}
                    />
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn-primary mt-4"
                disabled={busy || effective.size === 0}
                onClick={() => void accept()}
              >
                Link {effective.size} game file{effective.size === 1 ? '' : 's'}
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-400">No new game files match games in your library.</p>
          )}
          {unmatched.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-200">
                {unmatched.length} files with no matching library game
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-gray-400">
                {unmatched.map((row) => (
                  <li key={row.id} className="break-all">
                    {row.fileName} <span className="text-gray-500">({PLATFORMS[row.platform].short})</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-gray-400">
                Add the game to your library first, or link the file from the game&apos;s Playtime tab.
              </p>
            </details>
          )}
        </div>
      )}
    </Section>
  )
}

// ---- stats ----

function RankTable({
  caption,
  rows
}: {
  caption: string
  rows: { key: string; label: string; seconds: number; sessions: number }[]
}) {
  const max = Math.max(1, ...rows.map((r) => r.seconds))
  return (
    <table className="w-full text-left text-sm">
      <caption className="mb-2 text-left text-xs text-gray-400">{caption}</caption>
      <tbody>
        {rows.map((r) => (
          <tr key={r.key} className="border-t border-base-700">
            <th scope="row" className="w-40 py-2 pr-3 font-normal">
              {r.label}
            </th>
            <td className="py-2 pr-3">
              <div aria-hidden="true" className="h-2 rounded bg-base-700">
                <div className="h-2 rounded bg-accent/70" style={{ width: `${Math.max(2, (r.seconds / max) * 100)}%` }} />
              </div>
            </td>
            <td className="w-28 py-2 text-right tabular-nums">{fmtDurationSec(r.seconds)}</td>
            <td className="w-24 py-2 text-right text-xs text-gray-400">
              {r.sessions} session{r.sessions === 1 ? '' : 's'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function StatsPanel() {
  const { data } = useQuery({ queryKey: qk.games.emulationStats, queryFn: () => api.games.emulationStats() })
  if (!data || data.byPlatform.length === 0) return null
  return (
    <Section title="Playtime" subtitle="Sessions launched through an emulator">
      <div className="grid gap-6 lg:grid-cols-2">
        <RankTable
          caption="By console"
          rows={data.byPlatform.map((r) => ({ key: r.platform, label: PLATFORMS[r.platform].label, seconds: r.seconds, sessions: r.sessions }))}
        />
        <RankTable
          caption="By emulator"
          rows={data.byEmulator.map((r) => ({ key: r.presetKey, label: EMULATOR_PRESETS[r.presetKey].name, seconds: r.seconds, sessions: r.sessions }))}
        />
      </div>
    </Section>
  )
}

// ---- native ports ----

function PortsPanel() {
  const { data: games } = useQuery({
    queryKey: qk.media.home('game'),
    queryFn: () => api.media.list({ mediaType: 'game' })
  })
  const matches = useMemo(() => {
    if (!games) return []
    const byKey = new Map(games.map((g) => [portTitleKey(g.title), g]))
    return NATIVE_PORTS.flatMap((port) =>
      port.titles
        .map((t) => byKey.get(portTitleKey(t)))
        .filter((g): g is NonNullable<typeof g> => g != null)
        .slice(0, 1)
        .map((game) => ({ port, game }))
    )
  }, [games])
  if (matches.length === 0) return null
  return (
    <Section title="Native PC ports" subtitle="Fan-made ports of games in your library">
      <ul className="grid gap-3 sm:grid-cols-2">
        {matches.map(({ port, game }) => (
          <li key={port.id} className="card p-4 text-sm">
            <p className="font-semibold">{port.name}</p>
            <p className="text-xs text-gray-400">
              Plays <Link className="underline hover:text-accent" to={`/games/${game.id}`}>{game.title}</Link>
            </p>
            <p className="mt-2 text-xs text-gray-300">{port.needs}</p>
            <button type="button" className="btn-ghost mt-2 text-xs" onClick={() => void api.app.openExternal(port.homepage)}>
              Project page
            </button>
          </li>
        ))}
      </ul>
    </Section>
  )
}
