#!/usr/bin/env node
// Builds the History map's historical borders from CShapes 2.0 (world,
// 1886-2019) and CShapes-Europe (Europe, from 1806):
//
//   node scripts/build-history-borders.cjs CShapes-2.0.geojson CShapes-Europe.geojson
//   node scripts/build-history-borders.cjs --early cliopatria_polities_only.geojson
//
// The second form adds (or replaces) the 1800-1885 world layer from Cliopatria
// (Seshat Global History Databank; Bennett et al., Scientific Data 12:247, 2025;
// CC BY 4.0; https://github.com/Seshat-Global-History-Databank/cliopatria) to the
// existing borders.json, so CShapes need not be downloaded again. Before 1886 the
// map draws it beneath CShapes-Europe. Pin the release you build from.
//
// Download both from https://icr.ethz.ch/data/cshapes/ (CC BY-NC-SA 4.0,
// Schvitz, Rüegger, Girardin, Cederman, Weidmann and Gleditsch 2022). The
// output, src/main/history/data/borders.json, is simplified (Douglas-Peucker),
// quantized to 0.01 degrees and delta-encoded, and stores each distinct shape
// once: most border versions repeat their neighbours' outlines unchanged.
// No dependencies; run it again whenever CShapes publishes a new version.

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const earlyPath = args[0] === '--early' ? args[1] : null
const [worldPath, europePath] = earlyPath ? [] : args
if (!earlyPath && (!worldPath || !europePath)) {
  console.error('usage: build-history-borders.cjs <CShapes-2.0.geojson> <CShapes-Europe.geojson> | --early <cliopatria.geojson>')
  process.exit(1)
}
const OUT = path.join(__dirname, '..', 'src', 'main', 'history', 'data', 'borders.json')
const Q = 100 // 0.01 degree
const TOLERANCE = 0.045 // degrees
const MIN_AREA = 0.04 // square degrees: islets below this are dropped unless a unit has nothing else

function perpDist(p, a, b) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1])
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)
  const c = t < 0 ? a : t > 1 ? b : [a[0] + t * dx, a[1] + t * dy]
  return Math.hypot(p[0] - c[0], p[1] - c[1])
}

function simplify(points, tol) {
  if (points.length < 4) return points
  const keep = new Uint8Array(points.length)
  keep[0] = keep[points.length - 1] = 1
  const stack = [[0, points.length - 1]]
  while (stack.length) {
    const [s, e] = stack.pop()
    let max = 0
    let idx = -1
    for (let i = s + 1; i < e; i++) {
      const d = perpDist(points[i], points[s], points[e])
      if (d > max) {
        max = d
        idx = i
      }
    }
    if (max > tol && idx > 0) {
      keep[idx] = 1
      stack.push([s, idx], [idx, e])
    }
  }
  return points.filter((_, i) => keep[i])
}

function ringArea(r) {
  let a = 0
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) a += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1])
  return Math.abs(a / 2)
}

function centroid(r) {
  let x = 0
  let y = 0
  let a = 0
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const f = r[j][0] * r[i][1] - r[i][0] * r[j][1]
    x += (r[j][0] + r[i][0]) * f
    y += (r[j][1] + r[i][1]) * f
    a += f
  }
  if (a === 0) return r[0]
  return [x / (3 * a), y / (3 * a)]
}

/** Outer rings only (holes are rare at this scale and drawn as land). */
function encodeGeometry(geom) {
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
  const rings = polys.map((p) => p[0]).filter((r) => r && r.length >= 4)
  const simplified = rings
    .map((r) => simplify(r, TOLERANCE))
    .filter((r) => r.length >= 4)
    .map((r) => ({ r, area: ringArea(r) }))
    .sort((a, b) => b.area - a.area)
  if (simplified.length === 0) return null
  const kept = simplified.filter((s, i) => i === 0 || s.area >= MIN_AREA)
  const label = centroid(kept[0].r)
  const encoded = kept.map(({ r }) => {
    const out = []
    let px = 0
    let py = 0
    for (const [lon, lat] of r) {
      const x = Math.round(lon * Q)
      const y = Math.round(lat * Q)
      if (out.length && x === px && y === py) continue
      out.push(x - px, y - py)
      px = x
      py = y
    }
    return out
  })
  return { rings: encoded, label: [Math.round(label[0] * 10) / 10, Math.round(label[1] * 10) / 10] }
}

const shapes = []
const shapeIndex = new Map()
function shapeId(geom) {
  const g = encodeGeometry(geom)
  if (!g) return null
  const key = JSON.stringify(g.rings)
  if (!shapeIndex.has(key)) {
    shapeIndex.set(key, shapes.length)
    shapes.push(g.rings)
  }
  return { id: shapeIndex.get(key), label: g.label }
}

const decimal = (y, m, d) => Math.round((y + (m - 1) / 12 + (d - 1) / 365) * 1000) / 1000

