import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueries, useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useAllCompletedStatuses, useSettings } from '../lib/hooks'
import type { QuizAvailability, QuizKind } from '@shared/types'
import { quizScorePolicy, quizSessionCorrect } from '@shared/quizCore'
import { usePersistedState } from '../lib/navState'
import { parseSavedTournament } from '@shared/tournamentSave'

interface GameCard {
  to: string
  // Every kind this game logs; a game with modes or difficulties logs several.
  kinds: QuizKind[]
  title: string
  body: string
  availability?: Exclude<
    keyof QuizAvailability,
    'higherLowerOptions' | 'guessTrackOptions' | 'screenGameOptions' | 'football'
  >
  footballAvailability?: keyof QuizAvailability['football']
  minimum?: number
  availabilityLabel?: (count: number) => string
}

const GROUPS: Array<{ title: string; games: GameCard[] }> = [
  {
    title: 'Audio',
    games: [
      { to: '/quiz/guess-track', kinds: ['guessTrackTheme', 'guessTrackMusic'], title: 'Guess the Track', body: 'Identify five songs through progressively longer intro clips.', availability: 'guessTrack', minimum: 5 },
      { to: '/quiz/song', kinds: ['song', 'songArcade', 'songReverse'], title: 'Song Quiz', body: 'Classic, arcade, or reverse theme-song rounds.', availability: 'song', minimum: 4 }
    ]
  },
  {
    title: 'Images',
    games: [
      { to: '/quiz/images', kinds: ['imageReveal'], title: 'Image Reveal', body: 'Identify covers or art through four reveal stages.', availability: 'imageReveal', minimum: 4 },
      { to: '/quiz/silhouette', kinds: ['silhouette'], title: 'Silhouette', body: 'Recognise a character or the title they belong to.', availability: 'silhouette', minimum: 4 },
      { to: '/quiz/panels', kinds: ['mangaPanel'], title: 'Manga Panels', body: 'Name a manga from a safely selected local page.', availability: 'mangaPanel', minimum: 4 }
    ]
  },
  {
    title: 'Connections',
    games: [
      { to: '/quiz/connections', kinds: ['connections'], title: 'Connections', body: 'Find the actor or director connecting two movies or TV shows.', availability: 'connections', minimum: 5 },
      { to: '/quiz/library-grid', kinds: ['libraryGrid'], title: 'Library Grid', body: 'Fill nine intersections with movies or TV shows matching both facts.', availability: 'libraryGrid', minimum: 9, availabilityLabel: (count) => `${count} solvable cells` },
      { to: '/quiz/movie-chain', kinds: ['movieChainEasy', 'movieChainNormal', 'movieChainHard'], title: 'Movie Chain', body: 'Reach a target title through shared main-cast actors and directors.', availability: 'movieChain', minimum: 1, availabilityLabel: (count) => `${count} eligible endpoint pairs` },
      { to: '/quiz/link-wall', kinds: ['linkWall'], title: 'Link Wall', body: 'Sort sixteen movies and TV shows into four hidden connection groups.', availability: 'linkWall', minimum: 16, availabilityLabel: () => 'Solvable wall ready' },
      { to: '/quiz/chronology', kinds: ['chronology'], title: 'Chronology', body: 'Order four connected titles by release date.', availability: 'chronology', minimum: 4 }
    ]
  },
  {
    title: 'Library',
    games: [
      { to: '/quiz/cast', kinds: ['cast'], title: 'Cast Quiz', body: 'Match an actor to a movie or TV show they appeared in.', availability: 'cast', minimum: 4 },
      { to: '/quiz/va', kinds: ['va'], title: 'Voice Actor Quiz', body: 'Find the character from another anime who shares the same Japanese voice actor.', availability: 'va', minimum: 4 },
      { to: '/quiz/synopsis', kinds: ['synopsis'], title: 'Synopsis Quiz', body: 'Identify a title from a spoiler-conscious excerpt.', availability: 'synopsis', minimum: 4 },
      { to: '/quiz/libraryle', kinds: ['libraryle'], title: 'Libraryle', body: 'Find a hidden movie or TV title from attribute feedback.', availability: 'libraryle', minimum: 8, availabilityLabel: (count) => `${count} possible targets` },
      { to: '/quiz/mystery-career', kinds: ['mysteryCareer'], title: 'Mystery Career', body: 'Identify an actor or director from progressively revealed credits.', availability: 'mysteryCareer', minimum: 1, availabilityLabel: (count) => `${count} possible careers` },
      { to: '/quiz/higher-lower', kinds: ['higherLower'], title: 'Higher or Lower', body: 'Compare dates, lengths, or your ratings within one library category.', availability: 'higherLower', minimum: 2 }
    ]
  },
  {
    title: 'Football',
    games: [
      { to: '/football/quiz/champion', kinds: ['footballChampion'], title: 'Football Champion', body: 'Name verified edition winners from nine competition lineages.', footballAvailability: 'champion', minimum: 5 },
      { to: '/football/quiz/scoreline', kinds: ['footballScoreline'], title: 'Football Scoreline', body: 'Recover exact final scores from archived match records.', footballAvailability: 'scoreline', minimum: 5 },
      { to: '/football/quiz/career-path', kinds: ['footballCareerPath'], title: 'Football Career Path', body: 'Identify a player from verified senior-club spells.', footballAvailability: 'careerPath', minimum: 5 },
      { to: '/football/quiz/chronology', kinds: ['footballChronology'], title: 'Football Chronology', body: 'Order four champion editions from one competition.', footballAvailability: 'chronology', minimum: 4 },
      { to: '/football/quiz/player-grid', kinds: ['footballPlayerGrid'], title: 'Football Player Grid', body: 'Fill a 3x3 player grid from verified career intersections.', footballAvailability: 'playerGrid', minimum: 1, availabilityLabel: () => 'Solvable board ready' }
    ]
  },
  {
    title: 'Tournament',
    games: [{ to: '/quiz/tournament', kinds: ['tournament'], title: 'Tournament', body: 'Knockout or group-stage contests over your library.' }]
  }
]

