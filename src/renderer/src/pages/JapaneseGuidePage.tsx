import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Section from '../components/Section'

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
        text: 'Every course in study order, 24 steps N5 → N1. "You are here" marks the first course with lessons left. Nothing is locked — jump wherever you like. The strip up top is the daily loop (reviews, lesson, immersion — a bit of each, in parallel), and Milestones track finished anime and books against the long-term targets. Decks you or the app generated sit under Unscheduled.'
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
        name: 'Numbers & counters',
        to: '/japanese/kana?tab=numbers',
        text: 'Generated numbers, times, dates, prices and counter phrases, typed as you hear them in your head. さんぼん and ろっぴゃく only stick through reps. Endless, no download.'
      },
      {
        name: 'Name readings',
        to: '/japanese/kana?tab=names',
        text: 'Random surnames and given names from the names dictionary — any attested reading counts. Names are the reading trap manga sets for you. Needs the JMnedict pack.'
      },
      {
        name: 'Pitch accent',
        to: '/japanese/pitch',
        text: 'Two halves: see a word and pick its contour (Kanjium pack), and the kotu-style minimal pairs — hear a recording, say which of two contours it was (pairs pack). Optional per TheMoeWay, decisive if you care how you sound.'
      },
      {
        name: 'Dictation',
        to: '/japanese/listen',
        text: 'A native Tatoeba recording plays; type what you heard. Graded on readings, so kanji or kana both count — the per-character diff is the real feedback. Needs the sentence-audio pack.'
      },
      {
        name: 'Grammar drill',
        to: '/japanese/grammar/quiz',
        text: 'A real sentence with its grammar point blanked; pick what fills it from four. Runs over the N5-N1 catalog, not your cards — good for meeting points before the roadmap reaches them.'
      },
      {
        name: 'Build-a-kanji',
        to: '/japanese/kanji/quiz',
        text: 'The kanji is shown; assemble it from component chips (decoys included). Production beats recognition for telling 待 from 持 apart. Needs the components pack.'
      },
      {
        name: 'Shiritori',
        to: '/japanese/shiritori',
        text: 'Word chain against the dictionary — your word must start with the last kana of its word, ん loses. Every app reply comes glossed, so losing is still studying.'
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
        text: 'Offline lookup across everything installed. Handles conjugated forms and English → Japanese. Expand an entry for example sentences, kanji breakdown and stroke diagrams, or mine it straight into a deck. Name-only matches group under a collapsed Names row so they never bury real words.'
      },
      {
        name: 'Grammar library',
        to: '/japanese/grammar',
        text: 'Every JLPT grammar point with formation and real examples, offline. Search it when a lesson name-drops a form you half-remember; filter by level before a test. Needs the grammar pack.'
      },
      {
        name: 'Kanji by parts',
        to: '/japanese/kanji',
        text: 'Saw a kanji you can’t type? Toggle the pieces you can see and watch the grid narrow. Click a match to land in the dictionary. Needs the components pack.'
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
      },
      {
        name: 'Kanjium pitch accents',
        text: 'Pitch contours on dictionary entries and the pattern quiz. 3 MB; the app already knew how to draw them, this is the data.'
      },
      {
        name: 'Kanji components (KRADFILE)',
        text: 'Kanji → parts. Powers the components row in the kanji breakdown, the by-parts search and build-a-kanji.'
      },
      {
        name: 'Grammar points (N5–N1)',
        text: 'The grammar library and its drill. Tiny download, whole reference.'
      },
      {
        name: 'Names (JMnedict)',
        text: 'People and places. Lookups that used to come back empty now say "it’s a surname" — grouped under Names so they never bury real words. Big import, worth it if you read manga.'
      },
      {
        name: 'Sentence audio (Tatoeba)',
        text: 'Native recordings for dictation and Play buttons on examples. Thousands of small downloads — start it and walk away; interrupting is safe, re-running resumes.'
      },
      {
        name: 'Minimal pairs (kotu)',
        text: 'The pitch perception drill’s audio. 18 MB of very short clips.'
      }
    ]
  }
]

export default function JapaneseGuidePage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Guide"
        subtitle="What everything in this section is for."
        className="mb-6"
      />

      <Section title="A day">
        <div className="card p-4">
          <ol className="list-inside list-decimal space-y-1 text-sm text-gray-300">
            <li>Clear your reviews.</li>
            <li>Learn the next lesson on the roadmap, if you have the attention for it.</li>
            <li>Read something and mine what you don&apos;t know. This is the part that matters.</li>
          </ol>
        </div>
      </Section>

      {GROUPS.map((group) => (
        <Section key={group.title} title={group.title}>
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
        </Section>
      ))}
    </div>
  )
}