const EARLY_FROM = 1800
const WORLD_FROM = 1886
const EUROPE_FROM = 1816
// Cliopatria polities that continue past 1886 take their CShapes (Gleditsch-Ward)
// code, so colour and state-page links carry across the seam; others keep their
// Wikidata number.
const GW_BY_WIKIDATA = {
  Q189326: 630, // Qajar Persia
  Q12560: 640, // Ottoman Empire
  Q34266: 365, // Russian Empire
  Q1335260: 700, // Emirate of Afghanistan
  Q467627: 700, // Durrani Empire
  Q842: 698 // Oman
}

function earlyUnits(features) {
  const out = []
  for (const f of features) {
    const p = f.properties
    if (p.Type !== 'POLITY' || (p.Components && String(p.Components).trim())) continue
    if (!(p.FromYear < WORLD_FROM && p.ToYear >= EARLY_FROM)) continue
    const s = shapeId(f.geometry)
    if (!s) continue
    const q = String(p.Wikidata || '')
    const code = GW_BY_WIKIDATA[q] ?? (Number(q.replace(/^Q/, '')) || 0)
    // CShapes-Europe draws Europe from 1816 in more detail: a European polity
    // (by its label point) is kept only for the years before it, except the
    // empires that reach into Asia, whose Asian part only this layer draws.
    const inEurope = s.label[0] > -25 && s.label[0] < 45 && s.label[1] > 34 && s.label[1] < 72 && code !== 365 && code !== 640
    const to = Math.min(p.ToYear + 1, WORLD_FROM, inEurope ? EUROPE_FROM : Infinity)
    const from = Math.max(p.FromYear, EARLY_FROM)
    if (from >= to) continue
    out.push({
      set: 'early',
      name: p.Name,
      code,
      from,
      to,
      shape: s.id,
      label: s.label,
      capital: null,
      capitalAt: null
    })
  }
  return out
}

let out
if (earlyPath) {
  // Keep the CShapes units and their shapes; replace any earlier early layer.
  const prev = JSON.parse(fs.readFileSync(OUT, 'utf8'))
  const kept = prev.units.filter((u) => u.set !== 'early')
  const units = kept.map((u) => {
    const rings = prev.shapes[u.shape]
    const key = JSON.stringify(rings)
    if (!shapeIndex.has(key)) {
      shapeIndex.set(key, shapes.length)
      shapes.push(rings)
    }
    return { ...u, shape: shapeIndex.get(key) }
  })
  units.push(...earlyUnits(JSON.parse(fs.readFileSync(earlyPath, 'utf8')).features))
  out = {
    ...prev,
    attribution: `${prev.attribution.split('; before 1886')[0]}; before 1886 outside Europe, Cliopatria (Seshat Global History Databank; Bennett et al. 2025), licensed CC BY 4.0, simplified`,
    earlyUrl: 'https://github.com/Seshat-Global-History-Databank/cliopatria',
    earlyFrom: EARLY_FROM,
    shapes,
    units
  }
} else {
  const world = JSON.parse(fs.readFileSync(worldPath, 'utf8')).features
  const europe = JSON.parse(fs.readFileSync(europePath, 'utf8')).features
  const units = []
  for (const f of world) {
    const p = f.properties
    const s = shapeId(f.geometry)
    if (!s) continue
    units.push({
      set: 'world',
      name: p.cntry_name,
      code: p.gwcode,
      from: decimal(p.gwsyear, p.gwsmonth, p.gwsday),
      to: decimal(p.gweyear, p.gwemonth, p.gweday),
      shape: s.id,
      label: s.label,
      capital: p.capname || null,
      capitalAt: Number.isFinite(p.caplong) ? [p.caplong, p.caplat] : null
    })
  }
  for (const f of europe) {
    const p = f.properties
    const s = shapeId(f.geometry)
    if (!s) continue
    const cap = /POINT \(([-\d.]+) ([-\d.]+)\)/.exec(p.capital_geom || '')
    units.push({
      set: 'europe',
      name: p.Name,
      code: p.Holder,
      from: p.From,
      to: p.To + 1,
      status: p.Status,
      shape: s.id,
      label: s.label,
      capital: p.Capital || null,
      capitalAt: cap ? [Number(cap[1]), Number(cap[2])] : null
    })
  }
  out = {
    attribution:
      'CShapes 2.0 and CShapes-Europe, by Schvitz, Rüegger, Girardin, Cederman, Weidmann and Gleditsch (ETH Zürich), licensed CC BY-NC-SA 4.0',
    url: 'https://icr.ethz.ch/data/cshapes/',
    quantum: 1 / Q,
    worldFrom: WORLD_FROM,
    shapes,
    units
  }
}
// Keep only the shapes some unit still draws, renumbered in first-use order.
{
  const remap = new Map()
  const packed = []
  for (const u of out.units) {
    if (!remap.has(u.shape)) {
      remap.set(u.shape, packed.length)
      packed.push(out.shapes[u.shape])
    }
    u.shape = remap.get(u.shape)
  }
  out.shapes = packed
}
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(out))
const kb = Math.round(fs.statSync(OUT).size / 1024)
console.log(`${out.units.length} border versions, ${out.shapes.length} distinct shapes, ${kb} KiB -> ${path.relative(process.cwd(), OUT)}`)
