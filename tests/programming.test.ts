import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as programmingRepo from '../src/main/repos/programmingRepo'
import { PROG_COURSES, progCourse, progLesson, progLessonKey } from '../src/shared/programming/courses'
import { CHEAT_SHEETS, normalizeCmd, practicePool } from '../src/shared/programming/cheatsheets'
import { bestAttempts, passedChecks } from '../src/shared/programming/attempts'
import type { ProgAttempt } from '../src/shared/types'
import { REGEX_GOLF_PUZZLES } from '../src/shared/programming/regexGolf'
import { SQL_EXERCISES } from '../src/shared/programming/sqlExercises'
import { PROG_SNIPPETS, SNIPPET_LANGS } from '../src/shared/programming/snippets'
import { commandQuestions, courseQuestions, snippetQuestions } from '../src/shared/programming/quizPools'
import { parseMarkdown } from '../src/shared/markdown'

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

describe('course catalog content', () => {
  it('has unique kebab-case course and lesson keys', () => {
    const courseKeys = PROG_COURSES.map((c) => c.key)
    expect(new Set(courseKeys).size).toBe(courseKeys.length)
    for (const c of PROG_COURSES) {
      expect(c.key, c.key).toMatch(KEBAB)
      expect(c.title.trim()).not.toBe('')
      expect(c.lessons.length).toBeGreaterThan(0)
      const lessonKeys = c.lessons.map((l) => l.key)
      expect(new Set(lessonKeys).size, c.key).toBe(lessonKeys.length)
      for (const k of lessonKeys) expect(k, `${c.key}/${k}`).toMatch(KEBAB)
    }
  })

  it('every lesson has a parseable Markdown body with balanced code fences', () => {
    for (const c of PROG_COURSES) {
      for (const l of c.lessons) {
        const id = `${c.key}/${l.key}`
        expect(l.body.trim(), id).not.toBe('')
        // A dangling ``` would swallow the rest of the lesson into one code block.
        const fenceLines = l.body.split('\n').filter((line) => line.trimStart().startsWith('```'))
        expect(fenceLines.length % 2, `${id}: unbalanced code fences`).toBe(0)
        const blocks = parseMarkdown(l.body)
        expect(blocks.length, id).toBeGreaterThan(0)
      }
    }
  })

  it('every question has 4 options and an in-range correct index', () => {
    for (const c of PROG_COURSES) {
      for (const l of c.lessons) {
        for (const q of l.questions) {
          const id = `${c.key}/${l.key}: ${q.prompt.slice(0, 40)}`
          expect(q.options.length, id).toBe(4)
          expect(q.correct, id).toBeGreaterThanOrEqual(0)
          expect(q.correct, id).toBeLessThan(4)
          expect(new Set(q.options).size, `${id}: duplicate options`).toBe(4)
          expect(q.explain?.trim().length ?? 0, `${id}: explain required`).toBeGreaterThan(10)
          for (const o of q.options) {
            expect(o.toLowerCase(), `${id}: lazy option`).not.toMatch(/^(all|none) of the above/)
          }
        }
        expect(l.questions.length, `${c.key}/${l.key}: at least 3 questions`).toBeGreaterThanOrEqual(3)
      }
      expect(c.lessons.length, `${c.key}: at least 7 lessons`).toBeGreaterThanOrEqual(7)
    }
  })

  it('progLesson resolves full keys and rejects unknown ones', () => {
    const c = PROG_COURSES[0]
    const l = c.lessons[0]
    const hit = progLesson(progLessonKey(c.key, l.key))
    expect(hit?.course.key).toBe(c.key)
    expect(hit?.lesson.key).toBe(l.key)
    expect(hit?.index).toBe(0)
    expect(progLesson('nope/nah')).toBeNull()
    expect(progLesson('nokeyatall')).toBeNull()
    expect(progCourse('go-from-python')?.lessons.length).toBeGreaterThan(10)
  })
})

