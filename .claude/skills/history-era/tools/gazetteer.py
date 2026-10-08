"""Coordinates for History places from Natural Earth's populated places (public domain).

coords(name, country) returns {'lat', 'lon', 'cites'} for a place whose name (or a
listed alternative) and ISO country code match a Natural Earth record, else None.
A country is required: names repeat across the world, and a wrong pin is worse than
none. SOURCE is the dataset's Source entity, written once like any other.
"""
import json, os, unicodedata
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


# ---- GeoNames cities500 (CC BY 4.0): towns and villages Natural Earth lacks ----
#
# The second gazetteer: every populated place with 500+ people, with its
# alternate names (Makkah/Mecca, Xiva/Khiva, Oswiecim/Auschwitz). Downloaded once
# into the page cache (download.geonames.org/export/dump/cities500.zip, unzipped).
# A battlefield or site named after a town gets that town's position, and the
# citation names the town, so the reader sees what the pin stands for.

GEONAMES_FILE = os.path.join(os.environ.get('NAVIHUB_HISTORY_CACHE', os.path.expanduser('~/.cache/navihub-history')), 'geonames', 'cities500.txt')
GEONAMES_ID = 'geonames-cities500'
GEONAMES_SOURCE = {
    'id': GEONAMES_ID,
    'type': 'dataset',
    'title': 'GeoNames cities500: all cities with a population of 500 or more',
    'lang': 'en',
    'contributors': [],
    'publisher': 'GeoNames',
    'date': 'n.d.',
    'url': 'https://download.geonames.org/export/dump/',
    'license': {'id': 'cc-by', 'version': '4.0', 'url': 'https://creativecommons.org/licenses/by/4.0/'},
}

_geo = None

def _load_geonames():
    global _geo
    if _geo is None:
        _geo = {}
        with open(GEONAMES_FILE, encoding='utf-8') as f:
            for line in f:
                c = line.rstrip('\n').split('\t')
                row = {'id': c[0], 'name': c[1], 'lat': float(c[4]), 'lon': float(c[5]), 'cc': c[8], 'pop': int(c[14] or 0)}
                for n in {c[1], c[2], *c[3].split(',')}:
                    if n.strip():
                        _geo.setdefault(_norm(n), []).append(row)
    return _geo

def geonames_coords(name, country):
    """GeoNames position for a place by name (or alternate name) and ISO country; None if absent."""
    if not country:
        return None
    hits = [r for r in _load_geonames().get(_norm(name), []) if r['cc'] == country]
    if not hits:
        return None
    r = max(hits, key=lambda h: h['pop'])
    return {
        'lat': round(r['lat'], 4),
        'lon': round(r['lon'], 4),
        'cites': [{'source': GEONAMES_ID, 'loc': {'section': f"{r['name']} (geonameid {r['id']})"}}],
    }

def geonames_source(accessed):
    return dict(GEONAMES_SOURCE, accessed=accessed)
