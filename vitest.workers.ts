import { availableParallelism } from 'node:os'

// Both Vitest suites cap their worker pool: the default (cores - 1) put seven
// Electron or jsdom workers per run on the laptop, and parallel agent sessions
// ran out of RAM. Three workers cost about 10 s on the main suite and save
// about 600 MB. NAVIHUB_TEST_WORKERS overrides the cap.
export function testWorkers(): { minWorkers: number; maxWorkers: number } {
  const requested = Number.parseInt(process.env.NAVIHUB_TEST_WORKERS ?? '', 10)
  const maxWorkers =
    requested > 0 ? requested : Math.max(1, Math.min(3, availableParallelism() - 1))
  return { minWorkers: 1, maxWorkers }
}
