# NaviHUB UI/UX foundation pass

Date: 2026-09-04

This pass treats the audit as evidence, not as an instruction to redesign the product. It implements only confirmed, foundational defects requested by the user. Page redesigns, navigation restructuring, visual-identity changes, and section-level design recommendations remain deferred until a separate design specification is supplied.

## Prioritized implementation plan

| Priority | Confirmed defect | Affected files | Proposed fix | Regression risk | Verification method |
|---|---|---|---|---|---|
| 1 | Renderer behavior had no DOM or accessibility test layer. | `package.json`, renderer Vitest configuration, `tests/renderer/` | Add jsdom, Testing Library, user-event, and axe coverage without weakening the existing Electron-ABI main test runner. | Medium: split runners can accidentally skip suites. | Runner sentinel tests plus the complete `npm run test` command. |
| 2 | Route links were exposed as ARIA tabs and true tabs lacked the complete keyboard/panel relationship. | `Tabs.tsx` and its callers | Separate `RouteTabs` navigation from a true `Tabs` widget with roving focus, Arrow/Home/End handling, IDs, and labelled panels. | Medium: broad shared-component use. | Renderer interaction and axe tests plus source contract tests. |
| 3 | Dialog-like surfaces duplicated incomplete focus behavior. | `hooks.ts`, `Dialog.tsx`, confirm, reader, setup, import, refresh, and wrestling dialogs | Make `useDialog` and `Dialog` the modal source of truth for initial focus, containment, Escape, backdrop dismissal, and restoration. | High: focus behavior is cross-cutting. | Dialog tests, reader/dialog source guards, typecheck, and manual GUI checks. |
| 4 | Popovers and drawers duplicated outside-click/Escape logic or claimed the wrong semantics. | `hooks.ts`, action/list/music/task menus, queue, sidebar, reader settings, universal picker | Add shared anchored-popover behavior; use modal drawer behavior for compact navigation; expose the reader settings rail as a non-modal complementary region. | Medium: dismissal order and restored focus can regress. | Popover, drawer, and combobox tests with axe checks. |
| 5 | Confirmed controls relied on visual proximity or placeholders rather than programmatic labels. | `Field.tsx`, `PillGroup.tsx`, confirmed form/search/settings call sites | Add reusable `Field`/`Fieldset`, associate descriptions/errors, label confirmed inputs, and expose single-select groups correctly. | Medium: generated IDs and cloned controls must remain stable. | Field and representative call-site tests plus source contract checks. |
| 6 | Drag-and-drop reordering was pointer-only and hover-only actions stayed hidden from keyboard focus. | `SortableList.tsx`, `TierBoard.tsx`, tier/playlist/reader/gacha callers | Add keyboard sensors, explicit move actions, live announcements, and `focus-within` visibility. | Medium: order calculations and current-item constraints are stateful. | Sortable interaction tests and source contract tests. |
| 7 | Confirmed meaningful text used decorative contrast or undersized utilities; status/data visuals had incomplete non-visual output. | confirmed renderer call sites, charts, heatmap, toaster | Promote confirmed meaningful copy, add readable summaries/labels, and give transient status messages live-region semantics. | Low to medium: targeted visual-density changes. | Data-visual/toast axe tests, source review, and minimum-window manual review. |
| 8 | Electron 31 was unsupported and native-module compatibility was coupled to a brittle rebuild flow. | dependency, CI, packaging, and native-smoke files | Upgrade to Electron 44.2.0 and `better-sqlite3` 13.0.3; require Node 22.12+; load and transact through the packaged native module on Linux and Windows release paths. | High: Chromium/Node jumps and native ABI packaging. | Typecheck, full tests, build, Linux package, packaged native transaction, and a cross-version disposable database check. |
| 9 | Provider credentials were returned as ordinary settings and stored as plaintext. | shared secret registry, main storage/IPC, preload/API, settings/config UIs, bulk script | Route registered secrets through Electron `safeStorage`, migrate existing values transactionally, redact renderer settings, expose backend strength, and preserve legacy values if protection is unavailable. | High: unreadable ciphertext or an unavailable OS backend could block providers. | Unit tests for migration/error paths, renderer secret-field tests, full gates, and first-launch manual verification on the laptop. |

## Phase verification record