describe('data science and engineering mastery course', () => {
  const course = progCourse('data-science-engineering')!
  const expectedOrder = [
    'data-lifecycle',
    'python-foundations',
    'reproducible-projects',
    'numpy-arrays',
    'pandas-dataframes',
    'cleaning-and-types',
    'analytical-sql',
    'exploration-and-visualization',
    'descriptive-statistics',
    'probability-and-sampling',
    'estimation-and-uncertainty',
    'experiments-and-causality',
    'ml-problem-framing',
    'preprocessing-and-leakage',
    'regression',
    'classification',
    'trees-and-ensembles',
    'model-selection',
    'unsupervised-learning',
    'time-series',
    'neural-networks',
    'nlp-and-embeddings',
    'interpretability-and-fairness',
    'production-ml',
    'ingestion-and-apis',
    'etl-elt-idempotency',
    'data-modeling',
    'parquet-and-partitioning',
    'warehouses-and-lakehouses',
    'analytics-transformations',
    'airflow-orchestration',
    'spark-distributed-compute',
    'kafka-streaming',
    'quality-governance-operations',
    'capstone-analytics-platform',
    'capstone-ml-and-streaming'
  ]

  it('keeps the complete beginner-to-master path in dependency order', () => {
    expect(course).toBeTruthy()
    expect(course.lessons.map((lesson) => lesson.key)).toEqual(expectedOrder)
  })

  it('keeps every lesson substantial, self-contained, and assessed', () => {
    expect(course.lessons).toHaveLength(36)
    expect(course.lessons.flatMap((lesson) => lesson.questions)).toHaveLength(144)
    for (const lesson of course.lessons) {
      expect(lesson.body, `${lesson.key}: guided practice`).toContain('## Guided practice')
      expect(lesson.body, `${lesson.key}: worked solution`).toContain('## Worked solution')
      expect(
        lesson.body.trim().split(/\s+/).length,
        `${lesson.key}: substantial standalone lesson`
      ).toBeGreaterThanOrEqual(350)
      expect(lesson.questions, `${lesson.key}: four-question check`).toHaveLength(4)
    }
  })
})

describe('devops engineering mastery course', () => {
  const course = progCourse('devops-engineering')!
  const expectedOrder = [
    'devops-system',
    'shell-and-automation',
    'linux-files-permissions',
    'processes-and-services',
    'networking-foundations',
    'git-collaboration',
    'scripting-and-configuration',
    'application-operability',
    'testing-strategy',
    'continuous-integration',
    'continuous-delivery',
    'container-foundations',
    'container-builds',
    'compose-local-systems',
    'cloud-foundations',
    'infrastructure-as-code',
    'iac-state-and-modules',
    'configuration-management',
    'kubernetes-architecture',
    'kubernetes-workloads',
    'kubernetes-networking',
    'kubernetes-config-storage',
    'kubernetes-resources-scaling',
    'kubernetes-security',
    'kubernetes-packaging',
    'gitops-reconciliation',
    'observability-signals',
    'prometheus-alerting',
    'slos-error-budgets',
    'incident-response',
    'resilience-disaster-recovery',
    'supply-chain-security',
    'platform-engineering',
    'cost-performance-sustainability',
    'database-operations',
    'advanced-operations',
    'capstone-local-delivery',
    'capstone-platform-sre'
  ]

  it('keeps the complete beginner-to-master path in dependency order', () => {
    expect(course).toBeTruthy()
    expect(course.lessons.map((lesson) => lesson.key)).toEqual(expectedOrder)
  })

  it('keeps every lesson substantial, self-contained, and assessed', () => {
    expect(course.lessons).toHaveLength(38)
    expect(course.lessons.flatMap((lesson) => lesson.questions)).toHaveLength(152)
    for (const lesson of course.lessons) {
      expect(lesson.body, `${lesson.key}: guided practice`).toContain('## Guided practice')
      expect(lesson.body, `${lesson.key}: worked solution`).toContain('## Worked solution')
      expect(
        lesson.body.trim().split(/\s+/).length,
        `${lesson.key}: substantial standalone lesson`
      ).toBeGreaterThanOrEqual(350)
      expect(lesson.questions, `${lesson.key}: four-question check`).toHaveLength(4)
    }
  })
})

