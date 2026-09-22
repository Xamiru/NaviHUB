import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const read = (rel: string): string =>
  readFileSync(fileURLToPath(new URL(rel, import.meta.url)), 'utf8')

const builder = read('../electron-builder.yml')
const workflow = read('../.github/workflows/release.yml')
const localRelease = read('../.claude/skills/local-release/SKILL.md')
const packagingDocs = read('../docs/architecture/packaging-ci-updates.md')
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

  it('moves past the last release and rejects a tag owned by another commit', () => {
    const baselineCommits = Number(workflow.match(/BASE_COMMITS: (\d+)/)?.[1])
    const baselineMinor = Number(workflow.match(/BASE_MINOR: (\d+)/)?.[1])
    expect(baselineMinor + 54 - baselineCommits).toBe(50)
    expect(localRelease).toContain(`BASE_MINOR=${baselineMinor}, BASE_COMMITS=${baselineCommits}`)
    expect(packagingDocs).toContain(`"${baselineCommits} commits = 0.${baselineMinor}.0"`)
    expect(workflow).toContain('gh api "repos/$REPO/git/ref/tags/$TAG"')
    expect(workflow).toContain('[ "$tag_sha" != "${{ github.sha }}" ]')
    expect(workflow).toContain('exit 1')
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
