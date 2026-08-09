# The learning verticals

Judged as learning tools, not as code. Where a claim is pedagogical I've tied it to a line, because
"this doesn't teach well" is worthless without the mechanism.

Headline verdict up front:

- **Japanese** is a real tool for the curriculum/SRS half and for isolated skill drills, and closer
  to a toy for the one question the user actually cares about — *can I read this yet*. The reason is
  specific and fixable: the definition of "known" is wrong in both directions at once.
- **English** has unusually good hand-authored content and an unusually weak generated layer. The
  test-first premise is right; the frequency source it rests on is not.
- **Programming** — see below.

---

## Japanese

### The scheduler is a faithful Anki clone with three real gaps

`@shared/srs.ts` is a correct SM-2/Anki implementation — learning steps `[1, 10]`, relearn `[10]`,
ease floor 1.3, `hard` ×1.2 with −0.15 ease, `easy` +0.15 with a 1.3 bonus, `capDays`'s
`max(interval+1, …)` monotonicity guard. All of that matches Anki's defaults and is tested. The gaps:

**Reviews ignore how late they were.**
`high` | `verified` | `src/shared/srs.ts:65`, `src/main/repos/japaneseRepo.ts:569-579`

`gradeCard(state, grade)` receives status, learningStep, intervalDays, ease, reps and lapses — and
nothing about the due date or elapsed days. A card 8 days overdue and a card 80 days overdue are
scheduled identically. CLAUDE.md's backlog-cap note ("SM-2 handles lateness natively — NO
postponement writes") and the comment right above the feature (`JapaneseReviewPage.tsx:61-63`) both
assert the opposite of what the code does. Real Anki adds an overdue bonus for exactly this case;
without it, every backlog you clear under-grows its intervals and comes back sooner than it should.
Fix: pass elapsed days in and use `max(intervalDays, elapsedDays)` as the multiplier base for
`good`/`easy`. Then the comment becomes true.

**No interval fuzz, in an app that introduces cards in batches.**
`med` | `verified` | `src/shared/srs.ts:104-123`

Every branch returns a deterministic interval; `capDays` only clamps. Anki fuzzes ±5-25% precisely so
a cohort introduced together doesn't stay a cohort forever. This app introduces in cohorts *by
design* — `buildCoreDeck` dumps 500 words, `buildPrepDeck` 100, and `setLessonLearned` flips a whole
lesson at once. The review page's `dueCap` pill (`JapaneseReviewPage.tsx:64`) is a workaround for a
problem one line of arithmetic would remove.

**A lapse drops a mature card to one day.**
`low` | `verified` | `src/shared/srs.ts:94-103`

`again` on a review card sets `intervalDays: 1` flat. A 200-day card missed once needs ~10 successful
reviews to climb back. This *is* Anki's default (new interval 0%) — it is also the thing every
modern scheduler changed. `max(1, round(intervalDays * 0.4))` is the standard remedy.

**Learning-step misses are invisible to every "problem card" surface.**
`med` | `verified` | `src/shared/srs.ts:74-75` vs `:99`

`again` on a card that hasn't graduated resets the step but never increments `lapses`; only a
review-state `again` does (`:99`). So a card you failed twelve times before it ever graduated reports
`lapses = 0` forever. `listLeeches` (`japaneseRepo.ts:401-428`, `LEECH_LAPSES = 6`) and the confusable-pair
detector (`jpConfusables.ts:14`, `LAPSE_FLOOR = 3`) both read only `lapses`, so the cards that were
hardest to learn are exactly the ones leech detection cannot see.

**Ghosts are invisible to it too.**
`med` | `verified` | `src/main/repos/japaneseRepo.ts:482-499,605-611`

A ghost answered wrong resets to `GHOST_STEPS` and can echo forever, but writes nothing to
`jp_review_log` and never touches `lapses` again. The stats-purity tradeoff is documented and
defensible — but the consequence is that a card you demonstrably cannot get right, failing every echo
indefinitely, never appears in the one list built for that situation. A ghost-fail counter that the
leech query also reads would fix it without touching retention math.

**Relearning "Easy" is a no-op.**
`low` | `verified` | `src/shared/srs.ts:83,88`

