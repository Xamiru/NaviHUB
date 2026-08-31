import { useEffect, useRef, useState, type ReactNode } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useAllCompletedStatuses, useDebouncedValue, useStatuses } from '../lib/hooks'
import { usePlayerControls } from '../lib/player'
import { ANIME, MEDIA_CONFIGS } from '../lib/mediaConfig'
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
  placementRank,
  roundLabel,
  runnerUpOf,
  shuffle,
  type Bracket
} from '@shared/bracket'
import type { MediaType, TournamentEntry, TournamentSource } from '@shared/types'
import type { TournamentFormat, TournamentQualifier, TournamentTiebreak } from '@shared/types'
import {
  createTournamentGroups,
  currentGroupMatch,
  groupPlacements,
  groupQualification,
  pickGroupWinner,
  seedGroupKnockout,
  type TournamentGroupsState
} from '@shared/tournamentGroups'
import { quizSeed, seededRng } from '@shared/quizCore'
import { confirmDialog } from '../lib/confirm'
import {
  parseSavedTournament,
  type SavedTournament,
  type TournamentSnapshot,
  type TournamentStage
} from '@shared/tournamentSave'

type Phase = 'setup' | 'play' | 'summary'
type SourceKind = TournamentSource['kind']
type MusicScope = 'all' | 'liked' | 'playlist' | 'artist' | 'album'

const GROUP_SIZES = [8, 16, 32, 64] as const
const KNOCKOUT_SIZES = [8, 16, 32, 64, 128, 256] as const

// Frozen settings key holding the ONE autosaved, unfinished bracket. Finishing
// or discarding clears it; pools above SAVED_MAX_ENTRIES never autosave.
const SAVED_KEY = 'tournament.saved'
const SAVED_MAX_ENTRIES = 256

// A named selection from one of the second-level pickers.
interface Pick {
  id: number
  label: string
}

