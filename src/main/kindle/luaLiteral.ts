// A parser for the Lua table literals KOReader writes (`return { ["key"] = … }`):
// book sidecars (metadata.<ext>.lua), settings.reader.lua and history.lua.
// The file is DATA from a device, so it is parsed, never evaluated. Only
// literals are accepted: strings (quoted and long-bracket), numbers, booleans,
// nil and nested tables. Anything else (a function call, an operator) throws.
//
// Tables become null-prototype objects keyed by String(key), so `["__proto__"]`
// is an ordinary key. Positional values take the keys "1", "2", … as in Lua;
// `luaArray()` reads them back in order.

export type LuaValue = string | number | boolean | null | LuaTable
export interface LuaTable {
  [key: string]: LuaValue
}

const MAX_DEPTH = 64

export function parseLuaLiteral(source: string): LuaValue {
  const p = new Parser(source)
  p.skip()
  if (p.src.startsWith('return', p.i) && !isIdentChar(p.src[p.i + 6])) {
    p.i += 6
  }
  const value = p.value(0)
  p.skip()
  if (p.src[p.i] === ';') {
    p.i++
    p.skip()
  }
  if (p.i < p.src.length) p.fail('unexpected trailing input')
  return value
}

export function isLuaTable(v: LuaValue | undefined): v is LuaTable {
  return typeof v === 'object' && v !== null
}

// The positional part of a table, in order: keys "1".."n", stopping at the
// first gap (Lua's own `ipairs` rule). KOReader's dump writes `[1] = …`.
export function luaArray(v: LuaValue | undefined): LuaValue[] {
  if (!isLuaTable(v)) return []
  const out: LuaValue[] = []
  for (let n = 1; Object.prototype.hasOwnProperty.call(v, String(n)); n++) out.push(v[String(n)])
  return out
}

function isIdentStart(c: string | undefined): boolean {
  return c != null && /[A-Za-z_]/.test(c)
}

function isIdentChar(c: string | undefined): boolean {
  return c != null && /[A-Za-z0-9_]/.test(c)
}

class Parser {
  i = 0
  constructor(readonly src: string) {}

  fail(message: string): never {
    throw new Error(`Lua literal: ${message} at offset ${this.i}`)
  }

  skip(): void {
    const s = this.src
    while (this.i < s.length) {
      const c = s[this.i]
      if (c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\f' || c === '\v') {
        this.i++
      } else if (c === '-' && s[this.i + 1] === '-') {
        this.i += 2
        const level = this.longBracketLevel()
        if (level >= 0) {
          this.longString(level)
        } else {
          while (this.i < s.length && s[this.i] !== '\n') this.i++
        }
      } else {
        return
      }
    }
  }

  // At "[", "[=", "[==" … followed by "[": the bracket level, else -1.
  longBracketLevel(): number {
    const s = this.src
    if (s[this.i] !== '[') return -1
    let j = this.i + 1
    while (s[j] === '=') j++
    return s[j] === '[' ? j - this.i - 1 : -1
  }

  longString(level: number): string {
    const s = this.src
    this.i += level + 2
    // A newline directly after the opening bracket is not part of the string.
    if (s[this.i] === '\r') this.i++
    if (s[this.i] === '\n') this.i++
    const close = ']' + '='.repeat(level) + ']'
    const end = s.indexOf(close, this.i)
    if (end < 0) this.fail('unterminated long string')
    const out = s.slice(this.i, end)
    this.i = end + close.length
    return out
  }

  value(depth: number): LuaValue {
    if (depth > MAX_DEPTH) this.fail('nesting too deep')
    this.skip()
    const s = this.src
    const c = s[this.i]
    if (c === '{') return this.table(depth + 1)
    if (c === '"' || c === "'") return this.quoted()
    if (c === '[') {
      const level = this.longBracketLevel()
      if (level >= 0) return this.longString(level)
      this.fail('unexpected "["')
    }
    if (isIdentStart(c)) {
      const word = this.ident()
      if (word === 'true') return true
      if (word === 'false') return false
      if (word === 'nil') return null
      if (word === 'math') {
        // KOReader's dump writes an infinite number as math.huge.
        if (s.startsWith('.huge', this.i)) {
          this.i += 5
          return Infinity
        }
      }
      this.fail(`unexpected identifier "${word}"`)
    }
    return this.number()
  }

  ident(): string {
    const start = this.i
    while (isIdentChar(this.src[this.i])) this.i++
    return this.src.slice(start, this.i)
  }

