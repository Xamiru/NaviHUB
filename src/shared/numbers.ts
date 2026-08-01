// Generated exercises for the numbers & counters typing drill: plain numbers,
// clock times, month/day dates, yen prices and counter phrases, each with every
// accepted kana reading (canonical first). Pure and dependency-free so the
// euphonic tables — the entire value of the drill — are exhaustively testable
// under plain node. Same philosophy as romaji.ts: never mark a correct reading
// wrong (じゅっ/じっ, なな/しち, はっぽん/はちほん are all accepted).

export type NumberCategory = 'numbers' | 'time' | 'date' | 'price' | 'counters'

export interface NumberExercise {
  category: NumberCategory
  prompt: string // what the drill shows: 3,600 / 7時半 / 4月1日 / ¥380 / 3本
  answers: string[] // accepted hiragana readings, canonical first
}

// ---- combinatorics ------------------------------------------------------

// Cartesian join of per-segment variant lists: [['a'],['b','c']] → ['ab','ac'].
function joinVariants(segments: string[][]): string[] {
  let out = ['']
  for (const seg of segments) {
    const next: string[] = []
    for (const head of out) for (const v of seg) next.push(head + v)
    out = next
  }
  return [...new Set(out)]
}

// ---- plain numbers (1 .. 99,999) ----------------------------------------

// Digit readings per position. しち/し/く are only accepted where they are
// actually said: standalone digits and the tens place for 7 (しちじゅう).
const ONES: Record<number, string[]> = {
  1: ['いち'], 2: ['に'], 3: ['さん'], 4: ['よん'], 5: ['ご'],
  6: ['ろく'], 7: ['なな'], 8: ['はち'], 9: ['きゅう']
}
const ONES_STANDALONE: Record<number, string[]> = {
  ...ONES,
  4: ['よん', 'し'], 7: ['なな', 'しち'], 9: ['きゅう', 'く']
}
const TENS: Record<number, string[]> = {
  1: ['じゅう'], 2: ['にじゅう'], 3: ['さんじゅう'], 4: ['よんじゅう'], 5: ['ごじゅう'],
  6: ['ろくじゅう'], 7: ['ななじゅう', 'しちじゅう'], 8: ['はちじゅう'], 9: ['きゅうじゅう']
}
const HUNDREDS: Record<number, string[]> = {
  1: ['ひゃく'], 2: ['にひゃく'], 3: ['さんびゃく'], 4: ['よんひゃく'], 5: ['ごひゃく'],
  6: ['ろっぴゃく'], 7: ['ななひゃく'], 8: ['はっぴゃく'], 9: ['きゅうひゃく']
}
const THOUSANDS: Record<number, string[]> = {
  1: ['せん'], 2: ['にせん'], 3: ['さんぜん'], 4: ['よんせん'], 5: ['ごせん'],
  6: ['ろくせん'], 7: ['ななせん'], 8: ['はっせん'], 9: ['きゅうせん']
}

// Segment lists for a number; exported building block for prices/times.
function numberSegments(n: number): string[][] {
  if (!Number.isInteger(n) || n < 1 || n > 99999) return []
  const segs: string[][] = []
  const man = Math.floor(n / 10000)
  const sen = Math.floor((n % 10000) / 1000)
  const hyaku = Math.floor((n % 1000) / 100)
  const ju = Math.floor((n % 100) / 10)
  const ichi = n % 10
  // 10,000 is いちまん, never bare まん.
  if (man) segs.push(ONES[man].map((r) => r + 'まん'))
  if (sen) segs.push(THOUSANDS[sen])
  if (hyaku) segs.push(HUNDREDS[hyaku])
  if (ju) segs.push(TENS[ju])
  if (ichi) segs.push(n < 10 ? ONES_STANDALONE[ichi] : ONES[ichi])
  return segs
}

// All accepted readings of a plain number, canonical (Hepburn-standard) first.
export function readNumber(n: number): string[] {
  const segs = numberSegments(n)
  return segs.length ? joinVariants(segs) : []
}

// ---- counters (1 .. 10, plus はたち for 歳) ------------------------------

export interface CounterDef {
  counter: string // the kanji suffix shown in the prompt
  label: string // what it counts, for the setup screen / reveal
  readings: string[][] // index 1..10 → accepted readings of the whole phrase
}

// Hand tables beat derivation rules here: every irregular cell is the lesson.
const T = (rows: string[][]): string[][] => [[], ...rows]