describe('six self-contained programming mastery courses', () => {
  const expected: Record<string, string[]> = {
    'cybersecurity-engineering': [
      'security-risk',
      'ethical-lab',
      'cryptography-foundations',
      'identity-authentication',
      'authorization-iam',
      'threat-modeling',
      'secure-coding',
      'web-security',
      'browser-security',
      'api-security',
      'network-defense',
      'endpoint-hardening',
      'vulnerability-management',
      'cloud-container-security',
      'secrets-key-management',
      'detection-engineering',
      'incident-forensics',
      'penetration-testing',
      'governance-privacy',
      'capstone-security-operations'
    ],
    'full-stack-web': [
      'web-platform',
      'semantic-html',
      'css-cascade',
      'layout-responsive',
      'javascript-language',
      'dom-events',
      'async-web-apis',
      'typescript-tooling',
      'accessibility-forms',
      'react-components',
      'state-routing',
      'server-api',
      'auth-data',
      'testing-quality',
      'performance-delivery',
      'capstone-fullstack'
    ],
    'backend-distributed-systems': [
      'backend-contracts',
      'api-design',
      'domain-data',
      'concurrency',
      'transactions-idempotency',
      'queues-events',
      'caching',
      'service-boundaries',
      'time-order',
      'replication-consistency',
      'consensus-coordination',
      'partitioning-sharding',
      'resilience',
      'observability',
      'performance-security',
      'capstone-distributed'
    ],
    'computer-systems-c': [
      'machine-model',
      'c-toolchain',
      'types-control-functions',
      'pointers-arrays',
      'memory-ownership',
      'strings-buffers',
      'structs-bits-abi',
      'compilation-linking',
      'debugging-testing',
      'files-syscalls',
      'processes-signals',
      'threads-sync',
      'atomics-memory-model',
      'os-memory-filesystems',
      'sockets-protocols',
      'performance-security',
      'capstone-systems'
    ],
    'database-engineering': [
      'relational-model',
      'sql-querying',
      'storage-pages',
      'indexes',
      'query-planning',
      'transactions',
      'isolation-mvcc',
      'schema-evolution',
      'partitioning-retention',
      'replication-ha',
      'distributed-databases',
      'backup-recovery',
      'observability-tuning',
      'security-governance',
      'capstone-database'
    ],
    'ai-llm-engineering': [
      'ai-system-framing',
      'ml-foundations',
      'neural-transformers',
      'tokens-embeddings',
      'inference-decoding',
      'prompting-structured',
      'model-integration',
      'retrieval-rag',
      'evaluation',
      'grounding-uncertainty',
      'agents-tools',
      'memory-workflows',
      'adaptation-serving',
      'safety-security-privacy',
      'observability-governance',
      'capstone-ai-systems'
    ]
  }

  it('freezes all 100 lessons in prerequisite order', () => {
    expect(Object.values(expected).reduce((total, keys) => total + keys.length, 0)).toBe(100)
    for (const [courseKey, lessonKeys] of Object.entries(expected)) {
      expect(progCourse(courseKey)?.lessons.map((lesson) => lesson.key), courseKey).toEqual(lessonKeys)
    }
  })

  it('keeps all 400 lessons checks and standalone teaching structure', () => {
    let questionCount = 0
    const shortLessons: string[] = []
    for (const courseKey of Object.keys(expected)) {
      const course = progCourse(courseKey)!
      expect(course.title.toLowerCase(), `${courseKey}: beginner-to-master title`).toContain(
        'beginner to master'
      )
      expect(course.description.toLowerCase(), `${courseKey}: self-contained description`).toContain(
        'self-contained'
      )
      for (const lesson of course.lessons) {
        const id = `${courseKey}/${lesson.key}`
        expect(lesson.body, `${id}: foundations`).toContain('## Foundations')
        expect(lesson.body, `${id}: engineering model`).toContain('## Engineering model')
        expect(lesson.body, `${id}: failure judgment`).toContain('## Failure modes and judgment')
        expect(lesson.body, `${id}: guided practice`).toContain('## Guided practice')
        expect(lesson.body, `${id}: worked solution`).toContain('## Worked solution')
        expect(lesson.body, `${id}: mastery standard`).toContain('## Mastery standard')
        const words = lesson.body.trim().split(/\s+/).length
        if (words < 250) shortLessons.push(`${id}: ${words} words`)
        expect(lesson.questions, `${id}: four explained checks`).toHaveLength(4)
        questionCount += lesson.questions.length
      }
    }
    expect(shortLessons, 'every mastery lesson has at least 250 words').toEqual([])
    expect(questionCount).toBe(400)
  })
})