Both `good` and `easy` on a relearning card call `graduate(s, s.intervalDays)`, so Easy produces a
byte-identical interval and ease to Good — no bonus, no ease bump. The fresh-card path *does*
distinguish them (`GRADUATING_DAYS` 1 vs `EASY_DAYS` 4) and there is no relearning-Easy test, which
suggests an unexamined gap rather than a decision. Either give it a bonus or disable the button while
relearning, so it stops implying a reward that isn't there.

### "Known" is wrong in both directions, and everything downstream inherits it

This is the finding that matters most, because three separate features rest on it.

`coverageRepo.TIER_CTE` (`src/main/repos/coverageRepo.ts:28-37`) defines `known` as: a card exists
with this exact front **and** its lesson is `learned = 1` **and** the card reached `status = 'review'`.

**Too strict** (`high` | `verified`): there is no representation of words you knew before the app
existed. A learner who can already read N5 vocabulary but has 40 cards is told they understand 3% of a
series they can mostly follow. `coverageList()`'s "what can I read next" ordering (`:243`) inherits
the same bias, and so does `jpFeed`, whose known set is the same query (`jpFeed.ts:213`).

**Too loose** (`med` | `verified`): `status = 'review'` is reached after two correct presses about
eleven minutes apart (`LEARNING_STEPS_MIN = [1, 10]`, `GRADUATING_DAYS = 1`). A card graduated eleven
minutes ago counts exactly like one reviewed successfully for a year. So the moment a deck *does*
start graduating, coverage over-promises — and the jpdb-style projection ("learn the top 20 → 94%",
`coverageRepo.ts:129-163`), which is a genuinely good feature, promises a tadoku-threshold reading
experience the deck hasn't earned.

**And the i+1 feed is structurally empty for a beginner** (`high` | `verified` |
`src/main/jpFeed.ts:113`): a sentence survives only when `unknowns.length === 1`. With a small deck
almost every Tatoeba sentence has three to eight unknown content words, so the flagship
"comprehensible input on tap" page does nothing for months — the inverse of when it is needed.

One change fixes all three: a frequency-rank baseline ("assume the top N known", the `freq` table is
already in `dictionaries.db` and `jpFeed` already queries it at `:215-241`) plus an explicit
"I already know this" that writes a `review`-status card, plus a minimum interval or rep count on the
`known` tier. Show the baseline in the UI so the number stays honest.

### The feed also rebuilds after every single review
`med` | `verified` | `src/main/jpFeed.ts:184-192`

`knowledgeFingerprint()` includes `MAX(jp_card.updated_at)`, and `submitReview` writes
`updated_at = datetime('now')` on every grade (`japaneseRepo.ts:584`). One review invalidates the
whole feed cache, so the next visit re-loads every row of `sentence_fts` and re-tokenizes up to 4000
sentences (~2-3 s). Fingerprint on what changes the *known set* — card count, count at
`status='review'`, learned-lesson count — not on `updated_at`.

### Mining: low friction, one ordering bug that quietly defeats it
`high` | `verified` | `src/main/repos/japaneseRepo.ts:644-651` + `:380-389`

The flow itself is good: tap word → tap dictionary result → "+ Add card", 2-4 clicks, and the inbox
lesson is created **already learned** (`:660-661`) so nothing extra is needed. But `ensureMiningInbox`
creates its course at `MAX(sort_order) + 1` — dead last — and `reviewQueue`'s `fresh` query orders by
`c.sort_order ASC` (`:387`). Mined cards therefore queue behind the new cards of **every lesson you
have already marked learned**. At the default `newLimit` of 10/day, marking three lessons learned
(~90 cards) means the word you captured while reading tonight waits nine days.

(Note: the recon overstated this as competing with the entire curriculum. I checked — seeded lessons
insert with `learned` defaulting to 0 (`japaneseSeed.ts:3918`), so only lessons you actually marked
learned compete. The consequence is still real, just bounded by your own pace.)
Fix: give the inbox a fixed low `sort_order`, or introduce mined `new` cards before curriculum ones
regardless of course order. The second is more honest to what mining is *for*.

Two smaller mining gaps:
- **No duplicate blocking** (`med` | `verified` | `japaneseRepo.ts:298-311`): `createCard` does no
  existence check. `MiningPanel`'s green check is a read-only hint from `minedFronts`, never enforced
  at save. Re-mining a word from a later chapter silently creates a second card, and both enter the
  rotation.
