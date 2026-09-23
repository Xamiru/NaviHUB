# NaviHUB Full Product, UI/UX, Accessibility, and Engineering Audit

**Audit date:** 2026-09-04  
**Repository state reviewed:** clean `main`, commit `614af6a`, tag `v0.39.0`  
**Application:** local-only, single-user Electron desktop application  
**Primary viewport contract:** desktop, `1280 x 820` default and `940 x 600` minimum

## 1. Scope, method, and confidence

This audit covers the product model, information architecture, global shell, navigation, search, visual system, interaction consistency, accessibility, keyboard behavior, responsive behavior, content hierarchy, loading and error states, first-run experience, performance architecture, renderer maintainability, Electron security, local-data privacy, automated testing, packaging, and each major product area.

The following material was reviewed:

- All 190 declared renderer routes in `src/renderer/src/App.tsx`.
- 140 page components and 150 shared or domain components.
- The renderer shell, adaptive navigation, global search, command palette, readers, media flows, learning flows, music, quiz, gacha, football, wrestling, collections, and operational pages.
- Theme tokens and shared component conventions in `src/renderer/src/styles.css` and `docs/architecture/ui-conventions.md`.
- Main-process window creation, custom protocols, external-navigation handling, preload/API boundaries, database structure, release workflow, package metadata, and test layout.
- `PRODUCT.md`, `AGENTS.md`, architecture notes, and the older `docs/review/` material.
- The older review was not copied blindly. Findings that current source has already fixed were removed or explicitly marked as historical.

### Verification limits

This is a source-level and architecture-level audit, not a claim that every screen was visually exercised.

- The application was not launched because the project contract forbids launching the GUI on the headless VPS.
- A fresh dependency install could not complete because the environment could not resolve `registry.npmjs.org` (`EAI_AGAIN`). Therefore the current source was not freshly typechecked, tested, built, dependency-audited, or packaged in this environment.
- The checked-in `out/` bundle is older than the current source, so it was deliberately excluded from current bundle-size conclusions.
- Responsive, focus, animation, reader auto-hide, and theme findings derived from source should be verified in the real app on the laptop at the end of each implementation slice.

Confidence is high for route structure, semantics, component behavior visible in source, architecture, security configuration, and maintainability. Confidence is medium for visual density and responsive behavior because those require real rendering with real data.

## 2. Executive verdict

NaviHUB is already substantially more mature than a typical personal application. It has a distinctive visual identity, a meaningful product philosophy, rich local-first functionality, a growing shared component system, thoughtful data safeguards, and unusually broad domain test coverage.

The central problem is not that the interface looks unfinished. The central problem is that the product has grown to approximately 190 routes while still presenting itself through a compact shell designed for a much smaller application. As a result:

1. Discoverability and prioritization are now the largest UX risks.
2. Global interaction semantics have not kept pace with the visual design system.
3. Some sections expose many capable tools without clearly prescribing the next useful action.
4. Accessibility debt is concentrated in reusable components, so it affects many routes at once.
5. Renderer testing is far behind domain testing, leaving visual and interaction regressions largely manual.
6. A few non-UI engineering issues, especially the unsupported Electron major and plaintext provider secrets, deserve immediate attention.

The correct redesign direction is evolutionary, not a visual reset. Preserve the Lain-inspired Wired identity, the Metal Gear theme, the cover-wall Home hero, the editorial archive atmosphere, and the section-specific character. Simplify the hierarchy underneath them.

### Directional scorecard

These scores are a prioritization tool, not an external benchmark.

| Area | Score | Assessment |
|---|---:|---|
| Product purpose and differentiation | 8.5/10 | Clear local-first value and strong connection between media and learning |
| Visual identity | 8.5/10 | Distinctive, coherent, and worth preserving |
| Shared visual system | 7.5/10 | Good primitives and semantic tokens; migration and semantics are incomplete |
| Information architecture | 5.5/10 | Route scale exceeds the current navigation model |
| Core task flows | 7.5/10 | Many flows are deep and capable; prioritization varies by section |
| Accessibility semantics | 5.5/10 | Focus treatment is strong, but tabs, labels, dialogs, and hidden controls need systemic repair |
| Keyboard operation | 6/10 | Good intent and many shortcuts; important gaps remain in drawers, drag-and-drop, and modals |
| Desktop responsiveness | 6.5/10 | Reasonable breakpoint strategy, but the minimum-height and hidden-context cases need runtime validation |
| Performance architecture | 7.5/10 | Route lazy loading, pagination, and incremental lists are current strengths |
| Renderer maintainability | 6/10 | Several giant pages and one giant shared type file raise change risk |
| Local privacy and security | 7.5/10 | Strong local model and navigation guards; outdated Electron and secret storage reduce the score |
| Automated quality coverage | 6.5/10 | Excellent domain coverage, almost no behavioral renderer coverage |

## 3. What should be preserved

### 3.1 Product direction

`PRODUCT.md` gives the application a stronger foundation than most personal projects. The principles to prescribe one useful next action, prefer real media and recall, turn mistakes into targeted practice, measure honestly, and keep the user in control should become the standard for every hub page, not only Japanese learning.

The media-learning connection is the product's most distinctive mechanism. Reading, playback, subtitle work, mined vocabulary, coverage, progress evidence, and the private archive should continue to feel like one system rather than separate apps inside a launcher.

### 3.2 Visual identity

The visual world is already coherent:

- Semantic theme variables support both Lain and Metal Gear modes.
- Shared chrome uses restrained surfaces, thin rules, signal colors, editorial headings, and mono metadata.
- Route mood, signal clarity, reduced motion, and increased contrast are considered in the CSS architecture.
- Home's cover wall is memorable and should remain the identity anchor.
- Readers correctly leave the main shell and become immersive workspaces.
- Domain areas such as football, wrestling, gacha, and music retain recognizable character without completely abandoning the shared system.

A generic dashboard redesign would make the product worse. The goal is to reduce cognitive load while retaining atmosphere.

### 3.3 Shared component progress

The repository already has a useful vocabulary: `PageHeader`, `Section`, `HubCard`, `DoorCard`, `StatTile`, `StatInline`, `EmptyState`, `PageStatus`, `MediaCard`, `ContextPanel`, `EditorialDetailFrame`, `StudySessionFrame`, `ActionMenu`, `PillGroup`, and `useDialog`.

That means the next pass should repair and extend the system instead of creating more one-off page implementations.

### 3.4 Performance decisions already made

Current source is materially better than the old review suggests:

