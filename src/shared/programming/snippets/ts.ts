import type { ProgSnippet } from '../snippets'

// ts snippet deck — one file per language so authors never collide. Rules
// in snippets.ts. Every 'output' entry was executed with esbuild + node on
// the authoring machine; every type-level 'bug' entry was checked with
// `tsc --noEmit --strict` against a scratch file.
export const TS_SNIPPETS: ProgSnippet[] = [
  {
    key: 'ts-var-let-settimeout',
    lang: 'ts',
    kind: 'output',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var', i), 0)
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let', j), 0)
}`,
    prompt: 'What does this print?',
    options: [
      'var 3\nvar 3\nvar 3\nlet 0\nlet 1\nlet 2',
      'var 0\nvar 1\nvar 2\nlet 0\nlet 1\nlet 2',
      'var 3\nvar 3\nvar 3\nlet 2\nlet 2\nlet 2',
      'var 0\nvar 1\nvar 2\nlet 2\nlet 2\nlet 2'
    ],
    correct: 0,
    explain:
      'var is function-scoped, so all three callbacks close over one shared i that has reached 3 by the time they run; let is block-scoped, so each iteration gets its own j.'
  },
  {
    key: 'ts-loose-equality',
    lang: 'ts',
    kind: 'output',
    code: `console.log(0 == '0', 0 === '0')
console.log(false == 'false')
console.log(null == undefined, null === undefined)
console.log('' == 0)`,
    prompt: 'What does this print?',
    options: [
      'true true\nfalse\ntrue false\ntrue',
      'true false\nfalse\ntrue false\ntrue',
      'true false\ntrue\ntrue false\ntrue',
      'true false\nfalse\ntrue true\ntrue'
    ],
    correct: 1,
    explain:
      "== coerces types before comparing so 0=='0' is true, but === never coerces so 0==='0' is false; 'false' converts to NaN (not 0), so false=='false' is false; null==undefined is a special-cased true, but === keeps them distinct."
  },
  {
    key: 'ts-typeof-null',
    lang: 'ts',
    kind: 'output',
    code: `console.log(typeof null)
console.log(typeof undefined)
console.log(typeof NaN)
console.log(null === undefined)`,
    prompt: 'What does this print?',
    options: [
      'null\nundefined\nnumber\nfalse',
      'object\nundefined\nnumber\ntrue',
      'object\nundefined\nnumber\nfalse',
      'object\nobject\nnumber\nfalse'
    ],
    correct: 2,
    explain:
      "typeof null is the famous 'object' — a bug from JS's first version kept for compatibility — while typeof undefined is its own 'undefined', and NaN is still type number."
  },
  {
    key: 'ts-sort-lexicographic',
    lang: 'ts',
    kind: 'output',
    code: `const nums = [10, 1, 21, 2]
console.log(nums.sort())
const words = ['banana', 'Apple', 'cherry']
console.log(words.sort())`,
    prompt: 'What does this print?',
    options: [
      "[ 1, 2, 10, 21 ]\n[ 'Apple', 'banana', 'cherry' ]",
      "[ 10, 1, 21, 2 ]\n[ 'banana', 'Apple', 'cherry' ]",
      "[ 1, 10, 21, 2 ]\n[ 'Apple', 'banana', 'cherry' ]",
      "[ 1, 10, 2, 21 ]\n[ 'Apple', 'banana', 'cherry' ]"
    ],
    correct: 3,
    explain:
      "Array.sort() with no comparator converts every element to a string and sorts lexicographically, so 10 sorts before 2; string sort compares char codes, and uppercase 'A' already sorts before lowercase letters here."
  },
  {
    key: 'ts-array-holes',
    lang: 'ts',
    kind: 'output',
    code: `const arr = Array(3)
console.log(arr.length)
const mapped = arr.map((x) => 1)
console.log(mapped)
console.log([undefined, undefined, undefined].map((x) => 1))`,
    prompt: 'What does this print?',
    options: [
      '3\n[ <3 empty items> ]\n[ 1, 1, 1 ]',
      '3\n[ 1, 1, 1 ]\n[ 1, 1, 1 ]',
      '3\n[ <3 empty items> ]\n[ <3 empty items> ]',
      '0\n[ <3 empty items> ]\n[ 1, 1, 1 ]'
    ],
    correct: 0,
    explain:
      'Array(3) makes 3 empty slots (holes) with no actual elements, and map() skips holes entirely; an array of three explicit undefined values has real elements, so map() runs on all of them.'
  },
  {
    key: 'ts-promise-order',
    lang: 'ts',
    kind: 'output',
    code: `console.log('start')
setTimeout(() => console.log('timeout'), 0)
Promise.resolve().then(() => console.log('promise'))
console.log('end')`,
    prompt: 'What does this print?',
    options: [
      'start\nend\ntimeout\npromise',
      'start\nend\npromise\ntimeout',
      'start\npromise\nend\ntimeout',
      'start\ntimeout\npromise\nend'
    ],
    correct: 1,
    explain:
      'Synchronous code runs first (start, end); then the microtask queue drains fully before the next macrotask, so the resolved-promise callback runs before the setTimeout callback even with a 0ms delay.'
  },
  {
    key: 'ts-nullish-coalescing',
    lang: 'ts',
    kind: 'output',
    code: `function show(count: number, label: string) {
  console.log(count ?? 'fallback', count || 'fallback')
  console.log(label ?? 'fallback', label || 'fallback')
}
show(0, '')`,
    prompt: 'What does this print?',
    options: [
      '0 0\n fallback',
      'fallback fallback\nfallback fallback',
      '0 fallback\n fallback',
      '0 fallback\nfallback fallback'
    ],
    correct: 2,
    explain:
      '?? only falls back on null/undefined, so 0 and \'\' pass through unchanged; || falls back on ANY falsy value, so 0 and \'\' both trigger the fallback string.'
  },
  {
    key: 'ts-readonly-array-push',
    lang: 'ts',
    kind: 'bug',
    code: `function total(nums: readonly number[]): number {
  nums.push(1)
  return nums.reduce((a, b) => a + b, 0)
}
console.log(total([1, 2, 3]))`,
    prompt: 'Why does this not compile?',
    options: [
      "TS2339: Property 'push' does not exist on type 'readonly number[]' — readonly arrays only expose non-mutating methods",
      "TS2345: Argument of type 'number[]' is not assignable to 'readonly number[]' — array literals are mutable by default",
      "TS2322: Type 'number' is not assignable to 'readonly number[]' — reduce's initial value conflicts with the type",
      'It compiles fine — readonly on an array type is only enforced by linters, not by the TypeScript compiler'
    ],
    correct: 0,
    explain:
      "readonly number[] removes push, pop, splice and every other mutating array method from the parameter's type, so the compiler rejects the call before the function ever runs."
  },
  {
    key: 'ts-excess-property-check',
    lang: 'ts',
    kind: 'bug',
    code: `interface UserOpts {
  name: string
  age?: number
}
function greet(opts: UserOpts): string {
  return \`hi \${opts.name}\`
}
console.log(greet({ name: 'Amir', agee: 30 }))`,
    prompt: 'Why does this not compile?',
    options: [
      'UserOpts requires age to be present whenever an object literal is passed, and TypeScript treats agee as satisfying that instead',
      "TS2561: object literals are checked for excess properties, and agee is not a key of UserOpts — did you mean 'age'?",
      'Interfaces cannot declare optional properties, so the age? syntax itself is rejected before agee is even checked',
      'Template literal types require opts.name to be a string literal type, not string'
    ],
    correct: 1,
    explain:
      "Fresh object literals get an excess property check that plain variables don't: an unknown key like agee is flagged immediately, even though age itself is optional."
  },
  {
    key: 'ts-exhaustive-never',
    lang: 'ts',
    kind: 'bug',
    code: `type Shape =
  | { kind: 'circle'; r: number }
  | { kind: 'square'; s: number }
  | { kind: 'triangle'; b: number; h: number }
function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.r ** 2
    case 'square':
      return shape.s ** 2
    default: {
      const check: never = shape
      throw new Error(\`unhandled: \${check}\`)
    }
  }
}`,
    prompt: 'Why does this not compile?',
    options: [
      'Math.PI is not a valid property access under --strict',
      'switch statements cannot branch on string literal properties at all without first declaring a matching TypeScript enum type for them',
      "TS2322: the switch is missing a 'triangle' case, so shape is still a triangle object in default, which isn't assignable to never",
      'shape.r and shape.s are optional properties, so ** cannot be applied to them'
    ],
    correct: 2,
    explain:
      "Assigning shape to a never-typed variable only compiles once every case has been handled and TypeScript has narrowed shape down to nothing; the missing triangle case leaves a real object reaching default."
  },
  {
    key: 'ts-narrowing-lost-callback',
    lang: 'ts',
    kind: 'bug',
    code: `type Box = { value: string | null }
function handle(box: Box): void {
  if (box.value === null) {
    return
  }
  setTimeout(() => {
    console.log(box.value.toUpperCase())
  }, 0)
}
handle({ value: 'hi' })`,
    prompt: 'Why does this not compile?',
    options: [
      'toUpperCase is not a valid method on the string type under --strict',
      'box is possibly undefined because the parameter has no default value',
      "setTimeout defers its callback to a later turn of the event loop, so closures are not allowed to reference any property that was read before that turn",
      "TS18047: box.value is still string | null inside the closure — TS can't prove nothing reassigned it before the timer fires"
    ],
    correct: 3,
    explain:
      'Narrowing on a property access is only valid at the point it was checked; inside a callback that may run later, the compiler assumes box.value could have been reassigned in between, so the null case is still live.'
  },
  {
    key: 'ts-spread-shallow-copy',
    lang: 'ts',
    kind: 'bug',
    code: `const original = { name: 'Amir', prefs: { theme: 'dark' } }
const copy = { ...original }
copy.name = 'Guest'
copy.prefs.theme = 'light'
console.log(original.name, original.prefs.theme)
console.log(copy.name, copy.prefs.theme)`,
    prompt: 'Why does this not behave as intended?',
    options: [
      'Object spread throws a TypeError as soon as the source has a nested object',
      'copy.prefs.theme silently fails to update because spread marks nested properties read-only',
      "original.name also changes to 'Guest' too, because the spread operator always copies the entire outer object by reference instead of ever copying it by value",
      '{ ...original } copies only the top level; prefs is still the same nested object by reference, so mutating copy.prefs.theme mutates original.prefs.theme too'
    ],
    correct: 3,
    explain:
      "Spread copies each own property's value; for a nested object that value is a reference, so both original and copy point at the same prefs object even though their top-level name properties are independent."
  }
]
