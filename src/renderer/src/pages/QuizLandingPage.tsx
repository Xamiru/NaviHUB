import PageHeader from '../components/PageHeader'
import HubCard from '../components/HubCard'
import { Link } from 'react-router-dom'

// A quiz type shown as a card on the hub. This section is for quizzes over the
// LIBRARY only — study drills live in their own section (Japanese, English,
// Programming each own theirs).
const QUIZZES = [
  {
    to: '/quiz/song',
    title: 'Song Quiz',
    signal: 'Audio',
    desc: 'A random anime opening or ending plays — guess which anime it belongs to from 4 options. Classic, arcade and reverse modes.'
  },
  {
    to: '/quiz/character',
    title: 'Character Quiz',
    signal: 'Images',
    desc: 'A character portrait appears — name the title they belong to.'
  },
  {
    to: '/quiz/va',
    title: 'Voice Actor Quiz',
    signal: 'Connections',
    desc: 'Match characters with their Japanese voice actors — both directions, straight from your credit graph.'
  },
  {
    to: '/quiz/synopsis',
    title: 'Synopsis Quiz',
    signal: 'Text',
    desc: 'A description excerpt appears — guess which title in your library it describes.'
  },
  {
    to: '/quiz/panels',
    title: 'Manga Panels',
    signal: 'Local pages',
    desc: 'A random page from one of your locally-linked manga appears — name the series.'
  },
  {
    to: '/quiz/tournament',
    title: 'Tournament',
    signal: 'Bracket',
    desc: 'World-cup bracket over your library — songs, characters, anime or people go head-to-head until one champion remains.'
  }
]

export default function QuizLandingPage() {
  const day = Math.floor(Date.now() / 86_400_000)
  const daily = QUIZZES[day % (QUIZZES.length - 1)]
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Challenge broadcast"
        subtitle="A rotating daily format turns your own local library into the signal."
        actions={
          <Link to={daily.to} className="btn-primary">
            Accept daily challenge
          </Link>
        }
      />

      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <section className="card-glow relative min-h-[360px] overflow-hidden p-7 sm:p-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgb(var(--accent)/0.14),transparent_22rem)]" />
          <div className="relative flex h-full flex-col">
            <span className="chip w-max border border-accent/20 bg-black/30 text-accent">
              Daily challenge / {daily.signal}
            </span>
            <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              {daily.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-gray-300">{daily.desc}</p>
            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              <div className="rounded-md border border-base-600 bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Source</p>
                <p className="mt-2 text-sm font-medium">Your library only</p>
              </div>
              <div className="rounded-md border border-base-600 bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Input</p>
                <p className="mt-2 text-sm font-medium">Keyboard ready</p>
              </div>
              <div className="rounded-md border border-base-600 bg-black/20 p-4">
                <p className="text-[10px] uppercase tracking-wider text-gray-500">Rotation</p>
                <p className="mt-2 text-sm font-medium">Changes daily</p>
              </div>
            </div>
            <Link to={daily.to} className="btn-ghost mt-auto self-start px-6">
              Start challenge
            </Link>
          </div>
        </section>

        <aside className="card p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
            Quick play
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {QUIZZES.map((q) => (
              <Link
                key={q.to}
                to={q.to}
                className="rounded-md border border-base-700 p-4 transition-colors hover:border-accent hover:bg-base-700/50"
              >
                <p className="text-[10px] uppercase tracking-wider text-accent">{q.signal}</p>
                <p className="mt-1 text-sm font-medium">{q.title}</p>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-7 grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {QUIZZES.map((q) => (
          <HubCard key={q.to} to={q.to} title={q.title} body={q.desc} meta={q.signal} />
        ))}
      </div>
    </div>
  )
}
