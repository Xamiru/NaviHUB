# English learning vertical — review

Scope: `src/main/englishDrills.ts`, `src/main/dict/enFreq.ts`, `src/main/englishWriting.ts`,
`src/shared/english/mechanics.ts`, `src/shared/english/passages.ts`,
`src/shared/english/writingPrompts.ts`, `src/main/repos/englishRepo.ts` (vs
`src/main/repos/japaneseRepo.ts`), `src/main/llm.ts`, and the five page components
(`EnglishSpellingPage.tsx`, `EnglishVocabQuizPage.tsx`, `EnglishMechanicsPage.tsx`,
`EnglishReadingPage.tsx`, `EnglishWritingPage.tsx`, `EnglishReviewPage.tsx`).

Real-data verification: two leftover imported `dictionaries.db` files were found at
`/tmp/wn-qykYiN/dictionaries.db` (155,287 real WordNet lemmas — matches the "155k lemmas"
figure in the project's own memory) and `/tmp/wn-hrgqMY/dictionaries.db`. Neither has an
`en_freq` table, so I downloaded the pinned `en_50k.txt` (same sha the app pins,
`src/main/dict/enFreq.ts:19`) and replayed the app's exact `parseFreqLines` +
`fetchBandCandidates` + `quizzableCandidate` logic against the real WordNet data in
`/tmp/wn-qykYiN/dictionaries.db` to pull genuine sampled quiz items (script discarded,
DBs untouched — read-only queries only).

## Bands & frequency source

`high` | `verified` | `src/main/dict/enFreq.ts:8-19,27-39` — the ranking source is hermitdave's
OpenSubtitles-2018 `en_50k` list, a spoken-dialogue corpus, used to rank a C1/C2 reader's
written/academic vocabulary gaps. Sampling the real pinned file confirms the skew concretely:
`furthermore` ranks 10,190 (falls in the "advanced" 10-25k band), `nonetheless` 10,782
(advanced), `consequently` 20,178 (advanced), `arguably` 24,109 (advanced/rare boundary),
`albeit` 22,611 (advanced), `notwithstanding` 31,809 (rare/"C2 literary" band), `hitherto`
36,453 (rare) — ordinary formal connectives a C1 writer should already be producing land in
the "advanced" or "literary" tiers, indistinguishable from genuinely rare/technical
vocabulary of the same rank. Meanwhile very common conversational filler (`gonna` rank 96,
`yeah` 62, `wow` 500, `dude` 708) sits safely under the 4,000-word exclusion floor and is
correctly never quizzed — but the corpus's spoken-register bias pushes the wrong words up
into the "advanced" tier while never distinguishing "formal but common" from "rare and
obscure." → Fix: blend in (or switch the advanced/rare tiers to) a written/academic list
(e.g. a COCA- or Google-Books-derived list) so formal connectives and topic vocabulary rank
by written-register frequency, not subtitle-dialogue frequency.

`med` | `verified` | `src/main/dict/enFreq.ts:14-19` — the raw corpus also carries
subtitle-specific noise: sampling ranks 24,990-25,010 and 40,220-40,230 of the raw (pre-filter)
file surfaces personal/place names lowercased into the word list (`kimberly`, `morton`,
`gettysburg`, `jordans`) and a stutter-dialogue artifact (`it--it`, rank 563). Most of this
is filtered out downstream by the WordNet join (proper nouns rarely have a common-noun
synset), but it confirms the source was never curated as a vocabulary list — it is subtitle
transcription frequency repurposed for that job. → Fix: none required if the written-list
blend above is done; otherwise, no action needed since WordNet-join already absorbs most of
the junk (documented for completeness, not a standalone defect).

`low` | `verified` | `src/main/englishDrills.ts:20-24` — coverage measured against the real
WordNet data: of the 6,001 raw words in the "upper" band (4-10k), only 3,525 (59%) survive
the `en_lemma` join + `quizzableCandidate` filter and are ever quizzable; "advanced" (10-25k)
is 7,501/15,001 (50%); "rare" (25-50k) is 8,300/23,738 (35%). The bands are sized on raw
corpus rank, not on how many actually-quizzable words each yields, so "rare" is the thinnest
tier in absolute terms once multiword phrases, proper nouns and WordNet-less tokens drop out.
Not wrong, but worth knowing the effective pool sizes are roughly half the band width implies.

## Auto-generated vocab items

`high` | `verified` | `src/main/englishDrills.ts:56-61,155-222` — every candidate uses only
its FIRST WordNet sense (`offsets[0]`, ordered by WordNet's own frequency-of-use ranking, not
by which sense a modern learner would expect). Two real, sampled examples from the live
WordNet data expose false-negative risk directly: **`conjunction`** (rank 22,898, "advanced"
band) resolves to the temporal-coincidence sense — *"the temporal property of two things
happening at the same time"* (syn: concurrence, coincidence, conjunction, co-occurrence) —
never the grammatical part-of-speech sense every learner actually knows the word for.
**`milestone`** (rank 22,481) resolves to the literal roadside-marker sense — *"stone post at
side of a road to show distances"* — never the common figurative "significant event/stage"
sense. A learner who correctly knows the word in its dominant modern sense will read the
"correct" answer as simply wrong and lose the point (word2def) or fail to recognise it
(def2word) — a false negative purely from WordNet's first-sense-by-corpus-order convention,
with no sense disambiguation anywhere in the pipeline. → Fix: when a lemma has multiple
senses, either prefer the sense whose synset members overlap the word's dominant modern usage
(hard without extra data) or simply exclude/flag lemmas whose first sense's definition text
has near-zero lexical overlap with the word's other senses' glosses, or (cheaper) hand-curate
an exclusion list for known WordNet first-sense traps.

`med` | `verified` | `src/main/englishDrills.ts:129-130` — synonyms mode picks the correct
answer uniformly at random from every member of the first synset
(`c.synonyms[Math.floor(rng() * c.synonyms.length)]`), with no frequency filter on the
synonym itself. Sampled example: `hump` (rank 9,607, "upper" band) has the synset
`{bulge, bump, hump, swelling, gibbosity, gibbousness, jut, prominence, protuberance,
protrusion, extrusion, excrescence}` — a synonyms-mode round on the common word `hump` can
serve `gibbosity` or `gibbousness` as the one and only correct answer, i.e. testing the
learner's knowledge of a rarer word than the prompt itself. → Fix: filter candidate synonyms
by their own frequency rank (when available) before picking the answer, or cap synonym choice
to synset members that also appear in `en_freq` within a reasonable band of the prompt.

`med` | `verified` | `src/main/englishDrills.ts:82-99` — `pickDistractors` for `word2def`/
`def2word` selects same-POS, nearest-frequency-rank words from the SAME pool, which is good
practice, but for `synonyms` mode (`:132-134`) the correct answer is a synset member (often
off-band, see above) while the three distractors are same-POS/near-rank pool HEADWORDS —
the correct answer and the distractors are drawn from structurally different populations
(one obscure synonym vs. three ordinary band words), which can make the odd one out
detectable by register/obscurity alone rather than by actually knowing the synonymy, i.e. the
opposite problem from the false-negative above: a gettable-without-knowledge false positive.
Sampled real def example illustrating a related self-reference risk: `reciprocal` (n, rank
40,711, "rare" band) glosses as *"something...that has a reciprocal relation to something
else"* — the target word appears inside its own definition, which is harmless as a direct
answer but would leak the identity of ANY question whose distractor pool happens to include
this gloss for a different prompt word, since the reader can pattern-match the repeated
root. → Fix: exclude self-referential glosses (definition containing the headword) from the
distractor/answer pool, and rank-filter synonym answers as above.

`low` | `verified` | `src/main/englishDrills.ts:56-61` (sampled) — WordNet's frequency-ordered
first sense is occasionally simply an odd choice for a modern quiz: `tart` (n, rank 9,560,
"upper" band) resolves to *"a woman who engages in sexual intercourse for money"* (syn:
prostitute, harlot, ...) rather than the far more common British "pastry" sense. Not
incorrect, but a jarring definition to have surface unprompted in a self-study drill, and
another instance of the first-sense problem above.

`med` | `verified` | `src/main/englishDrills.ts:99` (myWords synonyms fallback, cross-checked
in `EnglishVocabQuizPage.tsx:99`) — `source === 'myWords' && mode === 'synonyms'` silently
downgrades to `word2def` (`effectiveMode`), and the page does surface a one-line notice
(`EnglishVocabQuizPage.tsx:259-263`, "Saved words carry no synonym data..."), so this one is
handled honestly and is not itself a defect — noted because task 2 asked for it explicitly.

## Authored content

Read in full: all 100 `EN_MECHANICS` items (`src/shared/english/mechanics.ts`) and all 12
`EN_PASSAGES` with their 58 comprehension questions (`src/shared/english/passages.ts`), plus
the 14 `EN_WRITING_PROMPTS` (`src/shared/english/writingPrompts.ts`).

Overall quality is high: the mechanics items are genuine C1/C2 discriminations (institutional
uses of articles, defining vs. non-defining relative clauses, register-calibrated hedging,
etc.), grammatically defensible, and internally consistent on British/American usage (British
spelling and idiom used consistently throughout, e.g. `-ise`-neutral phrasing, "in hospital").
The reading passages are original, well-constructed, and their distractors require having
actually read the passage (see Coverage section below) rather than world knowledge.

One confirmed defect found in the full read:

| key | file:line | problem | suggested fix |
|---|---|---|---|
| `articles-06` | `src/shared/english/mechanics.ts:68` | The explain string reads: *"An abstract noun takes no article when general (collapse is rarely sudden), but an of-phrase makes it specific and the definite article becomes obligatory."* The parenthetical `(collapse is rarely sudden)` is a non-sequitur — it asserts something about the real-world suddenness of collapses, which has no bearing on article rules, and reads as garbled/leftover text rather than a grammar explanation. Every other mechanics item's parenthetical is a genuine illustrative example (e.g. `punctuation-08:390`, `articles-16:190`); this is the sole outlier. | Replace the parenthetical with an actual illustrative pair, e.g. "(compare *collapse is common in ancient trade networks*, general, vs *the collapse of the Bronze Age trading system*, specific)". |

No other items were found to be factually wrong, ambiguous with two defensible answers, or
BrE/AmE-inconsistent in the full 100-item read. (`articles-08`'s "in hospital" vs "at the
hospital" distinction is BrE-specific but the explain string says so explicitly —
`mechanics.ts:91` — so it is handled honestly, not a defect.)

`high` | `verified` | `src/main/englishDrills.ts:56-61` (cross-referenced against
`mechanics.ts`/`passages.ts`) — this is a distinct failure mode from the authored-content
table above: it belongs to the auto-generated vocab pool, not the hand-written content
(covered under "Auto-generated vocab items").

## Coverage vs the weak spots

The owner's known weak spots: spelling, punctuation and sentence boundaries, articles,
confusable pairs, register.

- **spelling**: 12 items (`spelling-01`..`-12`, `mechanics.ts:1127-1233`) — all multiple-choice
  spot-the-correct-spelling, not production. There is a SEPARATE typed spelling drill
  (`EnglishSpellingPage.tsx`) but it draws from WordNet-band words, not from the 12 authored
  spelling-rule items, and it never targets the specific error classes (double consonants,
  ie/ei, -ance/-ence) that the 12 authored items were built around.
- **punctuation**: 12 items (`punctuation-01`..`-12`).
- **boundaries** (run-ons/comma-splices/fragments — explicitly named as a weak spot): 12 items
  (`boundaries-01`..`-12`).
- **articles**: 24 items — the best-covered category.
- **confusables**: 24 items — the second-best-covered category.
- **register**: 16 items.

Punctuation and sentence boundaries — two of the five named weak spots — get the thinnest
authored coverage (12 items each) despite being named explicitly as problem areas, while
articles (24) get double that, even though the owner's assessed level (C1 comprehension)
suggests articles are less of a live problem than the sentence-mechanics categories.

`high` | `verified` | `src/renderer/src/pages/EnglishMechanicsPage.tsx:110-115` — pool
exhaustion: `nextQuestion()` reshuffles and re-serves the ENTIRE category pool once the deck
of unique items is empty (`if (deckRef.current.length === 0) deckRef.current =
shuffle(poolRef.current)`), and "Endless" mode (`length === 0`,
`EnglishMechanicsPage.tsx:268`) never introduces new items — the same fixed 100 authored
items (or as few as 12, if a narrow category is chosen) simply recycle forever in a new random
order. Two concrete consequences: (1) picking a 12-item category (`boundaries` or
`punctuation`) with the "20 questions" length setting (`EnglishMechanicsPage.tsx:203`)
guarantees every item repeats at least once within a SINGLE round (20 > 12, pigeonhole). (2)
At the stated ~1h/day study pace, exhausting all 100 mechanics items across categories takes
a handful of sessions; after that, every future round is a reshuffle of the identical fixed
set with no regeneration mechanism and no weighting toward previously-missed items — content
is authored code (`CLAUDE.md`'s own framing), so it updates only when a developer edits the
file, never adaptively.

`high` | `verified` | `src/renderer/src/pages/EnglishReadingPage.tsx:65-81` — the 12 passages
are a fixed picklist (setup screen lists all 12, `:153-171`); there is no cross-session
exhaustion tracking or randomised subset — a motivated daily reader will have read all 12
passages, and answered their fixed 58 questions, within days, then simply re-reads the same
text with the same questions (comprehension score converges to memorised-answer-key, not
comprehension) with no mechanism to detect or discourage repeat attempts.

`med` | `verified` | `src/renderer/src/pages/EnglishVocabQuizPage.tsx:134-139` — same
full-pool-reshuffle pattern as the mechanics page, but the underlying WordNet+frequency pool
is large (thousands of words per band), so exhaustion is not a practical concern here — noted
for completeness since task 4 asked about repeats across all four drill pages.

`med` | `verified` | none of the four drill pages (Mechanics, Reading, Spelling, Vocab) weight
previously-missed items more heavily on return — a wrong answer is recorded only as a stat
(and, for vocab/spelling, an SRS card) but never changes which authored item is more likely
to be re-served; the mechanics/reading pools are pure uniform shuffles regardless of history.

## The SRS loop

`high` | `verified` | `src/renderer/src/pages/EnglishSpellingPage.tsx:57-63` and
`EnglishVocabQuizPage.tsx:146-152` — a miss saves `meaning: it.def` / `meaning:
current.q.def`, i.e. whichever WordNet first-sense gloss the quiz displayed. Combined with
the polysemy finding above, this means a learner who is marked wrong on `conjunction` or
`milestone` because they knew a DIFFERENT (more common) sense gets that word permanently
added to their SRS deck with the obscure/literal sense as its "meaning" — the deck can end up
teaching a definition that actively conflicts with the word's dominant real-world usage.

`high` | `verified` | `src/main/repos/englishRepo.ts:56-267` (whole file) vs.
`src/main/repos/japaneseRepo.ts:401-499,605-611,776-905` — three pieces of Japanese SRS
machinery were not ported to English at all:
1. **No leech list / drill.** Japanese has `listLeeches()` (`japaneseRepo.ts:401-428`) plus a
   dedicated `/japanese/leeches/drill` self-check page. English has only a cosmetic inline
   badge during a normal review session (`EnglishReviewPage.tsx:226-230`, gated on
   `srs.lapses >= LEECH_LAPSES`) — there is no list of leeches anywhere and no way to
   specifically drill them; a chronically-missed word just keeps cycling through ordinary SM-2
   review at whatever interval the algorithm assigns.
2. **No ghost reviews.** Japanese spawns an extra-schedule "ghost" echo on every lapse
   (`japaneseRepo.ts:605-611`, `jp_ghost` table) to reinforce a just-failed card sooner than
   its next real SM-2 due date. `englishRepo.ts:submitReview` (`:125-169`) has no equivalent —
   a lapsed English word waits for its next scheduled review like any other card, with no
   extra near-term reinforcement.
3. **No retention/streak/journey stats.** Japanese's `statsDetail()`
   (`japaneseRepo.ts:776-905`) computes strict/lenient retention, a 30-day forecast, streaks
   and a "journey" summary. English's `srsStats()` (`englishRepo.ts:171-185`) is four counters
   (due/new/total/reviewed-today) — there is no retention rate, no due-forecast, and no way to
   see whether review accuracy is trending up or down over time.

`med` | `suspected` | `src/main/englishDrills.ts:242-249` (vocab) — a rare/archaic word missed
once (e.g. a 40k-rank tail-band word like `sorrel`, sampled def *"any plant or flower of the
genus Oxalis"* — itself a WordNet data quirk conflating true sorrel, genus *Rumex*, with wood
sorrel, genus *Oxalis*) enters the SRS deck exactly like a common, useful word: same `saveWord`
path (`englishRepo.ts:40-56`), same SM-2 schedule, same review queue position. Nothing
in the deck distinguishes "a word worth knowing" from "a word the learner will plausibly never
encounter again" — the "rare" band existing at all (`EN_BANDS.rare`, `englishDrills.ts:23`)
means the auto-save-on-miss loop can and will seed the permanent SRS deck with C2/literary
tail vocabulary indistinguishable in the review UI from core saved words. Given no leech
suspension exists either (see above), a word like this simply recurs on the SM-2 schedule
forever unless the user notices and manually removes it via the Dictionary page's delete
(`EnglishDictionaryPage.tsx:133`) — there is no bulk or targeted "prune rare/noise words"
tool.

## LLM writing feedback

`high` | `verified` | `src/main/llm.ts:75-99` — neither provider call sets `temperature` (or
`top_p`); Gemini's `generateContent` (`:80-85`) and Anthropic's `messages.create`
(`:87-93`, via `buildModelParams` which only ever sets `thinking` or `{}`) both run at
default (non-zero) sampling. For a grading task whose entire value proposition is a
comparable numeric rubric tracked over time (`EnglishWritingPage.tsx:263`, "watch the rubric
climb"), this means re-grading the SAME unmodified essay twice is not guaranteed to produce
the same scores — score movement between two writing sessions can be sampling noise rather
than skill change, and the app has no way to distinguish the two. → Fix: pass `temperature: 0`
(or as low as the SDK allows) specifically for `completeOnce` grading calls.

`high` | `verified` | `src/main/repos/englishRepo.ts:212-236` and `src/shared/types.ts:2491-2499`
(`EnWritingEntry`) — no provider or model is ever recorded on a saved writing entry, even
though `coach.provider` is user-switchable between Gemini and Claude
(`src/main/llm.ts:20-23`) and the two providers use different personas/calibration by
construction (separate SDK clients, separate default models `gemini-2.5-flash` vs
`claude-opus-4-8`, `llm.ts:15-16`). If the user switches providers between sessions — a
supported, expected action per the Settings page — the score history shown in
`EnglishWritingPage.tsx`'s "History" section (`:260-271`) silently mixes scores from two
different graders with no way to see which is which, compounding the temperature issue above.
→ Fix: store `provider`/`model` alongside each `en_writing` row (new column, `ensureColumn`)
and surface it in the history row.

`med` | `verified` | `src/main/englishWriting.ts:100` (`maxTokens: 2048`) combined with the
already-established unbounded submission length (`:92-100`) — the JSON contract
(`buildFeedbackPrompt`, `:16-38`) requires `scores` + a full `corrections` array (each with
verbatim `before`/`after` text) + a full-length `modelRewrite` ("same content and length" as
the submission, up to 300 words for opinion essays) + `overall`, ALL inside one 2048-token
output budget. `modelRewrite` and `overall` are the LAST two keys in the required JSON shape
(`:25`), so on a long, error-heavy submission (exactly the kind this C1/strong-B2 user with
punctuation/boundary issues will produce) a token-truncated reply is most likely to lose the
model rewrite and/or overall verdict, not the scores or early corrections. `parseFeedback`
(`:47-82`) has no truncation detection: if the truncated JSON happens to still parse (it will
usually just throw, per the already-established "unreadable reply" case), `modelRewrite`/
`overall` silently default to `''` (`:79-80`) and the UI just shows nothing for that card
(`EnglishWritingPage.tsx:81-88`, section only renders `{fb.modelRewrite && (...)}`) with no
indication that the feedback was incomplete. → Fix: raise `maxTokens` for writing feedback
(essays here run up to 300 words / ~2000+ output tokens are plausible once corrections are
counted) and/or detect a non-`finish_reason: stop` truncation and surface it as a retry
prompt rather than silently empty fields.

`low` | `verified` | `src/main/englishWriting.ts:26` — the prompt's scoring anchor ("5 = solid
B2, 7 = C1, 9+ = native-like C2") is a genuinely good, concrete calibration device that partly
mitigates the cross-session drift concern above — noted here because it's a real mitigating
design choice, not filed as a defect.

`low` | `verified` | `src/main/englishWriting.ts:26` ("If the submission ignores the task or
is too short to grade, score low and say so in overall") — handles the good-essay and
off-task cases explicitly; there is no equivalent instruction for a GENUINELY GOOD submission
beyond the numeric anchor, so a strong essay's `overall` field has no guidance to be
encouraging/specific rather than perfunctory — minor, since the four-dimension rubric plus
`overall`'s "what was strong, the one habit to fix next" framing (`:25`) already pushes toward
constructive specificity regardless of score.

## Verdict per weak spot

- **Spelling** — a real typed drill exists (`EnglishSpellingPage.tsx`) plus 12 authored
  multiple-choice spelling-rule items, but the two never intersect: the typed drill pulls
  arbitrary WordNet-band words, not the specific spelling patterns (double consonants,
  ie/ei-after-c, -ance/-ence) the 12 authored items target. Present: production practice
  (typing) exists. Missing: the drill isn't targeted at the owner's actual error patterns, and
  nothing tracks which spelling patterns he personally gets wrong across sessions (no
  per-pattern error log — only whole SRS cards).
- **Punctuation** — 12 authored multiple-choice items only (`mechanics.ts:284-447`), no
  production/typed component, thinnest category alongside boundaries relative to how
  explicitly it's named as a weak spot.
- **Sentence boundaries** — same: 12 authored items (`:449-621`), recognition-only, no
  production task (e.g. "rewrite this run-on") anywhere in the vertical.
- **Articles** — the best-served weak spot: 24 well-constructed authored items
  (`:9-282`) covering the genuinely hard cases (institutional nouns, generic vs. specific,
  ordinals, geographic names).
- **Confusables** — 24 strong authored items (`:623-901`) plus `confusables` appearing
  implicitly whenever they surface as writing-feedback corrections; well covered for
  recognition, no dedicated production drill.
- **Register** — 16 authored recognition items (`:903-1125`) PLUS the writing section's
  register rubric dimension and several register-explicit prompts (formal-rewrite kind,
  `writingPrompts.ts:70-96`) — the only weak spot with a genuine production-and-feedback loop,
  because writing feedback grades register directly and shows corrections.

Overall: recognition-only multiple-choice covers all five weak spots to varying depth, but
genuine PRODUCTION practice with feedback — the remediation method that actually fixes
spelling/punctuation/boundary habits — exists only for register and general grammar, via the
Writing section, and that channel has the consistency/truncation problems documented above.
There is no dictation exercise, no targeted minimal-contrast drill, and no per-error-pattern
log anywhere in the English vertical (contrast with the Japanese section's leech list, ghost
reviews and `dictation`/`pairs` quiz kinds — none of that machinery was ported).

## What's genuinely good here

- The 100 authored mechanics items (`src/shared/english/mechanics.ts`) are near-uniformly
  high quality, genuinely C1/C2-level discriminations with accurate, specific explanations —
  only one non-sequitur explain string (`articles-06`) was found in a full read of all 100.
- The 12 reading passages and their 58 questions (`src/shared/english/passages.ts`) are
  original, well-written, and their distractors are text-dependent rather than
  world-knowledge-guessable — genuinely testable comprehension material.
- The 14 writing prompts (`src/shared/english/writingPrompts.ts`) are unusually well-designed
  for the stated goal: several explicitly require hedging, register control, and answering
  (not dismissing) a counter-argument — directly on-target for the owner's register and
  production weak spots (e.g. `opinion-machine-assisted-authorship:14`,
  `rewrite-project-delay:75`).
- `buildFeedbackPrompt`'s system persona (`src/main/englishWriting.ts:23`) names the owner's
  actual known weak spots verbatim inside the grading instructions, which is a genuinely
  targeted (not generic) use of an LLM grader.
- The vocab pool's core join logic (`fetchBandCandidates`, `englishDrills.ts:155-222`) is
  correctly batched and correctly filters proper nouns via the synset-casing signal
  (`quizzableCandidate`, `:56-61`) rather than trusting the lowercased `en_lemma.lemma` column
  — a real, deliberate correctness fix, verified against the live WordNet data.
