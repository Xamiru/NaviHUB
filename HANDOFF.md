# NaviHUB Handoff

Status: Japanese tutor audit complete; adaptive Japanese Home preview awaiting user approval.

## Current goal

Implement the approved Japanese-learning improvements, beginning with backlog-aware daily pacing and a guided listening/output foundation.

## Completed

- Audited the Japanese curriculum, SRS, roadmap, mining, reading, listening, drills and stats as a reading-focused language course.
- Recommended adaptive daily pacing, a known-word listening/shadowing feed, controlled sentence production, curriculum wording fixes and graded-reading expansion.
- Built the required local UI preview at `previews/japanese-today.html` using the real NaviHUB theme and shell.
- Preview build reports 136 class tokens and zero missing CSS rules.

## Next action

- Get user approval or revisions for `previews/japanese-today.html`.
- After approval, port the adaptive Home design into React, then design/implement the listening flow using the `add-ipc` contract where new backend data is needed.

## Preview notes

- All counts and the current lesson/title in the mockup are sample data.
- The proposed behavior does not lock lessons: it withholds the next-lesson recommendation while unseen cards remain, but keeps a `Study the next lesson anyway` override.
- The full tool catalog remains available under four compact category cards.

## Working-tree notes

- The repository still contains substantial pre-existing user changes.
- `previews/` is gitignored and the preview is local-only.
- No production source files were changed for this design milestone.
- Git mutations remain the user's responsibility.