describe('cheatsheet content', () => {
  it('has unique sheet keys and non-empty entries', () => {
    const keys = CHEAT_SHEETS.map((s) => s.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const s of CHEAT_SHEETS) {
      expect(s.key).toMatch(KEBAB)
      expect(s.entries.length).toBeGreaterThan(0)
      for (const e of s.entries) {
        expect(e.cmd.trim(), `${s.key}: empty cmd`).not.toBe('')
        expect(e.desc.trim(), `${s.key}/${e.cmd}: empty desc`).not.toBe('')
        if (e.answers) expect(e.answers.length, `${s.key}/${e.cmd}`).toBeGreaterThan(0)
      }
    }
  })

  it('practicePool returns only drillable entries, normalized, and filters by sheet', () => {
    const all = practicePool(null)
    const drillable = CHEAT_SHEETS.flatMap((s) => s.entries).filter(
      (e) => e.answers && e.answers.length > 0
    )
    expect(all.length).toBe(drillable.length)
    for (const item of all) {
      for (const a of item.answers) {
        expect(a, `${item.cmd}: answer not normalized`).toBe(normalizeCmd(a))
        expect(a).not.toBe('')
      }
    }
    const gitOnly = practicePool(['git'])
    expect(gitOnly.length).toBeGreaterThan(0)
    expect(gitOnly.every((i) => i.sheetKey === 'git')).toBe(true)
    expect(practicePool([]).length).toBe(all.length) // empty selection = all
  })

  it('normalizeCmd collapses whitespace and spaces pipes uniformly', () => {
    expect(normalizeCmd('  git   status ')).toBe('git status')
    expect(normalizeCmd('sort|uniq -c |sort -rn')).toBe('sort | uniq -c | sort -rn')
    expect(normalizeCmd('ls')).toBe('ls')
  })
})

describe('snippet decks (predict the output / spot the bug)', () => {
  it('keys are unique and <lang>-<slug>, decks are big enough per language and kind', () => {
    const keys = PROG_SNIPPETS.map((s) => s.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const s of PROG_SNIPPETS) {
      expect(s.key, s.key).toMatch(new RegExp(`^${s.lang}-[a-z0-9]+(-[a-z0-9]+)*$`))
      expect(SNIPPET_LANGS.map((l) => l.key)).toContain(s.lang)
    }
    for (const l of SNIPPET_LANGS) {
      expect(PROG_SNIPPETS.filter((s) => s.lang === l.key).length, l.key).toBeGreaterThanOrEqual(10)
    }
    expect(PROG_SNIPPETS.filter((s) => s.kind === 'output').length).toBeGreaterThanOrEqual(20)
    expect(PROG_SNIPPETS.filter((s) => s.kind === 'bug').length).toBeGreaterThanOrEqual(20)
  })

  it('every snippet is well-formed: ≤ 20 code lines, 4 distinct options, in-range answer, explain', () => {
    for (const s of PROG_SNIPPETS) {
      expect(s.code.trim().length, s.key).toBeGreaterThan(0)
      expect(s.code.split('\n').length, `${s.key}: code too long`).toBeLessThanOrEqual(20)
      expect(s.options.length, s.key).toBe(4)
      expect(new Set(s.options).size, `${s.key}: duplicate options`).toBe(4)
      expect(s.correct, s.key).toBeGreaterThanOrEqual(0)
      expect(s.correct, s.key).toBeLessThan(4)
      expect(s.explain.trim().length, `${s.key}: explain`).toBeGreaterThan(20)
      expect(s.prompt.trim().length, s.key).toBeGreaterThan(5)
      for (const o of s.options) {
        expect(o.toLowerCase(), `${s.key}: lazy option`).not.toMatch(/^(all|none) of the above/)
      }
    }
  })

  it('answer positions are spread (no index above 40%)', () => {
    const counts = [0, 0, 0, 0]
    for (const s of PROG_SNIPPETS) counts[s.correct]++
    for (const c of counts) expect(c / PROG_SNIPPETS.length).toBeLessThanOrEqual(0.4)
  })
})