- **Audio and image capture are video-only** (`med` | `verified` |
  `MangaReaderPage.tsx:793-799`, `BookReaderPage.tsx:522-529` vs `VideoPlayerPage.tsx:811-819`): the
  readers never pass `attach` to `MiningPanel`, so `jp_card.audio_path`/`image_path` can only be
  filled from video — for a learner whose stated goal is manga and VNs, the primary surface captures
  nothing, even though a page screenshot is the same canvas technique the player already uses.

### Do the drills teach what they claim?

Mostly yes, and with more care than auto-generated quizzes usually get. The distractor machinery
(`@shared/confusables.ts`, `similarKanji.ts`, `jpConfusables.ts`) produces wrong answers that are
*real* confusables — transitivity partners, homophones, component-overlap lookalikes — which is what
keeps them non-gameable. Free-recall drills (keigo, numbers, kana, names, dictation, shiritori) can't
be pattern-matched at all.

The three qualifications worth knowing:

| Drill | Qualification |
| --- | --- |
| Grammar cloze (`JapaneseGrammarQuizPage.tsx:296-298`) | The full English translation sits next to the blank, unconditionally, and can leak concessive-vs-conditional framing without parsing the Japanese. Labelled as a deliberate hint; not toggleable. |
| Pitch — Patterns (`jpDrills.pitchQuizPool`) | For 2-mora words there can be as few as 3 options (`moraCount + 1` positions), so blind-guess odds rise to ~33%. Structural, not exploitable. |
| Practice quiz tier-4 fallback (`JapaneseQuizPage.tsx:72`) | In a small or mixed deck the "anything" fallback can put a grammar-sentence translation next to a short vocab gloss — guessable by shape. Deck-size dependent. |

Transitivity looks defeatable (the が/を particle answers every question) but that generalizable rule
*is* the lesson, and the module says so.

**Grading is honest everywhere I checked.** `dictation.ts:readingsKey` grades on kuromoji reading
keys so kanji and kana both count, with a normalized-text fallback. `strokeMatch.ts:45-77` grades
stroke order/direction/length and explicitly does not attempt shape matching, and says so. And
`shared/typing.ts:90-112`'s invariant — never return `wrong` while any accepted answer is still
reachable by typing more — is a genuinely rigorous piece of design for a per-keystroke drill.

`SpeakDrill` deserves a specific mention: a from-scratch YIN pitch tracker
(`@shared/pitchTrack.ts`) with its limits stated in the module *and surfaced in the UI at the moment
they matter* (`SpeakDrill.tsx:216-219`) — odaka ≡ heiban in isolation, devoiced morae reported as
"unclear" rather than wrong. That is the epistemic standard the rest of the section should be held to.

### Two drills give the answer away by position — measured
`high` | `verified — I measured it` | `src/renderer/src/pages/JapaneseLoanwordsPage.tsx:55`,
`src/renderer/src/components/japanese/LookalikeDrill.tsx:47-48`

Both build their options with the correct answer **first** and then shuffle with
`[...arr].sort(() => Math.random() - 0.5)`. A random comparator does not produce a uniform
permutation. Measured over 200,000 trials in this repo's own Node:

| n | index 0 | index 1 | index 2 | index 3 |
| --- | --- | --- | --- | --- |
| 4 | **35.8%** | 17.1% | 15.8% | **31.3%** |
| 3 | **43.9%** | 18.8% | 37.3% | — |
| 2 | 50.2% | 49.8% | — | — |

In a four-option round the correct answer sits in the first slot **more than twice as often** as in
the third. That is a positional tell a learner absorbs without noticing, in two drills whose entire
purpose is discrimination — and it silently undercuts the careful confusable-distractor work
described above. `tests/englishContent.test.ts` validates answer-position distribution for the
*authored* English content; these runtime shuffles have no equivalent guard.

Six other sites use the same biased sort to shuffle a *pool* rather than answer positions, where the
effect is uneven sampling and not a tell: `JapaneseLoanwordsPage.tsx:46`,
`JapaneseLeechDrillPage.tsx:57`, `MinimalPairsDrill.tsx:142` (its `playedIndex` is a separate uniform
coin flip, so that drill stays fair), `SpeakDrill.tsx:80`, `KeigoDrill.tsx:75`, and
`TransitivityDrill.tsx:49` (n=2 — measured unbiased).

Fix: promote the rng-injectable Fisher-Yates already at `src/shared/bracket.ts:35` to `@shared/` and
use it. The codebase contains 21 further hand-rolled copies of the correct algorithm.

