# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

NaviHUB is a personal, single-user desktop application. Its primary user manages and consumes a
local media library and studies inside the same application. The Japanese Tutor is personalized for
a learner who already knows kana, studies for roughly one hour a day, and primarily wants to read
manga and visual novels while developing balanced listening, speaking, and writing ability.

## Product Purpose

NaviHUB unifies local media tracking, playback, reading, and structured learning without accounts or
a server. The Japanese section should be sufficient as the user's only study software: it teaches a
clear curriculum, schedules memory work, turns imported Japanese media into comprehensible input,
and tells the learner exactly what to do next.

Success means the learner can follow one realistic daily plan, retain what they study, progressively
understand their own manga, novels, anime, and video, and see honest evidence of growth across all
four language skills.

## Positioning

NaviHUB's distinctive mechanism is that the learner's private local media library is also the
immersion curriculum. Reviews, known-word analysis, mining, reading, listening, playback, and
progress evidence remain connected instead of being split among unrelated study services.

## Operating Context

- Desktop-only Electron application used with a keyboard, mouse, local files, and optional microphone.
- A typical Japanese study day is approximately 15 minutes of review, 10 minutes of listening,
  20 minutes of reading, 10 minutes of controlled output, and 5 minutes for a lesson or repair.
- Imported local manga, EPUB novels, anime, and video count as studying entirely inside NaviHUB.
- The learner may choose any available lesson or tool even when the Tutor recommends a different one.
- A guided Tutor session advances from observable study evidence, inserts a short repair after a weak
  result, and closes with an honest daily debrief. Unobservable work remains manually markable.

## Capabilities and Constraints

- Japanese study must work fully offline after optional data packs are installed.
- The core Tutor must not require a cloud or locally installed language model.
- Open-ended speech and writing feedback must state its limits honestly. Deterministic checks,
  constrained production, model answers, self-comparison, recording, and replay are acceptable;
  fabricated linguistic certainty is not.
- Everything is local-only under the application's user-data directory. There are no accounts or
  server-side learner profiles.
- Recommendations never lock content. Overrides remain available throughout the roadmap.
- Offline conversation practice uses constrained authored branches; it does not imitate an open-ended
  language model. Local-media listening may target an exact playback range without restricting access
  to the full file.
- The app may use imported local media as required advanced input; it need not bundle a complete
  commercial media corpus.

## Brand Commitments

- Product name: NaviHUB.
- The user selected the third theme-study options: Lain **Wired, after dark** (black violet,
  rose signals, existing Lain icon) and Metal Gear **Solid / Ink** (light paper, dark green ink,
  red actions, FOXHOUND icon and classic MGS2 artwork). Themes are selectable; Lain is the default.
- Home keeps its mixed-media cover wall, with the selected theme artwork and typography.
  Learning surfaces inherit the theme while keeping reading and feedback clear and still.
- No emoji or decorative Unicode glyphs. Functional state and navigation glyphs follow the existing
  repository rules.
- The voice is mature, direct, specific, and honest about measurement limits.

## Evidence on Hand

- A 26-course Japanese path from N5 foundations through N1 material.
- SRS history, review retention, leeches, forecast data, quiz sessions, reading progress, mined words,
  comprehension estimates, local media progress, and installed offline dictionaries.
- Local manga/EPUB readers, video playback with subtitle tooling, sentence audio, microphone recording,
  graded readings, and deterministic drills.
- No human tutor, speech-recognition service, or general free-form Japanese correction engine is
  present. Future interfaces must not imply otherwise.

## Product Principles

1. Prescribe one useful next action rather than presenting an undifferentiated tool catalogue.
2. Prefer recall, comprehensible input, and real media use over accumulating unfinished lessons.
3. Turn mistakes into targeted practice without distorting the SRS schedule.
4. Measure only what the app can actually observe and explain every proxy.
5. Keep the learner in control: guidance is strong, gates are absent, and local data stays local.

## Accessibility & Inclusion

All Tutor and study flows must remain keyboard-operable, preserve visible global focus treatment,
support reduced-motion preferences, and keep readable secondary copy at the established contrast
levels. Microphone-dependent work must provide a useful non-recording path.
