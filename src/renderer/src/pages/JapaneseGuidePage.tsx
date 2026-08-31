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
        name: 'Tutor',
        to: '/japanese/tutor',
        text: 'The page to open first. It turns your live review load, retention, course frontier, local media, and recent skill checks into one sixty-minute prescription. Its five phases describe the complete route to independent manga, visual novels, and anime. Recommendations never lock a later lesson or tool.'
      },
      {
        name: 'Roadmap',
        to: '/japanese/roadmap',
        text: 'Every course in study order, 26 steps N5 → N1. "You are here" marks the first course with lessons left. Nothing is locked — jump wherever you like. The strip up top is the daily loop (reviews, lesson, immersion — a bit of each, in parallel), and Milestones track finished anime and books against the long-term targets. Decks you or the app generated sit under Unscheduled.'
      },
      {
        name: 'Lessons',
        text: 'Read the grammar body or the card table, then mark the lesson learned. Nothing enters reviews until you do — that gate is the whole point, so mark it when you actually understand it. The end-of-lesson check runs before marking.'
      },
      {
        name: 'Review',
        to: '/japanese/review',
        text: 'The SRS. Again resets the card, Hard shortens the next gap, Good keeps the schedule, Easy stretches it. Grade honestly; the numbers under the buttons are the real next intervals. Do these before anything else. A big backlog? Cap the session on the setup screen — nothing gets postponed, the rest simply stay due.'
      },
      {
        name: 'Ghost reviews',
        text: 'A lapsed card echoes into future sessions until you answer it right 3 times — extra reps without touching the real schedule. On by default; toggle it on the review setup. Echoes wear an "echo" chip and grade Missed / Got it.'
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
        name: 'Sound foundation',
        to: '/japanese/phonology',
        text: 'Eight offline units on mora timing, long vowels, small っ, ん, devoicing, particle readings, pitch, and connected speech. Generated beats teach timing; the checks measure sound-system decisions without pretending to grade your accent.'
      },
      {
        name: 'Kana drill',
        to: '/japanese/kana',
        text: 'Pick rows, type romaji. Checks every keystroke, so a right answer advances on its own; a wrong one shows か = ka in warning text and waits while you fix it. Enter on an empty box reveals; Enter again skips and brings it back later. Endless — Stop when done. Grind one row until automatic, then add the next.'
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
        name: 'Listening',
        to: '/japanese/listen',
        text: 'Guided mode picks recordings made only of known words or exactly one new word: choose the meaning before seeing the transcript, then shadow and compare your take with the native audio. Dictation remains as the second tab and grades readings, so kanji or kana both count. Needs the sentence-audio pack.'
      },
      {
        name: 'Long-form listening',
        to: '/japanese/immersion',
        text: 'A ladder over locally attached anime files opened in your system player: cold pass, Japanese-subtitle pass, focused transcript work, shadowing, and a retell. NaviHUB keeps the exact seek range visible while you pause at its boundary. Start with a known two-minute scene and grow toward a full cold episode.'
      },
      {
        name: 'Controlled output',
        to: '/japanese/output',
        text: 'Thirty prompts across sentence building, transformation, response, role-play, retelling, and reasoned writing. Produce before revealing the model, repair your answer, then self-rate independence. The deterministic check only detects required language signals and says so.'
      },
      {
        name: 'Branching role-play',
        to: '/japanese/roleplay',
        text: 'Twelve authored offline conversations spanning everyday repairs, travel and health situations, workplace negotiation, interviews, academic disagreement, and client recovery. Produce each turn before seeing the natural paths; your choice changes the next turn. The check detects required language functions and never claims to judge every valid answer.'
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
        name: 'Confusables',
        to: '/japanese/confusables',
        text: 'Three tabs, one skill: pick the right kanji among computed look-alikes（末/未）, the right half of a transitivity pair inside a real sentence（開く/開ける — watch the を/が）, and the right spelling of a homophone（かえる ×4）. The wrong options are the ones you would actually pick.'
      },
      {
        name: 'Loanwords',
        to: '/japanese/loanwords',
        text: 'ミシン is "machine", アルバイト is German. Recognizing drifted katakana is a skill nobody drills — this does. Needs JMdict.'
      },
      {
        name: 'Keigo',
        to: '/japanese/kana?tab=keigo',
        text: 'Plain verb → 尊敬語/謙譲語/丁寧語, typed. The suppletives（行く→いらっしゃる・参る）are memorized; regular verbs train お〜になる／お〜する.'
      },
      {
        name: 'Speak (pitch)',
        to: '/japanese/pitch?tab=speak',
        text: 'Say the word into the mic; your pitch curve lands on the target pattern — local signal processing, nothing leaves the machine. Shape check only: it can hear your pitch, not your consonants.'
      },
      {
        name: 'Leech drill',
        to: '/japanese/stats',
        text: 'From the stats page: grind your stuck cards without touching their schedule, and see "possibly confused" pairs the app detected from your own lapses.'
      },
      {
        name: 'Writing drill',
        to: '/japanese/write',
        text: 'Draw the kanji from its meaning and readings. Strokes are checked in order — start point and direction, not neatness. Three misses on one stroke reveals it and moves on. Scope it to one lesson, pick a round size, and leave "group by shared component" on so 待 arrives right after 持. Needs the stroke-order pack (grouping also wants the components pack).'
      },
      {
        name: 'Quiz',
        to: '/japanese/quiz',
        text: 'Multiple choice over learned cards, four directions (meaning, reading, production, cloze). Lower stakes than reviews and it doesn’t touch scheduling — use it as a warm-up.'
      },
      {
        name: 'JLPT test',
        to: '/japanese/test',
        text: 'A timed ~30-question checkpoint built from the offline packs: levelled grammar cloze, vocabulary from the level’s frequency band, kanji readings gated by KANJIDIC, and bank sentences to translate. Per-section scores at the end. Without the packs it falls back to sampling your own seeded courses — which measures this app’s curriculum, not the level, and says so. Thirty items certify nothing either way.'
      }
    ]
  },
  {
    title: 'Games',
    entries: [
      {
        name: 'Sentence games',
        to: '/japanese/sentences',
        text: 'Three drills built from the sentence bank on the fly, so the pool never runs dry. Particle fill blanks one particle and offers four — never one that would also be right, so は/が is a real question rather than a coin toss. Scramble hands you the sentence in chunks: it checks against the ORIGINAL order, and a different order may still be grammatical. Reading in context highlights one kanji word to type; every reading JMdict attests is accepted. Needs the sentence bank; the reading tab also needs JMdict.'
      },
      {
        name: 'Arcade',
        to: '/japanese/arcade',
        text: 'Sixty seconds, one prompt at a time: kana, kanji readings (your cards, frequent words, or both), or conjugation. The record is how many you get RIGHT in the minute, not your accuracy — hesitating to protect a percentage does not pay here.'
      },
      {
        name: 'Shiritori',
        to: '/japanese/shiritori',
        text: 'Word chain against the dictionary — your word must start with the last kana of its word, ん loses. Every app reply comes glossed, so losing is still studying.'
      }
    ]
  },
  {
    title: 'Reading & mining',
    entries: [
      {
        name: 'Graded reading',
        to: '/japanese/reading',
        text: 'Forty-two connected passages from N5 to N1, with furigana you can switch off, a glossary, and four questions apiece. Prompts are English at N5/N4 and Japanese from N3 up. Double-click a paragraph to open the mining panel; the best score per passage is kept.'
      },
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
        name: 'Sentence feed',
        to: '/japanese/feed',
        text: 'Sentences from the bank where you know every word except one — comprehensible input on tap, and the unknown is one click from your deck. Recomputes as you learn; flood mode drops the unknown entirely for pure reading reps.'
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
        text: 'Review heatmap, streak, grade mix, true retention (strict counts only Good/Easy — the honest number), a 7/14/30-day due forecast, and the Journey block — your whole run, derived automatically, never hand-logged.'
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
        text: 'Native recordings for guided listening, shadowing, dictation and Play buttons on examples. Thousands of small downloads — start it and walk away; interrupting is safe, re-running resumes.'
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
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <PageHeader
        back={{ to: "/japanese", label: "Japanese" }}
        title="Guide"
        subtitle="What everything in this section is for."
        className="mb-6"
      />

      <div className="grid min-w-0 gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          <nav className="card p-4" aria-label="Japanese guide contents">
            <p className="text-sm font-semibold text-white">Guide contents</p>
            <div className="mt-3 flex flex-wrap gap-1 lg:flex-col">
              <GuideJump id="jp-guide-day" label="A day" />
              {GROUPS.map((group) => (
                <GuideJump key={group.title} id={guideId(group.title)} label={group.title} />
              ))}
            </div>
          </nav>
        </aside>

        <div className="min-w-0">
          <div id="jp-guide-day" className="scroll-mt-6">
            <Section title="A day">
              <div className="card p-4">
                <ol className="list-inside list-decimal space-y-1 text-sm text-gray-300">
                  <li>Clear due reviews and stay inside the daily new-card budget.</li>
                  <li>Listen for ten minutes: guided sentences early, local video from Step 10.</li>
                  <li>Read for twenty minutes and mine only recurring or scene-critical language.</li>
                  <li>Produce one controlled response, compare it, and repair it.</li>
                  <li>Use the final five minutes for a lesson only when the unseen backlog is clear.</li>
                </ol>
                <dl className="mt-4 space-y-3">
                  <div>
                    <dt className="font-medium">One hour</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-gray-400">
                      Use 15 minutes for review, 10 listening, 20 reading, 10 controlled output, and 5
                      for the next lesson or the weakest measured skill. Short on time? Keep review,
                      listening, and reading; the lesson keeps.
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Starting out (kana done)</dt>
                    <dd className="mt-0.5 text-sm leading-relaxed text-gray-400">
                      Install the core packs first (the Set up list on the Japanese page), keep the kana
                      drill in rotation until reading it is automatic, and start Step 01 at ~10 new cards
                      a day. Reading starts week one, not after grammar — the sentence feed works from
                      your very first learned words, and around Step 03 an easy manga plus its Vocab deck
                      takes over.
                    </dd>
                  </div>
                </dl>
              </div>
            </Section>
          </div>

          {GROUPS.map((group) => (
            <div key={group.title} id={guideId(group.title)} className="scroll-mt-6">
              <Section title={group.title}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function guideId(title: string): string {
  return `jp-guide-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`
}

function GuideJump({ id, label }: { id: string; label: string }) {
  return (
    <button
      type="button"
      className="rounded px-2 py-1.5 text-left text-sm text-gray-400 hover:bg-base-700 hover:text-white"
      onClick={() => document.getElementById(id)?.scrollIntoView({ block: 'start' })}
    >
      {label}
    </button>
  )
}
