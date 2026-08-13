# Programming section

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — courses, cheatsheets and the typed CLI drill — all content is code, so app updates ship content.

**Key files** — `src/shared/programming/` (`types.ts`, `courses.ts`, one file per course, `cheatsheets.ts`), `src/main/repos/programmingRepo.ts`

**Tests** — `programming`, `programmingBias`

---

## Programming section

**Programming section (2026-07-29)** — `/programming` (Learn section): interactive courses + CLI cheatsheets + a typed practice drill. **All content is CODE** (`src/shared/programming/`: `types.ts`, `courses.ts` aggregating one file per course — `goCourse` (17 lessons), `regexCourse`, `gitCourse`, `sqlCourse` — and `cheatsheets.ts`), the checklist.ts idiom taken further: unlike Japanese (seeded to DB because the user edits cards), courses are read-only so app updates update content. Course/lesson/sheet `key` strings are FROZEN; the only table is `prog_progress` (`lesson_key` = `'<courseKey>/<lessonKey>'`, personal → sanitizeSql) and `programmingRepo.complete` validates keys against the catalog. **Lesson bodies are Markdown for `components/Markdown.tsx` — author within its parser's limits** (headings 1-3, FLAT lists, bold/italic/inline code/links, ``` fences; NO tables/blockquotes/nesting), and remember bodies are template literals: escape every backtick and `${`. Pages: `ProgrammingHomePage` (course cards + progress bars), `ProgCoursePage`, `ProgLessonPage` (Markdown body + click-to-check questions — self-check only, nothing logged — + Mark-complete toggle; remounts via `key={courseKey/lessonKey}` so prev/next resets question state), `CheatsheetsPage` (tabs; a non-empty search cuts across ALL sheets), `CliPracticePage` — a **KanaDrill port** (per-keystroke check, red-and-stay miss, Enter reveal/skip with 3/13 re-queue splices, endless, Stop logs `quiz_session` kind **`'cli'`**) with two command-specific twists: Space is typeable (not an Enter alias) and comparison goes through `normalizeCmd` (collapse whitespace, uniform ` | ` around pipes). Practice pool = only cheat entries WITH an `answers` array (canonical spelling first, flags-not-filenames convention); entries without one are reference-only. Adding a course = one new file + an entry in `PROG_COURSES`; adding drillable commands = data only. tests/programming.test.ts validates the whole catalog (unique kebab keys, balanced fences through the real `parseMarkdown`, 4-option questions, normalized answers).

## Round 2

**Programming round 2 (2026-08-01)** — content: 6 courses (`goCourse` 17 lessons, `shellCourse` 8, `dockerCourse` 7, `regexCourse` 7, `gitCourse` 7, `sqlCourse` 7) and 13 cheatsheets (added `docker`, `tmux`, `node`, `python`). tmux's key bindings are entered WITHOUT `answers` on purpose — they are keystrokes, not commands, so they read on the sheet but never enter the typing drill. **`ProgrammingQuizPage`** (`/quiz/programming`, new `QuizKind` `'programming'`) is the section's entry in the Quiz hub: the JapaneseQuizPage loop (setup/play/summary, 1-4 + Enter, one `loggedRef`-guarded `endGame` that decides newBest before invalidating) over two renderer-built pools — the courses' own `ProgQuestion`s (options reshuffled, `correct` re-found by identity) and a "which command does this" MCQ whose distractors come from the same sheet first, then all sheets. No IPC and no repo: the catalog is shared code, so the whole quiz is client-side. QuizLandingPage gained cards for it and for the existing CLI drill.