| Phase | Automated verification | Compatibility or migration risk |
|---|---|---|
| Renderer test infrastructure | Runner sentinel, TypeScript test project, complete test command | No data migration. Main tests remain under Electron's ABI-aware runner. |
| Tabs and route navigation | Tabs keyboard/semantics tests, axe, typecheck, full suite | Route paths and visible labels are unchanged. |
| Dialogs | Initial focus, Tab wrap, Escape, backdrop dismissal, and restoration tests | No persisted state. Manual verification is still required because the VPS has no display. |
| Popovers and drawers | Outside press, Escape, menu keyboard navigation, drawer focus restoration, combobox active-descendant tests | No persisted state. Anchored panels remain non-modal unless they block the compact viewport. |
| Fields and control semantics | Label, description, error, fieldset, and pill-group tests | No settings key or form payload changes. |
| Reordering and focus visibility | Keyboard reorder and live-announcement tests; source guards | Existing item IDs and stored ordering are unchanged. |
| Contrast, text, and status semantics | Data-visual and toaster tests with axe | Only confirmed meaningful copy was promoted; a visual density review remains. |
| Electron/native platform | Electron 44 build, Linux package, packaged `better-sqlite3` transaction, old-to-new disposable DB integrity check | Requires Node 22.12+. Windows packaging and application journeys require the user's PC. No production database was touched. |
| Protected credentials | Migration, unavailable-backend, unreadable-value, redaction, and secret-field tests | First real launch performs the migration. Ciphertext is OS-user-bound; unreadable values must be re-entered or cleared. Linux `basic_text` is explicitly reported as weak. |

Final aggregate results:

- `npm run typecheck`: passed for node, web, and renderer-test projects.
- `npm run test`: native smoke passed; 237 main test files with 2,816 tests passed; 11 renderer test files with 28 tests passed.
- `npm run build`: passed for main, preload, and renderer bundles. The pre-existing PostCSS module-type warning remains.
- Linux directory packaging and the packaged native transaction: passed during the Electron phase.
- Lint: no ESLint configuration exists in the repository, so there is no meaningful lint command to run.

## Fixed now

- [x] Route subnavigation uses links and `aria-current`; local tabs use complete tab semantics and keyboard navigation.
- [x] Modal focus entry, containment, Escape handling, backdrop dismissal, and restoration share one implementation.
- [x] Anchored menus/popovers share outside-interaction, Escape, restoration, and optional menu-key behavior.
- [x] Compact navigation drawer focus behavior is modal and tested; reader settings use non-modal complementary semantics.
- [x] Universal entity picking is a labelled combobox with active-descendant Arrow/Home/End/Enter behavior.
- [x] Confirmed unlabeled search, settings, filter, import, list, image, tag, music, torrent, and related fields have programmatic names.
- [x] Shared fields associate help and error text; single-choice pill groups expose radiogroup semantics.
- [x] Sortable lists and tier boards support keyboard drag and explicit movement with polite announcements.
- [x] Hover-revealed controls in confirmed gacha and row-action cases are visible through keyboard focus.
- [x] Confirmed meaningful low-contrast and sub-12px text violations were promoted without changing the palette or visual identity.
- [x] Charts, heatmaps, and transient notifications expose meaningful non-visual status or summaries.
- [x] Renderer interaction/accessibility test infrastructure protects the repaired primitives.
- [x] Electron is on supported 44.2.0, native loading is smoke-tested, and a packaged Linux native transaction succeeds.
- [x] A database created through the prior Electron/native stack reopens through the upgraded stack with integrity and representative data preserved.
- [x] Registered provider secrets no longer leave the main process through ordinary settings and migrate to OS-backed protected storage when available.
- [x] Settings can replace or explicitly clear a secret without redisplaying it, and communicate the active storage backend.
- [x] Existing plaintext is retained when protected storage is unavailable, avoiding destructive migration failure.

## Requires product/design decision

- [ ] Choose between one global omnibox and two explicitly differentiated search/navigation tools. This affects product behavior and route metadata, so P0.1 was not independently redesigned.
- [ ] Decide whether URL-addressable detail subsections should use search parameters or child routes.
- [ ] Define the product model for first-run and setup health.
- [ ] Approve any shell, Home, media, reader, music, learning, quiz, gacha, football, wrestling, list, checklist, statistics, settings, task, log, torrent, or bulk-import redesign.
- [ ] Define whether remaining tiny metadata is decorative telemetry or decision-relevant content before applying a global typography floor.
- [ ] Decide whether settings should be split into schema-driven section modules; this pass added shared fields and protected secrets without restructuring the page.

## Requires manual GUI verification

