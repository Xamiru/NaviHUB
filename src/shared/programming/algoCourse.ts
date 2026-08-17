import type { ProgCourseDef } from './types'

// Algorithms and data structures — the language-agnostic half of the
// Programming section. Written for someone who already ships code in Go, TS
// and Python: every idea is grounded in a runnable snippet and in what the
// standard libraries actually give you, not in pseudocode.

export const ALGO_COURSE: ProgCourseDef = {
  key: 'algorithms',
  title: 'Algorithms and data structures',
  description: 'Complexity, the core structures, sorting and searching, recursion and DP, trees, graphs, greedy and backtracking — with code you can run.',
  lessons: [
    {
      key: 'complexity',
      title: 'Complexity that survives contact with a profiler',
      body: `# What Big-O actually measures

Big-O is not a stopwatch. It describes how the work GROWS as the input grows, with constant factors and lower-order terms discarded. \`3n + 200\` and \`n\` are both O(n). Throwing the constant away is what makes the notation portable across machines and languages — and it is also the trap, because the constant is what you actually wait for.

Two more conventions worth stating out loud. We quote the *tightest* bound we know, so calling a linear scan "O(n^2)" is technically true and useless. And we say which case we mean when they differ: quicksort is O(n log n) on average and O(n^2) in the worst case; a hash lookup is O(1) on average and O(n) if every key lands in one bucket.

## The classes you meet in real code

- O(1) — a dict lookup, an array index, pushing onto a stack
- O(log n) — binary search, a heap push, a balanced-tree lookup
- O(n) — one honest pass over the data
- O(n log n) — every comparison sort, and every "sort, then sweep" algorithm
- O(n^2) — nested loops over the same collection; the one you write by accident
- O(2^n) and O(n!) — subsets and permutations; fine at n = 20, hopeless at n = 40

Calibrate with one number. A core does on the order of 10^7 to 10^8 simple operations per second in Python, 10^9 in Go. At n = 1,000,000 an O(n log n) pass is about 2×10^7 operations, which is instant; O(n^2) is 10^12, which is hours. The distance between "ships" and "hangs" is usually a single nested loop.

## Amortized cost: why append is O(1)

A Python list is a dynamic array — a block of memory plus a length. When it fills, the interpreter allocates a bigger block and copies everything across. That copy is O(n), so how can \`append\` be O(1)?

\`\`\`python
import sys

lst = []
prev = sys.getsizeof(lst)
for i in range(80):
    lst.append(i)
    cur = sys.getsizeof(lst)
    if cur != prev:
        print(len(lst), cur)   # a resize just happened
        prev = cur
\`\`\`

On CPython 3.12 the resizes land at lengths 1, 5, 9, 17, 25, 33, 41, 53, 65 and 77, and the capacities behind them are 4, 8, 16, 24, 32, 40, 52, 64, 76, 92 slots. The growth is *proportional to the current size* (CPython over-allocates by about one eighth; Go's \`append\` doubles up to 256 elements and then grows by roughly a quarter). Because the extra capacity is a fraction of the size, the copies across n appends form a geometric series bounded by a constant times n. Divide by n and each append costs O(1) **amortized**.

Amortized means "averaged over the sequence", not "usually". One particular append really does copy a million elements. If you need a hard per-operation bound — an audio callback, a game frame — amortized O(1) is not good enough, and you pre-size the buffer instead.

## Constants and hidden costs

Two O(n) algorithms can differ by 50× and Big-O will not tell you. Worse, the interesting bugs come from an operation you assumed was O(1) and is not.

\`\`\`python
import time

n = 100_000
xs = list(range(n))
s = set(xs)
probes = [n - 1] * 2000

t = time.perf_counter()
for p in probes:
    p in xs          # O(n) — a linear scan, every time
print(f"list {time.perf_counter() - t:.3f}s")

t = time.perf_counter()
for p in probes:
    p in s           # O(1) average — one hash, one bucket
print(f"set  {time.perf_counter() - t:.5f}s")
\`\`\`

Measured here: 2.426 s against 0.00021 s — about 11,000× apart, from changing one character in the setup line. \`x in list\` and \`x in set\` read identically and are not the same algorithm.

The other classic is building a string by repeated concatenation:

\`\`\`python
def build(n, keep_ref):
    acc = ""
    for _ in range(n):
        if keep_ref:
            other = acc      # a second reference to the same string
        acc += "abcdefgh"
    return acc
\`\`\`

With \`keep_ref\` on, this took 0.76 s at n = 20,000, 4.25 s at 40,000 and 57 s at 80,000 — quadratic and then some, because every \`+=\` allocates a new string and copies the old one. With \`keep_ref\` off it took 0.002 s, 0.003 s and 0.007 s: CPython special-cases \`s += t\` when the string has exactly one reference and resizes it in place. That optimisation is real, undocumented as a guarantee, and one stray alias away from disappearing. Collect into a list and \`"".join(parts)\` instead — O(n) unconditionally. Go has \`strings.Builder\` for the same reason; JS has \`parts.join('')\`.

## Space is a budget too

Every speedup above buys time with memory. Memoisation stores one entry per distinct call. A prefix-sum array spends O(n) memory to answer range queries in O(1). A hash set spends a couple of machine words per element to turn O(n) membership into O(1). Recursion spends O(depth) of *stack*, which is a much smaller budget than the heap — CPython's default limit is 1000 frames.

So quote both: "O(n log n) time, O(n) space" is a complete answer, "O(n log n)" is half of one. And when the two conflict, measure. Big-O tells you which curve you are on; a profiler tells you where you are sitting on it.`,
      questions: [
        {
          prompt: 'A duplicate check loops `for i, w in enumerate(words)` and tests `if w in words[i + 1:]`. What does it cost?',
          options: [
            'O(n) time, because the loop body runs exactly once per word',
            'O(n^2) time, and each slice copies, so O(n) extra space',
            'O(n log n) time, since `in` binary-searches the sorted slice',
            'O(1) amortized, because a membership test hashes the word'
          ],
          correct: 1,
          explain:
            'The outer loop is O(n) and the inner `in` scans a slice linearly, so time is quadratic. words[i+1:] also COPIES the tail, so each iteration allocates O(n) — a hidden cost the O(n^2) alone does not show.'
        },
        {
          prompt: 'A Python list grows by allocating a larger block and copying every element across. Why is `append` still described as O(1)?',
          options: [
            'Because the copy runs on a background thread while append returns',
            'Because CPython pre-allocates a fixed buffer of 1024 slots when the list is created',
            'Because capacity grows in proportion to size, so n appends copy O(n) in total',
            'Because Big-O ignores memory traffic and counts only the loop iterations'
          ],
          correct: 2,
          explain:
            'Geometric growth makes the resize copies a convergent series: the total work over n appends is linear, so the average per append is constant. That is what "amortized" means — one individual append can still cost O(n).'
        },
        {
          prompt: 'You build a 500,000-character string with `acc += chunk` in a loop, and another local variable also references `acc`. What is the cost?',
          options: [
            'O(n): CPython grows the existing string buffer in place, so nothing is copied',
            'Roughly O(n^2): each += allocates a new string and copies the old one',
            'A TypeError on the second iteration, because Python strings are immutable',
            'O(n log n), the cost of the rope data structure CPython uses for text'
          ],
          correct: 1,
          explain:
            'The in-place resize only applies when the string has exactly one reference. The alias defeats it, so every += copies the whole accumulated string — measured at 0.76 s / 4.25 s / 57 s for 20k / 40k / 80k iterations.'
        },
        {
          prompt: 'You must answer 10^6 queries of the form "sum of a[i:j]" over a fixed array of 10^5 numbers. Which trade-off is right?',
          options: [
            'Sum the slice per query: O(1) extra memory, and up to 10^11 additions overall',
            'Precompute a prefix-sum array: O(n) extra memory, then O(1) per query',
            'Sort the array once, then binary-search each range bound in O(log n)',
            'Cache every answer in a dict keyed by (i, j), which needs O(n^2) entries'
          ],
          correct: 1,
          explain:
            'One O(n) precomputation turns every later query into a single subtraction. Sorting destroys the positions the query refers to, and the cache needs 5 billion entries before it helps.'
        }
      ]
    },
    {
      key: 'arrays-strings',
      title: 'Arrays and strings: two pointers, windows, prefix sums',
      body: `# The array is the default, and that is correct

Contiguous memory, O(1) indexing, and a prefetcher that loves you. A large share of "we need a clever data structure" problems are really an array plus two integers. This lesson is the four patterns that come up again and again: two pointers, sliding windows, prefix sums, and building strings without quadratic surprise.

## Two pointers

One index walks forward, another walks backward or trails behind, and the pair meets in the middle. Reversal in place is the smallest example — O(n) time, O(1) space, no second array:

\`\`\`python
def rev(a, i, j):
    while i < j:
        a[i], a[j] = a[j], a[i]
        i += 1
        j -= 1

def rotate_left(a, k):
    n = len(a)
    k %= n
    rev(a, 0, k - 1)      # reverse the part that moves to the back
    rev(a, k, n - 1)      # reverse the part that moves to the front
    rev(a, 0, n - 1)      # reverse the whole thing

xs = [1, 2, 3, 4, 5, 6, 7]
rotate_left(xs, 3)
print(xs)                 # [4, 5, 6, 7, 1, 2, 3]
\`\`\`

The triple reversal rotates in O(n) time and O(1) space, which is the whole trick — the obvious \`a[k:] + a[:k]\` allocates a second array. Note \`k %= n\` first: a rotation by 10 on a 7-element array is a rotation by 3, and without the modulo the slices go out of range.

The other classic two-pointer shape needs the input SORTED. Because the array is ordered, the sum of the outer pair tells you which end to move:

\`\`\`python
def two_sum_sorted(a, target):
    i, j = 0, len(a) - 1
    while i < j:
        s = a[i] + a[j]
        if s == target:
            return (i, j)
        i += (s < target)     # too small: raise the low end
        j -= (s > target)     # too big: lower the high end
    return None

print(two_sum_sorted([1, 3, 4, 6, 8, 11], 14))   # (1, 5)
\`\`\`

O(n) time and O(1) space, against O(n) time and O(n) space for the hash-set version. On UNSORTED input the hash set wins, because sorting first costs O(n log n).

## Sliding windows

A window is two pointers moving the same way. \`right\` extends it, \`left\` shrinks it, and the invariant lives in between. The trap is thinking the inner \`while\` makes it quadratic — it does not, because \`left\` only ever moves forward, so across the whole run both pointers take at most n steps each. That is the amortised argument from lesson one, applied to indices.

\`\`\`python
def min_window(nums, target):
    left = total = 0
    best = len(nums) + 1
    for right, v in enumerate(nums):
        total += v
        while total >= target:            # shrink while still valid
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best > len(nums) else best

print(min_window([2, 3, 1, 2, 4, 3], 7))   # 2  -> the subarray [4, 3]
print(min_window([1, 1, 1], 7))            # 0  -> impossible
\`\`\`

The variable-size window with a *character* invariant is the same skeleton with a dict instead of a running total:

\`\`\`python
def longest_unique(s):
    seen = {}                 # char -> last index it appeared at
    best = start = 0
    for i, ch in enumerate(s):
        if ch in seen and seen[ch] >= start:
            start = seen[ch] + 1
        seen[ch] = i
        best = max(best, i - start + 1)
    return best

for w in ("abcabcbb", "bbbbb", "pwwkew", "tmmzuxt"):
    print(w, longest_unique(w))    # 3, 1, 3, 5
\`\`\`

The \`seen[ch] >= start\` guard is the part people drop: a stale index from BEFORE the window must not drag \`start\` backwards. Without it \`"tmmzuxt"\` answers 3 instead of 5.

## Prefix sums

Spend O(n) once, answer any range-sum query in O(1) forever.

\`\`\`python
def prefix(a):
    out = [0] * (len(a) + 1)          # out[0] = 0 makes the arithmetic clean
    for i, v in enumerate(a):
        out[i + 1] = out[i] + v
    return out

p = prefix([3, 1, 4, 1, 5, 9, 2, 6])
print(p)                    # [0, 3, 4, 8, 9, 14, 23, 25, 31]
print(p[6] - p[2])          # 19  -> sum of a[2:6]
\`\`\`

The extra leading zero is why the range \`a[i:j]\` is exactly \`p[j] - p[i]\` with no special case at the start. The same idea extends to a 2D image (a summed-area table), to XOR instead of addition, and — running the difference the other way — to applying many range updates in O(1) each.

## Building strings

A string is an immutable array in Python, Go and JS alike, so every "append" makes a new one. Collect the pieces and join once:

\`\`\`python
parts = []
for row in rows:
    parts.append(f"{row.id}: {row.title}")
text = "\\n".join(parts)
\`\`\`

Go's equivalent is \`strings.Builder\` with \`b.WriteString(...)\` then \`b.String()\`; TypeScript's is \`parts.join('\\n')\`. And the encodings differ in a way that bites index arithmetic: for \`"naïve"\`, Python's \`len\` is 5 (code points), Go's \`len\` is 6 (BYTES — use \`for i, r := range s\` for runes), and JS's \`.length\` is 5 UTF-16 code units, which becomes 2 for a single emoji. Two-pointer code over user text should walk the language's character unit, not the byte.`,
      questions: [
        {
          prompt: 'After `rev(a, 0, k - 1)`, `rev(a, k, n - 1)` and `rev(a, 0, n - 1)` on `a = [1, 2, 3, 4, 5, 6, 7]` with `k = 3`, what is `a`?',
          options: [
            '[3, 2, 1, 7, 6, 5, 4]',
            '[5, 6, 7, 1, 2, 3, 4]',
            '[4, 5, 6, 7, 1, 2, 3]',
            '[7, 6, 5, 4, 3, 2, 1]'
          ],
          correct: 2,
          explain:
            'The first two calls reverse each part in place, and the final full reversal un-reverses both while swapping their order — a left rotation by k. The first three elements end up at the back.'
        },
        {
          prompt: 'The `min_window` sliding window has a `while` loop inside a `for` loop. What is its worst-case time?',
          options: [
            'O(n^2), since the inner loop can scan the whole array each time',
            'O(n), because `left` only ever moves forward across the whole run',
            'O(n log n), because the window bounds halve on each shrink step',
            'O(n * target), one iteration per unit of the running total'
          ],
          correct: 1,
          explain:
            'Nesting is not multiplication when the inner index never resets. `right` advances n times and `left` advances at most n times in total, so the pointers do at most 2n moves however the whiles interleave.'
        },
        {
          prompt: 'Why does `longest_unique` need the `seen[ch] >= start` guard rather than just `if ch in seen`?',
          options: [
            'It stops `start` jumping backwards to a repeat that fell out of the window',
            'It avoids a KeyError when the character has not been recorded in the dict yet',
            'It keeps the dict bounded, since old entries are removed by the check',
            'It makes the scan stable when several characters share the same index'
          ],
          correct: 0,
          explain:
            'A character can appear before the current window began. Without the guard, `start = seen[ch] + 1` moves the left edge back and the count grows — "tmmzuxt" answers 3 instead of the correct 5.'
        },
        {
          prompt: 'Given `p = prefix([3, 1, 4, 1, 5, 9, 2, 6])`, which expression is the sum of `a[2:6]`?',
          options: ['p[6] - p[1]', 'p[5] - p[2]', 'p[6] - p[2]', 'p[2] + p[6]'],
          correct: 2,
          explain:
            'With the leading zero, p[i] is the sum of the first i elements, so a[i:j] is exactly p[j] - p[i]. Here that is 23 - 4 = 19.'
        },
        {
          prompt: 'For the string "naïve", what do `len` in Python, `len` in Go and `.length` in JS report?',
          options: [
            '5, 6 and 5 — code points, bytes, and UTF-16 code units respectively',
            '5, 5 and 5, because all three count user-visible characters',
            '6, 6 and 6, because all three store text as UTF-8 byte arrays',
            '5, 6 and 6, because JS strings are byte arrays like Go strings'
          ],
          correct: 0,
          explain:
            'Go strings are byte slices, so len counts UTF-8 bytes and the two-byte ï adds one. Python counts code points; JS counts UTF-16 units, which matches here but not for emoji.'
        }
      ]
    },
    {
      key: 'hashing',
      title: 'Hash tables: keys, collisions, and the counting patterns',
      body: `# The structure you reach for first

A hash table turns a key into an array index by hashing it, then stores the entry at that slot. Lookup, insert and delete are O(1) *on average*, and that average is what makes half the algorithms in this course fast: almost every "did I already see this?" question is a hash set, and almost every "how many of each?" question is a hash map.

Python's \`dict\` and \`set\`, Go's \`map\`, and TypeScript's \`Map\` and \`Set\` are all hash tables. JavaScript's plain object is one too, with the extra rule that every key is coerced to a string — \`obj[1]\` and \`obj["1"]\` are the same entry, which is exactly why \`Map\` exists.

## What makes a good key

A key must be hashable, and hashable means two things: it can produce a stable hash, and equal keys must hash equally. Python enforces this by refusing mutable containers:

\`\`\`python
d = {}
d[[1, 2]] = "x"        # TypeError: unhashable type: 'list'
d[(1, 2)] = "x"        # fine — tuples are immutable
\`\`\`

The reason is not aesthetic. A key's hash decides which bucket holds it; mutate the key after insertion and the entry is filed under a hash that no longer matches, so you can never find it again. Making a tuple key from a list takes a SNAPSHOT — later mutation of the list leaves the dict entry untouched, which is what you want.

The second half of the contract bites more often:

\`\`\`python
print(hash(1), hash(1.0), hash(True))     # 1 1 1
print({1: "a", 1.0: "b", True: "c"})      # {1: 'c'}
\`\`\`

\`1 == 1.0 == True\` in Python, so all three are the SAME key: three writes to one entry, and the first key inserted is the one kept. In Go the compiler saves you — a \`map[int]string\` will not take a \`bool\` — while in JS \`new Map()\` keys by SameValueZero, so \`1\` and \`"1"\` stay distinct but two structurally identical objects do not collapse into one key:

\`\`\`typescript
const m = new Map<object, string>()
const k1 = { id: 1 }, k2 = { id: 1 }
m.set(k1, 'first')
console.log(m.get(k2), m.get(k1))   // undefined  first
\`\`\`

Object keys in JS and Go structs-as-keys behave oppositely here: JS Maps compare object keys by reference, Go compares comparable struct keys by VALUE. If you want value semantics in JS, build a string key yourself.

## Collisions and load factor

Two distinct keys can hash to the same slot. Implementations resolve that either by chaining (a list per bucket) or by probing (walk to the next free slot), and both degrade as the table fills. The *load factor* — entries divided by slots — is the dial: CPython grows a dict once it is about two thirds full, Go grows a map at an average of 6.5 entries per 8-slot bucket. Growth means rehashing everything into a bigger table, which is O(n) and amortised away exactly like a list resize.

This is why hash lookup is O(1) *average* and O(n) *worst case*. The worst case needs every key in one bucket, which an adversary can arrange if they know your hash function — the reason Python randomises string hashing per process:

\`\`\`bash
$ python3 -c "print(hash('navihub'))"     # -6949744890842659938
$ python3 -c "print(hash('navihub'))"     # -2290015324096899764
\`\`\`

Never persist a Python \`hash()\` value to disk, and never assume set iteration order is stable across runs. Go goes further and deliberately randomises map iteration order so nobody can depend on it; Python dicts and JS Maps, by contrast, DO guarantee insertion order.

## The three patterns

Counting, deduplicating and grouping cover most real uses:

\`\`\`python
from collections import Counter, defaultdict

c = Counter("mississippi")
print(c.most_common(3))     # [('i', 4), ('s', 4), ('p', 2)]
print(c["z"])               # 0 — a missing key counts as zero, no KeyError

seen = set()
out = [x for x in [3, 1, 3, 9, 1, 4] if not (x in seen or seen.add(x))]
print(out)                  # [3, 1, 9, 4] — dedup, order preserved

words = ["listen", "silent", "enlist", "google", "gooegl", "banana"]
groups = defaultdict(list)
for w in words:
    groups[tuple(sorted(w))].append(w)      # canonical key = sorted letters
print(list(groups.values()))
# [['listen', 'silent', 'enlist'], ['google', 'gooegl'], ['banana']]
\`\`\`

The grouping trick generalises: find a *canonical form* that is equal exactly when two items belong together, and use it as the key. Anagrams sort their letters; case-insensitive names lowercase; near-duplicate files hash their contents.

Note the tie in \`most_common\`: \`i\` and \`s\` both appear four times, and \`Counter\` breaks the tie by first encounter. Ties in a "top k" are almost always where the flaky test lives.

## When a sorted array beats a hash

A hash table destroys order, and that costs you four things: range queries (\`all keys between 100 and 200\`), nearest-neighbour lookups, ordered iteration, and predictable memory. A sorted array plus \`bisect\` answers all of those in O(log n), stores the keys packed with no bucket overhead, and stays cache-friendly.

So: hash for point lookups on a mutating collection; sorted array for a mostly-static collection you query by range; a balanced tree (Go's \`container/list\` is not one — reach for a third-party B-tree, or keep a sorted slice) when you need both order and frequent inserts. And for a handful of items, a plain linear scan over a slice beats every one of them — hashing a key is not free, and n = 8 never justifies a map.`,
      questions: [
        {
          prompt: 'What does `print({1: "a", 1.0: "b", True: "c"})` output in Python?',
          options: [
            "{1: 'a', 1.0: 'b', True: 'c'}",
            "{1: 'a'}",
            "{1: 'c', True: 'c'}",
            "{1: 'c'}"
          ],
          correct: 3,
          explain:
            'hash(1) == hash(1.0) == hash(True) and all three compare equal, so they are one key. Each literal overwrites the value while the FIRST key object inserted is the one displayed.'
        },
        {
          prompt: 'Why does Python refuse to use a list as a dict key?',
          options: [
            'Mutating it would change its hash, filing the entry where no lookup can find it',
            'Lists have no __eq__ method, so equal keys could not be compared at all',
            'A list can hold unhashable elements, and hashing one would recurse into each of them',
            'Lists are variable length, and a dict bucket has a fixed slot width'
          ],
          correct: 0,
          explain:
            'The hash decides the bucket at insert time. If the key can change afterwards, the stored hash stops matching the recomputed one and the entry becomes unreachable. Tuples are allowed because they cannot change.'
        },
        {
          prompt: 'A read-heavy service keeps 200k sorted numeric ids and mostly asks "which ids fall between x and y?". Which structure fits?',
          options: [
            'A hash set, since membership is the fastest operation available',
            'A hash map from id to row, iterated and filtered on each query',
            'A linked list in sorted order, walked from the head to find x',
            'A sorted array with binary search for both ends of the range'
          ],
          correct: 3,
          explain:
            'Hashing destroys order, so a range query degrades to a full scan. Binary search finds each bound in O(log n) and the answer is the contiguous slice between them.'
        },
        {
          prompt: 'What does `Counter("mississippi").most_common(3)` return?',
          options: [
            "[('s', 4), ('i', 4), ('p', 2)]",
            "[('i', 4), ('s', 4), ('p', 2)]",
            "[('i', 4), ('s', 4), ('m', 1)]",
            "[('m', 1), ('i', 4), ('s', 4)]"
          ],
          correct: 1,
          explain:
            'Counts are i=4, s=4, p=2, m=1, sorted descending by count. The i/s tie is broken by first encounter, and i appears at index 1 while s appears at index 2.'
        }
      ]
    },
    {
      key: 'lists-stacks-queues',
      title: 'Linked lists, stacks, queues and deques',
      body: `# Three access disciplines

A stack, a queue and a deque are not really data structures — they are *policies* about which end you are allowed to touch. Pick the policy that matches the problem and the implementation almost writes itself.

## Linked lists, and when they actually win

A linked list is nodes holding a value and a pointer to the next node. Compared with an array it loses on everything you measure casually: no O(1) indexing, a pointer of overhead per element, and pointer chasing that defeats the cache. Interview folklore says "O(1) insertion in the middle", but that is only true when you ALREADY hold the node — finding it is O(n), which is the expensive half.

They win in three real situations: when you are splicing nodes you already have handles to (an LRU's recency list, an intrusive kernel list), when you must never invalidate other references on insert, and when a resize pause is unacceptable and you cannot pre-size. Otherwise use a slice, a \`list\` or an array.

Two techniques carry all of the list code you will write. First, reversal by three-way pointer rotation:

\`\`\`python
class Node:
    def __init__(self, v, nxt=None):
        self.v, self.next = v, nxt

def reverse(head):
    prev = None
    while head:
        head.next, prev, head = prev, head, head.next
    return prev
\`\`\`

That one line is doing: remember the next node, point the current node backwards, advance both cursors. Python's simultaneous assignment evaluates the whole right-hand side first, which is why it fits on a line; in Go or TS you need an explicit \`nxt := head.next\` temporary.

Second, the DUMMY HEAD — a throwaway node in front of the real one, so that deleting the first element needs no special case:

\`\`\`python
def drop_evens(head):
    dummy = Node(None, head)
    cur = dummy
    while cur.next:
        if cur.next.v % 2 == 0:
            cur.next = cur.next.next     # unlink, do not advance
        else:
            cur = cur.next
    return dummy.next                    # never "head" — it may be gone

print(to_list(drop_evens(build([2, 1, 4, 6, 3, 8]))))    # [1, 3]
\`\`\`

Returning \`dummy.next\` rather than \`head\` is the point: the original head may have been deleted, and a dozen off-by-one list bugs are exactly this.

## Stacks

Last in, first out. In Python a plain list IS a stack — \`append\` and \`pop\` are both amortised O(1) at the end. Bracket matching is the canonical use:

\`\`\`python
def balanced(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
    return not stack        # anything left open is unbalanced

print(balanced("([]{})"), balanced("(]"), balanced("(("))   # True False False
\`\`\`

Both failure modes matter: a closer with the wrong opener on top, and an opener never closed. Forget the final \`not stack\` and \`"(("\` passes.

The MONOTONIC STACK is the version worth memorising. You keep the stack sorted by construction, popping everything that the new element invalidates, and each element is pushed and popped at most once — so the whole thing is O(n) despite the nested loop:

\`\`\`python
def next_greater(a):
    out = [-1] * len(a)
    stack = []                       # indices whose answer is still unknown
    for i, v in enumerate(a):
        while stack and a[stack[-1]] < v:
            out[stack.pop()] = v     # v is the first bigger value to the right
        stack.append(i)
    return out

print(next_greater([2, 1, 2, 4, 3]))    # [4, 2, 4, -1, -1]
\`\`\`

Anything phrased as "the next / previous larger or smaller element" — stock spans, daily temperatures, the largest rectangle in a histogram — is this loop with the comparison flipped.

## Queues and deques

First in, first out. The one thing you must not do in Python is use a list:

\`\`\`python
q = []
q.pop(0)          # O(n) — every remaining element shifts down one slot
\`\`\`

\`collections.deque\` is a doubly linked list of fixed-size blocks: \`append\`, \`appendleft\`, \`pop\` and \`popleft\` are all O(1), and \`deque(maxlen=k)\` gives you a ring buffer for free. It is what a BFS frontier should be — with a list the traversal silently becomes O(V^2).

Go has no deque in the standard library; the idiom is a slice with a head index (\`q = q[1:]\` reslices without copying, and the backing array is reclaimed when the whole slice is dropped). TypeScript's \`Array.prototype.shift\` is O(n) in the general case, so a large BFS wants an index cursor rather than \`shift()\`.

The deque's showpiece is the sliding-window maximum in O(n) — a monotonic stack that can also evict from the front:

\`\`\`python
from collections import deque

def window_max(a, k):
    dq = deque()                     # indices, values decreasing
    out = []
    for i, v in enumerate(a):
        while dq and a[dq[-1]] <= v:
            dq.pop()                 # v beats them and outlives them
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()             # the front fell out of the window
        if i >= k - 1:
            out.append(a[dq[0]])
    return out

print(window_max([1, 3, -1, -3, 5, 3, 6, 7], 3))   # [3, 3, 5, 5, 6, 7]
\`\`\`

A heap would also work and costs O(n log k). The deque costs O(n) because the two invariants — decreasing values, indices inside the window — mean the front is always the answer and every index enters and leaves once.`,
      questions: [
        {
          prompt: 'What does `next_greater([2, 1, 2, 4, 3])` return, where each position gets the first strictly larger value to its right, or -1?',
          options: ['[4, 2, 3, -1, -1]', '[4, 4, 4, -1, -1]', '[-1, 2, 4, -1, 3]', '[4, 2, 4, -1, -1]'],
          correct: 3,
          explain:
            'For 2 and the second 2 the first larger value to the right is 4; for 1 it is the following 2; 4 and 3 have nothing larger after them, so both are -1.'
        },
        {
          prompt: 'A BFS uses a Python list as its frontier and calls `q.pop(0)`. What does that do to the traversal?',
          options: [
            'Each dequeue shifts every remaining element, so BFS degrades toward O(V^2)',
            'Nothing measurable — CPython keeps a head offset so pop(0) is constant time',
            'It reverses the visit order, turning the breadth-first walk into a DFS',
            'It raises IndexError once the frontier empties mid-traversal'
          ],
          correct: 0,
          explain:
            'A list is a dynamic array: removing the front moves every other element down one slot, an O(n) memmove per dequeue. collections.deque makes popleft O(1) and keeps BFS at O(V + E).'
        },
        {
          prompt: 'Why does a linked-list deletion helper return `dummy.next` instead of the original `head`?',
          options: [
            'To hand the caller a fresh node and avoid aliasing the original list',
            'Because the dummy node keeps the list length correct after deletions',
            'Because head itself may have been deleted, so it is no longer the first node',
            'To let the garbage collector reclaim the nodes that were unlinked'
          ],
          correct: 2,
          explain:
            'The dummy exists precisely so deleting the first element needs no special case. Once that can happen, the old head variable may point at an unlinked node, while dummy.next always names the current front.'
        },
        {
          prompt: 'The `window_max` deque has a `while` inside its loop. What is its total time for n elements and window k?',
          options: [
            'O(n * k), one comparison per element per window position',
            'O(n log k), the cost of maintaining an ordered structure of size k',
            'O(k^2) per window, amortised down by the maxlen ring buffer',
            'O(n), because every index is appended once and removed once'
          ],
          correct: 3,
          explain:
            'The inner while pops indices that can never be the answer again, so across the whole run there are at most n pops against n appends. That amortised argument is what beats the O(n log k) heap version.'
        }
      ]
    },
    {
      key: 'sorting-searching',
      title: 'Sorting guarantees and the binary-search family',
      body: `# You will not write a sort. You will choose one.

Implementing quicksort is a teaching exercise; picking the right library sort and knowing what it promises is the job. Three properties decide it: **stability** (do equal elements keep their original relative order?), **in-place** (does it need O(n) scratch memory?), and the **worst case** (is O(n log n) guaranteed or only typical?).

## What the standard libraries actually run

- **Python** — \`sorted\` and \`list.sort\` are Timsort: stable, O(n log n) worst case, O(n) extra memory, and O(n) on data that is already sorted or nearly so
- **JavaScript / TypeScript** — \`Array.prototype.sort\` has been required to be stable since ES2019; V8 implements it with TimSort
- **Go** — \`slices.Sort\` and \`sort.Slice\` are pdqsort since Go 1.19: NOT stable, in-place, O(n log n) worst case because it detects bad patterns and falls back to heapsort. \`slices.SortStable\` and \`sort.SliceStable\` are the stable pair, and they cost more
- **C++** — \`std::sort\` is introsort (quicksort, switching to heapsort at depth and insertion sort for short runs): not stable, in-place, O(n log n) worst case. \`std::stable_sort\` is the other one
- **Java** — \`Arrays.sort\` on primitives is dual-pivot quicksort (not stable); on objects it is Timsort (stable)
- **Rust** — \`sort\` is stable and allocates; \`sort_unstable\` is pdqsort and does not

Notice the pattern: the *stable* sorts buy their guarantee with memory, and the *in-place* ones give up stability. A library that offers only one is telling you which trade it made for you.

Stability is not decoration — it is what makes multi-key sorting composable:

\`\`\`python
rows = [("b", 2), ("a", 1), ("c", 2), ("d", 1)]
by_name = sorted(rows)                          # a, b, c, d
final = sorted(by_name, key=lambda r: r[1])     # then by the number
print(final)     # [('a', 1), ('d', 1), ('b', 2), ('c', 2)]
\`\`\`

Sort by the secondary key first, then by the primary: a stable sort preserves the earlier ordering inside each group. Port that idiom to Go with \`slices.Sort\` and the tie order is arbitrary — you must either use \`SortStable\` or write one comparator that handles both keys.

## The lower bound, and how to duck it

Any sort that only ever COMPARES elements needs Omega(n log n) comparisons in the worst case; there are n! possible orders and each comparison yields one bit. You escape it by not comparing. Counting sort tallies occurrences of each value and rebuilds the array in O(n + k) for values in a range of size k; radix sort applies that digit by digit for O(d * (n + k)). For ten million 32-bit integers a radix sort genuinely beats \`sorted\` — and for ten million arbitrary strings it does not, because k explodes.

## Binary search, written correctly once

The loop everyone half-remembers has three variants and one portability trap:

\`\`\`python
from bisect import bisect_left, bisect_right

a = [1, 3, 3, 3, 7, 9]
print(bisect_left(a, 3))       # 1  — first index with a[i] >= 3
print(bisect_right(a, 3))      # 4  — first index with a[i] >  3
print(bisect_left(a, 4))       # 4  — where 4 would be inserted
print(bisect_right(a, 7) - 1)  # 4  — last index with a[i] <= 7
print(bisect_right(a, 3) - bisect_left(a, 3))   # 3 — how many 3s
\`\`\`

Learn these as *predicates on a boundary*, not as "find x". \`bisect_left\` is the first position where "value >= x" becomes true; every other variant is that boundary shifted by one. Written by hand it is:

\`\`\`python
def lower_bound(a, x):
    lo, hi = 0, len(a)          # hi is EXCLUSIVE, and len(a) is a valid answer
    while lo < hi:
        mid = lo + (hi - lo) // 2
        if a[mid] < x:
            lo = mid + 1        # mid is ruled out
        else:
            hi = mid            # mid may still be the answer
    return lo
\`\`\`

Two rules keep it terminating: the interval must shrink on every branch (\`mid + 1\`, never \`mid\`, on the side that excludes it), and \`hi\` starts past the end so "not found, insert at the end" is representable. Write \`mid = lo + (hi - lo) // 2\` even in Python, out of habit: in Go, Java or C, \`(lo + hi) / 2\` overflows on large slices, a bug that sat in the JDK for nine years. Go's own \`sort.Search\` gives you the boundary directly — it returns the smallest index where your predicate becomes true.

## Binary search on the answer

The most useful variant does not search an array at all. If a question has a *monotone* yes/no predicate — false, false, false, true, true — you can binary-search the answer space:

\`\`\`python
def days_needed(weights, cap):
    d, cur = 1, 0
    for w in weights:
        if cur + w > cap:
            d, cur = d + 1, 0
        cur += w
    return d

def least_capacity(weights, days):
    lo, hi = max(weights), sum(weights)       # must fit the heaviest item
    while lo < hi:
        mid = (lo + hi) // 2
        if days_needed(weights, mid) <= days:
            hi = mid
        else:
            lo = mid + 1
    return lo

w = list(range(1, 11))
print(least_capacity(w, 5))     # 15
print(days_needed(w, 15), days_needed(w, 14))    # 5 6
\`\`\`

The check is O(n) and it runs O(log(sum)) times, so the whole search is O(n log(sum)) — for a question with no obvious closed form. The precondition is the only thing to verify: bigger capacity must never need MORE days. Whenever you can write a cheap "is X good enough?" test that is monotone in X, this pattern applies.`,
      questions: [
        {
          prompt: 'For `a = [1, 3, 3, 3, 7, 9]`, what do `bisect_left(a, 3)` and `bisect_right(a, 3)` return?',
          options: ['0 and 3', '1 and 4', '1 and 3', '2 and 4'],
          correct: 1,
          explain:
            'bisect_left gives the first index whose value is >= 3, which is 1; bisect_right gives the first index whose value is > 3, which is 4. Their difference, 3, is the number of 3s.'
        },
        {
          prompt: 'You sort rows by name, then sort the result by a numeric field to get "by number, ties by name". Which standard-library sort would NOT give that?',
          options: [
            "Python's sorted, which is Timsort and preserves the earlier order",
            "JavaScript's Array.prototype.sort, stable by specification since ES2019",
            "Java's Arrays.sort applied to an array of objects rather than primitives",
            "Go's slices.Sort, which is pdqsort and makes no promise about ties"
          ],
          correct: 3,
          explain:
            'The two-pass idiom depends on stability. The Go default sort is an unstable in-place pdqsort, so equal keys may be reordered; slices.SortStable, or a single comparator covering both keys, is the fix.'
        },
        {
          prompt: 'Why is `mid = lo + (hi - lo) // 2` preferred over `mid = (lo + hi) // 2`?',
          options: [
            'It rounds toward lo, which is what a half-open interval requires',
            'In fixed-width integer languages, lo + hi can overflow and go negative',
            'It saves an addition, which matters inside a hot search loop',
            'It keeps mid inside the array even when hi is exclusive'
          ],
          correct: 1,
          explain:
            'Both forms compute the same value mathematically. With 32-bit ints, lo + hi can exceed the maximum and wrap negative on a large array — the JDK binarySearch bug. Python has big ints, but the habit ports.'
        },
        {
          prompt: 'What must be true before you can binary-search the answer of "smallest capacity that ships everything in 5 days"?',
          options: [
            'The predicate must be monotone: once a capacity suffices, every larger one does',
            'The weights must be sorted, so the packing pass can stop early',
            'The feasibility check must itself run in O(log n) so that the total search stays logarithmic',
            'Every candidate capacity must be reachable as a sum of some weights'
          ],
          correct: 0,
          explain:
            'Binary search needs a false-then-true boundary in the answer space. The O(n) check is fine; what would break the search is a capacity that works while a larger one does not.'
        },
        {
          prompt: 'Sorting ten million 32-bit integers, which claim about radix sort is right?',
          options: [
            'It cannot beat O(n log n) — that bound applies to every sorting algorithm',
            'It is O(n log n) too, but with a smaller constant on integer keys',
            'It runs in O(d * (n + k)) because it never compares two elements',
            'It only helps when the array is already nearly sorted, like Timsort'
          ],
          correct: 2,
          explain:
            'The n log n lower bound is specific to comparison sorts. Radix sort buckets by digit instead, so it escapes the bound — at the cost of extra memory and a key type with bounded digits.'
        }
      ]
    },
    {
      key: 'recursion-dp',
      title: 'Recursion, memoisation and dynamic programming',
      body: `# Recursion is a call stack you did not have to write

Every recursive call pushes a frame holding parameters, locals and a return address. That frame is the state you would otherwise keep in an explicit stack — recursion is not magic, it is a stack with syntax support. It has a hard budget: CPython defaults to 1000 frames (\`sys.getrecursionlimit()\`), so recursion depth proportional to n is unusable past a few hundred thousand elements. Go grows goroutine stacks dynamically and tolerates far deeper recursion; JS engines do not, and a deep recursion there is a RangeError.

So: recurse when the depth is logarithmic (a balanced tree, a divide-and-conquer split) or bounded by the shape of the data. Convert to an explicit stack or a loop when the depth tracks the input size — a linked list of a million nodes, a path graph, a run of a million characters.

## From exponential to linear in one decorator

The recursion everyone writes first is also the warning:

\`\`\`python
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)
\`\`\`

That is O(1.618^n) calls, because \`fib(30)\` is recomputed from scratch in both branches. The subproblems OVERLAP — and "overlapping subproblems plus an optimal substructure" is the entire definition of a dynamic-programming problem. Cache the results and the same code becomes linear:

\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(60))     # 1548008755920, instantly
\`\`\`

That is MEMOISATION: top-down, lazy, and it only computes the states you actually reach. TABULATION is the same recurrence bottom-up, as a loop over an array, and it usually wins on constant factors and never risks the stack limit:

\`\`\`python
def stairs(n):                  # ways to climb n steps taking 1 or 2 at a time
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

print([stairs(i) for i in range(1, 9)])    # [1, 2, 3, 5, 8, 13, 21, 34]
\`\`\`

Note the space: the recurrence looks back only one and two steps, so two variables replace the whole array. Rolling the table down to the last few rows is the standard second optimisation after the recurrence works.

## Writing a DP: state, transition, base, order

Say it in four lines before you write code.

- **State** — what does \`dp[i]\` MEAN? "The fewest coins that make exactly i." Vague state is where broken DPs come from
- **Transition** — how does a state follow from smaller ones? \`dp[a] = 1 + min(dp[a - c] for each coin c)\`
- **Base** — \`dp[0] = 0\`, and unreachable states get an impossible sentinel
- **Order** — iterate so that every state a transition reads is already final

\`\`\`python
def coin_change(coins, amount):
    INF = amount + 1                       # sentinel: cheaper than any real answer
    dp = [0] + [INF] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return -1 if dp[amount] == INF else dp[amount]

print(coin_change([1, 5, 6, 9], 11))    # 2  -> 5 + 6, not the greedy 9 + 1 + 1
print(coin_change([2], 3))              # -1 -> genuinely impossible
\`\`\`

O(amount * len(coins)) time and O(amount) space. Note that greedy gets 11 wrong; lesson nine covers why.

## Two-dimensional tables

When the state needs two indices, the table becomes a grid. The longest common subsequence compares prefixes of both strings:

\`\`\`python
def lcs(a, b):
    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]
    for i in range(1, len(a) + 1):
        for j in range(1, len(b) + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1       # extend the match
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])   # drop one character
    return dp[-1][-1]

print(lcs("AGGTAB", "GXTXAYB"), lcs("abcde", "ace"))    # 4 3
\`\`\`

O(n * m) time and space — the row-by-row structure means only two rows are ever live, so O(min(n, m)) space if you roll it. This same table, with different weights, is edit distance and \`diff\`.

The 0/1 knapsack is the other one to know by heart, and its one-dimensional form hides a trap:

\`\`\`python
def knapsack(items, cap):                  # items are (weight, value) pairs
    dp = [0] * (cap + 1)
    for w, v in items:
        for c in range(cap, w - 1, -1):    # DESCENDING — this is the whole trick
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]

print(knapsack([(1, 1), (3, 4), (4, 5), (5, 7)], 7))    # 9
\`\`\`

Walking capacities downward means \`dp[c - w]\` still holds the value from BEFORE this item was considered, so each item is used at most once. Run the inner loop ascending and \`dp[c - w]\` may already include the item — which is the unbounded-knapsack recurrence, correct for a different problem and wrong for this one.

## When the obvious DP is too slow

The longest increasing subsequence has a clean O(n^2) DP: \`dp[i]\` is the best subsequence ending at i, scanning all earlier j. The O(n log n) version replaces that scan with a binary search over an auxiliary array:

\`\`\`python
from bisect import bisect_left

def lis(a):
    tails = []                  # tails[k] = smallest possible tail of a length-(k+1) run
    for x in a:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)     # x extends the longest run so far
        else:
            tails[i] = x        # x is a better (smaller) tail for that length
    return len(tails)

print(lis([10, 9, 2, 5, 3, 7, 101, 18]))    # 4
print(lis([7, 7, 7]))                       # 1
\`\`\`

\`tails\` is sorted by construction, which is what licences the binary search, and its LENGTH is the answer — the array itself is usually not a valid subsequence of the input. Swap \`bisect_left\` for \`bisect_right\` and you get the longest NON-decreasing run instead, which is the whole difference between "strictly increasing" and "increasing" in the problem statement.`,
      questions: [
        {
          prompt: 'In the one-dimensional 0/1 knapsack, what breaks if the inner capacity loop runs ascending instead of descending?',
          options: [
            'The table is read before it is written, so dp[cap] stays at its initial zero',
            'Nothing changes; the loop order only affects cache locality on large tables',
            'dp[c - w] may already include the current item, so items get taken repeatedly',
            'It reads past the end of dp, raising an IndexError on the first item'
          ],
          correct: 2,
          explain:
            'Descending order guarantees dp[c - w] is still the previous item-round value, enforcing "use each item at most once". Ascending turns the recurrence into unbounded knapsack, where an item may be reused.'
        },
        {
          prompt: 'What is the difference between memoisation and tabulation for the same recurrence?',
          options: [
            'Memoisation is always faster, since it skips unreachable states entirely',
            'Tabulation supports two-dimensional states, memoisation only one-dimensional',
            'They are the same technique; the words are used interchangeably',
            'Memoisation is top-down and lazy; tabulation is bottom-up and iterative'
          ],
          correct: 3,
          explain:
            'Same recurrence, opposite direction. Memoisation recurses and caches, so it only computes reachable states but pays call overhead and risks the stack limit; tabulation fills an array in dependency order.'
        },
        {
          prompt: 'In the O(n log n) LIS, what does `tails[k]` hold after processing some prefix of the input?',
          options: [
            'The k-th element of one longest increasing subsequence found so far',
            'The smallest value that can end an increasing subsequence of length k + 1',
            'The number of increasing subsequences of length k + 1 seen so far',
            'The index in the input where the current best run of length k begins'
          ],
          correct: 1,
          explain:
            'Keeping the smallest possible tail for each length is what leaves the most room to extend later. The array stays sorted, which is what makes the binary search valid; only its length is the answer.'
        },
        {
          prompt: 'What does `coin_change([1, 5, 6, 9], 11)` return, counting the fewest coins that total exactly 11?',
          options: ['2', '3', '4', '-1'],
          correct: 0,
          explain:
            'The DP finds 5 + 6 = 11 with two coins. Taking the largest coin first gives 9 + 1 + 1, which is three — the reason this coin system defeats the greedy strategy.'
        }
      ]
    },
    {
      key: 'trees-heaps',
      title: 'Binary trees, BSTs, heaps and tries',
      body: `# Trees are recursion made into data

A binary tree node holds a value and two child pointers. Almost every tree algorithm is three lines of recursion, and the interesting part is which order you visit in.

\`\`\`python
class N:
    def __init__(self, v, l=None, r=None):
        self.v, self.left, self.right = v, l, r

#        5
#      3    8
#     2 4  7 9
root = N(5, N(3, N(2), N(4)), N(8, N(7), N(9)))

def inorder(n, out):
    if n:
        inorder(n.left, out)
        out.append(n.v)          # PRE-order puts this line first,
        inorder(n.right, out)    # POST-order puts it last
    return out

print(inorder(root, []))     # [2, 3, 4, 5, 7, 8, 9]
\`\`\`

Move the \`append\` and you get the other two orders, each with a job: pre-order serialises a tree (parents before children, so a reader can rebuild it), in-order visits a BST in sorted order, and post-order handles children before the parent — freeing, sizing, evaluating an expression tree. There is also level-order, which is not recursive at all: it is a BFS with a queue, and it is what "print the tree by depth" means.

The iterative in-order is worth reading once, because it makes the hidden stack explicit:

\`\`\`python
def inorder_iter(n):
    out, stack = [], []
    while n or stack:
        while n:
            stack.append(n)      # dive left, remembering the way back
            n = n.left
        n = stack.pop()
        out.append(n.v)
        n = n.right              # then do the same for the right subtree
    return out
\`\`\`

Same output, O(h) memory in an explicit stack instead of O(h) call frames — which matters when h can be n, because a tree built from sorted inserts is a linked list wearing a hat.

## BST invariants, and the validation bug everybody writes

A binary search tree keeps every value in a node's LEFT subtree below it, and every value in its RIGHT subtree above it. Lookup, insert and delete are O(h) — O(log n) if balanced, O(n) if degenerate, which is why real libraries use a self-balancing variant (red-black, AVL, or a B-tree on disk).

The invariant is about whole subtrees, not about immediate children, and checking only the children is the classic wrong answer:

\`\`\`python
def valid_bst(n, lo=float("-inf"), hi=float("inf")):
    if not n:
        return True
    if not (lo < n.v < hi):
        return False
    return valid_bst(n.left, lo, n.v) and valid_bst(n.right, n.v, hi)

bad = N(5, N(3, N(2), N(6)), N(8))
print(valid_bst(bad))          # False
print(inorder(bad, []))        # [2, 3, 6, 5, 8]
\`\`\`

In \`bad\`, the node 6 is the right child of 3, so a parent-versus-child check passes — but 6 sits in the LEFT subtree of 5 and must be under 5. Passing a shrinking (lo, hi) window down the recursion is the fix. The other correct approach falls straight out of the traversal: an in-order walk of a valid BST is strictly increasing, and \`[2, 3, 6, 5, 8]\` is not.

## Heaps

A binary heap is a complete tree stored in a flat array — children of index i live at 2i+1 and 2i+2 — that maintains only ONE rule: every parent is smaller than its children. That is much weaker than a BST, which is exactly why it is cheap: \`heappush\` and \`heappop\` are O(log n), reading the minimum is O(1), and there is no pointer overhead at all. What you give up is search: finding an arbitrary value in a heap is O(n).

Python's \`heapq\` operates on a plain list, and it is a MIN-heap. For a max-heap, push negated values, or push tuples \`(-priority, item)\`.

\`\`\`python
import heapq

xs = [7, 2, 9, 4, 1, 8, 3]

h = []
for x in xs:
    heapq.heappush(h, x)     # n pushes: O(n log n)
print(h)                     # [1, 2, 3, 7, 4, 9, 8]

ys = xs[:]
heapq.heapify(ys)            # in place, and only O(n)
print(ys)                    # [1, 2, 3, 4, 7, 8, 9]
\`\`\`

\`heapify\` being O(n) rather than O(n log n) is not a typo: sifting down from the bottom costs work proportional to each node's HEIGHT, and almost every node is near the leaves, so the sum converges to a constant times n. Build a heap from an existing collection with \`heapify\`, never with a push loop.

The two patterns you will actually use:

\`\`\`python
print(heapq.nlargest(3, xs))            # [9, 8, 7]  — O(n log k), keeps only k
print(list(heapq.merge([1, 4, 9], [2, 3], [0, 5, 7])))
# [0, 1, 2, 3, 4, 5, 7, 9]              — merge k sorted streams lazily
\`\`\`

Top-k with a bounded heap is the one that changes what is possible: it uses O(k) memory regardless of n, so you can take the top 100 of a stream that never fits in RAM. Sorting everything would be O(n log n) time AND O(n) space. \`merge\` is the same idea for the k-way merge at the heart of an external sort.

Go spells this \`container/heap\`: implement five methods (\`Len\`, \`Less\`, \`Swap\`, \`Push\`, \`Pop\`) on your slice type and the package supplies the algorithms. TypeScript has no heap in the standard library at all — for small k, keeping a sorted array with a binary-search insert is usually fine, and beyond that you write the sift-up/sift-down pair or take a dependency.

## Tries, in one paragraph

A trie stores strings by their characters: each node holds a map from the next character to a child node, and a path from the root spells a prefix. Lookup and insert cost O(length of the key) with no hashing and no collisions, and every prefix query — autocomplete, longest-matching route, a spell checker's candidate set — is a single walk down from the shared prefix node. The cost is memory: a node object per character per distinct prefix, which is why production tries are compressed (radix trees) or replaced by a sorted array plus binary search when the set is static.`,
      questions: [
        {
          prompt: 'A validator checks only that each node is greater than its left child and less than its right child. Which tree does it wrongly accept?',
          options: [
            'Any tree whose height exceeds log2(n), since the bounds are never rechecked',
            'A tree containing duplicate values, which the strict comparison rejects twice',
            'A tree with only right children, because every left comparison is skipped',
            'One where a deep node satisfies its parent but violates a grandparent bound'
          ],
          correct: 3,
          explain:
            'The BST rule constrains whole subtrees. In N(5, N(3, N(2), N(6)), N(8)) the value 6 is a legal right child of 3 yet sits in the left subtree of 5, so it must be under 5. Carry a (lo, hi) window down instead.'
        },
        {
          prompt: 'You have a list of 1,000,000 numbers and need a valid heap. What does `heapify` cost versus pushing each element?',
          options: [
            'heapify is O(n) while the push loop is O(n log n)',
            'Both are O(n log n); heapify just avoids the function-call overhead',
            'heapify is O(n log n) and the push loop is O(n), so pushing wins',
            'Both are O(n), since a heap only maintains the parent-child rule'
          ],
          correct: 0,
          explain:
            'Sifting down from the last internal node costs work proportional to each node height, and most nodes are near the leaves, so the total sums to O(n). n separate pushes each cost O(log n).'
        },
        {
          prompt: 'You must report the 100 highest scores from a stream of 50 million that does not fit in memory. What do you use?',
          options: [
            'Sort the whole stream, then slice the last 100 entries off the end',
            'A hash map from score to count, scanned for the highest keys at the end',
            'A min-heap capped at 100 entries, replacing the root when a bigger score arrives',
            'A balanced BST holding every score, read back in reverse in-order to take the top 100'
          ],
          correct: 2,
          explain:
            'A bounded min-heap holds the current best 100 in O(k) memory and costs O(n log k) time. Its root is the weakest survivor, so one comparison per incoming element decides whether to replace it.'
        },
        {
          prompt: 'What does an in-order traversal of `N(5, N(3, N(2), N(6)), N(8))` print?',
          options: ['[2, 3, 5, 6, 8]', '[2, 3, 6, 5, 8]', '[5, 3, 2, 6, 8]', '[2, 6, 3, 8, 5]'],
          correct: 1,
          explain:
            'In-order visits left subtree, node, right subtree, regardless of whether the BST rule holds: 2, then 3, then the 6 hanging off it, then the root 5, then 8. The result is not sorted, which proves the tree is not a BST.'
        }
      ]
    },
    {
      key: 'graphs',
      title: 'Graphs: traversal, ordering, shortest paths, union-find',
      body: `# Almost everything is a graph

Dependencies between packages, links between media items, rooms in a map, states of a puzzle. A graph is vertices plus edges; the algorithms below are small, and the hard part is recognising that your problem is one of them.

## Representation decides your constants

An ADJACENCY LIST maps each vertex to its neighbours: O(V + E) memory, listing a vertex's neighbours is O(degree), and asking "is there an edge u to v?" is O(degree). An ADJACENCY MATRIX is a V-by-V grid of booleans: O(V^2) memory always, edge queries in O(1), neighbour iteration in O(V).

Use the list unless the graph is dense or you query individual edges constantly. For a social graph with a million vertices the matrix is 10^12 cells and simply not an option.

\`\`\`python
g = {"a": ["b", "c"], "b": ["d"], "c": ["d"], "d": ["e"], "e": [],
     "f": ["g"], "g": ["f"]}
\`\`\`

## BFS and DFS are the same loop with a different container

Both visit every reachable vertex once, in O(V + E). BFS uses a QUEUE and expands in rings of increasing distance; DFS uses a STACK (explicit, or the call stack) and dives.

\`\`\`python
from collections import deque

def bfs_dist(g, start):
    dist = {start: 0}
    q = deque([start])
    while q:
        n = q.popleft()
        for m in g[n]:
            if m not in dist:            # mark on ENQUEUE, not on dequeue
                dist[m] = dist[n] + 1
                q.append(m)
    return dist

print(bfs_dist(g, "a"))   # {'a': 0, 'b': 1, 'c': 1, 'd': 2, 'e': 3}
\`\`\`

That gives shortest paths for free — but only when every edge costs the same. BFS is THE answer for "fewest moves", "shortest word ladder", "minimum steps in a maze". Marking a vertex when you enqueue it, not when you dequeue it, is what keeps a vertex out of the queue twice; get that wrong and a dense graph blows up.

DFS is the one for structure rather than distance: connected components, cycle detection, topological order, bridges. Recursion is the natural spelling, with the stack-depth caveat from lesson six — on a long path graph, convert to an explicit stack.

Connected components in an undirected graph are just "run the traversal from every vertex you have not yet seen, and count how many times you had to start".

## Cycle detection is two different problems

In an UNDIRECTED graph, a cycle is any edge back to an already-seen vertex that is not the one you came from — so DFS carries the parent along and ignores that single edge.

In a DIRECTED graph the parent trick fails, because reaching a seen vertex may just be a second path to it (a diamond, not a cycle). You need three states: unvisited, in the CURRENT recursion stack, and finished. An edge into a vertex that is in the current stack is a back edge, and that is a cycle. In \`g\` above, \`a -> b -> d\` and \`a -> c -> d\` meet at d with no cycle, while \`f -> g -> f\` is one.

## Topological order, Kahn's way

A topological order lists every vertex before all of its dependents; it exists exactly when the directed graph is acyclic. Kahn's algorithm is BFS over in-degrees:

\`\`\`python
def topo(g):
    indeg = {n: 0 for n in g}
    for n in g:
        for m in g[n]:
            indeg[m] += 1
    q = deque(n for n in g if indeg[n] == 0)
    order = []
    while q:
        n = q.popleft()
        order.append(n)
        for m in g[n]:
            indeg[m] -= 1
            if indeg[m] == 0:            # every prerequisite is now placed
                q.append(m)
    return order if len(order) == len(g) else None    # short = a cycle

print(topo(g))                                     # None — f and g form a cycle
print(topo({"a": ["b"], "b": ["c"], "c": []}))     # ['a', 'b', 'c']
\`\`\`

The cycle check is free: if the output is shorter than the vertex count, the vertices left behind never reached in-degree zero, which means they are in or downstream of a cycle. Build orders, task schedulers and spreadsheet recalculation all run this.

## Dijkstra, and its one hard precondition

With non-negative weights, Dijkstra finds shortest paths from a source by always expanding the closest unfinished vertex — a heap makes that selection O(log V), for O((V + E) log V) overall.

\`\`\`python
import heapq

def dijkstra(w, start):
    dist = {start: 0}
    pq = [(0, start)]
    while pq:
        d, n = heapq.heappop(pq)
        if d > dist.get(n, float("inf")):
            continue                     # a stale entry; the lazy-deletion idiom
        for m, cost in w[n]:
            nd = d + cost
            if nd < dist.get(m, float("inf")):
                dist[m] = nd
                heapq.heappush(pq, (nd, m))
    return dist

w = {"a": [("b", 1), ("c", 4)], "b": [("c", 2), ("d", 6)], "c": [("d", 3)], "d": []}
print(dijkstra(w, "a"))     # {'a': 0, 'b': 1, 'c': 3, 'd': 6}
\`\`\`

Python's \`heapq\` has no decrease-key, so the idiom is to push a new entry and skip stale pops — the heap can hold up to E entries, which is fine.

The correctness argument is: when a vertex is popped with distance d, no unexplored route can beat d, because every remaining edge only ADDS a non-negative amount. Introduce one negative edge and that argument collapses. In the graph \`a -> b\` (2), \`a -> c\` (5), \`c -> b\` (-4), \`b -> d\` (7), a Dijkstra that marks vertices final on pop settles b at 2, expands it, and reports d = 9 — while the true shortest path \`a -> c -> b -> d\` costs 5 - 4 + 7 = 8. Negative weights need Bellman-Ford (O(V * E), and it detects negative cycles); negative CYCLES make "shortest path" undefined for any algorithm.

## Union-find

For "are these two in the same group?" with groups that only ever merge, a disjoint-set union beats running a traversal each time.

\`\`\`python
class DSU:
    def __init__(self, n):
        self.p = list(range(n))
        self.sz = [1] * n

    def find(self, x):
        while self.p[x] != x:
            self.p[x] = self.p[self.p[x]]     # path halving: flatten as you climb
            x = self.p[x]
        return x

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False                     # already together: this edge is a cycle
        if self.sz[ra] < self.sz[rb]:
            ra, rb = rb, ra                  # attach the smaller tree to the bigger
        self.p[rb] = ra
        self.sz[ra] += self.sz[rb]
        return True
\`\`\`

Both optimisations are needed. Union by size keeps the trees shallow; path compression flattens what you touched. Together the amortised cost per operation is the inverse Ackermann function — under 5 for any input that fits in the universe, so "effectively constant". \`union\` returning False is the cycle test that makes Kruskal's minimum spanning tree a six-line algorithm.`,
      questions: [
        {
          prompt: 'A maze has walls and open cells, and every move costs one step. Which traversal gives the fewest-moves path?',
          options: [
            'DFS, because it reaches the exit with the fewest function calls',
            'Either one; both visit every reachable cell exactly once in O(V + E)',
            'BFS, because it expands cells in order of increasing distance',
            'Dijkstra, because DFS and BFS do not compute distances at all'
          ],
          correct: 2,
          explain:
            'With uniform edge weights, the first time BFS reaches a cell it has done so by a shortest route. DFS finds A path but usually not the shortest, and Dijkstra with all-equal weights just is BFS with extra overhead.'
        },
        {
          prompt: 'A Kahn topological sort returns an order shorter than the number of vertices. What does that mean?',
          options: [
            'The graph is disconnected, so each component needs its own traversal run',
            'Some vertices had in-degree zero at the start and were never enqueued',
            'The queue was drained early because a vertex had no outgoing edges',
            'The leftover vertices sit on or below a cycle, so no valid order exists'
          ],
          correct: 3,
          explain:
            'Vertices only get emitted once every prerequisite is placed. If some never reach in-degree zero they are waiting on each other, which is exactly a directed cycle. Disconnected components are handled fine, since each has its own zero-in-degree start.'
        },
        {
          prompt: 'Why does Dijkstra fail with a negative edge weight?',
          options: [
            'A settled vertex can still be improved later by a route that gets cheaper',
            'The heap cannot order negative keys, so the pop sequence is undefined',
            'Distances can go below zero, and the visited set is keyed on the distance',
            'It loops forever, revisiting the negative edge to lower the cost each time'
          ],
          correct: 0,
          explain:
            'Dijkstra finalises the closest unfinished vertex on the assumption that further edges only add cost. A negative edge breaks that: in a->b 2, a->c 5, c->b -4, b->d 7 it reports d = 9 while the true answer is 8.'
        },
        {
          prompt: 'Your graph has 1,000,000 vertices and about 3,000,000 edges. Which representation should you use?',
          options: [
            'An adjacency matrix, since a single edge lookup becomes O(1) instead of O(degree)',
            'An adjacency list, because a matrix would need 10^12 cells for 3 * 10^6 edges',
            'A matrix stored as bits, which compresses the empty cells away entirely',
            'An edge list alone, scanning all 3,000,000 edges on each neighbour query'
          ],
          correct: 1,
          explain:
            'The graph is sparse: average degree 3. A list costs O(V + E) which is about 4 million entries; the matrix costs V^2 regardless of how few edges exist. A bitset still needs 10^12 bits, roughly 125 GB.'
        },
        {
          prompt: 'In a union-find with union by size and path compression, what does `union(a, b)` returning False tell you?',
          options: [
            'The union failed because one of the two indices was out of range',
            'The two elements are in different sets and the merge was deferred',
            'One of the trees was too deep to attach without rebalancing first',
            'They already shared a root, so this edge closes a cycle'
          ],
          correct: 3,
          explain:
            'find(a) == find(b) means both are already in the same component, so the edge adds nothing but a cycle. Kruskal uses exactly this to skip edges that would close a loop while building a spanning tree.'
        }
      ]
    },
    {
      key: 'greedy-backtracking',
      title: 'Greedy when it is provable, backtracking when it is not',
      body: `# Two opposite bets

Greedy takes the locally best option and never reconsiders: O(n log n) at worst, usually one sort and one pass. Backtracking tries everything, undoing each choice: correct always, exponential often. Knowing which you are allowed to use is the actual skill, because a greedy algorithm that is *nearly* right is worse than a slow one — it produces plausible wrong answers.

## When greedy is provably right

The template proof is an EXCHANGE ARGUMENT: take any optimal solution, show that swapping its first choice for the greedy choice leaves it no worse, then repeat. If that swap always works, greedy reaches an optimum.

Interval scheduling is the cleanest case. You have meetings with start and end times and one room; maximise the number of meetings.

\`\`\`python
def max_meetings(intervals):
    kept, end = [], float("-inf")
    for s, e in sorted(intervals, key=lambda iv: iv[1]):    # by EARLIEST END
        if s >= end:
            kept.append((s, e))
            end = e
    return kept

ivs = [(1, 4), (2, 3), (3, 5), (0, 6), (5, 7), (8, 9), (5, 9)]
print(len(max_meetings(ivs)))     # 4  -> (2,3) (3,5) (5,7) (8,9)
\`\`\`

The exchange argument: the meeting that finishes first leaves the most room for everything after it, so any optimal schedule can have its first meeting replaced by that one without losing a slot. Sort by START instead and the same loop returns 2 on this input, because the greedy pick \`(0, 6)\` swallows three shorter meetings. Sort by DURATION and it also fails: a short meeting in the middle can block two others. The sort key IS the algorithm here.

Other provably-greedy problems worth recognising: Huffman coding (always merge the two rarest symbols), minimum spanning trees via Kruskal (always take the cheapest edge that does not close a cycle — the union-find from lesson eight), and fractional knapsack, where you may take part of an item and sorting by value-per-weight is optimal.

## When greedy fails

Note that last one: FRACTIONAL knapsack is greedy, 0/1 knapsack is not. That pattern repeats — a small change to the rules destroys the exchange argument. Coin change is the standard demonstration:

\`\`\`python
def greedy_coins(coins, amount):
    n = 0
    for c in sorted(coins, reverse=True):
        n += amount // c
        amount %= c
    return n if amount == 0 else -1

print(greedy_coins([1, 5, 6, 9], 11), coin_change([1, 5, 6, 9], 11))   # 3 2
print(greedy_coins([1, 3, 4], 6), coin_change([1, 3, 4], 6))           # 3 2
print(greedy_coins([1, 5, 10, 25], 63), coin_change([1, 5, 10, 25], 63))  # 6 6
\`\`\`

With \`[1, 5, 10, 25]\` greedy is optimal for every amount — that is a property of THAT coin system, not of the algorithm. With \`[1, 5, 6, 9]\` and 11, greedy takes 9 and then needs two 1s; the optimum is 5 + 6. Real currencies are designed to be greedy-friendly, which is exactly why the bug survives testing: it passes on every example anybody thinks to try.

If you cannot state the exchange argument in one sentence, assume greedy is wrong and reach for DP or search.

## Backtracking: choose, explore, un-choose

Backtracking is DFS over a tree of partial solutions. Every recursive step makes a choice, recurses, then UNDOES the choice so the next branch starts clean. The undo is the part people forget, and it produces answers polluted by earlier branches.

\`\`\`python
def subsets(a):
    out, cur = [], []
    def go(i):
        if i == len(a):
            out.append(cur[:])       # copy — cur keeps mutating
            return
        go(i + 1)                    # branch 1: skip a[i]
        cur.append(a[i])             # choose
        go(i + 1)                    # branch 2: take a[i]
        cur.pop()                    # un-choose
    go(0)
    return out

print(subsets([1, 2, 3]))
# [[], [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3]]
\`\`\`

Two invariants: append a COPY of the accumulator (append \`cur\` itself and every entry ends up empty), and pop exactly what you pushed. There are 2^n subsets, so the work is inherently exponential — you are enumerating, not searching.

Permutations swap in place instead:

\`\`\`python
def permutations(a):
    out = []
    def go(i):
        if i == len(a):
            out.append(a[:])
            return
        for j in range(i, len(a)):
            a[i], a[j] = a[j], a[i]
            go(i + 1)
            a[i], a[j] = a[j], a[i]      # swap back
    go(0)
    return out

print(permutations([1, 2, 3]))
# [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2]]
\`\`\`

n! results, and note the order is not lexicographic — swapping produces a different enumeration order than "pick the smallest unused element". If you need sorted output, either sort at the end or build with a used-set instead of swaps.

## Pruning is what makes it usable

Raw backtracking on N-queens would test n^n board fillings. Rejecting a placement the moment it conflicts cuts that to something that runs:

\`\`\`python
def nqueens(n):
    count = 0
    cols, diag, anti = set(), set(), set()

    def go(r):
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            if c in cols or (r - c) in diag or (r + c) in anti:
                continue                 # prune: this branch cannot ever work
            cols.add(c); diag.add(r - c); anti.add(r + c)
            go(r + 1)
            cols.discard(c); diag.discard(r - c); anti.discard(r + c)

    go(0)
    return count

print([nqueens(n) for n in range(1, 10)])
# [1, 0, 0, 2, 10, 4, 40, 92, 352]
\`\`\`

Placing one queen per row already removes the row conflict by construction. The two diagonal keys are the trick worth stealing: every cell on a down-right diagonal has the same \`r - c\`, and every cell on a down-left diagonal has the same \`r + c\`, so both checks are O(1) set lookups rather than a scan of the board.

The three levers in any backtracking search are the same: prune as EARLY as possible (test a constraint the moment it can fail, not at the leaf), order the choices so failures show up first, and make the constraint check O(1) with an incremental structure. Everything beyond that — constraint propagation, branch and bound, memoising on a canonical state — is a refinement of those three.`,
      questions: [
        {
          prompt: 'For maximising the number of non-overlapping meetings in one room, which sort key makes the greedy pass optimal?',
          options: [
            'By start time, so the room is occupied as early as possible',
            'By duration, taking the shortest meetings first to fit more in',
            'By end time, since finishing earliest leaves the most room after it',
            'By overlap count, taking the least contested meetings first'
          ],
          correct: 2,
          explain:
            'The exchange argument works only for earliest end: any optimal schedule can swap its first meeting for the earliest-finishing one without losing a slot. On the example set, sorting by start returns 2 instead of 4.'
        },
        {
          prompt: 'Greedy coin change works perfectly on [1, 5, 10, 25] but returns 3 for amount 11 on [1, 5, 6, 9], where 2 is optimal. What does that show?',
          options: [
            'Greedy correctness is a property of the coin system, not of the algorithm',
            'The coins must be sorted ascending before the greedy loop runs',
            'Greedy needs a coin of value 1 present to terminate with an exact total',
            'The DP is wrong: 9 + 1 + 1 uses the largest coins and is therefore minimal'
          ],
          correct: 0,
          explain:
            'Taking 9 leaves 2, which needs two 1s; taking 5 + 6 hits 11 exactly. Real currencies are designed so greedy works, which is why this bug passes every test written from everyday coins.'
        },
        {
          prompt: 'In the N-queens solver, why are diagonals tracked as `r - c` and `r + c`?',
          options: [
            'They hash better than coordinate pairs, keeping the three sets small',
            'Each value is constant along one diagonal, making the conflict test O(1)',
            'They encode the queen move rules, which the row and column sets cannot',
            'They keep the recursion depth at n rather than n^2 board positions'
          ],
          correct: 1,
          explain:
            'Every cell on a down-right diagonal shares r - c, and every cell on a down-left diagonal shares r + c. Storing those in sets turns each diagonal check into one lookup instead of scanning the board.'
        },
        {
          prompt: 'A subset enumerator appends `cur` to the results instead of `cur[:]`. What comes out?',
          options: [
            'The subsets appear, but in reverse order compared with the copying version',
            'Only the full set, since the earlier partial results are overwritten in place',
            'The right number of entries, all aliasing one list that ends up empty',
            'A RecursionError, because cur is captured by the closure on every call'
          ],
          correct: 2,
          explain:
            'Every entry is the same list object, and the un-choose pops leave it empty when the recursion unwinds. You get 2^n references to one empty list — the reason the copy is mandatory in backtracking code.'
        }
      ]
    },
    {
      key: 'structures-in-practice',
      title: 'Picking structures in Go, TypeScript and Python',
      body: `# The standard library you have decides the algorithm you write

The same problem gets three different solutions in Go, TypeScript and Python, because the three standard libraries stop at different places. Knowing where each one stops is most of "choosing a data structure" in practice.

## Python: the batteries are the point

- \`list\` — dynamic array. O(1) index and append; O(n) \`insert(0, x)\`, \`pop(0)\` and \`in\`
- \`dict\` and \`set\` — hash tables, O(1) average, and \`dict\` preserves insertion order since 3.7
- \`collections.deque\` — O(1) at both ends, and \`deque(maxlen=k)\` is a ring buffer
- \`heapq\` — min-heap functions over a plain list: \`heappush\`, \`heappop\`, \`heapify\`, \`nlargest\`, \`merge\`
- \`bisect\` — binary search plus \`insort\` for a sorted list you keep sorted
- \`collections.Counter\` — a dict of counts with \`most_common\`, arithmetic, and no KeyError
- \`collections.defaultdict\` — grouping without the \`setdefault\` dance
- \`functools.lru_cache\` — memoisation as a decorator

\`\`\`python
from collections import Counter, deque
from bisect import insort, bisect_left

print(Counter("abracadabra").most_common(2))   # [('a', 5), ('b', 2)]

dq = deque(maxlen=3)
for x in range(6):
    dq.append(x)
print(dq)                    # deque([3, 4, 5], maxlen=3)

xs = [1, 4, 9]
insort(xs, 5)
print(xs, bisect_left(xs, 5))    # [1, 4, 5, 9] 2
\`\`\`

\`insort\` is O(n), not O(log n) — the search is logarithmic, the insertion shifts every later element. For a few thousand items that still beats a tree, because the shift is one cache-friendly memmove; for a million with heavy insertion it does not.

## Go: fewer types, more explicit choices

Slices and maps cover most of it and you assemble the rest. There is no set type — the idiom is \`map[string]struct{}\`, where the empty struct occupies zero bytes. There is no deque — a slice with a head index, or \`container/list\` if you truly need splicing. There is no ready-made priority queue: \`container/heap\` supplies the ALGORITHMS and you supply \`Len\`, \`Less\`, \`Swap\`, \`Push\` and \`Pop\` on your own slice type.

\`\`\`go
type PQ []Job

func (p PQ) Len() int           { return len(p) }
func (p PQ) Less(i, j int) bool { return p[i].cost < p[j].cost }
func (p PQ) Swap(i, j int)      { p[i], p[j] = p[j], p[i] }
func (p *PQ) Push(x any)        { *p = append(*p, x.(Job)) }
func (p *PQ) Pop() any {
    old := *p
    n := len(old)
    item := old[n-1]
    *p = old[:n-1]
    return item
}
\`\`\`

Two Go-specific traps. A slice is a header — pointer, length, capacity — passed by value, so an \`append\` inside a function may reallocate and leave the caller's slice untouched; return the slice. And the zero value of a map is nil: reading from it yields the zero value, writing to it PANICS, so a map field needs \`make\` before first use. Since 1.21 the \`slices\` and \`maps\` packages cover the obvious helpers (\`slices.Sort\`, \`slices.Contains\`, \`slices.BinarySearch\`, \`maps.Keys\`), and map iteration order is deliberately randomised so that nothing can come to depend on it.

## TypeScript: three containers and a sharp edge

\`Array\`, \`Map\` and \`Set\`, all preserving insertion order, plus objects as string-keyed dictionaries. No heap, no deque, no sorted container. The sharp edge is the default sort:

\`\`\`typescript
const nums = [10, 9, 1, 22, 3]
console.log([...nums].sort())                  // [1, 10, 22, 3, 9]
console.log([...nums].sort((a, b) => a - b))   // [1, 3, 9, 10, 22]
\`\`\`

With no comparator, \`sort\` converts every element to a string and compares those, so \`"10"\` sorts before \`"9"\`. Always pass a comparator for numbers. Beyond that: prefer \`Map\` over a plain object when the keys are not strings or when insertion order and \`.size\` matter, and remember that \`shift()\` on a big array is O(n) — a BFS frontier wants an index cursor into the array instead.

## An LRU cache in ten lines

Least-recently-used eviction is the standard interview structure and a genuinely common one. It needs O(1) lookup AND O(1) recency updates, which is a hash map plus a doubly linked list — or, in Python, an \`OrderedDict\`, which already is one:

\`\`\`python
from collections import OrderedDict

class LRU:
    def __init__(self, cap):
        self.cap, self.d = cap, OrderedDict()

    def get(self, k):
        if k not in self.d:
            return -1
        self.d.move_to_end(k)            # mark as most recently used
        return self.d[k]

    def put(self, k, v):
        if k in self.d:
            self.d.move_to_end(k)
        self.d[k] = v
        if len(self.d) > self.cap:
            self.d.popitem(last=False)   # drop the least recently used

c = LRU(2)
c.put("a", 1)
c.put("b", 2)
c.get("a")            # a is now the most recent, so b is next to go
c.put("c", 3)
print(list(c.d))      # ['a', 'c']
\`\`\`

In Go the same thing is a \`map[K]*node\` plus a hand-rolled list (or \`container/list\`); in TypeScript a \`Map\` gets you most of the way, since \`map.keys().next().value\` is the oldest entry and delete-then-set moves a key to the end.

## The bloom filter idea

Sometimes you can drop exactness for an enormous saving. A bloom filter is a bit array of size m plus k hash functions: to add an item, set the k bits it hashes to; to test one, check whether all k of those bits are set. If any bit is zero the item is DEFINITELY absent; if all are set it is PROBABLY present, because other items may have set those bits between them. A toy with m = 64 bits and k = 3 holding three words produced 3 false positives over 2000 probes.

So it never says "no" incorrectly and sometimes says "yes" incorrectly, in a few bits per item rather than the whole key. That is the right shape whenever a cheap maybe-filter guards an expensive exact check: "have I already crawled this URL?", "might this key be in the on-disk table?". You cannot remove items — clearing a bit could erase another item's evidence — and you cannot enumerate the contents.

## When to stop

Every structure here has a crossover point, and below it the simple thing wins. A linear scan over a slice of 20 items beats a map, because hashing is not free and 20 contiguous comparisons are about one cache line of work. A sorted slice beats a tree until inserts dominate. \`lru_cache\` on a function called nine times is slower than the function.

The order that keeps you honest: make it correct, measure it against realistic input sizes, then change the algorithm — a better complexity class is worth more than any constant-factor tuning — and only then consider micro-optimisation. If the input is bounded and small, the O(n^2) loop that everyone can read is the right answer, and writing the bound down as a comment is what stops the next person from rewriting it.`,
      questions: [
        {
          prompt: 'What does `[10, 9, 1, 22, 3].sort()` return in TypeScript, with no comparator passed?',
          options: ['[1, 3, 9, 10, 22]', '[10, 9, 1, 22, 3]', '[22, 10, 9, 3, 1]', '[1, 10, 22, 3, 9]'],
          correct: 3,
          explain:
            'The default sort converts each element to a string and compares those, so "1" < "10" < "22" < "3" < "9". Numeric sorting needs an explicit (a, b) => a - b comparator.'
        },
        {
          prompt: 'A bloom filter reports that a key is present. What have you actually learned?',
          options: [
            'Possibly nothing: it may be a false positive, so an exact check is still needed',
            'That the key was definitely added at some point, since there are no false positives',
            'That the key was added, unless some other key was deleted from the filter',
            'That the key is present with a probability equal to the current load factor'
          ],
          correct: 0,
          explain:
            'All k bits can be set because several other items set them between them. A bloom filter has no false negatives and some false positives, which is why it guards an expensive exact lookup rather than replacing it.'
        },
        {
          prompt: 'You keep 5,000 scores in a sorted list, inserting new ones one at a time with `bisect.insort`. What does one insertion cost?',
          options: [
            'O(log n), since the binary search locates the position directly',
            'O(n), because the search is logarithmic but the shift is linear',
            'O(1) amortised, the same as appending to the end of the list',
            'O(n log n), as the whole list is re-sorted after each insertion'
          ],
          correct: 1,
          explain:
            'insort finds the index in O(log n) and then inserts, which moves every later element one slot. The memmove is cache-friendly, so it still beats a tree at this size, but the complexity is linear.'
        },
        {
          prompt: 'An LRU of capacity 2 runs put(a,1), put(b,2), get(a), put(c,3). Which key was evicted?',
          options: [
            'a, as the oldest key measured by its insertion time',
            'c, since the cache was already full when c arrived',
            'Nothing yet; eviction is deferred until the next get',
            'b, because get(a) made a the more recently used key'
          ],
          correct: 3,
          explain:
            'Eviction is by recency of USE, not of insertion. get(a) moved a to the most-recent end, which left b at the least-recent end when c overflowed the capacity.'
        }
      ]
    }
  ]
}
