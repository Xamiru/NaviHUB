import { useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { consoleArt } from '../lib/consoleArt'
import { summarizeConsole } from '../lib/emulationHub'
import { useLeaveDeleted, usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { fmtDurationSec } from '../lib/useGameSession'
import { toastError } from '../lib/toast'
import PageHeader from '../components/PageHeader'
import ParentBackLink from '../components/ParentBackLink'
import Section from '../components/Section'
import Tabs, { TabPanel } from '../components/Tabs'
import { Field } from '../components/Field'
import { ConsoleCoverWall } from '../components/emulation/ConsoleTile'
import EmulatorChip from '../components/emulation/EmulatorChip'
import EmulatorSettingsCard from '../components/emulation/EmulatorSettingsCard'
import ScanPanel, { useRomScan } from '../components/emulation/ScanPanel'
import { useAddEmulator } from '../components/emulation/AddConsoleDialog'
import { ArtworkCard, fmtLastPlayed, useGameLauncher } from '../components/games/LaunchCards'
import { isPlatformKey, PLATFORMS, type PlatformKey } from '@shared/emulation/platforms'

type ConsoleTab = 'games' | 'setup'
type SortMode = 'recent' | 'title' | 'time'

const HUB = '/games/emulators'

// One console: a banner with its hardware and the user's covers, its games with
// Play, and a Setup tab holding the emulators' settings and the default.
export default function EmulatorConsolePage() {
  const { platform } = useParams()
  if (!isPlatformKey(platform)) {
    return (
      <div className="p-6">
        <PageHeader title="Not found" back={{ to: HUB, label: 'Emulators' }} />
        <p className="text-sm text-gray-400">NaviHUB does not know this console.</p>
      </div>
    )
  }
  return <ConsoleView key={platform} platform={platform} />
}

function ConsoleView({ platform }: { platform: PlatformKey }) {
  const qc = useQueryClient()
  const { pathname } = useLocation()
  const leave = useLeaveDeleted()
  const info = PLATFORMS[platform]
  const [tab, setTab] = usePersistedState<ConsoleTab>('emuConsole.tab', 'games')
  const [search, setSearch] = usePersistedState('emuConsole.search', '')
  const [sort, setSort] = usePersistedState<SortMode>('emuConsole.sort', 'recent')
  const debouncedSearch = useDebouncedValue(search)
  const emulatorsQuery = useQuery({ queryKey: qk.games.emulators, queryFn: () => api.emulators.list() })
  const installedQuery = useQuery({ queryKey: qk.games.installed, queryFn: () => api.games.installed() })
  const { data: stats } = useQuery({ queryKey: qk.games.emulationStats, queryFn: () => api.games.emulationStats() })
  const { runningHere, playProps } = useGameLauncher()
  const { start: startScan } = useRomScan(platform)
  const { add, adding } = useAddEmulator({ open: false })

  const summary = useMemo(
    () =>
      emulatorsQuery.data && installedQuery.data
        ? summarizeConsole(platform, emulatorsQuery.data, installedQuery.data, stats)
        : null,
    [platform, emulatorsQuery.data, installedQuery.data, stats]
  )
  const visible = useMemo(() => {
    const games = summary?.games ?? []
    const needle = debouncedSearch.trim().toLocaleLowerCase()
    const matched = games.filter((g) => g.title.toLocaleLowerCase().includes(needle))
    if (sort === 'title') matched.sort((a, b) => a.title.localeCompare(b.title))
    if (sort === 'time') matched.sort((a, b) => b.totalSeconds - a.totalSeconds || a.title.localeCompare(b.title))
    return matched
  }, [summary, debouncedSearch, sort])

  const back = { to: HUB, label: 'Emulators' }

  if (emulatorsQuery.isError || installedQuery.isError) {
    return (
      <div className="p-6">
        <PageHeader title={info.label} back={back} />
        <div role="alert" className="text-sm text-gray-400">
          Could not load this console.
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

  if (!summary) {
    return (
      <div className="p-6">
        <PageHeader title={info.label} back={back} />
        <p className="text-sm text-gray-500" role="status">
          Loading…
        </p>
      </div>
    )
  }

  const refresh = async (): Promise<void> => {
    await qc.invalidateQueries({ queryKey: qk.games.all })
  }

  async function setDefault(value: string): Promise<void> {
    try {
      await api.emulators.setDefault(platform, value ? Number(value) : null)
      await refresh()
    } catch (e) {
      toastError(e)
    }
  }

  // The console has nothing left to show once its last emulator is removed and
  // no game is linked for it: go back to the hub instead of an empty page.
  function onRemoved(id: number): void {
    const remaining = summary!.emulators.filter((e) => e.id !== id)
    if (remaining.length === 0 && summary!.games.length === 0) leave((p) => p === pathname, HUB)
  }

  async function findFiles(): Promise<void> {
    setTab('games')
    await startScan()
  }

  const latest = summary.games.find((g) => g.lastPlayedAt) ?? summary.games[0]
  const banner = consoleArt(platform, 'banner')

  return (
    <div className="mx-auto max-w-[1400px] p-4 sm:p-6">
      <section
        aria-label={`${info.label} overview`}
        className="relative mb-6 overflow-hidden rounded-lg border border-line-subtle bg-surface-panel"
      >
        <ConsoleCoverWall games={summary.games} slots={12} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-panel via-surface-panel/90 to-surface-panel/30" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-full w-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative z-10 grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="min-w-0">
            <ParentBackLink to={HUB} label="Emulators" className="text-sm text-ink-muted hover:text-ink-secondary" />
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">{info.short}</p>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight text-ink">{info.label}</h1>
            {summary.emulators.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {summary.emulators.map((e) => (
                  <EmulatorChip key={e.id} emulator={e} isDefault={e === summary.defaultEmulator} />
                ))}
              </div>
            )}
            <dl className="mt-5 grid max-w-lg grid-cols-3 gap-4 border-y border-line-subtle py-4">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">Games</dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums text-ink">{summary.games.length}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">Playtime</dt>
                <dd className="mt-1 text-lg font-semibold tabular-nums text-ink">
                  {summary.seconds > 0 ? fmtDurationSec(summary.seconds) : 'None yet'}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.15em] text-ink-muted">Last played</dt>
                <dd className="mt-1 text-lg font-semibold text-ink">
                  {summary.lastPlayedAt ? fmtLastPlayed(summary.lastPlayedAt) : 'Never'}
                </dd>
              </div>
            </dl>
            {summary.problem && (
              <p className="mt-3 text-sm text-signal-caution" role="status">
                {summary.problem}.{' '}
                <button type="button" className="underline" onClick={() => setTab('setup')}>
                  Open Setup
                </button>
              </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {latest && !summary.problem && (
                <button
                  type="button"
                  className="btn-primary"
                  disabled={playProps.running || playProps.launchingId !== null}
                  onClick={() => void playProps.onPlay(latest)}
                >
                  {runningHere(latest)
                    ? 'Playing now'
                    : playProps.launchingId === latest.mediaId
                      ? 'Launching…'
                      : `${latest.lastPlayedAt ? 'Continue' : 'Play'} ${latest.title}`}
                </button>
              )}
              <button type="button" className="btn" onClick={() => void findFiles()}>
                Find game files
              </button>
            </div>
          </div>
          {banner && (
            <img
              src={banner}
              alt=""
              className="mx-auto max-h-[300px] w-auto max-w-full object-contain drop-shadow-2xl"
            />
          )}
        </div>
      </section>

      <Tabs
        id="emu-console"
        label={`${info.label} sections`}
        tabs={[
          { key: 'games', label: 'Games', count: summary.games.length },
          { key: 'setup', label: 'Setup' }
        ]}
        value={tab}
        onChange={setTab}
        className="mb-5"
      />

      <TabPanel tabsId="emu-console" value={tab}>
        {tab === 'games' && (
          <>
            {summary.games.length > 0 ? (
              <Section title={`${info.short} games`} subtitle={`${visible.length} ${visible.length === 1 ? 'title' : 'titles'}`} className="mb-8">
                {summary.games.length > 6 && (
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <Field label={`Search ${info.short} games`} hiddenLabel className="contents">
                      <input
                        type="search"
                        className="input max-w-md min-w-48 flex-1"
                        placeholder={`Search ${info.short} games...`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </Field>
                    <Field label={`Sort ${info.short} games`} hiddenLabel className="contents">
                      <select className="input w-48" value={sort} onChange={(e) => setSort(e.target.value as SortMode)}>
                        <option value="recent">Recently played</option>
                        <option value="title">Title</option>
                        <option value="time">Most played</option>
                      </select>
                    </Field>
                  </div>
                )}
                {visible.length > 0 ? (
                  <ul className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4 sm:gap-5">
                    {visible.map((game) => (
                      <ArtworkCard key={game.mediaId} game={game} runningHere={runningHere(game)} {...playProps} />
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-400">No {info.short} games match that search.</p>
                )}
              </Section>
            ) : (
              <p className="mb-6 max-w-2xl text-sm text-ink-secondary">
                No {info.label} games are linked yet. Find game files scans your folders and suggests the library game
                each file belongs to, or open a game and link its file from the Playtime tab.
              </p>
            )}
            <ScanPanel platform={platform} />
          </>
        )}
        {tab === 'setup' && (
          <>
            {summary.emulators.length > 0 && (
              <Field
                label={`Default emulator for ${info.label}`}
                description="Used when a game file names no emulator of its own"
                className="mb-6 max-w-md"
              >
                <select
                  className="input w-full"
                  value={summary.defaultEmulator?.id ?? ''}
                  onChange={(e) => void setDefault(e.target.value)}
                >
                  <option value="">None</option>
                  {summary.emulators.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </Field>
            )}
            <Section title={`Emulators for ${info.short}`}>
            {summary.emulators.length > 0 ? (
              <ul className="space-y-4">
                {summary.emulators.map((e) => (
                  <EmulatorSettingsCard
                    key={e.id}
                    emulator={e}
                    console={platform}
                    onChanged={refresh}
                    onRemoved={() => onRemoved(e.id)}
                  />
                ))}
              </ul>
            ) : (
              <p className="text-sm text-ink-secondary">No emulator plays the {info.short} yet.</p>
            )}
            <button type="button" className="btn mt-5" disabled={adding} onClick={() => void add(platform)}>
              {summary.emulators.length > 0 ? `Add another emulator for ${info.short}` : `Add an emulator for ${info.short}`}
            </button>
            </Section>
          </>
        )}
      </TabPanel>
    </div>
  )
}