- Almost all secondary routes are lazy-loaded.
- Only Home and the shared shell are eager in the normal application root.
- Media libraries use server-side paging or incremental rendering rather than mounting an entire archive.
- Large queues and track collections reveal rows incrementally.
- The audio context separates controls from high-frequency position updates.
- Repeated artwork can use thumbnails rather than full-size sources.
- Search uses a trigram FTS projection for longer substring queries and escaped `LIKE` fallbacks for short queries.

Do not reopen already-solved performance work without a fresh profile.

### 3.5 Main-process safeguards

The Electron foundation includes several good practices:

- `contextIsolation: true`.
- Renderer-created windows are denied.
- External navigation goes through guarded main-process handling.
- Local artwork is served through a validated custom protocol.
- Main-owned satellite windows are cleaned up with the primary window.
- A content security policy is present.
- Sensitive values are deliberately redacted from logs.
- Local data remains under the application user-data directory without accounts or a server.

These should remain hard constraints during UI work.

### 3.6 Domain testing

The repository contains 235 test files and approximately 2,520 `test` or `it` cases. The tests cover repositories, content, scheduling, import behavior, data invariants, search, shuffling, bias, migrations, and source-level boundaries. This is a major asset.

The weakness is not lack of tests overall; it is the missing renderer interaction layer.

## 4. Highest-priority systemic findings

### Priority 0: fix before broad screen redesign

#### P0.1 Unify or clearly separate global search and command navigation

**Current behavior**

- The Topbar input searches archive entities and submits to `/search?q=...`.
- The input visually advertises `Ctrl K`.
- `Ctrl/Cmd+K` opens `CommandPalette`, which searches both entities and destinations.
- The Sidebar text says hidden sections remain available through search, but only the command palette can reliably find destinations.

This teaches two overlapping search models and assigns the visible shortcut to the wrong control.

**Recommendation**

Choose one of two coherent models:

1. Preferred: one global omnibox. Clicking the Topbar field or pressing `Ctrl/Cmd+K` opens the same interface, with grouped scopes such as Go to, Titles, People, Collections, and Actions. Enter on an unselected query opens full search results.
2. Acceptable: keep two tools but label them honestly. The Topbar becomes `Search archive` with no `Ctrl K` badge, while the command palette is explicitly `Go anywhere`.

Also derive destination entries from a single route registry rather than maintaining a large separate `NAV_ITEMS` array.

**Primary files**

- `src/renderer/src/components/Topbar.tsx`
- `src/renderer/src/components/CommandPalette.tsx`
- `src/renderer/src/components/Sidebar.tsx`
- `src/renderer/src/lib/adaptiveNav.ts`

#### P0.2 Split route navigation from actual tabs

`Tabs.tsx` always emits `role="tablist"` and `role="tab"`, including when each item is a React Router link to another route. It does not provide the complete relationship and keyboard model expected of a true tab widget: tab and panel IDs, `aria-controls`, `aria-labelledby`, roving tab stops, arrow navigation, and associated panels.

This is a systemic semantic error because the component is used across the application.

**Recommendation**

Create two components:

- `RouteTabs` or `Subnav`: a labelled `<nav>` containing links with `aria-current="page"`.
- `Tabs`: a true local-state tab widget with tab-panel IDs, roving `tabIndex`, arrow/Home/End navigation, and associated `tabpanel` elements.

Do not make one component guess both interaction models from the presence of a `to` prop.

**Primary file**

- `src/renderer/src/components/Tabs.tsx`

#### P0.3 Consolidate modal and popover focus behavior

`useDialog` is a good implementation and should become the one source of truth. Several modal-looking surfaces do not use it or implement only part of the behavior:

- `ConfirmHost` restores and initially moves focus but does not contain Tab focus.
- Reader completion overlays visually block the reader but do not consistently expose modal semantics or contain focus.
- `ShortcutHelp` declares a dialog but lacks complete focus entry, containment, and restoration.
- `QueuePanel` declares `role="dialog"` while behaving more like an anchored popover and does not establish a consistent focus model.
- The Sidebar drawer closes on Escape but does not move focus into the drawer or reliably restore it to the invoking area button.

**Recommendation**

Build three explicit primitives:

- `Dialog`: modal, focus-contained, labelled, restores focus, closes on Escape.
- `Popover`: anchored, non-modal, closes on outside interaction/Escape, preserves a logical trigger relationship.
- `Drawer`: labelled navigation surface with intentional focus entry and restoration; decide whether it is modal at the minimum viewport and implement accordingly.

Migrate existing surfaces rather than copying focus code.

**Primary files**

- `src/renderer/src/lib/hooks.ts`
- `src/renderer/src/components/ConfirmHost.tsx`
- `src/renderer/src/components/QueuePanel.tsx`
- `src/renderer/src/components/Sidebar.tsx`
- `src/renderer/src/components/reader/ShortcutHelp.tsx`
- `src/renderer/src/pages/MangaReaderPage.tsx`
- `src/renderer/src/pages/BookReaderPage.tsx`

#### P0.4 Repair programmatic labels across forms and search controls

The application often renders a visually adjacent label or relies on placeholder text without programmatically associating that text with the field. A static heuristic flags roughly half of the 212 input elements for review; the exact number requires a DOM audit, but multiple concrete cases are visible in source.

Confirmed examples include command search, import search, torrent search, list creation, media image URLs, entity-list search, tag search, image browsing, music playlist/search controls, sort selects, and settings fields.

**Recommendation**

Create shared `Field`, `TextField`, `SelectField`, `TextAreaField`, and `SearchField` components. Every field should receive one of:

- a visible `<label htmlFor>` and matching `id`;
- an enclosing `<label>`;
- or a deliberate `aria-label`/`aria-labelledby` when a visible label is not appropriate.

Placeholders should remain examples or hints, never the only label.

#### P0.5 Make every hidden-on-hover action visible to keyboard focus

Some gacha controls use `opacity-0 group-hover:opacity-100` without an equivalent `group-focus-within` or focus-visible state. A keyboard user can focus an action that remains visually invisible.

**Recommendation**

- Add `group-focus-within` visibility everywhere hover reveals actions.
- Prefer persistent low-emphasis actions when the action is important.
- Include this rule in a shared row/card action pattern and a lint or source-level test.

**Primary files**

- `src/renderer/src/components/gacha/CoachRail.tsx`
- `src/renderer/src/pages/GachaCoachPage.tsx`

#### P0.6 Provide a keyboard alternative for drag-and-drop

`SortableList` and `TierBoard` currently use a pointer sensor only. Checklist rows, playlists, lists, and tier items therefore cannot be fully reordered from the keyboard.