### The one measurement that is cosmetic
`med` | `verified` | `src/renderer/src/pages/JapaneseTestPage.tsx:11-17`

The "JLPT checkpoint test" is 30 multiple-choice items drawn from the app's own seeded courses at that
level, scored "≥80% = you own this level", with a header comment claiming "it measures the level, not
your study progress". It measures the seed deck — which you are simultaneously SRS-ing. Real JLPT is
vocabulary + grammar + reading + listening under time pressure.
Fix: rename it to what it is ("N4 deck check") and drop the verdict, or make the mix resemble the exam
by pulling grammar items from `grammar_point` (already levelled N5-N1) and a reading item from the
sentence bank.

### The walls

- **Week 2** — most of the wave-2/3 breadth (pitch, homophones, loanwords, names, grammar cloze,
  dictation, minimal pairs, the i+1 feed) is gated behind six separately-downloaded packs.
  `SetupChecklist.tsx` handles this well, but skip it and the section is `EmptyState` after
  `EmptyState`.
- **Month 2** — review load compounds with nothing pacing new-card introduction against review
  capacity (`introducedToday` is advisory only, `JapaneseReviewPage.tsx:250-259`), while coverage on
  the actual target manga is still near zero because of the cold-start problem above. Visible SRS
  progress doesn't yet mean "I can read this", which is the stated goal.
- **Month 6** — the ~2,130-card seeded curriculum (24 courses, difficulty 1-24 with no gaps) is close
  to cleared, and "Path clear" is honest about it. Past that the app hands off to un-paced one-shot
  tools: one 500-word core-deck dump, per-book prep decks, neither with a follow-up schedule. Nothing
  models "read book 1, mine as you go, prep-deck book 2" as a repeating loop — and the mining-inbox
  ordering bug deprioritizes immersion vocabulary exactly when the curriculum runs out.

### What's genuinely good

- The seeded curriculum is not filler: 24 courses, difficulty 1-24 with zero gaps, ~2,130
  hand-authored cards, including a `Manga & VN Japanese` course (`japaneseSeed.ts:725-919`) targeting
  the contractions, sentence-final particles and role language that textbooks skip and manga runs on.
  That is directly matched to the stated goal.
- `jpFeed.buildFeed`'s two-phase design correctly reasons about a real trap (base/surface conflation
  in `sentence_fts.keywords`) that would have been very easy to get wrong, and it is regression-tested.
- `SetupChecklist.tsx` mirrors the real Settings predicates for installed-state, explains what each
  pack unlocks, and disappears when done instead of nagging.
- The roadmap genuinely threads the pieces into one path — frontier course, a "Step 00" that
  acknowledges kana as a silent prerequisite, and a three-tile daily loop (review / lesson / immerse).

---

## English

### The frequency source is the wrong corpus for the job
`high` | `verified` | `src/main/dict/enFreq.ts:8-19`

The bands rank a C1 reader's *written* vocabulary gap using hermitdave's OpenSubtitles-2018 list —
spoken dialogue. The recon replayed the app's own `parseFreqLines` + `fetchBandCandidates` against the
real pinned file and the real WordNet data, and the skew is concrete:

| Word | OpenSubtitles rank | Band it lands in |
| --- | --- | --- |
| `furthermore` | 10,190 | advanced (C1) |
| `nonetheless` | 10,782 | advanced |
| `consequently` | 20,178 | advanced |
| `albeit` | 22,611 | advanced |
| `arguably` | 24,109 | advanced/rare boundary |
| `notwithstanding` | 31,809 | **rare / "C2 literary"** |
| `hitherto` | 36,453 | rare |

Ordinary formal connectives that a C1 writer should already be *producing* land in the same tiers as
genuinely obscure vocabulary, because subtitles under-represent formal register. The `<4000`
exclusion floor works correctly at the other end (`gonna` 96, `yeah` 62, `dude` 708 are all correctly
never quizzed). The corpus was never curated as a vocabulary list; it is transcription frequency doing
a job it wasn't built for.
Fix: blend or switch the advanced/rare tiers to a written/academic list (COCA- or Books-derived) so
"formal but common" and "rare and obscure" stop being the same band.

Effective pool sizes are also about half what the band widths imply, once the `en_lemma` join and
`quizzableCandidate` filter run: upper 3,525/6,001 (59%), advanced 7,501/15,001 (50%), rare
8,300/23,738 (35%).

