#!/usr/bin/env bash
# PreToolUse/Bash guard.
#
# `npx vitest` cannot work in this repo: better-sqlite3 is compiled against
# Electron's ABI, so plain node loads the wrong binary and every DB test dies.
# CLAUDE.md has said so since the first version, and it was still run in 5 of 48
# sessions — documentation demonstrably did not suffice, so this blocks it.
#
# Emits a PreToolUse deny decision; anything else passes through silently.
set -uo pipefail

cmd=$(jq -r '.tool_input.command // ""' 2>/dev/null) || exit 0

deny() {
  jq -nc --arg reason "$1" \
    '{hookSpecificOutput:{hookEventName:"PreToolUse",permissionDecision:"deny",permissionDecisionReason:$reason}}'
  exit 0
}

# npx/pnpm dlx/yarn dlx invoking vitest or tsc directly, anywhere in the command.
if printf '%s' "$cmd" | grep -qE '(^|[;&|(]|[[:space:]])(npx|pnpm[[:space:]]+dlx|yarn[[:space:]]+dlx)([[:space:]]+-[^[:space:]]+)*[[:space:]]+vitest([[:space:]]|$)'; then
  deny "npx vitest cannot work here — better-sqlite3 is built for Electron's ABI, so plain node loads the wrong native binary. Use: npm run test  (or, to filter: npm run test -- tests/foo.test.ts)"
fi

if printf '%s' "$cmd" | grep -qE '(^|[;&|(]|[[:space:]])(npx|pnpm[[:space:]]+dlx|yarn[[:space:]]+dlx)([[:space:]]+-[^[:space:]]+)*[[:space:]]+tsc([[:space:]]|$)'; then
  deny "Use npm run typecheck — it runs both tsconfig.node.json and tsconfig.web.json, which a bare tsc does not."
fi

exit 0