**Recommendation**

- Add the library's keyboard sensor and coordinate strategy where it works reliably.
- Also provide explicit Move up and Move down actions in the row action menu. Explicit actions are useful even when keyboard drag exists.
- Announce successful movement through a polite live region.

**Primary files**

- `src/renderer/src/components/SortableList.tsx`
- `src/renderer/src/components/TierBoard.tsx`

#### P0.7 Upgrade Electron from the unsupported 31.x line

The package currently specifies Electron `^31.7.6`. Electron's official schedule marks Electron 31 end-of-life on 2025-01-14, while the official policy supports only the latest three stable major lines. As of this audit date, the current supported stable lines are 42, 43, and 44.

This is not merely dependency housekeeping; Electron carries Chromium and Node security exposure.

**Recommendation**

Plan an explicit staged upgrade to a supported line. Review breaking changes one major at a time or in tested groups, rebuild `better-sqlite3`, run the full test suite, package on both target operating systems, and verify custom protocols, media playback, native dialogs, global shortcuts, preload APIs, and child windows.

#### P0.8 Add renderer behavior and accessibility tests

`vitest.config.ts` targets TypeScript test files and there is no meaningful DOM, Electron end-to-end, visual-regression, or automated accessibility layer. The project contract itself records repeated renderer defects that passed unit tests.

**Recommendation**

Start with the highest-leverage components and journeys:

- `RouteTabs` and true `Tabs` keyboard behavior.
- Dialog focus entry, containment, Escape, and restoration.
- Command/search behavior.
- Sidebar drawer focus and close behavior.
- Context menu focus restoration.
- Sortable keyboard actions.
- Media quick edits and favorite state.
- Reader completion and shortcut overlays.
- One happy-path Electron journey for each critical domain.
- Automated accessibility checks for the shell and representative pages.

Do not attempt to snapshot every page. Protect the shared primitives and the highest-value user journeys first.

### Priority 1: high-value product and system work

#### P1.1 Redesign the shell around route scale

The 80px rail and 320px drawer are visually disciplined, but approximately 190 routes are compressed into five broad areas. Many tools are reachable only through a hub or command palette. Examples:

- Japanese has 39 routes but only a small subset in contextual navigation.
- Quiz has 21 routes.
- Football has 19 routes.
- English has 13 routes.

The existing design is not wrong; it has simply reached its capacity.

**Recommendation**

The shell redesign should include:

- A unified omnibox.
- Clear distinction between global areas and local section navigation.
- A complete, searchable section directory available from each large domain.
- Recent destinations and optionally pinned destinations for a single-user app.
- A visible current-location hierarchy for deeply nested routes.
- Route metadata as the single source for navigation, command search, page titles, breadcrumbs, and section membership.

#### P1.2 Reframe Home around Now, Today, and Explore

Home currently combines continuation, daily obligations, discovery, stats, and customization. The cover-wall hero is a strong identity, but the content below can expose several competing next actions and multiple continuation surfaces.

**Recommendation**

- Keep the cover-wall hero.
- `Now`: one strongest resume or continuation action.
- `Today`: a compact pressure stack for due learning, checklist obligations, active downloads/tasks, or an unfinished session.
- `Explore`: optional personalized shelves, recommendations, recent people, statistics, and discovery widgets.
- Avoid repeating the same continuation across Hero, Resume Strip, and Continue.
- When no data exists, show a lightweight setup checklist rather than sending every new user only to Anime.

#### P1.3 Establish a meaningful-text typography floor

The source contains approximately 151 uses of 7px to 11px text utilities. Tiny uppercase metadata is an intentional part of the theme, but it is also used for meaningful instructions and labels.

**Recommendation**

- Reserve 8px to 10px for decorative telemetry, small badges, or genuinely secondary metadata.
- Use at least 12px for meaningful controls, instructions, state explanations, timestamps required for decisions, and category labels.
- Prefer 13px to 14px for dense body copy at the minimum window size.
- Define named typography classes or tokens instead of choosing arbitrary pixel values per component.

#### P1.4 Stop using decorative contrast tokens for meaningful copy

Theme documentation correctly says `gray-600` is decorative only, while `gray-500` is the muted readable level. Source still contains meaningful `text-gray-600` content, including instructions, category labels, nullability explanations, and reader help.

**Recommendation**

Audit all `text-gray-600` uses. Keep separators and non-informational decoration; promote meaningful content to `text-gray-500`, `text-ink-muted`, or stronger. This is more reliable than changing the entire token and unintentionally increasing decorative noise.

#### P1.5 Standardize control semantics

The application has a good shared `Pill` with `aria-pressed`, but many bespoke filter/status/score/favorite pills do not consistently expose toggle state. Some route links, buttons, and row actions also use inconsistent interaction roles.

**Recommendation**

Create and enforce a small set of control contracts:

- Link for navigation.
- Button for an action.
- Toggle button with `aria-pressed` for independent on/off filters.
- Radio group or single-select pill group for one-of-many choices.
- Checkbox for persistent independent choices.
- Menu for rare row actions.
- Tabs only for switching associated panels.

#### P1.6 Create one settings/form field registry

`SettingsPage.tsx` is 2,265 lines and repeats many field patterns. It is difficult to ensure labels, help text, save feedback, validation, secret handling, and search metadata remain consistent.

**Recommendation**

Split each settings section into its own module and use schema-driven field definitions where practical. Shared settings fields should own:

- label and description association;
- current and default value;
- validation and error text;
- saving/saved state near the field;
- secret reveal/copy/clear behavior;
- search keywords;
- restart-required messaging.

#### P1.7 Store API keys and tokens with OS-backed protection

Provider credentials appear to be stored as ordinary settings values in SQLite. Local-only storage reduces exposure but does not make plaintext secrets harmless.

**Recommendation**

Use Electron `safeStorage` or another OS credential mechanism for secrets, with explicit handling for Linux environments where the selected backend may fall back to weak `basic_text` storage. Migrate existing values carefully and preserve the ability to clear or re-enter a secret when decryption is unavailable.

#### P1.8 Make route state addressable where it affects navigation

Some detail pages seed an active tab from the URL but then keep later tab changes only in component state. Back, forward, deep links, and restored context can therefore be inconsistent.

**Recommendation**

Use search parameters or child routes for meaningful detail sections. Avoid adding URLs for every transient disclosure, but preserve state that a user reasonably expects to revisit.

#### P1.9 Build a real first-run and setup-health model

