import type { ProgCourseDef } from './types'

export const TS_COURSE: ProgCourseDef = {
  key: 'typescript-deep-dive',
  title: 'TypeScript deep dive',
  description: 'Types as sets — structural typing, narrowing, generics, mapped and conditional types, modules and the compiler flags that actually matter.',
  lessons: [
    {
      key: 'structural-typing',
      title: 'Structural typing and assignability',
      body: `# Types are sets of values

One mental model makes the rest of TypeScript fall into place: **a type is a set of values, and assignability is the subset test**. \`string\` is the set of all strings. \`'a' | 'b'\` is a two-element set inside it, which is why an \`'a' | 'b'\` fits where a \`string\` is wanted and never the other way round. \`{ x: number }\` is the set of all objects that have a numeric \`x\` — an enormous set, because nothing in that type says they may not also have a \`y\`.

That last point is the whole of **structural typing**. The compiler never asks "was this declared as a Point?", only "does this value's shape have everything Point needs?". Names are documentation; shapes are the type.

\`\`\`ts
interface Point { x: number; y: number }
function dist(p: Point) { return Math.hypot(p.x, p.y) }

class Vec {
  constructor(public x: number, public y: number) {}
}

dist(new Vec(3, 4))   // fine: Vec has x and y. No \`implements Point\` anywhere.
\`\`\`

In Java or C# that class would have to declare the interface it satisfies. Here the relationship is discovered, not declared — duck typing, checked at compile time. It is why you can type a third-party object without touching it, and why "this type came from over there" is never an argument the compiler accepts.

## More properties means a smaller set

Counter-intuitive at first: \`{ x: number; y: number; z: number }\` is a **subtype** of \`{ x: number; y: number }\`. Adding a required member excludes values, so the set shrinks, and subtype means subset means assignable to the supertype. Every time an error surprises you, the usual cause is a set that was bigger than you pictured.

## Unions and intersections are set operations

\`A | B\` is set union — a value from either. \`A & B\` is set intersection — a value in both, which for object types means it carries all the members of both. That is why intersecting two object types *adds* properties while intersecting two unions *removes* members, a pairing that reads backwards until you think in sets. And \`string & number\` has no members at all, so it collapses to the empty set.

## The top and the bottom

- \`unknown\` is the universal set: every value is assignable to it, and nothing can be done with it until you narrow.
- \`never\` is the empty set: nothing is assignable to it, and it is assignable to everything — vacuously, because there is no value that could go wrong.
- \`any\` is not a set at all. It opts out of the lattice, assignable in both directions, and it is the one type that turns off checking rather than describing values.

\`\`\`ts
declare const nothing: never
const s: string = nothing   // legal: the empty set is a subset of every set
const u: unknown = s        // legal: every set is a subset of the universal set
// const back: string = u   // Error 2322: 'unknown' is not assignable to 'string'
\`\`\`

## Freshness: the excess property check

Pure structural typing would happily let a wider object through, and that would wave typos past. So there is one extra rule: a **fresh** object literal — one written directly at the position being assigned to — may only mention known properties.

\`\`\`ts
dist({ x: 3, y: 4, z: 0 })
// Error 2353: Object literal may only specify known properties,
// and 'z' does not exist in type 'Point'.

const v = { x: 3, y: 4, z: 0 }
dist(v)   // fine: v is no longer fresh, so plain assignability applies
\`\`\`

Freshness is lost the moment the literal is stored in a variable or asserted. This is not a soundness rule — it is a shallow heuristic bolted onto a structural system to catch misspelled option names, and knowing that explains both the error and its easy workaround.

## Where structure is not enough

\`private\` and \`protected\` members make classes effectively nominal: two classes with identical public shapes but their own \`private id\` are not assignable to each other, because the private member is tied to its declaration. That is the one seam the language leaves for genuinely nominal modelling, and the branded-type trick in a later lesson exploits the same idea deliberately.`,
      questions: [
        {
          prompt: 'A class Vec with public numeric x and y is accepted where interface Point { x: number; y: number } is expected, with no implements clause. Why?',
          options: [
            'TypeScript compares shapes, so any value with a numeric x and y is a Point',
            'The compiler rewrites the class to implement every interface it matches',
            'Classes are exempt from interface checks unless they declare implements',
            'Point is an interface, and interfaces are erased before assignability runs'
          ],
          correct: 0,
          explain: 'Structural typing compares members, not declared names. Declared inheritance is documentation here, and only private or protected members make a class behave nominally.'
        },
        {
          prompt: 'dist({ x: 3, y: 4, z: 0 }) is an error, but storing that same object in const v and calling dist(v) is fine. What explains the difference?',
          options: [
            'The variable annotation on v strips the extra property before the call',
            'Object literals are checked nominally, while variables are checked structurally later',
            'z is inferred as any inside a variable, so it stops taking part in the check',
            'The excess property check only fires on a fresh literal at the target position'
          ],
          correct: 3,
          explain: 'Freshness is a heuristic layered on top of assignability to catch typos. It is lost as soon as the literal is stored in a variable, after which ordinary structural rules apply.'
        },
        {
          prompt: 'Under strict mode, which of these assignments is legal?',
          options: [
            'const s: string = someUnknown, since unknown is the type of every possible value',
            'const n: never = someString, because never accepts anything',
            'const s: string = someNever, because the empty set is a subset of every set',
            'const n: never = someUnknown, because unknown is the widest type there is'
          ],
          correct: 2,
          explain: 'never is the empty set, so it is assignable to every type — vacuously, as there is no value that could be wrong. unknown is the opposite: everything goes in, nothing comes out without narrowing.'
        },
        {
          prompt: 'Between A = { id: number } and B = { id: number; name: string }, which statement holds?',
          options: [
            'B is assignable to A, because requiring more properties describes fewer values',
            'A is assignable to B, because A leaves the name property free to be anything',
            'Neither is assignable to the other, since their property lists are different',
            'Both directions are allowed, because object types are compared property by property'
          ],
          correct: 0,
          explain: 'Every B is an A, so B is the subtype. Adding a required member shrinks the set of qualifying values, which is exactly what makes it assignable in that direction and not the reverse.'
        }
      ]
    },
    {
      key: 'narrowing',
      title: 'Narrowing and discriminated unions',
      body: `# The type that changes as you read down the page

Every expression has a **declared** type and, at each point in the program, a **narrowed** type. The compiler runs control-flow analysis over your code and rewrites the narrowed type at each branch, which is why the same variable can be \`string | null\` on one line and \`string\` on the next.

The guards it understands are a fixed list: \`typeof\`, \`instanceof\`, \`in\`, truthiness, equality against a literal or against \`null\`/\`undefined\`, \`Array.isArray\`, and comparison of a discriminant property.

\`\`\`ts
function render(v: string | string[] | null): string {
  if (v === null) return ''
  if (typeof v === 'string') return v      // v: string
  return v.join(', ')                      // v: string[]
}
\`\`\`

Two \`typeof\` traps carry over from JavaScript untouched: \`typeof null\` is \`'object'\`, so an object guard does **not** exclude null, and an array is also \`'object'\`. Check for null first, and reach for \`Array.isArray\` rather than a \`typeof\` test.

## Discriminated unions

The workhorse pattern: a union of object types sharing one property whose type is a *literal*.

\`\`\`ts
type Result =
  | { status: 'ok'; data: string }
  | { status: 'error'; message: string }

function show(r: Result): string {
  return r.status === 'ok' ? r.data : r.message
}
\`\`\`

The discriminant must be a literal type, not \`string\` — only literals partition the union, because only they let a comparison rule members out. The \`in\` operator narrows too (\`'data' in r\`), which is the fallback when a union has no shared tag, but a real discriminant is cheaper to read and survives refactors better.

## Exhaustiveness with never

\`\`\`ts
type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'rect'; w: number; h: number }

function area(s: Shape): number {
  switch (s.kind) {
    case 'circle': return Math.PI * s.r ** 2
    case 'rect': return s.w * s.h
    default: {
      const exhaustive: never = s
      return exhaustive
    }
  }
}
\`\`\`

If every case is handled, \`s\` is narrowed to \`never\` in the default arm and the assignment is legal. Add a third variant to \`Shape\` and that line stops compiling — *"Type '{ kind: "tri"; ... }' is not assignable to type 'never'"* — in every switch that has not been updated. Four lines that convert "I added a variant" from a runtime surprise into a compiler-generated to-do list.

## Predicates and assertions

A user-defined type guard returns \`x is T\`:

\`\`\`ts
function isString(x: unknown): x is string {
  return typeof x === 'string'
}

// an assertion function narrows for the rest of the scope by throwing
function assertDefined<T>(v: T | null | undefined): asserts v is T {
  if (v == null) throw new Error('missing')
}
\`\`\`

The body of a predicate is **not** checked against the claim — \`return true\` would compile. It is an assertion you have taken responsibility for, so keep it small enough to read in one glance. The same goes for the assertion form, which narrows by throwing rather than returning.

One gotcha: calling an assertion function through an arrow stored in a \`const\` fails with error 2775, *"Assertions require every name in the call target to be declared with an explicit type annotation"*. Either declare it with \`function\`, or annotate the const with its full \`(v: unknown) => asserts v is string\` type.

## Where narrowing evaporates

A narrowing is a fact about a point in the flow, and it is dropped as soon as the compiler cannot prove it still holds — after a reassignment, and inside a callback when the variable is written anywhere in the enclosing function.

\`\`\`ts
function f(x: string | null) {
  if (x !== null) {
    setTimeout(() => console.log(x.length))  // Error 18047: 'x' is possibly 'null'
  }
  x = null
}
\`\`\`

Delete the \`x = null\` and the same code compiles: narrowing survives into a nested function only for bindings the compiler can see are never written again. The everyday fix is to copy the narrowed value into a \`const\` inside the branch and close over that.`,
      questions: [
        {
          prompt: 'What does writing `const exhaustive: never = s` in a switch default arm buy you?',
          options: [
            'It throws at runtime when an unexpected discriminant value arrives',
            'Adding a union member turns every unhandled switch into a compile error',
            'It tells the compiler to check the switch cases in declaration order',
            'It silences the "not all code paths return a value" diagnostic in the default arm'
          ],
          correct: 1,
          explain: 'When every case is handled the value is narrowed to never and the line is legal. Add a variant and the residual type is no longer never, so each stale switch stops compiling.'
        },
        {
          prompt: 'What does the compiler verify about the body of `function isString(x: unknown): x is string`?',
          options: [
            'That every return path performs a typeof or instanceof test on x',
            'That the returned expression is a boolean and that x is a union member',
            'Only that it returns a boolean — the claim itself is taken on trust',
            'Nothing, because predicate signatures are erased before checking begins'
          ],
          correct: 2,
          explain: 'A type predicate is a hand-written assertion. TypeScript applies it at every call site but never checks that the body really implies it, so a wrong predicate is a silent hole.'
        },
        {
          prompt: 'Inside `if (x !== null) { setTimeout(() => x.length) }`, x is reported as possibly null. What makes the error appear?',
          options: [
            'setTimeout stores the callback for later, so every narrowing is dropped in async code',
            'Arrow functions capture the declared type rather than the narrowed one',
            'The narrowing only applies to the statement that performed the test',
            'x is assigned somewhere else in the function, so the callback may run after it'
          ],
          correct: 3,
          explain: 'Control-flow analysis keeps a narrowing inside a nested function only when the binding is never written again. One later assignment makes the deferred call unprovable and the declared type returns.'
        },
        {
          prompt: 'For a value typed `{ id: number } | null`, what does `if (typeof v === "object")` narrow it to?',
          options: [
            '{ id: number } | null, because typeof null is also "object"',
            '{ id: number }, since null is excluded by the object check',
            'never, because typeof on a union of object types is not a valid guard',
            '{ id: number } | undefined, since strictNullChecks splits the two'
          ],
          correct: 0,
          explain: 'typeof null is "object" — a JavaScript wart the guard reproduces faithfully — so the null branch survives and an explicit v !== null test is still required.'
        }
      ]
    },
    {
      key: 'unknown-any-never',
      title: 'unknown, any, never and the assertions between them',
      body: `# any is a hole, unknown is a question, never is a proof

\`any\` is less a type than an off switch. It disables checking in both directions, and it **spreads**: every property access, call and index on an \`any\` is itself \`any\`, so one untyped value at the top of a file can quietly de-type everything downstream.

\`\`\`ts
const data: any = JSON.parse(raw)
data.user.profile.nmae.toUpperCase()   // compiles. Typo included.
\`\`\`

\`JSON.parse\` returns \`any\`, and so does a bare \`catch\` parameter unless \`useUnknownInCatchVariables\` (TS 4.4, part of \`strict\`) is on. Those two doors let in most of the \`any\` in a typical codebase.

\`unknown\` is the honest version of the same statement. Same "I do not know what this is", but nothing at all is permitted until you narrow.

\`\`\`ts
const raw: unknown = JSON.parse(text)
// raw.n                       // Error 2571: 'raw' is of type 'unknown'

if (typeof raw === 'object' && raw !== null && 'n' in raw && typeof raw.n === 'number') {
  console.log(raw.n + 1)       // fine
}
\`\`\`

That is deliberately tedious, and the tedium is the point: it marks every place data crossed a boundary without being validated. In real code a schema validator or a single hand-written predicate hides it behind one call — but the \`unknown\` is what forced the validator to exist.

## never

The empty set, and you meet it in three places: the return type of a function that never returns normally, the residual type after exhaustive narrowing, and the result of an impossible intersection.

\`\`\`ts
function fail(msg: string): never { throw new Error(msg) }

type A = string | never   // string — a union with the empty set adds nothing
type B = string & never   // never  — an intersection with it shares nothing
\`\`\`

A \`never\` return is information control-flow analysis uses: a branch ending in \`fail()\` counts as a terminated path, which is why it works as a switch default. A parameter typed \`never\` makes a function uncallable, and a variable typed \`never\` can never be assigned.

One trap for later: testing \`T extends never\` does not work, because a conditional over \`never\` has no members to distribute across and returns \`never\` without evaluating either branch. \`[T] extends [never]\` is the working form.

## Assertions: what \`as\` can and cannot do

\`as\` changes what the compiler believes and never what exists. It is also not unrestricted — TypeScript only permits an assertion between types where one is assignable to the other.

\`\`\`ts
const s = 'x'
// const n = s as number           // Error 2352: neither type sufficiently overlaps
const n = s as unknown as number   // permitted, and a lie
\`\`\`

The double assertion is the deliberate escape hatch: two legal steps in a row, up to the top type and back down. Every time you write one you have accepted responsibility for something the compiler cannot see, so the honest form carries a comment saying why.

The three places \`as\` most often lies in practice are \`as SomeInterface\` on parsed JSON, \`as HTMLInputElement\` on a \`querySelector\` result, and \`as any\` to silence a stubborn error. All three compile; all three can crash.

## The \`!\` operator

\`x!\` is shorthand for \`x as NonNullable<typeof x>\` — a null check you promise to have already done. It emits nothing whatsoever:

\`\`\`ts
const el = document.getElementById('app')!
el.append('hi')   // TypeError at runtime if that element is not there
\`\`\`

\`?.\` is the runtime-checked alternative; \`!\` is a compile-time-only claim. A useful rule of thumb for the four: \`any\` only for code you have not typed yet, \`unknown\` at every boundary, \`never\` as a proof, and \`as\` only with a reason you could defend out loud.`,
      questions: [
        {
          prompt: 'JSON.parse returns any. What changes if you immediately annotate the result as unknown instead?',
          options: [
            'The parse call now throws on malformed input instead of returning a value',
            'Property access still compiles, but the results are typed unknown',
            'Every use has to narrow first, so the missing validation becomes visible',
            'The compiler infers a shape from the literal you compare it against'
          ],
          correct: 2,
          explain: 'unknown blocks member access until a guard narrows it, while any permits it silently — which is how a typo like profile.nmae survives compilation and fails at runtime.'
        },
        {
          prompt: 'Why does `"x" as number` fail while `"x" as unknown as number` compiles?',
          options: [
            'as only allows a widening or narrowing step, and unknown provides one of each',
            'The first form performs a real conversion, while the second only relabels the value',
            'Assertions to primitives are banned, and unknown is not a primitive',
            'unknown is any in disguise, so the compiler skips the check entirely'
          ],
          correct: 0,
          explain: 'An assertion is permitted only between types where one is assignable to the other. Routing through unknown gives two legal steps in sequence, which is why the double assertion is the escape hatch.'
        },
        {
          prompt: 'What does the non-null assertion in `document.getElementById("app")!` emit?',
          options: [
            'A generated throw that reports a clearer message than the later property access',
            'Nothing at all: it is erased, so a missing element still fails at runtime',
            'An implicit optional chain, turning later accesses into undefined',
            'A cast that returns a default object when the lookup misses'
          ],
          correct: 1,
          explain: 'The operator is compile-time only. It removes null and undefined from the type and leaves the emitted JavaScript untouched, so keeping the promise is entirely up to you.'
        },
        {
          prompt: 'What are `string | never` and `string & never`?',
          options: [
            'never and never — the empty set wins in both operations',
            'string and string — never is ignored wherever it appears',
            'unknown and never, because a union always widens toward the top type',
            'string and never — an empty set adds no members and shares none'
          ],
          correct: 3,
          explain: 'Union is set union, so adding the empty set changes nothing. Intersection is set intersection, and nothing overlaps with an empty set, which is why an impossible intersection collapses.'
        },
        {
          prompt: 'A helper is declared `function fail(msg: string): never`. What does that tell a caller?',
          options: [
            'It returns undefined, so its result can be ignored without a diagnostic',
            'It never returns normally, so code after a call to it is unreachable',
            'It may return any type, since never is assignable to all of them',
            'It must be awaited before the narrowed value becomes usable downstream'
          ],
          correct: 1,
          explain: 'A never return means the function throws or loops forever. Control-flow analysis treats a branch ending in such a call as terminated, which is what makes it work in a switch default.'
        }
      ]
    },
    {
      key: 'generics',
      title: 'Generics: constraints, inference and const parameters',
      body: `# A type parameter is a wire, not a placeholder

The point of \`<T>\` is not "any type" — it is a **link between positions**. \`(x: any) => any\` throws away the relationship between the argument and the result; \`<T>(x: T) => T\` states that whatever went in is what comes back, and every caller gets that guarantee for free.

\`\`\`ts
function first<T>(xs: readonly T[]): T | undefined { return xs[0] }

const n = first([1, 2, 3])   // number | undefined
const s = first(['a'])       // string | undefined
\`\`\`

Nothing was annotated at those call sites: \`T\` is **inferred from the arguments**. That is the normal mode. An explicit \`first<number>([...])\` is the fallback for when inference has nothing to work from, and needing it often is a hint the signature is wrong.

## Constraints

\`T extends X\` says "T is at least an X", which both unlocks member access inside the body and rejects bad callers.

\`\`\`ts
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]
}

const id = pluck({ id: 1, name: 'a' }, 'id')   // number, not number | string
// pluck({ id: 1 }, 'nope')                    // Error: not assignable to 'id'

// constraints also change inference: without one, a literal at a nested
// inference site widens
declare function boxA<T>(o: { v: T }): T
declare function boxB<T extends string>(o: { v: T }): T

const a = boxA({ v: 'x' })   // string
const b = boxB({ v: 'x' })   // 'x'
\`\`\`

\`K extends keyof T\` paired with the indexed access \`T[K]\` is the most reused generic pattern in the language, and it is worth being able to write from memory. A constraint that mentions a literal-friendly type is also how you tell the compiler that literal types are wanted here rather than their widened forms.

## Defaults

\`<T = string>\` supplies a type argument when neither inference nor an explicit argument does. It earns its keep on generic *types* — a props interface where most users never care about the parameter — and is rare on functions, where inference usually gets there first.

## Generic functions versus generic types

Where the angle brackets sit changes the meaning entirely:

\`\`\`ts
type Mapper<T> = (x: T) => T      // a family of types; T is fixed at Mapper<number>
type AnyMapper = <T>(x: T) => T   // one type; T is fixed when the value is called
\`\`\`

The first cannot be used without a type argument. The second is a single type describing a function that works for every \`T\`, so \`const identity: AnyMapper = (x) => x\` typechecks and stays generic at each call. Passing a generic function as an argument keeps its parameters open until the callee calls it.

## const type parameters, since TS 5.0

Before 5.0, preserving literal and tuple-ness meant writing \`as const\` at every call site. The \`const\` modifier moves that decision to the declaration, where the library author can make it once:

\`\`\`ts
declare function route<const T extends readonly string[]>(parts: T): T

const r = route(['users', 'id'])   // readonly ['users', 'id']
\`\`\`

Drop the \`const\` and the same call infers \`string[]\`. It affects inference only — nothing is frozen at runtime, and an argument that is already a mutable array keeps its mutable type.

## The single-use parameter smell

A type parameter that appears exactly once in a signature carries no information. \`declare function parse<T>(text: string): T\` is an assertion in generic clothing: nothing constrains \`T\`, so the caller names a type and is simply believed — the same trust level as \`as T\`, with better camouflage. Return \`unknown\` and make the caller narrow.`,
      questions: [
        {
          prompt: 'What does `<T>(xs: T[]) => T | undefined` express that `(xs: any[]) => any` cannot?',
          options: [
            'That the argument is checked at runtime before the element is returned',
            'That the function body is forbidden from touching the elements it holds',
            'That whatever element type goes in is the same type that comes back out',
            'That callers must supply the type argument explicitly at each call site'
          ],
          correct: 2,
          explain: 'A type parameter is a relationship between positions. any severs it, so every downstream use of the result goes unchecked, while T carries the caller element type through to the return.'
        },
        {
          prompt: 'In `function pluck<T, K extends keyof T>(obj: T, key: K): T[K]`, what does the return type give you?',
          options: [
            'The exact property type for the key that was actually passed in',
            'The union of every property type in T, narrowed later by the caller',
            'unknown, since K is only known at the call site and not in the body',
            'T itself, because an indexed access preserves the whole object type'
          ],
          correct: 0,
          explain: 'T[K] is an indexed access type: with K inferred as the literal "id", it resolves to that one property type rather than a union across all of them.'
        },
        {
          prompt: 'What does the `const` modifier on a type parameter do, as added in TS 5.0?',
          options: [
            'Freezes the argument at runtime with Object.freeze before the body runs',
            'Infers literal and readonly tuple types as if the caller wrote as const',
            'Requires callers to pass a value declared with const rather than let',
            'Marks the parameter readonly inside the body so it cannot be reassigned'
          ],
          correct: 1,
          explain: 'It changes inference only: route(["a","b"]) infers readonly ["a","b"] instead of string[]. Nothing is frozen at runtime, and an already-mutable argument keeps its type.'
        },
        {
          prompt: 'Why is `declare function parse<T>(text: string): T` a poor signature?',
          options: [
            'T cannot appear only in return position, so it fails to compile',
            'The compiler infers T as never and every call breaks downstream',
            'It forces callers to spell out parse<Foo>(...) at every single call site',
            'Nothing constrains T, so the caller names a type and is believed'
          ],
          correct: 3,
          explain: 'A type parameter used in exactly one position carries no information — it is an assertion wearing generic syntax. Returning unknown makes the caller narrow instead of guess.'
        }
      ]
    },
    {
      key: 'mapped-conditional',
      title: 'Mapped and conditional types',
      body: `# Two constructs cover almost all type-level code

A **mapped type** transforms every key of an object type. A **conditional type** branches on an assignability test. Nearly everything in \`lib.d.ts\` and in the type-heavy libraries is those two, composed.

## Mapped types

\`\`\`ts
type Mutable<T> = { -readonly [K in keyof T]: T[K] }
type Loosen<T>  = { [K in keyof T]?: T[K] }
type Tighten<T> = { [K in keyof T]-?: T[K] }
\`\`\`

The \`+\` and \`-\` prefixes add or remove the \`readonly\` and \`?\` modifiers; a bare \`?\` means \`+?\`. A mapped type written directly over \`keyof T\` is **homomorphic**: it walks T's own keys, *preserves* the modifiers it did not explicitly change, and maps arrays and tuples to arrays and tuples instead of flattening them into objects. Break that shape — \`{ [K in keyof T | 'extra']: ... }\` — and you lose all three properties at once. \`Partial\`, \`Required\`, \`Readonly\`, \`Pick\` and \`Record\` are each a four-line mapped type.

## Key remapping with \`as\`, since TS 4.1

\`\`\`ts
type Getters<T> = {
  [K in keyof T & string as \`get\${Capitalize<K>}\`]: () => T[K]
}
// Getters<{ id: number }> is { getId: () => number }

// alongside renaming, remapping filters: a key mapped to never is dropped
type StringKeys<T> = { [K in keyof T as T[K] extends string ? K : never]: T[K] }
// StringKeys<{ id: number; name: string }> is { name: string }
\`\`\`

The \`& string\` in the first is needed because \`keyof T\` may include symbols, which cannot go inside a template literal.

## Conditional types

\`A extends B ? X : Y\` is an assignability question, evaluated lazily — it stays unresolved while any part of it is still a type variable.

\`\`\`ts
type ElementOf<T> = T extends readonly (infer E)[] ? E : never
type Unwrapped = ElementOf<string[]>   // string
\`\`\`

\`infer E\` introduces a fresh type variable bound by the match — pattern matching for types. It is in scope only in the true branch, and it is how \`ReturnType\`, \`Parameters\` and \`Awaited\` are written.

## Distribution, the rule that surprises everyone

When the checked type is a **naked** type parameter and it is instantiated with a union, the conditional distributes: it splits the union, evaluates each member separately, and re-unions the results.

\`\`\`ts
type IsArray<T> = T extends unknown[] ? 'yes' : 'no'

type R = IsArray<string[] | number>   // 'yes' | 'no', not 'no'
\`\`\`

Most of the time distribution is exactly what you want — it is why \`Exclude<T, U>\` filters a union member by member rather than comparing the whole thing. When it is not what you want, wrap both sides so the checked type is no longer naked:

\`\`\`ts
type IsArrayStrict<T> = [T] extends [unknown[]] ? 'yes' : 'no'
type R2 = IsArrayStrict<string[] | number>   // 'no'

type IsNever<T> = [T] extends [never] ? true : false
\`\`\`

That second line is also the only reliable never test. A distributive conditional applied to \`never\` has no union members to iterate, so it short-circuits to \`never\` without ever evaluating a branch — \`T extends never ? true : false\` returns \`never\`, not \`true\`.`,
      questions: [
        {
          prompt: 'For `type IsArray<T> = T extends unknown[] ? "yes" : "no"`, what is IsArray<string[] | number>?',
          options: [
            '"no", because the union as a whole is not an array type',
            '"yes", because at least one member of the union satisfies it',
            '"yes" | "no", because the check runs once per union member',
            'never, because a union cannot be tested against a single constraint'
          ],
          correct: 2,
          explain: 'A naked type parameter makes the conditional distributive: it splits the union, evaluates each member and unions the results. That is why library types often wrap the check in a tuple.'
        },
        {
          prompt: 'How do you make a conditional type test a union as one whole type?',
          options: [
            'Add a constraint, as in T extends unknown[] & object ? ... : ...',
            'Wrap both sides in a one-element tuple: [T] extends [unknown[]]',
            'Mark the parameter const so the union is treated as one literal',
            'Instantiate through a helper alias, which evaluates it eagerly'
          ],
          correct: 1,
          explain: 'Distribution happens only when the checked type is a bare type parameter. Any wrapper removes that, and the tuple is the conventional one because it adds no other behaviour.'
        },
        {
          prompt: 'In `{ [K in keyof T as T[K] extends string ? K : never]: T[K] }`, what does the never do?',
          options: [
            'Types the value of every non-string property as never',
            'Raises a compile error for any property that is not a string',
            'Makes the whole mapped type never if any key fails the check',
            'Drops that key from the result, which is the filter idiom'
          ],
          correct: 3,
          explain: 'A key remapped to never is omitted from the mapped type. Combined with a conditional, that is how library types filter properties by their value type.'
        },
        {
          prompt: 'Why does `type Same<T> = { [K in keyof T]: T[K] }` keep the readonly and optional markers of T?',
          options: [
            'It is homomorphic — mapping straight over keyof T carries the modifiers',
            'Modifiers live on the key names, so any mapping copies them along',
            'The compiler re-adds them whenever the value types are left unchanged',
            'Readonly and optional are inherited from T by structural assignability'
          ],
          correct: 0,
          explain: 'Mapped types written directly over keyof T are treated as homomorphic: they preserve modifiers and map arrays to arrays. Adding keys to the constraint breaks that form.'
        },
        {
          prompt: 'What does `infer E` do in `T extends readonly (infer E)[] ? E : never`?',
          options: [
            'Declares E up front and checks that T is exactly readonly E[]',
            'Binds E to whatever the pattern matched, for use in the true branch',
            'Widens the element type of T so both branches return the same thing',
            'Forces the compiler to evaluate the conditional before instantiation'
          ],
          correct: 1,
          explain: 'infer introduces a fresh type variable filled in by the match, in scope only in the true branch. ReturnType, Parameters and Awaited are all built exactly this way.'
        }
      ]
    },
    {
      key: 'keyof-indexed-template',
      title: 'keyof, typeof, indexed access and template literals',
      body: `# Moving between the value world and the type world

Values and types live in separate namespaces — you can have a \`const Route\` and a \`type Route\` in one file without a collision. Four operators cross between them, and once they are familiar most "how do I say that in types" questions answer themselves.

## typeof in type position

\`\`\`ts
const DEFAULTS = { retries: 3, mode: 'fast' }
type Defaults = typeof DEFAULTS   // { retries: number; mode: string }
\`\`\`

This is not JavaScript's \`typeof\`; it is the type query operator, and it only appears where a type is expected. Deriving the type from the value is what stops the two drifting apart, and it is why so much of a well-typed codebase reads bottom-up: write the data, derive the type.

## keyof

\`keyof T\` is the union of T's keys as literal types.

\`\`\`ts
type K = keyof { a: number; b: string }   // 'a' | 'b'
\`\`\`

Two results worth memorising because they look wrong the first time. \`keyof any\` is \`string | number | symbol\`. And an index signature answers with its own key type plus \`number\`: \`keyof { [k: string]: number }\` is \`string | number\`, because an object indexed by strings is also indexable by numbers — JavaScript coerces the number to a string on the way in.

## Indexed access

\`T[K]\` looks up a property *type*, K may itself be a union, and for arrays and tuples \`number\` is a valid key.

\`\`\`ts
const ROUTES = ['home', 'search', 'settings'] as const
type Route = (typeof ROUTES)[number]   // 'home' | 'search' | 'settings'
\`\`\`

That three-token idiom — the value, \`typeof\`, then \`[number]\` — turns a single \`as const\` array into both the runtime list you iterate and the union you type against. Write the list once, use it twice, and a new entry updates both. The parentheses are optional but make the precedence obvious to a reader.

## Template literal types, since TS 4.1

\`\`\`ts
type Route = 'home' | 'search'
type Handler = \`on\${Capitalize<Route>}\`   // 'onHome' | 'onSearch'
type Hex = \`#\${string}\`
\`\`\`

They cross-multiply over the unions they interpolate, so two four-member unions produce sixteen types — cheap to write, easy to overdo. \`Capitalize\`, \`Uncapitalize\`, \`Uppercase\` and \`Lowercase\` are compiler intrinsics rather than ordinary library types. Beyond generating names, a template literal type constrains a plain string by shape: a parameter typed \`\`#\${string}\`\` rejects \`'red'\`.

## satisfies on a lookup table, since TS 4.9

The old dilemma with a config object: annotate it and you get key checking but lose the specific types; leave it bare and you keep the types but nothing checks the table.

\`\`\`ts
const withAnn: Record<string, number> = { a: 1, b: 2 }
withAnn.typo        // compiles — Record<string, number> says every key is fine

const table = { a: 1, b: 2 } satisfies Record<string, number>
table.typo          // Error 2339: not a known property
type Keys = keyof typeof table   // 'a' | 'b'
\`\`\`

\`satisfies\` checks the expression against the type and then **discards the annotation**, leaving the inferred type in place. It is the right tool for configuration objects, route maps and colour palettes.

One nuance: the target acts as a contextual type, so a literal is preserved when the target admits literals. \`{ home: '/' } satisfies Record<string, \`/\${string}\`>\` keeps \`home\` at \`'/'\`, while \`satisfies Record<string, string>\` widens it to \`string\`.`,
      questions: [
        {
          prompt: 'For `const ROUTES = ["home","search"] as const`, what does `type Route = (typeof ROUTES)[number]` produce?',
          options: [
            'number, since that is the key type used in the lookup',
            'The union "home" | "search", read out of the tuple element types',
            'readonly ["home", "search"], the tuple type itself unchanged',
            'string, because an indexed access widens literal types on the way out'
          ],
          correct: 1,
          explain: 'Indexing a tuple type by number yields the union of its element types, and as const kept those elements literal. The list is written once and serves both runtime and types.'
        },
        {
          prompt: 'A table is written `const t = { a: 1, b: 2 } satisfies Record<string, number>`. What does that give you over the annotation `const t: Record<string, number>`?',
          options: [
            'Key typos are caught later, because keyof typeof t stays "a" | "b"',
            'The values become readonly, so a later mutation is rejected',
            'The check is deferred to first use rather than the declaration',
            'Extra keys are permitted, since satisfies is a one-way constraint'
          ],
          correct: 0,
          explain: 'satisfies validates against the type and then discards it, leaving the inferred literal shape. An annotation replaces the type, so the exact key set is lost and t.typo compiles.'
        },
        {
          prompt: 'What is `keyof { [k: string]: number }`?',
          options: [
            'never, because no concrete keys are declared',
            'string on its own, matching the declared index signature exactly',
            'unknown, because the set of keys is not statically known at all',
            'string | number — number keys coerce to strings'
          ],
          correct: 3,
          explain: 'A string index signature also accepts numeric indexing, because JavaScript converts the number to a string. That is the same reason keyof any is string | number | symbol.'
        },
        {
          prompt: 'When Route is "home" | "search", what does the template literal type `on${Capitalize<Route>}` produce?',
          options: [
            'A string type that any value starting with "on" satisfies',
            'A validation error, since Capitalize needs a single literal',
            'The union "onHome" | "onSearch", one member per Route member',
            'A function type keyed by the route it handles at runtime'
          ],
          correct: 2,
          explain: 'Template literal types distribute over the unions they interpolate, producing one member per combination, and Capitalize is a compiler intrinsic applied to each literal.'
        }
      ]
    },
    {
      key: 'utility-satisfies-const',
      title: 'Utility types, satisfies, as const and branding',
      body: `# The standard library is not magic

Every utility type is a mapped or conditional type you could have written yourself. Reading four of them is worth more than memorising the list:

\`\`\`ts
type Partial<T>    = { [K in keyof T]?: T[K] }
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
type Exclude<T, U> = T extends U ? never : T
type ReturnType<T extends (...a: any) => any> =
  T extends (...a: any) => infer R ? R : any
\`\`\`

## The ones with sharp edges

- \`Pick<T, K>\` constrains K to \`keyof T\`, so a misspelled key is an error. **\`Omit<T, K>\` does not** — its key parameter is \`keyof any\`, so \`Omit<User, 'nmae'>\` compiles and silently removes nothing. Rename a field and every \`Omit\` naming it goes quietly stale. The looseness is deliberate (it lets \`Omit\` work over unions), but it is worth knowing.
- \`Exclude\` and \`Extract\` are distributive conditionals: they operate member by member over a union.
- \`Required<T>\` strips \`?\` and the \`undefined\` that \`?\` implied, but a property declared \`b: string | undefined\` keeps its \`undefined\` — it was never optional.
- \`ReturnType\` and \`Parameters\` of an **overloaded** function resolve to the *last* overload only. Reordering overloads silently changes them.
- \`Awaited<T>\` (TS 4.5) unwraps recursively and handles thenables, where a hand-rolled \`T extends Promise<infer U> ? U : T\` stops after one layer.
- \`Record<K, V>\` with \`K = string\` produces an index signature; with a literal union it produces exactly those keys and then demands all of them, which is the cheapest way to get exhaustiveness on a lookup table.

## as const

An \`as const\` assertion does three things to a literal expression at once: string and number literals keep their literal types, every property becomes \`readonly\`, and array literals become readonly tuples.

\`\`\`ts
const cfg = { mode: 'fast', tags: ['a', 'b'] } as const
// { readonly mode: 'fast'; readonly tags: readonly ['a', 'b'] }

// cfg.tags.push('c')   // Error 2339: 'push' does not exist on a readonly tuple
\`\`\`

It is purely type-level — no \`Object.freeze\` is emitted, so a determined \`as any\` still mutates the object at runtime. Treat it as the default for any table that is data rather than state.

## Three tools, three jobs

- An **annotation** says "this variable is this type", and widens the value to it.
- **\`as const\`** says "read this literal as exactly what it says".
- **\`satisfies\`** says "check this against that type, but keep the inferred one".

They compose, and the combination is the one you want for a complete lookup table: \`{ ... } as const satisfies Record<Route, string>\` gives literal value types *and* a compile error the day a new Route has no entry.

## Branded types

Because the system is structural, \`type UserId = string\` prevents nothing at all — every string is a UserId. Intersect an unforgeable member into it and the alias becomes nominal in practice:

\`\`\`ts
declare const brand: unique symbol
type UserId = string & { readonly [brand]: 'UserId' }

const asUserId = (s: string): UserId => s as UserId
declare function loadUser(id: UserId): void

loadUser(asUserId('u1'))   // fine
// loadUser('u1')          // Error 2345: 'string' is not assignable to 'UserId'
\`\`\`

A \`UserId\` is still an ordinary string once emitted — \`.toUpperCase()\` works, \`JSON.stringify\` writes a string — because the brand exists only in the type. The single \`as\` inside \`asUserId\` is the one place the invariant is asserted, and every other call site is checked for free. Worth the ceremony for ids, currency amounts, already-escaped HTML and validated paths — anywhere two values share a runtime type and must never be swapped.`,
      questions: [
        {
          prompt: 'Why does `Omit<User, "nmae">` compile without complaint while `Pick<User, "nmae">` errors?',
          options: [
            'Omit runs after the mapped type expands, so the key check is skipped',
            'Omit reports the typo only when the resulting type is actually used',
            'Omit constrains its key parameter to keyof any rather than keyof T',
            'Pick is a compiler intrinsic and Omit is an ordinary type alias'
          ],
          correct: 2,
          explain: 'The looseness lets Omit work over unions, but it means a renamed field leaves every stale Omit compiling and removing nothing at all.'
        },
        {
          prompt: 'A function has two overload signatures. What is ReturnType<typeof fn>?',
          options: [
            'A union of the return types of every declared overload',
            'The return type of the implementation signature body',
            'An error, since an overloaded function has no single type',
            'The return type of the last overload in declaration order'
          ],
          correct: 3,
          explain: 'Conditional inference against an overloaded signature picks the last one, so reordering overloads silently changes ReturnType and Parameters.'
        },
        {
          prompt: 'What does `as const` do to `{ mode: "fast", tags: ["a"] }`?',
          options: [
            'Literal types, readonly properties, and a readonly tuple for the array',
            'Deep-freezes the object at runtime, so any later mutation throws an error',
            'Marks the binding const, which a const declaration already does',
            'Widens the members so the object matches more annotations later on'
          ],
          correct: 0,
          explain: 'It is a type-level assertion only: literals stay literal, properties gain readonly and arrays become tuples. No Object.freeze is emitted, so mutation still succeeds at runtime.'
        },
        {
          prompt: 'Why prefer Awaited<T> (TS 4.5) over a hand-written `T extends Promise<infer U> ? U : T`?',
          options: [
            'Awaited additionally rejects a value that is not thenable at compile time',
            'Awaited unwraps recursively and handles thenables, not just one layer',
            'Awaited resolves at runtime, so it works with dynamic imports too',
            'The hand-written form loses the type entirely for a non-promise T'
          ],
          correct: 1,
          explain: 'A nested promise is unwrapped all the way down, matching what await really does, and custom thenables are covered. The single-level conditional stops at the first Promise.'
        },
        {
          prompt: 'A branded `type UserId = string & { readonly [brand]: "UserId" }` gives you what at runtime?',
          options: [
            'A wrapper object with the brand stored on a symbol key',
            'A frozen string subclass that rejects unbranded assignment',
            'A plain string — the brand exists only in the type system',
            'A proxy that validates on access, so misuse throws early'
          ],
          correct: 2,
          explain: 'Intersecting an unforgeable member makes the alias nominal for the checker, but nothing is emitted. String methods and JSON.stringify behave exactly as on the underlying string.'
        }
      ]
    },
    {
      key: 'functions-variance',
      title: 'Function types, overloads and variance',
      body: `# Functions are where the type system makes its compromises

## Parameter counts

A function that takes fewer parameters is assignable where one taking more is expected. That is why \`[1, 2].map((x) => x * 2)\` compiles even though \`map\` passes three arguments to its callback — ignoring trailing arguments is ordinary JavaScript, so the type system allows it. The reverse is rejected: a callback needing an argument the caller never supplies would read \`undefined\`.

## Variance, the short version

To be sound, a function type is **covariant in its return type** (returning a Dog where an Animal was promised is fine) and **contravariant in its parameters** (a handler accepting any Animal can stand in for an Animal handler; one insisting on a Dog cannot, because the caller may pass a Cat).

\`\`\`ts
declare let f: (x: Animal) => void
declare let g: (x: Dog) => void

f = g   // Error under strictFunctionTypes: f's caller may pass a Cat
g = f   // fine: accepting more than required is safe
\`\`\`

## The method exception

\`strictFunctionTypes\` (part of \`strict\`) turns that contravariant check on — but **only for function-type positions, never for members written with method syntax**. Methods stay **bivariant**, meaning either direction is accepted.

\`\`\`ts
interface Store     { set(x: Animal): void }        // method syntax — bivariant
interface StoreProp { set: (x: Animal) => void }    // property syntax — checked

declare const dogStore: { set(x: Dog): void }

const a: Store = dogStore       // accepted
// const b: StoreProp = dogStore // Error 2322
\`\`\`

That is not an oversight. \`Array<T>\` and most of the DOM would be unusable under a strictly sound rule — \`push\`, \`concat\` and every comparison callback depend on the looser one — so the line was drawn at declaration syntax. The practical consequence is a choice you make per member: write a callback as a **property** to get the stricter check, or as a **method** to opt out.

## Arrays are covariant, and that is unsound

\`\`\`ts
declare const dogs: Dog[]
const animals: Animal[] = dogs   // accepted
animals.push({ kind: 'cat' })    // accepted — dogs now contains a cat
\`\`\`

Everybody knows this is a hole; it survives because closing it would break an enormous amount of working code. \`readonly T[]\` is the sound direction: a mutable \`T[]\` is assignable to \`readonly T[]\`, never the reverse (error 4104), and a readonly parameter type states that the function will not push. Prefer \`readonly T[]\` on every parameter you do not mutate — it costs nothing and it is the only variance guarantee you actually get from arrays.

## Overloads

\`\`\`ts
function parse(v: string): number
function parse(v: number): string
function parse(v: string | number): string | number {
  return typeof v === 'string' ? Number(v) : String(v)
}

declare const mixed: string | number
// parse(mixed)   // Error 2769: No overload matches this call
\`\`\`

The implementation signature is invisible to callers. A call has to match one single overload — no union of them is formed — even though the implementation plainly handles both. Resolution picks the *first* matching signature, so order from most specific to least, and prefer a union parameter or a generic whenever the relationship can be expressed directly: overloads share no inference between arms and every added pair doubles the maintenance.

## Typing \`this\`

A fake first parameter named \`this\` types the receiver and occupies no runtime slot:

\`\`\`ts
function reset(this: HTMLInputElement) { this.value = '' }

// reset()                              // Error 2684: 'this' context of type 'void'
el.addEventListener('click', reset)     // fine
\`\`\`

\`ThisParameterType\` and \`OmitThisParameter\` read it back off a function type, and \`strictBindCallApply\` makes \`bind\`, \`call\` and \`apply\` check both the receiver and the arguments instead of accepting anything.`,
      questions: [
        {
          prompt: 'Under strict mode, `const s: { set(x: Animal): void } = dogStore` is accepted while the same member written `set: (x: Animal) => void` is rejected. Why?',
          options: [
            'Method calls are dispatched dynamically, so the check has to be deferred',
            'strictFunctionTypes checks function properties only; methods stay bivariant',
            'A method is implicitly generic over its own receiver, so the parameter is free',
            'The property form adds a this parameter that fails to line up here'
          ],
          correct: 1,
          explain: 'The exemption is deliberate, since Array and the DOM depend on bivariant methods. Declaring a callback as a property is how you opt into the sound contravariant check.'
        },
        {
          prompt: 'Which assignment between `number[]` and `readonly number[]` is legal?',
          options: [
            'Mutable to readonly, since dropping the mutating methods is safe',
            'Readonly to mutable, since readonly is only advisory to the reader',
            'Both, because readonly is erased before assignability is computed',
            'Neither, because the two are unrelated types in the array hierarchy'
          ],
          correct: 0,
          explain: 'readonly T[] has fewer members, so a mutable array satisfies it. The other direction would hand a push method to code that promised not to mutate, and it fails with error 4104.'
        },
        {
          prompt: 'Assigning a `Dog[]` to an `Animal[]` is accepted. What is the consequence?',
          options: [
            'The elements are copied, so the original array cannot be affected',
            'Reads stay sound and writes are rejected through the widened reference',
            'The array is narrowed back to Dog[] at the first push call',
            'A Cat can be pushed into what is still, at runtime, an array of dogs'
          ],
          correct: 3,
          explain: 'Array covariance is a known unsoundness kept for practicality. Typing a parameter readonly T[] wherever you only read is the everyday defence against it.'
        },
        {
          prompt: 'With overloads declared for (v: string) and (v: number), why does a call with a `string | number` argument fail?',
          options: [
            'Union arguments require an explicit type argument at the call site',
            'The overloads are tried in reverse order and the last one wins',
            'Callers only see the overload list; the implementation signature is hidden',
            'The compiler cannot work out which branch the implementation would take at runtime'
          ],
          correct: 2,
          explain: 'A call must match one single overload, and no union of them is formed. That is the main argument for a union parameter or a generic instead of an overload pair.'
        },
        {
          prompt: 'What is the `this` parameter in `function reset(this: HTMLInputElement) { ... }`?',
          options: [
            'A type-only first parameter, erased at emit, that types the receiver',
            'A genuine first argument that every caller has to pass in',
            'A binding created by the compiler, equivalent to a bind call',
            'A decorator-style hint that only applies when noImplicitThis is switched off'
          ],
          correct: 0,
          explain: 'It occupies no runtime slot — the emitted function has zero parameters. It makes a standalone reset() an error while keeping the same function valid as an event handler.'
        }
      ]
    },
    {
      key: 'modules-declarations',
      title: 'Modules, type-only imports and declaration files',
      body: `# What makes a file a module

A file with a top-level \`import\` or \`export\` is a module, and its declarations are local to it. A file without either is a **script**, and everything it declares lands in the global scope — which is how an innocuous file of helpers starts colliding with \`lib.d.ts\`. The one-line fix, and the standard idiom when all you want is the scoping, is \`export {}\`.

## ESM and CJS

TypeScript checks against \`module\` and \`moduleResolution\` rather than guessing. The pieces worth knowing:

- \`esModuleInterop\` makes \`import fs from 'fs'\` work against a CommonJS module by emitting a small helper. \`allowSyntheticDefaultImports\` only silences the type error and emits nothing, so it suits a bundler that already does the interop.
- \`import x = require('x')\` and \`export =\` are the CommonJS-flavoured syntax, and they are illegal in a file the compiler considers ESM.
- Under Node's ESM rules (\`module: nodenext\`) a relative import needs its runtime extension — \`./x.js\` even when the source is \`x.ts\`. Under \`moduleResolution: bundler\` (TS 5.0) it does not, because a bundler resolves it; that mode exists for Vite and esbuild projects, and it honours \`package.json\` \`exports\` maps as well.

## import type

\`\`\`ts
import type { Config } from './config'
import { type Options, load } from './loader'   // inline form, since TS 4.5
\`\`\`

A type-only import is **guaranteed** to be erased, and that guarantee earns its keep three ways: it stops a module being loaded at runtime purely for a type (which can drag in a whole library or fire a side effect), it breaks a runtime import cycle while keeping the type link intact, and in a split process — main versus renderer in an Electron app — it stops one side accidentally bundling the other.

## verbatimModuleSyntax, since TS 5.0

It replaces \`importsNotUsedAsValues\` and \`preserveValueImports\` with one rule: **imports and exports are emitted exactly as written, minus anything marked \`type\`**. So importing a type without the keyword is now an error — *"'Config' is a type and must be imported using a type-only import"* (TS1484) — re-exporting one needs \`export type\` (TS1205), and \`import =\`/\`export =\` are rejected in ESM files. The payoff is that what you read is what is emitted, with no elision guesswork.

\`isolatedModules\` asks for something adjacent: every file must be transpilable **alone**, the way esbuild and SWC do it. It bans the same untyped re-export, and it forbids reading an *ambient* \`const enum\` declared in another file (TS2748), because a single-file transpiler cannot see the values to inline.

## Declaration files

A \`.d.ts\` file holds types and no implementations. Three jobs come up repeatedly:

\`\`\`ts
// 1. describe an untyped package
declare module 'legacy-widget' {
  export function mount(el: HTMLElement): void
}

// 2. augment an existing module — this file must itself be a module
import 'some-lib'
declare module 'some-lib' {
  interface Options { extra?: boolean }
}

// 3. add to the global scope from inside a module
export {}
declare global {
  interface Window { api: NaviApi }
}
\`\`\`

Augmentation rides entirely on **interface declaration merging**: two interfaces with the same name in the same scope combine into one. A \`type\` alias cannot merge — it may only be declared once — so a library that exports its options as a type alias offers no seam to extend at all. And \`declare global\` in a script file fails with error 2669, *"augmentations for the global scope can only be directly nested in external modules or ambient module declarations"*, which is the error that \`export {}\` exists to fix.`,
      questions: [
        {
          prompt: 'What does `import type { Config } from "./config"` guarantee beyond documenting intent?',
          options: [
            'That Config is checked more strictly than an ordinary value import would be',
            'That the module is loaded once and cached for later value imports',
            'That circular imports are resolved by deferring the module body',
            'That the import is erased, so the module is never loaded at runtime'
          ],
          correct: 3,
          explain: 'Erasure is the guarantee. It keeps a type-only dependency from pulling a library or a side effect into the bundle, and it breaks a runtime import cycle without losing the type link.'
        },
        {
          prompt: 'What does verbatimModuleSyntax (TS 5.0) require of you?',
          options: [
            'Marking type imports with type, since the rest is emitted as written',
            'Writing an explicit file extension on every relative import path',
            'Using import equals require syntax in any file that targets CommonJS',
            'Compiling each file alone, without cross-file const enum access'
          ],
          correct: 0,
          explain: 'It replaced importsNotUsedAsValues and preserveValueImports with one rule: what is written is emitted, minus anything marked type. An unmarked type import becomes error 1484.'
        },
        {
          prompt: 'Adding a property to Window via `declare global` fails with error 2669 in a helper file. What fixes it?',
          options: [
            'Renaming the file to a .d.ts, which makes globals legal there',
            'Wrapping the block in declare module "global" instead of declare global',
            'Adding export {} so the file counts as a module rather than a script',
            'Moving the interface above every import in the same file'
          ],
          correct: 2,
          explain: 'Global augmentation is only allowed inside a module or an ambient module declaration. A file with no top-level import or export is a script, whose declarations are already global.'
        },
        {
          prompt: 'Why can a library only be augmented if it exports its options as an interface?',
          options: [
            'Type aliases are erased earlier, before augmentation is applied',
            'Augmentation works by declaration merging, and aliases do not merge',
            'Aliases are not exported by declaration files, only interfaces are',
            'A type alias is nominal, so a second declaration is a name conflict'
          ],
          correct: 1,
          explain: 'Two interfaces with the same name in the same scope combine into one. A type alias may be declared only once, so it offers nothing to merge against.'
        },
        {
          prompt: 'What does isolatedModules forbid that a whole-program compile allows?',
          options: [
            'Importing a value and a type from the same module in one statement',
            'Declaring an interface and a class with the same name in one file',
            'Re-exporting a value under a new name from a barrel',
            'Reading an ambient const enum that is declared in another file'
          ],
          correct: 3,
          explain: 'A single-file transpiler cannot see the enum member values to inline them, so error 2748 is raised. The same flag also demands export type when re-exporting a type.'
        }
      ]
    },
    {
      key: 'tsconfig-strictness',
      title: 'The flags that matter, and what types cannot check',
      body: `# Configuring the checker, and knowing where it stops

## The strict family

\`"strict": true\` is a bundle, not a single switch. It turns on \`noImplicitAny\`, \`strictNullChecks\`, \`strictFunctionTypes\`, \`strictBindCallApply\`, \`strictPropertyInitialization\`, \`noImplicitThis\`, \`useUnknownInCatchVariables\` (TS 4.4) and \`alwaysStrict\`.

\`strictNullChecks\` is the one that changes everything. Without it, \`null\` and \`undefined\` are members of every type, and the compiler is structurally unable to warn you about the single most common runtime error in JavaScript. Migrating an old project one flag at a time is reasonable; leaving that one off is not.

\`useUnknownInCatchVariables\` types a bare \`catch (e)\` as \`unknown\` rather than \`any\`, so \`e.message\` stops compiling — correct, because anything at all can be thrown.

## Worth adding beyond strict

\`noUncheckedIndexedAccess\` adds \`| undefined\` to every array element and index-signature read:

\`\`\`ts
const xs: string[] = ['a']
const first = xs[0]
first.length                     // Error 18048: 'first' is possibly 'undefined'

for (const s of xs) s.length     // iteration is unaffected
const tup: [string, number] = ['a', 1]
tup[0].length                    // tuples keep their exact element types
\`\`\`

It is honest — \`xs[99]\` really is \`undefined\` — and it is noisy. Iteration, destructuring and tuples are unaffected, so the noise concentrates in code doing arithmetic on indices. Worth it on new code, painful to retrofit.

\`exactOptionalPropertyTypes\` separates "absent" from "present and undefined": with it on, \`{ a?: number }\` rejects \`{ a: undefined }\` (error 2375). The distinction matters the moment anything enumerates keys — \`Object.keys\`, a JSON serialiser, a database patch builder all treat the two differently.

\`isolatedModules\` is effectively mandatory with an esbuild or SWC pipeline, and \`moduleResolution: "bundler"\` (TS 5.0) matches how Vite and esbuild actually resolve. \`noImplicitOverride\` and \`noFallthroughCasesInSwitch\` are small, cheap and catch real bugs.

## Erasure: what survives compilation

\`\`\`ts
export interface Gone { a: number }        // emits nothing
export type AlsoGone = string              // emits nothing
export enum Level { Low, High }            // emits an IIFE and a real object
export class Holder {
  constructor(public readonly id: number) {}   // emits a field assignment
}
\`\`\`

Roughly: \`interface\`, \`type\`, \`declare\`, type annotations, \`as\`, \`satisfies\` and \`!\` vanish, while \`enum\`, \`class\`, parameter properties and a value-side \`namespace\` emit code.

The consequences are the ones you actually hit:

- There is no runtime type check anywhere. \`value as Config\` verifies nothing.
- \`instanceof\` works only for classes; there is no \`instanceof SomeInterface\`.
- Type arguments are gone, so a function cannot inspect \`T\`. \`new T()\` is impossible, and a factory must be handed the constructor as a value typed \`new () => T\`.
- Overload signatures do not exist at runtime; one implementation has to sort it out.
- \`satisfies\` and branded types are compile-time claims. A branded \`UserId\` is an ordinary string once emitted.

The rule this leaves you with is worth carrying out of the course: types are a proof about the code you wrote, and say nothing about data arriving from outside it. Every boundary — \`JSON.parse\`, a \`fetch\` response, a database row, an IPC message, \`process.env\` — is where a real validator earns its place, and everything inside those boundaries is what the type system can genuinely guarantee.`,
      questions: [
        {
          prompt: 'What does noUncheckedIndexedAccess change, and is it part of strict?',
          options: [
            'It bans index signatures entirely; it is part of the strict family',
            'It makes out-of-range reads throw; it has been in strict since TS 4.1',
            'It adds undefined to indexed reads; it is separate from strict',
            'It requires a length check before any index; strict implies it'
          ],
          correct: 2,
          explain: 'Element and index-signature reads become T | undefined, which is what they truly are. It sits outside strict because of how much existing code it lights up.'
        },
        {
          prompt: 'With exactOptionalPropertyTypes on, why is `const o: { a?: number } = { a: undefined }` an error?',
          options: [
            'Optional properties are rewritten to required ones under the flag',
            'The flag distinguishes an absent key from a key holding undefined',
            'undefined is no longer assignable to any type once the flag is set',
            'The literal is fresh, so the excess property check rejects the key'
          ],
          correct: 1,
          explain: 'Without the flag the two are interchangeable; with it, ?: means "may be missing" and nothing more. Anything enumerating keys cares about the difference.'
        },
        {
          prompt: 'Which of these leaves code behind in the emitted JavaScript?',
          options: [
            'An interface declaration and its extends clause',
            'A satisfies expression on a config object',
            'A type-only import of a class used as a type',
            'An enum, which becomes a real object at runtime'
          ],
          correct: 3,
          explain: 'enum is the type-system construct that is also a value: it emits an IIFE building a two-way lookup object. Interfaces, satisfies and type-only imports vanish entirely.'
        },
        {
          prompt: 'An IPC payload is read as `const p = msg as UpdatePayload`. What has actually been checked?',
          options: [
            'Nothing at runtime — the assertion is a claim, not a validation',
            'The shape, once, when the first property is accessed on it',
            'The property names, though not their value types, at the assertion site',
            'Everything, provided UpdatePayload has no optional properties'
          ],
          correct: 0,
          explain: 'Assertions are erased along with every other type construct. A boundary carrying data from another process needs a real validator, or the first bad message becomes an undefined property access.'
        },
        {
          prompt: 'Why can a generic function not call `new T()` or test `x instanceof T`?',
          options: [
            'Type parameters are boxed, so the constructor is not reachable',
            'The compiler forbids it to keep inference decidable in all cases',
            'Type arguments are erased, so there is no T left at runtime',
            'T may be an interface, which cannot be instantiated'
          ],
          correct: 2,
          explain: 'Nothing carries a type argument into the emitted code. The usual workaround is to pass the constructor itself as a value parameter typed new () => T.'
        }
      ]
    }
  ]
}
