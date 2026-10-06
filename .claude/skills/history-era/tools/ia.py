"""Internet Archive search and item metadata (files, sizes, rights).

usage: ia.py 'advancedsearch query'
"""
import json, sys, urllib.parse
import fetch
def search(q, n=8):
    url = 'https://archive.org/advancedsearch.php?' + urllib.parse.urlencode({'q': q, 'fl[]': ['identifier','title','date','mediatype','creator','licenseurl','downloads'], 'rows': n, 'output': 'json'}, doseq=True)
    return json.loads(fetch.decode(fetch.get(url)))['response']['docs']
def meta(ident):
    return json.loads(fetch.decode(fetch.get('https://archive.org/metadata/' + ident)))
if __name__ == '__main__':
    for d in search(sys.argv[1]):
        print(d.get('identifier'), '|', d.get('mediatype'), '|', str(d.get('title'))[:90], '|', d.get('date'), '|', str(d.get('creator'))[:50], '|', d.get('licenseurl'), '|', d.get('downloads'))
