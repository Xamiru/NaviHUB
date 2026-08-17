import type { ProgSnippet } from '../snippets'

// go snippet deck — one file per language so authors never collide. Rules
// in snippets.ts. There is no Go toolchain on the authoring machine, so every
// entry here was reasoned against the Go spec / stdlib semantics (Go 1.22+:
// per-iteration loop variables, `range` over an int) rather than executed.
export const GO_SNIPPETS: ProgSnippet[] = [
  {
    key: 'go-append-aliasing',
    lang: 'go',
    kind: 'output',
    code: `package main

import "fmt"

func main() {
	a := make([]int, 3, 4)
	b := append(a, 1)
	c := append(a, 2)
	b[0] = 9
	d := append(b, 3)
	d[0] = 7
	fmt.Println(a[0], b[0], b[3], c[3], d[0])
}`,
    prompt: 'What does this print?',
    options: ['0 9 1 2 7', '9 9 1 2 9', '9 9 2 2 7', '0 0 1 2 7'],
    correct: 2,
    explain:
      '`a` has one slot of spare capacity, so both `append(a, …)` calls write into the same backing array (the second overwrites index 3 with 2, visible through `b` and `c`) and `b[0] = 9` shows through `a`. `append(b, 3)` exceeds cap 4, so `d` gets a fresh array and `d[0] = 7` touches nothing else.'
  },
  {
    key: 'go-defer-order-args',
    lang: 'go',
    kind: 'output',
    code: `package main

import "fmt"

func main() {
	x := 1
	defer fmt.Println("a", x)
	x = 2
	defer func() { fmt.Println("b", x) }()
	x = 3
	fmt.Println("c", x)
}`,
    prompt: 'What does this print?',
    options: ['c 3\nb 3\na 1', 'c 3\na 1\nb 3', 'c 3\nb 2\na 1', 'c 3\na 3\nb 3'],
    correct: 0,
    explain:
      'Deferred calls run LIFO after the function body, so "b" prints before "a". A deferred call\'s arguments are evaluated at the `defer` statement (`x` was 1), while the closure reads `x` when it runs (3).'
  },
  {
    key: 'go-named-return-defer',
    lang: 'go',
    kind: 'output',
    code: `package main

import "fmt"

func f() (n int) {
	defer func() { n *= 2 }()
	n = 3
	return n + 1
}

func g() int {
	n := 3
	defer func() { n *= 2 }()
	return n + 1
}

func main() {
	fmt.Println(f(), g())
}`,
    prompt: 'What does this print?',
    options: ['4 4', '8 8', '6 4', '8 4'],
    correct: 3,
    explain:
      '`return n + 1` first assigns 4 to the named result `n`, then the deferred closure doubles it before the caller sees it: 8. In `g` the result is an anonymous temporary already set to 4; the defer only doubles the local `n`, so 4 is returned.'
  },
  {
    key: 'go-range-value-copy',
    lang: 'go',
    kind: 'output',
    code: `package main

import "fmt"

type P struct{ N int }

func main() {
	ps := []P{{1}, {2}, {3}}
	for _, p := range ps {
		p.N *= 10
	}
	var ptrs []*int
	for i := range 3 {
		ptrs = append(ptrs, &i)
	}
	fmt.Println(ps, *ptrs[0], *ptrs[1], *ptrs[2])
}`,
    prompt: 'What does this print (Go 1.22 or newer)?',
    options: ['[{10} {20} {30}] 0 1 2', '[{1} {2} {3}] 0 1 2', '[{1} {2} {3}] 3 3 3', '[{10} {20} {30}] 2 2 2'],
    correct: 1,
    explain:
      '`for _, p := range ps` copies each element into `p`, so `p.N *= 10` never touches the slice. Since Go 1.22 every loop iteration gets its own `i` (and `range 3` iterates 0..2), so the three stored pointers point at three distinct variables holding 0, 1 and 2; before 1.22 a shared `i` would have made them all equal.'
  },
  {
    key: 'go-int-overflow-div-mod',
    lang: 'go',
    kind: 'output',
    code: `package main

import "fmt"

func main() {
	var b int8 = 127
	b++
	fmt.Println(b, -7/2, -7%2, 7%-2)
}`,
    prompt: 'What does this print?',
    options: ['128 -4 1 1', '-128 -4 -1 1', '-128 -3 1 -1', '-128 -3 -1 1'],
    correct: 3,
    explain:
      'Fixed-size integers wrap silently: 127 + 1 in an `int8` is -128. Integer division truncates toward zero (-7/2 is -3, not -4), and the remainder takes the sign of the dividend, so -7%2 is -1 and 7%-2 is 1.'
  },
  {
    key: 'go-string-bytes-runes',
    lang: 'go',
    kind: 'output',
    code: `package main

import "fmt"

func main() {
	s := "héllo"
	fmt.Println(len(s), len([]rune(s)), s[1])
	for i, r := range s {
		if r == 'l' {
			fmt.Println(i)
			break
		}
	}
}`,
    prompt: 'What does this print?',
    options: ['6 5 195\n3', '5 5 233\n2', '6 5 233\n3', '6 6 195\n3'],
    correct: 0,
    explain:
      '`len` counts bytes and é is two bytes in UTF-8 (0xC3 0xA9), so the string is 6 bytes but 5 runes. Indexing a string yields a byte, `s[1]` is 0xC3 = 195. `range` walks runes but reports the byte offset, so the first l sits at index 3.'
  },
  {
    key: 'go-nil-slice-json',
    lang: 'go',
    kind: 'output',
    code: `package main

import (
	"encoding/json"
	"fmt"
)

func main() {
	var a []int
	b := []int{}
	ja, _ := json.Marshal(a)
	jb, _ := json.Marshal(b)
	fmt.Println(len(a), len(b), a == nil, b == nil, string(ja), string(jb))
}`,
    prompt: 'What does this print?',
    options: ['0 0 true true null null', '0 0 false false [] []', '0 0 true false null []', '0 0 true false [] []'],
    correct: 2,
    explain:
      'A nil slice and an empty slice both have length 0 and behave the same under `len`, `range` and `append`, but only the zero-value slice compares equal to nil, and `encoding/json` preserves the distinction: nil marshals to `null`, an empty non-nil slice to `[]`.'
  },
  {
    key: 'go-typed-nil-error',
    lang: 'go',
    kind: 'bug',
    code: `package main

import "fmt"

type MyErr struct{ msg string }
func (e *MyErr) Error() string { return e.msg }

func check(n int) error {
	var e *MyErr
	if n < 0 {
		e = &MyErr{"negative"}
	}
	return e
}

func main() {
	if err := check(1); err != nil {
		fmt.Println("failed:", err)
	}
}`,
    prompt: 'check(1) has nothing to report, yet this prints "failed: <nil>". Why?',
    options: [
      '`check` must return `*MyErr` rather than `error`, because an interface type can never hold a nil pointer of a concrete type.',
      '`return e` wraps a nil `*MyErr` in a non-nil `error` interface; return a literal `nil` when there is nothing to report.',
      '`err != nil` compares by identity, not value; use `errors.Is(err, nil)` to test for the absence of an error.',
      '`if err := ...` declares a fresh `err` for the block, so the comparison runs against an uninitialised variable.'
    ],
    correct: 1,
    explain:
      'An interface value is nil only when both its dynamic type and value are nil. `return e` produces an `error` whose type is `*MyErr` and whose pointer is nil, so `err != nil` is true. Return `nil` explicitly (or declare `var e error`) on the no-error path.'
  },
  {
    key: 'go-nil-map-write',
    lang: 'go',
    kind: 'bug',
    code: `package main

import "fmt"

func main() {
	var counts map[string]int
	for _, w := range []string{"a", "b", "a"} {
		counts[w]++
	}
	fmt.Println(counts)
}`,
    prompt: 'Why does this panic at runtime?',
    options: [
      '`counts[w]++` is invalid on a map element because map values are not addressable; write `counts[w] = counts[w] + 1` instead.',
      'Ranging over a slice literal is not allowed; assign it to a variable before the `for` statement.',
      '`fmt.Println` cannot print a map whose element type has no `String` method.',
      '`counts` is a nil map — reads return zero values, but any write panics; it needs `make(map[string]int)` first.'
    ],
    correct: 3,
    explain:
      'The zero value of a map type is nil. Reading a nil map (including `len` and `range`) is fine and yields zero values, but assigning to an element panics with "assignment to entry in nil map". Initialise it with `make` or a map literal.'
  },
  {
    key: 'go-shadowed-err',
    lang: 'go',
    kind: 'bug',
    code: `package main

import (
	"errors"
	"fmt"
	"strconv"
)

func parse(s string) (n int, err error) {
	if n, err := strconv.Atoi(s); err != nil {
		err = errors.New("bad input: " + s)
	} else {
		n = n * 2
	}
	return n, err
}

func main() {
	fmt.Println(parse("21"))
}`,
    prompt: 'This prints `0 <nil>` instead of `42 <nil>`. Why?',
    options: [
      '`n, err :=` in the `if` header declares new variables scoped to the if/else, shadowing the named results, which stay zero.',
      'Named results are only populated by a bare `return`; `return n, err` with explicit operands hands back their zero values instead.',
      '`strconv.Atoi` returns `(int64, error)`, so assigning it to an `int` result silently truncates the parsed value to 0.',
      '`errors.New` returns nil for a message built by string concatenation; use `fmt.Errorf` to construct the error instead.'
    ],
    correct: 0,
    explain:
      '`:=` in an `if` header introduces new `n` and `err` visible only inside the if/else blocks. Both branches assign to those inner variables, so the outer named results are never touched and `return n, err` returns 0 and nil. Use `=` (plain assignment) to write to the named results.'
  },
  {
    key: 'go-waitgroup-add-inside',
    lang: 'go',
    kind: 'bug',
    code: `package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	for i := 1; i <= 3; i++ {
		go func() {
			wg.Add(1)
			fmt.Println(i)
			wg.Done()
		}()
	}
	wg.Wait()
}`,
    prompt: 'This usually prints nothing at all. Why?',
    options: [
      'Goroutines cannot write to stdout while `main` is blocked in `wg.Wait()`; their output is buffered and discarded at exit.',
      'The closure captures `wg` by value, so each goroutine increments its own copy of the WaitGroup and `main` never sees the `Add`.',
      '`wg.Add(1)` runs inside the goroutine, so `Wait` may find the counter still at zero and return at once; call `Add` before `go`.',
      '`wg.Done()` must be deferred; calling it directly lets the goroutine exit before its output is flushed.'
    ],
    correct: 2,
    explain:
      'Goroutines start asynchronously, so `main` typically reaches `wg.Wait()` while the counter is still 0, returns immediately and the program exits before any goroutine runs. `Add` must happen in the launching goroutine before `go`. (Capturing `i` is fine since Go 1.22: each iteration has its own variable, and closures capture variables by reference anyway, so `wg` is shared.)'
  },
  {
    key: 'go-map-elem-pointer-method',
    lang: 'go',
    kind: 'bug',
    code: `package main

import "fmt"

type Counter struct{ n int }

func (c *Counter) Inc() { c.n++ }

func main() {
	m := map[string]Counter{"a": {}}
	m["a"].Inc()
	fmt.Println(m["a"].n)
}`,
    prompt: 'Why does this fail to compile?',
    options: [
      'A pointer-receiver method is never in the method set of a value type, so `Inc` cannot be called on any `Counter` value, addressable or not.',
      '`m["a"]` is not addressable, so `&m["a"]` cannot be taken for the pointer receiver; use `map[string]*Counter` or reassign a copy.',
      'Composite literals inside a map literal must repeat the element type: `"a": Counter{}`.',
      '`m["a"].n` reads an unexported field, which is only allowed through a method of `Counter`.'
    ],
    correct: 1,
    explain:
      'Calling a pointer-receiver method on a value is shorthand for `(&v).Inc()`, which requires `v` to be addressable. Map elements are not (the map may rehash), so the compiler reports "cannot call pointer method Inc on Counter". Store pointers in the map, or `c := m["a"]; c.Inc(); m["a"] = c`.'
  }
]
