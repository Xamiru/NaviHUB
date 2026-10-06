"""Verify TMDB ids through Wikidata (themoviedb.org itself is closed to Claude agents).

usage: films.py movie 643 13783 ...   |   films.py tv 8068
Prints each id's Wikidata item, English label and first publication year."""
import json, sys, time, urllib.parse
import fetch
PROP = {'movie': 'P4947', 'tv': 'P4983'}

def api(params):
    url = 'https://www.wikidata.org/w/api.php?' + urllib.parse.urlencode(params)
    for wait in (3, 10, 30, 60):
        time.sleep(wait)
        try:
            return json.loads(fetch.decode(fetch.get(url)))
        except Exception as e:
            if '429' not in str(e):
                raise
    raise SystemExit('Wikidata keeps answering 429; try later')

def lookup(kind, tmdb_id):
    hits = api({'action': 'query', 'list': 'search', 'format': 'json',
                'srsearch': f'haswbstatement:{PROP[kind]}={tmdb_id}'})['query']['search']
    out = []
    for h in hits:
        e = api({'action': 'wbgetentities', 'ids': h['title'], 'format': 'json',
                 'props': 'labels|claims', 'languages': 'en'})['entities'][h['title']]
        label = e.get('labels', {}).get('en', {}).get('value')
        dates = [c['mainsnak'].get('datavalue', {}).get('value', {}).get('time', '') for c in e.get('claims', {}).get('P577', [])]
        years = sorted({d[1:5] for d in dates if d})
        out.append((h['title'], label, years[0] if years else None))
    return out

if __name__ == '__main__':
    kind = sys.argv[1]
    for i in sys.argv[2:]:
        print(i, lookup(kind, i))