describe('quiz pools (pure builders)', () => {
  const seq = (): (() => number) => {
    let i = 0
    return () => ((i += 0.37) % 1)
  }

  it('course questions carry a lesson review route and re-find the answer after shuffling', () => {
    const qs = courseQuestions(null, seq())
    expect(qs.length).toBeGreaterThan(200)
    for (const q of qs) {
      expect(q.options.length).toBe(4)
      expect(q.reviewTo).toMatch(/^\/programming\/course\//)
      expect(q.code).toBeNull()
    }
    // Same rng → same deck; the answer index follows the shuffled text.
    const again = courseQuestions(null, seq())
    expect(again.map((q) => q.options[q.correct])).toEqual(qs.map((q) => q.options[q.correct]))
  })

  it('command questions never mix keystroke chords with CLI commands, and link to the sheet', () => {
    const chords = new Set(
      CHEAT_SHEETS.flatMap((s) => s.entries.filter((e) => !e.answers?.length).map((e) => e.cmd))
    )
    for (const q of commandQuestions(null, seq())) {
      const kinds = new Set(q.options.map((o) => chords.has(o)))
      expect(kinds.size, q.id).toBe(1)
      expect(new Set(q.options).size).toBe(4)
      expect(q.reviewTo).toMatch(/^\/programming\/cheatsheets\?sheet=/)
      expect(q.mono).toBe(true)
    }
  })

  it('snippet questions filter by language and kind and carry the code', () => {
    const all = snippetQuestions(null, null, seq())
    expect(all.length).toBe(PROG_SNIPPETS.length)
    const py = snippetQuestions('python', 'output', seq())
    expect(py.length).toBe(PROG_SNIPPETS.filter((s) => s.lang === 'python' && s.kind === 'output').length)
    for (const q of py) {
      expect(q.code).toBeTruthy()
      expect(q.context).toContain('python')
      expect(q.options[q.correct]).toBe(PROG_SNIPPETS.find((s) => `snippet/${s.key}` === q.id)!.options[PROG_SNIPPETS.find((s) => `snippet/${s.key}` === q.id)!.correct])
    }
  })
})

describe('programmingRepo', () => {
  beforeEach(() => {
    db = createTestDb()
  })

  const KEY = progLessonKey(PROG_COURSES[0].key, PROG_COURSES[0].lessons[0].key)

  it('completes idempotently, lists, and uncompletes', () => {
    expect(programmingRepo.progress()).toEqual([])
    programmingRepo.complete(KEY)
    programmingRepo.complete(KEY) // INSERT OR IGNORE — no duplicate, no throw
    const rows = programmingRepo.progress()
    expect(rows).toHaveLength(1)
    expect(rows[0].lessonKey).toBe(KEY)
    expect(rows[0].completedAt).toBeTruthy()
    programmingRepo.uncomplete(KEY)
    expect(programmingRepo.progress()).toEqual([])
  })

  it('rejects lesson keys that are not in the catalog', () => {
    expect(() => programmingRepo.complete('go-from-python/definitely-not-a-lesson')).toThrow()
    expect(() => programmingRepo.complete('garbage')).toThrow()
    // uncomplete of an unknown key is a harmless no-op delete
    expect(() => programmingRepo.uncomplete('garbage')).not.toThrow()
  })

  // ---- lesson self-check attempts ----
  it('records attempts (validated key, clamped score) and folds them into best/latest', () => {
    expect(() => programmingRepo.recordAttempt({ lessonKey: 'garbage', score: 1, total: 4 })).toThrow()
    programmingRepo.recordAttempt({ lessonKey: KEY, score: 2, total: 4 })
    programmingRepo.recordAttempt({ lessonKey: KEY, score: 9, total: 4 }) // clamped to 4
    programmingRepo.recordAttempt({ lessonKey: KEY, score: 3, total: 4 })
    const rows = programmingRepo.attempts()
    expect(rows.map((r) => r.score)).toEqual([2, 4, 3])
    const folded = bestAttempts(rows)
    expect(folded.get(KEY)).toMatchObject({ attempts: 3, best: { score: 4 }, latest: { score: 3 } })
    expect(passedChecks(rows)).toBe(1)
  })

  // A lesson's question count is not frozen — the attempt history is
  // append-only, so editing a lesson leaves rows with different totals under
  // one key. Ranked by raw score, an old 11/12 would outrank a later perfect
  // 10/10 and hide it from passedChecks().
  it('ranks best attempts by ratio, not raw score, across changed lesson lengths', () => {
    const at = (n: number): string => `2026-08-1${n}T00:00:00Z`
    const rows: ProgAttempt[] = [
      { lessonKey: KEY, score: 11, total: 12, at: at(1) },
      { lessonKey: KEY, score: 10, total: 10, at: at(2) }
    ]
    const best = bestAttempts(rows).get(KEY)!.best
    expect([best.score, best.total]).toEqual([10, 10])
    expect(passedChecks(rows)).toBe(1)

    // The reverse order folds identically — best must not depend on arrival.
    expect(passedChecks([rows[1], rows[0]])).toBe(1)

    // A higher raw score at a worse ratio never wins.
    const worse: ProgAttempt[] = [
      { lessonKey: KEY, score: 8, total: 10, at: at(1) },
      { lessonKey: KEY, score: 9, total: 20, at: at(2) }
    ]
    expect(bestAttempts(worse).get(KEY)!.best.total).toBe(10)
  })

  it('breaks ratio ties on the longer check, then on the later attempt', () => {
    const at = (n: number): string => `2026-08-1${n}T00:00:00Z`
    // Same ratio, different lengths: 6/6 is a stronger run than 3/3.
    const tie: ProgAttempt[] = [
      { lessonKey: KEY, score: 6, total: 6, at: at(1) },
      { lessonKey: KEY, score: 3, total: 3, at: at(2) }
    ]
    expect(bestAttempts(tie).get(KEY)!.best.total).toBe(6)
    // Identical ratio AND length: the most recent wins.
    const same: ProgAttempt[] = [
      { lessonKey: KEY, score: 4, total: 5, at: at(1) },
      { lessonKey: KEY, score: 4, total: 5, at: at(2) }
    ]
    expect(bestAttempts(same).get(KEY)!.best.at).toBe(at(2))
    // A zero-question lesson is ratio 0, never "passed", and never the best.
    const empty: ProgAttempt[] = [
      { lessonKey: KEY, score: 0, total: 0, at: at(1) },
      { lessonKey: KEY, score: 1, total: 4, at: at(2) }
    ]
    expect(bestAttempts(empty).get(KEY)!.best.total).toBe(4)
    expect(passedChecks([empty[0]])).toBe(0)
  })

  // ---- CLI weak commands ----
  it('CLI rounds bump misses, walk them back on first-try hits, and drop rows at zero', () => {
    const pool = practicePool(null)
    const [a, b, c] = pool.slice(0, 3).map((i) => i.key)
    programmingRepo.recordCliRound({ missed: [a, b, 'nope/garbage'], correct: [c] })
    expect(programmingRepo.cliMisses().map((m) => [m.cmdKey, m.misses])).toEqual([
      [a, 1],
      [b, 1]
    ])
    programmingRepo.recordCliRound({ missed: [a], correct: [b] })
    const after = programmingRepo.cliMisses()
    expect(after).toHaveLength(1)
    expect(after[0]).toMatchObject({ cmdKey: a, misses: 2 })
    // A key both missed and correct in one round counts as missed (worst wins).
    programmingRepo.recordCliRound({ missed: [c], correct: [c] })
    expect(programmingRepo.cliMisses().find((m) => m.cmdKey === c)?.misses).toBe(1)
  })

  it('practice pool keys are unique and match the frozen <sheet>/<answers[0]> shape', () => {
    const pool = practicePool(null)
    const keys = pool.map((i) => i.key)
    expect(new Set(keys).size).toBe(keys.length)
    for (const i of pool) expect(i.key).toBe(`${i.sheetKey}/${i.answers[0]}`)
  })

  // ---- solves ----
  it('records solves: sql is first-write-wins, regex keeps the shortest pattern; unknown keys throw', () => {
    const sqlKey = SQL_EXERCISES[0].key
    const rxKey = REGEX_GOLF_PUZZLES[0].key
    expect(() => programmingRepo.recordSolve({ kind: 'sql', key: 'nope' })).toThrow()
    expect(() => programmingRepo.recordSolve({ kind: 'regex', key: 'nope' })).toThrow()
    programmingRepo.recordSolve({ kind: 'sql', key: sqlKey, answer: 'SELECT title FROM anime' })
    programmingRepo.recordSolve({ kind: 'sql', key: sqlKey, answer: 'SELECT title FROM anime WHERE 1' })
    programmingRepo.recordSolve({ kind: 'regex', key: rxKey, best: 9, answer: '^[0-9]+$' })
    programmingRepo.recordSolve({ kind: 'regex', key: rxKey, best: 5, answer: '^\\d+$' })
    programmingRepo.recordSolve({ kind: 'regex', key: rxKey, best: 7, answer: '^\\d\\d*$' }) // worse, ignored
    const solves = programmingRepo.solves()
    expect(solves).toHaveLength(2)
    expect(solves.find((s) => s.kind === 'sql')).toMatchObject({ key: sqlKey, best: null, answer: 'SELECT title FROM anime' })
    expect(solves.find((s) => s.kind === 'regex')).toMatchObject({ key: rxKey, best: 5, answer: '^\\d+$' })
  })
})