export const COUNTERS: CounterDef[] = [
  {
    counter: '本', label: 'long objects',
    readings: T([
      ['いっぽん'], ['にほん'], ['さんぼん'], ['よんほん'], ['ごほん'],
      ['ろっぽん'], ['ななほん'], ['はっぽん', 'はちほん'], ['きゅうほん'],
      ['じゅっぽん', 'じっぽん']
    ])
  },
  {
    counter: '匹', label: 'small animals',
    readings: T([
      ['いっぴき'], ['にひき'], ['さんびき'], ['よんひき'], ['ごひき'],
      ['ろっぴき'], ['ななひき'], ['はっぴき', 'はちひき'], ['きゅうひき'],
      ['じゅっぴき', 'じっぴき']
    ])
  },
  {
    counter: '杯', label: 'cups / glasses',
    readings: T([
      ['いっぱい'], ['にはい'], ['さんばい'], ['よんはい'], ['ごはい'],
      ['ろっぱい'], ['ななはい'], ['はっぱい', 'はちはい'], ['きゅうはい'],
      ['じゅっぱい', 'じっぱい']
    ])
  },
  {
    counter: '回', label: 'times / occurrences',
    readings: T([
      ['いっかい'], ['にかい'], ['さんかい'], ['よんかい'], ['ごかい'],
      ['ろっかい'], ['ななかい'], ['はっかい', 'はちかい'], ['きゅうかい'],
      ['じゅっかい', 'じっかい']
    ])
  },
  {
    counter: '個', label: 'small things',
    readings: T([
      ['いっこ'], ['にこ'], ['さんこ'], ['よんこ'], ['ごこ'],
      ['ろっこ'], ['ななこ'], ['はっこ'], ['きゅうこ'],
      ['じゅっこ', 'じっこ']
    ])
  },
  {
    counter: '枚', label: 'flat things',
    readings: T([
      ['いちまい'], ['にまい'], ['さんまい'], ['よんまい'], ['ごまい'],
      ['ろくまい'], ['ななまい', 'しちまい'], ['はちまい'], ['きゅうまい'],
      ['じゅうまい']
    ])
  },
  {
    counter: '人', label: 'people',
    readings: T([
      ['ひとり'], ['ふたり'], ['さんにん'], ['よにん'], ['ごにん'],
      ['ろくにん'], ['しちにん', 'ななにん'], ['はちにん'], ['きゅうにん', 'くにん'],
      ['じゅうにん']
    ])
  },
  {
    counter: '冊', label: 'books / volumes',
    readings: T([
      ['いっさつ'], ['にさつ'], ['さんさつ'], ['よんさつ'], ['ごさつ'],
      ['ろくさつ'], ['ななさつ'], ['はっさつ', 'はちさつ'], ['きゅうさつ'],
      ['じゅっさつ', 'じっさつ']
    ])
  },
  {
    counter: '歳', label: 'years of age',
    readings: T([
      ['いっさい'], ['にさい'], ['さんさい'], ['よんさい'], ['ごさい'],
      ['ろくさい'], ['ななさい'], ['はっさい'], ['きゅうさい'],
      ['じゅっさい', 'じっさい']
    ])
  },
  {
    counter: 'つ', label: 'general things',
    readings: T([
      ['ひとつ'], ['ふたつ'], ['みっつ'], ['よっつ'], ['いつつ'],
      ['むっつ'], ['ななつ'], ['やっつ'], ['ここのつ'],
      ['とお']
    ])
  }
]

// Accepted readings of "<n><counter>". Range is 1..10 (where the euphonics
// live) plus the lone irregular 20歳.
export function readCounter(n: number, counter: string): string[] {
  if (counter === '歳' && n === 20) return ['はたち', 'にじゅっさい', 'にじっさい']
  const def = COUNTERS.find((c) => c.counter === counter)
  if (!def || n < 1 || n > 10) return []
  return def.readings[n] ?? []
}

// ---- time ----------------------------------------------------------------

// Hours 1-12. 4時よじ / 9時くじ have no alternates; 7時 is しちじ with ななじ
// accepted (said for clarity on the phone, on announcements).
const HOURS: Record<number, string[]> = {
  1: ['いちじ'], 2: ['にじ'], 3: ['さんじ'], 4: ['よじ'], 5: ['ごじ'],
  6: ['ろくじ'], 7: ['しちじ', 'ななじ'], 8: ['はちじ'], 9: ['くじ'],
  10: ['じゅうじ'], 11: ['じゅういちじ'], 12: ['じゅうにじ']
}

// Minute readings: ふん after 2/5/7/9, ぷん (with the stem change) after
// 1/3/4/6/8/10. Tens follow the 10 pattern (…じゅっぷん/…じっぷん).
const MINUTE_ONES: Record<number, string[]> = {
  1: ['いっぷん'], 2: ['にふん'], 3: ['さんぷん'], 4: ['よんぷん'], 5: ['ごふん'],
  6: ['ろっぷん'], 7: ['ななふん'], 8: ['はっぷん', 'はちふん'], 9: ['きゅうふん']
}

function readMinutes(m: number): string[] {
  if (m < 1 || m > 59) return []
  const tens = Math.floor(m / 10)
  const ones = m % 10
  if (ones === 0) {
    // 10/20/…/50 → (に…)じゅっぷん / じっぷん
    const head = tens === 1 ? [''] : ONES[tens]
    return joinVariants([head, ['じゅっぷん', 'じっぷん']])
  }
  const head = tens === 0 ? [''] : TENS[tens]
  return joinVariants([head, MINUTE_ONES[ones]])
}

