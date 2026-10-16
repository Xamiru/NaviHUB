"""Candidate coordinates for a place, so an event can be pinned at research time.

    python3 locate.py "Chaldiran" IR
    python3 locate.py "Mehmandust"          # every country

Prints Natural Earth's match and every GeoNames row whose name or alternate name
matches (cities500, plus the full country file when one is cached under
geonames/<CC>.txt), with feature type, population and geonameid. Pick the row
that is the historical place, by eye: automatic matches have put Harpers Ferry
in Greece before. In a spec, set the place's coords to that row and cite it the
way gazetteer.geonames_coords does ({'source': gazetteer.GEONAMES_ID, 'loc':
{'section': '<name> (geonameid <id>)'}}).
"""
import os, sys
import gazetteer

GEO_DIR = os.path.dirname(gazetteer.GEONAMES_FILE)


def rows(path, key, country, prefix=False):
    with open(path, encoding='utf-8') as f:
        for line in f:
            c = line.rstrip('\n').split('\t')
            if len(c) < 15 or (country and c[8] != country):
                continue
            names = {c[1], c[2], *c[3].split(',')}
            norm = (gazetteer._norm(n) for n in names if n.strip())
            if any(n.startswith(key) if prefix else n == key for n in norm):
                yield {'id': c[0], 'name': c[1], 'lat': float(c[4]), 'lon': float(c[5]),
                       'feature': f'{c[6]}.{c[7]}', 'cc': c[8], 'pop': int(c[14] or 0)}


def main():
    if len(sys.argv) < 2:
        raise SystemExit(__doc__)
    name = sys.argv[1]
    country = sys.argv[2].upper() if len(sys.argv) > 2 else None
    key = gazetteer._norm(name)
    ne = gazetteer.coords(name, country, 'today') if country else None
    print('Natural Earth:', f"{ne['lat']}, {ne['lon']}" if ne else 'no match')
    files = [gazetteer.GEONAMES_FILE]
    if country and os.path.exists(os.path.join(GEO_DIR, f'{country}.txt')):
        files.append(os.path.join(GEO_DIR, f'{country}.txt'))
    seen = set()
    hits = []
    for path in files:
        for r in rows(path, key, country):
            if r['id'] not in seen:
                seen.add(r['id'])
                hits.append(r)
    near = False
    if not hits and len(key) >= 5:
        # Spellings differ (Chaldiran / Chaldoran): fall back to the first letters.
        near = True
        for path in files:
            for r in rows(path, key[:5], country, prefix=True):
                if r['id'] not in seen:
                    seen.add(r['id'])
                    hits.append(r)
    hits.sort(key=lambda r: -r['pop'])
    if near and hits:
        print(f'No exact match; names starting "{key[:5]}":')
    if not hits:
        print('GeoNames: no match' + ('' if country else ' (give a country code to search its full file)'))
    for r in hits[:15]:
        print(f"GeoNames {r['id']}: {r['name']} ({r['cc']}, {r['feature']}, pop {r['pop']}) {r['lat']:.4f}, {r['lon']:.4f}")


if __name__ == '__main__':
    main()
