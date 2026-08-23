import PageHeader from '../components/PageHeader'
import HubCard from '../components/HubCard'

// A quiz type shown as a card on the hub. This section is for quizzes over the
// LIBRARY only — study drills live in their own section (Japanese, English,
// Programming each own theirs).
const QUIZZES = [
  {
    to: '/quiz/song',
    title: 'Song Quiz',
    desc: 'A random anime opening or ending plays — guess which anime it belongs to from 4 options. Classic, arcade and reverse modes.'
  },
  {
    to: '/quiz/character',
    title: 'Character Quiz',
    desc: 'A character portrait appears — name the title they belong to.'
  },
  {
    to: '/quiz/va',
    title: 'Voice Actor Quiz',
    desc: 'Match characters with their Japanese voice actors — both directions, straight from your credit graph.'
  },
  {
    to: '/quiz/synopsis',
    title: 'Synopsis Quiz',
    desc: 'A description excerpt appears — guess which title in your library it describes.'
  },
  {
    to: '/quiz/panels',
    title: 'Manga Panels',
    desc: 'A random page from one of your locally-linked manga appears — name the series.'
  },
  {
    to: '/quiz/tournament',
    title: 'Tournament',
    desc: 'World-cup bracket over your library — songs, characters, anime or people go head-to-head until one champion remains.'
  }
]

export default function QuizLandingPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader title="Quiz" subtitle="Test yourself on the media in your library." />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {QUIZZES.map((q) => (
          <HubCard key={q.to} to={q.to} title={q.title} body={q.desc} />
        ))}
      </div>
    </div>
  )
}
