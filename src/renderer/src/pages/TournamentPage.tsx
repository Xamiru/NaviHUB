import { useEffect, useState, type ReactNode } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useStatuses } from '../lib/hooks'
import { usePlayer } from '../lib/player'
import { ANIME, MEDIA_CONFIGS, statusesExceptPlanned } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import StatTile from '../components/StatTile'
import TournamentTree from '../components/TournamentTree'
import StudySessionFrame from '../components/StudySessionFrame'
import { Group, Pill } from '../components/PillGroup'
import {
  bracketProgress,
  championOf,
  createBracket,
  currentMatch,
  nextPowerOfTwo,
  pickWinner,
  placementsOf,
  roundLabel,
  runnerUpOf,
  shuffle,
  type Bracket
} from '@shared/bracket'
import type { MediaType, TournamentEntry, TournamentSource } from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
type SourceKind = TournamentSource['kind']
type MusicScope = 'all' | 'liked' | 'playlist' | 'artist' | 'album'

const SIZES = [8, 16, 32, 64] as const

// Frozen settings key holding the ONE autosaved, unfinished bracket. Finishing
// or discarding clears it; pools above SAVED_MAX_ENTRIES never autosave.
const SAVED_KEY = 'tournament.saved'
const SAVED_MAX_ENTRIES = 256

// Serialized resume slot: entries + engine state are plain JSON, and version
// lets an older save be ignored instead of half-restored.
interface SavedTournament {
  version: 1
  sourceLabel: string
  createdAt: string
  contenders: TournamentEntry[]
  bracket: Bracket
}

// A named selection from one of the second-level pickers.
interface Pick {
  id: number
  label: string
}

