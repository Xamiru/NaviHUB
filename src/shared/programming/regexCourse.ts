import type { ProgCourseDef } from './types'

// Regex course content. Lesson keys are FROZEN (stored in prog_progress as
// 'regex/<lessonKey>'). Bodies are Markdown for @shared/markdown.ts — headings
// 1-3, flat lists, bold/italic/inline code, fenced code blocks only.
// NOTE: rendered backslashes are written \\ here (template-literal escapes
// would otherwise swallow them: `\d` parses as 'd', `\b` as backspace).

export const REGEX_COURSE: ProgCourseDef = {
  key: 'regex',
  title: 'Regex mastery',
  description:
    'Practical regular expressions for an engineer who already ships code: syntax that generalizes, flavor differences that bite, and the performance model underneath.',
  lessons: [
    {
      key: 'literals-classes',
      title: 'Literals, metacharacters, character classes',
      body: `A regex is a small language describing a set of strings. Most characters match themselves: \`error\` matches those five characters wherever they occur. A handful are metacharacters with special meaning outside a character class: \`. ^ $ * + ? ( ) [ { | \\\`. To match one literally, escape it: \`\\.\` is a period, \`\\$\` a dollar sign. In Python always write patterns as raw strings (\`r'\\.'\`) so Python's own string escapes do not eat backslashes first; in Go use backquoted raw string literals for the same reason. A pattern that works in the interpreter but fails in a script is almost always a missing \`r\` prefix.

## Character classes

\`[abc]\` matches exactly one character: a, b, or c. Ranges compress that: \`[a-z]\`, \`[0-9]\`, and they combine freely: \`[a-zA-Z0-9_]\`. A leading caret negates: \`[^0-9]\` matches any single character that is not a digit — including a newline, which surprises people using it as "rest of the field".

Inside a class, most metacharacters go literal: \`[.+*]\` matches a dot, a plus, or a star, no escaping needed. Only four characters keep special meaning inside \`[...]\`: \`]\` closes the class, \`^\` negates when first, \`-\` forms a range between two characters, and \`\\\` still escapes. To include a literal \`-\`, put it first or last (\`[-a-z]\`) or escape it.

## Shorthand classes

- \`\\d\` digits, \`\\D\` anything that is not a digit
- \`\\w\` word characters (letters, digits, underscore), \`\\W\` its negation
- \`\\s\` whitespace (space, tab, newline, and friends), \`\\S\` its negation

Flavor note worth internalizing: Python 3's \`\\d\` and \`\\w\` are Unicode-aware by default (Arabic-Indic digits count) unless you pass \`re.ASCII\`. Go's \`\\d\` and \`\\w\` are ASCII-only; Unicode matching goes through property classes like \`\\p{L}\` (letter) and \`\\p{N}\` (number). When the input is machine-generated ASCII, \`[0-9]\` says exactly what you mean in both languages.

## The dot

\`.\` matches any single character except newline. That default exists so line-oriented patterns do not silently run across line ends; a flag lifts it when you want it to (Python \`re.DOTALL\`, Go \`(?s)\`, JS \`s\` flag). Habit to build now: prefer a specific negated class like \`[^"]\` over \`.\` whenever you know what the run of characters cannot contain. Being explicit about what you accept is what separates precise patterns from ones that mostly work.

\`\`\`python
import re
line = 'user=amir id=42 lang=jp'
re.findall(r'\\w+=\\w+', line)  # ['user=amir', 'id=42', 'lang=jp']
\`\`\`

\`\`\`go
re := regexp.MustCompile(\`[0-9]+\\.[0-9]+\`)
re.FindAllString("widths 3.5 and 10.25", -1) // ["3.5", "10.25"]
\`\`\``,
      questions: [
        {
          prompt: 'Which characters keep special meaning INSIDE a character class like [...]?',
          options: [
            'All the usual metacharacters: . * + ? ( ) |',
            'Only the backslash',
            '] ^ - and backslash',
            'None — everything inside a class is literal'
          ],
          correct: 2,
          explain:
            'Inside a class, dot/star/plus and friends go literal; only ] (close), ^ (negation when first), - (range) and the escape backslash stay special.'
        },
        {
          prompt: 'What does [^a-z] match against the input "A\\nb"?',
          options: [
            'The "A" and the newline — any single character not a lowercase letter, newlines included',
            'Only the "A" — negated classes never match newline',
            'Nothing — ^ anchors the class to the start of the string',
            'The whole string, because the negation applies to the entire input rather than one character'
          ],
          correct: 0,
          explain:
            'A negated class matches any one character not listed, and unlike the dot it happily matches newline — a common source of over-matching.'
        },
        {
          prompt: 'In Python 3, what does r"\\d" match by default?',
          options: [
            'Exactly the ASCII digits 0-9',
            'A literal backslash followed by d',
            'Digits only when the re.UNICODE flag is passed explicitly to re.compile()',
            'Any Unicode decimal digit, unless re.ASCII narrows it'
          ],
          correct: 3,
          explain:
            'Python 3 patterns are Unicode-aware by default, so \\d covers all Unicode decimal digits; re.ASCII restores the 0-9-only behavior. Go\'s \\d is ASCII-only.'
        },
        {
          prompt: 'Why does the pattern \\d+ often behave differently when written without a raw string in Python?',
          options: [
            'It does not — Python treats "\\d" and r"\\d" identically, so the prefix is a style choice',
            'String-literal escaping runs first, so sequences like "\\b" reach re as control characters',
            'Non-raw strings disable Unicode matching',
            'The re module rejects non-raw strings with a SyntaxError'
          ],
          correct: 1,
          explain:
            '"\\d" happens to survive (Python leaves unknown escapes alone, with a warning), but "\\b" becomes a backspace character — raw strings sidestep the whole class of bug.'
        }
      ]
    },
    {
      key: 'quantifiers-greed',
      title: 'Quantifiers and greediness',
      body: `Quantifiers repeat the single atom immediately before them: \`*\` means zero or more, \`+\` one or more, \`?\` zero or one, and \`{n}\`, \`{n,}\`, \`{n,m}\` give exact bounds. "Atom" matters: \`ab+\` matches \`a\` followed by one or more \`b\`, not repeated \`ab\` — group for that: \`(?:ab)+\`.

## Greedy by default

Quantifiers are greedy: they consume as much as possible while still allowing the rest of the pattern to match. The engine takes everything, then backtracks, giving characters back one at a time until the remainder fits. The classic surprise:

\`\`\`python
import re
s = '<b>bold</b> and <i>italic</i>'
re.findall(r'<.*>', s)    # ['<b>bold</b> and <i>italic</i>']  one huge match
re.findall(r'<.*?>', s)   # ['<b>', '</b>', '<i>', '</i>']     lazy
re.findall(r'<[^>]*>', s) # ['<b>', '</b>', '<i>', '</i>']     negated class
\`\`\`

\`<.*>\` grabs from the first \`<\` to the *last* \`>\` because \`.*\` first swallows the whole line, then backs off only far enough to find one closing \`>\`. Greediness is per-position maximization, not "shortest sensible match".

## Lazy quantifiers

Appending \`?\` makes any quantifier lazy: \`*?\`, \`+?\`, \`??\`, \`{n,m}?\`. A lazy quantifier starts from the minimum and grows only when the rest of the pattern forces it to. It fixes the example above, but note it does not mean "match the shortest possible overall" — it is still a local, position-by-position rule, and it can be slow because the engine repeatedly tries to finish the match after every single character it adds.

Between \`<.*?>\` and \`<[^>]*>\`, prefer the negated class. It states the invariant directly (no \`>\` inside the brackets), it cannot match across an unexpected boundary, and it runs without depending on backtracking behavior — which also makes it valid RE2/Go, where the performance model rewards it.

## Possessive quantifiers

PCRE, Java, and Python 3.11+ add possessive quantifiers (\`*+\`, \`++\`, \`?+\`) and atomic groups (\`(?>...)\`): they consume greedily and *never give anything back*. \`a*+a\` can never match — \`a*+\` eats every \`a\`, refuses to backtrack, and the final \`a\` finds nothing. That sounds useless until you meet catastrophic backtracking (lesson 7), where cutting off backtracking is exactly the point. Go has no possessive syntax because RE2 does not backtrack in the first place.

## Bounded repetition

\`{n,m}\` is underused. \`[0-9]{1,3}(\\.[0-9]{1,3}){3}\` is a far better IPv4 shape-check than \`(\\d+\\.){3}\\d+\`, and \`{8,64}\` on a password length rule documents policy right in the pattern. Bounds also protect you: an unbounded \`+\` on attacker-controlled input is a standing invitation to pathological cases.`,
      questions: [
        {
          prompt: 'Against the string "<a><b>", what does the pattern <.*> match?',
          options: [
            '"<a>" — the first complete tag',
            'The whole string "<a><b>"',
            '"<a>" and "<b>" as two separate matches',
            'Nothing — the dot cannot match angle brackets'
          ],
          correct: 1,
          explain:
            'Greedy .* runs to the end of the string and backtracks only to the last ">", so one match spans everything from the first "<" to the final ">".'
        },
        {
          prompt: 'Why is <[^>]*> generally preferred over the lazy <.*?> for matching tags?',
          options: [
            'Lazy quantifiers are not supported in Python',
            'The negated class matches across newlines while the lazy dot stops at the first one it sees',
            'They match different tag names',
            'It encodes the real invariant, cannot creep past a boundary, and needs no backtracking'
          ],
          correct: 3,
          explain:
            'Both give the same answer here, but the negated class is self-documenting, faster (no grow-and-retry loop), and portable to engines without backtracking.'
        },
        {
          prompt: 'What does the possessive pattern a*+a match against "aaa"?',
          options: [
            'Nothing — a*+ consumes all three characters and never backtracks, leaving the final a unmatchable',
            '"aaa", same as a*a',
            'It matches "aa" — a possessive quantifier always reserves one character for whatever follows it next',
            'It is a syntax error in every flavor'
          ],
          correct: 0,
          explain:
            'Possessive quantifiers give nothing back. a* would backtrack to let the trailing a match; a*+ refuses, so the whole pattern fails. PCRE, Java and Python 3.11+ support it.'
        },
        {
          prompt: 'What does ab{2,3} match?',
          options: [
            '"abab" or "ababab" — that is two or three repetitions of the whole two-character group',
            '"ab" followed by two or three of any character',
            '"a" followed by two or three "b"s — the quantifier binds only to the preceding atom',
            'Exactly the literal string "ab{2,3}"'
          ],
          correct: 2,
          explain:
            'Quantifiers bind to one atom. Repeating the pair takes a group: (?:ab){2,3}.'
        }
      ]
    },
    {
      key: 'anchors-boundaries',
      title: 'Anchors and boundaries',
      body: `Anchors match *positions*, not characters — they consume nothing. \`^\` asserts the start of the string, \`$\` the end, and \`\\b\` a word boundary: a position where a \`\\w\` character sits next to a non-\`\\w\` character (or the edge of the string). \`\\B\` asserts the opposite.

\`\\bcat\\b\` finds \`cat\` in \`the cat sat\` but not inside \`concatenate\`. Remember the Python raw-string rule from lesson 1: \`"\\b"\` in a plain string is a backspace character; \`\\b\` only reaches the engine from \`r'\\b'\`. Word boundaries are defined by \`\\w\`, so in Go (ASCII \`\\w\`) a boundary sits at every non-ASCII letter — mildly surprising in Unicode text.

## Multiline mode

By default \`^\` and \`$\` see the whole input as one string. The multiline flag (Python \`re.M\`, inline \`(?m)\` in both Python and Go, JS \`m\`) makes \`^\` also match after every newline and \`$\` before every newline — turning a pattern from whole-string matching into per-line matching:

\`\`\`python
import re
log = 'ok\\nERROR disk full\\nok\\nERROR net down'
re.findall(r'^ERROR .*$', log, re.M)  # ['ERROR disk full', 'ERROR net down']
\`\`\`

Without \`re.M\` that pattern matches nothing: \`^\` would need \`ERROR\` at position zero.

## The edge-of-string zoo

Flavors disagree about absolute anchors, and the differences matter for validation:

- Python: \`\\A\` is absolute start, \`\\Z\` is absolute end. There is no \`\\z\`.
- Go (RE2): \`\\A\` is absolute start, \`\\z\` is absolute end. There is no \`\\Z\`.
- PCRE: all three — \`\\A\`, \`\\z\` (absolute end), and \`\\Z\` (end, or just before a final newline).
- JavaScript: none of them; \`^\` and \`$\` without the \`m\` flag are your only anchors.

The trap: in Python, \`$\` matches at the very end *or just before a trailing newline*. So \`re.fullmatch\` aside, \`re.search(r'^\\w+$', 'abc\\n')\` succeeds. If you are validating input — "the entire string must be exactly this shape" — anchor with \`\\A...\\Z\` in Python (\`\\A...\\z\` in Go), or use \`re.fullmatch\`, which anchors both ends for you. Go's \`$\` without \`(?m)\` matches only at the true end of text, so the same pattern is strict there; code reviews that move a validator between languages should check exactly this.

## Whole-string vs per-line thinking

Command-line tools blur the distinction because they feed input line by line: in \`grep\` and \`awk\`, \`^\` and \`$\` are effectively per-line anchors since each record *is* a line. In-process engines see whatever you hand them — an entire file read into one string needs \`(?m)\` for line-wise anchoring, or you split first. Choosing between "split then match" and "multiline anchors over one big string" is mostly about what you do with the non-matching lines; for pulling a few needles out of a big haystack, one multiline scan is tidier and faster.`,
      questions: [
        {
          prompt: 'In Python, which construct is guaranteed to match only at the absolute end of the string?',
          options: [
            '\\Z',
            '$',
            '\\z',
            '\\b at the last character'
          ],
          correct: 0,
          explain:
            'Python\'s $ also matches just before a trailing newline, and Python has no \\z; \\Z (or re.fullmatch) is the strict end anchor.'
        },
        {
          prompt: 'With the multiline flag enabled, where does ^ match?',
          options: [
            'Only at the start of the input, same as without the flag',
            'At the start of the input and immediately before every newline',
            'At the start of the input and immediately after every newline',
            'After every whitespace character'
          ],
          correct: 2,
          explain:
            'Multiline ^ matches at position zero and after each \\n (i.e. at the start of every line); $ is the one that matches before newlines.'
        },
        {
          prompt: 'What is \\b, precisely?',
          options: [
            'A one-character match on space, tab, or punctuation',
            'A zero-width assertion at a position where \\w and non-\\w (or the string edge) meet',
            'An anchor matching only at the exact start or end position of the entire input string',
            'A shorthand for [\\s] that also matches string edges'
          ],
          correct: 1,
          explain:
            'Word boundaries consume no characters — they assert a transition between word and non-word, which is why \\bcat\\b never matches inside "concatenate".'
        },
        {
          prompt: 'In Go, without (?m), where can $ match?',
          options: [
            'At the end of the text or just before a final newline, like Python',
            'After every newline in the input',
            'Anywhere \\s appears',
            'Only at the very end of the text'
          ],
          correct: 3,
          explain:
            'RE2\'s $ is strict end-of-text unless multiline mode is on — one of the quiet behavioral differences from Python\'s $ that matters for validators.'
        }
      ]
    },
    {
      key: 'groups-refs',
      title: 'Groups, captures, references',
      body: `Parentheses do two jobs at once: they group a subpattern (so a quantifier or alternation applies to all of it) and they *capture* what that subpattern matched. Groups are numbered by the position of their opening parenthesis, left to right, starting at 1; group 0 is the entire match.

\`\`\`python
import re
m = re.search(r'(\\d{4})-(\\d{2})-(\\d{2})', 'released 2024-05-07')
m.group(0)  # '2024-05-07'
m.group(1)  # '2024'
m.groups()  # ('2024', '05', '07')
\`\`\`

## Non-capturing groups

When you only need grouping, use \`(?:...)\`. It keeps group numbers stable as the pattern evolves, tells the reader "nothing downstream depends on this", and skips the capture bookkeeping. Default to \`(?:...)\` and promote to a capture only when something reads the value — the same instinct as not naming a variable you never use.

## Named groups

Numbered groups rot as patterns grow: insert one parenthesis and every \`\\2\` after it silently shifts. Named groups fix that. Syntax varies by flavor:

- Python: \`(?P<name>...)\`, read with \`m.group('name')\` or \`m.groupdict()\`
- Go: \`(?P<name>...)\`, mapped via \`re.SubexpNames()\` (Go 1.22 also accepts \`(?<name>...)\`)
- PCRE, JS, .NET: \`(?<name>...)\`

\`\`\`go
re := regexp.MustCompile(\`(?P<year>\\d{4})-(?P<month>\\d{2})\`)
m := re.FindStringSubmatch("2024-05")
// m[0]="2024-05" m[1]="2024" m[2]="05"; names come from re.SubexpNames()
\`\`\`

## Backreferences

\`\\1\` inside a pattern matches *the same text* group 1 already matched — not the same subpattern again. \`(\\w+) \\1\` finds doubled words: \`the the\`. Python also allows \`(?P=name)\` for named backreferences. Two things to know: backreferences are what make regex matching NP-hard in general, and consequently **Go has none** — RE2 rejects \`\\1\` at compile time, because supporting it would forfeit the linear-time guarantee (lesson 6). If your design needs a backreference in Go, you usually want a capture plus a comparison in code instead.

## Replacement references

Substitution strings have their own reference syntax, and it differs from the pattern side:

- Python \`re.sub\`: \`\\1\`, \`\\g<name>\`, and \`\\g<0>\` for the whole match
- Go \`ReplaceAllString\`: \`$1\`, \`\${name}\`
- JS \`.replace\`: \`$1\`, \`$<name>\`, \`$&\` for the whole match
- sed: \`\\1\`, and \`&\` for the whole match

The Go gotcha is worth stars in the margin: in \`ReplaceAllString\`, \`$1x\` is parsed as the group *named* \`1x\`, which is probably empty — your replacement silently vanishes. Always brace when text follows a reference: \`\${1}x\`. Python has the mirror-image problem with ambiguous \`\\10\` (group 10, or group 1 then \`0\`?) — \`\\g<1>0\` disambiguates.`,
      questions: [
        {
          prompt: 'Which named-group syntax does Go\'s regexp package accept in every supported Go version?',
          options: [
            '(?<name>...)',
            '(?\'name\'...)',
            '(?name:...)',
            '(?P<name>...)'
          ],
          correct: 3,
          explain:
            'Go follows the Python-style (?P<name>...) spelling; the bare (?<name>...) form only became valid in Go 1.22.'
        },
        {
          prompt: 'In Go\'s ReplaceAllString, how do you safely emit group 1 followed by the literal text "px"?',
          options: [
            '"$1px"',
            '"${1}px"',
            '"\\1px"',
            '"$1\\px"'
          ],
          correct: 1,
          explain:
            '"$1px" parses as a reference to a group named "1px" and expands to nothing; braces end the name explicitly. Backslash references are pattern-side syntax, not Go replacement syntax.'
        },
        {
          prompt: 'Why does Go\'s regexp reject backreferences like \\1 entirely?',
          options: [
            'They are deprecated in modern regex flavors, so RE2 dropped them when it targeted linear-time matching',
            'Go strings cannot contain the \\1 escape',
            'RE2 guarantees linear-time matching, and backreference support is incompatible with that guarantee',
            'SubexpNames() replaces the need for them'
          ],
          correct: 2,
          explain:
            'Matching with backreferences is NP-hard in general and requires backtracking; RE2 trades the feature away for a worst-case linear-time engine.'
        },
        {
          prompt: 'What does the pattern (\\w+) \\1 match?',
          options: [
            'A word followed by the same text again, e.g. "the the"',
            'Any two distinct words separated by a single space character',
            'A word followed by a literal backslash and 1',
            'A word repeated any number of times'
          ],
          correct: 0,
          explain:
            'A backreference re-matches the exact text the group captured, not the group\'s pattern — so it finds genuine duplicates, not just any second word.'
        }
      ]
    },
    {
      key: 'alternation-lookarounds',
      title: 'Alternation and lookarounds',
      body: `## Alternation and its precedence

\`|\` tries alternatives left to right, and it binds *looser than everything else* in the pattern. That makes \`^cat|dog$\` a classic trap: it parses as \`(^cat)|(dog$)\` — "starts with cat, or ends with dog" — not "the whole string is cat or dog". Group to get the intended meaning: \`^(?:cat|dog)$\`. When alternatives share a prefix, factoring it out (\`gr(?:ey|ay)\`) is both clearer and cheaper. Order matters in backtracking engines: the first alternative that lets the rest of the pattern succeed wins, so put the longer alternative first when one is a prefix of another (\`foobar|foo\`, not \`foo|foobar\`).

## Lookarounds

Lookarounds are zero-width assertions like \`\\b\`, but with an arbitrary pattern inside. They test what surrounds the current position without consuming anything:

- \`(?=p)\` lookahead: the text ahead matches \`p\`
- \`(?!p)\` negative lookahead: the text ahead does not match \`p\`
- \`(?<=p)\` lookbehind: the text just before here matches \`p\`
- \`(?<!p)\` negative lookbehind: it does not

Because they consume nothing, several can stack at one position — which is the standard trick for "all of these conditions at once":

\`\`\`python
import re
# at least one digit, one lower, one upper, length 8+
pw = re.compile(r'\\A(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}\\z')
bool(pw.search('Correct1Horse'))  # True
\`\`\`

Each lookahead scans from the anchored start independently; only \`.{8,}\` actually consumes.

## Practical shapes

Extract a number only when followed by a unit, without capturing the unit: \`\\d+(?=px)\` matches \`14\` in \`14px\`. Match a word not followed by another: \`\\bfoo\\b(?!\\.bar)\`. Lookbehind pulls values out of labeled text without including the label: \`(?<=version=)\\S+\`. Negative lookahead at the start of an alternation is the usual way to say "this token, but not these special cases": \`\\b(?!TODO\\b|FIXME\\b)[A-Z]+\\b\`.

Two flavor limits to remember. Python's \`re\` requires *fixed-width* lookbehind — \`(?<=ab)\` is fine, \`(?<=a+)\` raises an error (the third-party \`regex\` module lifts this; .NET has none of the restriction). And Go has **no lookarounds at all** — RE2 dropped them for the same linear-time reason as backreferences. In Go you restructure: capture a wider match and slice off the context in code, or run a second check on the captured group. This is rarely painful in practice, but it means lookaround-heavy patterns do not port to Go by copy-paste.

A final honesty check: lookarounds make patterns powerful and dense at the same time. \`(?<=,)(?=,)\` ("an empty CSV field") is clever; whether it belongs in your codebase depends on who reads it next. When a lookaround pattern needs a comment longer than the pattern, a couple of lines of ordinary code is often the better tool.`,
      questions: [
        {
          prompt: 'Which strings does ^cat|dog$ match somewhere?',
          options: [
            'Only the exact strings "cat" and "dog"',
            'Any string containing "cat" or "dog"',
            '"catalog" and "hotdog" — it means starts-with-cat OR ends-with-dog',
            'Only strings that both start with the literal prefix "cat" and end with the literal suffix "dog"'
          ],
          correct: 2,
          explain:
            'Alternation has the lowest precedence, so the anchors attach to their own alternative: (^cat)|(dog$). Whole-string alternatives need ^(?:cat|dog)$.'
        },
        {
          prompt: 'How many characters does a lookahead like (?=.*\\d) consume from the input?',
          options: [
            'Zero — it is a width-less assertion about what lies ahead',
            'Exactly as many characters as the inner pattern .*\\d ends up matching',
            'One, the digit it finds',
            'It depends on whether the engine backtracks'
          ],
          correct: 0,
          explain:
            'Lookarounds test a condition at the current position and leave the cursor where it was — which is why several can be stacked at one anchor.'
        },
        {
          prompt: 'What restriction does Python\'s built-in re module place on lookbehind?',
          options: [
            'Lookbehind may not contain character classes',
            'Only negative lookbehind is supported',
            'Lookbehind is entirely unsupported in the standard library; only lookahead assertions exist',
            'The lookbehind pattern must match a fixed width — (?<=a+) is an error'
          ],
          correct: 3,
          explain:
            're requires fixed-width lookbehind so the engine knows exactly how far to step back; the third-party regex module and .NET allow variable width.'
        },
        {
          prompt: 'You port r"(?<=version=)\\S+" to Go and regexp.MustCompile panics. Why?',
          options: [
            'Go requires (?P<=...) for lookbehind',
            'RE2 supports no lookarounds at all — capture version=(\\S+) and read the group instead',
            'Go lookbehind must be fixed-width, and \\S+ is variable, so the compiler rejects it',
            '\\S is not valid RE2 syntax'
          ],
          correct: 1,
          explain:
            'Like backreferences, lookarounds were excluded from RE2 to preserve linear-time matching; the idiomatic Go fix is a capturing group plus slicing in code.'
        }
      ]
    },
    {
      key: 'flavors-tools',
      title: 'Flavors and tools',
      body: `The same "regex" means different languages in different tools. Knowing which flavor you are typing into saves real debugging time.

## grep, sed, awk

\`grep\` defaults to POSIX **BRE** (basic): \`+\`, \`?\`, \`|\`, \`{}\` and \`()\` are *literal* unless backslashed. \`grep -E\` switches to **ERE** (extended), where those work unescaped — this is the sane default for interactive use. \`grep -P\` (GNU grep only) gives you PCRE: \`\\d\`, lookarounds, lazy quantifiers. The classic confusion: \`grep '\\d+' file\` matches nothing useful, because neither BRE nor ERE knows \`\\d\` — POSIX flavors use bracket classes like \`[0-9]\` or \`[[:digit:]]\`, which work in every POSIX tool.

\`\`\`bash
grep -E '[0-9]{3}-[0-9]{4}' contacts.txt   # ERE: braces work bare
grep -P '(?<=id=)\\d+' access.log           # PCRE: lookbehind and \\d
sed -E 's/([0-9]+)ms/[\\1 ms]/g' timings    # ERE + \\1 in replacement, & = whole match
awk '/^ERROR/ && $3 ~ /timeout/' app.log   # awk is ERE, per-record (per-line)
\`\`\`

\`sed\` is BRE by default, \`-E\` for ERE; replacements use \`\\1\` and \`&\`. \`awk\` speaks ERE and applies patterns per record, with \`~\` for explicit field matching — often the right tool when "regex plus a little arithmetic" beats a pipeline.

## Python re

The workhorses beyond \`search\`/\`match\`: \`finditer\` yields match objects lazily (positions via \`m.start()\`/\`m.end()\`, names via \`groupdict()\`) — prefer it to \`findall\` whenever you need more than the bare strings. \`re.sub\` accepts a *function* as the replacement, which turns gnarly substitution logic into ordinary Python. \`re.VERBOSE\` (\`re.X\`) lets a pattern breathe: whitespace inside the pattern is ignored and \`#\` starts a comment, so significant spaces must be escaped or written as \`[ ]\`.

\`\`\`python
pattern = re.compile(r'''
    (?P<ts>\\d{2}:\\d{2}:\\d{2})   \\s+
    (?P<level>[A-Z]+)             \\s+
    (?P<msg>.*)
''', re.VERBOSE)
\`\`\`

Compiled patterns are cached by the module, but \`re.compile\` at import time still documents intent and gives the pattern a name.

## Go regexp

Go's \`regexp\` is **RE2**: guaranteed linear-time matching in the input length, no catastrophic blowups ever — bought by dropping backreferences and lookarounds. This is a deliberate engineering trade, and the right default for servers: an RE2 pattern on untrusted input cannot be weaponized into a CPU sink. The API is a naming grid — \`Find\`, \`FindAll\`, \`FindString\`, \`FindStringSubmatch\`, \`FindAllStringSubmatchIndex\` — where each added word (\`All\`, \`String\`, \`Submatch\`, \`Index\`) changes one axis of the return type. \`MustCompile\` for package-level patterns, \`Compile\` when the pattern itself is runtime input.

## JavaScript

Flags ride after the closing slash: \`g\` (all matches — statefully, via \`lastIndex\`, a rich source of bugs with reused regex objects), \`i\`, \`m\`, \`s\` (dotall), \`u\` (Unicode mode, prerequisite for \`\\p{L}\`), \`y\` (sticky). Modern JS supports named groups and lookbehind, so it is closer to PCRE than to RE2.

Rule of thumb: write in the POSIX-safe subset (\`[0-9]\`, explicit groups) when a pattern must travel between tools, and use the full flavor only where the pattern lives in one place.`,
      questions: [
        {
          prompt: 'Why does grep \'\\d+\' fail to find digit runs in a file?',
          options: [
            'grep requires the -o flag to match digits',
            'BRE has no \\d shorthand and + is literal there — use grep -E \'[0-9]+\' or grep -P \'\\d+\'',
            'The shell strips the backslash before grep ever sees the pattern, leaving just a bare d',
            'grep only matches whole lines by default'
          ],
          correct: 1,
          explain:
            'Perl shorthands like \\d exist only in PCRE (-P). POSIX flavors use [0-9] or [[:digit:]], and BRE additionally treats an unescaped + as a literal plus.'
        },
        {
          prompt: 'What does Python\'s re.VERBOSE flag change?',
          options: [
            'It prints a trace of the engine\'s matching steps, which is why patterns look reformatted',
            'It enables named groups and lookbehind',
            'It makes . match newlines',
            'Unescaped whitespace is ignored and # starts a comment, allowing annotated patterns'
          ],
          correct: 3,
          explain:
            'VERBOSE is purely about pattern layout — significant spaces must then be escaped or written as a class like [ ].'
        },
        {
          prompt: 'What performance property does Go\'s regexp package guarantee that Python\'s re does not?',
          options: [
            'Matching time linear in the input length, regardless of the pattern',
            'Zero heap allocation per match',
            'Patterns compile in constant time',
            'Matches are automatically found in parallel by spawning one goroutine per candidate'
          ],
          correct: 0,
          explain:
            'RE2 executes an automaton without backtracking, so no pattern/input pair can go exponential — the reason backreferences and lookarounds are excluded.'
        },
        {
          prompt: 'In Go\'s regexp API, what does adding "Submatch" to a Find method name change?',
          options: [
            'It restricts the match to searching only the first line of multiline input',
            'It returns byte indices instead of text',
            'The result includes capture groups, not just the overall match',
            'It makes the search case-insensitive'
          ],
          correct: 2,
          explain:
            'The method-name grid is systematic: All = every match, String = text in/out, Submatch = include groups, Index = positions instead of text.'
        }
      ]
    },
    {
      key: 'recipes-backtracking',
      title: 'Recipes and catastrophic backtracking',
      body: `## Recipes that pull their weight

Field extraction with named groups keeps parsing code honest — the pattern is the schema:

\`\`\`python
import re
LINE = re.compile(
    r'\\A(?P<ip>\\S+) \\S+ \\S+ \\[(?P<ts>[^\\]]+)\\] "(?P<method>[A-Z]+) (?P<path>\\S+)[^"]*" (?P<status>\\d{3})'
)
for m in LINE.finditer(log_text):
    row = m.groupdict()   # {'ip': ..., 'ts': ..., 'method': ...}
\`\`\`

Note the shapes: \`[^\\]]+\` for "up to the closing bracket", \`\\S+\` for whitespace-delimited fields, \`\\d{3}\` for a status code. Key-value scraping is one \`finditer\` with \`(?P<key>\\w+)=(?P<val>"[^"]*"|\\S+)\`. For format validation, anchor both ends (\`\\A...\\Z\` in Python, \`\\A...\\z\` in Go — lesson 3) and remember a regex checks *shape*, not truth: \`\\d{4}-\\d{2}-\\d{2}\` happily accepts month 13; parse with a date library when semantics matter.

\`\`\`go
kv := regexp.MustCompile(\`(\\w+)=("[^"]*"|\\S+)\`)
for _, m := range kv.FindAllStringSubmatch(line, -1) {
    fields[m[1]] = strings.Trim(m[2], \`"\`)
}
\`\`\`

## Catastrophic backtracking

A backtracking engine (Python, PCRE, JS) tries alternatives until something works. When a pattern offers *many ways to split the same text*, a failing match must try them all. The canonical trap:

\`\`\`python
re.search(r'(a+)+$', 'a' * 28 + 'b')   # takes seconds; each extra "a" doubles it
\`\`\`

\`(a+)+\` can carve a run of n \`a\`s into groups in about 2^n ways, and because the final \`b\` makes every attempt fail, the engine dutifully tries all of them. The general shape to fear is a quantified group whose body can match the same text as its neighbor: \`(a+)+\`, \`(\\w+\\s?)*\`, \`(.*)*\`, \`(\\s*,?\\s*)+\`. It usually surfaces as "our service hangs on some inputs" — a ReDoS, triggerable by anyone who controls the string being matched.

Defenses, in order of preference:

- Make the pattern unambiguous: one way to match each character. \`(a+)+\` is just \`a+\`; \`(\\w+\\s?)*\` becomes \`\\w+(\\s\\w+)*\`.
- Replace dot-star spans with negated classes (\`[^>]*\`, \`[^\\]]+\`) so the engine never overshoots and crawls back.
- Cut backtracking explicitly where supported: possessive quantifiers and atomic groups \`(?>...)\` (Python 3.11+, PCRE), and Python 3.11+ also accepts a \`timeout\` in the third-party regex module world; at minimum bound your quantifiers.
- Use a linear-time engine for untrusted input: Go's \`regexp\`, or the RE2 bindings for Python. RE2 avoids the problem structurally — it simulates the automaton over *sets of states* in one left-to-right pass, so there is nothing to backtrack and the 2^n search space never exists.

## When not to use a regex

Nested or recursive structure is the hard line: HTML, JSON, balanced parentheses, quoted strings with escapes-inside-escapes. Classic regexes recognize regular languages, and nesting is not regular — every regex "solution" here is a partial parser with silent failure modes. Use an HTML parser, \`json\` / \`encoding/json\`, or a real tokenizer. Also skip the regex when a simpler string operation is exact: \`s.startswith(prefix)\`, \`strings.Contains\`, one \`split(',')\`. The best regex is often the one you did not write; the second best is short, anchored, and readable in six months.`,
      questions: [
        {
          prompt: 'Why does matching (a+)+$ against "aaaaaaaaaaaaaaaaaaaaaaaaaaab" take exponential time in Python?',
          options: [
            'The failing $ forces the engine to try every split of the a-run — about 2^n of them',
            'The + quantifier is implemented recursively, so a long a-run overflows the parser stack',
            'Anchors disable the regex cache, forcing recompilation per attempt',
            'Group capture allocates memory per repetition'
          ],
          correct: 0,
          explain:
            'Nested quantifiers over the same characters create massively ambiguous parses; a doomed match must exhaust all of them before reporting failure.'
        },
        {
          prompt: 'How does RE2 avoid catastrophic backtracking?',
          options: [
            'It caps backtracking at a fixed depth and simply fails any match that runs past that limit here',
            'It rewrites dangerous patterns into safe ones at compile time',
            'It simulates the automaton over sets of states in a single pass, so no backtracking ever occurs',
            'It runs the match in a goroutine with a timeout'
          ],
          correct: 2,
          explain:
            'Thompson-style simulation tracks every viable state simultaneously in one left-to-right scan — linear time by construction, which is also why backreferences cannot be supported.'
        },
        {
          prompt: 'Which rewrite removes the backtracking risk from (\\w+\\s?)* while matching the same inputs?',
          options: [
            '(\\w+\\s??)* — make the inner quantifier lazy',
            '(?:\\w+(?:\\s\\w+)*)? — one unambiguous way to match each word',
            '(\\w+\\s?)*+ removes the ambiguity too and is fully portable to Go\'s RE2 engine',
            '((\\w|\\s)*)* — flatten the classes together'
          ],
          correct: 1,
          explain:
            'The fix is removing ambiguity: exactly one parse per input. Laziness just reorders the same search space, and possessive syntax is unavailable in many engines.'
        },
        {
          prompt: 'Which of these tasks is fundamentally a poor fit for a single classic regex?',
          options: [
            'Extracting the status code from access-log lines',
            'Validating that a string looks like an IPv4 address',
            'Finding doubled words in prose',
            'Matching arbitrarily nested balanced parentheses'
          ],
          correct: 3,
          explain:
            'Balanced nesting is not a regular language — a finite automaton cannot count unbounded depth. That calls for a parser, not a cleverer pattern.'
        }
      ]
    }
  ]
}
