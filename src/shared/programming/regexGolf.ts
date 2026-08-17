// Regex golf: given strings that MUST match and strings that MUST NOT, write
// the shortest pattern that does it. Puzzles are code (FROZEN keys, the
// programming/ convention); the grader is pure and runs in the renderer with
// JS `RegExp` — no IPC, no eval beyond the regex engine itself.
//
// Safety: every test string is short (≤ 20 chars, enforced by
// tests/regexGolf.test.ts) and the pattern is capped at MAX_PATTERN, so even a
// pathological nested-quantifier pattern backtracks over at most 2^20 states.

export const MAX_PATTERN = 120
export const MAX_STRING = 20

export interface RegexGolfPuzzle {
  key: string // FROZEN kebab-case
  title: string
  mustMatch: string[] // ≥ 3, each ≤ MAX_STRING chars
  mustNotMatch: string[] // ≥ 3, disjoint from mustMatch
  par: number // a good pattern length; `solution` proves it is reachable
  hint: string
  solution: string // reveal; must solve at length ≤ par
  flagsAllowed?: string // subset of 'ims'; default none
}

export interface RegexGolfGrade {
  valid: boolean
  error: string | null
  matchResults: boolean[] // per mustMatch: pattern.test(s)
  notMatchResults: boolean[] // per mustNotMatch: !pattern.test(s)
  solved: boolean
  length: number
  underPar: boolean
}

export function allowedFlags(puzzle: RegexGolfPuzzle, flags: string): string {
  const allowed = puzzle.flagsAllowed ?? ''
  return [...new Set(flags.split(''))].filter((f) => allowed.includes(f)).join('')
}

export function gradeRegexGolf(
  pattern: string,
  flags: string,
  puzzle: RegexGolfPuzzle
): RegexGolfGrade {
  const empty: RegexGolfGrade = {
    valid: false,
    error: null,
    matchResults: puzzle.mustMatch.map(() => false),
    notMatchResults: puzzle.mustNotMatch.map(() => false),
    solved: false,
    length: pattern.length,
    underPar: false
  }
  if (!pattern) return empty
  if (pattern.length > MAX_PATTERN) return { ...empty, error: `Pattern too long (max ${MAX_PATTERN})` }
  let re: RegExp
  try {
    re = new RegExp(pattern, allowedFlags(puzzle, flags))
  } catch (e) {
    return { ...empty, error: e instanceof Error ? e.message.replace(/^Invalid regular expression: /, '') : String(e) }
  }
  const test = (s: string): boolean => {
    re.lastIndex = 0
    return re.test(s)
  }
  const matchResults = puzzle.mustMatch.map(test)
  const notMatchResults = puzzle.mustNotMatch.map((s) => !test(s))
  const solved = matchResults.every(Boolean) && notMatchResults.every(Boolean)
  return {
    valid: true,
    error: null,
    matchResults,
    notMatchResults,
    solved,
    length: pattern.length,
    underPar: solved && pattern.length <= puzzle.par
  }
}

export function regexGolfPuzzle(key: string): RegexGolfPuzzle | undefined {
  return REGEX_GOLF_PUZZLES.find((p) => p.key === key)
}

