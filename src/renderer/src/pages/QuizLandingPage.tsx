import PageHeader from '../components/PageHeader'
import HubCard from '../components/HubCard'

// A quiz type shown as a card on the hub. Add entries here as new quizzes land.
const QUIZZES = [
  {
    to: '/quiz/song',
    title: 'Song Quiz',
    desc: 'A random anime opening or ending plays — guess which anime it belongs to from 4 options.'
  },
  {
    to: '/japanese/quiz',
    title: 'Japanese Quiz',
    desc: 'Multiple choice over the lessons you have marked as learned — vocab, kanji and grammar.'
  },
  {
    to: '/japanese/pitch',
    title: 'Pitch Accent',
    desc: 'See a word and pick its pitch contour, or hear a recording and pick which contour was said.'
  },
  {
    to: '/japanese/grammar/quiz',
    title: 'Grammar Drill',
    desc: 'A real sentence with the grammar point blanked out — pick what fills the blank, N5 to N1.'
  },
  {
    to: '/japanese/listen',
    title: 'Dictation',
    desc: 'A native recording plays — type what you heard, then compare against the transcript.'
  },
  {
    to: '/quiz/tournament',
    title: 'Tournament',
    desc: 'World-cup bracket over your library — songs, characters, anime or people go head-to-head until one champion remains.'
  },
  {
    to: '/quiz/programming',
    title: 'Programming Quiz',
    desc: "Multiple choice over the Programming section — the courses' own questions, or which command does what."
  },
  {
    to: '/programming/practice',
    title: 'CLI Typing Drill',
    desc: 'Read the task, type the command. Checked as you type; misses come back around until you stop.'
  }
]

export default function QuizLandingPage() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Quiz"
        subtitle="Test yourself on the media in your library, and on what you are learning."
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
        {QUIZZES.map((q) => (
          <HubCard key={q.to} to={q.to} title={q.title} body={q.desc} />
        ))}
      </div>
    </div>
  )
}
