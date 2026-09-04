import axe, { type RunOptions, type Result } from 'axe-core'
import { expect } from 'vitest'

function describeViolations(violations: Result[]): string {
  return violations
    .map((violation) => {
      const targets = violation.nodes.map((node) => node.target.join(' ')).join(', ')
      return `${violation.id}: ${violation.help} (${targets})`
    })
    .join('\n')
}

export async function expectNoAxeViolations(
  container: Element,
  options?: RunOptions
): Promise<void> {
  // jsdom has no layout engine or canvas implementation, so axe cannot compute
  // real color contrast here. Contrast remains a theme-token/static check plus
  // a required laptop GUI verification; every other applicable axe rule runs.
  const runOptions: RunOptions = {
    ...options,
    rules: {
      'color-contrast': { enabled: false },
      ...options?.rules
    }
  }
  const results = await axe.run(container, runOptions)
  const { violations } = results
  expect(violations, describeViolations(violations)).toEqual([])
}