### WordNet's first sense produces real false negatives
`high` | `verified` | `src/main/englishDrills.ts:56-61,155-222`

Every candidate uses `offsets[0]` — WordNet's frequency-of-use first sense, which is not the sense a
modern learner has. Sampled from the live data:

- **`conjunction`** (rank 22,898) resolves to *"the temporal property of two things happening at the
  same time"* — never the grammatical sense the word is famous for.
- **`milestone`** (rank 22,481) resolves to *"stone post at side of a road to show distances"* —
  never the figurative sense.
- **`tart`** (rank 9,560) resolves to the prostitute sense, not the pastry.

A learner who knows the word correctly in its dominant sense is marked *wrong*. And it compounds:
`EnglishSpellingPage.tsx:57-63` and `EnglishVocabQuizPage.tsx:146-152` save the miss into the SRS
deck **with the displayed gloss as its meaning** — so the deck ends up teaching the roadside-marker
definition of `milestone` because you knew the real one.
Fix: at minimum, a curated exclusion list for known first-sense traps; better, skip lemmas whose first
sense's gloss has near-zero lexical overlap with their other senses.

### Synonyms mode can require a rarer word than the prompt
`med` | `verified` | `src/main/englishDrills.ts:129-130`

The answer is picked uniformly from every member of the first synset with no frequency filter.
`hump` (rank 9,607) has the synset `{bulge, bump, hump, swelling, gibbosity, gibbousness, jut,
prominence, protuberance, protrusion, extrusion, excrescence}` — a round on the common word `hump` can
demand `gibbosity`. Worse, the three distractors are ordinary band headwords, so the odd-one-out is
detectable by obscurity alone: a false positive to match the false negative above.
Fix: rank-filter synonym answers to synset members within a band of the prompt.

### The authored content is the best part of this vertical

A full read of all 100 mechanics items, all 12 passages with their 58 questions, and all 14 writing
prompts turned up **one** defect:

| key | file:line | Problem |
| --- | --- | --- |
| `articles-06` | `src/shared/english/mechanics.ts:68` | The explain string's parenthetical *"(collapse is rarely sudden)"* is a non-sequitur about the real world, not about article rules. Every other item's parenthetical is a genuine illustrative example. |

Everything else is sound: genuine C1/C2 discriminations (institutional zero-article, defining vs
non-defining relatives, register-calibrated hedging), internally consistent British usage, and
`articles-08`'s BrE-specific "in hospital" contrast is flagged as BrE in its own explain string. The
passage distractors require having read the passage rather than world knowledge. The writing prompts
are unusually well-targeted — several explicitly require hedging, register control, and *answering*
rather than dismissing a counter-argument.

### But the authored content runs out, and nothing regenerates
`high` | `verified` | `src/renderer/src/pages/EnglishMechanicsPage.tsx:110-115`,
`EnglishReadingPage.tsx:65-81`

`nextQuestion()` reshuffles and re-serves the entire category pool when the deck empties, and
"Endless" mode never introduces anything new. Two consequences:

1. Picking a 12-item category (`boundaries` or `punctuation`) with the 20-question length setting
   **guarantees repeats inside a single round** — pigeonhole.
2. At an hour a day, all 100 mechanics items and all 12 passages (58 questions) are exhausted in days.
   After that, reading comprehension scores converge on a memorised answer key, and no pool weights
   toward items you previously missed — the shuffles are uniform regardless of history.

The content is code, so it only grows when the author edits a file.

### Three pieces of the Japanese SRS were never ported
`med` | `verified` | `src/main/repos/englishRepo.ts:56-267` vs `japaneseRepo.ts`

- **No leech list or drill.** English has only an inline badge during review
  (`EnglishReviewPage.tsx:226-230`); there is no list and no way to drill them.
- **No ghost reviews.** A lapsed English word waits for its next scheduled slot with no near-term echo.
- **No retention, forecast or streak stats.** `srsStats()` (`:171-185`) is four counters against
  Japanese's full `statsDetail`.

Combined with the auto-save-on-miss loop, this matters: a 40k-rank tail word missed once enters the
deck on the same schedule as a word you need, with no leech suspension and no bulk prune — the only
escape is noticing it and deleting it by hand from the dictionary page.