// Ordered easy → hard. Authoring rules: strings ≤ 20 chars, ≥ 3 per side,
// sides disjoint, `solution` solves at ≤ par, no emoji, ASCII unless the
// puzzle is about Unicode.
export const REGEX_GOLF_PUZZLES: RegexGolfPuzzle[] = [
  {
    key: 'digits-only',
    title: 'Only digits',
    mustMatch: ['123', '0', '9876543210'],
    mustNotMatch: ['12a', 'abc', '', '1 2', '-5'],
    par: 7,
    hint: 'Anchor both ends; a class with a quantifier.',
    solution: '^\\d+$'
  },
  {
    key: 'lowercase-letters',
    title: 'Only lowercase letters',
    mustMatch: ['abc', 'hello', 'x'],
    mustNotMatch: ['ABC', 'abc1', 'a b'],
    par: 8,
    hint: 'Anchor both ends around a class of a-z, one or more.',
    solution: '^[a-z]+$'
  },
  {
    key: 'starts-with-vowel',
    title: 'Starts with a vowel',
    mustMatch: ['apple', 'orange', 'item'],
    mustNotMatch: ['grape', 'sky', 'table'],
    par: 8,
    hint: 'Anchor the start, then a class of the five vowels.',
    solution: '^[aeiou]'
  },
  {
    key: 'ends-with-ing',
    title: 'Ends with -ing',
    mustMatch: ['running', 'sing', 'coding'],
    mustNotMatch: ['ring1', 'ingest', 'stinger'],
    par: 4,
    hint: 'Anchor the end after the literal three letters.',
    solution: 'ing$'
  },
  {
    key: 'exactly-three-digits',
    title: 'Exactly three digits',
    mustMatch: ['123', '007', '999'],
    mustNotMatch: ['12', '1234', '12a'],
    par: 7,
    hint: 'Anchor both ends; use a repetition count of three.',
    solution: '^\\d{3}$'
  },
  {
    key: 'colour-or-color',
    title: 'Match color or colour',
    mustMatch: ['color', 'colour', 'discolour'],
    mustNotMatch: ['colr', 'colur', 'colouur'],
    par: 7,
    hint: 'Make the u optional with a question mark.',
    solution: 'colou?r'
  },
  {
    key: 'cat-or-dog',
    title: 'Matches cat or dog',
    mustMatch: ['cat', 'dog', 'hotdog'],
    mustNotMatch: ['cow', 'pig', 'fish'],
    par: 7,
    hint: 'Alternation tries either branch in order.',
    solution: 'cat|dog'
  },
  {
    key: 'ab-two-to-four',
    title: 'ab repeated two to four times',
    mustMatch: ['abab', 'ababab', 'abababab'],
    mustNotMatch: ['ab', 'ababababab', 'aba'],
    par: 11,
    hint: 'Group the pair, then bound its repeat count.',
    solution: '^(ab){2,4}$'
  },
  {
    key: 'literal-dot',
    title: 'Contains a literal decimal point',
    mustMatch: ['3.14', '0.5', '2.0'],
    mustNotMatch: ['314', '0x5', '20'],
    par: 2,
    hint: 'Escape the dot so it means a period, not any character.',
    solution: '\\.'
  },
  {
    key: 'literal-a-plus-b',
    title: 'Contains the literal text a+b',
    mustMatch: ['a+b', 'xa+by', 'a+b2'],
    mustNotMatch: ['aab', 'ab', 'a+c'],
    par: 4,
    hint: 'Escape the plus so it is a character, not a quantifier.',
    solution: 'a\\+b'
  },
  {
    key: 'no-vowels',
    title: 'No vowels anywhere in the string',
    mustMatch: ['rhythm', 'sky', 'tsktsk'],
    mustNotMatch: ['hello', 'sun', 'lake'],
    par: 11,
    hint: 'Anchor both ends around a negated vowel class.',
    solution: '^[^aeiou]+$'
  },
  {
    key: 'whole-word-cat',
    title: 'The word cat, not part of another word',
    mustMatch: ['cat', 'a cat sat', 'my cat!'],
    mustNotMatch: ['category', 'concatenate', 'scatter'],
    par: 7,
    hint: 'Word boundaries stop it matching inside category.',
    solution: '\\bcat\\b'
  },
  {
    key: 'first-html-tag',
    title: 'Content of the first tag only',
    mustMatch: ['<a>', '<a><b>', '<div>'],
    mustNotMatch: ['a>', '<a', 'plain'],
    par: 5,
    hint: 'A lazy star stops at the first closing bracket.',
    solution: '<.*?>'
  },
  {
    key: 'doubled-letter',
    title: 'Has two identical letters in a row',
    mustMatch: ['book', 'puzzle', 'off'],
    mustNotMatch: ['open', 'cat', 'dog'],
    par: 5,
    hint: 'Capture a character, then backreference it once.',
    solution: '(.)\\1'
  },
  {
    key: 'palindrome-three',
    title: 'Three-letter palindrome like wow',
    mustMatch: ['aba', 'wow', 'xyx'],
    mustNotMatch: ['abc', 'wov', 'xyz'],
    par: 6,
    hint: 'Capture the first letter, then require it again last.',
    solution: '(.).\\1'
  },
  {
    key: 'digit-and-letter',
    title: 'Contains both a letter and a digit',
    mustMatch: ['abc123', 'a1', 'pass9'],
    mustNotMatch: ['abcdef', '123456', '!!!!'],
    par: 19,
    hint: 'Two lookaheads, each checking one requirement.',
    solution: '(?=.*[a-z])(?=.*\\d)'
  },
  {
    key: 'not-starting-with-foo',
    title: 'Does not start with foo',
    mustMatch: ['barfoo', 'hello', 'ofoo'],
    mustNotMatch: ['foobar', 'foo', 'food'],
    par: 8,
    hint: 'A negative lookahead rejects that opening substring.',
    solution: '^(?!foo)'
  },
  {
    key: 'price-digit',
    title: 'A digit right after a dollar sign',
    mustMatch: ['$5', '$100', 'pay $9 now'],
    mustNotMatch: ['5 dollars', '$', '$ 5'],
    par: 9,
    hint: 'A lookbehind checks what comes before, without consuming it.',
    solution: '(?<=\\$)\\d'
  },
  {
    key: 'case-insensitive-hello',
    title: 'Match hello in any lettercase',
    mustMatch: ['hello', 'HELLO', 'HeLLo'],
    mustNotMatch: ['hallo', 'hell', 'helloo'],
    par: 7,
    hint: 'Anchor the word and enable the case-insensitive flag.',
    solution: '^hello$',
    flagsAllowed: 'i'
  },
  {
    key: 'hex-color',
    title: 'Hex color code, short or long form',
    mustMatch: ['#fff', '#000', '#a1b2c3'],
    mustNotMatch: ['fff', '#ggg', '#12345'],
    par: 21,
    hint: 'A hex-digit class repeated three or six times.',
    solution: '^#([0-9a-f]{3}){1,2}$'
  },
  {
    key: 'time-24h',
    title: '24-hour clock time hh:mm',
    mustMatch: ['00:00', '23:59', '12:30'],
    mustNotMatch: ['24:00', '12:60', '1:30', 'x12:30', '12:305'],
    par: 25,
    hint: 'Split the hour into two ranges, then bound the minute.',
    solution: '^([01]\\d|2[0-3]):[0-5]\\d$'
  },
  {
    key: 'iso-date',
    title: 'ISO date YYYY-MM-DD',
    mustMatch: ['2024-01-01', '1999-12-31', '2000-06-15'],
    mustNotMatch: ['2024/01/01', '24-01-01', '2024-13-01', '2024-01-011', 'x2024-01-01'],
    par: 45,
    hint: 'Four digits, then a bounded month, then a bounded day.',
    solution: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$'
  },
  {
    key: 'ipv4-octet',
    title: 'A single IPv4 octet, 0 to 255',
    mustMatch: ['0', '255', '128'],
    mustNotMatch: ['256', '300', '01'],
    par: 38,
    hint: 'List the ranges from largest to smallest, no leading zero.',
    solution: '^(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]\\d|\\d)$'
  },
  {
    key: 'valid-identifier',
    title: 'A valid variable identifier',
    mustMatch: ['foo', '_bar', 'x1'],
    mustNotMatch: ['1foo', 'foo bar', 'foo-bar'],
    par: 14,
    hint: 'Letters or underscore first, then any word characters.',
    solution: '^[A-Za-z_]\\w*$'
  },
  {
    key: 'even-number-of-as',
    title: "An even number of a's, zero counts",
    mustMatch: ['bb', 'aa', 'aabaa'],
    mustNotMatch: ['a', 'aaa', 'ab'],
    par: 22,
    hint: "Pair up the a's; anything else can sit around them.",
    solution: '^[^a]*(a[^a]*a[^a]*)*$'
  },
  {
    key: 'image-extension',
    title: 'Image file, but not a jpeg',
    mustMatch: ['pic.jpg', 'logo.png', 'icon.gif'],
    mustNotMatch: ['photo.jpeg', 'doc.pdf', 'file.txt', 'file.png.txt'],
    par: 16,
    hint: 'Anchor the end after the dot and list the good extensions.',
    solution: '\\.(jpg|png|gif)$'
  }
]