  number(): number {
    const s = this.src
    const start = this.i
    let sign = 1
    if (s[this.i] === '-') {
      sign = -1
      this.i++
      this.skip()
    }
    if (s.startsWith('math.huge', this.i)) {
      this.i += 9
      return sign * Infinity
    }
    const hex = /^0[xX][0-9A-Fa-f]+/.exec(s.slice(this.i, this.i + 40))
    if (hex) {
      this.i += hex[0].length
      return sign * parseInt(hex[0].slice(2), 16)
    }
    const m = /^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(s.slice(this.i, this.i + 64))
    if (!m) {
      this.i = start
      this.fail('expected a value')
    }
    this.i += m[0].length
    return sign * Number(m[0])
  }

  // A quoted string with Lua's escapes. Decimal and hex escapes are BYTES, so
  // the string is assembled as UTF-8 bytes and decoded once at the end: %q
  // writes a multi-byte character as consecutive \ddd escapes.
  quoted(): string {
    const s = this.src
    const quote = s[this.i++]
    const bytes: number[] = []
    const pushText = (text: string): void => {
      for (const b of Buffer.from(text, 'utf8')) bytes.push(b)
    }
    let runStart = this.i
    const flush = (): void => {
      if (this.i > runStart) pushText(s.slice(runStart, this.i))
    }
    for (;;) {
      if (this.i >= s.length) this.fail('unterminated string')
      const c = s[this.i]
      if (c === quote) {
        flush()
        this.i++
        return Buffer.from(bytes).toString('utf8')
      }
      if (c === '\n' || c === '\r') this.fail('unescaped newline in string')
      if (c !== '\\') {
        this.i++
        continue
      }
      flush()
      this.i++
      const e = s[this.i]
      const simple: Record<string, number> = {
        n: 10,
        t: 9,
        r: 13,
        a: 7,
        b: 8,
        f: 12,
        v: 11,
        '\\': 92,
        '"': 34,
        "'": 39
      }
      if (e === undefined) this.fail('unterminated escape')
      if (Object.prototype.hasOwnProperty.call(simple, e)) {
        bytes.push(simple[e])
        this.i++
      } else if (e === '\n' || e === '\r') {
        // "\" followed by a real line break is a newline (what %q writes).
        bytes.push(10)
        this.i++
        const next = s[this.i]
        if ((next === '\n' || next === '\r') && next !== e) this.i++
      } else if (e === 'x') {
        const hex = /^[0-9A-Fa-f]{2}/.exec(s.slice(this.i + 1, this.i + 3))
        if (!hex) this.fail('bad \\x escape')
        bytes.push(parseInt(hex[0], 16))
        this.i += 3
      } else if (e === 'z') {
        this.i++
        while (this.i < s.length && /\s/.test(s[this.i])) this.i++
      } else if (e === 'u') {
        const m = /^\{([0-9A-Fa-f]{1,8})\}/.exec(s.slice(this.i + 1, this.i + 12))
        if (!m) this.fail('bad \\u escape')
        const cp = parseInt(m[1], 16)
        if (cp > 0x10ffff) this.fail('bad \\u escape')
        pushText(String.fromCodePoint(cp))
        this.i += 1 + m[0].length
      } else if (/\d/.test(e)) {
        const m = /^\d{1,3}/.exec(s.slice(this.i, this.i + 3))!
        const b = Number(m[0])
        if (b > 255) this.fail('bad decimal escape')
        bytes.push(b)
        this.i += m[0].length
      } else {
        this.fail(`bad escape "\\${e}"`)
      }
      runStart = this.i
    }
  }

  table(depth: number): LuaTable {
    const s = this.src
    this.i++ // {
    const out: LuaTable = Object.create(null) as LuaTable
    let position = 1
    for (;;) {
      this.skip()
      if (s[this.i] === '}') {
        this.i++
        return out
      }
      let key: string | null = null
      if (s[this.i] === '[' && this.longBracketLevel() < 0) {
        this.i++
        const k = this.value(depth)
        if (k === null || isLuaTable(k)) this.fail('unsupported table key')
        if (typeof k === 'number' && !Number.isFinite(k)) this.fail('unsupported table key')
        key = String(k)
        this.skip()
        if (s[this.i] !== ']') this.fail('expected "]"')
        this.i++
        this.expectEquals()
      } else if (isIdentStart(s[this.i])) {
        const save = this.i
        const word = this.ident()
        this.skip()
        if (s[this.i] === '=' && s[this.i + 1] !== '=') {
          key = word
          this.i++
        } else {
          this.i = save
        }
      }
      const v = this.value(depth)
      if (key === null) key = String(position++)
      // A nil value leaves the key absent, as in Lua.
      if (v !== null) out[key] = v
      else delete out[key]
      this.skip()
      if (s[this.i] === ',' || s[this.i] === ';') {
        this.i++
      } else if (s[this.i] !== '}') {
        this.fail('expected "," or "}"')
      }
    }
  }

  expectEquals(): void {
    this.skip()
    if (this.src[this.i] !== '=') this.fail('expected "="')
    this.i++
  }
}
