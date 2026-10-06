#!/usr/bin/env node
// Builds the History map's historical borders from CShapes 2.0 (world,
// 1886-2019) and CShapes-Europe (Europe, from 1806):
//
//   node scripts/build-history-borders.cjs CShapes-2.0.geojson CShapes-Europe.geojson
//
// Download both from https://icr.ethz.ch/data/cshapes/ (CC BY-NC-SA 4.0,
// Schvitz, Rüegger, Girardin, Cederman, Weidmann and Gleditsch 2022). The
// output, src/main/history/data/borders.json, is simplified (Douglas-Peucker),
// quantized to 0.01 degrees and delta-encoded, and stores each distinct shape
// once: most border versions repeat their neighbours' outlines unchanged.
// No dependencies; run it again whenever CShapes publishes a new version.

const fs = require('fs')
const path = require('path')

const [worldPath, europePath] = process.argv.slice(2)
if (!worldPath || !europePath) {
  console.error('usage: build-history-borders.cjs <CShapes-2.0.geojson> <CShapes-Europe.geojson>')
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

const out = {
  attribution:
    'CShapes 2.0 and CShapes-Europe, by Schvitz, Rüegger, Girardin, Cederman, Weidmann and Gleditsch (ETH Zürich), licensed CC BY-NC-SA 4.0',
  url: 'https://icr.ethz.ch/data/cshapes/',
  quantum: 1 / Q,
  worldFrom: 1886,
  shapes,
  units
}
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, JSON.stringify(out))
const kb = Math.round(fs.statSync(OUT).size / 1024)
console.log(`${units.length} border versions, ${shapes.length} distinct shapes, ${kb} KiB -> ${path.relative(process.cwd(), OUT)}`)