export default function TournamentPage() {
  const player = usePlayer()
  const qc = useQueryClient()
  const animeStatuses = useStatuses(ANIME)
  const watchedStatuses = statusesExceptPlanned(animeStatuses)

  // ---- setup options (persisted so they survive navigation) ----
  const [kind, setKind] = usePersistedState<SourceKind>('tourneyKind', 'music')
  const [musicScope, setMusicScope] = usePersistedState<MusicScope>('tourneyMusicScope', 'all')
  const [musicPick, setMusicPick] = usePersistedState<Pick | null>('tourneyMusicPick', null)
  const [themeType, setThemeType] = usePersistedState<'OP' | 'ED' | null>('tourneyThemeType', null)
  const [themeList, setThemeList] = usePersistedState<'watched' | 'all'>('tourneyThemeList', 'watched')
  const [charMedia, setCharMedia] = usePersistedState<Pick | null>('tourneyCharMedia', null)
  const [charScope, setCharScope] = usePersistedState<'all' | 'media'>('tourneyCharScope', 'all')
  const [mediaType, setMediaType] = usePersistedState<MediaType>('tourneyMediaType', 'anime')
  const [mediaStatus, setMediaStatus] = usePersistedState<string | null>('tourneyMediaStatus', null)
  const [peopleRole, setPeopleRole] = usePersistedState<'voice_actor' | null>('tourneyRole', 'voice_actor')
  const [listPick, setListPick] = usePersistedState<Pick | null>('tourneyList', null)
  const [size, setSize] = usePersistedState<number | null>('tourneySize', 16)
  const [search, setSearch] = usePersistedState('tourneySearch', '')
  const [treeOpen, setTreeOpen] = usePersistedState('tourneyTreeOpen', false)
  const debouncedSearch = useDebouncedValue(search.trim())

  // ---- game state ----
  const [phase, setPhase] = useState<Phase>('setup')
  const [pool, setPool] = useState<TournamentEntry[]>([])
  const [contenders, setContenders] = useState<TournamentEntry[]>([])
  const [bracket, setBracket] = useState<Bracket | null>(null)
  const [undoStack, setUndoStack] = useState<Bracket[]>([])
  const [logged, setLogged] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  // Resume support: describeSource() reads the setup pills, which a resumed
  // run outlives — so its label is frozen at deal/save time.
  const [sourceLabelOverride, setSourceLabelOverride] = useState<string | null>(null)
  const [savedCreatedAt, setSavedCreatedAt] = useState<string | null>(null)
  const [saved, setSaved] = useState<SavedTournament | null>(null)

  const mediaCfg = MEDIA_CONFIGS.find((c) => c.key === mediaType) ?? ANIME
  const mediaStatuses = useStatuses(mediaCfg)

  const { data: history } = useQuery({
    queryKey: qk.quiz.history('tournament'),
    queryFn: () => api.quiz.history('tournament')
  })

  // Auditioned tracks live in their own id namespace so music play-count
  // logging and theme-row highlighting never react to them; the guard keeps
  // an image-only tournament from stopping the user's background music.
  function stopIfOurs() {
    if (player.track?.id.startsWith('tourney-')) player.stop()
  }
  useEffect(() => {
    return () => stopIfOurs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function playEntry(entry: TournamentEntry) {
    const id = `tourney-${entry.key}`
    if (player.track?.id === id) {
      player.toggle()
      return
    }
    player.play({
      id,
      audioPath: entry.audioPath,
      audioUrl: entry.audioUrl,
      title: entry.name,
      subtitle: entry.subtitle,
      context: 'Tournament',
      coverPath: entry.imagePath
    })
  }

  function describeSource(): string {
    if (sourceLabelOverride) return sourceLabelOverride
    switch (kind) {
      case 'music': {
        const scope =
          musicScope === 'all' ? 'All tracks' : musicScope === 'liked' ? 'Liked' : musicPick?.label ?? ''
        return `Music · ${scope}`
      }
      case 'themes':
        return `Themes · ${themeType ?? 'OP+ED'} · ${themeList === 'watched' ? 'Watched' : 'All'}`
      case 'characters':
        return charScope === 'media' && charMedia ? `Characters · ${charMedia.label}` : 'Characters'
      case 'media':
        return `${mediaCfg.plural}${mediaStatus ? ` · ${mediaStatus}` : ''}`
      case 'people':
        return peopleRole === 'voice_actor' ? 'Voice actors' : 'People'
      case 'list':
        return `List · ${listPick?.label ?? ''}`
    }
  }

  function buildSource(): TournamentSource | string {
    switch (kind) {
      case 'music':
        if (musicScope === 'all' || musicScope === 'liked') return { kind, scope: musicScope }
        if (!musicPick) return `Pick a ${musicScope} first.`
        return { kind, scope: musicScope, id: musicPick.id }
      case 'themes':
        return {
          kind,
          filter: { songType: themeType, statuses: themeList === 'watched' ? watchedStatuses : null }
        }
      case 'characters':
        if (charScope === 'media') {
          if (!charMedia) return 'Pick a title first.'
          return { kind, mediaId: charMedia.id }
        }
        return { kind }
      case 'media':
        return { kind, mediaType, status: mediaStatus }
      case 'people':
        return { kind, role: peopleRole }
      case 'list':
        if (!listPick) return 'Pick a list first.'
        return { kind, listId: listPick.id }
    }
  }

  function dealBracket(fullPool: TournamentEntry[]) {
    const picked = shuffle(fullPool).slice(0, size ?? fullPool.length)
    setPool(fullPool)
    setContenders(picked)
    setBracket(createBracket(picked.length))
    setUndoStack([])
    setLogged(false)
    setSourceLabelOverride(null)
    setSavedCreatedAt(new Date().toISOString())
    setPhase('play')
  }

  function resumeSaved(s: SavedTournament) {
    // The full pool is not part of a save, so "Run it back" after resuming
    // re-deals the same contender set — close enough, and never empty.
    setPool(s.contenders)
    setContenders(s.contenders)
    setBracket(s.bracket)
    setUndoStack([])
    setLogged(false)
    setSourceLabelOverride(s.sourceLabel)
    setSavedCreatedAt(s.createdAt)
    setPhase('play')
  }

  function discardSaved() {
    setSaved(null)
    void api.settings.set(SAVED_KEY, '').catch(() => {})
  }

  async function startGame() {
    setError(null)
    const source = buildSource()
    if (typeof source === 'string') {
      setError(source)
      return
    }
    setLoading(true)
    try {
      const fullPool = await api.quiz.tournamentPool(source)
      if (fullPool.length < 2) {
        setError('Need at least 2 entries for a bracket — widen the source.')
        return
      }
      dealBracket(fullPool)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load the pool.')
    } finally {
      setLoading(false)
    }
  }

  // Load the autosaved bracket once on mount; only a genuinely unfinished one
  // (still has a current match) qualifies for resume.
  useEffect(() => {
    let cancelled = false
    api.settings
      .all()
      .then((m) => {
        if (cancelled) return
        const raw = m[SAVED_KEY]
        if (!raw) return
        try {
          const parsed = JSON.parse(raw) as SavedTournament
          if (
            parsed?.version === 1 &&
            Array.isArray(parsed.contenders) &&
            parsed.bracket?.matches?.length > 0 &&
            currentMatch(parsed.bracket) != null
          ) {
            setSaved(parsed)
          }
        } catch {
          /* a malformed slot is simply no resume offer */
        }
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  // Autosave after every pick while a run is live. Oversized pools skip the
  // save entirely (the settings row is not the place for megabytes of JSON).
  useEffect(() => {
    if (phase !== 'play' || !bracket || contenders.length === 0) return
    if (contenders.length > SAVED_MAX_ENTRIES) return
    const snapshot: SavedTournament = {
      version: 1,
      sourceLabel: sourceLabelOverride ?? describeSource(),
      createdAt: savedCreatedAt ?? new Date().toISOString(),
      contenders,
      bracket
    }
    void api.settings.set(SAVED_KEY, JSON.stringify(snapshot)).catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, bracket])

  function endGame(finished: Bracket) {
    stopIfOurs()
    setBracket(finished)
    // A finished run is no longer resumable.
    void api.settings.set(SAVED_KEY, '').catch(() => {})
    if (!logged) {
      setLogged(true)
      const champ = contenders[championOf(finished)!]
      const runner = contenders[runnerUpOf(finished)!]
      void api.quiz
        .logSession({
          kind: 'tournament',
          score: contenders.length,
          total: contenders.length,
          bestStreak: 0,
          settings: {
            sourceLabel: describeSource(),
            poolSize: contenders.length,
            champion: { key: champ.key, name: champ.name, imagePath: champ.imagePath },
            runnerUp: { key: runner.key, name: runner.name },
            standings: placementsOf(finished).map((p) => ({
              name: contenders[p.poolIndex].name,
              outInRound: p.outInRound
            }))
          }
        })
        .then(() => qc.invalidateQueries({ queryKey: qk.quiz.history('tournament') }))
        .catch(() => {})
    }
    setPhase('summary')
  }

  function pick(side: 'a' | 'b') {
    if (!bracket) return
    const cur = currentMatch(bracket)
    if (!cur) return
    stopIfOurs()
    const next = pickWinner(bracket, cur.matchIndex, side)
    setUndoStack((s) => [...s, bracket])
    if (currentMatch(next) === null) endGame(next)
    else setBracket(next)
  }

  function undo() {
    if (undoStack.length === 0) return
    stopIfOurs()
    setBracket(undoStack[undoStack.length - 1])
    setUndoStack((s) => s.slice(0, -1))
  }

  // Keyboard: 1/left picks the left card, 2/right the right, Backspace undoes,
  // Space toggles an auditioning track (input-guarded like the other quizzes).
  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault()
        pick('a')
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault()
        pick('b')
      } else if (e.key === 'Backspace') {
        e.preventDefault()
        undo()
      } else if (e.key === ' ' && player.track?.id.startsWith('tourney-')) {
        e.preventDefault()
        player.toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, bracket, undoStack, player.track?.id])

  // ---- setup phase ----
  if (phase === 'setup') {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <PageHeader
          back={{ to: "/quiz", label: "Quiz" }}
          title="Tournament"
          subtitle="Two entries face off, you pick the winner — last one standing takes the crown."
          className="mb-6"
        />

        {saved && (
          <div className="card mb-6 flex items-center gap-4 p-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Unfinished tournament</p>
              <p className="truncate text-sm text-gray-400">
                {saved.sourceLabel} · {saved.contenders.length} contenders ·{' '}
                {bracketProgress(saved.bracket).picksMade}/{bracketProgress(saved.bracket).totalPicks}{' '}
                picks made
              </p>
            </div>
            <button className="btn-primary shrink-0 px-4 py-2 text-sm" onClick={() => resumeSaved(saved)}>
              Resume
            </button>
            <button className="btn-ghost shrink-0 px-3 py-2 text-sm" onClick={discardSaved}>
              Discard
            </button>
          </div>
        )}

        <div className="card p-6 space-y-6">
          <Group label="Contenders">
            <Pill active={kind === 'music'} onClick={() => setKind('music')} label="Music" />
            <Pill active={kind === 'themes'} onClick={() => setKind('themes')} label="Anime themes" />
            <Pill active={kind === 'characters'} onClick={() => setKind('characters')} label="Characters" />
            <Pill active={kind === 'media'} onClick={() => setKind('media')} label="Media" />
            <Pill active={kind === 'people'} onClick={() => setKind('people')} label="People" />
            <Pill active={kind === 'list'} onClick={() => setKind('list')} label="Custom list" />
          </Group>

          {kind === 'music' && (
            <>
              <Group label="Scope">
                {(['all', 'liked', 'playlist', 'artist', 'album'] as MusicScope[]).map((s) => (
                  <Pill
                    key={s}
                    active={musicScope === s}
                    onClick={() => {
                      setMusicScope(s)
                      setMusicPick(null)
                      setSearch('')
                    }}
                    label={s === 'all' ? 'All tracks' : s[0].toUpperCase() + s.slice(1)}
                  />
                ))}
              </Group>
              {musicScope === 'playlist' && (
                <PlaylistPicker value={musicPick} onChange={setMusicPick} />
              )}
              {(musicScope === 'artist' || musicScope === 'album') && (
                <MusicSearchPicker
                  scope={musicScope}
                  value={musicPick}
                  onChange={setMusicPick}
                  search={search}
                  debouncedSearch={debouncedSearch}
                  setSearch={setSearch}
                />
              )}
            </>
          )}

          {kind === 'themes' && (
            <>
              <Group label="Song type">
                <Pill active={themeType === null} onClick={() => setThemeType(null)} label="Both" />
                <Pill active={themeType === 'OP'} onClick={() => setThemeType('OP')} label="Openings" />
                <Pill active={themeType === 'ED'} onClick={() => setThemeType('ED')} label="Endings" />
              </Group>
              <Group label="From">
                <Pill active={themeList === 'watched'} onClick={() => setThemeList('watched')} label="Watched" />
                <Pill active={themeList === 'all'} onClick={() => setThemeList('all')} label="All" />
              </Group>
            </>
          )}

          {kind === 'characters' && (
            <>
              <Group label="From">
                <Pill active={charScope === 'all'} onClick={() => setCharScope('all')} label="Everyone" />
                <Pill active={charScope === 'media'} onClick={() => setCharScope('media')} label="One title" />
              </Group>
              {charScope === 'media' && (
                <MediaSearchPicker
                  value={charMedia}
                  onChange={setCharMedia}
                  search={search}
                  debouncedSearch={debouncedSearch}
                  setSearch={setSearch}
                />
              )}
            </>
          )}

          {kind === 'media' && (
            <>
              <Group label="Type">
                {MEDIA_CONFIGS.map((c) => (
                  <Pill
                    key={c.key}
                    active={mediaType === c.key}
                    onClick={() => {
                      setMediaType(c.key)
                      setMediaStatus(null)
                    }}
                    label={c.plural}
                  />
                ))}
              </Group>
              <Group label="Status">
                <Pill active={mediaStatus === null} onClick={() => setMediaStatus(null)} label="Any" />
                {mediaStatuses.map((s) => (
                  <Pill key={s} active={mediaStatus === s} onClick={() => setMediaStatus(s)} label={s} />
                ))}
              </Group>
            </>
          )}

          {kind === 'people' && (
            <Group label="Who">
              <Pill
                active={peopleRole === 'voice_actor'}
                onClick={() => setPeopleRole('voice_actor')}
                label="Voice actors"
              />
              <Pill active={peopleRole === null} onClick={() => setPeopleRole(null)} label="Anyone" />
            </Group>
          )}

          {kind === 'list' && <ListPicker value={listPick} onChange={setListPick} />}

          <Group label="Bracket size">
            {SIZES.map((s) => (
              <Pill key={s} active={size === s} onClick={() => setSize(s)} label={String(s)} />
            ))}
            <Pill active={size === null} onClick={() => setSize(null)} label="Everyone" />
          </Group>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button className="btn-primary w-full py-3 text-base" disabled={loading} onClick={startGame}>
            {loading ? 'Loading contenders…' : 'Start tournament'}
          </button>
        </div>

        {history && history.totalSessions > 0 && (
          <div className="mt-8">
            <div className="label mb-3">Past tournaments</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <StatTile label="Tournaments run" value={history.totalSessions} />
            </div>
            <div className="mt-3 space-y-1.5">
              {history.recent.slice(0, 5).map((s) => {
                const champion = (s.settings?.champion as { name?: string } | undefined)?.name
                const label = s.settings?.sourceLabel
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 rounded-lg bg-base-800 px-3 py-2 text-sm"
                  >
                    <span className="min-w-0 flex-1 truncate font-medium">{champion ?? '—'}</span>
                    <span className="truncate text-gray-500">
                      {typeof label === 'string' ? label : ''}
                    </span>
                    <span className="shrink-0 text-gray-500">{s.total} entries</span>
                    {/* SQLite timestamps are UTC without a zone marker. */}
                    <span className="shrink-0 text-gray-500">
                      {new Date(s.playedAt.replace(' ', 'T') + 'Z').toLocaleDateString()}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )
  }

  // ---- summary phase ----
  if (phase === 'summary' && bracket) {
    const champ = contenders[championOf(bracket)!]
    const runner = contenders[runnerUpOf(bracket)!]
    const placements = placementsOf(bracket)
    const size = nextPowerOfTwo(contenders.length)
    return (
      <StudySessionFrame
        title="Tournament complete"
        subtitle={`${contenders.length} contenders · ${describeSource()}`}
        surface={false}
      >
        <div className="grid grid-cols-[14rem_1fr] items-start gap-6">
          <div className="card-glow p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500">Champion</p>
            <div className="mx-auto mt-4 w-full">
              <CoverImage
                path={champ.imagePath}
                alt={champ.name}
                className={`w-full ${champ.entryKind === 'music' ? 'aspect-square' : 'aspect-[2/3]'}`}
                fallback={champ.entryKind === 'music' ? 'music' : 'initial'}
              />
            </div>
            <p className="mt-4 text-2xl font-bold">{champ.name}</p>
            {champ.subtitle && <p className="mt-1 text-base text-gray-400">{champ.subtitle}</p>}
            <p className="mt-4 text-sm text-gray-500">
              Runner-up: <span className="text-gray-300">{runner.name}</span>
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {contenders.length} contenders · {describeSource()}
            </p>
            <div className="mt-5 flex gap-2">
              <button className="btn-primary flex-1" onClick={() => dealBracket(pool)}>
                Run it back
              </button>
              <button className="btn-ghost flex-1" onClick={() => setPhase('setup')}>
                New
              </button>
            </div>
          </div>

          <div className="card p-5">
            <p className="label mb-3">Standings</p>
            <ol className="space-y-1">
              {placements.flatMap((p, i) => {
                const entry = contenders[p.poolIndex]
                const label =
                  p.outInRound == null ? 'Champion' : roundLabel(size >> p.outInRound)
                const nodes: ReactNode[] = []
                // A divider heads only the big elimination groups (the rounds
                // that send 4+ home); smaller ones carry their row label.
                const firstOfGroup =
                  p.outInRound != null &&
                  (i === 0 || placements[i - 1].outInRound !== p.outInRound)
                if (
                  firstOfGroup &&
                  placements.filter((x) => x.outInRound === p.outInRound).length > 2
                ) {
                  nodes.push(
                    <li
                      key={`d-${p.poolIndex}`}
                      className="pb-0.5 pt-2 pl-3 pr-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500"
                    >
                      Out in the {label.toLowerCase()}
                    </li>
                  )
                }
                nodes.push(
                  <li
                    key={p.poolIndex}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
                      p.outInRound == null ? 'bg-accent/10' : 'bg-base-800'
                    }`}
                  >
                    <span
                      className={`w-8 shrink-0 text-right text-sm font-bold ${
                        p.outInRound == null ? 'text-accent' : i === 1 ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <CoverImage
                      path={entry.imagePath}
                      alt={entry.name}
                      rounded="rounded"
                      className="h-9 w-9 shrink-0"
                      fallback={entry.entryKind === 'music' ? 'music' : 'initial'}
                    />
                    <span
                      className={`min-w-0 flex-1 truncate ${
                        p.outInRound == null ? 'text-sm font-semibold text-accent' : i === 1 ? 'text-sm font-medium' : 'text-sm'
                      }`}
                    >
                      {entry.name}
                    </span>
                    <span className="shrink-0 text-xs text-gray-500">{label}</span>
                  </li>
                )
                return nodes
              })}
            </ol>
          </div>
        </div>
        <Link to="/quiz" className="mt-4 block text-center text-sm text-gray-500 hover:text-white">
          Back to quizzes
        </Link>
      </StudySessionFrame>
    )
  }

  // ---- play phase ----
  if (!bracket) return null
  const cur = currentMatch(bracket)
  if (!cur) return null
  const progress = bracketProgress(bracket)
  const left = contenders[cur.match.a!]
  const right = contenders[cur.match.b!]

  return (
    <StudySessionFrame
      title={roundLabel(progress.competitorsInRound)}
      subtitle={`Match ${progress.playedInRound} of ${progress.playableInRound}`}
      progress={{ current: progress.picksMade, total: progress.totalPicks, label: 'Bracket picks' }}
      surface={false}
      actions={
        <>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={() => setTreeOpen(!treeOpen)}>
            {treeOpen ? 'Hide bracket' : 'Show bracket'}
          </button>
          <button
            className="btn-ghost py-1 px-2 text-sm"
            disabled={undoStack.length === 0}
            onClick={undo}
          >
            Undo
          </button>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={() => setPhase('setup')}>
            End tournament
          </button>
        </>
      }
    >

      <div className="grid grid-cols-2 gap-4">
        {([left, right] as const).map((entry, i) => (
          <ContenderCard
            key={entry.key}
            entry={entry}
            keyHint={i === 0 ? '1' : '2'}
            playing={player.track?.id === `tourney-${entry.key}` && player.isPlaying}
            loaded={player.track?.id === `tourney-${entry.key}`}
            onPick={() => pick(i === 0 ? 'a' : 'b')}
            onPlay={() => playEntry(entry)}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-sm text-gray-500">
        Click a card (or press 1 / 2, ← / →) to send it through. Backspace undoes the last pick; Space plays or pauses.
      </p>

      {treeOpen && (
        <div className="card mt-6 p-5">
          <p className="label mb-4">Bracket</p>
          <TournamentTree bracket={bracket} contenders={contenders} />
        </div>
      )}
    </StudySessionFrame>
  )
}

function ContenderCard({
  entry,
  keyHint,
  playing,
  loaded,
  onPick,
  onPlay
}: {
  entry: TournamentEntry
  keyHint: string
  playing: boolean
  loaded: boolean
  onPick: () => void
  onPlay: () => void
}) {
  const hasAudio = entry.audioPath != null || entry.audioUrl != null
  const square = entry.entryKind === 'music'
  return (
    <button
      onClick={onPick}
      className="card group flex flex-col items-center p-5 text-center transition-colors hover:border-accent"
    >
      <CoverImage
        path={entry.imagePath}
        alt={entry.name}
        className={`w-full max-w-[16rem] ${square ? 'aspect-square' : 'aspect-[2/3]'}`}
        fallback={square ? 'music' : 'initial'}
      />
      <p className="mt-4 line-clamp-2 text-xl font-semibold group-hover:text-accent">{entry.name}</p>
      {entry.subtitle && (
        <p className="mt-1 line-clamp-1 text-sm text-gray-400">{entry.subtitle}</p>
      )}
      <div className="mt-3 flex items-center gap-3">
        {hasAudio && (
          <span
            role="button"
            tabIndex={0}
            aria-label={playing ? `Pause ${entry.name}` : `Play ${entry.name}`}
            className="btn-ghost px-4 py-1.5 text-sm"
            onClick={(e) => {
              e.stopPropagation()
              onPlay()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation()
                onPlay()
              }
            }}
          >
            {playing ? 'Pause' : loaded ? 'Resume' : 'Play'}
          </span>
        )}
        <kbd className="kbd">{keyHint}</kbd>
      </div>
    </button>
  )
}

// ---- setup sub-pickers ----

function PickerRows({
  rows,
  value,
  onChange,
  empty
}: {
  rows: Pick[]
  value: Pick | null
  onChange: (p: Pick) => void
  empty: string
}) {
  if (rows.length === 0) return <p className="text-sm text-gray-500">{empty}</p>
  return (
    <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
      {rows.map((r) => (
        <button
          key={r.id}
          onClick={() => onChange(r)}
          className={`block w-full truncate rounded-lg px-3 py-2 text-left text-sm transition-colors ${
            value?.id === r.id ? 'bg-accent/10 text-accent' : 'bg-base-800 hover:bg-base-700'
          }`}
        >
          {r.label}
        </button>
      ))}
    </div>
  )
}

function PlaylistPicker({ value, onChange }: { value: Pick | null; onChange: (p: Pick) => void }) {
  const { data: playlists = [] } = useQuery({
    queryKey: qk.music.playlists,
    queryFn: () => api.music.playlists()
  })
  return (
    <Group label="Playlist">
      <div className="w-full">
        <PickerRows
          rows={playlists.map((p) => ({ id: p.id, label: `${p.title} (${p.trackCount})` }))}
          value={value}
          onChange={onChange}
          empty="No playlists yet — create one in the Music section."
        />
      </div>
    </Group>
  )
}

function MusicSearchPicker({
  scope,
  value,
  onChange,
  search,
  debouncedSearch,
  setSearch
}: {
  scope: 'artist' | 'album'
  value: Pick | null
  onChange: (p: Pick) => void
  search: string
  debouncedSearch: string
  setSearch: (s: string) => void
}) {
  const { data: artists = [] } = useQuery({
    queryKey: qk.music.artists(debouncedSearch),
    queryFn: () => api.music.artists(debouncedSearch),
    enabled: scope === 'artist'
  })
  const { data: albums = [] } = useQuery({
    queryKey: qk.music.albums(debouncedSearch),
    queryFn: () => api.music.albums(debouncedSearch),
    enabled: scope === 'album'
  })
  const rows: Pick[] =
    scope === 'artist'
      ? artists.slice(0, 25).map((a) => ({ id: a.id, label: `${a.name} (${a.trackCount})` }))
      : albums.slice(0, 25).map((a) => ({ id: a.id, label: `${a.artistName} — ${a.title}` }))
  return (
    <Group label={scope === 'artist' ? 'Artist' : 'Album'}>
      <div className="w-full space-y-2">
        {value && (
          <p className="text-sm">
            Selected: <span className="font-medium text-accent">{value.label}</span>
          </p>
        )}
        <input
          className="input w-full"
          placeholder={`Search ${scope}s…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <PickerRows rows={rows} value={value} onChange={onChange} empty="Nothing matches." />
      </div>
    </Group>
  )
}

function MediaSearchPicker({
  value,
  onChange,
  search,
  debouncedSearch,
  setSearch
}: {
  value: Pick | null
  onChange: (p: Pick) => void
  search: string
  debouncedSearch: string
  setSearch: (s: string) => void
}) {
  const { data: results } = useQuery({
    queryKey: qk.search(debouncedSearch),
    queryFn: () => api.search.global(debouncedSearch),
    enabled: debouncedSearch.length > 0
  })
  const rows: Pick[] = (results?.media ?? [])
    .slice(0, 25)
    .map((m) => ({ id: m.id, label: m.title }))
  return (
    <Group label="Title">
      <div className="w-full space-y-2">
        {value && (
          <p className="text-sm">
            Selected: <span className="font-medium text-accent">{value.label}</span>
          </p>
        )}
        <input
          className="input w-full"
          placeholder="Search your library…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {debouncedSearch.length > 0 && (
          <PickerRows rows={rows} value={value} onChange={onChange} empty="Nothing matches." />
        )}
      </div>
    </Group>
  )
}

function ListPicker({ value, onChange }: { value: Pick | null; onChange: (p: Pick) => void }) {
  const { data: lists = [] } = useQuery({
    queryKey: qk.lists.index(null),
    queryFn: () => api.lists.list(null)
  })
  return (
    <Group label="List">
      <div className="w-full">
        <PickerRows
          rows={lists.map((l) => ({ id: l.id, label: `${l.title} (${l.itemCount})` }))}
          value={value}
          onChange={onChange}
          empty="No lists yet — create one in the Lists section."
        />
      </div>
    </Group>
  )
}