- [ ] At minimum, exercise 940 x 600, 1366 x 768, and 1920 x 1080 in both Lain and Metal Gear themes.
- [ ] Open and close representative dialogs by button, backdrop, Escape, forward Tab, and reverse Tab; confirm focus returns to the opener.
- [ ] Open Sidebar destinations, row action menus, list/music menus, the queue, and reader settings; confirm keyboard visibility and restoration.
- [ ] Reorder a playlist/list and tier item by keyboard and pointer; confirm the live message matches the result.
- [ ] Exercise reader completion and shortcut overlays without losing reader focus or shortcuts.
- [ ] Confirm promoted text remains visually subordinate but readable at the minimum window size.
- [ ] On the laptop, launch Electron 44 and verify `navimg://`, media playback, native file/folder dialogs, the player widget, achievement popup, global shortcuts, external links, and child-process-backed features.
- [ ] On the first real launch, confirm existing provider integrations still work, secrets show as configured but blank, replacement works, and explicit clear disables the provider as expected.
- [ ] Run the user's Windows packaging flow and verify the packaged `better-sqlite3` smoke plus a basic application journey.

## Deferred with reason

- [ ] Electron end-to-end journeys: the current machine is a headless VPS with no live library database; launching the GUI here is prohibited. Packaged native smoke coverage was added where practical.
- [ ] Visual regression baselines: no approved visual specification or representative populated database is available on the VPS.
- [ ] `sandbox: false`: this is a real defense-in-depth gap, but changing it blindly can break preload, protocol, media, and child-window integrations. It needs a separate packaged-GUI compatibility slice.
- [ ] Removing inline CSP styles: lower priority than the completed platform/secret work and potentially broad because current dynamic styling depends on them.
- [ ] Remaining raw `text-gray-600` and 8px to 11px utilities: many are deliberate decorative telemetry. Only semantically confirmed violations were changed; the rest need rendered/contextual review.
- [ ] Full route registry and command/search unification: product/navigation architecture rather than a foundational semantic repair.
- [ ] Section-level recommendations and all visual redesigns: explicitly outside this pass until a separate design specification is supplied.
- [ ] Dependency advisory remediation: `npm install` reported 22 advisories (11 moderate, 10 high, 1 critical). Automatic audit fixes were not applied because they can introduce unrelated or breaking dependency changes; triage belongs in a separate dependency-security pass.

## Audit-owned changed files

Some files already contained user work when this pass began. The audit changes were layered without reverting or rewriting that work. Pre-existing-only music/Spotify and architecture-index edits are not claimed below.

### Tooling, platform, security, and documentation

- `.github/workflows/release.yml`
- `AGENTS.md`
- `CLAUDE.md`
- `README.md`
- `docs/architecture/packaging-ci-updates.md`
- `docs/architecture/ui-conventions.md`
- `docs/review/NaviHUB_UI_UX_Foundation_Checklist_2026-09-04.md`
- `electron-builder.yml`
- `package-lock.json`
- `package.json`
- `scripts/build-games-catalog.cjs`
- `scripts/bulk-import.cjs`
- `scripts/db.cjs`
- `scripts/dist-win.sh`
- `scripts/export-library.cjs`
- `scripts/native-smoke.cjs`
- `scripts/run-electron-node.cjs`
- `src/main/football/sync.ts`
- `src/main/index.ts`
- `src/main/ipc.ts`
- `src/main/repos/settingsRepo.ts`
- `src/main/secretStorage.ts`
- `src/preload/index.ts`
- `src/shared/api.ts`
- `src/shared/secretSettings.ts`
- `src/shared/types.ts`
- `tsconfig.renderer-tests.json`
- `vitest.renderer.config.ts`

### Renderer shared components and libraries