// "7時半" / "4時15分" readings. m=0 → just the hour; m=30 also accepts はん.
export function readTime(h: number, m: number): string[] {
  const hour = HOURS[h]
  if (!hour) return []
  if (m === 0) return hour
  const minutes = readMinutes(m)
  if (!minutes.length) return []
  const out = joinVariants([hour, minutes])
  if (m === 30) return [...joinVariants([hour, ['はん']]), ...out]
  return out
}

// ---- dates ----------------------------------------------------------------

// Months: 4月しがつ / 7月しちがつ / 9月くがつ are the classic traps.
const MONTHS: Record<number, string[]> = {
  1: ['いちがつ'], 2: ['にがつ'], 3: ['さんがつ'], 4: ['しがつ'], 5: ['ごがつ'],
  6: ['ろくがつ'], 7: ['しちがつ', 'なながつ'], 8: ['はちがつ'], 9: ['くがつ'],
  10: ['じゅうがつ'], 11: ['じゅういちがつ'], 12: ['じゅうにがつ']
}

// Days 1-10 are native readings; 14/24 and 20 are the irregular islands.
const DAYS_SPECIAL: Record<number, string[]> = {
  1: ['ついたち'], 2: ['ふつか'], 3: ['みっか'], 4: ['よっか'], 5: ['いつか'],
  6: ['むいか'], 7: ['なのか'], 8: ['ようか'], 9: ['ここのか'], 10: ['とおか'],
  14: ['じゅうよっか'], 20: ['はつか'], 24: ['にじゅうよっか']
}

function readDay(d: number): string[] {
  if (DAYS_SPECIAL[d]) return DAYS_SPECIAL[d]
  if (d < 1 || d > 31) return []
  const tens = Math.floor(d / 10)
  const ones = d % 10
  const head = tens === 0 ? [''] : tens === 1 ? ['じゅう'] : TENS[tens]
  const tail = ones === 0 ? [''] : ONES[ones]
  return joinVariants([head, tail, ['にち']])
}

// "4月1日" readings (month and day joined).
export function readDate(month: number, day: number): string[] {
  const m = MONTHS[month]
  const d = readDay(day)
  if (!m || !d.length) return []
  return joinVariants([m, d])
}

// ---- prices ----------------------------------------------------------------

// Yen: a trailing 4 reads よ (4円 よえん, 14円 じゅうよえん) with よん also
// heard; everything else is the plain number + えん.
export function readPrice(yen: number): string[] {
  if (!Number.isInteger(yen) || yen < 1 || yen > 99999) return []
  const segs = numberSegments(yen)
  if (!segs.length) return []
  if (yen % 10 === 4) {
    segs[segs.length - 1] = ['よ', 'よん']
  }
  return joinVariants(segs).map((r) => r + 'えん')
}

// ---- generator -------------------------------------------------------------

const COMMA = (n: number): string => n.toLocaleString('en-US')

// One random exercise from the enabled categories. `rng` is injectable for
// deterministic tests (defaults to Math.random in the caller, not here).
export function generateExercise(
  categories: NumberCategory[],
  rng: () => number
): NumberExercise | null {
  const cats = categories.length ? categories : ['numbers' as const]
  const cat = cats[Math.floor(rng() * cats.length)]
  const int = (lo: number, hi: number): number => lo + Math.floor(rng() * (hi - lo + 1))
  const pick = <T,>(xs: readonly T[]): T => xs[Math.floor(rng() * xs.length)]

  switch (cat) {
    case 'numbers': {
      // Mix magnitudes so まん/せん/ひゃく all come up, not just huge values.
      const n = pick([
        int(1, 10), int(11, 99), int(100, 999), int(1000, 9999), int(10000, 99999)
      ])
      return { category: cat, prompt: COMMA(n), answers: readNumber(n) }
    }
    case 'time': {
      const h = int(1, 12)
      const m = pick([0, 0, 30, 30, int(1, 59), pick([5, 10, 15, 20, 40, 45, 50])])
      const prompt = m === 0 ? `${h}時` : m === 30 ? `${h}時半` : `${h}時${m}分`
      // 「7時半」 must be answered as はん — the digits-30 reading belongs to
      // the 「7時30分」 prompt.
      const answers = m === 30 ? joinVariants([HOURS[h], ['はん']]) : readTime(h, m)
      return { category: cat, prompt, answers }
    }
    case 'date': {
      const month = int(1, 12)
      const day = pick([int(1, 10), 14, 20, 24, int(11, 28)])
      return { category: cat, prompt: `${month}月${day}日`, answers: readDate(month, day) }
    }
    case 'price': {
      const n = pick([int(1, 9) * 10, int(10, 99) * 10, int(100, 999) * 10, int(1, 999) * 100, int(101, 9999)])
      const yen = Math.min(99999, n)
      return { category: cat, prompt: `¥${COMMA(yen)}`, answers: readPrice(yen) }
    }
    case 'counters': {
      const def = pick(COUNTERS)
      const n = def.counter === '歳' && rng() < 0.15 ? 20 : int(1, 10)
      return {
        category: cat,
        prompt: `${n}${def.counter}`,
        answers: readCounter(n, def.counter)
      }
    }
  }
  return null
}
