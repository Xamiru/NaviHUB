import type { ProgSnippet } from '../snippets'

// python snippet deck — one file per language so authors never collide. Rules
// in snippets.ts. Every 'output' entry was executed on the authoring machine.
export const PYTHON_SNIPPETS: ProgSnippet[] = [
  {
    key: 'python-mutable-default',
    lang: 'python',
    kind: 'output',
    code: `def add(x, bucket=[]):
    bucket.append(x)
    return bucket

print(add(1))
print(add(2))`,
    prompt: 'What does this print?',
    options: ['[1]\n[2]', '[1]\n[1, 2]', '[1, 2]\n[1, 2]', 'TypeError: list is not callable'],
    correct: 1,
    explain:
      'Default arguments are evaluated once, at definition time — the same list object is reused on every call that omits `bucket`.'
  },
  {
    key: 'python-closure-late-binding',
    lang: 'python',
    kind: 'output',
    code: `funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])`,
    prompt: 'What does this print?',
    options: ['[2, 2, 2]', '[0, 1, 2]', '[0, 0, 0]', "TypeError: 'int' object is not callable"],
    correct: 0,
    explain:
      'All three lambdas close over the same variable i, not its value at append time. By the time they run, the loop has finished and i is 2 for every one of them.'
  },
  {
    key: 'python-is-vs-int-cache',
    lang: 'python',
    kind: 'output',
    code: `a = int("100")
b = int("100")
c = int("1000")
d = int("1000")
print(a is b)
print(c is d)`,
    prompt: 'What does this print?',
    options: ['False\nTrue', 'True\nFalse', 'True\nTrue', 'False\nFalse'],
    correct: 1,
    explain:
      'CPython caches small ints from -5 to 256, so both 100s point at the same cached object. 1000 is outside that range, so each int("1000") call builds a distinct object — equal but not the same object.'
  },
  {
    key: 'python-list-alias-vs-copy',
    lang: 'python',
    kind: 'output',
    code: `a = [1, 2, 3]
b = a
c = a.copy()
b.append(4)
c.append(5)
print(a, b, c)`,
    prompt: 'What does this print?',
    options: [
      '[1, 2, 3, 4, 5] [1, 2, 3, 4, 5] [1, 2, 3, 4, 5]',
      '[1, 2, 3] [1, 2, 3, 4] [1, 2, 3, 5]',
      '[1, 2, 3, 4] [1, 2, 3, 4] [1, 2, 3, 5]',
      '[1, 2, 3, 5] [1, 2, 3, 5] [1, 2, 3, 5]'
    ],
    correct: 2,
    explain:
      'b = a aliases the same list, so b.append(4) also changes a. c = a.copy() makes a separate list, so appending 5 to c never touches a or b.'
  },
  {
    key: 'python-dict-setdefault',
    lang: 'python',
    kind: 'output',
    code: `d = {}
d.setdefault('a', []).append(1)
d.setdefault('a', []).append(2)
d.setdefault('b', []).append(3)
print(d)`,
    prompt: 'What does this print?',
    options: [
      "{'a': [1], 'a': [2], 'b': [3]}",
      "{'a': [], 'b': []}",
      "KeyError: 'a'",
      "{'a': [1, 2], 'b': [3]}"
    ],
    correct: 3,
    explain:
      "setdefault only inserts the fresh [] the first time a key is missing; the second call for 'a' returns the SAME list that already holds 1, so 2 lands in it too."
  },
  {
    key: 'python-generator-exhaustion',
    lang: 'python',
    kind: 'output',
    code: `def gen():
    yield 1
    yield 2

g = gen()
print(list(g))
print(list(g))`,
    prompt: 'What does this print?',
    options: ['[1, 2]\n[]', '[1, 2]\n[1, 2]', '[]\n[1, 2]', 'TypeError: generator can only be consumed once'],
    correct: 0,
    explain:
      "A generator is a one-shot iterator. The first list(g) pulls both values and exhausts it, so the second list(g) has nothing left to yield."
  },
  {
    key: 'python-negative-floor-div-mod',
    lang: 'python',
    kind: 'output',
    code: `print(-7 // 2, -7 % 2)`,
    prompt: 'What does this print?',
    options: ['-3 -1', '-4 1', '-4 -1', '-3 1'],
    correct: 1,
    explain:
      '// floors toward negative infinity, so -7 // 2 is -4, not -3. % always takes the sign of the divisor, so -7 % 2 is 1, not -1.'
  },
  {
    key: 'python-bool-short-circuit-values',
    lang: 'python',
    kind: 'output',
    code: `print(0 or "" or "hi" or "bye")
print(1 and 2 and 0 and 3)`,
    prompt: 'What does this print?',
    options: ['True\nFalse', 'bye\n3', 'hi\n0', 'hi\n3'],
    correct: 2,
    explain:
      '`or` and `and` return one of their actual operands, not a bool: `or` returns the first truthy value it finds, `and` returns the first falsy one, short-circuiting the rest.'
  },
  {
    key: 'python-try-finally-return',
    lang: 'python',
    kind: 'bug',
    code: `def f():
    try:
        return 1
    finally:
        return 2

print(f())`,
    prompt: 'Which statement about this code is right?',
    options: [
      'SyntaxError: return is not allowed inside finally',
      "It returns 1 — the try block's return wins over finally",
      'It returns None because the two return statements cancel out',
      "It returns 2 — finally's return overrides try's"
    ],
    correct: 3,
    explain:
      "A return (or break/continue) executed inside finally replaces whatever the try block was about to return, so f() returns 2, not 1."
  },
  {
    key: 'python-string-immutability',
    lang: 'python',
    kind: 'bug',
    code: `s = "hello"
s[0] = "H"
print(s)`,
    prompt: 'Why does this fail?',
    options: [
      'Strings are immutable, so item assignment on a str raises TypeError',
      'Strings are mutable but indices start at 1, so s[0] is out of range',
      'You must call s.replace() before indexing into a string',
      'The variable s was never declared with an explicit str type'
    ],
    correct: 0,
    explain:
      "str has no __setitem__ — strings can't be mutated in place. Building a changed string (e.g. \"H\" + s[1:]) is the fix, not indexed assignment."
  },
  {
    key: 'python-unboundlocal-shadowing',
    lang: 'python',
    kind: 'bug',
    code: `x = 10

def f():
    x += 1
    return x

f()`,
    prompt: 'Why does this fail?',
    options: [
      'x is a reserved keyword and cannot be reassigned',
      'x += 1 makes x local to f, so reading it first errors',
      'Integers cannot be incremented with += in Python',
      'The global x is deleted as soon as f() is defined'
    ],
    correct: 1,
    explain:
      'Assigning to x anywhere in a function body makes it a local for the WHOLE function, so the read in x += 1 hits that not-yet-assigned local instead of the module-level x. Fix with `global x`.'
  },
  {
    key: 'python-class-vs-instance-attr',
    lang: 'python',
    kind: 'bug',
    code: `class Dog:
    tricks = []

    def add_trick(self, t):
        self.tricks.append(t)

a = Dog()
b = Dog()
a.add_trick('sit')
b.add_trick('roll')
print(a.tricks)`,
    prompt: 'Which statement about this code is right?',
    options: [
      "AttributeError: tricks isn't set in __init__",
      'Each Dog instance gets its own private tricks list',
      'tricks is a class attribute shared by every instance',
      "It prints an empty list since self.tricks was never assigned"
    ],
    correct: 2,
    explain:
      'tricks = [] at class level creates ONE list shared by every instance; self.tricks.append mutates that shared list rather than a per-instance one, since there is no instance attribute shadowing it.'
  },
  {
    key: 'python-eq-without-hash',
    lang: 'python',
    kind: 'bug',
    code: `class Point:
    def __init__(self, x):
        self.x = x

    def __eq__(self, other):
        return self.x == other.x

p = Point(1)
s = {p}`,
    prompt: 'Why does this fail?',
    options: [
      'Point needs an __init__ that calls super().__init__()',
      'Sets can only hold immutable built-in types like int and str',
      '__eq__ must return a Point instance, not a bool',
      'Defining __eq__ sets __hash__ to None, so Point is unhashable'
    ],
    correct: 3,
    explain:
      "A class that defines __eq__ but not __hash__ has its __hash__ set to None by Python, since two 'equal' objects should hash the same and the default identity-hash no longer applies. That makes it unhashable, so it can't go in a set."
  }
]
