# Removed features — do not rebuild

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — things that shipped and were deliberately taken out. Read before proposing them as new work.

**Key files** — git history holds the code

**Tests** — n/a

---

## Phone sync / Android companion

**Phone sync / Android companion — REMOVED (2026-08-01).** A LAN sync server (`sync.ts`, `syncOps.ts`, `SyncOp`/`SYNC_PROTOCOL_VERSION`, the `sync:*` IPC group, the Settings "Phone sync" card, `sync_batch`) shipped 2026-07-16 as Phase 0 of a Capacitor companion app. **The user scrapped the idea — do not rebuild it, and do not treat it as pending work.** NaviHUB is desktop-only. Two deliberate leftovers: the `sync_batch` table and the `sync.*` settings keys still exist in the user's live DB (removing them from init.sql doesn't drop them) so sanitizeSql.cjs keeps wiping both — `sanitizeDb` skips tables a DB doesn't have, so it's a no-op on fresh installs. Git history has the code if it's ever wanted back.

