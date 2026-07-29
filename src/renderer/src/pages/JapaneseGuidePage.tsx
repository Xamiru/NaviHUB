import { Link } from 'react-router-dom'

// A crib sheet for this section: what each feature is and when to use it.
// Static text on purpose — it's a reference, not a tour.

interface Entry {
  name: string
  to?: string
  text: string
}

const GROUPS: { title: string; entries: Entry[] }[] = [
  {
    title: 'The path',
    entries: [
      {
        name: 'Roadmap',
        to: '/japanese/roadmap',
        text: 'Every course in study order, 24 steps N5 → N1. "You are here" marks the first course with lessons left. Nothing is locked — jump wherever you like. Decks you or the app generated sit under Unscheduled.'
      },
      {
        name: 'Lessons',
        text: 'Read the grammar body or the card table, then mark the lesson learned. Nothing enters reviews until you do — that gate is the whole point, so mark it when you actually understand it. The end-of-lesson check runs before marking.'
      },
      {
        name: 'Review',
        to: '/japanese/review',
        text: 'The SRS. Again resets the card, Hard shortens the next gap, Good keeps the schedule, Easy stretches it. Grade honestly; the numbers under the buttons are the real next intervals. Do these before anything else.'
      },
      {
        name: 'Typed answers',
        text: 'A toggle on the review setup screen. Grammar cards blank out the point and you type it; vocab cards ask for the word or its reading. It only suggests a grade — you still pick. Cards that can’t be typed just flip as usual.'
      },
      {
        name: 'Leeches',
        to: '/japanese/stats',
        text: 'Bottom of the stats page: cards you’ve failed 6+ times. Reviewing them unchanged is wasted effort — rewrite the card, or Reset it for a clean run (history is kept).'
      }
    ]
  },
  {
    title: 'Practice',
    entries: [
      {
        name: 'Kana drill',
        to: '/japanese/kana',
        text: 'Pick rows, type romaji. Checks every keystroke, so a right answer advances on its own; a wrong one shows か = ka in red and waits while you fix it. Enter on an empty box reveals; Enter again skips and brings it back later. Endless — Stop when done. Grind one row until automatic, then add the next.'
      },
      {
        name: 'Kanji readings',
        to: '/japanese/kana',
        text: 'Same drill over a kanji course. Any correct reading counts — on’yomi, kun’yomi or a radical name, in kana or romaji.'
      },
      {
        name: 'Conjugation dojo',
        to: '/japanese/kana',
        text: 'Word → target form, you produce it. Reading teaches you to recognise forms; this makes recognition instant.'
      },
      {
        name: 'Writing drill',
        to: '/japanese/write',
        text: 'Draw the kanji from its meaning and readings. Strokes are checked in order — start point and direction, not neatness. Three misses on one stroke reveals it and moves on. Needs the stroke-order pack.'
      },
      {
        name: 'Quiz',
        to: '/japanese/quiz',
        text: 'Multiple choice over learned cards, four directions (meaning, reading, production, cloze). Lower stakes than reviews and it doesn’t touch scheduling — use it as a warm-up.'
      },
      {
        name: 'JLPT test',
        to: '/japanese/test',
        text: 'A 30-question timed checkpoint at one level, drawn from every course tagged with it whether or not you’ve learned them. It measures the level, not your progress. 80%+ means you own it.'
      }
    ]
  },
  {
    title: 'Reading & mining',
    entries: [
      {
        name: 'Dictionary',
        to: '/japanese/dictionary',
        text: 'Offline lookup across everything installed. Handles conjugated forms and English → Japanese. Expand an entry for example sentences, kanji breakdown and stroke diagrams, or mine it straight into a deck.'
      },
      {
        name: 'Mining',
        to: '/japanese/mine',
        text: 'Capturing a word you met into the SRS — the highest-value thing you can do. Three ways in: the manga/book reader (tap a word, keeps the sentence you saw it in), the dictionary, and the mine page. Everything lands in the Mining inbox unless you pick another lesson.'
      },
      {
        name: 'Comprehension',
        to: '/japanese/coverage',
        text: 'Scan a manga or light novel from its own text and see what share of its words you know. Scores update themselves as you learn — only rescan when a series gains chapters. Use the list to pick what to read next.'
      },
      {
        name: 'Analyze text',
        to: '/japanese/analyze',
        text: 'The same thing for anything you paste. Words are coloured by whether you know them; click any one to mine it.'
      },
      {
        name: 'Prep deck',
        text: 'On a manga/book detail page: builds a vocab course from that series’ most frequent words you don’t know yet. Learn it, then go read that book.'
      },
      {
        name: 'Core deck',
        to: '/japanese',
        text: 'The next N most common words in the language you don’t have. Run it again later and it picks up where the last one stopped. Needs a frequency dictionary.'
      },
      {
        name: 'Stats',
        to: '/japanese/stats',
        text: 'Review heatmap, streak, grade mix and what’s coming due over the next fortnight. Check the forecast before starting a big new deck.'
      }
    ]
  },
  {
    title: 'Data packs (Settings → Japanese dictionaries)',
    entries: [
      {
        name: 'JMdict',
        text: 'The dictionary itself. Install this first — lookups, mining autofill and both deck generators need it.'
      },
      { name: 'KANJIDIC', text: 'Per-kanji readings, meanings and stroke counts for the kanji breakdown.' },
      {
        name: 'Frequency (JPDB / BCCWJ)',
        text: 'How common each word is. Adds rank badges, orders prep decks better, and unlocks core decks.'
      },
      {
        name: 'Example sentences (Tatoeba)',
        text: 'Real sentences per word. Shows usage in the dictionary and fills examples on mined and generated cards. Takes a minute to index.'
      },
      {
        name: 'Stroke order (KanjiVG)',
        text: 'Animated stroke diagrams, and the writing drill. Without it the diagrams simply don’t appear.'
      }
    ]
  }
]

export default function JapaneseGuidePage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6">
        <Link to="/japanese" className="text-sm text-gray-500 hover:text-white">
          ← Japanese
        </Link>
        <h1 className="mt-1 text-2xl font-semibold">Guide</h1>
        <p className="mt-1 text-sm text-gray-400">What everything in this section is for.</p>
      </div>

      <div className="card mb-8 p-4">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-500">
          A day
        </h2>
        <ol className="list-inside list-decimal space-y-1 text-sm text-gray-300">
          <li>Clear your reviews.</li>
          <li>Learn the next lesson on the roadmap, if you have the attention for it.</li>
          <li>Read something and mine what you don&apos;t know. This is the part that matters.</li>
        </ol>
      </div>

      {GROUPS.map((group) => (
        <section key={group.title} className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
            {group.title}
          </h2>
          <dl className="space-y-4">
            {group.entries.map((e) => (
              <div key={e.name}>
                <dt className="font-medium">
                  {e.to ? (
                    <Link to={e.to} className="hover:text-accent">
                      {e.name}
                    </Link>
                  ) : (
                    e.name
                  )}
                </dt>
                <dd className="mt-0.5 text-sm leading-relaxed text-gray-400">{e.text}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  )
}