First-run handling is fragmented across domain pages. Music, wrestling, football, learning packs, provider credentials, media folders, and imports each explain themselves locally, but there is no global sense of what is ready.

**Recommendation**

Add an optional, dismissible setup-health surface with areas such as:

- Archive: add or import titles.
- Local files: configure music, manga, books, and video locations.
- Learning: install offline packs and choose goals.
- Integrations: configure optional provider keys.
- Data safety: export/backup status.

This should never become a blocking wizard.

### Priority 2: refinement and maintainability

- Use a route-shell skeleton instead of a generic loading sentence to reduce layout jumps.
- Improve `ErrorBoundary` with Retry, Back/Home, and a collapsible diagnostic copy action.
- Give all shared buttons `type="button"` by default unless they intentionally submit a form.
- Make `PillGroup.Group` programmatically labelled through `fieldset/legend` or `role="group"` and `aria-labelledby`.
- Fix `ContextMenu` opener capture so focus restoration targets the actual trigger rather than a menu item that is about to unmount.
- Replace `aria-current="true"` on transiently highlighted search results with the appropriate list-selection model or no state.
- Give error toasts an assertive announcement path, add an explicit close action, and pause dismissal while hovered or focused.
- Consolidate functional glyph rendering through existing SVG icon components where cross-platform font rendering is unreliable.
- Derive hard-coded counts such as football competition totals from data.
- Add a maximum content width to very wide editorial pages such as Wrestling Home.
- Add ESLint with React and JSX accessibility rules, plus a repository-owned formatter configuration matching the established style.
- Reconcile package/release versions and make local packaging use the same version-stamping model as CI.
- Update the package description to reflect the actual application.

## 5. Global shell and navigation audit

### Strengths

- The rail/drawer/topbar hierarchy is visually controlled.
- Contextual navigation is data-driven through `adaptiveNav.ts` rather than repeated in every page.
- Longest-prefix route matching keeps parent destinations active on detail routes.
- Topbar route lists can scroll horizontally instead of crushing labels.
- Hidden sections remain routable, preserving user control.
- The shell uses themed semantic tokens and strong current-location treatment.

### Problems

1. The area model no longer communicates the full scope of the app.
2. Search and command navigation conflict.
3. The drawer does not have a complete focus lifecycle.
4. A user cannot easily see all tools inside Japanese, Quiz, or Football from the shell.
5. Global Home, Checklist, Stats, and operational routes do not always feel like one coherent hierarchy.
6. The contextual navigation can become a dense row of tiny uppercase labels.
7. Hidden-route discoverability depends on knowing the command palette exists.
8. Route metadata is split among `App.tsx`, `adaptiveNav.ts`, and `CommandPalette.tsx`, increasing drift risk.

### Design direction

Use a three-level model:

1. **Global areas:** Home, Library, Play, Learn, System.
2. **Section navigation:** the small set of frequent destinations for the current area.
3. **Directory/omnibox:** the complete route inventory, recent destinations, and entities.

The shell should answer three questions at all times:

- Where am I?
- What is the main thing I can do here?
- How do I reach anything else without memorizing the route tree?

## 6. Home audit

### Strengths

- The cover-wall hero is distinctive and product-specific.
- Real user data drives greeting, archive totals, streaks, resume state, and in-progress media.
- Widgets are configurable.
- The page connects across media, learning, people, and activity.
- The existing hero can promote a saved reader/video position or in-progress title.

### Problems

- Home is simultaneously a launcher, daily plan, resume surface, recommendation page, and analytics dashboard.
- Multiple modules can repeat continuation intent.
- Discovery such as Tonight's Pick can compete visually with due work.
- First-run behavior over-privileges one library type.
- Customizability can produce a page with no intentional hierarchy.
- The large number of independent data blocks raises perceived loading complexity even when local queries are fast.

### Design direction

Keep the hero but impose a fixed hierarchy above customization:

1. **Now:** one dominant continuation or session action.
2. **Today:** at most four compact obligations or time-sensitive actions, ordered by pressure.
3. **Explore:** customizable widgets and retrospective content.

Customization should rearrange the Explore area and optionally the contents of Today, but not remove the basic hierarchy. The app's product principle of one next action should be visible immediately.

## 7. Library and media catalog audit

This includes Anime, Manga, Visual Novels, Games, Books, Movies, TV, generic grid/list surfaces, and supporting seasonal/song/installed/achievement/franchise pages.

### Strengths

- Generic media configuration prevents each library from becoming a separate UI implementation.
- Server paging and incremental loading support large archives.
- Filter, sort, search, and display state are remembered.
- Inline status, score, and favorite changes reduce unnecessary detail-page visits.
- Context Lens supplies relational evidence without bloating every card.
- Media cards support type badges and progress state.
- Empty states and import entry points generally exist.

### Problems

- Search, sort, and facet fields need a consistent labelled form model.
- Filter pills need correct pressed or selection semantics.
- The active-filter count can include search without visibly representing the query as a filter chip.
- Sort direction glyphs are compact but cryptic.
- The large-screen Context Lens is useful but consumes substantial horizontal width and disappears below `lg`.
- Hover/focus selection behavior and ring persistence should be visually verified when the lens disappears.
- Card density and metadata hierarchy vary between media types.
- Cross-type entity pages can feel detached from the library route that led to them.

### Design direction

The catalog should have three stable layers:

1. **Query bar:** search, saved view, display mode, sort.
2. **Facet layer:** status and the most important type-specific filters, with an Advanced disclosure.
3. **Results surface:** cards/list plus an optional details lens.

Add a visible query chip or change the active-filter language. Use labelled Ascending/Descending controls. At smaller desktop widths, replace the persistent lens with a deliberate details action or a selected-card drawer rather than silently removing useful context.

### Media-specific opportunities

- **Anime:** keep Seasonal and Songs close to the library, but make their relationship to owned titles clear.
- **Manga and Books:** expose reading/resume state more prominently than generic tracking metadata.
- **Games:** separate installed/playable, backlog, achievements, and franchises as saved views rather than equal top-level concepts where possible.
- **Movies and TV:** emphasize watch state, local video availability, and list membership.
- **Visual Novels:** emphasize local install/launch state and reading progress when available.

## 8. Media detail and edit-form audit

### Strengths

- Current source has corrected an older major issue: detail pages now expose a clear primary action.
- Status, score, and favorite controls are available near the title.
- Relationship trails and tabs organize extensive metadata.
- Type-specific actions such as playback, reading, progress logging, achievements, and episodes can be composed into the generic detail frame.
- Destructive and uncommon actions are generally moved into an action menu.

