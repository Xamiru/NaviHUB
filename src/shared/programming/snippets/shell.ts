import type { ProgSnippet } from '../snippets'

// shell snippet deck — one file per language so authors never collide. Rules
// in snippets.ts. Every 'output' entry was executed on the authoring machine.
export const SHELL_SNIPPETS: ProgSnippet[] = [
  {
    key: 'shell-unquoted-glob',
    lang: 'shell',
    kind: 'bug',
    code: `#!/bin/bash
files="*.log"
for f in $files; do
  rm -- "$f"
done`,
    prompt: 'What is wrong with this script?',
    options: [
      'Nothing — it removes every .log file in the current directory',
      '`$files` should be quoted, otherwise the glob never expands',
      '`rm --` is invalid; the `--` must come after the filename',
      'The loop variable must be declared with `local` inside a script'
    ],
    correct: 0,
    explain:
      'The UNQUOTED `$files` is exactly what makes the glob expand at loop time (quoting it would loop once over the literal string `*.log`). `--` ends option parsing so a file named `-x.log` is still removed. It works — the pattern is fragile (spaces in names, no-match case), but not wrong.'
  },
  {
    key: 'shell-args-quoting',
    lang: 'shell',
    kind: 'output',
    code: `#!/bin/bash
show() {
  for a in "$@"; do echo "[$a]"; done
  for a in $*; do echo "-$a-"; done
}
set -- "ab cd" ef
show "$@"`,
    prompt: 'What does this print?',
    options: [
      '[ab cd]\n[ef]\n-ab cd-\n-ef-',
      '[ab]\n[cd]\n[ef]\n-ab-\n-cd-\n-ef-',
      '[ab cd]\n[ef]\n-ab-\n-cd-\n-ef-',
      '[ab cd]\n[ef]\n[ab cd]\n[ef]'
    ],
    correct: 2,
    explain:
      'Quoted "$@" expands each positional parameter as its own word, so "ab cd" stays one item; unquoted $* undergoes word splitting on IFS, breaking "ab cd" into two.'
  },
  {
    key: 'shell-octal-arithmetic',
    lang: 'shell',
    kind: 'output',
    code: `#!/bin/bash
a=010
b=$((a + 1))
c=$((10 + 1))
echo "$b $c"`,
    prompt: 'What does this print?',
    options: ['11 11', '9 11', '011 11', '9 9'],
    correct: 1,
    explain:
      'A leading zero makes bash treat 010 as octal (value 8), so a + 1 is 9; the literal 10 has no leading zero and is parsed as plain decimal, so c is 11.'
  },
  {
    key: 'shell-param-expansion-defaults',
    lang: 'shell',
    kind: 'output',
    code: `#!/bin/bash
unset a
echo "\${a:-x}"
echo "$a"
b=""
echo "\${b:=y}"
echo "$b"
c="c"
echo "\${c:+z}"`,
    prompt: 'What does this print?',
    options: [
      'x\nx\ny\ny\nz',
      'x\n\ny\ny\nc',
      'x\n\ny\n\nz',
      'x\n\ny\ny\nz'
    ],
    correct: 3,
    explain:
      ':- substitutes a default WITHOUT assigning, so a is still unset on the next line (empty echo); := both substitutes and assigns, so b keeps the value y; :+ substitutes an alternate value only because c is already set and non-null.'
  },
  {
    key: 'shell-array-slice',
    lang: 'shell',
    kind: 'output',
    code: `#!/bin/bash
arr=(a b c d e)
echo "\${#arr[@]}"
echo "\${arr[@]:1:2}"
echo "\${arr[-1]}"`,
    prompt: 'What does this print?',
    options: ['5\na b\ne', '5\nb c\ne', '5\nb c\nd', '4\nb c\ne'],
    correct: 1,
    explain:
      '${#arr[@]} is the element count (5); ${arr[@]:1:2} slices two elements starting at index 1, giving "b c"; ${arr[-1]} is the last element, "e".'
  },
  {
    key: 'shell-printf-vs-echo',
    lang: 'shell',
    kind: 'output',
    code: `#!/bin/bash
echo -e "a\\tb"
echo "c\\td"
printf "%s\\t%s\\n" "e" "f"`,
    prompt: 'What does this print?',
    options: [
      'a\\tb\nc\\td\ne\\tf',
      'a\tb\nc\td\ne\tf',
      'a\tb\nc\\td\ne\tf',
      'a\tb\nc\\td\ne\\tf'
    ],
    correct: 2,
    explain:
      'echo -e interprets backslash escapes like \\t as a real tab; plain echo without -e leaves \\t as two literal characters; printf always interprets escapes in its format string, no flag needed.'
  },
  {
    key: 'shell-sort-uniq-count',
    lang: 'shell',
    kind: 'output',
    code: `#!/bin/bash
printf '%s\\n' apple banana apple cherry banana apple | sort | uniq -c`,
    prompt: 'What does this print?',
    options: [
      '3 apple\n2 banana\n1 cherry',
      '      1 apple\n      1 banana\n      1 apple\n      1 cherry\n      1 banana\n      1 apple',
      'apple 3\nbanana 2\ncherry 1',
      '      3 apple\n      2 banana\n      1 cherry'
    ],
    correct: 3,
    explain:
      'uniq -c only collapses ADJACENT duplicate lines, so the input must be sorted first; it then prints a right-justified count column, a space, then the line.'
  },
  {
    key: 'shell-set-e-pipeline',
    lang: 'shell',
    kind: 'bug',
    code: `#!/bin/bash
set -e
false | true
echo "after pipeline"
val=$(false)
echo "after subst: $val"`,
    prompt: 'Why does this not do what the author intended?',
    options: [
      'set -e only stops a script when a failing command sits alone at the end of a line, so wrapping a failure inside a pipeline like false | true or a substitution like $(false) always defeats it, regardless of where the failure actually happens.',
      "Only the pipeline's last command (true) sets its exit status, so false | true never triggers set -e; but val=$(false) does, because the assignment's own status is the substitution's.",
      'false | true fails and triggers set -e immediately, so the script never reaches the val=$(false) line at all.',
      'val=$(false) runs in a subshell whose exit status is discarded, so both lines print and the script exits with status 0.'
    ],
    correct: 1,
    explain:
      "A pipeline's exit status is normally just its last command's, so a failing false before a successful true never trips set -e; a failing command substitution used in an assignment DOES trip it, since the assignment's own exit status is the substitution's — so the script prints 'after pipeline' then dies before 'after subst'."
  },
  {
    key: 'shell-bracket-glob-match',
    lang: 'shell',
    kind: 'bug',
    code: `#!/bin/bash
str="foobar"
if [ $str == foo* ]; then
  echo "single: match"
else
  echo "single: no match"
fi
if [[ $str == foo* ]]; then
  echo "double: match"
else
  echo "double: no match"
fi`,
    prompt: 'What is wrong with this script?',
    options: [
      '[ ] (test) never does pattern matching -- foo* is compared as a literal string, so it fails; [[ ]] treats an unquoted right-hand pattern as a glob, so it matches.',
      "Both [ ] and [[ ]] treat == as a pattern match here, so the script prints 'match' for both brackets in this directory.",
      '== is a syntax error inside [ ], so bash aborts the script before it reaches the [[ ]] check at all.',
      '[[ ]] requires patterns to be quoted or it falls back to a literal comparison, so the double-bracket check is the one that fails here.'
    ],
    correct: 0,
    explain:
      "[ ] is the POSIX test command -- == there is a plain string comparison, and an unquoted foo* on the right is just literal text rather than a pattern; [[ ]] is a bash keyword that does real pattern matching for an unquoted right-hand side."
  },
  {
    key: 'shell-local-masks-exit-status',
    lang: 'shell',
    kind: 'bug',
    code: `#!/bin/bash
check() {
  local out=$(false)
  echo "status: $?"
}
check`,
    prompt: 'Why does this not do what the author intended?',
    options: [
      'Command substitution $(...) always resets $? to 0 once its output has been captured into a variable.',
      "local declarations run before the function body, so $(false) executes in the caller's shell and never affects this function's $?.",
      "local is itself the command that just ran, so $? reports local's own success -- the exit status of $(false) is discarded before it ever reaches $?.",
      'false only returns nonzero when called directly on the command line, not when used inside $(...).'
    ],
    correct: 2,
    explain:
      "local out=$(false) is a single compound command whose own exit status -- from local itself, which succeeds -- is what $? reports; the exit status of the $(false) substitution is thrown away before it ever reaches $?."
  },
  {
    key: 'shell-while-read-subshell',
    lang: 'shell',
    kind: 'bug',
    code: `#!/bin/bash
count=0
printf 'a\\nb\\nc\\n' | while read -r line; do
  count=$((count + 1))
done
echo "count=$count"`,
    prompt: 'Why does this not do what the author intended?',
    options: [
      'read -r clears every variable in the current shell at the start of each line it reads, including count.',
      '$((count + 1)) needs let instead of $(( )) inside a loop, so the expression silently evaluates to 0 every time.',
      'printf and while read run at different priorities, so the loop body never actually executes for any line.',
      "The pipe sends the loop into a subshell, so every count update happens in a copy of the shell that vanishes when the loop ends -- the parent's count stays 0."
    ],
    correct: 3,
    explain:
      "Every command on the right side of a pipe runs in its own subshell, so the while loop (and every variable it sets) exists in a forked copy of the shell that disappears once the pipe finishes -- the parent shell's count is untouched."
  },
  {
    key: 'shell-stderr-redirect-order',
    lang: 'shell',
    kind: 'bug',
    code: `#!/bin/bash
prog() {
  echo "stdout line"
  echo "stderr line" >&2
}
# intended: capture BOTH streams in out.txt
prog 2>&1 >out.txt
cat out.txt`,
    prompt: 'What is wrong with this script?',
    options: [
      '2>&1 only has any effect when it is written immediately after the command name and before every other redirection on the line, so placing it after prog like this silently does nothing at all.',
      'Redirections apply left to right -- 2>&1 first points fd 2 at wherever fd 1 currently goes (the terminal), and only then does >out.txt move fd 1; stderr keeps going to the terminal.',
      '>&2 inside the function body permanently swaps stdout and stderr for the rest of the script, not just that one line.',
      "Function output can't be redirected from the caller; only commands defined outside a function honor 2>&1 and >out.txt."
    ],
    correct: 1,
    explain:
      'Bash applies redirections left to right: 2>&1 duplicates fd 2 onto whatever fd 1 currently points to (the terminal, at that moment), and only afterward does >out.txt repoint fd 1 -- so stderr never reaches the file. The fix is >out.txt 2>&1.'
  }
]
