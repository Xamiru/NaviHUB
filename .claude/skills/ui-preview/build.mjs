#!/usr/bin/env node
// Compile a NaviHUB UI mockup into ONE self-contained local HTML file.
//
//   node .claude/skills/ui-preview/build.mjs <mockup.html> [out.html]
//
// Default output: <repo>/previews/<mockup basename>.html — gitignored, local,
// never uploaded anywhere. The user opens it in a browser themselves.
//
// The mockup is an HTML *fragment* (just the markup — this script wraps it in
// the document) written with the app's REAL Tailwind classes, exactly as the
// JSX would be. This script:
//   1. runs the project's Tailwind (tailwind.config.js + src/renderer/src/styles.css)
//      with the mockup as the only content file, so the output holds exactly the
//      utilities the mockup uses plus the component classes and the Wired chrome;
//   2. inlines the bundled fonts (IBM Plex Mono, VT323 and local theme fonts) as data: URIs so
//      the file is a single self-contained page — no server, no network;
//   3. replaces __LAIN_PNG__ with the sidebar avatar as a data: URI;
//   4. reports every class token in the mockup that produced no CSS — a typo, or a
//      class this Tailwind config does not know — so you fix it before publishing;
//   5. writes a complete <!doctype html> document to the output path.
//
// Title comes from a `<!-- @title Some Name -->` comment at the top of the
// mockup (falls back to the output filename).
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')
const [, , inArg, outArg] = process.argv
if (!inArg) {
  console.error('usage: node build.mjs <mockup.html> [out.html]   (default out: previews/<name>.html)')
  process.exit(2)
}
const inPath = resolve(inArg)
const outPath = outArg
  ? resolve(outArg)
  : join(ROOT, 'previews', basename(inPath).replace(/\.html?$/, '') + '.html')
if (!existsSync(inPath)) {
  console.error(`mockup not found: ${inPath}`)
  process.exit(2)
}

const mockup = readFileSync(inPath, 'utf8')

// ---- 1. Tailwind, project config, mockup as sole content ------------------
const tmp = mkdtempSync(join(tmpdir(), 'navihub-ui-preview-'))
const cssOut = join(tmp, 'preview.css')
try {
  execFileSync(
    join(ROOT, 'node_modules/.bin/tailwindcss'),
    [
      '-c', join(ROOT, 'tailwind.config.js'),
      '-i', join(ROOT, 'src/renderer/src/styles.css'),
      '--content', inPath,
      '-o', cssOut,
      '--minify'
    ],
    // Tailwind chatters "Rebuilding… Done" and browserslist nags on stderr;
    // keep the output to what matters and only surface stderr on failure.
    { cwd: ROOT, stdio: ['ignore', 'ignore', 'pipe'], env: { ...process.env, BROWSERSLIST_IGNORE_OLD_DATA: '1' } }
  )
} catch (err) {
  console.error('tailwind failed:', err?.stderr?.toString() || err?.message || err)
  process.exit(1)
}
let compiled = readFileSync(cssOut, 'utf8')
rmSync(tmp, { recursive: true, force: true })

// ---- 2. Fonts as data: URIs -----------------------------------------------
function dataUri(relPath, mime) {
  const abs = join(ROOT, relPath)
  if (!existsSync(abs)) {
    console.error(`warning: missing asset ${relPath} (run npm install?)`)
    return null
  }
  return `data:${mime};base64,${readFileSync(abs).toString('base64')}`
}
// Theme @font-face declarations live in the production stylesheet. Replace
// their local URLs too, so a downloaded preview never needs the checkout.
compiled = compiled.replace(
  /url\((['"]?)(?:\.\/)?assets\/themes\/fonts\/([a-z0-9-]+\.ttf)\1\)/g,
  (_, _quote, filename) => {
    const uri = dataUri(`src/renderer/src/assets/themes/fonts/${filename}`, 'font/ttf')
    if (!uri) throw new Error(`Cannot build an offline preview without ${filename}`)
    return `url(${uri})`
  }
)
const faces = []
for (const w of [400, 500, 600, 700]) {
  const uri = dataUri(`node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-${w}-normal.woff2`, 'font/woff2')
  if (uri) faces.push(`@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:${w};font-display:block;src:url(${uri}) format('woff2')}`)
}
{
  const uri = dataUri('node_modules/@fontsource/vt323/files/vt323-latin-400-normal.woff2', 'font/woff2')
  if (uri) faces.push(`@font-face{font-family:'VT323';font-style:normal;font-weight:400;font-display:block;src:url(${uri}) format('woff2')}`)
}

// ---- 3. Sidebar avatar -----------------------------------------------------
let body = mockup.replace(/^\s*<!--\s*@title[^\n]*-->\s*\n?/, '')
if (body.includes('__LAIN_PNG__')) {
  const uri = dataUri('src/renderer/src/assets/lain.png', 'image/png')
  body = body.split('__LAIN_PNG__').join(uri ?? '')
}

// ---- 4. Classes that produced no CSS ---------------------------------------
// Tailwind escapes selector characters the way CSS.escape does; mirror the
// common cases so `hover:bg-base-600` → `.hover\:bg-base-600` and
// `w-[10px]` → `.w-\[10px\]` can be looked up in the compiled sheet.
function escapeClass(cls) {
  let out = cls.replace(/([^A-Za-z0-9_\-\u00A0-\uFFFF])/g, "\\$1")
  if (/^\d/.test(out)) out = `\\3${out[0]} ${out.slice(1)}`
  // Tailwind rewrites an escaped comma to its hex form (escapeCommas) so
  // `grid-cols-[repeat(auto-fill,minmax(150px,1fr))]` becomes `\\2c ` in the sheet.
  return out.replace(/\\,/g, "\\2c ")
}
const tokens = new Set()
for (const m of mockup.matchAll(/class="([^"]*)"/g)) {
  for (const t of m[1].split(/\s+/)) if (t) tokens.add(t)
}
const missing = []
for (const t of tokens) {
  const sel = `.${escapeClass(t)}`
  if (!compiled.includes(sel)) missing.push(t)
}
if (missing.length) {
  console.error(
    `warning: ${missing.length} class token(s) produced no CSS (typo, or unknown to tailwind.config.js):\n  ` +
      missing.sort().join('\n  ')
  )
}

// ---- 5. Assemble -----------------------------------------------------------
const titleMatch = mockup.match(/<!--\s*@title\s+(.+?)\s*-->/)
const title = titleMatch ? titleMatch[1] : basename(outPath).replace(/\.html?$/, '')

// styles.css pins the app viewport (html/body 100%, body overflow hidden) — a
// preview page has to scroll past the first frame, so relax that here. Every
// mockup frame keeps its own height (h-screen / h-[720px]) and internal scroll.
const overrides = `html,body{height:auto}body{overflow:auto}`

const html =
  `<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8" />\n` +
  `<meta name="viewport" content="width=device-width, initial-scale=1" />\n` +
  `<title>${title.replace(/</g, '&lt;')}</title>\n` +
  `<style>${faces.join('')}${compiled}${overrides}</style>\n</head>\n<body>\n` +
  body +
  `\n</body>\n</html>\n`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, html)
const kb = Math.round(Buffer.byteLength(html) / 1024)
console.log(`built ${outPath} (${kb} KB, ${tokens.size} class tokens, ${missing.length} without CSS)`)
