// Compact Japanese deinflector, modelled on Yomitan's algorithm: start from the
// surface form (wildcard word-type), repeatedly apply suffix-rewrite rules whose
// input word-type is compatible, and collect every candidate dictionary form.
// Over-generation is safe — a candidate that isn't a real word simply matches no
// term row, and the rules-intersection check in lookup.ts rejects a candidate
// whose word-type disagrees with the matched entry (飲んで → 飲ぶ is discarded
// because no v5 entry "飲ぶ" exists; 飲む survives).
//
// This supplements kuromoji's base-form tokenization (lookup.ts also feeds token
// bases as candidates); it exists for the dictionary search box and drag
// selections where a full sentence tokenization isn't available.

export interface DeinflectRule {
  kanaIn: string // suffix present on the inflected form
  kanaOut: string // suffix on the deinflected form
  rulesIn: string[] // word-types this rule applies to ([] = only from the wildcard source)
  rulesOut: string[] // word-type of the produced form
}

export interface Deinflection {
  term: string
  rules: string[] // [] means "unconstrained" (the source itself)
}

// Godan columns: [dictionary(u-row), a-row(neg), i-row(masu), e-row(pot/imp), o-row(vol)]
const GODAN: [string, string, string, string, string][] = [
  ['く', 'か', 'き', 'け', 'こ'],
  ['ぐ', 'が', 'ぎ', 'げ', 'ご'],
  ['す', 'さ', 'し', 'せ', 'そ'],
  ['つ', 'た', 'ち', 'て', 'と'],
  ['ぬ', 'な', 'に', 'ね', 'の'],
  ['ぶ', 'ば', 'び', 'べ', 'ぼ'],
  ['む', 'ま', 'み', 'め', 'も'],
  ['る', 'ら', 'り', 'れ', 'ろ'],
  ['う', 'わ', 'い', 'え', 'お']
]

// Godan past (た-form) and て-form are euphonic and depend on the dictionary
// ending: [dictEnding, taForm, teForm].
const GODAN_EUPHONIC: [string, string, string][] = [
  ['く', 'いた', 'いて'],
  ['ぐ', 'いだ', 'いで'],
  ['す', 'した', 'して'],
  ['つ', 'った', 'って'],
  ['う', 'った', 'って'],
  ['る', 'った', 'って'],
  ['ぬ', 'んだ', 'んで'],
  ['ぶ', 'んだ', 'んで'],
  ['む', 'んだ', 'んで']
]