### Problems

- Ten score pills create a dense block and are hard to scan at compact widths.
- Toggle and selection semantics vary among quick edits.
- Active detail sections do not always remain represented in the URL after interaction.
- Six or more horizontal tabs may wrap or overflow at the minimum desktop width.
- Type-specific heroes can drift in primary-action and metadata placement.
- Large edit forms expose many fields at one level.
- Dirty state, save state, and accidental navigation behavior need a consistent contract.

### Design direction

Use one detail grammar:

- Identity and relationship breadcrumb.
- Title, type/status, and one primary action.
- Compact tracking controls.
- Key facts.
- Addressable detail navigation.
- Main panel plus optional contextual evidence rail.

For score entry, use a compact current-score button that opens a labelled selection popover, or a keyboard-friendly slider/combobox if the data model supports it. Keep all values available without permanently spending the full width.

Edit forms should use logical sections, progressive disclosure for rarely used metadata, a full-width Save action, inline errors, and a visible dirty/saving/saved state.

## 9. People, companies, characters, and connection pages

### Strengths

- Cross-linked people, studios, characters, creators, roles, and titles turn the archive into a graph rather than isolated lists.
- Context panels and trails fit these pages well.
- Neutral `Connections / Connected archive` shell context is a sensible cross-library model.

### Problems

- Category entry points are fragmented across People, Actors, Directors, Authors, Artists, Mangaka, Studios, and Characters.
- A user can arrive from many library types and lose the original browsing context.
- Sparse entities can look unfinished rather than intentionally empty.
- Role and credit filters can become dense.

### Design direction

Create one `Connections` directory with saved scopes for People, Companies, and Characters. Preserve direct routes, but make category switching obvious and consistent. Detail pages should prioritize the strongest local relationship: titles owned, current progress, favorite status, and recently viewed connections.

## 10. Readers audit

### Strengths

- Manga and book readers correctly become immersive, chromeless surfaces.
- Progress persistence, autosave, image preloading, OCR prefetch, virtualized vertical content, settings, mining, and keyboard shortcuts are strong.
- EPUB preferences and reading settings persist.
- Mining connects local reading to Japanese study.
- Reader routes support direct file/open tokens as well as library-backed chapters.

### Problems

- Completion overlays do not consistently behave like accessible dialogs.
- Shortcut help is visually modal but lacks a complete shared focus model.
- Top and bottom bars auto-hide; focus and hover behavior need runtime verification so controls do not disappear while being used.
- Some popovers need clearer menu/listbox semantics.
- Click-to-mine text must always have a keyboard/manual equivalent.
- Narrow/wide layout, mining-panel width, long chapters, and very tall images need real-data validation at minimum height.
- Help text includes low-contrast, very small copy.

### Design direction

Preserve immersion. Do not add permanent chrome. Standardize all overlays with the shared Dialog/Popover primitives, make reader focus state cancel auto-hide, and create one consistent command/help sheet. The optional mining panel should remain secondary and collapse below the width where it would reduce reading quality.

## 11. Music audit

### Strengths

- First-run source selection is clear.
- Library scans and large lists are handled incrementally.
- Play, shuffle, liked tracks, artists, albums, playlists, history, downloads, and statistics form a complete local music workflow.
- The Now Playing experience is visually coherent.
- Queue rows support keyboard activation and expose labelled edit controls.
- High-frequency playback state has been separated from lower-frequency controls for performance.

### Problems

- The Music Library header carries playback, maintenance, download, scan, and artwork states at once.
- Search, playlist creation, import, and sort controls need consistent labels.
- QueuePanel declares dialog semantics but behaves like a popover.
- Some queue actions rely on Unicode glyphs even though the project has an SVG transport/icon convention.
- The full player, bottom bar, queue, and widget can expose overlapping control models.
- Reduced-motion behavior should be checked for progress and panel transitions.

### Design direction

Keep Play and Shuffle as the primary cluster. Put scan, source, artwork repair, and download maintenance under a clear Library maintenance menu or status surface. Treat Queue as an anchored popover on the compact player and a full region on Now Playing. Use the same labels and control order in both contexts.

## 12. Japanese learning audit

### Strengths

- This is the product area most aligned with the stated principles.
- Japanese Home already distinguishes Recall, Listen, and Immerse.
- Backlog-aware pacing, course frontier, coverage, SRS, leeches, listening, writing, roleplay, reading, mining, tests, and statistics form a serious offline learning system.
- `StudySessionFrame` provides a strong common exercise grammar.
- The app is honest about deterministic versus open-ended evaluation.
- User overrides remain available rather than hard-gating content.

### Problems

- Thirty-nine routes create significant choice load.
- Context navigation exposes only a fraction of the tools.
- Header action clusters can contain too many equal choices.
- `LearningContextBand`, Tutor session state, the global Topbar, and the exercise frame can consume substantial vertical space at `940 x 600`.
- The Toolbox can still feel like a catalogue when the user needs a recommended next action.
- Some exercise/help text is tiny or low-contrast.

### Design direction

Do not redesign Japanese as a generic course catalogue. Keep the adaptive daily loop as the first surface and place the full tool set behind a searchable, categorized Toolbox. Integrate only decision-relevant context into `StudySessionFrame`; collapse or remove repeated context bands during an active exercise. Use one primary action per state and a clear reason for the recommendation.

## 13. English learning audit

### Strengths

- English Home exposes due work, mistake-led practice, study, tests, and games.
- The Mistake Ledger concept gives errors a useful destination.
- Dictionary, review, vocabulary, spelling, reading, mechanics, writing, and games cover different skill modes.
- Existing learning components can be shared with Japanese without erasing domain differences.

### Problems

- When no work is due, the default recommendation can look arbitrary.
- Thirteen routes are manageable but still need a clear daily sequence.
- Games and study tools can compete with corrective work.
- Feedback confidence and evidence should remain explicit, especially in writing.

### Design direction

Use a simple order: Due repair, Recommended practice, Explore skills. Every recommendation should include a short reason based on observed evidence. The Mistake Ledger should be the persistent bridge from an error to the next targeted activity.

## 14. Programming learning audit

### Strengths

- The section now records per-lesson evidence and missed concepts.
- The recommended skill node and Skill Graph are a strong foundation.
- Courses, lessons, cheatsheets, practice, quizzes, SQL, regex, and CLI work support both study and retrieval.
- Course content is designed to work offline and be self-contained.

### Problems

