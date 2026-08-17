import type { ProgCourseDef } from './types'

export const PYTHON_COURSE: ProgCourseDef = {
  key: 'python-beyond-basics',
  title: 'Python beyond basics',
  description: 'The data model, iterators and generators, decorators, context managers, typing, the concurrency model and modern packaging.',
  lessons: [
    {
      key: 'data-model',
      title: 'The data model: dunders and protocols',
      body: `# The data model is the language

Python has few keywords doing a lot of work, because almost every piece of syntax is defined as a call to a specially named method. \`len(x)\` is \`type(x).__len__(x)\`. \`a + b\` is \`type(a).__add__(a, b)\`. \`for x in y\` starts with \`type(y).__iter__(y)\`. These **dunder** methods (double underscore front and back) are not decoration — they are the vocabulary the interpreter speaks. Implement the right ones and your class becomes indistinguishable from a builtin at the syntax level.

Two rules people trip on. Dunders are looked up **on the type, not the instance**: assigning \`obj.__len__ = lambda: 3\` does nothing for \`len(obj)\`. And you implement *protocols*, not interfaces — nothing to inherit, nothing to register. \`in\` works if you define \`__contains__\`, and it also works if you define only \`__iter__\`, because the interpreter falls back to a linear scan.

## Write __repr__ first

\`__repr__\` is for you — the REPL, the debugger, and anything printing a container. \`__str__\` is for an end user. If you write only one, write \`__repr__\`: \`str()\` falls back to it, but \`repr()\` never falls back to \`__str__\`.

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __repr__(self):
        return f"Point({self.x!r}, {self.y!r})"

p = Point(1, 2)
print(p)      # Point(1, 2)   -- str() fell back to __repr__
print([p])    # [Point(1, 2)] -- containers always use repr, never str
\`\`\`

Aim for a repr that reads like the constructor call that would rebuild the object. The \`!r\` conversion is what keeps nested strings quoted.

## Sized, iterable, subscriptable

\`__len__\` gives you \`len()\`. \`__iter__\` gives you \`for\`, unpacking, \`list()\`, \`sum()\`, \`in\`. \`__getitem__\` gives you \`obj[k]\` — and, as a legacy fallback, iteration: if a class has no \`__iter__\` at all, \`iter()\` builds an iterator that calls \`__getitem__\` with 0, 1, 2, ... until \`IndexError\`. That fallback is why old code without \`__iter__\` still works in a \`for\` loop; when both exist, \`__iter__\` wins.

\`\`\`python
class Seq:
    def __getitem__(self, i):
        if i > 2:
            raise IndexError
        return i * 10

print(list(Seq()))    # [0, 10, 20]  -- no __iter__ anywhere
print(20 in Seq())    # True         -- __contains__ fell back to iteration
\`\`\`

## Truthiness has a two-step fallback

\`bool(obj)\` asks \`__bool__\` first. Missing that, it asks \`__len__\` and calls the object false when the length is zero. Missing both, every instance is true — which is why a plain object with no dunders is always truthy, and why an empty collection class you wrote is falsy for free the moment you add \`__len__\`. Beware the consequence: a class where "empty" is a legitimate, meaningful state will silently fail \`if obj:\` checks once \`__len__\` exists.

## __eq__ and __hash__ travel as a pair

Defining \`__eq__\` sets \`__hash__ = None\` on the class, and instances become unhashable — no sets, no dict keys. That is deliberate: the contract says **equal objects must have equal hashes**, and Python refuses to guess a hash consistent with your new equality. Restore hashing yourself, over the same fields the equality uses, and only if those fields never change while the object is in a set.

\`\`\`python
class Card:
    def __init__(self, rank):
        self.rank = rank
    def __eq__(self, other):
        return isinstance(other, Card) and self.rank == other.rank
    def __hash__(self):
        return hash(self.rank)

print(len({Card(1), Card(1), Card(2)}))   # 2
\`\`\`

Without that \`__hash__\`, the same line raises \`TypeError: unhashable type: 'Card'\`.

## Operators and NotImplemented

\`a + b\` tries \`a.__add__(b)\`. If that method returns the **\`NotImplemented\` singleton** (not the \`NotImplementedError\` exception), Python then tries \`b.__radd__(a)\`, and only if that also declines does it raise \`TypeError\`. Returning \`NotImplemented\` for operand types you do not understand is what lets someone else's class interoperate with yours. Never return \`False\` there — that turns a type error into a silent wrong answer.

## Context managers, in one line

\`with expr as name:\` calls \`type(expr).__enter__(expr)\` and binds its return value to \`name\`, then guarantees \`__exit__(exc_type, exc, tb)\` runs on the way out — normal exit, exception, \`return\`, or \`break\`. The full lesson comes later; the point here is that \`with\` is not special syntax for files, it is one more protocol any class can join.

Hold onto one sentence: *Python's syntax is a set of protocol calls, so making your object act like a builtin means implementing the methods that syntax already calls.*`,
      questions: [
        {
          prompt: 'A class defines __repr__ but no __str__. What does print(obj) display?',
          options: [
            'The __repr__ output, because str() falls back to __repr__',
            'The default <__main__.C object at 0x7f...> form for the instance',
            'A TypeError, since print requires a __str__ on the class',
            'An empty string, then the repr only inside a list or dict'
          ],
          correct: 0,
          explain: 'str() falls back to __repr__ when __str__ is absent, which is why __repr__ is the one to write first. The reverse fallback does not exist.'
        },
        {
          prompt: 'You add __eq__ to a class and it stops working as a dict key. Why?',
          options: [
            'Dict keys must define __lt__ so the hash table can order collisions',
            'Instances of user classes were never hashable without a decorator',
            'Defining __eq__ sets __hash__ to None, making instances unhashable',
            'The default __hash__ now raises because equality got slower to compute'
          ],
          correct: 2,
          explain: 'Equal objects must hash equally. Python cannot infer a hash matching your new equality, so it removes the inherited one and you must supply __hash__ yourself.'
        },
        {
          prompt: 'A class defines __len__ returning 0 and no __bool__. What is bool(instance)?',
          options: [
            'True, because instances of user-defined classes are truthy by default',
            'False, because bool() falls back to __len__ when __bool__ is absent',
            'A TypeError asking the class to define __bool__ explicitly',
            'None, since bool() returns the __len__ result unconverted'
          ],
          correct: 1,
          explain: 'Truthiness checks __bool__ first, then __len__, treating length zero as false. Only with neither method present is every instance true.'
        },
        {
          prompt: 'A class defines only __getitem__, raising IndexError past the end. What does list(obj) do?',
          options: [
            'Raises TypeError because the object defines no __iter__ method',
            'Returns an empty list, since list() only consults __iter__',
            'Copies the instance dictionary keys in insertion order',
            'Calls __getitem__ with 0, 1, 2, ... until IndexError ends it'
          ],
          correct: 3,
          explain: 'The legacy sequence protocol lets iter() build an iterator from __getitem__ alone. When __iter__ also exists it takes priority and this fallback is skipped.'
        }
      ]
    },
    {
      key: 'iterators-generators',
      title: 'Iterators, generators, laziness',
      body: `# Iterable is not iterator

Two protocols, one letter apart, constantly confused.

An **iterable** has \`__iter__\` and hands back a *fresh* iterator each time it is asked. An **iterator** has \`__next__\` (produce the next value or raise \`StopIteration\`) *and* \`__iter__\` returning \`self\`, so it can be fed to \`for\` directly. A list is iterable and is not an iterator; \`iter(a_list)\` is.

\`\`\`python
xs = [1, 2, 3]
it = iter(xs)
print(iter(it) is it)    # True  -- an iterator returns itself
print(iter(xs) is xs)    # False -- a list is not its own iterator
print(list(it), list(it))  # [1, 2, 3] []  -- an iterator is single-use
\`\`\`

That last line is the whole bug class: iterate an iterator twice and the second pass sees nothing, silently, with no error. Iterate an *iterable* twice and both passes are full, because each \`for\` calls \`__iter__\` again.

## Generator functions

Any \`def\` containing \`yield\` is a generator function. Calling it runs **no body code at all** — it builds and returns a generator object. The body advances only when something calls \`next()\` on it, runs to the next \`yield\`, and freezes there with its local variables and instruction pointer intact.

\`\`\`python
def gen():
    print("started")
    yield 1
    yield 2

g = gen()
print("created, nothing ran yet")   # prints first
print(next(g))                      # "started" then 1
\`\`\`

A generator is an iterator, so all of the single-use rules above apply. \`list(g)\` on an already-drained generator is \`[]\`, and \`sum(g)\` on it is \`0\` — a quietly wrong answer rather than an exception.

The fix when you need repeat passes is to make the *class* iterable and let \`__iter__\` be the generator, so each loop gets a new one:

\`\`\`python
class Countdown:
    def __init__(self, n):
        self.n = n
    def __iter__(self):          # a fresh generator per for-loop
        n = self.n
        while n > 0:
            yield n
            n -= 1

cd = Countdown(3)
print(list(cd), list(cd))    # [3, 2, 1] [3, 2, 1]
\`\`\`

## yield from

\`yield from sub\` delegates: every value \`sub\` produces is re-yielded, without a manual \`for x in sub: yield x\`. It is not only shorthand — it also forwards \`send()\` and \`throw()\` into the sub-generator, and the *return value* of the delegated generator becomes the value of the \`yield from\` expression. Flattening is the everyday use:

\`\`\`python
def flat(rows):
    for row in rows:
        yield from row

print(list(flat([[1, 2], [3]])))   # [1, 2, 3]
\`\`\`

## Laziness is the point

A list comprehension builds every element now; a generator expression builds a recipe and produces elements on demand. For a million squares, \`sys.getsizeof\` reports 8,448,728 bytes for the list object alone — before counting the million integers it points at — against 200 bytes for the generator, which never materialises a second element until you ask.

Laziness also lets you short-circuit. \`any(is_bad(line) for line in huge)\` stops reading at the first bad line; the list version reads all of them first. And an infinite source is only expressible lazily — \`itertools.count()\` in a comprehension would never return.

Costs, so you choose deliberately. A generator has no \`len()\`, no indexing, no slicing, and cannot be re-read. Pick a list when you need any of those, when the data is small, or when you are about to iterate it more than once. Pick a generator when the source is large, remote, infinite, or when you might stop early. Inside a single call, \`sum(x * x for x in data)\` needs no brackets at all — a sole generator argument does not require its own parentheses.

One more piece of syntax worth knowing: \`next(it, default)\` returns the default instead of raising \`StopIteration\` on an empty iterator, which turns "first match or nothing" into a one-liner.`,
      questions: [
        {
          prompt: 'Why does list(it) twice on it = iter([1, 2, 3]) return [1, 2, 3] and then []?',
          options: [
            'list() consumes and clears the underlying source list it wraps',
            'An iterator is single-use; its __iter__ returns self, already drained',
            'The second list() call sees a cached empty result from the first',
            'Reading an iterator twice raises StopIteration, caught as an empty list'
          ],
          correct: 1,
          explain: 'Iterators track one position and never rewind. A list is an iterable, so each new for loop gets a fresh iterator, but iter() output is already the iterator.'
        },
        {
          prompt: 'What happens the moment you call a generator function like g = gen()?',
          options: [
            'The whole body runs and every yielded value is buffered in the object',
            'The body runs up to and including the first yield statement',
            'Nothing is created until the first next() call constructs the object',
            'A generator object is returned and no line of the body has run'
          ],
          correct: 3,
          explain: 'Calling a generator function only constructs the generator. The body starts executing at the first next(), and freezes again at each yield.'
        },
        {
          prompt: 'What does yield from sub_gen give you that a for loop re-yielding does not?',
          options: [
            'It forwards send/throw and yields the sub-generator return value',
            'It runs the sub-generator eagerly so its values are ready in advance',
            'It flattens nested sequences to arbitrary depth automatically',
            'It converts the delegated generator into a reusable iterable object'
          ],
          correct: 0,
          explain: 'The delegation is two-way: send() and throw() reach the inner generator, and the value it returns becomes the result of the yield from expression.'
        },
        {
          prompt: 'You need to iterate a result twice and also take its length. Which is right?',
          options: [
            'A generator expression, calling list() on it before each pass',
            'A generator function, since len() is defined for generators',
            'A list comprehension, because generators lack len and are single-use',
            'Either one works, since generators cache what they produced on the first pass'
          ],
          correct: 2,
          explain: 'Generators have no __len__ and cannot be re-read after exhaustion. Two passes plus a length is exactly the case where materialising a list is correct.'
        }
      ]
    },
    {
      key: 'comprehensions-itertools',
      title: 'Comprehensions, itertools, functools',
      body: `# Comprehensions

One expression, one or more \`for\` clauses, optional \`if\` filters. The three container forms differ only in brackets, and the fourth shape — parentheses — is the lazy generator expression from the previous lesson.

\`\`\`python
words = ["a", "bb", "ccc"]
print([len(w) for w in words])         # [1, 2, 3]        list
print({w: len(w) for w in words})      # {'a': 1, ...}    dict
print({len(w) for w in words})         # {1, 2, 3}        set
print([c for w in words for c in w])   # nested: outer loop first
\`\`\`

The nested form reads in the same left-to-right order the equivalent nested \`for\` statements would: the leftmost clause is the outer loop. That is the only ordering rule, and it is the one people invert.

Comprehensions have their **own scope** in Python 3 — the loop variable does not leak into the enclosing function, which is why \`[x for x in range(3)]\` leaves any outer \`x\` untouched. The exception worth remembering: inside a class body a comprehension cannot see the class's other names (only its leftmost iterable is evaluated in the enclosing scope), so a comprehension referring to a sibling class attribute raises \`NameError\`.

The walrus operator \`:=\` earns its keep here, letting a filter and the produced value share one computation: \`[y for x in range(6) if (y := x * x) > 4]\` squares each number once, tests that square, and emits the same binding — giving \`[9, 16, 25]\`.

Know when to stop. A comprehension with three \`for\` clauses and two conditions is a loop wearing a costume — write the loop.

## itertools

\`chain(a, b)\` concatenates iterables lazily. \`islice(it, start, stop)\` slices something that has no \`[]\`. \`product(xs, repeat=2)\` is nested loops as a flat iterator. \`accumulate\` is a running fold, defaulting to addition:

\`\`\`python
from itertools import chain, islice, product, accumulate
import operator

print(list(islice(chain([1, 2], [3, 4, 5]), 1, 4)))   # [2, 3, 4]
print(list(product([0, 1], repeat=2)))                # [(0,0),(0,1),(1,0),(1,1)]
print(list(accumulate([1, 2, 3, 4])))                 # [1, 3, 6, 10]
print(list(accumulate([1, 2, 3, 4], operator.mul)))   # [1, 2, 6, 24]
\`\`\`

### The groupby trap

\`itertools.groupby\` does **not** group; it collapses *runs of adjacent* equal keys, like the Unix \`uniq\`. Unsorted input therefore yields the same key several times:

\`\`\`python
from itertools import groupby
from operator import itemgetter

rows = [("a", 1), ("b", 2), ("a", 3)]
key = itemgetter(0)
print([(k, [v for _, v in g]) for k, g in groupby(rows, key=key)])
# [('a', [1]), ('b', [2]), ('a', [3])]   -- three groups, 'a' twice

print([(k, [v for _, v in g]) for k, g in groupby(sorted(rows, key=key), key=key)])
# [('a', [1, 3]), ('b', [2])]            -- sort first, by the SAME key
\`\`\`

A second trap: each group is a lazy view over the shared source iterator, so it is invalidated as soon as you advance to the next group. \`list(groupby(data))\` gives you groups that are all empty. Consume each group inside the loop, or use \`collections.defaultdict(list)\` when you just want a real grouping and do not care about order.

## functools and operator

\`partial(fn, *args, **kw)\` pre-binds arguments and returns a callable — \`partial(int, base=2)("1011")\` is \`11\`. \`reduce(fn, iterable, initial)\` folds; reach for it only when no builtin (\`sum\`, \`max\`, \`any\`, \`math.prod\`) already says it.

\`@cache\` (3.9+) and \`@lru_cache(maxsize=N)\` memoise on the argument tuple. They turn exponential recursion linear:

\`\`\`python
from functools import cache

@cache
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(30))            # 832040, instantly
print(fib.cache_info())   # CacheInfo(hits=28, misses=31, ...)
\`\`\`

Three caveats: arguments must be hashable (no lists, no dicts), the cache is unbounded with \`@cache\` and never releases its keys — including \`self\` on a method, which leaks instances — and it is only valid for genuinely pure functions.

The \`operator\` module supplies the functions behind the syntax: \`itemgetter(0)\`, \`attrgetter("name")\`, \`operator.add\`. They exist so \`sorted(rows, key=itemgetter(1))\` beats a lambda in both speed and readability.`,
      questions: [
        {
          prompt: 'itertools.groupby over unsorted rows yields the key "a" twice. What went wrong?',
          options: [
            'The key function must return a string for grouping to work',
            'groupby needs a maxsize hint to allocate one bucket per key',
            'groupby only collapses adjacent equal keys, so input must be sorted',
            'The rows were tuples; groupby requires objects with attributes'
          ],
          correct: 2,
          explain: 'groupby behaves like Unix uniq, breaking a run whenever the key changes. Sort by the same key first, or use collections.defaultdict(list) to group properly.'
        },
        {
          prompt: 'What does list(accumulate([1, 2, 3, 4], operator.mul)) produce?',
          options: [
            '[1, 2, 6, 24]',
            '[24]',
            '[1, 3, 6, 10]',
            '[1, 2, 3, 4]'
          ],
          correct: 0,
          explain: 'accumulate emits every running result, not just the final one, applying the given binary function instead of the default addition.'
        },
        {
          prompt: 'Which use of @functools.cache is genuinely unsafe?',
          options: [
            'Memoising a recursive integer function called with the same values',
            'Decorating a pure function whose arguments are all strings',
            'Wrapping a function that returns a freshly built immutable tuple',
            'Decorating a method, since self is cached and instances never free'
          ],
          correct: 3,
          explain: 'The cache key includes self, so a strong reference keeps every instance alive for the process lifetime. Unbounded @cache on methods is a memory leak.'
        },
        {
          prompt: 'What does [y for x in range(6) if (y := x * x) > 4] evaluate to?',
          options: [
            '[0, 1, 4, 9, 16, 25]',
            '[9, 16, 25]',
            '[3, 4, 5]',
            'A SyntaxError: := is not allowed inside a comprehension'
          ],
          correct: 1,
          explain: 'The walrus assigns the square once, the filter tests it, and the same binding is what the comprehension emits. Only 9, 16 and 25 clear the > 4 test.'
        }
      ]
    },
    {
      key: 'decorators-closures',
      title: 'Closures and decorators',
      body: `# Closures

A nested function that refers to a name from its enclosing function keeps that name alive after the outer call returns. The captured variable lives in a **cell**, and — this is the part that surprises people — the closure captures the *variable*, not the value it held at definition time.

\`\`\`python
fs = [lambda: i for i in range(3)]
print([f() for f in fs])            # [2, 2, 2]  -- all share the final i

gs = [lambda i=i: i for i in range(3)]
print([g() for g in gs])            # [0, 1, 2]  -- default arg binds NOW
\`\`\`

That is **late binding**, and it bites in loops that build callbacks, event handlers or partially applied functions. The two cures are a default argument (evaluated at definition time, as above) or \`functools.partial(fn, i)\`.

To *rebind* a captured name, not just read it, you need \`nonlocal\`:

\`\`\`python
def counter():
    n = 0
    def inc():
        nonlocal n        # without this, n += 1 raises UnboundLocalError
        n += 1
        return n
    return inc

c = counter()
print(c(), c(), c())      # 1 2 3
\`\`\`

## A decorator is a function returning a function

\`@deco\` above \`def fn\` means exactly \`fn = deco(fn)\` — no more, no less. Everything else is consequence.

\`\`\`python
import functools

def log(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        print("calling", fn.__name__)
        return fn(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    "adds two numbers"
    return a + b

print(add.__name__, add.__doc__)   # add adds two numbers
\`\`\`

Drop the \`@functools.wraps(fn)\` line and \`add.__name__\` becomes \`"wrapper"\` and \`add.__doc__\` becomes \`None\`. That is not cosmetic: it breaks \`help()\`, tracebacks, \`inspect.signature\`, pickling by name, and any framework that dispatches on function names. \`wraps\` copies \`__name__\`, \`__doc__\`, \`__module__\`, \`__qualname__\` and \`__dict__\`, and sets \`__wrapped__\` so the original stays reachable as \`add.__wrapped__\`.

Use \`*args, **kwargs\` in the wrapper so the decorator stays signature-agnostic, and always \`return\` the inner call — a wrapper that forgets the \`return\` turns every decorated function into one returning \`None\`.

## Decorators that take arguments

\`@tag("api")\` is not a decorator; it is a *call* whose result is the decorator. So you need three levels: a factory taking the arguments, which returns the decorator taking the function, which returns the wrapper.

\`\`\`python
def tag(name):
    def deco(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            print("enter", name)
            result = fn(*args, **kwargs)
            print("exit", name)
            return result
        return wrapper
    return deco
\`\`\`

The usual bug is writing two levels and then wondering why \`@tag\` without parentheses "works" but passes the function in as \`name\`. If you need both forms, check whether the single argument is callable and branch.

## Stacking order

Decorators apply **bottom-up** — the one nearest the \`def\` wraps first — which means at call time the **topmost** wrapper runs first, since it is the outermost layer. Stack \`@tag("outer")\` above \`@tag("inner")\` on a \`go()\` whose body prints \`body\`, and calling it prints \`enter outer\`, \`enter inner\`, \`body\`, \`exit inner\`, \`exit outer\`.

Equivalently: \`go = tag("outer")(tag("inner")(go))\`. This is why \`@app.route(...)\` belongs above \`@login_required\` and not below — registration must see the fully wrapped function.

## Class-based and class decorators

Two different things sharing a name. A **class-based decorator** is a class implementing \`__call__\`, used when the wrapper needs real state (call counts, a cache you want to inspect). A **class decorator** decorates the class itself — \`@dataclass\` is the canonical example — receiving the class object and returning a class, usually the same one with methods attached. Both are still just "call this thing with the object below it and rebind the name".`,
      questions: [
        {
          prompt: 'Why does [f() for f in [lambda: i for i in range(3)]] give [2, 2, 2]?',
          options: [
            'Comprehension scope reuses one lambda object for every iteration',
            'range(3) is lazily evaluated, so all three lambdas share one call',
            'Python caches identical lambda bodies and returns the same function object',
            'The closures capture the variable i, read at call time, not its value'
          ],
          correct: 3,
          explain: 'Late binding means each lambda looks up i when invoked, after the loop finished. A default argument i=i captures the value at definition time instead.'
        },
        {
          prompt: 'What breaks when a decorator omits @functools.wraps?',
          options: [
            'The wrapped function silently returns None instead of its computed result',
            'Metadata like __name__, __doc__ and the signature come from the wrapper',
            'Keyword arguments can no longer be forwarded to the wrapped function',
            'Stacking two decorators applies them in the reverse order'
          ],
          correct: 1,
          explain: 'Without wraps the name, docstring and signature reported are the wrapper own, which breaks help(), tracebacks, inspect and name-based dispatch.'
        },
        {
          prompt: 'With @tag("outer") above @tag("inner"), which wrapper body runs first at call time?',
          options: [
            'The inner one, because decorators are applied bottom-up',
            'Neither: stacked decorators of the same factory collapse into one',
            'The outer one, because it is the outermost layer around the call',
            'Whichever was imported first in the defining module'
          ],
          correct: 2,
          explain: 'Application is bottom-up so inner wraps the function first, but that makes outer the outermost layer, so its code is entered first and exited last.'
        },
        {
          prompt: 'Why does a decorator taking arguments need three nested functions?',
          options: [
            '@tag("x") calls tag first, and its result must be the decorator',
            'The extra level is what enables *args forwarding to the function',
            'Two levels work; the third is only needed for methods on classes',
            'functools.wraps requires a factory around the wrapper it copies from'
          ],
          correct: 0,
          explain: 'The @ syntax applies whatever expression follows it. With arguments that expression is a call, so the call must return a decorator that returns the wrapper.'
        }
      ]
    },
    {
      key: 'context-managers',
      title: 'Context managers and cleanup',
      body: `# with is a protocol

\`with expr as name:\` does three things: evaluates \`expr\`, calls \`type(expr).__enter__()\` and binds its **return value** to \`name\`, and registers \`__exit__\` to run on every way out of the block — falling off the end, \`return\`, \`break\`, or an exception in flight.

Note that \`as name\` binds what \`__enter__\` returned, not the context manager. Most managers \`return self\`, which is why the distinction rarely shows — until you meet one that returns something else, like \`open()\` returning the file or a lock manager returning \`None\`.

\`\`\`python
class Guard:
    def __enter__(self):
        print("acquire")
        return "handle"
    def __exit__(self, exc_type, exc, tb):
        print("release")
        return False        # do not suppress

with Guard() as h:
    print("using", h)       # acquire / using handle / release
\`\`\`

## __exit__ decides whether the exception survives

\`__exit__\` receives \`(exc_type, exc, tb)\` — all three \`None\` on a clean exit. Its **return value is a suppression flag**: a truthy return swallows the exception and execution resumes after the \`with\` block; anything falsy (including the implicit \`None\` of a function with no \`return\`) lets it propagate.

\`\`\`python
class Swallow:
    def __enter__(self): return self
    def __exit__(self, exc_type, exc, tb):
        return exc_type is ValueError    # only ValueError is suppressed

with Swallow():
    raise ValueError("boom")
print("survived")                        # reached
\`\`\`

Accidentally returning a truthy value from \`__exit__\` — say ending it with \`return self.close()\` where \`close\` returns something — silently eats every exception raised in the block. That is one of the nastiest bugs to trace, because the code after the block runs with the work half-done.

## contextlib.contextmanager

For the common case, write a generator with exactly one \`yield\`. Everything before the \`yield\` is \`__enter__\`, the yielded value is what \`as\` binds, and everything after is \`__exit__\`.

\`\`\`python
from contextlib import contextmanager
import time

@contextmanager
def timed(label):
    start = time.perf_counter()
    try:
        yield label.upper()
    finally:
        print(label, "%.3fs" % (time.perf_counter() - start))
\`\`\`

The \`try/finally\` is **mandatory**, not style. If the block raises, the exception is thrown *into* the generator at the \`yield\`, and without \`finally\` the cleanup lines below are never reached. To suppress an exception in this form you catch it around the \`yield\` and simply do not re-raise — returning \`True\` means nothing here.

## suppress and ExitStack

\`contextlib.suppress(FileNotFoundError)\` is the readable spelling of \`try/except X: pass\`, and it is narrower than it looks: it only suppresses exceptions escaping the whole block, so it is right for one statement and wrong wrapped around ten.

\`ExitStack\` handles the case a \`with\` statement cannot — a *variable* number of managers, or ones you open conditionally. Each \`enter_context\` registers a cleanup, and they unwind in reverse order at the end, even if one of the entries raised half-way through.

\`\`\`python
from contextlib import ExitStack

with ExitStack() as stack:
    files = [stack.enter_context(open(p)) for p in paths]
    # every file closes here, in reverse order, exception or not
\`\`\`

\`stack.callback(fn, *args)\` registers a plain function instead of a manager, and \`stack.pop_all()\` transfers ownership out when everything succeeded — the idiom for "clean up only on failure".

## The finally-return trap

\`finally\` always runs, including on the way out of a \`return\`. If \`finally\` itself contains a \`return\`, it *overwrites* the value being returned and discards any exception in flight. A function whose \`try\` block runs \`return "try"\` and whose \`finally\` block runs \`return "finally"\` returns \`"finally"\` — the value from the \`try\` branch is computed, then thrown away. Never put \`return\`, \`break\` or \`continue\` in a \`finally\` block — it makes exceptions vanish with no trace at all. Cleanup only.`,
      questions: [
        {
          prompt: 'What does returning True from __exit__ mean?',
          options: [
            'The exception raised in the with block is suppressed',
            'The context manager may be entered again while still active',
            'The __enter__ return value is rebound after the block ends',
            'Cleanup succeeded, so Python skips the remaining __exit__ code'
          ],
          correct: 0,
          explain: 'The return value is purely a suppression flag. A truthy value swallows the in-flight exception and execution continues after the with block.'
        },
        {
          prompt: 'Why must a @contextmanager generator wrap its yield in try/finally?',
          options: [
            'contextlib validates the generator and rejects one without it',
            'Without it the yielded value is not bound by the as clause',
            'An exception in the block is thrown in at the yield, skipping cleanup',
            'Otherwise the generator would be re-entered on the second use'
          ],
          correct: 2,
          explain: 'The with block exception surfaces inside the generator at the yield point. Only finally guarantees the lines after it still run on that path.'
        },
        {
          prompt: 'What does this print? def f(): try: return "try" finally: return "finally"',
          options: [
            'try, because the return in try wins over the later one',
            'finally, because the finally return replaces the pending value',
            'Both values, returned as a tuple in source order',
            'A SyntaxError: return is not permitted inside finally'
          ],
          correct: 1,
          explain: 'finally runs on the way out of the return and its own return overrides the pending value. It also discards exceptions, which is why this is a trap.'
        },
        {
          prompt: 'When is contextlib.ExitStack the right tool?',
          options: [
            'When one manager must retry its __enter__ after a failure',
            'When the block should suppress exceptions of a known type',
            'When a manager needs to run its cleanup before the block ends',
            'When the number of managers is only known at runtime'
          ],
          correct: 3,
          explain: 'A with statement needs its managers written literally. ExitStack collects them dynamically and unwinds every registered cleanup in reverse order.'
        }
      ]
    },
    {
      key: 'dataclasses-typing',
      title: 'Dataclasses, NamedTuple, typing',
      body: `# Dataclasses

\`@dataclass\` is a class decorator that reads the class's annotated attributes and writes \`__init__\`, \`__repr__\` and \`__eq__\` for you. Annotations are what it looks at — an attribute without one is ignored entirely and stays a plain class variable.

\`\`\`python
from dataclasses import dataclass, field

@dataclass
class Track:
    title: str
    plays: int = 0
    tags: list[str] = field(default_factory=list)
\`\`\`

A mutable default is a hard **error**, not a warning: \`tags: list[str] = []\` raises \`ValueError: mutable default ... use default_factory\` at class-creation time. That is the language fixing its own worst wart (see the mutable-default-argument lesson) in the one place it could. \`field(default_factory=list)\` calls the factory per instance.

Useful flags:

- \`frozen=True\` makes assignment raise \`FrozenInstanceError\` and, combined with the default \`eq=True\`, generates \`__hash__\` — so frozen instances work as dict keys and set members. A non-frozen dataclass has \`__hash__ = None\`, exactly as any class defining \`__eq__\` would.
- \`order=True\` adds \`<\`, \`<=\`, \`>\`, \`>=\` comparing the fields as a tuple, in declaration order. Declare the fields in the order you want sorted.
- \`slots=True\` (3.10+) generates \`__slots__\`, which drops the per-instance \`__dict__\`: smaller and faster, but no ad-hoc attributes, and it works by returning a *new class*, which breaks anything holding the old one.
- \`kw_only=True\` (3.10+) forces keyword arguments, which also sidesteps the "field without a default cannot follow one with a default" ordering error.

\`dataclasses.replace(obj, plays=1)\` is the way to "modify" a frozen instance: it builds a new one. \`asdict()\` recurses into nested dataclasses; \`astuple()\` does the same to tuples.

## NamedTuple and TypedDict

\`NamedTuple\` gives an immutable, indexable, *tuple-compatible* record: \`p[0]\` and \`p.x\` both work, \`len(p)\` is the field count, and \`Pt(1, 0) == (1, 0)\` is \`True\` — that structural equality with plain tuples is the reason to pick it, and also the reason not to when you want a distinct type.

\`TypedDict\` annotates the *keys* of a dict. At runtime it is a plain \`dict\` — \`type(cfg)\` is \`dict\`, there is no validation and no instance check — the whole benefit lands in the type checker. Use it for JSON-shaped data you did not construct.

## Protocol: static duck typing

\`Protocol\` (3.8+) types a class by the methods it has, not by what it inherits. A class satisfies it structurally, with no import of the protocol at all — which is exactly how duck typing already worked, now visible to a checker.

\`\`\`python
from typing import Protocol

class Closeable(Protocol):
    def close(self) -> None: ...

def shut(x: Closeable) -> None:
    x.close()          # any object with a matching close() is accepted
\`\`\`

\`isinstance()\` against a Protocol raises \`TypeError\` unless you also decorate it \`@runtime_checkable\` — and even then only method *names* are checked, never signatures.

## typing essentials

Since 3.9 the builtin generics work directly: \`list[int]\`, \`dict[str, int]\`, \`tuple[int, ...]\` — the \`typing.List\` spellings are deprecated. Since 3.10, \`int | None\` replaces \`Optional[int]\` and \`int | str\` replaces \`Union[int, str]\`.

\`TypeVar\` links positions so a checker can carry a type through: \`def first(xs: list[T]) -> T\` says the result matches the element type. Python 3.12 adds the compact syntax \`def first[T](xs: list[T]) -> T:\` with no import. \`Self\` (3.11+) is the return annotation for methods returning \`self\`, and is correct under subclassing where naming the class is not.

Annotations are **not enforced at runtime** — passing a \`str\` to \`x: int\` is a silent no-op. They exist for \`mypy\` or \`pyright\`, run as a separate command in CI; \`mypy --strict\` is the setting that makes the effort pay off, and unannotated functions are skipped entirely without it.`,
      questions: [
        {
          prompt: 'Why does @dataclass reject tags: list[str] = [] outright?',
          options: [
            'Annotated attributes may only be given immutable literal defaults',
            'One list would be shared by every instance, so it demands default_factory',
            'The annotation list[str] is unsupported without importing List',
            'Dataclass fields with defaults must be declared keyword-only'
          ],
          correct: 1,
          explain: 'A class-level default is created once and shared, the classic mutable-default bug. default_factory calls list() per instance, so each gets its own.'
        },
        {
          prompt: 'Which flag combination makes a dataclass instance usable as a dict key?',
          options: [
            'frozen=True, which with eq=True generates a matching __hash__',
            'order=True, which adds the comparison methods a dict needs',
            'slots=True, since removing __dict__ makes the instance hashable',
            'None of the flags matter; dataclass instances hash by identity'
          ],
          correct: 0,
          explain: 'Generating __eq__ removes the inherited hash. Only frozen=True, guaranteeing the compared fields cannot change, lets the decorator add __hash__ back.'
        },
        {
          prompt: 'At runtime, what is a value annotated with a TypedDict class?',
          options: [
            'An instance of the TypedDict subclass with validated keys',
            'A frozen mapping that rejects keys outside the declared set',
            'An ordinary dict, unvalidated; the benefit is static only',
            'A namedtuple built from the declared keys in order'
          ],
          correct: 2,
          explain: 'TypedDict emits no runtime machinery, so type(cfg) is dict and a wrong key raises nothing. Only mypy or pyright sees the declared shape.'
        },
        {
          prompt: 'How does a class come to satisfy a typing.Protocol?',
          options: [
            'By inheriting from the protocol class explicitly',
            'By registering with the protocol via an abc call at import time',
            'By passing an isinstance check, which protocols support by default',
            'By having the required methods, with no inheritance at all'
          ],
          correct: 3,
          explain: 'Protocols are structural: a checker accepts any class with matching members. isinstance needs @runtime_checkable, and then compares names only.'
        }
      ]
    },
    {
      key: 'mutability-scope',
      title: 'Mutability, identity and scope',
      body: `# The mutable default argument

Default values are evaluated **once**, when the \`def\` statement executes, and stored on the function object. A mutable default is therefore shared by every call that does not override it:

\`\`\`python
def add(item, bucket=[]):          # WRONG: one list, built once, shared forever
    bucket.append(item)
    return bucket

print(add(1), add(2))       # [1, 2] [1, 2]  -- same list, twice
print(add.__defaults__)     # ([1, 2],)      -- it lives on the function object

def add(item, bucket=None):        # RIGHT: a fresh list per call
    bucket = [] if bucket is None else bucket
    bucket.append(item)
    return bucket
\`\`\`

The fix is always the same: default to \`None\` and build inside. The same evaluate-once rule bites with \`datetime.now()\` as a default (frozen at import) and is the reason \`@dataclass\` refuses mutable defaults outright.

## Aliasing

Assignment never copies. \`b = a\` binds a second name to the same object, so mutating through either name is visible through both. Multiplication of a list containing a list repeats the *reference*:

\`\`\`python
grid = [[0] * 2] * 3
grid[0][0] = 9
print(grid)     # [[9, 0], [9, 0], [9, 0]]  -- one inner list, three times

grid = [[0] * 2 for _ in range(3)]
grid[0][0] = 9
print(grid)     # [[9, 0], [0, 0], [0, 0]]  -- three separate lists
\`\`\`

\`copy.copy\` is **shallow**: a new outer container holding the same inner objects. \`copy.deepcopy\` recurses, handling cycles, and is slow enough that you should reach for it deliberately.

\`\`\`python
import copy
orig = {"a": [1, 2]}
shallow, deep = copy.copy(orig), copy.deepcopy(orig)
orig["a"].append(3)
print(shallow, deep)     # {'a': [1, 2, 3]} {'a': [1, 2]}
\`\`\`

## is versus ==

\`==\` asks "equal value" and calls \`__eq__\`. \`is\` asks "the same object in memory" and can never be overridden. Use \`is\` for \`None\`, \`True\`, \`False\` and sentinel objects; use \`==\` for everything else.

The confusion comes from optimisations that make \`is\` *accidentally* true. CPython caches small integers (-5 to 256) and interns identifier-like string literals, and the compiler folds constants within a single code block — so \`a = 257; b = 257\` on consecutive module lines compares \`is\` as \`True\`, while building the same value at runtime does not: with \`n = 257\` and \`m = int("2" + "57")\`, \`n == m\` is \`True\` and \`n is m\` is \`False\`.

None of this is a language guarantee, it varies by version and by how the value was produced, and code that depends on it is broken. Note also that \`x == None\` can be hijacked by a \`__eq__\` that returns true for anything; \`x is None\` cannot.

## LEGB

Name lookup goes **Local, Enclosing, Global, Builtins**, and the crucial part is that Python decides *at compile time* whether a name is local: any assignment to a name anywhere in a function body makes it local for the whole body, including the lines above the assignment.

\`\`\`python
def broken():
    print(y)      # UnboundLocalError: cannot access local variable 'y'
    y = 1         # this line is what makes y local
\`\`\`

The error says the name is local but not yet bound — it is not a "y is undefined" error, and reading it correctly points you at the assignment below.

\`global x\` makes assignments target the module namespace; \`nonlocal x\` targets the nearest enclosing *function* scope and fails at compile time if no such binding exists. Neither is needed to *read* a name or to *mutate* an object you can reach — \`config["k"] = v\` needs no declaration, because you are not rebinding \`config\`. Reach for \`global\` almost never; \`nonlocal\` is the honest tool for a closure that must accumulate.`,
      questions: [
        {
          prompt: 'Why does def add(x, bucket=[]) return a growing list across separate calls?',
          options: [
            'append mutates the argument in place instead of returning a copy',
            'Python caches return values for functions with default arguments',
            'The default is evaluated once at def time and stored on the function',
            'The list is a module-level global because it was written in a signature'
          ],
          correct: 2,
          explain: 'Defaults are computed when the def executes, not per call, and live in __defaults__. Default to None and build the list inside the body instead.'
        },
        {
          prompt: 'After grid = [[0] * 2] * 3 and grid[0][0] = 9, what is grid?',
          options: [
            '[[9, 0], [0, 0], [0, 0]]',
            '[[9, 0], [9, 0], [9, 0]]',
            '[[9, 9], [0, 0], [0, 0]]',
            'A TypeError, because a nested list cannot be multiplied'
          ],
          correct: 1,
          explain: 'The outer multiplication repeats the reference, not the list, so all three rows are one object. A comprehension per row creates independent lists.'
        },
        {
          prompt: 'A function prints y on its first line and assigns y = 1 on its second. What happens?',
          options: [
            'It prints the module-level y, then shadows it from the next line on',
            'It prints None, since y is declared but not yet bound to a value',
            'It raises a NameError naming y as an undefined global variable',
            'It raises UnboundLocalError: the later assignment made y local'
          ],
          correct: 3,
          explain: 'Python classifies a name as local at compile time if the body assigns it anywhere, so the read happens before that local is bound and fails.'
        },
        {
          prompt: 'Why is n is m False when n = 257 and m = int("2" + "57")?',
          options: [
            'is compares object identity, and only small ints are cached',
            'int() returns a distinct numeric subclass for parsed strings',
            'Integers above 255 are stored as arbitrary-precision objects and never compare',
            'is compares values but int() produces an unequal result here'
          ],
          correct: 0,
          explain: 'CPython caches -5 to 256 and folds literal constants in a code block, so identity for larger runtime values is arbitrary. Compare numbers with ==.'
        }
      ]
    },
    {
      key: 'concurrency-model',
      title: 'The concurrency model and the GIL',
      body: `# What the GIL actually is

CPython's **Global Interpreter Lock** is one mutex protecting the interpreter's internal state — most visibly the reference counts on every object. A thread must hold it to execute bytecode, and it is handed around: the running thread drops it every few milliseconds (see \`sys.setswitchinterval\`) and *always* drops it before a blocking call.

What that gives you, and what it does not:

- It does **not** make your code thread-safe. \`counter += 1\` is a load, an add and a store; a thread switch between them loses an update. Locks are still yours to place.
- It does **not** serialize I/O. A thread waiting on a socket, a disk read or a subprocess has released the GIL, so other threads run at full speed. Blocking I/O is exactly where threads win.
- It **does** serialize pure-Python bytecode. Two CPU-bound threads on eight cores use one core's worth of throughput plus contention overhead — measurably *slower* than doing the work sequentially.
- It is not serialized inside C extensions that release it. NumPy array operations, compression, hashing and much of the stdlib drop the GIL around their heavy loops, so threads do scale there.

Python 3.13 ships an experimental free-threaded build with the GIL removed, but 3.12 and the default 3.13 binary still have it. Write for the GIL.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import time

def cpu(n):
    return sum(i * i for i in range(n))

# on a 4-core box: threads ~3.4s, processes ~2.0s for the same 4 tasks
\`\`\`

## Three models, three jobs

**Threading** — preemptive, shared memory, one process. Right for blocking I/O against libraries that do not offer an async API, and for keeping something responsive while work happens. Costs: real locks, real race conditions, and no CPU parallelism for Python code.

**Multiprocessing** — separate interpreters, separate GILs, actual parallelism on multiple cores. Right for CPU-bound work: image processing, parsing, numeric loops. Costs: arguments and results are **pickled** across a pipe, so unpicklable objects (lambdas, open sockets, local classes) fail and large payloads may cost more to transfer than to recompute. Memory is not shared; changes to a global in a child are invisible to the parent. On Linux the default start method is \`fork\` in 3.12, while macOS and Windows use \`spawn\`, which re-imports your module in the child — the reason a \`multiprocessing\` script needs its entry point guarded by \`if __name__ == "__main__":\`.

**asyncio** — one thread, one loop, cooperative switching only at \`await\`. Right for thousands of concurrent network operations, where a thread each would drown in stack memory and context switches. Costs: it is a different ecosystem, one blocking call stalls everything, and it buys nothing for CPU-bound work.

The rule of thumb: **CPU-bound goes to processes, I/O-bound goes to threads or asyncio**, and asyncio wins over threads once the concurrency count gets large or the libraries are already async.

## concurrent.futures

One API over both pools, and the right default entry point. Swapping \`ThreadPoolExecutor\` for \`ProcessPoolExecutor\` is a one-word change:

\`\`\`python
with ThreadPoolExecutor(max_workers=8) as pool:
    for result in pool.map(fetch, urls):
        print(result)
\`\`\`

\`submit\` returns a \`Future\`; \`as_completed(futures)\` yields them in finishing order rather than submission order. An exception inside a worker is stored, not printed — it re-raises when you touch \`future.result()\`, so a \`submit\` whose result you never read swallows the error entirely. Leaving the \`with\` block waits for every pending task.

## Queues

\`queue.Queue\` is the thread-safe hand-off: internally locked, blocking on \`get()\` until an item arrives, so no polling and no shared-list races. The idiom is a bounded queue (back-pressure when producers outrun consumers) plus one sentinel value per worker to end the loop. For processes the equivalent is \`multiprocessing.Queue\`, which pickles what passes through it.`,
      questions: [
        {
          prompt: 'Which statement about the GIL is correct?',
          options: [
            'It makes shared-state mutation from threads atomic and safe',
            'It is released around blocking I/O, so threads still overlap waits',
            'It prevents more than one Python process from using a core at a time',
            'It serializes calls into C extensions such as NumPy as well'
          ],
          correct: 1,
          explain: 'A thread drops the GIL before it blocks, which is why threads help with I/O. It does not make += atomic, and many C extensions release it too.'
        },
        {
          prompt: 'Four CPU-bound pure-Python tasks on a 4-core machine. Which layout is fastest?',
          options: [
            'A ThreadPoolExecutor with four workers',
            'An asyncio TaskGroup with four coroutines',
            'A ProcessPoolExecutor with four workers',
            'One thread per task at a raised switch interval'
          ],
          correct: 2,
          explain: 'Only separate processes get separate GILs and real core parallelism. Threads and coroutines both leave the bytecode running one at a time.'
        },
        {
          prompt: 'What is the main cost of moving work from a thread pool to a process pool?',
          options: [
            'Arguments and results must pickle, and memory is no longer shared',
            'Process pools cannot report exceptions raised inside a worker',
            'The pool is limited to os.cpu_count() tasks for its whole lifetime',
            'Standard library modules must be imported again inside each call'
          ],
          correct: 0,
          explain: 'Everything crossing the process boundary is serialized, so lambdas and open handles fail and big payloads get expensive. Globals mutated in a child stay there.'
        },
        {
          prompt: 'You submit a task to an executor and never read its Future. What happens to an exception in it?',
          options: [
            'It propagates immediately in the submitting thread',
            'It is printed to stderr when the pool shuts down',
            'It cancels every other task queued in the same pool',
            'It is stored on the Future and never surfaces at all'
          ],
          correct: 3,
          explain: 'A Future holds the exception until result() or exception() is called. Unread futures therefore hide failures, which is why map or as_completed is safer.'
        }
      ]
    },
    {
      key: 'asyncio',
      title: 'asyncio: coroutines, tasks, cancellation',
      body: `# Coroutines do nothing on their own

\`async def\` defines a coroutine function. **Calling it runs no body code** — it returns a coroutine object, exactly as a generator function returns a generator. The body advances only when something awaits it or schedules it as a task.

\`\`\`python
async def work(name, delay):
    await asyncio.sleep(delay)
    return name

c = work("a", 1)     # nothing has run
print(type(c).__name__)   # coroutine
\`\`\`

Forget to await one and you get \`RuntimeWarning: coroutine 'work' was never awaited\` and silently missing work — the single most common asyncio bug.

\`await\` means "suspend me here, let the loop run something else, resume when this completes". You may only use it inside an \`async def\`. There is exactly one thread: between two \`await\` points your code is uninterrupted, which is why asyncio needs far fewer locks than threading.

## Concurrency needs gather or tasks

Sequential \`await\`s are sequential. Three 0.2 s sleeps awaited one after another take 0.6 s; the same three through \`gather\` take 0.2 s, because all three are in flight together.

\`\`\`python
import asyncio

async def main():
    results = await asyncio.gather(work("a", 0.2), work("b", 0.2), work("c", 0.2))
    print(results)      # ['a', 'b', 'c'] -- in ARGUMENT order, not finish order

asyncio.run(main())
\`\`\`

\`gather\` returns results positionally. By default the first exception propagates immediately while the other tasks keep running unattended; \`return_exceptions=True\` instead puts each exception into the result list in its slot.

\`asyncio.create_task(coro)\` schedules a coroutine to run in the background and hands back a \`Task\` you can await later or cancel. Keep a reference to it: the loop holds only a weak one, so a task nobody keeps can be garbage-collected mid-flight.

## TaskGroup (3.11+)

\`TaskGroup\` is the structured-concurrency replacement for \`gather\`, and the better default in 3.11 and later. The \`async with\` block does not exit until every task it spawned is done, and if one raises, the **siblings are cancelled** and the errors surface together as an \`ExceptionGroup\` caught with \`except*\`.

\`\`\`python
async with asyncio.TaskGroup() as tg:
    a = tg.create_task(work("x", 0.05))
    b = tg.create_task(work("y", 0.05))
print(a.result(), b.result())     # both finished before the block exited
\`\`\`

No task can outlive the block, which is exactly the leak \`gather\` allows.

## Cancellation and timeouts

Cancelling a task raises \`asyncio.CancelledError\` *inside* it at its current \`await\`. Since 3.8 that class inherits from \`BaseException\`, so a blanket \`except Exception\` does not swallow it — but a \`try/finally\` still runs, which is where cleanup belongs. If you do catch it to clean up, re-raise; refusing cancellation is how a shutdown hangs.

\`asyncio.timeout(seconds)\` (3.11+) is the modern form: an async context manager that cancels the block and raises \`TimeoutError\`.

\`\`\`python
try:
    async with asyncio.timeout(0.05):
        await asyncio.sleep(1)
except TimeoutError:
    print("timed out")
\`\`\`

\`asyncio.wait_for(coro, timeout)\` is the older per-awaitable equivalent and still fine.

## Never block the loop

One thread means one blocking call freezes *everything* — \`time.sleep\`, \`requests.get\`, a large \`json.loads\`, a synchronous DB driver. The symptom is every other coroutine stalling for exactly that duration.

Push the blocking work off the loop: \`await asyncio.to_thread(fn, *args)\` (3.9+) for I/O-bound calls, or \`loop.run_in_executor(pool, fn)\` with a \`ProcessPoolExecutor\` when the work is CPU-bound. Both return awaitables, so the loop keeps serving everything else meanwhile.

## asyncio.run mistakes

\`asyncio.run(main())\` creates a fresh event loop, runs one coroutine to completion and closes the loop. Call it **once**, at the top level. Calling it from inside a running loop raises \`RuntimeError: asyncio.run() cannot be called from a running event loop\`, and calling it repeatedly discards loop-bound state — connection pools and clients created under one loop are invalid under the next, the usual cause of "attached to a different loop" errors. Inside async code you already have a loop: use \`await\`, \`create_task\`, or \`asyncio.get_running_loop()\`.`,
      questions: [
        {
          prompt: 'What does calling an async def function without awaiting it do?',
          options: [
            'Returns a coroutine object and runs nothing from the body',
            'Schedules the coroutine on the running loop as a background task',
            'Runs the body up to its first await, then suspends the coroutine',
            'Raises RuntimeError unless an event loop is currently running'
          ],
          correct: 0,
          explain: 'A coroutine object is inert until awaited or wrapped in a task. Dropping it produces only a RuntimeWarning, so the work silently never happens.'
        },
        {
          prompt: 'Three coroutines each awaiting a 0.2 s sleep, awaited one after another. How long?',
          options: [
            'About 0.2 s: awaits inside one coroutine overlap automatically',
            'About 0.6 s, since each await completes before the next one starts',
            'About 0.2 s only if the loop was created by asyncio.run',
            'Unbounded: sequential awaits deadlock without a TaskGroup'
          ],
          correct: 1,
          explain: 'await suspends until that one operation finishes, so sequential awaits are sequential. Overlap requires gather, create_task or a TaskGroup.'
        },
        {
          prompt: 'One task inside an asyncio.TaskGroup raises. What happens to its siblings? (3.11+)',
          options: [
            'They keep running, and the block returns once the last one finishes',
            'They are left unawaited and garbage-collected without cleanup',
            'They are cancelled, and errors surface as an ExceptionGroup',
            'They are retried once each before the group re-raises the error'
          ],
          correct: 2,
          explain: 'TaskGroup enforces structured concurrency: no task outlives the block, a failure cancels the rest, and except* unpacks the resulting group.'
        },
        {
          prompt: 'A coroutine calls a synchronous library that blocks for two seconds. What is the effect?',
          options: [
            'Only that coroutine waits; the loop schedules the others meanwhile',
            'The loop moves the blocking call onto a worker thread by itself',
            'The loop raises a BlockingIOError to protect the other tasks',
            'Every coroutine on that loop stalls for the full two seconds'
          ],
          correct: 3,
          explain: 'The loop runs in one thread and regains control only at an await. Offload with asyncio.to_thread or run_in_executor so the loop keeps serving.'
        }
      ]
    },
    {
      key: 'packaging-tooling',
      title: 'Packaging, imports and tooling',
      body: `# Environments

A virtual environment is a directory holding its own \`site-packages\` and a \`python\` symlink. \`python -m venv .venv\` creates one; activating it just puts its \`bin\` directory first on \`PATH\`. One per project, never installed into globally.

\`\`\`bash
python -m venv .venv
source .venv/bin/activate        # .venv\\Scripts\\activate on Windows
python -m pip install -e ".[dev]"
\`\`\`

Prefer \`python -m pip\` over bare \`pip\`: it installs into *the interpreter you just named*, which removes the entire class of "installed it but the import fails" confusion. \`uv\` is the modern drop-in — \`uv venv\`, \`uv pip install\`, \`uv run\` — an order of magnitude faster and with a real resolver plus a lockfile, but the underlying model is unchanged.

## pyproject.toml

One declarative file replaces \`setup.py\`, \`setup.cfg\` and \`requirements.txt\`, and it is where linters and type checkers keep their settings too.

\`\`\`toml
[project]
name = "navitools"
version = "0.1.0"
requires-python = ">=3.12"
dependencies = ["httpx>=0.27"]

[project.optional-dependencies]
dev = ["pytest", "ruff", "mypy"]

[project.scripts]
navitools = "navitools.cli:main"

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
\`\`\`

\`[project.scripts]\` generates console entry points on install. An **editable install** (\`pip install -e .\`) points the environment at your source tree, so edits take effect without reinstalling — the correct way to make your own package importable, rather than pushing directories onto \`sys.path\`.

## Imports and packages

A package is a directory Python can import. \`__init__.py\` marks a **regular package**; it runs on first import of anything inside, so keep it small — re-exporting the public names is fine, heavy work at import time is not. Since 3.3 a directory *without* \`__init__.py\` still imports as a **namespace package**, which is why a missing file often seems harmless until two directories on the path merge unexpectedly.

Imports resolve against \`sys.path\`, which starts with the directory of the script you ran — *not* your current directory. That single fact explains the most common beginner error: running \`python pkg/cli.py\` dies with \`ImportError: attempted relative import with no known parent package\`, while \`python -m pkg.cli\` on the very same file works.

\`python -m\` imports the package properly, so relative imports (\`from .helper import VALUE\`) resolve. It also runs \`pkg/__init__.py\` first, and \`python -m pkg\` runs \`pkg/__main__.py\`. Use absolute imports in application code and keep relative ones inside a package for its own siblings.

## if __name__ == "__main__"

\`__name__\` is \`"__main__"\` in the module that was executed and the dotted module name everywhere else. The guard is what keeps a file importable *and* runnable: without it, importing the module runs its script body, and under multiprocessing's \`spawn\` start method the child re-imports it and forks endlessly.

\`\`\`python
def main() -> int:
    ...
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
\`\`\`

## pytest

Test files are \`test_*.py\`, functions \`test_*\`, assertions are plain \`assert\` — pytest rewrites them to report both sides on failure.

A **fixture** is a function decorated \`@pytest.fixture\` and requested *by parameter name*. Anything after its \`yield\` is teardown, and \`scope="session"\` builds it once for the whole run instead of per test. Fixtures in \`conftest.py\` are visible to every test in that directory and below, with no import.

\`\`\`python
import pytest

@pytest.fixture
def db(tmp_path):
    conn = connect(tmp_path / "t.db")
    yield conn
    conn.close()

@pytest.mark.parametrize("value,expected", [(1, 2), (2, 4), (3, 6)])
def test_double(value, expected):
    assert double(value) == expected
\`\`\`

\`parametrize\` generates one **independent test case** per tuple, each reported separately — a loop with three asserts stops at the first failure and hides the rest. Built-in fixtures worth knowing: \`tmp_path\`, \`monkeypatch\`, \`capsys\`, \`caplog\`.

## ruff and mypy

\`ruff check\` (lint, replacing flake8 and dozens of plugins) and \`ruff format\` (a black-compatible formatter) are one fast Rust binary configured from \`pyproject.toml\`. \`mypy\` or \`pyright\` is the separate type-checking pass — remember that annotations do nothing at runtime, so an unrun checker buys you exactly nothing. Wire all three into CI, and add \`--strict\` once the codebase can carry it.`,
      questions: [
        {
          prompt: 'python pkg/cli.py fails on a relative import but python -m pkg.cli works. Why?',
          options: [
            'The -m form adds the current directory to sys.path first',
            'Running a file directly gives it no package context to resolve against',
            'Relative imports are only permitted in files named __main__.py',
            'The direct form skips __init__.py, which defines the relative names'
          ],
          correct: 1,
          explain: 'A script executed by path becomes a top-level module with no parent package, so leading-dot imports have nothing to resolve. -m imports it as pkg.cli.'
        },
        {
          prompt: 'Why guard a script body with if __name__ == "__main__":?',
          options: [
            'It is required before a module may define a function called main',
            'It makes the interpreter compile the module ahead of any import',
            'So importing the module does not execute the script body',
            'It stops pytest from collecting the file as a test module'
          ],
          correct: 2,
          explain: '__name__ is "__main__" only in the file you ran. The guard keeps a module importable and runnable, and is required under multiprocessing spawn.'
        },
        {
          prompt: 'What does @pytest.mark.parametrize with three tuples produce?',
          options: [
            'Three independent test cases, each reported and failing separately',
            'One test that loops the tuples and stops at the first failure',
            'Three fixtures injected by name into the decorated function',
            'One test repeated until all three tuples pass at least once'
          ],
          correct: 0,
          explain: 'Each tuple becomes its own collected case with its own id, so one failure does not hide the others the way a loop of asserts would.'
        },
        {
          prompt: 'What does pip install -e . change compared with pip install .?',
          options: [
            'It installs into the user site directory rather than the venv',
            'It resolves dependencies from pyproject.toml instead of a lockfile',
            'It skips the build backend and copies the source tree verbatim',
            'The environment points at your source, so edits apply immediately'
          ],
          correct: 3,
          explain: 'An editable install links to the working tree, so code changes need no reinstall. It is the supported alternative to appending to sys.path.'
        }
      ]
    }
  ]
}
