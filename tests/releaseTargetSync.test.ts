import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const builder = read('../electron-builder.yml')
const workflow = read('../.github/workflows/release.yml')
const updater = read('../src/main/updater.ts')
const catalog = read('../src/main/gamesCatalog.ts')

describe('public release target', () => {
  it('publishes each main push in order and keeps manual recovery', () => {
    expect(workflow).toMatch(/^on:\n  push:\n    branches:\n      - main\n  workflow_dispatch:$/m)
    expect(workflow).toMatch(/^concurrency:\n  group: release-\$\{\{ github.ref \}\}\n  queue: max\n  cancel-in-progress: false$/m)
    expect(workflow).toContain('needs: [verify, build]')
    expect(workflow).toContain('contents: write')
    expect(workflow).toContain('--target "${{ github.sha }}"')
  })

  it('keeps packaging, updates and the games catalog on the new owner', () => {
    const owner = builder.match(/^  owner: (\S+)$/m)?.[1]
    const repo = builder.match(/^  repo: (\S+)$/m)?.[1]
    expect(owner).toBe('Xamiru')
    expect(repo).toBe('NaviHUB')
    expect(updater).toContain(`const GITHUB_OWNER = '${owner}'`)
    expect(updater).toContain(`const GITHUB_REPO = '${repo}'`)
    expect(catalog).toContain(`const GITHUB_OWNER = '${owner}'`)
    expect(catalog).toContain(`const GITHUB_REPO = '${repo}'`)
  })

  it('uses the public release provider and direct public catalog download', () => {
    expect(builder).not.toMatch(/^  private: true$/m)
    expect(updater).not.toContain('private: true')
    expect(catalog).toContain('asset.browser_download_url')
    expect(catalog).not.toContain("getSetting('github.token')")
  })
})
