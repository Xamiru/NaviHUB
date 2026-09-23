# Music and Games depth

Approved scope: game playthroughs and resume notes, album journals/ratings/shelves, smart playlists with personal tags.

Use additive personal tables, capture the active run at launch, preserve existing playtime and scanner identities. Reuse theme/UI primitives; no player engine changes.

Validation: focused repository and renderer tests, typecheck per slice, legacy DB and sanitizer coverage, full tests and production build. UI verification unavailable on this VPS.

Implemented: additive schemas + IPC, launch-time run association, resume/playthrough UI,
album journal + global shelf view, track tags/standouts, dynamic smart-playlist builder.
Focused persistence, lifecycle, scanner, navigation, migration/export and renderer/axe
checks passed. Final verification: typecheck and production build passed. The complete test gate passed the native SQLite smoke, 3,095 main tests and 133 renderer tests. Static UI review findings are resolved. Real GUI and Windows launch verification remain pending on the gaming PC.

Status: implementation and automated verification complete; all changes remain uncommitted.