- The Home page combines a recommendation, six statistics, the graph, practice entry points, and archive navigation.
- Retrospective evidence can visually outweigh the next lesson.
- Eight routes understate the deeper course/lesson tree, so breadcrumb and progress context are important.
- Large course content files and page components make UI changes risky.

### Design direction

Lead with one recommended node and one repair/practice action. Collapse retrospective metrics into a Progress disclosure. Keep the Skill Graph as orientation, not the dominant task surface. Lesson pages should consistently show objective, prerequisite, estimated effort, current evidence, exercise, feedback, and next step.

## 15. Quiz and play audit

### Strengths

- The catalogue groups many quiz formats.
- Availability checks prevent starting a game without a viable local pool.
- Disabled states often explain insufficient data.
- Spoiler-safe behavior and personal records are thoughtful.
- Formats cover recall, recognition, chronology, connections, images, music, programming, and party play.

### Problems

- Twenty-one routes produce a large wall of choices.
- `Quick Solo` maps to a specific song quiz rather than a truly general quick action.
- Disabled cards explain why but do not always offer a direct path to unlock the mode.
- Card metadata and setup controls vary between quiz implementations.
- Some lives/state displays rely heavily on glyphs or color.

### Design direction

Structure the hub as:

1. Resume or current challenge.
2. Three featured formats based on available data and recent use.
3. Random challenge with honest constraints.
4. Searchable/filterable All games catalogue by input type, duration, domain, and player count.

A disabled mode should provide a precise requirement and a direct action such as Add more anime, scan music, or import cast data.

## 16. Gacha audit

### Strengths

- Per-game identities and imagery are appropriately stronger than generic hub cards.
- Due pressure and operations concepts fit the product.
- Unit, banner, currency, and coach features form a useful personal tracker.
- Exact due work can be calculated and surfaced.

### Problems

- The global Operations Board and per-game pressure summaries duplicate information.
- Total due, tracked games, and roster totals can displace the exact next action.
- Some controls are invisible until pointer hover.
- Coach screens contain dense secondary actions.

### Design direction

Make the top of Gacha Home an ordered action queue with the exact task, game, urgency, and expected outcome. Let each game card carry its own summary so the page does not repeat pressure twice. Preserve game-specific color as content identity while using shared action, focus, and metadata patterns.

## 17. Football audit

### Strengths

- Football has a distinct editorial archive identity.
- Historical archive, current data, competitions, seasons, teams, people, matches, media, sync, and quizzes are well connected.
- Install/sync states are acknowledged rather than assuming data exists.
- Scheduled and completed match states are visually differentiated.

### Problems

- On first run, Browse history can compete with Install Archive even when installation is prerequisite.
- Hard-coded copy such as the number of competitions can drift.
- Nineteen routes require stronger section-directory behavior.
- Current-provider, offline archive, local journal, and media provenance can be unclear.
- Dense result and identity metadata should be checked at minimum width.

### Design direction

When the archive is absent, Install Archive should be the only primary action. Once ready, lead with the current match/season context and recent personal activity. Label data provenance consistently: bundled history, synchronized current data, local note, and local media.

## 18. Wrestling audit

### Strengths

- Install-first empty state is clear.
- Chronology, latest event, promotions, years, ratings, collection, matches, and wrestlers fit the editorial archive model.
- Cross-promotion browsing is a compelling section identity.

### Problems

- The root can stretch too far on ultrawide displays.
- Promotion and year lists will need search, filtering, or grouping as data grows.
- Update actions do not always use the standard button hierarchy.
- Sparse imported records need intentional missing-data treatment.

### Design direction

Constrain the editorial canvas to a readable maximum width. Lead with chronology and latest relevant event. Use searchable indexes for promotion, year, wrestler, and collection. Clearly distinguish imported wiki facts, personal ratings, and local collection data.

## 19. Lists, tier lists, tags, and collections audit

### Strengths

- Curated lists provide a valuable layer above status-based libraries.
- Tier lists support expressive personal organization.
- Tags and list membership are connected to media detail flows.
- List pages use optimistic persistence and rollback patterns.

### Problems

- Drag reordering is pointer-only.
- List/tier switching sometimes uses bespoke pills rather than the correct navigation component.
- Note and creation fields need programmatic labels.
- Form save/dirty behavior is not fully standardized.
- Large lists need quick find and clearer batch actions.

### Design direction

Treat Collections as one family with saved views for Lists, Tier lists, and Tags. Add keyboard reorder actions, search within a large collection, and a consistent editing frame with saving state and explicit destructive actions in a menu.

## 20. Checklist and statistics audit

### Checklist strengths

- Daily/weekly organization, streaks, completion progress, media-linked credit, and edit mode make it useful beyond a basic todo list.
- The board reflects real activity from elsewhere in the app.

### Checklist problems

- Reorder is pointer-only.
- Add/edit interactions should use the shared labelled dialog/field system.
- Progress and streak visuals can compete with the next unfinished task.
- The `+ Add` label should follow the project's glyph rules and use a clear text or shared icon treatment.

### Checklist design direction

Lead with the next incomplete item and compact progress. Keep editing and schedule management separate from daily execution. Provide keyboard movement and clear recurrence language.

### Statistics strengths

- Exact and estimated values are deliberately distinguished.
- Cross-domain activity can tell a meaningful personal story.
- Bar and heatmap primitives already exist.

### Statistics problems

- Charts need equivalent textual summaries or data tables for screen-reader and precision access.
- Some category meaning depends on color.
- A broad all-domain page can become a collection of low-value counters.

### Statistics design direction

Organize by decisions rather than data source: Consistency, Consumption, Learning, and Library. Every chart should answer a question and include a concise textual takeaway. Keep the exact-versus-estimated convention.

## 21. Settings, tasks, logs, torrents, and bulk import audit

### Settings

**Strengths**

- Searchable section navigation is appropriate for the page's size.
- Settings are grouped by domain.
- The Task Canvas visual mode suits operational pages.
- Theme, signal clarity, scale, menu visibility, integrations, folders, tools, and data controls are all discoverable.

**Problems**

- The page is too large to maintain safely as one module.
- Labels and descriptions are not always programmatically associated.
- Repeated global Saved toasts are less useful than local saving state.
- Provider model lists are hard-coded and will age.
- API secrets are stored as normal settings.
- Search metadata and fields can drift apart.

**Direction**

Use section modules and shared schema-driven fields. Support custom model IDs with optional current presets. Show save status beside the changed setting. Protect secrets and explain restart or platform constraints inline.

### Tasks

**Strengths**

- Active, queued, completed, failed, pause/cancel, and clear behavior are visible.
- Rare or destructive actions are grouped.
- Polling is capability-aware.