function hasValidTournamentSave(raw: string | undefined): boolean {
  return parseSavedTournament(raw) != null
}

export default function QuizLandingPage() {
  const navigate = useNavigate()
  const completedStatuses = useAllCompletedStatuses()
  const { data: settings } = useSettings()
  const request = useMemo(
    () => ({ scope: 'consumed' as const, statuses: completedStatuses }),
    [completedStatuses]
  )
  const { data: availability } = useQuery({
    queryKey: qk.quiz.availability(request),
    queryFn: () => api.quiz.availability(request)
  })
  const solo = GROUPS.flatMap((group) => group.games).filter((game) => {
    if (!availability) return false
    if (game.footballAvailability) {
      const value = availability.football[game.footballAvailability]
      return typeof value === 'number' && value >= (game.minimum ?? 1)
    }
    if (!game.availability) return false
    if (game.to === '/quiz/library-grid') {
      return (availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.libraryGrid ?? 0) >= 9
    }
    if (game.to === '/quiz/movie-chain') {
      return (availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.movieChain.normal ?? 0) > 0
    }
    if (game.to === '/quiz/libraryle') {
      return (availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.libraryle ?? 0) >= 8
    }
    if (game.to === '/quiz/mystery-career') {
      return (availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.mysteryCareer ?? 0) > 0
    }
    if (game.to === '/quiz/link-wall') {
      return (availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.linkWall ?? 0) >= 16
    }
    return availability[game.availability] >= (game.minimum ?? 1)
  })
  const hasSaved = hasValidTournamentSave(settings?.['tournament.saved'])
  const [group, setGroup] = usePersistedState('quizGroup', 'All')
  const shownGroups = group === 'All' ? GROUPS : GROUPS.filter((g) => g.title === group)

  function randomChallenge() {
    if (!solo.length) return
    navigate(solo[Math.floor(Math.random() * solo.length)].to, { state: { randomChallenge: true } })
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Quiz broadcast"
        subtitle="Replayable solo challenges and shared-room games built from the library you have completed."
        actions={<Link to="/quiz/party" className="btn-primary">Start party</Link>}
      />
      <section className="card mb-6 flex flex-wrap items-center gap-3 p-4" aria-label="Open play">
        <p className="mr-auto max-w-xl text-sm text-gray-400">
          Every deal is fresh. Pools use completed titles, so a round never reveals something you have not seen.
        </p>
        <button className="btn-ghost" disabled={!solo.length} onClick={randomChallenge}>Random Challenge</button>
        <Link to="/quiz/song" className="btn-ghost">Quick Solo</Link>
        {hasSaved && <Link to="/quiz/tournament" className="btn-ghost">Resume Tournament</Link>}
      </section>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Format">
        {['All', ...GROUPS.map((g) => g.title)].map((title) => (
          <button
            key={title}
            className={`pill ${group === title ? 'pill-active' : ''}`}
            aria-pressed={group === title}
            onClick={() => setGroup(title)}
          >
            {title}{' '}
            <span className="tabular-nums opacity-70">
              {title === 'All' ? GROUPS.reduce((n, g) => n + g.games.length, 0) : GROUPS.find((g) => g.title === title)!.games.length}
            </span>
          </button>
        ))}
      </div>
      <div className="space-y-8">
        {shownGroups.map((group) => (
          <section key={group.title}>
            <h2 className="label mb-3">{group.title}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
              {group.games.map((game) => {
                const footballCount = game.footballAvailability
                  ? availability?.football[game.footballAvailability]
                  : null
                const count = game.availability
                  ? availability?.[game.availability] ?? 0
                  : typeof footballCount === 'number'
                    ? footballCount
                    : null
                const ready = count == null || count >= (game.minimum ?? 1)
                const inner = (
                  <>
                    <p className="font-semibold">{game.title}</p>
                    <p className="mt-1 text-sm text-gray-400">{game.body}</p>
                    <p className="mt-3 flex flex-wrap justify-between gap-x-3 gap-y-1 text-xs">
                      <span className="text-gray-500">
                        {count == null
                          ? 'Uses your selected contender source'
                          : ready
                            ? game.availabilityLabel?.(count) ?? `${count} eligible sources`
                            : `Needs at least ${game.minimum}; ${count} eligible`}
                      </span>
                      <TileRecord kinds={game.kinds} />
                    </p>
                  </>
                )
                return ready ? (
                  <Link key={game.to} to={game.to} className="card block min-h-[140px] p-5 transition-colors hover:border-accent hover:bg-base-700/60">{inner}</Link>
                ) : (
                  <div key={game.to} className="card min-h-[140px] p-5 opacity-55" aria-disabled="true">{inner}</div>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

// The tile's own record from the round log: the personal best when the game
// has one ranking, otherwise just how often it has been played. Games with
// modes or difficulties rank each separately, so their bests are not mixed.
function TileRecord({ kinds }: { kinds: QuizKind[] }) {
  const histories = useQueries({
    queries: kinds.map((kind) => ({
      queryKey: qk.quiz.history(kind),
      queryFn: () => api.quiz.history(kind)
    }))
  })
  if (histories.some((h) => !h.data)) return null
  const rounds = histories.reduce((n, h) => n + (h.data?.totalSessions ?? 0), 0)
  if (rounds === 0) return <span className="text-gray-500">Not played yet</span>
  const best = kinds.length === 1 ? histories[0].data?.best : null
  const bestText = best
    ? quizScorePolicy(kinds[0]) === 'points'
      ? `Best ${best.score.toLocaleString()} pts`
      : `Best ${quizSessionCorrect(best)}/${best.total}`
    : null
  return (
    <span className="text-gray-300">
      {bestText && <>{bestText} · </>}
      {rounds} {rounds === 1 ? 'round' : 'rounds'}
    </span>
  )
}
