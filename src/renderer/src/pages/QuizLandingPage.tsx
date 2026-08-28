import { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useAllCompletedStatuses, useSettings } from '../lib/hooks'
import type { QuizAvailability } from '@shared/types'
import { parseSavedTournament } from '@shared/tournamentSave'

interface GameCard {
  to: string
  title: string
  body: string
  availability?: Exclude<
    keyof QuizAvailability,
    'higherLowerOptions' | 'guessTrackOptions' | 'screenGameOptions'
  >
  minimum?: number
  availabilityLabel?: (count: number) => string
}

const GROUPS: Array<{ title: string; games: GameCard[] }> = [
  {
    title: 'Audio',
    games: [
      { to: '/quiz/guess-track', title: 'Guess the Track', body: 'Identify five songs through progressively longer intro clips.', availability: 'guessTrack', minimum: 5 },
      { to: '/quiz/song', title: 'Song Quiz', body: 'Classic, arcade, or reverse theme-song rounds.', availability: 'song', minimum: 4 }
    ]
  },
  {
    title: 'Images',
    games: [
      { to: '/quiz/images', title: 'Image Reveal', body: 'Identify covers or art through four reveal stages.', availability: 'imageReveal', minimum: 4 },
      { to: '/quiz/silhouette', title: 'Silhouette', body: 'Recognise a character or the title they belong to.', availability: 'silhouette', minimum: 4 },
      { to: '/quiz/panels', title: 'Manga Panels', body: 'Name a manga from a safely selected local page.', availability: 'mangaPanel', minimum: 4 }
    ]
  },
  {
    title: 'Connections',
    games: [
      { to: '/quiz/connections', title: 'Connections', body: 'Find the actor or director connecting two movies or TV shows.', availability: 'connections', minimum: 5 },
      { to: '/quiz/library-grid', title: 'Library Grid', body: 'Fill nine intersections with movies or TV shows matching both facts.', availability: 'libraryGrid', minimum: 9, availabilityLabel: (count) => `${count} solvable cells` },
      { to: '/quiz/movie-chain', title: 'Movie Chain', body: 'Reach a target title through shared main-cast actors and directors.', availability: 'movieChain', minimum: 1, availabilityLabel: (count) => `${count} eligible endpoint pairs` },
      { to: '/quiz/chronology', title: 'Chronology', body: 'Order four connected titles by release date.', availability: 'chronology', minimum: 4 }
    ]
  },
  {
    title: 'Library',
    games: [
      { to: '/quiz/cast', title: 'Cast Quiz', body: 'Match an actor to a movie or TV show they appeared in.', availability: 'cast', minimum: 4 },
      { to: '/quiz/va', title: 'Voice Actor Quiz', body: 'Find the character from another anime who shares the same Japanese voice actor.', availability: 'va', minimum: 4 },
      { to: '/quiz/synopsis', title: 'Synopsis Quiz', body: 'Identify a title from a spoiler-conscious excerpt.', availability: 'synopsis', minimum: 4 },
      { to: '/quiz/higher-lower', title: 'Higher or Lower', body: 'Compare dates, lengths, or your ratings within one library category.', availability: 'higherLower', minimum: 2 }
    ]
  },
  {
    title: 'Tournament',
    games: [{ to: '/quiz/tournament', title: 'Tournament', body: 'Knockout or group-stage contests over your library.' }]
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
    if (!game.availability || !availability) return false
    if (game.to === '/quiz/library-grid') {
      return (availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.libraryGrid ?? 0) >= 9
    }
    if (game.to === '/quiz/movie-chain') {
      return (availability.screenGameOptions.find((option) => option.mediaMode === 'both')?.movieChain.normal ?? 0) > 0
    }
    return availability[game.availability] >= (game.minimum ?? 1)
  })
  const hasSaved = hasValidTournamentSave(settings?.['tournament.saved'])

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
      <section className="card-glow mb-8 p-7">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">Open play</p>
        <h2 className="mt-3 text-3xl font-semibold text-white">Choose the signal, not the calendar.</h2>
        <p className="mt-2 max-w-3xl text-gray-300">
          Every deal receives a fresh replay seed. Completed-only pools are the default so the quiz does not reveal unseen characters, connections, art, or endings.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/quiz/song" className="btn-ghost">Quick Solo</Link>
          <button className="btn-ghost" disabled={!solo.length} onClick={randomChallenge}>Random Challenge</button>
          {hasSaved && <Link to="/quiz/tournament" className="btn-ghost">Resume Tournament</Link>}
        </div>
      </section>
      <div className="space-y-8">
        {GROUPS.map((group) => (
          <section key={group.title}>
            <h2 className="label mb-3">{group.title}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
              {group.games.map((game) => {
                const count = game.availability ? availability?.[game.availability] ?? 0 : null
                const ready = count == null || count >= (game.minimum ?? 1)
                const inner = (
                  <>
                    <p className="font-semibold">{game.title}</p>
                    <p className="mt-1 text-sm text-gray-400">{game.body}</p>
                    <p className="mt-3 text-xs text-gray-500">
                      {count == null
                        ? 'Uses your selected contender source'
                        : ready
                          ? game.availabilityLabel?.(count) ?? `${count} eligible sources`
                          : `Needs at least ${game.minimum}; ${count} eligible`}
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
