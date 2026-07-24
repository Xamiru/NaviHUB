import { Link } from 'react-router-dom'

// A quiz type shown as a card on the hub. Add entries here as new quizzes land.
const QUIZZES = [
  {
    to: '/quiz/song',
    icon: '🎵',
    title: 'Song Quiz',
    desc: 'A random anime opening or ending plays — guess which anime it belongs to from 4 options.'
  },
  {
    to: '/japanese/quiz',
    icon: 'あ',
    title: 'Japanese Quiz',
    desc: 'Multiple choice over the lessons you have marked as learned — vocab, kanji and grammar.'
  },
  {
    to: '/quiz/tournament',
    icon: 'VS',
    title: 'Tournament',
    desc: 'World-cup bracket over your library — songs, characters, anime or people go head-to-head until one champion remains.'
  }
]

export default function QuizLandingPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quiz</h1>
        <p className="text-sm text-gray-500">Test yourself on the media in your library.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {QUIZZES.map((q) => (
          <Link key={q.to} to={q.to} className="card p-5 hover:border-accent transition-colors group">
            <div className="text-3xl mb-3">{q.icon}</div>
            <p className="text-lg font-semibold group-hover:text-accent">{q.title}</p>
            <p className="mt-1 text-sm text-gray-500">{q.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
