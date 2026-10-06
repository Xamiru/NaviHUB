"""Coordinates for History places from Natural Earth's populated places (public domain).

coords(name, country) returns {'lat', 'lon', 'cites'} for a place whose name (or a
listed alternative) and ISO country code match a Natural Earth record, else None.
A country is required: names repeat across the world, and a wrong pin is worse than
none. SOURCE is the dataset's Source entity, written once like any other.
"""
import json, unicodedata
import fetch

URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_populated_places_simple.geojson'
SOURCE_ID = 'natural-earth-populated-places'
SOURCE = {
    'id': SOURCE_ID,
    'type': 'dataset',
    'title': 'Natural Earth 1:10m Populated Places',
    'lang': 'en',
    'contributors': [
        {'name': 'Tom Patterson', 'role': 'compiler'},
        {'name': 'Nathaniel Vaughn Kelso', 'role': 'compiler'},
    ],
    'publisher': 'Natural Earth',
    'date': 'n.d.',
    'url': 'https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-populated-places/',
    'license': {'id': 'public-domain'},
}

_index = None

def _norm(s):
    s = unicodedata.normalize('NFKD', s)
    return ''.join(c for c in s if not unicodedata.combining(c)).lower().replace('-', ' ').strip()

def _load():
    global _index
    if _index is None:
        _index = {}
        for f in json.loads(fetch.decode(fetch.get(URL)))['features']:
            p = f['properties']
            for key in ('name', 'nameascii', 'namealt'):
                for part in str(p.get(key) or '').split('|'):
                    if part.strip():
                        _index.setdefault(_norm(part), []).append(p)
    return _index

def coords(name, country, accessed):
    if not country:
        return None
    hits = [p for p in _load().get(_norm(name), []) if p.get('iso_a2') == country]
    if not hits:
        return None
    p = max(hits, key=lambda h: h.get('pop_max') or 0)
    return {
        'lat': round(float(p['latitude']), 4),
        'lon': round(float(p['longitude']), 4),
        'cites': [{'source': SOURCE_ID, 'loc': {'section': f"{p['name']} (ne_id {p['ne_id']})"}}],
    }

def source(accessed):
    return dict(SOURCE, accessed=accessed)