**Problems and direction**

Prioritize active work and failures above completed history. Make retry/recovery instructions specific. Keep the page list-first rather than turning it into a metric dashboard.

### Logs

**Strengths**

- Structured logging and credential redaction are strong.
- Logs remain local and operationally useful.

**Problems and direction**

Use at least 12px for timestamps and meaningful debug context. Add clear filtering by severity/domain/task, a copy diagnostic action, and an explanation of what is redacted. Preserve raw details behind disclosure rather than making the entire screen visually loud.

### Torrents

**Strengths**

- Configured and unconfigured states are explicit.
- Search and handoff to external tooling fit the local-first model.

**Problems and direction**

Label the query field programmatically, expose current provider/configuration status, and distinguish searching, no results, network/tool failure, and no configuration.

### Bulk import

**Strengths**

- Configure, Preview, and Run is an excellent explicit state model.
- Preview-only-new behavior and exclusion rules protect the library.
- Long-running work integrates with the task system.

**Problems and direction**

Use route navigation rather than incomplete tab semantics. Put import rules in a visible Rules disclosure with plain-language explanations, especially excluded categories and how the preview is topped up. Keep the current staged workflow.

## 22. Visual system audit

### Strengths

- Two intentional themes share semantic tokens rather than duplicating components.
- `surface`, `ink`, `line`, and `signal` roles are a sound migration target.
- Global focus-visible styling exists.
- Increased-contrast and reduced-motion modes are considered.
- Route mood prevents atmospheric effects from overwhelming quiet or immersive work.
- Artwork supplies content color while chrome remains controlled.

### Problems

- There are still hundreds of raw palette utility uses in renderer source.
- Meaningful copy sometimes uses decorative contrast tokens.
- Tiny metadata typography is overused.
- Motion/transition classes are not uniformly gated by reduced-motion variants or CSS media rules.
- Bespoke page-level patterns can drift from the shared primitives.
- Fixed widths and heights need validation against the `940 x 600` minimum.

### Recommended token additions

Add named composition utilities rather than more colors:

- `text-meta`: nonessential 10px telemetry.
- `text-caption`: meaningful 12px supporting copy.
- `text-body-compact`: 13px dense body copy.
- `control-label`: 12px to 13px control label.
- `page-gutter`: responsive shell gutter.
- `content-reading`, `content-standard`, `content-wide`: standard maximum widths.
- `row-actions`: persistent/hover/focus visibility contract.
- `route-subnav`: overflow behavior and edge fade.

Do not remove the existing atmosphere. Make the information hierarchy less dependent on tiny uppercase styling.

## 23. Responsive and viewport audit

The application is desktop-only, so it does not need a mobile redesign. It does need to work deliberately at its own minimum window.

### Main risks at `940 x 600`

- 76px Topbar plus learning context bands and exercise headers can leave little vertical workspace.
- Persistent evidence/context rails disappear at `lg`; any unique action or fact inside them must still be available.
- Six-plus item subnavigation can require horizontal scrolling without an obvious affordance.
- Large dialogs and settings panels can exceed available height.
- Readers with auto-hiding bars and mining panels need careful focus behavior.
- Fixed sidebars and `max-w-[44vw]` panels can leave a narrow primary workspace.
- Dense header action clusters can wrap unpredictably.

### Required visual verification matrix

Every global primitive and redesigned section should be checked at:

| Viewport | Purpose |
|---|---|
| `940 x 600` | Minimum supported window and vertical-pressure case |
| `1280 x 820` | Default application window |
| `1600 x 1000` | Large desktop and evidence-rail behavior |
| Ultrawide | Maximum-width and line-length control |

Repeat representative screens in both themes, with reduced motion, increased contrast, keyboard-only navigation, empty state, populated state, loading, and error.

## 24. Performance and scalability audit

### Current strengths

- Route-level lazy loading is now present for secondary pages.
- Libraries and queues avoid mounting unbounded collections.
- Search has an indexed strategy for common substring searches.
- Media thumbnails and player-context separation reduce repeated work.
- Local IPC avoids network latency for core data.

### Remaining concerns

- Large renderer modules increase parse, change, and review cost even when they are lazy-loaded.
- `SettingsPage.tsx`, `TournamentPage.tsx`, `MediaDetailPage.tsx`, `MangaReaderPage.tsx`, `HomePage.tsx`, and several quiz/music pages are too large to reason about comfortably.
- `src/shared/types.ts` at 4,924 lines creates a broad shared contract surface.
- Main/shared course and seed files are also extremely large.
- The global Query Client uses a five-second stale time and default retry behavior; deterministic local IPC failures may produce unhelpful retries and repeated toasts.
- Home requests many independent summaries. This may be fine locally, but a single dashboard-overview IPC or visible-widget query strategy could reduce orchestration if profiling shows a problem.

### Recommendation

Do not optimize from old bundle artifacts. First complete a fresh build and profile on the laptop. Refactor giant files primarily for maintainability, then measure whether chunk boundaries or render behavior improve.

Suggested splits:

- Settings: one module per section plus field registry.
- Media Detail: identity/hero, tracking controls, relationship navigation, and tab modules.
- Home: fixed hero/Now/Today shell plus independent widget modules.
- Readers: state hooks, HUD, dialogs, chapter navigation, mining integration.
- Tournament and large quizzes: game-state reducer, stage components, setup, results.
- Shared types: domain-specific contract files re-exported through a stable barrel.

## 25. Architecture and code-quality audit

### Strengths

- Strict TypeScript and shared contracts reduce many classes of error.
- Renderer-to-main access goes through a defined preload/API layer.
- Domain repositories and pure helpers are heavily tested.
- Architecture documentation captures many hard-won invariants.
- Route loading boundaries are source-tested.
- Data migration and import behavior receive serious attention.

### Risks

- Route metadata is duplicated.
- The preload/API and shared type surfaces are broad and monolithic.
- Giant page files encourage local one-off UI patterns.
- No ESLint or JSX accessibility configuration exists.
- No repository-owned formatter configuration exists.
- Static source-guard tests are useful but can pass while behavior is wrong.
- The package version is `0.2.0`, while repository tags and release stamping use a different progression.
- Local packaging scripts do not obviously share CI's version-stamping step.
- The package description no longer represents the full product.

### Recommendation

Introduce a `RouteDefinition` registry containing path family, label, section, keywords, visibility, breadcrumb behavior, and lazy component reference or route ID. Use it to derive adaptive navigation, command destinations, titles, and route tests where feasible.