### The LLM grader has three consistency problems
`med` | `verified`

- **No temperature is set** (`src/main/llm.ts:78-93`). Re-grading the same unmodified essay twice can
  produce different scores, while the UI invites you to "watch the rubric climb"
  (`EnglishWritingPage.tsx:263`). Note the nuance the recon missed: for the Anthropic path
  `buildModelParams` sets `thinking: {type:'adaptive'}` (`coachTools.ts:15-18`), which requires
  temperature 1 — so the fix is Gemini-only (`config: { temperature: 0 }`), which is the default
  provider anyway.
- **Nothing records which provider/model graded a submission** (`englishRepo.ts:212-236`,
  `types.ts:2491-2499`). `coach.provider` is user-switchable, so the score history can silently mix
  two graders on one chart.
- **`maxTokens: 2048` with an unbounded submission** (`englishWriting.ts:92-100`). `modelRewrite` and
  `overall` are the last two keys in the required JSON, so a long error-heavy essay — exactly what
  this user produces — truncates *those* first. If the truncated JSON still parses they silently
  default to `''` (`:79-80`) and the UI just renders nothing.

Two more from my own reading of the same file:

- **`clampScore` maps a non-numeric score to 0** (`:42-45`), so a model that emits `"grammar": "8"`
  is persisted as a 0-2 grade with no error. It is the one silent-corruption path in a module that is
  otherwise strict enough to throw on bad output.
- **Corrections are never checked against the submission** (`:62-70`). A hallucinated or paraphrased
  `before` string is rendered to the learner as their own sentence, with a rule attached — the worst
  failure mode available to a tool whose job is telling someone what they wrote wrong. One
  `.filter(c => submission.includes(c.before))` fixes it.

### Verdict per weak spot

| Weak spot | Coverage | Verdict |
| --- | --- | --- |
| Spelling | 12 authored MC items + a separate typed drill | The typed drill (`EnglishSpellingPage`) pulls WordNet band words, **not** the double-consonant / ie-ei / -ance-ence patterns the 12 authored items target. Production practice exists but isn't aimed at the actual error classes. |
| Punctuation | 12 items, recognition only | Thinnest category, despite being named as a weak spot. No production task. |
| Sentence boundaries | 12 items, recognition only | Same. No "rewrite this run-on" anywhere. |
| Articles | 24 strong items | Best covered — arguably over-invested for a C1 comprehender. |
| Confusables | 24 strong items | Well covered for recognition; no production drill. |
| Register | 16 items **+ the writing loop** | The only weak spot with genuine production-plus-feedback, undercut by the grader issues above. |