export default function TournamentPage() {
  const player = usePlayerControls()
  const qc = useQueryClient()
  const animeStatuses = useStatuses(ANIME)
  const completedStatuses = useAllCompletedStatuses()
  const animeCompleted = [animeStatuses[1]].filter(Boolean)

  // ---- setup options (persisted so they survive navigation) ----
  const [kind, setKind] = usePersistedState<SourceKind>('tourneyKind', 'music')
  const [musicScope, setMusicScope] = usePersistedState<MusicScope>('tourneyMusicScope', 'all')
  const [musicPick, setMusicPick] = usePersistedState<Pick | null>('tourneyMusicPick', null)
  const [themeType, setThemeType] = usePersistedState<'OP' | 'ED' | null>('tourneyThemeType', null)
  const [themeList, setThemeList] = usePersistedState<'watched' | 'all'>('tourneyThemeList', 'watched')
  const [charMedia, setCharMedia] = usePersistedState<Pick | null>('tourneyCharMedia', null)
  const [charScope, setCharScope] = usePersistedState<'all' | 'unseen' | 'media'>('tourneyCharScope', 'all')
  const [mediaType, setMediaType] = usePersistedState<MediaType>('tourneyMediaType', 'anime')
  const [mediaStatus, setMediaStatus] = usePersistedState<string | null>('tourneyMediaStatus', null)
  const [peopleRole, setPeopleRole] = usePersistedState<'voice_actor' | null>('tourneyRole', 'voice_actor')
  const [listPick, setListPick] = usePersistedState<Pick | null>('tourneyList', null)
  const [size, setSize] = usePersistedState<number | null>('tourneySize', 16)
  const [search, setSearch] = usePersistedState('tourneySearch', '')
  const [treeOpen, setTreeOpen] = usePersistedState('tourneyTreeOpen', false)
  const [groupsOpen, setGroupsOpen] = usePersistedState('tourneyGroupsOpen', false)
  const [format, setFormat] = usePersistedState<TournamentFormat>('tourneyFormat', 'knockout')
  const debouncedSearch = useDebouncedValue(search.trim())

  // ---- game state ----
  const [phase, setPhase] = useState<Phase>('setup')
  const [pool, setPool] = useState<TournamentEntry[]>([])
  const [contenders, setContenders] = useState<TournamentEntry[]>([])
  const [bracket, setBracket] = useState<Bracket | null>(null)
  const [stage, setStage] = useState<TournamentStage>('knockout')
  const [groups, setGroups] = useState<TournamentGroupsState | null>(null)
  const [groupField, setGroupField] = useState<TournamentEntry[] | null>(null)
  const [qualified, setQualified] = useState<TournamentQualifier[]>([])
  const [tiebreakQueue, setTiebreakQueue] = useState<TournamentTiebreak[]>([])
  const [activeTiebreak, setActiveTiebreak] = useState<{ spec: TournamentTiebreak; bracket: Bracket } | null>(null)
  const [undoStack, setUndoStack] = useState<TournamentSnapshot[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const [interactionLocked, setInteractionLocked] = useState(false)
  const [pendingFinalPick, setPendingFinalPick] = useState<'a' | 'b' | null>(null)
  // Resume support: describeSource() reads the setup pills, which a resumed
  // run outlives — so its label is frozen at deal/save time.
  const [sourceLabelOverride, setSourceLabelOverride] = useState<string | null>(null)
  const [savedCreatedAt, setSavedCreatedAt] = useState<string | null>(null)
  const [saved, setSaved] = useState<SavedTournament | null>(null)
  const [tournamentSeed, setTournamentSeed] = useState(0)
  const [tournamentSize, setTournamentSize] = useState(0)
  const interactionLock = useRef(false)
  const loggedRef = useRef(false)

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
        return `Themes · ${themeType ?? 'OP+ED'} · ${themeList === 'watched' ? 'Completed' : 'All'}`
      case 'characters':
        return charScope === 'media' && charMedia ? `Characters · ${charMedia.label}` : 'Characters'
      case 'media':
        return `${mediaCfg.plural} · ${mediaStatus === '__all__' ? 'All' : mediaStatus ?? mediaStatuses[1] ?? 'Completed'}`
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
          filter: { songType: themeType, statuses: themeList === 'watched' ? animeCompleted : null }
        }
      case 'characters':
        if (charScope === 'media') {
          if (!charMedia) return 'Pick a title first.'
          return { kind, mediaId: charMedia.id }
        }
        return charScope === 'unseen' ? { kind } : { kind, statuses: completedStatuses }
      case 'media':
        return { kind, mediaType, status: mediaStatus === '__all__' ? null : mediaStatus ?? mediaStatuses[1] ?? null }
      case 'people':
        return { kind, role: peopleRole }
      case 'list':
        if (!listPick) return 'Pick a list first.'
        return { kind, listId: listPick.id }
    }
  }

  function dealBracket(fullPool: TournamentEntry[], dealSize = size ?? fullPool.length, preserveLabel = false) {
    const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
    const picked = shuffle(fullPool, seededRng(nextSeed)).slice(0, dealSize)
    setPool(fullPool)
    setContenders(picked)
    setTournamentSize(picked.length)
    if (format === 'groups') {
      setStage('groups')
      setGroups(createTournamentGroups(picked.length))
      setGroupField(picked)
      setBracket(null)
    } else {
      setStage('knockout')
      setGroups(null)
      setGroupField(null)
      setBracket(createBracket(picked.length))
    }
    setQualified([])
    setTiebreakQueue([])
    setActiveTiebreak(null)
    setUndoStack([])
    loggedRef.current = false
    setSaveState('idle')
    setPendingFinalPick(null)
    if (!preserveLabel) setSourceLabelOverride(null)
    setTournamentSeed(nextSeed)
    setSavedCreatedAt(new Date().toISOString())
    setPhase('play')
  }

  function resumeSaved(s: SavedTournament) {
    // The full pool is not part of a save, so "Run it back" after resuming
    // re-deals the same contender set — close enough, and never empty.
    setPool(s.groupField ?? s.contenders)
    setContenders(s.contenders)
    setBracket(s.bracket)
    setFormat(s.format)
    setStage(s.stage)
    setGroups(s.groups)
    setGroupField(s.groupField)
    setQualified(s.qualified)
    setTiebreakQueue(s.tiebreakQueue)
    setActiveTiebreak(s.activeTiebreak)
    setTournamentSeed(s.seed)
    setTournamentSize(s.size)
    setUndoStack(s.undoStack)
    loggedRef.current = false
    setSaveState('idle')
    setSourceLabelOverride(s.sourceLabel)
    setSavedCreatedAt(s.createdAt)
    setPhase('play')
  }

  async function discardSaved() {
    if (!await confirmDialog('Discard this unfinished tournament?', { confirmLabel: 'Discard', danger: true })) return
    await api.settings.set(SAVED_KEY, '')
    setSaved(null)
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
      if (size == null && fullPool.length > SAVED_MAX_ENTRIES) {
        setError(`This source has ${fullPool.length} contenders. Select 256 or fewer to keep autosave and the bracket usable.`)
        return
      }
      if (format === 'groups' && size == null) {
        setError('Groups then knockout requires 8, 16, 32, or 64 contenders.')
        return
      }
      if (format === 'groups' && !GROUP_SIZES.includes(size as 8 | 16 | 32 | 64)) {
        setError('Groups then knockout requires 8, 16, 32, or 64 contenders.')
        return
      }
      if (format === 'groups' && size != null && fullPool.length < size) {
        setError(`This source has ${fullPool.length} contenders; the selected group format needs exactly ${size}.`)
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
        const parsed = parseSavedTournament(raw)
        if (parsed) setSaved(parsed)
      })
      .catch((error) => { throw error })
    return () => {
      cancelled = true
    }
  }, [])

  // Autosave after every pick while a run is live. Oversized pools skip the
  // save entirely (the settings row is not the place for megabytes of JSON).
  useEffect(() => {
    if (phase !== 'play' || contenders.length === 0) return
    if (contenders.length > SAVED_MAX_ENTRIES) return
    const savedSnapshot: SavedTournament = {
      version: 3,
      sourceLabel: sourceLabelOverride ?? describeSource(),
      createdAt: savedCreatedAt ?? new Date().toISOString(),
      contenders,
      format,
      stage,
      groups,
      groupField,
      qualified,
      tiebreakQueue,
      activeTiebreak,
      bracket,
      undoStack,
      seed: tournamentSeed,
      size: tournamentSize
    }
    let stale = false
    setSaveState('saving')
    void api.settings.set(SAVED_KEY, JSON.stringify(savedSnapshot)).then(() => {
      if (!stale) setSaveState('saved')
    }).catch((error) => {
      if (!stale) setSaveState('failed')
      throw error
    })
    return () => { stale = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, bracket, groups, groupField, activeTiebreak, qualified, tiebreakQueue, undoStack, format, stage, tournamentSeed, tournamentSize])

  function endGame(finished: Bracket) {
    stopIfOurs()
    setBracket(finished)
    // A finished run is no longer resumable.
    void api.settings.set(SAVED_KEY, '').catch((error) => { throw error })
    if (!loggedRef.current) {
      loggedRef.current = true
      setSaveState('saving')
      const champ = contenders[championOf(finished)!]
      const runner = contenders[runnerUpOf(finished)!]
      void api.quiz
        .logSession({
          kind: 'tournament',
          score: tournamentSize,
          total: tournamentSize,
          bestStreak: 0,
          settings: {
            sourceLabel: describeSource(),
            format,
            seed: tournamentSeed,
            correct: 0,
            attempted: 0,
            scorePolicy: 'tournament',
            playMode: 'solo',
            poolSize: tournamentSize,
            champion: { key: champ.key, name: champ.name, imagePath: champ.imagePath },
            runnerUp: { key: runner.key, name: runner.name },
            standings: placementsOf(finished).map((p) => ({
              name: contenders[p.poolIndex].name,
              outInRound: p.outInRound
            })),
            groupStandings: groups?.groups.map((group) => ({
              group: group.id + 1,
              standings: group.standings.map((row) => ({
                name: groupField?.[row.contender]?.name ?? String(row.contender),
                wins: row.wins,
                played: row.played
              }))
            })) ?? null
          }
        })
        .then(() => {
          setSaveState('saved')
          return qc.invalidateQueries({ queryKey: qk.quiz.history('tournament') })
        })
        .catch((error) => {
          loggedRef.current = false
          setSaveState('failed')
          throw error
        })
    }
    setPhase('summary')
  }

  function snapshot(): TournamentSnapshot {
    return { contenders, stage, groups, qualified, tiebreakQueue, activeTiebreak, bracket }
  }

  function beginKnockout(nextQualifiers: TournamentQualifier[]) {
    if (!groups) throw new Error('Group state is required for knockout seeding')
    const indices = seedGroupKnockout(nextQualifiers, groups.groups.length)
    const advancing = indices.map((i) => contenders[i])
    setContenders(advancing)
    setStage('knockout')
    setQualified(nextQualifiers)
    setTiebreakQueue([])
    setActiveTiebreak(null)
    setBracket(createBracket(advancing.length))
  }

  function beginTiebreaks(base: TournamentQualifier[], queue: TournamentTiebreak[]) {
    setQualified(base)
    setTiebreakQueue(queue.slice(1))
    if (queue.length === 0) {
      beginKnockout(base)
      return
    }
    setStage('tiebreak')
    setActiveTiebreak({ spec: queue[0], bracket: createBracket(queue[0].contenders.length) })
  }

  function finishGroups(nextGroups: TournamentGroupsState) {
    const base: TournamentQualifier[] = []
    const ties: TournamentTiebreak[] = []
    for (const group of nextGroups.groups) {
      const result = groupQualification(group)
      base.push(...result.qualified)
      if (result.tiebreak) ties.push(result.tiebreak)
    }
    beginTiebreaks(base, ties)
  }

  function pick(side: 'a' | 'b', confirmedFinal = false) {
    if (interactionLock.current) return
    if (stage === 'knockout' && bracket) {
      const current = currentMatch(bracket)
      if (current?.match.round === bracket.rounds - 1 && !confirmedFinal) {
        setPendingFinalPick(side)
        return
      }
    }
    interactionLock.current = true
    setInteractionLocked(true)
    try {
      stopIfOurs()
      setUndoStack((stack) => [...stack, snapshot()])
      if (stage === 'groups' && groups) {
        const current = currentGroupMatch(groups)
        if (!current) throw new Error('No group match is ready')
        const next = pickGroupWinner(groups, current.groupId, current.matchIndex, side === 'a' ? current.a : current.b)
        setGroups(next)
        if (currentGroupMatch(next) == null) finishGroups(next)
        return
      }
      if (stage === 'tiebreak' && activeTiebreak) {
        const current = currentMatch(activeTiebreak.bracket)
        if (!current) throw new Error('No tiebreak match is ready')
        const nextBracket = pickWinner(activeTiebreak.bracket, current.matchIndex, side)
        if (currentMatch(nextBracket) != null) {
          setActiveTiebreak({ ...activeTiebreak, bracket: nextBracket })
          return
        }
        const additions: TournamentQualifier[] = [{
          contender: activeTiebreak.spec.contenders[championOf(nextBracket)!],
          groupId: activeTiebreak.spec.groupId,
          place: activeTiebreak.spec.places[0]
        }]
        if (activeTiebreak.spec.needed === 2) additions.push({
          contender: activeTiebreak.spec.contenders[runnerUpOf(nextBracket)!],
          groupId: activeTiebreak.spec.groupId,
          place: activeTiebreak.spec.places[1]
        })
        const nextQualified = [...qualified, ...additions]
        if (tiebreakQueue.length) beginTiebreaks(nextQualified, tiebreakQueue)
        else beginKnockout(nextQualified)
        return
      }
      if (!bracket) throw new Error('No knockout bracket is loaded')
      const cur = currentMatch(bracket)
      if (!cur) throw new Error('No knockout match is ready')
      const next = pickWinner(bracket, cur.matchIndex, side)
      if (currentMatch(next) === null) endGame(next)
      else setBracket(next)
    } catch (error) {
      interactionLock.current = false
      setInteractionLocked(false)
      throw error
    }
  }

  useEffect(() => {
    interactionLock.current = false
    setInteractionLocked(false)
  }, [bracket, groups, activeTiebreak, stage])

  function undo() {
    if (undoStack.length === 0 || interactionLocked || pendingFinalPick) return
    stopIfOurs()
    const previous = undoStack[undoStack.length - 1]
    setContenders(previous.contenders)
    setStage(previous.stage)
    setGroups(previous.groups)
    setQualified(previous.qualified)
    setTiebreakQueue(previous.tiebreakQueue)
    setActiveTiebreak(previous.activeTiebreak)
    setBracket(previous.bracket)
    setUndoStack((s) => s.slice(0, -1))
  }

  async function saveAndExit() {
    const savedSnapshot: SavedTournament = {
      version: 3,
      sourceLabel: sourceLabelOverride ?? describeSource(),
      createdAt: savedCreatedAt ?? new Date().toISOString(),
      contenders,
      format,
      stage,
      groups,
      groupField,
      qualified,
      tiebreakQueue,
      activeTiebreak,
      bracket,
      undoStack,
      seed: tournamentSeed,
      size: tournamentSize
    }
    setSaveState('saving')
    await api.settings.set(SAVED_KEY, JSON.stringify(savedSnapshot))
    setSaved(savedSnapshot)
    setSaveState('saved')
    setPhase('setup')
  }

  async function abandonTournament() {
    if (!await confirmDialog('Abandon this tournament? Its saved progress will be deleted.', {
      confirmLabel: 'Abandon',
      danger: true
    })) return
    await api.settings.set(SAVED_KEY, '')
    setSaved(null)
    setPhase('setup')
  }

  // Keyboard: 1/left picks the left card, 2/right the right, Backspace undoes,
  // Space toggles an auditioning track (input-guarded like the other quizzes).
  useEffect(() => {
    if (phase !== 'play') return
    function onKey(e: KeyboardEvent) {
      if (e.repeat || interactionLocked || pendingFinalPick) return
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
  }, [phase, bracket, undoStack, player.track?.id, interactionLocked, pendingFinalPick])

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
          <div className="card mb-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">Unfinished tournament</p>
              <p className="truncate text-sm text-gray-400">
                {saved.sourceLabel} · {saved.size} contenders · {saved.format === 'groups' ? 'Groups then knockout' : 'Knockout'}
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

          <Group label="Format">
            <Pill active={format === 'knockout'} onClick={() => setFormat('knockout')} label="Knockout" />
            <Pill
              active={format === 'groups'}
              onClick={() => {
                setFormat('groups')
                if (size == null || !GROUP_SIZES.includes(size as 8 | 16 | 32 | 64)) setSize(16)
              }}
              label="Groups then knockout"
            />
          </Group>
          {format === 'groups' && (
            <p className="max-w-2xl text-sm text-gray-400">
              Groups of four play six matchups each. The top two advance, and only a tie crossing second place creates a cutoff tiebreak.
            </p>
          )}

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
                <Pill active={themeList === 'watched'} onClick={() => setThemeList('watched')} label="Completed" />
                <Pill active={themeList === 'all'} onClick={() => setThemeList('all')} label="All" />
              </Group>
              {themeList === 'all' && <p className="text-sm text-amber-300">Includes in-progress or unseen content and may contain spoilers.</p>}
            </>
          )}

          {kind === 'characters' && (
            <>
              <Group label="From">
                <Pill active={charScope === 'all'} onClick={() => setCharScope('all')} label="Completed library" />
                <Pill active={charScope === 'unseen'} onClick={() => setCharScope('unseen')} label="All library" />
                <Pill active={charScope === 'media'} onClick={() => setCharScope('media')} label="One title" />
              </Group>
              {charScope === 'unseen' && <p className="text-sm text-amber-300">Includes in-progress or unseen content and may contain spoilers.</p>}
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
                <Pill active={mediaStatus === null} onClick={() => setMediaStatus(null)} label="Completed" />
                <Pill active={mediaStatus === '__all__'} onClick={() => setMediaStatus('__all__')} label="All" />
                {mediaStatuses.filter((s) => s !== mediaStatuses[1]).map((s) => (
                  <Pill key={s} active={mediaStatus === s} onClick={() => setMediaStatus(s)} label={s} />
                ))}
              </Group>
              {mediaStatus !== null && <p className="text-sm text-amber-300">Includes content outside your completed list and may contain spoilers.</p>}
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
            {(format === 'groups' ? GROUP_SIZES : KNOCKOUT_SIZES).map((s) => (
              <Pill key={s} active={size === s} onClick={() => setSize(s)} label={String(s)} />
            ))}
            {format === 'knockout' && <Pill active={size === null} onClick={() => setSize(null)} label="Everyone" />}
          </Group>
          {format === 'knockout' && size === null && (
            <p className="text-sm text-gray-500">Everyone is accepted only when the resolved pool is at most 256 contenders.</p>
          )}
          {size != null && (
            <p className="text-sm text-gray-500">
              {size} contenders · {format === 'groups' ? size * 2 - 1 : size - 1} decisions
              {format === 'groups' ? ' before any cutoff tiebreaks' : ''}
            </p>
          )}

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
        subtitle={`${tournamentSize} contenders · ${describeSource()}`}
        surface={false}
      >
        <div className="grid items-start gap-6 lg:grid-cols-[14rem_minmax(0,1fr)]">
          <div className="card-glow p-6 text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500">Champion</p>
            <div className="mx-auto mt-4 w-full">
              <CoverImage
                path={champ.imagePath}
                alt={champ.name}
                thumbWidth={320}
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
              {tournamentSize} contenders · {describeSource()}
            </p>
            <div className="mt-5 flex gap-2">
              <button className="btn-primary flex-1" onClick={() => dealBracket(pool, tournamentSize, true)}>
                Run it back
              </button>
              <button className="btn-ghost flex-1" onClick={() => setPhase('setup')}>
                New
              </button>
            </div>
            {saveState === 'saving' && <p className="mt-3 text-sm text-gray-400">Saving tournament summary…</p>}
            {saveState === 'failed' && <button className="btn-danger mt-3 w-full" onClick={() => endGame(bracket)}>Retry saving summary</button>}
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
                      {placementRank(placements, i)}
                    </span>
                    <CoverImage
                      path={entry.imagePath}
                      alt={entry.name}
                      thumbWidth={80}
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
  let leftIndex: number
  let rightIndex: number
  let playTitle: string
  let playSubtitle: string
  let playCurrent: number
  let playTotal: number
  if (stage === 'groups' && groups) {
    const current = currentGroupMatch(groups)
    if (!current) return null
    leftIndex = current.a
    rightIndex = current.b
    playTitle = `Group ${current.groupId + 1}`
    playCurrent = groups.groups.flatMap((group) => group.matches).filter((match) => match.winner != null).length
    playTotal = groups.groups.length * 6
    playSubtitle = `Match ${playCurrent + 1} of ${playTotal}`
  } else if (stage === 'tiebreak' && activeTiebreak) {
    const current = currentMatch(activeTiebreak.bracket)
    if (!current) return null
    leftIndex = activeTiebreak.spec.contenders[current.match.a!]
    rightIndex = activeTiebreak.spec.contenders[current.match.b!]
    const progress = bracketProgress(activeTiebreak.bracket)
    playTitle = `Group ${activeTiebreak.spec.groupId + 1} cutoff tiebreak`
    playSubtitle = `${activeTiebreak.spec.needed} qualification place${activeTiebreak.spec.needed === 1 ? '' : 's'} available`
    playCurrent = progress.picksMade
    playTotal = progress.totalPicks
  } else {
    if (!bracket) return null
    const current = currentMatch(bracket)
    if (!current) return null
    leftIndex = current.match.a!
    rightIndex = current.match.b!
    const progress = bracketProgress(bracket)
    playTitle = roundLabel(progress.competitorsInRound)
    playSubtitle = `Match ${progress.playedInRound} of ${progress.playableInRound}`
    playCurrent = progress.picksMade
    playTotal = progress.totalPicks
  }
  const left = contenders[leftIndex]
  const right = contenders[rightIndex]

  return (
    <StudySessionFrame
      title={playTitle}
      subtitle={playSubtitle}
      progress={{ current: playCurrent, total: playTotal, label: stage === 'groups' ? 'Group matches' : 'Bracket picks' }}
      surface={false}
      actions={
        <>
          {stage === 'knockout' && <button className="btn-ghost py-1 px-2 text-sm" onClick={() => setTreeOpen(!treeOpen)}>
            {treeOpen ? 'Hide bracket' : 'Show bracket'}
          </button>}
          <button
            className="btn-ghost py-1 px-2 text-sm"
            disabled={undoStack.length === 0 || interactionLocked || pendingFinalPick != null}
            onClick={undo}
          >
            Undo
          </button>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={saveAndExit}>
            Save and exit
          </button>
          <button className="btn-ghost py-1 px-2 text-sm" onClick={abandonTournament}>
            Abandon
          </button>
        </>
      }
    >
      {format === 'groups' && <TournamentStageRoute stage={stage} />}

      <div className="grid gap-4 md:grid-cols-2">
        {([left, right] as const).map((entry, i) => (
          <ContenderCard
            key={entry.key}
            entry={entry}
            keyHint={i === 0 ? '1' : '2'}
            playing={player.track?.id === `tourney-${entry.key}` && player.isPlaying}
            loaded={player.track?.id === `tourney-${entry.key}`}
            disabled={interactionLocked || pendingFinalPick != null}
            onPick={() => pick(i === 0 ? 'a' : 'b')}
            onPlay={() => playEntry(entry)}
          />
        ))}
      </div>

      {pendingFinalPick && (
        <div className="card mt-4 p-5 text-center" role="status" aria-live="polite">
          <p className="font-semibold">
            Make {(pendingFinalPick === 'a' ? left : right).name} the champion?
          </p>
          <p className="mt-1 text-sm text-gray-400">This final choice completes and records the tournament.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              className="btn-primary px-5 py-2"
              onClick={() => {
                const side = pendingFinalPick
                setPendingFinalPick(null)
                pick(side, true)
              }}
            >
              Confirm champion
            </button>
            <button className="btn-ghost px-5 py-2" onClick={() => setPendingFinalPick(null)}>
              Go back
            </button>
          </div>
        </div>
      )}

      <p className="mt-4 text-center text-sm text-gray-500">
        Pick a contender or press 1 / 2 or the arrow keys. Backspace undoes the last pick; Space plays or pauses audio.
      </p>

      <p className={`mt-2 text-center text-xs ${saveState === 'failed' ? 'text-red-400' : 'text-gray-500'}`} role="status" aria-live="polite">
        {saveState === 'saving' ? 'Saving progress…' : saveState === 'failed' ? 'Progress could not be saved. Use Save and exit to retry.' : saveState === 'saved' ? 'Progress saved' : ''}
      </p>

      {stage === 'groups' && groups && (() => {
        const current = currentGroupMatch(groups)
        const group = current ? groups.groups[current.groupId] : null
        const places = group ? groupPlacements(group) : []
        return group ? (
          <div className="card mt-6 p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="label">Group {group.id + 1} standings</p>
              <button className="btn-ghost px-3 py-1.5 text-sm" onClick={() => setGroupsOpen(!groupsOpen)}>
                {groupsOpen ? 'Hide all groups' : 'Show all groups'}
              </button>
            </div>
            <p className="mb-3 text-xs text-gray-400">Top two advance. A tie crossing the line triggers a cutoff tiebreak.</p>
            <div className="space-y-1">
              {group.standings.map((row, index) => (
                <div key={row.contender} className={`flex items-center gap-3 rounded-md bg-base-800 px-3 py-2 text-sm ${index === 1 ? 'mb-2 border-b border-accent/40' : ''}`}>
                  <span className="w-5 text-gray-500">{places.find((place) => place.contenders.includes(row.contender))?.place ?? index + 1}</span>
                  <span className="min-w-0 flex-1 truncate">{contenders[row.contender].name}</span>
                  <span className="text-gray-400">{row.wins} win{row.wins === 1 ? '' : 's'}</span>
                  <span className="text-gray-500">{row.played}/3</span>
                </div>
              ))}
            </div>
            {groupsOpen && <AllGroupsOverview groups={groups} contenders={contenders} />}
          </div>
        ) : null
      })()}

      {treeOpen && stage === 'knockout' && bracket && (
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
  disabled,
  onPick,
  onPlay
}: {
  entry: TournamentEntry
  keyHint: string
  playing: boolean
  loaded: boolean
  disabled: boolean
  onPick: () => void
  onPlay: () => void
}) {
  const hasAudio = entry.audioPath != null || entry.audioUrl != null
  const square = entry.entryKind === 'music'
  return (
    <article className="card flex min-w-0 flex-col p-5 text-center">
      <button
        type="button"
        disabled={disabled}
        onClick={onPick}
        className="group flex min-w-0 flex-1 flex-col items-center rounded-lg disabled:cursor-not-allowed disabled:opacity-60"
        aria-label={`Pick ${entry.name}`}
      >
        <CoverImage
          path={entry.imagePath}
          alt={entry.name}
          thumbWidth={384}
          className={`w-full max-w-[16rem] ${square ? 'aspect-square' : 'aspect-[2/3]'}`}
          fallback={square ? 'music' : 'initial'}
        />
        <p className="mt-4 line-clamp-2 break-words text-xl font-semibold group-hover:text-accent">{entry.name}</p>
        {entry.subtitle && (
          <p className="mt-1 line-clamp-2 break-words text-sm text-gray-400">{entry.subtitle}</p>
        )}
      </button>
      <div className="mt-3 flex items-center justify-center gap-3">
        {hasAudio && (
          <button
            type="button"
            disabled={disabled}
            aria-label={playing ? `Pause ${entry.name}` : `Play ${entry.name}`}
            className="btn-ghost px-4 py-1.5 text-sm"
            onClick={onPlay}
          >
            {playing ? 'Pause' : loaded ? 'Resume' : 'Play'}
          </button>
        )}
        <kbd className="kbd">{keyHint}</kbd>
      </div>
    </article>
  )
}

function TournamentStageRoute({ stage }: { stage: TournamentStage }) {
  const stages: Array<{ key: TournamentStage; label: string }> = [
    { key: 'groups', label: 'Groups' },
    { key: 'tiebreak', label: 'Cutoff tiebreak' },
    { key: 'knockout', label: 'Knockout' }
  ]
  const active = stages.findIndex((item) => item.key === stage)
  return (
    <ol className="mb-5 grid grid-cols-3 gap-2" aria-label="Tournament stages">
      {stages.map((item, index) => (
        <li
          key={item.key}
          aria-current={index === active ? 'step' : undefined}
          className={`rounded-lg border px-3 py-2 text-center text-xs font-medium ${
            index === active
              ? 'border-accent bg-accent/10 text-accent'
              : index < active
                ? 'border-base-600 text-gray-300'
                : 'border-base-700 text-gray-500'
          }`}
        >
          {item.label}
        </li>
      ))}
    </ol>
  )
}

function visibleGroupContenders(groups: TournamentGroupsState): Set<number> {
  const visible = new Set<number>()
  const current = currentGroupMatch(groups)
  for (const group of groups.groups) {
    group.matches.forEach((match, matchIndex) => {
      if (match.winner != null || (current?.groupId === group.id && current.matchIndex === matchIndex)) {
        visible.add(match.a)
        visible.add(match.b)
      }
    })
  }
  return visible
}

function AllGroupsOverview({
  groups,
  contenders
}: {
  groups: TournamentGroupsState
  contenders: TournamentEntry[]
}) {
  const visible = visibleGroupContenders(groups)
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {groups.groups.map((group) => (
        <section key={group.id} className="rounded-lg border border-base-700 p-3">
          <p className="mb-2 text-sm font-semibold">Group {group.id + 1}</p>
          <ol className="space-y-1 text-sm">
            {group.standings.map((row, index) => (
              <li key={row.contender} className={`flex min-w-0 gap-2 ${index === 1 ? 'border-b border-base-600 pb-1' : ''}`}>
                <span className="w-5 shrink-0 text-gray-500">{index + 1}</span>
                <span className="min-w-0 flex-1 truncate">
                  {visible.has(row.contender) ? contenders[row.contender].name : 'Hidden contender'}
                </span>
                <span className="shrink-0 text-gray-400">{row.wins} W</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
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
          aria-label={`Search ${scope}s`}
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
          aria-label="Search library titles"
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