Do not attempt a complete architectural rewrite. Refactor along the same section sequence as the UI redesign so each slice leaves a stronger shared foundation.

## 26. Security and privacy audit

### Strong controls

- Local-only application model.
- No account requirement or server profile.
- Context isolation enabled.
- Renderer-created windows denied.
- Guarded external-link handling.
- Validated local-media protocol paths.
- Content security policy.
- Sensitive log redaction.
- Export sanitization and domain-specific data safeguards documented and tested.

### Immediate concerns

1. Electron 31 is end-of-life and should be upgraded.
2. Provider credentials appear to be plaintext settings and should use OS-backed protection.
3. `sandbox: false` is a defense-in-depth gap. Enabling it may affect preload/native integrations, so investigate and test rather than toggling it blindly.
4. CSP permits inline styles. This is understandable given current dynamic styling and is lower priority than the Electron upgrade and secret storage.
5. Dependency vulnerability status could not be refreshed in this environment.

### Secret-storage caveat

Electron's `safeStorage` uses platform providers, but Linux may fall back to a `basic_text` backend where protection is weak. The settings UI should communicate whether secure storage is available and avoid creating a false sense of security.

## 27. Testing and release audit

### Current strengths

- Large domain-level test suite.
- Release workflow installs, typechecks, tests, packages, and checks native artifacts on Linux and Windows.
- Native `better-sqlite3` compatibility is explicitly handled.
- Repository documentation correctly distinguishes backend verification from UI verification.

### Missing layers

- Component interaction tests.
- Accessibility tests.
- Electron end-to-end tests.
- Visual regression checks.
- Keyboard journey checks.
- Fresh dependency security audit in this environment.
- A single version source shared by local and CI packaging.

### Recommended initial test matrix

| Layer | Initial coverage |
|---|---|
| Component | Tabs/Subnav, Dialog, Popover, Drawer, ContextMenu, Field, PillGroup, SortableList |
| Page interaction | Search/command, Media quick edit, Settings save state, Reader completion, Checklist reorder |
| Electron E2E | Add/import title, update tracking, resume reader, start due study, music queue, task cancel |
| Accessibility | Shell, Home, Media List, Media Detail, one study session, Settings, both reader overlays |
| Visual | Minimum/default/large widths in both themes, populated/empty/loading/error |

## 28. Ranked implementation backlog

### Foundation milestone

1. Upgrade Electron and validate packaging/native modules.
2. Add renderer test tooling and tests for the primitives being changed.
3. Split `Tabs` into route subnavigation and true tabs.
4. Build shared Field, Dialog, Popover, and Drawer contracts.
5. Fix command/search conflict and centralize route metadata.
6. Add keyboard reorder and visible focus equivalents for hover-only actions.
7. Audit meaningful `gray-600` and sub-12px text.
8. Protect provider secrets.

### Product milestone

1. Redesign shell/navigation/omnibox.
2. Redesign Home around Now, Today, Explore.
3. Standardize Media List, Context Lens fallback, detail navigation, and edit forms.
4. Standardize reader overlays and focus behavior.
5. Simplify Music library header and queue model.
6. Apply the adaptive next-action hierarchy across Japanese, English, and Programming.
7. Reduce choice overload in Quiz and duplicate pressure in Gacha.
8. Clarify install/data-source states in Football and Wrestling.
9. Unify Lists, Tier lists, Tags, Checklist, and Stats interaction patterns.
10. Modularize Settings and polish operational pages.

## 29. Recommended section-by-section design order

The first visual design work should start with the shell because every later screen depends on its navigation, spacing, search, and responsive contract.

1. **Shell, navigation, and global omnibox**
2. **Home**
3. **Library catalogue and filters**
4. **Media detail and edit forms**
5. **People, companies, characters, and connection browsing**
6. **Manga and book readers**
7. **Music library, player, queue, downloads, and statistics**
8. **Japanese learning** after reviewing the existing pending preview
9. **English learning**
10. **Programming learning**
11. **Quiz and tournament surfaces**
12. **Gacha**
13. **Football**
14. **Wrestling**
15. **Lists, tier lists, and tags**
16. **Checklist and statistics**
17. **Settings, tasks, logs, torrents, and bulk import**

## 30. Working method for each design section

For every section, use the same decision process:

1. **Define the job:** the single primary user outcome and the secondary outcomes.
2. **Inventory the current surface:** data, actions, states, shortcuts, dependencies, and route relationships.
3. **Remove duplication:** identify what belongs in the global shell, shared primitives, or another section.
4. **Set hierarchy:** one primary action, supporting actions, evidence, navigation, and rare actions.
5. **Specify states:** first run, empty, loading, partial, error, offline/tool missing, populated, and long-data cases.
6. **Specify interaction:** keyboard order, shortcuts, focus entry/restoration, destructive confirmation, and announcements.
7. **Specify responsive behavior:** minimum/default/large desktop widths and minimum height.
8. **Specify both themes:** use semantic tokens and preserve section identity.
9. **Create a code-ready component plan:** existing components to reuse, new shared primitives, files to split, and exact acceptance criteria.
10. **Implement in a small Codex slice:** no broad unrelated refactor.
11. **Verify:** typecheck, tests, build, and real-app visual/keyboard verification on the laptop.

## 31. Definition of done for a redesigned section

A section is not complete merely because its default populated state looks better. It is complete when:

- The primary user job is obvious within a few seconds.
- There is no more than one visually dominant primary action per state.
- Navigation uses correct link, subnav, tab, menu, toggle, and dialog semantics.
- Every form control has a programmatic label and useful error text.
- Every pointer interaction has a keyboard path.
- Focus remains visible and is intentionally placed/restored.
- Meaningful text is readable in both themes and increased-contrast mode.
- Motion respects reduced-motion preferences.
- The page works at `940 x 600`, `1280 x 820`, and a large desktop width.
- Empty, loading, error, long-content, and missing-tool states are designed.
- Existing local-first and offline guarantees remain intact.
- Shared component behavior is covered by tests.
- The real Electron UI has been visually and keyboard verified on the laptop.

## 32. Final recommendation

Do not begin by restyling individual cards. First repair the global interaction contract: route navigation versus tabs, search versus command navigation, dialogs/popovers/drawers, labelled fields, and keyboard reordering. Then redesign the shell and Home hierarchy. Once those foundations are stable, every domain section can be simplified without producing another competing pattern.

The project already has the visual personality and functional depth it needs. The next quality jump will come from making that depth easier to navigate, easier to understand, and reliably operable for every interaction mode.
