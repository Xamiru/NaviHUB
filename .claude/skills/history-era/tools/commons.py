"""Commons image lookup: license, artist, credit and a 1280 px thumbnail.

usage: commons.py "search words" [n]   (requests are paced; Commons answers bursts with 429)
"""
import html, json, re, sys, time, urllib.parse
import fetch
API = 'https://commons.wikimedia.org/w/api.php?'
def strip(s):
    return html.unescape(re.sub(r'<[^>]+>', '', s or '')).strip()
def info(params):
    time.sleep(4)
    q = dict(action='query', prop='imageinfo', iiprop='url|extmetadata|size', iiurlwidth='1280', format='json')
    q.update(params)
    data = json.loads(fetch.decode(fetch.get(API + urllib.parse.urlencode(q))))
    out = []
    for p in (data.get('query', {}).get('pages', {}) or {}).values():
        ii = (p.get('imageinfo') or [{}])[0]
        m = ii.get('extmetadata', {})
        g = lambda k: strip(m.get(k, {}).get('value'))
        out.append(dict(title=p.get('title'), url=ii.get('url'), thumb=ii.get('thumburl'), page=ii.get('descriptionurl'),
                        w=ii.get('width'), h=ii.get('height'),
                        lic=g('LicenseShortName'), licurl=g('LicenseUrl'), artist=g('Artist'), credit=g('Credit'),
                        date=g('DateTimeOriginal'), desc=g('ImageDescription')[:160], restr=g('Restrictions')))
    return out
def search(q, n=6):
    return info(dict(generator='search', gsrsearch=q, gsrnamespace='6', gsrlimit=str(n)))
def titles(ts):
    return info(dict(titles='|'.join(ts)))
if __name__ == '__main__':
    for r in search(sys.argv[1], int(sys.argv[2]) if len(sys.argv) > 2 else 6):
        print(f"{r['title']} | {r['w']}x{r['h']} | {r['lic']} | artist={r['artist'][:60]} | credit={r['credit'][:80]} | {r['date'][:20]}\n    {r['desc']}")
