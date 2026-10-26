import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { consoleArt } from '../lib/consoleArt'
import { hubConsoles } from '../lib/emulationHub'
import { fmtDurationSec } from '../lib/useGameSession'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import ConsoleTile from '../components/emulation/ConsoleTile'
import AddConsoleDialog, { useAddEmulator } from '../components/emulation/AddConsoleDialog'
import EmulatorSettingsCard from '../components/emulation/EmulatorSettingsCard'
import { FeaturedGame, fmtLastPlayed, useGameLauncher } from '../components/games/LaunchCards'
import { PLATFORM_KEYS, PLATFORMS, type PlatformKey } from '@shared/emulation/platforms'

// Games → Emulators: a hub of the consoles this machine can play. Each tile
// opens that console's page (its games, and its emulators' setup); consoles
// with no emulator yet sit in a strip below. Every path is picked in main; this
// page only ever sends ids and console keys.
export default function EmulatorsPage() {
  const qc = useQueryClient()
  const emulatorsQuery = useQuery({ queryKey: qk.games.emulators, queryFn: () => api.emulators.list() })
  const installedQuery = useQuery({ queryKey: qk.games.installed, queryFn: () => api.games.installed() })
  const { data: stats } = useQuery({ queryKey: qk.games.emulationStats, queryFn: () => api.games.emulationStats() })
  const { session, runningHere, playProps } = useGameLauncher()
  const { add, adding } = useAddEmulator()
  const [setupFor, setSetupFor] = useState<PlatformKey | null>(null)

  const emulators = emulatorsQuery.data
  const installed = installedQuery.data
  const emulated = (installed ?? []).filter((g) => g.platform != null)
  const active = emulated.find((g) => runningHere(g))
  // games.installed is ordered by most recent session, so the first is the one to continue.
  const featured = active ?? emulated[0]
  const { data: featuredDetail } = useQuery({
    queryKey: qk.media.detail(featured?.mediaId ?? 0),
    queryFn: () => api.media.get(featured!.mediaId),
    enabled: featured !== undefined
  })

  const header = (
    <PageHeader
      title="Emulators"
      eyebrow={<span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Game archive / launcher</span>}
      subtitle="Your consoles, the emulators that play them, and your games for each."
      actions={
        <>
          <Link className="btn-ghost" to="/games/emulators/tools">
            Tools
          </Link>
          {emulators && emulators.length > 0 && (
            <button type="button" className="btn" disabled={adding} onClick={() => void add()}>
              Add emulator
            </button>
          )}
        </>
      }
    />
  )

  if (emulatorsQuery.isError || installedQuery.isError) {
    return (
      <div className="p-6">
        {header}
        <div role="alert" className="text-sm text-gray-400">
          Could not load emulators.
          <button
            type="button"
            className="btn ml-3"
            onClick={() => {
              void emulatorsQuery.refetch()
              void installedQuery.refetch()
            }}
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  if (!emulators || !installed) {
    return (
      <div className="p-6">
        {header}
        <p className="text-sm text-gray-500" role="status">
          Loading emulators…
        </p>
      </div>
    )
  }

  const consoles = hubConsoles(emulators, installed, stats)
  const shown = new Set(consoles.map((c) => c.platform))
  const others = PLATFORM_KEYS.filter((p) => !shown.has(p))
  const unassigned = emulators.filter((e) => e.platforms.length === 0)
  const refresh = async (): Promise<void> => {
    await qc.invalidateQueries({ queryKey: qk.games.all })
  }

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      {header}

      {consoles.length === 0 && unassigned.length === 0 && (
        <EmptyState
          title="No emulators yet"
          body={
            <>
              Pick a console below to see which emulators play it, or add the program file of one you already have,
              such as PCSX2, DuckStation or Dolphin. NaviHUB recognises common emulators and fills in how to launch
              them.
            </>
          }
          action={
            <button type="button" className="btn-primary" disabled={adding} onClick={() => void add()}>
              Add emulator
            </button>
          }
        />
      )}

      {featured && (
        <Section
          title={active ? 'Playing now' : featured.lastPlayedAt ? 'Continue playing' : 'Ready to play'}
          subtitle={
            active
              ? fmtDurationSec(session.status?.elapsedSec ?? 0)
              : featured.lastPlayedAt
                ? `Last played ${fmtLastPlayed(featured.lastPlayedAt)}`
                : undefined
          }
          className="mb-8"
        >
          <FeaturedGame
            game={featured}
            backgroundPath={featuredDetail?.backgroundPath ?? null}
            runningHere={runningHere(featured)}
            {...playProps}
          />
        </Section>
      )}

      {consoles.length > 0 && (
        <Section
          title="Your consoles"
          subtitle={`${consoles.length} ${consoles.length === 1 ? 'console' : 'consoles'}`}
          className="mb-8"
        >
          <ul className={`grid gap-5 ${consoles.length === 1 ? 'grid-cols-1' : 'md:grid-cols-2 2xl:grid-cols-3'}`}>
            {consoles.map((c) => (
              <ConsoleTile key={c.platform} summary={c} wide={consoles.length === 1} />
            ))}
          </ul>
        </Section>
      )}

      {unassigned.length > 0 && (
        <Section title="Emulators without a console" subtitle="Tick the consoles each one plays" className="mb-8">
          <ul className="space-y-4">
            {unassigned.map((e) => (
              <EmulatorSettingsCard key={e.id} emulator={e} onChanged={refresh} />
            ))}
          </ul>
        </Section>
      )}

      {others.length > 0 && (
        <Section
          title={consoles.length > 0 ? 'Add a console' : 'Consoles'}
          subtitle="Pick one to see which emulators play it"
          className="pb-10"
        >
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-3">
            {others.map((p) => {
              const art = consoleArt(p, 'tile')
              return (
                <li key={p}>
                  <button
                    type="button"
                    className="group flex h-full w-full flex-col items-center gap-2 rounded-lg border border-line-subtle bg-surface-panel px-2 py-3 text-center transition-colors hover:border-accent/60"
                    title={PLATFORMS[p].label}
                    aria-label={`${PLATFORMS[p].short}: set up ${PLATFORMS[p].label}`}
                    onClick={() => setSetupFor(p)}
                  >
                    {art && (
                      <img
                        src={art}
                        alt=""
                        className="h-12 w-full object-contain opacity-80 motion-safe:transition-transform group-hover:opacity-100 motion-safe:group-hover:scale-105"
                      />
                    )}
                    <span className="text-xs font-medium text-ink-secondary">{PLATFORMS[p].short}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Section>
      )}

      {setupFor && <AddConsoleDialog platform={setupFor} onClose={() => setSetupFor(null)} />}
    </div>
  )
}