function buildRules(): DeinflectRule[] {
  const rules: DeinflectRule[] = []
  const v5 = ['v5']
  const v1 = ['v1']
  const adj = ['adj-i']

  // ---- ichidan (v1): stem = dict − る ----
  const ichidanSuffixes = [
    'る', // dictionary (identity, lets る-less stems like 食べ resolve via other paths — kept minimal)
    'た',
    'て',
    'ない',
    'なかった',
    'なくて',
    'ます',
    'ました',
    'ません',
    'ませんでした',
    'られる', // passive / potential
    'れる', // colloquial potential
    'させる', // causative
    'られた',
    'させた',
    'よう', // volitional
    'ろ', // imperative
    'よ',
    'れば', // conditional
    'たい', // desiderative
    'たかった',
    'たくない',
    'ちゃう', // てしまう contraction
    'ちゃった',
    'てる', // ている contraction
    'てた',
    'てない'
  ]
  for (const suf of ichidanSuffixes) {
    if (suf === 'る') continue // identity handled by the raw query candidate
    rules.push({ kanaIn: suf, kanaOut: 'る', rulesIn: v1, rulesOut: v1 })
  }

  // ---- godan (v5), per column ----
  for (const [u, a, i, e, o] of GODAN) {
    const add = (inSuf: string, outSuf: string): void => {
      rules.push({ kanaIn: inSuf, kanaOut: outSuf, rulesIn: v5, rulesOut: v5 })
    }
    add(a + 'ない', u) // negative
    add(a + 'なかった', u)
    add(a + 'なくて', u)
    add(a + 'れる', u) // passive
    add(a + 'せる', u) // causative
    add(a + 'される', u) // causative-passive (approx)
    add(i + 'ます', u) // polite
    add(i + 'ました', u)
    add(i + 'ません', u)
    add(i + 'ませんでした', u)
    add(i + 'たい', u) // desiderative
    add(i + 'たかった', u)
    add(i + 'たくない', u)
    add(e + 'る', u) // potential
    add(e + 'た', u) // potential past (食べれた-style for godan potentials)
    add(e + 'ば', u) // conditional
    add(o + 'う', u) // volitional
  }
  // godan euphonic past / te / contractions
  for (const [u, ta, te] of GODAN_EUPHONIC) {
    rules.push({ kanaIn: ta, kanaOut: u, rulesIn: v5, rulesOut: v5 }) // past
    rules.push({ kanaIn: te, kanaOut: u, rulesIn: v5, rulesOut: v5 }) // te-form
    rules.push({ kanaIn: te + 'る', kanaOut: u, rulesIn: v5, rulesOut: v5 }) // ～てる
    rules.push({ kanaIn: te + 'た', kanaOut: u, rulesIn: v5, rulesOut: v5 }) // ～てた
    rules.push({ kanaIn: te + 'ない', kanaOut: u, rulesIn: v5, rulesOut: v5 }) // ～てない
    // ちゃう/じゃう contraction: って→っちゃう uses ちゃう; んで→んじゃう uses じゃう
    const contr = te.endsWith('で') ? 'じゃう' : 'ちゃう'
    const base = te.slice(0, -1) // drop て/で
    rules.push({ kanaIn: base + contr, kanaOut: u, rulesIn: v5, rulesOut: v5 })
    rules.push({ kanaIn: base + (te.endsWith('で') ? 'じゃった' : 'ちゃった'), kanaOut: u, rulesIn: v5, rulesOut: v5 })
  }

  // ---- i-adjectives (adj-i): stem = dict − い ----
  const adjSuffixes: [string, string][] = [
    ['かった', 'い'], // past
    ['くない', 'い'], // negative
    ['くなかった', 'い'], // past negative
    ['くて', 'い'], // te
    ['ければ', 'い'], // conditional
    ['く', 'い'], // adverbial
    ['さ', 'い'] // nominalizer
  ]
  for (const [inSuf, outSuf] of adjSuffixes) {
    rules.push({ kanaIn: inSuf, kanaOut: outSuf, rulesIn: adj, rulesOut: adj })
  }

  // ---- irregular する / くる / ずる ----
  const suru: [string, string][] = [
    ['した', 'する'],
    ['して', 'する'],
    ['しない', 'する'],
    ['します', 'する'],
    ['しました', 'する'],
    ['しません', 'する'],
    ['できる', 'する'], // potential
    ['される', 'する'], // passive
    ['させる', 'する'], // causative
    ['しよう', 'する'],
    ['すれば', 'する'],
    ['しろ', 'する'],
    ['しちゃう', 'する'],
    ['してる', 'する'],
    ['してた', 'する']
  ]
  for (const [inSuf, outSuf] of suru) {
    rules.push({ kanaIn: inSuf, kanaOut: outSuf, rulesIn: ['vs'], rulesOut: ['vs'] })
  }
  const kuru: [string, string][] = [
    ['きた', 'くる'],
    ['きて', 'くる'],
    ['こない', 'くる'],
    ['きます', 'くる'],
    ['きました', 'くる'],
    ['こよう', 'くる'],
    ['これる', 'くる'],
    ['こられる', 'くる'],
    ['くれば', 'くる'],
    ['こい', 'くる'],
    ['きてる', 'くる']
  ]
  for (const [inSuf, outSuf] of kuru) {
    rules.push({ kanaIn: inSuf, kanaOut: outSuf, rulesIn: ['vk'], rulesOut: ['vk'] })
  }

  // 行く is irregular in the past/te (行った not 行いた).
  rules.push({ kanaIn: 'った', kanaOut: 'く', rulesIn: v5, rulesOut: v5 })
  rules.push({ kanaIn: 'って', kanaOut: 'く', rulesIn: v5, rulesOut: v5 })

  return rules
}

const RULES = buildRules()

function intersects(a: string[], b: string[]): boolean {
  return a.some((x) => b.includes(x))
}

// Returns every candidate dictionary form for `text`, including `text` itself
// (with an unconstrained []-rules marker). BFS to a small depth so contracted
// chains (～てちゃった etc.) still reduce. Deduplicated by term+rules.
export function deinflect(text: string): Deinflection[] {
  const results: Deinflection[] = [{ term: text, rules: [] }]
  const seen = new Set<string>([`${text}|`])

  for (let i = 0; i < results.length && i < 64; i++) {
    const { term, rules } = results[i]
    for (const rule of RULES) {
      // Applies when the current form is the wildcard source, or its word-type
      // is compatible with the rule's input type.
      if (rules.length !== 0 && !intersects(rules, rule.rulesIn)) continue
      if (!term.endsWith(rule.kanaIn)) continue
      const stemLen = term.length - rule.kanaIn.length
      if (stemLen + rule.kanaOut.length <= 0) continue
      const next = term.slice(0, stemLen) + rule.kanaOut
      const key = `${next}|${rule.rulesOut.join(',')}`
      if (seen.has(key)) continue
      seen.add(key)
      results.push({ term: next, rules: rule.rulesOut })
    }
  }
  return results
}
