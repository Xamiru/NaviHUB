---
name: db-change
description: Change the NaviHUB database safely — add a table or column, write the migration, keep the Drizzle mirror and the export wipe list in step, and prove it against a pre-existing database. Use for ANY schema change; getting this wrong has shipped an app that would not start.
---

# Changing the schema

**The failure mode this prevents:** on 2026-08-03 a release left the app unable to open at all —
`SqliteError: no such column: status`. The tests were green, because `createTestDb()` builds from
the *current* `init.sql`, so a fresh schema always agrees with itself. **The user's database is
years older than your `init.sql`.** Nothing about a green suite tells you a live DB will open.

## 1. Is it a new table, or a column on an existing one?

**New table** — add it to `src/main/db/init.sql` and `src/main/db/schema.ts`. Nothing else is
required for it to exist; `CREATE TABLE IF NOT EXISTS` runs on every startup.

**Column on an existing table** — add it to both files **and** add an idempotent
`ensureColumn(...)` call in `runMigrations()` (`src/main/db/connection.ts`, ~28 call sites to copy).
Without it, the live DB simply does not have the column and every read throws.

## 2. Indexes — the rule that caused the outage

An index touching an `ensureColumn`'d column goes in **`runMigrations()`, never `init.sql`**.
`init.sql` runs *first*, so on a live pre-migration DB the index names a column that does not exist
yet and startup dies. `tests/initLegacyDb.test.ts` replays exactly this; extend it.

Note SQLite cannot `ALTER` away a `NOT NULL` or add an FK — `connection.ts` has guarded
`dropNotNull`/`dropColumn` helpers that do the copy-and-rename dance. Some link tables are
deliberately FK-less; reads `LEFT JOIN` and tolerate deletion.

## 3. Does it hold personal data?

If yes it **must** be wiped in `scripts/sanitizeSql.cjs`, or it ships inside the user's "sanitized"
export. `tests/sanitizeCoverage.test.ts` now fails on any table that is neither wiped nor listed as
canonical — so make the call deliberately rather than by omission. Order matters in that file: FK
children before parents.

Settings keys holding paths, tokens or API keys go in the same file's key list.

## 4. Mirror anything that duplicates the schema

`src/main/dict/init.sql` → also the `dictDb.ts` DROP list **and** `sweepOrphans()`.
`gamesCatalogSchema.ts` → also the embedded copy in `scripts/build-games-catalog.cjs`.
Both are guarded by tests; run them.

## 5. Prove it against an OLD database

This is the step that was missing when the app broke.

```bash
npm run test        # initLegacyDb replays a real pre-migration shape
```

If your change is at all structural, add a case to `tests/initLegacyDb.test.ts` that builds the
*old* shape, runs the migration, and asserts the app's own queries still work.

On the laptop you can also open a **copy** of the real DB (never the original):

```bash
cp ~/.config/navihub/navihub.db /tmp/probe.db
npm run db:query -- --db /tmp/probe.db ".schema media_item"
```

## Checklist

- [ ] `init.sql` updated
- [ ] `schema.ts` updated
- [ ] `ensureColumn` added, if an existing table gained a column
- [ ] index (if any) placed in `runMigrations()`, not `init.sql`
- [ ] `sanitizeSql.cjs` updated if personal — or consciously added to `CANONICAL_SURVIVORS`
- [ ] dict / gamesCatalog mirrors updated if touched
- [ ] `npm run test` green, including `initLegacyDb`, `sanitizeCoverage`, `dictSchemaSync`
- [ ] told the user if the change needs a re-import to take effect