- `src/renderer/src/components/AchievementSetupDialog.tsx`
- `src/renderer/src/components/ActionMenu.tsx`
- `src/renderer/src/components/AddToListMenu.tsx`
- `src/renderer/src/components/BarChart.tsx`
- `src/renderer/src/components/CalendarHeatmap.tsx`
- `src/renderer/src/components/CommandPalette.tsx`
- `src/renderer/src/components/ConfirmHost.tsx`
- `src/renderer/src/components/ContextMenu.tsx`
- `src/renderer/src/components/Dialog.tsx`
- `src/renderer/src/components/EntityListView.tsx`
- `src/renderer/src/components/Field.tsx`
- `src/renderer/src/components/GoldbergWizardDialog.tsx`
- `src/renderer/src/components/ImageBrowseDialog.tsx`
- `src/renderer/src/components/ImportDialog.tsx`
- `src/renderer/src/components/LogViewer.tsx`
- `src/renderer/src/components/MediaFilterPanel.tsx`
- `src/renderer/src/components/MediaImagesSection.tsx`
- `src/renderer/src/components/MusicPlaylistButton.tsx`
- `src/renderer/src/components/MusicTrackRow.tsx`
- `src/renderer/src/components/NowPlayingBar.tsx`
- `src/renderer/src/components/PillGroup.tsx`
- `src/renderer/src/components/PlayerShortcuts.tsx`
- `src/renderer/src/components/QueuePanel.tsx`
- `src/renderer/src/components/RefreshMediaDialog.tsx`
- `src/renderer/src/components/SecretField.tsx`
- `src/renderer/src/components/Sidebar.tsx`
- `src/renderer/src/components/SortableList.tsx`
- `src/renderer/src/components/Tabs.tsx`
- `src/renderer/src/components/TasksIndicator.tsx`
- `src/renderer/src/components/TierBoard.tsx`
- `src/renderer/src/components/Toaster.tsx`
- `src/renderer/src/components/TorrentSearchDialog.tsx`
- `src/renderer/src/components/TournamentTree.tsx`
- `src/renderer/src/components/UniversalPicker.tsx`
- `src/renderer/src/components/gacha/CoachRail.tsx`
- `src/renderer/src/components/quiz/ChronologyOrder.tsx`
- `src/renderer/src/components/reader/ReaderSettingsDrawer.tsx`
- `src/renderer/src/components/reader/ShortcutHelp.tsx`
- `src/renderer/src/components/wrestling/LooseMatchDialog.tsx`
- `src/renderer/src/components/wrestling/WrestlingChronology.tsx`
- `src/renderer/src/components/wrestling/WrestlingImportPanel.tsx`
- `src/renderer/src/lib/hooks.ts`
- `src/renderer/src/lib/queryKeys.ts`
- `src/renderer/src/lib/toast.ts`

### Renderer pages

- `src/renderer/src/pages/BookReaderPage.tsx`
- `src/renderer/src/pages/BulkImportPage.tsx`
- `src/renderer/src/pages/CliPracticePage.tsx`
- `src/renderer/src/pages/EnglishMatchPage.tsx`
- `src/renderer/src/pages/EnglishMechanicsPage.tsx`
- `src/renderer/src/pages/EnglishReadingPage.tsx`
- `src/renderer/src/pages/EnglishSpotErrorPage.tsx`
- `src/renderer/src/pages/EnglishVocabQuizPage.tsx`
- `src/renderer/src/pages/GachaCoachPage.tsx`
- `src/renderer/src/pages/GachaGamePage.tsx`
- `src/renderer/src/pages/JapaneseArcadePage.tsx`
- `src/renderer/src/pages/JapaneseConfusablesPage.tsx`
- `src/renderer/src/pages/JapaneseHomePage.tsx`
- `src/renderer/src/pages/JapaneseKanaPage.tsx`
- `src/renderer/src/pages/JapaneseListenPage.tsx`
- `src/renderer/src/pages/JapanesePitchPage.tsx`
- `src/renderer/src/pages/JapaneseSentencesPage.tsx`
- `src/renderer/src/pages/ListFormPage.tsx`
- `src/renderer/src/pages/ListsIndexPage.tsx`
- `src/renderer/src/pages/MangaReaderPage.tsx`
- `src/renderer/src/pages/MediaDetailPage.tsx`
- `src/renderer/src/pages/MediaListPage.tsx`
- `src/renderer/src/pages/MusicDownloadsPage.tsx`
- `src/renderer/src/pages/MusicLibraryPage.tsx`
- `src/renderer/src/pages/MusicPlaylistPage.tsx`
- `src/renderer/src/pages/ProgrammingQuizPage.tsx`
- `src/renderer/src/pages/SearchPage.tsx`
- `src/renderer/src/pages/SettingsPage.tsx`
- `src/renderer/src/pages/SqlSandboxPage.tsx`
- `src/renderer/src/pages/TagsIndexPage.tsx`
- `src/renderer/src/pages/TierListEditorPage.tsx`
- `src/renderer/src/pages/TorrentsPage.tsx`
- `src/renderer/src/pages/WrestlingCollectionPage.tsx`
- `src/renderer/src/pages/WrestlingWrestlerPage.tsx`

### Regression tests

- `tests/interactionAccessibilityContracts.test.ts`
- `tests/musicSurface.test.ts`
- `tests/renderer/DataVisuals.test.tsx`
- `tests/renderer/Dialog.test.tsx`
- `tests/renderer/Drawer.test.tsx`
- `tests/renderer/Field.test.tsx`
- `tests/renderer/Popover.test.tsx`
- `tests/renderer/SecretField.test.tsx`
- `tests/renderer/SortableList.test.tsx`
- `tests/renderer/Tabs.test.tsx`
- `tests/renderer/Toaster.test.tsx`
- `tests/renderer/UniversalPicker.test.tsx`
- `tests/renderer/accessibility.ts`
- `tests/renderer/setup.ts`
- `tests/renderer/testInfrastructure.test.tsx`
- `tests/secretStorage.test.ts`
