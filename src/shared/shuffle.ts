// The ONE Fisher-Yates shuffle. Returns a copy; rng injectable for tests.
//
// Never `.sort(() => Math.random() - 0.5)`: an inconsistent comparator makes
// the engine's sort visibly biased — measured over 200k trials the element at
// index 0 landed in slot 1 35.8% of the time and in slot 3 15.8%, which for a
// 4-option quiz with the answer authored at index 0 is a real tell.
// tests/shuffle.test.ts text-guards the whole tree against that comparator.
export function shuffle<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}
