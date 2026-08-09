import type { ProgCourseDef } from './types'

export const SHELL_COURSE: ProgCourseDef = {
  key: 'shell-scripting',
  title: 'Shell scripting that survives',
  description: 'Bash scripts that hold up in production: strict mode, quoting discipline, and the patterns that keep them from falling over at 3am.',
  lessons: [
    {
      key: 'shebang-strict-mode',
      title: 'Shebang and strict mode',
      body: `# Shebang and strict mode

Start every script with \`#!/usr/bin/env bash\`. \`env\` looks bash up on \`$PATH\`, which matters on macOS (the \`/bin/bash\` there is a 2007-era 3.2; a modern bash lives wherever Homebrew put it) and on NixOS (there is no \`/bin/bash\` at all). Do not write \`#!/bin/sh\` unless you mean it: on Debian and Ubuntu that is dash, and arrays, \`[[ ]]\`, \`local\` and most of this course do not exist there.

The second line of a production script:

\`\`\`bash
set -euo pipefail
\`\`\`

## set -e (errexit)

Exit immediately when a command fails. It removes the failure mode where a script plows on for two hundred lines after \`cd\` failed and does its damage in the wrong directory. But \`-e\` is riddled with exceptions, and you must know them:

- It is disabled in any *checked* context: the condition of \`if\`/\`while\`/\`until\`, anything left of \`&&\` or \`||\`, and a command negated with \`!\`.
- The nasty version of that rule: a **function called from a checked context runs with -e off for its entire body**. \`if setup_everything; then\` will happily ignore every internal failure of \`setup_everything\` and only look at its final status.
- \`((count++))\` when \`count\` is 0 evaluates to 0, which arithmetic contexts report as failure — a fresh counter kills the script. Write \`count=$((count + 1))\` or \`((++count))\`.
- \`var=$(cmd)\` propagates the substitution's failure, but \`echo "$(cmd)"\` does not — the status \`-e\` sees is \`echo\`'s.

Treat \`-e\` as a safety net with holes, not a substitute for checking the commands that matter with explicit \`|| die "message"\`.

## set -u (nounset)

Expanding an unset variable becomes an error instead of an empty string. This is your typo detector: \`rm -rf "$tmpdir/"\` with a misspelled \`tmpdir\` no longer expands to \`rm -rf /\`. When unset is legitimate, say so explicitly with \`\${var:-}\` or \`\${1:-}\` (positional parameters trip \`-u\` too when the caller passed nothing).

## set -o pipefail

By default a pipeline's exit status is the **last** command's, so \`corrupt_dump | gzip > backup.gz\` reports success as long as gzip is happy. \`pipefail\` makes the status the rightmost non-zero one. Two interactions to expect once it is on:

- \`grep\` exits 1 on no match, so \`grep WARN log | wc -l\` now "fails" on a clean log. Append \`|| true\` when zero matches is fine, or test grep separately.
- A consumer that exits early (\`head -n1\`) closes the pipe; the producer dies of SIGPIPE with status 141. Under \`-e\` that kills the script even though nothing went wrong.

## IFS

\`IFS\` (default \`$' \\t\\n'\`) controls how unquoted expansions get split into words and how \`read\` splits fields. Some strict-mode templates set \`IFS=$'\\n\\t'\` to make accidental splitting on spaces impossible; it helps, but the real fix is quoting, which is the next lesson.

## Script versus sourced

An executed script runs in its own process: \`exit\` ends it, \`set -e\` is contained. A sourced file (\`source file\` or \`. file\`) runs in the **calling** shell: \`exit\` closes the caller's terminal, and \`set -e\` infects their interactive session. Files meant for sourcing should never set strict mode and should \`return\`, not \`exit\`. The standard detection idiom:

\`\`\`bash
if [[ \${BASH_SOURCE[0]} == "$0" ]]; then
  main "$@"
fi
\`\`\``,
      questions: [
        {
          prompt: 'Under set -euo pipefail, why does grep ERROR app.log | wc -l abort the script when the log contains no errors?',
          options: [
            'wc fails when its input is empty',
            'set -u treats the empty pipeline output as an unset variable',
            'grep exits 1 on no match, pipefail surfaces that status, and -e exits on it',
            'The pipe delivers SIGPIPE to wc',
          ],
          correct: 2,
          explain: 'grep uses exit status 1 to mean "no matches". Without pipefail the pipeline would report wc\'s 0; with it the 1 wins, and errexit turns it into script death.',
        },
        {
          prompt: 'set -e is active. In which of these does an internal failure of setup() NOT abort the script?',
          options: [
            'if setup; then deploy; fi',
            'setup',
            'setup; deploy',
            'result=$(setup)',
          ],
          correct: 0,
          explain: 'A function called from a checked context (an if condition, or beside && / ||) runs with errexit disabled for its whole body; only its final exit status is consulted.',
        },
        {
          prompt: 'Why prefer #!/usr/bin/env bash over #!/bin/bash?',
          options: [
            'It starts faster because env caches the resolved interpreter path between runs',
            'It finds bash via $PATH, so it works where bash is not at /bin/bash',
            'It automatically enables strict mode',
            'It falls back to sh when bash is missing',
          ],
          correct: 1,
          explain: 'env resolves bash through $PATH instead of hardcoding a location. It has nothing to do with strict mode and provides no fallback.',
        },
        {
          prompt: 'A file intended to be sourced calls exit 1 on a validation error. What happens to the user who sources it from their interactive shell?',
          options: [
            'Nothing; exit only affects functions',
            'The current function returns 1',
            'bash prints a warning and continues',
            'Their interactive shell terminates',
          ],
          correct: 3,
          explain: 'Sourced code runs in the calling shell process, so exit exits that shell. Sourced files should use return instead.',
        },
      ],
    },
    {
      key: 'quoting',
      title: 'Quoting',
      body: `# Quoting

Bash has one central design flaw and this is it. After a variable or command substitution expands, the result is **split into words** on \`IFS\` and each word is then **matched against the filesystem as a glob**. Quoting is not decoration — it is the only thing standing between "one argument" and "several arguments you did not choose".

\`\`\`bash
file='weekly notes.txt'
rm $file      # rm receives two arguments: 'weekly' and 'notes.txt'
rm "$file"    # rm receives one argument
\`\`\`

With \`file='*'\` the unquoted version expands to every file in the directory. This is not an exotic edge case; it is the default behavior of the language, and it stays invisible until the day a filename grows a space.

## The rule

Write \`"$var"\` every time, and \`"$(cmd)"\` for command substitution — it goes through exactly the same split-and-glob. The exceptions below are deliberate and rare. "It worked when I tested it" is not evidence of correctness here, only evidence that your test data contained no spaces.

## "$@" versus $* versus "$*"

- \`"$@"\` expands to each positional parameter as its own word, contents intact. This is the one you want whenever you forward arguments.
- \`"$*"\` joins all parameters into a single word, separated by the first character of \`IFS\`. Useful only for building human-readable messages.
- Unquoted \`$@\` and \`$*\` are equivalent and both wrong: every parameter is split and globbed all over again.

\`\`\`bash
main() {
  run_backup "$@"                # forwards arguments exactly
  logger "backup args: $*"       # one string, for humans
}
\`\`\`

## When NOT to quote

- Plain assignment performs no splitting: \`copy=$original\` and \`out=$(cmd)\` are safe as-is (quoting them is harmless).
- Inside \`[[ ]]\` the left side is never split. The right side of \`==\` and \`!=\` is a **pattern** when unquoted and a literal when quoted: \`[[ $reply == y* ]]\` and \`[[ $reply == "y*" ]]\` mean different things. Same for \`=~\` — quoting the regex makes it literal, so keep regexes in a variable: \`[[ $line =~ $re ]]\`.
- A glob you actually want: \`for f in ./*.txt\` is fine, because the glob is written by you, not produced by an expansion.
- Arithmetic contexts \`(( ... ))\` do not split.

## Arrays are the real fix

The classic trap is keeping a list of things in a string:

\`\`\`bash
flags='-sS --fail-with-body'
curl $flags "$url"          # works until a value needs a space

args=(-sS --fail-with-body)
[[ -n \${token:-} ]] && args+=(-H "Authorization: Bearer $token")
args+=("$url")
curl "\${args[@]}"
\`\`\`

\`"\${args[@]}"\` expands to exactly one word per element no matter what the elements contain — spaces, globs, empty strings. Any time you are tempted to build a command line inside a string, build an array instead. This is the single biggest habit upgrade in shell.

## Injection

Unquoted expansion is an injection surface, not just a correctness bug:

- A value starting with \`-\` becomes an option: \`rm $f\` with \`f='-rf'\` changes the command's meaning. Quote it *and* separate options from operands with \`--\` (or prefix paths with \`./\`).
- Glob characters in data (\`[\`, \`*\`, \`?\`) silently match files when unquoted.
- Double expansion: \`ssh host "rm $path"\` expands \`$path\` locally, then the remote shell splits, globs and evaluates the result again. Escape values destined for another shell with \`printf %q\` or \`\${var@Q}\`.`,
      questions: [
        {
          prompt: "file='a b.txt'; rm $file — what does rm actually receive?",
          options: [
            'One argument, a b.txt',
            'One argument with a literal backslash-escaped space',
            "Two arguments: 'a' and 'b.txt'",
            'An error before rm runs',
          ],
          correct: 2,
          explain: 'The unquoted expansion is word-split on IFS, so rm is invoked with two separate arguments and will complain that neither file exists (or worse, remove the wrong ones).',
        },
        {
          prompt: 'Which expansion forwards a function\'s arguments as exactly the words the caller passed?',
          options: [
            '"$@"',
            '"$*"',
            '$@',
            '$*',
          ],
          correct: 0,
          explain: '"$@" produces one word per parameter with contents preserved. "$*" joins everything into one word, and either form unquoted gets re-split and re-globbed.',
        },
        {
          prompt: 'In [[ $name == $pattern ]], what does leaving $pattern unquoted do?',
          options: [
            'Causes word splitting on the pattern',
            'Makes the right side match as a glob pattern instead of a literal string',
            'Nothing; [[ ]] treats both sides identically',
            'Triggers a syntax error when pattern contains spaces',
          ],
          correct: 1,
          explain: 'Inside [[ ]] nothing is word-split, but the unquoted right side of == is interpreted as a pattern. Quoting it demands an exact literal match.',
        },
        {
          prompt: 'You need to build up curl options conditionally and then run the command. What is the robust structure?',
          options: [
            'Append to a string and run curl $opts "$url"',
            'Append to a string and run eval "curl $opts $url"',
            'Write the options to a temp file and use xargs',
            'Append to an array and run curl "${arr[@]}" "$url"',
          ],
          correct: 3,
          explain: 'An array keeps each option or value as its own element regardless of spaces, and "${arr[@]}" expands to exactly one word per element. Strings re-split; eval adds an injection hole.',
        },
        {
          prompt: 'Why write rm -- "$f" rather than rm "$f"?',
          options: [
            'Quoting alone does not protect against embedded glob characters',
            '-- stops option parsing, so a filename beginning with a dash cannot be read as a flag',
            '-- forces rm to prompt before each removal',
            'It is required whenever $f contains spaces',
          ],
          correct: 1,
          explain: 'Quoting keeps the value one word but cannot stop rm interpreting a leading dash as an option. The -- separator (or a ./ prefix) closes that gap.',
        },
      ],
    },
    {
      key: 'tests-conditionals',
      title: 'Tests and conditionals',
      body: `# Tests and conditionals

\`[\` is not syntax — it is a command, the same one as \`test\`, whose last argument must be \`]\`. That is why it needs spaces around every operand and why unquoted variables break it: the shell expands and word-splits *before* \`[\` ever runs, so an empty variable simply vanishes from the argument list. \`[[ ]]\` is a bash keyword, parsed before expansion, and fixes most of this: no word splitting or globbing inside, \`&&\` and \`||\` work within it, and \`<\` / \`>\` compare strings without escaping. In bash scripts use \`[[ ]]\` everywhere; \`[\` is for scripts that must run under POSIX sh.

\`\`\`bash
name=''
[ $name = anna ]      # error: unary operator expected — $name vanished
[[ $name == anna ]]   # fine: false
\`\`\`

## The operators you actually use

- Strings: \`-z\` empty, \`-n\` non-empty, \`==\`, \`!=\`, \`<\` and \`>\` lexicographic.
- Integers: \`-eq -ne -lt -le -gt -ge\` — or skip them and use \`(( ))\`, where comparisons read like a normal language: \`(( retries < 5 ))\`.
- Files: \`-e\` exists, \`-f\` regular file, \`-d\` directory, \`-s\` non-empty, \`-r\` / \`-w\` / \`-x\` permissions, \`-L\` symlink, \`a -nt b\` newer-than.
- Regex: \`[[ $line =~ $re ]]\`, capture groups land in \`BASH_REMATCH\`.

## Exit codes are the booleans

\`if\` does not evaluate expressions; it **runs a command** and branches on its exit status, zero meaning true. \`[[\` is just one command among many, and any command works:

\`\`\`bash
if grep -q ERROR "$log"; then
  alert_oncall
fi

if ! ping -c1 -W1 "$host" >/dev/null 2>&1; then
  echo "unreachable: $host" >&2
fi
\`\`\`

Never write \`cmd; if [ $? -eq 0 ]\` — test the command directly. \`$?\` is for when you need the specific numeric value, not for truthiness.

## && || chains are not if-else

\`a && b || c\` runs \`c\` when \`a\` fails **or when b fails**. It reads like a ternary but is not one; use it only when \`b\` cannot fail (an \`echo\`, an assignment), and reach for a real \`if\` the moment there is an else branch. Related strict-mode trap: a guard like \`[[ -f $cfg ]] && load "$cfg"\` as the *last line* of a script leaves the script's exit status at 1 when the guard is false — and under \`set -e\` inside a function or sourced context that reads as failure.

## case

\`\`\`bash
case $1 in
  start|up) start_services ;;
  stop) stop_services ;;
  -h|--help) usage; exit 0 ;;
  *) usage; exit 2 ;;
esac
\`\`\`

The word after \`case\` is not word-split (quotes are unnecessary but harmless); each pattern is a glob, with \`|\` separating alternatives — which makes \`case\` the cleanest way to dispatch on a string in shell, and the backbone of argument parsing later in this course. \`;;\` stops after a match; \`;&\` falls through to the next body and \`;;&\` continues testing patterns — both rare, both worth recognizing when you meet them.`,
      questions: [
        {
          prompt: 'With name empty, why does [ $name = anna ] error while [[ $name == anna ]] is simply false?',
          options: [
            '[ requires == while [[ requires =',
            '[ is a command that sees its arguments after expansion, so the empty variable disappears',
            '[ cannot compare strings at all, only integers',
            '[[ automatically quotes both of its operands, while [ does not support quoting at all here',
          ],
          correct: 1,
          explain: 'By the time [ runs, $name has expanded to nothing and been split away, leaving [ = anna ] — a malformed expression. [[ ]] is shell syntax and still knows a variable stood there.',
        },
        {
          prompt: 'What is the trap in writing check && fix || alert?',
          options: [
            'alert can never run because || binds to check',
            'fix runs even when check fails',
            'It is a syntax error outside [[ ]]',
            'alert also runs if check succeeds but fix then fails',
          ],
          correct: 3,
          explain: 'The || sees the status of the whole a && b chain, so a failing fix routes into alert too. Use a real if/else when b can fail.',
        },
        {
          prompt: 'Which is the most idiomatic bash way to test that retries is less than 5?',
          options: [
            '[ "$retries" < 5 ]',
            '[[ $retries < 5 ]]',
            '(( retries < 5 ))',
            'test $retries -lt-5',
          ],
          correct: 2,
          explain: 'Arithmetic context compares numerically with familiar operators. In [ the < is a redirect; in [[ it compares lexicographically, so 9 < 10 is false.',
        },
        {
          prompt: 'In if grep -q pattern file; then ..., what exactly is being tested?',
          options: [
            'Whether grep printed any output',
            'grep\'s exit status: 0 (a match was found) counts as true',
            'The value of the $? variable from the previous command',
            'Whether the file exists and is readable',
          ],
          correct: 1,
          explain: 'if runs the command and branches on its exit status alone; -q suppresses output because only the status matters. This is the idiom — no [ ] and no $? needed.',
        },
      ],
    },
    {
      key: 'loops-globbing',
      title: 'Loops and globbing',
      body: `# Loops and globbing

## for over globs

\`\`\`bash
shopt -s nullglob
for f in ./*.log; do
  gzip "$f"
done
\`\`\`

Without \`nullglob\`, an unmatched glob stays **literal**: the loop runs once with \`f\` set to the string \`./*.log\`, and \`gzip\` fails on a file that does not exist — or worse, your loop body does something destructive with a garbage name. \`shopt -s nullglob\` makes an unmatched glob expand to nothing (zero iterations); \`failglob\` makes it a hard error, which is the right choice when a match is mandatory. The \`./\` prefix guards against filenames that start with \`-\`. Never loop over \`$(ls)\` — that is expansion output, so it word-splits and re-globs, mangling any name with spaces.

## Reading lines: while read -r

\`\`\`bash
while IFS= read -r line; do
  printf '%s\\n' "$line"
done < "$input"
\`\`\`

This is the only correct line loop, and each piece earns its place: \`-r\` stops \`read\` from eating backslashes, and \`IFS=\` stops it trimming leading and trailing whitespace. The tempting alternative \`for line in $(cat file)\` is broken twice over: the substitution is split on **all** whitespace, not just newlines — so a line with three words becomes three iterations — and every resulting word is then glob-expanded against the current directory. One wrinkle: a final line with no trailing newline makes \`read\` return non-zero even though it filled the variable; \`while IFS= read -r line || [[ -n $line ]]\` covers it.

For filenames — which may legally contain newlines — use NUL delimiters end to end:

\`\`\`bash
while IFS= read -r -d '' f; do
  process "$f"
done < <(find . -name '*.tmp' -print0)
\`\`\`

## C-style for and brace ranges

\`\`\`bash
for (( i = 0; i < attempts; i++ )); do
  try_once && break
done
\`\`\`

\`for i in {1..10}\` also works — but only with literal bounds. Brace expansion happens **before** parameter expansion, so \`{1..$n}\` never becomes a range; it stays the literal string. With a variable bound, use the C-style loop or \`seq\`.

## Globs are not regex

A glob is a path pattern: \`*\` matches any run of characters (not \`/\`), \`?\` one character, \`[abc]\` a set, \`[!abc]\` its negation. \`.\` is literal — \`*.log\` really means "ends in .log", not "anything, one char, log". With \`shopt -s globstar\`, \`**/\` recurses into subdirectories. Regex only appears in \`[[ =~ ]]\`, \`grep\` and friends; confuse the two and \`rm *.bak\` versus \`grep '.*\\.bak'\` stop making sense.

\`extglob\` (\`shopt -s extglob\`) upgrades globs with grouping and repetition: \`@(dev|staging|prod)\` exactly one of, \`!(*.min.js)\` everything except, \`+(pattern)\` one or more. It is what makes \`case\` and glob-based filtering expressive enough that you rarely need to shell out to grep for a simple match.`,
      questions: [
        {
          prompt: 'Without nullglob, what happens when for f in ./*.log runs in a directory with no .log files?',
          options: [
            'The loop is skipped entirely',
            'bash raises a glob error and the script exits',
            'The loop runs once with f empty',
            'The loop runs once with f set to the literal string ./*.log',
          ],
          correct: 3,
          explain: 'An unmatched glob is left as-is by default, so the loop body executes once with a filename that does not exist. nullglob turns that into zero iterations.',
        },
        {
          prompt: 'Why is for line in $(cat file) not a line-by-line loop?',
          options: [
            'The substitution is split on every whitespace character, then glob-expanded',
            'cat cannot be used inside command substitution',
            'for loops cannot iterate over more than 1024 items, so cat truncates the input',
            'It skips the final line of the file',
          ],
          correct: 0,
          explain: 'Word splitting does not know about lines — a line with spaces becomes several iterations, and any word containing * or ? matches files. while IFS= read -r is the correct tool.',
        },
        {
          prompt: 'n=5; for i in {1..$n} — what does the loop iterate over?',
          options: [
            'The numbers 1 through 5',
            'Nothing; the loop body never runs',
            'A single literal string, because brace expansion happens before $n is expanded',
            'The numbers 1 through 5, but only with shopt -s extglob',
          ],
          correct: 2,
          explain: 'Brace expansion is the first expansion performed, so it sees the characters $n, not the value 5, and leaves the whole thing literal. Use for (( i=1; i<=n; i++ )) or seq.',
        },
        {
          prompt: 'In while IFS= read -r line, what do the two modifiers buy you?',
          options: [
            'IFS= speeds up reading; -r enables raw binary mode',
            '-r keeps backslashes literal; IFS= preserves leading and trailing whitespace',
            '-r reads the whole file at once; IFS= splits it into lines',
            'They are both needed only for CSV input',
          ],
          correct: 1,
          explain: 'Without -r, read treats backslashes as escapes and mangles them; without IFS=, surrounding whitespace on each line is trimmed away.',
        },
      ],
    },
    {
      key: 'functions-exit-codes',
      title: 'Functions and exit codes',
      body: `# Functions and exit codes

Define functions with \`name() { ... }\` — the \`function\` keyword adds nothing. Inside, arguments arrive exactly like a script's: \`$1\`, \`$2\`, \`$#\` for the count, \`"$@"\` for all of them. A function is a command like any other; it participates in pipelines, conditions and \`&&\` chains through its exit status.

\`\`\`bash
die() {
  echo "error: $*" >&2
  exit 1
}

retry() {
  local n
  for n in 1 2 3; do
    "$@" && return 0
    sleep "$n"
  done
  return 1
}

retry curl -fsS https://example.com/health || die 'health check failed'
\`\`\`

\`retry\` shows the forwarding idiom from the quoting lesson doing real work: \`"$@"\` passes the wrapped command through with every argument intact, which is how wrappers, sudo-helpers and test harnesses are built.

## local, always

Every variable in bash is global by default — including ones assigned inside functions, which then silently overwrite the caller's state. Declare \`local\` for everything a function owns. One quirk worth knowing: bash locals are *dynamically* scoped, so a function can see (and modify) its caller's locals. It occasionally enables tricks; mostly it is one more reason to be disciplined.

## return versus exit

\`return\` ends the function and sets its exit status (0 to 255). \`exit\` ends the **entire script** from wherever it is called — inside a function, three calls deep, anywhere. That makes \`exit\` right for fatal errors (the \`die\` pattern above) and \`return\` right for everything a caller might want to handle. A function with no explicit \`return\` returns the status of the last command it ran — which is why a function ending in a cleanup \`echo\` can mask a failure just before it.

## $? and testing directly

\`$?\` holds the last command's status and is overwritten by every subsequent command — including the \`[\` you might test it with. Use it immediately, capture it (\`rc=$?\`), or better, avoid it: \`if my_func; then\` tests the function directly with no intermediate variable to get stale.

## The local swallow

This one bites experienced people:

\`\`\`bash
get_ip() {
  local ip=$(curl -fsS "$endpoint")   # BUG: $? is local's, always 0
  echo "$ip"
}

get_ip_fixed() {
  local ip
  ip=$(curl -fsS "$endpoint") || return 1
  echo "$ip"
}
\`\`\`

In the buggy version the command substitution runs first, but the status of the whole line is the status of the \`local\` builtin — which succeeded. The curl failure is silently discarded, and under \`set -e\` nothing aborts either, for the same reason. \`declare\` and \`export\` swallow statuses identically. The fix is mechanical: declare on one line, assign on the next. shellcheck flags this as SC2155.

One last subshell warning that foreshadows the next lesson: a function on either side of a pipe runs in a subshell, so any variables it sets vanish when the pipeline ends.`,
      questions: [
        {
          prompt: 'local ip=$(false); echo $? prints 0. Why?',
          options: [
            'false returns 0 inside command substitution',
            'echo resets $? before printing it',
            'The status comes from the local builtin, which succeeded, hiding the failure',
            'set -e already converted the substitution failure into a successful early exit',
          ],
          correct: 2,
          explain: 'local is itself a command, and its success is what $? records. Declare and assign on separate lines so the assignment\'s status is the command substitution\'s (SC2155).',
        },
        {
          prompt: 'A function in an executed script calls exit 1. What happens?',
          options: [
            'The whole script terminates with status 1',
            'Only the function returns, with status 1',
            'bash prints "exit: not allowed in function"',
            'The function returns and $? is set to 1 in the caller',
          ],
          correct: 0,
          explain: 'exit always ends the process, no matter how deep in the call stack it runs. Use return for statuses a caller should be able to handle.',
        },
        {
          prompt: 'Inside a wrapper function, which form runs the wrapped command with the caller\'s arguments passed through exactly?',
          options: [
            '$*',
            'eval $@',
            '"$*"',
            '"$@"',
          ],
          correct: 3,
          explain: '"$@" expands to one word per argument with contents preserved — the forwarding idiom. "$*" collapses everything to one word, and unquoted forms re-split.',
        },
        {
          prompt: 'What is the exit status of a function that has no return statement?',
          options: [
            'Always 0',
            'The status of the last command it executed',
            'The status of its first failing command',
            'Undefined until set -e is enabled',
          ],
          correct: 1,
          explain: 'The final command\'s status becomes the function\'s. A trailing log line or cleanup command can therefore mask an earlier failure — return explicitly when it matters.',
        },
      ],
    },
    {
      key: 'redirection-pipes',
      title: 'Redirection and pipes',
      body: `# Redirection and pipes

## 2>&1 and why order matters

\`>\` truncates and writes stdout, \`>>\` appends, \`2>\` redirects stderr. \`2>&1\` means "make file descriptor 2 point at whatever 1 points at **right now**" — a copy taken at that moment, not a live link. Redirections apply left to right, so these two lines differ:

\`\`\`bash
cmd > out.log 2>&1    # stdout to the file, then stderr copies it: both in the file
cmd 2>&1 > out.log    # stderr copies stdout's CURRENT target (the terminal),
                      # then stdout moves to the file: stderr stays on screen
\`\`\`

The second form is almost always a bug — and a sneaky one, because the errors still appear somewhere. bash offers \`&> out.log\` (and \`&>>\`) as shorthand for "both streams". To log an entire script, redirect the shell itself near the top: \`exec > "$logfile" 2>&1\`.

## Heredocs

\`\`\`bash
cat <<EOF
Deploying as $USER to $target
EOF

cat <<'EOF'
Literal mode: $USER is not expanded here
EOF
\`\`\`

An unquoted delimiter gives you variable and command substitution inside the body; quoting it (\`<<'EOF'\`) makes the body completely literal — the right choice when the heredoc contains another script, an awk program, or anything with its own \`$\` syntax. \`<<-EOF\` additionally strips leading **tabs** (only tabs), letting you indent the body inside an if block.

## Process substitution

\`<(cmd)\` runs a command and hands you a filename to read its output from; \`>(cmd)\` is the writing twin. It makes "compare two commands" trivial:

\`\`\`bash
diff <(sort us-east.txt) <(sort eu-west.txt)
\`\`\`

## Pipes create subshells

Every segment of a pipeline runs in its own subshell, and that produces the classic variable-loss bug:

\`\`\`bash
count=0
grep -c open "$f" | while read -r n; do
  count=$n
done
echo "$count"    # still 0 — the loop's count lived in a subshell
\`\`\`

The assignment happened, in a child process that is now gone. Three fixes, in order of preference: feed the loop with process substitution so the loop stays in the parent shell — \`while read -r n; do ...; done < <(grep -c open "$f")\`; use plain command substitution when you only need the output (\`count=$(grep -c open "$f")\`); or \`shopt -s lastpipe\`, which runs the final pipeline segment in the current shell (scripts only — it requires job control to be off).

## tee

\`tee\` copies stdin to a file *and* to stdout: \`./deploy.sh 2>&1 | tee deploy.log\` shows progress live while keeping a record (\`-a\` appends). Its second career is writing files as root: \`sudo echo x > /protected\` fails because **your** unprivileged shell performs the redirection before sudo ever starts — \`echo x | sudo tee /protected >/dev/null\` puts the file-writing inside the privileged process.`,
      questions: [
        {
          prompt: 'What does cmd 2>&1 > out.log actually do?',
          options: [
            'stderr goes to the terminal and only stdout goes to out.log',
            'Both streams go to out.log',
            'Both streams go to the terminal',
            'stderr goes to out.log and stdout to the terminal',
          ],
          correct: 0,
          explain: '2>&1 copies stdout\'s target at that instant — still the terminal — into stderr; only then does stdout move to the file. Write cmd > out.log 2>&1 for both.',
        },
        {
          prompt: 'When should the heredoc delimiter be quoted, as in <<\'EOF\'?',
          options: [
            'When the body spans more than one line',
            'When you want leading tabs stripped from the body, which the quotes switch on',
            'When the body must be literal — no variable or command expansion',
            'Never; quoting the delimiter is a syntax error',
          ],
          correct: 2,
          explain: 'A quoted delimiter disables all expansion in the body, so embedded $ syntax survives untouched. Tab stripping is the separate <<- feature.',
        },
        {
          prompt: 'A while read loop fed by a pipe sets total, but total is empty afterwards. Why?',
          options: [
            'read cannot assign to variables declared outside the loop',
            'The loop ran in a subshell created by the pipe, and its variables died with it',
            'set -u cleared the variable when the pipe closed',
            'The pipe buffered the data so the loop never executed',
          ],
          correct: 1,
          explain: 'Each pipeline segment is a subshell; assignments there never reach the parent. Feed the loop with done < <(producer) to keep it in the current shell.',
        },
        {
          prompt: 'What is the idiomatic one-liner to compare the sorted output of two commands?',
          options: [
            'cmd1 | cmd2 | diff',
            'diff $(sort a) $(sort b)',
            'diff "$(sort a)" "$(sort b)"',
            'diff <(sort a) <(sort b)',
          ],
          correct: 3,
          explain: 'Process substitution hands diff two readable filenames backed by the running commands. The $( ) forms pass the file CONTENTS as arguments, which diff would treat as filenames.',
        },
        {
          prompt: 'Why does sudo echo line > /etc/protected.conf fail with permission denied?',
          options: [
            'echo is a shell builtin and cannot be run under sudo',
            'sudo strips write permissions from redirections for safety, which is why it fails',
            'The redirection is performed by your unprivileged shell before sudo ever runs',
            '/etc files can only be modified with sudoedit',
          ],
          correct: 2,
          explain: 'Redirections are set up by the invoking shell, which lacks root. Piping into sudo tee moves the file write into the privileged process.',
        },
      ],
    },
    {
      key: 'arrays-expansion',
      title: 'Arrays and parameter expansion',
      body: `# Arrays and parameter expansion

## Indexed arrays

\`\`\`bash
files=(report.txt 'two words.txt')
files+=(third.txt)

echo "\${#files[@]}"              # 3 — element count
printf '%s\\n' "\${files[@]}"      # one line per element, spaces intact
for i in "\${!files[@]}"; do      # the indices
  printf '%d: %s\\n' "$i" "\${files[$i]}"
done
\`\`\`

\`"\${files[@]}"\` is the whole point: one word per element, exactly as stored — this is what makes arrays the fix for the quoting lesson's list-in-a-string problem. Its sibling \`"\${files[*]}"\` joins everything into a single word (first character of \`IFS\` as the glue), which is only for display. A bare \`$files\` is just element 0 — a classic review catch. Note that \`unset 'files[1]'\` leaves a **sparse** array: indices stop being contiguous, which is why the index loop above uses \`"\${!files[@]}"\` rather than counting up to the length.

## Associative arrays

\`\`\`bash
declare -A port=([http]=80 [https]=443)
port[ssh]=22

for name in "\${!port[@]}"; do
  printf '%s=%s\\n' "$name" "\${port[$name]}"
done
\`\`\`

\`declare -A\` is mandatory — without it, string keys silently collapse to index 0 and entries overwrite each other. Associative arrays need bash 4+, which excludes the stock macOS \`/bin/bash\`; one more reason the shebang lesson said to find bash via \`env\`.

## The parameter expansion toolbox

Parameter expansion transforms values in-process — no \`sed\`, no \`basename\`, no fork. In a loop over ten thousand paths, that is the difference between instant and minutes.

Defaults and guards:

- \`\${var:-fallback}\` — use fallback if \`var\` is unset **or empty**; \`\${var-fallback}\` triggers on unset only. The colon variants of all these treat empty like unset.
- \`\${var:=fallback}\` — same, but also assigns the fallback to \`var\`.
- \`\${var:?config path required}\` — expand or die with that message; the standard one-line required-argument check, strict-mode friendly.
- \`\${var:+alt}\` — the inverse: expand to \`alt\` only when \`var\` is set, perfect for optional flags like \`\${verbose:+-v}\`.

Trimming — \`#\` eats from the front, \`%\` from the back, doubled means greedy:

- \`\${path##*/}\` — remove the longest prefix matching \`*/\`: basename.
- \`\${path%/*}\` — remove the shortest \`/*\` suffix: dirname.
- \`\${file%.*}\` — strip the extension; \`\${file##*.}\` — extract it.

And the rest of the kit: \`\${var/old/new}\` replaces the first match, \`\${var//old/new}\` every match; \`\${var:offset:length}\` slices (\`\${sha:0:7}\` for a short commit hash); \`\${#var}\` is the string's length; \`\${var^^}\` and \`\${var,,}\` upcase and downcase. Every one of these accepts array elements too — \`\${files[0]%.*}\` — and the trim forms even map over whole arrays: \`"\${files[@]%.txt}"\`.`,
      questions: [
        {
          prompt: 'path=/var/log/app/error.log — what does ${path##*/} expand to?',
          options: [
            '/var/log/app',
            'error.log',
            'error',
            '/var/log/app/error',
          ],
          correct: 1,
          explain: '## removes the longest prefix matching */, deleting everything through the final slash — the in-process basename.',
        },
        {
          prompt: 'What distinguishes ${v:-default} from ${v-default}?',
          options: [
            'Nothing; the colon is optional style',
            '${v-default} also assigns default to v',
            '${v:-default} errors under set -u when v is unset, while the other form does not',
            'The colon form also substitutes when v is set but empty',
          ],
          correct: 3,
          explain: 'The colon adds "or empty" to the condition, and that rule carries across the whole family (:=, :?, :+).',
        },
        {
          prompt: 'How does "${arr[*]}" differ from "${arr[@]}"?',
          options: [
            '[*] joins all elements into one word using the first IFS character; [@] one word each',
            'They are identical when quoted',
            '[*] returns the element count instead of the contents, the same way that ${#arr[@]} does',
            '[@] only works on associative arrays',
          ],
          correct: 0,
          explain: 'Quoted [@] preserves each element as its own argument — the form you pass to commands. Quoted [*] builds a single joined string, useful only for messages.',
        },
        {
          prompt: 'Which expansion turns archive.tar.gz into archive.tar?',
          options: [
            '${archive##.*}',
            '${archive%%.*}',
            '${archive%.*}',
            '${archive#*.}',
          ],
          correct: 2,
          explain: '% removes the shortest matching suffix, so only .gz goes. %% would greedily remove .tar.gz, and #/## work on prefixes — ${archive#*.} leaves tar.gz.',
        },
      ],
    },
    {
      key: 'robust-patterns',
      title: 'Patterns for scripts that survive',
      body: `# Patterns for scripts that survive

## trap: cleanup that always runs

\`\`\`bash
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
\`\`\`

The \`EXIT\` trap fires on any script termination: falling off the end, an explicit \`exit\`, a \`set -e\` abort, and (in bash) death by \`INT\` or \`TERM\`. That makes one \`EXIT\` trap the workhorse for cleanup — temp dirs, lock files, kills for background children. Add explicit \`INT\`/\`TERM\` traps only when you need signal-specific behavior, such as re-raising to exit with the conventional 128-plus-signal status. Note the **single quotes**: they defer expansion until the trap fires, so it sees the variable's final value; double quotes would freeze whatever \`$tmp\` held when the trap was declared. And always \`mktemp\` (or \`mktemp -d\` for a directory) rather than inventing \`/tmp/myscript.$$\` — it guarantees a fresh, unpredictable, correctly-permissioned path and respects \`TMPDIR\`.

## Argument parsing: while + case

\`getopts\` is fine for short options, but it cannot do \`--long-flags\`. The pattern that scales is a plain loop:

\`\`\`bash
dry_run=0
env=prod
while [[ $# -gt 0 ]]; do
  case $1 in
    -n|--dry-run) dry_run=1 ;;
    -e|--env) env=\${2:?--env needs a value}; shift ;;
    -h|--help) usage; exit 0 ;;
    --) shift; break ;;
    -*) echo "unknown option: $1" >&2; exit 2 ;;
    *) break ;;
  esac
  shift
done
target=\${1:?target required}
\`\`\`

Everything in it is machinery you already have: \`case\` globs for dispatch, \`shift\` to consume, \`\${2:?}\` to demand option values, \`--\` to end option parsing, and positional arguments left in \`$@\` when the loop breaks.

## Preflight checks

Fail in the first second, not twenty minutes in. \`command -v\` is the portable, builtin way to ask "does this exist?" — \`which\` is an external program with non-standard behavior across systems and sees nothing about shell functions or aliases.

\`\`\`bash
for cmd in jq curl rsync; do
  command -v "$cmd" >/dev/null || { echo "missing dependency: $cmd" >&2; exit 1; }
done
\`\`\`

## shellcheck

If you adopt one thing from this course, make it this. shellcheck is a static analyzer that knows every trap these lessons covered: SC2086 unquoted expansions, SC2155 the \`local\` swallow, SC2164 \`cd\` without \`|| exit\`, \`$?\` used too late, useless \`cat\`, \`[ ]\` operator typos, globs that cannot match. Run \`shellcheck deploy.sh\` in CI, and install the editor extension so the warnings appear as you type. When it is wrong — rarely — silence the specific line with a justified directive comment: \`# shellcheck disable=SC2086\` plus a reason.

## Knowing when to stop

Bash's sweet spot is coordinating processes, files and pipes — glue. Rewrite in Python or Go when you see: data that wants real structures (anything nested — bash has flat arrays and nothing else), error handling beyond "stop or ignore", floating point, concurrency beyond naive \`&\`, a need for unit tests, or a file pushing past a few hundred lines. The failure mode is gradual: a 40-line wrapper grows a config parser, then a retry queue, and by 600 lines it is an application written in a language with no types, no exceptions and no data structures. The scripts that survive are the ones whose authors knew what not to write in shell.`,
      questions: [
        {
          prompt: 'A set -e script creates a temp dir and later a command fails mid-run. Which cleanup approach still removes the temp dir?',
          options: [
            'rm -rf "$tmp" as the last line of the script',
            'A cleanup call inside an if at each failure point',
            "trap 'rm -rf \"$tmp\"' EXIT, registered right after mktemp -d",
            'trap alone cannot run after an errexit abort',
          ],
          correct: 2,
          explain: 'The EXIT trap runs on any termination, including errexit aborts and INT/TERM, so cleanup no longer depends on reaching the end of the script.',
        },
        {
          prompt: 'Why check dependencies with command -v curl rather than which curl?',
          options: [
            'which only searches /usr/bin',
            'command -v is a portable builtin; which is an external tool with inconsistent behavior',
            'which cannot be used inside if statements',
            'command -v also verifies the binary version before reporting the path that it found first',
          ],
          correct: 1,
          explain: 'command -v is specified by POSIX, costs no fork, and answers for builtins, functions and aliases too. which varies between systems and can lie about what the shell will actually run.',
        },
        {
          prompt: 'shellcheck flags SC2086 on a line. What is it telling you?',
          options: [
            'An expansion is unquoted and subject to word splitting and globbing',
            'The script lacks a shebang line',
            'A variable is assigned but never used',
            'cd is used without error handling',
          ],
          correct: 0,
          explain: 'SC2086 is the unquoted-expansion warning — the quoting lesson as a lint rule. Fix it by double-quoting, or disable it on that line with a comment only when the splitting is intentional.',
        },
        {
          prompt: 'Which situation is the strongest signal that a bash script should become a Python or Go program?',
          options: [
            'It needs to run the same pipeline on twenty files',
            'It calls curl and jq together',
            'It must run on both Linux and macOS',
            'Its data wants nested structures — lists of records with named fields',
          ],
          correct: 3,
          explain: 'Bash has flat arrays and strings, nothing more; the moment you are faking structs with delimited strings or parallel arrays, a real language pays for itself. Loops over files and portable tool calls are still squarely shell territory.',
        },
      ],
    },
  ],
}
