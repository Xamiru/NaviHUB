import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const root = fileURLToPath(new URL('..', import.meta.url))
const claudeSkillsRoot = join(root, '.claude', 'skills')
const codexSkillsRoot = join(root, '.agents', 'skills')

function skillNames(dir: string): string[] {
  return readdirSync(dir)
    .filter((name) => {
      const skillDir = join(dir, name)
      return statSync(skillDir).isDirectory() && existsSync(join(skillDir, 'SKILL.md'))
    })
    .sort()
}

function frontmatter(body: string): string {
  const match = body.match(/^---\n([\s\S]*?)\n---/)
  if (!match) throw new Error('SKILL.md is missing YAML frontmatter')
  return match[1]
}

describe('dual-agent setup stays synchronized', () => {
  it('keeps CLAUDE.md and AGENTS.md byte-for-byte identical', () => {
    const claude = readFileSync(join(root, 'CLAUDE.md'))
    const agents = readFileSync(join(root, 'AGENTS.md'))
    expect(Buffer.compare(claude, agents)).toBe(0)
  })

  it('provides a Codex adapter for every authoritative Claude skill', () => {
    expect(skillNames(codexSkillsRoot)).toEqual(skillNames(claudeSkillsRoot))
  })

  for (const name of skillNames(claudeSkillsRoot)) {
    it(`${name} adapter preserves metadata and resolves its authoritative skill`, () => {
      const sourcePath = join(claudeSkillsRoot, name, 'SKILL.md')
      const adapterDir = join(codexSkillsRoot, name)
      const adapterPath = join(adapterDir, 'SKILL.md')
      const relativeSource = `../../../.claude/skills/${name}/SKILL.md`
      const source = readFileSync(sourcePath, 'utf8')
      const adapter = readFileSync(adapterPath, 'utf8')

      expect(frontmatter(adapter)).toBe(frontmatter(source))
      expect(adapter).toContain(relativeSource)
      expect(existsSync(resolve(adapterDir, relativeSource))).toBe(true)
    })
  }
})