The honest summary: recognition-only multiple choice covers all five weak spots to varying depth, but
the remediation that actually fixes spelling/punctuation/boundary habits — production with targeted
feedback and a personal error log — exists only for register. And the one place the app *does* collect
a personal error log (`en_writing.feedback`'s corrections array) is never read again.

### What's genuinely good

- 100 mechanics items with one flawed explain string, on a full read. That is a very good hit rate for
  hand-authored assessment content.
- The 12 passages are original and their distractors are text-dependent, not world-knowledge
  guessable.
- `buildFeedbackPrompt`'s system persona (`englishWriting.ts:23`) names the user's actual weak spots
  verbatim inside the grading instructions, and its scoring anchor ("5 = solid B2, 7 = C1, 9+ =
  native-like C2", `:26`) is a real calibration device that partly offsets the temperature problem.
- `quizzableCandidate` (`englishDrills.ts:56-61`) filters proper nouns by reading the *synset's*
  casing rather than the lowercased `en_lemma.lemma` column — a deliberate, non-obvious correctness
  fix, verified against the live data.

---

## Programming

The prose is the best-researched content in the app. The *answer keys* are where the problems are —
and one of them is systemic enough to defeat the whole quiz.

Verification note: the recon ran real `bash`/`awk`/`tr`/`find`/`git` in a sandbox and the app's own
bundled SQLite 3.49.2 (via the project's `ELECTRON_RUN_AS_NODE` trick) rather than reasoning
abstractly, and measured the answer-length statistic by loading the real `PROG_COURSES` through
esbuild. I re-ran the `tr` case myself and it reproduces exactly.

### The correct answer is the longest option in 77% of questions
`high` | `verified` | all six courses

Measured across all 219 `ProgQuestion`s: the marked-correct option is the strict longest of four in
**169 of them**.

| Course | Longest-is-correct | Rate |
| --- | --- | --- |
| docker | 27/30 | 90% |
| git-internals | 28/33 | 85% |
| regex | 22/28 | 79% |
| shell-scripting | 25/34 | 74% |
| go-from-python | 48/65 | 74% |
| sql | 19/29 | 66% |

Some of this is unavoidable — a precise answer often needs more words than a punchy wrong one. At 77%
it stopped being incidental and became a house style. Someone who has never read the lesson can score
well above chance by picking the option with the most qualifying clauses, which is precisely what a
recall test is supposed to prevent. The starkest cases have a 9-char distractor ("It panics") against
a 93-char correct answer (`goCourse.ts:951-959`), or 127 vs 28 (`shellCourse.ts:803-811`).

The fix is mechanical and touches no facts: pad the distractors or trim the correct option.

### Seven cheatsheet answers teach commands that do something else
`high` | `verified` — each one run in a real shell

These matter more than a wrong prose sentence, because the CLI drill *accepts them as correct* and
they are the thing being drilled into muscle memory.

| `cheatsheets.ts` | Accepted answer | What it actually does |
| --- | --- | --- |
| `:180` | `tr -d \r` (unquoted) | Deletes the **letter r** and leaves every carriage return in place. I verified this: `printf 'bar\r\n' \| tr -d \r` outputs `ba` + CR + LF. The exact opposite of "strip carriage returns". |
| `:132` | `awk {print $2}` (unquoted) | Errors out — the shell expands `$2` to empty and splits the program into two arguments; awk reports `unexpected newline or end of string` and exits 1. |
| `:255` | bare `pgrep` | Matches the ~15-char process **name**, not the command line the description promises. `-f` is what makes the description true. |
| `:265` | bare `pkill`, `killall` | Same as above; `killall` additionally requires an exact name match, not a pattern. |
| `:515` | `git status -s` | Never prints the branch line the entry's own description promises — `-b` is required as well. |
| `:197`, `:217` | `find . -name *.log`, `find . -name *.tmp -delete` | The unquoted glob expands before `find` runs, so it silently searches for only the first match and drops every nested one — exit 0, no warning. The `-delete` twin does it with a destructive flag. This contradicts the app's own `shellCourse.ts:336` lesson. |
| `:624` | `docker images ls` | Parses `ls` as a repository filter and lists nothing. |

### Two factual errors in the prose
`high`/`med` | `verified` by the recon (web + docs); one not reproducible here

- **`goCourse.ts:25`** — "`go build ./...` — compile everything; the binary lands in the current
  directory". Per `go help build`, when building multiple packages or a single non-main package, the
  result is **discarded** — it is a compile check. `./...` matches more than one package in any real
  project, including the course's own example layout. `go build .` is what writes a binary.
- **`regexCourse.ts:288` and `:322`** — "Go 1.22 also accepts `(?<name>...)`". The recon checked
  golang/go#58458 and reports it as accepted-but-never-shipped, so `regexp.MustCompile("(?<year>\\d{4})")`
  panics on every released Go version. **I could not verify this locally — there is no Go toolchain on
  this box.** It is a ten-second check on your machine, and worth doing because the false claim is
  baked into a quiz *explanation* (`:322`), which is the one place a learner is being told the "why".
  The marked-correct option is right either way; only the reasoning is at stake.
- Lower priority: `goCourse.ts:1454` teaches `for b.Loop()` as *the* benchmark idiom with no version
  label, though it is a Go 1.24 addition — and every other version-sensitive claim in the course is
  labelled. `b.N` isn't mentioned at all.

Nothing factually wrong was found in the docker, git or SQL prose on a full read.

### Two individually broken questions
`med` | `verified`

- `shellCourse.ts:724-732` — "Which expansion turns `archive.tar.gz` into `archive.tar`?" marks
  `${archive%.*}` correct and `${archive/.gz}` wrong. For the concrete string in the prompt,
  `${archive/.gz}` **also** produces `archive.tar` (`.` isn't special in a glob pattern, and `.gz`
  occurs exactly once, at the end). Two of four options are correct.
- `ProgrammingQuizPage.tsx:76-106` + `cheatsheets.ts:696-750` — in "Which command?" mode scoped to
  the tmux sheet, distractors come from `sheet.entries.map(e => e.cmd)`, which mixes 7 real CLI
  invocations with 12 bare key-chords (`prefix d`, `prefix z`…). The chords were deliberately left
  `answers`-less because "they are keystrokes, not commands" — the quiz generator doesn't know that,
  so a CLI-syntax prompt can draw three chord-shaped options that are eliminable on sight. The code
  already has the right signal (`answers` presence); it just doesn't consult it here.

### The typed drill really does test recall — with one asymmetry
`verified` | `src/renderer/src/pages/CliPracticePage.tsx`

The prompt is the plain-English `desc` and nothing reveals the target until you have either got it
right or already failed, so this is genuine desc→cmd production, not copy-typing. Two details shape
what sticks:

- **Requeue is asymmetric** (`:112`, `onType`/`onEnter`): self-correcting after a miss advances with
  `advance(false)` — no requeue. Only an explicit Enter-to-skip reinserts at positions 3 and 13. So
  "I fumbled the flag order but got there" never comes back, while "I have no idea" does. Defensible
  if fumbles are typos; indistinguishable from a real knowledge gap in the data collected.
- **The reveal is immediate and the requeue is short.** With the answer flashed on a miss and the item
  back within 3-13 questions, a long session can degrade into short-term echo. That interval works
  for kana glyphs (the drill this was ported from); CLI flags are lower-frequency, higher-entropy
  targets where a longer gap would stick better.

### What's missing — all of it from data already being written
`verified`

1. `CliPracticePage.tsx:112` already builds a per-session `missed` set, shows it on the Stop summary,
   and throws it away. Persisting per-`(sheetKey, cmd)` miss counts and biasing `practicePool()`
   toward them is the smallest change that gives repeat visits a point.
2. **`quiz_session.settings` is written and never read** — for `kind:'programming'`
   (`{mode, courseKey, sheetKey, length}`, `ProgrammingQuizPage.tsx:190`) and `kind:'cli'`
   (`{sheets}`, `CliPracticePage.tsx:49`). "You keep missing git commands" is already one query away.
3. **`prog_progress` is a boolean per lesson** with no score column, and end-of-lesson questions are
   self-check only — so "complete" means "I clicked complete", not "I got it".
4. `ProgrammingQuizPage.tsx:62` already carries `context: "${course} · ${lesson}"` on every question,
   and the summary never turns it into "you missed 3 from *Interfaces* — review it".

### Test coverage: everything found here passes every existing test
`verified` | `tests/programming.test.ts`

The suite checks unique kebab keys, balanced code fences through the real `parseMarkdown`, exactly
4 pairwise-distinct options with an in-range `correct` index, `answers` in `normalizeCmd` canonical
form, and repo idempotency. It structurally cannot catch a factually wrong but well-formed claim, a
`correct` index pointing at the wrong option, an option-length giveaway (never measured), or an
`answers[]` string that is syntactically fine and semantically a different command. That last one is
the failure mode of all seven cheatsheet rows above.

A test that measures the longest-option rate per course and fails above a threshold would have caught
the systemic issue, and is maybe fifteen lines.

### What's genuinely good

- The SQL course's version claims (`FILTER` 3.30, `STRICT` 3.37, `RIGHT`/`FULL JOIN` 3.39,
  `MATERIALIZED` 3.35, `->`/`->>` 3.38, the FLOATING-POINT-affinity footgun) check out **exactly**
  against the app's own bundled SQLite 3.49.2, verified by running them.
- `shellCourse.ts`'s `set -e` exception list (checked contexts, `((count++))` at zero,
  `var=$(cmd)` vs `echo "$(cmd)"`) is correct in every particular, verified live — this is better than
  most published shell guides. So is the `#!/usr/bin/env bash` reasoning about macOS 3.2 and NixOS,
  and the `[[ $x == $pat ]]` quoted-vs-unquoted pattern distinction.
- The docker and git courses read like they were written by someone who has debugged these at 3am:
  shell-form CMD eating SIGTERM, the `ON`-vs-`WHERE` outer-join trap, the typed-nil-interface gotcha,
  stash-is-a-merge-commit.
- The regex course's four-flavor discipline (RE2 has no lookaround or backreferences, Python vs PCRE
  lookbehind width rules, the `\A`/`\Z`/`\z` table) is accurate everywhere except the one Go named-group
  claim — a strong record for content that is very easy to get subtly wrong across four flavors at once.
