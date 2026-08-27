---
target: Tournament
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
timestamp: 2026-08-27T23-32-58Z
slug: src-renderer-src-pages-tournamentpage-tsx
---
Method: dual-agent (A: /root/tournament_design_review · B: /root/tournament_detector_review)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Match and save progress exist, but autosave failures and phase transitions are hidden. |
| 2 | Match system / real world | 3 | Bracket language is familiar; group advancement and tiebreak rules are not explained. |
| 3 | User control and freedom | 3 | Undo and resume are strong, but End and Discard are ambiguous and immediate. |
| 4 | Consistency and standards | 3 | Shared NaviHUB primitives are used; nested interactive controls and two primary actions drift. |
| 5 | Error prevention | 2 | Pool incompatibility is discovered only after Start; final picks and destructive exits lack protection. |
| 6 | Recognition rather than recall | 3 | Current match context is visible; source, format, and group route disappear during play. |
| 7 | Flexibility and efficiency | 4 | Keyboard play, persisted setup, undo, resume, bracket view, and run-back are excellent. |
| 8 | Aesthetic and minimalist design | 2 | Play is focused, but setup is a wall of choices and fixed two-column layouts are fragile. |
| 9 | Error recovery | 2 | Start errors and final-save retry exist; autosave and restored-state failures have no recovery. |
| 10 | Help and documentation | 2 | Basic duels are explained; group rules, autosave guarantees, and workload are not. |
| **Total** | | **27/40** | **Solid foundation, substantial correctness and UX gaps.** |

## Design Specificity Verdict

The content is strongly NaviHUB-specific—library sources, local audio auditioning, covers, the Lain theme, and Archive Broadcast history—but the composition is still a generic bracket builder followed by two equal cards. The page would become unmistakably NaviHUB with a resolved-field preview, a visible phase route, and group/bracket context that treats the user's archive as the event rather than hiding it behind configuration pills.

The deterministic detector returned `[]` with zero findings. That clean scan missed several source-verifiable issues: invalid nested interactive controls, missing selection semantics, fixed responsive grids, swallowed persistence failures, and fragile rapid-input locking. Browser visualization was unavailable on the headless VPS, so no reliable live overlay exists.

## Overall Impression

Knockout play is already quick and satisfying, and the champion summary gives it a worthwhile ending. The biggest opportunity is to make Groups then knockout logically correct and legible, then make the resume promise trustworthy. At present the group stage can feed same-group qualifiers directly into a rematch, while autosave and exit behavior can silently leave stale or unrecoverable state.

## What's Working

- The two-card decision surface is focused, large, and keyboard-friendly.
- Shared pure bracket/group engines correctly create round robins, standings, boundary tiebreaks, immutable picks, byes, and tied knockout placements.
- Undo, versioned autosave, run-back, source diversity, audio auditioning, and the complete champion/standings summary give the feature strong replay value.

## Priority Issues

1. **[P1] Group qualifiers are not cross-seeded.** Qualification order is flattened as first/second from each group, then paired adjacently by `createBracket`; with eight entrants this makes Group 1's qualifiers immediately rematch in a semifinal. Cross-seed adjacent groups (`A1 vs B2`, `B1 vs A2`) and retain group/placement identity through cutoff tiebreaks. The saved session also logs the reduced knockout field as `total`; use the original `tournamentSize` so history does not call an eight-entry event a four-entry event.
2. **[P1] Resume and exit state is not trustworthy.** Autosave, discard, and save-slot clearing errors are swallowed. Completed or malformed saves can pass the weak load check and render a blank play page, while End tournament neither clearly pauses nor abandons and does not refresh the local resume offer. Add structural save validation, require a real pending match, expose save state, and split `Save and exit` from confirmed `Abandon tournament`.
3. **[P1] Group-stage orientation and setup are too vague.** Setup does not state six matches per group, top two advance, cutoff ties create tiebreaks, or that a 64-entry event requires 127 decisions. Show a resolved field count/sample and estimated picks, disable impossible sizes, add a Groups -> Tiebreak -> Knockout route, qualification lines, and an all-groups overview.
4. **[P1] Input and final-choice protection are incomplete.** The zero-delay lock can release between double-click/key-repeat events, and the final pick cannot be undone once the summary appears. Hold the lock through the committed matchup render, ignore repeated keydowns, disable cards during transition, and preserve an undo/confirm path for the champion-deciding pick.
5. **[P2] Responsive and accessibility structure needs hardening.** The matchup and summary are fixed two-column grids; Resume can overflow; Play is a focusable pseudo-button nested inside the contender button; pills expose selection only by color; search inputs have no associated labels; loading and empty picker states are conflated. Stack layouts at narrow widths, separate real pick/audio buttons, add radio/pressed semantics and live status regions, and use thumbnail URLs in the large bracket.

## Persona Red Flags

- **First-time player:** cannot predict what Groups then knockout does, how long 64 entrants will take, or whether End preserves progress; invalid sizes fail only after loading.
- **Repeat player:** gets excellent shortcuts and run-back, but cannot preview the resolved field, inspect all groups, or trust that autosave succeeded.
- **Keyboard/screen-reader player:** nested controls have ambiguous activation, pills do not announce selection, search relies on placeholders, and restored-state failures can become a blank screen.

## Minor Observations

- Resume and Start tournament can both be primary actions, breaking the one-primary-action rule.
- Non-completed explicit media statuses can contain spoilers but show no warning unless All is selected.
- Past tournament rows omit format and show the wrong total for group-format sessions.
- The bracket is horizontally scrollable, but 128/256 fields need current-match anchoring or round navigation.
- Summary grouping repeatedly filters the full placement list; precompute elimination-round counts.

## Questions to Consider

- Should Tournament lead as a quick preference game or as a deliberate tournament desk with field preview and full tables?
- Should group matches rotate across groups for variety, or finish one group at a time?
- Should the final pick require confirmation, or should the summary retain a safe Undo final pick action?
- Should a tournament default to Save and exit, with abandonment isolated as the destructive action?
